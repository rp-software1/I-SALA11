import type { Metadata } from 'next';
import type { Pedido } from '../../src/types';
import { getPedidos } from '../../src/services/api';
import ComandaCard from './ComandaCard';

export const metadata: Metadata = {
  title: 'Comandas — Restaurante',
};

const ORDEN: Record<string, number> = {
  pendiente: 0,
  en_preparacion: 1,
  lista: 2,
  entregada: 3,
  cancelada: 4,
};

export default async function ComandasPage() {
  const pedidos: Pedido[] = await getPedidos();

  const ordenados = [...pedidos].sort(
    (a, b) => (ORDEN[a.estado] ?? 5) - (ORDEN[b.estado] ?? 5)
  );

  const activos = ordenados.filter(
    p => p.estado !== 'entregada' && p.estado !== 'cancelada' && p.estado !== 'cerrada'
  );
  const cerrados = ordenados.filter(p => !activos.includes(p));

  const pendientes = activos.filter(p => p.estado === 'pendiente').length;
  const enPrep = activos.filter(p => p.estado === 'en_preparacion').length;
  const listos = activos.filter(p => p.estado === 'lista').length;

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Comandas</h1>
        <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
          {activos.length} activas
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-orange-50 rounded-xl px-4 py-3 border border-orange-100">
          <p className="text-xs text-orange-600 font-medium uppercase tracking-wide">Pendientes</p>
          <p className="text-2xl font-bold text-orange-700">{pendientes}</p>
        </div>
        <div className="bg-blue-50 rounded-xl px-4 py-3 border border-blue-100">
          <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">Preparación</p>
          <p className="text-2xl font-bold text-blue-700">{enPrep}</p>
        </div>
        <div className="bg-purple-50 rounded-xl px-4 py-3 border border-purple-100">
          <p className="text-xs text-purple-600 font-medium uppercase tracking-wide">Listas</p>
          <p className="text-2xl font-bold text-purple-700">{listos}</p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
          Activas
          <span className="text-sm font-normal text-gray-400">({activos.length})</span>
        </h2>
        {activos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
            <p className="text-4xl mb-3">✅</p>
            <p className="text-gray-400 text-sm">No hay comandas activas</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {activos.map(pedido => (
              <ComandaCard key={pedido._id} pedido={pedido} />
            ))}
          </div>
        )}
      </section>

      {cerrados.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-400 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-gray-400 rounded-full" />
            Cerradas
            <span className="text-sm font-normal">({cerrados.length})</span>
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 opacity-60">
            {cerrados.map(p => (
              <ComandaCard key={p._id} pedido={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
