# Día 4 - Rutas Dinámicas y Detalles

## 📋 Lo que se Pedía

### Objetivos del Día 4
1. Implementar rutas dinámicas con parámetros
2. Crear página de detalle de mesa individual
3. Fetch de datos específicos por ID
4. Implementar loading y error states específicos
5. Mostrar información detallada de la mesa
6. Agregar Server Actions para cambiar estados

### Requisitos Técnicos
- Usar `[mesaId]` para rutas dinámicas
- Implementar `getMesaById()` en servicios
- Crear componentes de detalle
- Manejar errores 404 para IDs inválidos
- Implementar skeleton loading específico
- Usar Server Actions para mutaciones

---

## ✅ Lo que se Realizó

### 1. Estructura de Archivos Creada

```
Dia4-Details/
├── src/
│   └── services/
│       └── api.ts                      # Servicios actualizados
└── app/
    └── mesa/
        └── [mesaId]/
            ├── page.tsx                # Página de detalle
            ├── loading.tsx             # Loading específico
            ├── error.tsx               # Error específico
            ├── actions.ts              # Server Actions
            ├── MesaDetalle.tsx         # Componente principal
            └── MesaDetalleSkeleton.tsx # Skeleton personalizado
```

### 2. Servicios de API Extendidos

#### src/services/api.ts
```typescript
✅ getMesaById(id: string): Promise<Mesa>
   - Fetch de mesa específica
   - Manejo de 404
   - Validación de respuesta
   - Tipado completo

✅ cambiarEstadoPedido(pedidoId, estado)
   - PATCH request
   - Actualización de estado
   - Manejo de errores
```

### 3. Página de Detalle Implementada

#### app/mesa/[mesaId]/page.tsx
```typescript
interface Props {
  params: Promise<{ mesaId: string }>;
}

export default async function MesaDetallePage({ params }: Props) {
  const { mesaId } = await params;
  const mesa = await getMesaById(mesaId);
  
  return <MesaDetalle mesa={mesa} />;
}

✅ Async Server Component
✅ Parámetros tipados
✅ Fetch de datos específicos
✅ Manejo automático de errores
✅ Metadata dinámica
```

### 4. Componente de Detalle

#### MesaDetalle.tsx
```typescript
'use client';

export default function MesaDetalle({ mesa }: Props) {
  return (
    <div>
      {/* Header con número y estado */}
      <div className="header">
        <h1>Mesa {mesa.numero}</h1>
        <Badge estado={mesa.estado} />
      </div>
      
      {/* Información de la mesa */}
      <div className="info">
        <InfoItem icon="👥" label="Capacidad" value={mesa.capacidad} />
        <InfoItem icon="📍" label="Ubicación" value={mesa.ubicacion} />
        <InfoItem icon="📊" label="Estado" value={mesa.estado} />
      </div>
      
      {/* Acciones disponibles */}
      <div className="actions">
        <button onClick={handleCambiarEstado}>
          Cambiar Estado
        </button>
      </div>
    </div>
  );
}

✅ Diseño limpio y organizado
✅ Información clara y visible
✅ Acciones contextuales
✅ Responsive design
```

### 5. Loading State Personalizado

#### MesaDetalleSkeleton.tsx
```typescript
export default function MesaDetalleSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Skeleton del header */}
      <div className="h-12 bg-gray-200 rounded w-1/3" />
      
      {/* Skeleton de la info */}
      <div className="grid gap-4">
        <div className="h-20 bg-gray-200 rounded" />
        <div className="h-20 bg-gray-200 rounded" />
        <div className="h-20 bg-gray-200 rounded" />
      </div>
      
      {/* Skeleton de acciones */}
      <div className="h-12 bg-gray-200 rounded w-full" />
    </div>
  );
}

✅ Animación pulse
✅ Estructura similar al contenido real
✅ Mejora percepción de velocidad
```

#### loading.tsx
```typescript
import MesaDetalleSkeleton from './MesaDetalleSkeleton';

export default function Loading() {
  return <MesaDetalleSkeleton />;
}
```

### 6. Error Handling Específico

#### error.tsx
```typescript
'use client';

export default function Error({ 
  error, 
  reset 
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="error-container">
      <h2>Error al cargar la mesa</h2>
      <p>{error.message}</p>
      
      {error.message.includes('no encontrada') ? (
        <Link href="/mesas">
          Ver todas las mesas
        </Link>
      ) : (
        <button onClick={reset}>
          Intentar de nuevo
        </button>
      )}
    </div>
  );
}

✅ Manejo de 404
✅ Mensajes específicos
✅ Acciones contextuales
✅ Navegación alternativa
```

### 7. Server Actions

#### actions.ts
```typescript
'use server';

import { revalidatePath } from 'next/cache';
import { cambiarEstadoPedido } from '@/services/api';

export async function cambiarEstadoAction(
  pedidoId: string,
  nuevoEstado: EstadoPedido
) {
  try {
    const pedido = await cambiarEstadoPedido(pedidoId, nuevoEstado);
    revalidatePath(`/mesa/[mesaId]`);
    return { success: true, pedido };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
}

✅ Ejecución en servidor
✅ Revalidación de cache
✅ Manejo de errores
✅ Tipado completo
```

### 8. Metadata Dinámica

```typescript
export async function generateMetadata({ 
  params 
}: Props): Promise<Metadata> {
  const { mesaId } = await params;
  const mesa = await getMesaById(mesaId);
  
  return {
    title: `Mesa ${mesa.numero} - Restaurante`,
    description: `Detalles de la mesa ${mesa.numero} - ${mesa.ubicacion}`,
  };
}

✅ SEO optimizado
✅ Título dinámico
✅ Descripción contextual
```

---

## 🎯 Resultados Obtenidos

### Funcionalidades Completadas
- ✅ Ruta dinámica `/mesa/[mesaId]` funcional
- ✅ Fetch de mesa específica por ID
- ✅ Página de detalle completa
- ✅ Loading state personalizado
- ✅ Error handling con 404
- ✅ Server Actions implementadas
- ✅ Metadata dinámica
- ✅ Diseño responsive

### Ventajas de Rutas Dinámicas
- ✅ URLs amigables y semánticas
- ✅ SEO mejorado por página
- ✅ Navegación intuitiva
- ✅ Código reutilizable
- ✅ Escalable a muchos items

### UX Mejorada
- ✅ Skeleton loading específico
- ✅ Errores contextuales
- ✅ Información clara y organizada
- ✅ Acciones visibles
- ✅ Navegación fluida

---

## 🚀 Cómo Ejecutar

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Probar funcionalidades:
# 1. Ir a /mesas
# 2. Click en una mesa
# 3. Ver detalle en /mesa/[id]
# 4. Probar con ID inválido
# 5. Ver error 404
```

---

## 📚 Conceptos Aprendidos

### 1. Rutas Dinámicas
```typescript
// Estructura de carpetas
app/
  mesa/
    [mesaId]/
      page.tsx

// Acceso a parámetros
async function Page({ params }: Props) {
  const { mesaId } = await params;
  // usar mesaId
}
```

### 2. Metadata Dinámica
```typescript
export async function generateMetadata({ params }) {
  const data = await fetchData(params.id);
  return {
    title: data.title,
    description: data.description,
  };
}
```

### 3. Error Boundaries
```typescript
// error.tsx captura errores de:
- Fetch fallido
- Componente crasheado
- Datos inválidos
- 404 not found
```

### 4. Server Actions
```typescript
'use server';

export async function myAction(formData: FormData) {
  // Mutación en servidor
  revalidatePath('/path'); // Actualizar cache
  redirect('/success'); // Redireccionar
}
```

### 5. Skeleton Loading
```typescript
// Mejora UX mostrando estructura
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded" />
</div>
```

---

## 🔧 Flujo de Datos

### Carga de Página
```
1. Usuario navega a /mesa/123
   ↓
2. Next.js extrae mesaId = "123"
   ↓
3. Muestra loading.tsx (skeleton)
   ↓
4. Server Component ejecuta getMesaById("123")
   ↓
5. API retorna datos de la mesa
   ↓
6. Renderiza MesaDetalle con datos
   ↓
7. Usuario ve información completa
```

### Manejo de Errores
```
1. getMesaById("999") - ID inválido
   ↓
2. API retorna 404
   ↓
3. Throw Error("Mesa no encontrada")
   ↓
4. error.tsx captura el error
   ↓
5. Muestra mensaje y link a /mesas
```

### Server Action
```
1. Usuario click en "Cambiar Estado"
   ↓
2. Ejecuta cambiarEstadoAction()
   ↓
3. PATCH request a API
   ↓
4. revalidatePath() actualiza cache
   ↓
5. Página se re-renderiza con nuevos datos
```

---

## 📝 Notas Importantes

### Parámetros en Next.js 15
```typescript
// Next.js 15+ - params es Promise
async function Page({ params }: Props) {
  const { id } = await params; // await requerido
}

// Next.js 14 - params es objeto
function Page({ params }: Props) {
  const { id } = params; // directo
}
```

### Cache y Revalidación
```typescript
// No cache (datos dinámicos)
fetch(url, { cache: 'no-store' })

// Revalidar después de mutación
revalidatePath('/mesa/[mesaId]')

// Revalidar por tiempo
fetch(url, { next: { revalidate: 60 } })
```

### Error vs Not Found
```typescript
// Para 404 específico
import { notFound } from 'next/navigation';

if (!data) {
  notFound(); // Muestra not-found.tsx
}

// Para otros errores
throw new Error('Algo salió mal'); // Muestra error.tsx
```

---

## 🎨 Mejoras Implementadas

1. **Skeleton Personalizado** - Loading específico del contenido
2. **Error Contextual** - Mensajes según tipo de error
3. **Metadata Dinámica** - SEO por cada mesa
4. **Server Actions** - Mutaciones optimizadas
5. **Type Safety** - TypeScript en params
6. **Responsive Design** - Funciona en todos los dispositivos
7. **Navegación Intuitiva** - Breadcrumbs y links
8. **Feedback Visual** - Estados claros y visibles

---

## 🔄 Patrones Implementados

### 1. Fetch-Render Pattern
```typescript
// Server Component hace fetch
async function Page() {
  const data = await fetchData();
  return <Component data={data} />;
}
```

### 2. Loading-Error-Success Pattern
```
loading.tsx → Mientras carga
error.tsx → Si falla
page.tsx → Si tiene éxito
```

### 3. Server Action Pattern
```typescript
'use server';
async function action() {
  // Mutación
  revalidatePath();
  return result;
}
```

### 4. Skeleton UI Pattern
```typescript
// Estructura similar al contenido real
<div className="animate-pulse">
  {/* Placeholders */}
</div>
```
