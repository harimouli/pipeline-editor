import React from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import { ValidationStatus, type ValidationResult } from '../types';

interface StatusPanelProps {
  validation: ValidationResult;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ validation }) => {
  const getStatusIcon = () => {
    switch (validation.status) {
      case ValidationStatus.VALID:
        return <CheckCircle className="text-green-500" size={20} />;
      case ValidationStatus.INVALID:
        return <AlertCircle className="text-red-500" size={20} />;
      default:
        return <Info className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = () => {
    switch (validation.status) {
      case ValidationStatus.VALID:
        return 'bg-green-50 border-green-200';
      case ValidationStatus.INVALID:
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusTitle = () => {
    switch (validation.status) {
      case ValidationStatus.VALID:
        return 'Valid DAG';
      case ValidationStatus.INVALID:
        return 'Invalid DAG';
      default:
        return 'Empty Pipeline';
    }
  };

  return (
    <div className={`rounded-lg p-4 border-2 ${getStatusColor()}`}>
      <div className="flex items-center gap-2 mb-2">
        {getStatusIcon()}
        <h3 className="font-semibold">{getStatusTitle()}</h3>
      </div>
      
      {validation.errors.length > 0 && (
        <div className="space-y-1">
          {validation.errors.map((error, index) => (
            <p key={index} className="text-sm text-red-600">
              • {error}
            </p>
          ))}
        </div>
      )}
      
      {validation.status === ValidationStatus.VALID && (
        <p className="text-sm text-green-600">
          Pipeline is ready for execution
        </p>
      )}
      
      {validation.status === ValidationStatus.EMPTY && (
        <p className="text-sm text-gray-600">
          Add nodes to start building your pipeline
        </p>
      )}
    </div>
  );
};

export default StatusPanel;