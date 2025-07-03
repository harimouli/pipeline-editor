
import { RotateCcw, GitBranch } from 'lucide-react';

import { NodeTypeButtons,type  ToolbarProps } from '../utills/nodeButtons';



export const Toolbar = () => ({ onAddNode, onAutoLayout, onClearAll, disabled }: ToolbarProps) => {
  return (
    
      <div className="flex flex-wrap gap-2 p-6 items-center">
        <div className="flex gap-4 items-center">
          {NodeTypeButtons.map(({ type, icon: Icon, label }) => (
            <button
              key={type}
              onClick={() => onAddNode(type)}
              disabled={disabled}
              className={`
                px-3 py-2 bg-slate-200 rounded-md text-black font-medium flex items-center gap-2 transition-all
                ${disabled ? 'cursor-not-allowed bg-slate-200' : ""}
              `}
              title={`Add ${label} Node`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

     

     
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

  );
};

