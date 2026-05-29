// Dia4
// app/mesa/[mesaId]/MesaDetalle.tsx
'use client';

import { useState, useTransition } from 'react';
import type { Mesa, EstadoMesa } from '../../../src/types';
import { cambiarEstadoMesa } from './actions';

interface MesaDetalleProps {
    mesa: Mesa;
}

// Estados posibles y sus colores
const ESTADOS: { valor: EstadoMesa; etiqueta: string; color: string }[] = [
    { valor: 'disponible', etiqueta: 'Disponible', color: 'bg-green-600 hover:bg-green-700' },
    { valor: 'ocupada', etiqueta: 'Ocupada', color: 'bg-red-600 hover:bg-red-700' },
    { valor: 'reservada', etiqueta: 'Reservada', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { valor: 'fuera_servicio', etiqueta: 'Fuera de servicio', color: 'bg-gray-500 hover:bg-gray-600' },
];

export default function MesaDetalle({ mesa }: MesaDetalleProps) {
    const [estadoActual, setEstadoActual] = useState<EstadoMesa>(mesa.estado);
    const [isPending, startTransition] = useTransition();

    const handleCambiarEstado = (nuevoEstado: EstadoMesa): void => {
        if (nuevoEstado === estadoActual) return;

        startTransition(async () => {
            const resultado = await cambiarEstadoMesa(mesa._id, nuevoEstado);
            if (resultado.ok) {
                setEstadoActual(nuevoEstado);
            } else {
                console.error("Error al cambiar estado:", resultado.error);
                alert(`Error: ${resultado.error}`);
            }
        });
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-3 font-medium">Cambiar estado de la mesa:</p>
            <div className="flex flex-wrap gap-2">
                {ESTADOS.map(({ valor, etiqueta, color }) => (
                    <button
                        key={valor}
                        onClick={() => handleCambiarEstado(valor)}
                        disabled={isPending || valor === estadoActual}
                        className={`px-4 py-2 rounded text-white text-sm font-medium transition-colors
              ${color}
              ${valor === estadoActual ? 'opacity-100 ring-2 ring-offset-2 ring-gray-400' : ''}
              ${isPending ? 'opacity-50 cursor-wait' : ''}
            `}
                    >
                        {valor === estadoActual ? `✓ ${etiqueta}` : etiqueta}
                    </button>
                ))}
            </div>
            {isPending && <p className="text-xs text-gray-400 mt-2">Actualizando...</p>}
        </div>
    );
}

