'use client';
import { useState } from 'react';
import styles from '@/app/ui/dashboard/film/tambahfilm.module.css';

const TambahBioskop = () => {
  const [form, setForm] = useState({
    nama: '',
    alamat: '',
    tlp: '',
    poster: null,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!form.nama.trim()) newErrors.nama = 'Nama bioskop harus diisi';
    if (!form.alamat.trim()) newErrors.alamat = 'Alamat harus diisi';
    if (!form.tlp.trim()) newErrors.tlp = 'Telepon harus diisi';

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
      body.append('alamat', form.alamat);
      body.append('tlp', form.tlp);
      if (form.poster) body.append('poster', form.poster);

      const res = await fetch('/api/bioskop', {
        method: 'POST',
        body,
      });

      if (res.ok) {
        setSuccessMessage('Bioskop berhasil ditambahkan!');
        setForm({ nama: '', alamat: '', tlp: '', poster: null });
        setPreviewUrl(null);
        setTimeout(() => {
          window.location.href = '/dashboard/bioskop';
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
    window.location.href = '/dashboard/bioskop';
  };

  return (
    <div className={styles.container}>
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="nama">Nama Bioskop</label>
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
          <label htmlFor="alamat">Alamat</label>
          <textarea
            id="alamat"
            value={form.alamat}
            onChange={handleChange}
            rows="4"
            className={errors.alamat ? styles.inputError : ''}
          />
          {errors.alamat && <p className={styles.errorText}>{errors.alamat}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tlp">Telepon</label>
          <input
            id="tlp"
            type="text"
            value={form.tlp}
            onChange={handleChange}
            className={errors.tlp ? styles.inputError : ''}
          />
          {errors.tlp && <p className={styles.errorText}>{errors.tlp}</p>}
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
              <div className={styles.imagePreview}>
                <img
                  src={previewUrl}
                  alt="Preview poster"
                  className={styles.previewImage}
                />
              </div>
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

export default TambahBioskop;
