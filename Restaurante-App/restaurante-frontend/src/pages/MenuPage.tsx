/*import { useEffect, useState } from "react";
import { getPlatos } from "../services/api";
import PlatoCard from "../components/PlatoCard";
// Dia8 - Estado Global con Context API
import { usePedido } from '../context/PedidoContext';

export default function MenuPage() {
    const [platos, setPlatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Dia8 - Estado Global con Context API
    const { pedido, agregarPlato } = usePedido();

    const totalItems = pedido.items.reduce((acc, i) => acc + i.cantidad, 0);


    useEffect(() => {
        async function cargarMenu() {
            try {
                setLoading(true);
                setError(null);

                const data = await getPlatos();
                setPlatos(data);
            } catch (err) {
                setError("No se pudo cargar el menú.");
            } finally {
                setLoading(false);
            }
        }

        cargarMenu();
    }, []);



    if (loading) return <p>Cargando el menú del restaurante...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Menú del Restaurante</h1>

            {/* Dia8 - Badge *///}
/*{
    totalItems > 0 && (
        <p>🛒 Items en comanda: {totalItems}</p>
    )
}

{
    platos.map((plato) => (
        <PlatoCard
            key={plato._id}
            plato={plato}
            onAgregar={agregarPlato}
        />
    ))
}
        </div >
    );
}
*/

// TYPESCRIPT - DIA 3
import { useState, useEffect } from 'react';
import type { Plato } from '../types';
import { usePedido } from '../context/PedidoContext';
import PlatoCard from '../components/PlatoCard';
import { getPlatos } from '../services/api';

function MenuPage() {
    const [platos, setPlatos] = useState<Plato[]>([]);
    const [cargando, setCargando] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const { agregarPlato } = usePedido();

    useEffect(() => {
        const cargarPlatos = async (): Promise<void> => {
            setCargando(true);
            try {
                const data: Plato[] = await getPlatos();
                setPlatos(data);
            } catch (err: unknown) {
                const mensaje =
                    err instanceof Error ? err.message : "Error al cargar el menú";
                setError(mensaje);
            } finally {
                setCargando(false);
            }
        };

        cargarPlatos();
    }, []);

    if (cargando) return <p>Cargando menú...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {platos.map((plato: Plato) => (
                <PlatoCard
                    key={plato._id}
                    plato={plato}
                    onAgregar={agregarPlato}
                />
            ))}
        </div>
    );
}

export default MenuPage;