import { supabase } from '../supabaseClient';

export const editFilm = async (id, film, file) => {
  let posterUrl = film.poster;

  if (file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('tb_film-poster')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage.from('tb_film-poster').getPublicUrl(fileName);
    posterUrl = urlData.publicUrl;
  }

  const { data, error } = await supabase
    .from('tb_film')
    .update({ ...film, poster: posterUrl })
    .eq('id', id);

  if (error) throw error;
  return data;
};
