import type { Flow } from '../types/flow.types'
import { useFlowValidation } from '../hooks/useFlowValidation'

type Props = {
  flow: Flow
  onSave?: (flow: Flow) => void
}

export default function SaveButton({ flow, onSave }: Props) {
  const { valid } = useFlowValidation(flow)
  const handleClick = () => {
    if (!valid) return
    if (onSave) onSave(flow)
    else console.log(JSON.stringify(flow))
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {!valid && (
        <div
          style={{ background: '#FFEBEE', color: '#C62828', padding: '8px 12px', borderRadius: 6 }}
        >
          Cannot save Flow
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
          cursor: valid ? 'pointer' : 'not-allowed',
          opacity: valid ? 1 : 0.6,
        }}
        disabled={!valid}
        onClick={handleClick}
      >
        Save Changes
      </button>
    </div>
  )
}
