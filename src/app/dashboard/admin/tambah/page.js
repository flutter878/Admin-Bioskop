import styles from '@/app/ui/dashboard/tambah/tambah.module.css'
const Tambah = () => {
    return (
        <div className={styles.container}>
            <form action="" className={styles.form}>
                <input type="text" placeholder='nama' name='nama' required />
                    <input type="text" placeholder='username' name='username'/>
                    <input type="text" placeholder='password' name='password'/>
                    <button type="submit">Tambah</button>
            </form>
        </div>
    )
    
}
export default Tambah