// TYPESCRIPT D2

import React, { createContext, useContext, useState } from 'react';
import type {
    Plato,
    TipoPedido,
    EstadoPedidoContext,
    PedidoContextType,
} from '../types';

// inicio
const initialState: EstadoPedidoContext = {
    mesaId: null,
    tipo: 'para_llevar',
    estado: 'pendiente',
    items: [],
    total: 0,
};

const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

// Props Provider
interface PedidoProviderProps {
    children: React.ReactNode;
}

// Provider
export function PedidoProvider({ children }: PedidoProviderProps) {
    const [pedido, setPedido] = useState<EstadoPedidoContext>(initialState);

    function agregarPlato(plato: Plato): void {
        setPedido(prev => {
            const existente = prev.items.find(
                item => item.platoId === plato._id
            );

            if (existente) {
                return {
                    ...prev,
                    items: prev.items.map(item =>
                        item.platoId === plato._id
                            ? { ...item, cantidad: item.cantidad + 1 }
                            : item
                    ),
                    total: prev.total + plato.precio,
                };
            }

            return {
                ...prev,
                items: [
                    ...prev.items,
                    {
                        platoId: plato._id,
                        nombre: plato.nombre,
                        cantidad: 1,
                        precioUnitario: plato.precio,
                    },
                ],
                total: prev.total + plato.precio,
            };
        });
    }

    function quitarPlato(platoId: string): void {
        setPedido(prev => {
            const item = prev.items.find(i => i.platoId === platoId);
            if (!item) return prev;

            if (item.cantidad === 1) {
                return {
                    ...prev,
                    items: prev.items.filter(i => i.platoId !== platoId),
                    total: prev.total - item.precioUnitario,
                };
            }

            return {
                ...prev,
                items: prev.items.map(i =>
                    i.platoId === platoId
                        ? { ...i, cantidad: i.cantidad - 1 }
                        : i
                ),
                total: prev.total - item.precioUnitario,
            };
        });
    }

    function cambiarTipo(tipo: TipoPedido): void {
        setPedido(prev => ({ ...prev, tipo }));
    }

    function asignarMesa(mesaId: string): void {
        setPedido(prev => ({
            ...prev,
            mesaId,
            tipo: 'mesa',
        }));
    }

    function limpiarPedido(): void {
        setPedido(initialState);
    }

    const value: PedidoContextType = {
        pedido,
        agregarPlato,
        quitarPlato,
        cambiarTipo,
        asignarMesa,
        limpiarPedido,
    };

    return (
        <PedidoContext.Provider value={value}>
            {children}
        </PedidoContext.Provider>
    );
}

// Hook
export function usePedido(): PedidoContextType {
    const context = useContext(PedidoContext);

    if (!context) {
        throw new Error('usePedido debe usarse dentro de un PedidoProvider');
    }

    return context;
}

export default PedidoContext;


// ---------------------------------------------------------------------------------


/*
import { createContext, useContext, useState } from 'react';

const PedidoContext = createContext(null);

const estadoInicial = {
    mesaId: null,
    tipo: 'mesa',
    estado: 'pendiente',
    items: [],
    total: 0,
};

export function PedidoProvider({ children }) {
    const [pedido, setPedido] = useState(estadoInicial);

    return (
        <PedidoContext.Provider value={{ pedido, setPedido }}>
            {children}
        </PedidoContext.Provider>
    );
}

export function usePedido() {
    const context = useContext(PedidoContext);
    if (!context) throw new Error('Debe usarse dentro de PedidoProvider');
    return context;
}
*/