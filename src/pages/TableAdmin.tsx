
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader, RefreshCw, Save, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Database } from '@/integrations/supabase/types';

// Définir les types spécifiques pour chaque table
type ProfileRow = Database['public']['Tables']['profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
type TempTokenRow = Database['public']['Tables']['temporary_access_tokens']['Row'];
type TempTokenInsert = Database['public']['Tables']['temporary_access_tokens']['Insert'];

interface TableSchema {
  name: string;
  columns: {
    name: string;
    type: string;
    is_nullable: boolean;
    is_primary: boolean;
  }[];
}

interface TableData {
  [key: string]: any;
}

// Type guard pour vérifier si un nom de table est valide pour la requête Supabase
const isValidTableName = (tableName: string): tableName is "profiles" | "temporary_access_tokens" => {
  return tableName === "profiles" || tableName === "temporary_access_tokens";
};

const TableAdmin = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [tables, setTables] = useState<string[]>([]);
  const [currentTable, setCurrentTable] = useState<string>('');
  const [tableSchema, setTableSchema] = useState<TableSchema | null>(null);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRow, setEditingRow] = useState<TableData | null>(null);
  const [newRow, setNewRow] = useState<TableData | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    fetchTables();
  }, [isAuthenticated, navigate]);

  const fetchTables = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_user_tables');
      
      if (error) {
        console.error("Erreur lors de la récupération des tables:", error);
        
        const availableTables = ['profiles', 'temporary_access_tokens'];
        setTables(availableTables);
        
        if (availableTables.length > 0 && !currentTable) {
          setCurrentTable(availableTables[0]);
          await fetchTableData(availableTables[0]);
        } else if (currentTable) {
          await fetchTableData(currentTable);
        }
        setLoading(false);
        return;
      }
      
      if (data) {
        const tableNames = data
          .filter((item: any) => 
            item.table_name !== 'schema_migrations' && 
            item.table_name !== 'pg_stat_statements'
          )
          .map((item: any) => item.table_name);
        
        setTables(tableNames);
        
        if (tableNames.length > 0 && !currentTable) {
          setCurrentTable(tableNames[0]);
          await fetchTableData(tableNames[0]);
        } else if (currentTable) {
          await fetchTableData(currentTable);
        }
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: `Impossible de charger les tables: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTableSchema = async (tableName: string) => {
    try {
      const { data: columnsData, error: columnsError } = await supabase.rpc('get_table_columns', { 
        table_name: tableName 
      });
      
      if (columnsError) {
        console.error("Erreur lors de la récupération du schéma:", columnsError);
        
        const schemaMap: Record<string, TableSchema> = {
          profiles: {
            name: 'profiles',
            columns: [
              { name: 'id', type: 'uuid', is_nullable: false, is_primary: true },
              { name: 'created_at', type: 'timestamp with time zone', is_nullable: false, is_primary: false },
              { name: 'username', type: 'text', is_nullable: true, is_primary: false },
              { name: 'avatar_url', type: 'text', is_nullable: true, is_primary: false }
            ]
          },
          temporary_access_tokens: {
            name: 'temporary_access_tokens',
            columns: [
              { name: 'id', type: 'uuid', is_nullable: false, is_primary: true },
              { name: 'valid_until', type: 'timestamp with time zone', is_nullable: false, is_primary: false },
              { name: 'created_at', type: 'timestamp with time zone', is_nullable: false, is_primary: false },
              { name: 'token', type: 'text', is_nullable: false, is_primary: false },
              { name: 'created_by', type: 'uuid', is_nullable: true, is_primary: false },
              { name: 'used_at', type: 'timestamp with time zone', is_nullable: true, is_primary: false },
              { name: 'is_active', type: 'boolean', is_nullable: true, is_primary: false }
            ]
          }
        };
        
        const schema = schemaMap[tableName];
        if (schema) {
          setTableSchema(schema);
          return schema;
        }
        
        throw new Error(`Schema pour la table ${tableName} n'est pas disponible`);
      }
      
      const schema: TableSchema = {
        name: tableName,
        columns: columnsData.map((col: any) => ({
          name: col.column_name,
          type: col.data_type,
          is_nullable: col.is_nullable === 'YES',
          is_primary: col.is_primary === true,
        })),
      };
      
      setTableSchema(schema);
      return schema;
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: `Impossible de charger le schéma: ${error.message}`,
        variant: "destructive",
      });
      return null;
    }
  };

  const fetchTableData = async (tableName: string) => {
    setLoading(true);
    try {
      const schema = await fetchTableSchema(tableName);
      
      if (!schema) return;
      
      if (!isValidTableName(tableName)) {
        throw new Error(`La table ${tableName} n'est pas accessible via l'API Supabase`);
      }
      
      const { data, error } = await supabase
        .from(tableName)
        .select('*');
      
      if (error) throw error;
      
      setTableData(data || []);
      setCurrentTable(tableName);
      setEditingRow(null);
      setNewRow(null);
      setIsCreating(false);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: `Impossible de charger les données: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (tableName: string) => {
    fetchTableData(tableName);
  };

  const startEditing = (row: TableData) => {
    setEditingRow({ ...row });
    setIsCreating(false);
  };

  const cancelEditing = () => {
    setEditingRow(null);
    setIsCreating(false);
  };

  const startCreating = () => {
    if (!tableSchema) return;
    
    const emptyRow: TableData = {};
    tableSchema.columns.forEach(col => {
      if (col.is_primary && col.type.includes('uuid')) {
        return;
      }
      
      if (col.type.includes('int')) {
        emptyRow[col.name] = '0'; // Initialiser comme string
      } else if (col.type.includes('bool')) {
        emptyRow[col.name] = false;
      } else if (col.type.includes('json')) {
        emptyRow[col.name] = {};
      } else if (col.type.includes('array')) {
        emptyRow[col.name] = [];
      } else if (col.type.includes('timestamp')) {
        emptyRow[col.name] = null;
      } else {
        emptyRow[col.name] = '';
      }
      
      if (col.is_nullable) {
        emptyRow[col.name] = null;
      }
    });
    
    setNewRow(emptyRow);
    setEditingRow(null);
    setIsCreating(true);
  };

  const saveRow = async () => {
    if (!currentTable || (!editingRow && !newRow)) return;
    
    if (!isValidTableName(currentTable)) {
      toast({
        title: "Erreur",
        description: `La table ${currentTable} n'est pas accessible via l'API Supabase`,
        variant: "destructive",
      });
      return;
    }
    
    try {
      if (isCreating && newRow) {
        // Conversion explicite en fonction de la table
        if (currentTable === 'profiles') {
          const profileData: ProfileInsert = {
            id: newRow.id || undefined,
            username: newRow.username || null,
            avatar_url: newRow.avatar_url || null,
            created_at: newRow.created_at || undefined
          };
          
          const { data, error } = await supabase
            .from(currentTable)
            .insert([profileData])
            .select();
          
          if (error) throw error;
        } else if (currentTable === 'temporary_access_tokens') {
          const tokenData: TempTokenInsert = {
            id: newRow.id || undefined,
            token: newRow.token || '',
            valid_until: newRow.valid_until || '',
            created_at: newRow.created_at || undefined,
            created_by: newRow.created_by || null,
            used_at: newRow.used_at || null,
            is_active: newRow.is_active !== undefined ? newRow.is_active : true
          };
          
          const { data, error } = await supabase
            .from(currentTable)
            .insert([tokenData])
            .select();
          
          if (error) throw error;
        }
        
        toast({
          title: "Succès",
          description: "Ligne ajoutée avec succès.",
        });
      } else if (editingRow) {
        if (currentTable === 'profiles') {
          const profileData: Partial<ProfileRow> = {
            id: editingRow.id,
            username: editingRow.username || null,
            avatar_url: editingRow.avatar_url || null,
            created_at: editingRow.created_at
          };
          
          const { data, error } = await supabase
            .from(currentTable)
            .update(profileData)
            .match(getPrimaryKeyMatch(editingRow))
            .select();
          
          if (error) throw error;
        } else if (currentTable === 'temporary_access_tokens') {
          const tokenData: Partial<TempTokenRow> = {
            id: editingRow.id,
            token: editingRow.token,
            valid_until: editingRow.valid_until,
            created_at: editingRow.created_at,
            created_by: editingRow.created_by || null,
            used_at: editingRow.used_at || null,
            is_active: editingRow.is_active !== undefined ? editingRow.is_active : true
          };
          
          const { data, error } = await supabase
            .from(currentTable)
            .update(tokenData)
            .match(getPrimaryKeyMatch(editingRow))
            .select();
          
          if (error) throw error;
        }
        
        toast({
          title: "Succès",
          description: "Ligne mise à jour avec succès.",
        });
      }
      
      await fetchTableData(currentTable);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: `Erreur lors de la sauvegarde: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const deleteRow = async (row: TableData) => {
    if (!currentTable) return;
    
    if (!isValidTableName(currentTable)) {
      toast({
        title: "Erreur",
        description: `La table ${currentTable} n'est pas accessible via l'API Supabase`,
        variant: "destructive",
      });
      return;
    }
    
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette ligne ?")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from(currentTable)
        .delete()
        .match(getPrimaryKeyMatch(row));
      
      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Ligne supprimée avec succès.",
      });
      
      await fetchTableData(currentTable);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: `Erreur lors de la suppression: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const getPrimaryKeyMatch = (row: TableData) => {
    if (!tableSchema) return {};
    
    const primaryKeyColumns = tableSchema.columns
      .filter(col => col.is_primary)
      .map(col => col.name);
    
    const match: TableData = {};
    primaryKeyColumns.forEach(col => {
      match[col] = row[col];
    });
    
    return match;
  };

  const handleInputChange = (name: string, value: any) => {
    if (isCreating && newRow) {
      setNewRow({
        ...newRow,
        [name]: value
      });
    } else if (editingRow) {
      setEditingRow({
        ...editingRow,
        [name]: value
      });
    }
  };

  const renderCellValue = (value: any, column: any) => {
    if (value === null) return <span className="text-gray-400">NULL</span>;
    
    if (typeof value === 'object') {
      try {
        return <span className="font-mono text-xs">{JSON.stringify(value)}</span>;
      } catch {
        return <span className="text-gray-400">[Objet]</span>;
      }
    }
    
    if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    }
    
    if (column.type.includes('timestamp') && value) {
      try {
        return new Date(value).toLocaleString();
      } catch {
        return value;
      }
    }
    
    return String(value);
  };

  const renderEditableCell = (row: TableData, column: any) => {
    const value = row[column.name];
    
    if (column.type.includes('bool')) {
      return (
        <select
          value={value === null ? 'null' : value.toString()}
          onChange={(e) => {
            let val;
            if (e.target.value === 'null') val = null;
            else if (e.target.value === 'true') val = true;
            else val = false;
            handleInputChange(column.name, val);
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
              handleInputChange(column.name, val);
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
          onChange={(e) => handleInputChange(column.name, e.target.value ? new Date(e.target.value).toISOString() : null)}
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
          
          handleInputChange(column.name, val);
        }}
        disabled={column.is_primary}
        className="w-full"
      />
    );
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Administration des Tables</CardTitle>
            <CardDescription>
              Gérez les données de votre base de données
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && tables.length === 0 ? (
              <div className="flex justify-center py-10">
                <Loader className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <Tabs value={currentTable} onValueChange={handleTableChange}>
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
                
                {tables.map(table => (
                  <TabsContent key={table} value={table} className="space-y-4">
                    <div className="flex justify-between mb-4">
                      <h3 className="text-lg font-medium">Table: {table}</h3>
                      <Button onClick={startCreating}>
                        <Plus className="h-4 w-4 mr-2" />
                        Nouvelle ligne
                      </Button>
                    </div>
                    
                    {loading ? (
                      <div className="flex justify-center py-10">
                        <Loader className="h-8 w-8 animate-spin text-gray-400" />
                      </div>
                    ) : (
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
                              <TableRow>
                                {tableSchema?.columns.map(column => (
                                  <TableCell key={column.name}>
                                    {renderEditableCell(newRow, column)}
                                  </TableCell>
                                ))}
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button 
                                      size="sm" 
                                      onClick={saveRow} 
                                      variant="default"
                                    >
                                      <Save className="h-4 w-4 mr-1" />
                                      Sauvegarder
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      onClick={cancelEditing} 
                                      variant="outline"
                                    >
                                      Annuler
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )}
                            
                            {tableData.map((row, index) => (
                              <TableRow key={index}>
                                {tableSchema?.columns.map(column => (
                                  <TableCell key={column.name}>
                                    {editingRow && row === tableData[tableData.findIndex(r => 
                                      Object.entries(getPrimaryKeyMatch(r)).every(
                                        ([key, value]) => editingRow[key] === value
                                      )
                                    )] ? (
                                      renderEditableCell(editingRow, column)
                                    ) : (
                                      renderCellValue(row[column.name], column)
                                    )}
                                  </TableCell>
                                ))}
                                <TableCell>
                                  {editingRow && row === tableData[tableData.findIndex(r => 
                                    Object.entries(getPrimaryKeyMatch(r)).every(
                                      ([key, value]) => editingRow[key] === value
                                    )
                                  )] ? (
                                    <div className="flex space-x-2">
                                      <Button 
                                        size="sm" 
                                        onClick={saveRow} 
                                        variant="default"
                                      >
                                        <Save className="h-4 w-4 mr-1" />
                                        Sauvegarder
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        onClick={cancelEditing} 
                                        variant="outline"
                                      >
                                        Annuler
                                      </Button>
                                    </div>
                                  ) : (
                                    <div className="flex space-x-2">
                                      <Button 
                                        size="sm" 
                                        onClick={() => startEditing(row)} 
                                        variant="outline"
                                      >
                                        Éditer
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        onClick={() => deleteRow(row)} 
                                        variant="destructive"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TableAdmin;
