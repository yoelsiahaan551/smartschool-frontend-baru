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
  LayoutGrid,
  SlidersHorizontal,
  Eye,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

// =========================================================
// STORAGE
// =========================================================

const STORAGE_KEY = "kelas_data";

// =========================================================
// DEFAULT DATA
// =========================================================

const getDefaultKelas = () => {
  const data = [];
  const jurusan = ["RPL", "TKJ", "AKL", "MM", "BDP"];
  const wali = [
    "Dr. Ahmad Fauzi, M.Pd.",
    "Siti Rahma, S.Pd.",
    "Budi Santoso, S.Si.",
    "Dewi Lestari, S.Pd.",
    "Eko Prasetyo, S.Pd.",
    "Rina Sari, S.Pd.",
    "Agus Setiawan, S.Pd.",
    "Sri Wahyuni, S.Pd.",
    "Hendra Gunawan, S.Pd.",
    "Maya Sari, S.Pd.",
  ];
  const jenjangList = ["X", "XI", "XII"];
  const statuses = ["aktif", "nonaktif"];
  const tahunAjaran = ["2024/2025", "2025/2026", "2026/2027"];

  let id = 1;
  for (const jenjang of jenjangList) {
    for (let i = 0; i < jurusan.length; i++) {
      for (let k = 1; k <= 2; k++) {
        const waliIdx = (id - 1) % wali.length;
        const statusIdx = id % 5 === 3 ? 1 : 0;
        const tahunIdx = id % tahunAjaran.length;
        data.push({
          id: id,
          nama: `${jenjang} ${jurusan[i]} ${k}`,
          jenjang: jenjang,
          wali_kelas: wali[waliIdx],
          nip_wali: `198${String(50 + id).padStart(2, "0")}${String(10 + id).padStart(2, "0")}${String(2010 + (id % 7)).padStart(2, "0")}${String(1001 + id).padStart(4, "0")}`,
          jumlah_siswa: 25 + (id % 10),
          ruangan: `R. ${String(100 + id).padStart(3, "0")}`,
          tahun_ajaran: tahunAjaran[tahunIdx],
          status: statuses[statusIdx],
          jadwal: [],
        });
        id++;
      }
    }
  }
  // Ambil 30 data saja
  return data.slice(0, 30);
};

// =========================================================
// LOCAL STORAGE
// =========================================================

const loadKelas = () => {
  if (typeof window === "undefined") return getDefaultKelas();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const defaults = getDefaultKelas();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
      return defaults;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error("Gagal membaca data kelas:", error);
    return getDefaultKelas();
  }
};

const saveKelas = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// =========================================================
// STAT CARD
// =========================================================

function StatCard({ icon: Icon, label, value, description, iconClass, valueClass }) {
  return (
    <div className="group min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <p className={`mt-2 text-2xl font-bold tracking-tight ${valueClass || "text-slate-800"}`}>
            {value}
          </p>
          <p className="mt-1 truncate text-[11px] text-slate-500">{description}</p>
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}

// =========================================================
// MAIN COMPONENT
// =========================================================

export default function AdminKelasPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [kelas, setKelas] = useState([]);
  const [search, setSearch] = useState("");
  const [jenjangFilter, setJenjangFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [sortBy, setSortBy] = useState("nama_asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    setKelas(loadKelas());
  }, []);

  const handleRefresh = () => {
    setKelas(loadKelas());
    setCurrentPage(1);
  };

  const handleDelete = (id, nama) => {
    if (!confirm(`Yakin ingin menghapus kelas "${nama}"?`)) return;
    const updated = kelas.filter((item) => item.id !== id);
    setKelas(updated);
    saveKelas(updated);
    alert(`Kelas "${nama}" berhasil dihapus!`);
    const totalItems = updated.length;
    const maxPage = Math.ceil(totalItems / itemsPerPage);
    if (currentPage > maxPage && maxPage > 0) setCurrentPage(maxPage);
    else if (totalItems === 0) setCurrentPage(1);
  };

  const filteredBySearch = kelas.filter((item) => {
    const keyword = search.toLowerCase();
    return (
      item.nama.toLowerCase().includes(keyword) ||
      item.wali_kelas.toLowerCase().includes(keyword) ||
      item.nip_wali?.includes(keyword)
    );
  });

  const filteredByJenjang =
    jenjangFilter === "Semua"
      ? filteredBySearch
      : filteredBySearch.filter((item) => item.jenjang === jenjangFilter);

  const filteredByStatus =
    statusFilter === "Semua"
      ? filteredByJenjang
      : filteredByJenjang.filter((item) =>
          statusFilter === "aktif" ? item.status === "aktif" : item.status !== "aktif"
        );

  const sorted = [...filteredByStatus].sort((a, b) => {
    switch (sortBy) {
      case "nama_asc":
        return a.nama.localeCompare(b.nama);
      case "nama_desc":
        return b.nama.localeCompare(a.nama);
      case "jenjang":
        return a.jenjang.localeCompare(b.jenjang);
      case "siswa":
        return (a.jumlah_siswa || 0) - (b.jumlah_siswa || 0);
      case "status":
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const totalItems = sorted.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = sorted.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, jenjangFilter, statusFilter, sortBy, itemsPerPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const totalKelas = kelas.length;
  const totalAktif = kelas.filter((item) => item.status === "aktif").length;
  const totalNonaktif = totalKelas - totalAktif;
  const totalSiswa = kelas.reduce((sum, item) => sum + Number(item.jumlah_siswa || 0), 0);

  const getRowNumber = (index) => startIndex + index + 1;

  const renderSortIcon = (field) => {
    if (sortBy !== field) return null;
    return (
      <ArrowUp size={14} className="inline ml-1 text-blue-600" />
    );
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100">
      <Sidebar
        active="kelas"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          toggleSidebar={() => setIsCollapsed(!isCollapsed)}
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email: "admin@smartschool.com",
            avatar: "AD",
          }}
        />

        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full px-4 py-5 sm:px-5 sm:py-6 md:px-6 lg:px-8 xl:px-10">
            <div className="w-full space-y-5">
              {/* HEADER */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200 sm:h-12 sm:w-12">
                    <GraduationCap size={22} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h1 className="truncate text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
                        Kelola Kelas
                      </h1>
                      <span className="hidden rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-semibold text-blue-700 sm:inline-flex">
                        {totalKelas} Kelas
                      </span>
                    </div>
                    <p className="mt-1 truncate text-sm text-slate-600">
                      Daftar seluruh kelas dengan wali kelas dan jumlah siswa
                    </p>
                  </div>
                </div>

                <div className="flex w-full items-center gap-2 sm:w-auto">
                  <button
                    onClick={handleRefresh}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-600 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <RefreshCw size={17} />
                  </button>
                  <button
                    onClick={() => router.push("/admin/kelas/tambah")}
                    className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-lg sm:flex-none sm:px-5"
                  >
                    <Plus size={18} />
                    <span>Tambah Kelas</span>
                  </button>
                </div>
              </div>

              {/* STATISTICS */}
              <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                <StatCard
                  icon={GraduationCap}
                  label="Total Kelas"
                  value={totalKelas}
                  description="Seluruh kelas terdaftar"
                  iconClass="bg-blue-100 text-blue-700"
                  valueClass="text-slate-800"
                />
                <StatCard
                  icon={CheckCircle}
                  label="Kelas Aktif"
                  value={totalAktif}
                  description="Kelas yang sedang aktif"
                  iconClass="bg-emerald-100 text-emerald-700"
                  valueClass="text-emerald-700"
                />
                <StatCard
                  icon={XCircle}
                  label="Nonaktif"
                  value={totalNonaktif}
                  description="Kelas tidak aktif"
                  iconClass="bg-rose-100 text-rose-700"
                  valueClass="text-rose-700"
                />
                <StatCard
                  icon={Users}
                  label="Total Siswa"
                  value={totalSiswa}
                  description="Jumlah seluruh siswa"
                  iconClass="bg-indigo-100 text-indigo-700"
                  valueClass="text-indigo-700"
                />
              </div>

              {/* SEARCH, FILTER, SORT */}
              <div className="rounded-2xl border border-slate-300 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3">
                  <div className="relative w-full">
                    <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Cari nama kelas atau wali kelas..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-500 outline-none transition-all hover:border-slate-400 hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={jenjangFilter}
                      onChange={(e) => setJenjangFilter(e.target.value)}
                      className="px-3 py-1.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-slate-700 min-w-[120px] hover:border-slate-400"
                    >
                      <option value="Semua">Semua Jenjang</option>
                      <option value="X">Kelas X</option>
                      <option value="XI">Kelas XI</option>
                      <option value="XII">Kelas XII</option>
                    </select>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-1.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-slate-700 min-w-[120px] hover:border-slate-400"
                    >
                      <option value="Semua">Semua Status</option>
                      <option value="aktif">Aktif</option>
                      <option value="nonaktif">Nonaktif</option>
                    </select>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-slate-700 min-w-[140px] hover:border-slate-400"
                    >
                      <option value="nama_asc">Nama A-Z</option>
                      <option value="nama_desc">Nama Z-A</option>
                      <option value="jenjang">Jenjang</option>
                      <option value="siswa">Jumlah Siswa</option>
                      <option value="status">Status</option>
                    </select>
                    <button
                      onClick={() => {
                        setSearch("");
                        setJenjangFilter("Semua");
                        setStatusFilter("Semua");
                        setSortBy("nama_asc");
                      }}
                      className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      Reset
                    </button>
                    <span className="ml-auto text-sm text-slate-500 hidden sm:inline">
                      {filteredByStatus.length} kelas ditemukan
                    </span>
                  </div>
                </div>
              </div>

              {/* TABLE */}
              <div className="w-full overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
                <div className="w-full overflow-x-auto">
                  <table className="w-full min-w-[900px] table-auto">
                    <thead>
                      <tr className="border-b border-slate-300 bg-slate-100">
                        <th className="w-[5%] whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                          No
                        </th>
                        <th
                          className="w-[15%] whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 cursor-pointer hover:text-slate-800"
                          onClick={() => setSortBy("nama_asc")}
                        >
                          <span className="flex items-center">
                            Nama Kelas {renderSortIcon("nama_asc")}
                          </span>
                        </th>
                        <th className="w-[10%] whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                          Jenjang
                        </th>
                        <th className="w-[20%] whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                          Wali Kelas
                        </th>
                        <th className="w-[12%] whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                          Jumlah Siswa
                        </th>
                        <th className="w-[10%] whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                          Status
                        </th>
                        <th className="w-[18%] whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {currentItems.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-4 py-8 text-center text-sm text-slate-500">
                            Tidak ada data kelas yang sesuai
                          </td>
                        </tr>
                      ) : (
                        currentItems.map((item, index) => {
                          const rowNumber = getRowNumber(index);
                          const isActive = item.status === "aktif";
                          return (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-4 py-4 text-sm text-slate-600 text-center">
                                {rowNumber}
                              </td>
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-2">
                                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isActive ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"}`}>
                                    <GraduationCap size={16} />
                                  </div>
                                  <span className="font-medium text-slate-800">{item.nama}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                                  {item.jenjang}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-1.5">
                                  <UserCheck size={14} className="text-slate-500" />
                                  <span className="text-sm text-slate-700">{item.wali_kelas}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-slate-700">{item.jumlah_siswa}</td>
                              <td className="px-4 py-4">
                                <span
                                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                                    isActive
                                      ? "border-emerald-300 bg-emerald-100 text-emerald-700"
                                      : "border-rose-300 bg-rose-100 text-rose-700"
                                  }`}
                                >
                                  <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-rose-500"}`} />
                                  {isActive ? "Aktif" : "Nonaktif"}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => router.push(`/admin/kelas/${item.id}`)}
                                    className="rounded-lg p-2 text-slate-500 transition-all hover:bg-blue-100 hover:text-blue-700"
                                    title="Detail Kelas"
                                  >
                                    <Eye size={17} />
                                  </button>
                                  <button
                                    onClick={() => router.push(`/admin/kelas/edit/${item.id}`)}
                                    className="rounded-lg p-2 text-slate-500 transition-all hover:bg-amber-100 hover:text-amber-700"
                                    title="Edit Kelas"
                                  >
                                    <Edit size={17} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(item.id, item.nama)}
                                    className="rounded-lg p-2 text-slate-500 transition-all hover:bg-rose-100 hover:text-rose-700"
                                    title="Hapus Kelas"
                                  >
                                    <Trash2 size={17} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-slate-300 bg-slate-50 gap-3">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span>
                        Menampilkan {startIndex + 1} - {endIndex} dari {totalItems} data
                      </span>
                      <div className="flex items-center gap-1">
                        <span>Tampil</span>
                        <select
                          value={itemsPerPage}
                          onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                          }}
                          className="py-1 px-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-slate-700 cursor-pointer"
                        >
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={40}>40</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => goToPage(1)}
                        disabled={currentPage === 1}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
                      </button>
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNumber;
                        if (totalPages <= 5) pageNumber = i + 1;
                        else if (currentPage <= 3) pageNumber = i + 1;
                        else if (currentPage >= totalPages - 2) pageNumber = totalPages - 4 + i;
                        else pageNumber = currentPage - 2 + i;
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => goToPage(pageNumber)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                              currentPage === pageNumber
                                ? "bg-blue-600 text-white"
                                : "text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                      <button
                        onClick={() => goToPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* FOOTER */}
              <footer className="border-t border-slate-300 py-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                  <LayoutGrid size={14} />
                  <span>© 2026 SmartSchool • Kelola Kelas & Wali Kelas</span>
                </div>
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}