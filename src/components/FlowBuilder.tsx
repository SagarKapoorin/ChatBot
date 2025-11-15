import '@xyflow/react/dist/style.css'
import { ReactFlow, Background, BackgroundVariant, Controls, useNodesState, useEdgesState, addEdge, type Connection, type ReactFlowInstance, type NodeTypes } from '@xyflow/react'
import { useCallback, useMemo, useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import NodesPanel from './panels/NodesPanel'
import SettingsPanel from './panels/SettingsPanel'
import TextNode from './nodes/TextNode'
import SaveButton from './SaveButton'
import type { Flow, TextRFNode, RFEdge } from '../types/flow.types'

let idCounter = 1
const nextId = () => `node_${idCounter++}`

const nodeTypes: NodeTypes = { text: TextNode }

export default function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState<TextRFNode>([
    { id: nextId(), type: 'text', position: { x: 100, y: 100 }, data: { text: 'test message 1' } },
    { id: nextId(), type: 'text', position: { x: 400, y: 100 }, data: { text: 'test message 2' } },
  ])
  const [edges, setEdges, onEdgesChange] = useEdgesState<RFEdge>([
    { id: 'e1-2', source: 'node_1', target: 'node_2', type: 'default' },
  ])
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>()
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const rf = useRef<ReactFlowInstance<TextRFNode, RFEdge> | null>(null)

  const selectedNode = useMemo(() => nodes.find(n => n.id === selectedNodeId), [nodes, selectedNodeId])

  const isValidConnection = useCallback((edgeOrConn: RFEdge | Connection) => {
    const sourceId = edgeOrConn.source
    if (!sourceId) return false
    const already = edges.filter(e => e.source === sourceId).length
    return already === 0
  }, [edges])

  const onConnect = useCallback((conn: Connection) => {
    if (!isValidConnection(conn)) return
    setEdges(eds => addEdge(conn, eds))
  }, [isValidConnection, setEdges])

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    const type = event.dataTransfer.getData('application/reactflow')
    if (!type) return
    const position = rf.current?.screenToFlowPosition({ x: event.clientX, y: event.clientY }) || { x: 0, y: 0 }
    const id = nextId()
    const node: TextRFNode = { id, type: 'text', position, data: { text: 'message' } }
    setNodes(nds => nds.concat(node))
    setSelectedNodeId(id)
  }, [setNodes])

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onNodeClick = useCallback((_: ReactMouseEvent, n: TextRFNode) => setSelectedNodeId(n.id), [])
  const onPaneClick = useCallback(() => setSelectedNodeId(undefined), [])

  const updateSelectedText = useCallback((value: string) => {
    if (!selectedNodeId) return
    setNodes(nds => nds.map(n => (n.id === selectedNodeId ? { ...n, data: { ...n.data, text: value } } : n)))
  }, [selectedNodeId, setNodes])

  const flow: Flow = useMemo(() => ({ nodes, edges }), [nodes, edges])

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <div ref={wrapperRef} style={{ flex: 1 }}>
        <ReactFlow<TextRFNode, RFEdge>
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          isValidConnection={isValidConnection}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={(inst) => (rf.current = inst)}
          fitView
        >
          <Background variant={BackgroundVariant.Dots} />
          <Controls />
        </ReactFlow>
      </div>
      <div style={{ width: 300, background: '#fff', borderLeft: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: 12, padding: 12 }}>
        <div style={{ alignSelf: 'stretch' }}>
          <SaveButton flow={flow} />
        </div>
        {selectedNode ? (
          <SettingsPanel text={selectedNode.data.text} onChangeText={updateSelectedText} onBack={() => setSelectedNodeId(undefined)} />
        ) : (
          <NodesPanel />
        )}
      </div>
    </div>
  )
}
