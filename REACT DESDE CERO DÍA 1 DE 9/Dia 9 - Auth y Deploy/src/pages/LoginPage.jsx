import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
    const [nombre, setNombre] = useState("");
    const [clave, setClave] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nombre && clave) {
            login(nombre);
            navigate("/");
        }
    };

    return (
        <div style={{ padding: "40px", maxWidth: "300px", margin: "0 auto" }}>
            <h1>Login del Mesero</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "12px" }}>
                    <label>Nombre</label>
                    <input
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        style={{ display: "block", width: "100%", padding: "8px", marginTop: "4px" }}
                    />
                </div>
                <div style={{ marginBottom: "12px" }}>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={clave}
                        onChange={e => setClave(e.target.value)}
                        style={{ display: "block", width: "100%", padding: "8px", marginTop: "4px" }}
                    />
                </div>
                <button type="submit" style={{ width: "100%", padding: "10px" }}>
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default LoginPage;