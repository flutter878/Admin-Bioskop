'use client';
import { useState } from 'react';
import styles from '@/app/ui/dashboard/film/tambahfilm.module.css';

const TambahGenre = () => {
  const [form, setForm] = useState({ genre: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!form.genre.trim()) newErrors.genre = 'Nama genre harus diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));

    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const body = new FormData();
      body.append('genre', form.genre);

      const res = await fetch('/api/genre', {
        method: 'POST',
        body,
      });

      if (res.ok) {
        setSuccessMessage('Genre berhasil ditambahkan!');
        setForm({ genre: '' });

        setTimeout(() => {
          window.location.href = '/dashboard/genre';
        }, 2000);
      } else {
        const err = await res.json();
        alert('Gagal: ' + err.error);
      }
    } catch (error) {
      alert('Terjadi kesalahan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    window.location.href = '/dashboard/genre';
  };

  return (
    <div className={styles.container}>
      {successMessage && (
        <div className={styles.successMessage}>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="genre">Genre</label>
          <input
            id="genre"
            type="text"
            value={form.genre}
            onChange={handleChange}
            className={errors.genre ? styles.inputError : ''}
          />
          {errors.genre && <p className={styles.errorText}>{errors.genre}</p>}
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahGenre;
