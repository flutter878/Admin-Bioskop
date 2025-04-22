import styles from '@/app/ui/dashboard/tambah/tambah.module.css'
const Tambah = () => {
    return (
        <div className={styles.container}>
            <form action="" className={styles.form}>
                <input type="text" placeholder='nama film' name='nama' required />
                  
                    <input type="text" placeholder='genre' name='price'/>
                    <input type="text" placeholder='rating' name='stock'/>
                    <input type="number" placeholder='durasi' name='time'/>
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