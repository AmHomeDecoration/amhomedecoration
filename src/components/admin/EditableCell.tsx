
import React from 'react';
import { Input } from '@/components/ui/input';

interface EditableCellProps {
  column: {
    name: string;
    type: string;
    is_nullable: boolean;
    is_primary: boolean;
  };
  value: any;
  onChange: (name: string, value: any) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({ column, value, onChange }) => {
  if (column.type.includes('bool')) {
    return (
      <select
        value={value === null ? 'null' : value.toString()}
        onChange={(e) => {
          let val;
          if (e.target.value === 'null') val = null;
          else if (e.target.value === 'true') val = true;
          else val = false;
          onChange(column.name, val);
        }}
        disabled={column.is_primary}
        className="w-full p-1 border rounded"
      >
        {column.is_nullable && <option value="null">NULL</option>}
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
    );
  }
  
  if (column.type.includes('json')) {
    return (
      <textarea
        value={value !== null ? JSON.stringify(value, null, 2) : ''}
        onChange={(e) => {
          try {
            const val = e.target.value.trim() === '' ? null : JSON.parse(e.target.value);
            onChange(column.name, val);
          } catch {
            // Ignorer les erreurs de parsing JSON
          }
        }}
        disabled={column.is_primary}
        className="w-full p-1 border rounded font-mono text-xs"
        rows={3}
      />
    );
  }
  
  if (column.type.includes('timestamp')) {
    return (
      <input
        type="datetime-local"
        value={value ? new Date(value).toISOString().slice(0, 16) : ''}
        onChange={(e) => onChange(column.name, e.target.value ? new Date(e.target.value).toISOString() : null)}
        disabled={column.is_primary}
        className="w-full p-1 border rounded"
      />
    );
  }
  
  return (
    <Input
      type={column.type.includes('int') ? 'number' : 'text'}
      value={value === null ? '' : String(value)}
      onChange={(e) => {
        let val = e.target.value;
        
        if (column.type.includes('int') && val !== '') {
          const numVal = parseInt(val, 10);
          if (!isNaN(numVal)) {
            val = String(numVal);
          }
        }
        
        if (val === '' && column.is_nullable) {
          val = null;
        }
        
        onChange(column.name, val);
      }}
      disabled={column.is_primary}
      className="w-full"
    />
  );
};

export default EditableCell;
