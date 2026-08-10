"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  Loader2,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [kodeOtp, setKodeOtp] = useState("");
  const [kataSandi, setKataSandi] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // KIRIM OTP
  // ==========================================
  const handleSendOtp = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email) {
      setError("Email wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(
        `${API_URL}/api/auth/lupa-kata-sandi`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Gagal mengirim kode OTP."
        );
      }

      sessionStorage.setItem("forgot_password_email", email);

      setSuccess(
        "Kode OTP berhasil dikirim. Silakan cek email kamu."
      );

      setStep(2);
    } catch (error) {
      setError(
        error.message || "Terjadi kesalahan saat mengirim OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RESET PASSWORD
  // ==========================================
  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!kodeOtp) {
      setError("Kode OTP wajib diisi.");
      return;
    }

    if (kodeOtp.length !== 6) {
      setError("Kode OTP harus terdiri dari 6 digit.");
      return;
    }

    if (!kataSandi) {
      setError("Password baru wajib diisi.");
      return;
    }

    if (kataSandi.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }

    if (!/[A-Z]/.test(kataSandi)) {
      setError(
        "Password harus mengandung minimal 1 huruf kapital."
      );
      return;
    }

    if (!/[0-9]/.test(kataSandi)) {
      setError(
        "Password harus mengandung minimal 1 angka."
      );
      return;
    }

    if (kataSandi !== confirmPassword) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(
        `${API_URL}/api/auth/atur-ulang-kata-sandi`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            kodeOtp,
            kataSandi,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Gagal mengatur ulang password."
        );
      }

      setSuccess(
        "Password berhasil diubah. Mengarahkan ke halaman login..."
      );

      sessionStorage.removeItem("forgot_password_email");

      setTimeout(() => {
        router.push("/login");
      }, 1800);
    } catch (error) {
      setError(
        error.message ||
          "Terjadi kesalahan saat mengatur ulang password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 flex items-center justify-center">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <Image
          src="/images/auth-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-slate-950/70" />

        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-slate-950/60 to-indigo-950/80" />
      </div>

      {/* TOP ACCENT */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500" />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-md px-6 py-10">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <div className="relative w-14 h-14 rounded-2xl bg-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl">
            <Image
              src="/logo/logoSS.png"
              alt="Smart School Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-2xl p-7">

          {/* HEADER */}
          <div className="text-center mb-7">

            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 mb-4">
              {step === 1 ? (
                <KeyRound
                  size={27}
                  className="text-blue-600"
                />
              ) : (
                <ShieldCheck
                  size={27}
                  className="text-blue-600"
                />
              )}
            </div>

            <h1 className="text-2xl font-bold text-slate-800">
              {step === 1
                ? "Lupa Password?"
                : "Atur Ulang Password"}
            </h1>

            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              {step === 1
                ? "Masukkan email akun kamu untuk mendapatkan kode OTP."
                : "Masukkan kode OTP dan buat password baru untuk akun kamu."}
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
              <p className="text-xs text-red-600 text-center">
                {error}
              </p>
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="mb-5 rounded-xl bg-green-50 border border-green-200 px-4 py-3 flex items-start gap-2">
              <CheckCircle2
                size={16}
                className="text-green-600 mt-0.5 shrink-0"
              />

              <p className="text-xs text-green-700">
                {success}
              </p>
            </div>
          )}

          {/* ======================================
              STEP 1
          ====================================== */}
          {step === 1 && (
            <form
              onSubmit={handleSendOtp}
              className="space-y-5"
            >

              {/* EMAIL */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Masukkan email akun"
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-black text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 transition-all"
                  />
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-300 disabled:to-indigo-300 text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Mengirim OTP...
                  </>
                ) : (
                  <>
                    <Mail size={17} />
                    Kirim Kode OTP
                  </>
                )}
              </button>
            </form>
          )}

          {/* ======================================
              STEP 2
          ====================================== */}
          {step === 2 && (
            <form
              onSubmit={handleResetPassword}
              className="space-y-4"
            >

              {/* EMAIL */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 text-sm"
                  />
                </div>
              </div>

              {/* OTP */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Kode OTP
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={kodeOtp}
                  onChange={(e) =>
                    setKodeOtp(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6)
                    )
                  }
                  placeholder="Masukkan 6 digit OTP"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-black text-center text-lg font-bold tracking-[0.4em] placeholder:text-gray-400 placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* PASSWORD BARU */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Password Baru
                </label>

                <div className="relative">
                  <Lock
                    size={17}
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
                    placeholder="Minimal 8 karakter"
                    disabled={loading}
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-white text-black text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>

                <p className="text-[10px] text-gray-400 mt-1.5">
                  Minimal 8 karakter, 1 huruf kapital, dan
                  1 angka.
                </p>
              </div>

              {/* KONFIRMASI PASSWORD */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Konfirmasi Password
                </label>

                <div className="relative">
                  <Lock
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={
                      showConfirm
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Ulangi password baru"
                    disabled={loading}
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-white text-black text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirm(!showConfirm)
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-300 disabled:to-indigo-300 text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={17} />
                    Simpan Password Baru
                  </>
                )}
              </button>

              {/* KEMBALI INPUT EMAIL */}
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setKodeOtp("");
                  setKataSandi("");
                  setConfirmPassword("");
                  setError("");
                  setSuccess("");
                }}
                className="w-full text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Gunakan email lain
              </button>
            </form>
          )}

          {/* BACK TO LOGIN */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={15} />
              Kembali ke halaman login
            </Link>
          </div>
        </div>

        {/* FOOTER */}
        <p className="text-center text-[11px] text-white/50 mt-5">
          © 2026 Smart School. Semua hak dilindungi.
        </p>
      </div>
    </section>
  );
}