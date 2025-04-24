import styles from '@/app/ui/dashboard/tambah/tambah.module.css'
const Tambah = () => {
    return (
        <div className={styles.container}>
            <form action="" className={styles.form}>
                <input type="text" placeholder='nama' name='nama' required />
                    <input type="text" placeholder='alamat' name='alamat'/>
                    <input type="text" placeholder='telepon' name='telepon'/>
                    <select>
                        <option nama="Laki-laki">Laki-laki</option>
                        <option nama="Perempuan">Perempuan</option>
                    </select>
                    <button type="submit">Tambah</button>
            </form>
        </div>
    )
    
}
export default Tambah