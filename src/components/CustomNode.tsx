import React from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { Trash2, Database, Zap, Upload, Download } from 'lucide-react';
import { NodeTypes, type NodeData, type NodeType } from '../types';

const NodeIcons: Record<NodeType, React.ComponentType<{ size?: number }>> = {
  [NodeTypes.INPUT]: Upload,
  [NodeTypes.PROCESS]: Zap,
  [NodeTypes.OUTPUT]: Download,
  [NodeTypes.TRANSFORM]: Database
};

const NodeColors: Record<NodeType, string> = {
  [NodeTypes.INPUT]: 'bg-gradient-to-br from-green-100 to-green-200 border-green-400 text-green-800',
  [NodeTypes.PROCESS]: 'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-400 text-blue-800',
  [NodeTypes.OUTPUT]: 'bg-gradient-to-br from-purple-100 to-purple-200 border-purple-400 text-purple-800',
  [NodeTypes.TRANSFORM]: 'bg-gradient-to-br from-orange-100 to-orange-200 border-orange-400 text-orange-800'
};

const CustomNode: React.FC<NodeProps<NodeData>> = ({ data, selected }) => {
  const IconComponent = NodeIcons[data.nodeType] || Zap;
  const colorClass = NodeColors[data.nodeType] || NodeColors[NodeTypes.PROCESS];

  return (
    <div className={`
      relative px-4 py-3 rounded-lg border-2 shadow-lg transition-all duration-200
      ${colorClass}
      ${selected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      hover:shadow-xl
    `}>
     
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-blue-500 border-2 border-white hover:!bg-blue-600 transition-colors"
      />


      <div className="flex items-center gap-3 min-w-[120px]">
        <IconComponent size={20} />
        <div>
          <div className="font-semibold text-sm">{data.label}</div>
          <div className="text-xs opacity-75 capitalize">{data.nodeType}</div>
        </div>
      </div>

      {/* Delete Button */}
      {selected && data.onDelete && (
        <button
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            data.onDelete!();
          }}
          title="Delete node"
        >
          <Trash2 size={12} />
        </button>
      )}

   
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-green-500 border-2 border-white hover:!bg-green-600 transition-colors"
      />
    </div>
  );
};

export default CustomNode;