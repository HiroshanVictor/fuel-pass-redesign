import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCitizenFlow } from '../state/CitizenFlowContext'
import { useStation } from '../state/StationContext'
import { VEHICLES, FUEL_PASSES } from '../data/demoData'

// NOT one of the ten screens or components in sitemap.md / component-spec.md.
// A presenter-facing harness so every deterministic path in build-notes.md
// fires on command during a live board walkthrough, per this build's brief.
// Deliberately styled to look like tooling, not product — dashed border,
// monospace label, muted palette — so it can never be mistaken for a
// designed screen.
export default function DemoControls() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const citizen = useCitizenFlow()
  const station = useStation()

  const onStation = location.pathname.startsWith('/station')
  const onFindVehicle = location.pathname === '/find-vehicle'

  function fillVehicle(vehicle) {
    citizen.setVehicleNumber(vehicle.vehicleNumber)
    citizen.setChassisNumber(vehicle.chassisNumber)
  }

  return (
    <div className="fixed bottom-3 right-3 z-50 max-w-xs font-mono text-xs">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full rounded-t border border-dashed border-slate-400 bg-slate-100 px-3 py-1.5 text-left font-bold text-slate-600"
      >
        ▮ DEMO CONTROLS {open ? '▾' : '▸'}
      </button>

      {open && (
        <div className="space-y-3 rounded-b border border-t-0 border-dashed border-slate-400 bg-slate-50 p-3 text-slate-700">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className={`rounded border px-2 py-1 ${!onStation ? 'border-slate-600 bg-white font-bold' : 'border-slate-300'}`}
            >
              Citizen device
            </button>
            <button
              type="button"
              onClick={() => navigate('/station')}
              className={`rounded border px-2 py-1 ${onStation ? 'border-slate-600 bg-white font-bold' : 'border-slate-300'}`}
            >
              Station device
            </button>
          </div>

          {!onStation && (
            <div>
              <p className="mb-1 font-bold">Seeded vehicles (S2)</p>
              <ul className="space-y-1">
                {VEHICLES.map((v) => (
                  <li key={v.vehicleNumber}>
                    <button
                      type="button"
                      onClick={() => {
                        fillVehicle(v)
                        if (!onFindVehicle) navigate('/find-vehicle')
                      }}
                      className="w-full rounded border border-slate-300 bg-white px-2 py-1 text-left hover:border-slate-500"
                    >
                      {v.vehicleNumber} — {v.resolution === 'clean' ? 'clean match → S5' : `prev. owner, claim ${v.claimOutcome} → ${v.claimOutcome === 'succeeds' ? 'S5' : 'S7'}`}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {onStation && (
            <div className="space-y-2">
              <p className="font-bold">Simulate scan (S9)</p>
              <div className="flex flex-col gap-1">
                {FUEL_PASSES.map((p) => (
                  <button
                    key={p.qrCode}
                    type="button"
                    onClick={() => {
                      if (location.pathname !== '/station') navigate('/station')
                      station.simulateScan(p.qrCode)
                    }}
                    className="rounded border border-slate-300 bg-white px-2 py-1 text-left hover:border-slate-500"
                  >
                    {p.qrCode} → {p.status}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 pt-1">
                <input type="checkbox" checked={station.isOffline} onChange={station.toggleOffline} />
                Simulate offline
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
