import  { supabase } from '@/lib/supabaseClient'

export const deleteFilm = async (id) => {
    const { error } = await supabase.from('tbbioskop').delete().eq('id', id);
    if (error) throw error;
};
