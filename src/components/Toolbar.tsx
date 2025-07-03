import React from 'react';
import { RotateCcw, GitBranch, Download, Upload, Zap, Database } from 'lucide-react';
import { NodeTypes, type NodeType } from '../types';

interface ToolbarProps {
  onAddNode: (type: NodeType) => void;
  onAutoLayout: () => void;
  onClearAll: () => void;
  disabled: boolean;
}

interface NodeTypeButton {
  type: NodeType;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  color: string;
}

const NodeTypeButtons: NodeTypeButton[] = [
  { type: NodeTypes.INPUT, icon: Upload, label: 'Input', color: 'bg-green-500 hover:bg-green-600' },
  { type: NodeTypes.PROCESS, icon: Zap, label: 'Process', color: 'bg-blue-500 hover:bg-blue-600' },
  { type: NodeTypes.TRANSFORM, icon: Database, label: 'Transform', color: 'bg-orange-500 hover:bg-orange-600' },
  { type: NodeTypes.OUTPUT, icon: Download, label: 'Output', color: 'bg-purple-500 hover:bg-purple-600' }
];

const Toolbar: React.FC<ToolbarProps> = ({ onAddNode, onAutoLayout, onClearAll, disabled }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <div className="flex gap-1">
          {NodeTypeButtons.map(({ type, icon: Icon, label, color }) => (
            <button
              key={type}
              onClick={() => onAddNode(type)}
              disabled={disabled}
              className={`
                px-3 py-2 rounded-md text-white font-medium flex items-center gap-2 transition-all
                ${disabled ? 'bg-gray-400 cursor-not-allowed' : color}
              `}
              title={`Add ${label} Node`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        <div className="w-px h-8 bg-gray-300" />

        {/* Action Buttons */}
        <button
          onClick={onAutoLayout}
          disabled={disabled}
          className={`
            px-3 py-2 rounded-md font-medium flex items-center gap-2 transition-all
            ${disabled 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : 'bg-indigo-500 text-white hover:bg-indigo-600'
            }
          `}
          title="Auto Layout"
        >
          <GitBranch size={16} />
          <span className="hidden sm:inline">Auto Layout</span>
        </button>

        <button
          onClick={onClearAll}
          disabled={disabled}
          className={`
            px-3 py-2 rounded-md font-medium flex items-center gap-2 transition-all
            ${disabled 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : 'bg-red-500 text-white hover:bg-red-600'
            }
          `}
          title="Clear All"
        >
          <RotateCcw size={16} />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;