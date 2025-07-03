
import { NodeTypes, type NodeType } from "../types";
import {  Download, Upload, Zap, Database } from 'lucide-react';

interface NodeTypeButton {
  type: NodeType;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
}
export const NodeTypeButtons: NodeTypeButton[] = [
  { type: NodeTypes.INPUT, icon: Upload, label: 'Input' },
  { type: NodeTypes.PROCESS, icon: Zap, label: 'Process' },
  { type: NodeTypes.TRANSFORM, icon: Database, label: 'Transform' },
  { type: NodeTypes.OUTPUT, icon: Download, label: 'Output' }
];
export interface ToolbarProps {
  onAddNode: (type: string) => void;
  onAutoLayout: () => void;
  onClearAll: () => void;
  disabled: boolean;
}
