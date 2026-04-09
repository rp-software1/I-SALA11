import { useEffect, useState } from "react";
import { getPlatos } from "../services/api";
import PlatoCard from "../components/PlatoCard";

export default function MenuPage() {
    const [platos, setPlatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    function agregarPlato(plato) {
        alert(`Agregaste: ${plato.nombre}`);
    }

    if (loading) return <p>Cargando el menú del restaurante...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Menú del Restaurante</h1>

            {platos.map((plato) => (
                <PlatoCard
                    key={plato._id}
                    plato={plato}
                    onAgregar={agregarPlato}
                />
            ))}
        </div>
    );
}