import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const ok = login(nombre, password);
        if (ok) {
            navigate("/");
        } else {
            setError("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f9f7f4"
        }}>
            <form onSubmit={handleSubmit} style={{
                background: "#fff",
                padding: "40px",
                borderRadius: "12px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
                width: "320px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
            }}>
                <h1 style={{ textAlign: "center", color: "#e85d04", fontSize: "1.5rem" }}>
                    🍽️ Restaurante El Sabor
                </h1>
                <p style={{ textAlign: "center", color: "#6b6b6b", fontSize: "0.875rem" }}>
                    Inicia sesión para continuar
                </p>
                {error && (
                    <p style={{ color: "#dc3545", fontSize: "0.85rem", textAlign: "center" }}>
                        {error}
                    </p>
                )}
                <input
                    type="text"
                    placeholder="Usuario (admin)"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    style={{ padding: "10px", borderRadius: "8px", border: "1px solid #e0e0e0", fontSize: "0.9rem" }}
                />
                <input
                    type="password"
                    placeholder="Contraseña (1234)"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ padding: "10px", borderRadius: "8px", border: "1px solid #e0e0e0", fontSize: "0.9rem" }}
                />
                <button
                    type="submit"
                    style={{
                        background: "#e85d04",
                        color: "white",
                        padding: "12px",
                        borderRadius: "8px",
                        fontWeight: "600",
                        fontSize: "1rem"
                    }}
                >
                    Ingresar
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
