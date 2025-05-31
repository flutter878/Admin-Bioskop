import { supabase } from '@/lib/supabaseClient';

export const addTiket = async ({ id_film, id_bioskop, harga, ket }) => {
    const { error } = await supabase.from('tb_tiket').insert({
    id_film,
    id_bioskop,
    harga,
    ket,
    tgl_buat: new Date().toISOString(),
    });

    if (error) throw error;
};
