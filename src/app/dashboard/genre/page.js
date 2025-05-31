'use client';
import { useEffect, useState } from 'react';
import { getGenre } from '@/lib/genre/getGenre';
import { deleteGenre } from '@/lib/genre/deleteGenre';
import Link from 'next/link';
import styles from '@/app/ui/dashboard/film/film.module.css';

const Genre = () => {
  const [tb_genre, setGenre] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getGenre();
      setGenre(data);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Yakin ingin menghapus genre ini?');
    if (!confirmDelete) return;
    await deleteGenre(id);
    setGenre(tb_genre.filter(f => f.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Daftar Genre</h2>
        <Link href="/dashboard/genre/tambah">
          <button className={`${styles.button} ${styles.addButton}`}>Tambah Baru</button>
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
  <tr>
    <th className={styles.th}>No</th>
    <th className={styles.th}>Nama</th>
    <th className={styles.th}>Aksi</th>
  </tr>
</thead>
<tbody>
  {tb_genre.length === 0 ? (
    <tr>
      <td colSpan="7" className={styles.noData}>Tidak ada data genre</td>
    </tr>
  ) : (
    tb_genre.map((g, index) => (
      <tr key={g.id}>
        <td className={styles.td}>{index + 1}</td>
        <td className={styles.td}>{g.genre}</td>
        <td className={`${styles.td} ${styles.actions}`}>
          <Link href={`/dashboard/genre/${g.id}`}>
            <button className={`${styles.button} ${styles.viewButton}`}>Edit</button>
          </Link>
          <button
            onClick={() => handleDelete(g.id)}
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

export default Genre;
