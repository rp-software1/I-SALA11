import NavBar from "./components/NavBar";
import Home from "./pages/home";
import MesasPage from "./pages/MesasPage";
import ComandasPage from "./pages/ComandasPage";

function App() {
  return (
    <>
      <NavBar nombreRestaurante="Buen Sabor" />
      <Home />
      <MesasPage />
      <ComandasPage />
    </>
  );
}

export default App;