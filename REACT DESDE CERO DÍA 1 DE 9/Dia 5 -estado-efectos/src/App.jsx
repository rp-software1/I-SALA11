import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import MesasPage from "./pages/MesaPage";
import ComandasPage from "./pages/ComandasPage";
import CarritoPage from "./pages/CarritoPage";
import MenuPage from "./pages/MenuPage";

function App() {
  return (
    <div>
      <NavBar nombreRestaurante="Restaurante El Sabor" />
      <MenuPage />
      <CarritoPage />
      <MesasPage />
      <ComandasPage />
    </div>
  );
}

export default App;