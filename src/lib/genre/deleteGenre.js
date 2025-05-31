import  { supabase } from '@/lib/supabaseClient'

export const deleteGenre = async (id) => {
    const { error } = await supabase.from('tb_genre').delete().eq('id', id);
    if (error) throw error;
};
