// Client Component — el botón 'Agregar' necesita estado local y eventos
/*'use client';

import { useState } from 'react';
import type { Plato } from '../../src/types';

interface PlatoCardProps {
    plato: Plato;
}

export default function PlatoCard({ plato }: PlatoCardProps) {
    // Estado local para feedback visual — el Context llega en Día 3
    const [agregado, setAgregado] = useState<boolean>(false);

    const handleAgregar = (): void => {
        // TODO Día 3: llamar a agregarPlato(plato) del PedidoContext
        setAgregado(true);
        setTimeout(() => setAgregado(false), 1500);
    };

    // Estilo del botón basado en el estado local
    const btnClass = agregado
        ? 'bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700'
        : 'bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700';

    return (
        <div className="border rounded-lg p-4 bg-white shadow-sm">
            <h3 className="font-bold text-lg mb-1">{plato.nombre}</h3>
            <p className="text-sm text-gray-500 mb-2">{plato.descripcion}</p>
            <p className="text-sm text-gray-400 mb-3 capitalize">{plato.categoria}</p>
            <div className="flex justify-between items-center">
                <span className="font-bold text-blue-700">S/ {plato.precio.toFixed(2)}</span>
                <button
                    onClick={handleAgregar}
                    className={btnClass}
                >
                    {agregado ? '✓ Agregado' : 'Agregar'}
                </button>
            </div>
        </div>
    );
}
*/

// =================================================================================================

// Dia3 - PedidoContext
'use client';

import { useState } from 'react';
import type { Plato } from '../../src/types';
import { usePedido } from '../../src/context/PedidoProvider';

interface PlatoCardProps {
    plato: Plato;
}

export default function PlatoCard({ plato }: PlatoCardProps) {
    const { agregarPlato } = usePedido();
    const [agregado, setAgregado] = useState<boolean>(false);

    const handleAgregar = (): void => {
        agregarPlato(plato);         // ← Context real — reemplaza el TODO
        setAgregado(true);           // ← feedback visual — se mantiene
        setTimeout(() => setAgregado(false), 1500);
    };

    return (
        <div className="border rounded-lg p-4 bg-white shadow-sm">
            <h3 className="font-bold text-lg mb-1">{plato.nombre}</h3>
            <p className="text-sm text-gray-500 mb-2">{plato.descripcion}</p>
            <p className="text-sm text-gray-400 mb-3 capitalize">{plato.categoria}</p>
            <div className="flex justify-between items-center">
                <span className="font-bold text-blue-700">S/ {plato.precio.toFixed(2)}</span>
                <button
                    onClick={handleAgregar}
                    className={`px-4 py-1 rounded text-sm font-medium transition-colors ${agregado ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                >
                    {agregado ? '✓ Agregado' : 'Agregar'}
                </button>
            </div>
        </div>
    );
}
