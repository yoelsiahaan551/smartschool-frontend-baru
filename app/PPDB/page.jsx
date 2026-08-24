"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  CalendarClock,
  FileCheck2,
  ClipboardList,
  Search,
  Megaphone,
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  Users,
  MapPin,
  Phone,
  Mail,
  Sparkles,
} from "lucide-react";

// ===== DUMMY DATA =====
// Catatan: ganti dengan data asli dari API/DB begitu tersedia.

// Preview singkat saja — detail lengkap ada di halaman /PPDB/jalurPendaftaran
const jalurPendaftaran = [
  {
    id: "zonasi",
    title: "Jalur Zonasi",
    desc: "Untuk calon siswa yang berdomisili dalam radius zona sekolah sesuai KK.",
    kuota: "50% kuota",
    icon: MapPin,
    color: "blue",
  },
  {
    id: "prestasi",
    title: "Jalur Prestasi",
    desc: "Untuk calon siswa dengan prestasi akademik atau non-akademik yang dibuktikan sertifikat.",
    kuota: "30% kuota",
    icon: Sparkles,
    color: "amber",
  },
  {
    id: "afirmasi",
    title: "Jalur Afirmasi",
    desc: "Untuk calon siswa dari keluarga kurang mampu atau penyandang disabilitas.",
    kuota: "15% kuota",
    icon: Users,
    color: "emerald",
  },
  {
    id: "pindahan",
    title: "Jalur Perpindahan Tugas",
    desc: "Untuk calon siswa yang mengikuti perpindahan tugas orang tua/wali.",
    kuota: "5% kuota",
    icon: FileCheck2,
    color: "rose",
  },
];

// Preview singkat saja — alur lengkap ada di halaman /PPDB/alurPendaftaran
const alurPendaftaran = [
  { id: 1, title: "Buat Akun", desc: "Daftar menggunakan NIK dan data orang tua/wali yang valid." },
  { id: 2, title: "Lengkapi Berkas", desc: "Unggah KK, akta lahir, rapor, dan dokumen pendukung jalur yang dipilih." },
  { id: 3, title: "Pilih Jalur & Sekolah", desc: "Tentukan jalur pendaftaran dan sekolah tujuan sesuai kuota yang tersedia." },
  { id: 4, title: "Cek Hasil Seleksi", desc: "Pantau status melalui halaman Cek Pendaftaran pada tanggal pengumuman." },
];

const persyaratan = [
  "Kartu Keluarga (KK) yang masih berlaku",
  "Akta kelahiran calon siswa",
  "Fotokopi rapor kelas terakhir",
  "Pas foto terbaru ukuran 3x4",
  "Dokumen pendukung sesuai jalur (prestasi/afirmasi/pindahan)",
];

const pengumumanTerbaru = [
  { id: 1, title: "Perpanjangan Waktu Pendaftaran Jalur Afirmasi", tanggal: "18 Agustus 2026" },
  { id: 2, title: "Jadwal Verifikasi Berkas Jalur Prestasi", tanggal: "15 Agustus 2026" },
  { id: 3, title: "Panduan Pengisian Formulir Online", tanggal: "10 Agustus 2026" },
];

const colorMap = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
  rose: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-200" },
};

// Item navigasi didefinisikan sekali, dipakai ulang untuk versi desktop & mobile
// supaya label, urutan, dan state aktif selalu konsisten.
const navItems = [
  { key: "beranda", label: "Beranda", type: "scroll-top" },
  { key: "jalur", label: "Jalur Pendaftaran", type: "route", href: "/PPDB/jalurPendaftaran" },
  { key: "alur", label: "Alur Pendaftaran", type: "route", href: "/PPDB/alurPendaftaran" },
  { key: "pengumuman", label: "Pengumuman", type: "route", href: "/PPDB/pengumuman" },
];

export default function PPDBLandingPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("beranda");

  const handleNavClick = (item) => {
    setActiveNav(item.key);
    setMenuOpen(false);
    if (item.type === "scroll-top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (item.type === "route") {
      router.push(item.href);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 rounded-lg bg-blue-600 text-white flex-shrink-0">
              <GraduationCap size={18} />
            </div>
            <span className="text-sm sm:text-base font-semibold text-slate-800 truncate">
              PPDB SmartSchool 2026/2027
            </span>
          </div>

          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-1 text-sm text-slate-600">
            {navItems.map((item) => {
              const isActive = activeNav === item.key;
              const commonClass = `relative px-3 py-2 font-medium transition-colors ${
                isActive ? "text-blue-600" : "hover:text-blue-600"
              }`;
              const activeUnderline = isActive && (
                <span className="absolute left-3 right-3 -bottom-[1px] h-0.5 rounded-full bg-blue-600" />
              );

              return (
                <button key={item.key} onClick={() => handleNavClick(item)} className={commonClass}>
                  {item.label}
                  {activeUnderline}
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
              const commonClass = `block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:bg-slate-50"
              }`;

              return (
                <button key={item.key} onClick={() => handleNavClick(item)} className={commonClass}>
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

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              <CalendarClock size={13} />
              Pendaftaran berlangsung sampai 20 Juni 2026
            </div>
            <h1 className="mt-4 text-2xl sm:text-3xl font-semibold text-slate-800 leading-snug">
              Penerimaan Peserta Didik Baru
              <br className="hidden sm:block" /> Tahun Ajaran 2026/2027
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl">
              Informasi lengkap seputar jadwal, jalur, syarat, dan tahapan pendaftaran siswa baru.
              Daftar secara online, pantau status seleksi kapan saja melalui halaman Cek Pendaftaran.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push("/PPDB/daftar")}
                className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition-colors"
              >
                Mulai Pendaftaran
                <ChevronRight size={15} />
              </button>
              <button
                onClick={() => router.push("/PPDB/cek-pendaftaran")}
                className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-slate-700 border border-slate-200 hover:border-slate-300 px-5 py-2.5 rounded-lg transition-colors"
              >
                <Search size={15} />
                Cek Status Pendaftaran
              </button>
            </div>
          </div>

          <div className="bg-blue-600 rounded-2xl shadow-sm p-6 sm:p-8 text-white flex flex-col justify-between">
            <div>
              <p className="text-sm text-blue-100">Total Kuota Siswa Baru</p>
              <p className="mt-1 text-3xl font-semibold">360 Siswa</p>
            </div>
            <div className="mt-6 space-y-2 text-sm text-blue-50">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="flex-shrink-0" />
                4 jalur pendaftaran tersedia
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="flex-shrink-0" />
                Pendaftaran 100% online
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="flex-shrink-0" />
                Hasil dapat dicek real-time
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JALUR PENDAFTARAN — preview, detail ada di /PPDB/jalurPendaftaran */}
      <section id="jalur" className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <ClipboardList size={16} />
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-800">Jalur Pendaftaran</h2>
          </div>
          <button
            onClick={() => router.push("/PPDB/jalurPendaftaran")}
            className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-0.5 flex-shrink-0"
          >
            Lihat detail
            <ChevronRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {jalurPendaftaran.map((j) => {
            const Icon = j.icon;
            const c = colorMap[j.color];
            return (
              <button
                key={j.id}
                onClick={() => router.push("/PPDB/jalurPendaftaran")}
                className={`text-left bg-white rounded-2xl border ${c.border} shadow-sm p-5 hover:shadow-md transition-shadow`}
              >
                <div className={`w-10 h-10 rounded-lg ${c.bg} ${c.text} flex items-center justify-center`}>
                  <Icon size={17} />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-slate-800">{j.title}</h3>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{j.desc}</p>
                <div className={`mt-3 inline-block text-[11px] font-medium ${c.text} ${c.bg} px-2.5 py-1 rounded-full`}>
                  {j.kuota}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ALUR PENDAFTARAN + PERSYARATAN — alur ringkas, detail ada di /PPDB/alurPendaftaran */}
      <section id="alur" className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-between gap-2 mb-5">
              <h2 className="text-base sm:text-lg font-semibold text-slate-800">Alur Pendaftaran</h2>
              <button
                onClick={() => router.push("/PPDB/alurPendaftaran")}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-0.5 flex-shrink-0"
              >
                Lihat detail
                <ChevronRight size={12} />
              </button>
            </div>
            <div className="space-y-5">
              {alurPendaftaran.map((a, idx) => (
                <div key={a.id} className="flex gap-4">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center">
                      {idx + 1}
                    </div>
                    {idx !== alurPendaftaran.length - 1 && <div className="w-px flex-1 bg-slate-200 mt-1" />}
                  </div>
                  <div className="pb-1">
                    <p className="text-sm font-semibold text-slate-800">{a.title}</p>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-4">Dokumen Persyaratan</h2>
            <ul className="space-y-3">
              {persyaratan.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PENGUMUMAN TERBARU — link ke /PPDB/pengumuman */}
      <section id="pengumuman" className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between gap-2 p-4 sm:p-5 border-b border-slate-100">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600 flex-shrink-0">
                <Megaphone size={16} />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-800 truncate">Pengumuman Terbaru</h3>
            </div>
            <button
              onClick={() => router.push("/PPDB/pengumuman")}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-0.5 flex-shrink-0"
            >
              Lihat semua
              <ChevronRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {pengumumanTerbaru.map((p) => (
              <button
                key={p.id}
                onClick={() => router.push("/PPDB/pengumuman")}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
              >
                <span className="text-sm font-medium text-slate-800 truncate">{p.title}</span>
                <span className="text-xs text-slate-400 flex-shrink-0">{p.tanggal}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/80 bg-white mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-600 text-white flex-shrink-0">
              <GraduationCap size={16} />
            </div>
            <span className="text-sm font-semibold text-slate-700">PPDB SmartSchool</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Phone size={13} /> (021) 555-0199
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={13} /> ppdb@smartschool.sch.id
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}   