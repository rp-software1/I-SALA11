'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePedido } from '../../src/context/PedidoProvider';
import { enviarComanda } from './actions';
import type { ItemPedido } from '../../src/types';

export default function CarritoPage() {
  const { pedido, quitarPlato, cambiarCantidad, limpiarPedido } = usePedido();
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [confirmacion, setConfirmacion] = useState<string | null>(null);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);

  const totalVisual = pedido.items.reduce(
    (acc, item) => acc + item.precioUnitario * item.cantidad, 0
  );

  const handleEnviar = async () => {
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

  if (confirmacion) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center animate-fade-in-up">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-check">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Comanda enviada!</h1>
          <p className="text-sm text-gray-500 font-mono mb-8">ID: {confirmacion}</p>
          <button
            onClick={() => { setConfirmacion(null); router.push('/mesas'); }}
            className="bg-brand-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-brand-700 transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
          >
            Volver a las mesas
          </button>
        </div>
      </div>
    );
  }

  if (pedido.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center animate-fade-in-up">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">El carrito está vacío</h1>
          <p className="text-gray-500 text-sm mb-8">Agrega platos del menú para empezar.</p>
          <button
            onClick={() => router.push('/menu')}
            className="bg-brand-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-brand-700 transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
          >
            Ver el menú
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Tu Carrito</h1>

      <div className="space-y-3 mb-6">
        {pedido.items.map((item: ItemPedido) => (
          <div key={item.platoId} className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{item.nombre}</p>
              <p className="text-sm text-gray-500">S/ {item.precioUnitario.toFixed(2)} c/u</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200">
                <button
                  onClick={() => cambiarCantidad(item.platoId, item.cantidad - 1)}
                  className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-l-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                  </svg>
                </button>
                <span className="w-8 text-center font-medium text-sm">{item.cantidad}</span>
                <button
                  onClick={() => cambiarCantidad(item.platoId, item.cantidad + 1)}
                  className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-r-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
                  </svg>
                </button>
              </div>
              <span className="font-bold text-gray-900 w-20 text-right">
                S/ {(item.precioUnitario * item.cantidad).toFixed(2)}
              </span>
              <button
                onClick={() => quitarPlato(item.platoId)}
                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Eliminar"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Total</span>
          <span className="text-2xl font-bold text-gray-900">S/ {totalVisual.toFixed(2)}</span>
        </div>
      </div>

      {errorEnvio && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {errorEnvio}
        </div>
      )}

      <button
        onClick={handleEnviar}
        disabled={enviando}
        className="w-full bg-brand-600 text-white rounded-xl py-3.5 font-semibold hover:bg-brand-700 transition-all hover:shadow-lg disabled:opacity-50 disabled:hover:shadow-none active:scale-[0.98]"
      >
        {enviando ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Enviando comanda...
          </span>
        ) : (
          'Enviar comanda'
        )}
      </button>
      <button
        onClick={limpiarPedido}
        className="w-full mt-2 border border-gray-200 rounded-xl py-3 text-gray-500 hover:bg-gray-50 transition-colors text-sm font-medium active:scale-[0.98]"
      >
        Vaciar carrito
      </button>
    </div>
  );
}
