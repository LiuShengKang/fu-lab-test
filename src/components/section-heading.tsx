import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function SectionHeading({ eyebrow, title, description, href, linkLabel }: { eyebrow: string; title: string; description?: string; href?: string; linkLabel?: string }) {
  return (
    <Reveal className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {href && <Link className="text-link" href={href}>{linkLabel ?? "查看全部"}<ArrowUpRight size={16} /></Link>}
    </Reveal>
  );
}
