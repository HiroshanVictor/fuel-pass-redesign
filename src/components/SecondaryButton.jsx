import { Link } from 'react-router-dom'
import { cx } from '../utils/cx'

// component-spec.md §2. Renders as a router Link when `to` is given,
// otherwise a plain button — same visual/token treatment either way.
export default function SecondaryButton({
  children,
  to,
  tier = 'standard',
  icon: Icon,
  disabled = false,
  className,
  ...rest
}) {
  const isOutdoor = tier === 'outdoor'

  const classes = cx(
    'inline-flex items-center gap-2 rounded-md font-bold underline decoration-2 underline-offset-2',
    'transition-colors duration-fast',
    'focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-offset-2',
    isOutdoor ? 'focus-visible:ring-[4px]' : 'focus-visible:ring-[3px]',
    isOutdoor
      ? 'min-h-touch-min-outdoor px-3 text-outdoor-body text-primary-outdoor hover:bg-surface-muted hover:text-blue-900 active:text-blue-950'
      : 'min-h-touch-min px-2 text-body text-primary hover:bg-surface-muted hover:text-blue-800 active:text-blue-900',
    disabled && 'cursor-not-allowed text-text-disabled no-underline hover:bg-transparent',
    className
  )

  const content = (
    <>
      {Icon && <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
    </>
  )

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" disabled={disabled} className={classes} {...rest}>
      {content}
    </button>
  )
}
