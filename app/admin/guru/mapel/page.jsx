"use client";

import { useState, useMemo } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { Search, Filter, BookMarked, Pencil, Trash2, Users, Layers, Clock } from "lucide-react";

/**
 * app/admin/guru/mapel/page.jsx
 *
 * Halaman Mapel — daftar mata pelajaran, rumpun, guru pengampu, kelas yang
 * diajar, alokasi jam/minggu, dan status aktif/nonaktif.
 *
 * Skema warna memakai biru brand SmartSchool (#155DFC), yang sama dengan
 * warna teks "School" di logo sidebar, supaya konsisten dengan identitas
 * aplikasi,
 * bukan biru/indigo terang seperti halaman Nilai.
 *
 * CATATAN DATA:
 * MOCK_MAPEL di bawah masih dummy. Kalau nanti nyambung ke API, tinggal
 * ganti MOCK_MAPEL dengan hasil fetch yang bentuknya sama.
 */

const MOCK_MAPEL = [
  {
    id: 1,
    kode: "MTK-01",
    nama: "Matematika",
    rumpun: "Eksakta",
    guru: "Siti Rahayu, S.Pd",
    kelas: ["7A", "7B", "8A"],
    jamPerMinggu: 6,
    status: "aktif",
  },
  {
    id: 2,
    kode: "BIN-01",
    nama: "Bahasa Indonesia",
    rumpun: "Bahasa",
    guru: "Andi Prasetyo, S.Pd",
    kelas: ["7A", "7B", "7C"],
    jamPerMinggu: 5,
    status: "aktif",
  },
  {
    id: 3,
    kode: "IPA-01",
    nama: "Ilmu Pengetahuan Alam",
    rumpun: "Eksakta",
    guru: "Dewi Anggraini, S.Si",
    kelas: ["8A", "8B"],
    jamPerMinggu: 5,
    status: "aktif",
  },
  {
    id: 4,
    kode: "IPS-01",
    nama: "Ilmu Pengetahuan Sosial",
    rumpun: "Sosial",
    guru: "Budi Santoso, S.Pd",
    kelas: ["9A", "9B", "9C"],
    jamPerMinggu: 4,
    status: "aktif",
  },
  {
    id: 5,
    kode: "ING-01",
    nama: "Bahasa Inggris",
    rumpun: "Bahasa",
    guru: "Maria Christina, S.Pd",
    kelas: ["7A", "8A", "9A"],
    jamPerMinggu: 4,
    status: "aktif",
  },
  {
    id: 6,
    kode: "PJK-01",
    nama: "Pendidikan Jasmani",
    rumpun: "Olahraga",
    guru: "Rudi Hartono, S.Pd",
    kelas: ["7A", "7B", "7C", "8A"],
    jamPerMinggu: 3,
    status: "aktif",
  },
  {
    id: 7,
    kode: "SBK-01",
    nama: "Seni Budaya",
    rumpun: "Seni",
    guru: "Nina Kartika, S.Sn",
    kelas: ["8B", "8C"],
    jamPerMinggu: 2,
    status: "nonaktif",
  },
  {
    id: 8,
    kode: "PAI-01",
    nama: "Pendidikan Agama Islam",
    rumpun: "Agama",
    guru: "H. Ahmad Fauzi, S.Pd.I",
    kelas: ["7A", "8A", "9A", "9B"],
    jamPerMinggu: 3,
    status: "aktif",
  },
];

const RUMPUN_OPTIONS = ["Semua Rumpun", ...Array.from(new Set(MOCK_MAPEL.map((m) => m.rumpun))).sort()];

function StatusBadge({ status }) {
  const isActive = status === "aktif";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
        isActive
          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
          : "bg-slate-100 text-slate-500 border border-slate-200"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-slate-400"}`} />
      {isActive ? "Aktif" : "Nonaktif"}
    </span>
  );
}

export default function MapelPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [rumpunFilter, setRumpunFilter] = useState("Semua Rumpun");

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const filteredMapel = useMemo(() => {
    return MOCK_MAPEL.filter((m) => {
      const matchSearch =
        m.nama.toLowerCase().includes(search.toLowerCase()) ||
        m.guru.toLowerCase().includes(search.toLowerCase()) ||
        m.kode.toLowerCase().includes(search.toLowerCase());
      const matchRumpun = rumpunFilter === "Semua Rumpun" || m.rumpun === rumpunFilter;
      return matchSearch && matchRumpun;
    });
  }, [search, rumpunFilter]);

  const handleEdit = (mapel) => {
    console.log("Ubah mapel:", mapel.nama);
  };

  const handleDelete = (mapel) => {
    console.log("Hapus mapel:", mapel.nama);
  };

  const totalGuru = new Set(MOCK_MAPEL.map((m) => m.guru)).size;
  const totalJam = MOCK_MAPEL.reduce((sum, m) => sum + m.jamPerMinggu, 0);

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        active="guruMapel"
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
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white shadow-lg shadow-slate-900/10">
                <BookMarked size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Mapel</h1>
                <p className="text-sm text-slate-500">Kelola mata pelajaran, guru pengampu, dan jam mengajar.</p>
              </div>
            </div>

            {/* STATISTIK RINGKAS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Total Mapel</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{MOCK_MAPEL.length}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Guru Pengampu</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{totalGuru}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Jam / Minggu</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{totalJam} jam</p>
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
                  placeholder="Cari mapel, kode, atau guru pengampu..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={15} className="text-slate-400 hidden sm:block" />
                <select
                  value={rumpunFilter}
                  onChange={(e) => setRumpunFilter(e.target.value)}
                  className="text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 bg-white text-slate-800 font-medium"
                >
                  {RUMPUN_OPTIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* TABEL MAPEL */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#155DFC] to-[#0d47c9] text-white">
                      <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Kode</th>
                      <th className="text-left font-semibold px-4 py-3 min-w-[200px]">Mata Pelajaran</th>
                      <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Guru Pengampu</th>
                      <th className="text-left font-semibold px-4 py-3 min-w-[160px]">Kelas</th>
                      <th className="text-center font-semibold px-4 py-3 whitespace-nowrap">Jam / Minggu</th>
                      <th className="text-center font-semibold px-4 py-3 whitespace-nowrap">Status</th>
                      <th className="text-center font-semibold px-4 py-3 whitespace-nowrap">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMapel.map((m, idx) => (
                      <tr
                        key={m.id}
                        className={`border-b border-slate-100 last:border-0 transition-colors hover:bg-[#eaf1ff] ${
                          idx % 2 === 0 ? "bg-[#f5f8ff]" : "bg-white"
                        }`}
                      >
                        <td className="px-4 py-2.5">
                          <span className="font-mono text-xs font-medium text-[#155DFC] bg-[#eaf1ff] px-2 py-1 rounded-md">
                            {m.kode}
                          </span>
                        </td>
                        <td className="px-4 py-2.5">
                          <p className="font-semibold text-slate-900">{m.nama}</p>
                          <p className="text-xs text-slate-400">{m.rumpun}</p>
                        </td>
                        <td className="px-4 py-2.5 text-slate-700">{m.guru}</td>
                        <td className="px-4 py-2.5">
                          <div className="flex flex-wrap gap-1">
                            {m.kelas.map((k) => (
                              <span
                                key={k}
                                className="text-[11px] font-medium text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded"
                              >
                                {k}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-center text-slate-700 font-medium">{m.jamPerMinggu} jam</td>
                        <td className="px-4 py-2.5 text-center">
                          <StatusBadge status={m.status} />
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleEdit(m)}
                              title="Ubah mapel"
                              className="p-1.5 rounded-md text-[#155DFC] bg-[#eaf1ff] hover:bg-[#d6e6ff] transition-colors"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(m)}
                              title="Hapus mapel"
                              className="p-1.5 rounded-md text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredMapel.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-400">
                          Tidak ada mapel yang cocok dengan filter ini.
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