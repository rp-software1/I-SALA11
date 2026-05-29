import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getMesaById } from '../../../src/services/api';
import MesaDetalle from './MesaDetalle';
import MesaDetalleSkeleton from './MesaDetalleSkeleton';

interface PageProps {
  params: Promise<{ mesaId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { mesaId } = await params;
  try {
    const mesa = await getMesaById(mesaId);
    return {
      title: `Mesa ${mesa.numero} — Restaurante`,
      description: `Estado: ${mesa.estado} | Capacidad: ${mesa.capacidad} personas`,
    };
  } catch {
    return { title: 'Mesa no encontrada — Restaurante' };
  }
}

export default async function MesaPage({ params }: PageProps) {
  const { mesaId } = await params;

  let mesa;
  try {
    mesa = await getMesaById(mesaId);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Mesa {mesa.numero}
        <span className="ml-3 text-base font-normal text-gray-500 capitalize">
          {mesa.estado.replace("_", " ")}
        </span>
      </h1>

      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <p className="text-gray-600">
          Capacidad: <span className="font-medium">{mesa.capacidad} personas</span>
        </p>
        <p className="text-gray-600">
          ID: <span className="font-mono text-xs">{mesa._id}</span>
        </p>
      </div>

      <Suspense fallback={<MesaDetalleSkeleton />}>
        <MesaDetalle mesa={mesa} />
      </Suspense>
    </div>
  );
}
