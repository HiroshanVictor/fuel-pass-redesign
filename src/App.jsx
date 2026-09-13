import { Routes, Route } from 'react-router-dom'
import { CitizenFlowProvider } from './state/CitizenFlowContext'
import { StationProvider } from './state/StationContext'
import StationShell from './components/StationShell'
import DemoControls from './components/DemoControls'

import S1Start from './screens/S1Start'
import S2FindVehicle from './screens/S2FindVehicle'
import S3ChassisHelp from './screens/S3ChassisHelp'
import S4Verifying from './screens/S4Verifying'
import S5FuelPassIssued from './screens/S5FuelPassIssued'
import S6PreviousOwner from './screens/S6PreviousOwner'
import S7SubmitDispute from './screens/S7SubmitDispute'
import S8HelpAnswers from './screens/S8HelpAnswers'
import S9StationScan from './screens/S9StationScan'
import S10ScanFailed from './screens/S10ScanFailed'

// The ten screens in sitemap.md, nothing else. Two independent journeys
// (sitemap.md §1: "they never intersect on screen") — citizen state and
// station state are separate providers, not one shared store.
export default function App() {
  return (
    <CitizenFlowProvider>
      <StationProvider>
        <Routes>
          <Route path="/" element={<S1Start />} />
          <Route path="/find-vehicle" element={<S2FindVehicle />} />
          <Route path="/chassis-help" element={<S3ChassisHelp />} />
          <Route path="/verifying" element={<S4Verifying />} />
          <Route path="/fuel-pass" element={<S5FuelPassIssued />} />
          <Route path="/previous-owner" element={<S6PreviousOwner />} />
          <Route path="/dispute" element={<S7SubmitDispute />} />
          <Route path="/help" element={<S8HelpAnswers />} />

          <Route
            path="/station"
            element={
              <StationShell>
                <S9StationScan />
              </StationShell>
            }
          />
          <Route
            path="/station/manual"
            element={
              <StationShell>
                <S10ScanFailed />
              </StationShell>
            }
          />
        </Routes>

        <DemoControls />
      </StationProvider>
    </CitizenFlowProvider>
  )
}
