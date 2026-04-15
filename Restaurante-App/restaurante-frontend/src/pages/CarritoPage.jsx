// Dia 8 - Estado Global con Context API
/*import { usePedido } from '../context/PedidoContext';

export default function CarritoPage() {
    const { pedido, quitarPlato, limpiarPedido } = usePedido();

    return (
        <div style={{ padding: "20px" }}>
            <h1>Comanda activa</h1>

            {pedido.items.length === 0 ? (
                <p>No hay platos en la comanda.</p>
            ) : (
                pedido.items.map((item) => (
                    <div key={item.platoId}>
                        <p><strong>{item.nombre}</strong></p>
                        <p>Cantidad: {item.cantidad}</p>
                        <p>Subtotal: S/ {item.precioUnitario * item.cantidad}</p>

                        <button onClick={() => quitarPlato(item.platoId)}>
                            Quitar
                        </button>
                    </div>
                ))
            )}

            <h3>Total: S/ {pedido.total}</h3>

            <button onClick={limpiarPedido}>
                Limpiar comanda
            </button>
        </div>
    );
}

*/

import { useState } from "react";
import { usePedido } from "../context/PedidoContext";
import { crearPedido } from "../services/api";

export default function CarritoPage() {
    const { pedido, limpiarPedido } = usePedido();

    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState(null);
    const [pedidoCreado, setPedidoCreado] = useState(null);

    async function enviarComanda() {
        if (pedido.items.length === 0) return;

        setEnviando(true);
        setError(null);

        try {
            const res = await crearPedido({
                mesaId: pedido.mesaId,
                tipo: pedido.tipo,
                items: pedido.items
            });

            setPedidoCreado(res);
            limpiarPedido();

        } catch {
            setError("Error al enviar pedido");
        } finally {
            setEnviando(false);
        }
    }

    if (pedidoCreado) {
        return (
            <div>
                <h2>✅ Pedido creado</h2>
                <p>ID: {pedidoCreado._id}</p>
                <p>Estado: {pedidoCreado.estado}</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Carrito</h1>

            {pedido.items.map((item, i) => (
                <div key={i}>
                    <p>{item.nombre} x{item.cantidad}</p>
                </div>
            ))}

            <button onClick={enviarComanda} disabled={enviando}>
                {enviando ? "Enviando..." : "Enviar comanda"}
            </button>

            {error && <p>{error}</p>}
        </div>
    );
}



// DIA 6 AXIOS
/*
import { useEffect, useState } from "react";
import { getPlatos } from "../services/api";
//import PlatoCard from "../components/PlatoCard";

export default function CarritoPage() {
    const [platos, setPlatos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function cargarPlatos() {
            try {
                setLoading(true);
                setError(null);

                const data = await getPlatos();
                setPlatos(data);
            } catch (err) {
                setError("No se pudo cargar el menú");
            } finally {
                setLoading(false);
            }
        }

        cargarPlatos();
    }, []);

    function agregarPlato(plato) {
        const existe = carrito.find((item) => item._id === plato._id);

        if (existe) {
            setCarrito(
                carrito.map((item) =>
                    item._id === plato._id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                )
            );
        } else {
            setCarrito([...carrito, { ...plato, cantidad: 1 }]);
        }
    }

    function quitarPlato(id) {
        setCarrito(carrito.filter((item) => item._id !== id));
    }

    function limpiarComanda() {
        setCarrito([]);
    }

    const total = carrito.reduce(
        (sum, item) => sum + item.precio * item.cantidad,
        0
    );

    if (loading) return <p>Cargando menú...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Carrito de Comandas</h1>

            <h2>Menú disponible</h2>
            {platos.map((plato) => (
                <PlatoCard
                    key={plato._id}
                    plato={plato}
                    onAgregar={agregarPlato}
                />
            ))}

            <hr />

            <h2>Comanda ({carrito.length} platos distintos)</h2>

            {carrito.length === 0 ? (
                <p>No hay platos en la comanda.</p>
            ) : (
                carrito.map((item) => (
                    <div
                        key={item._id}
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
                        <button onClick={() => quitarPlato(item._id)}>
                            Quitar
                        </button>
                    </div>
                ))
            )}

            <h3>Total: S/ {total}</h3>

            <button onClick={limpiarComanda}>
                Limpiar comanda
            </button>
        </div>
    );
}
*/

/*
// src/pages/CarritoPage.jsx

import { useEffect, useState } from "react";
import { platosMock } from "../data/platos.mock";

const CarritoPage = () => {
    // Estado del menú (platos disponibles)
    const [platos, setPlatos] = useState([]);

    // Estado del carrito (lo que el cliente pidió)
    const [carrito, setCarrito] = useState([]);

    // Estado de carga
    const [loading, setLoading] = useState(true);

    // useEffect: se ejecuta una sola vez cuando el componente se monta
    useEffect(() => {
        setTimeout(() => {
            setPlatos(platosMock);
            setLoading(false);
        }, 800);
    }, []);

    // Agregar plato al carrito
    const agregarPlato = (plato) => {
        const existe = carrito.find((item) => item.id === plato.id);

        if (existe) {
            // Si ya existe, aumentar cantidad
            setCarrito(
                carrito.map((item) =>
                    item.id === plato.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                )
            );
        } else {
            // Si no existe, agregarlo con cantidad 1
            setCarrito([...carrito, { ...plato, cantidad: 1 }]);
        }
    };

    // Quitar plato completamente del carrito
    const quitarPlato = (id) => {
        setCarrito(carrito.filter((item) => item.id !== id));
    };

    // Limpiar toda la comanda
    const limpiarComanda = () => {
        setCarrito([]);
    };

    // Calcular total
    const total = carrito.reduce(
        (sum, item) => sum + item.precio * item.cantidad,
        0
    );

    // Mientras carga el menú
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

*/