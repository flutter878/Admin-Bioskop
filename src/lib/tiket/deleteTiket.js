import { supabase } from '@/lib/supabaseClient';

export const deleteTiket = async (id) => {
    const { error } = await supabase
    .from('tb_tiket')
    .delete()
    .eq('id', id);

    if (error) throw error;
};
