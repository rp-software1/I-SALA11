import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
    usuario: string | null;
    login: (nombre: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Credenciales de ejemplo (en un proyecto real vendría del backend)
const USUARIO_DEMO = "admin";
const PASSWORD_DEMO = "1234";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<string | null>(
        () => localStorage.getItem("usuario")
    );

    const login = (nombre: string, password: string): boolean => {
        if (nombre === USUARIO_DEMO && password === PASSWORD_DEMO) {
            setUsuario(nombre);
            localStorage.setItem("usuario", nombre);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUsuario(null);
        localStorage.removeItem("usuario");
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return ctx;
}
