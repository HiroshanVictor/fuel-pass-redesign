# 04-build / build-notes.md

**Project:** Fuel Pass redesign — proposal prototype for the CPC director board
**Sources:** `sitemap.md`, `user-flows.md`, `screen-content.md`, `microcopy.md`, `tokens.md`, `component-spec.md`, `accessibility.md`, `decisions.md` D15–D18 — sole sources for what was built. This file records *how* the spec became code, not new design decisions.
**Rule carried from Step 3:** every visual value in the app comes from a `tokens.md` token. Where the build needed a value the spec didn't have, it's called out below and added to the relevant knowledge-store file rather than left undocumented in code.

---

## 1. Stack

React + Vite, Tailwind CSS v3, Heroicons, per D17. Two additions beyond D17's two named tools, both scoped to exactly what ten screens need:

| Addition | Why | Scope discipline |
|---|---|---|
| **react-router-dom** (v6) | D17 already anticipated a router "beyond what ten screens need" being out of scope — read as a constraint on complexity, not a ban on using a router at all. Ten flat routes, no nested layouts, no data loaders, no lazy loading. | One `<Routes>` block in `App.jsx`, nothing else from the library's surface area used. |
| **Google Fonts (Noto Sans / Sinhala / Tamil)** | D18 requires the trilingual font stack to be *real*, not just named in `tokens.md`. Loaded in `index.html` even though demo copy is English-only — D18's whole point is that this is load-bearing before it's exercised. | Three font families, the exact ones `tokens.md` §3.1 names. No other external font or asset host — the app has no other network dependency. |

No component framework (shadcn/ui, MUI, etc.) and no state library (Redux, Zustand, etc.) — plain React `useState`/`useContext` for the two flow contexts (`CitizenFlowContext`, `StationContext`), per the brief.

---

## 2. What's real, what's simulated (per D15)

D15: "vehicle, ownership and chassis records are mocked." This is the complete list of what that means in the actual build.

| Layer | Status | Detail |
|---|---|---|
| RMV / DMT vehicle lookup | **Simulated** | `src/data/demoData.js` — a hardcoded array of three vehicles, matched by exact vehicle number + chassis number. No network call. |
| The 6-second wait at S4 | **Simulated, and the duration itself is `[ASSUMPTION]`** | Not measuring anything — see `tokens.md` §7.2. The lookup result is actually known instantly (computed at S2's submit); the wait is a deliberate, honest-feeling delay layered on top, per D16. |
| Fuel Pass validity check at S9/S10 | **Simulated** | `src/data/demoData.js`'s `FUEL_PASSES` array, matched by QR code (S9) or vehicle number (S10). No network call. |
| The "instant" validation at S9 | **Genuinely synchronous** | Not a fast simulated delay — there is no `setTimeout` in the validation path at all. The 100ms (`duration-instant`) only drives a CSS fade-in on the result, purely cosmetic. This is the literal implementation of the sitemap.md §3/§4 contrast with S4. |
| QR code on S5 | **Stylised, not a real scannable code** | Per `tokens.md` §6's own icon-qr entry ("solid to frame the issued pass"), this is the Heroicons `QrCodeIcon` at large size in a bordered frame — not a generated, decodable QR image. Nothing in this prototype decodes a real QR code; see §4 below for how "scanning" actually works. |
| "Download QR code" button (S5) | **Inert** | There's no real file to generate — the button exists because `screen-content.md` specifies it, but it doesn't trigger a download. Documented here rather than silently wired to a fake download. |
| Camera view at S9 | **Static visual mock, no device camera access requested** | `screen-content.md` specifies "camera view, minimal chrome" without requiring a live feed. Requesting real `getUserMedia` camera permission would make "every path must fire on command" (this build's own requirement) dependent on a permission grant succeeding live, on whatever hardware is presenting — a reliability risk for a board walkthrough that a static mock avoids. If a live feed is wanted for a future revision, this is the point to revisit. |
| Offline mode at S9/S10 | **Simulated via a manual toggle**, not real network detection | See §5 — the toggle is presenter-controlled, not `navigator.onLine`-driven, for the same on-command reliability reason as the camera. |
| S7's dispute submission | **Simulated** | A `setTimeout`-based "processing" beat, then a static confirmation message. No officer review exists behind it — `user-flows.md` Flow 3 already states this boundary explicitly; the build doesn't extend past it. |

Nothing above is a gap the design missed — every one of these traces to a stated simulation boundary already in `decisions.md` D15 or `sitemap.md`.

---

## 3. Seeded deterministic demo data

All in `src/data/demoData.js`. Every value below fires the same outcome every time — nothing is randomized.

### Citizen journey (S2 → S4 → S5 / S6 / S7)

| Vehicle number | Chassis number | Resolution | What happens |
|---|---|---|---|
| `WP CAB-1234` | `MA3ERLF1S00123456` | Clean match | S4 → **S5** directly (Flow 1) |
| `WP KL-5678` | `MA3FYE73S00654321` | Previous owner on file | S4 → **S6**. Clicking "This is my vehicle — claim it" **succeeds** → S5 (Flow 2) |
| `WP NC-9012` | `MA3NCX2S00789012` | Previous owner on file | S4 → **S6**. Clicking "This is my vehicle — claim it" **fails to resolve automatically** → S7 (Flow 3) |
| *(anything else)* | *(anything else)* | Not found | S4 → back to **S2** with the inline "we couldn't find a record" error (Flow 4). Try e.g. `WP XX-0000` / `NOTHING`. |

Both fields must match a seeded pair exactly (case-insensitive, whitespace-normalised) — a right vehicle number with a wrong chassis number resolves as not-found, same as two wrong fields, consistent with Flow 4's framing that a mismatch reads as a likely typo rather than a special case.

On S6, the secondary "This isn't my situation — get help" button always goes straight to S7 regardless of which previous-owner vehicle triggered it — that path is a voluntary choice, not a system failure, and works identically for both seeded previous-owner vehicles.

### Station journey (S9 / S10)

| QR code (simulated scan) | Vehicle number (manual entry) | Result |
|---|---|---|
| `FP-VALID-0001` | `WP CAB-1234` | **Valid** |
| `FP-SUPERSEDED-0002` | `WP KL-5678` | **Not valid** — "This Fuel Pass was superseded by a newer one." |
| *(any other QR or vehicle number)* | | **Not valid** — "No Fuel Pass record found for this vehicle." *(new string — see `microcopy.md` addendum)* |

Deliberate narrative continuity, not a coincidence: the "valid" station record shares its vehicle number with the citizen journey's clean-match vehicle, and the "superseded" record shares its vehicle number with the previous-owner-claimable vehicle — so a presenter can register `WP CAB-1234` on the citizen device, then show the same vehicle scanning valid at the station, and separately show why `WP KL-5678`'s *old* pass is the one that's superseded.

### How "scanning" is triggered on command

S9 has no real camera decode (see §2). Two ways to fire a result, both deterministic:

1. **Demo Controls panel** (see §6) — one-click buttons for each seeded QR code. This is the reliable path for a live walkthrough.
2. **Manual entry** (S9 → "Can't scan? Enter manually" → S10) — type one of the two seeded vehicle numbers. This exercises the actual S10 screen, not just the harness.

### Offline toggle

A checkbox in the Demo Controls panel (§6), scoped to the shared `StationContext` — flips `isOffline` and captures `offlineSince` as the timestamp shown in the banner (`OfflineBanner`, rendered on both S9 and S10 per `component-spec.md` §8). Not driven by `navigator.onLine`, by design — a live network-detection toggle would make the offline path fire only when someone actually disconnects the presenting machine mid-demo, which is the opposite of "fires on command."

---

## 4. Demo Controls — not one of the ten screens

`src/components/DemoControls.jsx`. A fixed-position, dashed-border, monospace-labelled panel, visually built to be mistaken for developer tooling, not product — because it is developer tooling. It provides:

- A citizen-device / station-device switcher (since `sitemap.md` §1 treats these as two separate devices; one browser tab needs a way to move between them for a demo).
- One-click fills for the three seeded vehicles on S2.
- One-click scan simulation for the two seeded QR codes on S9.
- The offline toggle.

This exists because the brief explicitly asked for deterministic data that "fires on command," including "a manual offline toggle for S10" by name — it is scope the brief itself authorised, not an addition made unbidden. It is never rendered as part of, or styled to resemble, any of the ten screens in `sitemap.md`, and none of its buttons appear in the focus-order tables in `accessibility.md` §2, which describe the product screens only.

---

## 5. Pacing — implemented exactly per tokens.md §7

- **S4:** `VerificationWaitState` runs a 6000ms timer (`S4_TOTAL_DELAY_MS`), with status text swapping at 0 / 2500 / 5000ms (`S4_MESSAGE_TIMES_MS`) and a linear (not eased) progress bar filling over the same 6000ms via `requestAnimationFrame`. Under `prefers-reduced-motion`, the bar is replaced with "Step N of 3" text on the same schedule, per `component-spec.md` §6.
- **S9:** validation is synchronous (§2 above); only the 100ms fade-in is timed.
- **S9/S10 result hold:** 3000ms (`S9_RESULT_HOLD_MS`) before the result auto-clears and, on S10, before auto-navigating back to `/station` — both read from the same constant, so they can't drift apart.

All four constants live in one file, `src/data/timing.js`, mirroring `tokens.md` §7.2 exactly so a change to the spec has one obvious place to land in code.

---

## 6. Routes

| Path | Screen |
|---|---|
| `/` | S1 — Start |
| `/find-vehicle` | S2 — Find Your Vehicle |
| `/chassis-help` | S3 — Locate Your Chassis Number |
| `/verifying` | S4 — Verifying Your Vehicle |
| `/fuel-pass` | S5 — Fuel Pass Issued |
| `/previous-owner` | S6 — Still Registered to a Previous Owner |
| `/dispute` | S7 — Submit a Dispute |
| `/help` | S8 — Help & Answers |
| `/station` | S9 — Station Scan |
| `/station/manual` | S10 — Scan Couldn't Complete |

Ten routes, ten screens, one-to-one — nothing extra.

---

## 7. Running locally

```
npm install
npm run dev
```

Opens on `http://localhost:5173`. `npm run build` produces `dist/`; `npm run preview` serves that build locally.

## 8. Deploying to Vercel

Zero-config: `vercel.json` rewrites every path to `/index.html` so client-side routes (e.g. `/station/manual`) resolve correctly on a hard refresh or direct link, since this is a static SPA build (`npm run build` → `dist/`) with no server component.

---

## 9. What this build cannot do

Consistent with the standard the rest of this knowledge store holds itself to:

- **It hasn't been checked against real assistive technology.** `accessibility.md` §7 already flagged that its contrast numbers are computed, not tested; the same applies here — the ARIA roles, live regions and focus order are implemented as specified, but no screen reader has actually been run against this build.
- **Two strings were added that weren't in the original `microcopy.md`** (the S7 file-required message, the S9/S10 not-found message) — both were genuine gaps the copy deck hadn't anticipated, not places where the build overrode the spec. Both are now recorded in `microcopy.md`'s addendum, not just in source code.
- **This is a board-demo build, not a production one**, per `CLAUDE.md`'s own scope boundary — no real RMV/DMT integration, no payments, no real QR generation or decoding, no backend, no persistence between page reloads (all state is in-memory React state; a refresh resets both journeys to their start).
