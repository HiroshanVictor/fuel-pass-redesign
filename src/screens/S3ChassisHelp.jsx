import CitizenShell from '../components/CitizenShell'
import SecondaryButton from '../components/SecondaryButton'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function S3ChassisHelp() {
  return (
    <CitizenShell>
      <div className="flex flex-col gap-6">
        <h1 className="text-emphasis font-bold text-text-primary">Where to find your chassis number</h1>
        <img
          src="/chassis-location.svg"
          alt="Diagram showing the chassis number location: on the chassis plate under the bonnet, in the engine bay, or on the vehicle registration document."
          className="w-full rounded-md border border-slate-200 bg-surface-muted"
        />
        <p className="text-body leading-relaxed text-text-secondary">
          It's usually stamped on the chassis plate under the bonnet or in the engine bay, and printed on your
          vehicle registration document (revenue licence or CR book) next to "Chassis No."
        </p>
        <SecondaryButton to="/find-vehicle" icon={ArrowLeftIcon} className="self-start">
          Back to my details
        </SecondaryButton>
      </div>
    </CitizenShell>
  )
}
