"use client";

import { useMemo } from 'react';
import { TemplateRenderer } from '@/components/TemplateRenderer';
import { sampleData, templateNames } from '@/lib/sampleData';
import Link from 'next/link';

export default function TemplatePage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const name = templateNames[id - 1] ?? `Plantilla ${id}`;

  const data = useMemo(() => sampleData, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-6">
      <div className="no-print mb-6 flex items-center justify-between gap-4">
        <div>
          <Link href="/" className="text-sm text-neutral-600 hover:underline">? Volver</Link>
          <h1 className="text-2xl font-bold mt-1">{name}</h1>
          <p className="text-sm text-neutral-600">Variante #{id} ? Lista para impresi?n</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handlePrint} className="px-4 py-2 rounded-lg bg-black text-white text-sm hover:opacity-90">Imprimir / PDF</button>
          <a href={`/?plantilla=${id}`} className="px-4 py-2 rounded-lg border text-sm">Otra plantilla</a>
        </div>
      </div>

      <TemplateRenderer data={data} variant={id} />
    </main>
  );
}
