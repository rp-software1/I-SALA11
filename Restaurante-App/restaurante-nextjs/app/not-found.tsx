import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Página no encontrada',
};

export default function NotFound() {
    return (
        <div className="text-center mt-20">
            <h1 className="text-4xl font-bold">404</h1>
            <p>Página no encontrada</p>

            <Link href="/mesas" className="text-blue-600 underline">
                Volver
            </Link>
        </div>
    );
}