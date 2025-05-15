import { supabase } from '../supabaseClient';

export const getFilm = async () => {
  const { data, error } = await supabase.from('film').select('*').order('nama', { ascending: true });
  if (error) throw error;
  return data;
};