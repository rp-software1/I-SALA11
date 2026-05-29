import type { Metadata } from 'next';
import type { Plato } from '../../src/types';
import { platos as allPlatos } from '../api/data';
import MenuClient from './MenuClient';

export const metadata: Metadata = {
  title: 'Nuestra Carta',
  description: 'Menú completo de El Sabrocito con platos disponibles, precios e ingredientes.',
};

export default async function MenuPage() {
  const platos = allPlatos as Plato[];
  const platosDisponibles = platos.filter((p) => p.disponible);
  const categorias = Array.from(new Set(platosDisponibles.map((p) => p.categoria)));
  const destacados = platosDisponibles.filter((p) => p.rating && p.rating >= 4.5).length;

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* ── Page header ───────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, var(--ink) 0%, #2d2620 100%)',
        padding: '3rem 1.5rem 3.5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Círculo decorativo */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'rgba(200,151,60,0.07)', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', bottom: -40, left: '30%', width: 160, height: 160, borderRadius: '50%', background: 'rgba(200,151,60,0.05)', pointerEvents: 'none' }}/>

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <div style={{ width: 24, height: 1, background: 'var(--gold)', opacity: 0.6 }}/>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              Carta del día
            </span>
            <div style={{ width: 24, height: 1, background: 'var(--gold)', opacity: 0.6 }}/>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 900, color: '#fff',
            letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.75rem',
          }}>
            Nuestra carta
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', maxWidth: 480 }}>
            Elige entre sabores peruanos clásicos preparados al momento con ingredientes frescos del día.
          </p>

          {/* Stats pills */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { val: platosDisponibles.length, label: 'platos' },
              { val: categorias.length, label: 'categorías' },
              { val: destacados, label: 'destacados' },
            ].map(({ val, label }) => (
              <span key={label} style={{
                display: 'inline-flex', alignItems: 'baseline', gap: '0.35rem',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 99, padding: '0.35rem 0.9rem',
                fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)',
              }}>
                <strong style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: 'var(--gold)' }}>{val}</strong>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        <div style={{
          background: 'var(--white)',
          border: '1px solid var(--border)',
          borderRadius: '1.5rem',
          padding: '1.75rem',
          boxShadow: '0 4px 24px rgba(26,23,18,0.06)',
        }}>
          <MenuClient initialPlatos={platosDisponibles} />
        </div>

        {platosDisponibles.length === 0 && (
          <p style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--muted)', fontSize: '0.95rem' }}>
            No hay platos disponibles en este momento.
          </p>
        )}
      </div>
    </div>
  );
}
