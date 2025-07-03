import dagre from 'dagre';
import {type  Node, type Edge } from 'reactflow';
import { type NodeData } from '../types';

export const getLayoutedElements = (
  nodes: Node<NodeData>[], 
  edges: Edge[], 
  direction: 'TB' | 'LR' = 'TB'
) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 180;
  const nodeHeight = 80;

  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ 
    rankdir: direction,
    nodesep: isHorizontal ? 80 : 60,
    ranksep: isHorizontal ? 120 : 100,
    marginx: 40,
    marginy: 40
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? 'left' as const : 'top' as const,
      sourcePosition: isHorizontal ? 'right' as const : 'bottom' as const,
      position: {
        x: Math.max(50, nodeWithPosition.x - nodeWidth / 2),
        y: Math.max(50, nodeWithPosition.y - nodeHeight / 2),
      }
    };

    return newNode;
  });

  return { nodes: layoutedNodes, edges };
};