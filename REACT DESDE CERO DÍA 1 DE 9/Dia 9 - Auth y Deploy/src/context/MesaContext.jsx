import { createContext, useContext, useState } from "react";

const MesaContext = createContext();

export function MesaProvider({ children }) {
    const [mesaActiva, setMesaActiva] = useState(null);

    return (
        <MesaContext.Provider value={{ mesaActiva, setMesaActiva }}>
            {children}
        </MesaContext.Provider>
    );
}

export function useMesa() {
    return useContext(MesaContext);
}