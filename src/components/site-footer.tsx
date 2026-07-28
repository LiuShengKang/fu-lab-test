"use client";

import { Mail, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  const en = pathname === "/en" || pathname.startsWith("/en/");
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="footer-brand">FU LAB <span>/ AI4SCIENCE</span></div>
          <p>{en ? "Connecting life science and medicine through molecular mechanisms, computing and artificial intelligence." : "从分子机制出发，以计算和人工智能连接生命科学与医学。"}</p>
        </div>
        <div className="footer-contact">
          <a href="mailto:leifu@szu.edu.cn"><Mail size={16} /> leifu@szu.edu.cn</a>
          <span><MapPin size={16} /> {en ? "Room N602, Zhixin Building, Canghai Campus" : "沧海校区致信楼 N602"}</span>
        </div>
        <div className="footer-meta">
          <span>{en ? "Shenzhen University · South China Hospital" : "深圳大学 · 附属华南医院"}</span>
          <span>{en ? "AI4Science · HPC · Biomedicine" : "AI4Science · 高性能计算 · 生物医学"}</span>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Lei Fu Research Group</span>
        <span>{en ? "Designed for science, built with data" : "以科学为底色，以数据为驱动"}</span>
      </div>
    </footer>
  );
}
