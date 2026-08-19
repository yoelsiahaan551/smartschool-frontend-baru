"use client";

import { useState, useMemo } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  Search,
  Filter,
  GraduationCap,
  BookOpen,
  FileText,
  X,
  Printer,
  ChevronRight,
} from "lucide-react";

/**
 * app/admin/akademik/rapor/page.jsx
 *
 * Halaman Rapor — menampilkan nilai akhir siswa per mata pelajaran
 * (Pengetahuan & Keterampilan) untuk semester berjalan, lengkap dengan
 * predikat otomatis berdasarkan KKM dan catatan wali kelas.
 *
 * CATATAN DATA:
 * MOCK_SISWA / nilai di bawah masih dummy. Kalau backend/API sudah siap,
 * tinggal ganti `useState(MOCK_SISWA)` dengan fetch ke endpoint yang sesuai —
 * bentuk data per siswa (termasuk array `nilai` per mapel) dipertahankan
 * sama supaya UI di bawah tidak perlu diubah.
 */

const KKM = 75;

const MATA_PELAJARAN = [
  "Pendidikan Agama dan Budi Pekerti",
  "Pendidikan Pancasila",
  "Bahasa Indonesia",
  "Matematika",
  "Ilmu Pengetahuan Alam",
  "Ilmu Pengetahuan Sosial",
  "Bahasa Inggris",
  "Seni Budaya",
  "PJOK",
  "Informatika",
];

const SEMESTER_OPTIONS = ["Ganjil", "Genap"];
const TAHUN_AJARAN_OPTIONS = ["2025/2026", "2026/2027"];

function getPredikat(nilai) {
  if (nilai >= 90) return { label: "A", tone: "text-emerald-600 bg-emerald-50 border-emerald-200" };
  if (nilai >= 80) return { label: "B", tone: "text-blue-600 bg-blue-50 border-blue-200" };
  if (nilai >= KKM) return { label: "C", tone: "text-amber-600 bg-amber-50 border-amber-200" };
  return { label: "D", tone: "text-rose-600 bg-rose-50 border-rose-200" };
}

// Generator nilai dummy yang konsisten per siswa (bukan acak tiap render)
function buatNilai(seed) {
  return MATA_PELAJARAN.map((mapel, i) => {
    const base = 72 + ((seed * (i + 3)) % 26); // sebaran 72–97
    const pengetahuan = base;
    const keterampilan = Math.max(70, Math.min(99, base + (((seed + i) % 5) - 2)));
    return { mapel, pengetahuan, keterampilan };
  });
}

const MOCK_SISWA = [
  {
    id: 1,
    nama: "Ahmad Fauzan Ramadhan",
    kelas: "VII-A",
    nis: "24010001",
    waliKelas: "Siti Rahmawati, S.Pd.",
    catatan: "Menunjukkan kemajuan yang baik dalam Matematika, perlu lebih aktif dalam diskusi kelompok.",
    kehadiran: { hadir: 96, sakit: 2, izin: 1, alpa: 1 },
    nilai: buatNilai(3),
  },
  {
    id: 2,
    nama: "Aisyah Putri Wulandari",
    kelas: "VII-B",
    nis: "24010002",
    waliKelas: "Budi Santoso, S.Pd.",
    catatan: "Sangat aktif dan berprestasi di bidang akademik maupun non-akademik. Pertahankan!",
    kehadiran: { hadir: 99, sakit: 0, izin: 1, alpa: 0 },
    nilai: buatNilai(7),
  },
  {
    id: 3,
    nama: "Muhammad Rizky Pratama",
    kelas: "VII-B",
    nis: "24010003",
    waliKelas: "Budi Santoso, S.Pd.",
    catatan: "Perlu meningkatkan konsistensi belajar di rumah, terutama pada mata pelajaran eksakta.",
    kehadiran: { hadir: 92, sakit: 3, izin: 2, alpa: 3 },
    nilai: buatNilai(2),
  },
  {
    id: 4,
    nama: "Dewi Anggraini",
    kelas: "VIII-A",
    nis: "24020004",
    waliKelas: "Rina Kartika, S.Pd.",
    catatan: "Kreatif dan menonjol di bidang seni. Terus kembangkan minat menulis dan bermusik.",
    kehadiran: { hadir: 98, sakit: 1, izin: 1, alpa: 0 },
    nilai: buatNilai(9),
  },
  {
    id: 5,
    nama: "Fajar Nugroho",
    kelas: "VIII-A",
    nis: "24020005",
    waliKelas: "Rina Kartika, S.Pd.",
    catatan: "Perlu bimbingan tambahan pada mata pelajaran Bahasa Inggris dan IPA.",
    kehadiran: { hadir: 90, sakit: 4, izin: 3, alpa: 3 },
    nilai: buatNilai(4),
  },
  {
    id: 6,
    nama: "Nadia Salsabila",
    kelas: "IX-A",
    nis: "24030006",
    waliKelas: "Agus Prasetyo, S.Pd.",
    catatan: "Konsisten menjadi peringkat 3 besar di kelas. Pertahankan semangat belajarnya.",
    kehadiran: { hadir: 100, sakit: 0, izin: 0, alpa: 0 },
    nilai: buatNilai(8),
  },
];

const KELAS_OPTIONS = ["Semua Kelas", ...Array.from(new Set(MOCK_SISWA.map((s) => s.kelas))).sort()];

function rataRata(nilaiArr, kunci) {
  const total = nilaiArr.reduce((sum, n) => sum + n[kunci], 0);
  return Math.round((total / nilaiArr.length) * 10) / 10;
}

export default function RaporPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [kelasFilter, setKelasFilter] = useState("Semua Kelas");
  const [semester, setSemester] = useState("Ganjil");
  const [tahunAjaran, setTahunAjaran] = useState("2025/2026");
  const [selectedSiswa, setSelectedSiswa] = useState(null);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const filteredSiswa = useMemo(() => {
    return MOCK_SISWA.filter((s) => {
      const matchSearch =
        s.nama.toLowerCase().includes(search.toLowerCase()) || s.nis.includes(search);
      const matchKelas = kelasFilter === "Semua Kelas" || s.kelas === kelasFilter;
      return matchSearch && matchKelas;
    }).sort((a, b) => a.nama.localeCompare(b.nama));
  }, [search, kelasFilter]);

  // ===== Statistik ringkas =====
  const totalSiswa = MOCK_SISWA.length;
  const rataRataSekolah =
    Math.round(
      (MOCK_SISWA.reduce((sum, s) => sum + rataRata(s.nilai, "pengetahuan"), 0) / MOCK_SISWA.length) * 10
    ) / 10;
  const siswaDiBawahKkm = MOCK_SISWA.filter((s) => rataRata(s.nilai, "pengetahuan") < KKM).length;
  const totalMapel = MATA_PELAJARAN.length;

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        active="akademikRapor"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
        role="admin"
      />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Rapor</h1>
                  <p className="text-sm text-slate-500">Nilai akhir siswa per mata pelajaran untuk semester berjalan.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white"
                >
                  {SEMESTER_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      Semester {s}
                    </option>
                  ))}
                </select>
                <select
                  value={tahunAjaran}
                  onChange={(e) => setTahunAjaran(e.target.value)}
                  className="text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white"
                >
                  {TAHUN_AJARAN_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* STATISTIK RINGKAS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                    <GraduationCap size={16} />
                  </div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Total Siswa</p>
                </div>
                <p className="text-2xl font-bold text-slate-800 mt-1">{totalSiswa}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                    <BookOpen size={16} />
                  </div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Rata-rata Sekolah</p>
                </div>
                <p className="text-2xl font-bold text-slate-800 mt-1">{rataRataSekolah}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                    <FileText size={16} />
                  </div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Di Bawah KKM</p>
                </div>
                <p className="text-2xl font-bold text-slate-800 mt-1">{siswaDiBawahKkm}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                    <BookOpen size={16} />
                  </div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Mata Pelajaran</p>
                </div>
                <p className="text-2xl font-bold text-slate-800 mt-1">{totalMapel}</p>
              </div>
            </div>

            {/* FILTER BAR */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm flex flex-col lg:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama siswa atau NIS..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Filter size={15} className="text-slate-400 hidden lg:block" />
                <select
                  value={kelasFilter}
                  onChange={(e) => setKelasFilter(e.target.value)}
                  className="text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white"
                >
                  {KELAS_OPTIONS.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* TABEL SISWA */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/60">
                      <th className="text-left font-medium text-slate-500 px-4 py-3">Siswa</th>
                      <th className="text-left font-medium text-slate-500 px-4 py-3">NIS</th>
                      <th className="text-left font-medium text-slate-500 px-4 py-3">Wali Kelas</th>
                      <th className="text-left font-medium text-slate-500 px-4 py-3">Rata-rata</th>
                      <th className="text-left font-medium text-slate-500 px-4 py-3">Predikat</th>
                      <th className="text-right font-medium text-slate-500 px-4 py-3">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSiswa.map((s) => {
                      const avg = rataRata(s.nilai, "pengetahuan");
                      const predikat = getPredikat(avg);
                      return (
                        <tr key={s.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/70 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                {s.nama
                                  .split(" ")
                                  .slice(0, 2)
                                  .map((w) => w[0])
                                  .join("")}
                              </div>
                              <div>
                                <p className="font-medium text-slate-800">{s.nama}</p>
                                <p className="text-xs text-slate-400">{s.kelas}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-600">{s.nis}</td>
                          <td className="px-4 py-3 text-slate-600">{s.waliKelas}</td>
                          <td className="px-4 py-3 text-slate-700 font-medium">{avg}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-medium px-2 py-1 rounded-md border whitespace-nowrap ${predikat.tone}`}>
                              {predikat.label}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => setSelectedSiswa(s)}
                              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                              Lihat Rapor
                              <ChevronRight size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredSiswa.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-400">
                          Tidak ada siswa yang cocok dengan filter ini.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* MODAL RAPOR */}
      {selectedSiswa && (
        <>
          <div onClick={() => setSelectedSiswa(null)} className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 sticky top-0 bg-white z-10">
                <div>
                  <h2 className="text-sm font-semibold text-slate-800">Rapor Siswa</h2>
                  <p className="text-xs text-slate-400">
                    Semester {semester} · Tahun Ajaran {tahunAjaran}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => window.print()}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                    title="Cetak"
                  >
                    <Printer size={17} />
                  </button>
                  <button
                    onClick={() => setSelectedSiswa(null)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-5">
                {/* Identitas siswa */}
                <div className="flex items-center gap-4 bg-slate-50/80 border border-slate-100 rounded-xl p-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                    {selectedSiswa.nama
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")}
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm flex-1">
                    <p className="text-slate-500">
                      Nama <span className="text-slate-800 font-medium ml-1">{selectedSiswa.nama}</span>
                    </p>
                    <p className="text-slate-500">
                      NIS <span className="text-slate-800 font-medium ml-1">{selectedSiswa.nis}</span>
                    </p>
                    <p className="text-slate-500">
                      Kelas <span className="text-slate-800 font-medium ml-1">{selectedSiswa.kelas}</span>
                    </p>
                    <p className="text-slate-500">
                      Wali Kelas <span className="text-slate-800 font-medium ml-1">{selectedSiswa.waliKelas}</span>
                    </p>
                  </div>
                </div>

                {/* Tabel nilai per mapel */}
                <div className="border border-slate-100 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/60">
                        <th className="text-left font-medium text-slate-500 px-3 py-2.5">Mata Pelajaran</th>
                        <th className="text-center font-medium text-slate-500 px-3 py-2.5">Pengetahuan</th>
                        <th className="text-center font-medium text-slate-500 px-3 py-2.5">Keterampilan</th>
                        <th className="text-center font-medium text-slate-500 px-3 py-2.5">Predikat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedSiswa.nilai.map((n) => {
                        const predikat = getPredikat(n.pengetahuan);
                        return (
                          <tr key={n.mapel} className="border-b border-slate-50 last:border-0">
                            <td className="px-3 py-2.5 text-slate-700">{n.mapel}</td>
                            <td className="px-3 py-2.5 text-center text-slate-700 font-medium">{n.pengetahuan}</td>
                            <td className="px-3 py-2.5 text-center text-slate-700 font-medium">{n.keterampilan}</td>
                            <td className="px-3 py-2.5 text-center">
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-md border whitespace-nowrap ${predikat.tone}`}>
                                {predikat.label}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-50/60 border-t border-slate-100">
                        <td className="px-3 py-2.5 font-semibold text-slate-700">Rata-rata</td>
                        <td className="px-3 py-2.5 text-center font-semibold text-slate-800">
                          {rataRata(selectedSiswa.nilai, "pengetahuan")}
                        </td>
                        <td className="px-3 py-2.5 text-center font-semibold text-slate-800">
                          {rataRata(selectedSiswa.nilai, "keterampilan")}
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-md border whitespace-nowrap ${
                              getPredikat(rataRata(selectedSiswa.nilai, "pengetahuan")).tone
                            }`}
                          >
                            {getPredikat(rataRata(selectedSiswa.nilai, "pengetahuan")).label}
                          </span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Kehadiran */}
                <div>
                  <p className="text-xs font-medium text-slate-600 mb-2">Ketidakhadiran</p>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-slate-50/80 border border-slate-100 rounded-lg px-3 py-2 text-center">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Hadir</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedSiswa.kehadiran.hadir}%</p>
                    </div>
                    <div className="bg-slate-50/80 border border-slate-100 rounded-lg px-3 py-2 text-center">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Sakit</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedSiswa.kehadiran.sakit}</p>
                    </div>
                    <div className="bg-slate-50/80 border border-slate-100 rounded-lg px-3 py-2 text-center">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Izin</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedSiswa.kehadiran.izin}</p>
                    </div>
                    <div className="bg-slate-50/80 border border-slate-100 rounded-lg px-3 py-2 text-center">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Alpa</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedSiswa.kehadiran.alpa}</p>
                    </div>
                  </div>
                </div>

                {/* Catatan wali kelas */}
                <div>
                  <p className="text-xs font-medium text-slate-600 mb-1.5">Catatan Wali Kelas</p>
                  <p className="text-sm text-slate-600 bg-slate-50/80 border border-slate-100 rounded-lg p-3 leading-relaxed">
                    {selectedSiswa.catatan}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedSiswa(null)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Tutup
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-200"
                >
                  <Printer size={15} />
                  Cetak Rapor
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}