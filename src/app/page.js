import Link from 'next/link';

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-2xl p-10 max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Selamat Datang admin di CineTix 🎬
        </h1>
        <p className="text-gray-600 mb-6"></p>
        <Link href="/login">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-200">
            Masuk ke menu login
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Home;
