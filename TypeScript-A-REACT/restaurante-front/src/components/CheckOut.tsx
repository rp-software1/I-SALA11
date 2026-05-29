import { useCarrito } from "../context/CarritoContext";

function CheckOut() {
    const { carrito, vaciarCarrito, eliminarPlato, total } = useCarrito();

    const handleConfirmar = () => {
        if (carrito.length === 0) return;
        alert(`✅ Pedido confirmado!\nTotal: S/ ${total.toFixed(2)}\n\nGracias por su visita.`);
        vaciarCarrito();
    };

    if (carrito.length === 0) {
        return (
            <div style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                textAlign: "center",
                color: "#6b6b6b"
            }}>
                <p style={{ fontSize: "2rem" }}>🛒</p>
                <p>El carrito está vacío</p>
            </div>
        );
    }

    return (
        <div style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
        }}>
            <h2 style={{ marginBottom: "16px" }}>Resumen del pedido</h2>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                {carrito.map((item, idx) => (
                    <li key={idx} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 0",
                        borderBottom: "1px solid #f0f0f0"
                    }}>
                        <span>{item.nombre}</span>
                        <span style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                            <span style={{ color: "#e85d04", fontWeight: 600 }}>S/ {item.precio}</span>
                            <button
                                onClick={() => eliminarPlato(item.id)}
                                style={{ background: "#fee", color: "#dc3545", padding: "2px 8px", fontSize: "0.75rem" }}
                            >✕</button>
                        </span>
                    </li>
                ))}
            </ul>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1.1rem", marginBottom: "16px" }}>
                <span>Total:</span>
                <span style={{ color: "#e85d04" }}>S/ {total.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
                <button
                    onClick={vaciarCarrito}
                    style={{ background: "#f8d7da", color: "#dc3545", flex: 1 }}
                >
                    Vaciar
                </button>
                <button
                    onClick={handleConfirmar}
                    style={{ background: "#e85d04", color: "white", flex: 2 }}
                >
                    Confirmar pedido
                </button>
            </div>
        </div>
    );
}

export default CheckOut;
