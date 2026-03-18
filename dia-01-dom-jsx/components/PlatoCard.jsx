function PlatoCard({ nombre, categoria, precio, stock, disponible }) {
    return (
        <div className="plato-card">
            <h3>{nombre}</h3>
            <p>Categoría: {categoria}</p>
            <p>Precio: S/ {precio}</p>
            <p>Stock: {stock}</p>

            <span>
                {disponible ? "Disponible" : "Agotado"}
            </span>
        </div>
    );
}