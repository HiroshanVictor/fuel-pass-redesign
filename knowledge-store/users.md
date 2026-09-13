# 01-discovery / users.md

**Project:** Fuel Pass redesign — proposal prototype for the CPC director board
**Compiled:** September 2026
**Source:** `research.md` (01-discovery) — sole source. No external facts, figures or quotes have been added.
**Status:** Desk-derived personas. **None of these is validated by primary research.** `research.md` §9 records that interviews are still outstanding; until they are done, every persona here is a defensible reading of published evidence, not a researched person.

> **Traceability rule.** Every trait below carries a citation to the place in `research.md` it came from. Anything that is our inference rather than a sourced claim is tagged `[ASSUMPTION]`. Traits that could not be traced were left out rather than invented — see §7, *Deliberate omissions*.

> **Read §6 before using this file.** The evidence base has a known bias, and it affects which problems look biggest.

---

## 0. Revision note

This file was drafted with AI assistance from `research.md`, then reviewed and edited by the team. Changes made in review:

| Change | Reason |
|---|---|
| Citation scheme simplified | The draft invented a letter index (`§2.1-a`, `§2.1-b`…) that does not exist in `research.md`. References looked more precise than they were and could not be checked without counting bullets. Now uses section number plus a short descriptor. |
| Personas renumbered and reordered | Now ordered by **designability** — whether our redesign can actually address them — rather than by severity alone. |
| Tourism operator persona removed | Rested on a single evidence line. The draft itself said it should not carry weight in a board argument. |
| Multi-vehicle owner demoted from lead persona | It is the most common failure, but it is blocked by CPC policy, not by the interface. It is a board question, not a design target. Retained as P4 with that flag. |
| Borrowed-phone insight promoted | Was buried in a cross-cutting attributes table. It is the strongest single argument in this file and now has its own section (§5). |
| §6 added — evidence limitations | The draft could not assess the reliability of its own source. We can. |
| Success baseline added to gaps | Every persona in the draft was a failure case. We have no record of what currently works and must not be broken. |
| **P7 added as a stub** *(second revision)* | `problems.md` surfaced a documented problem — new-vehicle registration unavailable — with no persona behind it. Added on one evidence line, with the reasoning in §4 for why that is consistent with cutting the tourism operator on one. |

---

## 1. Citation key

Citations point at `research.md` by section number, with a short descriptor so the specific claim can be found by eye.

| Code | Refers to |
|---|---|
| `§1` | Timeline and reinstatement facts |
| `§2.1` | Day-one registration failures |
| `§2.2` | Root cause — synchronous RMV dependency, retry storm, compounding factors |
| `§2.3` | Post-launch fixes (19 Mar override, province data cleansing, telco number purge) |
| `§2.4` | Station-side failures |
| `§2.5` | Trust, security and communication failures |
| `§2.6` | The four unanswered questions |
| `§3` | Quota table, reset rules, policy churn, odd/even rule |
| `§4 › "<row>"` | Named row of the §4 user-groups table |
| `§5-1 … §5-8` | Numbered constraints |
| `§9` | Outstanding work the team must complete |

---

## 2. How these personas were built

`research.md` §4 lists nine evidence-backed user groups with the basis for each. This file turns those rows into personas the board can be walked through, keeping evidence attached to each individual trait rather than to the group as a whole.

**Ordering principle.** Personas are ordered by whether a redesign can address them:

- **P1–P3** are design targets. Something we build can materially change their experience.
- **P4** is a board question. It is the most common documented failure, but the cause is a policy rule CPC owns. We can argue it; we cannot design around it.
- **P5–P7** are secondary — evidenced, but thinly. P7 is a stub; see §4.

Two groups from §4 are **not** rendered as standalone personas, because the evidence describes an attribute cutting across the others rather than a distinct person: *Sinhala and Tamil speakers*, and *users on low-end phones or poor connectivity*. Both appear in §5.

---

## 3. Personas

### P1 — Second-hand vehicle owner *(lead citizen persona)*

Derived from `§4 › "Second-hand vehicle owners"`.

**Why this one leads:** it is the most severe failure that our design can actually fix. P4's problem is larger in volume but sits with policy; this one sits with the product.

| Trait | Evidence |
|---|---|
| Bought a vehicle whose previous owner's record was never purged from the database | `§2.1` (second-hand blockage); `§4 › "Second-hand vehicle owners"` |
| **Structurally** blocked from registering — not a transient error they can retry past | `§2.1` (second-hand blockage) |
| Root cause is 2023 data reused without cleanup: vehicles sold, numbers changed or disconnected, ownership transferred | `§2.2` (stale 2023 data) |
| The same QR code or mobile number ends up claimed by several people, while valid users are rejected because records no longer match | `§2.2` (stale 2023 data) |
| Sees the previous owner's details on their own account | `§2.5` (data-protection failures) |
| Lacked the vocabulary to name this as a data-protection failure, so reported it as a symptom | `§2.5` (data-protection failures) |
| No route existed at launch; relief arrived only on **19 March**, four days in, as an override requiring vehicle number plus chassis number | `§2.3` (19 Mar override); `§1` |
| Likely does not know where to find the chassis number — one of the four questions asked repeatedly and left unanswered | `§2.6` (chassis number) |
| Their case depends on province-by-province data cleansing for transfers made after August 2023 | `§2.3` (province cleansing) |
| The underlying modelling error is mobile number used as primary identifier; chassis or engine number would have been more stable | `§2.2` (mobile number as identifier) |

**What "it worked" looks like:** ownership transfer is a route they complete themselves on day one, without a helpline and without waiting for their province's data to be cleansed. The four-day gap between launch and the override is the measure of the current failure.

---

### P2 — Fuel station operator

Derived from `§4 › "Fuel station operators"` and `§2.4`.

| Trait | Evidence |
|---|---|
| Works under queue pressure | `§4 › "Fuel station operators"` |
| Fuel queues at times turned violent | `§2.4` (violent queues) |
| Some stations had no working QR reader on day one and pumped restricted quantities anyway | `§2.4` (no readers) |
| A few disregarded the QR entirely, citing ample fuel | `§2.4` (QR disregarded) |
| Many sheds dispensed without scanning at all, relying on personal connections and small payments — including refuelling after closing time | `§2.4` (dispensing without scanning) |
| The Fuel Station Owners' Association position is that operators can verify all details, including the registered vehicle number, when scanning | `§2.4` (Association position) |
| If scanning is slower or less reliable than waving a customer through, operators will wave customers through | `§2.4` (Reading paragraph) |
| The system must tolerate offline operation, be fast under queue pressure, and give clear rejection reasons — or operators route around it | `§5-6` |
| Offline station operation was among the resilience patterns missing at launch | `§2.2` (missing resilience) |

**What "it worked" looks like:** scanning is the *fastest* way to move the queue, and works when the connection does not.

**Why this persona ranks second despite thin sourcing.** The enforcement layer failed alongside the registration layer — a redesign that only fixes the citizen-facing form solves half the problem (`§2.4`, Reading paragraph). `research.md` §9 also notes that nobody in the class will have spoken to a station operator, making it our differentiator.

---

### P3 — Motorcycle rider, courier or delivery worker

Derived from `§4 › "Motorcycle riders, courier and delivery workers"`.

| Trait | Evidence |
|---|---|
| Income depends on distance covered; repeatedly argued the weekly allocation cannot sustain their work | `§4 › "Motorcycle riders…"` |
| Argued it **quantitatively** — distance, consumption rate, work schedule — to show the shortfall | `§4 › "Motorcycle riders…"` |
| The research characterises this as economic survival anxiety, not abstract grumbling | `§4 › "Motorcycle riders…"` |
| Motorcycle allocation: 5 L at launch, revised to 8 L on 21 March | `§3` (quota table) |
| Quota runs weekly, resets Sunday at midnight, **no carry-forward** of unused balance | `§3` (reset rules) |
| From 18 March an odd/even final-plate-digit rule limited which days they could refuel at all — a second rationing layer stacked on the quota | `§3` (odd/even rule); `§5-7` |
| A silent change to their weekly litres is a livelihood event | `§3` (design implication) |
| Quotas moved within six days of launch, so any number they were told was provisional | `§3` (policy churn) |

**What "it worked" looks like:** before setting out, they know how much allocation remains, when it resets, and whether today is a day they are permitted to refuel at all. A correct quota balance alone is not sufficient information to act on.

**Note on scope.** P3's core grievance is the *size* of the allocation, which CPC sets. `[ASSUMPTION]` — we read their addressable need as certainty and advance notice rather than volume; `research.md` does not separate these two. **This is a question for the interviews.**

---

### P4 — Owner of multiple vehicles, or a business on one BRN

Derived from `§4 › "Owners of multiple vehicles / businesses on one BRN"`.

> **⚠ Board decision required — not a design target.** This is the most common documented failure of the relaunch, but its cause is the one-identity-one-vehicle policy rule, which CPC owns. No interface change fixes it. We present it to the board as a policy question and design only the *refusal experience* around it.

| Trait | Evidence |
|---|---|
| Holds more than one vehicle against a single NIC or business registration number | `§4 › "Owners of multiple vehicles…"`; `§2.1` (multi-vehicle rejection) |
| Attempting a second registration is rejected with an error stating the ID or phone number is already registered | `§2.1` (multi-vehicle rejection) |
| Reported as the single most common failure of the relaunch — **but see §6 on evidence bias** | `§4 › "Owners of multiple vehicles…"`; `§2.1` |
| Blocked by the one-identity-one-vehicle rule with **no stated route forward** | `§4 › "Owners of multiple vehicles…"` |
| The rule is formal system policy: one NIC / passport / BRN maps to one profile and one vehicle in the standard process | `§5-5` |
| Whether to keep that rule is an open design question for the board, not a fixed requirement | `§5-5` |
| A parallel channel already exists for vehicles supporting national production and essential services — so exceptions to one-per-identity already exist in policy | `§3` (separate channels) |

**What we can still design:** a clear, immediate, in-session refusal that explains the rule and names the route forward — rather than a silent rejection. `[ASSUMPTION]` — that a clear refusal is materially better than a silent one is our inference; `research.md` does not test it.

**The argument to the board:** essential-services vehicles already sit outside the one-per-identity rule (`§3`). The policy therefore already admits exceptions. Extending that to businesses operating fleets is a policy adjustment, not a new principle.

---

## 4. Secondary personas

Evidenced in `research.md` but with less detail behind them. Recorded so they are not lost; not developed further until interviews (`§9`) give us more.

| Persona | Traits | Evidence |
|---|---|---|
| **P5 — Three-wheeler driver** | Income depends directly on the vehicle. Made the same detailed consumption-versus-allocation arguments as P3. Allocation 15 L at launch, revised to 20 L on 21 March. Subject to the same weekly reset, no carry-forward, and odd/even day rule. | `§4 › "Three-wheeler drivers"`; `§3` |
| **P6 — Senior citizen or first-time registrant** | Reported particular difficulty registering. Queued physically at assistance desks and helplines. The 1919 helpline was reported not working. Official posts contained no working helpline number and no link to the registration portal. | `§4 › "Senior citizens and first-time registrants"`; `§2.1` (1919 helpline); `§2.5` (no helpline or portal link) |

| **P7 — New-vehicle registrant** *(stub)* | Registering a newly purchased vehicle. At launch the flow was simply unavailable, returning a message that registration had not started yet; screenshots circulated widely. `research.md` does not record when or whether this was resolved. | `§2.1` (new-vehicle registration unavailable) |

### Why P7 is kept on one evidence line when the tourism operator was cut on one

*Removed in review: tourism operator. Rested on a single evidence line with nothing behind it. Re-add only if interviews substantiate it.*

P7 rests on exactly as little evidence, and is kept anyway. The two decisions are consistent, on this reasoning:

| | Tourism operator | P7 — new-vehicle registrant |
|---|---|---|
| Evidence weight | One line | One line |
| Nature of the problem | A **crisis-period grievance** about allocation volume — the allocation cannot sustain the business | A **structural block** on a journey the system must always support |
| Persists after March 2026? | Ends when rationing ends | Every vehicle bought from now on needs a first registration, whether or not there is ever another shortage |
| Effect of being wrong about it | We drop a group that interviews can re-add | We ship a system with no entry point for new owners |

`[ASSUMPTION]` — that this group persists beyond the crisis is our inference. `research.md` documents only March 2026 and makes no claim about steady-state registration. The inference is that a fuel-rationing system tied to vehicle ownership must handle newly owned vehicles for as long as it exists.

**Stub status is deliberate.** P7 has traits but no depth, and must not carry a board argument until the interview below is done. It is recorded so the journey is not designed around its absence.

---

## 5. The identity collision

**This is the strongest design argument in this file.** `research.md` states two facts separately; the collision between them is our reading.

1. During a shortage, people do not behave like calm users. They refresh constantly, **borrow phones**, and try every workaround. A system that ignores this multiplier fails. `§2.2` (crisis behaviour)
2. The system uses **mobile number as the primary identifier**. Numbers get recycled and vehicles get sold; chassis or engine number would have been more stable. `§2.2` (mobile number as identifier)

`[ASSUMPTION]` — the interaction between these two is our inference, not a claim `research.md` makes.

**Why it matters.** The behaviour the system provokes under crisis load is precisely the behaviour its identity model cannot survive. A borrowed phone is not an edge case during a fuel shortage; it is what people do when their own phone cannot receive the OTP in time (`§2.1`, expired OTPs). Every downstream failure in P1 — stale records, duplicate claims, the four-day wait for an override — traces back to anchoring identity on the least stable attribute available.

**Design consequence.** Moving identity to the chassis or engine number is not a technical preference. It is the single change that unblocks P1 structurally, and it is the recommendation this file exists to support.

---

## 6. Evidence limitations

`research.md` draws overwhelmingly on **social media complaints and news reporting from March 2026**. That shapes what looks important, and the distortion runs in a predictable direction.

| Limitation | Effect on this file |
|---|---|
| **Complaint volume is not harm volume.** The evidence records who complained loudest and in writing, not who was hurt most. | P4 is labelled the most common failure on that basis. It may instead be the most *articulated* failure. A delivery rider losing a day's earnings is far less likely to post an error screenshot than a car owner in Colombo. |
| **Channel skew.** The source comment analysis covers Facebook posts in Sinhala and English. | Tamil-speaking users are almost certainly under-represented, which makes the language attribute in §5 *more* important than the evidence makes it look, not less. |
| **Literacy and access skew.** Complaining online requires a working device, data, and written literacy. | The users least able to use the system are the least likely to appear in evidence about it. P6 is probably under-weighted. |
| **Time skew.** Nearly all evidence is from the first two weeks after launch. | We know a great deal about the crisis and almost nothing about steady-state use six months on. |
| **Survivorship.** No source describes a registration that simply worked. | See §7 — we have no baseline for what not to break. |

**Consequence for the board argument:** where we cite "most common", we should say "most reported". The distinction is small in wording and large in honesty, and it is the sort of thing a director board will test.

---

## 7. Evidence gaps, mapped to the interview plan

| Persona | What we cannot currently say | Closed by (`§9`) |
|---|---|---|
| P1 | Whether the 19 March override actually worked for them; whether they found the chassis number; how long they went without fuel | Interviews — "one person who registered in 2026" |
| P2 | Everything about the scanning experience: how long a scan takes, what happens when it fails, what the reader hardware actually is | One station operator conversation |
| P3 | Actual weekly consumption against the 8 L allocation; whether the odd/even rule or the quota bit harder; whether certainty or volume is the real need | Interviews — "one delivery rider" |
| P4 | How many vehicles a typical blocked owner holds; whether these are businesses or households; what they did instead when blocked | Interviews |
| P5 | Same as P3, for the 20 L three-wheeler allocation | Interviews — "one three-wheeler driver" |
| P6 | What specifically was difficult — the OTP, the form, or the device | Interviews — "one older user" |
| **P7** | **Everything beyond the single line of evidence: whether new-vehicle registration works today, what the DMT record looks like before first registration, how long after purchase a vehicle becomes registrable** | **Add to interview plan: one person who registered a newly purchased vehicle** |
| **All** | **What a successful registration looks like.** Every persona here is a failure case, because every source is about failure. We have no record of what currently works and must not be broken. | **Add to interview plan: at least one person for whom registration simply worked** |
| All | Current-day experience of the live portal | Walk the live site at fuelpass.gov.lk |
| All | Whether the quota figures in `§3` are still current | Verify every figure in §3 |

---

## 8. Deliberate omissions

A conventional persona template asks for the following. None of it appears in `research.md`, so none of it appears here.

- Names, ages, gender, photographs
- Income figures, household composition, education level
- Districts, cities or any geographic placement of an individual
- Device models, operating system versions, data-plan details
- Tech-literacy ratings or digital-confidence scores
- Verbatim quotes attributed to individuals — `research.md` contains none
- Population sizes or percentages for any group — `research.md` gives no group-level counts. It reports 4,000+ comments in total, which is a volume of comments, not a count of people, and cannot be split by persona.

Personas are labelled by role rather than given names. If the board deck needs named personas, add names as clearly-marked fiction and leave the evidence tables intact.

---

## 9. Scope recommendation

Seven personas is more than a ten-screen prototype can serve. Build for two:

- **P1, the second-hand vehicle owner** — the most severe failure our design can actually fix, and the one that §5 explains structurally.
- **P2, the fuel station operator** — because fixing only the citizen side solves half the documented problem, and because no other group will have this.

**P4 is the board argument, not the build.** Present it as a policy question with the essential-services precedent behind it.

**P7 is not in the build either.** It is a stub held open so that the registration journey is not designed as though new owners do not exist.

All seven personas stay in this file as the research record. The cut is a prototype decision, not a deletion.
