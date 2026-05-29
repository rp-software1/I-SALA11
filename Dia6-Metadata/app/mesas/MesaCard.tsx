'use client';

import { useRouter } from 'next/navigation';
import type { Mesa } from '../../src/types';

interface MesaCardProps { mesa: Mesa; }

const estadoConfig: Record<Mesa['estado'], { bg: string; border: string; dot: string; dotGlow: string; label: string; btnBg: string; btnLabel: string; opacity: number }> = {
  disponible:     { bg: '#f0fdf6', border: '#86efac', dot: '#22c55e', dotGlow: 'rgba(34,197,94,0.35)', label: 'Disponible',     btnBg: '#166534', btnLabel: 'Asignar mesa',  opacity: 1 },
  ocupada:        { bg: '#fff1f2', border: '#fca5a5', dot: '#ef4444', dotGlow: 'rgba(239,68,68,0.35)',  label: 'Ocupada',        btnBg: '#9f1239', btnLabel: 'Ver comanda',   opacity: 1 },
  reservada:      { bg: '#fffbeb', border: '#fcd34d', dot: '#f59e0b', dotGlow: 'rgba(245,158,11,0.35)', label: 'Reservada',      btnBg: '#92400e', btnLabel: 'Reservada',    opacity: 1 },
  fuera_servicio: { bg: '#f8fafc', border: '#cbd5e1', dot: '#94a3b8', dotGlow: 'rgba(148,163,184,0.2)', label: 'Fuera de serv.', btnBg: '#64748b', btnLabel: 'Inactiva',     opacity: 0.55 },
};

export default function MesaCard({ mesa }: MesaCardProps) {
  const router = useRouter();
  const c = estadoConfig[mesa.estado];
  const clickable = mesa.estado !== 'fuera_servicio';

  return (
    <button
      onClick={() => clickable && router.push(`/mesas/${mesa._id}`)}
      disabled={!clickable}
      style={{
        width: '100%', textAlign: 'left',
        background: c.bg,
        border: `1.5px solid ${c.border}`,
        borderRadius: '1.25rem',
        padding: '1.5rem',
        cursor: clickable ? 'pointer' : 'not-allowed',
        opacity: c.opacity,
        transition: 'box-shadow 0.2s, transform 0.2s',
        display: 'flex', flexDirection: 'column', gap: '1rem',
        fontFamily: 'Inter, sans-serif',
      }}
      onMouseEnter={e => { if (clickable) { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 28px ${c.dotGlow}`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; } }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.2rem' }}>
            Mesa
          </div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2rem', fontWeight: 900, lineHeight: 1,
            color: 'var(--ink)',
          }}>
            {mesa.numero}
          </div>
        </div>

        {/* Status badge con glow dot */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          background: '#fff',
          border: `1px solid ${c.border}`,
          borderRadius: 99,
          padding: '0.3rem 0.75rem',
          boxShadow: `0 0 0 3px ${c.dotGlow}`,
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: c.dot,
            boxShadow: `0 0 6px ${c.dot}`,
            flexShrink: 0,
          }}/>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink-2)' }}>
            {c.label}
          </span>
        </div>
      </div>

      {/* Capacidad */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        borderTop: `1px solid ${c.border}44`,
        paddingTop: '0.875rem',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.15rem' }}>
            Capacidad
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink-2)' }}>
            {mesa.capacidad} personas
          </div>
        </div>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.15rem' }}>
            Comanda
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: mesa.pedidoActivoId ? 'var(--gold-dk)' : 'var(--muted)' }}>
            {mesa.pedidoActivoId ? 'Activa' : 'Sin comanda'}
          </div>
        </div>
      </div>

      {/* CTA */}
      {clickable && (
        <div style={{
          background: c.btnBg,
          color: '#fff',
          borderRadius: 99,
          padding: '0.55rem 1rem',
          textAlign: 'center',
          fontSize: '0.78rem', fontWeight: 700,
          letterSpacing: '0.03em',
          boxShadow: `0 3px 10px ${c.dotGlow}`,
        }}>
          {c.btnLabel}
        </div>
      )}
    </button>
  );
}
