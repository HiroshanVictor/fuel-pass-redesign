# 02-ideation / user-flows.md

**Project:** Fuel Pass redesign — proposal prototype for the CPC director board
**Sources:** `sitemap.md`, `decisions.md` D13, D14, D15, D16 — sole sources.
**Scope note:** every flow below moves between the ten screens `sitemap.md` names. No flow introduces a screen, field, or system behaviour not already named there.

---

## 1. Flow index

| # | Flow | Persona | Screens touched | Outcome |
|---|---|---|---|---|
| 1 | Clean-match registration (happy path) | P1 | S1 → S2 → S4 → S5 | Fuel Pass issued |
| 2 | Previous-owner override, self-service succeeds | P1 | S1 → S2 → S4 → S6 → S5 | Fuel Pass issued via override claim |
| 3 | Previous-owner override, self-service declined | P1 | S1 → S2 → S4 → S6 → S7 | Dispute submitted, pending review |
| 4 | No record found at S4 (partial match, or no match at all) | P1 | S2 ⇄ S4 (inline) | Corrected and re-submitted, or routed to S8 |
| 5 | Finding the chassis number mid-form | P1 | S2 → S3 → S2 | Returns to form informed |
| 6 | General help lookup | P1 | S1 / S2 / S6 / S7 → S8 | Question answered, or routed to S7 |
| 7 | Station scan, clean pass (happy path) | P2 | S9 | Vehicle waved through |
| 8 | Station scan, valid scan, invalid pass | P2 | S9 | Vehicle refused, reason shown |
| 9 | Scanner or QR failure → manual entry | P2 | S9 → S10 → S9 | Vehicle waved through via manual match |
| 10 | Station goes offline mid-shift | P2 | S9 → S10 → S9 | Transactions continue on cached data, queued for sync |

---

## 2. Flow 1 — Clean-match registration (happy path)

**Traces to:** #2. **Persona:** P1.

1. User opens the app. **S1 — Start.** Two options are presented, addressing the #16 question "do I need to register again?" head-on rather than assuming: *"Set up my Fuel Pass"* and *"I already have one — check my status."* This flow follows the first.
2. **S2 — Find Your Vehicle.** User enters vehicle registration number and chassis number.
3. User submits. System begins the RMV/chassis lookup. **S4 — Verifying Your Vehicle**, artificial delay per D15/D16.
4. Lookup returns a record with no previous-owner conflict.
5. **S5 — Fuel Pass Issued.** QR code displayed, vehicle details shown, and an explicit note that any Fuel Pass QR issued before this one is no longer valid — this is the direct answer to the #16 question "can I use my old QR code?", stated at the moment it is most relevant rather than left for the user to find in a help article.

**No failure branch in this flow.** Failure branches from step 3 onward are Flows 2–4.

---

## 3. Flow 2 — Previous-owner override, self-service succeeds

**Traces to:** #2. **Persona:** P1. **Depends on:** D13 (self-service primary), the assumption in `sitemap.md` §3.

1. Steps 1–3 as Flow 1.
2. Lookup returns a record that matches the vehicle and chassis number, but the record still shows a previous owner. This is **not** a data-entry problem — the numbers matched.
3. **S6 — Still Registered to a Previous Owner.** The screen states plainly that this is the system's record lagging behind a real sale, not something the user got wrong, and offers one primary action: *"This is my vehicle — claim it."*
4. User selects the primary action. No further document upload, no additional field — the vehicle number and chassis number already entered are the claim's evidence, per the same mechanism that shipped 19 March.
5. **S5 — Fuel Pass Issued.** Same screen as Flow 1's outcome. Internally, this instance is logged as an override claim rather than a clean match — see `screen-content.md` for whether that distinction ever surfaces to the user.

**This is the flow the assumption in `sitemap.md` §3 is about.** Step 4 is where a false claim would succeed exactly as easily as a true one.

---

## 4. Flow 3 — Previous-owner override, self-service declined

**Traces to:** #2. **Persona:** P1. **Depends on:** D13 (dispute as fallback).

1. Steps 1–3 as Flow 2, arriving at **S6**.
2. User does not take the primary claim action — either because they are unsure it's appropriate (e.g. the sale isn't fully settled, or a family member's name is on the old record) or because they select the secondary action, *"This isn't my situation — get help."*
3. **S7 — Submit a Dispute.** The manual, document-mediated path per D13: user is told an officer will review the claim, and is asked for whatever is already implied as necessary by that review (proof of purchase, an ownership document) — not a re-entry of data already captured at S2.
4. System confirms the dispute is queued (mocked) and gives a plain-language expectation of what happens next. It does not promise a resolution time D13's evidence doesn't support one, and inventing one would be exactly the kind of confident-but-unverified claim `decisions.md` D2 exists to avoid.
5. **No screen beyond S7** in this flow. The prototype does not simulate an officer's review outcome — that decision would require modelling a back-office role nowhere in D15's scope.

**This flow ends the prototype's ability to demonstrate resolution.** That is a deliberate boundary, not an oversight: `problems.md` #2 records the override as removing the block for those it can resolve automatically; the residual manual-review population is real but is a CPC operations question, same class as the multi-vehicle policy question in D6.

---

## 5. Flow 4 — No record found at S4

**Traces to:** #2 (this is the form validation around the same mechanism, not a new problem). **Persona:** P1.

1. Steps 1–2 as Flow 1: user reaches **S2**, enters a vehicle number and/or chassis number.
2. Lookup at **S4** returns no matching record — and branches on *how much* didn't match (D20, `decisions.md`):
   - **Partial match** — one field matches a known record, the other doesn't. Genuinely typo-shaped: the system has evidence the vehicle exists and something was still entered wrong. Control returns to **S2** with a message asking the user to double-check what they entered.
   - **No match at all** — neither field matches anything. This is *not* treated as "more likely a typo" — the mock (and, arguably, DMT ownership data on its own) has no basis to prefer a typo over any other cause, including a vehicle that has simply never been in the system. Control returns to **S2** with a message that names the ambiguity honestly and points to S8 for the brand-new-vehicle case, rather than guessing.
3. Neither message implies the vehicle isn't registrable, and neither navigates to a new screen — both are corrected in place. Both are worded distinctly from S6's "found, but claimed" message, so a genuine record match is never confusable with either kind of non-match.
4. User corrects and resubmits (partial-match case), or follows the S8 link (no-match case), or both.

**Why this isn't a screen.** `gap-analysis.md` C6 names clear validation errors (`F 13`) as required by `R §5-6`, and an inline correction is the direct reading of that — routing either case through a whole extra screen would add a step the evidence doesn't ask for. Splitting the message in two (D20) is a copy-accuracy fix, not a scope change: it still doesn't reopen P7 (`decisions.md` D8) as a build target.

---

## 6. Flow 5 — Finding the chassis number mid-form

**Traces to:** #16. **Persona:** P1.

1. At **S2**, before or after starting to type, the user selects *"Where do I find my chassis number?"* next to that field.
2. **S3 — Locate Your Chassis Number.** Shows where the number is physically located on a vehicle (chassis plate, engine bay, or registration document), addressing `R §2.6`'s recorded question directly.
3. User returns to **S2** — the field they were on retains whatever they had already entered. This flow does not lose form progress, since the entire reason #16 is ranked B2 for P1 (not just B4) is that the missing answer gates the override itself; losing progress on the way to finding the answer would reintroduce the same gate.

---

## 7. Flow 6 — General help lookup

**Traces to:** #16. **Persona:** P1.

1. From **S1**, **S2**, **S6**, or **S7**, the user selects a persistent *"Help & Answers"* link.
2. **S8 — Help & Answers.** Answers, in plain language: *"Do I need to register again?"*, *"Can I use my old QR code?"*, and *"Where do I find my chassis number?"* (linking through to S3 rather than duplicating it).
3. One further entry answers the 48cc unplated-vehicle question named in `problems.md` #16 and left deliberately unpersonated by D9. Per D9, this is stated explicitly: the answer given is a routing statement — contact CPC directly — not a designed flow, because no persona and no evidence back a designed flow for this case.
4. User returns to whichever screen they came from. If the question they had isn't answered here, the same link that reaches S7 from S6 is offered again — S8 does not dead-end a user who needed S7 instead.

---

## 8. Flow 7 — Station scan, clean pass (happy path)

**Traces to:** #23a. **Persona:** P2.

1. **S9 — Station Scan** is the operator's resting screen — camera view active, ready to scan.
2. Operator scans the customer's QR code.
3. Validation returns instantly — **no artificial delay**, per D15's explicit contrast with S4 and the reasoning in `sitemap.md` §4.
4. S9 shows a clear, glanceable success state (vehicle number, a positive indicator) and returns to the ready state for the next scan without requiring a tap to dismiss — every extra tap is time `R §2.4` says operators will route around by not scanning at all.

---

## 9. Flow 8 — Valid scan, invalid pass

**Traces to:** #23a (clear rejection reasons, the third stated constraint in `R §5-6` alongside speed and offline tolerance). **Persona:** P2.

1. Steps 1–2 as Flow 7.
2. The scan itself succeeds — the QR reads cleanly — but the record it points to is not valid (for example, a Fuel Pass that was superseded per Flow 1's "old QR" note).
3. **S9 shows a rejection state, not an error state.** The distinction matters: nothing malfunctioned. The screen states the specific reason in operator-facing language and stays on S9 — this is not a scan failure, so it does not route to S10.
4. Operator informs the customer and returns to the ready state.

**Why this stays on S9 and Flow 9 goes to S10.** Conflating "the scan didn't work" with "the scan worked and said no" is exactly the ambiguity `R §5-6`'s "clear rejection reasons" constraint exists to prevent, and collapsing them onto one screen would recreate that ambiguity in the design.

---

## 10. Flow 9 — Scanner or QR failure → manual entry

**Traces to:** #11. **Persona:** P2.

1. At **S9**, the scan does not complete — camera hardware fault, or a QR too damaged or glare-affected to read.
2. **S10 — Scan Couldn't Complete.** States plainly that the scan itself failed (not the vehicle's validity — the two messages in this document are kept visually and verbally distinct throughout, same principle as Flow 4 versus Flow 2/3). Offers manual entry of the vehicle registration number, printed on the disc under the QR.
3. Operator types the vehicle number. Validation runs at the same speed as Flow 7's scan — the manual path is slower only by however long typing takes, never slower on the system's side, per the #23a speed constraint applying to every path, not only the primary one.
4. Result (valid or invalid) displays exactly as it would on S9 in Flow 7 or Flow 8.
5. Operator returns to **S9**, ready state, for the next customer's scan.

---

## 11. Flow 10 — Station goes offline mid-shift

**Traces to:** #11 (offline station operation named directly as a missing resilience pattern) and #23a (`R §5-6`'s offline-tolerance constraint). **Persona:** P2.

1. Connectivity drops. **S9** shows a persistent, non-blocking offline indicator — scanning continues, it does not stop the screen.
2. Each scan or manual entry (Flow 7–9's mechanics, unchanged) validates against the **last-synced local record set**, with a visible timestamp of when that snapshot was taken. This is the offline-tolerant instantiation of the same enforcement the online path performs — not a suspension of it. Silently waving every vehicle through while offline would reproduce `problems.md` #23 (dispensing without scanning), the exact failure this build is scoped to design against via #11/#23a.
3. Transactions made offline are queued, marked as **pending sync** to the operator (not to the customer — this is an operations detail, not a customer-facing rejection reason).
4. Connectivity returns. Queued transactions sync automatically; the offline indicator clears. No action is required from the operator to trigger this.

**Boundary of this flow.** The prototype does not simulate what happens if a queued offline transaction conflicts with a record change made elsewhere in the meantime (for example, a dispute at S7 resolving against a vehicle that was waved through offline in the interim). That reconciliation is a back-office question of the same class excluded from Flow 3 step 5, and is not designed here.
