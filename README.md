# HaadinGlobal — Website

Official website of **HaadinGlobal**, a digital marketing & technology agency (Sahiwal, Pakistan), built with Next.js from the Stitch design.

It's a **front-end-only site**: no database, no server setup, no environment variables. Forms validate the visitor's details and then open **WhatsApp** (or email) with everything pre-filled, so enquiries reach you directly.

## Deploy on Vercel

1. Vercel → **Add New → Project** → **Import** this GitHub repository.
2. Leave all settings as they are (Vercel detects Next.js automatically).
3. Click the button at the bottom of the page. The site builds and goes live.

Every push to `main` redeploys the site automatically.

To use your own domain: Project → **Settings → Domains** → add `www.haadinglobal.com` and follow the DNS instructions.

## Run locally

Requires Node.js 20.9+.

```bash
npm install
npm run dev      # http://localhost:3000
```

Other commands: `npm run build`, `npm run lint`, `npm run typecheck`.

## Editing content

All content lives in `src/content/`. Edit a file, push to GitHub, and Vercel redeploys.

| File | What it controls |
| --- | --- |
| `settings.ts` | Phone, WhatsApp, email, address, founder, homepage stats, social links |
| `services.ts` | The 12 services, prices, features, process, FAQs |
| `pricing.ts` | Pricing tiers and guarantees |
| `calculator.ts` | Package-builder multipliers, discounts and PKR→USD rate |
| `faqs.ts` | General FAQs |
| `blog-posts.ts` | Blog articles (add a new object to publish a post) |
| `case-studies.ts` | Results / case studies |
| `legal.ts` | Privacy, terms, refund and security pages |

Images are in `public/images/`.

## Pages

Home · Services (+ 12 service pages) · Pricing with live package builder · Results (+ case study pages) · Blog (+ articles, search, categories) · Free audit request · About · FAQ · Contact · Privacy · Terms · Refund policy · Security. Plus `sitemap.xml`, `robots.txt`, Open Graph image and structured data (Organization, LocalBusiness, Service, FAQ, Article, Breadcrumb).

## Icons

Icons are the Stitch design's Material Symbols, self-hosted as a small font subset. To use a new icon, add its name to `src/lib/icons.ts`, then run `npm run icons:update`.
