// Dia4
// app/mesa/[mesaId]/page.tsx
// Server Component — fetch real + metadata dinámica
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getMesaById } from '../../../src/services/api';
import MesaDetalle from './MesaDetalle';
import MesaDetalleSkeleton from './MesaDetalleSkeleton';

// En Next.js 15 — params es Promise<{mesaId: string}>
interface PageProps {
    params: Promise<{ mesaId: string }>;
}

// generateMetadata — título dinámico para la pestaña del browser
// Puede ser async y hacer fetch de datos
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { mesaId } = await params;
    try {
        const mesa = await getMesaById(mesaId);
        return {
            title: `Mesa ${mesa.numero} — Restaurante`,
            description: `Estado: ${mesa.estado} | Capacidad: ${mesa.capacidad} personas`,
        };
    } catch {
        return { title: 'Mesa no encontrada — Restaurante' };
    }
}

export default async function MesaPage({ params }: PageProps) {
    const { mesaId } = await params;

    // Obtener la mesa del backend
    let mesa;
    try {
        mesa = await getMesaById(mesaId);
    } catch {
        // Si la mesa no existe → mostrar la página 404 personalizada
        notFound();
    }

    return (
        <div className="max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
                Mesa {mesa!.numero}
                <span className="ml-3 text-base font-normal text-gray-500 capitalize">
                    {mesa!.estado.replace("_", " ")}
                </span>
            </h1>

            {/* Información básica — Server Component */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
                <p className="text-gray-600">Capacidad: <span className="font-medium">{mesa!.capacidad} personas</span></p>
                <p className="text-gray-600">ID: <span className="font-mono text-xs">{mesa!._id}</span></p>
            </div>

            {/* Suspense manual — MesaDetalle es Client Component con interacción */}
            <Suspense fallback={<MesaDetalleSkeleton />}>
                <MesaDetalle mesa={mesa!} />
            </Suspense>
        </div>
    );
}


// =================================================================================================================


/*
interface MesaDetailProps {
    params: {
        mesaId: string;  // siempre string — Next.js no lo convierte a número
    };
}

export default function MesaDetailPage({ params }: MesaDetailProps) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Detalle de Mesa</h1>
            <p>ID recibido: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{params.mesaId}</span></p>
            <p className="text-gray-500 mt-4">Aquí irá la información de la mesa — conectar en Día 4</p>
        </div>
    );
}

*/