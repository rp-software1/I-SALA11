export default function MesaDetalleSkeleton() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm animate-pulse">
      <div className="h-5 bg-gray-200 rounded mb-4 w-1/2" />
      <div className="flex gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-9 bg-gray-200 rounded w-28" />
        ))}
      </div>
    </div>
  );
}
