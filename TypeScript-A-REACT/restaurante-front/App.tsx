import { Routes, Route } from "react-router-dom";
import NavBar from "./src/components/NavBar";
import PrivateRoute from "./src/components/PrivateRoute";
import LoginPage from "./src/pages/LoginPage";
import MenuPage from "./src/pages/MenuPage";
import MesasPage from "./src/pages/MesasPage";
import MesaDetallePage from "./src/pages/MesaDetallePage";
import ComandasPage from "./src/pages/ComandasPage";
import CarritoPage from "./src/pages/CarritoPage";
import NotFoundPage from "./src/pages/NotFoundPage";
import './src/App.css';
import CheckOut from "./src/components/CheckOut";

function App() {
    return (
        <div>
            <NavBar nombreRestaurante="Restaurante El Sabor" />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<PrivateRoute><MenuPage /></PrivateRoute>} />
                <Route path="/mesas" element={<PrivateRoute><MesasPage /></PrivateRoute>} />
                <Route path="/mesas/:id" element={<PrivateRoute><MesaDetallePage /></PrivateRoute>} />
                <Route path="/comandas" element={<PrivateRoute><ComandasPage /></PrivateRoute>} />
                <Route path="/carrito" element={<PrivateRoute><CarritoPage /></PrivateRoute>} />
                <Route path="/pago" element={<PrivateRoute><CheckOut /></PrivateRoute>} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;