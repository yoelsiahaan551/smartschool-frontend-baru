"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  GraduationCap,
  Plus,
  Search,
  Edit,
  Trash2,
  RefreshCw,
  Users,
  CheckCircle,
  XCircle,
  School,
  Filter,
  UserCheck,
  MapPin,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

// =========================================================
// HELPERS
// =========================================================
const STORAGE_KEY = "kelas_data";

const getDefaultKelas = () => [
  // ===== KELAS X (10 kelas) =====
  {
    id: 1,
    nama: "X RPL 1",
    jenjang: "X",
    wali_kelas: "Dr. Ahmad Fauzi, M.Pd.",
    nip_wali: "198501012010011001",
    jumlah_siswa: 32,
    ruangan: "R. 101",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  },
  {
    id: 2,
    nama: "X RPL 2",
    jenjang: "X",
    wali_kelas: "Siti Rahma, S.Pd.",
    nip_wali: "198712152011012002",
    jumlah_siswa: 30,
    ruangan: "R. 102",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  },
  {
    id: 3,
    nama: "X TKJ 1",
    jenjang: "X",
    wali_kelas: "Budi Santoso, S.Si.",
    nip_wali: "199003202012013003",
    jumlah_siswa: 28,
    ruangan: "R. 103",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  },
  {
    id: 4,
    nama: "X TKJ 2",
    jenjang: "X",
    wali_kelas: "Dewi Lestari, S.Pd.",
    nip_wali: "199105152013014004",
    jumlah_siswa: 26,
    ruangan: "R. 104",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  },
  {
    id: 5,
    nama: "X AKL 1",
    jenjang: "X",
    wali_kelas: "Eko Prasetyo, S.Pd.",
    nip_wali: "198801012010011005",
    jumlah_siswa: 25,
    ruangan: "R. 105",
    tahun_ajaran: "2026/2027",
    status: "nonaktif",
  },
  {
    id: 6,
    nama: "X AKL 2",
    jenjang: "X",
    wali_kelas: "Rina Sari, S.Pd.",
    nip_wali: "199012152011012006",
    jumlah_siswa: 24,
    ruangan: "R. 106",
    tahun_ajaran: "2025/2026",
    status: "aktif",
  },
  {
    id: 7,
    nama: "X MM 1",
    jenjang: "X",
    wali_kelas: "Agus Setiawan, S.Pd.",
    nip_wali: "198704202012013007",
    jumlah_siswa: 29,
    ruangan: "R. 107",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  },
  {
    id: 8,
    nama: "X MM 2",
    jenjang: "X",
    wali_kelas: "Sri Wahyuni, S.Pd.",
    nip_wali: "198805152013014008",
    jumlah_siswa: 27,
    ruangan: "R. 108",
    tahun_ajaran: "2025/2026",
    status: "nonaktif",
  },
  {
    id: 9,
    nama: "X BDP 1",
    jenjang: "X",
    wali_kelas: "Hendra Gunawan, S.Pd.",
    nip_wali: "198902102014015009",
    jumlah_siswa: 23,
    ruangan: "R. 109",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  },
  {
    id: 10,
    nama: "X BDP 2",
    jenjang: "X",
    wali_kelas: "Maya Sari, S.Pd.",
    nip_wali: "199106152015016010",
    jumlah_siswa: 22,
    ruangan: "R. 110",
    tahun_ajaran: "2025/2026",
    status: "aktif",
  },

  // ===== KELAS XI (10 kelas) =====
  {
    id: 11,
    nama: "XI RPL 1",
    jenjang: "XI",
    wali_kelas: "Dr. Ahmad Fauzi, M.Pd.",
    nip_wali: "198501012010011001",
    jumlah_siswa: 33,
    ruangan: "R. 201",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  },
  {
    id: 12,
    nama: "XI RPL 2",
    jenjang: "XI",
    wali_kelas: "Siti Rahma, S.Pd.",
    nip_wali: "198712152011012002",
    jumlah_siswa: 31,
    ruangan: "R. 202",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  },
  {
    id: 13,
    nama: "XI TKJ 1",
    jenjang: "XI",
    wali_kelas: "Budi Santoso, S.Si.",
    nip_wali: "199003202012013003",
    jumlah_siswa: 29,
    ruangan: "R. 203",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  },
  {
    id: 14,
    nama: "XI TKJ 2",
    jenjang: "XI",
    wali_kelas: "Dewi Lestari, S.Pd.",
    nip_wali: "199105152013014004",
    jumlah_siswa: 27,
    ruangan: "R. 204",
    tahun_ajaran: "2026/2027",
    status: "nonaktif",
  },
  {
    id: 15,
    nama: "XI AKL 1",
    jenjang: "XI",
    wali_kelas: "Eko Prasetyo, S.Pd.",
    nip_wali: "198801012010011005",
    jumlah_siswa: 26,
    ruangan: "R. 205",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  },
  {
    id: 16,
    nama: "XI AKL 2",
    jenjang: "XI",
    wali_kelas: "Rina Sari, S.Pd.",
    nip_wali: "199012152011012006",
    jumlah_siswa: 24,
    ruangan: "R. 206",
    tahun_ajaran: "2025/2026",
    status: "aktif",
  },
  {
    id: 17,
    nama: "XI MM 1",
    jenjang: "XI",
    wali_kelas: "Agus Setiawan, S.Pd.",
    nip_wali: "198704202012013007",
    jumlah_siswa: 30,
    ruangan: "R. 207",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  },
  {
    id: 18,
    nama: "XI MM 2",
    jenjang: "XI",
    wali_kelas: "Sri Wahyuni, S.Pd.",
    nip_wali: "198805152013014008",
    jumlah_siswa: 28,
    ruangan: "R. 208",
    tahun_ajaran: "2025/2026",
    status: "nonaktif",
  },
  {
    id: 19,
    nama: "XI BDP 1",
    jenjang: "XI",
    wali_kelas: "Hendra Gunawan, S.Pd.",
    nip_wali: "198902102014015009",
    jumlah_siswa: 25,
    ruangan: "R. 209",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  },
  {
    id: 20,
    nama: "XI BDP 2",
    jenjang: "XI",
    wali_kelas: "Maya Sari, S.Pd.",
    nip_wali: "199106152015016010",
    jumlah_siswa: 23,
    ruangan: "R. 210",
    tahun_ajaran: "2025/2026",
    status: "aktif",
  },

  // ===== KELAS XII (10 kelas) =====
  {
    id: 21,
    nama: "XII RPL 1",
    jenjang: "XII",
    wali_kelas: "Dr. Ahmad Fauzi, M.Pd.",
    nip_wali: "198501012010011001",
    jumlah_siswa: 35,
    ruangan: "R. 301",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  },
  {
    id: 22,
    nama: "XII RPL 2",
    jenjang: "XII",
    wali_kelas: "Siti Rahma, S.Pd.",
    nip_wali: "198712152011012002",
    jumlah_siswa: 32,
    ruangan: "R. 302",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  },
  {
    id: 23,
    nama: "XII TKJ 1",
    jenjang: "XII",
    wali_kelas: "Budi Santoso, S.Si.",
    nip_wali: "199003202012013003",
    jumlah_siswa: 30,
    ruangan: "R. 303",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  },
  {
    id: 24,
    nama: "XII TKJ 2",
    jenjang: "XII",
    wali_kelas: "Dewi Lestari, S.Pd.",
    nip_wali: "199105152013014004",
    jumlah_siswa: 28,
    ruangan: "R. 304",
    tahun_ajaran: "2026/2027",
    status: "nonaktif",
  },
  {
    id: 25,
    nama: "XII AKL 1",
    jenjang: "XII",
    wali_kelas: "Eko Prasetyo, S.Pd.",
    nip_wali: "198801012010011005",
    jumlah_siswa: 27,
    ruangan: "R. 305",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  },
  {
    id: 26,
    nama: "XII AKL 2",
    jenjang: "XII",
    wali_kelas: "Rina Sari, S.Pd.",
    nip_wali: "199012152011012006",
    jumlah_siswa: 25,
    ruangan: "R. 306",
    tahun_ajaran: "2025/2026",
    status: "aktif",
  },
  {
    id: 27,
    nama: "XII MM 1",
    jenjang: "XII",
    wali_kelas: "Agus Setiawan, S.Pd.",
    nip_wali: "198704202012013007",
    jumlah_siswa: 32,
    ruangan: "R. 307",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  },
  {
    id: 28,
    nama: "XII MM 2",
    jenjang: "XII",
    wali_kelas: "Sri Wahyuni, S.Pd.",
    nip_wali: "198805152013014008",
    jumlah_siswa: 30,
    ruangan: "R. 308",
    tahun_ajaran: "2025/2026",
    status: "nonaktif",
  },
  {
    id: 29,
    nama: "XII BDP 1",
    jenjang: "XII",
    wali_kelas: "Hendra Gunawan, S.Pd.",
    nip_wali: "198902102014015009",
    jumlah_siswa: 26,
    ruangan: "R. 309",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  },
  {
    id: 30,
    nama: "XII BDP 2",
    jenjang: "XII",
    wali_kelas: "Maya Sari, S.Pd.",
    nip_wali: "199106152015016010",
    jumlah_siswa: 24,
    ruangan: "R. 310",
    tahun_ajaran: "2025/2026",
    status: "aktif",
  },
];

const loadKelas = () => {
  if (typeof window === "undefined") return getDefaultKelas();
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getDefaultKelas()));
    return getDefaultKelas();
  }
  return JSON.parse(stored);
};

const saveKelas = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// =========================================================
// MAIN COMPONENT
// =========================================================
export default function AdminKelasPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [kelas, setKelas] = useState([]);
  const [search, setSearch] = useState("");
  const [jenjangFilter, setJenjangFilter] = useState("Semua");
  const [expandedJenjang, setExpandedJenjang] = useState(["X", "XI", "XII"]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // Load data from localStorage
  useEffect(() => {
    setKelas(loadKelas());
  }, []);

  const handleDelete = (id, nama) => {
    if (!window.confirm(`Yakin ingin menghapus kelas "${nama}"?`)) return;
    const updated = kelas.filter((item) => item.id !== id);
    setKelas(updated);
    saveKelas(updated);
    alert(`Kelas "${nama}" berhasil dihapus!`);
  };

  const toggleJenjang = (jenjang) => {
    setExpandedJenjang((prev) =>
      prev.includes(jenjang) ? prev.filter((j) => j !== jenjang) : [...prev, jenjang]
    );
  };

  const filtered = kelas.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.wali_kelas.toLowerCase().includes(search.toLowerCase());
    const matchJenjang = jenjangFilter === "Semua" || item.jenjang === jenjangFilter;
    return matchSearch && matchJenjang;
  });

  const groupedByJenjang = filtered.reduce((acc, item) => {
    if (!acc[item.jenjang]) acc[item.jenjang] = [];
    acc[item.jenjang].push(item);
    return acc;
  }, {});

  const jenjangKeys = ["X", "XI", "XII"];

  // Statistics
  const totalKelas = kelas.length;
  const totalAktif = kelas.filter((k) => k.status === "aktif").length;
  const totalNonaktif = totalKelas - totalAktif;
  const totalSiswa = kelas.reduce((sum, k) => sum + k.jumlah_siswa, 0);

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar active="kelas" setActive={() => {}} collapsed={isCollapsed} setCollapsed={setIsCollapsed} />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full p-4 md:p-6 lg:p-8">
            <div className="w-full space-y-5">
              {/* HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-200 flex-shrink-0">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-slate-800">Kelola Kelas & Wali Kelas</h1>
                    <p className="text-sm text-slate-500">Kelola seluruh kelas dan wali kelas per jenjang</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      setKelas(loadKelas());
                      window.location.reload();
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all hover:shadow-sm"
                    title="Refresh"
                  >
                    <RefreshCw size={17} className="text-slate-500" />
                  </button>
                  <button
                    onClick={() => router.push("/admin/kelas/tambah")}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-200 transition-all shadow-sm font-medium"
                  >
                    <Plus size={18} /> Tambah Kelas
                  </button>
                </div>
              </div>

              {/* STATISTICS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600"><GraduationCap size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Total Kelas</p>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{totalKelas}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600"><CheckCircle size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Aktif</p>
                  </div>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">{totalAktif}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600"><XCircle size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Nonaktif</p>
                  </div>
                  <p className="text-2xl font-bold text-rose-600 mt-1">{totalNonaktif}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600"><Users size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Total Siswa</p>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600 mt-1">{totalSiswa}</p>
                </div>
              </div>

              {/* SEARCH & FILTER */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari kelas atau wali kelas..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter size={17} className="text-slate-400" />
                    <select
                      value={jenjangFilter}
                      onChange={(e) => setJenjangFilter(e.target.value)}
                      className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 text-slate-600 min-w-[140px] cursor-pointer"
                    >
                      <option value="Semua">Semua Jenjang</option>
                      <option value="X">Kelas X</option>
                      <option value="XI">Kelas XI</option>
                      <option value="XII">Kelas XII</option>
                    </select>
                    <button
                      onClick={() => {
                        setSearch("");
                        setJenjangFilter("Semua");
                      }}
                      className="px-3 py-2.5 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors whitespace-nowrap"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* CLASS LIST PER JENJANG */}
              <div className="space-y-4">
                {jenjangKeys.map((jenjang) => {
                  const items = groupedByJenjang[jenjang] || [];
                  const isExpanded = expandedJenjang.includes(jenjang);
                  const total = items.length;
                  const siswa = items.reduce((sum, k) => sum + k.jumlah_siswa, 0);
                  const isActive = items.some((k) => k.status === "aktif");

                  if (items.length === 0 && jenjangFilter !== "Semua") return null;
                  if (items.length === 0 && search) return null;

                  return (
                    <div key={jenjang} className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      {/* Jenjang Header */}
                      <div
                        className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-purple-50/60 to-indigo-50/60 border-b border-slate-200/80 cursor-pointer hover:from-purple-100/40 hover:to-indigo-100/40 transition-all"
                        onClick={() => toggleJenjang(jenjang)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-md">
                            <School size={18} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-800 text-base">Kelas {jenjang}</h3>
                            <p className="text-xs text-slate-500">
                              {total} kelas • {siswa} siswa
                              {isActive && (
                                <span className="ml-2 inline-flex items-center gap-1 text-emerald-600 font-medium">
                                  <CheckCircle size={12} /> Aktif
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 font-medium">
                            {isExpanded ? "Sembunyikan" : "Tampilkan"}
                          </span>
                          <div className="p-1 rounded-full hover:bg-white/50 transition-colors">
                            <ChevronDown
                              size={18}
                              className={`text-slate-500 transition-transform duration-300 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Kelas List */}
                      {isExpanded && (
                        <div className="divide-y divide-slate-100">
                          {items.length === 0 ? (
                            <div className="p-6 text-center text-sm text-slate-400">Belum ada kelas di jenjang ini</div>
                          ) : (
                            items.map((item) => {
                              const isItemActive = item.status === "aktif";
                              return (
                                <div key={item.id} className={`p-4 hover:bg-slate-50/60 transition-colors ${!isItemActive ? "bg-slate-50/30" : ""}`}>
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div className="flex items-start gap-3">
                                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 text-purple-600 flex-shrink-0 shadow-sm">
                                        <GraduationCap size={18} />
                                      </div>
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                          <p className="font-semibold text-slate-800 text-sm">{item.nama}</p>
                                          <span
                                            className={`inline-flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full border ${
                                              isItemActive
                                                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                                : "bg-slate-100 text-slate-400 border-slate-200"
                                            }`}
                                          >
                                            {isItemActive ? <CheckCircle size={11} /> : <XCircle size={11} />}
                                            {isItemActive ? "Aktif" : "Nonaktif"}
                                          </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
                                          <span className="text-xs text-slate-600 flex items-center gap-1.5">
                                            <UserCheck size={13} className="text-purple-500" />
                                            {item.wali_kelas}
                                          </span>
                                          <span className="text-xs text-slate-500 flex items-center gap-1.5">
                                            <Users size={13} className="text-blue-500" />
                                            {item.jumlah_siswa} siswa
                                          </span>
                                          {item.ruangan && (
                                            <span className="text-xs text-slate-500 flex items-center gap-1.5">
                                              <MapPin size={13} className="text-amber-500" />
                                              {item.ruangan}
                                            </span>
                                          )}
                                          <span className="text-xs text-slate-500 flex items-center gap-1.5">
                                            <CalendarDays size={13} className="text-indigo-500" />
                                            {item.tahun_ajaran}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <button
                                        onClick={() => router.push(`/admin/kelas/edit/${item.id}`)}
                                        className="p-2 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600 transition-all hover:shadow-sm"
                                        title="Edit Kelas"
                                      >
                                        <Edit size={17} />
                                      </button>
                                      <button
                                        onClick={() => handleDelete(item.id, item.nama)}
                                        className="p-2 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all hover:shadow-sm"
                                        title="Hapus Kelas"
                                      >
                                        <Trash2 size={17} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {filtered.length === 0 && (
                <div className="bg-white rounded-xl border border-slate-200/80 p-12 text-center shadow-sm">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-purple-50">
                      <GraduationCap size={48} className="text-purple-300" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-600">Tidak ada data kelas</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {search || jenjangFilter !== "Semua" ? "Coba ubah filter pencarian" : "Silakan tambahkan kelas baru"}
                  </p>
                  {!search && jenjangFilter === "Semua" && (
                    <button
                      onClick={() => router.push("/admin/kelas/tambah")}
                      className="mt-3 text-sm text-purple-600 font-medium hover:text-purple-700 hover:underline transition-all"
                    >
                      Tambah kelas pertama →
                    </button>
                  )}
                </div>
              )}

              <footer className="text-center text-[11px] text-slate-400 py-3 border-t border-slate-200/60">
                © 2026 SmartSchool • Kelola Kelas & Wali Kelas
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}