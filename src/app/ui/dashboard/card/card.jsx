'use client';

import { useEffect, useState } from 'react';
import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";
import { getUser } from '@/lib/users/getUser'; // pastikan path-nya benar

const Card = () => {
  const [totalUser, setTotalUser] = useState(0);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await getUser();
        setTotalUser(users.length);
      } catch (error) {
        console.error('Gagal mengambil data user:', error.message);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>Total Users</span>
        <span className={styles.number}>{totalUser}</span>
        <span className={styles.detail}>
          <span className={styles.positive}>12%</span> more than last week
        </span>
      </div>
    </div>
  );
};

export default Card;
