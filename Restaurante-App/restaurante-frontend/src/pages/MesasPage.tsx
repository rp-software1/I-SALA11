/*import MesaCard from "../components/MesaCard";
import { mesasMock } from "../data/mesas.mock";

const MesasPage = () => {
    return (
        <div>
            <h1>Mesas del Restaurante</h1>

            {mesasMock.map((mesa) => (
                <MesaCard
                    key={mesa.id}
                    numero={mesa.numero}
                    capacidad={mesa.capacidad}
                    estado={mesa.estado}
                    comensales={mesa.comensales}
                />
            ))}
        </div>
    );
};

export default MesasPage;*/

// DIA 7
/*import { Link } from "react-router-dom";
import { mesasMock } from "../data/mesas.mock";

export default function MesasPage() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Mesas del Restaurante</h1>

            {mesasMock.map((mesa) => (
                <div
                    key={mesa.id}
                    style={{
                        border: "1px solid gray",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <h3>Mesa {mesa.numero}</h3>
                    <p>Capacidad: {mesa.capacidad}</p>
                    <p>Estado: {mesa.disponible ? "Disponible" : "Ocupada"}</p>

                    <Link to={`/mesas/${mesa.id}`}>Ver detalle</Link>
                </div>
            ))}
        </div>
    );
}

*/

// DIA 8 ESTADO GLOBAL CON CONTEXT API
/*import { useEffect, useState } from "react";
import { getMesas } from "../services/api";
import { usePedido } from "../context/PedidoContext";
import { useNavigate } from "react-router-dom";

export default function MesasPage() {
    const [mesas, setMesas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { asignarMesa } = usePedido();
    const navigate = useNavigate();

    useEffect(() => {
        async function cargarMesas() {
            try {
                const data = await getMesas();
                setMesas(data);
            } catch {
                setError("Error al cargar mesas");
            } finally {
                setLoading(false);
            }
        }

        cargarMesas();
    }, []);

    function seleccionarMesa(mesa) {
        asignarMesa(mesa._id);
        navigate("/carrito");
    }

    if (loading) return <p>Cargando mesas...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Mesas</h1>

            {mesas.map((mesa) => (
                <div key={mesa._id}>
                    <h3>Mesa {mesa.numero}</h3>
                    <p>Estado: {mesa.estado}</p>

                    {mesa.estado === "disponible" && (
                        <button onClick={() => seleccionarMesa(mesa)}>
                            Seleccionar
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
*/

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Mesa } from '../types';
import { getMesas } from '../services/api';
import { usePedido } from '../context/PedidoContext';
import MesaCard from '../components/MesaCard';

function MesasPage() {
    const [mesas, setMesas] = useState<Mesa[]>([]);
    const [cargando, setCargando] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const { asignarMesa } = usePedido();

    useEffect(() => {
        const cargarMesas = async (): Promise<void> => {
            setCargando(true);
            try {
                const data: Mesa[] = await getMesas();
                setMesas(data);
            } catch (err: unknown) {
                const mensaje =
                    err instanceof Error ? err.message : "Error al cargar las mesas";
                setError(mensaje);
            } finally {
                setCargando(false);
            }
        };

        cargarMesas();
    }, []);

    const handleSeleccionarMesa = (mesa: Mesa): void => {
        asignarMesa(mesa._id);
        navigate('/carrito');
    };

    if (cargando) return <p>Cargando mesas...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {mesas.map((mesa: Mesa) => (
                <MesaCard
                    key={mesa._id}
                    mesa={mesa}
                    onClick={handleSeleccionarMesa}
                />
            ))}
        </div>
    );
}

export default MesasPage;