import Styles from './transaksi.module.css';
import Image from 'next/image';
const Transaksi = () => {
  return (
    <div className={Styles.container}>
      <h2 className={Styles.title}>Transaksi Terakhir</h2>
      <table className={Styles.table}>
        <thead>
          <tr>
            <td>Nama</td>
            <td>Status</td>
            <td>Tanggal</td>
            <td>Pembayaran</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={Styles.user}>
                <Image
                  src="/profile.png"
                  alt="Adam"
                  width={50}
                  height={50}
                  className={Styles.userImage}
                />
                Adam
              </div>
            </td>
            <td>
              <span className={`${Styles.status} ${Styles.pending}`}>
                Pending
              </span>
            </td>
            <td>14.02.2025</td>
            <td>45.000</td>
          </tr>
          <tr>
            <td>
              <div className={Styles.user}>
                <Image
                  src="/profile.png"
                  alt="Adam"
                  width={50}
                  height={50}
                  className={Styles.userImage}
                />
                Adam
              </div>
            </td>
            <td>
              <span className={`${Styles.status} ${Styles.done}`}>
                Succes
              </span>
            </td>
            <td>14.02.2025</td>
            <td>45.000</td>
          </tr>
          <tr>
            <td>
              <div className={Styles.user}>
                <Image
                  src="/profile.png"
                  alt="Adam"
                  width={50}
                  height={50}
                  className={Styles.userImage}
                />
                Adam
              </div>
            </td>
            <td>
              <span className={`${Styles.status} ${Styles.cancel}`}>
                Cencel
              </span>
            </td>
            <td>14.02.2025</td>
            <td>45.000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Transaksi;
