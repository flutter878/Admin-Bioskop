import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/user/user.module.css";
import Image from "next/image";
import Link from "next/link";

const Film = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/user/add">
          <button className={styles.button}>Tambah Baru</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
            <tr>
               <td>Nama</td> 
               <td>Genre</td> 
               <td>Rating</td> 
               <td>Durasi</td> 
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><div className={styles.user}>
                <Image
                className={styles.userImage}
                src="/joker.jpg"
                alt=""
                width={40}
                height={40}/>                 
                Joker
                </div>
            </td>
            <td>Cerite seru</td>
            <td>8.5</td>
            <td>2.2 Jam</td>
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

export default Film;