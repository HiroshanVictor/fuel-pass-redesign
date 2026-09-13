# 03-design-system / accessibility.md

**Project:** Fuel Pass redesign — proposal prototype for the CPC director board
**Sources:** `tokens.md`, `component-spec.md`, `sitemap.md`, `user-flows.md` — sole sources.
**What this file is.** Compliance evidence against what's actually specified in `tokens.md` and `component-spec.md` — every ratio below is computed from the WCAG relative-luminance formula against the hex values those files declare, not estimated or asserted. Where a number falls short of a target, that's stated as a finding, not smoothed over.

---

## 1. Contrast — computed results

### 1.1 Text and icon contrast (WCAG 1.4.3 / 1.4.6)

AA requires 4.5:1 for normal text, 3:1 for large text (≥24px or ≥19px bold) or UI components. AAA requires 7:1 / 4.5:1. The brief holds AA as the floor throughout, and specifically the target (not just the floor) for the outdoor tier.

| Pairing | Ratio | AA | AAA | Used by |
|---|---|---|---|---|
| `color-text-primary` (slate-900) / white | **17.9:1** | ✓ | ✓ | Body text, labels, headings — S1–S8 |
| `color-text-primary-outdoor` (black) / white | **21:1** | ✓ | ✓ | Vehicle number, headline — S9/S10 |
| `color-text-secondary` (slate-700) / white | **10.4:1** | ✓ | ✓ | Supporting copy — S3, S8 |
| `color-text-disabled` (slate-500) / white | 4.76:1 | ✓ | ✗ | Disabled-state text only — exempt from both floors under WCAG 1.4.3, which excludes disabled/inactive components. Never used for readable, active content — `tokens.md` §2.2 restricts it explicitly. |
| `color-success` (green-800) / white | **7.14:1** | ✓ | ✓ (narrow) | "Valid" state — S9 result, S5 confirmation. Clears AAA by 0.14 — if this color is ever adjusted, re-run this number before assuming it still does. |
| `color-error` (red-800) / white | **8.31:1** | ✓ | ✓ | Rejection/error — S2, S6, S7, S9, S10 |
| `color-primary` (blue-700) / white | 6.70:1 | ✓ | ✗ | Standard-tier buttons/links default (S1–S8) — solid AA+, short of AAA by 0.3. Acceptable here: the brief's AA-floor-not-target instruction is scoped to outdoor conditions; this pairing never renders on S9/S10 (see next three rows). |
| `color-primary` hover (blue-800) / white | **8.72:1** | ✓ | ✓ | Standard-tier hover |
| `color-primary` active (blue-900) / white | **10.36:1** | ✓ | ✓ | Standard-tier active |
| `color-primary-outdoor` (blue-800) / white | **8.72:1** | ✓ | ✓ | Outdoor-tier buttons/links default (S9/S10) — added during this pass specifically because the plain `color-primary` value above falls short of AAA and outdoor is where that isn't acceptable |
| `color-primary-outdoor` hover (blue-900) / white | **10.36:1** | ✓ | ✓ | Outdoor-tier hover |
| `color-primary-outdoor` active (blue-950) / white | **14.69:1** | ✓ | ✓ | Outdoor-tier active |
| White / `color-surface-inverse` (slate-800) | **14.6:1** | ✓ | ✓ | Offline banner text — S9, S10 |

**Result: every text and icon pairing that renders on S9 or S10 clears AAA (7:1).** The one pairing anywhere in the system that sits between AA and AAA (`color-primary` at 6.70:1) is confined to the standard tier by the tier binding `component-spec.md` §0.2 establishes — it never appears on a station screen.

### 1.2 Non-text / UI-component contrast (WCAG 1.4.11)

Applies to borders and other graphics that identify a component's boundary or state — not to purely decorative lines. Threshold is 3:1 against the adjacent color.

| Pairing | Ratio | Meets 3:1? | Role |
|---|---|---|---|
| `color-border-strong` (slate-500) / white | **4.76:1** | ✓ | Form-control boundary at rest — Text Input, File Upload (standard tier) |
| `color-border-outdoor` (slate-900) / white | **17.9:1** | ✓ | Form-control and button boundary — outdoor tier |
| `color-border` (slate-200) / white | 1.2:1 | ✗ | **Exempt, not a finding.** Used only for decorative dividers (FAQ list separators) where nothing about a component's boundary depends on the line — see `tokens.md` §2.2a. If this token is ever reused for an actual control edge, it fails and must not be. |
| Focus ring `color-primary` (blue-700) / white | **6.70:1** | ✓ | Both tiers — the ring uses the standard-tier value even outdoors, since 6.70:1 already clears 3:1 with more than double the margin; `component-spec.md` §1 records this as a deliberate non-divergence, not an oversight |

**One tracked exemption (`color-border`), everything else load-bearing clears 3:1 — the corrected default border (`color-border-strong`, added mid-spec after the original slate-200 default was checked and failed) is the reason this section has only one exemption instead of a systemic gap.**

---

## 2. Focus order

Each screen's tab sequence, in order. Screens with no interactive elements beyond navigation are noted as such rather than omitted.

| Screen | Focus order |
|---|---|
| **S1** | 1. Primary button (Continue) → 2. Secondary link (Help & Answers) |
| **S2** | 1. Vehicle registration number field → 2. Chassis number field → 3. "Where do I find this?" link (immediately after the field it explains, both visually and in tab order) → 4. Primary button (Find my vehicle) |
| **S3** | 1. Back button (Back to my details) — only interactive element; the location diagram is static content, not a tab stop |
| **S4** | **No tab stops.** Nothing is interactive by design (`component-spec.md` §6) — the status message reaches assistive technology via `aria-live` on mount, not via focus |
| **S5** | 1. Primary button (Download QR code) → 2. Secondary button (Print). The conditional override note, when present, is static text and not a tab stop |
| **S6** | 1. Primary button (This is my vehicle — claim it) → 2. Secondary button (This isn't my situation — get help) → 3. Tertiary link (Read more in Help & Answers) |
| **S7** | 1. File upload trigger (Choose file) → 2. Optional notes field → 3. Primary button (Submit for review) |
| **S8** | 1–5. Each FAQ `<summary>` row (Q1 → Q5), independently focusable and toggled by native `<details>` behaviour → 6. Footer link (Submit a dispute). An open entry's answer text is not itself a tab stop — it's static content revealed in the document flow, consistent with native `<details>` semantics |
| **S9** | 1. "Can't scan? Enter manually" link — the only standing focusable control. The camera view isn't focusable; the result display isn't a tab stop either (it's announced via `aria-live="assertive"`, not reached by keyboard — see `component-spec.md` §7) |
| **S10** | 1. Vehicle registration number field (manual entry) → 2. Primary button (Check manually) → 3. "Back to scanning" link |

**No screen has a focus order that diverges from visual reading order** — a check worth stating explicitly, since a mismatch between visual and DOM order is one of the more common ways a form passes a contrast audit and still fails to be usable with a keyboard.

---

## 3. Live regions

| Screen(s) | Role / `aria-live` | Urgency | Why |
|---|---|---|---|
| S4 | `role="status"`, `aria-live="polite"` | Waits its turn | The wait status isn't urgent — it's informative, and interrupting other announcements to deliver it would be worse than a short delay in hearing it. (D19: this is now a single fixed message announced once on mount, not a sequence of updates — "polite" still applies, there's just less to announce.) |
| S9 result display | `role="alert"`, `aria-live="assertive"` | Interrupts | A pass/fail result at a fuel pump is time-critical in a way S4's progress isn't — `component-spec.md` §7 draws this contrast explicitly. |
| S9 + S10 offline banner | `role="status"`, `aria-live="polite"` | Waits its turn | A connectivity change is worth surfacing but isn't as urgent as a scan result — same reasoning tier as S4, applied to a different component. |

**Focus is never forced into a live region.** All three announce without moving keyboard focus, per the "Focus" rows in `component-spec.md` §6–8 — an operator mid-scan or a citizen mid-wait is never yanked away from what they were doing to be told something changed.

---

## 4. Alt text and non-text content rules

**Default rule: icons paired with visible text are decorative to assistive technology.** `tokens.md` §2.3 already requires every icon in this system to appear alongside a text label, never alone — which means the label, not the glyph, carries the accessible name. Every icon in `tokens.md` §6 gets `aria-hidden="true"` **except** the two named below, which are genuinely informational and have no equivalent text elsewhere on the page.

| Element | Treatment | Text |
|---|---|---|
| Issued Fuel Pass QR code (S5) | `alt` text, not decorative | "Fuel Pass QR code for {{vehicle registration number}}. Scan at any fuel station." — describes purpose, not visual pattern, since a literal description of a QR code's pixels would be meaningless to anyone it's read aloud to |
| Chassis-number location diagram (S3) | `alt` text, not decorative | "Diagram showing the chassis number location: on the chassis plate under the bonnet, in the engine bay, or on the vehicle registration document." — the image *is* the content of this screen, not an illustration of text stated elsewhere |
| S9 camera viewfinder | `aria-label` (it's a live video stream, not a static image — `alt` doesn't apply) | "Live camera view for scanning a Fuel Pass QR code" |
| Every other icon (`icon-help`, `icon-search`, `icon-clock`, `icon-success`, `icon-error`, `icon-warning`, `icon-claim`, `icon-dispute`, `icon-document`, `icon-qr` as a scan-prompt glyph, `icon-camera` as a static glyph elsewhere, `icon-offline`, `icon-back`, `icon-chevron`) | `aria-hidden="true"` | None — the adjacent visible text is the accessible name. Announcing "check circle icon, Valid" would be redundant noise on top of "Valid." |

**The FAQ chevron needs no ARIA state at all.** Native `<details>`/`<summary>` already announces expanded/collapsed to assistive technology on its own — one more reason D17's "don't build from scratch" choice pays off here specifically, not just in principle.

---

## 5. Target sizes

WCAG 2.5.8 (AA) requires 24×24 CSS px minimum; 2.5.5 (AAA) requires 44×44. `tokens.md` §4 set both tiers above the AAA benchmark, not just the AA floor. Confirmed per component:

| Component | Tier | Rendered size | Requirement | Result |
|---|---|---|---|---|
| Primary Button | Standard | 48px height | 24px AA / 44px AAA | Clears AAA |
| Primary Button | Outdoor | 64px height | 24px AA / 44px AAA | Clears AAA by 20px |
| Secondary/Link Button | Standard | 48px hit area (padded) | 24px AA / 44px AAA | Clears AAA |
| Secondary/Link Button | Outdoor | 64px hit area (padded) | 24px AA / 44px AAA | Clears AAA by 20px |
| Text Input | Standard | 48px height | 24px AA / 44px AAA | Clears AAA |
| Text Input | Outdoor (S10) | 64px height | 24px AA / 44px AAA | Clears AAA by 20px |
| File Upload drop zone | Standard | 96px min-height | 24px AA / 44px AAA | Clears AAA more than 2× over |
| FAQ Disclosure row | Standard | 48px height | 24px AA / 44px AAA | Clears AAA |
| Scan Result Display | Outdoor | — | N/A | Display only, not a tap target |
| Offline Banner | Outdoor | — | N/A | Status only, not a tap target |

**Spacing between adjacent targets:** `touch-target-gap` (8px, standard) and `touch-target-gap-outdoor` (12px, outdoor) apply wherever two controls sit next to each other — S5's Download/Print pair, S6's stacked primary/secondary buttons, S10's field-plus-button. No two interactive elements in this system sit closer than their tier's gap token.

---

## 6. Motion

`tokens.md` §7.1 declares that every transition duration collapses under `prefers-reduced-motion`. Two places this actually changes rendered behaviour, not just theory:

- **S4's progress bar** (`component-spec.md` §6): continuous fill → a static, non-animating bar at a fixed partial fill. The fixed status message (D19) and the fact that a wait is in progress both survive; only the continuous motion is removed.
- **Offline banner slide-in** (`component-spec.md` §8): `duration-slow` transition → instant appearance, no slide.

This exceeds WCAG's actual floor here — 2.3.3 (motion from interactions) is an AAA criterion, not required at AA — consistent with the rest of this file treating AA as a floor to clear with margin rather than a ceiling to stop at.

---

## 7. What this file cannot do

Consistent with the standard the rest of this knowledge store holds itself to: naming the limitation rather than letting the evidence imply more than it supports.

- **These are computed, formula-based results, not tested results.** Every ratio in §1 comes from the WCAG relative-luminance formula applied to the exact hex values in `tokens.md`. No screen reader, no real device in direct sunlight, and no colorblind-vision simulation has actually run against a built screen — because no screen is built yet. This file is evidence that the *specification* complies; `research.md` §9 / `gap-analysis.md` C12's `F 42` (usability testing, ten to fifteen people, think-aloud) is where a built prototype gets checked against real people, real hardware and real sunlight, and is the only source that could catch what a formula can't — for instance, whether 8.72:1 on a real, glare-coated station-device screen still reads as clearly as the number implies.
- **`[ASSUMPTION]` timing constants inherit into this file's live-region behaviour.** `tokens.md` §7.2 flags the 6-second S4 delay and the 3-second S9 hold as demo-pacing judgements, not measured facts. The `aria-live` cadence in §3 above is correct *given* those durations; if the durations change, the announcement timing changes with them, and this file doesn't need to be re-derived, just re-checked against whatever new numbers `tokens.md` records.
- **This file inherits every persona limitation `users.md` §6 and §7 already recorded.** P6 (senior citizens, first-time registrants) is the persona `research.md` marks as most likely under-represented in the evidence this whole project is built on, and is not one of the two personas D15 scoped this build for. Meeting WCAG AA/AAA numerically is not the same claim as "accessible to P6 specifically" — that claim would need the interview `users.md` §7 already lists as outstanding, not a contrast calculation.
