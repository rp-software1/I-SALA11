'use client';

import { useState } from 'react';
import type { Plato } from '../../src/types';
import PlatoCard from './PlatoCard';

export default function MenuContent({ platos }: { platos: Plato[] }) {
  const [categoria, setCategoria] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState('');

  const categorias = [...new Set(platos.map(p => p.categoria))];

  const filtrados = platos.filter(p => {
    if (categoria && p.categoria !== categoria) return false;
    if (busqueda && !p.nombre.toLowerCase().includes(busqueda.toLowerCase())) return false;
    return true;
  });

  const agrupados = categorias.reduce((acc, cat) => {
    const items = filtrados.filter(p => p.categoria === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {} as Record<string, Plato[]>);

  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Menú</h1>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar plato..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 w-full sm:w-64"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setCategoria(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            categoria === null
              ? 'bg-brand-600 text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          Todas
        </button>
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
              categoria === cat
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {Object.entries(agrupados).length === 0 ? (
        <p className="text-gray-400 text-center py-12">No se encontraron platos</p>
      ) : (
        <div className="space-y-10">
          {Object.entries(agrupados).map(([cat, items]) => (
            <section key={cat}>
              <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-500 rounded-full" />
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map(plato => (
                  <PlatoCard key={plato._id} plato={plato} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
