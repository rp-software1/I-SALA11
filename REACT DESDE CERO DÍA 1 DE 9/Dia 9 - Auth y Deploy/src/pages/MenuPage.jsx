import { useState, useEffect, useRef } from "react";
import { platosMock } from "../data/platos.mock";

function MenuPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            try {
                setData(platosMock);
                setLoading(false);
            } catch (e) {
                setError("Error al cargar los platos");
                setLoading(false);
            }
        }, 1500);
    }, []);

    useEffect(() => {
        if (!loading) inputRef.current?.focus();
    }, [loading]);

    const platosFiltrados = data.filter(p =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    if (loading) return <p style={{ padding: "20px" }}>Cargando platos...</p>;
    if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Menú</h1>
            <input
                ref={inputRef}
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                placeholder="Buscar plato..."
                style={{ padding: "8px", marginBottom: "16px", width: "200px" }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {platosFiltrados.map(plato => (
                    <div key={plato.id} style={{
                        border: plato.disponible ? "1px solid #ccc" : "1px solid red",
                        borderRadius: "8px", padding: "12px", width: "160px",
                        opacity: plato.disponible ? 1 : 0.5
                    }}>
                        <h3>{plato.nombre}</h3>
                        <p>S/ {plato.precio}</p>
                        <p>{plato.disponible ? "Disponible" : "Agotado"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MenuPage;