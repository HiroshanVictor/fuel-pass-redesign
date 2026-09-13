import CitizenShell from '../components/CitizenShell'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import { useNavigate } from 'react-router-dom'

export default function S1Start() {
  const navigate = useNavigate()
  return (
    <CitizenShell>
      <div className="flex flex-col gap-6">
        <h1 className="text-emphasis font-bold text-text-primary">Set up or check your Fuel Pass</h1>
        <p className="text-body text-text-secondary">
          If your vehicle has ever had a Fuel Pass or QR code before — including if you've just bought it
          second-hand — you'll need to check it again here.
        </p>
        <div className="flex flex-col items-start gap-4">
          <PrimaryButton onClick={() => navigate('/find-vehicle')}>Continue</PrimaryButton>
          <SecondaryButton to="/help">Help &amp; Answers</SecondaryButton>
        </div>
      </div>
    </CitizenShell>
  )
}
