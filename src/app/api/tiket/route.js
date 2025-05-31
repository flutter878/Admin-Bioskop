import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    console.log('SERVICE ROLE KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ LOADED' : '❌ MISSING');

    // Ambil FormData
    const formData = await req.formData();
    const id_film = parseInt(formData.get('id_film'));
    const id_bioskop = parseInt(formData.get('id_bioskop'));
    const harga = parseInt(formData.get('harga'));
    const jadwal = formData.get('jadwal'); // ✅ FIXED LINE
    const ket = formData.get('ket') || '';
    const now = new Date().toISOString(); // timestamp ISO

    // Debug form
    console.log('Raw FormData:', {
      id_film, id_bioskop, harga, jadwal, ket
    });

    // Validasi input
    if (isNaN(id_film) || isNaN(id_bioskop) || isNaN(harga) || !jadwal) {
      return NextResponse.json(
        { error: 'Data tidak valid. Pastikan semua isian diisi dengan benar.' },
        { status: 400 }
      );
    }

    // Insert ke database
    const { error: insertError } = await supabase
      .from('tb_tiket')
      .insert({
        id_film,
        id_bioskop,
        harga,
        jadwal,
        ket,
        tgl_buat: now,
        tgl_ubah: now
      });

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json({ error: 'Gagal menyimpan tiket' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Tiket berhasil ditambahkan!' });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
