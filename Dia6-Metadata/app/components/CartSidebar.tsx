'use client';

import Link from 'next/link';
import { usePedido } from '../../src/context/PedidoProvider';
import type { ItemPedido } from '../../src/types';

export default function CartSidebar() {
  const { pedido, carritoAbierto, cerrarCarrito, quitarPlato } = usePedido();

  const total = pedido.items.reduce(
    (acc: number, item: ItemPedido) => acc + item.precioUnitario * item.cantidad,
    0
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop${carritoAbierto ? ' visible' : ''}`}
        onClick={cerrarCarrito}
      />

      {/* Sidebar */}
      <aside className={`cart-sidebar${carritoAbierto ? ' open' : ''}`}>
        <div className="cart-sidebar-inner">

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
            <div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.25rem', fontWeight: 700, color: '#fff',
              }}>
                Tu carrito
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.1rem' }}>
                {pedido.items.length} {pedido.items.length === 1 ? 'artículo' : 'artículos'}
              </p>
            </div>
            <button
              onClick={cerrarCarrito}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 99, width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(255,255,255,0.6)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Tipo de pedido */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: '0.875rem',
            padding: '0.875rem 1rem',
            marginBottom: '1.25rem',
          }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.25rem' }}>
              Tipo de pedido
            </div>
            <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>
              {pedido.tipo === 'mesa' ? 'En mesa' : 'Para llevar'}
            </div>
            {pedido.tipo === 'mesa' && (
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.2rem' }}>
                {pedido.mesaId ? `Mesa: ${pedido.mesaId}` : 'Sin mesa asignada'}
              </div>
            )}
          </div>

          {/* Items — scrollable */}
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1.25rem' }}>
            {pedido.items.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '2.5rem 1rem',
                border: '1px dashed rgba(255,255,255,0.15)',
                borderRadius: '1rem',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 0.75rem' }}>
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)' }}>
                  Tu carrito está vacío
                </p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', marginTop: '0.25rem' }}>
                  Agrega platos desde el menú
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {pedido.items.map((item) => (
                  <div key={item.platoId} style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0.875rem',
                    padding: '0.875rem 1rem',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem',
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.nombre}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.15rem' }}>
                        x{item.cantidad} · S/ {(item.precioUnitario * item.cantidad).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => quitarPlato(item.platoId)}
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.10)',
                        borderRadius: 99, width: 28, height: 28,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: 'rgba(255,255,255,0.45)',
                        flexShrink: 0, transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; e.currentTarget.style.color = '#f87171'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                      title="Quitar"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Total comanda</span>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.5rem', fontWeight: 900, color: 'var(--gold)',
              }}>
                S/ {total.toFixed(2)}
              </span>
            </div>
            <Link
              href="/carrito"
              onClick={cerrarCarrito}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                width: '100%',
                background: 'var(--gold)',
                color: '#fff',
                fontWeight: 700, fontSize: '0.9rem',
                padding: '0.85rem',
                borderRadius: 99, textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(200,151,60,0.4)',
                transition: 'all 0.15s',
              }}
            >
              Revisar pedido
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
