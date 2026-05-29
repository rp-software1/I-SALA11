import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Mesa } from '../../../src/types';
import { mesas as allMesas } from '../../api/data';
import MesaDetailClient from '../MesaDetailClient';

interface PageProps {
  params: Promise<{
    mesaId: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Detalle de Mesa — Sistema de Restaurante',
  description: 'Consulta el estado de la mesa y asigna el pedido al carrito.',
};

export default async function MesaDetailPage({ params }: PageProps) {
  const { mesaId } = await params;
  const mesa = (allMesas as Mesa[]).find((m) => m._id === mesaId);
  if (!mesa) return notFound();

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <header className="space-y-2 mb-6">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Detalle de mesa</p>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Mesa {mesa.numero}</h1>
        <p className="text-slate-500 text-sm max-w-2xl">Revisa el estado actual, capacidad y asigna este espacio a tu comanda para envío de pedidos en mesa.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr] items-start">
        <section className="panel bg-white border border-slate-100 shadow-lg p-6 rounded-3xl space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="info-box">
              <span className="label">Número</span>
              <p className="value">{mesa.numero}</p>
            </div>
            <div className="info-box">
              <span className="label">Capacidad</span>
              <p className="value">{mesa.capacidad} personas</p>
            </div>
          </div>

          <div className="info-box">
            <span className="label">Estado de Mesa</span>
            <p className="value capitalize">{mesa.estado.replace('_', ' ')}</p>
          </div>

          <div className="rounded-2xl border border-amber-100/60 bg-amber-50/20 p-6">
            <h2 className="text-base font-bold text-amber-900 mb-3">Acciones disponibles</h2>
            <ul className="space-y-2 text-xs text-amber-800/80 leading-relaxed list-disc list-inside">
              <li>Verifica si la mesa está disponible para asignar un pedido.</li>
              <li>Asigna la mesa al carrito y envía la comanda desde la página de carrito.</li>
              <li>Si la mesa está ocupada o reservada, no podrás asignarla hasta que esté libre.</li>
            </ul>
          </div>
        </section>

        <MesaDetailClient mesa={mesa} />
      </div>
    </div>
  );
}
