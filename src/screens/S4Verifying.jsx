import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CitizenShell from '../components/CitizenShell'
import VerificationWaitState from '../components/VerificationWaitState'
import { useCitizenFlow } from '../state/CitizenFlowContext'

// component-spec.md §6. No tab stops on this screen by design.
export default function S4Verifying() {
  const navigate = useNavigate()
  const citizen = useCitizenFlow()

  useEffect(() => {
    if (!citizen.record) {
      // Reached directly without a lookup in flight — nothing to verify.
      navigate('/find-vehicle', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleDone() {
    const resolution = citizen.record?.resolution
    if (resolution === 'clean') {
      citizen.markCleanIssue()
      navigate('/fuel-pass')
    } else if (resolution === 'previous-owner') {
      navigate('/previous-owner')
    } else {
      navigate('/find-vehicle')
    }
  }

  return (
    <CitizenShell>
      <VerificationWaitState onDone={handleDone} />
    </CitizenShell>
  )
}
