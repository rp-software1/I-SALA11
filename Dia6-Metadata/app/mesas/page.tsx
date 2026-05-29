import type { Metadata } from 'next';
import type { Mesa } from '../../src/types';
import { getMesas } from '../../src/services/api';
import MesaCard from './MesaCard';

export const metadata: Metadata = {
  title: 'Mesas',
  description: 'Visualiza el estado de las mesas y gestiona comandas activas de El Sabrocito.',
};

export default async function MesasPage() {
  const mesas: Mesa[] = await getMesas();

  const disponibles = mesas.filter(m => m.estado === 'disponible').length;
  const ocupadas    = mesas.filter(m => m.estado === 'ocupada').length;
  const reservadas  = mesas.filter(m => m.estado === 'reservada').length;

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* ── Page header ───────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, var(--ink) 0%, #2d2620 100%)',
        padding: '3rem 1.5rem 3.5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(200,151,60,0.07)', pointerEvents: 'none' }}/>

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <div style={{ width: 24, height: 1, background: 'var(--gold)', opacity: 0.6 }}/>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              Gestión en vivo
            </span>
            <div style={{ width: 24, height: 1, background: 'var(--gold)', opacity: 0.6 }}/>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 900, color: '#fff',
            letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.75rem',
          }}>
            Mesas del restaurante
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', maxWidth: 480 }}>
            Visualiza en tiempo real el estado de cada mesa y gestiona comandas activas.
          </p>

          {/* Stats pills */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { val: disponibles, label: 'disponibles', color: '#22c55e' },
              { val: ocupadas,    label: 'ocupadas',    color: '#ef4444' },
              { val: reservadas,  label: 'reservadas',  color: '#f59e0b' },
            ].map(({ val, label, color }) => (
              <span key={label} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 99, padding: '0.35rem 0.9rem',
                fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }}/>
                <strong style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color }}>{val}</strong>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid de mesas ─────────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1rem',
        }}>
          {mesas.map((mesa: Mesa) => (
            <MesaCard key={mesa._id} mesa={mesa} />
          ))}
        </div>
      </div>
    </div>
  );
}
