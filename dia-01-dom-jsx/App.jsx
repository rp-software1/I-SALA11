function App() {
    return (
        <div>
            <h1>Carta del Restaurante</h1>

            {platosMock.map(plato => (
                <PlatoCard
                    key={plato.id}
                    nombre={plato.nombre}
                    categoria={plato.categoria}
                    precio={plato.precio}
                    stock={plato.stock}
                    disponible={plato.disponible}
                />
            ))}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);