# Día 2 - Server Components y Fetching de Datos

## 📋 Lo que se Pedía

### Objetivos del Día 2
1. Implementar Server Components para fetching de datos
2. Conectar con una API REST externa
3. Crear servicios para consumir endpoints
4. Implementar manejo de errores y loading states
5. Tipar correctamente las respuestas de la API
6. Usar variables de entorno

### Requisitos Técnicos
- Usar Server Components para fetch de datos
- Crear archivos `loading.tsx` y `error.tsx`
- Implementar tipos TypeScript para los datos
- Configurar variables de entorno con `.env.local`
- Separar lógica de API en servicios

---

## ✅ Lo que se Realizó

### 1. Estructura de Archivos Creada

```
Dia2-Server/
├── .env.local                          # Variables de entorno
├── src/
│   ├── types/
│   │   └── index.ts                    # Tipos TypeScript
│   └── services/
│       └── api.ts                      # Servicios de API
└── app/
    ├── mesas/
    │   ├── page.tsx                    # Server Component con fetch
    │   ├── loading.tsx                 # Loading UI
    │   ├── error.tsx                   # Error UI
    │   └── MesaCard.tsx               # Componente de presentación
    └── menu/
        ├── page.tsx                    # Server Component con fetch
        ├── loading.tsx                 # Loading UI
        ├── error.tsx                   # Error UI
        └── PlatoCard.tsx              # Componente de presentación
```

### 2. Tipos TypeScript Definidos

#### src/types/index.ts
```typescript
export type EstadoMesa = 'libre' | 'ocupada' | 'reservada';
export type EstadoPedido = 'pendiente' | 'en_preparacion' | 'listo' | 'entregado';

export interface Mesa {
  _id: string;
  numero: number;
  capacidad: number;
  estado: EstadoMesa;
  ubicacion: string;
}

export interface Plato {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  disponible: boolean;
  imagen?: string;
}

export interface ItemPedido {
  platoId: string;
  cantidad: number;
  precioUnitario: number;
}

export interface Pedido {
  _id: string;
  mesaId: string;
  items: ItemPedido[];
  total: number;
  estado: EstadoPedido;
  creadoEn: string;
  actualizadoEn: string;
}
```

### 3. Servicios de API Implementados

#### src/services/api.ts
```typescript
✅ getMesas() - Obtener todas las mesas
✅ getPlatos() - Obtener todos los platos
✅ Manejo de errores con throw Error
✅ Tipado completo con TypeScript
✅ Cache: 'no-store' para datos dinámicos
✅ Validación de respuestas HTTP
```

### 4. Server Components con Fetch

#### app/mesas/page.tsx
```typescript
- Async Server Component
- Fetch de datos en el servidor
- Renderizado directo sin useEffect
- Manejo automático de errores
- Grid responsive de tarjetas
```

#### app/menu/page.tsx
```typescript
- Async Server Component
- Fetch de platos desde API
- Filtrado por disponibilidad
- Diseño de tarjetas con imágenes
- Precios formateados
```

### 5. Estados de Carga y Error

#### loading.tsx
```typescript
- Skeleton UI con animación pulse
- Diseño consistente con las páginas
- Mejora la UX durante el fetch
```

#### error.tsx
```typescript
'use client' - Client Component
- Captura errores de fetch
- Botón para reintentar
- Mensaje de error amigable
- Función reset() para recargar
```

### 6. Componentes de Presentación

#### MesaCard.tsx
```typescript
- Muestra información de la mesa
- Badge de estado con colores
- Icono de capacidad
- Ubicación visible
```

#### PlatoCard.tsx
```typescript
- Imagen del plato (Cloudinary)
- Nombre y descripción
- Precio formateado
- Categoría visible
- Badge de disponibilidad
```

### 7. Variables de Entorno

#### .env.local
```bash
NEXT_PUBLIC_API_URL=https://restaurante-api.onrender.com/api
```

---

## 🎯 Resultados Obtenidos

### Funcionalidades Completadas
- ✅ Fetch de datos en Server Components
- ✅ Conexión exitosa con API REST
- ✅ Tipos TypeScript completos
- ✅ Loading states implementados
- ✅ Error boundaries funcionales
- ✅ Servicios de API organizados
- ✅ Variables de entorno configuradas

### Ventajas de Server Components
- ✅ Fetch en el servidor (más rápido)
- ✅ No expone credenciales al cliente
- ✅ Reduce JavaScript del bundle
- ✅ SEO mejorado (contenido pre-renderizado)
- ✅ Streaming de UI automático

### Manejo de Estados
- ✅ Loading automático con Suspense
- ✅ Errores capturados con error boundaries
- ✅ Reintentos con función reset()
- ✅ UX mejorada con skeletons

---

## 🚀 Cómo Ejecutar

```bash
# 1. Crear archivo .env.local
echo "NEXT_PUBLIC_API_URL=https://restaurante-api.onrender.com/api" > .env.local

# 2. Instalar dependencias
npm install

# 3. Modo desarrollo
npm run dev

# 4. Abrir en navegador
# http://localhost:3000/mesas
# http://localhost:3000/menu
```

---

## 📚 Conceptos Aprendidos

### 1. Server Components
- Componentes que se ejecutan solo en el servidor
- Pueden ser async para fetch de datos
- No tienen acceso a hooks del cliente
- Reducen el JavaScript enviado al navegador

### 2. Data Fetching
```typescript
// Server Component (recomendado)
async function Page() {
  const data = await fetch('...')
  return <div>{data}</div>
}
```

### 3. Loading States
```typescript
// loading.tsx - Se muestra automáticamente
export default function Loading() {
  return <Skeleton />
}
```

### 4. Error Handling
```typescript
// error.tsx - Captura errores de la página
'use client'
export default function Error({ error, reset }) {
  return <ErrorUI error={error} onReset={reset} />
}
```

### 5. Tipos TypeScript
- Interfaces para datos de API
- Union types para estados
- Tipado de respuestas fetch
- Type safety en toda la app

### 6. Variables de Entorno
- `.env.local` para desarrollo
- `NEXT_PUBLIC_*` para variables del cliente
- Variables sin prefijo solo en servidor

---

## 🔧 Configuración de la API

### Endpoints Utilizados
```
GET /api/mesas          - Lista de mesas
GET /api/platos         - Lista de platos
GET /api/mesas/:id      - Detalle de mesa
POST /api/pedidos       - Crear pedido
PATCH /api/pedidos/:id  - Actualizar pedido
```

### Estructura de Respuesta
```json
// GET /api/mesas
[
  {
    "_id": "123",
    "numero": 1,
    "capacidad": 4,
    "estado": "libre",
    "ubicacion": "Terraza"
  }
]

// GET /api/platos
[
  {
    "_id": "456",
    "nombre": "Pizza Margherita",
    "descripcion": "Pizza clásica italiana",
    "precio": 12.99,
    "categoria": "Pizzas",
    "disponible": true,
    "imagen": "https://..."
  }
]
```

---

## 📝 Notas Importantes

### Server vs Client Components
- **Server**: Fetch de datos, acceso a DB, sin interactividad
- **Client**: Hooks, eventos, estado local, interactividad

### Cache Strategies
```typescript
// No cache (datos dinámicos)
fetch(url, { cache: 'no-store' })

// Cache por tiempo
fetch(url, { next: { revalidate: 60 } })

// Cache indefinido
fetch(url, { cache: 'force-cache' })
```

### Error Boundaries
- Solo capturan errores en Server Components
- Deben ser Client Components ('use client')
- Proporcionan función reset() para reintentar

### Loading UI
- Se muestra automáticamente durante fetch
- Usa Suspense internamente
- Mejora la percepción de velocidad

---

## 🎨 Mejoras Implementadas

1. **Skeleton Loading** - Animación pulse durante carga
2. **Error Recovery** - Botón para reintentar fetch
3. **Responsive Design** - Grid adaptable a pantallas
4. **Type Safety** - TypeScript en toda la app
5. **Code Organization** - Servicios separados de UI
6. **Environment Config** - Variables de entorno seguras
