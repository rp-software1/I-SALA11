export const platos = [
  {
    _id: 'p1',
    nombre: 'Ceviche clásico',
    descripcion: 'Pescado fresco marinado en limón, cebolla y ají limo.',
    precio: 28.5,
    categoria: 'principal',
    disponible: true,
    imagen: 'https://images.unsplash.com/photo-1535850456174-88000dfebf97?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    ingredientes: ['pescado', 'limón', 'cebolla', 'ají']
  },
  {
    _id: 'p2',
    nombre: 'Lomo saltado',
    descripcion: 'Trozos de lomo salteados con cebolla y tomate, servido con papas fritas.',
    precio: 35.0,
    categoria: 'principal',
    disponible: true,
    imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    ingredientes: ['carne', 'cebolla', 'tomate', 'papas']
  },
  {
    _id: 'p3',
    nombre: 'Ensalada de quinoa',
    descripcion: 'Quinoa orgánica con vegetales frescos y vinagreta de hierbas.',
    precio: 18.0,
    categoria: 'entrada',
    disponible: true,
    imagen: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&auto=format&fit=crop&q=80',
    rating: 4.2,
    ingredientes: ['quinoa', 'tomate', 'pepino', 'hierbas']
  },
  {
    _id: 'p4',
    nombre: 'Cheesecake de maracuyá',
    descripcion: 'Postre cremoso con reducción de maracuyá y crocante de galleta.',
    precio: 12.5,
    categoria: 'postre',
    disponible: true,
    imagen: 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?w=800&auto=format&fit=crop&q=80',
    rating: 4.6,
    ingredientes: ['queso', 'azúcar', 'maracuyá']
  },
  {
    _id: 'p5',
    nombre: 'Chicha morada',
    descripcion: 'Bebida tradicional de maíz morado con piña y canela.',
    precio: 8.0,
    categoria: 'bebida',
    disponible: true,
    imagen: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
    rating: 4.5,
    ingredientes: ['maíz morado', 'piña', 'canela']
  }
];

export const mesas = [
  { _id: 'm1', numero: 1, capacidad: 2, estado: 'disponible' },
  { _id: 'm2', numero: 2, capacidad: 4, estado: 'ocupada' },
  { _id: 'm3', numero: 3, capacidad: 6, estado: 'reservada' },
  { _id: 'm4', numero: 4, capacidad: 4, estado: 'disponible' },
  { _id: 'm5', numero: 5, capacidad: 8, estado: 'fuera_servicio' }
];
