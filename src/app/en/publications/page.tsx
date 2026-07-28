import type { Metadata } from "next";
import { PublicationList } from "@/components/publication-list";
import { getPublications } from "@/lib/content";

export const metadata: Metadata = { title: "Publications | Lei Fu Group", description: "Representative publications by Professor Lei Fu.", alternates: { canonical: "/en/publications/", languages: { "zh-CN": "/publications/", en: "/en/publications/" } } };

export default function EnglishPublicationsPage() {
  const publications = getPublications("en").sort((a, b) => b.year - a.year);
  return <>
    <header className="page-hero compact">
      <div className="hero-grid-bg" />
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="shell">
        <span className="eyebrow anim d1">Publications</span>
        <h1 className="anim d2">Representative Work</h1>
        <p className="anim d3">Selected research in medical AI, molecular mechanisms, immune antigens and antimicrobial peptides.</p>
      </div>
    </header>
    <section className="shell section"><PublicationList publications={publications} locale="en" /></section>
  </>;
}
