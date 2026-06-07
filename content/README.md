# The Quiet Hustle — Content Library

Ready-to-post content for the 28-day launch month (June 8 – July 5). Every post is rendered at native export size with its full caption, hashtags, and CTA, and every frame can be downloaded as an individually-named PNG.

Open **`index.html`** for the master view of all four weeks with a one-click master export. Or open any week folder's `index.html` for that week alone.

## Structure

```
content/
├── index.html          Master hub — all 4 weeks + "Download all 120 PNGs" (→ tqh-content-weeks-1-4.zip)
├── renderers.js        Native-resolution frame renderers (carousel / reel / quote / pin + cover variants + compare)
├── pack.js             Page builder + self-contained PNG export (foreignObject rasterizer, embeds DM Sans + grain)
├── pack.css            Shared content-pack styling
├── week-01/            Introduction Arc   · Jun 8–14  · 7 posts · 25 frames
│   ├── data.js         All slide copy, captions, hashtags, pins for the week
│   └── index.html      Week page + "Download all 25 PNGs" (→ tqh-week-01-content.zip)
├── week-02/            Value & Systems    · Jun 15–21 · 7 posts · 35 frames
├── week-03/            Truth & Tactics    · Jun 22–28 · 7 posts · 34 frames
└── week-04/            Reflection & Systems · Jun 29 – Jul 5 · 7 posts · 26 frames
```

Total: **28 posts · 120 frames.**

## Formats & native sizes

| Format | Size | Notes |
|--------|------|-------|
| Carousel slide | 1080×1350 | Cover (variant A left-aligned / variant B centered), tip slides with faded numerals, compare slides (do-this/not-that), CTA. |
| Reel overlay | 1080×1920 | Glass card on dark gradient — export the PNG and layer over footage. |
| Static quote | 1080×1080 | Georgia italic, asymmetric corner brackets. |
| Pinterest pin | 1000×1500 | 2:3, on every carousel. Diamond-bulleted teasers. |

## Export

Each page has a **Download all PNGs** button. It renders every frame and zips them with individual, descriptive filenames:

```
tqh-carousel-5-affiliate-secrets-01.png … -07.png
tqh-reel-referral-commissions.png
tqh-quote-first-100-dollars.png
tqh-pin-3-affiliate-models.png
```

The master export (`index.html`) organizes the 120 files into `week-01/` … `week-04/` subfolders inside `tqh-content-weeks-1-4.zip`. A full master render takes a couple of minutes; the button shows live progress.

> The exporter is fully self-contained — it embeds DM Sans and the film-grain texture, so PNGs are pixel-faithful with no external dependencies at render time. (JSZip loads from CDN.)

## Weekly arcs

- **Week 1 — Introduction Arc.** Who's behind the account, how affiliate income actually works, the 3 models, first principles. *(Copy from the content calendar — final.)*
- **Week 2 — Value & Systems.** Tool stacks, free trackers, spotting staged screenshots, VIP rates, what a dashboard really shows.
- **Week 3 — Truth & Tactics.** Red flags, outdated advice, why people fail, do-this-not-that, the exact rate-negotiation message.
- **Week 4 — Reflection & Systems.** Organizing the business, a month-one reckoning, $0 starts, what I'd do differently, the $100-vs-$1,000 gap.

## Voice rules (enforced across all copy)

- No exclamation marks. Calm authority, never hype.
- "income systems" / "revenue streams" — never the p-word as brand copy (it survives only as a discovery hashtag and in the Day-6 post that rejects the term).
- No dollar promises. Tools kept categorical (a source of truth, a link manager) — never dated product names.
- Faceless — no people, no personal identity. The wordmark is the identity.

**Provenance:** Weeks 1–2 copy is from the brand content calendar (`tqh-content-calendar-knowledge.md`) and is final. Weeks 3–4 copy is authored in brand voice from the post titles — review before scheduling.
