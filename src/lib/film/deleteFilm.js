import  { supabase } from '@/lib/supabaseClient'

export const deleteFilm = async (id) => {
    const { error } = await supabase.from('tb_film').delete().eq('id', id);
    if (error) throw error;
};
