# THE QUIET HUSTLE — Brand Kit Reference

## Quick Reference Card

**Brand:** The Quiet Hustle
**Handle:** @thequiethustle
**Tagline:** How online income actually works.
**Aesthetic:** Luxury editorial minimalism. Celine meets finance newsletter.

---

## Logo Specifications

### Full Wordmark (Option C — Approved)
- Font: Georgia serif, lowercase
- "the" in small italic Georgia above main wordmark, letter-spacing 0.55em
- "quiet" and "hustle" stacked, font-size ratio ~3.5:1 vs "the"
- Gold gradient horizontal rules: above "the" and below "hustle"
- Heavier gold separator between "quiet" and "hustle" (2px)
- Secondary thin rule below main separator (0.5px, 50% opacity)
- Diamond ornament centered below bottom rule
- Double-rule frame border (outer 1.2px, inner 0.5px)
- Corner ornaments at all four corners (short perpendicular lines)

### Gold Gradient Recipe (for SVG/CSS)
```
Primary gold: #B8983E → #D4B876 → #F0E4C8 → #D4B876 → #A88040
Horizontal fade: #A88040 (0% opacity) → #D4B876 → #F0E4C8 → #D4B876 → #A88040 (0% opacity)
Ivory text: #FFFBF5 → #E8DDD0
```

### Profile Picture
- Square: 1080x1080px, full wordmark centered
- Circle crop: Optimized version with circular gold ring border (490px radius), text centered for Instagram thumbnail legibility
- Both versions: Deep black background #060609 with warm radial glow center

---

## Color System

### Primary Palette
```css
--deep: #0D0D12;        /* Primary backgrounds */
--surface: #1A1A2E;      /* Cards, elevated surfaces */
--card: #12121A;         /* Content cards */
--gold: #C4A265;         /* Primary accent */
--gold-light: #E8D5B7;  /* Warm secondary */
--sage: #7A9E7E;         /* Growth, trust — sparingly */
--cream: #F5F0EB;        /* Primary text */
--muted: #8A8A9A;        /* Secondary text */
--dim: #4A4A5A;          /* Tertiary text */
--border: #1E1E2E;       /* Subtle borders */
```

### Semantic Colors
```css
--error-bg: rgba(224, 85, 85, 0.06);    /* "Don't" card backgrounds */
--error-border: rgba(224, 85, 85, 0.12);
--error-text: #C08080;
--success-bg: rgba(122, 158, 126, 0.08); /* "Do" card backgrounds */
--success-border: rgba(122, 158, 126, 0.15);
--success-text: #7A9E7E;
```

---

## Typography System

### Font Stack
```css
--font-display: 'Georgia', 'Times New Roman', serif;
--font-body: 'DM Sans', system-ui, sans-serif;
```

### Scale
| Element | Font | Size | Weight | Spacing | Style |
|---------|------|------|--------|---------|-------|
| Carousel cover title | Georgia | 26-28px | 400 | normal | normal |
| Content slide title | Georgia | 20-22px | 400 | normal | normal |
| Body text | DM Sans | 13-14px | 400 | normal | normal |
| Labels/metadata | DM Sans | 10-11px | 500 | 0.15-0.2em | uppercase |
| Quote text | Georgia | 18-20px | 400 | normal | italic |
| Reel overlay main | DM Sans | 20px | 400 | normal | normal |
| Reel overlay accent | DM Sans | 20px | 400 | normal | gold color |
| Slide numbers | Georgia | 42px | 200 | normal | 40% opacity gold |
| Handle | DM Sans | 10-11px | 400 | 0.06em | normal |

---

## Template Structures

### Carousel Template
```
COVER SLIDE:
├── Top: Logo mark (circle + "thequiethustle")
├── Middle: Gold accent line (32px wide, 2px)
├── Main: Hook text (Georgia, 26-28px, cream)
├── Bottom: "Swipe →" (gold, uppercase, 13px, 0.15em spacing)
└── Footer: Slide dots

CONTENT SLIDES (×5):
├── Top-left: Logo mark
├── Top-right: Slide number (01-05, large faded gold Georgia)
├── Middle: Slide title (Georgia, 20-22px, cream)
├── Body: Explanation text (DM Sans, 14px, muted)
└── Footer: Slide dots (current dot = gold, wider)

CTA SLIDE:
├── Center: Gold accent line (48px)
├── Main: "Save this for later." (Georgia, 24px, cream)
├── Sub: Follow prompt (DM Sans, 13px, muted)
└── Footer: Slide dots
```

### Reel Overlay Template
```
FRAME:
├── Background: Gradient dark (#0D0D12 → #1A1520 → #0D0D12)
├── Center card: #0D0D12 at 85% opacity, backdrop-blur 20px
│   ├── Gold accent line (24px, 2px)
│   ├── Main text (DM Sans, 20px, cream)
│   └── Accent text (DM Sans, 20px, gold)
├── Below card: Logo mark
└── Bottom: Audio indicator + "REEL" label
```

### Static Quote Template
```
FRAME (1:1):
├── Corner accents: Top-left and bottom-right (gold lines, 33% opacity)
├── Center:
│   ├── Large opening quote mark (Georgia, 48px, gold 30% opacity)
│   ├── Quote text (Georgia Italic, 19px, cream, centered)
│   ├── Gold separator (32px, centered)
│   └── Handle (@thequiethustle, uppercase, 10px, muted)
```

### Comparison Template
```
FRAME (4:5):
├── Top: Logo mark
├── Header: "✕ Not this" (red) — divider — "✓ Do this" (sage)
├── Content: 3 pairs of cards
│   ├── Red card: rgba error bg, line-through text
│   └── Green card: rgba success bg, bold text
└── Footer: "Save this → share it → come back to it"
```

---

## Content Pillar Tags
- 🔵 How It Works (40%) — Affiliate/income mechanics
- 🟢 Smart Moves (25%) — Actionable tips
- 🟠 Real Talk (20%) — Myth-busting, contrarian
- 🟣 Behind the Curtain (15%) — Systems/tools peek

## Hashtag Bank
Core (use on every post): #thequiethustle #onlineincome #sidehustle
Rotate from: #affiliatemarketing #digitalincome #incometips #makemoneyonline #realtalk #entrepreneurmindset #passiveincomemyth #sidehustletips #buildquietly #incomestreams
