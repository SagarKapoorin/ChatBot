import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { ConditionalRFNode } from '../../types/flow.types'

export default function ConditionalNode({ data, selected }: NodeProps<ConditionalRFNode>) {
  return (
    <div className={`node ${selected ? 'node-selected' : ''}`}>
      <div className="node-header node-header--conditional">
        <span>🔀</span>
        <span className="node-title">Condition</span>
      </div>
      <div className="node-body">
        <div className="muted">If</div>
        <div className="text-primary">
          {data?.variable || 'variable'} {data?.condition || ''}
        </div>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} id="true" />
      <Handle type="source" position={Position.Right} id="false" />
    </div>
  )
}
