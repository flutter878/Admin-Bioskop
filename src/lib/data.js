// lib/data.js
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const fetchAuthUsers = async () => {
    const supabase = createServerComponentClient({ cookies });

  // Ambil user dari Supabase Auth
    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) {
    console.error("Gagal mengambil user:", error.message);
    return [];
    }

  // Contoh mapping data supaya sesuai dengan struktur yang kamu gunakan
    return data.users.map((user) => ({
    id: user.id,
    email: user.email,
    nama: user.user_metadata?.nama || '-', // nama diambil dari user_metadata (jika ada)
    }));
};
