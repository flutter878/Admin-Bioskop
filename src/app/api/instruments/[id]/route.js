import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
    const { data, error } = await supabase.from('instruments').select('*').eq('id', id).single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
    }

    if (req.method === 'PUT') {
    const { name, price } = req.body;
    const { data, error } = await supabase
        .from('instruments')
        .update({ name, price })
        .eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
    const { error } = await supabase.from('instruments').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(204).end();
    }

    res.status(405).json({ message: 'Method not allowed' });
}
