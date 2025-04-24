import styles from '@/app/ui/dashboard/tambah/tambah.module.css'
const Tambah = () => {
    return (
        <div className={styles.container}>
            <form action="" className={styles.form}>
                <input type="text" placeholder='nama bioskop' name='nama bioskop' required />
                    <input type="text" placeholder='alamat' name='alamat'/>
                    <input type="text" placeholder='telepon' name='telepon'/>
                    <textarea
                    name="desc"
                    id="desc"
                    rows="10"
                    placeholder="Deskripsi"></textarea>
                    <button type="submit">Tambah</button>
            </form>
        </div>
    )
    
}
export default Tambah