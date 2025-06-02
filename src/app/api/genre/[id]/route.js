import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const formData = await req.formData();

    const updateData = {};
    const fields = ['genre']; 

    for (const field of fields) {
        const value = formData.get(field);
        if (value !== null && value.toString().trim() !== '') {
        updateData[field] = value.toString().trim();
        }
    }

    if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ message: 'Tidak ada data yang diubah' }, { status: 400 });
    }

    const { error: updateError } = await supabase
        .from('tb_genre') 
        .update(updateData)
        .eq('id', id);

    if (updateError) {
        return NextResponse.json({ error: 'Gagal update genre' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Genre berhasil diupdate!' });
    } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
