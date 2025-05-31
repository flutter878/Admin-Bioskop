import { supabase } from '../supabaseClient';

export const getTiket = async () => {
    const { data, error } = await supabase.from('tickets').select('*').order('nama', { ascending: true });
    if (error) throw error;
    return data;
};