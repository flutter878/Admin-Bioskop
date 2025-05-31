import { supabase } from '../supabaseClient';

export const editBioskop = async (id, tb_bioskop, file) => {
  let posterUrl = tb_bioskop.poster;

  if (file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('tb_bioskop-poster')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage.from('tb_bioskop-poster').getPublicUrl(fileName);
    posterUrl = urlData.publicUrl;
  }

  const { data, error } = await supabase
    .from('tb_bioskop')
    .update({ ...film, poster: posterUrl })
    .eq('id', id);

    if (error) throw error;
    return data;
};
