import { QrCodeIcon } from '@heroicons/react/24/solid'
import CitizenShell from '../components/CitizenShell'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import { useCitizenFlow } from '../state/CitizenFlowContext'

export default function S5FuelPassIssued() {
  const citizen = useCitizenFlow()
  const viaOverride = citizen.issuedVia === 'override'

  return (
    <CitizenShell>
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-emphasis font-bold text-success">Your Fuel Pass is ready</h1>
        <p className="text-body text-text-secondary">Show this QR code at any fuel station.</p>

        {/* tokens.md §6 icon-qr: solid glyph frames the issued pass — a
            stylised representation, not a functionally scannable graphic;
            "scanning" in this prototype is simulated at S9 (build-notes.md). */}
        <div className="flex h-48 w-48 items-center justify-center rounded-lg border-2 border-border-outdoor bg-white">
          <QrCodeIcon className="h-32 w-32 text-text-primary" aria-hidden="true" />
        </div>

        <p className="text-body font-bold text-text-primary">Registered to {citizen.vehicleNumber}</p>

        <p className="max-w-sm text-body text-text-secondary">
          Any Fuel Pass or QR code issued for this vehicle before today is no longer valid.
        </p>

        {viaOverride && (
          <p className="max-w-sm rounded-md bg-surface-muted p-3 text-caption text-text-secondary">
            This Fuel Pass was issued after you confirmed you're the current owner of this vehicle. If that's not
            correct, contact CPC.
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <PrimaryButton>Download QR code</PrimaryButton>
          <SecondaryButton onClick={() => window.print()}>Print</SecondaryButton>
        </div>
      </div>
    </CitizenShell>
  )
}
