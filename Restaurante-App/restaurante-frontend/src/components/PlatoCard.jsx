const PlatoCard = ({ plato }) => {
    return (
        <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>

            <h3>{plato.nombre}</h3>
            <p>Categoría: {plato.categoria}</p>
            <p>Precio: S/ {plato.precio}</p>
            <p>Stock: {plato.stock}</p>
            <p>{plato.oferta ? "oferta" : "sin oferta"}</p>
            <p>{plato.disponible ? "Disponible" : "Agotado"}</p>

        </div>
    )
}

export default PlatoCard