import { NavLink, useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";

interface NavBarProps {
    nombreRestaurante?: string;
}

function NavBar({ nombreRestaurante = "Restaurante" }: NavBarProps) {
    const { carrito } = useCarrito();
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();

    const linkStyle = ({ isActive }: { isActive: boolean }) => ({
        color: isActive ? "#FFD700" : "white",
        textDecoration: "none",
        fontWeight: isActive ? "bold" : "normal",
    });

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

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
            {usuario && <>
                <NavLink to="/" style={linkStyle}>Carta</NavLink>
                <NavLink to="/mesas" style={linkStyle}>Mesas</NavLink>
                <NavLink to="/comandas" style={linkStyle}>Comandas</NavLink>
                <NavLink to="/carrito" style={linkStyle}>
                    Carrito {carrito.length > 0 && `(${carrito.length})`}
                </NavLink>
                <span style={{ marginLeft: "auto" }}>Hola, {usuario}</span>
                <button onClick={handleLogout} style={{ background: "transparent", color: "white", border: "1px solid white", padding: "4px 10px", cursor: "pointer" }}>
                    Salir
                </button>
            </>}
        </nav>
    );
}

export default NavBar;