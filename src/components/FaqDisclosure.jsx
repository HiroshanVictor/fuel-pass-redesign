import { ChevronDownIcon } from '@heroicons/react/24/outline'

// component-spec.md §5. Native <details>/<summary> — no JS toggle logic,
// no ARIA state to author by hand: the browser already does it (D17).
export default function FaqDisclosure({ question, children }) {
  return (
    <details className="group border-b border-slate-200">
      <summary
        className="flex min-h-touch-min cursor-pointer list-none items-center justify-between gap-3 py-3 text-body font-bold text-text-primary hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary"
      >
        <span>{question}</span>
        <ChevronDownIcon
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-text-secondary transition-transform duration-fast group-open:rotate-180"
        />
      </summary>
      <div className="pb-4 pr-8 text-body leading-relaxed text-text-secondary">{children}</div>
    </details>
  )
}
