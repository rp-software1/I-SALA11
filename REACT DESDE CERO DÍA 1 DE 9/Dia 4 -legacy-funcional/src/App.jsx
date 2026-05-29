import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import MesasPage from "./pages/MesaPage";
import ComandasPage from "./pages/ComandasPage";

function App() {
  return (
    <div>
      <NavBar nombreRestaurante="Restaurante El Sabrocito" />
      <Home />
      <MesasPage />
      <ComandasPage />
    </div>
  );
}

export default App;