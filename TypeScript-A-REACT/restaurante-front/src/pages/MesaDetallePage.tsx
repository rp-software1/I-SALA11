import { useParams, useNavigate } from "react-router-dom";
import { mesasMock } from "../data/mesas.mock";

function MesaDetallePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const mesa = mesasMock.find(m => m.id === Number(id));

    if (!mesa) return <p style={{ padding: "20px" }}>Mesa no encontrada</p>;

    return (
        <div style={{ padding: "20px" }}>
            <button onClick={() => navigate("/mesas")}>← Volver a mesas</button>
            <h1>Mesa {mesa.numero}</h1>
            <p>Capacidad: {mesa.capacidad} personas</p>
            <p>Comensales actuales: {mesa.comensales}</p>
            <p>Estado: {mesa.estado === "libre" ? "🟢 Libre" : mesa.estado === "ocupada" ? "🔴 Ocupada" : "🟡 Reservada"}</p>
        </div>
    );
}

export default MesaDetallePage;