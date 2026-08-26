---
name: MCM Digital — CRM Signal
description: A B2B data-infrastructure page for paid-media agencies, rendered as signal resolving from noise.
colors:
  void-black: "hsl(240 6% 6%)"
  warm-white: "hsl(32 14% 95%)"
  card-black: "hsl(240 6% 9%)"
  signal-cobalt: "hsl(231 97% 61%)"
  signal-violet: "hsl(258 90% 66%)"
  muted-warm-gray: "hsl(30 8% 62%)"
  confirmed-green: "hsl(152 68% 45%)"
  alert-red: "hsl(6 78% 58%)"
  hairline-border: "hsl(240 6% 18%)"
  selection-white: "hsl(32 14% 98%)"
  scrollbar-hover: "hsl(240 6% 26%)"
typography:
  display:
    fontFamily: "Clash Display, General Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.03
    letterSpacing: "-0.03em"
  body:
    fontFamily: "General Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    letterSpacing: "0.04em"
rounded:
  sm: "0.375rem"
  md: "0.625rem"
  lg: "1rem"
  full: "999px"
spacing:
  sm: "0.75rem"
  md: "1.5rem"
  lg: "3rem"
  xl: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.signal-cobalt}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  card:
    backgroundColor: "{colors.card-black}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.lg}"
    padding: "32px"
---

# Design System: MCM Digital — CRM Signal

## Overview

**Creative North Star: "Signal Waveform"**

The product's own name — CRM *Signal* — is the literal visual system. The page opens as raw, jagged noise (an unstructured lead, a form-fill with no context) that resolves, over the course of the hero, into one clean sine pulse (a real pipeline event Meta's algorithm can trust). That resolution — noise becoming signal — is the single idea every surface exists to prove, not just illustrate once in a hero graphic.

The world is void-black, technical, and unhurried: a cobalt-to-violet glow stands in for "signal" everywhere it appears (buttons, active states, connecting lines, radial ambience), against a near-black ground and warm-white type. It borrows the visual register of the tools this audience already trusts daily — status/uptime dashboards, automation-canvas connector lines, monospaced data readouts — without literally cloning any one of them. Confirmed visual rejections: no eyebrow/kicker labels above headings anywhere in the system; no gradient-filled text (the previous red/pink brand system used gradient text and hero-metric stat strips — both are retired); no glassy decorative blur; no sparklines or progress rings standing in for real data.

A polish pass pushed the world further on two axes without changing it: composition became more cinematic (bigger waveform, ambient radial glows anchored per section, generous section rhythm, scroll parallax on the hero) and copy became strictly outcome-facing — every internal tool or protocol name (the automation engine that routes events, raw API acronyms) is gone from visitor-facing copy; PRODUCT.md still records the real mechanism for internal use, but the surface only ever states what the visitor gets, never how it is built. The pipeline used to be shown as a literal 3-stage technical diagram naming the internal tooling; it is now a **Noise vs. Signal** comparison — two mini waveforms, one chaotic and dim, one clean and glowing — which is both more honest about what stays private and a tighter fit for the world's own name.

**Key Characteristics:**
- Void-black ground with warm-white type — never pure `#000` or pure `#fff`.
- One signal gradient (cobalt → violet) carries every "this is real, this is confirmed" moment.
- Confirmed-green is reserved exclusively for live/operational status — it never doubles as a generic accent.
- Monospace (JetBrains Mono) is reserved for data, state, and measurement — stage labels, status chips, timestamps — never for display headlines or body copy.
- Motion is diagnostic and cinematic, not decorative: a path draws itself once, a pulse travels a line, the hero waveform parallaxes against scroll, a primary CTA carries a slow breathing glow. No hover-jiggle library.
- Copy states outcomes, never internal implementation — no third-party automation tool names, no raw API/protocol acronyms, no architecture exposition.

## Colors

Four roles, deliberately narrow — the palette discipline is itself a brand signal (a data-infrastructure vendor doesn't decorate).

### Primary
- **Signal Cobalt** (`hsl(231 97% 61%)`): the leading edge of the signal gradient. Primary buttons, active nav state, focus rings, the resolved (right) end of diagrams.

### Secondary
- **Signal Violet** (`hsl(258 90% 66%)`): the trailing edge of the signal gradient and the radial ambient glow behind hero/CTA sections. Always paired with Signal Cobalt via `--gradient-signal`; never used as a flat solid on its own for large fills.

### Tertiary
- **Confirmed Green** (`hsl(152 68% 45%)`): reserved for live/operational status only — status-page rows, "CONFIRMADO" state chips, the pulsing live-status dot. Never used as a general-purpose accent or success color for unrelated UI.

### Neutral
- **Void Black** (`hsl(240 6% 6%)`): page background.
- **Card Black** (`hsl(240 6% 9%)`): card and panel surfaces, one step up from the ground.
- **Warm White** (`hsl(32 14% 95%)`): primary text.
- **Muted Warm Gray** (`hsl(30 8% 62%)`): secondary text, subheads, captions.
- **Hairline Border** (`hsl(240 6% 18%)`): all borders and dividers — always 1px, never a colored or heavy rule.
- **Selection White** (`hsl(32 14% 98%)`): text-selection foreground only (`::selection`).
- **Scrollbar Hover** (`hsl(240 6% 26%)`): the custom scrollbar thumb's hover state only.

### Named Rules
**The One Signal Rule.** The cobalt-to-violet gradient is the only gradient in the system. It never appears as decorative gradient text — it fills solid shapes (buttons, glows, connector lines) only.

**The Green Means Live Rule.** Confirmed Green appears only where something is verifiably operational right now (a status row, a confirmed pipeline stage). It is never reused as a generic "positive" or "success" color elsewhere.

**The No Internals Rule.** Visitor-facing copy states what the product does for the visitor, never how it is built. Internal tool names, protocol acronyms, and architecture diagrams stay in PRODUCT.md and out of the rendered page.

## Typography

**Display Font:** Clash Display (with General Sans, ui-sans-serif fallback)
**Body Font:** General Sans (with ui-sans-serif, system-ui fallback)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SFMono-Regular fallback)

**Character:** Clash Display is geometric and confident at large sizes — it carries the headlines' "we know exactly what this is" register. General Sans is a clean, warm-neutral grotesk for body copy, chosen to pair without competing. JetBrains Mono appears only where something is literally data: it is the typographic signal that "this is a real reading, not marketing copy."

### Hierarchy
- **Display** (700, `clamp(2.25rem, 5vw, 4.25rem)`, 1.02–1.05 line-height, -0.02em to -0.03em tracking): hero and segment-page H1s. Pushed deliberately large and bold — the display/body size contrast is one of the system's key legibility-of-intent cues.
- **Headline** (700, 2.25rem–3rem / `text-4xl`–`text-5xl`, 1.05 line-height, tight tracking): section H2s (`font-display` class). Bumped from 600 to 700 weight and from `text-3xl/4xl` in the polish pass for more contrast against body copy.
- **Body** (400, 1rem–1.25rem, 1.6–1.7 line-height, max ~65ch): paragraph copy. Problem-list and start-step items run at `text-xl` for extra weight against their generous spacing.
- **Label/Data** (500, 0.6875rem–0.75rem, 0.04em tracking, uppercase for state chips): status states (OPERATIVO), status-page row labels.

### Named Rules
**The Mono-Is-Data Rule.** JetBrains Mono is used exclusively for values that are literally measured or stated as data (a state, a status row name). It never appears as a stylistic flourish on a headline or button.

## Layout

Standard container: `mx-auto` with `px-4` horizontal padding, max width 1400px (`2xl` breakpoint at 1400px). Section rhythm is generous — `py-28`/`py-40` between major sections (bumped up from `py-20`/`py-28` in the polish pass for more breathing room), always separated by a single 1px `border-t border-border` hairline rather than a background-color change. Content blocks are capped at readable widths (`max-w-xl`/`max-w-2xl`/`max-w-3xl`) rather than spanning the full container, even on wide viewports. The two-path home fork and the proof panel break out to a wider `max-w-3xl`+ measure since they're compositional, not prose. Section rhythm alternates loud and quiet: sections that carry a large radial ambient glow (hero, mechanism, proof, final CTA) sit next to plain, glow-free sections (problem list, start steps, FAQ) so the page paces like a studio piece rather than a uniform stack of identical blocks. Mobile collapses to a single column throughout; the nav becomes a hamburger-triggered panel below the `md` breakpoint (768px).

## Elevation & Depth

Primarily flat — the system does not use drop shadows for hierarchy. Depth comes from four things: (1) a one-step lightness jump from `void-black` to `card-black` for panels, (2) a single hairline border (`hairline-border`, 1px) around cards, (3) the signal glow (`--glow-signal` / `--glow-signal-tight`, plus larger inline blurred pseudo-layers on primary CTAs), a soft colored glow reserved for elements actively carrying the signal gradient, and (4) large, softly blurred radial ambient fields (`var(--gradient-signal-radial)` at 6–10% opacity, blurred 20–100px) anchored per section to separate sections from one another and add atmosphere without changing the flat, shadow-free surface language. Glow is a state signal, not decoration — it marks "this is the thing that's live/actionable," never applied for generic lift.

### Named Rules
**The Glow-Means-Active Rule.** A colored glow shadow (`--glow-signal`) only appears on an element that is the gradient's own fill (a CTA button, a live status dot) — never as a generic card hover effect.

**The Breathing CTA Rule.** Every primary WhatsApp CTA (segment hero, final CTA) carries a slow (2.6–2.8s), low-amplitude opacity/scale pulse on a blurred glow layer behind it — the one place in the system where motion runs continuously and unprompted, reserved for the single action every page most wants taken.

## Shapes

Corners are moderate and consistent: `0.625rem` (`--radius`) as the base, `lg`/`md`/`sm` derived downward. Pills (`rounded-full`) are reserved for status chips, the nav's WhatsApp CTA capsule shape is not used — buttons stay rectangular-rounded, not fully pill-shaped, to keep the register technical rather than consumer-app. Circles are reserved for two specific things: the pipeline-diagram node numbers and the live-status pulse dot — both literal signal/status indicators, not general decoration.

## Components

### Buttons
- **Shape:** `rounded-xl` (0.75rem-ish via `--radius` scale), never a pill.
- **Primary:** filled with `--gradient-signal` (cobalt → violet), bold white text, plus a blurred breathing-glow pseudo-layer (see Elevation & Depth). Used for every WhatsApp/contact CTA; sized up (`px-9 py-5`/`px-10 py-5`, `font-bold`) on segment heroes and the final CTA specifically so the primary action is never ambiguous.
- **Secondary/Ghost:** transparent with `border border-border`, text-foreground; hover shifts border to `primary/40`. Reserved for future secondary actions.

### Chips (state/status)
- **Style:** `rounded-full` pill, `font-mono`, uppercase, small (`text-[10px]`–`text-[11px]`), tracked (`tracking-wide`/`wider`).
- **State:** neutral chips use `bg-muted text-muted-foreground`; the confirmed/operational state uses `bg-confirmed/15 text-confirmed`.

### Cards / Containers
- **Corner Style:** `rounded-2xl` for feature-level cards (fork panels, status panel), `rounded-xl` for smaller elements (pipeline nodes).
- **Background:** `card` (`hsl(240 6% 9%)`).
- **Shadow Strategy:** none at rest; see Elevation & Depth for the glow exception.
- **Border:** 1px `border-border`, brightens to `primary/40` on hover for interactive cards (fork panels).
- **Internal Padding:** generous — `p-8` to `p-10` for feature cards.

### Navigation
Sticky top bar, `backdrop-blur-md` over `background/85`. Logo mark (existing circular MCM Digital icon) + wordmark on the left, two text links (CRM Signal / Partners) center, language toggle + primary WhatsApp CTA right. Active route gets a `bg-secondary` pill behind its label — no underline, no color change alone. Below `md`, links and language toggle collapse into a slide-down panel behind a hamburger button.

### Signal Waveform (signature primitive)
An SVG line built from deterministic pseudo-noise resolving into a clean sine, in three variants: `full` (noise resolving into signal, the hero's cinematic centerpiece, large and ambient-glow-backed), `noise` (dim, chaotic, used alone), and `clean` (bright cobalt-violet gradient, used alone). A small glowing dot travels the resolved portion on a slow loop. This is the one visual idea the whole system exists to prove — never a decorative squiggle, always literally "what Meta sees."

### Noise vs. Signal (signature component)
Two `SignalWaveform` panels side by side (`noise` vs. `clean`), each with a bold one-line label and a short outcome sentence — no internal mechanism named. The `clean` panel carries its own radial ambient glow. This replaced an earlier literal 3-stage technical pipeline diagram; it states the same claim as an outcome comparison instead of an architecture exposition, and reads as a purer expression of the world's own name.

### Proof Panel (signature component)
The container that makes proof feel like one continuous, integrated surface rather than a screenshot dropped on the page: a single `rounded-2xl` card with a top ambient glow, holding Noise vs. Signal on top and the Status Mockup below it, separated only by a hairline `border-t` — never two separate floating widgets. Always followed by a caption stating the status panel is an illustrative recreation, not a live screenshot.

### Status Mockup
A recreated, honestly-labeled status-panel section (no separate card chrome of its own — it lives inside Proof Panel) — a header row with a live pulse dot and "all systems operational," then a short list of outcome-named rows (e.g. "Sincronización / CRM conectado," "Verificación / Señal procesada y enriquecida," "Entrega / Confirmado en Meta") each with a small green dot and a mono "OPERATIVO" state. Row names describe outcomes, never internal tool or protocol names.

## Do's and Don'ts

### Do:
- **Do** keep the signal gradient (`--gradient-signal`) as the only gradient in the system, and only as a solid fill (never as `background-clip: text`).
- **Do** reserve Confirmed Green exclusively for genuinely live/operational status.
- **Do** reserve JetBrains Mono for literal data/state values, never for display or body voice.
- **Do** label every recreated proof asset (Status Mockup) honestly — synthetic/illustrative content is fine, unlabeled synthetic content is not, per PRODUCT.md's no-fabricated-evidence constraint.
- **Do** keep section rhythm to hairline dividers (`border-t border-border`) between major sections rather than background-color blocking, and keep the loud/quiet alternation between glow sections and plain sections.
- **Do** write every visitor-facing sentence as an outcome ("your algorithm learns from real sales") rather than a mechanism explanation ("we route events through X and call Y's API").
- **Do** keep proof content (Noise vs. Signal, Status Mockup) inside one continuous Proof Panel — never as separate floating cards that read like unrelated widgets.

### Don't:
- **Don't** add a kicker/eyebrow label above any heading — this was banned outright during the build and holds for all future work.
- **Don't** reintroduce the retired red/pink gradient brand system (`#f81f01 → #ee076e`) or the hero-metric stat-strip template it shipped with; both are explicitly retired anti-references, not dormant options.
- **Don't** use sparklines, progress rings, or soft-shadowed rounded rectangles to stand in for real data — the Status Mockup's plain state rows are the system's answer to "show live data."
- **Don't** invent commercial claims, client counts, or testimonials anywhere in this system — PRODUCT.md records that no external agency partners exist yet; any future proof content must stay within that constraint until it changes.
- **Don't** name internal automation tools, raw API/protocol acronyms, or draw an architecture/pipeline diagram of the internal stack anywhere in visitor-facing copy or components — this was explicitly removed in the polish pass (see The No Internals Rule) and is a rejected direction, not an oversight to reintroduce.
