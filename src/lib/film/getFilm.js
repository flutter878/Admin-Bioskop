import { supabase } from '../supabaseClient';

export const getFilm = async () => {
  const { data, error } = await supabase
    .from('tb_film')
    .select(`
      id,
      nama,
      deskripsi,
      rating,
      durasi,
      poster,
      tb_genre (
        genre 
      )
    `)
    .order('nama', { ascending: true });

  if (error) throw error;
  return data;
};
