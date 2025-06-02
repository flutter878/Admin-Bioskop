'use client';
import { useEffect, useState } from 'react';
import { getPemesanan} from '@/lib/pemesanan/getPemesanan';
import { deleteFilm } from '@/lib/film/deleteFilm';
import Link from 'next/link';
import styles from '@/app/ui/dashboard/film/film.module.css';

const Pemesanan = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getFilm();
      setFilms(data);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Yakin ingin menghapus film ini?');
    if (!confirmDelete) return;
    await deleteFilm(id);
    setFilms(films.filter(f => f.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Daftar Film</h2>
        <Link href="/dashboard/film/tambah">
          <button className={`${styles.button} ${styles.addButton}`}>Tambah Baru</button>
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
  <tr>
    <th className={styles.th}>Nama Film</th>
    <th className={styles.th}>Nama Pemesan</th>
    <th className={styles.th}>Nama Bioskop</th>
    <th className={styles.th}>No Kursi</th>
    <th className={styles.th}>Jadwal</th>
    <th className={styles.th}>Harga</th>
    <th className={styles.th}>Status</th>
    <th className={styles.th}>Aksi</th>
  </tr>
</thead>
<tbody>
  {films.length === 0 ? (
    <tr>
      <td colSpan="7" className={styles.noData}>Tidak ada data Pemesanan</td>
    </tr>
  ) : (
    films.map((f) => (
      <tr key={f.id}>
        <td className={styles.td}>
          {f.poster ? (
            <img
              src={f.poster}
              alt="Poster"
              className={styles.posterImg}
              style={{ width: '100px', height: 'auto' }}
            />
          ) : (
            'Tidak ada'
          )}
        </td>
        <td className={styles.td}>{f.nama}</td>
        <td className={styles.td}>{f.deskripsi.split(" ").slice(0, 5).join(" ") + "..."}</td>
        <td className={styles.td}>{f.genre}</td>
        <td className={styles.td}>{f.rating}</td>
        <td className={styles.td}>{f.durasi}</td>
        <td className={`${styles.td} ${styles.actions}`}>
          <Link href={`/dashboard/film/${f.id}`}>
            <button className={`${styles.button} ${styles.viewButton}`}>Edit</button>
          </Link>
          <button
            onClick={() => handleDelete(f.id)}
            className={`${styles.button} ${styles.deleteButton}`}
          >
            Hapus
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>
        </table>
      </div>
    </div>
  );
};

export default Pemesanan;
