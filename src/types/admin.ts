
import { Database } from '@/integrations/supabase/types';

export type TableData = {
  [key: string]: any;
};

export type ProfileRow = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type TempTokenRow = Database['public']['Tables']['temporary_access_tokens']['Row'];
export type TempTokenInsert = Database['public']['Tables']['temporary_access_tokens']['Insert'];

export interface TableSchema {
  name: string;
  columns: {
    name: string;
    type: string;
    is_nullable: boolean;
    is_primary: boolean;
  }[];
}

export type ValidTableName = "profiles" | "temporary_access_tokens";

// Type guard pour vérifier si un nom de table est valide pour la requête Supabase
export const isValidTableName = (tableName: string): tableName is ValidTableName => {
  return tableName === "profiles" || tableName === "temporary_access_tokens";
};
