import type { Metadata } from 'next';
import type { Mesa } from '../../src/types';
import { getMesas } from '../../src/services/api';
import MesaCard from './MesaCard';

export const metadata: Metadata = {
  title: 'Mesas — Restaurante',
};

export default async function MesasPage() {
  const mesas: Mesa[] = await getMesas();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mesas del Restaurante</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {mesas.map((mesa: Mesa) => (
          <MesaCard key={mesa._id} mesa={mesa} />
        ))}
      </div>
    </div>
  );
}
