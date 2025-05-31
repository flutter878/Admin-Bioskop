import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function getAllFilm() {
  const { data, error } = await supabase.from('tb_film').select('id, nama');
  if (error) {
    console.error('Error getAllFilm:', error);
    return [];
  }
  return data;
}
