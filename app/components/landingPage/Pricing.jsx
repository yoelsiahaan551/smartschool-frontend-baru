"use client";

import { useEffect, useState } from "react";
import {
  Check,
  ArrowRight,
  Sparkles,
  Loader2,
  ShieldCheck,
  Zap,
  Crown,
  Rocket,
  Star,
} from "lucide-react";

import { getPaket } from "../../../services/paket.service";

export default function PricingSection() {
  const [paket, setPaket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPaket() {
      try {
        setLoading(true);
        setError("");
        const response = await getPaket();
        if (response?.success && Array.isArray(response.data)) {
          setPaket(response.data);
        } else {
          setPaket([]);
          setError(response?.message || "Data paket tidak tersedia.");
        }
      } catch (error) {
        console.error("Gagal mengambil paket:", error);
        setPaket([]);
        setError(
          "Gagal mengambil data paket. Pastikan backend sedang berjalan."
        );
      } finally {
        setLoading(false);
      }
    }
    loadPaket();
  }, []);

  function formatRupiah(value) {
    if (value === undefined || value === null) return "Rp0";
    const number = Number(value);
    if (Number.isNaN(number)) return "Rp0";
    if (number === 0) return "Gratis";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  }

  function handlePilihPaket(item) {
    try {
      sessionStorage.setItem("selected_paket_id", String(item.id));
      sessionStorage.setItem("selected_paket", JSON.stringify(item));
    } catch (error) {
      console.error("Gagal menyimpan paket:", error);
    }
    window.location.href =
      `/onboarding/school?paketId=${encodeURIComponent(item.id)}`;
  }

  // Label tombol berdasarkan index
  const buttonLabels = [
    "Mulai Uji Coba",
    "Konsultasi Sekarang",
    "Hubungi Tim Sales",
  ];

  return (
    <>
      {/* ANIMATION STYLES */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          0% { opacity: 0; transform: translateX(-8px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-fade-up {
          animation: fadeUp 0.6s ease forwards;
          opacity: 0;
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease forwards;
          opacity: 0;
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
          background-size: 200% auto;
          animation: shimmer 2.5s linear infinite;
        }
        .feature-item {
          animation: slideIn 0.3s ease forwards;
          opacity: 0;
        }
        .feature-item:nth-child(1) { animation-delay: 0.05s; }
        .feature-item:nth-child(2) { animation-delay: 0.10s; }
        .feature-item:nth-child(3) { animation-delay: 0.15s; }
        .feature-item:nth-child(4) { animation-delay: 0.20s; }
        .feature-item:nth-child(5) { animation-delay: 0.25s; }
        .feature-item:nth-child(6) { animation-delay: 0.30s; }
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15);
        }
        .popular-card {
          transition: all 0.3s ease;
        }
        .popular-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 25px 50px -12px rgba(79, 70, 229, 0.3);
        }
      `}</style>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="mx-auto max-w-3xl text-center animate-fade-up">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Pilih Paket yang Tepat untuk
              <span className="block text-blue-600">
                Digitalisasi Sekolah
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500 sm:text-base">
              Solusi digital fleksibel untuk membantu sekolah mengelola aktivitas
              akademik, operasional, hingga pengembangan institusi secara terintegrasi.
            </p>
          </div>

          {/* TRUST BADGES */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-blue-600" />
              <span>Data Terintegrasi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap size={14} className="text-blue-600" />
              <span>Implementasi Mudah</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check size={14} className="text-blue-600" />
              <span>Paket Fleksibel</span>
            </div>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="mt-12 flex items-center justify-center animate-fade-up">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-3 shadow-sm">
                <Loader2 size={18} className="animate-spin text-blue-600" />
                <span className="text-sm text-slate-500">Memuat paket...</span>
              </div>
            </div>
          )}

          {/* ERROR / EMPTY */}
          {!loading && error && (
            <div className="mx-auto mt-12 max-w-xl rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-center animate-fade-up">
              <p className="text-sm font-medium text-red-600">{error}</p>
            </div>
          )}
          {!loading && !error && paket.length === 0 && (
            <div className="mx-auto mt-12 max-w-xl rounded-xl border border-slate-200 bg-slate-50 px-6 py-4 text-center animate-fade-up">
              <p className="text-sm text-slate-500">Belum ada paket aktif yang tersedia.</p>
            </div>
          )}

          {/* PACKAGE GRID */}
          {!loading && !error && paket.length > 0 && (
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paket.map((item, index) => {
                // Paket populer: Professional / Premium
                const isPopular =
                  item.nama?.toLowerCase() === "professional" ||
                  item.nama?.toLowerCase() === "premium" ||
                  (item.nama?.toLowerCase() === "gratis" && index === 1);

                // Ikon
                let Icon = Rocket;
                let iconColor = "text-blue-600";
                if (index === 0) { Icon = Rocket; iconColor = "text-blue-600"; }
                if (index === 1) { Icon = Crown; iconColor = "text-white"; }
                if (index === 2) { Icon = Star; iconColor = "text-purple-600"; }

                const buttonLabel = buttonLabels[index] || "Pilih Paket";

                return (
                  <div
                    key={item.id || index}
                    className={`relative flex flex-col rounded-2xl p-6 ${
                      isPopular
                        ? "bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white popular-card shadow-xl shadow-indigo-200/40"
                        : "bg-white text-slate-900 border border-slate-200/80 card-hover shadow-sm"
                    } animate-fade-up`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* BADGE REKOMENDASI */}
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="relative inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-4 py-1 text-xs font-bold text-slate-900 shadow-lg shadow-amber-400/30">
                          <Star size={13} fill="currentColor" />
                          REKOMENDASI UTAMA
                          <span className="absolute inset-0 rounded-full overflow-hidden animate-shimmer" />
                        </span>
                      </div>
                    )}

                    {/* HEADER: Nama & Ikon */}
                    <div className="flex items-center justify-between">
                      <h3 className={`text-lg font-bold ${isPopular ? "text-white" : "text-slate-900"}`}>
                        {item.nama}
                      </h3>
                      <div className={`rounded-full p-2 ${isPopular ? "bg-white/20" : "bg-blue-50"}`}>
                        <Icon size={18} className={iconColor} />
                      </div>
                    </div>

                    {/* HARGA */}
                    <div className="mt-3">
                      <p className={`text-3xl font-extrabold ${isPopular ? "text-white" : "text-slate-900"}`}>
                        {formatRupiah(item.harga)}
                      </p>
                      {item.durasi && (
                        <p className={`text-xs ${isPopular ? "text-white/70" : "text-slate-400"}`}>
                          / {item.durasi}
                        </p>
                      )}
                      {isPopular && item.nama?.toLowerCase() === "professional" && (
                        <p className="mt-0.5 text-xs text-white/70">Rekomendasi Utama</p>
                      )}
                      {!isPopular && item.nama?.toLowerCase() === "enterprise" && (
                        <p className="mt-0.5 text-xs text-slate-400">Custom</p>
                      )}
                    </div>

                    {/* DESKRIPSI */}
                    <p className={`mt-3 text-sm leading-relaxed ${isPopular ? "text-white/90" : "text-slate-500"}`}>
                      {item.deskripsi ||
                        "Paket digitalisasi sekolah untuk mendukung kebutuhan sekolah."}
                    </p>

                    {/* TOMBOL */}
                    <button
                      type="button"
                      onClick={() => handlePilihPaket(item)}
                      className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 ${
                        isPopular
                          ? "bg-white text-blue-600 hover:bg-white/90 hover:scale-105 active:scale-95 shadow-lg shadow-white/20"
                          : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md active:scale-95"
                      }`}
                    >
                      {buttonLabel}
                      <ArrowRight size={16} />
                    </button>

                    {/* DIVIDER */}
                    <div className={`my-5 h-px ${isPopular ? "bg-white/20" : "bg-slate-100"}`} />

                    {/* FITUR */}
                    <div className="flex-1">
                      <p className={`text-xs font-semibold uppercase tracking-wider ${isPopular ? "text-white/80" : "text-slate-400"}`}>
                        Fitur yang tersedia:
                      </p>
                      <div className="mt-3 space-y-2.5">
                        {Array.isArray(item.fitur) && item.fitur.length > 0 ? (
                          item.fitur.map((fitur, fiturIndex) => (
                            <div
                              key={fitur.id || fiturIndex}
                              className="feature-item flex items-start gap-2.5"
                            >
                              <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${isPopular ? "bg-white/20" : "bg-blue-50"}`}>
                                <Check size={11} strokeWidth={3} className={isPopular ? "text-white" : "text-blue-600"} />
                              </div>
                              <span className={`text-sm leading-5 ${isPopular ? "text-white/90" : "text-slate-600"}`}>
                                {fitur.nama}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className={`text-sm ${isPopular ? "text-white/60" : "text-slate-400"}`}>
                            Belum ada fitur
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* KONSULTASI */}
          <div className="mt-12 text-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <p className="text-sm text-slate-500">Masih bingung memilih paket?</p>
            <button
              type="button"
              className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline underline-offset-2"
            >
              Konsultasi gratis dengan tim kami
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}