import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página no encontrada — Sistema de Restaurante',
};

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto text-center py-20 px-6">
      <h1 className="text-7xl font-black text-amber-600 tracking-tight">404</h1>
      <h2 className="text-xl font-bold text-slate-800 mt-4">Página no encontrada</h2>
      <p className="text-slate-500 mt-2 mb-8 text-sm leading-relaxed">
        Lo sentimos, la página que estás buscando no existe en el sistema de gestión del restaurante.
      </p>
      <Link
        href="/mesas"
        className="btn-primary inline-flex px-6 py-3"
      >
        Volver a las mesas
      </Link>
    </div>
  );
}
