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
    if (form.email === 'admin@gmail.com' && form.password === 'admin') {
      router.push('/dashboard');
    } else {
      alert('Email atau password salah!');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginLeft}>
        <h1 className={styles.loginBrand}>Hello..</h1>
        <h2 className={styles.loginTitle}>Welcome Back</h2>
        <p className={styles.loginDesc}>Please sign in to continue.</p>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={styles.loginInput}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={styles.loginInput}
            placeholder="Password"
          />
          <button className={styles.loginButton} type="submit">Login</button>
        </form>
      </div>
      <div className={styles.loginRight}>
        <img src="/side.jpg" alt="Login illustration" />
      </div>
    </div>
  );
}
