"use client";

import { useEffect, useState } from "react";
import {
  Check,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Zap,
  Rocket,
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

        console.log("DATA PAKET DARI BACKEND:", response);

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
    if (value === undefined || value === null) {
      return "Rp0";
    }

    const number = Number(value);

    if (Number.isNaN(number)) {
      return "Rp0";
    }

    if (number === 0) {
      return "Gratis";
    }

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  }

  function handlePilihPaket(item) {
    try {
      sessionStorage.setItem(
        "selected_paket_id",
        String(item.id)
      );

      sessionStorage.setItem(
        "selected_paket",
        JSON.stringify(item)
      );
    } catch (error) {
      console.error("Gagal menyimpan paket:", error);
    }

    window.location.href =
      `/onboarding/school?paketId=${encodeURIComponent(item.id)}`;
  }

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          animation: fadeUp 0.5s ease forwards;
          opacity: 0;
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

          {/* HEADER */}
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Pilih Paket yang Tepat untuk
              <span className="block text-blue-600">
                Digitalisasi Sekolah
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Solusi digital fleksibel untuk membantu sekolah mengelola
              aktivitas akademik dan operasional secara terintegrasi.
            </p>
          </div>

          {/* TRUST BADGES */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck
                size={15}
                className="text-blue-600"
              />
              <span>Data Terintegrasi</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Zap
                size={15}
                className="text-blue-600"
              />
              <span>Implementasi Mudah</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Check
                size={15}
                className="text-blue-600"
              />
              <span>Paket Fleksibel</span>
            </div>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-6 py-3 shadow-sm">
                <Loader2
                  size={18}
                  className="animate-spin text-blue-600"
                />

                <span className="text-sm text-slate-500">
                  Memuat paket...
                </span>
              </div>
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="mx-auto mt-12 max-w-xl rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-center">
              <p className="text-sm font-medium text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* EMPTY */}
          {!loading && !error && paket.length === 0 && (
            <div className="mx-auto mt-12 max-w-xl rounded-xl border border-slate-200 bg-slate-50 px-6 py-4 text-center">
              <p className="text-sm text-slate-500">
                Belum ada paket aktif yang tersedia.
              </p>
            </div>
          )}

          {/* PAKET DARI BACKEND */}
          {!loading && !error && paket.length > 0 && (
            <div
              className="
                mt-12
                grid
                grid-cols-1
                gap-6
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {paket.map((item, index) => (
                <div
                  key={item.id}
                  className="
                    animate-fade-up
                    flex
                    h-full
                    flex-col
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    shadow-sm
                    card-hover
                  "
                  style={{
                    animationDelay: `${index * 0.08}s`,
                  }}
                >
                  {/* HEADER */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">
                      {item.nama}
                    </h3>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                      <Rocket
                        size={18}
                        className="text-blue-600"
                      />
                    </div>
                  </div>

                  {/* HARGA */}
                  <div className="mt-5">
                    <p className="text-3xl font-extrabold text-slate-900">
                      {formatRupiah(item.harga)}
                    </p>

                    {item.durasi && (
                      <p className="mt-1 text-xs text-slate-400">
                        Durasi {item.durasi} hari
                      </p>
                    )}
                  </div>

                  {/* DESKRIPSI */}
                  <p className="mt-4 min-h-[72px] text-sm leading-6 text-slate-500">
                    {item.deskripsi ||
                      "Paket digitalisasi sekolah untuk mendukung kebutuhan sekolah."}
                  </p>

                  {/* BUTTON */}
                  <button
                    type="button"
                    onClick={() => handlePilihPaket(item)}
                    className="
                      mt-6
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-blue-600
                      px-4
                      py-3
                      text-sm
                      font-bold
                      text-white
                      transition
                      hover:bg-blue-700
                      hover:shadow-md
                      active:scale-[0.98]
                    "
                  >
                    {Number(item.harga) === 0
                      ? "Mulai Uji Coba"
                      : "Pilih Paket"}

                    <ArrowRight size={16} />
                  </button>

                  {/* DIVIDER */}
                  <div className="my-6 h-px bg-slate-100" />

                  {/* FITUR */}
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Fitur yang tersedia
                    </p>

                    <div className="mt-4 space-y-3">
                      {Array.isArray(item.fitur) &&
                      item.fitur.length > 0 ? (
                        item.fitur.map((fitur, fiturIndex) => (
                          <div
                            key={
                              fitur.id ||
                              `${item.id}-${fiturIndex}`
                            }
                            className="flex items-start gap-2.5"
                          >
                            <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-50">
                              <Check
                                size={11}
                                strokeWidth={3}
                                className="text-blue-600"
                              />
                            </div>

                            <span className="text-sm leading-5 text-slate-600">
                              {fitur.nama}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-slate-400">
                          Belum ada fitur
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CONSULTATION */}
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500">
              Masih bingung memilih paket?
            </p>

            <button
              type="button"
              className="
                mt-1
                inline-flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-blue-600
                hover:text-blue-700
                hover:underline
                underline-offset-2
              "
            >
              Konsultasi dengan tim kami
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </section>
    </>
  );
}