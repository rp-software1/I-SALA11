import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function OrderForm({ mesaNumero }) {
    const [plato, setPlato] = useState("");
    const [cantidad, setCantidad] = useState(1);
    const [enviando, setEnviando] = useState(false);
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        console.log("OrderForm montado — mesa disponible:", mesaNumero);
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "plato") setPlato(value);
        if (name === "cantidad") setCantidad(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setEnviando(true);
        setMensaje("");

        setTimeout(() => {
            setEnviando(false);
            setMensaje(`Comanda enviada: ${plato} x${cantidad}`);
            setPlato("");
            setCantidad(1);
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: "1px solid gray", padding: "10px", marginTop: "20px" }}>
            <h2>Comanda — Mesa {mesaNumero}</h2>

            <input
                name="plato"
                value={plato}
                onChange={handleChange}
                placeholder="Nombre del plato"
            />

            <input
                type="number"
                name="cantidad"
                value={cantidad}
                onChange={handleChange}
                min="1"
                style={{ marginLeft: "10px" }}
            />

            <button type="submit" disabled={enviando} style={{ marginLeft: "10px" }}>
                {enviando ? "Enviando..." : "Agregar a comanda"}
            </button>

            {mensaje && <p>{mensaje}</p>}
        </form>
    );
}

OrderForm.propTypes = {
    mesaNumero: PropTypes.number.isRequired,
};

export default OrderForm;