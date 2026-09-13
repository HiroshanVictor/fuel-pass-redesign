# 03-design-system / component-spec.md

**Project:** Fuel Pass redesign — proposal prototype for the CPC director board
**Sources:** `tokens.md`, `sitemap.md`, `user-flows.md`, `screen-content.md`, `microcopy.md`, `decisions.md` D15–D18 — sole sources.
**Rule:** every value below is a named token from `tokens.md`. Where a state needs a shade `tokens.md` doesn't declare by name, it moves one step along the *same* Tailwind ramp as the base token (§0.1) — never a new, unrelated color.

---

## 0. Rules this spec is built against

### 0.1 State-variation rule — no one-off values

A token like `color-primary` (`blue-700`) names a rest-state color. Hover and active states of the *same* component move to the adjacent step on that same Tailwind ramp — `blue-800` for hover, `blue-900` for active — rather than introducing an unrelated color. This is still "from tokens only": the ramp itself is declared in `tokens.md` §2, and using its adjacent steps is not inventing a new value, it's using the same one at a different position.

### 0.2 Tier binding — confirmed per component, not left implicit

`tokens.md` §1 declares a standard and an outdoor tier as *available* tokens. This section is where each component is actually bound to one, so the tier is a property of where a component renders, not a suggestion:

| Component | Renders on | Tier | Why |
|---|---|---|---|
| Primary Button | S1–S8 **and** S9–S10 | **Screen-bound** — standard on S1–S8, outdoor on S9–S10 | Same control, different physical-use context. The outdoor case isn't "what P2 gets"; it's what any screen reached at a pump in direct sunlight gets, per `R §5-6`. |
| Secondary / Text Link Button | S1–S8 **and** S9 | **Screen-bound**, same logic | — |
| Text Input | S2, S7 (standard) · S10 (outdoor) | **Screen-bound** | S10's manual-entry field is the same component as S2's, rendered outdoor. |
| File Upload Field | S7 only | Standard only | No outdoor equivalent exists in this build. |
| FAQ Disclosure | S8 only | Standard only | — |
| Verification Wait State | S4 only | Standard only | — |
| Scan Result Display | S9 only | **Outdoor only** — never renders with standard tokens | No presence on S1–S8. |
| Offline Banner | S9 **and** S10 | **Outdoor only**, shared across both screens | See §8 — connectivity loss doesn't respect which station screen is open. |

Three of the eight components are screen-bound and must carry both token sets correctly; the rest are single-tier by construction, listed so that isn't left to be inferred.

### 0.3 The seven required states

Default, hover, active, focus, disabled, loading, error — specified for every component below. Where one is genuinely inapplicable, it's marked **N/A** with the reason, not silently dropped. A blank row would be indistinguishable from an oversight; an N/A with a reason is a decision on the record, same standard the rest of this knowledge store holds itself to.

---

## 1. Primary Button

**Anatomy:** `<button>`, label text, optional leading icon. Used for every primary action: S1 Continue, S2 Find my vehicle, S6 This is my vehicle — claim it, S7 Submit for review, S10 Check manually, S5 Download QR code.

| State | Standard tier (S1–S8) | Outdoor tier (S9–S10) |
|---|---|---|
| **Default** | bg `color-primary` (blue-700, 6.7:1), text white, height `touch-target-min` (48px), text `text-body` bold, radius `radius-md` | bg `color-primary-outdoor` (blue-800, 8.72:1 — not the standard tier's blue-700; see `tokens.md` §2.1 for why the two tiers diverge here), text white, height `touch-target-min-outdoor` (64px), text `text-outdoor-body` bold, **plus** a 2px `color-border-outdoor` border around the fill — belt-and-braces so the button's edge stays legible even if the fill itself washes out in direct sun |
| **Hover** | bg → blue-800 (8.72:1, per §0.1), `duration-fast` | bg → blue-900 (10.36:1). Touch is the primary input at a station — hover rarely fires — but it's specified, not skipped, for the rare trackpad/mouse device |
| **Active** | bg → blue-900 (10.36:1), subtle `active:scale-[0.98]` | bg → blue-950 (14.69:1), **no scale transform** — a solid color-only change is clearer feedback than motion when glare is already degrading what's visible, per `R §5-6` |
| **Focus** | 2px offset + 3px solid ring, `color-primary` (6.7:1) | Same ring color and ratio (`color-primary`, not the outdoor fill token — 6.7:1 already clears the ring's 3:1 non-text minimum regardless of tier), 4px solid instead of 3px, never removed via `outline-none` without an equal replacement |
| **Disabled** | bg `slate-200`, text `color-text-disabled`, `cursor-not-allowed` — exempt from contrast requirements per `tokens.md` §2.2 | Same tokens; not currently triggered by any outdoor flow, specified for completeness |
| **Loading** | Inline spinner replaces label, min visible `duration-base` (250ms), for actions that resolve **without** a full navigation — S6's claim, S7's submit. **Not used on S2's Find my vehicle**, which navigates directly to S4's dedicated wait screen (§6) — a second loading affordance on the button would duplicate and undercut that screen's honest-wait treatment. | **Not used on S9/S10.** Validation runs on `duration-instant` (100ms) — too fast to render, by deliberate design (§7). |
| **Error** | No persistent error styling on the button itself. An invalid submit (e.g. S7 with no file attached) returns the button to Default and moves focus to the first invalid field, which carries the Error state (§3). | Same — S10's Check manually button doesn't take on error styling; a not-found result renders via the Scan Result Display (§7), not the button. |

---

## 2. Secondary / Text Link Button

**Anatomy:** text + optional icon, no fill. Used for: S1/S6/S7/S8 Help & Answers, S2 "Where do I find this?", S6 "This isn't my situation — get help", S9 "Can't scan? Enter manually", S3/S10 back links.

| State | Standard tier | Outdoor tier |
|---|---|---|
| **Default** | text `color-primary` (6.7:1), `text-body`, underline on the label, invisible padding out to `touch-target-min` (48px) hit area — visible text size and hit-area size are independent | text `color-primary-outdoor` (blue-800, 8.72:1 — same divergence as Primary Button §1, for the same reason), `text-outdoor-body`, padded to `touch-target-min-outdoor` (64px). Visible text is not inflated to look 64px tall; only the tap target is |
| **Hover** | underline strengthens, `color-surface-muted` tint behind text | text → blue-900 (10.36:1), underline strengthens |
| **Active** | text → blue-900 | text → blue-950 (14.69:1) |
| **Focus** | Ring, as Primary Button §1 | Same |
| **Disabled** | text `color-text-disabled`, no underline | Not currently triggered by any flow in `user-flows.md` — specified for completeness, one of the seven required states |
| **Loading** | **N/A.** Every link in this build navigates immediately (S2→S3, S1/S6/S7→S8, S6→S7, S3→S2, S10→S9) — nothing to wait on. | Same reasoning |
| **Error** | **N/A**, same reasoning as Primary Button's error state — a navigation link cannot itself fail validation | Same |

---

## 3. Text Input

**Anatomy:** `<label>` + `<input>` (S7's optional notes field uses the same tokens on a `<textarea>`). Standard tier: S2's vehicle-number and chassis-number fields, S7's notes field. Outdoor tier: S10's manual vehicle-number entry.

| State | Standard tier | Outdoor tier |
|---|---|---|
| **Default** | border `color-border-strong` (slate-500, 4.76:1 — see `tokens.md` §2.2a for why this replaced the original `color-border`), bg white, text `color-text-primary`, height `touch-target-min` (48px), `text-body`, radius `radius-sm` | border `color-border-outdoor` (17.9:1) at 2px, height `touch-target-min-outdoor` (64px), `text-outdoor-body` |
| **Hover** | border → slate-600 (one step down the same ramp) | No visible change — outdoor border is already at the top of the ramp; noted explicitly rather than left unspecified |
| **Active** | Same appearance as Focus — a text field has no separate "pressed" look, per standard form-control convention | Same |
| **Focus** | border + ring `color-primary`, as §1 | Same, 4px ring |
| **Disabled** | bg `color-surface-muted`, border at reduced opacity, text `color-text-disabled` | Not currently triggered by any flow — completeness |
| **Loading** | **N/A.** Both S2 and S7 fields validate only on explicit Submit, not on keystroke; S10's field submits explicitly too. No field in this build has inline async validation. | Same reasoning |
| **Error** | border + text `color-error` (red-800, 8.3:1), `icon-error` leading the message, message text replaces the helper line — e.g. S2's "We couldn't find a record matching those details." Never color-only. | Same pattern — S10's not-found message on manual entry |

---

## 4. File Upload Field

**Anatomy:** dashed drop target, `icon-document`, "Choose file" trigger (styled as §2), selected-filename readout. Standard tier only — S7.

| State | Standard tier |
|---|---|
| **Default** | border `color-border-strong` dashed 2px, bg `color-surface-muted`, `icon-document` in `color-text-secondary`, radius `radius-md`, min-height 2× `touch-target-min` (96px) — a drop zone is deliberately larger than a tap target, sized as a multiple of the token rather than a new arbitrary number |
| **Hover** | border → slate-600 |
| **Active** *(file dragged over)* | border `color-primary`, bg tinted `bg-primary/5` — an opacity modifier on the existing token, not a new color |
| **Focus** *(keyboard to the Choose file trigger)* | Ring, as §1 |
| **Disabled** | **N/A** — not triggered by any flow; S7 is only reached when filing a dispute, and the field is always available there. Completeness. |
| **Loading** | File selected → brief mocked "processing" beat, `icon-document` replaced by a spinner, min `duration-base` — a real upload takes time, and a 0ms swap would read as broken. This is a different case from S9's deliberate instantness (§7): nothing here is safety-critical to speed the way station scanning is, so an honest brief pause is appropriate, not a contradiction of the "instant where it matters" principle. |
| **Error** | border `color-error`, icon swaps to `icon-error`, message states the specific problem (wrong file type or size, mocked check) |

---

## 5. FAQ Disclosure

**Anatomy:** native `<details>`/`<summary>` — chosen because it is a built-in, keyboard-and-screen-reader-accessible disclosure with no JavaScript required, which is what "don't build from scratch" means literally at this scale (D17). Standard tier only — S8.

| State | Standard tier |
|---|---|
| **Default (closed)** | `<summary>` text `color-text-primary` bold, `icon-chevron` pointing down, min height `touch-target-min` on the row, separated from the next item by `color-border` (slate-200 — decorative divider, exempt per `tokens.md` §2.2a; nothing about this hairline identifies a component boundary the user needs to locate) |
| **Hover** | `color-surface-muted` tint behind the row |
| **Active** *(mid-press)* | Momentary slightly darker tint |
| **Focus** | Ring on the `<summary>` element, as §1 — natively focusable and toggled with Enter/Space via browser-native `<details>` behaviour, no custom key handling written |
| **Disabled** | **N/A** — all five answers in `microcopy.md` S8 render unconditionally; no FAQ entry is ever unavailable |
| **Loading** | **N/A** — content is static and local; nothing is fetched |
| **Error** | **N/A** — a local disclosure cannot fail |
| *(Open, not one of the seven)* | `icon-chevron` rotated 180°, answer text `color-text-secondary`, `leading-relaxed`, revealed below the summary |

---

## 6. Verification Wait State — S4, the honest wait named in the brief

**Anatomy:** `icon-clock` + a determinate linear progress bar + three staged status messages + a supporting line. Standard tier only.

**Why not a spinner.** An indeterminate circular spinner says "unknown wait, please stand by" and actively hides the fact that something specific is happening — the exact opposite of what `sitemap.md` §3–4 and `R §5-1` require this screen to demonstrate. A determinate bar plus named, sequential status text ("Checking DMT vehicle records...") tells the user something concrete is occurring and roughly how much is left. The fill uses `easing-standard` applied *linearly*, not eased — an eased fill subtly implies acceleration or deceleration that isn't actually happening, which would misrepresent a constant-rate mock as something it isn't.

Because this is a status region, not a classic interactive control, several of the seven states take a different shape than usual — each is still addressed, not skipped:

| State | Specification |
|---|---|
| **Default** | **N/A.** This component exists only once triggered by S2's submit; there is no idle appearance to specify. |
| **Hover** | **N/A.** Nothing on S4 is pointer-interactive — `screen-content.md` records the no-cancel-action decision explicitly. |
| **Active** | **N/A**, same reasoning. |
| **Focus** | Not a click target, but the accessible equivalent: an `aria-live="polite"` region announces each staged message as it appears, so a screen-reader user receives the same progression without needing to poll anything. See `accessibility.md` §2. |
| **Disabled** | **N/A** — nothing to disable. |
| **Loading** | **This is the component's entire purpose.** Bar fills 0% → 100% over the `[ASSUMPTION]`-flagged 6-second constant (`tokens.md` §7.2). Status text swaps at 0s / ~2.5s / ~5s, each swap a `duration-base` opacity cross-fade. **`prefers-reduced-motion` fallback:** the continuously-filling bar is replaced by three discrete step markers ("Step 1 of 3", etc.) advancing on the same schedule — the *information* survives, only the continuous motion is removed. |
| **Error** | **N/A, by product decision, not by omission.** D15 explicitly declined to simulate a lookup timeout or failure on top of the delay. This is the one component in this spec where "error" doesn't exist because the thing that would cause it was deliberately scoped out, and the decision that did so is on the record. |

---

## 7. Scan Result Display — S9, instant feedback named in the brief

**Anatomy:** large `icon-success`/`icon-error` sized to match `text-outdoor-status` (40px) + the status label ("Valid" / "Not valid") + vehicle number (`text-outdoor-body`) + reason line (error case only). **Outdoor tier only — confirmed: every token this component uses (`text-outdoor-status`, `text-outdoor-body`, `touch-target-min-outdoor` on the adjoining manual-entry link) is the outdoor set. It has no presence on S1–S8.**

| State | Specification |
|---|---|
| **Default** *(pre-result)* | Not this component — the camera viewfinder + `icon-camera` + scan prompt is a separate visual mode of the same screen region, already the "state before" this one activates. Noted for continuity, not specified here. |
| **Hover** | **N/A.** This region displays a result; it doesn't accept pointer input. The only interactive element on S9 is the manual-entry link, already specified in §2. |
| **Active** | **N/A**, same reasoning. |
| **Focus** | `aria-live="assertive"` — deliberately *not* "polite" like S4's. A pass/fail result at a fuel pump is time-critical and should interrupt a screen reader's current announcement, unlike S4's progress updates, which can wait their turn. See `accessibility.md` §2. |
| **Disabled** | **N/A** — this component only renders once a scan has resolved; there's no disabled variant of a result. |
| **Loading** | **Must not exist as a perceptible state, by design.** `duration-instant` (100ms) makes the scan-to-result transition too fast to render a loading affordance. This mirrors S4's Error state as the deliberate absence in this component: showing a loading flicker here — even briefly — would contradict `R §2.4`'s finding that slow, uncertain scanning is what makes operators bypass the system. |
| **Error** | **This is the "Not valid" outcome itself** — `icon-error`, `color-error` label at `text-outdoor-status` size, plus the specific reason (never a bare "not valid," per `screen-content.md` and `microcopy.md`'s consistency rule #3). Auto-clears to the ready/camera state after the `[ASSUMPTION]`-flagged 3-second hold (`tokens.md` §7.2) — same hold duration as the success outcome. |

---

## 8. Offline Banner — S9 + S10, the offline state named in the brief

**Anatomy:** `icon-offline` (solid) + status text + last-sync timestamp, on `color-surface-inverse` (slate-800, 14.6:1 with white text). **Outdoor tier, shared across both station screens — confirmed binding, not just available tokens.**

**Why both screens, not just S10.** The brief names this "an offline state for S10," and S10 is indeed where it's specified here — but `user-flows.md` Flow 10 has the banner appearing on **S9** as scanning continues through a connectivity drop, per the offline-tolerance reading of `R §5-6`. Connectivity loss doesn't wait for the operator to be on a particular screen: someone already on S10 resolving a hardware failure when the connection also drops needs to see the same signal there, not lose it because they'd stepped into the fallback screen. So this is one component, rendered by both S9 and S10 — bound to the outdoor tier because it's a property of the station environment, not duplicated per-screen and not exclusive to either.

| State | Specification |
|---|---|
| **Default** | **Hidden.** The banner doesn't render while connectivity is present — its absence is the default, not a visual state to style. |
| **Hover** | **N/A** — a status region, not interactive. |
| **Active** | **N/A**, same reasoning. |
| **Focus** | `aria-live="polite"` on appearance and on clearing — connectivity changes are worth surfacing to assistive tech but aren't as time-critical as a scan result, hence "polite" not "assertive" (contrast with §7). |
| **Disabled** | **N/A** — nothing to disable on a status banner. |
| **Loading** | **N/A** — the banner's own appearance uses `duration-slow` (400ms slide-in) once connectivity actually drops; there's no intermediate "checking" state for the banner itself. |
| **Error** | **This banner *is* the degraded-but-functioning state, not a failure state.** Per Flow 10, connectivity loss doesn't stop scanning — it changes what scanning validates against (last-synced cache instead of live records). Framing it as an error would misstate what's happening and risk an operator treating designed offline tolerance as something broken. The copy in `microcopy.md` S9 ("checking against records last updated {{timestamp}}") states degraded operation, not failure — which is also why this row has no separate error sub-state distinct from the banner's one appearance. |

---

## 9. What's next

`accessibility.md` reports the computed contrast for every text/background pairing referenced above, the focus order for all ten screens, alt-text rules (including why most icons in this spec are `aria-hidden` — they're paired with visible text per `tokens.md` §2.3, so the text carries the accessible name, not the glyph), and target sizes confirmed against `touch-target-min` and `touch-target-min-outdoor` per component.
