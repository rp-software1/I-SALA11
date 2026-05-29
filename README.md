# 🍽️ Next.js Aplicado al Restaurante — El Sabrocito

Proyecto de aprendizaje progresivo de **Next.js 15** aplicado al desarrollo de un sistema de restaurante peruano ficticio.  
Cada carpeta representa un día de trabajo con nuevos conceptos y funcionalidades.

---

## 📁 Estructura del proyecto

| Carpeta | Tema | Descripción |
|---|---|---|
| `Dia1-Router` | Routing | Primeros pasos con el App Router de Next.js |
| `Dia2-Server` | Server Components | Fetch de datos con componentes de servidor |
| `Dia3-Context` | Estado global | Context API + PedidoProvider para el carrito |
| `Dia4-Details` | Rutas dinámicas | Páginas de detalle de platos y mesas |
| `Dia5` | Layout & UX | Layouts anidados, CartSidebar y CartFloatButton |
| **`Dia6-Metadata`** ⭐ | **Despliegue** | **Metadata SEO, diseño final y versión lista para despliegue** |

---

## ⭐ Día 6 — Apartado principal para despliegue

La carpeta [`Dia6-Metadata`](./Dia6-Metadata) contiene la versión **completa y pulida** del sistema:

- **Restaurante:** El Sabrocito
- **Stack:** Next.js 15 · TypeScript · Tailwind CSS · CSS puro
- **Funcionalidades:**
  - 🗺️ Menú digital con filtros por categoría y búsqueda
  - 🪑 Gestión de mesas en tiempo real (disponible / ocupada / reservada)
  - 🛒 Carrito lateral con resumen de comanda
  - 📋 Página de detalle de plato con ingredientes y precio
  - 🔖 Metadata SEO completa (Open Graph, Twitter Card)
  - 📱 Diseño responsive y premium

### Cómo correr el Día 6

```bash
cd Dia6-Metadata
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tecnologías utilizadas

- [Next.js 15](https://nextjs.org/) — App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Playfair Display + DM Sans](https://fonts.google.com/) — Google Fonts

---

## 📖 Conceptos cubiertos día a día

1. **Routing** — File-based routing, rutas estáticas y dinámicas
2. **Server Components** — Fetching en servidor, APIs propias
3. **Context API** — Estado global del pedido sin Redux
4. **Dynamic Routes** — `[platoId]`, `[mesaId]`, `generateStaticParams`
5. **Layouts** — Layout compartido, navbar sticky, sidebar de carrito
6. **Metadata & Deploy** — `generateMetadata`, SEO, diseño final
