/*import NavBar from "./components/NavBar";
import Home from "./pages/home";
import MesasPage from "./pages/MesasPage";
import ComandasPage from "./pages/ComandasPage";
import CarritoPage from "./pages/CarritoPage";
//import PedidoForm from "./components/PedidoForm";
//import CompraPage from "./pages/CompraPage";*/
/*import NavBar from "./components/NavBar";
import CarritoPage from "./pages/CarritoPage";

function App() {
  return (
    <>
      <NavBar nombreRestaurante="Buen Sabor" />
      <CarritoPage />

      {/*<Home />
      <MesasPage />
      <ComandasPage />
      <CarritoPage />
      {<PedidoForm />}
      {<CompraPage />}/*
    </>
  );
}

export default App;

*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

import MenuPage from "./pages/MenuPage";
import MesasPage from "./pages/MesasPage";
import CarritoPage from "./pages/CarritoPage";
import DetalleMesa from "./pages/DetalleMesa";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <NavBar nombreRestaurante="Buen Sabor" />

      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/mesas" element={<MesasPage />} />
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/mesas/:id" element={<DetalleMesa />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;