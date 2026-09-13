// Tiny local className joiner — not a dependency, per the brief's
// "no component framework, no state library" scope.
export function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}
