# Fuel Pass Redesign — Project Context

UX redesign proposal for Sri Lanka's National Fuel Pass, presented to
the CPC director board. University coursework in AI-native UX process.

## Rules
- `knowledge-store/` is the only source of information. Never introduce
  facts, figures or quotes from elsewhere.
- If something needed is missing, stop and ask. Do not assume.
- Mark inferences as `[ASSUMPTION]`.
- Every screen must trace to a ranked problem in `problems.md` §9.
  A screen that cannot is not built.
- Log every significant decision in `decisions.md`, appended never rewritten.

## Settled decisions
- Identity anchors on chassis number, not mobile number (D14).
- Self-service override primary, manual dispute as fallback (D13).
- Multi-vehicle owner is a board argument, not a build target (D6).
- Say "most reported", not "most common" — see `users.md` §6 (D10).

## Scope
See `decisions.md` D15. Build only for what it names.

## Out of scope
Production readiness, real RMV/CPC integration, payments, full
localisation, scale and security hardening. This is a board demo.