type EstadoMesa = 'libre' | 'ocupada' | 'reservada';

interface MesaCardProps {
    numero: number;
    capacidad: number;
    estado: EstadoMesa;
    comensales?: number;
}

const colores: Record<EstadoMesa, { border: string; background: string }> = {
    libre: { border: "1px solid #28a745", background: "#d4edda" },
    ocupada: { border: "1px solid #dc3545", background: "#f8d7da" },
    reservada: { border: "1px solid #ffc107", background: "#fff3cd" },
};

function MesaCard({ numero, capacidad, estado, comensales }: MesaCardProps) {
    return (
        <div style={{
            ...colores[estado],
            borderRadius: "8px",
            padding: "12px",
            width: "160px",
        }}>
            <h3>Mesa {numero}</h3>
            <p>Capacidad: {capacidad}</p>
            <p>Comensales: {comensales}</p>
            <p>
                {estado === "libre"
                    ? "Libre"
                    : estado === "ocupada"
                        ? "Ocupada"
                        : "Reservada"}
            </p>
        </div>
    );
}

export default MesaCard;