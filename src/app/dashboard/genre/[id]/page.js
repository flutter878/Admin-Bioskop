'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from '@/app/ui/dashboard/film/editFilm.module.css';

export default function EditGenre() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    genre: '',
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genre/${id}`);
      const data = await res.json();
      setForm({
        genre: data.name || data.genre || '', 
      });
    }
    if (id) fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    }

    const res = await fetch(`/api/genre/${id}`, {
      method: 'PATCH',
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      router.push('/dashboard/genre');
    } else {
      alert(data.error || 'Gagal update');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Edit Genre</h2>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Nama Genre</label>
        <input
          name="genre"
          value={form.genre}
          onChange={handleChange}
          className={styles.formInput}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>Simpan Perubahan</button>
        <button type="button" className={styles.cancelButton} onClick={() => router.push('/dashboard/genre')}>
          Batal
        </button>
      </div>
    </form>
  );
}
