import  { supabase } from '@/lib/supabaseClient'

export const deleteUser = async (id) => {
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) throw error;
};
