import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState([]);

    const agregar = (plato) => setCarrito(prev => [...prev, plato]);
    const vaciar = () => setCarrito([]);
    const eliminar = (id) => setCarrito(prev => prev.filter(p => p.id !== id));

    return (
        <CarritoContext.Provider value={{ carrito, agregar, vaciar, eliminar }}>
            {children}
        </CarritoContext.Provider>
    );
}

export function useCarrito() {
    return useContext(CarritoContext);
}