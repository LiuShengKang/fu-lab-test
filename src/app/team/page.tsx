import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { TeamDirectory } from "@/components/team-directory";

export const metadata: Metadata = { title: "团队", description: "付蕾 AI4Science 研究团队成员。", alternates: { canonical: "/team/", languages: { "zh-CN": "/team/", en: "/en/team/" } } };

export default function TeamPage() {
  return <>
    <header className="page-hero compact">
      <div className="hero-grid-bg" />
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="shell">
        <span className="eyebrow anim d1">People</span>
        <h1 className="anim d2">共同探索生命科学的<br /><em>计算边界</em></h1>
        <p className="anim d3">团队层级、名称和成员均由唯一双语配置文件驱动。</p>
      </div>
    </header>
    <TeamDirectory locale="zh" />
    <section className="section team-principles">
      <div className="shell">
        <Reveal><span className="eyebrow">How We Work</span><h2>团队研究方式</h2></Reveal>
        <Reveal className="principles-grid stagger">
          <article><b>01</b><h3>问题驱动</h3><p>从医学和生命科学中的真实问题出发，定义可验证的计算任务。</p></article>
          <article><b>02</b><h3>交叉协作</h3><p>融合人工智能、物理建模、高性能计算与实验验证。</p></article>
          <article><b>03</b><h3>开放成长</h3><p>重视扎实基础、动手实践、学术表达与团队合作。</p></article>
        </Reveal>
      </div>
    </section>
  </>;
}
