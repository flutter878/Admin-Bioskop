'use client';

import styles from './login.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy auth
    if (form.email === 'admin@gmail.com' && form.password === 'admin') {
      router.push('/dashboard');
    } else {
      alert('Email atau password salah!');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.brand}>TheCubeFactory</div>
        <h2>Welcome back</h2>
        <p>Please enter your details</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <div className={styles.options}>
            <label>
              <input type="checkbox" /> Remember for 30 days
            </label>
            <a href="#" className={styles.link}>
              Forgot password
            </a>
          </div>
          <button type="submit" className={styles.button}>
            Sign in
          </button>
          <button type="button" className={styles.google}>
            <img src="/google-icon.svg" alt="Google" /> Sign in with Google
          </button>
          <p className={styles.signup}>
            Don’t have an account? <a href="#">Sign up</a>
          </p>
        </form>
      </div>
      <div className={styles.right}>
        <img src="/images/illustration.png" alt="Illustration" />
      </div>
    </div>
  );
}
