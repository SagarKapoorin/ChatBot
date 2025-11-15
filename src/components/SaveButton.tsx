import type { Flow } from '../types/flow.types'
import { validateFlow } from '../hooks/useFlowValidation'
import { useState } from 'react'

type Props = {
  flow: Flow
  onSave?: (flow: Flow) => void
}

export default function SaveButton({ flow, onSave }: Props) {
  const [errors, setErrors] = useState<string[] | null>(null)
  const [saved, setSaved] = useState(false)
  const handleClick = () => {
    const result = validateFlow(flow)
    if (!result.valid) {
      setErrors(result.errors)
      setSaved(false)
      return
    }
    try {
      const json = JSON.stringify(flow)
      localStorage.setItem('bitspeed.flow', json)
      setErrors(null)
      setSaved(true)
      if (onSave) onSave(flow)
    } catch {
      setErrors(['failed to save to localstorage'])
      setSaved(false)
    }
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {errors && (
        <div style={{ background: '#FFEBEE', color: '#C62828', padding: '8px 12px', borderRadius: 6 }}>
          Cannot save Flow
        </div>
      )}
      {saved && !errors && (
        <div style={{ background: '#E8F5E9', color: '#2E7D32', padding: '8px 12px', borderRadius: 6 }}>
          saved
        </div>
      )}
      <button
        style={{
          alignSelf: 'flex-end',
          background: '#1976D2',
          color: '#fff',
          border: 'none',
          padding: '8px 12px',
          borderRadius: 6,
          cursor: 'pointer',
          opacity: 1,
        }}
        onClick={handleClick}
      >
        Save Changes
      </button>
    </div>
  )
}
