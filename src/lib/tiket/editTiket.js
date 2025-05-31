import { supabase } from '@/lib/supabaseClient';

export const updateTiket = async (id, { id_film, id_bioskop, harga, ket }) => {
    const { error } = await supabase
    .from('tb_tiket')
    .update({
        id_film,
        id_bioskop,
        harga,
        ket,
        tgl_ubah: new Date().toISOString(),
    })
    .eq('id', id);

    if (error) throw error;
};
