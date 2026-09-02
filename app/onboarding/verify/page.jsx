"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  ArrowLeft,
  Loader2,
  Mail,
  RefreshCw,
} from "lucide-react";

import { verifyTenant } from "../../../services/tenant.service";

export default function OnboardingVerifyPage() {
  const [email, setEmail] = useState("");
  const [checkingSession, setCheckingSession] =
    useState(true);

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputRefs = useRef([]);

  // =========================================================
  // CEK SESSION
  // =========================================================

  useEffect(() => {
    const checkSession = () => {
      try {
        const savedEmail =
          sessionStorage.getItem(
            "onboarding_email"
          );

        console.log(
          "VERIFY - onboarding_email:",
          savedEmail
        );

        if (!savedEmail) {
          console.error(
            "Email onboarding tidak ditemukan."
          );

          window.location.replace(
            "/onboarding/school"
          );

          return;
        }

        setEmail(savedEmail);

        setCheckingSession(false);

        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);
      } catch (error) {
        console.error(
          "Gagal membaca sessionStorage:",
          error
        );

        window.location.replace(
          "/onboarding/school"
        );
      }
    };

    checkSession();
  }, []);

  // =========================================================
  // INPUT OTP
  // =========================================================

  const handleChange = (
    index,
    value
  ) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    const digit = value.slice(-1);

    const nextOtp = [...otp];

    nextOtp[index] = digit;

    setOtp(nextOtp);

    setError("");
    setSuccess("");

    if (
      digit &&
      index < 5
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };

  // =========================================================
  // KEYBOARD
  // =========================================================

  const handleKeyDown = (
    index,
    e
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[
        index - 1
      ]?.focus();
    }

    if (
      e.key === "ArrowLeft" &&
      index > 0
    ) {
      inputRefs.current[
        index - 1
      ]?.focus();
    }

    if (
      e.key === "ArrowRight" &&
      index < 5
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };

  // =========================================================
  // PASTE OTP
  // =========================================================

  const handlePaste = (e) => {
    e.preventDefault();

    const value =
      e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);

    if (!value) {
      return;
    }

    const nextOtp = [
      "",
      "",
      "",
      "",
      "",
      "",
    ];

    value
      .split("")
      .forEach(
        (digit, index) => {
          nextOtp[index] = digit;
        }
      );

    setOtp(nextOtp);

    setError("");
    setSuccess("");

    const focusIndex = Math.min(
      value.length,
      5
    );

    setTimeout(() => {
      inputRefs.current[
        focusIndex
      ]?.focus();
    }, 50);
  };

  // =========================================================
  // SUBMIT OTP
  // =========================================================

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setError("");
    setSuccess("");

    const kodeOtp =
      otp.join("");

    if (!email) {
      setError(
        "Email pendaftaran tidak ditemukan."
      );
      return;
    }

    if (kodeOtp.length !== 6) {
      setError(
        "Kode OTP harus terdiri dari 6 digit."
      );
      return;
    }

    setLoading(true);

    try {
      console.log(
        "VERIFY EMAIL:",
        email
      );

      console.log(
        "VERIFY OTP:",
        kodeOtp
      );

      const response =
        await verifyTenant(
          email,
          kodeOtp
        );

      console.log(
        "VERIFY RESPONSE:",
        response
      );

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Verifikasi OTP gagal."
        );
      }

      const data =
        response?.data;

      // =====================================================
      // PAKET GRATIS / TRIAL
      // =====================================================

      if (
        data?.is_trial === true
      ) {
        setSuccess(
          "Verifikasi berhasil. Sekolah berhasil dibuat."
        );

        sessionStorage.removeItem(
          "onboarding_email"
        );

        sessionStorage.removeItem(
          "onboarding_paket_id"
        );

        sessionStorage.removeItem(
          "selected_paket"
        );

        sessionStorage.removeItem(
          "selected_paket_id"
        );

        setTimeout(() => {
          window.location.replace(
            "/login"
          );
        }, 800);

        return;
      }

      // =====================================================
      // PAKET BERBAYAR
      // =====================================================

      const paymentUrl =
        data?.payment_url;

      if (!paymentUrl) {
        throw new Error(
          "Verifikasi berhasil, tetapi link pembayaran tidak diterima dari server."
        );
      }

      console.log(
        "PAYMENT URL:",
        paymentUrl
      );

      sessionStorage.setItem(
        "onboarding_payment_url",
        paymentUrl
      );

      // =====================================================
      // KE PAYMENT
      // =====================================================

      window.location.replace(
        "/onboarding/payment"
      );
    } catch (error) {
      console.error(
        "VERIFY ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Verifikasi OTP gagal."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // BACK
  // =========================================================

  const handleBack = () => {
    if (loading) {
      return;
    }

    window.location.replace(
      "/onboarding/school"
    );
  };

  // =========================================================
  // CEK SESSION LOADING
  // =========================================================

  if (checkingSession) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2
            size={30}
            className="animate-spin text-blue-600 mx-auto mb-3"
          />

          <p className="text-sm text-slate-500">
            Menyiapkan verifikasi...
          </p>
        </div>
      </main>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      {/* HEADER */}

      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9">
              <Image
                src="/logo/logoSS.png"
                alt="SmartSchool"
                fill
                priority
                className="object-contain"
              />
            </div>

            <span className="font-bold text-lg text-slate-900">
              SMART{" "}
              <span className="text-blue-600">
                SCHOOL
              </span>
            </span>
          </div>

          <span className="text-xs text-slate-500">
            Verifikasi Pendaftaran
          </span>
        </div>
      </header>

      {/* CONTENT */}

      <div className="flex-1 flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">

          {/* PROGRESS */}

          <div className="mb-8">
            <div className="flex items-center justify-center">

              <div className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  ✓
                </div>

                <span className="ml-2 text-sm font-semibold text-blue-600 hidden sm:block">
                  Data Sekolah
                </span>
              </div>

              <div className="w-10 sm:w-16 h-px bg-blue-300 mx-2 sm:mx-4" />

              <div className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  2
                </div>

                <span className="ml-2 text-sm font-semibold text-blue-600 hidden sm:block">
                  Verifikasi
                </span>
              </div>

              <div className="w-10 sm:w-16 h-px bg-slate-300 mx-2 sm:mx-4" />

              <div className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-bold">
                  3
                </div>

                <span className="ml-2 text-sm text-slate-400 hidden sm:block">
                  Pembayaran
                </span>
              </div>

            </div>
          </div>

          {/* CARD */}

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">

            {/* ICON */}

            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                <ShieldCheck
                  size={32}
                  className="text-blue-600"
                />
              </div>
            </div>

            {/* TITLE */}

            <div className="text-center mb-7">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                Verifikasi Email
              </h1>

              <p className="text-sm text-slate-500 mt-2">
                Masukkan kode OTP 6 digit
                yang telah dikirim ke email
                pendaftaran kamu.
              </p>
            </div>

            {/* EMAIL */}

            <div className="mb-6 flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                <Mail
                  size={17}
                  className="text-blue-600"
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-slate-400">
                  Kode dikirim ke
                </p>

                <p className="text-sm font-medium text-slate-700 truncate">
                  {email}
                </p>
              </div>
            </div>

            {/* ERROR */}

            {error && (
              <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

            {/* SUCCESS */}

            {success && (
              <div className="mb-5 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-600">
                {success}
              </div>
            )}

            {/* FORM */}

            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-semibold text-slate-700 mb-3 text-center">
                Kode OTP
              </label>

              <div
                className="flex justify-center gap-2 sm:gap-3 mb-7"
                onPaste={handlePaste}
              >
                {otp.map(
                  (digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[
                          index
                        ] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      disabled={loading}
                      onChange={(e) =>
                        handleChange(
                          index,
                          e.target.value
                        )
                      }
                      onKeyDown={(e) =>
                        handleKeyDown(
                          index,
                          e
                        )
                      }
                      className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  )
                )}
              </div>

              <button
                type="submit"
                disabled={
                  loading ||
                  otp.join("").length !== 6
                }
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Memverifikasi...
                  </>
                ) : (
                  <>
                    Verifikasi OTP
                    <ShieldCheck
                      size={17}
                    />
                  </>
                )}
              </button>
            </form>

            {/* INFO */}

            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-start gap-2">
                <RefreshCw
                  size={15}
                  className="text-slate-400 mt-0.5"
                />

                <p className="text-xs text-slate-400 leading-relaxed">
                  Belum menerima kode?
                  Periksa folder spam atau
                  pastikan email pendaftaran
                  yang digunakan sudah benar.
                </p>
              </div>
            </div>

            {/* BACK */}

            <button
              type="button"
              onClick={handleBack}
              disabled={loading}
              className="w-full mt-5 flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-blue-600"
            >
              <ArrowLeft size={16} />
              Kembali ke Pendaftaran
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}