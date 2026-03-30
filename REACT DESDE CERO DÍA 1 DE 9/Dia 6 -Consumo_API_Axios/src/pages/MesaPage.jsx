import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getMesas } from "../services/api";
import { mesasMock } from "../data/mesas.mock";
import MesaCard from "../components/MesaCard";

function MesasPage() {
    const { loading, error, data } = useFetch(() =>
        getMesas().catch(() => mesasMock)
    );

    if (loading) return <p style={{ padding: "20px" }}>Cargando mesas...</p>;
    if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Mesas del Restaurante</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {(Array.isArray(data) ? data : []).map(mesa => (
                    <Link key={mesa.id} to={`/mesas/${mesa.id}`} style={{ textDecoration: "none" }}>
                        <MesaCard
                            numero={mesa.numero}
                            capacidad={mesa.capacidad}
                            estado={mesa.estado}
                            comensales={mesa.comensales}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default MesasPage;