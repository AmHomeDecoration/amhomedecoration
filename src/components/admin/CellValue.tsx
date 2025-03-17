
import React from 'react';

interface CellValueProps {
  value: any;
  column: {
    type: string;
  };
}

const CellValue: React.FC<CellValueProps> = ({ value, column }) => {
  if (value === null) return <span className="text-gray-400">NULL</span>;
  
  if (typeof value === 'object') {
    try {
      return <span className="font-mono text-xs">{JSON.stringify(value)}</span>;
    } catch {
      return <span className="text-gray-400">[Objet]</span>;
    }
  }
  
  if (typeof value === 'boolean') {
    return <>{value ? 'true' : 'false'}</>;
  }
  
  if (column.type.includes('timestamp') && value) {
    try {
      return <>{new Date(value).toLocaleString()}</>;
    } catch {
      return <>{value}</>;
    }
  }
  
  return <>{String(value)}</>;
};

export default CellValue;
