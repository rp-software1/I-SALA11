# Día 5 - Integración Completa y Flujo de Pedidos

## 📋 Lo que se Pedía

### Objetivos del Día 5
1. Integrar todas las funcionalidades previas
2. Implementar flujo completo de pedidos
3. Conectar carrito con API de pedidos
4. Crear formulario de confirmación
5. Implementar validaciones
6. Manejar estados de pedido
7. Agregar feedback visual

### Requisitos Técnicos
- Integrar Context + Server Actions
- Validar datos antes de enviar
- Crear pedido en la API
- Limpiar carrito después de confirmar
- Mostrar confirmación al usuario
- Manejar errores de red
- Implementar loading states

---

## ✅ Lo que se Realizó

### 1. Estructura de Archivos Creada

```
Dia5/
├── .env.local                          # Variables de entorno
├── src/
│   ├── types/
│   │   └── index.ts                    # Tipos completos
│   └── context/
│       └── PedidoProvider.tsx          # Context actualizado
└── app/
    ├── layout.tsx                      # Con PedidoProvider
    ├── carrito/
    │   ├── page.tsx                    # Vista del carrito
    │   ├── actions.ts                  # Server Actions
    │   ├── loading.tsx                 # Loading state
    │   └── error.tsx                   # Error handling
    └── confirmacion/
        └── page.tsx                    # Página de confirmación
```

### 2. Flujo Completo de Pedidos

#### 1. Agregar Items al Carrito
```typescript
// En /menu
const { agregarItem } = usePedido();

<button onClick={() => agregarItem(plato, 1)}>
  Agregar al Carrito
</button>

✅ Item se agrega al Context
✅ localStorage se actualiza
✅ Contador en NavBar incrementa
✅ Feedback visual al usuario
```

#### 2. Ver Carrito
```typescript
// En /carrito
const { pedido, actualizarCantidad, eliminarItem } = usePedido();

<div>
  {pedido.items.map(item => (
    <ItemCarrito
      item={item}
      onCantidadChange={actualizarCantidad}
      onEliminar={eliminarItem}
    />
  ))}
  <Total>{calcularTotal()}</Total>
</div>

✅ Lista de items con imágenes
✅ Controles de cantidad (+/-)
✅ Botón eliminar por item
✅ Total calculado automáticamente
✅ Botón "Vaciar Carrito"
```

#### 3. Seleccionar Mesa
```typescript
<select 
  value={mesaSeleccionada} 
  onChange={(e) => setMesaSeleccionada(e.target.value)}
>
  <option value="">Seleccionar mesa...</option>
  {mesas.map(mesa => (
    <option key={mesa._id} value={mesa._id}>
      Mesa {mesa.numero} - {mesa.ubicacion}
    </option>
  ))}
</select>

✅ Dropdown con mesas disponibles
✅ Validación de selección
✅ Solo mesas libres
```

#### 4. Confirmar Pedido
```typescript
async function handleConfirmar() {
  if (!mesaSeleccionada) {
    toast.error('Selecciona una mesa');
    return;
  }
  
  if (pedido.items.length === 0) {
    toast.error('El carrito está vacío');
    return;
  }
  
  setLoading(true);
  
  const result = await crearPedidoAction({
    mesaId: mesaSeleccionada,
    items: pedido.items,
    total: calcularTotal(),
  });
  
  if (result.success) {
    limpiarCarrito();
    router.push('/confirmacion');
  } else {
    toast.error(result.error);
  }
  
  setLoading(false);
}

✅ Validaciones previas
✅ Loading state durante envío
✅ Manejo de errores
✅ Limpieza del carrito
✅ Redirección a confirmación
```

### 3. Server Actions Implementadas

#### app/carrito/actions.ts
```typescript
'use server';

import { revalidatePath } from 'next/cache';
import { crearPedido } from '@/services/api';

export async function crearPedidoAction(datos: CrearPedidoInput) {
  try {
    // Validaciones en servidor
    if (!datos.mesaId) {
      return { success: false, error: 'Mesa requerida' };
    }
    
    if (datos.items.length === 0) {
      return { success: false, error: 'Carrito vacío' };
    }
    
    if (datos.total <= 0) {
      return { success: false, error: 'Total inválido' };
    }
    
    // Crear pedido en API
    const pedido = await crearPedido({
      mesaId: datos.mesaId,
      items: datos.items.map(item => ({
        platoId: item.platoId,
        cantidad: item.cantidad,
        precioUnitario: item.precio,
      })),
      total: datos.total,
      estado: 'pendiente',
    });
    
    // Revalidar rutas afectadas
    revalidatePath('/carrito');
    revalidatePath('/mesas');
    revalidatePath(`/mesa/${datos.mesaId}`);
    
    return { 
      success: true, 
      pedido,
      message: 'Pedido creado exitosamente'
    };
    
  } catch (error) {
    console.error('Error al crear pedido:', error);
    return { 
      success: false, 
      error: error instanceof Error 
        ? error.message 
        : 'Error al crear el pedido'
    };
  }
}

✅ Validaciones en servidor
✅ Manejo de errores robusto
✅ Revalidación de cache
✅ Tipado completo
✅ Logging de errores
```

### 4. Página de Confirmación

#### app/confirmacion/page.tsx
```typescript
'use client';

export default function ConfirmacionPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirigir después de 5 segundos
    const timer = setTimeout(() => {
      router.push('/menu');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [router]);
  
  return (
    <div className="confirmacion-container">
      <div className="success-icon">✅</div>
      <h1>¡Pedido Confirmado!</h1>
      <p>Tu pedido ha sido enviado a la cocina</p>
      <p className="text-sm text-gray-600">
        Serás redirigido al menú en 5 segundos...
      </p>
      <div className="actions">
        <Link href="/menu">
          Volver al Menú
        </Link>
        <Link href="/mesas">
          Ver Mesas
        </Link>
      </div>
    </div>
  );
}

✅ Mensaje de éxito claro
✅ Redirección automática
✅ Links de navegación
✅ Diseño centrado y limpio
```

### 5. Validaciones Implementadas

#### Validaciones del Cliente
```typescript
// Carrito vacío
if (pedido.items.length === 0) {
  return <CarritoVacio />;
}

// Mesa no seleccionada
if (!mesaSeleccionada) {
  setError('Debes seleccionar una mesa');
  return;
}

// Cantidad mínima
if (cantidad < 1) {
  setError('Cantidad debe ser al menos 1');
  return;
}

// Total válido
if (total <= 0) {
  setError('Total inválido');
  return;
}
```

#### Validaciones del Servidor
```typescript
// En Server Action
if (!datos.mesaId || datos.mesaId.trim() === '') {
  return { success: false, error: 'Mesa requerida' };
}

if (!Array.isArray(datos.items) || datos.items.length === 0) {
  return { success: false, error: 'Carrito vacío' };
}

if (typeof datos.total !== 'number' || datos.total <= 0) {
  return { success: false, error: 'Total inválido' };
}
```

### 6. Estados de Carga

#### Loading durante Fetch
```typescript
const [loading, setLoading] = useState(false);

async function handleSubmit() {
  setLoading(true);
  try {
    await crearPedidoAction(datos);
  } finally {
    setLoading(false);
  }
}

<button disabled={loading}>
  {loading ? 'Procesando...' : 'Confirmar Pedido'}
</button>
```

#### Loading Page
```typescript
// app/carrito/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
}
```

### 7. Manejo de Errores

#### Error Boundary
```typescript
// app/carrito/error.tsx
'use client';

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="error-container">
      <h2>Error en el Carrito</h2>
      <p>{error.message}</p>
      <button onClick={reset}>
        Intentar de nuevo
      </button>
      <Link href="/menu">
        Volver al Menú
      </Link>
    </div>
  );
}
```

#### Toast Notifications
```typescript
import { toast } from 'react-hot-toast';

// Éxito
toast.success('Pedido creado exitosamente');

// Error
toast.error('Error al crear el pedido');

// Loading
const toastId = toast.loading('Procesando...');
toast.dismiss(toastId);
```

---

## 🎯 Resultados Obtenidos

### Funcionalidades Completadas
- ✅ Flujo completo de pedidos funcional
- ✅ Integración Context + Server Actions
- ✅ Validaciones cliente y servidor
- ✅ Creación de pedidos en API
- ✅ Limpieza automática del carrito
- ✅ Página de confirmación
- ✅ Loading states en todo el flujo
- ✅ Error handling robusto
- ✅ Feedback visual constante

### Ventajas de la Integración
- ✅ Flujo de usuario completo
- ✅ Datos sincronizados
- ✅ Validaciones en ambos lados
- ✅ UX fluida y responsive
- ✅ Manejo de errores completo

### UX Mejorada
- ✅ Feedback inmediato en cada acción
- ✅ Loading states claros
- ✅ Mensajes de error descriptivos
- ✅ Confirmación visual
- ✅ Navegación intuitiva

---

## 🚀 Cómo Ejecutar

```bash
# 1. Configurar variables de entorno
echo "NEXT_PUBLIC_API_URL=https://restaurante-api.onrender.com/api" > .env.local

# 2. Instalar dependencias
npm install

# 3. Modo desarrollo
npm run dev

# 4. Probar flujo completo:
# - Ir a /menu
# - Agregar platos al carrito
# - Ir a /carrito
# - Seleccionar mesa
# - Confirmar pedido
# - Ver confirmación
```

---

## 📚 Conceptos Aprendidos

### 1. Integración Context + Server Actions
```typescript
// Context maneja estado local
const { pedido, limpiarCarrito } = usePedido();

// Server Action maneja mutación
const result = await crearPedidoAction(datos);

// Combinar ambos
if (result.success) {
  limpiarCarrito(); // Actualizar estado local
  router.push('/confirmacion'); // Navegar
}
```

### 2. Validaciones Dobles
```typescript
// Cliente: UX rápida
if (!mesaId) {
  toast.error('Selecciona una mesa');
  return;
}

// Servidor: Seguridad
if (!datos.mesaId) {
  return { success: false, error: 'Mesa requerida' };
}
```

### 3. Optimistic Updates
```typescript
// Actualizar UI inmediatamente
setItems(prev => [...prev, newItem]);

// Sincronizar con servidor
await createItem(newItem);

// Revertir si falla
if (!success) {
  setItems(prev => prev.filter(i => i.id !== newItem.id));
}
```

### 4. Error Recovery
```typescript
try {
  await action();
} catch (error) {
  // Log error
  console.error(error);
  
  // Mostrar al usuario
  toast.error('Algo salió mal');
  
  // Permitir reintentar
  setCanRetry(true);
}
```

---

## 🔧 Flujo Completo del Sistema

```
1. Usuario navega a /menu
   ↓
2. Ve lista de platos disponibles
   ↓
3. Click en "Agregar al Carrito"
   ↓
4. Context actualiza estado
   ↓
5. localStorage persiste datos
   ↓
6. NavBar muestra contador
   ↓
7. Usuario va a /carrito
   ↓
8. Ve items con cantidades
   ↓
9. Puede modificar o eliminar
   ↓
10. Selecciona mesa del dropdown
    ↓
11. Click en "Confirmar Pedido"
    ↓
12. Validaciones del cliente
    ↓
13. Server Action ejecuta
    ↓
14. Validaciones del servidor
    ↓
15. POST a API /pedidos
    ↓
16. API crea pedido en DB
    ↓
17. Retorna pedido creado
    ↓
18. revalidatePath() actualiza cache
    ↓
19. limpiarCarrito() vacía estado
    ↓
20. router.push('/confirmacion')
    ↓
21. Usuario ve confirmación
    ↓
22. Redirección automática a /menu
```

---

## 📝 Notas Importantes

### Performance
- Context re-renderiza consumidores
- Memoizar funciones pesadas
- Usar React.memo para componentes
- Lazy load componentes grandes

### Seguridad
- Validar siempre en servidor
- No confiar en datos del cliente
- Sanitizar inputs
- Usar HTTPS en producción

### UX Best Practices
- Loading states en todas las acciones
- Feedback inmediato
- Mensajes de error claros
- Permitir deshacer acciones
- Confirmar acciones destructivas

---

## 🎨 Mejoras Implementadas

1. **Toast Notifications** - Feedback visual instantáneo
2. **Loading Spinners** - Indicadores de progreso
3. **Empty States** - Mensajes cuando no hay datos
4. **Error Recovery** - Botones para reintentar
5. **Optimistic Updates** - UI actualiza antes de confirmar
6. **Form Validation** - Validación en tiempo real
7. **Responsive Design** - Funciona en todos los dispositivos
8. **Accessibility** - Labels, ARIA, keyboard navigation
