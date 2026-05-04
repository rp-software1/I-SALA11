export interface Plato {
    id: number;
    nombre: string;
    categoria: string;
    precio: number;
    stock: number;
    disponible: boolean;
    enOferta: boolean;
    precioOferta?: number;
}

export const platosMock: Plato[] = [
    { id: 1, nombre: "Ceviche Clásico", categoria: "Entradas", precio: 28, stock: 10, disponible: true, enOferta: true, precioOferta: 22 },
    { id: 2, nombre: "Lomo Saltado", categoria: "Fondos", precio: 35, stock: 8, disponible: true, enOferta: false },
    { id: 3, nombre: "Ají de Gallina", categoria: "Fondos", precio: 30, stock: 5, disponible: true, enOferta: false },
    { id: 4, nombre: "Causa Limeña", categoria: "Entradas", precio: 18, stock: 0, disponible: false, enOferta: false },
    { id: 5, nombre: "Arroz con Leche", categoria: "Postres", precio: 12, stock: 15, disponible: true, enOferta: true, precioOferta: 9 },
    { id: 6, nombre: "Chicharrón de Pescado", categoria: "Entradas", precio: 25, stock: 6, disponible: true, enOferta: false },
    { id: 7, nombre: "Seco de Res", categoria: "Fondos", precio: 32, stock: 4, disponible: true, enOferta: false },
    { id: 8, nombre: "Mazamorra Morada", categoria: "Postres", precio: 10, stock: 0, disponible: false, enOferta: false },
];
