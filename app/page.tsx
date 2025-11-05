import Link from 'next/link';
import { templateNames } from '@/lib/sampleData';

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">40 Plantillas de CV 2025</h1>
        <p className="mt-2 text-neutral-700">Explora dise?os modernos listos para imprimir en PDF. Selecciona una plantilla para ver el detalle.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {templateNames.map((name, index) => (
          <Link key={index} href={`/plantillas/${index + 1}`} className="group block">
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-[3/4] bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-neutral-300 group-hover:text-neutral-400 transition-colors">{index + 1}</div>
                  <div className="mt-2 text-sm text-neutral-600">{name}</div>
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm font-medium">{name}</div>
                <div className="text-xs text-neutral-600">Haz clic para previsualizar</div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <footer className="mt-12 text-center text-xs text-neutral-500">
        ? 2025 Plantillas de CV. Exporta a PDF desde el detalle de cada plantilla.
      </footer>
    </main>
  );
}
