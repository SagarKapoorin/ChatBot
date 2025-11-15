import type { Flow } from '../types/flow.types'
import { validateFlow } from '../hooks/useFlowValidation'
import { useState } from 'react'

type Props = {
  flow: Flow
  onSave?: (flow: Flow) => void
}

export default function SaveButton({ flow, onSave }: Props) {
  const [errors, setErrors] = useState<string[] | null>(null)
  const handleClick = () => {
    const result = validateFlow(flow)
    if (!result.valid) {
      setErrors(result.errors)
      return
    }
    try {
      const json = JSON.stringify(flow)
      localStorage.setItem('bitspeed.flow', json)
      setErrors(null)
      if (onSave) onSave(flow)
    } catch {
      setErrors(['failed to save to localstorage'])
    }
  }
  return (
    <>
      {errors && <div className="alert alert-error">Cannot save Flow</div>}
      <button className="btn btn-primary" onClick={handleClick}>
        Save Changes
      </button>
    </>
  )
}
