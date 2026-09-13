import { SignalSlashIcon } from '@heroicons/react/24/solid'

// component-spec.md §8 — shared by S9 and S10. Not a failure state: it's
// the degraded-but-functioning state (see component-spec.md §8's Error
// row for why this distinction matters).
export default function OfflineBanner({ offlineSince }) {
  if (!offlineSince) return null

  const timestamp = offlineSince.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex animate-slideIn items-center gap-3 rounded-lg bg-surface-inverse px-4 py-3 text-outdoor-body text-white"
    >
      <SignalSlashIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
      <p>
        Offline — checking against records last updated {timestamp}. Transactions will sync automatically once
        reconnected.
      </p>
    </div>
  )
}
