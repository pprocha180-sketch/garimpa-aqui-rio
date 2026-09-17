import { useEffect, useRef } from "react";
import type { Brecho } from "@/data/brechos";

type Props = {
  brechos: Brecho[];
  altura?: string;
  zoom?: number;
};

/**
 * Mapa real (OpenStreetMap + Leaflet). A biblioteca é carregada só no navegador,
 * depois da hidratação, para não quebrar a renderização no servidor.
 */
export function MapaBrechos({ brechos, altura = "28rem", zoom }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapaRef = useRef<{ remove: () => void } | null>(null);

  const comCoordenadas = brechos.filter(
    (b) => typeof b.latitude === "number" && typeof b.longitude === "number",
  );
  const chave = comCoordenadas.map((b) => b.id).join("|");

  useEffect(() => {
    let cancelado = false;

    (async () => {
      const L = await import("leaflet");
      if (cancelado || !containerRef.current) return;

      mapaRef.current?.remove();

      const mapa = L.map(containerRef.current, { scrollWheelZoom: false }).setView(
        [-22.9068, -43.1729],
        zoom ?? 11,
      );
      mapaRef.current = mapa;

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapa);

      const icone = L.divIcon({
        className: "",
        html: '<span style="display:block;width:1.25rem;height:1.25rem;border-radius:9999px;background:#2E6E55;border:3px solid #FBF4EA;box-shadow:0 2px 6px rgba(0,0,0,.35)"></span>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const marcadores = comCoordenadas.map((b) => {
        const marcador = L.marker([b.latitude as number, b.longitude as number], {
          icon: icone,
          title: b.nome,
          alt: b.nome,
        }).addTo(mapa);
        marcador.bindPopup(
          `<strong>${b.nome}</strong><br/>${b.bairro}<br/><a href="/brechos/${b.id}">Ver brechó</a>`,
        );
        return marcador;
      });

      if (marcadores.length === 1) {
        const unico = comCoordenadas[0]!;
        mapa.setView([unico.latitude as number, unico.longitude as number], zoom ?? 15);
      } else if (marcadores.length > 1) {
        mapa.fitBounds(
          L.latLngBounds(comCoordenadas.map((b) => [b.latitude as number, b.longitude as number])),
          { padding: [40, 40] },
        );
      }
    })();

    return () => {
      cancelado = true;
      mapaRef.current?.remove();
      mapaRef.current = null;
    };
  }, [chave, zoom]);

  if (comCoordenadas.length === 0) {
    return (
      <div className="rounded-3xl border border-brand/15 bg-surface p-6 text-sm font-bold text-ink/70">
        Ainda não temos a localização destes brechós no mapa.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="application"
      aria-label={`Mapa com ${comCoordenadas.length} brechó(s)`}
      className="overflow-hidden rounded-3xl border border-brand/15 bg-clay/30 shadow-sm"
      style={{ height: altura, zIndex: 0 }}
    />
  );
}

export default MapaBrechos;
