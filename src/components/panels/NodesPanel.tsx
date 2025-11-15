type Item = {
  type: 'text' | 'image' | 'button' | 'conditional'
  icon: string
  label: string
  description: string
}

const availableNodes: Item[] = [
  { type: 'text', icon: '💬', label: 'Message', description: 'Send text' },
  { type: 'image', icon: '🖼️', label: 'Image', description: 'Send image' },
  { type: 'button', icon: '🔘', label: 'Quick Reply', description: 'Suggested responses' },
  { type: 'conditional', icon: '🔀', label: 'Condition', description: 'Branch logic' },
]
//you can add more node types here as needed

export default function NodesPanel() {
  const onDragStart = (event: React.DragEvent, type: Item['type']) => {
    event.dataTransfer.setData('application/reactflow', type)
    event.dataTransfer.effectAllowed = 'move'
  }
  //added drag payload to carry node type
  return (
    <div style={{ background: '#fff', padding: 12 }}>
      <div style={{ fontWeight: 600, marginBottom: 12 }}>Nodes</div>
      {availableNodes.map((n) => (
        <div
          key={n.type}
          draggable
          onDragStart={(e) => onDragStart(e, n.type)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: '#f7f7f7',
            border: '1px solid #e0e0e0',
            borderRadius: 8,
            padding: '10px 12px',
            cursor: 'grab',
            userSelect: 'none',
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 18 }}>{n.icon}</span>
          <div>
            <div style={{ fontWeight: 600 }}>{n.label}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{n.description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
