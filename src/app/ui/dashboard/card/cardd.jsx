import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

const Cardd = () => {
  return (
    <div className={styles.container}>
        <MdSupervisedUserCircle size={24}/>
          <div className={styles.texts}>
            <span className={styles.title}>Total Pemesanan</span>
            <span className={styles.number}>0</span>
            <span className={styles.detail}>
              <span className={styles.positive}>12%</span>more that
          </span>
      </div>
    </div>
  );
}
export default Cardd