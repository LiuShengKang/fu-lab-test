import type { Metadata } from "next";
import { ArrowUpRight, BriefcaseBusiness, CalendarDays, Landmark, WalletCards } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = { title: "科研项目", description: "付蕾研究员主持或参与的科研项目。", alternates: { canonical: "/projects/", languages: { "zh-CN": "/projects/", en: "/en/projects/" } } };

export default function ProjectsPage() {
  const projects = getProjects();
  return <>
    <header className="page-hero compact">
      <div className="hero-grid-bg" />
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="shell">
        <span className="eyebrow anim d1">Projects</span>
        <h1 className="anim d2">科研项目</h1>
        <p className="anim d3">围绕复杂疾病、医学大模型、数字孪生、免疫抗原肽与分子力场开展协同研究。</p>
      </div>
    </header>
    <section className="shell section project-list">
      {projects.map((project, index) => {
        const body = <><div className="project-no">{String(index + 1).padStart(2, "0")}</div><div className="project-main"><div className="project-top"><span className={`status ${project.status === "ongoing" ? "live" : "done"}`}>{project.status === "ongoing" ? "在研" : "结题"}</span><span>{project.role}</span></div><h2>{project.title}{project.link && <ArrowUpRight className="project-external-icon" size={19} />}</h2><p><Landmark size={16} />{project.agency}</p><div className="project-facts"><span><CalendarDays size={16} />{project.period}</span><span><WalletCards size={16} />{project.funding}</span>{project.code && <span><BriefcaseBusiness size={16} />{project.code}</span>}</div></div></>;
        return <Reveal key={project.title} delay={index * 60}>{project.link
          ? <a className="project-list-item external" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`${project.title}（在新窗口打开）`}>{body}</a>
          : <article className="project-list-item">{body}</article>}</Reveal>;
      })}
    </section>
  </>;
}
