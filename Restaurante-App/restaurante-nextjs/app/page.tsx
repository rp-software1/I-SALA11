import Link from 'next/link';
import { getMesas, getPlatos, getPedidos } from '../src/services/api';

export default async function Home() {
  let totalMesas = 0;
  let totalPlatos = 0;
  let totalPedidos = 0;

  try {
    const [mesas, platos, pedidos] = await Promise.all([
      getMesas(),
      getPlatos(),
      getPedidos(),
    ]);
    totalMesas = mesas.length;
    totalPlatos = platos.filter(p => p.disponible).length;
    totalPedidos = pedidos.filter(
      p => p.estado !== 'cerrada' && p.estado !== 'entregada' && p.estado !== 'cancelada'
    ).length;
  } catch {}

  const stats = [
    { label: 'Mesas', value: totalMesas, icon: '🪑', href: '/mesas' },
    { label: 'Platos', value: totalPlatos, icon: '🍽️', href: '/menu' },
    { label: 'Activos', value: totalPedidos, icon: '📋', href: '/comandas' },
  ];

  return (
    <div className="animate-fade-in-up">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white mb-12">
        <div className="relative px-8 py-16 sm:px-12 sm:py-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Restaurante
          </h1>
          <p className="text-lg sm:text-xl text-brand-100 max-w-2xl mb-8">
            Sistema de gestión — mesas, menú y comandas en un solo lugar.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/mesas"
              className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-6 py-3 rounded-xl hover:bg-brand-50 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Ver Mesas
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/30 transition-all hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm"
            >
              Ver Menú
            </Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {stats.map(stat => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{stat.icon}</span>
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-brand-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          href="/carrito"
          className="flex items-center gap-4 rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
        >
          <span className="text-3xl">🛒</span>
          <div>
            <p className="font-semibold text-gray-900">Carrito</p>
            <p className="text-sm text-gray-500">Revisa tu pedido antes de enviarlo</p>
          </div>
        </Link>
        <Link
          href="/comandas"
          className="flex items-center gap-4 rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
        >
          <span className="text-3xl">📋</span>
          <div>
            <p className="font-semibold text-gray-900">Comandas</p>
            <p className="text-sm text-gray-500">Gestiona los pedidos activos</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
