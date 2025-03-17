
import React from 'react';

export interface ColumnSchema {
  name: string;
  type: string;
  is_nullable: boolean;
  is_primary: boolean;
}

export interface TableSchemaType {
  name: string;
  columns: ColumnSchema[];
}

interface TableSchemaProps {
  schema: TableSchemaType | null;
}

const TableSchema: React.FC<TableSchemaProps> = ({ schema }) => {
  if (!schema) return null;
  
  return (
    <div className="text-sm text-muted-foreground mb-4">
      <h4 className="font-medium">Schema Information:</h4>
      <ul className="list-disc pl-5 mt-2">
        {schema.columns.map(column => (
          <li key={column.name}>
            <span className="font-medium">{column.name}</span>
            {column.is_primary && <span className="text-yellow-500 ml-1">🔑</span>}
            <span className="text-gray-400 ml-2">
              {column.type}
              {column.is_nullable ? ' (nullable)' : ' (required)'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableSchema;
