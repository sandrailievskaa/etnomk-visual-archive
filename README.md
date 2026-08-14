# Folk Threads Archive

Lovable Prompt — EtnoMK Redesign

Copy the entire text below directly into Lovable.

CONTEXT

I'm building EtnoMK — a web platform for digitizing and cataloging Macedonian folk costumes and embroidery (carpets/rugs, garments, ornaments), tied to research on self-supervised image recognition (DINOv2 embeddings + pgvector) and future motif generation. The app has: Home, Browse Records (with region/category filters), Record Details, Create Record (form), Search Similar (visual-similarity modal), Login/Register, Admin.

A functional version already exists, but the design looks like a generic Bootstrap/admin-panel template — beige background, brown buttons, generic cards. I need a complete visual redesign that keeps the same functionality and information architecture, but looks like it was made by an experienced UI/UX designer working with a front-end developer for a high-caliber cultural heritage institution (think: Google Arts & Culture, Europeana — but with a strong local identity), not like a templated AI-generated interface.

DESIGN PHILOSOPHY — AVOID GENERIC AI LOOK

Explicitly avoid:

Standard purple-blue gradient backgrounds (a signature "AI generated" design tell)

Sans-serif headings + generic card shadow (0 0 10px rgba(0,0,0,0.1)) on everything

Emoji instead of real icons

Centered hero sections with generic stock photography

Overly rounded corners everywhere (border-radius: 20px+ on every element)

Inconsistent spacing (16px here, 24px there, no system)

Instead, the design should draw its identity from the subject matter itself — embroidery. Every UI segment (borders, dividers, hover states, loaders) should subtly reference textile ornamentation, without being literal or kitschy.

COLOR PALETTE (concrete hex values)

Inspired by the regions covered in the research (Kumanovo — deep crimson, Ohrid — black-dominant, Miyak — gold-crimson):

--color-background: #FAF6EF        /* warm cream/paper background, not pure white */
--color-surface: #FFFFFF           /* cards/panels */
--color-surface-alt: #F1E9D8       /* alternate sections */

--color-primary: #7A1E2B           /* deep wine-red (Kumanovo embroidery) — main CTA color */
--color-primary-dark: #591420      /* primary hover state */
--color-primary-light: #A84356

--color-accent-gold: #B8862E       /* gold/ochre — accents, borders, active states */
--color-accent-gold-light: #E8D5A8 /* pill/badge backgrounds */

--color-ink: #2B1810               /* near-black warm brown — primary text (never pure #000) */
--color-ink-muted: #6B5D4F         /* secondary text */

--color-border: #E3D5BC            /* subtle dividers */

--color-success: #4A6B4D
--color-danger: #8B3A3A


Never use pure #000000 or #FFFFFF for text/backgrounds — always warm, earthy variants. This is key to reading as a "cultural archive" rather than a generic SaaS product.

TYPOGRAPHY

Headings (H1–H3): a serif font with character — Fraunces, Playfair Display, or Lora (Google Fonts). This gives a "museum catalog" feel rather than "SaaS dashboard."

Body/UI text: clean, legible sans-serif — Inter or similarly refined, never default system-ui.

Cyrillic: verify the chosen font has full Cyrillic support (Fraunces and Lora support it via variable font extensions; if not, fall back to Noto Serif for headings).

Hierarchy: H1 40–48px/serif/600 weight, H2 28–32px, body 16px/1.6 line-height, labels 13px uppercase with 0.05em letter-spacing.

SPACING & LAYOUT SYSTEM

Strict 8px grid — every margin/padding value must be a multiple of 8 (8, 16, 24, 32, 48, 64, 96). Never arbitrary values (13px, 22px).

Container max-width: 1280px, 24px horizontal padding on mobile, 48px on desktop

Card grid: gap: 24px, minimum 280px per card (grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)))

Vertical rhythm between major sections: 64px on desktop, 40px on mobile

Border-radius consistency: 4px for inputs/badges, 8px for cards, never more than 12px for larger panels (no 20–24px pill-shapes everywhere)

DECORATIVE SYSTEM (replacing generic ornamentation)

The current hardcoded top "traka" border (likely a repeating PNG) should become a thin SVG-based geometric motif border (2–4px tall), built from alternating triangles/diamonds in the primary/gold colors, used only for:

Top of the page (thin strip, 4–6px, not 20px+ like now)

Active tab/filter indicator

Divider between major sections (instead of <hr>)

Don't overload every element with motif — treat the ornament as an accent, not wallpaper.

COMPONENTS — SPECIFIC GUIDANCE

Navbar

Sticky, --color-background with backdrop-blur on scroll, thin bottom border in --color-border. Logo + wordmark on the left (serif), nav links centered/right with active state = gold underline (2px, animated width transition), primary CTA button ("Add Record") solid --color-primary, other links text-only with hover color/weight transition.

Home / Hero

Replace the flat beige rectangle with: left column text (H1 serif + short description + two CTA buttons, primary solid + secondary outline), right column — a collage/mosaic of 3–4 record images in an irregular grid with slightly varied border-radius/sizes (not all identical), creating an "archive" feeling rather than a stock-photo hero.

Browse Records

Search bar: slightly heavier border (1.5px --color-border), focus state with a gold ring (not default browser blue)

Filters: replace basic <select> elements with custom-styled dropdowns (4px rounded, gold caret icon), laid out in one horizontal row with a "Filter" button styled as ghost/outline, not a solid box

Cards: 4:5 portrait aspect ratio image (appropriate for costumes), hover = subtle scale(1.02) + shadow lift (0 8px 24px rgba(43,24,16,0.12)), region/category shown as small pill badges with --color-accent-gold-light background and --color-ink text (not generic gray badges)

Include proper empty/loading states with skeleton loaders (not a spinner)

Record Details

Two-column layout: image left (with a subtle frame/border, deep box-shadow), metadata right in a clean definition-list style (label uppercase/muted, value normal/bold). Description section separated by a gold hairline divider. Two buttons at the bottom: "Search Similar" primary solid, "Back to Records" as a text link with an arrow.

Search Similar (modal)

Modal with a soft overlay (rgba(43,24,16,0.5) backdrop, not pure black), "Record image / Upload image" tab-toggle built as a pill-switch (not two visually identical buttons — the active tab must be clearly distinguished via solid fill vs. outline). Results shown in a grid with a match-score indicator if available (small percentage bar or badge).

Create Record (form)

Group fields logically (Title+Description as one block, Region+Category+Material+Technique in a 2-column grid), each field with a clear label (13px uppercase, muted) + helper text below the input (13px, --color-ink-muted). Upload zone — build a real drag-and-drop area with a dashed border (not a plain <input type=file> button), with an icon + "Drag an image here or click to upload."

Login/Register

Replace the generic gradient background with a full-bleed blurred photo of an embroidered textile texture (or an SVG ornament pattern) behind the centered white card; give the card a more pronounced shadow and a thin gold top-border (4px) as an accent detail.

RESPONSIVE RULES

Breakpoints: 640px (mobile), 1024px (tablet), 1280px (desktop)

Navbar → hamburger under 1024px, with a slide-in drawer (not a full-screen dropdown)

Card grid: 1 column <640px, 2 columns 640–1024px, 3–4 columns >1024px

Filters on mobile: collapse into a "Filters" button that opens a bottom-sheet, not cramped selects side by side

All touch targets minimum 44x44px on mobile

MICROINTERACTIONS

Transition timing everywhere: 150–200ms ease-out for hover, 250ms ease-in-out for modals/drawer opening. Avoid bounce/elastic easing — the feel should be precise and "curated," not playful.

TECHNICAL NOTES FOR LOVABLE

React + Tailwind, define the colors above as CSS custom properties in tailwind.config (extend theme colors) for consistency

Component library: shadcn/ui as a base, but override the default styles (border-radius, colors, shadows) per the spec above — don't leave defaults on gray/blue values

Fonts loaded via Google Fonts with font-display: swap

All images with object-fit: cover and lazy loading

HERO BANNER — AI-GENERATED VISUAL

Generate one striking, wide hero/banner image (and optionally a short looping video) for the homepage, in an AI-art style built from folk-embroidery motifs:

Concept: abstract geometric embroidery patterns (diamonds, rosettes, zigzag borders in the style of Miyak/Kumanovo/Skopska Blatija motifs) flowing across the banner like woven thread, rendered with painterly/generative depth rather than a flat repeating pattern — think "embroidery motifs reimagined as generative art," not a literal photo of a costume.

Palette: strictly the site's own colors (deep wine-red #7A1E2B, gold #B8862E, cream #FAF6EF, dark ink brown) so it feels native to the brand, not a random AI-gradient image.

Composition: motifs denser and more detailed on one edge (e.g. left or bottom), fading into open cream/negative space on the other side, so real UI text/CTA buttons can sit legibly on top without a dark overlay hack.

Avoid: photorealistic faces, any specific real person, any specific real named institution's exact copyrighted motif reproduced pixel-for-pixel — keep it an original, inspired-by-the-style composition.

If Lovable supports it, generate this as an SVG/Canvas-based generative pattern (so it scales crisply and can be lightly animated — e.g. a slow drift or thread-stitching reveal animation on load) rather than a static raster hero image; this also keeps page weight low.

Optional short loop (3–6s, muted, autoplay, subtle): a close-up macro shot style of thread being stitched, rendered in the same illustrative/generative style as the banner — used as a background layer behind the hero text at low opacity, not as the main focal content.

PARTNER / SUPPORTED-BY LOGOS

Add a "Partners" or "Supported by" strip in the footer (monochrome/grayscale by default, full color on hover, small consistent height ~32–40px, evenly spaced, on a clean divider-separated footer row) featuring:

THREAD — EU Creative Europe project on real-time embroidery digitization and AI-assisted design (Kosovo, North Macedonia, Albania): logo at https://thread-crea.org/images/thread-logo.png, links to https://thread-crea.org/mk/

Vezilka — North Macedonia's national AI Factory initiative: logo at https://vezilka.ai/wp-content/uploads/2026/05/vezilka-logo-horizontal-transparent.png (a white/negative version is also available at .../vezilka-logo-white-tranparent-02.png for dark footer backgrounds), links to https://vezilka.ai/mk/

Treat these the same way EU-funded or heritage-sector sites typically show funder/partner logos: small, understated, grayscale-by-default row — not competing visually with the primary brand color palette above.

Technology for generating: 1.

React frontend

•

Shows the "Search Similar" modal.

•

Lets the user search by the current record image or upload another image.

•

Optionally sends a region hint.

2.

Spring Boot backend

•

Stores uploaded images.

•

Calls the Python similarity service.

•

Saves whole-image embeddings and patch embeddings.

•

Searches PostgreSQL/pgvector for nearest visual matches.

•

Applies region filtering when a region is known.

3.

Python similarity service

•

Loads the DINOv2 model.

•

Converts images into vector embeddings.

•

Produces whole-image embeddings and patch-level embeddings. PostgreSQL uses the pgvector extension so vectors can be compared directly in SQL.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://etnomk-visual-archive.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f3eb7310-604d-47b8-b4d4-44be4429546c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
