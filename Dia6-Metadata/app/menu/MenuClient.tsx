'use client';

import { useMemo, useState } from 'react';
import type { Plato } from '../../src/types';
import PlatoCard from './PlatoCard';

interface Props {
  initialPlatos: Plato[];
}

export default function MenuClient({ initialPlatos }: Props) {
  const [query, setQuery] = useState('');
  const [categoria, setCategoria] = useState<string>('all');
  const [sort, setSort] = useState<'popular' | 'price_asc' | 'price_desc'>('popular');

  const categorias = useMemo(() => {
    const set = new Set(initialPlatos.map(p => p.categoria));
    return ['all', ...Array.from(set)];
  }, [initialPlatos]);

  const filtered = useMemo(() => {
    let list = initialPlatos.slice();
    if (categoria !== 'all') list = list.filter(p => p.categoria === categoria);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p => p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q));
    }
    if (sort === 'price_asc') list.sort((a, b) => a.precio - b.precio);
    if (sort === 'price_desc') list.sort((a, b) => b.precio - a.precio);
    if (sort === 'popular') list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return list;
  }, [initialPlatos, categoria, query, sort]);

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex items-center gap-3 flex-wrap">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre o descripción"
              className="input-base w-full md:w-72"
            />
            <div className="flex flex-wrap gap-2">
              {categorias.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategoria(c)}
                  className={`chip ${categoria === c ? 'chip-active' : ''}`}
                >
                  {c === 'all' ? 'Todas' : c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-slate-600">Ordenar por</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="input-base w-full md:w-auto"
            >
              <option value="popular">Más populares</option>
              <option value="price_asc">Menor precio primero</option>
              <option value="price_desc">Mayor precio primero</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div key={p._id} className="animate-card">
            <PlatoCard plato={p} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-slate-400 mt-6">No se encontraron platos.</p>
      )}
    </div>
  );
}
