import MesaCard from "../components/MesaCard";
import { mesasMock } from "../data/mesas.mock";

function MesasPage() {
    return (
        <div>
            <h1>Mesas del Restaurante</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {mesasMock.map(mesa => (
                    <MesaCard
                        key={mesa.id}
                        numero={mesa.numero}
                        capacidad={mesa.capacidad}
                        estado={mesa.estado}
                        comensales={mesa.comensales}
                    />
                ))}
            </div>
        </div>
    );
}

export default MesasPage;