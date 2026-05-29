import { useNavigate } from "react-router-dom";

function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>404</h1>
            <p>Página no encontrada</p>
            <button onClick={() => navigate("/")}>Volver al inicio</button>
        </div>
    );
}

export default NotFoundPage;