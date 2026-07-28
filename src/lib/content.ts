import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

export type Locale = "zh" | "en";

const bilingualTextSchema = z.object({
  zh: z.string(),
  en: z.string(),
});

const bilingualMarkdownSchema = z.object({
  zh: z.array(z.string()),
  en: z.array(z.string()),
});

const navigationPaths: Record<string, string> = {
  Home: "/",
  Research: "/research/",
  Publications: "/publications/",
  Projects: "/projects/",
  Members: "/team/",
  "Join Us": "/join/",
};

const pageGuidanceSchema = z.object({
  _说明: z.string(),
  _编辑帮助: z.array(z.string()),
});

const profileSchema = z.object({
  名称: bilingualTextSchema,
  角色: bilingualTextSchema,
  导师类别: bilingualTextSchema,
  头像: z.string(),
  邮箱: z.string().email(),
  电话: z.string(),
  办公室: bilingualTextSchema,
  任职单位: z.array(bilingualTextSchema),
  个人简介: bilingualTextSchema,
  教育经历: z.array(z.object({
    时间: bilingualTextSchema,
    单位: bilingualTextSchema,
    说明: bilingualTextSchema,
  })),
});

const researchSchema = z.array(z.object({
  方向名称: bilingualTextSchema,
  方向简介: bilingualTextSchema,
  链接: z.union([z.literal(""), z.string().url()]).optional(),
  关键词: z.object({
    zh: z.array(z.string()),
    en: z.array(z.string()),
  }),
}));

const projectSchema = z.array(z.object({
  项目名称: bilingualTextSchema,
  项目来源: bilingualTextSchema,
  项目编号: z.string().optional(),
  项目周期: bilingualTextSchema,
  项目经费: bilingualTextSchema,
  承担角色: bilingualTextSchema,
  项目状态: z.enum(["ongoing", "completed"]),
  访问链接: z.union([z.literal(""), z.string().url()]).optional(),
}));

const publicationSchema = z.array(z.object({
  标题: z.string(),
  作者: z.string(),
  期刊会议: z.string(),
  年份: z.number(),
  发表信息: z.string(),
  首页推荐: z.boolean(),
  访问链接: z.union([z.literal(""), z.string().url()]).optional(),
  作者说明: bilingualTextSchema.optional(),
}));

const teamMemberSchema = z.object({
  成员名称: bilingualTextSchema,
  身份: bilingualTextSchema,
  头像: z.string(),
  简介: bilingualTextSchema,
  标签: z.array(bilingualTextSchema).default([]),
  邮箱: z.string().email().optional(),
  电话: z.string().optional(),
  个人主页: z.string().url().optional(),
  访问链接: z.union([z.literal(""), z.string().url()]).optional(),
});

const teamGroupsSchema = z.array(z.object({
    层级名称: bilingualTextSchema,
    层级描述: bilingualTextSchema.optional(),
    成员列表: z.array(teamMemberSchema),
  }));

const contentSchema = z.object({
  首页: pageGuidanceSchema.extend({
    网站简称: z.string(),
    导航菜单: z.array(z.object({
      导航名称: bilingualTextSchema.refine((name) => name.en in navigationPaths, {
        message: "导航名称.en 必须使用 Home、Research、Publications、Projects、Members 或 Join Us",
      }),
    })),
    首页主标题: bilingualTextSchema,
    首页副标题: bilingualTextSchema,
    首页统计: z.array(z.object({
      数量: z.string(),
      类别: bilingualTextSchema,
    })),
    负责人信息: profileSchema,
  }),
  研究方向: pageGuidanceSchema.extend({
    内容列表: researchSchema,
  }),
  代表成果: pageGuidanceSchema.extend({
    内容列表: publicationSchema,
  }),
  科研项目: pageGuidanceSchema.extend({
    内容列表: projectSchema,
  }),
  团队成员: pageGuidanceSchema.extend({
    团队层级: teamGroupsSchema,
  }),
  加入我们: pageGuidanceSchema.extend({
    正文: bilingualMarkdownSchema,
  }),
});

type BilingualText = z.infer<typeof bilingualTextSchema>;
type WebsiteContent = z.infer<typeof contentSchema>;
let contentCache: WebsiteContent | undefined;

function localize(value: BilingualText, locale: Locale): string {
  return value[locale];
}

function formatMarkdownBlocks(blocks: string[]): string {
  const isListItem = (block: string) => /^\s*(?:[-+*]|\d+[.)])\s+/.test(block);
  const isQuote = (block: string) => /^\s*>\s?/.test(block);

  return blocks.reduce((markdown, block, index) => {
    if (index === 0) return block;
    const previous = blocks[index - 1];
    const sameContinuousBlock = (isListItem(previous) && isListItem(block)) || (isQuote(previous) && isQuote(block));
    return `${markdown}${sameContinuousBlock ? "\n" : "\n\n"}${block}`;
  }, "");
}

function getContent(): WebsiteContent {
  if (contentCache) return contentCache;
  const filePath = path.join(process.cwd(), "content", "content.json");
  contentCache = contentSchema.parse(JSON.parse(fs.readFileSync(filePath, "utf8")));
  return contentCache;
}

export function getSite(locale: Locale = "zh") {
  const home = getContent().首页;
  const identity = locale === "zh"
    ? { name: "付蕾 AI4Science 研究团队", description: "面向生命科学与医学的人工智能、高性能计算与分子机制研究团队。" }
    : { name: "Lei Fu AI4Science Research Group", description: "AI, high-performance computing and molecular mechanisms for life science and medicine." };
  return {
    name: identity.name,
    shortName: home.网站简称,
    description: identity.description,
    navigation: home.导航菜单.map((item) => ({
      label: localize(item.导航名称, locale),
      href: locale === "en" ? `/en${navigationPaths[item.导航名称.en]}` : navigationPaths[item.导航名称.en],
    })),
  };
}

export function getDeploymentUrl(): string {
  return (process.env.DEPLOY_PRIME_URL || process.env.URL || "http://localhost:3000").replace(/\/$/, "");
}

export function getHome(locale: Locale = "zh") {
  const home = getContent().首页;
  return {
    headline: localize(home.首页主标题, locale),
    tagline: localize(home.首页副标题, locale),
    metrics: home.首页统计.map((item) => ({ value: item.数量, label: localize(item.类别, locale) })),
  };
}

export function getProfile(locale: Locale = "zh") {
  const content = getContent();
  const profile = content.首页.负责人信息;
  const otherLocale: Locale = locale === "zh" ? "en" : "zh";
  return {
    name: localize(profile.名称, locale),
    englishName: localize(profile.名称, otherLocale),
    title: localize(profile.角色, locale),
    mentorType: localize(profile.导师类别, locale),
    portrait: profile.头像,
    email: profile.邮箱,
    phone: profile.电话,
    office: localize(profile.办公室, locale),
    affiliations: profile.任职单位.map((item) => localize(item, locale)),
    bio: localize(profile.个人简介, locale),
    education: profile.教育经历.map((item) => ({
      period: localize(item.时间, locale),
      institution: localize(item.单位, locale),
      detail: localize(item.说明, locale),
    })),
  };
}

export function getResearch(locale: Locale = "zh") {
  const researchColors = ["cyan", "violet", "lime", "orange", "blue"] as const;

  return getContent().研究方向.内容列表.map((item, index) => ({
    slug: `research-${index + 1}`,
    title: localize(item.方向名称, locale),
    english: localize(item.方向名称, "en"),
    summary: localize(item.方向简介, locale),
    link: item.链接 || undefined,
    accent: researchColors[index % researchColors.length],
    keywords: item.关键词[locale],
  }));
}

export function getProjects(locale: Locale = "zh") {
  return getContent().科研项目.内容列表.map((item) => ({
    title: localize(item.项目名称, locale),
    agency: localize(item.项目来源, locale),
    code: item.项目编号,
    period: localize(item.项目周期, locale),
    funding: localize(item.项目经费, locale),
    role: localize(item.承担角色, locale),
    status: item.项目状态,
    link: item.访问链接 || undefined,
  }));
}

export function getPublications(locale: Locale = "zh") {
  return getContent().代表成果.内容列表.map((item) => ({
    title: item.标题,
    authors: item.作者,
    venue: item.期刊会议,
    year: item.年份,
    details: item.发表信息,
    featured: item.首页推荐,
    link: item.访问链接 || undefined,
    note: item.作者说明 ? localize(item.作者说明, locale) : undefined,
  }));
}

export function getTeam(locale: Locale = "zh") {
  const team = getContent().团队成员;
  return {
    groups: team.团队层级.map((group) => ({
        id: group.层级名称.en,
        name: localize(group.层级名称, locale),
        description: group.层级描述 ? localize(group.层级描述, locale) : undefined,
        members: group.成员列表.map((member) => ({
            id: member.成员名称.en,
            name: localize(member.成员名称, locale),
            role: localize(member.身份, locale),
            portrait: member.头像,
            bio: localize(member.简介, locale),
            tags: member.标签.map((tag) => localize(tag, locale)),
            email: member.邮箱,
            phone: member.电话,
            website: member.个人主页,
            link: member.访问链接 || undefined,
          })),
      })),
  };
}

export function getJoin(locale: Locale = "zh") {
  const join = getContent().加入我们;
  return {
    content: formatMarkdownBlocks(join.正文[locale]),
  };
}

export type Publication = ReturnType<typeof getPublications>[number];
export type TeamGroup = ReturnType<typeof getTeam>["groups"][number];
