import { supabase } from '../supabaseClient';

export const editGenre = async (id, genreData) => {
    const { data, error } = await supabase
    .from('tb_genre')
    .update(genreData)
    .eq('id', id);

    if (error) throw error;
    return data;
};
