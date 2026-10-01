import { AuditPromo } from "@/components/audit/AuditPromo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { AUDIT_CATEGORIES } from "@/lib/audit/types";
import { getSettings } from "@/lib/data";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata = buildMetadata({
  title: "Free Website SEO & Conversion Audit",
  description:
    "Request a free website audit from HaadinGlobal: technical SEO, on-page SEO, content, performance, social previews, accessibility and conversion — with clear fixes.",
  path: "/audit",
});

const CATEGORY_DETAILS: Record<string, string> = {
  technical: "HTTPS, status codes, redirects, canonical tag, indexability, robots.txt, XML sitemap, mobile viewport and encoding.",
  onpage: "Title tag, meta description, H1, heading hierarchy and structured data (schema).",
  content: "Amount of content, sub-headings and internal linking.",
  performance: "Page speed and Core Web Vitals, image weight, compression and render-blocking scripts.",
  social: "Open Graph title, description and image, and Twitter/X card.",
  accessibility: "Image alt text, page language, form labels, zoom and accessible link/button names.",
  conversion: "Click-to-call, WhatsApp and email links, lead forms, calls to action and analytics/ad pixels.",
};

export default async function AuditPage() {
  const settings = await getSettings();
  return (
    <>
      <Container as="section" className="pb-space-lg pt-space-md lg:pt-12">
        <AuditPromo headingLevel="h1" whatsapp={settings.whatsapp} email={settings.email} />
      </Container>
      <Container as="section" className="space-y-space-md py-space-lg">
        <SectionHeading
          eyebrow="Methodology"
          title="What the audit covers"
          description="Our team reviews your live website and sends back each finding with why it matters and how to fix it."
        />
        <div className="grid gap-space-sm md:grid-cols-2 lg:grid-cols-3">
          {AUDIT_CATEGORIES.map((c) => (
            <div key={c.id} className="space-y-space-xs rounded-2xl bg-surface-container-lowest p-space-md shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-container text-secondary">
                  <Icon name={c.icon} size={20} />
                </span>
                <h2 className="font-label-lg text-label-lg text-on-surface">{c.label}</h2>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{CATEGORY_DETAILS[c.id]}</p>
            </div>
          ))}
          <div className="space-y-space-xs rounded-2xl bg-surface-container-low p-space-md">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-container-lowest text-outline">
                <Icon name="info" size={20} />
              </span>
              <h2 className="font-label-lg text-label-lg text-on-surface">Free checklist</h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Want to check your own site first? Download our free digital marketing audit checklist from the box above.
            </p>
          </div>
        </div>
      </Container>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Free Website Audit", path: "/audit" }])} />
    </>
  );
}
