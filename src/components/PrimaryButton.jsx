import { cx } from '../utils/cx'

// component-spec.md §1. Tier is bound by the caller (screen-bound per §0.2),
// never inferred here.
export default function PrimaryButton({
  children,
  tier = 'standard',
  icon: Icon,
  loading = false,
  disabled = false,
  className,
  type = 'button',
  ...rest
}) {
  const isOutdoor = tier === 'outdoor'
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-md px-6 font-bold text-white',
        'transition-colors duration-fast',
        'focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-2',
        isOutdoor ? 'focus-visible:ring-[4px]' : 'focus-visible:ring-[3px]',
        isOutdoor
          ? 'h-touch-min-outdoor text-outdoor-body border-2 border-border-outdoor'
          : 'h-touch-min text-body',
        isDisabled
          ? 'cursor-not-allowed border-none bg-slate-200 text-text-disabled'
          : isOutdoor
            ? 'bg-primary-outdoor hover:bg-blue-900 active:bg-blue-950'
            : 'bg-primary hover:bg-blue-800 active:bg-blue-900 active:scale-[0.98]',
        className
      )}
      {...rest}
    >
      {loading ? (
        <>
          <span
            aria-hidden="true"
            className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
          />
          <span className="sr-only">Submitting…</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
          <span>{children}</span>
        </>
      )}
    </button>
  )
}
