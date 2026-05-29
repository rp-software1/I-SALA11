import { notFound } from 'next/navigation';
import type { Plato } from '../../../src/types';
import { platos as allPlatos } from '../../api/data';
import PlatoDetailClient from '../PlatoDetailClient';

interface PageProps {
  params: Promise<{
    platoId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { platoId } = await params;
  const plato = (allPlatos as Plato[]).find((p) => p._id === platoId);
  if (!plato) return notFound();

  return (
    <main className="max-w-6xl mx-auto px-6 py-8 space-y-6 pb-12">
      <div className="page-header bg-white border border-slate-100 shadow-md rounded-3xl p-6 md:p-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-700 bg-amber-50 border border-amber-100/50 rounded-full px-3 py-1.5 inline-block">
          Detalle del plato
        </p>
        <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">{plato.nombre}</h1>
        <p className="mt-2 text-slate-500 text-sm max-w-3xl leading-relaxed">
          Revisa los detalles, ingredientes y añade este plato directamente a tu carrito de compras.
        </p>
      </div>
      <PlatoDetailClient plato={plato} />
    </main>
  );
}
