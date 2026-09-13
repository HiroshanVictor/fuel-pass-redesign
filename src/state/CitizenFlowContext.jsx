import { createContext, useContext, useMemo, useState } from 'react'
import { lookupVehicle } from '../data/demoData'

// Plain React context + useState — not a state library, per the brief.
// Holds S2's fields across the S2 → S3 → S2 round trip (user-flows.md
// Flow 5) and the S4 lookup result consumed by S5/S6/S7.
const CitizenFlowContext = createContext(null)

export function CitizenFlowProvider({ children }) {
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [chassisNumber, setChassisNumber] = useState('')
  const [record, setRecord] = useState(null) // result of the S4 lookup
  const [issuedVia, setIssuedVia] = useState(null) // 'clean' | 'override' — drives S5's conditional note

  function runLookup() {
    const result = lookupVehicle(vehicleNumber, chassisNumber)
    setRecord(result)
    return result
  }

  function attemptClaim() {
    // S6 primary action. Deterministic outcome per the seeded record.
    if (record?.claimOutcome === 'succeeds') {
      setIssuedVia('override')
      return 'succeeds'
    }
    return 'fails'
  }

  function markCleanIssue() {
    setIssuedVia('clean')
  }

  function clearRecord() {
    setRecord(null)
  }

  function reset() {
    setVehicleNumber('')
    setChassisNumber('')
    setRecord(null)
    setIssuedVia(null)
  }

  const value = useMemo(
    () => ({
      vehicleNumber,
      setVehicleNumber,
      chassisNumber,
      setChassisNumber,
      record,
      runLookup,
      clearRecord,
      attemptClaim,
      issuedVia,
      markCleanIssue,
      reset,
    }),
    [vehicleNumber, chassisNumber, record, issuedVia]
  )

  return <CitizenFlowContext.Provider value={value}>{children}</CitizenFlowContext.Provider>
}

export function useCitizenFlow() {
  const ctx = useContext(CitizenFlowContext)
  if (!ctx) throw new Error('useCitizenFlow must be used within CitizenFlowProvider')
  return ctx
}
