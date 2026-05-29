function PlatoCard({ nombre, categoria, precio, stock, disponible, enOferta, precioOferta }) {
    return (
        <div style={{
            border: disponible ? "1px solid #000000ff" : "1px solid  #000000ff",
            borderRadius: "8px",
            padding: "12px",
            width: "180px",
            opacity: disponible ? 1 : 0.5,
            backgroundColor: enOferta ? "#e8f5e9" : "#fff"
        }}>
            <h3>{nombre}</h3>
            <p>{categoria}</p>
            <p>S/ {precio}</p>
            <p>Stock: {stock}</p>
            <p>{disponible ? "Disponible" : "Agotado"}</p>
            <p>{enOferta ? "¡En oferta!" : "Sin oferta"}</p>
            {enOferta && <p style={{ color: "green" }}>S/ {precioOferta} (¡OFERTA!)</p>}
        </div>
    )
}

export default PlatoCard