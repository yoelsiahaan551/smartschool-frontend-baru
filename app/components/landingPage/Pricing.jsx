"use client";

import { useEffect, useState } from "react";
import {
  Check,
  ArrowRight,
  Sparkles,
  Loader2,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { getPaket } from "../../../services/paket.service";

export default function PricingSection() {
  const [paket, setPaket] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * FALLBACK 4 PAKET
   *
   * Digunakan apabila backend belum mengembalikan
   * paket aktif.
   */
  const fallbackPaket = [
    {
      id: "basic",
      nama: "Basic",
      deskripsi:
        "Solusi dasar untuk membantu sekolah memulai digitalisasi.",
      harga: 299000,
      durasi: "bulan",
      fitur: [
        {
          id: "basic-1",
          nama: "Manajemen Data Sekolah",
        },
        {
          id: "basic-2",
          nama: "Manajemen Siswa",
        },
        {
          id: "basic-3",
          nama: "Manajemen Guru",
        },
        {
          id: "basic-4",
          nama: "Dashboard Sekolah",
        },
      ],
    },

    {
      id: "professional",
      nama: "Professional",
      deskripsi:
        "Paket lengkap untuk pengelolaan akademik sekolah yang lebih terintegrasi.",
      harga: 499000,
      durasi: "bulan",
      populer: true,
      fitur: [
        {
          id: "pro-1",
          nama: "Semua fitur Basic",
        },
        {
          id: "pro-2",
          nama: "Manajemen Akademik",
        },
        {
          id: "pro-3",
          nama: "Manajemen Kelas",
        },
        {
          id: "pro-4",
          nama: "Manajemen Mata Pelajaran",
        },
        {
          id: "pro-5",
          nama: "Laporan Akademik",
        },
      ],
    },

    {
      id: "enterprise",
      nama: "Enterprise",
      deskripsi:
        "Platform terintegrasi untuk sekolah dengan kebutuhan pengelolaan yang lebih luas.",
      harga: 799000,
      durasi: "bulan",
      fitur: [
        {
          id: "enterprise-1",
          nama: "Semua fitur Professional",
        },
        {
          id: "enterprise-2",
          nama: "Manajemen Keuangan",
        },
        {
          id: "enterprise-3",
          nama: "Manajemen Inventaris",
        },
        {
          id: "enterprise-4",
          nama: "Notifikasi Terintegrasi",
        },
        {
          id: "enterprise-5",
          nama: "Laporan Lengkap",
        },
        {
          id: "enterprise-6",
          nama: "Multi Pengguna",
        },
      ],
    },

    {
      id: "ultimate",
      nama: "Ultimate",
      deskripsi:
        "Solusi digital sekolah paling lengkap untuk kebutuhan institusi secara menyeluruh.",
      harga: 1299000,
      durasi: "bulan",
      fitur: [
        {
          id: "ultimate-1",
          nama: "Semua fitur Enterprise",
        },
        {
          id: "ultimate-2",
          nama: "Manajemen Sekolah Terintegrasi",
        },
        {
          id: "ultimate-3",
          nama: "Dashboard Analitik",
        },
        {
          id: "ultimate-4",
          nama: "Monitoring Sekolah",
        },
        {
          id: "ultimate-5",
          nama: "Laporan Eksekutif",
        },
        {
          id: "ultimate-6",
          nama: "Prioritas Dukungan",
        },
      ],
    },
  ];

  useEffect(() => {
    async function loadPaket() {
      try {
        setLoading(true);

        const response = await getPaket();

        /**
         * Backend kamu mengembalikan:
         *
         * {
         *   success: true,
         *   data: [...]
         * }
         */

        if (
          response?.success &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          setPaket(response.data);
        } else {
          /**
           * Kalau backend kosong,
           * tetap tampilkan 4 paket.
           */
          setPaket(fallbackPaket);
        }
      } catch (error) {
        console.error("Gagal mengambil paket:", error);

        /**
         * Backend error / belum ada paket aktif
         * → tetap tampilkan 4 paket.
         */
        setPaket(fallbackPaket);
      } finally {
        setLoading(false);
      }
    }

    loadPaket();
  }, []);

  /**
   * Format harga Indonesia
   */
  function formatRupiah(value) {
    if (value === undefined || value === null) {
      return "Rp0";
    }

    const number = Number(value);

    if (number === 0) {
      return "Gratis";
    }

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  }

  /**
   * Pilih paket
   */
  function handlePilihPaket(item) {
    /**
     * Simpan data paket sementara.
     * Ini berguna supaya halaman berikutnya
     * tetap mengetahui paket yang dipilih.
     */
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
      console.error(
        "Gagal menyimpan paket:",
        error
      );
    }

    /**
     * Pindah ke halaman onboarding.
     */
    window.location.href =
      `/onboarding/school?paketId=${encodeURIComponent(
        item.id
      )}`;
  }

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-white py-24"
    >
      {/* BACKGROUND DECORATION */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[180px] h-[320px] w-[320px] rounded-full bg-blue-100/40 blur-3xl" />

        <div className="absolute right-[-120px] bottom-[100px] h-[350px] w-[350px] rounded-full bg-indigo-100/40 blur-3xl" />

        <div className="absolute left-[30%] top-[40%] h-3 w-3 rounded-full bg-blue-100" />

        <div className="absolute right-[20%] top-[25%] h-4 w-4 rounded-full bg-blue-100" />

        <div className="absolute left-[15%] bottom-[20%] h-3 w-3 rounded-full bg-slate-100" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* HEADER */}

        <div className="mx-auto max-w-3xl text-center">
          {/* BADGE */}

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            <Sparkles size={16} />

            Pilihan Paket Digitalisasi
          </div>

          {/* TITLE */}

          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Pilih Paket yang Tepat untuk
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Digitalisasi Sekolah
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Solusi digital yang fleksibel untuk
            membantu sekolah mengelola aktivitas
            akademik, operasional, hingga
            pengembangan institusi secara lebih
            terintegrasi.
          </p>
        </div>

        {/* TRUST */}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck
              size={18}
              className="text-blue-600"
            />

            <span>Data lebih terintegrasi</span>
          </div>

          <div className="flex items-center gap-2">
            <Zap
              size={18}
              className="text-blue-600"
            />

            <span>Implementasi mudah</span>
          </div>

          <div className="flex items-center gap-2">
            <Check
              size={18}
              className="text-blue-600"
            />

            <span>Pilihan paket fleksibel</span>
          </div>
        </div>

        {/* LOADING */}

        {loading && (
          <div className="mt-14 flex items-center justify-center">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
              <Loader2
                size={20}
                className="animate-spin text-blue-600"
              />

              <span className="text-sm text-slate-500">
                Memuat paket...
              </span>
            </div>
          </div>
        )}

        {/* PACKAGE */}

        {!loading && (
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {paket.slice(0, 4).map((item, index) => {
              const isPopular =
                item.populer ||
                item.nama?.toLowerCase() ===
                  "professional";

              return (
                <div
                  key={item.id || index}
                  className={`relative flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isPopular
                      ? "border-blue-500 shadow-blue-100"
                      : "border-slate-200"
                  }`}
                >
                  {/* POPULAR */}

                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-md">
                        PALING POPULER
                      </span>
                    </div>
                  )}

                  {/* PACKAGE NUMBER */}

                  <div className="mb-5 flex items-center justify-between">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold ${
                        isPopular
                          ? "bg-blue-600 text-white"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </div>

                    {isPopular && (
                      <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                        Recommended
                      </span>
                    )}
                  </div>

                  {/* NAME */}

                  <h3 className="text-xl font-bold text-slate-900">
                    {item.nama}
                  </h3>

                  {/* DESCRIPTION */}

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-500">
                    {item.deskripsi ||
                      "Paket digitalisasi sekolah untuk mendukung kebutuhan sekolah."}
                  </p>

                  {/* PRICE */}

                  <div className="mt-6">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Mulai dari
                    </p>

                    <div className="mt-1 flex items-end gap-1">
                      <span className="text-2xl font-extrabold text-slate-900">
                        {formatRupiah(item.harga)}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-400">
                      / {item.durasi || "bulan"}
                    </p>
                  </div>

                  {/* DIVIDER */}

                  <div className="my-6 h-px bg-slate-100" />

                  {/* FEATURES */}

                  <div className="flex-1">
                    <p className="mb-4 text-sm font-bold text-slate-900">
                      Fitur yang tersedia:
                    </p>

                    <div className="space-y-3">
                      {Array.isArray(item.fitur) &&
                      item.fitur.length > 0 ? (
                        item.fitur.map(
                          (fitur, fiturIndex) => (
                            <div
                              key={
                                fitur.id ||
                                fiturIndex
                              }
                              className="flex items-start gap-2.5"
                            >
                              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50">
                                <Check
                                  size={13}
                                  strokeWidth={3}
                                  className="text-blue-600"
                                />
                              </div>

                              <span className="text-sm leading-5 text-slate-600">
                                {fitur.nama}
                              </span>
                            </div>
                          )
                        )
                      ) : (
                        <div className="text-sm text-slate-400">
                          Fitur tersedia sesuai
                          paket.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* BUTTON */}

                  <button
                    type="button"
                    onClick={() =>
                      handlePilihPaket(item)
                    }
                    className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition ${
                      isPopular
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
                        : "border border-blue-600 bg-white text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    Pilih Paket

                    <ArrowRight size={17} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* CONSULTATION */}

        <div className="mt-14 text-center">
          <p className="text-sm text-slate-500">
            Masih bingung memilih paket?
          </p>

          <button
            type="button"
            className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700"
          >
            Konsultasi gratis dengan tim kami

            <ArrowRight size={16} />
          </button>
        </div>

        {/* BOTTOM INFO */}

        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 text-center">
          <p className="text-sm leading-6 text-slate-500">
            Semua paket dirancang untuk membantu
            sekolah melakukan transformasi digital
            secara bertahap dan sesuai kebutuhan.
          </p>
        </div>
      </div>
    </section>
  );
}