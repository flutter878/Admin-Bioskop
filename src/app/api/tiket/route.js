import { NextResponse } from 'next/server';

// Simulasi data (ganti dengan koneksi database Anda)
let tikets = [
  {
    id: 1,
    id_film: 1,
    id_bioskop: 1,
    harga: 50000,
    jadwal: '2024-12-25T19:00:00',
    ket: 'Tiket reguler',
    film_nama: 'Avengers',
    bioskop_nama: 'CGV Grand Indonesia'
  }
];

// GET - Ambil semua tiket
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTikets = tikets.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedTikets,
      pagination: {
        page,
        limit,
        total: tikets.length,
        totalPages: Math.ceil(tikets.length / limit)
      }
    });

  } catch (error) {
    console.error('GET /api/tiket error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data tiket' },
      { status: 500 }
    );
  }
}

// POST - Tambah tiket baru
export async function POST(request) {
  try {
    const body = await request.json();
    const { id_film, id_bioskop, harga, jadwal, ket } = body;

    // Validasi input
    if (!id_film || !id_bioskop || !harga || !jadwal) {
      return NextResponse.json(
        { error: 'Field id_film, id_bioskop, harga, dan jadwal wajib diisi' },
        { status: 400 }
      );
    }

    // Validasi harga
    const hargaNumber = parseInt(harga);
    if (isNaN(hargaNumber) || hargaNumber <= 0) {
      return NextResponse.json(
        { error: 'Harga harus berupa angka positif' },
        { status: 400 }
      );
    }

    // Validasi jadwal
    const jadwalDate = new Date(jadwal);
    const now = new Date();
    if (jadwalDate <= now) {
      return NextResponse.json(
        { error: 'Jadwal harus di masa depan' },
        { status: 400 }
      );
    }

    // Cek duplikasi jadwal di bioskop yang sama
    const existingSchedule = tikets.find(
      t => t.id_bioskop === parseInt(id_bioskop) && 
           new Date(t.jadwal).getTime() === jadwalDate.getTime()
    );

    if (existingSchedule) {
      return NextResponse.json(
        { error: 'Jadwal sudah ada di bioskop ini' },
        { status: 409 }
      );
    }

    // Buat ID baru
    const newId = tikets.length > 0 ? Math.max(...tikets.map(t => t.id)) + 1 : 1;

    // Simulasi data film dan bioskop (ganti dengan query database asli)
    const filmNames = {
      1: 'Avengers: Endgame',
      2: 'Spider-Man',
      3: 'Batman'
    };
    
    const bioskopNames = {
      1: 'CGV Grand Indonesia',
      2: 'Cineplex Plaza Senayan',
      3: 'XXI Mall Taman Anggrek'
    };

    // Buat tiket baru
    const newTiket = {
      id: newId,
      id_film: parseInt(id_film),
      id_bioskop: parseInt(id_bioskop),
      harga: hargaNumber,
      jadwal: jadwal,
      ket: ket || null,
      film_nama: filmNames[id_film] || 'Unknown Film',
      bioskop_nama: bioskopNames[id_bioskop] || 'Unknown Cinema',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Tambahkan ke array (dalam aplikasi nyata, simpan ke database)
    tikets.push(newTiket);

    return NextResponse.json({
      message: 'Tiket berhasil ditambahkan',
      data: newTiket
    }, { status: 201 });

  } catch (error) {
    console.error('POST /api/tiket error:', error);
    return NextResponse.json(
      { error: 'Gagal menambahkan tiket' },
      { status: 500 }
    );
  }
}

// PUT - Update tiket
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, id_film, id_bioskop, harga, jadwal, ket } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID tiket diperlukan' },
        { status: 400 }
      );
    }

    // Cari tiket
    const tiketIndex = tikets.findIndex(t => t.id === parseInt(id));
    if (tiketIndex === -1) {
      return NextResponse.json(
        { error: 'Tiket tidak ditemukan' },
        { status: 404 }
      );
    }

    // Update data
    const updatedTiket = { ...tikets[tiketIndex] };
    
    if (id_film) updatedTiket.id_film = parseInt(id_film);
    if (id_bioskop) updatedTiket.id_bioskop = parseInt(id_bioskop);
    if (harga) {
      const hargaNumber = parseInt(harga);
      if (isNaN(hargaNumber) || hargaNumber <= 0) {
        return NextResponse.json(
          { error: 'Harga harus berupa angka positif' },
          { status: 400 }
        );
      }
      updatedTiket.harga = hargaNumber;
    }
    if (jadwal) {
      const jadwalDate = new Date(jadwal);
      const now = new Date();
      if (jadwalDate <= now) {
        return NextResponse.json(
          { error: 'Jadwal harus di masa depan' },
          { status: 400 }
        );
      }
      updatedTiket.jadwal = jadwal;
    }
    if (ket !== undefined) updatedTiket.ket = ket || null;
    
    updatedTiket.updated_at = new Date().toISOString();

    // Update di array
    tikets[tiketIndex] = updatedTiket;

    return NextResponse.json({
      message: 'Tiket berhasil diupdate',
      data: updatedTiket
    });

  } catch (error) {
    console.error('PUT /api/tiket error:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate tiket' },
      { status: 500 }
    );
  }
}

// DELETE - Hapus tiket
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID tiket diperlukan' },
        { status: 400 }
      );
    }

    // Cari tiket
    const tiketIndex = tikets.findIndex(t => t.id === parseInt(id));
    if (tiketIndex === -1) {
      return NextResponse.json(
        { error: 'Tiket tidak ditemukan' },
        { status: 404 }
      );
    }

    // Hapus dari array
    tikets.splice(tiketIndex, 1);

    return NextResponse.json({
      message: 'Tiket berhasil dihapus'
    });

  } catch (error) {
    console.error('DELETE /api/tiket error:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus tiket' },
      { status: 500 }
    );
  }
}