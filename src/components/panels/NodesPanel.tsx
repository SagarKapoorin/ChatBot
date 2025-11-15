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
    <div className="nodes-panel">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 10,
        }}
      >
        {availableNodes.map((n) => (
          <div
            key={n.type}
            draggable
            onDragStart={(e) => onDragStart(e, n.type)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              background: '#fff',
              border: '1px solid #5b5fc7',
              borderRadius: 8,
              padding: '10px 12px',
              cursor: 'grab',
              userSelect: 'none',
              minHeight: 64,
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <span style={{ fontSize: 22, color: '#5b5fc7' }}>{n.icon}</span>
            <div style={{ fontWeight: 600, fontSize: 13, color: '#5b5fc7', textAlign: 'center' }}>
              {n.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
