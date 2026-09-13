// Single source of truth for the constants in tokens.md §7.2 — every
// component reads from here rather than restating a number that could
// drift out of sync. All three are [ASSUMPTION]-flagged demo-pacing
// judgements except the instant-response one, which is a design decision.
export const S4_TOTAL_DELAY_MS = 6000
export const S9_RESULT_HOLD_MS = 3000
export const INSTANT_MS = 100 // duration-instant token — CSS transition only, never a simulated wait
