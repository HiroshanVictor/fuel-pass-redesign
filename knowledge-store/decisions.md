# decisions.md

**Project:** Fuel Pass redesign — proposal prototype for the CPC director board

Running log of decisions taken, why, and by whom. Entries are appended, never rewritten. When a decision is reversed, the original stays and a new entry records the reversal.

**Why this file exists.** The Medium article has to show how we decided, not only what we produced. Reconstructing reasoning at submission time is both painful and unconvincing.

**Format:** date · decision · reasoning · decided by · affected files.

---

## D1 — Adopt a four-step UX process

**Date:** [fill in] · **Decided by:** whole team

Discovery and research → ideation and concept → design system → prototyping, testing and handoff. Each step's output feeds the next; the sequence is not reordered.

Agreed in Thread 1 as required by the assignment. There is no single correct UX process — following one consistently is the point. Files written into a shared markdown knowledge store so both the team and the AI tools work from the same source.

**Affects:** `ux-process.md`, all subsequent files

---

## D2 — Treat the teammate's requirements document as the client brief, not as our research

**Date:** [fill in] · **Decided by:** [fill in]

The requirements document proposes four portals and roughly seventy screens. Rather than adopting it as Step 1 output, it becomes the input we test against — the confident, domain-expert artifact that arrives before the homework is done.

Two reasons. Its citations resolve to a Perplexity file-upload URL rather than to fuelpass.gov.lk or any ministry page, so its factual claims are relayed rather than verified. And adopting it wholesale would skip the research the assignment is assessed on.

Sections 15, 16, 18 and most of 21 — architecture, data model, security and performance testing — are systems engineering rather than UX and were excluded from the extract.

**Affects:** `feature-list.md`, `gap-analysis.md`

---

## D3 — Anchor research in the March 2026 relaunch

**Date:** [fill in] · **Decided by:** [fill in]

The system is live. It was reinstated on 15 March 2026 and failed publicly within hours. We research that event rather than the 2022 original or a hypothetical redesign.

Real, dated, citable evidence beats synthetic personas, and the failures are documented in enough detail to argue design decisions from.

**Affects:** `research.md`

---

## D4 — Simplify the citation scheme

**Date:** [fill in] · **Decided by:** [fill in]

The AI draft of `users.md` invented a letter index (`§2.1-a`, `§2.1-b`) that does not exist in `research.md`. References looked more precise than they were and could not be verified without counting bullets. Replaced with section number plus a short descriptor.

**Affects:** `users.md`, and citation style in every file after it

---

## D5 — Order personas by designability, not severity

**Date:** [fill in] · **Decided by:** [fill in]

Ranking by harm alone put problems we cannot build for at the top of the list. Ordering by whether a redesign can address the group keeps the build targets visible without hiding the severity ranking, which is retained separately.

**Affects:** `users.md` §2, §3

---

## D6 — Demote the multi-vehicle owner to a board question

**Date:** [fill in] · **Decided by:** [fill in]

Owners of multiple vehicles on one NIC or BRN were the most reported failure of the relaunch. The cause is the one-identity-one-vehicle policy rule, which CPC owns. No interface change fixes it.

Retained as P4 with a flag. We design only the refusal experience around it and present the rule itself to the board as a policy question — with the precedent that essential-services vehicles already sit outside it, so the policy already admits exceptions.

**Affects:** `users.md` P4, `problems.md` #1, `gap-analysis.md` C1

---

## D7 — Cut the tourism operator persona

**Date:** [fill in] · **Decided by:** [fill in]

Rested on a single evidence line with nothing behind it. Carrying it forward would mean maintaining a persona that cannot support a board argument. Re-add only if interviews substantiate it.

**Affects:** `users.md`

---

## D8 — Keep the new-vehicle registrant as a stub, despite equally thin evidence

**Date:** [fill in] · **Decided by:** [fill in]

Reversal risk noted: this rests on exactly as little evidence as D7, which we cut. The decisions are consistent on different grounds.

The tourism operator's problem is a crisis-period grievance about allocation volume — it ends when rationing ends. A new-vehicle registrant's problem is a structural block on a journey the system must always support: every vehicle bought from now on needs a first registration, whether or not there is ever another shortage.

Being wrong about the tourism operator costs us a group interviews can re-add. Being wrong about this one means shipping a system with no entry point for new owners.

Marked `[ASSUMPTION]` — that the group persists beyond the crisis is our inference. Stub status is deliberate: it carries no board argument until interviewed.

**Affects:** `users.md` P7, `problems.md` #3

---

## D9 — Leave the 48cc unplated-vehicle case unpersonated

**Date:** [fill in] · **Decided by:** [fill in]

Real but narrow. Carried as a documented problem with no user attached, and stated explicitly wherever a proposed feature touches it.

**Affects:** `problems.md` §6

---

## D10 — Record the evidence bias, and say "most reported" rather than "most common"

**Date:** [fill in] · **Decided by:** [fill in]

The evidence base is social media complaints and news reporting from the two weeks after launch. It records who complained loudest, in writing, in Sinhala or English — not who was harmed most.

A delivery rider losing a day's earnings is less likely to post a screenshot than a car owner in Colombo. Tamil speakers are under-represented. Users least able to use the system are least likely to appear in evidence about it.

Consequence: complaint volume is not treated as severity in the problem ranking, and volume flags mark where a problem was held down or pushed up against its complaint count.

**Affects:** `users.md` §6, `problems.md` §6 and ranking

---

## D11 — Cluster the feature list rather than grade it item by item

**Date:** [fill in] · **Decided by:** [fill in]

Forty-four verdicts produce a file nobody reads. Twelve clusters give the board something they can hold in their heads while the evidence argument stays visible. All 44 items reconcile — nothing dropped, nothing counted twice.

**Affects:** `gap-analysis.md`

---

## D12 — Separate "cut for scope" from "cut for no evidence"

**Date:** [fill in] · **Decided by:** [fill in]

Different judgements. A feature may be well-evidenced and still undemonstrable in a ten-screen prototype.

Outcome worth noting: all four cuts were scope cuts. Nothing in the teammate's list was unevidenced. Where our evidence was silent we flagged rather than deleted, because silence is an absence of grounds, not a disproof — and a labelled assumption serves a board better than a quiet deletion.

**Affects:** `gap-analysis.md` §2.3, §4

---

## D13 — Reclassify the override flow from absent to wrong-modality

**Date:** [fill in] · **Decided by:** [fill in]

Initially recorded as absent from the requirements document. Checking §3.8, §5.13 and §8.5 of the parent document shows account-less entry is covered — but only as a manual, support-mediated dispute requiring document upload and officer review.

The override that actually shipped on 19 March was self-service: vehicle number plus chassis number, no human in the loop. The proposal has the right journey in the wrong modality.

Our position: self-service override primary, dispute as fallback.

**Affects:** `gap-analysis.md` C6 and §5.1

---

## D14 — Move identity from mobile number to chassis number

**Date:** [fill in] · **Decided by:** [fill in]

The central design argument. Under crisis load the system provokes phone-borrowing — people do it when their own phone cannot receive an OTP in time. The identity model is anchored on mobile number, which is precisely what that behaviour defeats. Numbers are also recycled and vehicles sold.

Stale records, duplicate claims and the four-day wait for an override all trace back to anchoring identity on the least stable attribute available.

`[ASSUMPTION]` — the collision between crisis behaviour and the identity anchor is our reading; the sources state the two facts separately.

**Affects:** `users.md` §5, `gap-analysis.md` C2 and C3, and every flow in Step 2

---

## D15 — Scope cut for the prototype

**Date:** 2026-09-13 · **Decided by:** Hiroshan Victor

Inputs: `problems.md` §9 (fifteen design-addressable problems, ranked) and `gap-analysis.md` §6 (clusters C2, C3, C4, C6, C7 and parts of C9 and C10 serve P1 and P2).

Decided:

- **Personas to build for:** `users.md` §9's recommendation accepted, not overruled — **P1 second-hand vehicle owner** and **P2 station operator**. P4 (multi-vehicle) stays a board argument per D6; P7 (new registrant) stays an unbuilt stub per D8.
- **Problems the prototype solves — four, evenly split across the two personas:**
  - **#2** Stale ownership records make second-hand owners unregistrable (P1)
  - **#16** Four basic questions went unanswered anywhere in the product, chassis-number location foremost (P1)
  - **#11** Stations could not scan (P2)
  - **#23a** Scanning was slower and less reliable than not scanning — the causal lever on #11 and #23 (P2)
- **Screen count:** ten.
- **What is simulated:** vehicle, ownership and chassis records are mocked. The RMV/chassis lookup carries a deliberate artificial delay, so the load constraint that #4 and `R §5-1` name as defining is demonstrable on screen rather than only asserted in the proposal narrative. No simulated timeout/failure on top of the delay — that scope was considered and declined in favour of keeping the ten-screen build to the four named problems.

Rule for Step 2: every screen must trace to a problem named here. A screen that cannot is not built.

**Affects:** everything downstream

---

## D16 — Exception to the D15 trace rule: S4's artificial delay surfaces #4

**Date:** 2026-09-13 · **Decided by:** Hiroshan Victor

D15's simulation clause already commits to a deliberate artificial delay on the RMV/chassis lookup, so that the load constraint `research.md` §5-1 names as defining — ranked `problems.md` #4 — is demonstrable on screen rather than only asserted in the proposal narrative. But #4 is not one of the four problems D15 names as solved by the prototype, and D15's own rule states every screen must trace to a problem named there.

Recording the exception explicitly rather than letting it pass quietly: `sitemap.md` S4 (Verifying Your Vehicle) exists because it is the verification step of the self-service override that resolves #2 — that is its trace, and it needs no exception. The delay layered onto that screen borrows #4 for demonstration only. It does not attempt to fix #4, does not add a fifth problem to the four the prototype claims to solve, and does not license any other screen to cite a problem outside D15's four without a matching entry here.

**Affects:** `sitemap.md` S4

---

## D17 — Design-system base: Tailwind CSS plus Heroicons, no bespoke component framework

**Date:** 2026-09-13 · **Decided by:** Hiroshan Victor

Per direction for Step 3: the prototype is built on Tailwind CSS utility classes plus one icon library, with interactive components composed from standard, well-known patterns rather than built from scratch.

**Heroicons** is the icon library. It shares design authorship with Tailwind CSS (both maintained by Tailwind Labs), so icon stroke weight and visual language match the utility framework's own grid and spacing without a second visual system to reconcile against. It ships both outline and solid variants of each glyph, which `tokens.md`'s icon inventory uses deliberately to distinguish rest state from confirmed/success state (e.g. an outline camera at rest, a solid check-circle on success) without inventing a second icon set to do it. It also includes a dedicated QR-code glyph, needed for S5 and S9.

**No headless component library (Radix, Headless UI) was added.** Checked against `sitemap.md`'s ten screens: none requires a true modal, dropdown menu, or other complex widget with non-trivial focus-trapping behaviour — every screen is a full navigation, form, or status region. `component-spec.md` therefore specifies components as standard HTML elements (`button`, `input`, `label`, `fieldset`) styled with Tailwind utilities and following WAI-ARIA Authoring Practices patterns for their type, which is what "don't build from scratch" means at the behaviour layer given this screen set. If a future screen needed real modal behaviour, that would be the point to revisit this decision, not to hand-roll focus trapping.

**Affects:** `tokens.md`, `component-spec.md`, `accessibility.md`

---

## D18 — Typography tokens accommodate Sinhala, Tamil and Latin script, though demo copy stays English

**Date:** 2026-09-13 · **Decided by:** Hiroshan Victor

`R §5-3` names trilingual delivery — Sinhala, Tamil, English — as a stated constraint on the redesign, covering error messages, SMS templates and printable material, not only interface labels. `sitemap.md` §8 and `microcopy.md`'s scope note already establish that this prototype's actual copy is English only, consistent with `CLAUDE.md`'s exclusion of full localisation from a board demo.

Those two facts do not license an English-only **token layer**. A font stack, line-height and container-width system tuned only for Latin script would violate `R §5-3` silently the first time real trilingual copy was dropped in — and unlike copy, a token layer is expensive to redo once components are built against it, cheap to get right before anything is. `tokens.md` therefore specifies a Noto Sans Sinhala / Noto Sans Tamil / Noto Sans font stack, line-heights sized for Sinhala and Tamil vowel signs and conjuncts rather than Latin ascenders/descenders alone, and container widths sized for the text expansion translation typically produces. None of this is exercised by the English demo copy. All of it is load-bearing the day real trilingual copy arrives, which is the point.

**Affects:** `tokens.md`

---

## D19 — [next]
