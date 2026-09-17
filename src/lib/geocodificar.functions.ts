import { createServerFn } from "@tanstack/react-start";

type Resultado = { slug: string; nome: string; latitude: number | null; longitude: number | null };

const NOMINATIM = "https://nominatim.openstreetmap.org/search";

/** Monta a consulta de endereço a partir do endereço, bairro, cidade e estado. */
function montarConsulta(b: {
  endereco: string | null;
  bairro: string;
  cidade: string;
  estado: string;
}): string {
  return [b.endereco, b.bairro, b.cidade, b.estado, "Brasil"]
    .filter((p) => p && p.trim().length > 0)
    .join(", ");
}

async function buscarCoordenadas(consulta: string): Promise<{ lat: number; lon: number } | null> {
  const url = `${NOMINATIM}?format=jsonv2&limit=1&countrycodes=br&q=${encodeURIComponent(consulta)}`;
  const resposta = await fetch(url, {
    headers: {
      "User-Agent": "GarimpaAqui/1.0 (catalogo de brechos do Rio de Janeiro)",
      Accept: "application/json",
    },
  });
  if (!resposta.ok) return null;
  const dados = (await resposta.json()) as Array<{ lat: string; lon: string }>;
  const primeiro = dados[0];
  if (!primeiro) return null;
  const lat = Number(primeiro.lat);
  const lon = Number(primeiro.lon);
  return Number.isFinite(lat) && Number.isFinite(lon) ? { lat, lon } : null;
}

/**
 * Preenche latitude/longitude dos brechós aprovados que ainda não têm coordenadas.
 * Roda no servidor, uma requisição por vez (limite de uso do Nominatim).
 */
export const geocodificarBrechos = createServerFn({ method: "POST" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data, error } = await supabaseAdmin
    .from("brechos")
    .select("id, slug, nome, endereco, bairro, cidade, estado")
    .eq("status", "approved")
    .is("latitude", null)
    .limit(25);

  if (error) throw new Error(error.message);

  const resultados: Resultado[] = [];

  for (const brecho of data ?? []) {
    let coords = await buscarCoordenadas(montarConsulta(brecho));
    if (!coords) {
      // tentativa mais ampla: só bairro + cidade + estado
      coords = await buscarCoordenadas(montarConsulta({ ...brecho, endereco: null }));
    }

    if (coords) {
      const { error: erroUpdate } = await supabaseAdmin
        .from("brechos")
        .update({ latitude: coords.lat, longitude: coords.lon })
        .eq("id", brecho.id);
      if (erroUpdate) throw new Error(erroUpdate.message);
    }

    resultados.push({
      slug: brecho.slug,
      nome: brecho.nome,
      latitude: coords?.lat ?? null,
      longitude: coords?.lon ?? null,
    });

    await new Promise((r) => setTimeout(r, 1100));
  }

  return {
    processados: resultados.length,
    encontrados: resultados.filter((r) => r.latitude !== null).length,
    resultados,
  };
});
