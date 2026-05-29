import type { Metadata } from 'next';
import './globals.css';
import NavBar from './components/NavBar';
import CartSidebar from './components/CartSidebar';
import CartFloatButton from './components/CartFloatButton';
import PedidoProvider from '../src/context/PedidoProvider';

export const metadata: Metadata = {
  title: {
    default: 'El Sabrocito',
    template: '%s — El Sabrocito',
  },
  description: 'Restaurante peruano El Sabrocito — carta digital, gestión de mesas y comandas.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'El Sabrocito',
    description: 'Restaurante peruano El Sabrocito — carta digital, gestión de mesas y comandas.',
    type: 'website',
    locale: 'es_PE',
  },
  twitter: {
    card: 'summary',
    title: 'El Sabrocito',
    description: 'Restaurante peruano El Sabrocito — carta digital, gestión de mesas y comandas.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="app-bg min-h-screen flex flex-col">
        <PedidoProvider>
          <NavBar />
          <main className="flex-1">
            {children}
          </main>
          <CartSidebar />
          <CartFloatButton />
        </PedidoProvider>
      </body>
    </html>
  );
}
