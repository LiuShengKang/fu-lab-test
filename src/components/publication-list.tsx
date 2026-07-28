"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Publication } from "@/lib/content";

export function PublicationList({ publications, locale = "zh" }: { publications: Publication[]; locale?: "zh" | "en" }) {
  const years = [...new Set(publications.map((item) => item.year))].sort((a, b) => b - a);
  const [year, setYear] = useState<number | "all">("all");
  const filtered = publications.filter((item) => year === "all" || item.year === year);

  return (
    <div>
      <div className="publication-tools">
        <div className="year-filters" aria-label="按年份筛选">
          <button className={year === "all" ? "selected" : ""} onClick={() => setYear("all")}>{locale === "en" ? "All" : "全部"}</button>
          {years.map((item) => <button key={item} className={year === item ? "selected" : ""} onClick={() => setYear(item)}>{item}</button>)}
        </div>
      </div>
      <p className="result-count">{locale === "en" ? `${filtered.length} representative publications` : `共 ${filtered.length} 篇代表性成果`}</p>
      <div className="publication-list">
        {filtered.map((item, index) => {
          const row = <>
            <div className="publication-index">{String(index + 1).padStart(2, "0")}</div>
            <div>
              <div className="publication-meta"><span>{item.venue}</span><time>{item.year}</time>{item.note && <b>{locale === "en" ? item.note.replace("共同第一作者", "Co-first author").replace("通讯作者", "Corresponding author") : item.note}</b>}</div>
              <h2>{item.title}{item.link && <ArrowUpRight className="publication-external-icon" size={18} />}</h2>
              <p>{item.authors}</p>
              <small>{item.details}</small>
            </div>
          </>;
          const rowStyle = { animationDelay: `${Math.min(index, 10) * 60}ms` };
          return item.link
            ? <a className="publication-row external" style={rowStyle} href={item.link} target="_blank" rel="noopener noreferrer" key={`${item.title}-${item.year}`} aria-label={`${item.title}${locale === "en" ? " (opens in a new window)" : "（在新窗口打开）"}`}>{row}</a>
            : <article className="publication-row" style={rowStyle} key={`${item.title}-${item.year}`}>{row}</article>;
        })}
        {filtered.length === 0 && <div className="empty-state">{locale === "en" ? "No publications for this year." : "该年份暂无代表性成果。"}</div>}
      </div>
    </div>
  );
}
