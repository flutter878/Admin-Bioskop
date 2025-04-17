import Link from 'next/link';
const Home = () => {
  return (
    <main>
      <h1>Selamat Datang di Next.js dengan App Router!</h1>
      <p>Ini adalah halaman utama aplikasi Anda.</p>
      <Link href="/about">
        Pergi ke Halaman Tentang Kami
      </Link>
    </main>
  );
}
export default Home