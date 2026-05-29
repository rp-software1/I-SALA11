// app/menu/loading.tsx — skeleton para el menú de platos
export default function MenuLoading() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Menú del Restaurante</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="border rounded-lg p-4 animate-pulse">
                        <div className="h-5 bg-gray-200 rounded mb-2 w-3/4" />
                        <div className="h-4 bg-gray-200 rounded mb-2 w-full" />
                        <div className="h-4 bg-gray-200 rounded mb-4 w-1/4" />
                        <div className="flex justify-between">
                            <div className="h-6 bg-gray-200 rounded w-1/4" />
                            <div className="h-6 bg-gray-200 rounded w-1/4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

