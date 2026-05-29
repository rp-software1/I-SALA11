'use client';

type Feature = { icon: React.ReactNode; title: string; desc: string };

export default function FeatureCards({ features }: { features: Feature[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '1.25rem',
    }}>
      {features.map(({ icon, title, desc }) => (
        <div key={title}
          style={{
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: '1.25rem',
            padding: '2rem',
            transition: 'box-shadow 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(26,23,18,0.10)';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          }}
        >
          <div style={{
            width: 52, height: 52, borderRadius: '0.875rem',
            background: 'var(--gold-lt)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '1.25rem',
            border: '1px solid rgba(200,151,60,0.2)',
          }}>
            {icon}
          </div>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.15rem', fontWeight: 700,
            color: 'var(--ink)', marginBottom: '0.5rem',
          }}>{title}</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7 }}>
            {desc}
          </p>
        </div>
      ))}
    </div>
  );
}
