"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  MapPin,
  Sparkles,
  Users,
  FileCheck2,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Info,
  Menu,
  X,
} from "lucide-react";

// ===== DUMMY DATA =====
// Catatan: ganti dengan data asli dari API/DB begitu tersedia.

const jalurPendaftaran = [
  {
    id: "zonasi",
    title: "Jalur Zonasi",
    desc: "Untuk calon siswa yang berdomisili dalam radius zona sekolah sesuai Kartu Keluarga.",
    kuota: "50% kuota",
    icon: MapPin,
    color: "blue",
    syarat: [
      "Berdomisili dalam zona sekolah minimal 1 tahun (dibuktikan KK)",
      "Usia sesuai ketentuan jenjang pendidikan",
      "Diprioritaskan berdasarkan jarak domisili ke sekolah",
    ],
    dokumen: ["Kartu Keluarga (KK)", "Akta Kelahiran", "Fotokopi Rapor Kelas Terakhir"],
  },
  {
    id: "prestasi",
    title: "Jalur Prestasi",
    desc: "Untuk calon siswa dengan prestasi akademik atau non-akademik yang dibuktikan sertifikat.",
    kuota: "30% kuota",
    icon: Sparkles,
    color: "amber",
    syarat: [
      "Memiliki sertifikat/piagam prestasi akademik atau non-akademik",
      "Prestasi diraih maksimal 3 tahun terakhir",
      "Sertifikat berjenjang minimal tingkat kabupaten/kota",
    ],
    dokumen: ["Kartu Keluarga (KK)", "Sertifikat/Piagam Prestasi Asli", "Fotokopi Rapor Kelas Terakhir"],
  },
  {
    id: "afirmasi",
    title: "Jalur Afirmasi",
    desc: "Untuk calon siswa dari keluarga kurang mampu atau penyandang disabilitas.",
    kuota: "15% kuota",
    icon: Users,
    color: "emerald",
    syarat: [
      "Terdaftar sebagai penerima program bantuan pemerintah, atau",
      "Menyandang disabilitas dibuktikan surat keterangan dokter/lembaga terkait",
      "Berdomisili dalam wilayah kabupaten/kota yang sama dengan sekolah",
    ],
    dokumen: ["Kartu Keluarga (KK)", "Kartu Program Bantuan / Surat Keterangan Disabilitas", "Fotokopi Rapor"],
  },
  {
    id: "pindahan",
    title: "Jalur Perpindahan Tugas",
    desc: "Untuk calon siswa yang mengikuti perpindahan tugas orang tua/wali.",
    kuota: "5% kuota",
    icon: FileCheck2,
    color: "rose",
    syarat: [
      "Orang tua/wali memiliki surat tugas resmi dari instansi/perusahaan",
      "Perpindahan terjadi maksimal 1 tahun terakhir",
      "Menyertakan surat keterangan pindah domisili",
    ],
    dokumen: ["Kartu Keluarga (KK)", "Surat Tugas/Perpindahan Kerja Orang Tua", "Fotokopi Rapor Kelas Terakhir"],
  },
];

const colorMap = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
  rose: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-200" },
};

// Item navigasi — sama persis dengan yang dipakai di landing page,
// tanpa "Jadwal" (sudah dihapus dari landing page).
const navItems = [
  { key: "beranda", label: "Beranda", href: "/PPDB" },
  { key: "jalur", label: "Jalur Pendaftaran", href: "/PPDB/jalurPendaftaran" },
  { key: "alur", label: "Alur Pendaftaran", href: "/PPDB/alurPendaftaran" },
  { key: "pengumuman", label: "Pengumuman", href: "/PPDB/pengumuman" },
];

export default function JalurPendaftaranPage() {
  const router = useRouter();
  const [openId, setOpenId] = useState("zonasi");
  const [menuOpen, setMenuOpen] = useState(false);
  const activeNav = "jalur";

  const handleNavClick = (item) => {
    setMenuOpen(false);
    router.push(item.href);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR — konsisten dengan landing page */}
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
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            <CheckCircle2 size={13} />
            4 jalur tersedia — total 360 kuota siswa baru
          </div>
          <h1 className="mt-3 text-xl sm:text-2xl font-semibold text-slate-800">Jalur Pendaftaran</h1>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            Pilih salah satu jalur yang paling sesuai dengan kondisi calon siswa. Setiap jalur memiliki
            syarat dan dokumen pendukung yang berbeda.
          </p>
        </div>

        {/* JALUR LIST — ACCORDION */}
        <div className="space-y-3">
          {jalurPendaftaran.map((j) => {
            const Icon = j.icon;
            const c = colorMap[j.color];
            const isOpen = openId === j.id;
            return (
              <div key={j.id} className={`bg-white rounded-2xl border ${c.border} shadow-sm overflow-hidden`}>
                <button
                  onClick={() => setOpenId(isOpen ? null : j.id)}
                  className="w-full flex items-center gap-3 p-4 sm:p-5 text-left"
                >
                  <div className={`w-10 h-10 rounded-lg ${c.bg} ${c.text} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={17} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{j.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500 truncate">{j.desc}</p>
                  </div>
                  <span className={`hidden sm:inline-block text-[11px] font-medium ${c.text} ${c.bg} px-2.5 py-1 rounded-full flex-shrink-0`}>
                    {j.kuota}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100">
                    <span className={`sm:hidden inline-block mb-3 text-[11px] font-medium ${c.text} ${c.bg} px-2.5 py-1 rounded-full`}>
                      {j.kuota}
                    </span>

                    <p className="text-xs font-semibold text-slate-600 mb-2">Syarat Khusus</p>
                    <ul className="space-y-2 mb-4">
                      {j.syarat.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-xs font-semibold text-slate-600 mb-2">Dokumen Pendukung</p>
                    <ul className="space-y-2 mb-5">
                      {j.dokumen.map((d, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                          <FileCheck2 size={14} className={`${c.text} flex-shrink-0 mt-0.5`} />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => router.push("/PPDB/daftar")}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
                    >
                      Daftar Jalur Ini
                      <ChevronRight size={15} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* INFO NOTE */}
        <div className="mt-5 flex items-start gap-2 text-xs text-slate-500 bg-white border border-slate-200/80 rounded-xl p-4">
          <Info size={14} className="flex-shrink-0 mt-0.5 text-blue-500" />
          Calon siswa hanya dapat memilih satu jalur pendaftaran. Pastikan dokumen pendukung sesuai
          jalur yang dipilih untuk mempercepat proses verifikasi.
        </div>
      </div>
    </div>
  );
}