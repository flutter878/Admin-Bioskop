'use client';

import styles from './sidebar.module.css';
import Image from 'next/image';
import MenuLink from './menuLink/menuLink';


import { usePathname, useRouter, handleLogout} from 'next/navigation';
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
  MdMenu,
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
        title: 'user',
        path: '/dashboard/user',
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



const Sidebar = ({ toggleSidebar }) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = () => {
    router.push('/login');
  }
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <Image
          className={styles.profileImage}
          src="/profile.png"
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userInfo}>
          <span className={styles.username}>user1</span>
          <span className={styles.role}>Administrator</span>
        </div>
      </div>

      <div className={styles.menu}>
        <button onClick={toggleSidebar} className={styles.toggleBtn}>
          <MdMenu size={24} />
        </button>
      </div>

      <div className={styles.menu}>
        {menuItems.map((section) => (
          <div key={section.title}>
            <h3 className={styles.sectionTitle}>{section.title}</h3>
            <ul className={styles.menuList}>
              {section.list.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li
                    key={item.title}
                    className={`${styles.menuItem} ${
                      isActive ? styles.active : ''
                    }`}
                  >
                    {item.icon}
                    <MenuLink item={item} key={item.title} />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <button  onClick={handleLogout} className={styles.logout}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
