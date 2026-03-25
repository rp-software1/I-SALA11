import MesaCard from "../components/MesaCard";
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

export default MesasPage;