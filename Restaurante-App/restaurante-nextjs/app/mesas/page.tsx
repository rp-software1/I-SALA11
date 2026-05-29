// Server Component — SIN "use client", SIN useState, SIN useEffect
import type { Metadata } from 'next';
import type { Mesa } from '../../src/types';
import { getMesas } from '../../src/services/api';
import MesaCard from './MesaCard';

export const metadata: Metadata = {
    title: 'Mesas',
    description: 'Gestiona las mesas del restaurante — ve su estado y asigna comandas.',
};

// La función es async — puede hacer await directamente
export default async function MesasPage() {
    // fetch ocurre en el servidor — el browser nunca ve esta llamada
    const mesas: Mesa[] = await getMesas();

    const disponibles = mesas.filter(m => m.estado === 'disponible').length;
    const ocupadas = mesas.filter(m => m.estado === 'ocupada').length;
    const reservadas = mesas.filter(m => m.estado === 'reservada').length;
    const fueraServicio = mesas.filter(m => m.estado === 'fuera_servicio').length;

    return (
        <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Mesas</h1>
                <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                    {mesas.length} mesas
                </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <div className="bg-green-50 rounded-xl px-4 py-3 border border-green-100">
                    <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Disponibles</p>
                    <p className="text-2xl font-bold text-green-700">{disponibles}</p>
                </div>
                <div className="bg-red-50 rounded-xl px-4 py-3 border border-red-100">
                    <p className="text-xs text-red-600 font-medium uppercase tracking-wide">Ocupadas</p>
                    <p className="text-2xl font-bold text-red-700">{ocupadas}</p>
                </div>
                <div className="bg-yellow-50 rounded-xl px-4 py-3 border border-yellow-100">
                    <p className="text-xs text-yellow-600 font-medium uppercase tracking-wide">Reservadas</p>
                    <p className="text-2xl font-bold text-yellow-700">{reservadas}</p>
                </div>
                <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Fuera servicio</p>
                    <p className="text-2xl font-bold text-gray-500">{fueraServicio}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {mesas.map((mesa: Mesa) => (
                    <MesaCard key={mesa._id} mesa={mesa} />
                ))}
            </div>
        </div>
    );
}
