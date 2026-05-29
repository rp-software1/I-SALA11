import FeatureCards from './components/FeatureCards';

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 10c0 3.866 1.79 7.328 4.576 9.576M16.424 19.576C19.21 17.328 21 13.866 21 10M3.5 10c0 3.59 1.41 7.03 3.954 9.472M3 10a9 9 0 0 1 18 0"/>
      </svg>
    ),
    title: 'Pedidos rápidos',
    desc: 'Ordena desde el menú digital, asigna tu mesa y envía la comanda en segundos sin esperar al mozo.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'En tiempo real',
    desc: 'Consulta el estado de cada mesa y las comandas activas al instante para una gestión eficiente.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Sabores auténticos',
    desc: 'Recetas peruanas tradicionales elaboradas con ingredientes frescos del mercado cada mañana.',
  },
];

export default function Home() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, var(--ink) 0%, #2d2620 60%, #3d3020 100%)',
        padding: '6rem 1.5rem 5rem',
        textAlign: 'center',
      }}>
        {/* Luces de fondo */}
        <div style={{ position: 'absolute', width: 600, height: 600, top: '-20%', left: '-10%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,151,60,0.08) 0%, transparent 70%)', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', width: 400, height: 400, bottom: '-15%', right: '5%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,151,60,0.10) 0%, transparent 70%)', pointerEvents: 'none' }}/>

        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
          {/* Eyebrow */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ width: 32, height: 1, background: 'var(--gold)', opacity: 0.7 }}/>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              El Sabrocito
            </span>
            <div style={{ width: 32, height: 1, background: 'var(--gold)', opacity: 0.7 }}/>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 900, color: '#fff',
            letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '1.25rem',
          }}>
            Sabores que{' '}
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, var(--gold) 0%, #f0c46a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              enamoran
            </em>
          </h1>

          <p style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            color: 'rgba(255,255,255,0.60)',
            marginBottom: '2.5rem', lineHeight: 1.8,
          }}>
            Recetas peruanas auténticas, ingredientes frescos del día y una experiencia gastronómica que no olvidarás.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/menu" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--gold)', color: '#fff',
              fontWeight: 700, fontSize: '0.95rem',
              padding: '0.85rem 2rem', borderRadius: 99, textDecoration: 'none',
              boxShadow: '0 6px 24px rgba(200,151,60,0.45)',
            }}>
              Ver el Menú
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="/mesas" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(255,255,255,0.09)', color: '#fff',
              fontWeight: 600, fontSize: '0.95rem',
              padding: '0.85rem 2rem', borderRadius: 99, textDecoration: 'none',
              border: '1.5px solid rgba(255,255,255,0.18)',
              backdropFilter: 'blur(8px)',
            }}>
              Gestionar Mesas
            </a>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: '2.5rem', justifyContent: 'center', flexWrap: 'wrap',
            marginTop: '3.5rem', paddingTop: '2.5rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}>
            {[
              { num: '5',   label: 'Platos estrella' },
              { num: '5',   label: 'Mesas disponibles' },
              { num: '4.7★', label: 'Rating promedio' },
            ].map(({ num, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 900, color: 'var(--gold)' }}>
                  {num}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', fontWeight: 500, marginTop: '0.1rem' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{
            display: 'inline-block',
            background: 'var(--gold-lt)', border: '1px solid rgba(200,151,60,0.3)',
            borderRadius: 99, padding: '0.3rem 1rem', marginBottom: '1rem',
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--gold-dk)',
          }}>
            ¿Por qué elegirnos?
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 900, color: 'var(--ink)',
            letterSpacing: '-0.03em',
          }}>
            Una experiencia completa
          </h2>
        </div>

        <FeatureCards features={features} />

        {/* CTA bottom */}
        <div style={{
          marginTop: '3rem', textAlign: 'center',
          padding: '2.5rem',
          background: 'linear-gradient(135deg, var(--ink) 0%, #2d2620 100%)',
          borderRadius: '1.5rem',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(200,151,60,0.08)', pointerEvents: 'none' }}/>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', position: 'relative' }}>
            ¿Listo para ordenar en <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>El Sabrocito</em>?
          </p>
          <p style={{ color: 'rgba(255,255,255,0.50)', fontSize: '0.875rem', marginBottom: '1.5rem', position: 'relative', fontFamily: "'DM Sans', sans-serif" }}>
            Explora todos nuestros platos y crea tu comanda en minutos.
          </p>
          <a href="/menu" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--gold)', color: '#fff',
            fontWeight: 700, fontSize: '0.9rem',
            padding: '0.75rem 1.75rem', borderRadius: 99, textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(200,151,60,0.4)',
            position: 'relative',
          }}>
            Ir al Menú
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
