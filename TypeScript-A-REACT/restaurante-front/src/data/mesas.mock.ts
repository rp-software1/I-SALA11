export type EstadoMesa = 'libre' | 'ocupada' | 'reservada';

export interface Mesa {
    id: number;
    numero: number;
    capacidad: number;
    estado: EstadoMesa;
    comensales?: number;
}

export const mesasMock: Mesa[] = [
    { id: 1, numero: 1, capacidad: 4, estado: "libre" },
    { id: 2, numero: 2, capacidad: 2, estado: "ocupada", comensales: 2 },
    { id: 3, numero: 3, capacidad: 6, estado: "reservada", comensales: 0 },
    { id: 4, numero: 4, capacidad: 4, estado: "libre" },
    { id: 5, numero: 5, capacidad: 8, estado: "ocupada", comensales: 6 },
    { id: 6, numero: 6, capacidad: 2, estado: "libre" },
];
