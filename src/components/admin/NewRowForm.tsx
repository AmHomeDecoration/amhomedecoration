
import React from 'react';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { Save } from 'lucide-react';
import { TableData } from '@/types/admin';
import EditableCell from './EditableCell';

interface NewRowFormProps {
  newRow: TableData | null;
  tableSchema: any;
  saveRow: () => void;
  cancelEditing: () => void;
  handleInputChange: (name: string, value: any) => void;
}

const NewRowForm: React.FC<NewRowFormProps> = ({
  newRow,
  tableSchema,
  saveRow,
  cancelEditing,
  handleInputChange,
}) => {
  if (!newRow || !tableSchema) return null;

  return (
    <TableRow>
      {tableSchema.columns.map(column => (
        <TableCell key={column.name}>
          <EditableCell 
            column={column}
            value={newRow[column.name]}
            onChange={handleInputChange}
          />
        </TableCell>
      ))}
      <TableCell>
        <div className="flex space-x-2">
          <Button size="sm" onClick={saveRow} variant="default">
            <Save className="h-4 w-4 mr-1" />
            Sauvegarder
          </Button>
          <Button size="sm" onClick={cancelEditing} variant="outline">
            Annuler
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default NewRowForm;
