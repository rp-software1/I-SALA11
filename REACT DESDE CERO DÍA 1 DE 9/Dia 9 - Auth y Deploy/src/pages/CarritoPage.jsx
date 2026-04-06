import { useState, useEffect } from "react";
import { platosMock } from "../data/platos.mock";

function CarritoPage() {
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        console.log("CarritoPage montado");
    }, []);

    useEffect(() => {
        console.log("Carrito actualizado:", carrito);
    }, [carrito]);

    const agregarPlato = (plato) => {
        setCarrito(prev => [...prev, plato]);
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const total = carrito.reduce((acc, p) => acc + p.precio, 0);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Carrito de Comandas</h1>

            <h2>Platos disponibles</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {platosMock.filter(p => p.disponible).map(plato => (
                    <div key={plato.id} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "12px", width: "160px" }}>
                        <h3>{plato.nombre}</h3>
                        <p>S/ {plato.precio}</p>
                        <button onClick={() => agregarPlato(plato)}>Agregar</button>
                    </div>
                ))}
            </div>

            <h2>Mi carrito ({carrito.length} items)</h2>
            {carrito.length === 0
                ? <p>El carrito está vacío</p>
                : <>
                    <ul>
                        {carrito.map((p, i) => (
                            <li key={i}>{p.nombre} — S/ {p.precio}</li>
                        ))}
                    </ul>
                    <p><strong>Total: S/ {total}</strong></p>
                    <button onClick={vaciarCarrito}>Vaciar carrito</button>
                </>
            }
        </div>
    );
}

export default CarritoPage;