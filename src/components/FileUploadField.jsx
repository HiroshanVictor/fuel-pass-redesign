import { useRef, useState } from 'react'
import { DocumentTextIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { cx } from '../utils/cx'

// component-spec.md §4. Standard tier only — no outdoor equivalent exists.
export default function FileUploadField({ id, label, error, onFileSelected }) {
  const inputRef = useRef(null)
  const [status, setStatus] = useState('empty') // empty | loading | selected | error
  const [fileName, setFileName] = useState('')
  const [isDragActive, setIsDragActive] = useState(false)

  function acceptFile(file) {
    if (!file) return
    setStatus('loading')
    // Mocked "processing" beat — component-spec.md §4's Loading state:
    // a real upload takes time, and a 0ms swap would read as broken.
    window.setTimeout(() => {
      setStatus('selected')
      setFileName(file.name)
      onFileSelected?.(file)
    }, 250)
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDragActive(false)
    acceptFile(event.dataTransfer.files?.[0])
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-body font-bold text-text-primary">
        {label}
      </label>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragActive(true)
        }}
        onDragLeave={() => setIsDragActive(false)}
        onDrop={handleDrop}
        className={cx(
          'flex min-h-[6rem] flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-4 text-center',
          error ? 'border-error' : isDragActive ? 'border-primary bg-primary/5' : 'border-border-strong bg-surface-muted hover:border-slate-600'
        )}
      >
        {status === 'loading' ? (
          <span
            aria-hidden="true"
            className="h-6 w-6 animate-spin rounded-full border-2 border-text-secondary border-t-transparent"
          />
        ) : error ? (
          <ExclamationTriangleIcon className="h-6 w-6 text-error" aria-hidden="true" />
        ) : (
          <DocumentTextIcon className="h-6 w-6 text-text-secondary" aria-hidden="true" />
        )}

        {status === 'selected' && !error ? (
          <p className="text-body text-text-primary">{fileName}</p>
        ) : (
          <p className="text-body text-text-secondary">Drag a file here, or</p>
        )}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="min-h-touch-min rounded-md px-4 text-body font-bold text-primary underline underline-offset-2 hover:bg-white focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary"
        >
          Choose file
        </button>
        <input
          ref={inputRef}
          id={id}
          type="file"
          className="sr-only"
          onChange={(e) => acceptFile(e.target.files?.[0])}
        />
      </div>
      {error && (
        <p className="flex items-start gap-1.5 text-body text-error">
          <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}
