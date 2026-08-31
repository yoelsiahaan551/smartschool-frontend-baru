"use client";

import { useState, useMemo } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { Search, Filter, CalendarClock, Printer, Trash2, Users, BookMarked, Clock } from "lucide-react";

/**
 * app/admin/guru/jadwal-mengajar/page.jsx
 *
 * Halaman Jadwal Mengajar — rekap jadwal mengajar tiap guru per hari,
 * mengikuti struktur kolom seperti halaman Nilai: No, Kode/NIP, Nama Guru,
 * Mapel, lalu satu kolom per hari (Senin-Sabtu), dan kolom Aksi di paling
 * kanan (cetak & hapus).
 *
 * Skema warna memakai biru brand SmartSchool (#155DFC), yang sama dengan
 * warna teks "School" di logo sidebar, supaya konsisten dengan identitas
 * aplikasi.
 *
 * CATATAN DATA:
 * MOCK_JADWAL di bawah masih dummy. Tiap guru punya objek `jadwal` yang
 * key-nya kode hari (lihat HARI) dan value-nya string "jam • kelas", atau
 * "-" kalau guru itu tidak mengajar di hari tersebut. Kalau nanti nyambung
 * ke API, tinggal ganti MOCK_JADWAL dengan hasil fetch yang bentuknya sama.
 */

const HARI = [
  { key: "senin", label: "Senin" },
  { key: "selasa", label: "Selasa" },
  { key: "rabu", label: "Rabu" },
  { key: "kamis", label: "Kamis" },
  { key: "jumat", label: "Jumat" },
  { key: "sabtu", label: "Sabtu" },
];

const MOCK_JADWAL = [
  {
    id: 1,
    kode: "G-0231",
    nama: "Siti Rahayu, S.Pd",
    mapel: "Matematika",
    jadwal: {
      senin: "07:00–08:30 • 7A",
      selasa: "09:00–10:30 • 8A",
      rabu: "-",
      kamis: "07:00–08:30 • 7B",
      jumat: "-",
      sabtu: "08:00–09:30 • 7A",
    },
  },
  {
    id: 2,
    kode: "G-0232",
    nama: "Andi Prasetyo, S.Pd",
    mapel: "Bahasa Indonesia",
    jadwal: {
      senin: "09:00–10:30 • 7B",
      selasa: "-",
      rabu: "07:00–08:30 • 7A",
      kamis: "-",
      jumat: "08:00–09:30 • 7C",
      sabtu: "-",
    },
  },
  {
    id: 3,
    kode: "G-0233",
    nama: "Dewi Anggraini, S.Si",
    mapel: "Ilmu Pengetahuan Alam",
    jadwal: {
      senin: "-",
      selasa: "07:00–08:30 • 8A",
      rabu: "09:00–10:30 • 8B",
      kamis: "-",
      jumat: "07:00–08:30 • 8A",
      sabtu: "-",
    },
  },
  {
    id: 4,
    kode: "G-0301",
    nama: "Budi Santoso, S.Pd",
    mapel: "Ilmu Pengetahuan Sosial",
    jadwal: {
      senin: "10:30–12:00 • 9A",
      selasa: "-",
      rabu: "-",
      kamis: "10:30–12:00 • 9B",
      jumat: "-",
      sabtu: "09:00–10:30 • 9C",
    },
  },
  {
    id: 5,
    kode: "G-0401",
    nama: "Maria Christina, S.Pd",
    mapel: "Bahasa Inggris",
    jadwal: {
      senin: "-",
      selasa: "08:00–09:30 • 7A",
      rabu: "10:30–12:00 • 8A",
      kamis: "-",
      jumat: "-",
      sabtu: "07:00–08:30 • 9A",
    },
  },
  {
    id: 6,
    kode: "G-0501",
    nama: "Rudi Hartono, S.Pd",
    mapel: "Pendidikan Jasmani",
    jadwal: {
      senin: "-",
      selasa: "-",
      rabu: "07:00–08:30 • 7A",
      kamis: "07:00–08:30 • 7B",
      jumat: "07:00–08:30 • 7C",
      sabtu: "-",
    },
  },
  {
    id: 7,
    kode: "G-0601",
    nama: "Nina Kartika, S.Sn",
    mapel: "Seni Budaya",
    jadwal: {
      senin: "-",
      selasa: "10:30–12:00 • 8B",
      rabu: "-",
      kamis: "-",
      jumat: "-",
      sabtu: "10:30–12:00 • 8C",
    },
  },
  {
    id: 8,
    kode: "G-0701",
    nama: "H. Ahmad Fauzi, S.Pd.I",
    mapel: "Pendidikan Agama Islam",
    jadwal: {
      senin: "08:00–09:30 • 7A",
      selasa: "-",
      rabu: "08:00–09:30 • 9A",
      kamis: "-",
      jumat: "09:00–10:30 • 9B",
      sabtu: "-",
    },
  },
];

const MAPEL_OPTIONS = ["Semua Mapel", ...Array.from(new Set(MOCK_JADWAL.map((g) => g.mapel))).sort()];

function getJamMengajar(guru) {
  return Object.values(guru.jadwal).filter((v) => v !== "-").length;
}

export default function JadwalMengajarPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [mapelFilter, setMapelFilter] = useState("Semua Mapel");

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const filteredGuru = useMemo(() => {
    return MOCK_JADWAL.filter((g) => {
      const matchSearch =
        g.nama.toLowerCase().includes(search.toLowerCase()) || g.kode.toLowerCase().includes(search.toLowerCase());
      const matchMapel = mapelFilter === "Semua Mapel" || g.mapel === mapelFilter;
      return matchSearch && matchMapel;
    });
  }, [search, mapelFilter]);

  const handlePrint = (guru) => {
    console.log("Cetak jadwal:", guru.nama);
  };

  const handleDelete = (guru) => {
    console.log("Hapus jadwal:", guru.nama);
  };

  const totalSlot = MOCK_JADWAL.reduce((sum, g) => sum + getJamMengajar(g), 0);

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        active="guruJadwalMengajar"
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
                <CalendarClock size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Jadwal Mengajar</h1>
                <p className="text-sm text-slate-500">Rekap jadwal mengajar tiap guru per hari.</p>
              </div>
            </div>

            {/* STATISTIK RINGKAS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Total Guru</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{MOCK_JADWAL.length}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <BookMarked size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Mapel Diampu</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{MAPEL_OPTIONS.length - 1}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Total Slot / Minggu</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{totalSlot}</p>
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
                  placeholder="Cari nama atau kode guru..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={15} className="text-slate-400 hidden sm:block" />
                <select
                  value={mapelFilter}
                  onChange={(e) => setMapelFilter(e.target.value)}
                  className="text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 bg-white text-slate-800 font-medium"
                >
                  {MAPEL_OPTIONS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* TABEL JADWAL */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#155DFC] to-[#0d47c9] text-white">
                      <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">No.</th>
                      <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Kode</th>
                      <th className="text-left font-semibold px-4 py-3 min-w-[200px]">Nama Guru</th>
                      <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Mapel</th>
                      {HARI.map((h) => (
                        <th key={h.key} className="text-center font-semibold px-4 py-3 whitespace-nowrap">
                          {h.label}
                        </th>
                      ))}
                      <th className="text-center font-semibold px-4 py-3 whitespace-nowrap">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGuru.map((g, idx) => (
                      <tr
                        key={g.id}
                        className={`border-b border-slate-100 last:border-0 transition-colors hover:bg-[#eaf1ff] ${
                          idx % 2 === 0 ? "bg-[#f5f8ff]" : "bg-white"
                        }`}
                      >
                        <td className="px-4 py-2.5 text-slate-700 font-medium">{idx + 1}</td>
                        <td className="px-4 py-2.5">
                          <span className="font-mono text-xs font-medium text-[#155DFC] bg-[#eaf1ff] px-2 py-1 rounded-md">
                            {g.kode}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-slate-900 font-semibold">{g.nama}</td>
                        <td className="px-4 py-2.5 text-slate-700">{g.mapel}</td>
                        {HARI.map((h) => {
                          const slot = g.jadwal[h.key];
                          const isKosong = slot === "-";
                          return (
                            <td key={h.key} className="px-4 py-2.5 text-center whitespace-nowrap">
                              {isKosong ? (
                                <span className="text-slate-300">-</span>
                              ) : (
                                <span className="text-xs font-medium text-slate-700">{slot}</span>
                              )}
                            </td>
                          );
                        })}
                        <td className="px-4 py-2.5">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handlePrint(g)}
                              title="Cetak jadwal"
                              className="p-1.5 rounded-md text-[#155DFC] bg-[#eaf1ff] hover:bg-[#d6e6ff] transition-colors"
                            >
                              <Printer size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(g)}
                              title="Hapus jadwal"
                              className="p-1.5 rounded-md text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredGuru.length === 0 && (
                      <tr>
                        <td colSpan={HARI.length + 5} className="px-4 py-10 text-center text-sm text-slate-400">
                          Tidak ada guru yang cocok dengan filter ini.
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