import type { Metadata } from 'next';
import type { Plato } from '../../src/types';
import { getPlatos } from '../../src/services/api';
import PlatoCard from './PlatoCard';

export const metadata: Metadata = {
    title: 'Menú',
    description: 'Menú completo del restaurante con platos disponibles y precios.',
};

export default async function MenuPage() {
    const platos: Plato[] = await getPlatos();

    // Filtrar solo platos disponibles
    const platosDisponibles = platos.filter(p => p.disponible);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Menú del Restaurante</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {platosDisponibles.map((plato: Plato) => (
                    <PlatoCard key={plato._id} plato={plato} />
                ))}
            </div>
            {platosDisponibles.length === 0 && (
                <p className="text-gray-500 text-center mt-8">No hay platos disponibles en este momento</p>
            )}
        </div>
    );
}
