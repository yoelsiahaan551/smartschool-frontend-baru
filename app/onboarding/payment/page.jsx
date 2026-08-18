"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  CreditCard,
  ExternalLink,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function PaymentPage() {
  const [paymentUrl, setPaymentUrl] =
    useState("");

  useEffect(() => {
    const url =
      sessionStorage.getItem(
        "onboarding_payment_url"
      );

    if (!url) {
      window.location.href =
        "/onboarding/school";

      return;
    }

    setPaymentUrl(url);
  }, []);

  const handlePayment = () => {
    if (!paymentUrl) return;

    window.location.href =
      paymentUrl;
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Image
            src="/logo/logoSS.png"
            alt="SmartSchool"
            width={42}
            height={42}
          />

          <span className="font-bold text-lg text-slate-900">
            SMART{" "}
            <span className="text-blue-600">
              SCHOOL
            </span>
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-7">
          {/* PROGRESS */}

          <div className="flex justify-center items-center mb-7">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
              ✓
            </div>

            <div className="w-12 h-px bg-blue-600" />

            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
              ✓
            </div>

            <div className="w-12 h-px bg-blue-600" />

            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
              3
            </div>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard
                size={27}
                className="text-blue-600"
              />
            </div>

            <h1 className="text-xl font-bold text-slate-900">
              Pembayaran
            </h1>

            <p className="text-sm text-slate-500 mt-2 leading-6">
              Pendaftaran sekolah berhasil
              diverifikasi. Silakan lanjutkan
              pembayaran untuk mengaktifkan
              layanan SmartSchool.
            </p>
          </div>

          <div className="mt-7 bg-slate-50 rounded-xl p-4">
            <div className="flex gap-3">
              <CheckCircle2
                size={19}
                className="text-green-600 shrink-0"
              />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Data berhasil diverifikasi
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Kamu akan diarahkan ke halaman
                  pembayaran Midtrans.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePayment}
            disabled={!paymentUrl}
            className="w-full mt-6 h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
          >
            {!paymentUrl ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                Menyiapkan pembayaran...
              </>
            ) : (
              <>
                Lanjutkan Pembayaran
                <ExternalLink size={16} />
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-slate-400 mt-5 leading-5">
            Pembayaran diproses melalui
            Midtrans.
          </p>
        </div>
      </div>
    </main>
  );
}