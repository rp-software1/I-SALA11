import NavBar from "./components/NavBar";
import Home from "./pages/home";
import MesasPage from "./pages/MesasPage";
import ComandasPage from "./pages/ComandasPage";
import CarritoPage from "./pages/CarritoPage";

function App() {
  return (
    <>
      <NavBar nombreRestaurante="Buen Sabor" />
      <Home />
      <MesasPage />
      <ComandasPage />
      <CarritoPage />
    </>
  );
}

export default App;