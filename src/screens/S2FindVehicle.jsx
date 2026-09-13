import { useNavigate, Link } from 'react-router-dom'
import CitizenShell from '../components/CitizenShell'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import TextInput from '../components/TextInput'
import { useCitizenFlow } from '../state/CitizenFlowContext'

export default function S2FindVehicle() {
  const navigate = useNavigate()
  const citizen = useCitizenFlow()
  const resolution = citizen.record?.resolution
  const hasError = resolution === 'not-found' || resolution === 'no-record'

  // D20: 'not-found' is genuinely typo-shaped (one field matched a known
  // record, the other didn't). 'no-record' means neither field matched
  // anything, and the mock has no basis to call that a typo rather than,
  // say, a vehicle that's never been in DMT records — so the copy says so
  // instead of guessing.
  const errorMessage =
    resolution === 'no-record' ? (
      <>
        We couldn't find this vehicle. Double-check what you entered, or if this is a brand-new vehicle being
        registered for the first time, see{' '}
        <Link to="/help" className="underline">
          Help &amp; Answers
        </Link>
        .
      </>
    ) : resolution === 'not-found' ? (
      "We couldn't find a record matching those details. Double-check the vehicle registration number and chassis number, then try again."
    ) : undefined

  function handleSubmit(e) {
    e.preventDefault()
    citizen.runLookup()
    navigate('/verifying')
  }

  return (
    <CitizenShell>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <h1 className="text-emphasis font-bold text-text-primary">Find your vehicle</h1>
          <p className="mt-2 text-body text-text-secondary">
            Enter your vehicle registration number and chassis number. We'll check them against DMT records.
          </p>
        </div>

        <TextInput
          id="vehicle-number"
          label="Vehicle registration number"
          placeholder="e.g. CAB-1234"
          value={citizen.vehicleNumber}
          onChange={(e) => {
            citizen.setVehicleNumber(e.target.value)
            if (hasError) citizen.clearRecord()
          }}
          error={errorMessage}
        />

        <div className="flex flex-col gap-1.5">
          <TextInput
            id="chassis-number"
            label="Chassis number"
            value={citizen.chassisNumber}
            onChange={(e) => {
              citizen.setChassisNumber(e.target.value)
              if (hasError) citizen.clearRecord()
            }}
          />
          <SecondaryButton to="/chassis-help" className="self-start">
            Where do I find this?
          </SecondaryButton>
        </div>

        <PrimaryButton type="submit">Find my vehicle</PrimaryButton>
      </form>
    </CitizenShell>
  )
}
