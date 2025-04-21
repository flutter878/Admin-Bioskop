import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/user/user.module.css";
import Image from "next/image";
import Link from "next/link";

const Bioskop = () => {
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
               <td>Nama Bioskop</td> 
               <td>Alamat</td> 
               <td>Telepon</td> 
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><div className={styles.user}>
                <Image
                className={styles.userImage}
                src="/logobioskop.png"
                alt=""
                width={40}
                height={40}/>                 
                XXI
                </div>
            </td>
            <td>MTos</td>
            <td>081828373263</td>
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

export default Bioskop