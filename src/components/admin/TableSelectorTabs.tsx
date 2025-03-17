
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface TableSelectorTabsProps {
  tables: string[];
  loading: boolean;
  fetchTables: () => void;
}

const TableSelectorTabs: React.FC<TableSelectorTabsProps> = ({ 
  tables, 
  loading, 
  fetchTables 
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <TabsList className="overflow-x-auto">
        {tables.map(table => (
          <TabsTrigger key={table} value={table}>
            {table}
          </TabsTrigger>
        ))}
      </TabsList>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={fetchTables}
        disabled={loading}
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
        Actualiser
      </Button>
    </div>
  );
};

export default TableSelectorTabs;
