# Día 1 - Router y Navegación en Next.js

## 📋 Lo que se Pedía

### Objetivos del Día 1
1. Crear la estructura básica del proyecto con App Router
2. Implementar navegación entre páginas
3. Crear rutas estáticas y dinámicas
4. Implementar un componente de navegación (NavBar)
5. Manejar páginas 404 personalizadas

### Requisitos Técnicos
- Usar Next.js 14+ con App Router
- Implementar rutas con el sistema de carpetas
- Crear rutas dinámicas con `[param]`
- Usar componentes `Link` para navegación
- Implementar `usePathname` para rutas activas

---

## ✅ Lo que se Realizó

### 1. Estructura de Rutas Creada

```
app/
├── page.tsx                    # Página principal (/)
├── layout.tsx                  # Layout raíz con metadata
├── globals.css                 # Estilos globales con Tailwind
├── not-found.tsx              # Página 404 personalizada
├── components/
│   └── NavBar.tsx             # Componente de navegación
├── mesas/
│   └── page.tsx               # Lista de mesas (/mesas)
├── mesa/
│   └── [mesaId]/
│       └── page.tsx           # Detalle de mesa dinámica (/mesa/[id])
├── menu/
│   └── page.tsx               # Página del menú (/menu)
└── carrito/
    └── page.tsx               # Página del carrito (/carrito)
```

### 2. Componentes Implementados

#### NavBar.tsx
```typescript
'use client';
- Navegación con Link de Next.js
- Resaltado de ruta activa con usePathname()
- Estilos condicionales según la ruta actual
- Diseño responsive con Tailwind CSS
```

#### Páginas Estáticas
- **/** - Página de inicio con bienvenida
- **/mesas** - Lista de mesas disponibles
- **/menu** - Menú del restaurante
- **/carrito** - Carrito de compras
- **/not-found** - Página 404 personalizada

#### Rutas Dinámicas
- **/mesa/[mesaId]** - Detalle individual de cada mesa
  - Usa `params.mesaId` para obtener el ID
  - Muestra información específica de la mesa

### 3. Características Implementadas

✅ **Navegación Client-Side**
- Transiciones instantáneas sin recargar página
- Prefetching automático de rutas

✅ **Rutas Activas**
- Indicador visual de la página actual
- Estilos dinámicos con clases condicionales

✅ **Rutas Dinámicas**
- Parámetros de URL capturados correctamente
- Tipado con TypeScript para params

✅ **Página 404**
- Diseño personalizado
- Botón para volver al inicio

### 4. Tecnologías Utilizadas

- **Next.js 15.1.6** - Framework React con App Router
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **ESLint** - Linting de código

### 5. Configuración del Proyecto

#### package.json
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

#### tsconfig.json
- Configuración estricta de TypeScript
- Path aliases configurados (@/*)
- Soporte para JSX

---

## 🎯 Resultados Obtenidos

### Funcionalidades Completadas
- ✅ Sistema de rutas funcional
- ✅ Navegación fluida entre páginas
- ✅ Rutas dinámicas operativas
- ✅ NavBar con indicador de ruta activa
- ✅ Página 404 personalizada
- ✅ Estilos consistentes con Tailwind

### Estructura del Proyecto
- ✅ Organización clara de carpetas
- ✅ Separación de componentes
- ✅ Convenciones de Next.js seguidas

### Calidad del Código
- ✅ TypeScript sin errores
- ✅ ESLint configurado
- ✅ Código limpio y mantenible

---

## 🚀 Cómo Ejecutar

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build de producción
npm run build

# Ejecutar producción
npm start
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## 📚 Conceptos Aprendidos

1. **App Router** - Nueva forma de enrutamiento en Next.js 13+
2. **File-based Routing** - Rutas basadas en estructura de carpetas
3. **Dynamic Routes** - Rutas con parámetros dinámicos `[param]`
4. **Client Components** - Componentes con 'use client' para interactividad
5. **usePathname Hook** - Hook para obtener la ruta actual
6. **Link Component** - Navegación optimizada de Next.js
7. **not-found.tsx** - Manejo de páginas no encontradas

---

## 📝 Notas Importantes

- Todas las páginas son Server Components por defecto
- NavBar es Client Component por usar hooks
- Las rutas se crean automáticamente según la estructura de carpetas
- El prefetching mejora la velocidad de navegación
- TypeScript proporciona seguridad de tipos en params
