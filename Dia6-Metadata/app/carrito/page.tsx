'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePedido } from '../../src/context/PedidoProvider';
import { enviarComanda } from './actions';
import type { ItemPedido, Mesa, TipoPedido } from '../../src/types';

export default function CarritoPage() {
  const { pedido, quitarPlato, limpiarPedido, cambiarTipo, asignarMesa } = usePedido();
  const router = useRouter();
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [selectedMesa, setSelectedMesa] = useState<string | null>(pedido.mesaId);
  const [enviando, setEnviando] = useState<boolean>(false);
  const [confirmacion, setConfirmacion] = useState<string | null>(null);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);

  useEffect(() => {
    document.title = pedido.items.length > 0
      ? `Carrito (${pedido.items.length}) — Sistema de Restaurante`
      : 'Carrito — Sistema de Restaurante';
  }, [pedido.items.length]);

  useEffect(() => {
    setSelectedMesa(pedido.mesaId);
  }, [pedido.mesaId]);

  useEffect(() => {
    fetch('/api/mesas', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data: Mesa[]) => setMesas(data))
      .catch(() => setMesas([]));
  }, []);

  const totalVisual = pedido.items.reduce(
    (acc: number, item: ItemPedido) => acc + item.precioUnitario * item.cantidad,
    0
  );

  const mesasDisponibles = mesas.filter((mesa) => mesa.estado === 'disponible');

  const handleEnviar = async (): Promise<void> => {
    if (pedido.tipo === 'mesa' && !pedido.mesaId) {
      setErrorEnvio('Selecciona una mesa antes de enviar la comanda.');
      return;
    }

    setEnviando(true);
    setErrorEnvio(null);

    const resultado = await enviarComanda(pedido);

    if (resultado.ok) {
      setConfirmacion(resultado.pedidoId);
      limpiarPedido();
    } else {
      setErrorEnvio(resultado.error);
    }
    setEnviando(false);
  };

  const handleTipoCambio = (tipo: TipoPedido) => {
    cambiarTipo(tipo);
    if (tipo === 'para_llevar') {
      setSelectedMesa(null);
      asignarMesa(null);
    }
  };

  const handleAsignarMesa = () => {
    if (selectedMesa) {
      asignarMesa(selectedMesa);
    }
  };

  if (confirmacion) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 px-6">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100 shadow-sm">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">¡Comanda enviada con éxito!</h1>
        <p className="text-slate-500 mb-6 text-sm">Tu pedido ha sido procesado y se encuentra en cocina.</p>
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-8 text-left">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Código de Referencia</p>
          <p className="font-mono text-sm text-slate-700 mt-1 font-semibold break-all">{confirmacion}</p>
        </div>
        <button
          onClick={() => {
            setConfirmacion(null);
            router.push('/mesas');
          }}
          className="btn-primary px-8 py-3.5 mx-auto"
        >
          Volver a las mesas
        </button>
      </div>
    );
  }

  if (pedido.items.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 px-6">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center border border-slate-100">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">Tu carrito está vacío</h1>
        <p className="text-slate-500 mb-8 max-w-sm mx-auto text-sm leading-relaxed">Explora el menú y agrega tus platos favoritos para realizar tu comanda.</p>
        <button
          onClick={() => router.push('/menu')}
          className="btn-primary px-8 py-3.5 mx-auto"
        >
          Ver el menú
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      <div className="panel bg-white border border-slate-100 shadow-lg p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Resumen de la comanda</p>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-800 tracking-tight">Tu pedido</h1>
          </div>
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 text-right">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total a Pagar</p>
            <p className="text-2xl font-black text-amber-700 mt-1">S/ {totalVisual.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => handleTipoCambio('mesa')}
            className={`option-button flex items-center justify-between ${pedido.tipo === 'mesa' ? 'option-active' : ''}`}
          >
            <span>Orden en mesa</span>
            <svg className="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          </button>
          <button
            onClick={() => handleTipoCambio('para_llevar')}
            className={`option-button flex items-center justify-between ${pedido.tipo === 'para_llevar' ? 'option-active' : ''}`}
          >
            <span>Para llevar</span>
            <svg className="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>
        </div>
      </div>

      {pedido.tipo === 'mesa' && (
        <div className="panel bg-white border border-slate-100 shadow-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800">Selecciona una mesa disponible</h2>
            {pedido.mesaId && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                Mesa asignada: {pedido.mesaId}
              </span>
            )}
          </div>
          
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {mesasDisponibles.map((mesa) => (
              <button
                key={mesa._id}
                type="button"
                onClick={() => setSelectedMesa(mesa._id)}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  selectedMesa === mesa._id 
                    ? 'border-amber-500 bg-amber-50/50 text-amber-900 font-semibold ring-2 ring-amber-500/10' 
                    : 'border-slate-100 bg-slate-50/60 hover:bg-slate-100/50 hover:border-slate-200'
                }`}
              >
                <p className="font-extrabold text-slate-800">Mesa {mesa.numero}</p>
                <p className="text-xs text-slate-500 mt-0.5">Capacidad: {mesa.capacidad} pers.</p>
              </button>
            ))}
          </div>

          <button
            onClick={handleAsignarMesa}
            disabled={!selectedMesa}
            className="w-full btn-secondary py-3 text-sm disabled:opacity-50"
          >
            {pedido.mesaId ? 'Actualizar mesa en comanda' : 'Confirmar mesa para el pedido'}
          </button>
        </div>
      )}

      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 px-1">Platos en el pedido</h2>
        {pedido.items.map((item: ItemPedido) => (
          <div key={item.platoId} className="card flex items-center justify-between gap-4 p-5 bg-white border border-slate-100 shadow-sm">
            <div>
              <p className="font-bold text-slate-800 text-base">{item.nombre}</p>
              <p className="text-xs text-slate-500 mt-1">
                S/ {item.precioUnitario.toFixed(2)} × {item.cantidad}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold text-amber-700 text-sm">S/ {(item.precioUnitario * item.cantidad).toFixed(2)}</span>
              <button
                onClick={() => quitarPlato(item.platoId)}
                className="text-slate-400 hover:text-amber-600 hover:bg-slate-100 p-1.5 rounded-full border border-slate-200 shadow-sm transition-all"
                title="Quitar uno"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 space-y-3">
        {errorEnvio && (
          <div className="rounded-2xl bg-rose-50 border border-rose-100 p-4 text-rose-700 text-xs font-semibold text-center leading-relaxed">
            {errorEnvio}
          </div>
        )}

        <button
          onClick={handleEnviar}
          disabled={enviando}
          className="w-full btn-primary py-4 text-base shadow-lg shadow-amber-600/10"
        >
          {enviando ? 'Enviando comanda...' : 'Enviar comanda a cocina'}
        </button>

        <button
          onClick={limpiarPedido}
          className="w-full btn-ghost py-3.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100"
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
}
