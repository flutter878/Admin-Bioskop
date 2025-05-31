import { supabase } from '@/lib/supabaseClient';

export const getTiket = async () => {
    const { data, error } = await supabase
    .from('tb_tiket')
    .select(`
      *,
        tb_film ( nama ),
        tb_bioskop ( nama_bioskop )
    `)
    .order('id', { ascending: true });

    if (error) throw error;
    return data;
};
