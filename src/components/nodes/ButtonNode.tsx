import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { ButtonRFNode } from '../../types/flow.types'

export default function ButtonNode({ data, selected }: NodeProps<ButtonRFNode>) {
  const buttons = data?.buttons ?? []
  return (
    <div
      style={{
        minWidth: 260,
        borderRadius: 10,
        background: '#fff',
        border: selected ? '2px solid #4A90E2' : '1px solid #ddd',
        boxShadow: selected ? '0 0 0 4px rgba(74,144,226,0.15)' : '0 2px 6px rgba(0,0,0,0.08)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          background: '#E1F5FE',
          padding: '8px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span>🔘</span>
        <span style={{ fontWeight: 600 }}>Quick Reply</span>
      </div>
      <div
        style={{
          padding: 10,
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <div style={{ color: '#333' }}>{data?.text ?? ''}</div>
        {buttons.length === 0 ? (
          <div style={{ fontSize: 12, color: '#777' }}>No options</div>
        ) : (
          buttons.map((b, idx) => (
            <div
              key={(b.value || '') + '_' + idx}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <div
                style={{
                  flex: 1,
                  background: '#f7f7f7',
                  border: '1px solid #e0e0e0',
                  borderRadius: 6,
                  padding: '6px 10px',
                }}
              >
                {b.label || b.value}
              </div>
              <Handle type="source" position={Position.Right} id={b.value || String(idx)} />
            </div>
          ))
        )}
      </div>
      <Handle type="target" position={Position.Left} />
    </div>
  )
}
