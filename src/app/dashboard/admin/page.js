// pages/dashboard/admin/page.jsx (atau app/dashboard/admin/page.jsx jika kamu menggunakan App Router)
import { fetchAuthUsers } from '@/lib/data'
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/user/user.module.css";
import Link from "next/link";

const AdminPage = async () => {
  const admins = await fetchAuthUsers();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Cari admin..." />
        <Link href="/dashboard/admin/tambah">
          <button className={styles.button}>Tambah Admin</button>
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <td>Nama</td>
            <td>Email</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.nama}</td>
              <td>{admin.email}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/admin/${admin.id}`}>
                    <button className={`${styles.button} ${styles.lihat}`}>Lihat</button>
                  </Link>
                  <button className={`${styles.button} ${styles.hapus}`}>Hapus</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination />
    </div>
  );
};

export default AdminPage;
