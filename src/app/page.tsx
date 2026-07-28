import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Atom, Braces, Dna, Mail, MapPin, Microscope, Sparkles } from "lucide-react";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getHome, getProfile, getProjects, getPublications, getResearch } from "@/lib/content";

const researchIcons = [Atom, Dna, Braces, Microscope, Sparkles];

export const metadata = { alternates: { canonical: "/", languages: { "zh-CN": "/", en: "/en/" } } };

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

export default function Home() {
  const home = getHome();
  const profile = getProfile();
  const research = getResearch();
  const projects = getProjects();
  const publications = getPublications().filter((item) => item.featured).slice(0, 4);
  const personJsonLd = { "@context": "https://schema.org", "@type": "Person", name: profile.name, alternateName: profile.englishName, jobTitle: profile.title, email: profile.email, affiliation: profile.affiliations.map((name) => ({ "@type": "Organization", name })) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
        <div className="shell hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker anim d1"><span /> AI × LIFE SCIENCE × MEDICINE</div>
            <h1 className="anim d2">{home.headline}</h1>
            <p className="anim d3">{home.tagline}</p>
            <div className="hero-actions anim d4">
              <Link href="/research/" className="button primary">探索研究方向 <ArrowRight size={17} /></Link>
              <a href={`mailto:${profile.email}`} className="button ghost"><Mail size={17} /> 联系付老师</a>
            </div>
            <div className="hero-affiliation anim d5"><MapPin size={17} /><span>{profile.affiliations[1]}<br />{profile.affiliations[2]}</span></div>
          </div>
          <div className="profile-visual anim-pop d3">
            <MoleculeField />
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="portrait-card"><Image src={profile.portrait} alt={`${profile.name}研究员`} width={408} height={594} priority /></div>
            <div className="profile-label"><small>{profile.englishName}</small><strong>{profile.name}</strong><span>{profile.title} · {profile.mentorType}</span></div>
            <div className="floating-tag tag-ai">AI4SCIENCE</div>
            <div className="floating-tag tag-hpc">HPC</div>
          </div>
        </div>
        <div className="shell metric-strip anim d6">
          {home.metrics.map((item) => <div key={item.label}><strong><CountUp value={item.value} /></strong><span>{item.label}</span></div>)}
          <div className="metric-note">从计算理解走向理性设计<span>Computing → Understanding → Design</span></div>
        </div>
      </section>

      <section className="section shell">
        <SectionHeading eyebrow="Research Focus" title="交叉研究的五个支点" description="把物理规律、数据模型与临床问题放在同一条研究链路中。" href="/research/" />
        <Reveal className="research-grid stagger">
          {research.map((item, index) => {
            const Icon = researchIcons[index];
            const card = <><div className="research-icon"><Icon size={24} /></div><small>0{index + 1} / {item.english}</small><h3>{item.title}</h3><p>{item.summary}</p><div className="keyword-row">{item.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div><ArrowUpRight className="card-arrow" size={19} /></>;
            return item.link
              ? <a href={item.link} target="_blank" rel="noopener noreferrer" className={`research-card accent-${item.accent}`} key={item.slug}>{card}</a>
              : <Link href={`/research/#${item.slug}`} className={`research-card accent-${item.accent}`} key={item.slug}>{card}</Link>;
          })}
        </Reveal>
      </section>

      <section className="section band-section">
        <div className="shell">
          <SectionHeading eyebrow="Selected Publications" title="代表性成果" description="研究工作覆盖抗菌机制、免疫抗原、蛋白质构象与计算药物设计。" href="/publications/" />
          <Reveal className="featured-publications stagger">
            {publications.map((item, index) => { const body = <><span className="big-index">{String(index + 1).padStart(2, "0")}</span><div><div className="publication-meta"><span>{item.venue}</span><time>{item.year}</time>{item.note && <b>{item.note}</b>}</div><h3>{item.title}{item.link && <ArrowUpRight className="publication-external-icon" size={17} />}</h3><p>{item.authors}</p></div></>; return item.link ? <a className="featured-publication-row external" href={item.link} target="_blank" rel="noopener noreferrer" key={item.title} aria-label={`${item.title}（在新窗口打开）`}>{body}</a> : <article className="featured-publication-row" key={item.title}>{body}</article>; })}
          </Reveal>
        </div>
      </section>

      <section className="section shell split-section">
        <Reveal>
          <SectionHeading eyebrow="Profile" title="跨越化学、生命与智能计算" />
          <p className="lead-copy">{profile.bio}</p>
          <Link className="text-link" href="/team/">了解团队与负责人 <ArrowUpRight size={16} /></Link>
        </Reveal>
        <Reveal className="timeline stagger" delay={120}>
          {profile.education.map((item) => <div key={`${item.period}-${item.institution}`}><time>{item.period}</time><span /><section><h3>{item.institution}</h3><p>{item.detail}</p></section></div>)}
        </Reveal>
      </section>

      <section className="section service-section">
        <div className="shell">
          <Reveal><span className="eyebrow">Appointments & Service</span><h2>任职与学术服务</h2></Reveal>
          <Reveal className="service-grid stagger">{profile.affiliations.map((appointment, index) => <article key={appointment}><span>{String(index + 1).padStart(2, "0")}</span><p>{appointment}</p></article>)}</Reveal>
        </div>
      </section>

      <section className="section shell">
        <SectionHeading eyebrow="Projects" title="面向真实医学问题的协同攻关" description={`当前资料收录 ${projects.length} 项科研项目，覆盖复杂疾病、医疗大模型、数字孪生与免疫抗原肽。`} href="/projects/" />
        <Reveal className="project-preview stagger">
          {projects.slice(0, 3).map((project) => { const body = <><div><span className={`status ${project.status === "ongoing" ? "live" : "done"}`}>{project.status === "ongoing" ? "在研" : "结题"}</span><span>{project.period}</span></div><h3>{project.title}{project.link && <ArrowUpRight className="project-external-icon" size={17} />}</h3><p>{project.agency}</p><footer><b>{project.funding}</b><span>{project.role}</span></footer></>; return project.link ? <a className="project-preview-card external" href={project.link} target="_blank" rel="noopener noreferrer" key={project.title} aria-label={`${project.title}（在新窗口打开）`}>{body}</a> : <article className="project-preview-card" key={project.title}>{body}</article>; })}
        </Reveal>
      </section>

      <Reveal className="shell">
        <section className="cta-panel">
          <div><span className="eyebrow">Join the Team</span><h2>对 AI 与生命科学的交叉问题感兴趣？</h2><p>团队面向新一代电子信息技术方向，欢迎具有计算、人工智能或生命科学背景的同学联系。</p></div>
          <Link href="/join/" className="button light">查看招生要求 <ArrowRight size={17} /></Link>
        </section>
      </Reveal>
    </>
  );
}
