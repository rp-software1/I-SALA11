'use client';

import { useRouter } from 'next/navigation';
import type { Mesa } from '../../src/types';

interface MesaCardProps {
  mesa: Mesa;
}

const configPorEstado: Record<Mesa["estado"], {
  border: string;
  bg: string;
  hoverShadow: string;
  icon: string;
  label: string;
  labelColor: string;
}> = {
  disponible: {
    border: 'border-green-200 group-hover:border-green-400',
    bg: 'bg-green-50',
    hoverShadow: 'hover:shadow-green-100/50',
    icon: '✓',
    label: 'Disponible',
    labelColor: 'bg-green-100 text-green-700',
  },
  ocupada: {
    border: 'border-red-200 group-hover:border-red-400',
    bg: 'bg-red-50',
    hoverShadow: 'hover:shadow-red-100/50',
    icon: '👤',
    label: 'Ocupada',
    labelColor: 'bg-red-100 text-red-700',
  },
  reservada: {
    border: 'border-yellow-200 group-hover:border-yellow-400',
    bg: 'bg-yellow-50',
    hoverShadow: 'hover:shadow-yellow-100/50',
    icon: '📅',
    label: 'Reservada',
    labelColor: 'bg-yellow-100 text-yellow-700',
  },
  fuera_servicio: {
    border: 'border-gray-200',
    bg: 'bg-gray-50',
    hoverShadow: '',
    icon: '✕',
    label: 'Fuera servicio',
    labelColor: 'bg-gray-100 text-gray-500',
  },
};

export default function MesaCard({ mesa }: MesaCardProps) {
  const router = useRouter();
  const config = configPorEstado[mesa.estado];
  const disabled = mesa.estado === 'fuera_servicio';

  return (
    <button
      onClick={() => { if (!disabled) router.push(`/mesa/${mesa._id}`); }}
      disabled={disabled}
      className={`group relative rounded-xl border-2 p-5 text-left w-full transition-all duration-200
        ${config.bg} ${config.border} ${config.hoverShadow}
        hover:shadow-lg hover:-translate-y-0.5
        ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-lg font-bold text-gray-900">Mesa {mesa.numero}</span>
        <span className="text-lg">{config.icon}</span>
      </div>
      <div className="flex items-center gap-1.5 mb-3 text-sm text-gray-500">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
        {mesa.capacidad} {mesa.capacidad === 1 ? 'persona' : 'personas'}
      </div>
      <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${config.labelColor}`}>
        {config.label}
      </span>
    </button>
  );
}
