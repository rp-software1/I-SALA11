# Predicciones Día 7

## Bloque A — Diseño
- ¿Qué archivo es crítico para que Tailwind funcione? globals.css con @import "tailwindcss"
- ¿Por qué? Sin la importación, ninguna utility class de Tailwind tiene efecto

## Bloque B — Railway
- ¿Qué variable de entorno necesita Railway? PORT (asignado automáticamente)
- ¿Qué cambio se hizo en package.json? --port 3001 → --port $PORT

## Bloque C — Vercel
- ¿Dónde se configura NEXT_PUBLIC_API_URL? En Environment Variables del proyecto Vercel
- ¿Qué pasa si no se configura? Las llamadas API fallan en producción

## Bloque D — openGraph
- ¿Qué campo se actualizó? url: 'https://i-sala-11.vercel.app'
- ¿Para qué sirve? Para que las redes sociales muestren la URL correcta al compartir
