import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { ImageRFNode } from '../../types/flow.types'
//added preview with fallback when url empty

export default function ImageNode({ data, selected }: NodeProps<ImageRFNode>) {
  return (
    <div
      style={{
        minWidth: 240,
        borderRadius: 10,
        background: '#fff',
        border: selected ? '2px solid #4A90E2' : '1px solid #ddd',
        boxShadow: selected ? '0 0 0 4px rgba(74,144,226,0.15)' : '0 2px 6px rgba(0,0,0,0.08)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          background: '#FFE0B2',
          padding: '8px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span>🖼️</span>
        <span style={{ fontWeight: 600 }}>Image Message</span>
      </div>
      <div style={{ padding: 10 }}>
        {data?.imageUrl ? (
          <img
            src={data.imageUrl}
            alt={data.caption || 'image'}
            style={{ maxWidth: '100%', borderRadius: 6 }}
          />
        ) : (
          <div
            style={{
              height: 120,
              background: '#f3f3f3',
              border: '1px dashed #ccc',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#777',
            }}
          >
            No image URL
          </div>
        )}
        {data?.caption && <div style={{ marginTop: 6, color: '#555' }}>{data.caption}</div>}
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  )
}
