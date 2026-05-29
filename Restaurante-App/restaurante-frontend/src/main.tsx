import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
// Dia8
import { PedidoProvider } from './context/PedidoContext.js';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PedidoProvider>
      <App />
    </PedidoProvider>
  </StrictMode>,
)

