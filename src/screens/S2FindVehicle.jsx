import { useNavigate } from 'react-router-dom'
import CitizenShell from '../components/CitizenShell'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import TextInput from '../components/TextInput'
import { useCitizenFlow } from '../state/CitizenFlowContext'

export default function S2FindVehicle() {
  const navigate = useNavigate()
  const citizen = useCitizenFlow()
  const notFound = citizen.record?.resolution === 'not-found'

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
            if (notFound) citizen.clearRecord()
          }}
          error={notFound ? "We couldn't find a record matching those details. Double-check the vehicle registration number and chassis number, then try again." : undefined}
        />

        <div className="flex flex-col gap-1.5">
          <TextInput
            id="chassis-number"
            label="Chassis number"
            value={citizen.chassisNumber}
            onChange={(e) => {
              citizen.setChassisNumber(e.target.value)
              if (notFound) citizen.clearRecord()
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
