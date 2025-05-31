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
    const fields = ['nama', 'deskripsi', 'genre', 'rating', 'durasi'];

    for (const field of fields) {
      const value = formData.get(field);
      if (value !== null && value.toString().trim() !== '') {
        updateData[field] = ['rating', 'durasi'].includes(field)
          ? Number(value)
          : value.toString().trim();
      }
    }

    const poster = formData.get('poster');
    if (poster && typeof poster.name === 'string') {
      const ext = poster.name.split('.').pop();
      const fileName = `${Date.now()}.${ext}`;
      const filePath = `film/${fileName}`;

      const { error: uploadError } = await supabase
        .storage
        .from('poster')
        .upload(filePath, poster, {
          contentType: poster.type,
          upsert: true,
        });

      if (uploadError) {
        return NextResponse.json({ error: 'Gagal upload poster' }, { status: 500 });
      }

      const { data: urlData } = supabase.storage
        .from('poster')
        .getPublicUrl(filePath);

      updateData.poster = urlData.publicUrl;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ message: 'Tidak ada data yang diubah' }, { status: 400 });
    }

    const { error: updateError } = await supabase
      .from('tb_film')
      .update(updateData)
      .eq('id', id);

    if (updateError) {
      return NextResponse.json({ error: 'Gagal update film' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Film berhasil diupdate!' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
