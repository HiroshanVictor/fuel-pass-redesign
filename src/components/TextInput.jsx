import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { cx } from '../utils/cx'

// component-spec.md §3. `tier` is bound by the screen rendering it:
// standard on S2/S7, outdoor on S10's manual entry field.
export default function TextInput({
  id,
  label,
  value,
  onChange,
  tier = 'standard',
  error,
  multiline = false,
  helper,
  ...rest
}) {
  const isOutdoor = tier === 'outdoor'
  const Field = multiline ? 'textarea' : 'input'
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={cx('font-bold text-text-primary', isOutdoor ? 'text-outdoor-body' : 'text-body')}
      >
        {label}
      </label>
      <Field
        id={id}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={errorId}
        rows={multiline ? 4 : undefined}
        className={cx(
          'rounded-sm border bg-white px-4 text-text-primary',
          'focus:outline-none focus-visible:ring-primary',
          multiline ? 'py-3 leading-relaxed' : '',
          isOutdoor
            ? 'border-2 text-outdoor-body focus-visible:ring-[4px]'
            : 'text-body focus-visible:ring-[3px]',
          !multiline && (isOutdoor ? 'h-touch-min-outdoor' : 'h-touch-min'),
          error
            ? 'border-error text-error'
            : isOutdoor
              ? 'border-border-outdoor hover:border-border-outdoor'
              : 'border-border-strong hover:border-slate-600'
        )}
        {...rest}
      />
      {error && (
        <p id={errorId} className={cx('flex items-start gap-1.5 text-error', isOutdoor ? 'text-outdoor-body' : 'text-body')}>
          <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
      {!error && helper && (
        <p className={cx('text-text-secondary', isOutdoor ? 'text-outdoor-body' : 'text-caption')}>{helper}</p>
      )}
    </div>
  )
}
