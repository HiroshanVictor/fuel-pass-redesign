import CitizenShell from '../components/CitizenShell'
import SecondaryButton from '../components/SecondaryButton'
import FaqDisclosure from '../components/FaqDisclosure'
import { Link } from 'react-router-dom'

export default function S8HelpAnswers() {
  return (
    <CitizenShell>
      <div className="flex flex-col gap-4">
        <h1 className="text-emphasis font-bold text-text-primary">Help &amp; Answers</h1>

        <div>
          <FaqDisclosure question="Do I need to register again?">
            Yes, if your vehicle has changed hands, or has had a Fuel Pass or QR code before. Go to{' '}
            <Link to="/find-vehicle" className="font-bold text-primary underline">
              Find your vehicle
            </Link>{' '}
            to check.
          </FaqDisclosure>

          <FaqDisclosure question="Can I use my old QR code?">
            No. Once a new Fuel Pass is issued for a vehicle, any QR code issued before it stops working.
          </FaqDisclosure>

          <FaqDisclosure question="Where do I find my chassis number?">
            See{' '}
            <Link to="/chassis-help" className="font-bold text-primary underline">
              Locate your chassis number
            </Link>
            .
          </FaqDisclosure>

          <FaqDisclosure question="What about a 48cc bike with no number plate?">
            This isn't something we can check here yet. Please contact CPC directly for guidance on unplated
            vehicles.
          </FaqDisclosure>

          <FaqDisclosure question="I'm registering a brand-new vehicle for the first time — is this the right place?">
            Not yet. This covers vehicles that have already been registered or had a Fuel Pass before. First-time
            registration for new vehicles is handled separately by CPC.
          </FaqDisclosure>
        </div>

        <SecondaryButton to="/dispute" className="self-start">
          Still stuck? Submit a dispute and an officer will help.
        </SecondaryButton>
      </div>
    </CitizenShell>
  )
}
