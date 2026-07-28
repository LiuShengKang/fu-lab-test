import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowRight, Mail } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { getJoin } from "@/lib/content";

const page = getJoin("zh");
const pageDescription = "面向新一代电子信息技术方向招收对 AI 与计算生物学交叉研究感兴趣的学生。";
export const metadata: Metadata = { title: "加入团队", description: pageDescription, alternates: { canonical: "/join/", languages: { "zh-CN": "/join/", en: "/en/join/" } } };

export default function JoinPage() {
  return <>
    <header className="page-hero">
      <div className="hero-grid-bg" />
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="shell">
        <span className="eyebrow anim d1">Join Us</span>
        <h1 className="anim d2">把好奇心带到<br /><em>学科交叉的边界</em></h1>
        <p className="anim d3">{pageDescription}</p>
        <a className="button primary anim d4" href="mailto:leifu@szu.edu.cn"><Mail size={17} />发送申请邮件</a>
      </div>
    </header>
    <section className="shell section markdown-layout">
      <Reveal>
        <aside><b>RESEARCH WITH US</b><span>AI4Science</span><span>Drug Design</span><span>Biomedical AI</span><span>Computational Biology</span><Link href="/research/">了解研究方向 <ArrowRight size={15} /></Link></aside>
      </Reveal>
      <Reveal delay={120}>
        <article className="markdown-content"><ReactMarkdown>{page.content}</ReactMarkdown></article>
      </Reveal>
    </section>
  </>;
}
