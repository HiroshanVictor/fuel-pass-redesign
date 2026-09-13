# 02-ideation / microcopy.md

**Project:** Fuel Pass redesign — proposal prototype for the CPC director board
**Sources:** `screen-content.md`, `user-flows.md`, `decisions.md` D9, D13, D14, D15, D16 — sole sources.
**Language:** English only. `sitemap.md` §8 records trilingual delivery as out of scope per `CLAUDE.md`, not as a gap in this file.
**Convention:** `{{like this}}` marks a dynamic value filled at runtime (a looked-up vehicle number, a timestamp). Everything else is the literal, final string. No field in this file is a stand-in for copy not yet written.

No specific support phone number or email appears anywhere below. `problems.md` #7 and #22 (fallback routes, response channels) are not among D15's four named problems, and `sitemap.md` §8 excludes the support-and-communication cluster (C9) from this build. Inventing a channel here would quietly build a fifth problem's solution without naming it as an exception, the exact mistake D16 exists to prevent for #4. Copy below says "contact CPC" and stops there.

---

## S1 — Start

| Element | String |
|---|---|
| Headline | Set up or check your Fuel Pass |
| Body | If your vehicle has ever had a Fuel Pass or QR code before — including if you've just bought it second-hand — you'll need to check it again here. |
| Primary button | Continue |
| Secondary link | Help & Answers |

---

## S2 — Find Your Vehicle

| Element | String |
|---|---|
| Headline | Find your vehicle |
| Body | Enter your vehicle registration number and chassis number. We'll check them against DMT records. |
| Field label 1 | Vehicle registration number |
| Field example 1 | e.g. CAB-1234 |
| Field label 2 | Chassis number |
| Inline help link | Where do I find this? |
| Primary button | Find my vehicle |
| Inline error (no record found) | We couldn't find a record matching those details. Double-check the vehicle registration number and chassis number, then try again. |

---

## S3 — Locate Your Chassis Number

| Element | String |
|---|---|
| Headline | Where to find your chassis number |
| Body | It's usually stamped on the chassis plate under the bonnet or in the engine bay, and printed on your vehicle registration document (revenue licence or CR book) next to "Chassis No." |
| Return button | Back to my details |

---

## S4 — Verifying Your Vehicle

| Element | String |
|---|---|
| Status message 1 | Checking your details... |
| Status message 2 | Checking DMT vehicle records... |
| Status message 3 | Almost done... |
| Supporting line | This can take a little longer during busy periods — we're checking directly against national vehicle records. |

---

## S5 — Fuel Pass Issued

| Element | String |
|---|---|
| Headline | Your Fuel Pass is ready |
| Body | Show this QR code at any fuel station. |
| Vehicle line | Registered to {{vehicle registration number}} |
| Old-QR note | Any Fuel Pass or QR code issued for this vehicle before today is no longer valid. |
| Override note (conditional — Flow 2 only) | This Fuel Pass was issued after you confirmed you're the current owner of this vehicle. If that's not correct, contact CPC. |
| Primary button | Download QR code |
| Secondary button | Print |

---

## S6 — Still Registered to a Previous Owner

| Element | String |
|---|---|
| Headline | This vehicle is still registered to a previous owner |
| Body | The vehicle and chassis numbers you entered match a record on file — but that record hasn't been updated since it last changed hands. This isn't something you've entered incorrectly; it's our records catching up to a real sale. |
| Primary button | This is my vehicle — claim it |
| Secondary button | This isn't my situation — get help |
| Tertiary link | Read more in Help & Answers |

---

## S7 — Submit a Dispute

| Element | String |
|---|---|
| Headline | Submit a dispute |
| Body | Some ownership changes need a closer look before we can update the record automatically. Tell us what you have, and an officer will review it. |
| Field label 1 | Proof of purchase or ownership document |
| Field label 2 | Anything else you'd like to add (optional) |
| Primary button | Submit for review |
| Confirmation | Your dispute has been submitted. An officer will review it and get in touch using the details on file. |

---

## S8 — Help & Answers

| Element | String |
|---|---|
| Headline | Help & Answers |
| Q1 | Do I need to register again? |
| A1 | Yes, if your vehicle has changed hands, or has had a Fuel Pass or QR code before. Go to Find your vehicle to check. |
| Q2 | Can I use my old QR code? |
| A2 | No. Once a new Fuel Pass is issued for a vehicle, any QR code issued before it stops working. |
| Q3 | Where do I find my chassis number? |
| A3 | See Locate your chassis number. |
| Q4 | What about a 48cc bike with no number plate? |
| A4 | This isn't something we can check here yet. Please contact CPC directly for guidance on unplated vehicles. |
| Q5 | I'm registering a brand-new vehicle for the first time — is this the right place? |
| A5 | Not yet. This covers vehicles that have already been registered or had a Fuel Pass before. First-time registration for new vehicles is handled separately by CPC. |
| Footer link | Still stuck? Submit a dispute and an officer will help. |

---

## S9 — Station Scan

| Element | String |
|---|---|
| Ready-state prompt | Scan customer's Fuel Pass QR code |
| Success state | ✓ Valid — {{vehicle registration number}} |
| Rejection state | ✗ Not valid — {{reason, e.g. "This Fuel Pass was superseded by a newer one"}} |
| Offline banner | Offline — checking against records last updated {{timestamp}}. Transactions will sync automatically once reconnected. |
| Fallback link | Can't scan? Enter manually |

---

## S10 — Scan Couldn't Complete

| Element | String |
|---|---|
| Headline | Scan couldn't complete |
| Body | We couldn't read that QR code — it may be damaged, or the camera couldn't focus. This doesn't mean anything about the vehicle. |
| Field label | Vehicle registration number |
| Primary button | Check manually |
| Return link | Back to scanning |

*(Result states after manual entry reuse S9's Success and Rejection strings verbatim — see above, not repeated here.)*

---

## Addendum — strings identified during the Step 4 build

Two validation cases existed in the spec (`component-spec.md` §1's Error row for S7; `screen-content.md`'s S10 result states) but no exact string had been written for them. Added here rather than invented silently in code, per `build-notes.md`'s build-vs-spec discipline.

| Element | String |
|---|---|
| S7 — file required, submit attempted with none attached | Please attach proof of purchase or an ownership document before submitting. |
| S9/S10 — manual entry or scan resolves to a vehicle number with no Fuel Pass record at all (distinct from "superseded") | No Fuel Pass record found for this vehicle. |

## Consistency checks this file was written against

Carried from `screen-content.md`'s cross-screen principles, restated as copy-specific rules so a reviewer can check strings against them directly:

1. **S6's body never says "check," "correct," "verify what you entered," or any synonym implying user error.** The S2 inline error is the only string in this file that questions what was typed, and only because that screen is genuinely about a possible typo.
2. **S7's confirmation and S10's manual-entry flow promise no timeline.** Neither string above names a duration, a business-day count, or a "soon."
3. **No string in S9 or S10 blames the vehicle for a scan failure, and no string in S9's rejection state is vaguer than naming the actual reason.** "Not valid" never appears alone.
4. **No phone number, email address, or named channel appears anywhere in this file**, per the scope note at the top.
