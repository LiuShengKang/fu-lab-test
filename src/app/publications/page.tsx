import type { Metadata } from "next";
import { PublicationList } from "@/components/publication-list";
import { getPublications } from "@/lib/content";

export const metadata: Metadata = { title: "代表成果", description: "付蕾研究员代表性论文与学术成果。", alternates: { canonical: "/publications/", languages: { "zh-CN": "/publications/", en: "/en/publications/" } } };

export default function PublicationsPage() {
  const publications = getPublications().sort((a, b) => b.year - a.year);
  return <>
    <header className="page-hero compact">
      <div className="hero-grid-bg" />
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="shell">
        <span className="eyebrow anim d1">Publications</span>
        <h1 className="anim d2">代表性成果</h1>
        <p className="anim d3">围绕医学人工智能、分子机制、免疫抗原与抗菌肽开展的代表性研究。</p>
      </div>
    </header>
    <section className="shell section"><PublicationList publications={publications} /></section>
  </>;
}
