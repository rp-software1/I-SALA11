import { useEffect } from "react";
import { useCarrito } from "../context/CarritoContext";
import CheckOut from "../components/CheckOut";
import Platos from "../components/Platos";

function CarritoPage() {
    const { carrito } = useCarrito();

    useEffect(() => {
        console.log("CarritoPage montado");
    }, []);

    useEffect(() => {
        console.log("Carrito actualizado:", carrito);
    }, [carrito]);

    return (
        <div style={{ padding: "20px", display: "flex", gap: "32px", flexWrap: "wrap" }}>
            <div style={{ flex: 2, minWidth: "300px" }}>
                <h1 style={{ marginBottom: "20px" }}>Carrito de Comandas</h1>
                <Platos />
            </div>
            <div style={{ flex: 1, minWidth: "260px" }}>
                <h2 style={{ marginBottom: "16px" }}>Mi carrito ({carrito.length} items)</h2>
                <CheckOut />
            </div>
        </div>
    );
}

export default CarritoPage;