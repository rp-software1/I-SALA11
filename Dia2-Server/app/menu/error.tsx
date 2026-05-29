'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MenuError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Error en /menu:", error.message);
  }, [error]);

  return (
    <div className="text-center mt-12">
      <p className="text-4xl mb-4">⚠️</p>
      <h2 className="text-xl font-bold mb-2">No se pudo cargar el menú</h2>
      <p className="text-gray-500 mb-6 text-sm">{error.message}</p>
      <button
        onClick={reset}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Reintentar
      </button>
    </div>
  );
}
