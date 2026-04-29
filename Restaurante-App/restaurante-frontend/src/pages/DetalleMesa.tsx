// TYPESCRIPT DIA3
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Mesa } from '../types';
import { getMesas } from '../services/api';

function DetalleMesa() {
    const { mesaId } = useParams<{ mesaId: string }>();
    const navigate = useNavigate();

    const [mesa, setMesa] = useState<Mesa | null>(null);
    const [cargando, setCargando] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!mesaId) {
            navigate('/mesas');
            return;
        }

        const cargarDetalle = async (): Promise<void> => {
            setCargando(true);
            try {
                const todas: Mesa[] = await getMesas();
                const encontrada = todas.find(m => m._id === mesaId) ?? null;
                setMesa(encontrada);
            } catch (err: unknown) {
                const mensaje =
                    err instanceof Error ? err.message : "Error al cargar la mesa";
                setError(mensaje);
            } finally {
                setCargando(false);
            }
        };

        cargarDetalle();
    }, [mesaId, navigate]);

    if (cargando) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!mesa) return <p>Mesa no encontrada</p>;

    return (
        <div>
            <h2>Mesa {mesa.numero}</h2>
            <p>Capacidad: {mesa.capacidad}</p>
            <p>Estado: {mesa.estado}</p>
        </div>
    );
}

export default DetalleMesa;


// Dia 9 - REACT
/*import { useParams, Link, useNavigate } from "react-router-dom";
import { mesasMock } from "../data/mesas.mock";

export default function DetalleMesa() {
    const { id } = useParams();
    const navigate = useNavigate();

    const mesa = mesasMock.find((m) => String(m.id) === id);

    if (!mesa) {
        return (
            <div style={{ padding: "20px" }}>
                <p style={{ color: "red" }}>Mesa {id} no encontrada</p>
                <button onClick={() => navigate("/mesas")}>
                    Volver a Mesas
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: "20px" }}>
            <Link to="/mesas">← Volver a Mesas</Link>

            <h1>Mesa {mesa.numero}</h1>
            <p>Capacidad: {mesa.capacidad}</p>
            <p>Estado: {mesa.disponible ? "Disponible" : "Ocupada"}</p>
        </div>
    );
}
*/