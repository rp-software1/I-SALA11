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
import { Link } from "react-router-dom";
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