"use client"
import { useState } from 'react';
import Sidebar from '../ui/dashboard/sidebar/sidebar';
import Navbar from '../ui/dashboard/navbar/navbar';
import style from '../ui/dashboard/dashboard.module.css';
import Footer from '../ui/dashboard/footer/footer';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={style.container}>
      {/* Sidebar */}
      <div className={`${style.menu} ${sidebarOpen ? '' : style.hide}`}>
        <Sidebar />
      </div>

      {/* Konten Utama */}
      <div className={style.content}>
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className={style.pageContent}>{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

