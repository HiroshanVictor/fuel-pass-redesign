import { useStation } from '../state/StationContext'
import OfflineBanner from './OfflineBanner'

// Layout only. Outdoor tier: full-bleed, high contrast, no shadows —
// tokens.md §5 rules out shadow-based affordances outdoors entirely.
export default function StationShell({ children }) {
  const { offlineSince } = useStation()
  return (
    <main className="min-h-screen bg-white px-4 py-6 text-text-primary-outdoor sm:px-8 sm:py-8">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <OfflineBanner offlineSince={offlineSince} />
        {children}
      </div>
    </main>
  )
}
