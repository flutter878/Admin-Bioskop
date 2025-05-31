import { supabase } from '../supabaseClient';

export const addBioskop = async (tb_bioskop, file) => {
    let posterUrl = '';

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

    const { data, error } = await supabase.from('tb_bioskop').insert([{ ...tb_bioskop, poster: posterUrl }]);
    if (error) throw error;
    return data;
};