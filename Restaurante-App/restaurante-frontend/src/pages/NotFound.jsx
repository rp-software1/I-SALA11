import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div style={{ padding: "40px", textAlign: "center" }}>
            <h1>404</h1>
            <p>La página que buscas no existe.</p>

            <button onClick={() => navigate("/")}>
                Volver al menú
            </button>
        </div>
    );
}