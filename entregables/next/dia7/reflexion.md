# Reflexión Día 7

## Bloque A — Diseño
Se agregó una capa completa de diseño visual: tema brand rojo, animaciones, fuente Inter, hero gradient, íconos por estado, stepper en carrito, barra de progreso en comandas, menú responsive. La app pasó de ser funcional pero "cruda" a tener identidad visual.

## Bloque B — Railway
El backend json-server se desplegó en Railway sin problemas. Solo se necesitó cambiar el puerto fijo 3001 por $PORT para que Railway lo asigne dinámicamente.

## Bloque C — Vercel
El frontend se desplegó en Vercel apuntando al backend de Railway via NEXT_PUBLIC_API_URL.

## Bloque D — openGraph
Se actualizó la metadata con la URL de producción para compatibilidad con redes sociales.

## Bloque E — Build
npm run build exitoso. 0 errores TypeScript.

## Bloque F — Entregables
Checklist, predicciones y reflexión completados. Pendiente: Loom y aprobación de PR.
