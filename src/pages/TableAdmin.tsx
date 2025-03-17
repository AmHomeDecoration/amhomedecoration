
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
      const { data, error } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public');
      
      if (error) throw error;
      
      if (data) {
        const tableNames = data.map(t => t.table_name).filter(name => 
          name !== 'schema_migrations' && 
          name !== 'pg_stat_statements'
        );
        
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
      // Récupérer les informations sur les colonnes
      const { data: columnsData, error: columnsError } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type, is_nullable')
        .eq('table_schema', 'public')
        .eq('table_name', tableName);
      
      if (columnsError) throw columnsError;
      
      // Récupérer les informations sur les clés primaires
      const { data: pkData, error: pkError } = await supabase
        .from('information_schema.key_column_usage')
        .select('column_name')
        .eq('table_schema', 'public')
        .eq('table_name', tableName)
        .eq('constraint_name', `${tableName}_pkey`);
      
      if (pkError) throw pkError;
      
      const primaryKeys = new Set(pkData?.map(pk => pk.column_name) || []);
      
      const schema: TableSchema = {
        name: tableName,
        columns: columnsData?.map(col => ({
          name: col.column_name,
          type: col.data_type,
          is_nullable: col.is_nullable === 'YES',
          is_primary: primaryKeys.has(col.column_name),
        })) || [],
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
      // Pour les clés primaires de type UUID, ne pas initialiser (Supabase le fera)
      if (col.is_primary && col.type.includes('uuid')) {
        return;
      }
      
      // Initialiser les autres champs avec des valeurs par défaut appropriées
      if (col.type.includes('int')) {
        emptyRow[col.name] = 0;
      } else if (col.type.includes('bool')) {
        emptyRow[col.name] = false;
      } else if (col.type.includes('json')) {
        emptyRow[col.name] = {};
      } else if (col.type.includes('array')) {
        emptyRow[col.name] = [];
      } else if (col.type.includes('timestamp')) {
        // Laisser null pour que Supabase utilise le défaut si défini
        emptyRow[col.name] = null;
      } else {
        emptyRow[col.name] = '';
      }
      
      // Si le champ est nullable, initialiser à null
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
    
    try {
      if (isCreating && newRow) {
        // Création d'une nouvelle ligne
        const { data, error } = await supabase
          .from(currentTable)
          .insert([newRow])
          .select();
        
        if (error) throw error;
        
        toast({
          title: "Succès",
          description: "Ligne ajoutée avec succès.",
        });
      } else if (editingRow) {
        // Édition d'une ligne existante
        const { data, error } = await supabase
          .from(currentTable)
          .update(editingRow)
          .match(getPrimaryKeyMatch(editingRow))
          .select();
        
        if (error) throw error;
        
        toast({
          title: "Succès",
          description: "Ligne mise à jour avec succès.",
        });
      }
      
      // Rechargement des données
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
      
      // Rechargement des données
      await fetchTableData(currentTable);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: `Erreur lors de la suppression: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  // Obtenir la condition de correspondance basée sur la clé primaire
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
    // Affichage des valeurs spéciales
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
    
    // Date formatée
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
    
    // Désactiver l'édition de la clé primaire
    const isDisabled = column.is_primary;
    
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
          disabled={isDisabled}
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
          disabled={isDisabled}
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
          disabled={isDisabled}
          className="w-full p-1 border rounded"
        />
      );
    }
    
    // Input standard pour les autres types
    return (
      <Input
        type={column.type.includes('int') ? 'number' : 'text'}
        value={value === null ? '' : value}
        onChange={(e) => {
          let val = e.target.value;
          
          // Convertir en nombre si c'est un champ numérique
          if (column.type.includes('int') && val !== '') {
            val = parseInt(val, 10);
          }
          
          // Null si vide et nullable
          if (val === '' && column.is_nullable) {
            val = null;
          }
          
          handleInputChange(column.name, val);
        }}
        disabled={isDisabled}
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
                            {/* Ligne pour créer une nouvelle entrée */}
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
                            
                            {/* Afficher les lignes de données */}
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
