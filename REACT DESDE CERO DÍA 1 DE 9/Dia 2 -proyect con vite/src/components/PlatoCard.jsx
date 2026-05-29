function PlatoCard({ nombre, categoria, precio, stock, disponible }) {
    return (
        <div style={{
            border: disponible ? "1px solid #ccc" : "1px solid red",
            borderRadius: "8px",
            padding: "12px",
            width: "180px",
            opacity: disponible ? 1 : 0.5,
        }}>
            <h3>{nombre}</h3>
            <p>{categoria}</p>
            <p>S/ {precio}</p>
            <p>Stock: {stock}</p>
            <p>{disponible ? "Disponible" : "Agotado"}</p>
        </div>
    )
}

export default PlatoCard