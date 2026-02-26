# CCOS Portfolio Website - Progress & Context

## Project Overview
- **Name**: ccos (Sissi Xichen Wang's personal portfolio)
- **Domain**: sissiwang.me (Cloudflare DNS → Vercel)
- **Repo**: https://github.com/sissississi-013/ccos
- **Status**: Not yet started — empty project directory

## Design Decisions (Confirmed)
- **CMS**: Notion as headless CMS for ALL 5 sections
- **Hosting**: Vercel + Cloudflare DNS
- **Translation**: Claude API for on-the-fly multilingual (including easter eggs)
- **Style**: Single page, minimalistic, pure white background
- **Reference**: https://canopylabs.ai/

## Tech Stack
- Next.js 15 (App Router, TypeScript, `src/` directory)
- Tailwind CSS v4
- Framer Motion
- @notionhq/client
- @anthropic-ai/sdk
- Deployed on Vercel

## Site Structure
```
sissiwang.me/                    ← Single page (all 5 sections)
sissiwang.me/blog/[slug]         ← Individual blog post
sissiwang.me/project/[slug]      ← Project detail page
sissiwang.me/art/[slug]          ← Art detail page
sissiwang.me/research/[slug]     ← Research detail page
sissiwang.me/life/[slug]         ← Life detail page
```

## Single Page Layout (top to bottom)
1. **Header** (fixed top-left): Language switcher (CN/EN/custom input with easter eggs)
2. **Hero**: "Sissi Xichen Wang (pixel)" — pixel particle burst on click (5 colors)
3. **Blogs** section (orange #FF6B35) — cards linking to /blog/[slug]
4. **Projects** section (green #4ECB71) — cards linking to /project/[slug]
5. **Art** section (pink #FF6B9D) — cards linking to /art/[slug]
6. **Research** section (blue #4A90D9) — cards linking to /research/[slug]
7. **Life** section (yellow #FFD93D) — cards linking to /life/[slug]
8. **Footer**: Video background, name, year (2026), GitHub/LinkedIn/X/Are.na links

## Navigation
- Right side: 5 fixed colored pixel dots (one per section)
- Click dot → smooth scroll to section
- Active section dot highlighted
- Mobile: horizontal bottom dots

## Notion Database Structure
5 databases with common properties: Title, Slug, Date, Tags, Cover, Status, Description, Language
- **Blogs**: + ReadTime
- **Projects**: + URL, GitHub, TechStack
- **Art**: + Medium, Dimensions
- **Research**: + Publication, Authors, PDF
- **Life**: + Location, Category

## Translation System
- CN/EN preset buttons + custom input box
- Claude API (sonnet) for translations
- Easter eggs: type "pirate", "emoji", "uwu", "1337", etc.
- Client-side cache (Map) to avoid repeat API calls

## Implementation Phases
- Phase 0: Scaffold & Config
- Phase 1: Notion Data Layer
- Phase 2: Homepage Layout & Sections
- Phase 3: Navigation (Side Dots)
- Phase 4: Hero & Pixel Click Interaction
- Phase 5: Translation System
- Phase 6: Detail Pages + Notion Renderer
- Phase 7: Footer
- Phase 8: Polish & Deployment

## Key Technical Notes
- ISR with revalidate = 3600 (1 hour) for Notion data
- Custom Notion block → React renderer (not notion-to-md)
- Canvas-based pixel particles respecting prefers-reduced-motion
- Section colors: orange, green, pink, blue, yellow
- On-demand revalidation webhook for instant Notion updates
- Notion image URLs expire — ISR handles refresh
