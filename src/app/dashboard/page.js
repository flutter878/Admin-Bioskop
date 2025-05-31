import Card from '../ui/dashboard/card/card';
import Cardd from '../ui/dashboard/card/cardd';
import Carddd from '../ui/dashboard/card/carddd';
import Chart from '../ui/dashboard/chart/chart';
import styles from '../ui/dashboard/dashboard.module.css';
import Transaksi from '../ui/dashboard/transaksi/transaksi';
const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card />
          <Cardd />
          <Carddd />
        </div>
        <Transaksi />
        <Chart />
      </div>
    </div>
  );
};
export default Dashboard;
