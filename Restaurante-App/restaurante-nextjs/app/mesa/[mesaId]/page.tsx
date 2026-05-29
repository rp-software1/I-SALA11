import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getMesaById } from '../../../src/services/api';
import MesaDetalle from './MesaDetalle';
import MesaDetalleSkeleton from './MesaDetalleSkeleton';

interface PageProps {
    params: Promise<{ mesaId: string }>;
}

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

    let mesa;
    try {
        mesa = await getMesaById(mesaId);
    } catch {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto animate-fade-in-up">
            <Link
                href="/mesas"
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Volver a mesas
            </Link>

            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Mesa {mesa!.numero}</h1>
                    <p className="text-gray-500 mt-1 capitalize">
                        {mesa!.estado.replace('_', ' ')} · {mesa!.capacidad} {mesa!.capacidad === 1 ? 'persona' : 'personas'}
                    </p>
                </div>
                <Link
                    href="/menu"
                    className="inline-flex items-center gap-2 bg-brand-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-brand-700 transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Realizar pedido
                </Link>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Información</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-gray-400">Capacidad</p>
                        <p className="font-medium text-gray-900">{mesa!.capacidad} personas</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">ID</p>
                        <p className="font-mono text-xs text-gray-600 truncate">{mesa!._id}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Estado</p>
                        <p className="font-medium capitalize text-gray-900">{mesa!.estado.replace('_', ' ')}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Número</p>
                        <p className="font-medium text-gray-900">{mesa!.numero}</p>
                    </div>
                </div>
            </div>

            <Suspense fallback={<MesaDetalleSkeleton />}>
                <MesaDetalle mesa={mesa!} />
            </Suspense>
        </div>
    );
}