import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function getAllBioskop() {
  const { data, error } = await supabase.from('tb_bioskop').select('id, nama');
  if (error) {
    console.error('Error getAllBioskop:', error);
    return [];
  }
  return data;
}
