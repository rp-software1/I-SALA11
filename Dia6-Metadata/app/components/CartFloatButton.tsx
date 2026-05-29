'use client';

import { usePedido } from '../../src/context/PedidoProvider';

export default function CartFloatButton() {
  const { pedido, carritoAbierto, toggleCarrito } = usePedido();
  const totalItems = pedido.items.reduce((acc, item) => acc + item.cantidad, 0);

  if (carritoAbierto || totalItems === 0) return null;

  return (
    <button
      type="button"
      onClick={toggleCarrito}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full border border-amber-600 bg-amber-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-600/35 transition-all duration-300 hover:bg-amber-700 hover:shadow-xl hover:shadow-amber-600/40 hover:-translate-y-0.5 active:scale-95"
    >
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="21" r="1"/>
        <circle cx="19" cy="21" r="1"/>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
      </svg>
      <span>Ver carrito</span>
      <span className="rounded-full bg-white px-2 py-0.5 text-xs font-black text-amber-700">{totalItems}</span>
    </button>
  );
}
