import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(
        localStorage.getItem("usuario") || null
    );

    const login = (nombre) => {
        localStorage.setItem("usuario", nombre);
        setUsuario(nombre);
    };

    const logout = () => {
        localStorage.removeItem("usuario");
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}