import { NodeTypes } from "../types";

export const initialNodes = [
  {
    id: 'sample-1',
    type: 'custom',
    position: { x: 100, y: 100 },
    data: {
      label: 'Data Source',
      nodeType: NodeTypes.INPUT,
      onDelete: null
    },
    deletable: true
  },
  {
    id: 'sample-2',
    type: 'custom',
    position: { x: 350, y: 100 },
    data: {
      label: 'Clean Data',
      nodeType: NodeTypes.PROCESS,
      onDelete: null
    },
    deletable: true
  },
  {
    id: 'sample-3',
    type: 'custom',
    position: { x: 600, y: 50 },
    data: {
      label: 'Transform',
      nodeType: NodeTypes.TRANSFORM,
      onDelete: null
    },
    deletable: true
  },
  {
    id: 'sample-4',
    type: 'custom',
    position: { x: 600, y: 200 },
    data: {
      label: 'Aggregate',
      nodeType: NodeTypes.PROCESS,
      onDelete: null
    },
    deletable: true
  },
  {
    id: 'sample-5',
    type: 'custom',
    position: { x: 850, y: 125 },
    data: {
      label: 'Export Results',
      nodeType: NodeTypes.OUTPUT,
      onDelete: null
    },
    deletable: true
  }
];



export const initialEdges = [
  {
    id: 'edge-1',
    source: 'sample-1',
    target: 'sample-2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#6366f1', strokeWidth: 2 }
  },
  {
    id: 'edge-2',
    source: 'sample-2',
    target: 'sample-3',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#6366f1', strokeWidth: 2 }
  },
  {
    id: 'edge-3',
    source: 'sample-2',
    target: 'sample-4',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#6366f1', strokeWidth: 2 }
  },
  {
    id: 'edge-4',
    source: 'sample-3',
    target: 'sample-5',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#6366f1', strokeWidth: 2 }
  },
  {
    id: 'edge-5',
    source: 'sample-4',
    target: 'sample-5',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#6366f1', strokeWidth: 2 }
  }
];