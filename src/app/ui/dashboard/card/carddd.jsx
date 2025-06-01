'use client';

import { useEffect, useState } from 'react';
import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";
import { getFilm } from '@/lib/film/getFilm';
const Card = () => {
  const [totalFilm, setTotalFilm] = useState(0);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const Films = await getFilm();
        setTotalFilm(Films.length);
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
        <span className={styles.title}>Total Film</span>
        <span className={styles.number}>{totalFilm}</span>
        <span className={styles.detail}>
          <span className={styles.positive}>12%</span> more than last week
        </span>
      </div>
    </div>
  );
};

export default Card;
