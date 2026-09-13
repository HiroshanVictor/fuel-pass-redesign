# 02-ideation / sitemap.md

**Project:** Fuel Pass redesign — proposal prototype for the CPC director board
**Sources:** `decisions.md` D15, D16 (scope), `problems.md` §9, `gap-analysis.md` §3/§6, `users.md` §9 — sole sources.
**Rule in force:** every screen below must trace to one of the four problems named in D15. A screen that cannot is not built. D16 records the one stated exception.

---

## 1. What this build is

Two personas, ten screens, four problems (`decisions.md` D15):

| Persona | Problem | Rank/Band | One line |
|---|---|---|---|
| P1 — second-hand vehicle owner | #2 | B1→B2 | Stale ownership records make the vehicle unregistrable |
| P1 — second-hand vehicle owner | #16 | B4 (B2 for P1) | Four basic questions went unanswered, chassis number foremost |
| P2 — station operator | #11 | B3/B4 | Stations could not scan |
| P2 — station operator | #23a | B5, causal lever | Scanning was slower and less reliable than not scanning |

Two journeys, not one: a **citizen journey** (S1–S8) carrying P1 through override and registration, and a **station journey** (S9–S10) carrying P2 through scan and fallback. They never intersect on screen — the only thing they share is the record a scan checks against, which is a data dependency, not a navigation path.

---

## 2. Screen inventory

| ID | Screen | Persona | Traces to | Type | Simulated per D15 |
|---|---|---|---|---|---|
| S1 | Start | P1 | #16 | Entry / disambiguation | — |
| S2 | Find Your Vehicle | P1 | #2 | Form (happy path start) | — |
| S3 | Locate Your Chassis Number | P1 | #16 | Contextual help | — |
| S4 | Verifying Your Vehicle | P1 | **#2** (reason to exist) · delay surfaces **#4**, exception per D16 | Wait state | RMV/chassis lookup carries an artificial delay |
| S5 | Fuel Pass Issued | P1 | #2 | Success | — |
| S6 | Still Registered to a Previous Owner | P1 | #2 | Failure — self-service retry | Mocked previous-owner-on-file outcome |
| S7 | Submit a Dispute | P1 | #2 (D13 fallback) | Failure — human-mediated fallback | Mocked queue confirmation |
| S8 | Help & Answers | P1 | #16 | Content hub | — |
| S9 | Station Scan | P2 | #23a | Operational (happy path + inline success) | Validation is instant — deliberately not delayed |
| S10 | Scan Couldn't Complete | P2 | #11 | Failure — hardware/offline/manual fallback | Mocked offline state, mocked manual match |

Ten screens. Four problems named by D15, plus one named exception (D16, on S4 only).

**On S6's name.** Renamed from an earlier "Record Mismatch" draft, which was wrong: the chassis number *matches* — nothing about the user's input is incorrect. What's stale is our record of who owns the vehicle. This distinction carries forward into every piece of copy for this screen in `screen-content.md` and `microcopy.md`: the language must say *our records haven't caught up*, never *check what you entered* or anything implying user error.

---

## 3. Assumption flagged — chassis number is possession evidence, not identity proof

`[ASSUMPTION]`, inherited from D14 and sharpened here because S6 is exactly where it becomes concrete.

S2's override — vehicle number plus chassis number, no human in the loop — treats whoever can read both numbers off the vehicle as its rightful claimant. That is consistent with the mechanism that actually shipped on 19 March (`R §2.3`) and with the reasoning in D13 and D14. But it is **possession evidence, not identity proof.** Anyone standing next to the vehicle can read a chassis plate.

The fraud surface this opens — a bystander, or a fraudulent seller, claiming a vehicle before its rightful new owner does — is a direct trade-off against the stale-ownership problem this prototype is built to solve. Fixing #2 with an instant, document-free self-service claim is exactly what makes a false claim equally instant and equally document-free. This is not resolved in the prototype. It is a board decision, and it should be presented next to D14 as its trade-off, not underneath it as a settled implementation detail.

**Affects:** S2, S4, S6 — anywhere the override actually executes.

---

## 4. Why S4 is slow and S9 is fast

This is the sharpest content decision in the sitemap and it comes straight from the evidence, not from taste.

- **S4 (citizen lookup)** simulates the actual constraint named in `R §5-1` and ranked #4 in `problems.md`: the RMV dependency is slow under load, and the experience layer — not the backend — has to answer for that. D15 chose to make this **visible**, not hidden behind a spinner that lies about how fast the system is. Because #4 is not one of D15's four named problems, `decisions.md` D16 records this delay as a stated exception to the trace rule, so it isn't quietly smuggled in under S4's real trace, which is #2.
- **S9 (station scan)** simulates the opposite lesson from `R §2.4` and `P #23a`: *if scanning is slower or less reliable than waving a customer through, operators will wave customers through.* A slow S9 would recreate the exact failure it exists to fix. So S9 is built to feel instant, and S10 exists precisely for the moments it can't be.

One prototype, two deliberately opposite pacing decisions, both traceable to named evidence — one of them through a named exception rather than a direct trace.

---

## 5. Navigation map

```
                                   ┌─────────────────────┐
                                   │   S1 · Start          │
                                   │  (#16 — "do I need    │
                                   │   to register again?")│
                                   └──────────┬───────────┘
                                              ▼
                         ┌───────────────────────────────┐
              ┌─────────▶│ S2 · Find Your Vehicle (#2)     │◀── "try again" from S6 / S7
              │          │  vehicle no. + chassis no.      │
   "where's my│          └──────────────────┬─────────────┘
   chassis    │                             │ submit
   number?"   │                             ▼
              │          ┌───────────────────────────────┐
    ┌─────────┴──────┐   │ S4 · Verifying Your Vehicle      │
    │ S3 · Locate     │   │  (#2; delay is a D16 exception   │
    │ Your Chassis    │   │   that surfaces #4)              │
    │ Number (#16)    │   └──────────────────┬─────────────┘
    └─────────────────┘                      │
              ▲          ┌────────────────────┼────────────────────────┐
              │          ▼                    ▼                        ▼
      "still stuck?"  clean match,   record found, but          no record found —
              │        no prior owner   previous owner still     mistyped input,
              │          │              on file (our data,       inline error back
              │          ▼              not the user's mistake)  to S2 (not a new
              │   ┌─────────────┐              │                 screen; see
              │   │ S5 · Fuel   │◀─────────────┤ claim succeeds  `user-flows.md`)
              │   │ Pass Issued │              ▼
              │   │   (#2)      │   ┌─────────────────────────┐
              │   └─────────────┘   │ S6 · Still Registered to   │
              │          ▲          │   a Previous Owner (#2)    │
              │          └──────────┤   "our records, not your   │
              │           claim     │    mistake" + Claim action │
              │           succeeds  └──────────────┬─────────────┘
              │                          can't self-claim /       
              │                          wants help                
              │                                    ▼
              │                         ┌─────────────────────┐
              └─────────────────────────┤ S7 · Submit a          │
                        "try again"     │   Dispute (#2)         │
                                        └─────────────────────┘

     S1, S2, S6, S7 all link out to:
                                   ┌─────────────────────┐
                                   │ S8 · Help & Answers   │
                                   │   (#16)               │
                                   └─────────────────────┘


  ── station journey, separate device/context ──────────────────────────────

                                   ┌─────────────────────┐
                          ┌───────▶│ S9 · Station Scan      │
                          │        │   (#23a)               │
                          │ scan   │ [no artificial delay]  │
                          │ again  └──────────┬───────────┘
                          │                   │
                          │        scanner fails / offline /
                          │        record mismatch at pump
                          │                   ▼
                          │        ┌─────────────────────┐
                          └────────┤ S10 · Scan Couldn't    │
                                   │   Complete (#11)       │
                                   └─────────────────────┘
```

---

## 6. Where a successful self-service claim at S6 lands

**S5 — Fuel Pass Issued.** Same success screen as the direct clean-match path, reached two ways:

1. S4 finds the vehicle with no previous-owner conflict → straight to S5.
2. S4 finds the vehicle *with* a previous owner still on file → S6 → user asserts current ownership via the same self-service mechanism that shipped 19 March (D13) → S5.

Both are "success" from the user's side and both issue the same Fuel Pass. They are not identical underneath: path 2 is an override claim resting on the possession-not-identity assumption flagged in §3, and `screen-content.md` will decide whether S5 shows any distinguishing note when reached this way (an audit-log distinction, not necessarily a user-facing warning). If the self-service claim at S6 doesn't resolve — the user isn't confident asserting ownership, or a second signal contradicts the claim — S6's secondary action routes to S7, the manual dispute fallback (D13), rather than silently retrying.

A genuine no-match at S4 (mistyped vehicle or chassis number) is handled as an inline validation error, not a screen — see §5's diagram note and `user-flows.md`.

---

## 7. Entry points

- **P1 enters at S1.** No other entry point is built — there is no dashboard, no login-then-home, because none of that traces to #2 or #16.
- **P2 enters at S9.** The station screen *is* the operator's home screen. A separate operator landing page was considered and cut: nothing in `problems.md` #11 or #23a asks for one, and every screen not tied to a named problem is not built.
- S3 (chassis help) and S8 (FAQ hub) have no independent entry — they are reached only from within the citizen journey, because neither addresses a problem on its own outside that context.

---

## 8. Deliberately excluded

Named so the sitemap is auditable against D15, not just consistent with it.

| Excluded | Why | Where it's recorded instead |
|---|---|---|
| Multi-vehicle / second-registration screen | `problems.md` #1 is the highest-harm problem in the whole set, but it is policy-owned (D6) and not one of D15's four. A refusal-experience screen for it was considered and is explicitly out of this build. | Board argument in the proposal narrative, per D6 |
| New-vehicle registrant entry point | P7 is a stub with no board argument yet (D8). | `users.md` P7, interview backlog |
| Dashboard / quota balance / transaction history | `gap-analysis.md` C5 (F17, F20) — flagged as assumption, not evidenced, and not one of D15's four problems. | `gap-analysis.md` §3 C5 |
| Mobile-number update / OTP recovery screens | Superseded by D14 — identity no longer anchors on mobile number, so `problems.md` #5 and #9 lose their build rationale even though they remain in the ranked list. | `decisions.md` D14 |
| Odd/even plate-day check | `problems.md` #10 is policy (Ministry-set), not one of D15's four. | `problems.md` §9.2 |
| Admin/policy management console | `gap-analysis.md` C8 — over-scoped for a board demo per `research.md` §8. | `gap-analysis.md` §3 C8 |
| Support ticket system, announcements | `gap-analysis.md` C9 — well-evidenced (#7, #22) but not among D15's four; a ten-screen prototype cannot carry a sixth problem without cutting one of the four. | `gap-analysis.md` §3 C9 |
| Trilingual delivery (language switcher, or Sinhala/Tamil copy in `microcopy.md`) | `gap-analysis.md` C10 (F2) is well-evidenced and `problems.md` #17 is real, but neither is one of D15's four, and `CLAUDE.md` names "full localisation" as out of scope for this board demo outright. `microcopy.md` is English-only for that reason — not because the requirement was judged unimportant. Caught on review as the same class of quiet scope-bend as the S4/#4 issue D16 exists to prevent; corrected here instead of repeated. | `CLAUDE.md` Out of scope; `problems.md` #17 |
| 48cc unplated-vehicle flow | `problems.md` §6 — deliberately unpersonated (D9). Its question appears as one FAQ entry in S8, marked as unpersonated content, not as a flow. | `screen-content.md` S8 |
| Station receipts | `gap-analysis.md` C7 (F29) — flagged silent, no evidence anyone asked for one. | `gap-analysis.md` §3 C7 |

---

## 9. Open question before Step 2 continues

None outstanding. Proceeding to `user-flows.md`, `screen-content.md` and `microcopy.md`.
