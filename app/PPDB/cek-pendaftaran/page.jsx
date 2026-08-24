"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Menu,
  X,
  Search,
  IdCard,
  Hash,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  ChevronRight,
  AlertCircle,
  School,
  MapPin,
} from "lucide-react";

// ===== DUMMY DATA =====
// Catatan: ganti dengan pemanggilan API asli begitu tersedia.
// Simulasi: nomor pendaftaran "2026000123" akan mengembalikan hasil "lulus".
// Nomor lain akan mengembalikan hasil "tidak ditemukan" untuk contoh.

const contohHasil = {
  nomorPendaftaran: "2026000123",
  nama: "Andika Putra Ramadhan",
  jalur: "Jalur Zonasi",
  sekolahTujuan: "SMA Negeri 1 SmartSchool",
  status: "lulus", // "lulus" | "tidak_lulus" | "proses"
  tahapan: [
    { id: 1, label: "Pendaftaran Diterima", tanggal: "12 Juni 2026", selesai: true },
    { id: 2, label: "Verifikasi Berkas", tanggal: "22 Juni 2026", selesai: true },
    { id: 3, label: "Hasil Seleksi", tanggal: "27 Juni 2026", selesai: true },
    { id: 4, label: "Daftar Ulang", tanggal: "28 - 30 Juni 2026", selesai: false },
  ],
};

// Item navigasi — konsisten dengan halaman lain.
const navItems = [
  { key: "beranda", label: "Beranda", href: "/PPDB" },
  { key: "jalur", label: "Jalur Pendaftaran", href: "/PPDB/jalurPendaftaran" },
  { key: "alur", label: "Alur Pendaftaran", href: "/PPDB/alurPendaftaran" },
  { key: "pengumuman", label: "Pengumuman", href: "/PPDB/pengumuman" },
];

const statusConfig = {
  lulus: {
    label: "Dinyatakan Lulus",
    icon: CheckCircle2,
    text: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  tidak_lulus: {
    label: "Belum Lulus",
    icon: XCircle,
    text: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
  },
  proses: {
    label: "Masih Dalam Proses",
    icon: Clock,
    text: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
};

export default function CekPendaftaranPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [nomorPendaftaran, setNomorPendaftaran] = useState("");
  const [nik, setNik] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasil, setHasil] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const activeNav = "";

  const handleNavClick = (item) => {
    setMenuOpen(false);
    router.push(item.href);
  };

  const handleCek = (e) => {
    e.preventDefault();
    if (!nomorPendaftaran || !nik) return;

    setLoading(true);
    setHasil(null);
    setNotFound(false);

    // Simulasi pemanggilan API — ganti dengan fetch ke endpoint asli.
    setTimeout(() => {
      setLoading(false);
      if (nomorPendaftaran.trim() === contohHasil.nomorPendaftaran) {
        setHasil(contohHasil);
      } else {
        setNotFound(true);
      }
    }, 900);
  };

  const statusInfo = hasil ? statusConfig[hasil.status] : null;
  const StatusIcon = statusInfo?.icon;

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
            <button className="text-sm font-medium text-blue-600 px-3 py-2 rounded-lg bg-blue-50">
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
              <button className="text-sm font-medium text-blue-600 border border-blue-200 bg-blue-50 rounded-lg py-2">
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

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* PAGE TITLE */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            <Search size={13} />
            Layanan Cek Status
          </div>
          <h1 className="mt-3 text-xl sm:text-2xl font-semibold text-slate-800">Cek Pendaftaran</h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Masukkan nomor pendaftaran dan NIK calon siswa untuk melihat status pendaftaran terkini.
          </p>
        </div>

        {/* FORM PENCARIAN */}
        <form
          onSubmit={handleCek}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6 space-y-4"
        >
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Nomor Pendaftaran</label>
            <div className="relative">
              <Hash size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={nomorPendaftaran}
                onChange={(e) => setNomorPendaftaran(e.target.value)}
                placeholder="Contoh: 2026000123"
                className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block">NIK Calon Siswa</label>
            <div className="relative">
              <IdCard size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                placeholder="16 digit sesuai Kartu Keluarga"
                className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed px-5 py-2.5 rounded-lg transition-colors"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Memeriksa...
              </>
            ) : (
              <>
                <Search size={15} />
                Cek Status
              </>
            )}
          </button>

          <p className="text-[11px] text-slate-500 text-center">
            Coba nomor pendaftaran <span className="font-semibold text-slate-700">2026000123</span> untuk melihat contoh hasil.
          </p>
        </form>

        {/* HASIL — TIDAK DITEMUKAN */}
        {notFound && (
          <div className="mt-5 flex items-start gap-3 bg-white border border-amber-200 rounded-2xl p-4 sm:p-5">
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 flex-shrink-0">
              <AlertCircle size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Data tidak ditemukan</p>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Pastikan nomor pendaftaran dan NIK yang dimasukkan sudah benar. Jika masalah berlanjut,
                hubungi panitia PPDB melalui kontak yang tertera di halaman utama.
              </p>
            </div>
          </div>
        )}

        {/* HASIL — DITEMUKAN */}
        {hasil && statusInfo && (
          <div className="mt-5 space-y-4">
            {/* Ringkasan status */}
            <div className={`bg-white rounded-2xl border ${statusInfo.border} shadow-sm p-5 sm:p-6`}>
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-xs text-slate-500">Nomor Pendaftaran</p>
                  <p className="text-sm font-semibold text-slate-800">{hasil.nomorPendaftaran}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-medium ${statusInfo.text} ${statusInfo.bg} px-3 py-1.5 rounded-full`}
                >
                  <StatusIcon size={14} />
                  {statusInfo.label}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm text-slate-800">
                  <span className="text-slate-500 w-28 flex-shrink-0">Nama</span>
                  <span className="font-medium">{hasil.nama}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-800">
                  <MapPin size={14} className="text-slate-500 flex-shrink-0" />
                  <span className="text-slate-500 w-24 flex-shrink-0">Jalur</span>
                  <span className="font-medium">{hasil.jalur}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-800">
                  <School size={14} className="text-slate-500 flex-shrink-0" />
                  <span className="text-slate-500 w-24 flex-shrink-0">Sekolah</span>
                  <span className="font-medium">{hasil.sekolahTujuan}</span>
                </div>
              </div>
            </div>

            {/* Progress tahapan */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6">
              <h2 className="text-sm font-semibold text-slate-800 mb-4">Progres Tahapan</h2>
              <div className="space-y-0">
                {hasil.tahapan.map((t, idx) => {
                  const isLast = idx === hasil.tahapan.length - 1;
                  return (
                    <div key={t.id} className="flex gap-3">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            t.selesai ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {t.selesai ? <CheckCircle2 size={14} /> : <Clock size={13} />}
                        </div>
                        {!isLast && (
                          <div className={`w-px flex-1 min-h-[1.5rem] my-0.5 ${t.selesai ? "bg-emerald-300" : "bg-slate-200"}`} />
                        )}
                      </div>
                      <div className={isLast ? "pb-0" : "pb-4"}>
                        <p className={`text-sm font-medium ${t.selesai ? "text-slate-800" : "text-slate-500"}`}>
                          {t.label}
                        </p>
                        <p className="text-xs text-slate-500">{t.tanggal}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {hasil.status === "lulus" && (
              <button
                onClick={() => router.push("/PPDB/daftar-ulang")}
                className="w-full inline-flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition-colors"
              >
                Lanjutkan ke Daftar Ulang
                <ChevronRight size={15} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}