import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { TextRFNode } from '../../types/flow.types'

export default function TextNode({ data, selected }: NodeProps<TextRFNode>) {
  return (
    <div className={`node ${selected ? 'node-selected' : ''}`}>
      <div className="node-header node-header--text">
        <span>💬</span>
        <span className="node-title">Text Message</span>
      </div>
      <div className="node-body">{data?.text ?? ''}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  )
}
