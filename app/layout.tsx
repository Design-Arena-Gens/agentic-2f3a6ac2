import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Plantillas de CV 2025 ? 40 Dise?os',
  description: 'Galer?a de 40 plantillas de CV modernas para 2025 con impresi?n a PDF.',
  metadataBase: new URL('https://agentic-2f3a6ac2.vercel.app'),
  keywords: ['CV', 'Curriculum', 'Plantillas', '2025', 'Resume Templates'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`bg-neutral-50 text-neutral-900`}>
        {children}
      </body>
    </html>
  );
}
