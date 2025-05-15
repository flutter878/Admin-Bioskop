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

    const nama = formData.get('nama');
    if (nama !== null && nama.trim() !== '') updateData.nama = nama;

    const deskripsi = formData.get('deskripsi');
    if (deskripsi !== null && deskripsi.trim() !== '') updateData.deskripsi = deskripsi;

    const genre = formData.get('genre');
    if (genre !== null && genre.trim() !== '') updateData.genre = genre;

    const rating = formData.get('rating');
    if (rating !== null && rating !== '') updateData.rating = parseFloat(rating);

    const durasi = formData.get('durasi');
    if (durasi !== null && durasi !== '') updateData.durasi = parseInt(durasi);

    const poster = formData.get('poster');
    if (poster && typeof poster.name === 'string') {
      // Jika ada file poster dikirim
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
        console.error('Upload error:', uploadError);
        return NextResponse.json({ error: 'Gagal upload poster' }, { status: 500 });
      }

      const { data: urlData } = supabase
        .storage
        .from('poster')
        .getPublicUrl(filePath);

      updateData.poster = urlData.publicUrl;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ message: 'Tidak ada data yang diubah' }, { status: 400 });
    }

    const { error: updateError } = await supabase
      .from('film')
      .update(updateData)
      .eq('id', id);

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json({ error: 'Gagal update film' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Film berhasil diupdate!' });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
