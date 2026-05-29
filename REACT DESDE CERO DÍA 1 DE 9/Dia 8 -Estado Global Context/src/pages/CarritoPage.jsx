import { useCarrito } from "../context/CarritoContext";

function CarritoPage() {
    const { carrito, vaciar, eliminar } = useCarrito();
    const total = carrito.reduce((acc, p) => acc + p.precio, 0);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Carrito</h1>
            {carrito.length === 0
                ? <p>El carrito está vacío</p>
                : <>
                    <ul>
                        {carrito.map((p, i) => (
                            <li key={i} style={{ marginBottom: "6px" }}>
                                {p.nombre} — S/ {p.precio}
                                <button onClick={() => eliminar(p.id)} style={{ marginLeft: "8px" }}>x</button>
                            </li>
                        ))}
                    </ul>
                    <p><strong>Total: S/ {total}</strong></p>
                    <button onClick={vaciar}>Vaciar carrito</button>
                </>
            }
        </div>
    );
}

export default CarritoPage;