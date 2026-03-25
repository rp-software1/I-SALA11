import PropTypes from "prop-types";

const NavBar = ({ nombreRestaurante = "Restaurante" }) => {
    return (
        <nav style={{ backgroundColor: "#8f5353ff", padding: "15px", marginBottom: "20px" }}>
            <h2>{nombreRestaurante}</h2>
            <p>Carta | Mesas | Comandas</p>
        </nav>
    );
};

NavBar.propTypes = {
    nombreRestaurante: PropTypes.string,
};

export default NavBar;