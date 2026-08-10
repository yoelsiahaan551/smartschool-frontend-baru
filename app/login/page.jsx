"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  BarChart3,
  ShieldCheck,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  // ==========================================
  // STATE
  // ==========================================
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // ==========================================
  // HANDLE LOGIN
  // ==========================================
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!identifier.trim()) {
      setError("Email atau username harus diisi.");
      return;
    }

    if (!password) {
      setError("Password harus diisi.");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error(
          "NEXT_PUBLIC_API_URL belum dikonfigurasi."
        );
      }

      const response = await fetch(
        `${apiUrl}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: identifier.trim(),
            kataSandi: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Login gagal. Silakan coba lagi."
        );
      }

      sessionStorage.setItem(
        "login_identifier",
        identifier.trim()
      );

      sessionStorage.setItem(
        "remember_me",
        rememberMe ? "true" : "false"
      );

      router.push("/login/verify");
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* ==========================================
          BACKGROUND IMAGE
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

      {/* ==========================================
          DARK OVERLAY FOR READABILITY
      ========================================== */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(0, 0, 0, 0.4) 0%,
              rgba(0, 0, 0, 0.2) 30%,
              rgba(0, 0, 0, 0.1) 50%,
              rgba(0, 0, 0, 0.2) 70%,
              rgba(0, 0, 0, 0.4) 100%
            )
          `,
        }}
      />

      {/* ==========================================
          SOFT GLOW EFFECT
      ========================================== */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse at 30% 50%,
              rgba(59, 130, 246, 0.15) 0%,
              rgba(59, 130, 246, 0.05) 40%,
              rgba(59, 130, 246, 0) 70%
            )
          `,
        }}
      />

     

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ==========================================
              LEFT CONTENT - PUTIH TERANG
          ========================================== */}
          <div className="space-y-6">
            {/* LOGO */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Image
                  src="/logo/logoSS.png"
                  alt="Smart School Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>

              <span className="font-extrabold text-2xl text-white drop-shadow-lg">
                SMART <span className="text-blue-300">SCHOOL</span>
              </span>
            </div>

            {/* HEADING */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-white drop-shadow-lg">
                Selamat Datang di
                <br />
                <span className="text-blue-300">
                  Smart School
                </span>
              </h1>

              <p className="text-white/90 leading-relaxed text-base max-w-md drop-shadow-md">
                Kelola seluruh aktivitas sekolah dengan lebih mudah, cepat, dan 
                terintegrasi dalam satu platform.
              </p>
            </div>

            {/* FEATURES */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: GraduationCap, label: "Efisien" },
                { icon: BarChart3, label: "Terintegrasi" },
                { icon: ShieldCheck, label: "Aman" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/20 shadow-lg"
                >
                  <Icon size={16} className="text-blue-300" />
                  <span className="text-sm font-semibold text-white">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* REGISTER */}
            <p className="text-sm text-white/90 drop-shadow-md">
              Belum punya akun?{" "}
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="text-blue-300 font-semibold hover:text-white transition-colors duration-200 hover:underline"
              >
                Daftar di sini
              </button>
            </p>
          </div>

          {/* ==========================================
              RIGHT — LOGIN CARD
          ========================================== */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                {/* CARD HEADER */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-lg shadow-blue-500/30 mb-4">
                    <Image
                      src="/logo/logoSS.png"
                      alt="Smart School Logo"
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-slate-800">
                    Masuk ke Akun
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Masukkan kredensial untuk melanjutkan
                  </p>
                </div>

                {/* ERROR */}
                {error && (
                  <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 px-4 py-3">
                    <p className="text-sm text-red-600 text-center">{error}</p>
                  </div>
                )}

                {/* FORM */}
                <form onSubmit={handleLogin} className="space-y-5">
                  {/* EMAIL / USERNAME */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email / Username
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Masukkan email atau username"
                        autoComplete="username"
                        disabled={loading}
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-black text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Masukkan password"
                        autoComplete="current-password"
                        disabled={loading}
                        className="w-full pl-12 pr-12 py-3 rounded-2xl border border-gray-200 bg-white text-black text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* REMEMBER & FORGOT */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        disabled={loading}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-600">
                        Ingat saya
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={() => router.push("/forgot-password")}
                      className="text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 hover:underline"
                    >
                      Lupa password?
                    </button>
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-300 disabled:to-indigo-300 disabled:cursor-not-allowed text-white text-base font-semibold py-3.5 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Memproses...
                      </>
                    ) : (
                      <>
                        <User size={20} />
                        Masuk
                      </>
                    )}
                  </button>

                  {/* DIVIDER */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-400">
                        atau
                      </span>
                    </div>
                  </div>

                  {/* GOOGLE */}
                  <button
                    type="button"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed text-slate-700 text-sm font-semibold py-3.5 rounded-2xl transition-all duration-300"
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
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
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