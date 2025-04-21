import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/user/user.module.css";
import Image from "next/image";
import Link from "next/link";

const Pemesanan = () => {
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
               <td>Nama Film</td> 
               <td>Nama Pemesan</td> 
               <td>Nama Bioskop</td> 
               <td>Harga</td> 
               <td>status</td> 
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
            <td>Mus</td>
            <td>XXI</td>
            <td>45.000</td>
            <td>Done</td>
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

export default Pemesanan