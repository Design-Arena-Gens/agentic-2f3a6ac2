"use client";

import React from 'react';

export type ResumeData = {
  name: string;
  title: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    github?: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    role: string;
    start: string;
    end: string;
    bullets: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    start: string;
    end: string;
  }>;
  skills: string[];
  languages?: string[];
};

const fontClassByVariant = (variant: number): string => {
  const fonts = [
    'font-inter',
    'font-roboto',
    'font-poppins',
    'font-montserrat',
    'font-merriweather',
    'font-playfair',
    'font-source-sans',
    'font-lora',
  ];
  return fonts[(variant - 1) % fonts.length];
};

const paletteByVariant = (variant: number) => {
  const palettes = [
    { primary: 'indigo-600', light: 'indigo-50', border: 'indigo-200' },
    { primary: 'rose-600', light: 'rose-50', border: 'rose-200' },
    { primary: 'emerald-600', light: 'emerald-50', border: 'emerald-200' },
    { primary: 'sky-600', light: 'sky-50', border: 'sky-200' },
    { primary: 'amber-600', light: 'amber-50', border: 'amber-200' },
    { primary: 'violet-600', light: 'violet-50', border: 'violet-200' },
    { primary: 'slate-700', light: 'slate-50', border: 'slate-200' },
    { primary: 'teal-600', light: 'teal-50', border: 'teal-200' },
    { primary: 'cyan-600', light: 'cyan-50', border: 'cyan-200' },
    { primary: 'fuchsia-600', light: 'fuchsia-50', border: 'fuchsia-200' },
  ];
  return palettes[(variant - 1) % palettes.length];
};

function SectionHeading({ children, colorClass }: { children: React.ReactNode; colorClass: string }) {
  return (
    <h3 className={`text-sm tracking-widest font-semibold uppercase text-${colorClass}`}>{children}</h3>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}

export function TemplateRenderer({ data, variant = 1 }: { data: ResumeData; variant?: number }) {
  const fontClass = fontClassByVariant(variant);
  const palette = paletteByVariant(variant);

  const headerStyle = variant % 4; // 0..3 patrones de cabecera

  const Header = () => (
    <div
      className={
        headerStyle === 1
          ? `border-b-4 border-${palette.border} pb-4`
          : headerStyle === 2
          ? `bg-${palette.light} border border-${palette.border} px-6 py-5 rounded-lg`
          : headerStyle === 3
          ? `relative pl-5`
          : ''
      }
    >
      {headerStyle === 3 && (
        <div className={`absolute left-0 top-1 h-12 w-1 bg-${palette.primary}`} />
      )}
      <h1 className={`text-3xl font-bold ${fontClass}`}>{data.name}</h1>
      <p className={`mt-1 text-${palette.primary} font-medium`}>{data.title}</p>
      <div className="mt-2 text-sm text-neutral-700 flex flex-wrap gap-x-4 gap-y-1">
        <span>{data.contact.email}</span>
        <span>{data.contact.phone}</span>
        <span>{data.contact.location}</span>
        {data.contact.website && (
          <a className={`hover:underline text-${palette.primary}`} href={data.contact.website} target="_blank" rel="noreferrer">Sitio</a>
        )}
        {data.contact.linkedin && (
          <a className={`hover:underline text-${palette.primary}`} href={data.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        )}
        {data.contact.github && (
          <a className={`hover:underline text-${palette.primary}`} href={data.contact.github} target="_blank" rel="noreferrer">GitHub</a>
        )}
      </div>
    </div>
  );

  const layoutType = (variant % 8) || 8; // 1..8

  const Summary = () => (
    <section>
      <SectionHeading colorClass={`${palette.primary}`}>Resumen</SectionHeading>
      <p className="mt-2 text-sm leading-6 text-neutral-800">{data.summary}</p>
    </section>
  );

  const Experience = () => (
    <section>
      <SectionHeading colorClass={`${palette.primary}`}>Experiencia</SectionHeading>
      <div className="mt-3 space-y-4">
        {data.experience.map((exp, idx) => (
          <div key={idx}>
            <div className="flex items-baseline justify-between gap-4">
              <h4 className="font-semibold text-neutral-900">{exp.role} ? {exp.company}</h4>
              <span className="text-xs text-neutral-600">{exp.start} ? {exp.end}</span>
            </div>
            <BulletList items={exp.bullets} />
          </div>
        ))}
      </div>
    </section>
  );

  const Education = () => (
    <section>
      <SectionHeading colorClass={`${palette.primary}`}>Educaci?n</SectionHeading>
      <div className="mt-3 space-y-2 text-sm">
        {data.education.map((ed, idx) => (
          <div key={idx} className="flex items-baseline justify-between gap-4">
            <p className="font-medium">{ed.degree} ? {ed.school}</p>
            <span className="text-xs text-neutral-600">{ed.start} ? {ed.end}</span>
          </div>
        ))}
      </div>
    </section>
  );

  const Skills = () => (
    <section>
      <SectionHeading colorClass={`${palette.primary}`}>Habilidades</SectionHeading>
      <div className="mt-2 flex flex-wrap gap-2">
        {data.skills.map((skill, idx) => (
          <span key={idx} className={`text-xs px-2 py-1 rounded border border-${palette.border} bg-${palette.light}`}>{skill}</span>
        ))}
      </div>
    </section>
  );

  const Languages = () =>
    data.languages && data.languages.length ? (
      <section>
        <SectionHeading colorClass={`${palette.primary}`}>Idiomas</SectionHeading>
        <div className="mt-2 text-sm text-neutral-800 flex flex-wrap gap-x-3 gap-y-1">
          {data.languages.map((lang, idx) => (
            <span key={idx}>{lang}</span>
          ))}
        </div>
      </section>
    ) : null;

  // Diferentes dise?os
  const Layout = () => {
    switch (layoutType) {
      case 1:
        return (
          <div className="space-y-6">
            <Header />
            <Summary />
            <Experience />
            <Education />
            <Skills />
            <Languages />
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-3 gap-6">
            <div className={`col-span-1 border-r pr-6 border-${palette.border}`}>
              <Header />
              <div className="mt-6 space-y-6">
                <Skills />
                <Languages />
                <Education />
              </div>
            </div>
            <div className="col-span-2 space-y-6">
              <Summary />
              <Experience />
            </div>
          </div>
        );
      case 3:
        return (
          <div className={`space-y-6 bg-${palette.light} p-6 rounded-xl border border-${palette.border}`}>
            <Header />
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-6">
                <Summary />
                <Experience />
              </div>
              <div className="col-span-1 space-y-6">
                <Skills />
                <Education />
                <Languages />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className={`bg-${palette.primary} text-white px-6 py-6 rounded-xl`}>
              <h1 className={`text-3xl font-bold ${fontClass}`}>{data.name}</h1>
              <p className="mt-1 opacity-90 font-medium">{data.title}</p>
              <div className="mt-2 text-sm opacity-90 flex flex-wrap gap-x-4 gap-y-1">
                <span>{data.contact.email}</span>
                <span>{data.contact.phone}</span>
                <span>{data.contact.location}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <Summary />
                <Experience />
              </div>
              <div className="space-y-6">
                <Skills />
                <Education />
                <Languages />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <Header />
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <Experience />
                <Education />
              </div>
              <div className="space-y-6">
                <Summary />
                <Skills />
                <Languages />
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className={`relative pl-6`}>
            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${palette.primary}`} />
            <div className="space-y-6">
              <Header />
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  <Experience />
                  <Education />
                </div>
                <div className="col-span-1 space-y-6">
                  <Summary />
                  <Skills />
                  <Languages />
                </div>
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className={`space-y-6 border border-${palette.border} rounded-xl p-6`}>
            <Header />
            <Summary />
            <div className="grid grid-cols-2 gap-6">
              <Skills />
              <Education />
            </div>
            <Experience />
            <Languages />
          </div>
        );
      case 8:
      default:
        return (
          <div className={`space-y-6`}>
            <Header />
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-1 space-y-6">
                <Skills />
                <Languages />
              </div>
              <div className="col-span-2 space-y-6">
                <Summary />
                <Experience />
                <Education />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`${fontClass}`}>
      <div className="cv-canvas page mx-auto w-[850px] min-h-[1100px] bg-white p-8 rounded-xl">
        <Layout />
      </div>
    </div>
  );
}
