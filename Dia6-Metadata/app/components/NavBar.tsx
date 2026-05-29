'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePedido } from '../../src/context/PedidoProvider';
import { useState } from 'react';

export default function NavBar() {
  const pathname = usePathname();
  const { pedido, toggleCarrito } = usePedido();
  const [open, setOpen] = useState(false);
  const totalItems = pedido.items.reduce((acc, item) => acc + item.cantidad, 0);
  const isActive = (r: string) => pathname === r;

  return (
    <header className="navbar-wrap">
      <div className="navbar-inner">
        {/* Brand */}
        <Link href="/" className="nav-brand" style={{ fontStyle: 'normal' }}>
          El{' '}
          <span style={{
            fontStyle: 'italic',
            background: 'linear-gradient(135deg, var(--gold) 0%, #e8b14a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Sabrocito</span>
        </Link>

        {/* Links desktop */}
        <nav className="nav-links hidden md:flex">
          <Link href="/mesas" className={`nav-link${isActive('/mesas') ? ' active' : ''}`}>Mesas</Link>
          <Link href="/menu"  className={`nav-link${isActive('/menu')  ? ' active' : ''}`}>Menú</Link>
          <Link href="/about" className={`nav-link${isActive('/about') ? ' active' : ''}`}>Nosotros</Link>
        </nav>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="hidden md:block" style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 500, letterSpacing: '0.01em' }}>
            +51 987 347 291
          </span>

          <button onClick={toggleCarrito} className="nav-cart">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Carrito
            {totalItems > 0 && <span className="nav-cart-badge">{totalItems}</span>}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
            style={{ background: 'none', border: '1.5px solid var(--border)', borderRadius: 8, padding: '0.4rem', cursor: 'pointer', display: 'flex', lineHeight: 0 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {open
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'var(--white)', borderTop: '1px solid var(--border)', padding: '0.75rem 1.5rem 1rem' }}>
          {[
            { href: '/mesas', label: 'Mesas' },
            { href: '/menu',  label: 'Menú' },
            { href: '/about', label: 'Nosotros' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className={`nav-link${isActive(href) ? ' active' : ''}`}
              style={{ display: 'block', marginBottom: '2px' }}>
              {label}
            </Link>
          ))}
          <button onClick={() => { toggleCarrito(); setOpen(false); }}
            style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '0.45rem 0.9rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--muted)', cursor: 'pointer', borderRadius: 99 }}>
            Carrito {totalItems > 0 && `(${totalItems})`}
          </button>
        </div>
      )}
    </header>
  );
}
