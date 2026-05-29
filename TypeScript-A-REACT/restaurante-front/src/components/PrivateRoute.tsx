import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
    children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
    const { usuario } = useAuth();
    if (!usuario) return <Navigate to="/login" replace />;
    return <>{children}</>;
}

export default PrivateRoute;
