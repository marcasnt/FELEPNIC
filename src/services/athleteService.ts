import { supabase, Athlete, CompetitionRecord } from '../lib/supabase';

export const athleteService = {
  // Crear un nuevo atleta
  async createAthlete(athlete: Omit<Athlete, 'id' | 'created_at' | 'updated_at'>): Promise<Athlete | null> {
    const { data, error } = await supabase
      .from('athletes')
      .insert([athlete])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Obtener todos los atletas activos
  async getAllAthletes(): Promise<Athlete[]> {
    const { data, error } = await supabase
      .from('athletes')
      .select('*')
      .eq('active', true)
      .order('last_name', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Obtener un atleta por ID
  async getAthleteById(id: string): Promise<Athlete | null> {
    const { data, error } = await supabase
      .from('athletes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Actualizar un atleta
  async updateAthlete(id: string, updates: Partial<Athlete>): Promise<Athlete | null> {
    const { data, error } = await supabase
      .from('athletes')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Desactivar un atleta (borrado lógico)
  async deactivateAthlete(id: string): Promise<void> {
    const { error } = await supabase
      .from('athletes')
      .update({ active: false, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
  },

  // Agregar un registro de competencia
  async addCompetitionRecord(record: Omit<CompetitionRecord, 'id' | 'created_at'>): Promise<CompetitionRecord | null> {
    const { data, error } = await supabase
      .from('competition_records')
      .insert([record])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Obtener registros de competencia de un atleta
  async getAthleteCompetitionRecords(athleteId: string): Promise<CompetitionRecord[]> {
    const { data, error } = await supabase
      .from('competition_records')
      .select('*')
      .eq('athlete_id', athleteId)
      .order('competition_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Buscar atletas por nombre o ID de federación
  async searchAthletes(query: string): Promise<Athlete[]> {
    const { data, error } = await supabase
      .from('athletes')
      .select('*')
      .eq('active', true)
      .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,federation_id.ilike.%${query}%`)
      .order('last_name', { ascending: true });

    if (error) throw error;
    return data || [];
  }
};
