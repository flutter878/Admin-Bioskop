import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
    try {
    const formData = await req.formData();

    const nama = formData.get('nama');
    const deskripsi = formData.get('deskripsi');
    const genre = formData.get('genre');
    const rating = parseFloat(formData.get('rating'));
    const durasi = parseInt(formData.get('durasi'));
    const poster = formData.get('poster');

    let posterUrl = '';

    if (poster && typeof poster.name === 'string') {
        const ext = poster.name.split('.').pop();
        const fileName = `${Date.now()}.${ext}`;
        const filePath = `film/${fileName}`;

        const { data, error: uploadError } = await supabase
        .storage
        .from('poster') 
        .upload(filePath, poster, {
            contentType: poster.type,
        });

        if (uploadError) {
        console.error('Upload error:', uploadError);
        return NextResponse.json({ error: 'Gagal upload poster' }, { status: 500 });
        }

        const { data: urlData } = supabase
        .storage
        .from('poster')
        .getPublicUrl(filePath);

        posterUrl = urlData.publicUrl;
    }

    const { error: insertError } = await supabase
        .from('film')
        .insert({
        nama,
        deskripsi,
        genre,
        rating,
        durasi,
        poster: posterUrl,
        });

    if (insertError) {
        console.error('Insert error:', insertError);
        return NextResponse.json({ error: 'Gagal simpan film' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Film berhasil ditambahkan!' });

    } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
