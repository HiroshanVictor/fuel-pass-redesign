# threads.md

**Project:** Fuel Pass redesign — proposal prototype for the CPC director board

Registry of every AI conversation, repository and deployment behind this project. The assignment requires links to the AI threads so the reasoning behind each step is auditable, not just the output.

**How to get a Claude share link:** open the conversation, use the share button, copy the generated URL. For Gemini, use the share icon at the bottom of the conversation. Check each link in a private/incognito window before submitting — an unshared link will 404 for your lecturer.

---

## Live links

| Artifact | Link |
|---|---|
| **Hosted application** | https://fuel-pass-redesign-murex.vercel.app/ |
| **GitHub repository** | https://github.com/HiroshanVictor/fuel-pass-redesign |
| **Medium article** | `[add when published]` |
| **Design files** | `[add when produced]` |

---

## AI threads

Listed in the order the work happened.

### Thread 1 — Process agreement and session analysis
**Tool:** Claude · **Link:** `[add]`

Extracted the full content of Workshop 3 Session 1 from the session transcript, then agreed the four-step UX process for the team and produced `ux-process.md`. Also covered tooling choices, review of the teammate's requirements document, and the Step 1 desk research that became `research.md`.

**Produced:** `ux-process.md`, `research.md`, `feature-list.md`, `decisions.md` (backfilled), and the edited `users.md`

---

### Thread 2 — Step 1 synthesis
**Tool:** Claude · **Link:** `[add]`

Turned `research.md` into personas, a ranked problem list, and the gap analysis against the teammate's proposed feature list. Includes the §8 persona questions and the decisions on the new-vehicle registrant stub and the 48cc unpersonated case.

**Produced:** `users.md`, `problems.md`, `gap-analysis.md`

---

### Thread 3 — Steps 2, 3 and 4 (build)
**Tool:** Claude Code · **Link:** `[add — or note "local CLI session, see commit history"]`

Sitemap, user flows, screen content and microcopy; then the design system (tokens, component spec, accessibility); then the React application itself. Includes the S6 rename, the chassis-anchor assumption flag, the S4/#4 scope exception, the contrast corrections, and the D20 error-copy fix.

**Produced:** `sitemap.md`, `user-flows.md`, `screen-content.md`, `microcopy.md`, `tokens.md`, `component-spec.md`, `accessibility.md`, `build-notes.md`, and the application

> If Claude Code sessions have no shareable URL, say so here and point to the repository commit history instead — the commits are the audit trail for this stretch.

---

### Thread 4 — Design files
**Tool:** `[Claude Design / Figma]` · **Link:** `[add]`

Rendering the ten screens and the component sheet from `tokens.md` and `component-spec.md`, to satisfy the design files deliverable.

---

## Notes for the write-up

- The decision log in `decisions.md` is the spine of the Medium article. Each D-entry pairs with a thread above.
- Where a decision was the AI's suggestion that the team accepted, say so in the article. It is more honest than claiming all of it, and it demonstrates the oversight the process asks for.
- D7 and D8 are worth highlighting together: two personas with identical evidence weight, one cut and one kept, with the reasoning for treating them differently written down.
