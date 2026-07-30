"use client";

import Link from "next/link";
import { Languages, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = { label: string; href: string };

export function SiteHeader({ name, shortName, navigation, englishNavigation }: { name: string; shortName: string; navigation: NavItem[]; englishNavigation: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const currentNavigation = isEnglish ? englishNavigation : navigation;
  const isNotFound = pathname.includes("_not-found");
  const languageHref = isNotFound ? (isEnglish ? "/" : "/en/") : isEnglish ? (pathname.replace(/^\/en/, "") || "/") : (pathname === "/" ? "/en/" : `/en${pathname}`);

  useEffect(() => { document.documentElement.lang = isEnglish ? "en" : "zh-CN"; }, [isEnglish]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label={`${name}首页`} onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span><b>{shortName}</b><small>AI for Life & Medicine</small></span>
        </Link>
        <button className="menu-toggle" type="button" aria-label={open ? "关闭导航" : "打开导航"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="主导航">
          {currentNavigation.map((item) => {
            const currentPath = pathname.replace(/\/$/, "") || "/";
            const itemPath = item.href.replace(/\/$/, "") || "/";
            const active = itemPath === "/" || itemPath === "/en" ? currentPath === itemPath : currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
            return <Link key={item.href} href={item.href} className={active ? "active" : ""} onClick={() => setOpen(false)}>{item.label}</Link>;
          })}
          <Link className="language-switch" href={languageHref} onClick={() => setOpen(false)} aria-label={isEnglish ? "切换到中文" : "Switch to English"}>
            <Languages size={15} /> {isEnglish ? "中" : "EN"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
