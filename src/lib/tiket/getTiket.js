import { supabase } from '@/lib/supabaseClient';

export const getTiket = async () => {
  try {
    const { data, error } = await supabase
      .from('tb_tiket')
      .select(`
        id,
        harga,
        ket,
        jadwal,
        tgl_buat,
        tgl_ubah,
        tb_film (
          nama
        ),
        tb_bioskop (
          nama_bioskop
        )
      `)
      .order('id', { ascending: true });

    if (error) throw error;

    console.log('Data tiket:', data); // debug
    return data;
  } catch (err) {
    console.error('Gagal mengambil data tiket:', err.message);
    return [];
  }
};
