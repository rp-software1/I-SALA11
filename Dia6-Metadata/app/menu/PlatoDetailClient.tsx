'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Plato } from '../../src/types';
import { usePedido } from '../../src/context/PedidoProvider';

interface PlatoDetailClientProps {
  plato: Plato;
}

const categoryConfig: Record<string, { bg: string; accent: string; label: string }> = {
  principal:  { bg: '#fff7ed', accent: '#ea580c', label: '#c2410c' },
  entrada:    { bg: '#f0fdf4', accent: '#16a34a', label: '#15803d' },
  postre:     { bg: '#fdf2f8', accent: '#a21caf', label: '#86198f' },
  bebida:     { bg: '#eff6ff', accent: '#2563eb', label: '#1d4ed8' },
};
const defaultCfg = { bg: '#f8fafc', accent: '#64748b', label: '#475569' };

export default function PlatoDetailClient({ plato }: PlatoDetailClientProps) {
  const { agregarPlato, toggleCarrito } = usePedido();
  const [agregado, setAgregado] = useState(false);

  const cfg = categoryConfig[plato.categoria] ?? defaultCfg;

  const handleAgregar = () => {
    agregarPlato(plato);
    setAgregado(true);
    toggleCarrito();
    setTimeout(() => setAgregado(false), 1500);
  };

  return (
    <section style={{
      background: '#fff',
      border: '1px solid #e2e8f0',
      borderRadius: '1.5rem',
      overflow: 'hidden',
      maxWidth: 860,
      margin: '0 auto',
      boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
    }}>
      {/* Banner de categoría */}
      <div style={{
        background: cfg.bg,
        borderBottom: `1px solid ${cfg.accent}22`,
        padding: '1.5rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            background: cfg.accent + '18',
            color: cfg.label,
            fontWeight: 700, fontSize: '0.7rem',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '0.3rem 0.85rem', borderRadius: 9999,
            border: `1px solid ${cfg.accent}30`,
          }}>
            {plato.categoria}
          </span>
          <span style={{
            background: plato.disponible ? '#f0fdf4' : '#fff1f2',
            color: plato.disponible ? '#15803d' : '#be123c',
            fontWeight: 700, fontSize: '0.7rem',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '0.3rem 0.85rem', borderRadius: 9999,
            border: plato.disponible ? '1px solid #bbf7d0' : '1px solid #fecdd3',
          }}>
            {plato.disponible ? 'Disponible' : 'No disponible'}
          </span>
        </div>
        {plato.rating && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            background: '#fff', padding: '0.4rem 0.9rem',
            borderRadius: 9999, boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            fontSize: '0.875rem', fontWeight: 800, color: '#b45309',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            {plato.rating.toFixed(1)} / 5
          </div>
        )}
      </div>

      {/* Contenido principal */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '0',
      }}>
        {/* Info del plato */}
        <div style={{ padding: '2rem', borderRight: '1px solid #f1f5f9' }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 900, color: '#1e293b',
            margin: '0 0 1rem', letterSpacing: '-0.03em', lineHeight: 1.15,
          }}>
            {plato.nombre}
          </h2>

          <p style={{
            color: '#64748b', lineHeight: 1.75, fontSize: '0.95rem',
            margin: '0 0 1.5rem',
          }}>
            {plato.descripcion}
          </p>

          {/* Ingredientes */}
          {plato.ingredientes && plato.ingredientes.length > 0 && (
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '1rem',
              padding: '1rem 1.25rem',
            }}>
              <div style={{
                fontSize: '0.65rem', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.15em',
                color: '#94a3b8', marginBottom: '0.75rem',
              }}>
                Ingredientes
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {plato.ingredientes.map((ing) => (
                  <span key={ing} style={{
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    color: '#334155',
                    fontSize: '0.78rem', fontWeight: 600,
                    padding: '0.3rem 0.75rem',
                    borderRadius: 9999,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  }}>
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Panel de acción */}
        <div style={{
          padding: '2rem',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', gap: '1.5rem',
          background: '#fafafa',
        }}>
          {/* Precio */}
          <div style={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '1rem',
            padding: '1.25rem 1.5rem',
          }}>
            <div style={{
              fontSize: '0.65rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.15em',
              color: '#94a3b8', marginBottom: '0.25rem',
            }}>
              Precio unitario
            </div>
            <div style={{
              fontSize: '2.25rem', fontWeight: 900,
              color: '#d97706', letterSpacing: '-0.04em', lineHeight: 1,
            }}>
              S/ {plato.precio.toFixed(2)}
            </div>
          </div>

          {/* Botón agregar */}
          <button
            onClick={handleAgregar}
            disabled={!plato.disponible}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              width: '100%',
              background: agregado ? '#059669' : '#d97706',
              color: '#fff',
              fontWeight: 800, fontSize: '1rem',
              padding: '0.9rem 1.5rem',
              borderRadius: 9999, border: 'none',
              cursor: plato.disponible ? 'pointer' : 'not-allowed',
              opacity: plato.disponible ? 1 : 0.5,
              boxShadow: agregado
                ? '0 4px 16px rgba(5,150,105,0.35)'
                : '0 4px 16px rgba(217,119,6,0.35)',
              transition: 'all 0.2s',
            }}
          >
            {agregado ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                Agregado al carrito
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Agregar al pedido
              </>
            )}
          </button>

          {/* Botones secundarios */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link href="/menu" style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
              background: '#fff', color: '#334155',
              fontWeight: 600, fontSize: '0.85rem',
              padding: '0.6rem 1rem',
              borderRadius: 9999, border: '1px solid #e2e8f0',
              textDecoration: 'none', transition: 'all 0.15s',
            }}>
              Volver al menú
            </Link>
            <button
              onClick={toggleCarrito}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
                background: 'transparent', color: '#475569',
                fontWeight: 600, fontSize: '0.85rem',
                padding: '0.6rem 1rem',
                borderRadius: 9999, border: '1px solid #cbd5e1',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              Ver carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
