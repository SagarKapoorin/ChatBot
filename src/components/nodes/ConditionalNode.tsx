import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { ConditionalRFNode } from '../../types/flow.types'
//added true/false outputs using distinct handles

export default function ConditionalNode({ data, selected }: NodeProps<ConditionalRFNode>) {
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
          background: '#FFF9C4',
          padding: '8px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span>🔀</span>
        <span style={{ fontWeight: 600 }}>Condition</span>
      </div>
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 12, color: '#666' }}>If</div>
        <div style={{ marginTop: 4, color: '#333' }}>
          {data?.variable || 'variable'} {data?.condition || ''}
        </div>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{ top: '40%', background: '#4CAF50' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="false"
        style={{ top: '60%', background: '#F44336' }}
      />
    </div>
  )
}
