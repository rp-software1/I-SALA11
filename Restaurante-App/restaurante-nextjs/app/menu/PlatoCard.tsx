'use client';

import { useState } from 'react';
import type { Plato } from '../../src/types';
import { usePedido } from '../../src/context/PedidoProvider';

interface PlatoCardProps {
  plato: Plato;
}

const categoriaGradient: Record<string, string> = {
  entrada: 'from-amber-200 to-orange-300',
  principal: 'from-red-200 to-rose-300',
  postre: 'from-pink-200 to-purple-300',
  bebida: 'from-sky-200 to-cyan-300',
};

const categoriaEmoji: Record<string, string> = {
  entrada: '🥗',
  principal: '🍖',
  postre: '🍰',
  bebida: '🥤',
};

export default function PlatoCard({ plato }: PlatoCardProps) {
  const { agregarPlato } = usePedido();
  const [agregado, setAgregado] = useState(false);

  const handleAgregar = () => {
    agregarPlato(plato);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1500);
  };

  const gradient = categoriaGradient[plato.categoria] ?? 'from-gray-200 to-gray-300';
  const emoji = categoriaEmoji[plato.categoria] ?? '🍽';

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className={`h-32 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
        <span className="text-4xl opacity-80 group-hover:scale-110 transition-transform duration-300">{emoji}</span>
        <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-white/70 text-gray-700 backdrop-blur-sm">
          {plato.categoria}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1">{plato.nombre}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{plato.descripcion}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-brand-600">S/ {plato.precio.toFixed(2)}</span>
          <button
            onClick={handleAgregar}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              agregado
                ? 'bg-green-500 text-white scale-105'
                : 'bg-brand-600 text-white hover:bg-brand-700 active:scale-95'
            }`}
          >
            {agregado ? (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Agregado
              </span>
            ) : (
              'Agregar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
