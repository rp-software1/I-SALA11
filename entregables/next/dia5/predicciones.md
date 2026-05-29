# Predicciones Día 5

## Bloque A — getPedidos y endpoints
- ¿GET /pedidos?estado=pendiente funciona? — Pendiente de verificar (sin backend)
- URL exacta de PATCH para cambiar estado: /pedidos/:id/estado

## Bloque B — generateMetadata
- ¿Puede ser síncrona? Sí
- ¿Por qué? Porque el título "Comandas — Restaurante" es estático, no depende de datos del backend

## Bloque C — ComandaCard
- Para un pedido "para_llevar" muestra: "Para llevar"
- Para un pedido "mesa" muestra: "Mesa [número]"

## Bloque D — revalidatePath
- ¿La lista se actualiza automáticamente? Sí, revalidatePath invalida el caché del servidor
- ¿router.refresh() sería necesario en el Cliente? Solo si se necesita actualización inmediata sin navegar
