'use client';

import { useState } from 'react';
import { usePedido } from '../../src/context/PedidoProvider';
import type { Mesa } from '../../src/types';

interface MesaDetailClientProps {
  mesa: Mesa;
}

export default function MesaDetailClient({ mesa }: MesaDetailClientProps) {
  const { pedido, asignarMesa, cambiarTipo } = usePedido();
  const [guardado, setGuardado] = useState<boolean>(pedido.mesaId === mesa._id);

  const handleAsignar = (): void => {
    cambiarTipo('mesa');
    asignarMesa(mesa._id);
    setGuardado(true);
  };

  const estadoActiva = mesa._id === pedido.mesaId;

  return (
    <aside className="panel bg-white border border-slate-100 shadow-xl">
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Acción rápida</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-800">Asignar mesa</h2>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Estado actual de la comanda</p>
          <p className="mt-1.5 font-bold text-slate-800">{pedido.tipo === 'mesa' ? 'Pedido en mesa' : 'Para llevar'}</p>
          {pedido.tipo === 'mesa' && (
            <p className="text-xs text-slate-500 mt-1 font-medium">
              {pedido.mesaId ? `Mesa asignada actualmente: ${pedido.mesaId}` : 'Aún no hay mesa asignada'}
            </p>
          )}
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Mesa seleccionada</p>
          <p className="mt-1.5 text-lg font-extrabold text-slate-800">Mesa {mesa.numero}</p>
          <p className="text-xs text-slate-500 font-medium">Capacidad: {mesa.capacidad} personas</p>
          <div className="mt-3 flex">
            <span className={`status-pill ${
              mesa.estado === 'disponible' ? 'status-success' :
              mesa.estado === 'ocupada' ? 'status-danger' :
              mesa.estado === 'reservada' ? 'status-warning' : 'status-muted'
            }`}>
              {mesa.estado.replace('_', ' ')}
            </span>
          </div>
        </div>

        <button
          onClick={handleAsignar}
          disabled={mesa.estado !== 'disponible' || estadoActiva}
          className={`w-full btn-primary py-3 ${
            estadoActiva ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10' : ''
          }`}
        >
          {estadoActiva ? (
            <>
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Mesa asignada</span>
            </>
          ) : mesa.estado !== 'disponible' ? (
            'No disponible'
          ) : (
            'Asignar mesa al pedido'
          )}
        </button>

        <p className="text-xs text-slate-400 text-center leading-relaxed mt-2">
          Asigna esta mesa para enviar la comanda desde el carrito como orden de mesa.
        </p>
      </div>
    </aside>
  );
}
