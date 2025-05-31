'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from '@/app/ui/dashboard/film/editFilm.module.css'
export default function EditFilm() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    nama: '',
    deskripsi: '',
    genre: '',
    rating: '',
    durasi: '',
    poster: null
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/film/${id}`);
      const data = await res.json();
      setForm({
        nama: data.nama || '',
        deskripsi: data.deskripsi || '',
        genre: data.genre || '',
        rating: data.rating || '',
        durasi: data.durasi || '',
        poster: null // kita tidak tampilkan URL poster sebagai file
      });
    }
    if (id) fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'poster') {
      setForm((prev) => ({ ...prev, poster: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    }

    const res = await fetch(`/api/film/${id}`, {
      method: 'PATCH',
      body: formData
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      router.push('/dasboard/film');
    } else {
      alert(data.error || 'Gagal update');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
  <h2 className={styles.formTitle}>Edit Film</h2>

  <div className={styles.formGroup}>
    <label className={styles.formLabel}>Nama</label>
    <input name="nama" value={form.nama} onChange={handleChange} className={styles.formInput} />
  </div>

  <div className={styles.formGroup}>
    <label className={styles.formLabel}>Deskripsi</label>
    <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} className={styles.formTextarea} />
  </div>

  <div className={styles.formGroup}>
    <label className={styles.formLabel}>Genre</label>
    <input name="genre" value={form.genre} onChange={handleChange} className={styles.formInput} />
  </div>

  <div className={styles.formGroup}>
    <label className={styles.formLabel}>Rating</label>
    <input name="rating" type="number" value={form.rating} onChange={handleChange} className={styles.formInput} />
  </div>

  <div className={styles.formGroup}>
    <label className={styles.formLabel}>Durasi (menit)</label>
    <input name="durasi" type="number" value={form.durasi} onChange={handleChange} className={styles.formInput} />
  </div>

  <div className={styles.formGroup}>
    <label className={styles.formLabel}>Poster</label>
    <input name="poster" type="file" onChange={handleChange} className={styles.formFile} />
  </div>

  <div className={styles.buttonGroup}>
  <button type="submit" className={styles.submitButton}>Simpan Perubahan</button>
  <button type="button" className={styles.cancelButton} onClick={() => router.push('/dashboard/film')}>
    Batal
  </button>
</div>
  
  
</form>


  );
}
