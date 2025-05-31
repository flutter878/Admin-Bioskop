import { supabase } from '../supabaseClient';

export const getUser = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw error;
  return data;
};
