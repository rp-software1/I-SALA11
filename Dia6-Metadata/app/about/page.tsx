export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <section className="panel bg-white border border-slate-100 shadow-xl p-8 md:p-10 rounded-3xl space-y-6">
        <div>
          <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-100/50 rounded-full px-3 py-1.5 mb-2">
            Nuestra historia
          </span>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Sobre nosotros</h1>
        </div>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          En nuestro Restaurante creemos en una experiencia cálida y cercana. Nuestra cocina combina sabores peruanos con ingredientes frescos y una atención pensada para que cada visita sea especial.
        </p>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          Avanzamos con una interfaz moderna, pedidos rápidos y un diseño adaptado para que tus clientes encuentren su plato favorito con facilidad.
        </p>
      </section>
    </main>
  );
}
