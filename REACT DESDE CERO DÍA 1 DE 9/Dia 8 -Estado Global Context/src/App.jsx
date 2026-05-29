import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import MenuPage from './pages/MenuPage'
import CarritoPage from './pages/CarritoPage'
import MesasPage from './pages/MesasPage'
import ComandasPage from './pages/ComandasPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <>
      <NavBar nombreRestaurante="Restaurant El Sabrosito" />
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/mesas" element={<MesasPage />} />
        <Route path="/comandas" element={<ComandasPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
