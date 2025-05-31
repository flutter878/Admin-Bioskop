'use client';
import { useEffect, useState } from 'react';
import { getBioskop } from '@/lib/bioskop/getBioskop';
import { deleteBioskop } from '@/lib/bioskop/deleteBioskop';
import Link from 'next/link';
import styles from '@/app/ui/dashboard/film/film.module.css';

const Bioskop = () => {
  const [tb_bioskop, setBioskop] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getBioskop();
      setBioskop(data);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Yakin ingin menghapus bioskop ini?');
    if (!confirmDelete) return;
    await deleteBioskop(id);
    setBioskop(tb_bioskop.filter(f => f.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Daftar Bioskop</h2>
        <Link href="/dashboard/bioskop/tambah">
          <button className={`${styles.button} ${styles.addButton}`}>Tambah Baru</button>
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
  <tr>
    <th className={styles.th}>No</th>
    <th className={styles.th}>Logo</th>
    <th className={styles.th}>Nama</th>
    <th className={styles.th}>Alamat</th>
    <th className={styles.th}>Telepon</th>
    <th className={styles.th}>Aksi</th>
  </tr>
</thead>
<tbody>
  {tb_bioskop.length === 0 ? (
    <tr>
      <td colSpan="7" className={styles.noData}>Tidak ada data bioskop</td>
    </tr>
  ) : (
    tb_bioskop.map((f, index) => (
      <tr key={f.id}>
          <td className={styles.td}>{index + 1}</td>
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
        <td className={styles.td}>{f.alamat}</td>
        <td className={styles.td}>{f.tlp}</td>
        <td className={`${styles.td} ${styles.actions}`}>
          <Link href={`/dashboard/bioskop/${f.id}`}>
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

export default Bioskop;
