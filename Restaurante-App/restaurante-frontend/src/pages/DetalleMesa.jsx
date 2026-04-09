import { useParams, Link, useNavigate } from "react-router-dom";
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