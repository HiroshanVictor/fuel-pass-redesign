import { useEffect, useState } from 'react'
import { ClockIcon } from '@heroicons/react/24/outline'
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'
import { S4_TOTAL_DELAY_MS, S4_MESSAGE_TIMES_MS } from '../data/timing'

const MESSAGES = [
  'Checking your details…',
  'Checking DMT vehicle records…',
  'Almost done…',
]

// component-spec.md §6 — the honest wait named in the brief. Deliberately
// not a spinner: a determinate bar plus staged, specific text tells the
// user something concrete is happening, per sitemap.md §3–4 and R §5-1.
// [ASSUMPTION] on the 6-second duration itself — see tokens.md §7.2.
export default function VerificationWaitState({ onDone }) {
  const reducedMotion = usePrefersReducedMotion()
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timers = S4_MESSAGE_TIMES_MS.map((time, index) =>
      window.setTimeout(() => setMessageIndex(index), time)
    )
    const doneTimer = window.setTimeout(() => onDone?.(), S4_TOTAL_DELAY_MS)

    // Linear fill, not eased — an eased fill would imply an acceleration
    // that isn't actually happening in a fixed-rate mock.
    let raf
    const start = performance.now()
    function tick(now) {
      const elapsed = now - start
      setProgress(Math.min(100, (elapsed / S4_TOTAL_DELAY_MS) * 100))
      if (elapsed < S4_TOTAL_DELAY_MS) raf = requestAnimationFrame(tick)
    }
    if (!reducedMotion) raf = requestAnimationFrame(tick)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(doneTimer)
      if (raf) cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col items-center gap-6 py-12 text-center">
      <ClockIcon className="h-10 w-10 text-text-secondary" aria-hidden="true" />

      {reducedMotion ? (
        <p className="text-body text-text-secondary">
          Step {messageIndex + 1} of {MESSAGES.length}
        </p>
      ) : (
        <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full bg-primary transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div role="status" aria-live="polite" className="min-h-[1.75rem] text-emphasis font-bold text-text-primary">
        {MESSAGES[messageIndex]}
      </div>

      <p className="max-w-sm text-body text-text-secondary">
        This can take a little longer during busy periods — we're checking directly against national vehicle
        records.
      </p>
    </div>
  )
}
