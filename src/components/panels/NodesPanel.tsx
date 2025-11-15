export default function NodesPanel() {
  const onDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('application/reactflow', 'text')
    event.dataTransfer.effectAllowed = 'move'
  }
  return (
    <div style={{ background: '#fff', padding: 12 }}>
      <div style={{ fontWeight: 600, marginBottom: 12 }}>Nodes</div>
      <div
        draggable
        onDragStart={onDragStart}
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
        }}
      >
        <span style={{ fontSize: 18 }}>💬</span>
        <div>
          <div style={{ fontWeight: 600 }}>Message</div>
          <div style={{ fontSize: 12, color: '#666' }}>Send a text message</div>
        </div>
      </div>
    </div>
  )
}
