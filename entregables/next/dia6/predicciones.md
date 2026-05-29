# Predicciones Día 6

## Bloque A — Metadata
- ¿CarritoPage puede exportar metadata? No
- ¿Qué hace que sea imposible? Es Client Component ('use client') — metadata solo funciona en Server Components

## Bloque B — Open Graph
- ¿Dónde se configura para imágenes externas? next.config.ts
- ¿Qué campo controla eso? images.remotePatterns

## Bloque C — Auditoría
- Encontrado: código comentado de Día 2 (PlatoCard.tsx, NavBar.tsx, carrito/page.tsx) — eliminado

## Bloque D — Build
- ¿El build falla si el backend está caído? Sí, para generateMetadata que hace fetch.
- ¿Por qué? Porque la metadata se genera en build time y necesita el fetch para obtener datos.
