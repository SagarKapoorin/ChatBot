import '@xyflow/react/dist/style.css'
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type ReactFlowInstance,
  type NodeTypes,
} from '@xyflow/react'
import { useCallback, useMemo, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import NodesPanel from './panels/NodesPanel'
import SettingsPanel from './panels/SettingsPanel'
import TextNode from './nodes/TextNode'
import ImageNode from './nodes/ImageNode'
import ButtonNode from './nodes/ButtonNode'
import ConditionalNode from './nodes/ConditionalNode'
import SaveButton from './SaveButton'
import type { Flow, AppRFNode, RFEdge } from '../types/flow.types'
import type { ButtonNodeData, NodeType } from '../types/flow.types'

let idCounter = 1
const nextId = () => `node_${idCounter++}`

const nodeTypes: NodeTypes = {
  text: TextNode,
  image: ImageNode,
  button: ButtonNode,
  conditional: ConditionalNode,
}
//added registry pattern to easily register new nodes

export default function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppRFNode>([
    { id: nextId(), type: 'text', position: { x: 100, y: 100 }, data: { text: 'test message 1' } },
    { id: nextId(), type: 'text', position: { x: 400, y: 100 }, data: { text: 'test message 2' } },
  ])
  const [edges, setEdges, onEdgesChange] = useEdgesState<RFEdge>([
    { id: 'e1-2', source: 'node_1', target: 'node_2', type: 'default' },
  ])
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>()
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const rf = useRef<ReactFlowInstance<AppRFNode, RFEdge> | null>(null)

  const selectedNode = useMemo(
    () => nodes.find((n) => n.id === selectedNodeId),
    [nodes, selectedNodeId]
  )

  const isValidConnection = useCallback(
    (edgeOrConn: RFEdge | Connection) => {
      const sourceId = edgeOrConn.source
      if (!sourceId) return false
      const source = nodes.find((n) => n.id === sourceId)
      const sameSource = edges.filter((e) => e.source === sourceId)
      //unique connection per handle as said in assignment
      if (edgeOrConn.sourceHandle) {
        const sameHandle = sameSource.filter((e) => e.sourceHandle === edgeOrConn.sourceHandle)
        if (sameHandle.length > 0) return false
      }
      //type-based constraints as said in assignment
      if (!source) return true
      switch (source.type) {
        case 'button':
        case 'conditional':
          //multiple handles allowed; each handle -> max 1 only in conditional and button
          return !!edgeOrConn.sourceHandle
        default:
          //allow only one outgoing
          return sameSource.length === 0
      }
    },
    [edges, nodes]
  )
  //added per node type connection rules and per handle uniqueness

  const onConnect = useCallback(
    (conn: Connection) => {
      if (!isValidConnection(conn)) return
      setEdges((eds) => addEdge(conn, eds))
    },
    [isValidConnection, setEdges]
  )

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      const raw = event.dataTransfer.getData('application/reactflow')
      if (!isNodeType(raw)) return
      const type = raw
      const position = rf.current?.screenToFlowPosition({ x: event.clientX, y: event.clientY }) || {
        x: 0,
        y: 0,
      }
      const id = nextId()
      let node: AppRFNode
      if (type === 'text') node = { id, type, position, data: { text: 'message' } }
      else if (type === 'image') node = { id, type, position, data: { imageUrl: '', caption: '' } }
      else if (type === 'button')
        node = {
          id,
          type,
          position,
          data: {
            text: 'Choose an option',
            buttons: [
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' },
            ],
          },
        }
      else node = { id, type, position, data: { variable: 'answer', condition: '== "yes"' } }
      setNodes((nds) => nds.concat(node))
      setSelectedNodeId(id)
    },
    [setNodes]
  )
  //added type-guarded dnd creation with sensible defaults

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onNodeClick = useCallback((_: MouseEvent, n: AppRFNode) => setSelectedNodeId(n.id), [])
  const onPaneClick = useCallback(() => setSelectedNodeId(undefined), [])

  const updateSelectedData = useCallback(
    (updater: (node: AppRFNode) => AppRFNode) => {
      if (!selectedNodeId) return
      const current = nodes.find((n) => n.id === selectedNodeId)
      const updated = current ? updater(current) : undefined
      setNodes((nds) => nds.map((n) => (n.id === selectedNodeId ? updater(n) : n)))
      if (updated && updated.type === 'button') {
        const btnData: ButtonNodeData = updated.data
        const handles = new Set(btnData.buttons.map((b) => b.value))
        setEdges((eds) =>
          eds.filter(
            (e) =>
              !(
                e.source === selectedNodeId &&
                e.sourceHandle !== undefined &&
                !handles.has(String(e.sourceHandle))
              )
          )
        )
      }
    },
    [selectedNodeId, nodes, setNodes, setEdges]
  )
  //added immutable updater and prune edges when button options change

  const flow: Flow = useMemo(() => ({ nodes, edges }), [nodes, edges])

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <div ref={wrapperRef} style={{ flex: 1 }}>
        <ReactFlow<AppRFNode, RFEdge>
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
      <div
        style={{
          width: 300,
          background: '#fff',
          borderLeft: '1px solid #eee',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          padding: 12,
        }}
      >
        <div style={{ alignSelf: 'stretch' }}>
          <SaveButton flow={flow} />
        </div>
        {selectedNode ? (
          <SettingsPanel
            node={selectedNode}
            onChange={updateSelectedData}
            onBack={() => setSelectedNodeId(undefined)}
          />
        ) : (
          <NodesPanel />
        )}
      </div>
    </div>
  )
}

function isNodeType(value: string): value is NodeType {
  return value === 'text' || value === 'image' || value === 'button' || value === 'conditional'
}
