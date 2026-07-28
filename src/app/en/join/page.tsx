import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowRight, Mail } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { getJoin } from "@/lib/content";

const page = getJoin("en");
const pageDescription = "We welcome students interested in the intersection of artificial intelligence, computational biology and biomedical research.";
export const metadata: Metadata = { title: "Join the Team", description: pageDescription, alternates: { canonical: "/en/join/", languages: { "zh-CN": "/join/", en: "/en/join/" } } };

export default function EnglishJoinPage() {
  return <>
    <header className="page-hero">
      <div className="hero-grid-bg" />
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="shell">
        <span className="eyebrow anim d1">Join Us</span>
        <h1 className="anim d2">Bring your curiosity to<br /><em>an interdisciplinary frontier</em></h1>
        <p className="anim d3">{pageDescription}</p>
        <a className="button primary anim d4" href="mailto:leifu@szu.edu.cn"><Mail size={17} />Send an application</a>
      </div>
    </header>
    <section className="shell section markdown-layout">
      <Reveal>
        <aside><b>RESEARCH WITH US</b><span>AI4Science</span><span>Drug Design</span><span>Biomedical AI</span><span>Computational Biology</span><Link href="/en/research/">Explore our research <ArrowRight size={15} /></Link></aside>
      </Reveal>
      <Reveal delay={120}>
        <article className="markdown-content"><ReactMarkdown>{page.content}</ReactMarkdown></article>
      </Reveal>
    </section>
  </>;
}
