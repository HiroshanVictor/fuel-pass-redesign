# 01-discovery / problems.md

**Project:** Fuel Pass redesign — proposal prototype for the CPC director board
**Compiled:** September 2026
**Sources:** `research.md` and `users.md` (01-discovery) — sole sources. No external facts, figures or quotes have been added.
**Scope:** Problems only. No solutions, no features, no design directions. `research.md` §7 proposes candidate directions; none of them appear here, deliberately.

> **This file ranks by harm. `users.md` ranks by designability. They disagree, and that is intentional** — see §3. The problem that hurts most is not the problem we can best fix, and the board needs to be shown both orderings.

---

## 1. Citation key

Follows the scheme established in `users.md` §1: section number plus a short descriptor, so any claim can be found by eye.

| Prefix | Refers to |
|---|---|
| `R §2.1` etc. | `research.md`, section number, with descriptor |
| `U §5` etc. | `users.md`, section number |
| `P1`–`P6` | Personas as numbered in the **edited** `users.md`: P1 second-hand owner · P2 station operator · P3 motorcycle/delivery · P4 multi-vehicle or BRN · P5 three-wheeler · P6 senior or first-time registrant |

---

## 2. Ranking method

### 2.1 The axis

Every problem is scored on one question: **how completely does it stop fuel entering a tank, and for how long?**

| Band | Meaning |
|---|---|
| **B1** | Absolute block. No fuel obtainable, and no action available to the user changes that. |
| **B2** | Blocked pending someone else's action. Resolution depends on an external party or event the user cannot influence. |
| **B3** | Blocked on some attempts or some days. Waiting or retrying may work. |
| **B4** | Fuel obtained, but degraded — less than needed, later, or at high cost in time or risk. |
| **B5** | Does not block fuel. Harm occurs alongside, or the basis of rationing is undermined. |

Within a band, problems are ordered by **permanence first, breadth second**. A permanent block on a smaller group outranks a half-day block on everyone, because for the individual affected the half-day block ends and the permanent one does not. If the board would rather see breadth weighted first, that reorders §4 but changes no content — tell me and I will flip it.

### 2.2 Operator-side problems

`[ASSUMPTION]` — P2 is not trying to fill their own tank, so the axis does not apply directly. **Operator-side problems are scored by how badly they block a customer from getting fuel at that station.** This is our reading of the axis, not something either source states. Overrule it if you want operator problems scored separately.

### 2.3 Problems that invert the axis

Some documented failures make fuel *easier* to obtain while destroying the rationing system's basis — a shed that dispenses without scanning fills tanks faster than one that scans (`R §2.4`, dispensing without scanning). These score **B5**, not because they are minor, but because the axis cannot see them. Band B5 is explicitly not a low-priority band; it is the band where the axis stops working.

### 2.4 Volume flags, per `U §6`

`users.md` §6 establishes that `research.md` records **who complained loudest and in writing, not who was hurt most**. Where a problem's apparent size comes from complaint volume rather than demonstrated harm, its entry carries one of:

- 🔺 **Volume-inflated** — the evidence makes this look bigger than its blocking severity supports.
- 🔻 **Volume-suppressed** — ranked *above* its evidence weight, because `U §6` establishes the affected group is under-represented in the sources.

Neither flag changes the band. Bands are set by blocking severity. The flags record where we have declined to let loudness set the rank, which is the thing a director board will test.

---

## 3. Why this ranking differs from `users.md`

`users.md` §2 orders personas by designability and puts the second-hand owner first, demoting the multi-vehicle owner to P4 as a board question. That is the right ordering for deciding what to build.

Ranked by harm, the order inverts. The multi-vehicle block is **#1** here: it is total, it has no route forward, and — unlike every other B1 problem — `research.md` records no fix for it at any point in the timeline (`R §1`). Being policy-owned makes it undesignable, not less harmful.

Holding both orderings at once is the honest position, and it is a stronger board argument than either alone: *the worst problem is not ours to fix, and here is what is.*

---

## 4. Ranked problems

### Band B1 — absolute block

---

**#1 · No route to register a second vehicle against one identity**
🔺 *Volume-inflated label, not volume-inflated rank*

One NIC, passport or BRN maps to one profile and one vehicle in the standard process. A second registration attempt is rejected with an error stating the ID or phone number is already registered, and no route forward is stated anywhere.

- **Personas:** P4. `[ASSUMPTION]` — households sharing one NIC across vehicles would hit the identical wall, but neither source describes this case.
- **Severity:** B1. Total, and `research.md` records no fix at any point — the 19 March override addressed stale registrations (`R §2.3`), not multiple legitimate ones.
- **Class:** **Policy.** CPC owns the rule. No interface change resolves it. A precedent for exceptions already exists: essential-services and national-production vehicles sit outside the standard channel (`R §3`, separate channels).
- **Evidence:** `R §2.1` (multi-vehicle rejection); `R §4 › "Owners of multiple vehicles / businesses on one BRN"`; `R §5-5`; `U §3` P4.
- **Volume note:** the sources call this the most common failure. Per `U §6`, that is most *reported*. Its rank here does not rest on that label — it rests on being total and unresolved, which holds however many people it hit.

---

**#2 · Stale ownership records make second-hand owners unregistrable**

The previous owner's record was never purged, so the vehicle is already claimed. The buyer is structurally blocked — not failing a step, but ineligible to complete one.

- **Personas:** P1.
- **Severity:** B1 at launch, decaying to **B2** from 19 March when the override shipped, and remaining B2 for anyone whose province has not been cleansed.
- **Class:** **Data in origin, design in consequence.** `research.md` argues directly that legacy-data latency is not an implementation detail to hand to the backend team, and must be answered at the experience level (`R §2.2`, closing note).
- **Evidence:** `R §2.1` (second-hand blockage); `R §2.2` (stale 2023 data); `R §2.3` (19 Mar override, province cleansing); `R §4 › "Second-hand vehicle owners"`; `U §3` P1.
- **Compounding:** the override requires a chassis number, and where to find one is among the questions the system never answered (`R §2.6`). `[ASSUMPTION]` — that this made the override unusable for some, neither source says so.

---

**#3 · New-vehicle registration was unavailable**

The flow returned a message saying registration had not started yet. Screenshots circulated widely.

- **Personas:** **P7 (stub).** Added to `users.md` §4 in second revision, on this problem's single evidence line. Stub status means it carries no board argument until interviewed.
- **Severity:** B1. `research.md` does not record when or whether this was resolved, so the duration is unknown rather than short.
- **Class:** Unknown. Neither source states whether the cause was policy sequencing or an incomplete build.
- **Evidence:** `R §2.1` (new-vehicle registration unavailable).

---

**#4 · Registration collapsed nationwide under load**

Every registration and every QR refresh made a synchronous call to the legacy RMV API, which was never built for high concurrency. It slowed, then timed out; users saw errors and retried harder; the retry storm brought the system down. Thousands could not register.

- **Personas:** All (P1–P6).
- **Severity:** B1 for the duration of the outage — with QR mandatory from 6 a.m., no QR meant no fuel anywhere — then B3 as capacity returned.
- **Class:** **Infrastructure in origin, design in consequence.** `research.md` states the constraint determines whether registration can be synchronous at all, which makes it an experience question before it is an engineering one (`R §2.2`).
- **Evidence:** `R §2.1` (mass registration failure); `R §2.2` (synchronous RMV dependency, retry storm); `R §5-1`.

---

**#5 · OTPs arrived after their two-minute validity had expired**

The credential needed to proceed was invalid on arrival.

- **Personas:** All citizen personas; P6 acutely, per `U §6` literacy-and-access skew.
- **Severity:** B1 per attempt, B3 across attempts — retrying may land inside the window.
- **Class:** **Design.** Both the window length and the failure's legibility to the user sit in the experience layer.
- **Evidence:** `R §2.1` (expired OTPs).
- **Link:** this is the documented trigger for phone-borrowing, which `U §5` identifies as colliding with mobile-number-as-identity.

---

**#6 · Citizens were instructed to act while the system was offline**
🔺 *Volume-inflated*

The government told people to register from 6 a.m. The system stayed offline well past midday.

- **Personas:** All.
- **Severity:** B1 while it lasted, but time-boxed to part of one day and resolved without any action by the user.
- **Class:** **Design and communication.** The system status shown to the public was wrong; that is a content problem.
- **Evidence:** `R §2.1` (told to register while offline).
- **Volume note:** `research.md` records that across every account studied, this gap generated **the most anger** of anything in the relaunch. Anger is not blocking severity. On this file's axis it ranks sixth, below four problems that generated less noise and lasted longer. Stating that plainly is the clearest demonstration of `U §6` in this document.

---

**#7 · No working fallback route existed for anyone who failed**
🔻 *Volume-suppressed*

The 1919 helpline was reported not working. Official posts contained no working helpline number and no link to the registration portal. Across 4,000+ comments, no official account replied.

- **Personas:** All; P6 acutely — the only persona `research.md` records as physically queueing at assistance desks and helplines.
- **Severity:** B2 in itself. `[ASSUMPTION]` — for a user with no alternative route, this converts every recoverable failure above into a permanent one, which would make it B1 for them. Neither source states this.
- **Class:** **Design and operations.**
- **Evidence:** `R §2.1` (1919 helpline); `R §2.5` (no helpline or portal link; no official response); `R §4 › "Senior citizens and first-time registrants"`; `U §3` P6.
- **Volume note:** ranked above its evidence weight. Per `U §6`, complaining online requires a device, data and written literacy — so the users most dependent on a phone line are the least likely to appear in the sources complaining that it was dead.

---

### Band B2 — blocked pending someone else's action

---

**#8 · Whether your record worked depended on your province**

Data cleansing to remove old vehicle records for transfers made after August 2023 was carried out province by province.

- **Personas:** P1.
- **Severity:** B2. No user action accelerates it.
- **Class:** **Data operations.**
- **Evidence:** `R §2.3` (province cleansing).
- `[ASSUMPTION]` — that a sequential rollout created geographic inequity in who could register when is our reading. `research.md` records the method, not its distributional effect.

---

**#9 · Recycled and deactivated mobile numbers left records claimed by several people**

Numbers had changed or been disconnected since 2023. The same QR code or mobile number ended up claimed by several people, while valid users were rejected because records no longer matched. Remediation required the Ministry of Digital Economy working with Dialog, Mobitel and Hutch.

- **Personas:** P1 directly; any user whose number changed since 2023.
- **Severity:** B2. Resolution sat with third parties.
- **Class:** **Data in origin, design in consequence** — `research.md` names mobile number as primary identifier a modelling error, with chassis or engine number more stable (`R §2.2`).
- **Evidence:** `R §2.2` (stale 2023 data; mobile number as identifier); `R §2.3` (telco number purge); `U §5`.

---

### Band B3 — blocked on some days or some attempts

---

**#10 · The odd/even plate-digit rule bars refuelling outright on the wrong day**

From 18 March, a second rationing layer stacked on top of the quota, limiting which days a vehicle could refuel at all.

- **Personas:** P3, P5 acutely — both income-dependent on daily vehicle use. All vehicle owners in principle.
- **Severity:** B3. Total on the wrong day, but predictable and waitable — provided the user knows the rule applies to them.
- **Class:** **Policy.** Added by the Ministry six days into the relaunch.
- **Evidence:** `R §3` (odd/even rule); `R §5-7`; `U §3` P3.
- **Note:** `research.md` §8 records this rule as **absent** from the teammate's requirements document. Carry into `gap-analysis.md`.

---

**#11 · Stations could not scan**

Some stations had no working QR reader on day one and pumped restricted quantities anyway. Offline station operation was among the resilience patterns missing at launch.

- **Personas:** P2, and every customer at an unequipped station.
- **Severity:** B3/B4 — customers received fuel, but in restricted quantities decided locally rather than by their entitlement.
- **Class:** **Operations in origin, design in consequence.** `R §5-6` states the system must tolerate offline operation, be fast under queue pressure, and give clear rejection reasons.
- **Evidence:** `R §2.4` (no readers); `R §2.2` (missing resilience); `R §5-6`; `U §3` P2.

---

**#12 · The system provoked the behaviour it could not survive**

During a shortage people do not behave like calm users: they refresh constantly, borrow phones, and try every workaround. Each retry added load to the collapsing RMV dependency.

- **Personas:** All. Users harm each other here, which no other problem in this file does.
- **Severity:** B3 in itself; it is the multiplier on #4.
- **Class:** **Design.** `research.md` lists crisis behaviour going undesigned-for as a compounding factor in its own right.
- **Evidence:** `R §2.2` (crisis behaviour); `U §5`.

---

### Band B4 — fuel obtained, but degraded

---

**#13 · The allocation does not sustain income-dependent work**
🔺 *Volume-inflated label — but the harm is real*

Riders and drivers argued quantitatively — distance, consumption rate, work schedule — that the weekly allocation cannot sustain their work. Motorcycle 5 L at launch, 8 L from 21 March; three-wheeler 15 L, then 20 L.

- **Personas:** P3, P5.
- **Severity:** B4. Fuel is obtained; the shortfall is in volume.
- **Class:** **Policy.** CPC sets the litres. Nothing in a redesign changes them.
- **Evidence:** `R §3` (quota table); `R §4 › "Motorcycle riders…"`, `› "Three-wheeler drivers"`; `U §3` P3.
- **Volume note:** this is the highest-volume complaint category in the sources *and* `research.md` characterises it as economic survival anxiety rather than abstract grumbling. Both can be true. It ranks at B4 because the axis measures blocking, and these users get fuel — less than they need, but fuel. `U §7` records that we cannot yet separate the volume grievance from the certainty grievance; that separation is an interview question, and it determines whether any part of this is ours.

---

**#14 · Unused allocation is destroyed weekly**

The cycle resets Sunday at midnight with no carry-forward.

- **Personas:** P3, P5.
- **Severity:** B4.
- **Class:** **Policy.**
- **Evidence:** `R §3` (reset rules).

---

**#15 · Allocation figures were provisional, and changes were silent**

Quotas for seven vehicle categories changed within six days of launch. `research.md` states that a silent change to someone's weekly litres is a livelihood event.

- **Personas:** All vehicle owners; P3 and P5 acutely.
- **Severity:** B4. Users arrive at a station holding a number that is no longer true.
- **Class:** **Policy volatility in origin, design in consequence** — the rule changes belong to CPC; whether a user learns of a change affecting their livelihood belongs to the product.
- **Evidence:** `R §3` (policy churn; design implication); `R §5-2`.

---

**#16 · Four basic questions went unanswered anywhere in the product**

Can I use my old QR code? Do I need to register again? What about a 48cc bike with no number plate? Where do I find the chassis number?

- **Personas:** All. P1 acutely — the chassis number is a precondition of the only route out of #2.
- **Severity:** B4 generally; B2 for P1, where the missing answer gates the override.
- **Class:** **Design.** `research.md` calls this a content design failure explicitly, and content design squarely our job.
- **Evidence:** `R §2.6`.
- **Note:** the 48cc unplated-bike question also has no persona behind it. See §6.

---

**#17 · Nothing was delivered trilingually**
🔻 *Volume-suppressed*

Trilingual pre-launch communication was absent. The constraint covers not just labels but error messages, SMS templates and printable material.

- **Personas:** All. Tamil speakers acutely.
- **Severity:** B4 in principle; `[ASSUMPTION]` — B1 for a user who cannot read the only language an error message is offered in. Neither source tests this.
- **Class:** **Design.**
- **Evidence:** `R §4 › "Sinhala and Tamil speakers"`; `R §5-3`.
- **Volume note:** ranked above its evidence weight, deliberately. `U §6` establishes that the source comment analysis covers posts in Sinhala and English, so Tamil-speaking users are almost certainly under-represented — making this problem *larger* than the evidence makes it look, not smaller.

---

**#18 · Fuel queues turned violent**

- **Personas:** P2 and every customer present.
- **Severity:** B4 — a safety harm attached to obtaining fuel rather than a block on it.
- **Class:** Not addressable in isolation. `[ASSUMPTION]` — that queue duration and outcome uncertainty contributed is our inference; `research.md` records the violence without stating a cause.
- **Evidence:** `R §2.4` (violent queues).

---

**#19 · Device capability and connectivity**

- **Personas:** All.
- **Severity:** Unknown.
- **Class:** Unknown.
- **Evidence:** `R §4 › "Users on low-end phones or poor connectivity"` — which `research.md` itself marks `[ASSUMPTION]`: strongly implied by the population and by the offline and print requirements, but no source quantifies it.
- **Status:** listed for completeness, **unranked**. It cannot be positioned on this axis without validation. `research.md` §9 assigns it to interviews.

---

### Band B5 — does not block fuel

Per §2.3, this band is where the axis stops working, not where priority stops.

---

**#20 · Fraudulent look-alike sites harvested personal data**

Sites using URLs with slightly altered characters circulated on social media and messaging apps, alongside QR phishing. SL-CERT issued a public advisory on 17 March — two days after launch.

- **Personas:** All. `[ASSUMPTION]` — P6 disproportionately, as first-time registrants with no prior experience of the genuine portal. Neither source states this.
- **Severity:** B5 as evidenced. `[ASSUMPTION]` — a user who completed registration on a fraudulent site would hold no valid QR and would be blocked at the pump, which would make this B1 for them. `research.md` describes data harvesting, not this consequence.
- **Class:** **Design.** Verification cues sit in the product.
- **Evidence:** `R §2.5` (SL-CERT advisory); `R §1` (17 Mar).
- **Note:** `research.md` §8 records the phishing and trust problem as **absent** from the teammate's requirements document. Carry into `gap-analysis.md`.

---

**#21 · Personal data was processed without a lawful basis, and exposed to strangers**

No privacy impact assessment, no clear lawful basis for processing, no meaningful informed consent. Citizens described the previous owner's details appearing on their account without the vocabulary to name it as a data-protection failure.

- **Personas:** All. P1 directly and concretely.
- **Severity:** B5 on this axis. The harm is not measured in litres.
- **Class:** **Policy and design.** PDPA compliance is an obligation, not a feature (`R §5-4`).
- **Evidence:** `R §2.5` (data-protection failures); `R §5-4`; `U §3` P1.

---

**#22 · There was no channel through which a citizen could be answered**
🔺 *Volume-inflated*

Across 4,000+ comments on five official and news posts, not a single official account responded. One private individual fielded complaints on his own time. The Government Information Department's own post functioned as a complaints board rather than an information channel.

- **Personas:** All.
- **Severity:** B5 directly; contributes to #7.
- **Class:** **Operations and policy**, with a design surface. Who staffs a response channel is not a design decision.
- **Evidence:** `R §2.5` (no official response; complaints board).
- **Volume note:** this problem is *measured in* complaint volume, which makes it the one place where volume is legitimate evidence — 4,000+ unanswered comments is a fact about the channel, not about the complainers. Note per `U §8` that this is a count of comments, not of people.

---

**#23 · The enforcement layer was optional in practice**

Many sheds dispensed fuel without scanning at all, relying on personal connections and small payments, including refuelling vehicles after closing time. A few disregarded the QR entirely, citing ample fuel.

- **Personas:** P2. `[ASSUMPTION]` — the people disadvantaged are those without connections or the means to pay extra. Neither source identifies who lost out.
- **Severity:** B5, and it **inverts the axis**: for the customer being waved through, this is the fastest route to fuel in the entire system. It is ranked last while being, on any fairness measure, among the most serious findings in `research.md`.
- **Class:** **Operations and policy**, with one designable component below.
- **Evidence:** `R §2.4` (dispensing without scanning; QR disregarded).

---

**#23a · Scanning was slower and less reliable than not scanning**

The designable mechanism behind #23. `research.md` states it directly: if scanning is slower or less reliable than waving a customer through, operators will wave customers through.

- **Personas:** P2.
- **Severity:** B5 in effect, but this is the causal lever on #23 and on #11.
- **Class:** **Design.** `R §5-6` makes speed under queue pressure, offline tolerance and clear rejection reasons a stated constraint on the redesign.
- **Evidence:** `R §2.4` (Reading paragraph); `R §5-6`; `U §3` P2.

---

## 5. Structural causes

These are not ranked, because they block nobody directly. They generate the problems that do. `research.md` §2.2 presents them as compounding factors; listing them separately prevents double-counting them as problems in their own right.

| Cause | Problems it generates | Evidence |
|---|---|---|
| Synchronous dependency on the legacy RMV API | #4, and the load conditions behind #5 | `R §2.2` |
| 2023 data reused without cleanup | #2, #8, #9 | `R §2.2` |
| Mobile number used as the primary identifier | #2, #9, and the collision in `U §5` | `R §2.2` |
| Big-bang nationwide launch rather than phased rollout | amplifies #4, #6 | `R §2.2`; `R §6` (Iran began in one province) |
| Missing resilience patterns — rate limiting, queuing, caching, graceful degradation, offline station operation | #4, #11 | `R §2.2` |
| Crisis behaviour not designed for | #12, and `U §5` | `R §2.2` |

**The collision, restated.** `U §5` argues that the behaviour the system provokes under crisis load — borrowing phones when an OTP cannot arrive in time (#5) — is precisely the behaviour its identity model cannot survive. `users.md` marks this inference `[ASSUMPTION]`; it is carried here with the same tag, and it is the single thread connecting #2, #5, #9 and #12 into one problem rather than four.

---

## 6. What this ranking cannot see

Carried forward from `U §6` and `U §7`, plus gaps this file surfaced.

| Limitation | Effect on the ranking |
|---|---|
| **No baseline for success.** No source describes a registration that simply worked. | Every problem here is drawn from a failure account. Friction inside a working flow is invisible to this ranking — we cannot rank what we have never seen functioning. |
| **Time skew.** Nearly all evidence is from the first two weeks after launch. | The ranking describes a crisis, not steady state. Six months on, #4 and #6 may be historical while #13 and #14 persist daily. Nothing in the sources tells us which. |
| **The 48cc unplated case in #16 has no persona.** | Resolved for #3: a new-vehicle registrant is now P7, a stub in `users.md` §4 with an interview slot, kept on one evidence line because the block is structurally permanent rather than crisis-bound. The 48cc unplated-vehicle question stays deliberately unpersonated — `research.md` records the question being asked, and nothing about who asked it. Any feature proposed for it is evaluated without a user behind it, and will be marked as such. |
| **Complaint volume is not harm volume.** | Applied throughout via 🔺 and 🔻. The two rankings most affected are #6, held down despite generating the most anger, and #17, pushed up despite the thinnest comment trail. |
| **Cause is often absent.** | #18 records violence with no stated cause; #3 records unavailability with no stated resolution. Both are ranked on effect alone. |

---

## 7. Carried into `gap-analysis.md`

`research.md` §8 names four items as under-weighted in the teammate's requirements document. Three are ranked problems here, and the fourth is a structural cause:

| §8 item | Where it sits in this file |
|---|---|
| RMV latency treated as an integration item rather than the defining constraint | #4, and the first row of §5 |
| Phishing and trust problem absent | #20 |
| Odd/even rule absent | #10 |
| Post-launch override flow absent | #2 |

---

## 8. One thing I need from you before `gap-analysis.md`

Nothing was missing for this file. One decision is yours, and it affects the next one: **#3 and the 48cc question have no persona behind them.** If the proposed feature list includes anything serving new-vehicle registrants or unplated vehicles, I will have documented problems and no user to evaluate them against. Say whether those should be added to the interview plan as new groups, or carried as unpersonated problems, and I will hold to that in the gap analysis.

---

## 9. Filtered view — problems a redesign can address

The §4 ranking with everything non-design removed. **No re-analysis.** Rank numbers, bands, persona mappings, class descriptions and volume flags are carried over unchanged from §4; nothing has been re-scored, re-ordered or promoted. Fifteen of twenty-four entries survive the filter.

**Rank numbers are the original §4 numbers.** #2 sits at the top of this list but is not "the new #1" — #1 dropped out because it is policy, which is the §3 point made concrete.

| Rank | Problem | Band | Personas | Class (from §4) | Flag |
|---|---|---|---|---|---|
| **#2** | Stale ownership records make second-hand owners unregistrable | B1 → B2 | P1 | Data in origin, design in consequence | |
| **#4** | Registration collapsed nationwide under load | B1 → B3 | All | Infrastructure in origin, design in consequence | |
| **#5** | OTPs arrived after their two-minute validity had expired | B1 per attempt / B3 across | All citizen personas; P6 acutely | Design | |
| **#6** | Citizens were instructed to act while the system was offline | B1, time-boxed | All | Design and communication | 🔺 |
| **#7** | No working fallback route existed for anyone who failed | B2 | All; P6 acutely | Design and operations | 🔻 |
| **#9** | Recycled and deactivated numbers left records claimed by several people | B2 | P1; anyone whose number changed since 2023 | Data in origin, design in consequence | |
| **#11** | Stations could not scan | B3 / B4 | P2, and every customer at an unequipped station | Operations in origin, design in consequence | |
| **#12** | The system provoked the behaviour it could not survive | B3 | All | Design | |
| **#15** | Allocation figures were provisional, and changes were silent | B4 | All vehicle owners; P3, P5 acutely | Policy volatility in origin, design in consequence | |
| **#16** | Four basic questions went unanswered anywhere in the product | B4; B2 for P1 | All; P1 acutely | Design | |
| **#17** | Nothing was delivered trilingually | B4 | All; Tamil speakers acutely | Design | 🔻 |
| **#20** | Fraudulent look-alike sites harvested personal data | B5 | All | Design | |
| **#21** | Personal data processed without a lawful basis, and exposed to strangers | B5 | All; P1 directly | Policy **and** design — partial | |
| **#22** | There was no channel through which a citizen could be answered | B5 | All | Operations and policy, **with a design surface** — partial | 🔺 |
| **#23a** | Scanning was slower and less reliable than not scanning | B5 | P2 | Design | |

### 9.1 Composition of the filtered set

| Class | Count | Ranks |
|---|---|---|
| Design outright | 6 | #5, #12, #16, #17, #20, #23a |
| Design-led compound | 2 | #6, #7 |
| Other in origin, design in consequence | 5 | #2, #4, #9, #11, #15 |
| Partial design surface within a policy or operations problem | 2 | #21, #22 |

The five "design in consequence" entries are the ones `research.md` argues most directly are ours: `R §2.2` states that legacy-data latency is not an implementation detail to hand to the backend team, and `R §5-6` makes station speed, offline tolerance and rejection legibility stated constraints on the redesign rather than operational matters.

### 9.2 Removed by the filter

Listed so the filter is auditable. Reasons are the Class field from §4, not a fresh judgement.

| Rank | Problem | Removed because |
|---|---|---|
| **#1** | No route to register a second vehicle against one identity | Policy — CPC owns the rule |
| **#3** | New-vehicle registration was unavailable | Class unknown; neither source states the cause |
| **#8** | Whether your record worked depended on your province | Data operations |
| **#10** | The odd/even plate-digit rule bars refuelling on the wrong day | Policy |
| **#13** | The allocation does not sustain income-dependent work | Policy |
| **#14** | Unused allocation is destroyed weekly | Policy |
| **#18** | Fuel queues turned violent | Not addressable in isolation |
| **#19** | Device capability and connectivity | Unranked — `[ASSUMPTION]` in `research.md`, unvalidated |
| **#23** | The enforcement layer was optional in practice | Operations and policy; its designable component is carried as #23a |

### 9.3 What the filter does not change

- **Bands are unchanged.** Filtering does not make #23a more urgent than #2. B5 entries remain B5.
- **Removed does not mean unimportant.** #1 is the worst problem in this document by the ranking axis, and #13 is the highest-volume grievance in the sources. Both are absent here solely because the redesign cannot touch them. `research.md` §8 and `U §9` both treat #1 as a board argument rather than a build target.
- **Volume flags travel with the problems.** #6 is still held down against its complaint volume, #17 and #7 still pushed up against theirs.
- **The limitations in §6 still apply.** #3 is removed here for unknown class, not for lacking a persona — it now has P7 — and it stays out of this view until a source establishes whether its cause was policy sequencing or an incomplete build.
