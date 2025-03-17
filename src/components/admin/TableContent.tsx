
import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TableDataRow from './TableDataRow';
import NewRowForm from './NewRowForm';
import { TableData } from '@/types/admin';

interface TableContentProps {
  loading: boolean;
  tableSchema: any;
  tableData: TableData[];
  isCreating: boolean;
  newRow: TableData | null;
  editingRow: TableData | null;
  startCreating: () => void;
  startEditing: (row: TableData) => void;
  deleteRow: (row: TableData) => void;
  saveRow: () => void;
  cancelEditing: () => void;
  handleInputChange: (name: string, value: any) => void;
  getPrimaryKeyMatch: (row: TableData) => TableData;
  renderCellValue: (value: any, column: any) => React.ReactNode;
  renderEditableCell: (row: TableData, column: any) => React.ReactNode;
}

const TableContent: React.FC<TableContentProps> = ({
  loading,
  tableSchema,
  tableData,
  isCreating,
  newRow,
  editingRow,
  startCreating,
  startEditing,
  deleteRow,
  saveRow,
  cancelEditing,
  handleInputChange,
  getPrimaryKeyMatch,
  renderCellValue,
  renderEditableCell,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium">Table: {tableSchema?.name}</h3>
        <Button onClick={startCreating}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle ligne
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {tableSchema?.columns.map(column => (
                <TableHead key={column.name}>
                  {column.name}
                  {column.is_primary && <span className="text-yellow-500 ml-1">🔑</span>}
                  <div className="text-xs text-muted-foreground">
                    {column.type}
                    {column.is_nullable ? ' (nullable)' : ''}
                  </div>
                </TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isCreating && newRow && (
              <NewRowForm
                newRow={newRow}
                tableSchema={tableSchema}
                saveRow={saveRow}
                cancelEditing={cancelEditing}
                handleInputChange={handleInputChange}
              />
            )}
            
            {tableData.map((row, index) => (
              <TableDataRow
                key={index}
                row={row}
                schema={tableSchema}
                editingRow={editingRow}
                tableData={tableData}
                startEditing={startEditing}
                deleteRow={deleteRow}
                renderCellValue={renderCellValue}
                renderEditableCell={renderEditableCell}
                getPrimaryKeyMatch={getPrimaryKeyMatch}
                saveRow={saveRow}
                cancelEditing={cancelEditing}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableContent;
