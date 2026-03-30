import PlatoCard from "../components/PlatoCard"
import { platosMock } from "../data/platos.mock"

const Home = () => {
    return (
        <div>
            <h1>Carta del Restaurante</h1>
            {platosMock.map(plato => (
                <PlatoCard key={plato.id} plato={plato} />
            ))}
        </div>
    )
}

export default Home