// TYPESCRIPT D2

import type { Mesa } from '../types';

interface MesaCardProps {
    mesa: Mesa;
    onClick: (mesa: Mesa) => void;
}

function MesaCard({ mesa, onClick }: MesaCardProps) {
    return (
        <div onClick={() => onClick(mesa)}>
            <h3>Mesa {mesa.numero}</h3>
            <p>Capacidad: {mesa.capacidad}</p>
            <p>Estado: {mesa.estado}</p>
        </div>
    );
}

export default MesaCard;


// -----------------------------------------------------------------------------


// TYPESCRIPT D1

/*type EstadoMesa = 'disponible' | 'ocupada' | 'reservada' | 'fuera_servicio';

interface Mesa {
    _id: string;
    numero: number;
    capacidad: number;
    estado: EstadoMesa;
    pedidoActivoId: string | null;
}

interface MesaCardProps {
    mesa: Mesa;
    onClick: (mesa: Mesa) => void;
}

function MesaCard({ mesa, onClick }: MesaCardProps) {
    return (
        <div onClick={() => onClick(mesa)}>
            <h3>Mesa {mesa.numero}</h3>
            <p>Estado: {mesa.estado}</p>
        </div>
    );
}

export default MesaCard;
*/

// -----------------------------------------------------------------------------

// REACT
/*import PropTypes from "prop-types";

const MesaCard = ({ numero, capacidad, estado, comensales }) => {
    let borde = "1px solid gray";

    if (estado === "libre") {
        borde = "2px solid green";
    } else if (estado === "ocupada") {
        borde = "2px solid red";
    } else if (estado === "reservada") {
        borde = "2px solid orange";
    }

    return (
        <div style={{ border: borde, margin: "10px", padding: "10px" }}>
            <h3>Mesa #{numero}</h3>
            <p>Capacidad: {capacidad}</p>
            <p>Comensales: {comensales}</p>
            <p>Estado: {estado}</p>
        </div>
    );
};

MesaCard.propTypes = {
    numero: PropTypes.number.isRequired,
    capacidad: PropTypes.number.isRequired,
    estado: PropTypes.string.isRequired,
    comensales: PropTypes.number.isRequired,
};

export default MesaCard;
*/