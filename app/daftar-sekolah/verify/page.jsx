"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { verifyTenant } from "../../../services/tenant.service";

export default function VerifyTenantPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailFromUrl = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailFromUrl);
  const [kodeOtp, setKodeOtp] = useState("");
  const [bank, setBank] = useState("bca");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    if (emailFromUrl) {
      setEmail(emailFromUrl);
      return;
    }

    const savedEmail = sessionStorage.getItem(
      "tenant_register_email"
    );

    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, [emailFromUrl]);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setResultData(null);

    // ==========================================
    // NORMALISASI DATA
    // ==========================================

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedOtp = kodeOtp.replace(/\D/g, "");

    // ==========================================
    // VALIDASI EMAIL
    // ==========================================

    if (!normalizedEmail) {
      setError("Email wajib diisi.");
      return;
    }

    // ==========================================
    // VALIDASI OTP
    // ==========================================

    if (!normalizedOtp) {
      setError("Kode OTP wajib diisi.");
      return;
    }

    if (normalizedOtp.length !== 6) {
      setError("Kode OTP harus terdiri dari 6 digit.");
      return;
    }

    // ==========================================
    // VALIDASI BANK
    // ==========================================

    const allowedBanks = ["bca", "bni", "bri"];

    if (!allowedBanks.includes(bank.toLowerCase())) {
      setError("Bank pembayaran tidak valid.");
      return;
    }

    try {
      setLoading(true);

      console.log("=================================");
      console.log("VERIFY TENANT");
      console.log("EMAIL:", normalizedEmail);
      console.log("OTP:", normalizedOtp);
      console.log("OTP LENGTH:", normalizedOtp.length);
      console.log("BANK:", bank);
      console.log("=================================");

      /**
       * BE menerima:
       *
       * {
       *   email,
       *   kodeOtp,
       *   bank
       * }
       */
      const result = await verifyTenant(
        normalizedEmail,
        normalizedOtp,
        bank.toLowerCase()
      );

      console.log("VERIFY TENANT RESULT:", result);

      // ==========================================
      // RESPONSE BE GAGAL
      // ==========================================

      if (!result?.success) {
        throw new Error(
          result?.message || "Verifikasi gagal."
        );
      }

      // ==========================================
      // SIMPAN DATA RESPONSE BE
      // ==========================================

      const data = result?.data || {};

      setResultData(data);

      // ==========================================
      // TRIAL / GRATIS
      // ==========================================

      if (data.is_trial === true) {
        setSuccess(
          result.message ||
            "Sekolah uji coba berhasil dibuat! Silakan login."
        );

        // Hapus data pendaftaran sementara
        sessionStorage.removeItem(
          "tenant_register_email"
        );

        sessionStorage.removeItem(
          "tenant_register_nama"
        );

        sessionStorage.removeItem(
          "tenant_register_paket_id"
        );

        // Redirect ke login
        setTimeout(() => {
          router.push("/login");
        }, 2000);

        return;
      }

      // ==========================================
      // PAKET BERBAYAR
      // ==========================================

      if (data.is_trial === false) {
        setSuccess(
          result.message ||
            "Verifikasi sukses. Silakan lakukan pembayaran."
        );

        return;
      }

      // ==========================================
      // RESPONSE TIDAK SESUAI
      // ==========================================

      setSuccess(
        result.message ||
          "Verifikasi berhasil."
      );
    } catch (err) {
      console.error(
        "VERIFY TENANT ERROR:",
        err
      );

      setError(
        err?.message ||
          "Verifikasi gagal. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-md">

        {/* LOGO */}
        <div className="mb-8 text-center">
          <a href="/">
            <img
              src="/logo/logoSS.png"
              alt="SmartSchool"
              className="mx-auto h-auto w-44"
            />
          </a>
        </div>

        {/* CARD */}
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-8">

          {/* HEADER */}
          <div className="text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
              ✉
            </div>

            <h1 className="mt-5 text-2xl font-bold text-slate-900">
              Verifikasi Email
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Kode OTP sudah dikirim ke email
              yang kamu gunakan saat
              pendaftaran.
            </p>

          </div>

          {/* ERROR */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="admin@sekolah.sch.id"
                disabled={loading}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50 disabled:bg-slate-100"
              />
            </div>

            {/* OTP */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Kode OTP
              </label>

              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={kodeOtp}
                onChange={(event) => {
                  const value =
                    event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6);

                  setKodeOtp(value);
                }}
                placeholder="Masukkan 6 digit OTP"
                disabled={loading}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-center text-xl font-bold tracking-[0.5em] outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50 disabled:bg-slate-100"
              />

              <p className="mt-2 text-xs text-slate-500">
                Masukkan 6 digit kode OTP yang
                dikirim ke email kamu.
              </p>
            </div>

            {/* BANK */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Bank Pembayaran
              </label>

              <select
                value={bank}
                onChange={(event) =>
                  setBank(event.target.value.toLowerCase())
                }
                disabled={loading}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50 disabled:bg-slate-100"
              >
                <option value="bca">
                  BCA
                </option>

                <option value="bni">
                  BNI
                </option>

                <option value="bri">
                  BRI
                </option>
              </select>

              <p className="mt-2 text-xs text-slate-500">
                Untuk paket berbayar, Virtual
                Account akan dibuat setelah
                OTP berhasil diverifikasi.
              </p>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={
                loading ||
                kodeOtp.length !== 6 ||
                !email.trim()
              }
              className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Memverifikasi..."
                : "Verifikasi OTP"}
            </button>

          </form>

          {/* PAYMENT RESULT */}
          {resultData &&
            resultData.is_trial === false &&
            resultData.va_number && (
              <div className="mt-7 rounded-xl border border-blue-200 bg-blue-50 p-5">

                <p className="text-sm font-semibold text-blue-900">
                  Virtual Account berhasil
                  dibuat
                </p>

                {/* BANK */}
                <p className="mt-3 text-xs text-blue-700">
                  Bank
                </p>

                <p className="font-bold text-blue-900">
                  {resultData.bank}
                </p>

                {/* VA */}
                <p className="mt-3 text-xs text-blue-700">
                  Nomor Virtual Account
                </p>

                <p className="text-xl font-bold tracking-wide text-blue-900">
                  {resultData.va_number}
                </p>

                {/* TOTAL */}
                {resultData.gross_amount != null && (
                  <>
                    <p className="mt-3 text-xs text-blue-700">
                      Total pembayaran
                    </p>

                    <p className="font-bold text-blue-900">
                      Rp{" "}
                      {Number(
                        resultData.gross_amount
                      ).toLocaleString("id-ID")}
                    </p>
                  </>
                )}

                {/* ORDER ID */}
                {resultData.order_id && (
                  <>
                    <p className="mt-3 text-xs text-blue-700">
                      Order ID
                    </p>

                    <p className="break-all font-semibold text-blue-900">
                      {resultData.order_id}
                    </p>
                  </>
                )}

              </div>
            )}

          {/* BACK */}
          <div className="mt-6 text-center">
            <a
              href="/daftar"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              ← Kembali ke pendaftaran
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}