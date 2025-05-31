import { supabase } from '../supabaseClient';

export const getGenre = async () => {
    const { data, error } = await supabase
    .from('tb_genre')
    .select(`
        id,
        genre
    `)
    .order('id', { ascending: true });

    if (error) throw error;
    return data;
};
