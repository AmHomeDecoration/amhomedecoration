
import React from 'react';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import { TableData } from '@/types/admin';

interface TableDataRowProps {
  row: TableData;
  schema: any;
  editingRow: TableData | null;
  tableData: TableData[];
  startEditing: (row: TableData) => void;
  deleteRow: (row: TableData) => void;
  renderCellValue: (value: any, column: any) => React.ReactNode;
  renderEditableCell: (row: TableData, column: any) => React.ReactNode;
  getPrimaryKeyMatch: (row: TableData) => TableData;
  saveRow: () => void;
  cancelEditing: () => void;
}

const TableDataRow: React.FC<TableDataRowProps> = ({
  row,
  schema,
  editingRow,
  tableData,
  startEditing,
  deleteRow,
  renderCellValue,
  renderEditableCell,
  getPrimaryKeyMatch,
  saveRow,
  cancelEditing,
}) => {
  const isEditing = editingRow && tableData.findIndex(r => 
    Object.entries(getPrimaryKeyMatch(r)).every(
      ([key, value]) => editingRow[key] === value
    )
  ) === tableData.indexOf(row);

  return (
    <TableRow>
      {schema?.columns.map(column => (
        <TableCell key={column.name}>
          {isEditing ? (
            renderEditableCell(editingRow, column)
          ) : (
            renderCellValue(row[column.name], column)
          )}
        </TableCell>
      ))}
      <TableCell>
        {isEditing ? (
          <div className="flex space-x-2">
            <Button size="sm" onClick={saveRow} variant="default">
              Save
            </Button>
            <Button size="sm" onClick={cancelEditing} variant="outline">
              Cancel
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Button size="sm" onClick={() => startEditing(row)} variant="outline">
              Éditer
            </Button>
            <Button size="sm" onClick={() => deleteRow(row)} variant="destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default TableDataRow;
