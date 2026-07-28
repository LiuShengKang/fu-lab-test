import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Atom, Braces, Dna, Mail, MapPin, Microscope, Sparkles } from "lucide-react";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getHome, getProfile, getProjects, getPublications, getResearch } from "@/lib/content";

export const metadata: Metadata = {
  title: "Lei Fu Research Group | AI for Life & Medicine",
  description: "AI for Science, high-performance computing and biomedical research led by Prof. Lei Fu at Shenzhen University.",
  alternates: { canonical: "/en/", languages: { "zh-CN": "/", en: "/en/" } },
};

const icons = [Atom, Dna, Braces, Microscope, Sparkles];

function MoleculeField() {
  const nodes = [
    { cx: 262, cy: 52, r: 8, fill: "#1a5fd7", delay: "0s" },
    { cx: 108, cy: 148, r: 6, fill: "#0ea89b", delay: "0.6s" },
    { cx: 416, cy: 138, r: 7, fill: "#8b7cf6", delay: "1.1s" },
    { cx: 64, cy: 302, r: 5, fill: "#f2994a", delay: "1.6s" },
    { cx: 458, cy: 312, r: 6, fill: "#2bb3d6", delay: "0.3s" },
    { cx: 148, cy: 438, r: 7, fill: "#0ea89b", delay: "0.9s" },
    { cx: 376, cy: 446, r: 6, fill: "#1a5fd7", delay: "1.4s" },
    { cx: 262, cy: 496, r: 5, fill: "#93c425", delay: "2s" },
  ];
  const links: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6, 7], [1, 5], [2, 6]];
  return (
    <svg className="hero-molecule" viewBox="0 0 520 520" aria-hidden="true">
      {links.map(([a, b]) => (
        <line key={`${a}-${b}`} className="mol-line" x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy} />
      ))}
      {nodes.map((node) => (
        <circle key={`${node.cx}-${node.cy}`} className="mol-node" cx={node.cx} cy={node.cy} r={node.r} fill={node.fill} style={{ animationDelay: node.delay }} />
      ))}
    </svg>
  );
}

export default function EnglishHome() {
  const home = getHome("en"); const profile = getProfile("en"); const research = getResearch("en"); const projects = getProjects("en");
  const publications = getPublications("en").filter((item) => item.featured).slice(0, 4);
  const personJsonLd = { "@context": "https://schema.org", "@type": "Person", name: "Lei Fu", alternateName: "付蕾", jobTitle: profile.title, email: profile.email };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
    <section className="hero">
      <div className="hero-grid-bg" />
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="shell hero-grid">
        <div className="hero-copy">
          <div className="hero-kicker anim d1"><span /> AI × LIFE SCIENCE × MEDICINE</div>
          <h1 className="anim d2">{home.headline}</h1>
          <p className="anim d3">{home.tagline}</p>
          <div className="hero-actions anim d4"><Link href="/en/research/" className="button primary">Explore our research <ArrowRight size={17} /></Link><a href={`mailto:${profile.email}`} className="button ghost"><Mail size={17} /> Contact Prof. Fu</a></div>
          <div className="hero-affiliation anim d5"><MapPin size={17} /><span>{profile.affiliations[1]}<br />{profile.affiliations[2]}</span></div>
        </div>
        <div className="profile-visual anim-pop d3">
          <MoleculeField />
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="portrait-card"><Image src={profile.portrait} alt="Professor Lei Fu" width={408} height={594} priority /></div>
          <div className="profile-label"><small>付蕾</small><strong>{profile.name}</strong><span>{profile.title}</span></div>
          <div className="floating-tag tag-ai">AI4SCIENCE</div>
          <div className="floating-tag tag-hpc">HPC</div>
        </div>
      </div>
      <div className="shell metric-strip anim d6">{home.metrics.map((item) => <div key={item.label}><strong><CountUp value={item.value} /></strong><span>{item.label}</span></div>)}<div className="metric-note">From computing to rational design<span>COMPUTING → UNDERSTANDING → DESIGN</span></div></div>
    </section>

    <section className="section shell">
      <SectionHeading eyebrow="Research Focus" title="Five pillars of interdisciplinary research" description="Bringing physical principles, data models and medical questions into one research pipeline." href="/en/research/" linkLabel="View research" />
      <Reveal className="research-grid stagger">{research.map((item, index) => { const Icon = icons[index]; const card = <><div className="research-icon"><Icon size={24} /></div><small>0{index + 1} / {item.english}</small><h3>{item.title}</h3><p>{item.summary}</p><div className="keyword-row">{item.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div><ArrowUpRight className="card-arrow" size={19} /></>; return item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer" className={`research-card accent-${item.accent}`} key={item.slug}>{card}</a> : <Link href={`/en/research/#${item.slug}`} className={`research-card accent-${item.accent}`} key={item.slug}>{card}</Link>; })}</Reveal>
    </section>

    <section className="section band-section">
      <div className="shell">
        <SectionHeading eyebrow="Selected Publications" title="Representative work" description="Research spanning antimicrobial mechanisms, immune antigens, protein conformations and computational drug design." href="/en/publications/" linkLabel="All publications" />
        <Reveal className="featured-publications stagger">{publications.map((item, index) => { const body = <><span className="big-index">{String(index + 1).padStart(2, "0")}</span><div><div className="publication-meta"><span>{item.venue}</span><time>{item.year}</time>{item.note && <b>{item.note.replace("共同第一作者", "Co-first author").replace("通讯作者", "Corresponding author")}</b>}</div><h3>{item.title}{item.link && <ArrowUpRight className="publication-external-icon" size={17} />}</h3><p>{item.authors}</p></div></>; return item.link ? <a className="featured-publication-row external" href={item.link} target="_blank" rel="noopener noreferrer" key={item.title} aria-label={`${item.title} (opens in a new window)`}>{body}</a> : <article className="featured-publication-row" key={item.title}>{body}</article>; })}</Reveal>
      </div>
    </section>

    <section className="section shell split-section">
      <Reveal><SectionHeading eyebrow="Profile" title="Across chemistry, life and intelligent computing" /><p className="lead-copy">{profile.bio}</p><Link className="text-link" href="/en/team/">Meet the group leader <ArrowUpRight size={16} /></Link></Reveal>
      <Reveal className="timeline stagger" delay={120}>{profile.education.map((item) => <div key={`${item.period}-${item.institution}`}><time>{item.period}</time><span /><section><h3>{item.institution}</h3><p>{item.detail}</p></section></div>)}</Reveal>
    </section>

    <section className="section service-section">
      <div className="shell">
        <Reveal><span className="eyebrow">Appointments & Service</span><h2>Appointments & Academic Service</h2></Reveal>
        <Reveal className="service-grid stagger">{profile.affiliations.map((appointment, index) => <article key={appointment}><span>{String(index + 1).padStart(2, "0")}</span><p>{appointment}</p></article>)}</Reveal>
      </div>
    </section>

    <section className="section shell">
      <SectionHeading eyebrow="Projects" title="Collaborative research for real medical challenges" description={`${projects.length} projects spanning complex diseases, medical foundation models, digital twins and immune antigen peptides.`} href="/en/projects/" linkLabel="View projects" />
      <Reveal className="project-preview stagger">{projects.slice(0, 3).map((project) => { const body = <><div><span className={`status ${project.status === "ongoing" ? "live" : "done"}`}>{project.status === "ongoing" ? "Ongoing" : "Completed"}</span><span>{project.period}</span></div><h3>{project.title}{project.link && <ArrowUpRight className="project-external-icon" size={17} />}</h3><p>{project.agency}</p><footer><b>{project.funding}</b><span>{project.role}</span></footer></>; return project.link ? <a className="project-preview-card external" href={project.link} target="_blank" rel="noopener noreferrer" key={project.title} aria-label={`${project.title} (opens in a new window)`}>{body}</a> : <article className="project-preview-card" key={project.title}>{body}</article>; })}</Reveal>
    </section>

    <Reveal className="shell">
      <section className="cta-panel">
        <div><span className="eyebrow">Join the Team</span><h2>Interested in AI at the frontier of life science?</h2><p>We welcome students with backgrounds in computing, artificial intelligence or life science.</p></div>
        <Link href="/en/join/" className="button light">Admissions & requirements <ArrowRight size={17} /></Link>
      </section>
    </Reveal>
  </>;
}
