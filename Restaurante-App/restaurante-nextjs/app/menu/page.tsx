import type { Metadata } from 'next';
import type { Plato } from '../../src/types';
import { getPlatos } from '../../src/services/api';
import MenuContent from './MenuContent';

export const metadata: Metadata = {
    title: 'Menú — Restaurante',
};

export default async function MenuPage() {
    const platos: Plato[] = await getPlatos();
    const disponibles = platos.filter(p => p.disponible);
    return <MenuContent platos={disponibles} />;
}
