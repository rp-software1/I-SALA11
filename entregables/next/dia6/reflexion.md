# Reflexión Día 6

## Bloque A
Client Components no pueden exportar metadata. Se solucionó con useEffect + document.title.

## Bloque B
Open Graph y title.template configurados en layout. Los pages solo necesitan title simple, el template agrega el sufijo.

## Bloque C
Se encontró código comentado de versiones anteriores (Día 1-2). Se eliminó ~100 líneas de código muerto.

## Bloque D
npm run build exitoso en 5.4s. Rutas: 3 estáticas (/, /_not-found, /carrito), 4 dinámicas (/comandas, /menu, /mesa/[mesaId], /mesas).

## Bloque E
0 errores TypeScript en ambos proyectos (restaurante-nextjs y restaurante-frontend).

## Bloque F
Pendiente: Loom y PR.
