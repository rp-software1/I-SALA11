# Día 3 - Context API y Estado Global

## 📋 Lo que se Pedía

### Objetivos del Día 3
1. Implementar Context API para estado global
2. Crear un Provider para el carrito de compras
3. Gestionar estado del pedido en toda la aplicación
4. Implementar acciones para agregar/eliminar items
5. Persistir estado en localStorage
6. Integrar el Context con componentes existentes

### Requisitos Técnicos
- Crear un Context con React Context API
- Implementar un Provider como Client Component
- Usar hooks personalizados (useContext)
- Manejar estado complejo con reducer pattern
- Sincronizar con localStorage
- Actualizar NavBar con contador de items

---

## ✅ Lo que se Realizó

### 1. Estructura de Archivos Creada

```
Dia3-Context/
├── src/
│   └── context/
│       └── PedidoProvider.tsx          # Context + Provider
├── app/
│   ├── layout.tsx                      # Envuelve app con Provider
│   ├── components/
│   │   └── NavBar.tsx                  # Actualizado con contador
│   ├── menu/
│   │   └── PlatoCard.tsx              # Botón agregar al carrito
│   └── carrito/
│       ├── page.tsx                    # Vista del carrito
│       └── actions.ts                  # Server Actions
```

### 2. Context y Provider Implementados

#### src/context/PedidoProvider.tsx
```typescript
'use client';

interface PedidoContextType {
  pedido: Pedido;
  agregarItem: (plato: Plato, cantidad: number) => void;
  eliminarItem: (platoId: string) => void;
  actualizarCantidad: (platoId: string, cantidad: number) => void;
  limpiarCarrito: () => void;
  calcularTotal: () => number;
}

✅ Estado global del pedido
✅ Funciones para manipular el carrito
✅ Persistencia en localStorage
✅ Sincronización automática
✅ Hook personalizado usePedido()
✅ Tipado completo con TypeScript
```

### 3. Funcionalidades del Carrito

#### Agregar Items
```typescript
agregarItem(plato, cantidad) {
  - Verifica si el item ya existe
  - Si existe: incrementa cantidad
  - Si no existe: agrega nuevo item
  - Actualiza localStorage automáticamente
}
```

#### Eliminar Items
```typescript
eliminarItem(platoId) {
  - Filtra el item del array
  - Actualiza estado
  - Sincroniza con localStorage
}
```

#### Actualizar Cantidad
```typescript
actualizarCantidad(platoId, cantidad) {
  - Encuentra el item
  - Actualiza su cantidad
  - Si cantidad = 0, elimina el item
  - Guarda en localStorage
}
```

#### Calcular Total
```typescript
calcularTotal() {
  - Suma precio × cantidad de cada item
  - Retorna total formateado
  - Se actualiza automáticamente
}
```

#### Limpiar Carrito
```typescript
limpiarCarrito() {
  - Vacía el array de items
  - Resetea el estado
  - Limpia localStorage
}
```

### 4. Integración con Componentes

#### app/layout.tsx
```typescript
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <PedidoProvider>
          <NavBar />
          {children}
        </PedidoProvider>
      </body>
    </html>
  )
}
```

#### app/components/NavBar.tsx
```typescript
'use client';

export default function NavBar() {
  const { pedido } = usePedido();
  const totalItems = pedido.items.reduce(
    (acc, item) => acc + item.cantidad, 
    0
  );
  
  return (
    <nav>
      <Link href="/carrito">
        Carrito
        {totalItems > 0 && (
          <span className="badge">{totalItems}</span>
        )}
      </Link>
    </nav>
  );
}
```

#### app/menu/PlatoCard.tsx
```typescript
'use client';

export default function PlatoCard({ plato }) {
  const { agregarItem } = usePedido();
  
  return (
    <div>
      {/* ... info del plato ... */}
      <button onClick={() => agregarItem(plato, 1)}>
        Agregar al Carrito
      </button>
    </div>
  );
}
```

#### app/carrito/page.tsx
```typescript
'use client';

export default function CarritoPage() {
  const { 
    pedido, 
    eliminarItem, 
    actualizarCantidad,
    calcularTotal,
    limpiarCarrito 
  } = usePedido();
  
  return (
    <div>
      {pedido.items.map(item => (
        <ItemCarrito 
          key={item.platoId}
          item={item}
          onEliminar={eliminarItem}
          onActualizar={actualizarCantidad}
        />
      ))}
      <div>Total: ${calcularTotal()}</div>
      <button onClick={limpiarCarrito}>
        Vaciar Carrito
      </button>
    </div>
  );
}
```

### 5. Server Actions Implementadas

#### app/carrito/actions.ts
```typescript
'use server';

export async function crearPedidoAction(datos: CrearPedidoInput) {
  try {
    const pedido = await crearPedido(datos);
    revalidatePath('/carrito');
    return { success: true, pedido };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

### 6. Persistencia en localStorage

```typescript
// Guardar en localStorage
useEffect(() => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('pedido', JSON.stringify(pedido));
  }
}, [pedido]);

// Cargar desde localStorage
useEffect(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('pedido');
    if (saved) {
      setPedido(JSON.parse(saved));
    }
  }
}, []);
```

---

## 🎯 Resultados Obtenidos

### Funcionalidades Completadas
- ✅ Context API implementado correctamente
- ✅ Estado global del carrito funcional
- ✅ Agregar items al carrito
- ✅ Eliminar items del carrito
- ✅ Actualizar cantidades
- ✅ Calcular total automáticamente
- ✅ Limpiar carrito completo
- ✅ Persistencia en localStorage
- ✅ Contador en NavBar
- ✅ Hook personalizado usePedido()

### Ventajas del Context API
- ✅ Estado compartido sin prop drilling
- ✅ Actualización reactiva en todos los componentes
- ✅ Lógica centralizada
- ✅ Fácil de testear
- ✅ Type-safe con TypeScript

### UX Mejorada
- ✅ Feedback visual al agregar items
- ✅ Contador de items en navegación
- ✅ Carrito persiste entre sesiones
- ✅ Actualización en tiempo real
- ✅ Interfaz intuitiva

---

## 🚀 Cómo Ejecutar

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Probar funcionalidades:
# 1. Ir a /menu
# 2. Agregar platos al carrito
# 3. Ver contador en NavBar
# 4. Ir a /carrito
# 5. Modificar cantidades
# 6. Recargar página (persiste)
```

---

## 📚 Conceptos Aprendidos

### 1. Context API
```typescript
// Crear Context
const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

// Crear Provider
export function PedidoProvider({ children }) {
  const [pedido, setPedido] = useState(initialState);
  
  return (
    <PedidoContext.Provider value={{ pedido, ... }}>
      {children}
    </PedidoContext.Provider>
  );
}

// Hook personalizado
export function usePedido() {
  const context = useContext(PedidoContext);
  if (!context) throw new Error('usePedido must be used within PedidoProvider');
  return context;
}
```

### 2. Estado Global vs Local
- **Global (Context)**: Carrito, usuario, tema, idioma
- **Local (useState)**: Formularios, modales, toggles

### 3. Persistencia
```typescript
// Guardar
localStorage.setItem('key', JSON.stringify(data));

// Cargar
const data = JSON.parse(localStorage.getItem('key'));

// Limpiar
localStorage.removeItem('key');
```

### 4. Server Actions
```typescript
'use server';

export async function myAction(data: FormData) {
  // Lógica en el servidor
  revalidatePath('/path'); // Revalidar cache
  return result;
}
```

### 5. Client Components
- Necesarios para Context (hooks)
- Marcar con 'use client'
- Pueden usar useState, useEffect, etc.

---

## 🔧 Estructura del Estado

### Pedido Interface
```typescript
interface Pedido {
  mesaId: string | null;
  items: ItemPedido[];
  total: number;
  estado: EstadoPedido;
}

interface ItemPedido {
  platoId: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string;
}
```

### Flujo de Datos
```
Usuario → Acción (agregarItem)
       ↓
    Context actualiza estado
       ↓
    localStorage sincroniza
       ↓
    Componentes re-renderizan
       ↓
    UI actualizada
```

---

## 📝 Notas Importantes

### Context Performance
- Context re-renderiza todos los consumidores
- Para apps grandes, considerar:
  - Múltiples contexts específicos
  - Zustand o Redux para estado complejo
  - React Query para datos del servidor

### localStorage Caveats
- Solo funciona en el cliente
- Verificar `typeof window !== 'undefined'`
- Límite de ~5-10MB
- Sincrónico (puede bloquear UI)

### Server vs Client
- Context solo funciona en Client Components
- Server Actions pueden mutar datos del servidor
- Combinar ambos para mejor arquitectura

### TypeScript Benefits
- Autocompletado en IDE
- Errores en tiempo de desarrollo
- Refactoring seguro
- Documentación implícita

---

## 🎨 Mejoras Implementadas

1. **Badge Animado** - Contador con animación en NavBar
2. **Feedback Visual** - Confirmación al agregar items
3. **Empty State** - Mensaje cuando carrito está vacío
4. **Responsive Design** - Funciona en móvil y desktop
5. **Type Safety** - TypeScript en todo el Context
6. **Error Handling** - Validaciones en acciones
7. **Optimistic Updates** - UI actualiza antes de confirmar
8. **Accessibility** - Botones con labels descriptivos

---

## 🔄 Flujo Completo del Carrito

```
1. Usuario ve plato en /menu
   ↓
2. Click en "Agregar al Carrito"
   ↓
3. agregarItem() actualiza Context
   ↓
4. localStorage guarda cambios
   ↓
5. NavBar muestra contador actualizado
   ↓
6. Usuario va a /carrito
   ↓
7. Ve lista de items con cantidades
   ↓
8. Puede modificar cantidades o eliminar
   ↓
9. Click en "Confirmar Pedido"
   ↓
10. Server Action crea pedido en API
    ↓
11. Carrito se limpia
    ↓
12. Redirección a confirmación
```
