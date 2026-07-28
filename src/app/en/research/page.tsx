import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Atom, Braces, Dna, Microscope, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { getResearch } from "@/lib/content";

export const metadata: Metadata = { title: "Research | Lei Fu Group", description: "AI for Science, drug and protein design, tumor immunity and antimicrobial peptide research.", alternates: { canonical: "/en/research/", languages: { "zh-CN": "/research/", en: "/en/research/" } } };
const icons = [Atom, Dna, Braces, Microscope, Sparkles];
const methodWords = ["PHYSICS", "DATA", "INTELLIGENCE", "MEDICINE"];

export default function EnglishResearchPage() {
  const research = getResearch("en");
  return <>
    <header className="page-hero research-hero">
      <div className="hero-grid-bg" />
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="shell">
        <span className="eyebrow anim d1">Research</span>
        <h1 className="anim d2">Computation as a<br /><em>second way to experiment</em></h1>
        <p className="anim d3">We move from molecular mechanisms to disease intervention—using physics for constraints, data for scale and medical problems for purpose.</p>
      </div>
    </header>
    <section className="shell section research-detail-list">
      {research.map((item, index) => {
        const Icon = icons[index];
        const body = <><div className="research-number">0{index + 1}</div><div className="research-detail-icon"><Icon size={28} /></div><div><small>{item.english}</small><h2>{item.title}{item.link && <ArrowUpRight className="research-external-icon" size={20} />}</h2><p>{item.summary}</p><div className="keyword-row">{item.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div></div></>;
        return <Reveal key={item.slug} delay={index * 60}>{item.link
          ? <a id={item.slug} href={item.link} target="_blank" rel="noopener noreferrer" className={`research-detail-item external accent-${item.accent}`} aria-label={`${item.title} (opens in a new window)`}>{body}</a>
          : <article id={item.slug} className={`research-detail-item accent-${item.accent}`}>{body}</article>}</Reveal>;
      })}
    </section>
    <section className="method-band">
      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div className="marquee-group" key={copy} aria-hidden={copy === 1}>
              {methodWords.map((word, wordIndex) => (
                <span key={word} style={{ display: "inline-flex", alignItems: "center", gap: 44 }}>
                  {word}{wordIndex < methodWords.length - 1 && <ArrowRight size={18} />}
                </span>
              ))}
              <ArrowRight size={18} />
            </div>
          ))}
        </div>
      </div>
    </section>
  </>;
}
