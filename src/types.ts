export const NodeTypes = {
  INPUT: 'input',
  PROCESS: 'process',
  OUTPUT: 'output',
  TRANSFORM: 'transform'
} 

export type NodeType = typeof NodeTypes[keyof typeof NodeTypes];

export const ValidationStatus = {
  VALID: 'valid',
  INVALID: 'invalid',
  EMPTY: 'empty'
} 

export type ValidationStatusType = typeof ValidationStatus[keyof typeof ValidationStatus];

export interface NodeData {
  label: string;
  nodeType: NodeType;
  onDelete: (() => void) | null;
}

export interface CustomNodeType {
  id: string;
  type: 'custom';
  position: { x: number; y: number };
  data: NodeData;
  deletable: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  status: ValidationStatusType;
}

export interface DAGStructure {
  nodes: Array<{
    id: string;
    label: string;
    type: NodeType;
    position: { x: number; y: number };
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
  }>;
}

export const createNode = (
  id: string, 
  label: string, 
  type: NodeType = NodeTypes.PROCESS, 
  position: { x: number; y: number } = { x: 0, y: 0 }
): CustomNodeType => ({
  id,
  type: 'custom',
  position,
  data: {
    label,
    nodeType: type,
    onDelete: null
  },
  deletable: true
});