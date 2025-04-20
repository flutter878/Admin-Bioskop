import styles from './sidebar.module.css';
import Image from 'next/image';

import {
  MdDashboard,
  MdTheaters,
  MdMovie,
  MdAttachMoney,
  MdConfirmationNumber,
  MdSettings,
  MdHelpCenter,
  MdSupervisedUserCircle,
  MdOutlineAdminPanelSettings,
  MdLogout,
} from 'react-icons/md';

const menuItems = [
  {
    title: 'Main',
    list: [
      {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <MdDashboard />,
      },
    ],
  },
  {
    title: 'Data Master',
    list: [
      {
        title: 'Film',
        path: '/dashboard/film',
        icon: <MdMovie />,
      },
      {
        title: 'Genre',
        path: '/dashboard/genre',
        icon: <MdTheaters />,
      },
      {
        title: 'Bioskop',
        path: '/dashboard/bioskop',
        icon: <MdTheaters />,
      },
      {
        title: 'Tiket',
        path: '/dashboard/tiket',
        icon: <MdConfirmationNumber />,
      },
    ],
  },
  {
    title: 'Transaksi',
    list: [
      {
        title: 'Pemesanan',
        path: '/dashboard/pemesanan',
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: 'User',
    list: [
      {
        title: 'Member',
        path: '/dashboard/member',
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: 'Admin',
        path: '/dashboard/admin',
        icon: <MdOutlineAdminPanelSettings />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <img src="profile.png" alt="User Profile" className={styles.avatar} />
        <div className={styles.userInfo}>
          <span className={styles.username}>user1</span>
          <span className={styles.role}>Administrator</span>
        </div>
      </div>

      <div className={styles.menu}>
        {menuItems.map((section) => (
          <div key={section.title}>
            <h3 className={styles.sectionTitle}>{section.title}</h3>
            <ul className={styles.menuList}>
              {section.list.map((item) => (
                <li key={item.title} className={styles.menuItem}>
                  {item.icon}
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button className={styles.logout}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
