import {type  Node, type Edge } from 'reactflow';
import {type  ValidationResult,  ValidationStatus,type  NodeData } from '../types';

export const validateDAG = (nodes: Node<NodeData>[], edges: Edge[]): ValidationResult => {
  const validation: ValidationResult = {
    isValid: true,
    errors: [],
    status: ValidationStatus.VALID
  };

 
  if (nodes.length < 2) {
    validation.isValid = false;
    validation.errors.push('DAG must have at least 2 nodes');
  }

  if (nodes.length === 0) {
    validation.status = ValidationStatus.EMPTY;
    return validation;
  }


  const connectedNodes = new Set<string>();
  edges.forEach(edge => {
    connectedNodes.add(edge.source);
    connectedNodes.add(edge.target);
  });

  const unconnectedNodes = nodes.filter(node => !connectedNodes.has(node.id));
  if (unconnectedNodes.length > 0) {
    validation.isValid = false;
    validation.errors.push(`Nodes not connected: ${unconnectedNodes.map(n => n.data.label).join(', ')}`);
  }


  if (hasCycle(nodes, edges)) {
    validation.isValid = false;
    validation.errors.push('Graph contains cycles');
  }


  const selfLoops = edges.filter(edge => edge.source === edge.target);
  if (selfLoops.length > 0) {
    validation.isValid = false;
    validation.errors.push('Self-loops are not allowed');
  }

  validation.status = validation.isValid ? ValidationStatus.VALID : ValidationStatus.INVALID;
  return validation;
};

const hasCycle = (nodes: Node<NodeData>[], edges: Edge[]): boolean => {
  const adjList: Record<string, string[]> = {};
  const visited = new Set<string>();
  const recStack = new Set<string>();


  nodes.forEach(node => {
    adjList[node.id] = [];
  });

  edges.forEach(edge => {
    if (adjList[edge.source]) {
      adjList[edge.source].push(edge.target);
    }
  });


  const dfs = (nodeId: string): boolean => {
    visited.add(nodeId);
    recStack.add(nodeId);

    for (const neighbor of adjList[nodeId] || []) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) return true;
      } else if (recStack.has(neighbor)) {
        return true;
      }
    }

    recStack.delete(nodeId);
    return false;
  };

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (dfs(node.id)) return true;
    }
  }

  return false;
};

export const getDAGStructure = (nodes: Node<NodeData>[], edges: Edge[]) => {
  return {
    nodes: nodes.map(node => ({
      id: node.id,
      label: node.data.label,
      type: node.data.nodeType,
      position: node.position
    })),
    edges: edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target
    }))
  };
};