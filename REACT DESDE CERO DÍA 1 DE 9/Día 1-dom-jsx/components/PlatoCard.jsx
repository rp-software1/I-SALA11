function PlatoCard({ nombre, categoria, precio, stock, disponible }) {
    return (
        <div className={"plato" + (disponible ? "" : " agotado")}>
            <h3>{nombre}</h3>
            <p>{categoria}</p>
            <p>S/ {precio}</p>
            <p>Stock: {stock}</p>
            <p className="estado">{disponible ? "✅ Disponible" : "❌ Agotado"}</p>
        </div>
    );
}

export default PlatoCard;