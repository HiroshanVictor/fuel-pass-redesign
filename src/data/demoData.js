// Seeded, deterministic demo data. D15: vehicle, ownership and chassis
// records are mocked — this file is the entire mock. Every value here is
// documented in build-notes.md so a presenter can drive every path on
// command without hunting through source.

function normalise(value) {
  return (value || '').trim().toUpperCase().replace(/\s+/g, ' ')
}

// --- Citizen journey (S2 → S4 → S5 / S6 / S7) ------------------------------

export const VEHICLES = [
  {
    vehicleNumber: 'WP CAB-1234',
    chassisNumber: 'MA3ERLF1S00123456',
    resolution: 'clean',
  },
  {
    vehicleNumber: 'WP KL-5678',
    chassisNumber: 'MA3FYE73S00654321',
    resolution: 'previous-owner',
    claimOutcome: 'succeeds', // S6 primary action ("claim it") leads to S5
  },
  {
    vehicleNumber: 'WP NC-9012',
    chassisNumber: 'MA3NCX2S00789012',
    resolution: 'previous-owner',
    claimOutcome: 'fails', // S6 primary action cannot resolve it automatically → S7
  },
]

export function lookupVehicle(vehicleNumber, chassisNumber) {
  const v = normalise(vehicleNumber)
  const c = normalise(chassisNumber)

  const exactMatch = VEHICLES.find(
    (entry) => normalise(entry.vehicleNumber) === v && normalise(entry.chassisNumber) === c
  )
  if (exactMatch) return { ...exactMatch }

  // D20: a resolution of 'not-found' asserts a typo — only warranted when
  // one field matches a known record and the other doesn't, which is
  // genuinely typo-shaped. When *neither* field matches anything, this
  // mock has no basis to claim a typo over any other cause (including a
  // vehicle that's simply never been in DMT records — P7's case, still
  // not built per D8/D15, but the copy shouldn't imply a cause it hasn't
  // verified just because that case falls through here too).
  const partialMatch = VEHICLES.some(
    (entry) => normalise(entry.vehicleNumber) === v || normalise(entry.chassisNumber) === c
  )
  return { resolution: partialMatch ? 'not-found' : 'no-record' }
}

// --- Station journey (S9 / S10) --------------------------------------------
// Deliberately reuses vehicle numbers from the citizen list above: the
// "valid" pass belongs to the same vehicle that resolves clean at S5, and
// the "superseded" pass belongs to the vehicle whose old QR the S5 note
// warns about — narrative continuity for a board walkthrough, not a
// separate dataset that happens to share a name.

export const FUEL_PASSES = [
  {
    qrCode: 'FP-VALID-0001',
    vehicleNumber: 'WP CAB-1234',
    status: 'valid',
  },
  {
    qrCode: 'FP-SUPERSEDED-0002',
    vehicleNumber: 'WP KL-5678',
    status: 'invalid',
    reason: 'This Fuel Pass was superseded by a newer one.',
  },
]

export function lookupPassByQr(qrCode) {
  const match = FUEL_PASSES.find((entry) => entry.qrCode === qrCode)
  if (!match) {
    return { status: 'invalid', reason: 'This QR code is not recognised.' }
  }
  return { ...match }
}

export function lookupPassByVehicleNumber(vehicleNumber) {
  const v = normalise(vehicleNumber)
  const match = FUEL_PASSES.find((entry) => normalise(entry.vehicleNumber) === v)
  if (!match) {
    return { status: 'invalid', reason: 'No Fuel Pass record found for this vehicle.' }
  }
  return { ...match }
}
