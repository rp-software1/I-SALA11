import type { Metadata } from 'next';
import './globals.css';
import NavBar from './components/NavBar';
import PedidoProvider from '../src/context/PedidoProvider';

export const metadata: Metadata = {
  title: 'Sistema de Restaurante',
  description: 'Gestión de mesas, menú y comandas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 min-h-screen">
        <PedidoProvider>
          <NavBar />
          <main className="p-6">{children}</main>
        </PedidoProvider>
      </body>
    </html>
  );
}
