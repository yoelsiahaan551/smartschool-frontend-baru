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

// ===== DUMMY DATA =====
// Catatan: ganti dengan data asli dari API/DB begitu tersedia.

const langkahPendaftaran = [
  {
    id: 1,
    title: "Buat Akun",
    waktu: "1 - 20 Juni 2026",
    icon: UserPlus,
    desc: "Daftar akun menggunakan NIK calon siswa dan data orang tua/wali yang valid.",
    detail: [
      "Kunjungi halaman Daftar dan pilih \"Buat Akun Baru\"",
      "Masukkan NIK, nama lengkap calon siswa, dan nomor HP aktif orang tua/wali",
      "Verifikasi akun melalui kode OTP yang dikirim ke nomor HP terdaftar",
    ],
    tip: "Gunakan nomor HP yang aktif — semua notifikasi status pendaftaran dikirim ke nomor ini.",
  },
  {
    id: 2,
    title: "Lengkapi Berkas",
    waktu: "1 - 20 Juni 2026",
    icon: UploadCloud,
    desc: "Unggah Kartu Keluarga, akta lahir, rapor, dan dokumen pendukung sesuai jalur yang dipilih.",
    detail: [
      "Unggah dokumen wajib: KK, akta kelahiran, dan fotokopi rapor kelas terakhir",
      "Unggah dokumen pendukung jalur (prestasi/afirmasi/perpindahan) bila berlaku",
      "Pastikan file berformat JPG/PDF dengan ukuran maksimal 2MB per dokumen",
    ],
    tip: "Foto dokumen dengan pencahayaan cukup agar tidak ditolak saat verifikasi berkas.",
  },
  {
    id: 3,
    title: "Pilih Jalur & Sekolah",
    waktu: "1 - 20 Juni 2026",
    icon: ListChecks,
    desc: "Tentukan jalur pendaftaran dan sekolah tujuan sesuai kuota yang tersedia.",
    detail: [
      "Pilih salah satu jalur: Zonasi, Prestasi, Afirmasi, atau Perpindahan Tugas",
      "Pilih sekolah tujuan sesuai domisili atau kriteria jalur yang dipilih",
      "Periksa kembali seluruh data sebelum menekan tombol \"Kirim Pendaftaran\"",
    ],
    tip: "Calon siswa hanya dapat memilih satu jalur — pastikan sudah sesuai kondisi sebenarnya.",
  },
  {
    id: 4,
    title: "Seleksi Berkas",
    waktu: "21 - 24 Juni 2026",
    icon: Search,
    desc: "Panitia PPDB memverifikasi kelengkapan dan keabsahan dokumen yang diunggah.",
    detail: [
      "Panitia memeriksa kesesuaian dokumen dengan jalur yang dipilih",
      "Status sementara dapat dipantau melalui halaman Cek Pendaftaran",
      "Berkas yang kurang lengkap akan diberi notifikasi untuk perbaikan",
    ],
    tip: "Pantau notifikasi secara berkala — perbaikan berkas biasanya diberi batas waktu singkat.",
  },
  {
    id: 5,
    title: "Cek Hasil Seleksi",
    waktu: "27 Juni 2026",
    icon: CheckCircle2,
    desc: "Pantau status kelulusan melalui halaman Cek Pendaftaran pada tanggal pengumuman.",
    detail: [
      "Hasil diumumkan serentak pukul 08.00 WIB melalui halaman Cek Pendaftaran",
      "Gunakan nomor pendaftaran dan NIK untuk melihat hasil",
      "Calon siswa yang dinyatakan lulus wajib melakukan daftar ulang",
    ],
    tip: "Jika belum lulus di jalur pilihan, cek juga apakah tersedia jalur lain yang masih membuka kuota.",
  },
  {
    id: 6,
    title: "Daftar Ulang",
    waktu: "28 - 30 Juni 2026",
    icon: ChevronRight,
    desc: "Calon siswa yang dinyatakan lulus wajib konfirmasi dan menyerahkan dokumen asli.",
    detail: [
      "Konfirmasi kelulusan melalui akun pendaftaran masing-masing",
      "Serahkan dokumen asli ke sekolah tujuan sesuai jadwal yang ditentukan",
      "Calon siswa yang tidak daftar ulang dianggap mengundurkan diri",
    ],
    tip: "Datang lebih awal — daftar ulang dilayani sesuai nomor urut kedatangan.",
  },
];

// Item navigasi — konsisten dengan landing page & halaman Jalur Pendaftaran.
const navItems = [
  { key: "beranda", label: "Beranda", href: "/PPDB" },
  { key: "jalur", label: "Jalur Pendaftaran", href: "/PPDB/jalurPendaftaran" },
  { key: "alur", label: "Alur Pendaftaran", href: "/PPDB/alurPendaftaran" },
  { key: "pengumuman", label: "Pengumuman", href: "/PPDB/pengumuman" },
];

export default function AlurPendaftaranPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeNav = "alur";

  const handleNavClick = (item) => {
    setMenuOpen(false);
    router.push(item.href);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR — konsisten dengan landing page & halaman Jalur Pendaftaran */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <button onClick={() => router.push("/PPDB")} className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 rounded-lg bg-blue-600 text-white flex-shrink-0">
              <GraduationCap size={18} />
            </div>
            <span className="text-sm sm:text-base font-semibold text-slate-800 truncate">
              PPDB SmartSchool 2026/2027
            </span>
          </button>

          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-1 text-sm text-slate-600">
            {navItems.map((item) => {
              const isActive = activeNav === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item)}
                  className={`relative px-3 py-2 font-medium transition-colors ${
                    isActive ? "text-blue-600" : "hover:text-blue-600"
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

          {/* CTA — desktop */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => router.push("/PPDB/cek-pendaftaran")}
              className="text-sm font-medium text-slate-600 hover:text-slate-800 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cek Pendaftaran
            </button>
            <button
              onClick={() => router.push("/PPDB/daftar")}
              className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
            >
              Daftar Sekarang
            </button>
          </div>

          {/* Toggle — mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors flex-shrink-0"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Nav links — mobile */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 px-4 py-3 space-y-1 bg-white">
            {navItems.map((item) => {
              const isActive = activeNav === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => router.push("/PPDB/cek-pendaftaran")}
                className="text-sm font-medium text-slate-600 border border-slate-200 rounded-lg py-2"
              >
                Cek Pendaftaran
              </button>
              <button
                onClick={() => router.push("/PPDB/daftar")}
                className="text-sm font-medium text-white bg-blue-600 rounded-lg py-2"
              >
                Daftar Sekarang
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* PAGE TITLE */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            <Clock size={13} />
            6 tahapan — 1 Juni s/d 30 Juni 2026
          </div>
          <h1 className="mt-3 text-xl sm:text-2xl font-semibold text-slate-800">Alur Pendaftaran</h1>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            Ikuti tahapan berikut secara berurutan agar proses pendaftaran calon siswa baru berjalan
            lancar tanpa kendala.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="space-y-0">
          {langkahPendaftaran.map((l, idx) => {
            const Icon = l.icon;
            const isLast = idx === langkahPendaftaran.length - 1;
            return (
              <div key={l.id} className="flex gap-4 sm:gap-5">
                {/* Rail nomor + garis penghubung */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm">
                    <Icon size={17} />
                  </div>
                  {!isLast && <div className="w-px flex-1 min-h-[2rem] bg-slate-200 my-1" />}
                </div>

                {/* Konten langkah */}
                <div className={`flex-1 min-w-0 ${isLast ? "pb-0" : "pb-6"}`}>
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5">
                    <div className="flex flex-wrap items-center gap-2 justify-between">
                      <p className="text-sm font-semibold text-slate-800">
                        Langkah {l.id} — {l.title}
                      </p>
                      <span className="text-[11px] font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full flex-shrink-0">
                        {l.waktu}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{l.desc}</p>

                    <ul className="mt-3 space-y-2">
                      {l.detail.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex items-start gap-2 text-xs text-slate-500 bg-slate-50 rounded-lg p-3">
                      <AlertCircle size={14} className="flex-shrink-0 mt-0.5 text-amber-500" />
                      {l.tip}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 bg-blue-600 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white">Siap memulai pendaftaran?</p>
            <p className="mt-1 text-xs text-blue-100">
              Siapkan dokumen persyaratan sebelum membuat akun agar prosesnya lebih cepat.
            </p>
          </div>
          <button
            onClick={() => router.push("/PPDB/daftar")}
            className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 px-5 py-2.5 rounded-lg transition-colors flex-shrink-0"
          >
            Mulai Pendaftaran
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}