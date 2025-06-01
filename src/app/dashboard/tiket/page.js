'use client';
import { useEffect, useState } from 'react';
import { getTiket } from '@/lib/tiket/getTiket';
import { deleteTiket } from '@/lib/tiket/deleteTiket';
import Link from 'next/link';
import styles from '@/app/ui/dashboard/film/film.module.css';

const Tiket = () => {
  const [tiket, setTiket] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getTiket();
      setTiket(data);
      setIsMounted(true); 
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Yakin ingin menghapus tiket ini?');
    if (!confirmDelete) return;
    await deleteTiket(id);
    setTiket((prev) => prev.filter((item) => item.id !== id));
  };

  if (!isMounted) return <p>Memuat data tiket...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Daftar Tiket</h2>
        <Link href="/dashboard/tiket/tambah">
          <button className={`${styles.button} ${styles.addButton}`}>Tambah Tiket</button>
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>No</th>
              <th className={styles.th}>Nama Film</th>
              <th className={styles.th}>Nama Bioskop</th>
              <th className={styles.th}>Harga</th>
              <th className={styles.th}>Jadwal</th>
              <th className={styles.th}>Keterangan</th>
              <th className={styles.th}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tiket.length === 0 ? (
              <tr>
                <td colSpan="7" className={styles.noData}>Tidak ada data tiket</td>
              </tr>
            ) : (
              tiket.map((t, index) => (
                <tr key={t.id}>
                  <td className={styles.td}>{index + 1}</td>
                  <td className={styles.td}>{t.tb_film?.nama || '-'}</td>
                  <td className={styles.td}>{t.tb_bioskop?.nama_bioskop || '-'}</td>
                  <td className={styles.td}>Rp {t.harga?.toLocaleString()}</td>
                  <td className={styles.td}>{t.jadwal}</td>
                  <td className={styles.td}>{t.ket || '-'}</td>
                  <td className={`${styles.td} ${styles.actions}`}>
                    <Link href={`/dashboard/tiket/${t.id}`}>
                      <button className={`${styles.button} ${styles.viewButton}`}>Edit</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(t.id)}
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

export default Tiket;
