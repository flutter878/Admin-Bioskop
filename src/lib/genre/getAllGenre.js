import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function getAllGenre() {
  const { data, error } = await supabase.from('tb_genre').select('id, genre');
  if (error) {
    console.error('Error getAllGenre:', error);
    return [];
  }
  return data;
}
