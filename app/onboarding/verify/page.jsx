"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import { verifyTenant } from "../../../services/tenant.service";

export default function OnboardingVerifyPage() {
  const [email, setEmail] = useState("");

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

  const inputRefs = useRef([]);

  useEffect(() => {
    const savedEmail =
      sessionStorage.getItem(
        "onboarding_email"
      );

    if (!savedEmail) {
      window.location.href =
        "/onboarding/school";
      return;
    }

    setEmail(savedEmail);

    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    const digit = value.slice(-1);

    const next = [...otp];
    next[index] = digit;

    setOtp(next);
    setError("");

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const value = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!value) return;

    const next = [
      "",
      "",
      "",
      "",
      "",
      "",
    ];

    value.split("").forEach(
      (digit, index) => {
        next[index] = digit;
      }
    );

    setOtp(next);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const kodeOtp = otp.join("");

    if (kodeOtp.length !== 6) {
      setError(
        "Kode OTP harus terdiri dari 6 digit."
      );
      return;
    }

    if (!email) {
      setError(
        "Email pendaftaran tidak ditemukan."
      );
      return;
    }

    setLoading(true);

    try {
      /*
       * BE:
       *
       * POST /api/v1/tenant/verify
       *
       * {
       *   email,
       *   kodeOtp
       * }
       */

      const response =
        await verifyTenant(
          email,
          kodeOtp
        );

      /*
       * BE memberikan:
       *
       * Paket gratis:
       * {
       *   is_trial: true
       * }
       *
       * Paket berbayar:
       * {
       *   payment_url: "...",
       *   is_trial: false
       * }
       */

      if (response?.data?.is_trial) {
        sessionStorage.removeItem(
          "onboarding_email"
        );

        sessionStorage.removeItem(
          "onboarding_paket_id"
        );

        window.location.href =
          "/login";

        return;
      }

      if (
        response?.data?.payment_url
      ) {
        sessionStorage.setItem(
          "onboarding_payment_url",
          response.data.payment_url
        );

        window.location.href =
          "/onboarding/payment";

        return;
      }

      throw new Error(
        "Data pembayaran tidak diterima dari server."
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Verifikasi OTP gagal."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/hero/hero.png"
        alt="SmartSchool"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-white/80" />

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Image
            src="/logo/logoSS.png"
            alt="SmartSchool"
            width={42}
            height={42}
          />

          <span className="font-bold text-lg">
            SMART{" "}
            <span className="text-blue-600">
              SCHOOL
            </span>
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-7">
          {/* PROGRESS */}

          <div className="flex justify-center items-center mb-7">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
              ✓
            </div>

            <div className="w-12 h-px bg-blue-600" />

            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
              2
            </div>

            <div className="w-12 h-px bg-slate-200" />

            <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-bold">
              3
            </div>
          </div>

          <div className="text-center mb-7">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck
                size={27}
                className="text-blue-600"
              />
            </div>

            <h1 className="text-xl font-bold text-slate-900">
              Verifikasi Email
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Masukkan kode OTP yang dikirim
              ke email:
            </p>

            <p className="text-sm font-semibold text-blue-600 mt-1 break-all">
              {email}
            </p>
          </div>

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center gap-2 mb-7">
              {otp.map(
                (digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[
                        index
                      ] = element;
                    }}
                    value={digit}
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
                    onPaste={
                      handlePaste
                    }
                    disabled={loading}
                    maxLength={1}
                    inputMode="numeric"
                    className="w-11 h-12 text-center text-lg font-bold border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                  Memverifikasi...
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Verifikasi Email
                </>
              )}
            </button>
          </form>

          <button
            type="button"
            onClick={() =>
              (window.location.href =
                "/onboarding/school")
            }
            disabled={loading}
            className="w-full mt-5 flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-blue-600"
          >
            <ArrowLeft size={15} />
            Kembali
          </button>
        </div>
      </div>
    </main>
  );
}