import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CitizenShell from '../components/CitizenShell'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import { CheckBadgeIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { useCitizenFlow } from '../state/CitizenFlowContext'

export default function S6PreviousOwner() {
  const navigate = useNavigate()
  const citizen = useCitizenFlow()
  const [claiming, setClaiming] = useState(false)

  function handleClaim() {
    setClaiming(true)
    // component-spec.md §1 Loading state — min duration-base (250ms) so
    // the state is perceivable rather than flickering.
    window.setTimeout(() => {
      const outcome = citizen.attemptClaim()
      setClaiming(false)
      navigate(outcome === 'succeeds' ? '/fuel-pass' : '/dispute')
    }, 250)
  }

  return (
    <CitizenShell>
      <div className="flex flex-col gap-6">
        <h1 className="text-emphasis font-bold text-text-primary">
          This vehicle is still registered to a previous owner
        </h1>
        <p className="text-body leading-relaxed text-text-secondary">
          The vehicle and chassis numbers you entered match a record on file — but that record hasn't been
          updated since it last changed hands. This isn't something you've entered incorrectly; it's our records
          catching up to a real sale.
        </p>

        <div className="flex flex-col items-start gap-3">
          <PrimaryButton icon={CheckBadgeIcon} loading={claiming} onClick={handleClaim}>
            This is my vehicle — claim it
          </PrimaryButton>
          <SecondaryButton icon={ChatBubbleLeftRightIcon} to="/dispute" disabled={claiming}>
            This isn't my situation — get help
          </SecondaryButton>
          <SecondaryButton to="/help" disabled={claiming}>
            Read more in Help &amp; Answers
          </SecondaryButton>
        </div>
      </div>
    </CitizenShell>
  )
}
