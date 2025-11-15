import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { ImageRFNode } from '../../types/flow.types'

export default function ImageNode({ data, selected }: NodeProps<ImageRFNode>) {
  return (
    <div className={`node ${selected ? 'node-selected' : ''}`}>
      <div className="node-header node-header--image">
        <span>🖼️</span>
        <span className="node-title">Image Message</span>
      </div>
      <div className="node-body">
        {data?.imageUrl ? (
          <img src={data.imageUrl} alt={data.caption || 'image'} className="node-image" />
        ) : (
          <div className="image-placeholder">No image URL</div>
        )}
        {data?.caption && <div className="image-caption">{data.caption}</div>}
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  )
}
