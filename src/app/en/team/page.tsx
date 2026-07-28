import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { TeamDirectory } from "@/components/team-directory";

export const metadata: Metadata = { title: "People | Lei Fu Group", description: "Researchers and students in the Lei Fu AI for Science group.", alternates: { canonical: "/en/team/", languages: { "zh-CN": "/team/", en: "/en/team/" } } };

export default function EnglishTeamPage() {
  return <>
    <header className="page-hero compact">
      <div className="hero-grid-bg" />
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="shell">
        <span className="eyebrow anim d1">People</span>
        <h1 className="anim d2">Exploring the computational<br /><em>frontier of life science</em></h1>
        <p className="anim d3">Group levels, names and members are all driven by one bilingual configuration file.</p>
      </div>
    </header>
    <TeamDirectory locale="en" />
    <section className="section team-principles">
      <div className="shell">
        <Reveal><span className="eyebrow">How We Work</span><h2>Research Culture</h2></Reveal>
        <Reveal className="principles-grid stagger">
          <article><b>01</b><h3>Problem-driven</h3><p>Starting with real questions in medicine and life science, then defining testable computational tasks.</p></article>
          <article><b>02</b><h3>Interdisciplinary</h3><p>Combining AI, physical modelling, high-performance computing and experimental validation.</p></article>
          <article><b>03</b><h3>Open growth</h3><p>Valuing strong foundations, hands-on work, scholarly communication and teamwork.</p></article>
        </Reveal>
      </div>
    </section>
  </>;
}
