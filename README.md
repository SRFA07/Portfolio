# Reebal Faakhir Andrabi — Portfolio

A recruiter-facing portfolio built to answer one question in 90 seconds: *can this
person solve hard technical problems?* Research-first, dark, minimal.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Framer
Motion · react-markdown. Deploy target: Vercel.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also type-checks)
```

## Content — everything is data, so updates are one-file changes

### Add or edit a project
Create `src/content/projects/<name>.ts` exporting a `Project` (see
`src/content/projects/types.ts`), then register it in
`src/content/projects/index.ts`.

- `featured: true` puts it on the homepage; `order` sets ranking.
- Card-only projects just need `summary` + `highlights`.
- A full case study adds `sections` (block types: `p`, `list`, `callout`, `table`,
  `metrics`, `code`, `image`, `diagram`), rendered by `BlockRenderer`.
- Custom SVG diagrams live in `src/components/projects/diagrams.tsx` — add a
  component, register it by `id`, and reference it with `{ type: "diagram", id }`.

### Add a blog post
Drop a Markdown file in `src/content/blog/<slug>.md` with front-matter:

```markdown
---
title: "Post title"
date: "2026-07-01"
excerpt: "One-line summary."
tags: ["Machine Learning"]
---

Body in Markdown…
```

It appears automatically on `/blog`, newest first.

### Site-wide config
Name, roles, email, and links live in `src/lib/site.ts`.

## Assets in `public/`
- `reebal.jpg` — hero portrait
- `resume.pdf` — linked from the résumé buttons
- `reports/*.pdf` — per-project report links

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. Import it on Vercel (framework auto-detected as Next.js).
3. Set the env var `NEXT_PUBLIC_SITE_URL` to the production URL (used by
   `sitemap.ts`, `robots.ts`, and Open Graph metadata).
