const PlatoCard = ({ plato, onAgregar }) => {
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