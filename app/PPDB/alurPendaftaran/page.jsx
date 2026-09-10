"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  UserPlus,
  UploadCloud,
  ListChecks,
  Search,
  Menu,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

// ============================================================================
// INFORMASI ALUR PPDB
// ============================================================================
// BE saat ini belum menyediakan endpoint untuk mengambil data tahapan/alur PPDB.
// Karena itu data berikut hanya digunakan sebagai informasi statis pada halaman
// publik dan TIDAK dikirim/fetch ke backend.
//
// Endpoint BE yang tersedia saat ini:
// - POST /api/v1/ppdb/daftar
// - POST /api/v1/ppdb/:id/berkas
// - PATCH /api/v1/ppdb/:id/verifikasi
// - CRUD /api/v1/jalur-ppdb (khusus admin_sekolah)
// ============================================================================

const langkahPendaftaran = [
  {
    id: 1,
    title: "Buat Akun",
    waktu: "1 - 20 Juni 2026",
    icon: UserPlus,
    desc: "Daftar akun menggunakan data calon siswa dan orang tua/wali yang valid.",
    detail: [
      'Kunjungi halaman "Daftar Sekarang"',
      "Masukkan data calon siswa dan orang tua/wali dengan benar",
      "Pastikan nomor telepon dan email yang digunakan masih aktif",
    ],
    tip: "Gunakan kontak yang aktif agar informasi terkait pendaftaran dapat diterima dengan baik.",
  },
  {
    id: 2,
    title: "Lengkapi Berkas",
    waktu: "1 - 20 Juni 2026",
    icon: UploadCloud,
    desc: "Lengkapi dokumen pendaftaran sesuai persyaratan jalur yang dipilih.",
    detail: [
      "Siapkan Kartu Keluarga (KK)",
      "Siapkan Akta Kelahiran dan dokumen pendukung lainnya",
      "Upload dokumen melalui halaman pendaftaran",
    ],
    tip: "Pastikan file dokumen dapat dibaca dengan jelas dan sesuai format serta ukuran yang ditentukan.",
  },
  {
    id: 3,
    title: "Pilih Jalur & Sekolah",
    waktu: "1 - 20 Juni 2026",
    icon: ListChecks,
    desc: "Tentukan jalur PPDB dan sekolah tujuan sesuai ketentuan yang berlaku.",
    detail: [
      "Pilih salah satu jalur pendaftaran yang tersedia",
      "Pastikan sekolah tujuan sesuai dengan pilihan calon siswa",
      "Periksa kembali seluruh data sebelum mengirim pendaftaran",
    ],
    tip: "Pastikan jalur yang dipilih sesuai dengan kondisi dan dokumen calon siswa.",
  },
  {
    id: 4,
    title: "Seleksi Berkas",
    waktu: "21 - 24 Juni 2026",
    icon: Search,
    desc: "Panitia PPDB melakukan pemeriksaan terhadap data dan dokumen pendaftaran.",
    detail: [
      "Panitia memeriksa data calon siswa",
      "Panitia memeriksa kelengkapan dokumen yang telah diupload",
      "Berkas yang tidak sesuai dapat memerlukan perbaikan atau verifikasi ulang",
    ],
    tip: "Periksa informasi pendaftaran secara berkala selama proses seleksi.",
  },
  {
    id: 5,
    title: "Cek Hasil Seleksi",
    waktu: "27 Juni 2026",
    icon: CheckCircle2,
    desc: "Calon siswa dapat memeriksa hasil proses seleksi setelah pengumuman.",
    detail: [
      "Buka halaman Cek Pendaftaran",
      "Masukkan informasi pendaftaran yang diperlukan",
      "Periksa status hasil seleksi calon siswa",
    ],
    tip: "Simpan nomor pendaftaran dengan baik karena dapat diperlukan saat pengecekan status.",
  },
  {
    id: 6,
    title: "Daftar Ulang",
    waktu: "28 - 30 Juni 2026",
    icon: ChevronRight,
    desc: "Calon siswa yang dinyatakan lulus mengikuti proses daftar ulang sesuai ketentuan sekolah.",
    detail: [
      "Ikuti instruksi daftar ulang dari sekolah",
      "Siapkan dokumen asli apabila diminta",
      "Selesaikan proses daftar ulang sesuai jadwal yang ditentukan",
    ],
    tip: "Pastikan proses daftar ulang diselesaikan dalam periode yang telah ditentukan.",
  },
];

// ============================================================================
// NAVIGATION
// ============================================================================

const navItems = [
  {
    key: "beranda",
    label: "Beranda",
    href: "/PPDB",
  },
  {
    key: "jalur",
    label: "Jalur Pendaftaran",
    href: "/PPDB/jalurPendaftaran",
  },
  {
    key: "alur",
    label: "Alur Pendaftaran",
    href: "/PPDB/alurPendaftaran",
  },
  {
    key: "pengumuman",
    label: "Pengumuman",
    href: "/PPDB/pengumuman",
  },
];

export default function AlurPendaftaranPage() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const activeNav = "alur";

  const handleNavClick = (item) => {
    setMenuOpen(false);
    router.push(item.href);
  };

  const handleDaftar = () => {
    setMenuOpen(false);
    router.push("/PPDB/daftar");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ====================================================================
          NAVBAR
      ==================================================================== */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* BRAND */}
          <button
            type="button"
            onClick={() => router.push("/PPDB")}
            className="flex items-center gap-2.5 min-w-0"
          >
            <div className="p-2 rounded-lg bg-blue-600 text-white flex-shrink-0">
              <GraduationCap size={18} />
            </div>

            <span className="text-sm sm:text-base font-semibold text-slate-800 truncate">
              PPDB SmartSchool 2026/2027
            </span>
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1 text-sm text-slate-600">
            {navItems.map((item) => {
              const isActive = activeNav === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className={`relative px-3 py-2 font-medium transition-colors ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-600 hover:text-blue-600"
                  }`}
                >
                  {item.label}

                  {isActive && (
                    <span className="absolute left-3 right-3 -bottom-[1px] h-0.5 rounded-full bg-blue-600" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* DESKTOP CTA */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => router.push("/PPDB/cek-pendaftaran")}
              className="text-sm font-medium text-slate-600 hover:text-slate-800 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cek Pendaftaran
            </button>

            <button
              type="button"
              onClick={handleDaftar}
              className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
            >
              Daftar Sekarang
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors flex-shrink-0"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE NAV */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 px-4 py-3 space-y-1 bg-white">
            {navItems.map((item) => {
              const isActive = activeNav === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/PPDB/cek-pendaftaran");
                }}
                className="text-sm font-medium text-slate-600 border border-slate-200 rounded-lg py-2 hover:bg-slate-50 transition-colors"
              >
                Cek Pendaftaran
              </button>

              <button
                type="button"
                onClick={handleDaftar}
                className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2 transition-colors"
              >
                Daftar Sekarang
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ====================================================================
          CONTENT
      ==================================================================== */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* PAGE TITLE */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            <Clock size={13} />

            6 tahapan — 1 Juni s/d 30 Juni 2026
          </div>

          <h1 className="mt-3 text-xl sm:text-2xl font-semibold text-slate-800">
            Alur Pendaftaran
          </h1>

          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            Ikuti tahapan berikut secara berurutan agar proses pendaftaran
            calon siswa baru berjalan lancar.
          </p>
        </div>

        {/* ==================================================================
            TIMELINE
        ================================================================== */}
        <div className="space-y-0">
          {langkahPendaftaran.map((l, idx) => {
            const Icon = l.icon;

            const isLast =
              idx === langkahPendaftaran.length - 1;

            return (
              <div
                key={l.id}
                className="flex gap-4 sm:gap-5"
              >
                {/* RAIL */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm">
                    <Icon size={17} />
                  </div>

                  {!isLast && (
                    <div className="w-px flex-1 min-h-[2rem] bg-slate-200 my-1" />
                  )}
                </div>

                {/* CONTENT */}
                <div
                  className={`flex-1 min-w-0 ${
                    isLast ? "pb-0" : "pb-6"
                  }`}
                >
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5">
                    {/* TITLE + DATE */}
                    <div className="flex flex-wrap items-center gap-2 justify-between">
                      <p className="text-sm font-semibold text-slate-800">
                        Langkah {l.id} — {l.title}
                      </p>

                      <span className="text-[11px] font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full flex-shrink-0">
                        {l.waktu}
                      </span>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
                      {l.desc}
                    </p>

                    {/* DETAILS */}
                    <ul className="mt-3 space-y-2">
                      {l.detail.map((d, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <CheckCircle2
                            size={14}
                            className="text-emerald-500 flex-shrink-0 mt-0.5"
                          />

                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>

                    {/* TIP */}
                    <div className="mt-4 flex items-start gap-2 text-xs text-slate-500 bg-slate-50 rounded-lg p-3">
                      <AlertCircle
                        size={14}
                        className="flex-shrink-0 mt-0.5 text-amber-500"
                      />

                      <span>{l.tip}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ==================================================================
            CTA
        ================================================================== */}
        <div className="mt-8 bg-blue-600 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white">
              Siap memulai pendaftaran?
            </p>

            <p className="mt-1 text-xs text-blue-100">
              Siapkan data dan dokumen yang diperlukan sebelum melakukan
              pendaftaran.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDaftar}
            className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 px-5 py-2.5 rounded-lg transition-colors flex-shrink-0"
          >
            Mulai Pendaftaran
            <ChevronRight size={15} />
          </button>
        </div>
      </main>
    </div>
  );
}