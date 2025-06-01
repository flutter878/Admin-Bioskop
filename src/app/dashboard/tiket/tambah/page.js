'use client';
import { useState, useEffect } from 'react';
import styles from '@/app/ui/dashboard/film/tambahfilm.module.css'; 
import { getAllFilm } from '@/lib/film/getAllFilm';
import { getAllBioskop } from '@/lib/bioskop/getAllBioskop';

const TambahTiket = () => {
  const [form, setForm] = useState({
    id_film: '',
    id_bioskop: '',
    harga: '',
    ket: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [films, setFilms] = useState([]);
  const [bioskops, setBioskops] = useState([]);

  useEffect(() => {
    async function fetchOptions() {
      const f = await getAllFilm();
      const b = await getAllBioskop();
      setFilms(f);
      setBioskops(b);
    }
    fetchOptions();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!form.id_film) newErrors.id_film = 'Film harus dipilih';
    if (!form.id_bioskop) newErrors.id_bioskop = 'Bioskop harus dipilih';
    if (!form.harga || parseInt(form.harga) <= 0) newErrors.harga = 'Harga harus lebih dari 0';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => {
        const newErr = { ...prev };
        delete newErr[id];
        return newErr;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/tiket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccessMessage('Tiket berhasil ditambahkan!');
        setForm({ id_film: '', id_bioskop: '', harga: '', ket: '' });
        setTimeout(() => window.location.href = '/dashboard/tiket', 2000);
      } else {
        const err = await res.json();
        alert('Gagal: ' + err.error);
      }
    } catch (err) {
      alert('Terjadi kesalahan: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => window.location.href = '/dashboard/tiket';

  return (
    <div className={styles.container}>
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>

        <div className={styles.formGroup}>
          <label htmlFor="id_film">Pilih Film</label>
          <select id="id_film" value={form.id_film} onChange={handleChange} className={errors.id_film ? styles.inputError : ''}>
            <option value="">-- Pilih Film --</option>
            {films.map(f => (
              <option key={f.id} value={f.id}>{f.nama}</option>
            ))}
          </select>
          {errors.id_film && <p className={styles.errorText}>{errors.id_film}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="id_bioskop">Pilih Bioskop</label>
          <select id="id_bioskop" value={form.id_bioskop} onChange={handleChange} className={errors.id_bioskop ? styles.inputError : ''}>
            <option value="">-- Pilih Bioskop --</option>
            {bioskops.map(b => (
              <option key={b.id} value={b.id}>{b.nama}</option>
            ))}
          </select>
          {errors.id_bioskop && <p className={styles.errorText}>{errors.id_bioskop}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="harga">Harga Tiket</label>
          <input id="harga" type="number" value={form.harga} onChange={handleChange} className={errors.harga ? styles.inputError : ''} />
          {errors.harga && <p className={styles.errorText}>{errors.harga}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ket">Keterangan (opsional)</label>
          <textarea id="ket" rows="3" value={form.ket} onChange={handleChange}></textarea>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" disabled={loading} className={styles.submitButton}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>
            Batal
          </button>
        </div>

      </form>
    </div>
  );
};

export default TambahTiket;
