import { supabase } from '../supabaseClient';

export const getBioskop = async () => {
    const { data, error } = await supabase.from('tb_bioskop').select('*').order('nama', { ascending: true });
    if (error) throw error;
    return data;
};