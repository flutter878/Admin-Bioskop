'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from '@/app/ui/dashboard/film/editFilm.module.css';

export default function EditBioskop() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    nama: '',
    alamat: '',
    tlp: '',
    poster: null,
  });
  const [currentPosterUrl, setCurrentPosterUrl] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/bioskop/${id}`);
      const data = await res.json();
      setForm({
        nama: data.nama || '',
        alamat: data.alamat || '',
        tlp: data.tlp || '',
        poster: null,
      });
      setCurrentPosterUrl(data.poster); // tampilkan poster lama
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
    formData.append('nama', form.nama);
    formData.append('alamat', form.alamat);
    formData.append('tlp', form.tlp);
    if (form.poster) {
      formData.append('poster', form.poster);
    }

    const res = await fetch(`/api/bioskop/${id}`, {
      method: 'PATCH',
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      router.push('/dashboard/bioskop');
    } else {
      alert(data.error || 'Gagal update');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Edit Bioskop</h2>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Nama</label>
        <input name="nama" value={form.nama} onChange={handleChange} className={styles.formInput} />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Alamat</label>
        <textarea name="alamat" value={form.alamat} onChange={handleChange} className={styles.formTextarea} />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Telepon</label>
        <input name="tlp" value={form.tlp} onChange={handleChange} className={styles.formInput} />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Poster</label>
        <input name="poster" type="file" onChange={handleChange} className={styles.formFile} />
        {currentPosterUrl && (
          <div className={styles.previewContainer}>
            <p>Poster Sekarang:</p>
            <img src={currentPosterUrl} alt="Poster saat ini" className={styles.previewImage} />
          </div>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>Simpan Perubahan</button>
        <button type="button" className={styles.cancelButton} onClick={() => router.push('/dashboard/bioskop')}>
          Batal
        </button>
      </div>
    </form>
  );
}
