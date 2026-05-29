// Dia3 - 
// Server Component — SIN "use client"
// Puede importar Client Components (como PedidoProvider y NavBar)
import type { Metadata } from 'next';
import './globals.css';
import NavBar from './components/NavBar';
import PedidoProvider from '../src/context/PedidoProvider';

export const metadata: Metadata = {
  title: {
    default: 'Sistema de Restaurante',
    template: '%s — Sistema de Restaurante',
  },
  description: 'Panel de gestión de mesas, menú y comandas del restaurante.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Sistema de Restaurante',
    description: 'Panel de gestión de mesas, menú y comandas del restaurante.',
    type: 'website',
    locale: 'es_PE',
  },
  twitter: {
    card: 'summary',
    title: 'Sistema de Restaurante',
    description: 'Panel de gestión de mesas, menú y comandas del restaurante.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 min-h-screen">
        {/* PedidoProvider envuelve todo — sus hijos pueden leer el Context */}
        <PedidoProvider>
          <NavBar />
          <main className="p-6">{children}</main>
        </PedidoProvider>
      </body>
    </html>
  );
}
