import { CameraIcon } from '@heroicons/react/24/outline'
import SecondaryButton from '../components/SecondaryButton'
import ScanResultDisplay from '../components/ScanResultDisplay'
import { useStation } from '../state/StationContext'

export default function S9StationScan() {
  const station = useStation()

  return (
    <div className="flex flex-col items-center gap-6">
      {station.lastResult ? (
        <ScanResultDisplay result={station.lastResult} />
      ) : (
        <div className="flex aspect-square w-full max-w-sm flex-col items-center justify-center gap-4 rounded-lg border-2 border-border-outdoor bg-slate-900 text-white">
          <CameraIcon className="h-16 w-16 text-slate-400" aria-hidden="true" />
          <p className="px-6 text-center text-outdoor-body">Scan customer's Fuel Pass QR code</p>
        </div>
      )}

      <SecondaryButton to="/station/manual" tier="outdoor">
        Can't scan? Enter manually
      </SecondaryButton>
    </div>
  )
}
