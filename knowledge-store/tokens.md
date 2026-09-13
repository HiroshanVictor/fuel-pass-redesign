# 03-design-system / tokens.md

**Project:** Fuel Pass redesign — proposal prototype for the CPC director board
**Sources:** `research.md` §5-3, §5-6; `sitemap.md`; `screen-content.md`; `microcopy.md`; `decisions.md` D14–D18 — sole sources.
**Base:** Tailwind CSS, configured via `theme.extend` with the tokens below — not a custom CSS system. Heroicons is the icon library (D17). No component is built from scratch; `component-spec.md` composes standard HTML elements against these tokens.

---

## 1. Two contrast tiers, not one

Every color and size token below comes in up to two tiers, because the two personas use this system in physically different conditions:

| Tier | Applies to | Why |
|---|---|---|
| **Standard** | S1–S8, P1's citizen journey | Typical mobile use — indoors, outdoors, varied light, but not the specific stress case below. |
| **Outdoor** | S9–S10, P2's station journey | `R §5-6` names station conditions — queue pressure, speed, offline tolerance — as a stated constraint, and P2 reads this screen at a pump, in direct sunlight, quickly. WCAG AA (4.5:1 text, 3:1 large text/UI) is the floor per the brief, not the target. Outdoor tokens are built to clear it with margin, not to graze it. |

Where a token has one value only, it's because the outdoor case doesn't diverge from standard, and a second number would be a distinction without a difference.

---

## 2. Color tokens

All values are Tailwind's own default palette, referenced by their standard names so `theme.extend` only has to alias them — not invent new hex values.

### 2.1 Text and background — computed contrast

Ratios below are computed against the WCAG relative-luminance formula, not estimated. This is the evidence `accessibility.md` cites; nothing here is asserted without the number behind it.

| Token | Tailwind color | Hex | On white (#FFFFFF) | Tier | Usage |
|---|---|---|---|---|---|
| `color-text-primary` | `slate-900` | `#0F172A` | **17.9 : 1** | Standard | Body text, labels, headings, S1–S8 |
| `color-text-primary-outdoor` | `black` | `#000000` | **21 : 1** | Outdoor | Vehicle number, headline text on S9/S10 — maximum available contrast, no reason to use less when glare is a named constraint |
| `color-text-secondary` | `slate-700` | `#334155` | **10.4 : 1** | Standard | Supporting copy, help text (S3, S8 body) |
| `color-text-disabled` | `slate-500` | `#64748B` | 4.76 : 1 | Standard | **Disabled-state text only.** WCAG exempts disabled controls from contrast requirements; this token is never used for active, readable content — see §2.4. |
| `color-success` | `green-800` | `#166534` | **7.1 : 1** | Both | "Valid" state (S9), Fuel Pass issued confirmation (S5) — clears AAA, not just the AA floor |
| `color-error` | `red-800` | `#991B1B` | **8.3 : 1** | Both | Rejection state (S9), inline validation error (S2), dispute framing (S7) |
| `color-primary` | `blue-700` | `#1D4ED8` | **6.7 : 1** | Standard | Primary buttons, links; also the focus-ring color on **both** tiers — 6.7:1 clears the 3:1 non-text minimum with margin regardless of tier, so the ring doesn't need the darker outdoor step below |
| `color-primary-outdoor` | `blue-800` | `#1E40AF` | **8.72 : 1** | Outdoor | Primary buttons and links on S9/S10. Checked during the accessibility pass: `color-primary` alone is solid AA (6.7:1) but falls short of AAA (7:1), and the brief holds AA as the outdoor floor, not the target — everything else outdoor-tier clears AAA, so this token was added rather than left as the one exception. Hover steps to `blue-900` (10.36:1), active to `blue-950` (14.69:1) |
| `color-surface-inverse` | `slate-800` | `#1E293B` | **14.6 : 1** (white text on it) | Both | Offline banner background (S9/S10) — dark enough that white text is unambiguous even against a washed-out screen |
| `color-surface` | `white` | `#FFFFFF` | — | Both | Default background |
| `color-surface-muted` | `slate-50` | `#F8FAFC` | — | Standard | Card/section backgrounds, S1–S8 |
| `color-border` | `slate-200` | `#E2E8F0` | **1.2 : 1 against white** | Standard | **Decorative dividers only** — FAQ list separators, non-interactive hairlines. Computed and found not to clear 3 : 1; kept only where WCAG 1.4.11 doesn't apply because nothing about a component's boundary depends on it. See §2.2a. |
| `color-border-strong` | `slate-500` | `#64748B` | **4.76 : 1 against white** | Standard | **Form-control boundaries at rest** — Text Input, File Upload default border. Added when `color-border` was checked and failed the non-text contrast minimum for an actual component edge; this is the corrected token. |
| `color-border-outdoor` | `slate-900` | `#0F172A` | **17.9 : 1 against white** | Outdoor | S9/S10 use near-black borders, not light gray — a `slate-200` or even `slate-500` border can wash out under direct sun; outdoor UI takes the highest-contrast option available, not just a compliant one |

### 2.2 Why `color-text-disabled` exists but is restricted

`slate-500` on white computes to 4.76 : 1 — technically just over the AA floor, and exactly the case the brief says not to treat as good enough. It is kept as a token only because WCAG 1.4.3 explicitly exempts disabled-state text from contrast requirements, and disabled controls are one of the seven required states in `component-spec.md`. It must never be reached for through active copy, a label, or anything a user is expected to read and act on — those all use `color-text-primary` or `color-text-secondary`, both comfortably clear of the floor.

### 2.2a Why `color-border` survives despite failing 3 : 1

Kept as a distinct token rather than deleted, because WCAG 1.4.11's non-text contrast requirement applies to boundaries that identify a UI component's state or extent — not to every visible line. A hairline between two FAQ answers, or a divider that plays no role in telling a user where one control ends and another begins, is decorative and exempt. The moment a border *is* doing that identifying work — an input field, a drop target — it uses `color-border-strong` or, outdoors, `color-border-outdoor`. `component-spec.md` cites which one each component uses and why, so this distinction is enforced per component, not left to whoever's styling that day.

### 2.3 Color is never the only signal

`color-success` and `color-error` are always paired with a Heroicons glyph and a text label (see §6) — never a color change alone. This is a direct consequence of the outdoor tier: glare degrades color discrimination before it degrades shape discrimination, and it also means a colorblind operator is never dependent on the hue.

### 2.4 Focus ring

`color-primary` (`blue-700`) doubles as the focus-ring color, at 6.7 : 1 against white — clear of the 3 : 1 non-text-contrast minimum with margin. Ring: 2px offset, 3px solid. Never removed via `outline-none` without a replacement that meets the same ratio — see `accessibility.md` §3.

---

## 3. Typography tokens

### 3.1 Font stack — trilingual per D18

```
font-sans:
  "Noto Sans Sinhala",
  "Noto Sans Tamil",
  "Noto Sans",
  ui-sans-serif,
  system-ui,
  sans-serif
```

All three Noto weights are drawn from the same type family, designed for consistent metrics across scripts — the reason a Sinhala or Tamil string dropped into this stack renders at a matching visual weight to the Latin fallback, rather than falling back to whatever sans-serif the OS happens to substitute. The demo never exercises the Sinhala or Tamil entries, per D18 — they are declared so the stack does not have to be revisited when real copy does.

**No letter-spacing utility is applied to any text-content container.** Tracking adjustments are a Latin-only typographic habit; applied to Sinhala or Tamil, they can visibly disrupt conjunct and vowel-sign formation. `letter-spacing: normal` throughout.

### 3.2 Type scale

Sized in `rem` off a 16px root — the smallest size in this scale is already Tailwind's default `base`, not its `sm` or `xs`, because nothing in this product should render body text below 16px given the outdoor and multi-script requirements stacked on top of each other.

| Token | Size | Tier | Usage |
|---|---|---|---|
| `text-caption` | 0.875rem / 14px | Standard | Restricted — timestamps, non-critical fine print only. Never on interactive labels or anything load-bearing. |
| `text-body` | 1.125rem / 18px | Standard | Default body copy, form labels, button labels (S1–S8) |
| `text-emphasis` | 1.25rem / 20px | Standard | Screen headlines on S1–S8 |
| `text-outdoor-body` | 1.25rem / 20px | Outdoor | Default text size on S9/S10 — one step up from standard body, because it's read at arm's length while moving |
| `text-outdoor-status` | 2.5rem / 40px | Outdoor | The Valid / Not valid glyph-plus-label on S9 — sized to be read in a fraction of a second, per `R §2.4`'s speed constraint |

### 3.3 Line height — sized for script, not just for Latin

| Token | Value | Usage |
|---|---|---|
| `leading-tight` | 1.3 | Headlines only |
| `leading-normal` | 1.6 | Default body text |
| `leading-relaxed` | 1.75 | Dense paragraph content (S3, S7, S8) |

1.6 rather than Tailwind's default 1.5 for body copy: Sinhala and Tamil vowel signs and conjunct clusters extend further above and below the baseline than Latin's ascenders and descenders, and 1.5 is tuned for Latin. The English demo copy will look slightly more open than a Latin-only product would — that's the visible cost of not having to redo this token when Sinhala or Tamil copy arrives, paid once, now.

### 3.4 Container width and text expansion

`text-expansion-factor: 1.5` — not a CSS property, a design rule: any container sized for an English string must hold at least 1.5× that string's character count without truncating, because Sinhala and Tamil translations of the same meaning typically run longer than English.

Consequences, stated as rules `component-spec.md` is written against:

- **No `truncate` or fixed single-line height on any translatable string.** Buttons, labels and headlines wrap; none are clipped with an ellipsis.
- **Buttons are sized by content and padding (`px-6 py-4`), never by a fixed pixel width.** A button sized to fit "Continue" would clip a longer Sinhala or Tamil equivalent.
- **Headline containers set a `max-width` for readability, never a fixed height.** Wrapping to a second or third line is the expected behaviour, not a failure state.

---

## 4. Spacing and touch-target tokens

| Token | Value | Tier | Rationale |
|---|---|---|---|
| `touch-target-min` | 3rem / 48px | Standard | Larger than Tailwind's un-styled button default (~2.25–2.5rem with typical padding) and clear of WCAG 2.5.8's 24px AA minimum with margin — per the brief's "larger than default." |
| `touch-target-min-outdoor` | 4rem / 64px | Outdoor | P2 operates under queue pressure, possibly with dirty or gloved hands — a physical-use condition, not a WCAG citation. Set above even WCAG 2.5.5's 44px *enhanced* benchmark deliberately. |
| `touch-target-gap` | 0.5rem / 8px | Standard | Minimum space between adjacent interactive elements, to prevent mis-taps. |
| `touch-target-gap-outdoor` | 0.75rem / 12px | Outdoor | Wider gap where a gloved or hurried tap is more likely to land off-target. |

---

## 5. Radius and elevation

| Token | Value | Usage |
|---|---|---|
| `radius-sm` | 0.25rem / 4px | Form fields |
| `radius-md` | 0.5rem / 8px | Buttons, cards |
| `radius-lg` | 0.75rem / 12px | Banners, alerts |
| `radius-full` | 9999px | Status pills/badges |
| `shadow-card` | Tailwind `shadow-sm` | S1–S8 cards only — never the sole indicator of interactivity, always paired with a visible border |

**No shadow tokens on S9/S10.** Shadows are a low-contrast affordance — subtle by design — and subtlety is exactly what direct sunlight erases. Outdoor components signal state with solid fill, a near-black border (`color-border-outdoor`), and the icon-plus-label pairing in §6, never with elevation.

---

## 6. Icon inventory — Heroicons

Two sizes cover every screen except S9's status glyph, which gets its own per §3.2's `text-outdoor-status` scale.

| Icon token | Heroicons name | Variant | Size | Used on | Meaning |
|---|---|---|---|---|---|
| `icon-help` | `QuestionMarkCircleIcon` | outline | 20px | S1, S2, S6, S7, S8 | Help / FAQ affordance |
| `icon-search` | `MagnifyingGlassIcon` | outline | 20px | S2 | "Find my vehicle" action |
| `icon-clock` | `ClockIcon` | outline | 24px | S4 | Paired with the staged status text — visual cue that time is passing, not that the system has stalled |
| `icon-success` | `CheckCircleIcon` | solid | 24px (32px on S9) | S5, S9 | Success / valid state — always paired with `color-success` and a text label, never alone |
| `icon-error` | `XCircleIcon` | solid | 24px (32px on S9) | S9, S2 inline error | Rejection / invalid / not-found state — always paired with `color-error` and a text label |
| `icon-warning` | `ExclamationTriangleIcon` | outline | 20px | S6, S7 | Flags a state needing attention without asserting failure |
| `icon-claim` | `CheckBadgeIcon` | outline | 20px | S6 primary action | "This is my vehicle — claim it" |
| `icon-dispute` | `ChatBubbleLeftRightIcon` | outline | 20px | S6 secondary action, S7 | Routing to human-mediated help |
| `icon-document` | `DocumentTextIcon` | outline | 20px | S7 | Proof-of-purchase upload field |
| `icon-qr` | `QrCodeIcon` | outline (prompt) / solid (issued) | 24px | S5, S9 | Outline as a scan prompt on S9; solid to frame the issued pass on S5 |
| `icon-camera` | `CameraIcon` | outline | 24px | S9 ready state, S10 headline | Scanning affordance |
| `icon-offline` | `SignalSlashIcon` | solid | 20px | S9, S10 offline banner | Connectivity state — paired with the last-sync timestamp text, never shown as color alone |
| `icon-back` | `ArrowLeftIcon` | outline | 20px | S3 → S2, S10 → S9 | Return navigation |
| `icon-chevron` | `ChevronDownIcon` | outline | 20px | S8 | FAQ disclosure indicator — rotates 180° when a `<details>` entry is open |

**Outline vs. solid is a deliberate state signal, not a stylistic choice.** Rest and prompt states use outline; confirmed, resolved or urgent states use solid. This is why Heroicons was chosen over a single-weight icon set (D17) — the two weights are load-bearing for one of the seven component states, not decoration.

---

## 7. Motion and timing tokens

### 7.1 Interaction durations

| Token | Value | Usage |
|---|---|---|
| `duration-instant` | 100ms | S9/S10 scan-result transition — must read as immediate, per the contrast with S4 in `sitemap.md` §4 |
| `duration-fast` | 150ms | Hover, focus, active micro-transitions |
| `duration-base` | 250ms | Standard UI transitions |
| `duration-slow` | 400ms | Offline banner appearing/dismissing |
| `easing-standard` | Tailwind `ease-out` | All of the above |

**`prefers-reduced-motion` is respected everywhere.** Every duration above collapses to near-zero when the media feature is set — this is a token-level rule, not a per-component afterthought, and `accessibility.md` §4 records it as such.

### 7.2 Simulated timing constants — single source of truth for D15/D16

These are mocked backend behaviour, not visual design, but every file that references them should point here rather than restating a number that could drift out of sync.

**`[ASSUMPTION]` on the 6-second figure.** `research.md` §2.2 documents that the legacy RMV dependency slowed and timed out under national load, but no source in `research.md` gives a duration for that slowdown — there is no "it took N seconds" claim anywhere to point to. **6 seconds is a demo-pacing judgement, not a finding**: long enough to be felt and to justify three distinct status messages rather than one static label, short enough that a board demo doesn't sit in silence waiting on it. Everything downstream that treats this as evidence of real-world RMV latency would be wrong to do so. If a primary-research interview (`R §9`) later surfaces an actual figure, this constant is what should change — not the design intent behind having a staged, honest wait at all, which rests on `R §5-1` regardless of the exact number.

| Constant | Value | Source |
|---|---|---|
| S4 total simulated delay | `[ASSUMPTION]` — 6 seconds, fixed (not randomized) | Demo-pacing judgement, see note above. Not sourced from `research.md`. |
| S4 status-message cadence | Message 1 at 0s, message 2 at ~2.5s, message 3 at ~5s, resolves at 6s | Derived from the 6-second figure above — inherits the same `[ASSUMPTION]` flag |
| S9 result-display hold | `[ASSUMPTION]` — 3 seconds before auto-clearing to ready state | Demo-pacing judgement: long enough to read the result, short enough not to slow the next scan, per `R §2.4`'s speed constraint. No source specifies a duration. |
| S9/S10 validation response | Uses `duration-instant` (100ms) — no artificial delay | D15's explicit contrast with S4; this one is a design decision, not a stand-in for an unmeasured fact |

---

## 8. Tailwind config mapping

Illustrative `theme.extend`, so the tokens above are directly usable rather than descriptive prose that has to be re-translated into config by whoever builds this:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Noto Sans Sinhala"',
          '"Noto Sans Tamil"',
          '"Noto Sans"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      fontSize: {
        caption: ['0.875rem', { lineHeight: '1.6' }],
        body: ['1.125rem', { lineHeight: '1.6' }],
        emphasis: ['1.25rem', { lineHeight: '1.3' }],
        'outdoor-body': ['1.25rem', { lineHeight: '1.6' }],
        'outdoor-status': ['2.5rem', { lineHeight: '1.3' }],
      },
      colors: {
        'text-primary': '#0F172A',
        'text-primary-outdoor': '#000000',
        'text-secondary': '#334155',
        'text-disabled': '#64748B',
        success: '#166534',
        error: '#991B1B',
        primary: '#1D4ED8',
        'primary-outdoor': '#1E40AF',
        'surface-inverse': '#1E293B',
        'border-strong': '#64748B',
        'border-outdoor': '#0F172A',
      },
      spacing: {
        'touch-min': '3rem',
        'touch-min-outdoor': '4rem',
        'touch-gap': '0.5rem',
        'touch-gap-outdoor': '0.75rem',
      },
      transitionDuration: {
        instant: '100ms',
        fast: '150ms',
        base: '250ms',
        slow: '400ms',
      },
    },
  },
};
```

---

## 9. What's next

`component-spec.md` applies these tokens to each of the ten screens' components, and specifies all seven required states — default, hover, active, focus, disabled, loading, error — per component, including the two pacing-critical components named in the brief: S4's honest wait state and S9's instant-feedback result plus S10's offline state. `accessibility.md` then reports contrast, focus order, alt text and target-size compliance as evidence against what's specified here, not as a separate aspiration.
