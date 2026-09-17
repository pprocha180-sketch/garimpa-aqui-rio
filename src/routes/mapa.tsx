import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import MapaBrechos from "@/components/MapaBrechos";
import { brechos } from "@/data/brechos";

const localizacoesMock = [
  [-22.9519, -43.2105],
  [-22.9711, -43.1822],
  [-22.9249, -43.2334],
  [-22.9134, -43.1792],
  [-22.9132, -43.1803],
  [-22.9711, -43.1822],
] as const;

export default function MapaPage() {
  const brechosComLocalizacao = useMemo(
    () =>
      brechos.map((brecho, index) => ({
        ...brecho,
        latitude: brecho.latitude ?? localizacoesMock[index % localizacoesMock.length]![0],
        longitude: brecho.longitude ?? localizacoesMock[index % localizacoesMock.length]![1],
      })),
    [],
  );

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 md:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-brand">Garimpa Aqui</p>
          <h1 className="text-4xl font-black tracking-tight text-ink md:text-5xl">Mapa de brechós</h1>
          <p className="mt-3 max-w-2xl text-ink/70">
            Explore os brechós cadastrados no Rio de Janeiro.
          </p>
        </div>
        <Link to="/brechos" className="rounded-full border border-brand/20 px-5 py-3 text-sm font-bold text-brand hover:bg-brand/10">
          Ver todos os brechós
        </Link>
      </div>
      <MapaBrechos brechos={brechosComLocalizacao} altura="min(68vh, 42rem)" zoom={12} />
      <p className="mt-4 text-xs text-ink/50">
        As localizações exibidas são aproximadas e servem apenas para demonstração do protótipo.
      </p>
    </main>
  );
}
