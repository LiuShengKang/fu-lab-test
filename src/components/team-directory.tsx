import Image from "next/image";
import { ExternalLink, Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { getTeam, type Locale } from "@/lib/content";

export function TeamDirectory({ locale }: { locale: Locale }) {
  const team = getTeam(locale);
  const groups = team.groups.filter((group) => group.members.length > 0);

  return (
    <section className="shell section team-directory">
      <div className="team-groups">
        {groups.map((group, groupIndex) => (
          <section className="team-group" key={group.id}>
            <Reveal>
              <header className="team-group-heading">
                <div>
                  <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                  <h2>{group.name}</h2>
                </div>
                {group.description && <p>{group.description}</p>}
              </header>
            </Reveal>

            <Reveal className="member-grid stagger">
              {group.members.map((member) => (
                <article className="member-card" key={member.id}>
                  {member.link && <a className="member-card-link" href={member.link} target="_blank" rel="noopener noreferrer" aria-label={`${member.name}${locale === "en" ? " (opens in a new window)" : "（在新窗口打开）"}`} />}
                  <div className="member-photo">
                    <Image src={member.portrait} alt={member.name} width={360} height={460} />
                    {(member.email || member.phone || member.website) && (
                      <div className="member-links">
                        {member.email && <a href={`mailto:${member.email}`} aria-label={`${member.name} email`}><Mail size={16} /></a>}
                        {member.phone && <a href={`tel:${member.phone}`} aria-label={`${member.name} phone`}><Phone size={16} /></a>}
                        {member.website && <a href={member.website} target="_blank" rel="noreferrer" aria-label={`${member.name} website`}><ExternalLink size={16} /></a>}
                      </div>
                    )}
                  </div>
                  <div className="member-content">
                    <h3>{member.name}{member.link && <ExternalLink className="member-visit-indicator" size={16} />}</h3>
                    <p className="member-role">{member.role}</p>
                    {member.tags.length > 0 && <div className="member-tags">{member.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
                    <p className="member-bio">{member.bio}</p>
                  </div>
                </article>
              ))}
            </Reveal>
          </section>
        ))}
      </div>
    </section>
  );
}
