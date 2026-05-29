// TYPESCRIPT
/*function NavBar() {
    return (
        <nav>
            <h2>Restaurante</h2>
        </nav>
    );
}

export default NavBar;*/

import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav style={{
            display: "flex",
            gap: "20px",
            padding: "15px",
            background: "#222",
            color: "white"
        }}>
            <Link to="/" style={{ color: "white" }}>Mesas</Link>
            <Link to="/menu" style={{ color: "white" }}>Menú</Link>
            <Link to="/carrito" style={{ color: "white" }}>Carrito</Link>
        </nav>
    );
}

export default NavBar;


// REACT DIA8
/*import PropTypes from "prop-types";

const NavBar = ({ nombreRestaurante = "Restaurante" }) => {
    return (
        <nav style={{ backgroundColor: "#b5b8c4ff", padding: "15px", marginBottom: "20px" }}>
            <h2>{nombreRestaurante}</h2>
            <p>Carta | Mesas | Comandas</p>
        </nav>
    );
};

NavBar.propTypes = {
    nombreRestaurante: PropTypes.string,
};

export default NavBar;*/

// REACT DIA9

/*import { NavLink } from "react-router-dom";

export default function NavBar({ nombreRestaurante }) {
    const estiloLink = ({ isActive }) => ({
        marginRight: "15px",
        textDecoration: "none",
        fontWeight: isActive ? "bold" : "normal",
        color: isActive ? "orange" : "black",
    });

    return (
        <nav style={{ backgroundColor: "#d3d3dd", padding: "20px" }}>
            <h1>{nombreRestaurante}</h1>

            <NavLink to="/" style={estiloLink}>
                Carta
            </NavLink>

            <NavLink to="/mesas" style={estiloLink}>
                Mesas
            </NavLink>

            <NavLink to="/carrito" style={estiloLink}>
                Comandas
            </NavLink>
        </nav>
    );
}
*/