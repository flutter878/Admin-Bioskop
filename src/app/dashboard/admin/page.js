import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/user/user.module.css";
import Image from "next/image";
import Link from "next/link";

const Admin = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a admin..." />
        <Link href="/dashboard/admin/tambah">
          <button className={styles.button}>Tambah Baru</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
            <tr>
              <td>Nama</td> 
              <td>Username</td>
              <td>Password</td> 
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><div className={styles.user}>
                <Image
                className={styles.userImage}
                src="/profile.png"
                alt=""
                width={40}
                height={40}/>                 
                Joker
                </div>
            </td>
            <td>admin@gmail.com</td>
            <td>admin</td>
            <td>
                <div className={styles.buttons}>
                <Link href="/">
                    <button className={`${styles.button} ${styles.lihat}`}>Lihat</button>
                </Link>
                    <button className={`${styles.button} ${styles.hapus}`}>Hapus</button>
                </div>
            </td>
            </tr>
        </tbody>
      </table>
      <Pagination/>
    </div>
  );
};

export default Admin;