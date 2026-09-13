import { useState } from 'react'
import CitizenShell from '../components/CitizenShell'
import PrimaryButton from '../components/PrimaryButton'
import FileUploadField from '../components/FileUploadField'
import TextInput from '../components/TextInput'

// microcopy.md addendum (documented in build-notes.md): the required-file
// validation message below wasn't anticipated in the original copy deck,
// which only specified the field labels — added here, not invented
// silently, because component-spec.md §1's Error row explicitly requires
// this exact case (submit with no file attached).
const FILE_REQUIRED_MESSAGE = 'Please attach proof of purchase or an ownership document before submitting.'

export default function S7SubmitDispute() {
  const [file, setFile] = useState(null)
  const [notes, setNotes] = useState('')
  const [fileError, setFileError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!file) {
      setFileError(FILE_REQUIRED_MESSAGE)
      return
    }
    setFileError('')
    setSubmitting(true)
    window.setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 250)
  }

  if (submitted) {
    return (
      <CitizenShell>
        <div className="flex flex-col gap-4">
          <h1 className="text-emphasis font-bold text-success">Dispute submitted</h1>
          <p className="text-body text-text-secondary">
            Your dispute has been submitted. An officer will review it and get in touch using the details on
            file.
          </p>
        </div>
      </CitizenShell>
    )
  }

  return (
    <CitizenShell>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <h1 className="text-emphasis font-bold text-text-primary">Submit a dispute</h1>
          <p className="mt-2 text-body text-text-secondary">
            Some ownership changes need a closer look before we can update the record automatically. Tell us
            what you have, and an officer will review it.
          </p>
        </div>

        <FileUploadField
          id="proof-document"
          label="Proof of purchase or ownership document"
          error={fileError}
          onFileSelected={(f) => {
            setFile(f)
            setFileError('')
          }}
        />

        <TextInput
          id="dispute-notes"
          label="Anything else you'd like to add (optional)"
          multiline
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <PrimaryButton type="submit" loading={submitting}>
          Submit for review
        </PrimaryButton>
      </form>
    </CitizenShell>
  )
}
