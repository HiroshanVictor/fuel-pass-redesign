import { createContext, useContext, useMemo, useRef, useState } from 'react'
import { lookupPassByQr, lookupPassByVehicleNumber } from '../data/demoData'
import { S9_RESULT_HOLD_MS } from '../data/timing'

// Plain React context + useState, shared by S9 and S10 — component-spec.md
// §8: the offline banner and the last-known result are properties of the
// station device, not of either screen individually.
const StationContext = createContext(null)

export function StationProvider({ children }) {
  const [isOffline, setIsOffline] = useState(false)
  const [offlineSince, setOfflineSince] = useState(null)
  const [lastResult, setLastResult] = useState(null) // { status, vehicleNumber, reason } | null
  const clearTimer = useRef(null)

  function toggleOffline() {
    setIsOffline((prev) => {
      const next = !prev
      setOfflineSince(next ? new Date() : null)
      return next
    })
  }

  function showResult(result) {
    if (clearTimer.current) clearTimeout(clearTimer.current)
    setLastResult(result)
    clearTimer.current = setTimeout(() => setLastResult(null), S9_RESULT_HOLD_MS)
  }

  function simulateScan(qrCode) {
    showResult(lookupPassByQr(qrCode))
  }

  function manualLookup(vehicleNumber) {
    const result = lookupPassByVehicleNumber(vehicleNumber)
    showResult(result)
    return result
  }

  function clearResult() {
    if (clearTimer.current) clearTimeout(clearTimer.current)
    setLastResult(null)
  }

  const value = useMemo(
    () => ({
      isOffline,
      offlineSince,
      toggleOffline,
      lastResult,
      simulateScan,
      manualLookup,
      clearResult,
    }),
    [isOffline, offlineSince, lastResult]
  )

  return <StationContext.Provider value={value}>{children}</StationContext.Provider>
}

export function useStation() {
  const ctx = useContext(StationContext)
  if (!ctx) throw new Error('useStation must be used within StationProvider')
  return ctx
}
