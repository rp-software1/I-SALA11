// Dia3
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePedido } from '../../src/context/PedidoProvider';
import { enviarComanda } from './actions';
import type { ItemPedido } from '../../src/types';

export default function CarritoPage() {
    const {
        pedido,
        quitarPlato,
        limpiarPedido,
    } = usePedido();

    const router = useRouter();

    const [enviando, setEnviando] =
        useState<boolean>(false);

    const [confirmacion, setConfirmacion] =
        useState<string | null>(null);

    const [errorEnvio, setErrorEnvio] =
        useState<string | null>(null);

    // Actualizar title de la pestaña dinámicamente
    useEffect(() => {
        document.title = pedido.items.length > 0
            ? `Carrito (${pedido.items.length}) — Sistema de Restaurante`
            : 'Carrito — Sistema de Restaurante';
    }, [pedido.items.length]);

    // Calcular total visual
    const totalVisual = pedido.items.reduce(
        (acc: number, item: ItemPedido) =>
            acc +
            item.precioUnitario * item.cantidad,
        0
    );

    // Enviar pedido al backend
    const handleEnviar =
        async (): Promise<void> => {
            setEnviando(true);

            setErrorEnvio(null);

            const resultado =
                await enviarComanda(pedido);

            if (resultado.ok) {
                setConfirmacion(
                    resultado.pedidoId
                );

                limpiarPedido();
            } else {
                setErrorEnvio(
                    resultado.error
                );
            }

            setEnviando(false);
        };

    // Pantalla de confirmación
    if (confirmacion) {
        return (
            <div className="text-center mt-16">
                <p className="text-5xl mb-4">
                    ✅
                </p>

                <h1 className="text-2xl font-bold mb-2">
                    ¡Comanda enviada!
                </h1>

                <p className="text-gray-500 mb-2 text-sm font-mono">
                    ID: {confirmacion}
                </p>

                <button
                    onClick={() => {
                        setConfirmacion(
                            null
                        );

                        router.push(
                            '/mesas'
                        );
                    }}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Volver a las mesas
                </button>
            </div>
        );
    }

    // Carrito vacío
    if (pedido.items.length === 0) {
        return (
            <div className="text-center mt-16">
                <p className="text-5xl mb-4">
                    🛒
                </p>

                <h1 className="text-2xl font-bold mb-4">
                    El carrito está vacío
                </h1>

                <button
                    onClick={() =>
                        router.push(
                            '/menu'
                        )
                    }
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Ver el menú
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
                Tu Carrito
            </h1>

            {/* Lista de items */}
            <div className="space-y-3 mb-6">
                {pedido.items.map(
                    (item: ItemPedido) => (
                        <div
                            key={
                                item.platoId
                            }
                            className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm"
                        >
                            <div>
                                <p className="font-medium">
                                    {
                                        item.nombre
                                    }
                                </p>

                                <p className="text-sm text-gray-500">
                                    S/{' '}
                                    {item.precioUnitario.toFixed(
                                        2
                                    )}{' '}
                                    ×{' '}
                                    {
                                        item.cantidad
                                    }
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="font-bold">
                                    S/{' '}
                                    {(
                                        item.precioUnitario *
                                        item.cantidad
                                    ).toFixed(
                                        2
                                    )}
                                </span>

                                <button
                                    onClick={() =>
                                        quitarPlato(
                                            item.platoId
                                        )
                                    }
                                    className="text-red-500 hover:text-red-700 text-lg font-bold"
                                >
                                    −
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>

            {/* Total */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
                <div className="flex justify-between text-lg font-bold">
                    <span>
                        Total
                    </span>

                    <span>
                        S/{' '}
                        {totalVisual.toFixed(
                            2
                        )}
                    </span>
                </div>
            </div>

            {/* Error */}
            {errorEnvio && (
                <p className="text-red-500 text-sm mb-3">
                    {errorEnvio}
                </p>
            )}

            {/* Botón enviar */}
            <button
                onClick={
                    handleEnviar
                }
                disabled={
                    enviando
                }
                className="w-full bg-blue-600 text-white rounded py-3 font-bold hover:bg-blue-700 disabled:opacity-50"
            >
                {enviando
                    ? 'Enviando comanda...'
                    : 'Enviar comanda'}
            </button>

            {/* Vaciar carrito */}
            <button
                onClick={
                    limpiarPedido
                }
                className="w-full mt-2 border border-gray-300 rounded py-2 text-gray-500 hover:bg-gray-50"
            >
                Vaciar carrito
            </button>
        </div>
    );
}

// ===================================================================

/*
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Carrito — Restaurante',
};

export default function CarritoPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Carrito</h1>
            <p className="text-gray-500">Aquí irá el carrito de comandas — conectar en Día 4</p>
        </div>
    );
}
*/