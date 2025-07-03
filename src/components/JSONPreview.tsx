import React, { useState } from 'react';
import { Code, ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';
import { type  DAGStructure } from '../types';

interface JSONPreviewProps {
  dagStructure: DAGStructure;
}

const JSONPreview: React.FC<JSONPreviewProps> = ({ dagStructure }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(dagStructure, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Code size={16} />
          <span className="font-medium">DAG Structure</span>
        </div>
        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      
      {isExpanded && (
        <div className="border-t border-gray-200">
          <div className="p-2 border-b border-gray-100 flex justify-end">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
              title="Copy JSON"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="p-4 text-sm bg-gray-50 overflow-auto max-h-64 rounded-b-lg font-mono">
            {JSON.stringify(dagStructure, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default JSONPreview;