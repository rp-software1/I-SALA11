// Tipos compartidos del sistema de restaurante

export type EstadoMesa = 'disponible' | 'ocupada' | 'reservada' | 'fuera_servicio';

export interface Mesa {
  _id: string;
  numero: number;
  capacidad: number;
  estado: EstadoMesa;
  pedidoActivoId?: string | null;
}

export type CategoriaPlato = 'entrada' | 'principal' | 'postre' | 'bebida';

export interface Plato {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: CategoriaPlato;
  disponible: boolean;
  imagen?: string;
  rating?: number;
  ingredientes?: string[];
}

export type TipoPedido = 'mesa' | 'para_llevar';

export type EstadoPedido = 'pendiente' | 'en_preparacion' | 'lista' | 'entregada' | 'cancelada';

export interface ItemPedido {
  platoId: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

export interface Pedido {
  _id: string;
  mesaId: string | null;
  tipo: TipoPedido;
  estado: EstadoPedido;
  items: ItemPedido[];
  total: number;
  creadoEn: string;
  actualizadoEn: string;
}

// Context del pedido en el cliente
export interface EstadoPedidoContext {
  mesaId: string | null;
  tipo: TipoPedido;
  estado: EstadoPedido;
  items: ItemPedido[];
  total: number;
}

export interface PedidoContextType {
  pedido: EstadoPedidoContext;
  agregarPlato: (plato: Plato) => void;
  quitarPlato: (platoId: string) => void;
  cambiarTipo: (tipo: TipoPedido) => void;
  asignarMesa: (mesaId: string | null) => void;
  limpiarPedido: () => void;
  carritoAbierto: boolean;
  toggleCarrito: () => void;
  cerrarCarrito: () => void;
}
