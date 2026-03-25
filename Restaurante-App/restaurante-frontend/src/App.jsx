import NavBar from "./components/NavBar";
import Home from "./pages/home";
import MesasPage from "./pages/MesasPage";

function App() {
  return (
    <>
      <NavBar nombreRestaurante="Buen Sabor" />
      <Home />
      <MesasPage />
    </>
  );
}

export default App;