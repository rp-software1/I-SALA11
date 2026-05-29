'use client';

import { createContext, useContext, useState } from 'react';
import type {
  Plato,
  TipoPedido,
  EstadoPedidoContext,
  PedidoContextType,
} from '../types';

const initialState: EstadoPedidoContext = {
  mesaId: null,
  tipo: 'para_llevar',
  estado: 'pendiente',
  items: [],
  total: 0,
};

const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

export function usePedido(): PedidoContextType {
  const ctx = useContext(PedidoContext);
  if (!ctx) throw new Error('usePedido debe usarse dentro de PedidoProvider');
  return ctx;
}

export default function PedidoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pedido, setPedido] = useState<EstadoPedidoContext>(initialState);

  function agregarPlato(plato: Plato): void {
    setPedido(prev => {
      const existente = prev.items.find(i => i.platoId === plato._id);
      if (existente) {
        return {
          ...prev,
          items: prev.items.map(i =>
            i.platoId === plato._id ? { ...i, cantidad: i.cantidad + 1 } : i
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
          i.platoId === platoId ? { ...i, cantidad: i.cantidad - 1 } : i
        ),
        total: prev.total - item.precioUnitario,
      };
    });
  }

  function cambiarTipo(tipo: TipoPedido): void {
    setPedido(prev => ({ ...prev, tipo }));
  }

  function asignarMesa(mesaId: string): void {
    setPedido(prev => ({ ...prev, mesaId, tipo: 'mesa' }));
  }

  function limpiarPedido(): void {
    setPedido(initialState);
  }

  return (
    <PedidoContext.Provider
      value={{
        pedido,
        agregarPlato,
        quitarPlato,
        cambiarTipo,
        asignarMesa,
        limpiarPedido,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}
