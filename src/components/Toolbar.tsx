
import { RotateCcw, GitBranch } from 'lucide-react';

import { NodeTypeButtons } from '../utills/nodeButtons';
export interface ToolbarProps {
  onAddNode: (type: string) => void;
  onAutoLayout: () => void;
  onClearAll: () => void;
  disabled: boolean;
}

 const Toolbar:  React.FC<ToolbarProps> =  ({ onAddNode, onAutoLayout, onClearAll, disabled }: ToolbarProps) => {
  return (
      <div className="w-full border-1 p-5 border-slate-200 rounded-lg">
      <div className="flex flex-wrap gap-2 p-4 items-center">
        <div className="flex flex-wrap gap-2 items-center">
          {NodeTypeButtons.map(({ type, icon: Icon, label }) => (
            <button
              key={type}
              onClick={() => onAddNode(type)}
              disabled={disabled}
              className={`
                px-2 py-1  bg-slate-200 rounded-md text-black font-medium text-sm flex items-center gap-2 transition-all cursor-pointer
                ${disabled ? 'cursor-not-allowed bg-slate-200' : ""}
              `}
              title={`Add ${label} Node`}
            >
              <Icon size={10} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

     

     
        <button
          onClick={onAutoLayout}
          disabled={disabled}
          className={`cursor-pointer 
            px-2 py-1 rounded-md font-medium  text-sm flex items-center gap-2 transition-all
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
            px-2 py-1 rounded-md text-sm font-medium flex items-center gap-2 transition-all
            ${disabled 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : 'bg-red-500 text-white hover:bg-red-600'
            }
          `}
          title="Clear All"
        >
          <RotateCcw size={10} />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>
    </div>

  );
};

export default Toolbar;