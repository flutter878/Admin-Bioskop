import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET() {
  const { data, error } = await supabase.from('tb_genre').select('*');
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const genre = formData.get('genre')?.trim();

    if (!genre) {
      return NextResponse.json({ error: 'Genre tidak boleh kosong' }, { status: 400 });
    }

    const { data: existing, error: selectError } = await supabase
      .from('tb_genre')
      .select('id')
      .eq('genre', genre)
      .maybeSingle();

    if (selectError) {
      console.error('Select error:', selectError);
      return NextResponse.json({ error: 'Gagal memeriksa genre' }, { status: 500 });
    }

    if (existing) {
      return NextResponse.json({ error: 'Genre sudah ada' }, { status: 400 });
    }

    const { error: insertError } = await supabase
      .from('tb_genre')
      .insert({ genre });

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json({ error: 'Gagal simpan genre' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Genre berhasil ditambahkan!' });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
