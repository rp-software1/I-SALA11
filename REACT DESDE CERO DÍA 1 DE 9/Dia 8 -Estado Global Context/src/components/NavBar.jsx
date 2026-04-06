import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

function NavBar({ nombreRestaurante = "Restaurante" }) {
    const { carrito } = useCarrito();

    const linkStyle = ({ isActive }) => ({
        color: isActive ? "#FFD700" : "white",
        textDecoration: "none",
        fontWeight: isActive ? "bold" : "normal",
    });

    return (
        <nav style={{
            background: "#333",
            color: "white",
            padding: "12px 20px",
            display: "flex",
            gap: "24px",
            alignItems: "center",
        }}>
            <strong>{nombreRestaurante}</strong>
            <NavLink to="/" style={linkStyle}>Carta</NavLink>
            <NavLink to="/mesas" style={linkStyle}>Mesas</NavLink>
            <NavLink to="/comandas" style={linkStyle}>Comandas</NavLink>
            <NavLink to="/carrito" style={linkStyle}>
                Carrito {carrito.length > 0 && `(${carrito.length})`}
            </NavLink>
        </nav>
    );
}

NavBar.propTypes = { nombreRestaurante: PropTypes.string };
export default NavBar;