import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import MesasPage from "./pages/MesaPage";
import './App.css'

function App() {
  return (
    <div>
      <NavBar nombreRestaurante="Restaurante El Sabrosito" />
      <Home />
      <MesasPage />
    </div>
  );
}

export default App