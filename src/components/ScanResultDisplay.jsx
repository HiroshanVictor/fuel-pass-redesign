import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { cx } from '../utils/cx'

// component-spec.md §7. Outdoor tier only. The underlying validation is
// synchronous — `animate-fadeIn` (100ms, matching duration-instant) drives
// only the CSS entrance, never a simulated wait. Loading has no
// perceptible state here, by design (see component-spec.md §7).
export default function ScanResultDisplay({ result }) {
  if (!result) return null
  const isValid = result.status === 'valid'
  const Icon = isValid ? CheckCircleIcon : XCircleIcon

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cx(
        'flex animate-fadeIn flex-col items-center gap-3 rounded-md border-2 bg-white p-8 text-center',
        isValid ? 'border-success' : 'border-error'
      )}
    >
      <Icon className={cx('h-10 w-10', isValid ? 'text-success' : 'text-error')} aria-hidden="true" />
      <p className={cx('text-outdoor-status font-bold', isValid ? 'text-success' : 'text-error')}>
        {isValid ? 'Valid' : 'Not valid'}
      </p>
      {result.vehicleNumber && (
        <p className="text-outdoor-body text-text-primary-outdoor">{result.vehicleNumber}</p>
      )}
      {!isValid && result.reason && <p className="text-outdoor-body text-error">{result.reason}</p>}
    </div>
  )
}
