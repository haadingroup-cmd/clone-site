import { DEFAULT_SERVICES } from "@/content/services";
import { DEFAULT_PRICING_PLANS } from "@/content/pricing";
import { DEFAULT_FAQS } from "@/content/faqs";
import { DEFAULT_SETTINGS } from "@/content/settings";
import { DEFAULT_BLOG_POSTS } from "@/content/blog";
import { CASE_STUDIES } from "@/content/case-studies";
import type { BlogPostData, CaseStudyData, FaqData, PricingPlanData, ServiceData, SiteSettings } from "@/types";

/**
 * Read layer for the site. All content lives in src/content/* — edit those
 * files to change services, prices, FAQs, blog posts, case studies or
 * business details, then push to GitHub (Vercel redeploys automatically).
 */
const bySort = <T extends { sortOrder: number }>(a: T, b: T) => a.sortOrder - b.sortOrder;

export async function getServices(): Promise<ServiceData[]> {
  return [...DEFAULT_SERVICES].sort(bySort);
}

export async function getService(slug: string): Promise<ServiceData | null> {
  return DEFAULT_SERVICES.find((s) => s.slug === slug) ?? null;
}

export async function getPricingPlans(): Promise<PricingPlanData[]> {
  return [...DEFAULT_PRICING_PLANS].sort(bySort);
}

export async function getFaqs(category = "general"): Promise<FaqData[]> {
  return DEFAULT_FAQS.filter((f) => f.category === category).sort(bySort);
}

export async function getSettings(): Promise<SiteSettings> {
  return DEFAULT_SETTINGS;
}

export async function getBlogPosts(): Promise<BlogPostData[]> {
  return [...DEFAULT_BLOG_POSTS].sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

export async function getBlogPost(slug: string): Promise<BlogPostData | null> {
  return DEFAULT_BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

export async function getCaseStudies(): Promise<CaseStudyData[]> {
  return [...CASE_STUDIES].sort(bySort);
}

export async function getCaseStudy(slug: string): Promise<CaseStudyData | null> {
  return CASE_STUDIES.find((c) => c.slug === slug) ?? null;
}
