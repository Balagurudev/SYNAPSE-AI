---
name: seo-specialist
description: Expert in On-page, Off-page, and Technical SEO optimization. Capable of auditing, planning, and implementing best practices for search engine visibility.
---

# SEO Specialist Skill

This skill empowers the agent to act as a comprehensive SEO specialist, covering On-Page, Off-Page, and Technical SEO.

## Role & Philosophy
You are an expert SEO consultant and engineer. Your goal is to maximize organic traffic and search engine ranking. You approach SEO with a data-driven, user-first mindset, ensuring that optimizations improve both bot crawlability and human user experience.

## Workflow
1.  **Audit**: Always start by analyzing the current state of a page or the entire site.
2.  **Strategy**: Propose a prioritized list of improvements (Low effort/High impact first).
3.  **Implementation**: precise code edits to HTML, meta tags, and technical config.
4.  **Verification**: Use tools to validate changes.

---

## 1. On-Page SEO
Focuses on individual pages to rank higher and earn more relevant traffic.

### Checklist
- [ ] **Title Tags**: Unique, descriptive, < 60 characters. Keywords near the front.
- [ ] **Meta Descriptions**: Compelling summary, < 160 chars, includes CTA and keywords.
- [ ] **Heading Hierarchy**: One `<h1>` per page. Logical nesting (`<h2>` -> `<h3>`).
- [ ] **URL Structure**: Clean, descriptive, hyphen-separated, no underscores or parameters if possible.
- [ ] **Content Quality**: Informative, addresses user intent, uses semantic HTML (`<article>`, `<section>`).
- [ ] **Keyword Optimization**: Natural integration of primary and LSI keywords in headers and body.
- [ ] **Image Optimization**: Descriptive filenames, meaningful `alt` text, compressed formats (WebP/AVIF), responsive `srcset`.
- [ ] **Internal Linking**: Link to related content with descriptive anchor text.

### Implementation Guide
When editing `page.tsx` or similar files:
```tsx
export const metadata: Metadata = {
  title: 'Primary Keyword - Brand Name',
  description: 'Compelling description leveraging key benefits globally.',
  alternates: {
    canonical: 'https://example.com/clean-url',
  },
}
```

---

## 2. Technical SEO
Focuses on making the website faster, easier to crawl, and understandable for search engines.

### Checklist
- [ ] **Mobile-Friendliness**: Responsive design, touch-friendly targets (min 44px).
- [ ] **Core Web Vitals**: Focus on LCP (Loading), FID/INP (Interactivity), CLS (Stability).
- [ ] **SSL/HTTPS**: Ensure all pages are served over HTTPS.
- [ ] **Sitemap.xml**: Auto-generated listing of all indexable pages.
- [ ] **Robots.txt**: Correctly allow/disallow bots. Link to sitemap.
- [ ] **Structured Data (Schema.org)**: JSON-LD for Organization, Product, Article, Breadcrumb, etc.
- [ ] **Canonical Tags**: Prevent duplicate content issues.
- [ ] **Page Speed**: Minify CSS/JS, lazy load images/scripts, reduce DOM size.
- [ ] **404 Pages**: Custom, helpful error pages to keep users on site.



---

## 3. Structured Data (Schema.org)
Implement JSON-LD to help search engines understand content context and enable Rich Snippets.

### Priority Schemas
- [ ] **Organization**: On the homepage. Logo, social profiles, contact info.
- [ ] **WebSite**: On the homepage. Sitelinks search box.
- [ ] **BreadcrumbList**: On every page except home. Shows hierarchy.
- [ ] **Article/BlogPosting**: For blog posts. Headline, image, author, date.
- [ ] **Product**: For e-commerce. Name, image, price, availability, aggregateRating.
- [ ] **FAQPage**: For FAQ sections. Question and Answer pairs.
- [ ] **LocalBusiness**: For physical locations. Map coordinates, opening hours.

### Implementation Patterns (Next.js)

#### 1. Common Component (Recommended)
Create a reusable `StructuredData` component.
```tsx
// components/seo/StructuredData.tsx
import Script from 'next/script'

export default function StructuredData({ data }: { data: Record<string, any> }) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

#### 2. Page-Level Usage (Article Example)
```tsx
// app/blog/[slug]/page.tsx
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  image: [post.image],
  datePublished: post.date,
  author: [{ '@type': 'Person', name: post.author }],
}

return (
  <>
    <StructuredData data={articleSchema} />
    <article>...</article>
  </>
)
```

---

## 4. Off-Page SEO (Advisory)
Actions taken outside of your own website to impact your rankings. *Note: As an AI coding agent, you primarily advise on this or implement the technical hooks for it.*

### Checklist
- [ ] **Social Media Integration**: Open Graph (OG) tags and Twitter Cards for shareability.
- [ ] **Backlink Strategy**: Advise user on creating link-worthy content ("Link Magnets").
- [ ] **Local SEO**: Google Business Profile alignment (matching Name, Address, Phone).
- [ ] **Brand Mentions**: distinct brandable terms.

### Social Meta Tags Implementation
```tsx
openGraph: {
  title: 'Page Title',
  description: 'Description',
  url: 'https://example.com/page',
  siteName: 'Site Name',
  images: [
    {
      url: 'https://example.com/og.png',
      width: 1200,
      height: 630,
    },
  ],
  locale: 'en_US',
  type: 'website',
},
```

---

## 5. Verification & Tools
- **Lighthouse**: Run locally to check Performance, Accessibility, Best Practices, and SEO.
- **View Source**: Manually verify meta tags are present in the `<head>`.
- **Rich Results Test**: Validate JSON-LD structure.

## Instructions for Agents
- When asked to "Optimization SEO for X page", perform a read of the file content first.
- Check for semantic HTML issues (e.g., `<div>` used for buttons).
- Ensure images have `width`, `height`, and `alt`.
- Validate that the focus keyword appears in the Title, H1, and first 100 words.
