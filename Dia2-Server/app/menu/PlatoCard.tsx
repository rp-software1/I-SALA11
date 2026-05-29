'use client';

import { useState } from 'react';
import type { Plato } from '../../src/types';

interface PlatoCardProps {
  plato: Plato;
}

export default function PlatoCard({ plato }: PlatoCardProps) {
  const [agregado, setAgregado] = useState<boolean>(false);

  const handleAgregar = (): void => {
    // TODO Día 3: llamar a agregarPlato(plato) del PedidoContext
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1500);
  };

  const btnClass = agregado
    ? 'bg-green-600 text-white px-4 py-1 rounded text-sm font-medium'
    : 'bg-blue-600 text-white px-4 py-1 rounded text-sm font-medium hover:bg-blue-700';

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="font-bold text-lg mb-1">{plato.nombre}</h3>
      <p className="text-sm text-gray-500 mb-2">{plato.descripcion}</p>
      <p className="text-sm text-gray-400 mb-3 capitalize">{plato.categoria}</p>
      <div className="flex justify-between items-center">
        <span className="font-bold text-blue-700">S/ {plato.precio.toFixed(2)}</span>
        <button onClick={handleAgregar} className={btnClass}>
          {agregado ? '✓ Agregado' : 'Agregar'}
        </button>
      </div>
    </div>
  );
}
