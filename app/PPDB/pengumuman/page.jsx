"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Menu,
  X,
  CalendarClock,
  Megaphone,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Clock,
  Paperclip,
} from "lucide-react";

// ===== DUMMY DATA =====
// Catatan: ganti dengan data asli dari API/DB begitu tersedia.

const jadwalPenting = [
  { id: 1, label: "Pendaftaran Dibuka", tanggal: "1 - 20 Juni 2026", status: "berjalan" },
  { id: 2, label: "Seleksi Berkas", tanggal: "21 - 24 Juni 2026", status: "mendatang" },
  { id: 3, label: "Pengumuman Hasil", tanggal: "27 Juni 2026", status: "mendatang" },
  { id: 4, label: "Daftar Ulang", tanggal: "28 - 30 Juni 2026", status: "mendatang" },
];

const kategoriList = ["Semua", "Jadwal", "Berkas", "Panduan"];

const pengumumanList = [
  {
    id: 1,
    title: "Perpanjangan Waktu Pendaftaran Jalur Afirmasi",
    tanggal: "18 Agustus 2026",
    kategori: "Jadwal",
    ringkasan: "Batas akhir pendaftaran jalur afirmasi diperpanjang sampai dengan 25 Agustus 2026.",
    isi: [
      "Sehubungan dengan masih tersedianya kuota pada jalur afirmasi, panitia PPDB memperpanjang masa pendaftaran untuk jalur ini sampai dengan tanggal 25 Agustus 2026 pukul 23.59 WIB.",
      "Calon siswa yang telah mendaftar sebelumnya tidak perlu mendaftar ulang, dan dapat langsung melanjutkan proses verifikasi berkas.",
      "Jadwal seleksi dan pengumuman hasil untuk jalur ini akan disesuaikan dan diinformasikan melalui halaman ini.",
    ],
    lampiran: "Surat Edaran Perpanjangan Jalur Afirmasi.pdf",
  },
  {
    id: 2,
    title: "Jadwal Verifikasi Berkas Jalur Prestasi",
    tanggal: "15 Agustus 2026",
    kategori: "Berkas",
    ringkasan: "Verifikasi berkas jalur prestasi dilaksanakan 20-22 Agustus 2026 secara luring di sekolah.",
    isi: [
      "Verifikasi dokumen asli untuk jalur prestasi dilaksanakan pada tanggal 20-22 Agustus 2026, pukul 08.00-14.00 WIB di sekolah tujuan masing-masing.",
      "Calon siswa wajib membawa dokumen asli beserta fotokopi yang telah diunggah pada saat pendaftaran.",
      "Ketidakhadiran pada jadwal verifikasi tanpa konfirmasi dianggap mengundurkan diri dari jalur prestasi.",
    ],
    lampiran: "Jadwal Verifikasi Jalur Prestasi.pdf",
  },
  {
    id: 3,
    title: "Panduan Pengisian Formulir Online",
    tanggal: "10 Agustus 2026",
    kategori: "Panduan",
    ringkasan: "Panduan langkah demi langkah pengisian formulir pendaftaran online untuk orang tua/wali.",
    isi: [
      "Panitia menyediakan panduan bergambar untuk membantu orang tua/wali dalam proses pembuatan akun, pengunggahan berkas, hingga pemilihan jalur dan sekolah tujuan.",
      "Panduan tersedia dalam format PDF dan dapat diunduh melalui tautan lampiran di bawah ini.",
      "Bila mengalami kendala teknis, orang tua/wali dapat menghubungi kontak yang tertera pada bagian bawah halaman.",
    ],
    lampiran: "Panduan Pengisian Formulir PPDB.pdf",
  },
  {
    id: 4,
    title: "Sosialisasi Kuota dan Jalur Pendaftaran 2026/2027",
    tanggal: "3 Agustus 2026",
    kategori: "Jadwal",
    ringkasan: "Rincian pembagian kuota 360 siswa baru ke dalam 4 jalur pendaftaran tahun ajaran ini.",
    isi: [
      "Total kuota siswa baru tahun ajaran 2026/2027 ditetapkan sebanyak 360 siswa, terbagi ke dalam jalur zonasi (50%), prestasi (30%), afirmasi (15%), dan perpindahan tugas (5%).",
      "Pembagian ini mengacu pada ketentuan dinas pendidikan setempat dan dapat berubah sesuai kondisi jumlah pendaftar pada masing-masing jalur.",
      "Rincian syarat tiap jalur dapat dilihat pada halaman Jalur Pendaftaran.",
    ],
    lampiran: "Rincian Kuota PPDB 2026-2027.pdf",
  },
];

// Item navigasi — konsisten dengan halaman lain.
const navItems = [
  { key: "beranda", label: "Beranda", href: "/PPDB" },
  { key: "jalur", label: "Jalur Pendaftaran", href: "/PPDB/jalurPendaftaran" },
  { key: "alur", label: "Alur Pendaftaran", href: "/PPDB/alurPendaftaran" },
  { key: "pengumuman", label: "Pengumuman", href: "/PPDB/pengumuman" },
];

export default function PengumumanPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [openId, setOpenId] = useState(null);
  const activeNav = "pengumuman";

  const handleNavClick = (item) => {
    setMenuOpen(false);
    router.push(item.href);
  };

  const filteredList =
    kategoriAktif === "Semua"
      ? pengumumanList
      : pengumumanList.filter((p) => p.kategori === kategoriAktif);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR — konsisten dengan halaman lain */}
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
            <Megaphone size={13} />
            {pengumumanList.length} pengumuman diterbitkan
          </div>
          <h1 className="mt-3 text-xl sm:text-2xl font-semibold text-slate-800">Pengumuman</h1>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            Informasi resmi dan jadwal terbaru seputar penerimaan peserta didik baru tahun ajaran
            2026/2027.
          </p>
        </div>

        {/* JADWAL PENTING */}
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <CalendarClock size={16} />
            </div>
            <h2 className="text-sm sm:text-base font-semibold text-slate-800">Jadwal Penting</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {jadwalPenting.map((j) => (
              <div
                key={j.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{j.label}</p>
                  <p className="mt-1 text-xs text-slate-500 flex items-center gap-1.5">
                    <Clock size={12} className="flex-shrink-0" />
                    {j.tanggal}
                  </p>
                </div>
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
                    j.status === "berjalan" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {j.status === "berjalan" ? "Berjalan" : "Mendatang"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FILTER KATEGORI */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
          {kategoriList.map((k) => {
            const isActive = kategoriAktif === k;
            return (
              <button
                key={k}
                onClick={() => setKategoriAktif(k)}
                className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                }`}
              >
                {k}
              </button>
            );
          })}
        </div>

        {/* DAFTAR PENGUMUMAN — ACCORDION */}
        <div className="space-y-3">
          {filteredList.map((p) => {
            const isOpen = openId === p.id;
            return (
              <div key={p.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenId(isOpen ? null : p.id)}
                  className="w-full flex items-start gap-3 p-4 sm:p-5 text-left"
                >
                  <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600 flex-shrink-0 mt-0.5">
                    <Megaphone size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {p.kategori}
                      </span>
                      <span className="text-xs text-slate-400">{p.tanggal}</span>
                    </div>
                    <p className="mt-1.5 text-sm font-semibold text-slate-800">{p.title}</p>
                    {!isOpen && <p className="mt-1 text-xs text-slate-500 line-clamp-1">{p.ringkasan}</p>}
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 flex-shrink-0 mt-1 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100">
                    <ul className="space-y-2.5 mb-4">
                      {p.isi.map((paragraf, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                          <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-1" />
                          <span>{paragraf}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-2 rounded-lg w-fit">
                      <Paperclip size={13} className="flex-shrink-0" />
                      {p.lampiran}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredList.length === 0 && (
            <div className="text-center text-sm text-slate-400 py-10">
              Belum ada pengumuman pada kategori ini.
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-8 bg-blue-600 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white">Belum mendaftar?</p>
            <p className="mt-1 text-xs text-blue-100">
              Jangan lewatkan jadwal pendaftaran — mulai proses pendaftaran sekarang.
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