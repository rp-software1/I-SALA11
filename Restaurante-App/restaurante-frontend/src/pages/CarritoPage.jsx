import { useEffect, useState } from "react";
import { platosMock } from "../data/platos.mock";

const CarritoPage = () => {
    const [platos, setPlatos] = useState([]);

    const [carrito, setCarrito] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setPlatos(platosMock);
            setLoading(false);
        }, 800);
    }, []);

    const agregarPlato = (plato) => {
        const existe = carrito.find((item) => item.id === plato.id);

        if (existe) {
            setCarrito(
                carrito.map((item) =>
                    item.id === plato.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                )
            );
        } else {
            setCarrito([...carrito, { ...plato, cantidad: 1 }]);
        }
    };

    const quitarPlato = (id) => {
        setCarrito(carrito.filter((item) => item.id !== id));
    };

    const limpiarComanda = () => {
        setCarrito([]);
    };

    const total = carrito.reduce(
        (sum, item) => sum + item.precio * item.cantidad,
        0
    );

    if (loading) {
        return <p>Cargando menú...</p>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Carrito de Comandas</h1>

            <h2>Menú disponible</h2>
            {platos.map((plato) => (
                <div
                    key={plato.id}
                    style={{
                        border: "1px solid gray",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <p><strong>{plato.nombre}</strong></p>
                    <p>Categoría: {plato.categoria}</p>
                    <p>Precio: S/ {plato.precio}</p>
                    <button onClick={() => agregarPlato(plato)}>Agregar</button>
                </div>
            ))}

            <hr />

            <h2>Comanda ({carrito.length} platos distintos)</h2>

            {carrito.length === 0 ? (
                <p>No hay platos en la comanda.</p>
            ) : (
                carrito.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            border: "1px solid black",
                            padding: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        <p><strong>{item.nombre}</strong></p>
                        <p>Precio: S/ {item.precio}</p>
                        <p>Cantidad: {item.cantidad}</p>
                        <p>Subtotal: S/ {item.precio * item.cantidad}</p>
                        <button onClick={() => quitarPlato(item.id)}>Quitar</button>
                    </div>
                ))
            )}

            <h3>Total: S/ {total}</h3>

            <button onClick={limpiarComanda}>Limpiar comanda</button>
        </div>
    );
};

export default CarritoPage;