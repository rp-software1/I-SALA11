import { createContext, useContext, useState, ReactNode } from "react";

interface Plato {
    id: number;
    nombre: string;
    precio: number;
    disponible: boolean;
}

interface CarritoContextType {
    carrito: Plato[];
    agregarPlato: (plato: Plato) => void;
    vaciarCarrito: () => void;
    eliminarPlato: (id: number) => void;
    total: number;
}

const CarritoContext = createContext<CarritoContextType | null>(null);

export function CarritoProvider({ children }: { children: ReactNode }) {
    const [carrito, setCarrito] = useState<Plato[]>([]);

    const agregarPlato = (plato: Plato) => {
        setCarrito(prev => [...prev, plato]);
    };

    const eliminarPlato = (id: number) => {
        setCarrito(prev => {
            const idx = prev.findIndex(p => p.id === id);
            if (idx === -1) return prev;
            const next = [...prev];
            next.splice(idx, 1);
            return next;
        });
    };

    const vaciarCarrito = () => setCarrito([]);

    const total = carrito.reduce((acc, p) => acc + p.precio, 0);

    return (
        <CarritoContext.Provider value={{ carrito, agregarPlato, vaciarCarrito, eliminarPlato, total }}>
            {children}
        </CarritoContext.Provider>
    );
}

export function useCarrito(): CarritoContextType {
    const ctx = useContext(CarritoContext);
    if (!ctx) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
    return ctx;
}
