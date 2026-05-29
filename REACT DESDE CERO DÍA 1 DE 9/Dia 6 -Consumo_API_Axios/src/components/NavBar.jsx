import PropTypes from "prop-types";

function NavBar({ nombreRestaurante = "Restaurante El Sabrosito" }) {
    return (
        <nav style={{
            background: "#000000ff",
            color: "white",
            padding: "12px 20px",
            display: "flex",
            gap: "24px",
            alignItems: "center",
        }}>
            <strong>{nombreRestaurante}</strong>
            <span>Carta</span>
            <span>Mesas</span>
            <span>Comandas</span>
        </nav>
    );
}

NavBar.propTypes = {
    nombreRestaurante: PropTypes.string,
};

export default NavBar;