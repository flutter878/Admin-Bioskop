'use client';
import { useEffect, useState } from 'react';
import { getUser } from '@/lib/users/getUser';
import { deleteUser } from '@/lib/users/deleteUser';
import styles from '@/app/ui/dashboard/film/film.module.css';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getUser();
      setUsers(data);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm('Yakin ingin menghapus user ini?');
  if (!confirmDelete) return;
  await deleteUser(id);
  setUsers(users.filter(f => f.id !== id));
};

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Daftar User</h2>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
  <tr>
    <th className={styles.th}>Nama</th>
    <th className={styles.th}>Alamat</th>
    <th className={styles.th}>No Telepon</th>
    <th className={styles.th}>Gender</th>
    <th className={styles.th}>Email</th>
    <th className={styles.th}>Aksi</th>
  </tr>
</thead>
<tbody>
  {users.length === 0 ? (
    <tr>
      <td colSpan="7" className={styles.noData}>Tidak ada data user</td>
    </tr>
  ) : (
users.map((user) => (
  <tr key={user.id}>
    <td className={styles.td}>{user.name}</td>
    <td className={styles.td}>{user.alamat}</td>
    <td className={styles.td}>{user.notlp}</td>
    <td className={styles.td}>{user.jkl}</td>
    <td className={styles.td}>{user.email}</td>
    <td className={`${styles.td} ${styles.actions}`}>
      <button
        onClick={() => handleDelete(user.id)}
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

export default User;
