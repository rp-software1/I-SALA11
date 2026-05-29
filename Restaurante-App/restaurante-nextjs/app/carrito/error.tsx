// Dia3

// app/carrito/error.tsx
// 'use client' — siempre obligatorio en error.tsx
'use client';
import { useEffect } from 'react';

export default function CarritoError({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => { console.error(error); }, [error]);
    return (
        <div className="text-center mt-12">
            <p className="text-4xl mb-4">⚠️</p>
            <p className="font-bold mb-4">Error en el carrito</p>
            <button onClick={reset} className="bg-blue-600 text-white px-6 py-2 rounded">Reintentar</button>
        </div>
    );
}
