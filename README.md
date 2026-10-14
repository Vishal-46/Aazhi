# AAZHI — Technology with purpose.

AAZHI is an independent technology studio building practical digital solutions —
web products, workflow automation, data tools, and connected-system explorations.

Honesty rules applied throughout:

- No fabricated metrics, testimonials, client names, or case outcomes.
- Synthetic / placeholder project data is labelled as such.
- Empty social `href` values never render as links (no dead links).
- The contact form never claims a message was sent unless a configured endpoint
  accepted it.

## Stack + versions

| Package | Version |
| --- | --- |
| `react` / `react-dom` | 18.3.1 |
| `vite` | 5.4.8 |
| `typescript` | 5.6.3 |
| `lucide-react` | 0.454.0 |

Global CSS only (no Tailwind). Shared classes: `.container`, `.section`,
`.eyebrow`, `.h-section`, `.lede`, `.btn`, `.btn-primary`, `.card`,
`.contact-panel`, `.contact-email`, `.field`, `.input`, `.error`,
`.status-box` (+ `--error` / `--info`), `.contact-list`, `.foot`,
`.foot__inner`, `.foot__brand`, `.foot__nav`, `.foot__base`.

## Getting started

Do not commit secrets. The contact form endpoint is optional (see below).

```bash
npm install
npm run dev      # local dev server (default http://localhost:5173)
npm run build    # typecheck (tsc) + production build to dist/
npm run preview  # preview the production build locally
npm run typecheck
```

> Note: dependencies are not installed in this checkout by default. Run
> `npm install` once before the commands above.

## Structure map

```text
src/
  main.tsx            # app entry (imports styles/globals.css)
  App.tsx             # section composition (Navbar + main#content + Footer)
  styles/
    globals.css       # design system: layout, type, nav, hero, work,
                      # capabilities, exploration, about/team/contact, .foot, reveal
  data/
    content.ts        # single source of truth for site copy, links, lists
  components/
    Navbar.tsx        # sticky header + primary nav + mobile menu
    Hero.tsx + HeroVisual.tsx
    SelectedWork.tsx + ProjectCard.tsx   # synthetic example projects only
    Capabilities.tsx  # what AAZHI does
    Exploration.tsx   # section id="future": honest capability exploration
    About.tsx         # studio principles
    Team.tsx          # section id="team": founder placeholders (see TODO below)
    Contact.tsx       # section id="contact": direct email + enquiry form
    Footer.tsx        # wordmark, links, privacy + synthetic-data notices
    SectionHeading.tsx  # default export; props { index, eyebrow, title, lede? }
    Reveal.tsx          # default export; props { className?, children, delay?, variant? }
    MobileMenu.tsx
public/
  favicon.svg         # site favicon, linked from index.html
  robots.txt
  sitemap.xml
index.html            # title + meta description + Open Graph tags
```

## Design system summary

- **Palette tokens (only):** `#F7F5F0` (paper), `#202522` (ink),
  `#163A52` (deep ocean), `#78958A` (sage), `#E88970` (clay),
  `#FFFFFF` (white). No other colours.
- **Type:** Fraunces (display) + Inter (body), loaded in `index.html`.
- **Container:** `1200px` max (`--max`), centred with fluid gutters.
- **Section rhythms:** generous vertical padding
  (`clamp(4.5rem, 9vw, 8rem)`), section-head with sticky index rail on
  desktop, consistent card radius and soft shadows.
- **Motion:** scroll-reveal with `prefers-reduced-motion` respect; magnetic /
  hover lifts kept subtle.

## Content editing (`src/data/content.ts`)

All editable copy lives in `src/data/content.ts`. Edit that file rather than
hunting through components.

| Export | Shape | Used by |
| --- | --- | --- |
| `site` | `{ name, tagline, descriptor, email, location }` | Hero, Contact, Footer, SEO |
| `navLinks` | `{ label, href }[]` (anchor hrefs such as `#work`) | Navbar, Footer |
| `projects` | `Project[]` (`slug, title, category, description, modules, note, synthetic, href?`) | SelectedWork / ProjectCard — synthetic examples only |
| `capabilities` | `Capability[]` (`index, title, body, points, stage`) | Capabilities |
| `explorations` | `Exploration[]` (`icon: 'waves' \| 'cpu' \| 'sparkles' \| 'database', title, body`) | Exploration (`id="future"`) |
| `principles` | `{ title, body }[]` | About |
| `team` | `Member[]` (`name, role, bio, skills, photo?, photoAlt?, linkedin?, github?, placeholder`) | Team (`id="team"`) |
| `projectTypes` | `string[]` | Contact project-type `<select>` |
| `socials` | `{ label, href, icon }[]` where `icon` is a string key (`'github'`, `'linkedin'`) mapped to `lucide-react` icons in Contact/Footer | Contact, Footer |
| `seo` | `{ title, description }` | index.html copy reference |

Rules:

- Leave a social `href` as `""` when the profile is not ready. Contact and Footer
  filter out empty / `"#"` hrefs and render **no anchor**. Contact shows
  “Profiles coming soon” when none are configured.
- Never add real client names, patient data, revenue figures, or unverified
  statistics to `content.ts`. Work examples must stay synthetic and labelled.
- Email and location changes only need one edit in `site`.

## Contact config

`src/components/Contact.tsx`:

- Controlled state for `name`, `email`, `organisation` (optional), `type`
  (select from `projectTypes`), `message`.
- Client validation: `name` required (min 2 chars), `email` required + regex
  `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, `message` required (min 10 chars).
- Inline accessible errors via `aria-invalid` / `aria-describedby`, plus a
  `role="alert"` summary on failed submit.
- Loading state: `Loader2` spinner, submit button disabled + `aria-busy`.
- Privacy note under the message field:
  “Please don't include patient or sensitive personal information.”

Submission behaviour (honest by design):

1. If `VITE_FORMSPREE_ENDPOINT` is set, the form `POST`s JSON to that URL and
   reports success/failure truthfully.
2. If it is **not** set, the form composes a `mailto:` link (subject + body from
   the fields), opens the visitor's email app via `window.location.href`, and
   shows the info message:

   > “Email app opened — your message was NOT sent automatically; press send.
   > Prefer direct email: X”

   This is intentionally **not** a success state.

Configure the endpoint with a `.env` file (never commit it):

```bash
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

Restart the dev server after changing `.env`.

## Deployment

The app builds to static files — no server required.

```bash
npm run build   # outputs dist/
```

- **Netlify:** build command `npm run build`, publish directory `dist`.
- **Vercel:** framework preset “Vite”, build command `npm run build`,
  output directory `dist`.
- **GitHub Pages:** build, then publish `dist/` (e.g. `gh-pages -d dist`).
  If serving from a sub-path, set Vite `base` in `vite.config.ts` accordingly.

Any static host that serves `index.html` with its assets works.

## SEO / favicon / robots / sitemap notes

- `index.html` sets `<title>` (`AAZHI — Technology with purpose`), a meta
  description, and Open Graph / Twitter card tags. The OG tags currently point
  at the placeholder domain `https://aazhi.example.com/` — update them when the
  real domain is live.
- `og:image` references `https://aazhi.example.com/og-cover.png`, but no
  `og-cover.png` asset exists in `public/` yet (TODO — see below). Do not treat
  social previews as working until that file is added.
- `public/favicon.svg` is the favicon and is linked from `index.html`. Replace
  it with the final brand mark when available; keep the filename or update the
  `<link rel="icon">` reference to match.
- `public/robots.txt` and `public/sitemap.xml` exist. Keep `sitemap.xml` in
  sync if routes or the domain change.
- Semantic landmarks are used (`header` / `main#content` / `section` with
  `aria-labelledby` / `footer`, plus a skip link). One `h1` lives in the hero;
  sections use `h2`.

## Founder information required (TODO)

The Team section currently uses placeholders. The following real content is
still needed from the founders — nothing here should be invented:

- [ ] Founder names (exact spelling + preferred display order)
- [ ] Roles / titles (e.g. “Co-founder, Engineering”)
- [ ] Short bios (2–4 sentences each, no unverified claims)
- [ ] Photos (optional; omit the image rather than using a stock face)
- [ ] LinkedIn and GitHub profile URLs per founder
- [ ] Business email + domain (currently a placeholder in `site.email`;
      update `src/data/content.ts` once the domain is live)
- [ ] Studio social URLs (GitHub / LinkedIn / X / other) for `socials[]`;
      leave `href` empty until confirmed so no dead links render

## External services

| Service | Status | Notes |
| --- | --- | --- |
| Formspree endpoint (`VITE_FORMSPREE_ENDPOINT`) | Optional / unconfigured | Without it, the form uses the honest `mailto:` fallback. Add the ID when ready. |
| Custom domain + business email | TODO | Update DNS/hosting records, then `site.email` and footer links. |
| Analytics | None (intentional) | Footer states: “collects nothing by default.” Do not add trackers without updating that notice + this README. |

## Implemented vs TODO

Implemented:

- Global style system (`.container` / `.section` / `.card` / `.btn` …) + reveal
  animation with `prefers-reduced-motion` respect
- Navbar, Hero, SelectedWork (synthetic-only) + ProjectCard, Capabilities,
  Exploration (`id="future"`), About, Team (`id="team"`, placeholder), Contact
  (`id="contact"`, validated + honest submit), Footer (dynamic year, privacy +
  synthetic-data notices, back-to-top `#top`)
- Central content module (`src/data/content.ts`)
- SEO basics (`title`, meta description, OG tags on placeholder domain, favicon,
  `robots.txt`, `sitemap.xml`, semantics)
- No dead social links; no fake “sent” states; no fabricated metrics

TODO:

- Real founder names, roles, bios, photos, LinkedIn/GitHub URLs
- Real business email + domain in `site.email`
- Real social profile URLs in `socials[]`
- Formspree endpoint (`VITE_FORMSPREE_ENDPOINT`) if automated delivery is wanted
- Final favicon / brand mark and the missing `public/og-cover.png` asset
- Real domain: update OG URLs, `sitemap.xml`, and `site.email`

## Verification checklist

- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds and `dist/` serves via `npm run preview`
- [ ] Layout checked at viewports 1440 / 1280 / 768 / 390 / 360 (no overflow,
      no overlap, readable type at each width)
- [ ] Two refinement passes completed and recorded here with dates:
      _pass 1 pending — date + notes; pass 2 pending — date + notes_
- [ ] Keyboard-only walkthrough of nav, form, and footer (visible focus, logical order)
- [ ] Screen-reader check of form errors (`aria-invalid`, `aria-describedby`, `role=alert` summary)
- [ ] Form tried with endpoint unset (mailto info path) and set (success + failure paths)
- [ ] No empty-`href` anchors in rendered HTML; “Profiles coming soon” appears when socials unconfigured
- [ ] Lighthouse / axe pass recorded here with date + scores:
      _pending — paste results after running_

## License note

Private studio site. All rights reserved unless the founders add an explicit
licence. Do not reuse founder names, photos, or contact details without permission.
