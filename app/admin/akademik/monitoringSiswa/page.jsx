"use client";

import { useState, useMemo } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { Search, Filter, Users, CalendarCheck, TrendingUp } from "lucide-react";

/**
 * app/admin/akademik/monitoringSiswa/page.jsx
 *
 * Halaman monitoring siswa — ditampilkan dalam bentuk tabel sederhana.
 * Kehadiran ditampilkan sebagai jumlah hari hadir dari total hari efektif.
 * Nilai ditampilkan sebagai persentase keseluruhan (2 angka desimal),
 * dihitung dari total poin yang didapat siswa terhadap total poin maksimum
 * seluruh mata pelajaran.
 *
 * CATATAN DATA:
 * Data di bawah ini (MOCK_SISWA) masih dummy untuk keperluan tampilan.
 * Kalau backend/API sudah siap, tinggal ganti `useState(MOCK_SISWA)` dengan
 * fetch ke endpoint yang sesuai — field `totalPoin` dan `maksimalPoin`
 * dipertahankan supaya perhitungan persentase nilai tetap konsisten.
 */

const MOCK_SISWA = [
  {
    id: 1,
    nama: "Ahmad Fauzan Ramadhan",
    nis: "2024001",
    kelas: "VII-A",
    hariHadir: 24,
    totalHari: 25,
    totalPoin: 443,
    maksimalPoin: 500,
  },
  {
    id: 2,
    nama: "Siti Nur Halimah",
    nis: "2024002",
    kelas: "VII-A",
    hariHadir: 18,
    totalHari: 25,
    totalPoin: 338,
    maksimalPoin: 500,
  },
  {
    id: 3,
    nama: "Muhammad Rizky Pratama",
    nis: "2024003",
    kelas: "VII-B",
    hariHadir: 22,
    totalHari: 25,
    totalPoin: 395,
    maksimalPoin: 500,
  },
  {
    id: 4,
    nama: "Aisyah Putri Wulandari",
    nis: "2024004",
    kelas: "VII-B",
    hariHadir: 25,
    totalHari: 25,
    totalPoin: 493,
    maksimalPoin: 500,
  },
  {
    id: 5,
    nama: "Bagus Setiawan",
    nis: "2024005",
    kelas: "VIII-A",
    hariHadir: 15,
    totalHari: 25,
    totalPoin: 290,
    maksimalPoin: 500,
  },
  {
    id: 6,
    nama: "Dewi Anggraini",
    nis: "2024006",
    kelas: "VIII-A",
    hariHadir: 23,
    totalHari: 25,
    totalPoin: 421,
    maksimalPoin: 500,
  },
];

const KELAS_OPTIONS = ["Semua Kelas", ...Array.from(new Set(MOCK_SISWA.map((s) => s.kelas))).sort()];

function getNilaiPersen(siswa) {
  return (siswa.totalPoin / siswa.maksimalPoin) * 100;
}

function getStatus(siswa) {
  const rasioHadir = siswa.hariHadir / siswa.totalHari;
  const nilaiPersen = getNilaiPersen(siswa);
  if (rasioHadir < 0.75 || nilaiPersen < 65) {
    return { label: "Perlu Perhatian", tone: "text-rose-600 bg-rose-50 border-rose-200" };
  }
  if (rasioHadir < 0.85 || nilaiPersen < 75) {
    return { label: "Perlu Dipantau", tone: "text-amber-600 bg-amber-50 border-amber-200" };
  }
  return { label: "Baik", tone: "text-emerald-600 bg-emerald-50 border-emerald-200" };
}

export default function MonitoringSiswaPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [kelasFilter, setKelasFilter] = useState("Semua Kelas");
  const [statusFilter, setStatusFilter] = useState("Semua Status");

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const filteredSiswa = useMemo(() => {
    return MOCK_SISWA.filter((s) => {
      const matchSearch =
        s.nama.toLowerCase().includes(search.toLowerCase()) || s.nis.includes(search);
      const matchKelas = kelasFilter === "Semua Kelas" || s.kelas === kelasFilter;
      const status = getStatus(s).label;
      const matchStatus = statusFilter === "Semua Status" || status === statusFilter;
      return matchSearch && matchKelas && matchStatus;
    });
  }, [search, kelasFilter, statusFilter]);

  // ===== Statistik ringkas =====
  const totalSiswa = MOCK_SISWA.length;
  const totalHadir = MOCK_SISWA.reduce((a, s) => a + s.hariHadir, 0);
  const totalHariEfektif = MOCK_SISWA.reduce((a, s) => a + s.totalHari, 0);
  const perluPerhatian = MOCK_SISWA.filter((s) => getStatus(s).label === "Perlu Perhatian").length;
  const totalPoinKeseluruhan = MOCK_SISWA.reduce((a, s) => a + s.totalPoin, 0);
  const totalMaksimalKeseluruhan = MOCK_SISWA.reduce((a, s) => a + s.maksimalPoin, 0);
  const rataNilaiPersen = (totalPoinKeseluruhan / totalMaksimalKeseluruhan) * 100;

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        active="akademikMonitoringSiswa"
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
                <Users size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Monitoring Siswa</h1>
                <p className="text-sm text-slate-500">Pantau kehadiran dan nilai siswa secara terpusat.</p>
              </div>
            </div>

            {/* STATISTIK RINGKAS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                    <Users size={16} />
                  </div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Total Siswa</p>
                </div>
                <p className="text-2xl font-bold text-slate-800 mt-1">{totalSiswa}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600">
                    <CalendarCheck size={16} />
                  </div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Total Hadir</p>
                </div>
                <p className="text-2xl font-bold text-slate-800 mt-1">
                  {totalHadir} <span className="text-sm font-medium text-slate-400">/ {totalHariEfektif} hari</span>
                </p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                    <TrendingUp size={16} />
                  </div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Rata Nilai Keseluruhan</p>
                </div>
                <p className="text-2xl font-bold text-slate-800 mt-1">{rataNilaiPersen.toFixed(2)}%</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                    <Users size={16} />
                  </div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Perlu Perhatian</p>
                </div>
                <p className="text-2xl font-bold text-slate-800 mt-1">{perluPerhatian}</p>
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
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white"
                >
                  {["Semua Status", "Baik", "Perlu Dipantau", "Perlu Perhatian"].map((s) => (
                    <option key={s} value={s}>
                      {s}
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
                      <th className="text-left font-medium text-slate-500 px-4 py-3">Nama</th>
                      <th className="text-left font-medium text-slate-500 px-4 py-3">NIS</th>
                      <th className="text-left font-medium text-slate-500 px-4 py-3">Kelas</th>
                      <th className="text-left font-medium text-slate-500 px-4 py-3">Kehadiran</th>
                      <th className="text-left font-medium text-slate-500 px-4 py-3">Nilai</th>
                      <th className="text-left font-medium text-slate-500 px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSiswa.map((s) => {
                      const status = getStatus(s);
                      return (
                        <tr
                          key={s.id}
                          className="border-b border-slate-50 last:border-0 hover:bg-slate-50/70 transition-colors"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                {s.nama
                                  .split(" ")
                                  .slice(0, 2)
                                  .map((w) => w[0])
                                  .join("")}
                              </div>
                              <p className="font-medium text-slate-800">{s.nama}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-600">{s.nis}</td>
                          <td className="px-4 py-3 text-slate-600">{s.kelas}</td>
                          <td className="px-4 py-3 text-slate-600">
                            {s.hariHadir} / {s.totalHari} hari
                          </td>
                          <td className="px-4 py-3 text-slate-600 font-medium">{getNilaiPersen(s).toFixed(2)}%</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-medium px-2 py-1 rounded-md border ${status.tone}`}>
                              {status.label}
                            </span>
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
    </div>
  );
}