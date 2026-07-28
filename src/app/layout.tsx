import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDeploymentUrl, getSite } from "@/lib/content";
import "./globals.css";

const site = getSite("zh");
const englishSite = getSite("en");

export const metadata: Metadata = {
  metadataBase: new URL(getDeploymentUrl()),
  title: { default: site.name, template: `%s｜${site.shortName}` },
  description: site.description,
  keywords: ["付蕾", "深圳大学", "AI4Science", "人工智能辅助药物设计", "计算生物学", "医学人工智能"],
  openGraph: { title: site.name, description: site.description, type: "website", locale: "zh_CN", images: ["/content/assets/lei-fu.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteHeader name={site.name} navigation={site.navigation} englishNavigation={englishSite.navigation} />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
