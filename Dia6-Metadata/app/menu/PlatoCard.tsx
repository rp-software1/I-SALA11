'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Plato } from '../../src/types';
import { usePedido } from '../../src/context/PedidoProvider';

interface PlatoCardProps { plato: Plato; }

const catStyle: Record<string, { dot: string; label: string; bg: string; text: string }> = {
  principal: { dot: '#ea580c', label: 'Principal',  bg: '#fff4ee', text: '#9a3412' },
  entrada:   { dot: '#16a34a', label: 'Entrada',    bg: '#f0fdf4', text: '#15803d' },
  postre:    { dot: '#9333ea', label: 'Postre',     bg: '#faf5ff', text: '#6b21a8' },
  bebida:    { dot: '#2563eb', label: 'Bebida',     bg: '#eff6ff', text: '#1d4ed8' },
};
const defaultCat = { dot: 'var(--gold)', label: 'Plato', bg: 'var(--gold-lt)', text: 'var(--gold-dk)' };

export default function PlatoCard({ plato }: PlatoCardProps) {
  const { agregarPlato } = usePedido();
  const [agregado, setAgregado] = useState(false);
  const cat = catStyle[plato.categoria] ?? defaultCat;

  const handleAgregar = () => {
    agregarPlato(plato);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1600);
  };

  return (
    <article style={{
      background: 'var(--white)',
      border: '1px solid var(--border)',
      borderRadius: '1.25rem',
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column', height: '100%',
      transition: 'box-shadow 0.2s, transform 0.2s',
      position: 'relative',
    }}
    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(26,23,18,0.12)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>

      {/* Franja de categoría */}
      <div style={{
        height: 5,
        background: `linear-gradient(90deg, ${cat.dot} 0%, ${cat.dot}99 100%)`,
      }}/>

      {/* Encabezado de tarjeta */}
      <div style={{ padding: '1.25rem 1.25rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
          {/* Categoría pill */}
          <span style={{
            background: cat.bg, color: cat.text,
            fontSize: '0.65rem', fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '0.25rem 0.7rem', borderRadius: 99,
            border: `1px solid ${cat.dot}30`,
            flexShrink: 0,
          }}>{cat.label}</span>

          {/* Rating */}
          {plato.rating && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
              fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-dk)',
              background: 'var(--gold-lt)',
              padding: '0.2rem 0.6rem', borderRadius: 99,
              flexShrink: 0,
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--gold)">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              {plato.rating.toFixed(1)}
            </span>
          )}
        </div>

        {/* Nombre */}
        <Link href={`/menu/${plato._id}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.2rem', fontWeight: 700,
            color: 'var(--ink)', margin: '0.75rem 0 0.5rem',
            lineHeight: 1.2, letterSpacing: '-0.02em',
          }}>
            {plato.nombre}
          </h3>
        </Link>

        {/* Descripción */}
        <p style={{
          fontSize: '0.83rem', color: 'var(--muted)',
          lineHeight: 1.65, margin: 0,
          overflow: 'hidden', display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
        }}>
          {plato.descripcion}
        </p>
      </div>

      {/* Ingredientes */}
      {plato.ingredientes && plato.ingredientes.length > 0 && (
        <div style={{ padding: '0.875rem 1.25rem 0', display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
          {plato.ingredientes.slice(0, 4).map(ing => (
            <span key={ing} style={{
              background: 'var(--cream)', border: '1px solid var(--border)',
              color: 'var(--ink-2)', fontSize: '0.68rem', fontWeight: 500,
              padding: '0.18rem 0.6rem', borderRadius: 99,
            }}>{ing}</span>
          ))}
          {plato.ingredientes.length > 4 && (
            <span style={{ color: 'var(--muted)', fontSize: '0.68rem', padding: '0.18rem 0.3rem' }}>
              +{plato.ingredientes.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Footer: precio + botón */}
      <div style={{
        padding: '1.25rem',
        marginTop: 'auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem',
        borderTop: '1px solid var(--border)',
      }}>
        <div>
          <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            Precio
          </div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.4rem', fontWeight: 900,
            color: 'var(--ink)', letterSpacing: '-0.03em',
          }}>
            S/ {plato.precio.toFixed(2)}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
          <button
            onClick={handleAgregar}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              background: agregado ? '#15803d' : 'var(--ink)',
              color: '#fff',
              fontWeight: 700, fontSize: '0.8rem',
              padding: '0.55rem 1.1rem', borderRadius: 99,
              border: 'none', cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: agregado ? '0 4px 12px rgba(21,128,61,0.3)' : '0 4px 12px rgba(26,23,18,0.2)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {agregado ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                Agregado
              </>
            ) : 'Agregar +'}
          </button>
          <Link href={`/menu/${plato._id}`} style={{
            fontSize: '0.7rem', fontWeight: 600, color: 'var(--muted)',
            textDecoration: 'none', transition: 'color 0.15s',
          }}>
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
}
