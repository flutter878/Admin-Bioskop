import  { supabase } from '@/lib/supabaseClient'

export const deleteBioskop = async (id) => {
    const { error } = await supabase.from('tb_bioskop').delete().eq('id', id);
    if (error) throw error;
};
