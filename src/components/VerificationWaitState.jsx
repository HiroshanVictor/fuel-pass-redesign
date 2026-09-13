import { useEffect, useState } from 'react'
import { ClockIcon } from '@heroicons/react/24/outline'
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'
import { S4_TOTAL_DELAY_MS } from '../data/timing'

// microcopy.md S4 — single, fixed headline for the whole wait (D19: the
// staged three-message version was reverted after QA found it read as
// inconsistent across screenshots taken at different points in the same
// fixed sequence). The progress bar alone still carries the "something
// concrete is happening" job a spinner can't — see component-spec.md §6.
const MESSAGE = 'Checking DMT vehicle records…'

export default function VerificationWaitState({ onDone }) {
  const reducedMotion = usePrefersReducedMotion()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
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
      clearTimeout(doneTimer)
      if (raf) cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col items-center gap-6 py-12 text-center">
      <ClockIcon className="h-10 w-10 text-text-secondary" aria-hidden="true" />

      {reducedMotion ? (
        <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-1/3 bg-primary" />
        </div>
      ) : (
        <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full bg-primary transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div role="status" aria-live="polite" className="min-h-[1.75rem] text-emphasis font-bold text-text-primary">
        {MESSAGE}
      </div>

      <p className="max-w-sm text-body text-text-secondary">
        This can take a little longer during busy periods — we're checking directly against national vehicle
        records.
      </p>
    </div>
  )
}
