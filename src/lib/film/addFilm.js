import { supabase } from '../supabaseClient';

export const addFilm = async (film, file) => {
    let posterUrl = '';

    if (file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('film-poster')
        .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage.from('film-poster').getPublicUrl(fileName);
    posterUrl = urlData.publicUrl;
    }

    const { data, error } = await supabase.from('film').insert([{ ...film, poster: posterUrl }]);
    if (error) throw error;
    return data;
};
