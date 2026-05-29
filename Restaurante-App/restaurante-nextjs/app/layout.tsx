// Dia3 - 
// Server Component — SIN "use client"
// Puede importar Client Components (como PedidoProvider y NavBar)
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from './components/NavBar';
import PedidoProvider from '../src/context/PedidoProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sistema de Restaurante',
  description: 'Gestión de mesas, menú y comandas',
  openGraph: {
    title: 'Sistema de Restaurante',
    description: 'Gestión de mesas, menú y comandas',
    url: 'https://i-sala-11.vercel.app',
    siteName: 'Restaurante',
    locale: 'es_PE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen antialiased`}>
        <PedidoProvider>
          <NavBar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        </PedidoProvider>
      </body>
    </html>
  );
}
