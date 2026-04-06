import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import MesasPage from "./pages/MesasPage";
import MesaDetallePage from "./pages/MesaDetallePage";
import ComandasPage from "./pages/ComandasPage";
import CarritoPage from "./pages/CarritoPage";
import NotFoundPage from "./pages/NotFoundPage";
import './App.css'

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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;