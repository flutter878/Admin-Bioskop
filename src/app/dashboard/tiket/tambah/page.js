'use client';
import { useState, useEffect } from 'react';
import styles from '@/app/ui/dashboard/tiket/tambahtiket.module.css'; 
import { getAllFilm } from '@/lib/film/getAllFilm';
import { getAllBioskop } from '@/lib/bioskop/getAllBioskop';

const TambahTiket = () => {
  const [form, setForm] = useState({
    id_film: '',
    id_bioskop: '',
    harga: '',
    jadwal: '',
    ket: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [films, setFilms] = useState([]);
  const [bioskops, setBioskops] = useState([]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const f = await getAllFilm();
        const b = await getAllBioskop();
        setFilms(f || []);
        setBioskops(b || []);
      } catch (error) {
        console.error('Error fetching options:', error);
        alert('Gagal memuat data film dan bioskop');
      }
    }
    fetchOptions();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!form.id_film) newErrors.id_film = 'Film harus dipilih';
    if (!form.id_bioskop) newErrors.id_bioskop = 'Bioskop harus dipilih';
    if (!form.harga || parseInt(form.harga) <= 0) newErrors.harga = 'Harga harus lebih dari 0';
    if (!form.jadwal) newErrors.jadwal = 'Jadwal harus diisi';
    
    // Validasi format jadwal (pastikan tidak di masa lalu)
    if (form.jadwal) {
      const selectedDate = new Date(form.jadwal);
      const now = new Date();
      if (selectedDate <= now) {
        newErrors.jadwal = 'Jadwal harus di masa depan';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
    
    // Clear error when user starts typing
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

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage('Tiket berhasil ditambahkan!');
        setForm({ id_film: '', id_bioskop: '', harga: '', jadwal: '', ket: '' });
        setTimeout(() => window.location.href = '/dashboard/tiket', 2000);
      } else {
        alert('Gagal: ' + (data.error || 'Terjadi kesalahan'));
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Terjadi kesalahan: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => window.location.href = '/dashboard/tiket';

  // Format datetime-local input
  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tambah Tiket Baru</h2>
      
      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="id_film">Pilih Film *</label>
          <select 
            id="id_film" 
            value={form.id_film} 
            onChange={handleChange} 
            className={errors.id_film ? styles.inputError : ''}
            required
          >
            <option value="">-- Pilih Film --</option>
            {films.map(f => (
              <option key={f.id} value={f.id}>{f.nama}</option>
            ))}
          </select>
          {errors.id_film && <p className={styles.errorText}>{errors.id_film}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="id_bioskop">Pilih Bioskop *</label>
          <select 
            id="id_bioskop" 
            value={form.id_bioskop} 
            onChange={handleChange} 
            className={errors.id_bioskop ? styles.inputError : ''}
            required
          >
            <option value="">-- Pilih Bioskop --</option>
            {bioskops.map(b => (
              <option key={b.id} value={b.id}>{b.nama}</option>
            ))}
          </select>
          {errors.id_bioskop && <p className={styles.errorText}>{errors.id_bioskop}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="jadwal">Jadwal Tayang *</label>
          <input 
            id="jadwal" 
            type="datetime-local" 
            value={form.jadwal} 
            onChange={handleChange} 
            className={errors.jadwal ? styles.inputError : ''}
            min={getCurrentDateTime()}
            required
          />
          {errors.jadwal && <p className={styles.errorText}>{errors.jadwal}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="harga">Harga Tiket (Rp) *</label>
          <input 
            id="harga" 
            type="number" 
            value={form.harga} 
            onChange={handleChange} 
            className={errors.harga ? styles.inputError : ''} 
            min="1"
            placeholder="Contoh: 50000"
            required
          />
          {errors.harga && <p className={styles.errorText}>{errors.harga}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ket">Keterangan</label>
          <textarea 
            id="ket" 
            rows="3" 
            value={form.ket} 
            onChange={handleChange}
            placeholder="Keterangan tambahan (opsional)"
          ></textarea>
        </div>

        <div className={styles.buttonGroup}>
          <button 
            type="submit" 
            disabled={loading} 
            className={styles.submitButton}
          >
            {loading ? 'Menyimpan...' : 'Simpan Tiket'}
          </button>
          <button 
            type="button" 
            onClick={handleCancel} 
            className={styles.cancelButton}
            disabled={loading}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahTiket;