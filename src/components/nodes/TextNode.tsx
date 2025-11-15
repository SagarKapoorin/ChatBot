import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { TextRFNode } from '../../types/flow.types'
export default function TextNode({ data, selected }: NodeProps<TextRFNode>) {
  return (
    <div
      style={{
        minWidth: 220,
        borderRadius: 10,
        background: '#fff',
        border: selected ? '2px solid #4A90E2' : '1px solid #ddd',
        boxShadow: selected ? '0 0 0 4px rgba(74,144,226,0.15)' : '0 2px 6px rgba(0,0,0,0.08)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          background: '#B2E6D4',
          padding: '8px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span>💬</span>
        <span style={{ fontWeight: 600 }}>Text Message</span>
      </div>
      <div style={{ padding: 10, background: '#fff' }}>{data?.text ?? ''}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  )
}
