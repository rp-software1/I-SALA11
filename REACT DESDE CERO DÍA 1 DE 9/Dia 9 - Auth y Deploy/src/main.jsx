import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CarritoProvider } from './context/CarritoContext'
import { MesaProvider } from './context/MesaContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarritoProvider>
          <MesaProvider>
            <App />
          </MesaProvider>
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)