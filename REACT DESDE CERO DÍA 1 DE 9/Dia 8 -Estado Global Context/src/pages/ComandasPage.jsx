import { useState } from "react";
import OrderForm from "../components/OrderForm";
import { mesasMock } from "../data/mesas.mock";

function ComandasPage() {
    const [mesaSeleccionada, setMesaSeleccionada] = useState(mesasMock[0].numero);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Comandas</h1>
            <label>Seleccionar mesa: </label>
            <select
                value={mesaSeleccionada}
                onChange={(e) => setMesaSeleccionada(Number(e.target.value))}
            >
                {mesasMock.map(mesa => (
                    <option key={mesa.id} value={mesa.numero}>
                        Mesa {mesa.numero} — {mesa.estado}
                    </option>
                ))}
            </select>
            <OrderForm mesaNumero={mesaSeleccionada} />
        </div>
    );
}

export default ComandasPage;