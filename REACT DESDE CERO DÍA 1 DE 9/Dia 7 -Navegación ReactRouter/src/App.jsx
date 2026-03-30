import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import MenuPage from "./pages/MenuPage";
import MesasPage from "./pages/MesasPage";
import ComandasPage from "./pages/ComandasPage";
import CarritoPage from "./pages/CarritoPage";
import MesaDetallePage from "./pages/MesaDetallePage";
import NotFoundPage from "./pages/NotFoundPage";
import './App.css'

function App() {
  return (
    <div>
      <NavBar nombreRestaurante="Restaurante El Sabor" />
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/mesas" element={<MesasPage />} />
        <Route path="/mesas/:id" element={<MesaDetallePage />} />
        <Route path="/comandas" element={<ComandasPage />} />
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;