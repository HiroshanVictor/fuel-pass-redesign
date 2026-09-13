// Layout only — not one of the eight component-spec.md components.
// Standard tier: centered card, shadow-card per tokens.md §5 (never the
// sole indicator of anything interactive, just page structure).
export default function CitizenShell({ children }) {
  return (
    <main className="flex min-h-screen items-start justify-center px-4 py-10 sm:py-16">
      {/* tokens.md §5: shadow-card token = Tailwind's own shadow-sm */}
      <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-sm sm:p-10">{children}</div>
    </main>
  )
}
