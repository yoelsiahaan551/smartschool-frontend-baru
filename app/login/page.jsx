
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  BarChart3,
  ShieldCheck,
  Users,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [kataSandi, setKataSandi] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!identifier.trim()) {
      setError("Email atau username wajib diisi.");
      return;
    }

    if (!kataSandi) {
      setError("Password wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      // ==========================================
      // AMBIL API URL
      // ==========================================
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      if (!API_URL) {
        throw new Error(
          "NEXT_PUBLIC_API_URL belum dikonfigurasi."
        );
      }

      // ==========================================
      // REQUEST LOGIN KE BACKEND
      // ==========================================
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: identifier.trim(),
            kataSandi,
          }),
        }
      );

      // ==========================================
      // BACA RESPONSE
      // ==========================================
      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      // ==========================================
      // CEK RESPONSE BACKEND
      // ==========================================
      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Login gagal."
        );
      }

      // ==========================================
      // TOKEN HARUS ADA
      // ==========================================
      if (!data?.token) {
        console.error(
          "Response login tidak memiliki token:",
          data
        );

        throw new Error(
          "Token login tidak diterima dari server."
        );
      }

      // ==========================================
      // SIMPAN TOKEN
      // ==========================================
      localStorage.setItem(
        "token",
        data.token
      );

      // ==========================================
      // SIMPAN USER JIKA BACKEND MENGIRIM USER
      // ==========================================
      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      console.log(
        "TOKEN BERHASIL DISIMPAN:",
        data.token
      );

      // ==========================================
      // REDIRECT
      // ==========================================
      router.push("/admin/dashboard");

    } catch (err) {
      console.error("LOGIN ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">

      {/* ==========================================
          BACKGROUND
      ========================================== */}
      <div className="absolute inset-0">
        <Image
          src="/hero/hero.png"
          alt="Smart School"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse at 30% 50%,
              rgba(255, 255, 255, 0.08) 0%,
              rgba(255, 255, 255, 0.04) 30%,
              rgba(255, 255, 255, 0.02) 55%,
              rgba(255, 255, 255, 0) 75%,
              rgba(255, 255, 255, 0.03) 100%
            )
          `,
        }}
      />

      {/* ==========================================
          CONTENT
      ========================================== */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* ==========================================
              LEFT CONTENT
          ========================================== */}
          <div className="space-y-5">

            {/* LOGO */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl border border-white/50">

                <Image
                  src="/logo/logoSS.png"
                  alt="Smart School Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />

              </div>

              <span className="font-extrabold text-2xl text-white drop-shadow-[0_3px_8px_rgba(15,23,42,0.75)]">
                SMART{" "}
                <span className="text-blue-300 drop-shadow-[0_3px_8px_rgba(37,99,235,0.65)]">
                  SCHOOL
                </span>
              </span>
            </div>

            {/* TITLE */}
            <div className="space-y-4">

              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white drop-shadow-[0_4px_10px_rgba(15,23,42,0.8)]">

                Selamat Datang
                <br />

                <span className="text-blue-300 drop-shadow-[0_4px_10px_rgba(37,99,235,0.7)]">
                  Kembali!
                </span>

              </h1>

              <p className="text-white leading-relaxed text-sm sm:text-base max-w-md drop-shadow-[0_3px_8px_rgba(15,23,42,0.75)] font-medium">
                Masuk ke akun Anda untuk mengelola
                seluruh aktivitas sekolah dengan mudah.
              </p>

            </div>

            {/* FEATURES */}
            <div className="flex flex-wrap gap-2">

              {[
                {
                  icon: GraduationCap,
                  label: "Efisien",
                },
                {
                  icon: BarChart3,
                  label: "Terintegrasi",
                },
                {
                  icon: ShieldCheck,
                  label: "Aman",
                },
                {
                  icon: Users,
                  label: "Kolaboratif",
                },
              ].map(({ icon: Icon, label }) => (

                <div
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 shadow-lg"
                >

                  <Icon
                    size={14}
                    className="text-blue-300"
                  />

                  <span className="text-xs font-semibold text-white">
                    {label}
                  </span>

                </div>

              ))}

            </div>

            {/* REGISTER */}
            <p className="text-sm text-white/80 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">

              Belum punya akun?{" "}

              <Link
                href="/register"
                className="text-blue-300 font-semibold hover:text-white transition-colors duration-200 hover:underline"
              >
                Daftar di sini
              </Link>

            </p>

          </div>

          {/* ==========================================
              LOGIN CARD
          ========================================== */}
          <div className="flex justify-center lg:justify-end">

            <div className="w-full max-w-sm">

              <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-6">

                {/* HEADER */}
                <div className="text-center mb-6">

                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white shadow-lg shadow-blue-500/20 mb-3">

                    <Image
                      src="/logo/logoSS.png"
                      alt="Smart School Logo"
                      width={32}
                      height={32}
                      className="object-contain"
                    />

                  </div>

                  <h2 className="text-xl font-bold text-slate-800">
                    Masuk ke Akun
                  </h2>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Masukkan email/username dan password
                  </p>

                </div>

                {/* ERROR */}
                {error && (
                  <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-3 py-2.5">

                    <p className="text-xs text-red-600 text-center">
                      {error}
                    </p>

                  </div>
                )}

                {/* FORM */}
                <form
                  onSubmit={handleLogin}
                  className="space-y-4"
                >

                  {/* EMAIL / USERNAME */}
                  <div>

                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email atau Username
                    </label>

                    <div className="relative">

                      <Mail
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="text"
                        value={identifier}
                        onChange={(e) =>
                          setIdentifier(e.target.value)
                        }
                        placeholder="Masukkan email atau username"
                        disabled={loading}
                        autoComplete="username"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-black text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200"
                      />

                    </div>

                  </div>

                  {/* PASSWORD */}
                  <div>

                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Password
                    </label>

                    <div className="relative">

                      <Lock
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        value={kataSandi}
                        onChange={(e) =>
                          setKataSandi(e.target.value)
                        }
                        placeholder="Masukkan password"
                        disabled={loading}
                        autoComplete="current-password"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white text-black text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                        disabled={loading}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label={
                          showPassword
                            ? "Sembunyikan password"
                            : "Tampilkan password"
                        }
                      >

                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}

                      </button>

                    </div>

                  </div>

                  {/* REMEMBER / FORGOT */}
                  <div className="flex items-center justify-between gap-3">

                    <div className="flex items-center gap-2">

                      <input
                        type="checkbox"
                        id="remember"
                        className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />

                      <label
                        htmlFor="remember"
                        className="text-xs text-slate-600"
                      >
                        Ingat saya
                      </label>

                    </div>

                    <Link
                      href="/forgot-password"
                      className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    >
                      Lupa password?
                    </Link>

                  </div>

                  {/* LOGIN BUTTON */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-300 disabled:to-indigo-300 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30"
                  >

                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />

                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>

                        Memproses...
                      </>
                    ) : (
                      <>
                        <LogIn size={16} />
                        Masuk
                      </>
                    )}

                  </button>

                  {/* DIVIDER */}
                  <div className="relative">

                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>

                    <div className="relative flex justify-center">

                      <span className="px-3 bg-white text-gray-400 text-xs">
                        atau
                      </span>

                    </div>

                  </div>

                  {/* GOOGLE */}
                  <button
                    type="button"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed text-slate-700 text-sm font-semibold py-2.5 rounded-xl transition-all duration-300"
                  >

                    <GoogleIcon />

                    Masuk dengan Google

                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

// ==========================================
// GOOGLE ICON
// ==========================================
function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
      />

      <path
        fill="#34A853"
        d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.75Z"
      />

      <path
        fill="#FBBC05"
        d="M6.54 13.83a5.87 5.87 0 0 1 0-3.66V7.64H3.3a9.76 9.76 0 0 0 0 8.72l3.24-2.53Z"
      />

      <path
        fill="#EA4335"
        d="M12 6.14c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.2 14.63 2.25 12 2.25A9.75 9.75 0 0 0 3.3 7.64l3.24 2.53C7.31 7.86 9.46 6.14 12 6.14Z"
      />
    </svg>
  );
}
