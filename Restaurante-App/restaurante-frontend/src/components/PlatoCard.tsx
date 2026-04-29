// TYPESCRIPT D2

import type { Plato } from '../types';

interface PlatoCardProps {
    plato: Plato;
    onAgregar: (plato: Plato) => void;
}

function PlatoCard({ plato, onAgregar }: PlatoCardProps) {
    return (
        <div>
            <h3>{plato.nombre}</h3>
            <p>{plato.descripcion}</p>
            <p>S/ {plato.precio.toFixed(2)}</p>
            <button onClick={() => onAgregar(plato)}>
                Agregar
            </button>
        </div>
    );
}

export default PlatoCard;


// --------------------------------------------------------------------------


// TYPESCRIPT D1
/*interface Plato {
    _id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    disponible: boolean;
}

interface PlatoCardProps {
    plato: Plato;
    onAgregar: (plato: Plato) => void;
}

function PlatoCard({ plato, onAgregar }: PlatoCardProps) {
    return (
        <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
            <h3>{plato.nombre}</h3>
            <p>Categoría: {plato.categoria}</p>
            <p>Precio: S/ {plato.precio}</p>
            <p>{plato.disponible ? "Disponible" : "Agotado"}</p>

            <button onClick={() => onAgregar(plato)}>
                Agregar
            </button>
        </div>
    );
}

export default PlatoCard;
*/

// --------------------------------------------------------------------------

// REACT
/*const PlatoCard = ({ plato, onAgregar }) => {
    return (
        <div
            style={{
                border: "1px solid gray",
                margin: "10px",
                padding: "10px"
            }}
        >
            <h3>{plato.nombre}</h3>
            <p>Categoría: {plato.categoria}</p>
            <p>Precio: S/ {plato.precio}</p>
            <p>Stock: {plato.stock}</p>
            <p>{plato.oferta ? "Oferta" : "Sin oferta"}</p>
            <p>{plato.disponible ? "Disponible" : "Agotado"}</p>

            <button onClick={() => onAgregar(plato)}>
                Agregar
            </button>
        </div>
    );
};

export default PlatoCard;
*/