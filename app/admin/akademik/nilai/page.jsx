"use client";

import { useState, useMemo } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { Search, Filter, NotebookPen, TrendingUp, ChevronRight } from "lucide-react";

/**
 * app/admin/akademik/nilai/page.jsx
 *
 * Halaman Nilai — menampilkan nilai siswa PER SEMESTER dalam bentuk tabel.
 * Tiap kolom semester adalah ANGKA RINGKASAN (persentase) yang sudah
 * dirata-ratakan dari seluruh tugas/penilaian di semester tersebut — bukan
 * daftar tugas satu-satu.
 *
 * Kolom paling kanan ("Total Keseluruhan") ada di luar layar pada tampilan
 * default — user perlu geser tabel ke kanan (scroll horizontal) untuk
 * melihatnya, isinya adalah rata-rata dari SEMUA semester yang ada.
 *
 * CATATAN DATA:
 * MOCK_SISWA di bawah masih dummy. Struktur `nilaiSemester` adalah array
 * angka persentase per semester (index 0 = Semester 1, dst). Kalau nanti
 * nyambung ke API, tiap elemen array ini idealnya sudah hasil kalkulasi
 * backend dari (total poin tugas semester itu / total poin maksimal
 * semester itu * 100) — jadi frontend tinggal menampilkan, tidak perlu
 * hitung ulang dari tugas mentah.
 */

const SEMESTER_LABELS = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6"];

const MOCK_SISWA = [
  {
    id: 1,
    nama: "Ahmad Fauzan Ramadhan",
    nis: "2024001",
    kelas: "VII-A",
    nilaiSemester: [88.6, 90.2, 91.0, 87.4, 89.8, 92.1],
  },
  {
    id: 2,
    nama: "Siti Nur Halimah",
    nis: "2024002",
    kelas: "VII-A",
    nilaiSemester: [67.6, 70.4, 66.2, 72.8, 69.0, 71.5],
  },
  {
    id: 3,
    nama: "Muhammad Rizky Pratama",
    nis: "2024003",
    kelas: "VII-B",
    nilaiSemester: [79.0, 81.5, 78.2, 80.6, 82.0, 79.9],
  },
  {
    id: 4,
    nama: "Aisyah Putri Wulandari",
    nis: "2024004",
    kelas: "VII-B",
    nilaiSemester: [98.6, 96.4, 97.8, 95.2, 96.9, 98.0],
  },
  {
    id: 5,
    nama: "Bagus Setiawan",
    nis: "2024005",
    kelas: "VIII-A",
    nilaiSemester: [58.0, 61.2, 55.6, 59.4, 60.1, 57.8],
  },
  {
    id: 6,
    nama: "Dewi Anggraini",
    nis: "2024006",
    kelas: "VIII-A",
    nilaiSemester: [84.2, 85.6, 83.0, 86.4, 84.8, 85.9],
  },
];

const KELAS_OPTIONS = ["Semua Kelas", ...Array.from(new Set(MOCK_SISWA.map((s) => s.kelas))).sort()];

function getTotalKeseluruhan(siswa) {
  const total = siswa.nilaiSemester.reduce((a, n) => a + n, 0);
  return total / siswa.nilaiSemester.length;
}

function getStatus(totalPersen) {
  if (totalPersen < 65) return { label: "Perlu Perhatian", tone: "text-rose-600 bg-rose-50 border-rose-200" };
  if (totalPersen < 75) return { label: "Perlu Dipantau", tone: "text-amber-600 bg-amber-50 border-amber-200" };
  return { label: "Baik", tone: "text-emerald-600 bg-emerald-50 border-emerald-200" };
}

function nilaiTextColor(n) {
  if (n < 65) return "text-rose-600";
  if (n < 75) return "text-amber-600";
  return "text-slate-700";
}

export default function NilaiPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [kelasFilter, setKelasFilter] = useState("Semua Kelas");

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const filteredSiswa = useMemo(() => {
    return MOCK_SISWA.filter((s) => {
      const matchSearch = s.nama.toLowerCase().includes(search.toLowerCase()) || s.nis.includes(search);
      const matchKelas = kelasFilter === "Semua Kelas" || s.kelas === kelasFilter;
      return matchSearch && matchKelas;
    });
  }, [search, kelasFilter]);

  // ===== Statistik ringkas =====
  const totalSiswa = MOCK_SISWA.length;
  const rataTotalKeseluruhan =
    MOCK_SISWA.reduce((a, s) => a + getTotalKeseluruhan(s), 0) / MOCK_SISWA.length;
  const siswaTertinggi = [...MOCK_SISWA].sort((a, b) => getTotalKeseluruhan(b) - getTotalKeseluruhan(a))[0];
  const siswaPerluPerhatian = MOCK_SISWA.filter((s) => getTotalKeseluruhan(s) < 65).length;

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        active="akademikNilai"
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
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
                <NotebookPen size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Nilai</h1>
                <p className="text-sm text-slate-500">
                  Ringkasan nilai siswa per semester. Geser tabel ke kanan untuk melihat total keseluruhan.
                </p>
              </div>
            </div>

            {/* STATISTIK RINGKAS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Total Siswa</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{totalSiswa}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-emerald-600" />
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                    Rata Total Keseluruhan
                  </p>
                </div>
                <p className="text-2xl font-bold text-slate-800 mt-1">{rataTotalKeseluruhan.toFixed(2)}%</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Nilai Tertinggi</p>
                <p className="text-sm font-bold text-slate-800 mt-1.5 truncate">{siswaTertinggi.nama}</p>
                <p className="text-xs text-emerald-600 font-medium mt-0.5">
                  {getTotalKeseluruhan(siswaTertinggi).toFixed(2)}%
                </p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Perlu Perhatian</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{siswaPerluPerhatian}</p>
              </div>
            </div>

            {/* FILTER BAR */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama atau NIS siswa..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={15} className="text-slate-400 hidden sm:block" />
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

            {/* PETUNJUK GESER */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 sm:hidden">
              <ChevronRight size={13} />
              Geser tabel ke kanan untuk lihat Total Keseluruhan
            </div>

            {/* TABEL NILAI PER SEMESTER */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/60">
                      <th className="text-left font-medium text-slate-500 px-4 py-3 sticky left-0 bg-slate-50/95 backdrop-blur-sm z-10 min-w-[220px]">
                        Nama
                      </th>
                      <th className="text-left font-medium text-slate-500 px-4 py-3 whitespace-nowrap">Kelas</th>
                      {SEMESTER_LABELS.map((label) => (
                        <th key={label} className="text-left font-medium text-slate-500 px-4 py-3 whitespace-nowrap">
                          {label}
                        </th>
                      ))}
                      <th className="text-left font-semibold text-blue-700 px-4 py-3 whitespace-nowrap bg-blue-50/60">
                        Total Keseluruhan
                      </th>
                      <th className="text-left font-medium text-slate-500 px-4 py-3 whitespace-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSiswa.map((s) => {
                      const total = getTotalKeseluruhan(s);
                      const status = getStatus(total);
                      return (
                        <tr key={s.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/70 transition-colors">
                          <td className="px-4 py-3 sticky left-0 bg-white z-10">
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
                                <p className="text-xs text-slate-400">NIS {s.nis}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{s.kelas}</td>
                          {s.nilaiSemester.map((n, i) => (
                            <td key={i} className={`px-4 py-3 font-medium whitespace-nowrap ${nilaiTextColor(n)}`}>
                              {n.toFixed(2)}%
                            </td>
                          ))}
                          <td className="px-4 py-3 font-bold text-blue-700 whitespace-nowrap bg-blue-50/40">
                            {total.toFixed(2)}%
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`text-xs font-medium px-2 py-1 rounded-md border ${status.tone}`}>
                              {status.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredSiswa.length === 0 && (
                      <tr>
                        <td colSpan={SEMESTER_LABELS.length + 4} className="px-4 py-10 text-center text-sm text-slate-400">
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
    </div>
  );
}