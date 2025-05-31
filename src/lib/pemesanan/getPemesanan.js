import { supabase } from '../supabaseClient';

export const getPemesanan = async () => {
    const { data, error } = await supabase.from('pemesanan').select('*').order('nama', { ascending: true });
    if (error) throw error;
    return data;
};