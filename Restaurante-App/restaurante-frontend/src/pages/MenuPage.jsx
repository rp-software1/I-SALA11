import { useEffect, useState } from "react";
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

            {/* Dia8 - Badge */}
            {totalItems > 0 && (
                <p>🛒 Items en comanda: {totalItems}</p>
            )}

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