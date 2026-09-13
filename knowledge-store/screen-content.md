# 02-ideation / screen-content.md

**Project:** Fuel Pass redesign — proposal prototype for the CPC director board
**Sources:** `sitemap.md`, `user-flows.md`, `decisions.md` D9, D13, D14, D15, D16 — sole sources.
**Purpose:** content inventory per screen — what's on it, in what states, and why. Final verbatim strings are in `microcopy.md`; this file is the structure those strings fill.

---

## S1 — Start

**Traces to:** #16. **Persona:** P1.

| Block | Content |
|---|---|
| Headline | States what this is and answers "do I need to register again?" before the user has to ask it. |
| Supporting line | One sentence: if a vehicle has ever had a Fuel Pass or QR before — including a second-hand purchase — it needs checking again here. |
| Primary action | Single CTA into S2. No branching choice on this screen — every in-scope user takes the same next step, so a decision here would be a decision with only one real answer dressed up as a choice. |
| Secondary link | "Help & Answers" → S8. |

**Note.** No path from S1 serves a brand-new, first-registration vehicle (P7) or a second vehicle under one identity (P4) — both out of build scope per D8 and D6. Rather than let those users discover that silently three screens later, S8 answers directly for anyone who lands here looking for one of those. See S8.

---

## S2 — Find Your Vehicle

**Traces to:** #2. **Persona:** P1.

| Block | Content |
|---|---|
| Headline | Names the two fields plainly: vehicle registration number, chassis number. |
| Field 1 | Vehicle registration number. |
| Field 2 | Chassis number, with an inline "Where do I find this?" trigger → S3 (Flow 5). |
| Primary action | Submit → S4. |
| Inline error state | Per `user-flows.md` Flow 4: appears in place, not as a new screen, when S4 returns no record. Two distinct messages (D20), not one: a partial match (one field recognised, one not) says the input may be wrong; a match on neither field says so honestly, without guessing a typo it can't verify, and points to S8. Both are worded distinctly from S6's message — S6 never implies the input was wrong, because there the record *is* found. |

**Note — no identity field.** This form asks for the vehicle, not the owner: no NIC, passport, BRN, or phone number. That is the direct consequence of D14, and it also means the one-identity-one-vehicle rule behind `problems.md` #1 has no trigger point in this flow — this prototype doesn't check or refuse against it, because it never collects the credential that rule is keyed on. That enforcement, if retained, sits outside what's mocked here. Not an oversight — `sitemap.md` §8 already excludes a dedicated refusal screen for #1 by name.

**Note — the assumption.** Per `sitemap.md` §3, these two fields are the entire claim of possession this flow requires. Nothing here asks the user to prove they're the *right* person, only that they have access to the vehicle.

---

## S3 — Locate Your Chassis Number

**Traces to:** #16. **Persona:** P1.

| Block | Content |
|---|---|
| Headline | Direct answer to the question, not a general explainer. |
| Visual content | Labelled diagram or photo reference showing where a chassis number typically appears (chassis plate, engine bay, registration document) — the actual asset is a design-system asset, not content authored here. |
| Return action | Back to S2, with whatever was already entered preserved (Flow 5). |

---

## S4 — Verifying Your Vehicle

**Traces to:** #2 (reason to exist) · delay surfaces #4, exception per D16. **Persona:** P1.

| Block | Content |
|---|---|
| Status messaging | A single, specific status label ("Checking DMT vehicle records...") plus a determinate progress bar — not a static spinner label — so the wait (~6 seconds, mocked) reads as progress, not as a stall. This is a direct answer to `problems.md` #6: a system that shows nothing while it works is how citizens end up assuming it's offline. **D19:** an earlier draft staged three sequential messages here; reverted to one fixed message after two screenshots of the same wait, taken moments apart, read as an inconsistency rather than a progression — the progress bar alone still carries the "something concrete is happening" signal. |
| No cancel action | The lookup is short enough by design that a cancel path was judged unnecessary; nothing in `problems.md` #2 or #4 asks for one. |

**Outcomes, per `user-flows.md` §2–5:**

| Outcome | Routes to |
|---|---|
| Clean match, no prior owner | S5 |
| Match found, previous owner on file | S6 |
| No record found | Inline error, back to S2 |

No fourth outcome. Per `decisions.md` D15, a simulated timeout or network failure was considered and declined — this screen always resolves to one of the three rows above.

---

## S5 — Fuel Pass Issued

**Traces to:** #2. **Persona:** P1.

| Block | Content |
|---|---|
| Confirmation | Positive, unambiguous success state. |
| QR code | The issued Fuel Pass, sized and contrasted for scanning at S9 even on a low-end screen or printed page. |
| Vehicle details | Vehicle registration number, shown back to the user as confirmation of what was registered. |
| Old-QR note | States plainly that any Fuel Pass or QR issued before this one for this vehicle is no longer valid — the direct answer to #16's "can I use my old QR code?", placed at the exact moment it matters instead of left for S8 to answer in the abstract. |
| Override note *(conditional)* | Shown only when this screen is reached via Flow 2 (S6's claim path), not via the direct clean-match path. States factually that this pass was issued after the user confirmed current ownership, and names a contact route if that's incorrect. |

**Decision on the conditional note.** Resolves the open question `user-flows.md` §3 left pending. Included because `sitemap.md` §3 flags the override as a fraud-surface trade-off the board should be able to see operating, not one that disappears once a claim succeeds — and because a user whose claim is later disputed by the actual previous owner is better served having been told, at the time, that they made one. It is one factual sentence, not a warning, and it does not block or delay issuance.

---

## S6 — Still Registered to a Previous Owner

**Traces to:** #2. **Persona:** P1.

| Block | Content |
|---|---|
| Headline | States the fact without assigning fault: the record found is linked to whoever registered it before. |
| Explanation line | Says explicitly that this is the system's record lagging behind a real sale — not something entered incorrectly. This is the line the S6 rename in `sitemap.md` exists to protect; every draft of this screen's copy is checked against it. |
| Primary action | "This is my vehicle — claim it." → self-service override, per D13 → S5 (Flow 2). |
| Secondary action | "This isn't my situation — get help." → S7 (Flow 3). |
| Tertiary link | Help & Answers → S8, for a user who wants to understand the situation before acting on either action above. |

**What this screen must never say.** Anything implying the user mistyped, misremembered, or did something wrong. That framing is precisely what the earlier "Record Mismatch" name got wrong, and `microcopy.md` carries this constraint into every string on this screen.

---

## S7 — Submit a Dispute

**Traces to:** #2 (D13 fallback). **Persona:** P1.

| Block | Content |
|---|---|
| Explanation | States this route exists for cases the automatic claim can't resolve on its own, and that a person will review it — set expectations honestly rather than promising speed the evidence doesn't support (per `decisions.md` D2's standard). |
| Fields | Whatever the review needs that S2 didn't already capture — e.g. proof of purchase or an ownership document reference. Exact field list is a form-design decision for `component-spec.md`, not authored here. |
| Submit action | Confirms the dispute is queued (mocked). |
| Confirmation state | Plain-language statement of what happens next, without a fabricated timeline. |

**Boundary, per `user-flows.md` Flow 3 step 5.** No screen beyond this one exists in the prototype — an officer's review outcome is not simulated.

---

## S8 — Help & Answers

**Traces to:** #16. **Persona:** P1.

Answers, each addressing a question named directly in `problems.md` #16 or its neighbouring evidence:

| Question | Answer approach |
|---|---|
| "Do I need to register again?" | Yes if the vehicle has changed hands or previously had a Fuel Pass/QR — points back to S2. |
| "Can I use my old QR code?" | No — superseded on reissue; restates the S5 note for anyone who arrives here before registering. |
| "Where do I find my chassis number?" | Links to S3 rather than duplicating its content. |
| "What about a 48cc bike with no number plate?" | Per D9: this case has no persona and no designed flow behind it. The answer is a routing statement — contact CPC directly — stated as exactly that, not dressed up as a resolved feature. |
| "I'm registering a brand-new vehicle for the first time — is this the right place?" | States plainly that this covers vehicles that have been registered or had a Fuel Pass before; first-time registration is handled separately (P7, D8 — not built here). |

**Escape hatch.** Any answer that doesn't resolve the user's actual situation links onward to S7, per `user-flows.md` Flow 6 step 4 — S8 does not strand a user who needed the dispute path instead.

---

## S9 — Station Scan

**Traces to:** #23a. **Persona:** P2.

| Block | Content |
|---|---|
| Default / ready state | Camera view, minimal chrome — nothing competing with scan speed for attention. |
| Success state | Vehicle registration number and a clear positive indicator. Auto-clears to ready state — no dismissal tap required (Flow 7). |
| Rejection state | Vehicle registration number, a clear negative indicator, and the specific reason (e.g. superseded pass) — never a bare "invalid." This is the direct answer to `R §5-6`'s "clear rejection reasons" constraint (Flow 8). |
| Offline indicator | Persistent, non-blocking banner while connectivity is down, with the last-sync timestamp visible (Flow 10). It sits alongside the camera view, not over it. |
| Fallback entry point | A visible "Can't scan? Enter manually" action, always present, not only surfaced after a failure — since `problems.md` #11 records stations that couldn't scan *at all*, waiting for a failure to offer the alternative would recreate the block for that case. |

**Speed is a content decision here as much as an engineering one.** No confirmation dialogs, no multi-step acknowledgement — every added tap is time `R §2.4` says operators will spend routing around the scan instead.

---

## S10 — Scan Couldn't Complete

**Traces to:** #11. **Persona:** P2.

| Block | Content |
|---|---|
| Headline | States that the *scan* failed — camera or QR condition — never implying anything about the vehicle's validity. Kept verbally and visually distinct from S9's rejection state, per `user-flows.md` Flow 8's note on why the two are not the same screen. |
| Manual entry field | Vehicle registration number, printed on the disc under the QR. |
| Submit action | Validates at the same speed as a scan (Flow 9) — the fallback is slower only by typing time, never by system response time. |
| Result | Renders using the same success/rejection states as S9, not a separate result screen — one visual language for "here's the answer," regardless of how the vehicle got looked up. |
| Return | Back to S9 ready state after each result. |

---

## Cross-screen content principles

Carried across all ten screens, stated once here rather than repeated ten times:

1. **Fault attribution is checked on every screen that can report a failure.** S6 and S2's inline error are the two places this project got wrong once already (`sitemap.md`'s S6 rename); every other failure state is checked against the same standard before it ships.
2. **No screen states a resolution time D13's or D15's evidence doesn't support.** S7's confirmation and S10's offline-queue messaging both avoid promising a duration.
3. **English only**, per `CLAUDE.md`'s scope boundary — `sitemap.md` §8 records this explicitly so it reads as a stated exclusion, not a silent gap.
