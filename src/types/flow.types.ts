import type { Node, Edge } from '@xyflow/react'

export type NodeType = 'text'

export type TextNodeData = {
  text: string
}

export type TextRFNode = Node<TextNodeData, 'text'>
export type RFEdge = Edge

export type Flow = {
  nodes: TextRFNode[]
  edges: RFEdge[]
}
