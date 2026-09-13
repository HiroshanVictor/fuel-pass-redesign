# 01-discovery / research.md

**Project:** Fuel Pass redesign — proposal prototype for the CPC director board
**Compiled:** September 2026
**Status:** Desk research complete. Primary user interviews and usability testing still outstanding (see §9).

> **Sourcing rule for this file.** Every claim below is traceable to a dated published source, listed in §10. Anything marked `[ASSUMPTION]` is our inference, not reported fact, and must be validated before it reaches a board slide.

---

## 1. The system is live right now

This is not a historical 2022 case study. The National Fuel Pass was reinstated and made compulsory at **6:00 a.m. on 15 March 2026**, and no filling station may issue fuel without a valid QR code from that moment.

**Timeline**

| Date | Event |
|---|---|
| Aug 2022 | Original platform developed and deployed during the foreign-exchange crisis |
| Sep 2023 | Discontinued when supply stabilised |
| 28 Feb 2026 | US–Israel strike on Iran; global petroleum supply chains disrupted |
| 14 Mar 2026 | Ministry of Energy announcement; previously registered users able to download QR from midnight |
| **15 Mar 2026** | **QR mandatory nationwide from 6:00 a.m. Portal fails within hours.** |
| 17 Mar 2026 | SL-CERT advisory on fraudulent look-alike registration sites |
| 18 Mar 2026 | Odd/even number-plate day restriction added on top of the QR quota |
| 19 Mar 2026 | Override/reset feature added to unblock stale registrations |
| 21–22 Mar 2026 | Quotas revised upward for seven vehicle categories |

**Stated reasons for reintroduction:** Middle East conflict disrupting global petroleum supply, abnormally high domestic demand rapidly depleting stocks, and groups illegally purchasing fuel in excessive quantities.

**Why this matters for us:** we are not redesigning a hypothetical system. We are redesigning one that failed publicly, in documented ways, six months ago, in front of the entire country. Every design decision we make can be argued against real evidence.

---

## 2. What actually broke

### 2.1 Registration — day one

- Within hours of the 6 a.m. relaunch, thousands of users could not register through fuelpass.gov.lk.
- The **most common single complaint** was people trying to register more than one vehicle against the same NIC or business registration number, and being rejected with errors saying the ID or phone number was already registered.
- **OTPs arrived after the two-minute validity window had already expired.**
- **Second-hand vehicle owners were structurally blocked** — the previous owner's record had never been purged from the database.
- New-vehicle registration was simply unavailable, showing a message telling users registration had not started yet. Screenshots of it circulated widely.
- The **1919 helpline was reported not working.**
- The government instructed citizens to register from 6 a.m. while the system stayed offline **well past midday**. Across every account studied, this gap between announcement and functionality generated the most anger.

### 2.2 Root cause — and why it's a UX problem, not just an engineering one

The single biggest point of failure was a **synchronous dependency on the legacy RMV (Department of Motor Traffic) API.** Every registration and every QR refresh sent a direct request to that legacy system to verify vehicle ownership. It was never designed for high concurrency. Under national load it slowed and timed out; users saw errors and retried harder; the resulting retry storm brought the system down.

Compounding factors identified:

- **2023 data was reused without cleanup.** Vehicles had been sold, numbers changed or disconnected, ownership transferred — so the same QR code or mobile number was claimed by several people, while valid users were rejected because records no longer matched.
- **Mobile number was used as the primary identifier.** Numbers get recycled and vehicles get sold; chassis or engine number would have been more stable.
- **Big-bang nationwide launch** rather than a phased rollout by province, district or vehicle type.
- **Missing resilience patterns** — rate limiting, queuing, caching, graceful degradation, offline station operation.
- **Crisis behaviour was not designed for.** During a shortage people don't behave like calm users: they refresh constantly, borrow phones, and try every workaround. A system that ignores this multiplier fails.

> **This is the constraint our lecturer flagged in the workshop, confirmed with a live 2026 instance.** Legacy data latency is not an implementation detail to hand to the backend team — it determines whether registration can be synchronous at all. Our redesign has to answer it at the *experience* level.

### 2.3 Fixes bolted on after launch

These tell us what the redesign must handle natively, from day one:

- **19 March:** an override/reset feature letting a user enter vehicle number plus chassis number to reset an old registration, bypassing the stale phone number entirely.
- Province-by-province **data cleansing** to remove old vehicle records for transfers made after August 2023.
- The Ministry of Digital Economy working with **Dialog, Mobitel and Hutch** to identify and remove deactivated numbers from the database.

### 2.4 The station side

- Some stations were **not ready with QR readers** on day one, and pumped restricted quantities anyway.
- A few **disregarded the QR entirely**, citing ample fuel.
- Reporting found many sheds dispensing fuel **without scanning at all**, relying on personal connections and small payments — including refuelling vehicles after closing time.
- Fuel queues at times **turned violent**.
- The Fuel Station Owners' Association position was that operators can verify all details, including the registered vehicle number, when scanning.

**Reading:** the enforcement layer failed alongside the registration layer. A redesign that only fixes the citizen-facing form solves half the problem. If scanning is slower or less reliable than waving a customer through, operators will wave customers through.

### 2.5 Trust, security and communication

- **SL-CERT issued a public advisory on 17 March** warning that fraudulent sites using look-alike URLs with slightly altered characters were circulating on social media and messaging apps, designed to harvest personal data, along with QR phishing.
- Across 4,000+ comments on five official and news Facebook posts, **not a single official account responded**. One private individual was fielding complaints on his own time; nobody from the ministry or the development team was answering.
- The Government Information Department's own post functioned **as a complaints board rather than an information channel**, filling with error-message screenshots.
- Several commenters noted the **absence of a working helpline number or even a link to the registration portal** in the official posts themselves.
- Data-protection analysis noted no privacy impact assessment, no clear lawful basis for processing, and no meaningful informed consent — with citizens describing symptoms ("old owners' details appearing on my account") without the vocabulary to name them as data-protection failures.

### 2.6 The information vacuum

Dozens of commenters asked the same basic questions, unanswered:

- Can I use my old QR code?
- Do I need to register again?
- What about a 48cc bike with no number plate?
- Where do I find the chassis number?

All of these should have been answered in trilingual official communications *before* go-live. **This is a content design failure, and content design is squarely our job.**

---

## 3. Quota policy — and why it must be configuration, not content

| Vehicle category | At launch, 15 Mar | Revised, 21 Mar |
|---|---|---|
| Motorcycle | 5 L | 8 L |
| Quadricycle | 5 L | 8 L |
| Car | 15 L | 25 L |
| Three-wheeler | 15 L | 20 L |
| Van | 40 L | 50 L |
| Bus | 60 L | 100 L |
| Land vehicle | 25 L | 40 L |
| Lorry | 200 L | 200 L (unchanged) |
| Special purpose vehicle | 40 L | 40 L (unchanged) |

- Cycle runs weekly, **resetting Sunday at midnight**, with **no carry-forward** of unused balance.
- **The quotas changed within six days of launch.** Any design that treats these numbers as fixed copy is wrong before it ships.
- A separate mechanism exists for vehicles supporting **national production and essential services**, and private passenger buses are fuelled **through SLTB depots** rather than the ordinary station flow.
- From 18 March an **odd/even final-plate-digit rule** limited which days a vehicle could refuel at all — a second rationing layer stacked on the quota.

**Design implication.** Quota values, category definitions, reset schedule and the odd/even rule are all *policy*, changeable at short notice by people who are not developers. They belong in admin configuration with a publish-and-notify flow, not in the front end. Users also need to be told when their allocation changes — a silent change to someone's weekly litres is a livelihood event.

---

## 4. User groups — grounded in evidence, not invented

Each group below is drawn from documented complaints, not from a model's imagination. Evidence basis is stated so we can defend every persona to the board.

| Group | What the evidence shows | Basis |
|---|---|---|
| **Motorcycle riders, courier and delivery workers** | Repeatedly argued the weekly allocation cannot sustain their work. Commenters did the arithmetic — distance, consumption rate, work schedule — to show the shortfall. This is economic survival anxiety, not abstract grumbling. | Comment analysis, 4,000+ comments |
| **Three-wheeler drivers** | Income depends directly on the vehicle. Same detailed consumption-vs-allocation arguments. | Comment analysis |
| **Second-hand vehicle owners** | Structurally unable to register because the previous owner's record persisted. Needed an override feature that did not exist at launch. | Comment analysis; 19 Mar fix |
| **Owners of multiple vehicles / businesses on one BRN** | The single most common failure. Blocked by the one-identity-one-vehicle rule with no stated route forward. | Day-one reporting |
| **Senior citizens and first-time registrants** | Reported particular difficulty; queued physically at assistance desks and helplines. | Rollout reporting |
| **Tourism operators** | Vehicle allocations cannot sustain their businesses. | Comment analysis |
| **Fuel station operators** | Working under queue pressure, sometimes without functioning readers, sometimes bypassing the system entirely. | Station reporting |
| **Sinhala and Tamil speakers** | Complaints appeared in both Sinhala and English; trilingual pre-launch communication was absent. | Comment analysis |
| **Users on low-end phones or poor connectivity** | `[ASSUMPTION]` — strongly implied by the population and by the offline/print requirements, but we have not found a source quantifying it. Validate in interviews. | — |

---

## 5. Constraints the redesign must respect

1. **Legacy RMV latency.** Ownership verification cannot be assumed instant. This is the primary constraint.
2. **Policy volatility.** Quotas and rules change within days. Everything policy-shaped must be configurable and versioned.
3. **Trilingual delivery** — Sinhala, Tamil, English — covering not just labels but error messages, SMS templates and printable material.
4. **Data protection (PDPA).** Purpose limitation, lawful basis, consent, and correct handling of stale records.
5. **Identity model.** One NIC / passport / BRN maps to one profile and one vehicle in the standard process. This rule caused the most common failure, so whether to keep it is itself a design question for the board, not a given.
6. **Station reality.** Offline tolerance, speed under queue pressure, and clear rejection reasons — or operators will route around the system.
7. **Stacked rationing rules.** The QR quota is not the only constraint on a user; the odd/even day rule interacts with it.
8. **Separate channels** for essential services, production vehicles and SLTB-routed private buses.

---

## 6. International audit — how others handled the same problem

| Country | Approach | What we can learn |
|---|---|---|
| **Iran** | Smart-card system: chip card per vehicle, quota by vehicle type and use, **balance displayed at the pump on insertion**, tiered pricing. Taxis, ambulances and buses received substantially more. Rolled out **starting in one province, then nationwide**. | Two things Sri Lanka lacked: a phased geographic rollout, and balance visible at the point of use rather than only in an app. Academic critique notes rationing is a symptomatic fix — allocations tend to shrink over time. |
| **Myanmar** | Odd/even plate restriction by day | Same second-layer mechanism Sri Lanka added on 18 March |
| **Bangladesh** | Daily purchase limits from 6 March, later suspended when reserves proved sufficient | A rationing system needs a *graceful exit*, not just a launch |
| **Cambodia** | Closed roughly a third of stations — de facto rationing without per-vehicle quotas | Supply-side rationing avoids the identity problem entirely |
| **Pakistan** | Four-day work week, school closures, 50% cut to government fuel allowances | Demand reduction as an alternative to per-citizen rationing |
| **Slovenia** | First EU country to introduce formal rationing in this crisis | — |

**Insight for the board:** every country that rationed faced the same fairness problem. Sri Lanka is one of the few that solved it with a *per-citizen digital identity check*, which is the most user-hostile of the available mechanisms and the only one that can fail at the individual level. That framing is worth stating explicitly in the proposal.

---

## 7. Candidate design directions

These follow from the evidence above. They are candidates for the team to accept, modify or reject in ideation — not decisions.

1. **Make registration asynchronous.** Acknowledge immediately with a reference number, validate against RMV in a controlled queue, notify by SMS. Removes the retry storm and removes the user's uncertainty at the same time.
2. **Anchor identity on chassis or engine number**, not mobile number.
3. **Build ownership-transfer reset in from the start**, as a first-class user journey rather than a bolted-on override.
4. **Show honest system status** — including "registration opens at X", queue position, and what to do meanwhile. The worst day-one damage came from telling people to act while the system was down.
5. **Treat quota as published policy** with an effective date, a change history, and notification when a user's allocation changes.
6. **Design the station flow for speed and offline first.** If it is slower than not scanning, it will not be used.
7. **Build visible trust signals** against the phishing problem — official domain guidance, verification cues, and an in-product way to check you are on the real service.
8. **Trilingual everything**, errors and SMS included.
9. **Answer the top questions in the product**, not only in a FAQ: old QR validity, re-registration, unplated small vehicles, where to find the chassis number.

---

## 8. Gap analysis input

Our teammate's requirements document proposes a large system: four portals, roughly seventy screens, full admin and fraud tooling. Held against this research:

- **Well supported:** station portal, error-recovery centre, dispute flow, trilingual support, accessibility, quota display, status stages, configurable policy.
- **Under-weighted:** the RMV latency constraint is listed as an integration item rather than the defining experience constraint; the phishing/trust problem is absent; the odd/even rule is absent; the post-launch override flow is absent.
- **Over-scoped for a board demo:** system architecture, data model, penetration and performance testing, full admin reporting suite.

**Action:** complete the formal gap analysis in `gap-analysis.md` — for each proposed feature, state whether evidence supports it, contradicts it, or is silent. Features with no evidence behind them get cut or flagged as assumptions. This gap analysis is itself a strong section of the Medium article.

---

## 9. What this file does NOT cover — team to complete

Desk research cannot substitute for these, and the assignment is assessed on them:

- [ ] **Primary interviews.** Five to ten people across vehicle types — at minimum one three-wheeler driver, one delivery rider, one older user, one person who registered in 2026. Ask what actually happened to them in March.
- [ ] **One station operator conversation.** Nobody in the class will have this. It is a differentiator.
- [ ] **Walk the live site** at fuelpass.gov.lk and record where it is confusing today. Screenshot everything.
- [ ] **Verify every figure in §3** against the current CPC/Ministry position before it appears on a board slide. Quotas have already moved once.
- [ ] **Usability testing** of our prototype — ten to fifteen people, think-aloud, recorded.
- [ ] **Gap analysis** per §8.

---

## 10. Sources

| # | Source | Date |
|---|---|---|
| 1 | Ministry of Energy — implementation notice, energymin.gov.lk | 15 Mar 2026 |
| 2 | news.lk — QR code fuel system implemented from today | 15 Mar 2026 |
| 3 | Newswire — *Fuel QR Relaunch: Public Reaction and Digital Readiness*, Dr Sanjana Hattotuwa (analysis of 4,000+ Sinhala and English comments across five Facebook posts) | 15 Mar 2026 |
| 4 | Jaffna Monitor — QR Fuel Pass relaunch technical glitches | 16 Mar 2026 |
| 5 | EconomyNext — motorists complain of lapses amid queues | 16 Mar 2026 |
| 6 | Fact Crescendo / FactSeeker — SL-CERT advisory on fraudulent Fuel Pass sites | 17 Mar 2026 |
| 7 | Newsfirst / EconomyNext / news.lk — CPC quota revision | 21–22 Mar 2026 |
| 8 | Sunday Times — *QR Code persists amidst glitches and hitches* | 22 Mar 2026 |
| 9 | LankaGuide — registration error guide, override feature, data cleansing | 23 Mar 2026 |
| 10 | Parathan Thiyagalingam — *Why Sri Lanka's Fuel QR System Crashed in 2026* (technical root-cause analysis) | 24 Mar 2026 |
| 11 | Al Jazeera / Forbes / Newsweek — international fuel rationing comparison | 16–31 Mar 2026 |
| 12 | *A Survey on Factors Affecting Iran's Fuel Rationing Smart Card User Acceptance and Security* (arXiv) | — |
| 13 | Ceylon Public Affairs — registration challenges for senior citizens and first-time registrants | 20 Mar 2026 |
