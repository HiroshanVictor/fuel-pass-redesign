# 01-discovery / gap-analysis.md

**Project:** Fuel Pass redesign — proposal prototype for the CPC director board
**Compiled:** September 2026
**Sources:** `research.md`, `users.md`, `problems.md`, `feature-list.md` — sole sources. No external facts, figures or quotes have been added.
**Subject:** The 44 proposed features in `feature-list.md`, extracted from §29 of the teammate's requirements document.

> **What this file is for.** `feature-list.md` is the confident, domain-expert-sounding artifact that arrived before the research was done. `research.md` §8 instructs that each proposed feature be tested against evidence, and that features with nothing behind them be cut or flagged as assumptions. This is that test, plus the reverse test `research.md` §8 begins and does not finish: which of our documented problems the list fails to address at all.

---

## 1. Citation key

| Prefix | Refers to |
|---|---|
| `R §x` | `research.md`, section number with descriptor |
| `U §x` | `users.md`, section number |
| `P #n` | `problems.md`, ranked problem number |
| `P §x` | `problems.md`, section number |
| `F n` | `feature-list.md`, numbered feature |
| `P1`–`P7` | Personas per `users.md` §3–§4 |

---

## 2. Method

### 2.1 Clustering

All 44 items are placed in 12 clusters. **Nothing is dropped and nothing appears twice** — the item numbers in §3 reconcile to 44, checked in §4. One verdict is issued per cluster; where a cluster splits, the split is stated by item number.

### 2.2 Evidence stance

For each cluster, three possible stances toward the evidence:

| Stance | Meaning |
|---|---|
| **Supports** | Our evidence shows the problem this feature addresses is real and documented. |
| **Contradicts** | Our evidence shows this feature, as named, would cause or preserve a documented harm. Rare, and stated with the specific citation that contradicts it. |
| **Silent** | Nothing in our evidence speaks to it either way. Silence is not disproof; it is an absence of grounds. |

Most clusters are mixed. Where they are, the stance is given per item.

### 2.3 Verdicts

| Verdict | Meaning |
|---|---|
| **Keep** | Evidence supports it. Build it, or carry it into the proposal. |
| **Cut** | Remove from the board-demo scope. |
| **Flag as assumption** | Evidence is silent. It may be right; it is unvalidated, and must be labelled as our inference rather than presented to the board as a finding. |

**Two different cuts.** `research.md` §8 distinguishes features with *no evidence behind them* from features that are *over-scoped for a board demo*. These are not the same judgement and are recorded separately:

- **Cut (scope)** — evidence may well support it; it does not belong in a ten-screen prototype. Stays in the proposal narrative.
- **Cut (no evidence)** — nothing in our research argues for it at all.

### 2.4 The limitation that governs this entire file

**We have 44 feature names. We do not have 44 specifications.** `feature-list.md` is an extract of a summary list; the behaviour behind each name is not stated. Every judgement below about what a feature *does* is an inference from its title.

This matters most where a name is plausibly broad enough to cover a gap we have marked absent — `F 22`, *vehicle-information update*, may or may not include creating a registration against a vehicle someone else already holds. **Every such inference is marked `[ASSUMPTION]` at the point it is made.** Reading the parent document's relevant section would resolve most of them, and that is the cheapest correction available to this analysis.

---

## 3. Cluster verdicts

### C1 — Registration entry and identity
**Items:** `F 3` step-by-step registration · `F 4` identity-type selection · `F 5` NIC, passport and BRN support *where permitted* · `F 12` duplicate detection · `F 25` company and government vehicle support

**Stance: mixed — supports, and contradicts on its most important item.**

- **Supports.** The identity model is real: one NIC, passport or BRN is the documented basis of the system (`R §5-5`). A separate channel for vehicles supporting national production and essential services already exists in policy (`R §3`, separate channels), which is `F 25`'s evidential basis.
- **Contradicts — `F 12`, duplicate detection.** Our evidence does not show duplicate detection failing to catch duplicates. It shows the opposite: detection worked and rejected legitimate users. Second-hand owners were blocked because the previous owner's record persisted (`R §2.1`, `P #2`); the same QR code or mobile number ended up claimed by several people while valid users were rejected because records no longer matched (`R §2.2`, stale 2023 data). Proposing duplicate detection as a feature to strengthen, with no counterpart for resolving a false positive, points the redesign at the wrong end of the documented failure.
- **Contradicts — `F 5`'s "where permitted".** Three words that quietly settle the most harmful problem in `problems.md`. `P #1` is ranked first precisely because the one-identity-one-vehicle rule is total and was never fixed, and `R §5-5` states explicitly that whether to keep that rule is a design question for the board, not a given. The feature list treats it as given.

**Verdict: Keep `F 3`, `F 4`, `F 5`, `F 25`. Flag `F 12` as assumption** — the assumption being that the system's problem was under-detection rather than over-rejection.

**Condition on `F 5`:** carried into the proposal as an open question, not as a settled rule. `U §3` P4 records the board argument: essential-services vehicles already sit outside the one-per-identity rule, so the policy already admits exceptions.

---

### C2 — Vehicle verification and DMT integration
**Items:** `F 7` vehicle-number validation · `F 8` chassis-number validation · `F 9` vehicle-category validation · `F 10` fuel-type selection · `F 11` DMT integration

**Stance: mixed — one item strongly supported, one mis-scoped, one silent.**

- **Supports strongly — `F 8`, chassis-number validation.** This is the best-evidenced item in the entire list. `R §2.2` names mobile number as primary identifier a modelling error and chassis or engine number as more stable; the 19 March override that unblocked stale registrations required vehicle number plus chassis number (`R §2.3`); `U §5` builds its central argument on it.
- **Supports — `F 9`.** Quota is assigned by vehicle category (`R §3`, quota table), so category is load-bearing.
- **Contradicts by mis-scoping — `F 11`, DMT integration.** `research.md` §8 names this specifically: the RMV latency constraint is listed as an integration item rather than as the defining experience constraint. `R §2.2` states the dependency determines whether registration can be synchronous at all, and `R §5-1` makes it the primary constraint on the redesign. `P #4` ranks the resulting collapse fourth by harm. A one-line integration item is not a wrong feature; it is a wrong **weight**, and the weight is the whole finding.
- **Silent — `F 10`, fuel-type selection.** Nothing in `research.md` mentions fuel type. Quotas are by vehicle category, not fuel (`R §3`).

**Verdict: Keep `F 7`, `F 8`, `F 9`. Keep `F 11` but re-weight** as the primary constraint per `R §5-1`. **Flag `F 10` as assumption.**

**Condition on `F 8`:** asking for a chassis number collides with `P #16` — where to find the chassis number is one of the four questions the system never answered (`R §2.6`). Validating a field nobody can locate converts a fix into a block.

---

### C3 — Credential delivery and phone as identity
**Items:** `F 6` mobile-number verification through OTP · `F 21` mobile-number update · `F 24` lost-phone recovery

**Stance: mixed — recovery supported, the identity anchor contradicted.**

- **Supports — `F 21`, `F 24`.** Numbers get recycled and disconnected (`R §2.2`); remediation required the Ministry of Digital Economy working with Dialog, Mobitel and Hutch to strip deactivated numbers (`R §2.3`). `P #9` is the ranked problem these two address.
- **Contradicts — `F 6` as the identity anchor.** OTP by SMS is the documented mechanism of `P #5`: OTPs arrived after their two-minute validity had already expired (`R §2.1`). `U §5`, the strongest argument in that file, holds that the behaviour the system provokes under crisis load — borrowing phones when an OTP cannot arrive in time — is precisely what a phone-anchored identity model cannot survive. `P §5` traces `P #2`, `P #9` and `P #12` back to the same root.

**Verdict: Keep `F 21`, `F 24`. Flag `F 6` as assumption** — the assumption being that SMS OTP is the right verification channel under national concurrent load. Note that verifying a phone and *identifying a person by* a phone are different things; the list does not distinguish them, and `U §5` argues the distinction is the whole problem. `[ASSUMPTION]` — that `F 6` implies the latter is an inference from the name.

---

### C4 — QR lifecycle
**Items:** `F 14` QR-code generation · `F 15` QR-code download and printing · `F 16` QR-code retrieval · `F 41` offline QR access

**Stance: supports throughout.** No contradictions, no silence.

- Printing and offline access are directly evidenced: offline station operation was among the resilience patterns missing at launch (`R §2.2`), and `R §5-6` makes offline tolerance a stated constraint. The print requirement underpins `R §4`'s low-end-phone row.
- `F 16` answers a question users actually asked — whether an old QR code still works (`R §2.6`).

**Verdict: Keep all four.** Alongside C6 and C7, the best-supported cluster in the list.

---

### C5 — Dashboard and quota visibility
**Items:** `F 17` user dashboard · `F 18` weekly quota display · `F 19` used and remaining quota display · `F 20` transaction history

**Stance: mixed — supported but insufficient, and silent in two places.**

- **Supports — `F 18`, `F 19`.** The cycle runs weekly, resets Sunday at midnight, and carries nothing forward (`R §3`). A silent change to someone's weekly litres is a livelihood event (`R §3`, design implication; `P #15`).
- **Insufficient, not wrong.** Quota display alone does not tell a user whether they may refuel today. The odd/even final-plate-digit rule is a second rationing layer stacked on the quota (`R §3`; `R §5-7`; `P #10`), and `U §3` P3 states plainly that a correct quota balance alone is not sufficient information to act on. The cluster answers *how much* and never *whether today*.
- **Silent — `F 17`, `F 20`.** Nothing in our evidence records anyone asking for a dashboard or for transaction history. They may be sensible; they are not findings.

**Verdict: Keep `F 18`, `F 19`. Flag `F 17`, `F 20` as assumptions.**

---

### C6 — Error recovery and dispute
**Items:** `F 13` clear validation errors · `F 22` vehicle-information update · `F 23` duplicate-registration dispute process

**Stance: supports throughout.** `research.md` §8 already lists the error-recovery centre and dispute flow as well supported.

- `F 13` is required by `R §5-6`, which makes clear rejection reasons a constraint, and addresses `P #16`.
- `F 22` and `F 23` map onto `P #1` and `P #2`, the two highest-ranked problems in the file.

**Verdict: Keep all three.**

**Condition — and this is where the analysis is thinnest.** `research.md` §8 names the post-launch override flow as *absent* from the requirements document. `F 22` and `F 23` are the only candidates that could cover it. `[ASSUMPTION]` — from the names alone, both appear to presuppose an existing account: you update a vehicle you have registered, and you dispute a duplicate you encountered. P1's problem is that they cannot create the account in the first place, because someone else holds the record (`R §2.1`, `P #2`). If the parent document's §22 or §23 does cover account-less entry with vehicle plus chassis number, this condition falls away. **Checking that section is the single highest-value correction available to this file.**

---

### C7 — Station operations
**Items:** `F 26` fuel-station QR scanning · `F 27` manual QR entry · `F 28` transaction validation · `F 29` station receipts

**Stance: mixed — well supported, with one silence and one decisive omission.**

- **Supports.** `research.md` §8 lists the station portal as well supported. `F 27` answers a documented condition directly — some stations had no working QR reader on day one and pumped restricted quantities anyway (`R §2.4`, `P #11`). `F 28` matches the Fuel Station Owners' Association position that operators can verify all details, including the registered vehicle number, when scanning (`R §2.4`).
- **Silent — `F 29`, station receipts.** No evidence anyone asked for a receipt.
- **The omission.** Nothing in this cluster addresses **speed**. `R §2.4` states the failure condition outright: if scanning is slower or less reliable than waving a customer through, operators will wave customers through. `R §5-6` makes speed under queue pressure a stated constraint, and `P #23a` identifies it as the causal lever on both `P #23` and `P #11`. Every feature in this cluster fails if that condition is not met, and no feature in the list names it.

**Verdict: Keep `F 26`, `F 27`, `F 28`. Flag `F 29` as assumption.** The speed omission is carried to §5.2 as a reverse gap.

---

### C8 — Administration and policy management
**Items:** `F 31` administrative dashboard · `F 32` quota-policy management · `F 35` reports · `F 36` audit logging

**Stance: one strongly supported, three over-scoped.**

- **Supports — `F 32`.** The strongest policy-side item in the list. Quotas for seven vehicle categories changed within six days of launch (`R §3`); `R §5-2` makes policy volatility a constraint requiring everything policy-shaped to be configurable and versioned; `research.md` §8 lists configurable policy as well supported; `P #15` is the ranked problem.
- **Over-scoped — `F 31`, `F 35`, `F 36`.** `research.md` §8 names a full admin reporting suite as over-scoped for a board demo. `[ASSUMPTION]` — that audit logging serves the PDPA obligations in `R §5-4` is our inference; `research.md` does not connect them.

**Verdict: Keep `F 32`. Cut (scope) `F 31`, `F 35`, `F 36`** — out of the prototype, retained in the proposal narrative. These are not unevidenced; they are not demonstrable in ten screens.

---

### C9 — Support and communication
**Items:** `F 33` support-ticket system · `F 34` announcements · `F 43` clear documentation

**Stance: supports throughout.** Among the best-evidenced clusters, and the one the March failure argues for most directly.

- The 1919 helpline was reported not working (`R §2.1`); official posts contained no working helpline number and no link to the registration portal (`R §2.5`); across 4,000+ comments on five official and news posts, not a single official account responded, and the Government Information Department's own post functioned as a complaints board rather than an information channel (`R §2.5`). These are `P #7` and `P #22`.
- `F 34` addresses `P #15` — users need to be told when their allocation changes (`R §3`, design implication).
- `F 43` addresses `P #16`. `R §2.6` states the four unanswered questions should have been answered in trilingual official communications before go-live, and calls this a content design failure squarely within our job.

**Verdict: Keep all three.**

**Condition on `F 33`.** `P #22`'s class is operations and policy with a design surface: a support-ticket system does not staff itself. `[ASSUMPTION]` — that an unstaffed ticket queue reproduces the 4,000-unanswered-comments failure in a new container is our inference; `research.md` documents the failure, not its repetition. Worth stating to the board, because the board owns the staffing decision and the product cannot.

---

### C10 — Access, language and reach
**Items:** `F 1` clear and mobile-first homepage · `F 2` Sinhala, Tamil and English language support · `F 37` accessibility compliance · `F 40` low-bandwidth support

**Stance: mixed — two supported, two resting on assumptions.**

- **Supports — `F 2`.** `R §5-3` makes trilingual delivery a constraint, and `P #17` is ranked above its evidence weight precisely because `U §6` establishes that the source comment analysis covers Sinhala and English posts, under-representing Tamil speakers.
- **Supports — `F 37`.** `research.md` §8 lists accessibility as well supported.
- **Silent — `F 1`.** No evidence in `research.md` on device split or homepage behaviour.
- **Assumption inherited, not created — `F 40`.** `R §4` marks the low-end-phone and poor-connectivity group `[ASSUMPTION]` in the research itself, strongly implied but unquantified. `P #19` is listed unranked for the same reason. The feature and the problem rest on the same unvalidated claim.

**Verdict: Keep `F 2`, `F 37`. Flag `F 1`, `F 40` as assumptions** — `F 40` flagged as inherited, with the validation already assigned to interviews by `R §9`.

**Condition on `F 2`.** `R §5-3` scopes trilingual delivery to error messages, SMS templates and printable material, not only interface labels. `[ASSUMPTION]` — that "language support" as named means interface strings is an inference from the title. If so, the item is narrower than the constraint it claims to satisfy.

---

### C11 — Security, data handling and resilience
**Items:** `F 30` fraud detection · `F 38` secure data handling · `F 39` high availability

**Stance: mixed — one supported, one ambiguous, one out of scope.**

- **Supports — `F 38`.** `R §2.5` records no privacy impact assessment, no clear lawful basis for processing and no meaningful informed consent, with citizens describing the previous owner's details appearing on their account. `R §5-4` makes PDPA compliance a constraint. `P #21` is the ranked problem.
- **Ambiguous — `F 30`, fraud detection.** Our evidence documents three different things called fraud, and this item plausibly addresses only the least documented of them. Groups illegally purchasing fuel in excessive quantities is a stated reason for reintroduction (`R §1`) — which supports the item. But the two fraud harms our research actually documents are **phishing against citizens** (`R §2.5`, `P #20`) and **stations dispensing without scanning via personal connections and small payments** (`R §2.4`, `P #23`), and an administrative fraud-detection surface addresses neither. `[ASSUMPTION]` — that `F 30` means system-side abuse detection rather than anti-phishing is an inference from placement among the admin items.
- **Out of scope — `F 39`.** `P #4` classes the collapse as infrastructure in origin, and `research.md` §8 names performance testing over-scoped for a board demo. High availability is a system property, not a designable surface. `R §2.2`'s argument is that the answer to the load problem sits at the experience level, which is C2's re-weighting, not an availability target.

**Verdict: Keep `F 38`. Flag `F 30` as assumption** pending a statement of which fraud it targets. **Cut (scope) `F 39`.**

---

### C12 — Validation of the work itself
**Items:** `F 42` testing with real users · `F 44` human review of AI-generated designs and content

**Stance: supports both, from different places.**

- **`F 42`** is required of us independently: `R §9` assigns usability testing of the prototype with ten to fifteen people, think-aloud and recorded, and lists it among the items the assignment is assessed on.
- **`F 44`** is supported by `feature-list.md`'s own provenance note, which records that the parent document's citations point at a Perplexity file-upload URL rather than at fuelpass.gov.lk or any ministry page, making every factual claim in it relayed rather than verified. The list argues for its own review, and this file is that review.

**Verdict: Keep both.**

**Condition.** `[ASSUMPTION]` — neither is a product feature. They are process commitments that have been listed alongside screens. They belong in the method section of the proposal and in `R §9`'s outstanding work, not in the screen count.

---

## 4. Summary

| Cluster | Items | Keep | Flag as assumption | Cut |
|---|---|---|---|---|
| C1 Registration entry and identity | 3, 4, 5, 12, 25 | 3, 4, 5, 25 | 12 | — |
| C2 Vehicle verification and DMT | 7, 8, 9, 10, 11 | 7, 8, 9, 11\* | 10 | — |
| C3 Credential delivery | 6, 21, 24 | 21, 24 | 6 | — |
| C4 QR lifecycle | 14, 15, 16, 41 | all | — | — |
| C5 Dashboard and quota | 17, 18, 19, 20 | 18, 19 | 17, 20 | — |
| C6 Error recovery and dispute | 13, 22, 23 | all | — | — |
| C7 Station operations | 26, 27, 28, 29 | 26, 27, 28 | 29 | — |
| C8 Administration and policy | 31, 32, 35, 36 | 32 | — | 31, 35, 36 *(scope)* |
| C9 Support and communication | 33, 34, 43 | all | — | — |
| C10 Access, language and reach | 1, 2, 37, 40 | 2, 37 | 1, 40 | — |
| C11 Security and resilience | 30, 38, 39 | 38 | 30 | 39 *(scope)* |
| C12 Validation of the work | 42, 44 | all | — | — |

\* `F 11` kept but re-weighted from an integration item to the primary constraint.

**Totals: 44 items — 30 keep, 10 flag as assumption, 4 cut.** All four cuts are **Cut (scope)**; none is **Cut (no evidence)**. Every item our evidence is silent on was flagged rather than cut, because silence is an absence of grounds and not a disproof — and because a board is better served by a labelled assumption than by a quiet deletion.

**The three contradictions, restated for the board:** duplicate detection points at over-rejection's opposite (`F 12`); "where permitted" settles a question `R §5-5` says the board must decide (`F 5`); and SMS OTP retains the identity anchor `U §5` argues is the root of four ranked problems (`F 6`).

---

## 5. The reverse gap

Problems in `problems.md` that this feature list does not address.

### 5.1 The four named in `research.md` §8 — confirmed

| Problem | Status against the list |
|---|---|
| **`P #4`** — RMV latency as the defining constraint | **Under-weighted, not absent.** `F 11` exists as one line. Confirmed as §8 describes it. |
| **`P #20`** — phishing and trust | **Absent.** No item offers domain guidance, verification cues or any way to check you are on the real service. `F 30` sits among the admin items and points at system abuse, not at citizens being phished (C11). |
| **`P #10`** — odd/even plate-digit rule | **Absent.** No item in the list mentions day eligibility. C5 displays quota and never whether today is permitted. |
| **`P #2`** — post-launch override flow | **Absent, with a caveat.** `F 22` and `F 23` are the only candidates. `[ASSUMPTION]` — both appear from their names to presuppose an existing account, which is the thing P1 cannot get. See C6. |

### 5.2 Nine further gaps

| # | Problem | Why nothing in the list reaches it |
|---|---|---|
| 1 | **`P #23a`** — scanning slower than not scanning | The decisive one. `R §2.4` states that if scanning is slower or less reliable than waving a customer through, operators will wave customers through, and `R §5-6` makes speed under queue pressure a constraint. The list has four station features and no speed requirement. Every item in C7 is contingent on this, and it is unnamed. |
| 2 | **`P #6`** — citizens told to act while the system was offline | **Absent.** No item covers honest system status: whether registration is open, what is down, what to do meanwhile. `F 34` announcements is a broadcast surface, not a status surface `[ASSUMPTION]`, inferred from the name. `research.md` records this gap as generating the most anger of anything in the relaunch. |
| 3 | **`P #3`** — new-vehicle registration unavailable | **Absent.** `F 3` step-by-step registration is generic; nothing addresses a vehicle with no prior record and no previous owner. Now personated as P7 (`U §4`), which makes the absence attributable rather than abstract. |
| 4 | **`P #5`** — OTPs arriving after expiry | **Retained, not addressed.** `F 6` keeps the mechanism; no item addresses the timing failure that made it the documented trigger for phone-borrowing (`U §5`). |
| 5 | **`P #12`** — the system provoked the behaviour it could not survive | **Absent.** No item covers what a user sees under load: queue position, honest wait, or anything that makes retrying pointless rather than rational. `R §2.2` names crisis behaviour going undesigned-for as a compounding factor in its own right. |
| 6 | **Station-side offline operation** (`P #11`) | **Absent.** `F 41` offline QR access is citizen-side. `R §2.2` lists offline *station* operation among the missing resilience patterns and `R §5-6` makes it a constraint. `F 27` manual entry is a fallback for a broken reader, not for a broken connection `[ASSUMPTION]`. |
| 7 | **`P #8`** — province cleansing decided whose record worked | **Absent.** Class is data operations, so arguably outside a UX document — but nothing tells a blocked user that their record is queued rather than rejected. `[ASSUMPTION]` — that the distinction matters to the user is our inference. |
| 8 | **`P #21`** — no PIA, no lawful basis, no informed consent | **Under-addressed.** `F 38` secure data handling and `F 36` audit logging are security surfaces. The documented failures in `R §2.5` are governance artifacts, which do not become features and cannot be built into a screen. |
| 9 | **`P #22`** — no channel through which a citizen could be answered | **Surface without operation.** `F 33` provides the container. `P #22`'s class is operations and policy. See C9. |

### 5.3 The five primary actions, tested

`feature-list.md` closes by recommending a move from a form-centred website to a service-centred platform built around five actions: register vehicle, retrieve QR code, check quota, fix a problem, get help.

Held against `problems.md`, that structure is sound and incomplete in two specific ways:

- **No action belongs to P2.** All five are citizen actions. `R §2.4` states that a redesign fixing only the citizen-facing form solves half the problem, and `U §9` scopes the build to P1 *and* the station operator. The operator has no verb in this model.
- **"Check quota" is the wrong question.** `P #10` and `U §3` P3 together establish that the user's real question before setting out is *may I fuel today, and how much*. Checking quota answers half of it. The five actions inherit C5's omission at the level of the structure, not just the screen.

---

## 6. Scope, against `users.md` §9

`feature-list.md` describes a parent document proposing four portals and roughly seventy screens. `U §9` scopes the prototype to two personas and around ten screens.

After this analysis: 30 keeps across 12 clusters is still well beyond ten screens. The clusters that serve P1 and P2 directly are **C2, C3, C4, C6, C7** and the parts of **C9** and **C10** that carry them. C1, C5, C8, C11 and C12 belong in the proposal narrative rather than the build. That is a scoping observation from this file's results, not a further instruction — the cut is yours to make in ideation.

---

## 7. What this analysis cannot do

- **It tests names, not behaviour** (§2.4). Ten of the judgements above are inferences from a feature title and are marked `[ASSUMPTION]` where made. The C6 condition is the one most worth resolving against the parent document.
- **It cannot find features that are right for reasons we have not researched.** Every "silent" verdict means our evidence is silent, and `U §6` establishes that our evidence over-represents people who complained in writing in Sinhala or English in the first two weeks after launch. `F 17` and `F 20` may be obviously correct to a user we never heard from.
- **It inherits every limitation in `P §6`**, including that no source describes a registration that simply worked. A feature that protects something currently working would read as "silent" here, and we would flag it as an assumption rather than recognise it.
- **The 48cc unplated-vehicle question in `P #16` has no persona**, by decision. No feature in this list addresses it, and had one done so, it would have been evaluated without a user behind it.
