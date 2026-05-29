import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Página no encontrada — Restaurante',
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center animate-fade-in-up">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🍽️</div>
        <h1 className="text-7xl font-bold text-gray-200 mb-2">404</h1>
        <p className="text-xl text-gray-600 font-medium mb-2">Página no encontrada</p>
        <p className="text-gray-400 mb-8">La página que buscas no existe o fue movida.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-brand-700 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            Ir al inicio
          </Link>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-2.5 rounded-xl font-medium border border-gray-200 hover:bg-gray-50 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            Ver menú
          </Link>
        </div>
      </div>
    </div>
  );
}
