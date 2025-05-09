import styles from '@/app/ui/dashboard/user/singleUserpage.module.css'
import Image from 'next/image'
const SingleUserPage = () => {
    return(
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src="/profile.png" alt="" fill />
                </div>
                Mus
            </div>
            <div className={styles.formContainer}>
            <form action="" className={styles.form}>
                <label>Username</label>
                <input type="text" name="username" placeholder="mus" />
                <label>Email</label>
                <input type="email" name="email" placeholder="mus@gmail.com" />
                <label>Password</label>
                <input type="password" name="password" />
                <label>Telepon</label>
                <input type="text" name="phone" placeholder="02932482" />
                <label>Alamat</label>
                <textarea type="text" name="alamat" placeholder="Bantaeng" />
                <label>Is Admin</label>
                <select name="isAdmin" id="isAdmin">
                    <option value={true}>Yes</option>
                    <option value={true}>No</option>
                </select>
                <label>Is Active</label>
                <select name='isActive' id="isActive">
                    <option value={true}>Yes</option>
                    <option value={true}>No</option>
                </select>
                <button>Update</button>
            </form>
            </div>
        </div>
    ) 
}
export default SingleUserPage