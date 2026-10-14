# AAZHI — Design Research Notes
Source sites studied (structure/patterns only; no branding, copy, or assets reproduced):
1. Primary — large AI-company startups program page (editorial + program + stories + events + FAQ + mega-footer)
2. Secondary — senior design/engineering/AI studio homepage (immersive hero + proof strips + work list + dark testimonials)
3. Secondary — small studio self-build teardown/case-study page (single-price positioning + transparent process + deep footer)

All observations below describe compositional techniques, not visual identity.

---

## 1. Content hierarchy & pacing (how sections sequence and vary)

**Primary (program page):**
- Sequence observed: breadcrumb eyebrow → hero (display + deck + single email action) → large statement visual with numbered carousel indicator → 3-up product primer → logo/marquee strip → metric-led story cards → typed resource grid (labels distinguish format: ebook / webinar / case / guide) → program-benefit 2-col → events in 3 lanes (hosted / community / on-demand) + one featured event card → 8-item FAQ accordion → newsletter CTA → mega-footer.
- Pacing technique: alternate density. Dense card grids are always followed by an airy centered section with one idea and generous top/bottom padding. No two card grids sit adjacent without a breathing section or divider between them.
- Each section has exactly one job and one H-level. Section titles are short; supporting decks are capped to ~1–2 lines. Detail lives inside cards, never in the section header.
- Filter/sort affordance appears only where the list is long (stories index); the program page itself keeps linear scroll with anchor CTAs rather than tabs.

**Secondary (studio homepage):**
- Sequence observed: immersive hero → interactive proof strip (work fragments, draggable/arc on desktop, static strip fallback) → one-line trust statement → client ticker → 6-cell fact band → services index → long featured-work list → secondary artifact strip → testimonials → industries ticker (dual-direction marquee) → fit checklist → dual CTA → footer with full-bleed image.
- Pacing technique: proof precedes claims. Visual evidence appears within the first viewport after the hero, before any "about us" statement. Text-heavy credibility (facts, testimonials) is broken by full-bleed visual strips on either side.
- Dividers do heavy lifting: thin top borders separate work entries and fit rows instead of card backgrounds, so the long middle of the page feels like an index, not a stack of boxes.

**Secondary (self-build teardown):**
- Single-scroll conversion arc on one URL: context hero → framed build figure with caption → long-form reasoning (H2/H3) → related teardowns (3 cards) → bridge card to next section ("next chapter") → final CTA with scarcity pill.
- Pacing technique: narrow measure for reasoning (~60ch) inside a wide shell, with callout boxes (math note, deliverable note) breaking the article rhythm every ~3–4 screens. Checklists used for infrastructure/process; prose used for judgment/trade-offs.
- Explicit "what is deliberately excluded" block near the end — functions as objection handling without adding another CTA.

**Takeaway for AAZHI:** order page as promise → evidence → offer → risk-reversal → next step. Never place two same-density sections back-to-back; separate every card grid with either a statement band, a visual strip, or a divider-index section.

---

## 2. Hero composition (alignment, type scale, text/visual balance — NOT centered-generic)

- **Primary:** left-anchored editorial hero, not centered. Small breadcrumb/eyebrow line, then large two-part display (line-break controlled per breakpoint), then 2–3 line muted deck, then ONE primary action. Visual is offset/asymmetric (large portrait + pull-statement + position indicator), not a background banner. Text leads; image authenticates.
- **Studio homepage:** centered display over a full-bleed photographic field, but earns it: top edge dissolves into page background via gradient so text and image read as one layer; subtitle is de-emphasised (smaller, ~80% opacity); CTA is a pill containing tiny team avatars (humanises a centered hero without a second button). Proof strip starts immediately below — hero never stands alone.
- **Teardown page:** compact left-aligned page-hero: breadcrumb → mono eyebrow with rule → serif display → muted deck → 4-cell meta strip (client/scope/timeline/platform as labelled facts). Framed figure sits BELOW the text block with its own label + caption line, not beside it. This text-over-figure stack suits case/work detail pages.
- Common anti-pattern avoided everywhere: no centered headline + centered sub + two equal buttons + stock visual. Every hero commits to either (a) asymmetric split with labelled visual or (b) full-bleed field with dissolve + single action + immediate proof.

**Takeaway for AAZHI:** homepage hero = left-aligned display + short deck + single action + offset visual/proof element. Detail/work heroes = breadcrumb + eyebrow + display + deck + 4-cell fact strip + framed figure below with caption. Reserve centered composition only for final CTA / guarantee moments.

---

## 3. Featured project presentation (visual/info split, framing, labelling)

- **Dominant pattern (studio homepage list):** 7:5 split on desktop (`7fr / 5fr` grid), stacking to single column on mobile. Generous vertical rhythm between entries (large section padding + top border per entry). First entry has no top border; separation is typographic, not boxed.
- **Media framing:** fixed 16:9 frame, rounded-corner token, 1px subtle border, neutral placeholder fill so unloaded state still looks designed; image covers frame, top-anchored crop. Hover: border darkens + image scales ~1.04–1.05. Media is a link; entire frame is the affordance, not a separate "view" button.
- **Info column stack (top to bottom):** title (H3, tight) → one-line summary (muted, capped width) → 3-column meta strip with top/bottom rules (Scope / Industry / Status as term/definition pairs) → 3 outcome bullets with small check glyphs → pill actions (one solid primary + one outline secondary). Bullets describe outcomes/evidence, never feature lists.
- **Alternation:** even rows mirror direction on desktop (media right) to break monotony across a long list; reset to single direction on mobile.
- **Secondary pattern (teardown figure):** full-width framed figure with small mono label above frame ("build · surface · viewport") and a one-line caption below in muted text stating the argument the visual makes. Caption is interpretive, not descriptive.
- **Tertiary pattern (program story cards):** logo mark + single metric-led headline per card, carousel position shown as fraction; no excerpt paragraph on the card — click reveals the story.

**Takeaway for AAZHI:** standardise one work-row molecule (16:9 frame + title + summary + 3-cell meta + 3 outcome bullets + 2 pill actions) at 60/40 or 7:5; mirror alternate rows; add label-above + interpretive-caption-below for full-width showcase figures.

---

## 4. Capability listing patterns (how to avoid "4 identical cards")

Observed techniques (combine at least three):

1. **Checklist cards, not paragraph cards:** each capability = linked H3 + 4 short checklist items (noun phrases, parallel grammar). No card carries a paragraph. Differentiation comes from list content, not card chrome.
2. **Count asymmetry:** 5 capabilities (not 4), grouped in a 3-col grid so the second row has 2 — breaks the "2×2 identical" read. AAZHI can use 3 + 2 or 2 + 1 + dividers.
3. **Second proof lane:** capabilities paired with a separate "industries" dual marquee ticker and a "fit" checklist section, so breadth is shown as ticker + list, depth as cards. Never put all breadth inside the cards.
4. **Numbered mono kickers + value pills (teardown offer pattern):** 2-up grid where each card has a mono number, a small pill (standalone value or scope tag), an H3 capped to ~16ch, and a short muted paragraph. Hover adds lift + accent glow from one corner — same card shape, different information scent per card.
5. **Process as rows, not cards:** multi-step capability (process, guarantees, pricing logic) rendered as bordered rows (number + title + body + timing tag) with hover indent, not as another card grid. Reserves cards for offers, rows for sequences.
6. **Single-price panel instead of tier cards:** one highlighted price/offer card beside explanatory copy (1fr/1fr), rather than 3 tier cards. Forces one decision; supporting tiers (if needed) become compact rows below.

**Takeaway for AAZHI:** services = 5 checklist cards in 3-col (3+2) + industries ticker + fit list; process/guarantees = rows; engagement model = single featured panel + side copy. No section uses the same card geometry twice in a row.

---

## 5. Dark/contrast section usage

- **Studio homepage:** dark bookends with light middle. Black immersive hero (image + gradient dissolve) → light cream proof/work/services middle → dark testimonial band (deep neutral gradient + faint 64px grid overlay masked top/bottom so texture fades at edges) → light industries/fit → dark/image footer CTA. Contrast marks emotional beats: immersion → evidence → intimacy (voices) → conversion.
- **Teardown site:** no light/dark flip at all. Single continuous ink background with depth built from 4 surface steps (base → raised → card → overlay) + repositioned radial accent glows per section + 5% grain overlay for tactility. Loudest section (guarantees) is centred on a slightly lighter panel with top/bottom borders, not a colour flip.
- **Primary program page:** restrained transitions; relies on card fills, dividers, and one dark or tinted CTA band rather than alternating page backgrounds every section. Section separation via spacing scale (tight vs. roomy section padding tokens) more than colour.
- Shared rule: only ONE dark band per page carries texture (grid lines OR grain OR glow, never all three). Dividers are 1px at 10–12% opacity — visible but quiet.

**Takeaway for AAZHI:** pick ONE contrast strategy per page. Homepage: dark hero + light proof middle + one dark voices/conversion band. Detail pages: single-ink continuous depth via surface steps + relocated glow. Do not alternate background colour every section.

---

## 6. Team/founder storytelling compactness

- None of the three uses a "meet the team" grid as persuasion. Credibility is compressed:
  - **Studio homepage:** 6-cell fact band (combined client valuation, people reached, on-time rate, industries, founding year, senior headcount) + testimonial cards with headline-style pull line + full quote + photo/monogram + name/role/company. Avatar-in-CTA pill also signals small senior team without a section.
  - **Teardown site:** replaces team bios with transparency devices: hour-breakdown list (strategy/copy/build/QA hours), bill-of-materials list with realistic standalone prices, "deliberately excluded" list (no fake testimonials, no stock team photos, no chat widget, no pop-ups, no premature press strip). Total trust copy is compact (~150 words) plus lists.
  - **Primary:** founder proof via portrait + role caption + "1 of N" carousel position + single story link — one line per founder, no bios.
- Pattern: facts > faces. Numbers, scoped outcomes, and explicit constraints outperform paragraphs about culture.

**Takeaway for AAZHI:** no team grid on homepage. Use a 4–6 cell fact strip + 2–4 testimonial/voice cards + one honest constraint line (size, seniority, timeline). Reserve hour/material breakdowns for process/about detail.

---

## 7. Contact/footer depth

- **Footers are deep, not an afterthought.** All three use 4+ columns: brand statement (1.6fr) + grouped link columns (work / read / talk or studio / explore / legal) + bottom legal bar. Link labels are task-based ("what you get", "field notes", "book a call"), not org-chart labels.
- **Brand column formula:** wordmark + one positioning sentence (who + for whom + model in ≤25 words) + location line. No newsletter form in footer (newsletter has its own section); footer focuses on navigation + trust.
- **Bottom bar:** mono small type with copyright + entity + location + policy/terms links + build note ("hand-built, see how" pattern). Social row is icon-only; one studio adds "ask AI about us" deep links — optional but notable for AI-search readiness.
- **Signature moves:** one footer uses a giant outline wordmark (transparent fill, 1px stroke, fluid clamp up to ~15rem, centred) as a textural close; another uses a full-bleed captioned photograph above the legal line. Both give the page a designed ending instead of a hard stop.
- **Contact CTA sections (above footer):** centred, generous vertical padding (roughly 1.5× normal section), radial glow behind headline, headline + short paragraph + ONE action + small reassurance pill (availability/scarcity or response promise). Contact page itself (teardown reference) splits 1.5fr/1fr: booking/form card + side cards (expectations, alternatives, contact tag with pulse dot).

**Takeaway for AAZHI:** build footer as brand statement + 3 task-based columns + giant outline wordmark + mono legal bar; precede it with a centred glow CTA (headline + paragraph + single action + reassurance pill). Contact block uses asymmetric split, not a lone form.

---

## 8. Typography system observations (scale relationships, line-heights, measure)

- **Three-role stacks everywhere:** (a) display face for H1/H2/prices/stat numerals, (b) neutral grotesk/sans for body/UI, (c) mono for eyebrows, labels, pills, captions, meta, kickers. Mono is always small (roughly 0.66–0.8rem), uppercase, wide-tracked (0.12–0.22em), often in accent or muted tone with a short rule (2.5rem line) beside it.
- **Display settings:** weight ~420–500 (not black), tracking −0.015 to −0.03em, line-height 0.98–1.08 for heroes and 1.06–1.12 for section titles. Italic used sparingly inside display (one emphasized phrase) in accent colour — the only italic on the page.
- **Scale relationships (fluid clamp, not fixed steps):** hero display ~2.9rem → 8.6rem (homepage) or 2.6rem → 5.6rem (inner pages); section titles ~2rem → 3.9rem; card titles ~1.3–1.6rem; body ~1–1.06rem at 1.55–1.65 line-height; small/muted ~0.85–0.95rem. Ratio hero:section:card ≈ 2.2 : 1.3 : 1.
- **Measure discipline:** decks 46–62ch; article body 54–68ch; display titles capped 12–22ch with balanced wrapping; captions/footnotes muted. Nav/UI type ~0.9–0.95rem, never competing with content.
- **Colour-as-hierarchy:** at least two muted text tokens (soft + faint) plus accent for kickers/numbers; body copy is never full-contrast — contrast reserved for titles, prices, and actions. Cream-on-ink (not pure white) noted for long-form warmth and reduced glare.
- **Motion restraint:** hero entrance is a short rise (≤0.5s, ≤46px, staggered ~70ms) or masked line slide; cards lift −4 to −6px on hover with border-colour shift; marquee/ticker pauses on hover and disables under reduced-motion. No scroll-jacking observed.

**Takeaway for AAZHI:** lock 3 roles (display / body / mono-label), fluid clamp scale at ~2.2:1.3:1, tight display leading vs. loose body leading, capped measures, muted body tone with full contrast reserved for titles and actions.

---

## 9. Ten specific "apply to AAZHI" directives

1. **Homepage hero uses 7:5 asymmetric split, left-aligned.** Eyebrow (mono, with rule) → display at `clamp(2.8rem, 6vw, 5.5rem)`, leading ~1.0, max ~14ch → deck max 54ch → ONE pill CTA. Right 5/12 column carries a single framed proof visual with mono label + interpretive caption. No centered double-button hero.
2. **Work feature rows use 60/40 (7fr/5fr) visual/info split.** 16:9 framed media left, info stack right (title → one-line summary → 3-cell Scope/Industry/Status strip with rules → 3 outcome bullets → primary + ghost pills). Mirror alternate rows on desktop; stack on mobile. Separate rows with top borders, not boxes.
3. **Services avoid "4 identical cards": use 5 checklist cards in 3+2 grid.** Each card = linked H3 + four parallel checklist items, no paragraphs. Follow with an industries ticker (dual marquee, edge-masked) and a bordered fit-checklist — breadth lives outside the cards.
4. **Process and guarantees render as ROWS, not cards.** Row grid `90px 1fr 130px` (number / title+body / timing tag), hover indent, top/bottom dividers. Guarantees get the single loudest band: centred title + 3 bordered points on a slightly raised panel.
5. **One dark band per page, used for voices or conversion — not both.** Homepage: dark immersive hero + light proof middle + ONE dark testimonial band (subtle grid/grain texture, masked edges). Detail pages: continuous ink with 4 surface steps + relocated radial glow per section instead of flipping themes.
6. **Trust via 6-cell fact strip, not team bios.** Ship a single strip (clients / reach / on-time / industries / founded / senior count as value-over-label pairs) plus 2–4 voice cards (pull-line headline + quote + photo/monogram + name/role/company). Add one honest constraint line (team size, senior-only, timeline) near CTA.
7. **Section-title system: mono eyebrow + display `clamp(2rem, 4.5vw, 3.6rem)` at 1.06–1.1, max ~18ch balanced.** Split headers (`1.25fr/1fr`, title left, deck right, bottom-aligned) for index sections; centred headers only for guarantees/final CTA. Every section gets one H-level and one job.
8. **Type roles locked: display (tight, −0.02em, 1.0–1.08) / body (1rem–1.06rem, 1.6–1.65, muted tone, 54–62ch) / mono labels (0.7–0.78rem, 0.14–0.2em uppercase, accent or muted, with rule).** Reserve full contrast for titles, numerals, prices, actions. One italic accent phrase per display max.
9. **Footer depth = 1.6fr brand + 3 task columns + giant outline wordmark + mono legal bar.** Brand column: wordmark + ≤25-word positioning sentence + location. Columns task-labelled. Wordmark close at fluid clamp with 1px stroke. Precede footer with centred glow CTA (headline + short paragraph + single action + reassurance pill).
10. **Pace by alternation and proof-first ordering.** Sequence: hero → proof strip (work fragments) → trust line → facts → services → work list → voices → fit list → CTA. Never place two card grids adjacent; separate with statement band, visual strip, or divider-index. Add an explicit "deliberately excluded" or scope-clarity block on offer/process pages to handle objections without extra CTAs.

---

*Method: structure, spacing tokens, grid ratios, type roles, and section sequencing inferred from rendered markup and stylesheets; no reference-site wording, marks, imagery, or assets reproduced.*
