import PropTypes from "prop-types";

function MesaCard({ numero, capacidad, estado, comensales }) {
    const colores = {
        libre: {
            border: "1px solid #28a745",
            background: "#d4edda"
        },
        ocupada: {
            border: "1px solid #dc3545",
            background: "#f8d7da"
        },
        reservada: {
            border: "1px solid #ffc107",
            background: "#fff3cd"
        }
    };

    return (
        <div style={{
            ...colores[estado],
            borderRadius: "8px",
            padding: "12px",
            width: "160px",
        }}>
            <h3>Mesa {numero}</h3>
            <p>Capacidad: {capacidad}</p>
            <p>Comensales: {comensales}</p>
            <p>
                {estado === "libre"
                    ? "Libre"
                    : estado === "ocupada"
                        ? "Ocupada"
                        : "Reservada"}
            </p>
        </div>
    );
}

MesaCard.propTypes = {
    numero: PropTypes.number.isRequired,
    capacidad: PropTypes.number.isRequired,
    estado: PropTypes.string.isRequired,
    comensales: PropTypes.number,
};

export default MesaCard;