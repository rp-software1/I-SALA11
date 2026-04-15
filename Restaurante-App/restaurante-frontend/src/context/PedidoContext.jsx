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