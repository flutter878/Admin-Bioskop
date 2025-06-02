'use client';
import { useState, useEffect } from 'react';
import styles from '@/app/ui/dashboard/film/tambahfilm.module.css';

const TambahFilm = () => {
  const [form, setForm] = useState({
    nama: '',
    deskripsi: '',
    genre: '',
    rating: '',
    durasi: '',
    poster: null,
  });

  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch('/api/genre');
        const data = await res.json();
        setGenres(data);
      } catch (error) {
        console.error('Gagal mengambil data genre:', error);
      }
    };

    fetchGenres();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!form.nama.trim()) newErrors.nama = 'Nama film harus diisi';
    if (!form.deskripsi.trim()) newErrors.deskripsi = 'Deskripsi harus diisi';
    if (!form.genre.trim()) newErrors.genre = 'Genre harus diisi';

    if (!form.rating) {
      newErrors.rating = 'Rating harus diisi';
    } else if (parseFloat(form.rating) < 1 || parseFloat(form.rating) > 10) {
      newErrors.rating = 'Rating harus antara 1-10';
    }

    if (!form.durasi) {
      newErrors.durasi = 'Durasi harus diisi';
    } else if (parseInt(form.durasi) <= 0) {
      newErrors.durasi = 'Durasi harus lebih dari 0 menit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));

    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, poster: file }));

      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    } else {
      setForm((prev) => ({ ...prev, poster: null }));
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const body = new FormData();
      body.append('nama', form.nama);
      body.append('deskripsi', form.deskripsi);
      body.append('genre', form.genre);
      body.append('rating', form.rating);
      body.append('durasi', form.durasi);
      if (form.poster) body.append('poster', form.poster);

      const res = await fetch('/api/film', {
        method: 'POST',
        body,
      });

      if (res.ok) {
        setSuccessMessage('Film berhasil ditambahkan!');
        setForm({
          nama: '',
          deskripsi: '',
          genre: '',
          rating: '',
          durasi: '',
          poster: null,
        });
        setPreviewUrl(null);
        setTimeout(() => {
          window.location.href = '/dashboard/film';
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
    window.location.href = '/dashboard/film';
  };

  return (
    <div className={styles.container}>
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="nama">Nama Film</label>
          <input
            id="nama"
            type="text"
            value={form.nama}
            onChange={handleChange}
            className={errors.nama ? styles.inputError : ''}
          />
          {errors.nama && <p className={styles.errorText}>{errors.nama}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="deskripsi">Deskripsi</label>
          <textarea
            id="deskripsi"
            value={form.deskripsi}
            onChange={handleChange}
            rows="4"
            className={errors.deskripsi ? styles.inputError : ''}
          />
          {errors.deskripsi && <p className={styles.errorText}>{errors.deskripsi}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
            value={form.genre}
            onChange={handleChange}
            className={errors.genre ? styles.inputError : ''}
          >
            <option value="">-- Pilih Genre --</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.nama || genre.genre || 'Tanpa Nama'}
            </option>
            ))}
          </select>
          {errors.genre && <p className={styles.errorText}>{errors.genre}</p>}
        </div>
        

        <div className={styles.formGroup}>
          <label htmlFor="rating">Rating (1-10)</label>
          <input
            id="rating"
            type="number"
            min="1"
            max="10"
            step="0.1"
            value={form.rating}
            onChange={handleChange}
            className={errors.rating ? styles.inputError : ''}
          />
          {errors.rating && <p className={styles.errorText}>{errors.rating}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="durasi">Durasi (menit)</label>
          <input
            id="durasi"
            type="number"
            min="1"
            value={form.durasi}
            onChange={handleChange}
            className={errors.durasi ? styles.inputError : ''}
          />
          {errors.durasi && <p className={styles.errorText}>{errors.durasi}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="poster">Poster</label>
          <input
            type="file"
            id="poster"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
          {previewUrl && (
            <div className={styles.previewContainer}>
              <p className={styles.previewLabel}>Preview:</p>
              <img src={previewUrl} alt="Preview poster" className={styles.previewImage} />
            </div>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" disabled={loading} className={styles.submitButton}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahFilm;
