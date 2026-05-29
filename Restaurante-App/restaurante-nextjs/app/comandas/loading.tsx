export default function ComandasLoading() {
  return (
    <div>
      <div className="h-8 bg-gray-200 rounded mb-6 w-48 animate-pulse" />
      <div className="h-5 bg-gray-200 rounded mb-3 w-24 animate-pulse" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border-2 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/2" />
            <div className="h-3 bg-gray-200 rounded mb-4 w-full" />
            <div className="h-8 bg-gray-200 rounded w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
