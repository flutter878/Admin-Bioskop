import styles from '@/app/ui/dashboard/tambah/tambah.module.css'
const Tambah = () => {
    return (
        <div className={styles.container}>
            <form action="" className={styles.form}>
                <input type="text" placeholder='nama film' name='nama film' required />
                    <input type="text" placeholder='rating' name='rating'/>
                    <input type="number" placeholder='durasi' name='durasi'/>
                    <button type="submit">Tambah</button>
            </form>
        </div>
    )
    
}
export default Tambah