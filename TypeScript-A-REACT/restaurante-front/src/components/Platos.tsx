import { platosMock } from "../data/platos.mock";
import { useCarrito } from "../context/CarritoContext";

function Platos() {
    const { agregarPlato } = useCarrito();

    return (
        <div>
            <h2 style={{ marginBottom: "12px" }}>Platos disponibles</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {platosMock.filter(p => p.disponible).map(plato => (
                    <div
                        key={plato.id}
                        style={{
                            border: "1px solid #e0e0e0",
                            borderRadius: "10px",
                            padding: "14px",
                            width: "170px",
                            background: "#fff",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
                        }}
                    >
                        <h3 style={{ fontSize: "0.95rem", marginBottom: "6px" }}>{plato.nombre}</h3>
                        <p style={{ color: "#6b6b6b", fontSize: "0.8rem", marginBottom: "4px" }}>{plato.categoria}</p>
                        <p style={{ fontWeight: 700, color: "#e85d04", marginBottom: "10px" }}>
                            S/ {plato.enOferta && plato.precioOferta ? plato.precioOferta : plato.precio}
                            {plato.enOferta && (
                                <span style={{ fontSize: "0.7rem", color: "#28a745", marginLeft: "6px" }}>OFERTA</span>
                            )}
                        </p>
                        <button
                            onClick={() => agregarPlato({
                                id: plato.id,
                                nombre: plato.nombre,
                                precio: plato.enOferta && plato.precioOferta ? plato.precioOferta : plato.precio,
                                disponible: plato.disponible
                            })}
                            style={{ background: "#e85d04", color: "white", width: "100%", padding: "6px" }}
                        >
                            Agregar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Platos;
