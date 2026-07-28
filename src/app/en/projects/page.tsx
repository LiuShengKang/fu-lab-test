import type { Metadata } from "next";
import { ArrowUpRight, BriefcaseBusiness, CalendarDays, Landmark, WalletCards } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = { title: "Projects | Lei Fu Group", description: "Research projects of Professor Lei Fu.", alternates: { canonical: "/en/projects/", languages: { "zh-CN": "/projects/", en: "/en/projects/" } } };

export default function EnglishProjectsPage() {
  const projects = getProjects("en");
  return <>
    <header className="page-hero compact">
      <div className="hero-grid-bg" />
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="shell">
        <span className="eyebrow anim d1">Projects</span>
        <h1 className="anim d2">Research Projects</h1>
        <p className="anim d3">Collaborative research in complex diseases, medical foundation models, digital twins, immune antigen peptides and molecular force fields.</p>
      </div>
    </header>
    <section className="shell section project-list">
      {projects.map((project, index) => {
        const body = <><div className="project-no">{String(index + 1).padStart(2, "0")}</div><div className="project-main"><div className="project-top"><span className={`status ${project.status === "ongoing" ? "live" : "done"}`}>{project.status === "ongoing" ? "Ongoing" : "Completed"}</span><span>{project.role}</span></div><h2>{project.title}{project.link && <ArrowUpRight className="project-external-icon" size={19} />}</h2><p><Landmark size={16} />{project.agency}</p><div className="project-facts"><span><CalendarDays size={16} />{project.period}</span><span><WalletCards size={16} />{project.funding}</span>{project.code && <span><BriefcaseBusiness size={16} />{project.code}</span>}</div></div></>;
        return <Reveal key={project.title} delay={index * 60}>{project.link
          ? <a className="project-list-item external" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} (opens in a new window)`}>{body}</a>
          : <article className="project-list-item">{body}</article>}</Reveal>;
      })}
    </section>
  </>;
}
