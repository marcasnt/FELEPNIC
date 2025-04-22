import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Tipos para TypeScript
export interface Athlete {
  id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: 'M' | 'F';
  weight_category: string;
  federation_id?: string;
  document_id?: string;
  phone?: string;
  email: string; // Email es requerido para autenticación
  auth_user_id?: string; // ID del usuario en la tabla auth.users
  address?: string;
  club?: string;
  coach?: string;
  created_at?: string;
  updated_at?: string;
  active: boolean;
  photo_url?: string; // URL pública de la foto de perfil
}

export interface CompetitionRecord {
  id: string;
  athlete_id: string;
  competition_name: string;
  competition_date: string;
  weight_category: string;
  snatch?: number;
  clean_and_jerk?: number;
  total?: number;
  place?: number;
  created_at?: string;
}
