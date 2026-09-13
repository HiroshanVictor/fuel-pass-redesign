import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import TextInput from '../components/TextInput'
import ScanResultDisplay from '../components/ScanResultDisplay'
import { useStation } from '../state/StationContext'
import { S9_RESULT_HOLD_MS } from '../data/timing'

export default function S10ScanFailed() {
  const navigate = useNavigate()
  const station = useStation()
  const [vehicleNumber, setVehicleNumber] = useState('')
  const returnTimer = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()
    station.manualLookup(vehicleNumber)
    // screen-content.md S10: "Return: Back to S9 ready state after each
    // result" — same hold as S9's own auto-clear, so the two happen together.
    returnTimer.current = window.setTimeout(() => navigate('/station'), S9_RESULT_HOLD_MS)
  }

  useEffect(() => () => clearTimeout(returnTimer.current), [])

  return (
    <div className="flex flex-col gap-6">
      {station.lastResult ? (
        <ScanResultDisplay result={station.lastResult} />
      ) : (
        <>
          <div>
            <h1 className="text-emphasis font-bold text-text-primary-outdoor">Scan couldn't complete</h1>
            <p className="mt-2 text-outdoor-body text-text-secondary">
              We couldn't read that QR code — it may be damaged, or the camera couldn't focus. This doesn't mean
              anything about the vehicle.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextInput
              id="manual-vehicle-number"
              label="Vehicle registration number"
              tier="outdoor"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
            />
            <PrimaryButton type="submit" tier="outdoor">
              Check manually
            </PrimaryButton>
          </form>
        </>
      )}

      <SecondaryButton to="/station" tier="outdoor" onClick={() => clearTimeout(returnTimer.current)}>
        Back to scanning
      </SecondaryButton>
    </div>
  )
}
