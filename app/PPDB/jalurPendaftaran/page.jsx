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
  CalendarDays,
} from "lucide-react";

/*
|--------------------------------------------------------------------------
| DATA INFORMASI JALUR
|--------------------------------------------------------------------------
| BE saat ini mempunyai model JalurPpdb dengan field:
| - id
| - sekolahId
| - nama
| - deskripsi
| - kuota
| - tanggalMulai
| - tanggalSelesai
| - status
|
| Endpoint GET /api/v1/jalur-ppdb tersedia untuk admin_sekolah,
| bukan untuk halaman publik PPDB.
|
| Karena itu halaman publik ini tidak melakukan fetch ke endpoint
| tersebut dan tidak membuat endpoint baru.
|
| Data di bawah hanya digunakan sebagai informasi tampilan publik.
|--------------------------------------------------------------------------
*/

const jalurPendaftaran = [
  {
    id: "zonasi",
    title: "Jalur Zonasi",
    desc: "Untuk calon siswa yang berdomisili dalam radius zona sekolah sesuai Kartu Keluarga.",
    kuota: "50% kuota",
    icon: MapPin,
    color: "blue",
    syarat: [
      "Berdomisili dalam zona sekolah sesuai ketentuan yang berlaku",
      "Usia sesuai ketentuan jenjang pendidikan",
      "Data domisili dapat dibuktikan dengan dokumen kependudukan",
    ],
    dokumen: [
      "Kartu Keluarga (KK)",
      "Akta Kelahiran",
      "Fotokopi Rapor Kelas Terakhir",
    ],
  },
  {
    id: "prestasi",
    title: "Jalur Prestasi",
    desc: "Untuk calon siswa dengan prestasi akademik atau non-akademik yang dibuktikan dengan dokumen pendukung.",
    kuota: "30% kuota",
    icon: Sparkles,
    color: "amber",
    syarat: [
      "Memiliki prestasi akademik atau non-akademik",
      "Prestasi dibuktikan dengan sertifikat atau piagam",
      "Dokumen prestasi harus dapat diverifikasi",
    ],
    dokumen: [
      "Kartu Keluarga (KK)",
      "Sertifikat/Piagam Prestasi",
      "Fotokopi Rapor Kelas Terakhir",
    ],
  },
  {
    id: "afirmasi",
    title: "Jalur Afirmasi",
    desc: "Untuk calon siswa yang memenuhi kriteria afirmasi sesuai ketentuan penerimaan peserta didik baru.",
    kuota: "15% kuota",
    icon: Users,
    color: "emerald",
    syarat: [
      "Memenuhi ketentuan jalur afirmasi",
      "Menyertakan dokumen pendukung sesuai kondisi calon siswa",
      "Data calon siswa dapat diverifikasi",
    ],
    dokumen: [
      "Kartu Keluarga (KK)",
      "Dokumen pendukung afirmasi",
      "Fotokopi Rapor",
    ],
  },
  {
    id: "pindahan",
    title: "Jalur Perpindahan Tugas",
    desc: "Untuk calon siswa yang mengikuti perpindahan tugas orang tua atau wali.",
    kuota: "5% kuota",
    icon: FileCheck2,
    color: "rose",
    syarat: [
      "Orang tua/wali memiliki dokumen perpindahan tugas resmi",
      "Perpindahan tugas dapat dibuktikan dengan dokumen yang sah",
      "Data calon siswa dapat diverifikasi oleh sekolah",
    ],
    dokumen: [
      "Kartu Keluarga (KK)",
      "Surat Tugas/Perpindahan Kerja Orang Tua",
      "Fotokopi Rapor Kelas Terakhir",
    ],
  },
];

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-200",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
  },
  rose: {
    bg: "bg-rose-50",
    text: "text-rose-600",
    border: "border-rose-200",
  },
};

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

export default function JalurPendaftaranPage() {
  const router = useRouter();

  const [openId, setOpenId] = useState("zonasi");
  const [menuOpen, setMenuOpen] = useState(false);

  const activeNav = "jalur";

  const handleNavClick = (item) => {
    setMenuOpen(false);
    router.push(item.href);
  };

  const handleDaftar = () => {
    /*
     * Jangan mengirim:
     * ?jalurPpdbId=zonasi
     *
     * karena "zonasi" bukan UUID JalurPpdb di database.
     *
     * ID JalurPpdb yang benar hanya bisa berasal dari data database.
     */
    router.push("/PPDB/daftar");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ================================================================
          NAVBAR
      ================================================================ */}
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

        {/* MOBILE MENU */}
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

      {/* ================================================================
          CONTENT
      ================================================================ */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* PAGE TITLE */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            <CheckCircle2 size={13} />

            4 jalur tersedia
          </div>

          <h1 className="mt-3 text-xl sm:text-2xl font-semibold text-slate-800">
            Jalur Pendaftaran
          </h1>

          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            Pilih jalur yang sesuai dengan kondisi calon siswa. Setiap jalur
            memiliki ketentuan dan dokumen pendukung yang berbeda.
          </p>
        </div>

        {/* ================================================================
            JALUR ACCORDION
        ================================================================ */}
        <div className="space-y-3">
          {jalurPendaftaran.map((j) => {
            const Icon = j.icon;
            const c = colorMap[j.color];

            const isOpen = openId === j.id;

            return (
              <div
                key={j.id}
                className={`bg-white rounded-2xl border ${c.border} shadow-sm overflow-hidden`}
              >
                {/* HEADER */}
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : j.id)}
                  className="w-full flex items-center gap-3 p-4 sm:p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${c.bg} ${c.text} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon size={17} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">
                      {j.title}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500 truncate">
                      {j.desc}
                    </p>
                  </div>

                  <span
                    className={`hidden sm:inline-block text-[11px] font-medium ${c.text} ${c.bg} px-2.5 py-1 rounded-full flex-shrink-0`}
                  >
                    {j.kuota}
                  </span>

                  <ChevronDown
                    size={16}
                    className={`text-slate-400 flex-shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* DETAIL */}
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100">
                    {/* KUOTA MOBILE */}
                    <span
                      className={`sm:hidden inline-block mb-3 text-[11px] font-medium ${c.text} ${c.bg} px-2.5 py-1 rounded-full`}
                    >
                      {j.kuota}
                    </span>

                    {/* DESCRIPTION */}
                    <div className="mb-5">
                      <p className="text-xs font-semibold text-slate-600 mb-2">
                        Tentang Jalur
                      </p>

                      <p className="text-sm text-slate-500 leading-relaxed">
                        {j.desc}
                      </p>
                    </div>

                    {/* SYARAT */}
                    <div className="mb-5">
                      <p className="text-xs font-semibold text-slate-600 mb-2">
                        Syarat Umum
                      </p>

                      <ul className="space-y-2">
                        {j.syarat.map((s, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-slate-600"
                          >
                            <CheckCircle2
                              size={14}
                              className="text-emerald-500 flex-shrink-0 mt-0.5"
                            />

                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* DOKUMEN */}
                    <div className="mb-5">
                      <p className="text-xs font-semibold text-slate-600 mb-2">
                        Dokumen Pendukung
                      </p>

                      <ul className="space-y-2">
                        {j.dokumen.map((d, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-slate-600"
                          >
                            <FileCheck2
                              size={14}
                              className={`${c.text} flex-shrink-0 mt-0.5`}
                            />

                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <button
                      type="button"
                      onClick={handleDaftar}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
                    >
                      Daftar Sekarang
                      <ChevronRight size={15} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ================================================================
            INFO
        ================================================================ */}
        <div className="mt-5 flex items-start gap-2 text-xs text-slate-500 bg-white border border-slate-200/80 rounded-xl p-4">
          <Info
            size={14}
            className="flex-shrink-0 mt-0.5 text-blue-500"
          />

          <span className="leading-relaxed">
            Informasi kuota dan ketentuan jalur pada halaman publik mengikuti
            informasi PPDB yang ditampilkan sekolah. Pada saat pendaftaran,
            data yang dikirim ke sistem harus menggunakan ID jalur PPDB yang
            valid dari database.
          </span>
        </div>
      </main>

      {/* ================================================================
          FOOTER
      ================================================================ */}
      <footer className="border-t border-slate-200/80 bg-white mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-600 text-white flex-shrink-0">
              <GraduationCap size={16} />
            </div>

            <span className="text-sm font-semibold text-slate-700">
              PPDB SmartSchool
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <CalendarDays size={13} />
            Tahun Ajaran 2026/2027
          </div>
        </div>
      </footer>
    </div>
  );
}