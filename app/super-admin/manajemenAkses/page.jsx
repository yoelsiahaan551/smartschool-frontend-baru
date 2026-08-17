"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Users,
  UserCheck,
  UserCog,
  BookOpen,
  DollarSign,
  Key,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  FileSpreadsheet,
  Sparkles,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  XCircle,
  BadgeCheck,
  Lock,
  Unlock,
  MoreHorizontal,
  Copy,
  Layers,
} from "lucide-react";

// ================== DATA DUMMY ==================
const dummyRoles = [
  {
    id: "role-001",
    nama: "Super Admin",
    namaTampilan: "Super Admin",
    deskripsi: "Akses penuh ke seluruh modul dan pengaturan sistem SmartSchool.",
    status: "aktif",
    izin: 8,
    pengguna: 3,
    ikon: "Shield",
  },
  {
    id: "role-002",
    nama: "Admin Sekolah",
    namaTampilan: "Admin Sekolah",
    deskripsi: "Mengelola data sekolah, guru, siswa, dan kelas pada satu sekolah.",
    status: "aktif",
    izin: 4,
    pengguna: 125,
    ikon: "ShieldCheck",
  },
  {
    id: "role-003",
    nama: "Guru",
    namaTampilan: "Guru",
    deskripsi: "Mengelola nilai, presensi, dan materi ajar untuk kelas yang diampu.",
    status: "aktif",
    izin: 2,
    pengguna: 842,
    ikon: "BookOpen",
  },
  {
    id: "role-004",
    nama: "Wali Kelas",
    namaTampilan: "Wali Kelas",
    deskripsi: "Memantau perkembangan siswa dan mengelola data satu kelas.",
    status: "aktif",
    izin: 1,
    pengguna: 210,
    ikon: "UserCheck",
  },
  {
    id: "role-005",
    nama: "Bendahara",
    namaTampilan: "Bendahara",
    deskripsi: "Mengelola pembayaran, tagihan, dan laporan keuangan sekolah.",
    status: "nonaktif",
    izin: 2,
    pengguna: 18,
    ikon: "DollarSign",
  },
];

const dummyPermissions = [
  { id: "perm-001", modul: "Akademik", aksi: "view", nama: "Lihat Akademik" },
  { id: "perm-002", modul: "Akademik", aksi: "create", nama: "Tambah Akademik" },
  { id: "perm-003", modul: "Akademik", aksi: "edit", nama: "Edit Akademik" },
  { id: "perm-004", modul: "Akademik", aksi: "delete", nama: "Hapus Akademik" },
  { id: "perm-005", modul: "Presensi", aksi: "view", nama: "Lihat Presensi" },
  { id: "perm-006", modul: "Presensi", aksi: "create", nama: "Tambah Presensi" },
  { id: "perm-007", modul: "Keuangan", aksi: "view", nama: "Lihat Keuangan" },
  { id: "perm-008", modul: "Keuangan", aksi: "create", nama: "Tambah Keuangan" },
];

const iconMap = {
  Shield: Shield,
  ShieldCheck: ShieldCheck,
  ShieldAlert: ShieldAlert,
  UserCheck: UserCheck,
  BookOpen: BookOpen,
  DollarSign: DollarSign,
  Users: Users,
  UserCog: UserCog,
  Key: Key,
};

// ================== STATISTIK ==================
const hitungStatistik = (roles) => {
  const total = roles.length;
  const aktif = roles.filter((r) => r.status === "aktif").length;
  const totalPengguna = roles.reduce((sum, r) => sum + r.pengguna, 0);
  return { total, aktif, totalPengguna };
};

export default function ManajemenAksesPage() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("manajemen-akses");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [sortField, setSortField] = useState("nama");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const itemsPerPage = 5;

  const notifications = [
    { id: 1, title: "Pembaruan Sistem v2.0", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Pengingat: Backup Data", desc: "Dikirim 1 hari lalu", read: false },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filter
  const filteredData = dummyRoles.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.namaTampilan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === "Semua" || item.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    let valA = a[sortField]?.toString().toLowerCase() || "";
    let valB = b[sortField]?.toString().toLowerCase() || "";
    if (sortField === "pengguna" || sortField === "izin") {
      valA = Number(a[sortField]) || 0;
      valB = Number(b[sortField]) || 0;
    }
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ?
      <ArrowUp size={14} className="ml-1 inline text-slate-400" /> :
      <ArrowDown size={14} className="ml-1 inline text-slate-400" />;
  };

  const resetFilters = () => {
    setSearchQuery("");
    setFilterStatus("Semua");
  };

  const stats = hitungStatistik(dummyRoles);

  const statusOptions = ["Semua", "aktif", "nonaktif"];

  const statusColorMap = {
    aktif: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
    nonaktif: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", dot: "bg-rose-500" },
  };

  const getStatusLabel = (status) => {
    const map = { aktif: "Aktif", nonaktif: "Nonaktif" };
    return map[status] || status;
  };

  return (
    // Pola wrapper disamakan persis dengan halaman Profil/Pengumuman/Dashboard/Langganan Sekolah:
    // min-h-screen (bukan h-screen + overflow-hidden) di wrapper luar,
    // dan main tanpa overflow-y-auto (p-4 sm:p-6 lg:p-8) supaya sidebar mengikuti
    // tinggi konten halaman dan konsisten saat responsive/zoom.
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        active={activeMenu}
        setActive={setActiveMenu}
        collapsed={!sidebarOpen}
        setCollapsed={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          user={{ name: "Sarah", email: "sarah@smartschool.com", avatar: "SA" }}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="w-full space-y-5 sm:space-y-6">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-600 text-white shadow-sm">
                    <Shield size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">
                    Manajemen Akses
                  </h1>
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                    Super Admin
                  </span>
                </div>
                <p className="text-sm text-slate-500 ml-[52px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400" />
                  Kelola role (peran) dan izin (permission) pengguna sistem.
                </p>
              </div>
              <div className="flex items-center gap-2.5 ml-[52px] sm:ml-0">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                  <FileSpreadsheet size={16} className="text-slate-400" />
                  <span className="hidden xs:inline">Export</span>
                </button>
                <button
                  onClick={() => router.push("/super-admin/manajemenAkses/tambah-role")}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
                >
                  <Plus size={16} />
                  <span className="hidden xs:inline">Tambah Role</span>
                </button>
              </div>
            </div>

            {/* STATISTIK */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <StatCard label="Total Peran" value={stats.total} icon={Shield} color="blue" />
              <StatCard label="Peran Aktif" value={stats.aktif} icon={BadgeCheck} color="emerald" />
              <StatCard label="Pengguna Terkait" value={stats.totalPengguna} icon={Users} color="purple" />
            </div>

            {/* FILTER & SEARCH */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
              <div className="flex flex-col gap-3">
                <div className="relative w-full">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari nama role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-slate-400"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-600 min-w-[120px]"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt === "Semua" ? "Status" : getStatusLabel(opt)}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={resetFilters}
                    className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Reset
                  </button>
                  <span className="ml-auto text-xs text-slate-400 hidden sm:inline">
                    {filteredData.length} data ditemukan
                  </span>
                </div>
              </div>
            </div>

            {/* TABEL */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              {isMobile && paginatedData.length > 0 ? (
                <div className="divide-y divide-slate-100 p-3">
                  {paginatedData.map((item) => {
                    const statusStyle = statusColorMap[item.status] || statusColorMap.nonaktif;
                    const IconComponent = iconMap[item.ikon] || Shield;
                    return (
                      <div key={item.id} className="py-3 space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm flex-shrink-0">
                            <IconComponent size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-800 text-sm truncate">{item.nama}</p>
                            <p className="text-xs text-slate-500 truncate">{item.deskripsi}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-200">
                            {item.izin} izin
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-purple-50 text-purple-600 border border-purple-200">
                            {item.pengguna} pengguna
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${statusStyle.dot} mr-1`} />
                            {getStatusLabel(item.status)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => router.push(`/super-admin/manajemenAkses/${item.id}`)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => router.push(`/super-admin/manajemenAkses/edit-role/${item.id}`)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-amber-600 transition-colors"
                          >
                            <Edit size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200/80">
                        <th className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Peran</th>
                        <th className="hidden lg:table-cell px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Deskripsi</th>
                        <th
                          onClick={() => handleSort("izin")}
                          className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 select-none"
                        >
                          <span className="flex items-center">
                            Izin
                            {renderSortIcon("izin")}
                          </span>
                        </th>
                        <th
                          onClick={() => handleSort("pengguna")}
                          className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 select-none"
                        >
                          <span className="flex items-center">
                            Pengguna
                            {renderSortIcon("pengguna")}
                          </span>
                        </th>
                        <th
                          onClick={() => handleSort("status")}
                          className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 select-none"
                        >
                          <span className="flex items-center">
                            Status
                            {renderSortIcon("status")}
                          </span>
                        </th>
                        <th className="px-4 py-3 text-right text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginatedData.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                            <div className="flex flex-col items-center gap-2">
                              <Search size={32} className="text-slate-300" />
                              <p className="text-sm font-medium">Tidak ada data role</p>
                              <p className="text-xs text-slate-400">Coba ubah filter atau kata kunci pencarian</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        paginatedData.map((item) => {
                          const statusStyle = statusColorMap[item.status] || statusColorMap.nonaktif;
                          const IconComponent = iconMap[item.ikon] || Shield;
                          return (
                            <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm flex-shrink-0">
                                    <IconComponent size={16} />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="font-medium text-slate-800 text-sm truncate">{item.nama}</p>
                                    <p className="text-xs text-slate-400 truncate">{item.namaTampilan}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="hidden lg:table-cell px-4 py-3 text-sm text-slate-500 max-w-[200px] truncate">
                                {item.deskripsi}
                              </td>
                              <td className="px-4 py-3">
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200">
                                  {item.izin} izin
                                </span>
                              </td>
                              <td className="px-4 py-3 font-medium text-slate-700">{item.pengguna}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${statusStyle.dot} mr-1`} />
                                  {getStatusLabel(item.status)}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-0.5">
                                  <button
                                    onClick={() => router.push(`/super-admin/manajemenAkses/${item.id}`)}
                                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors"
                                    title="Detail"
                                  >
                                    <Eye size={15} />
                                  </button>
                                  <button
                                    onClick={() => router.push(`/super-admin/manajemenAkses/edit-role/${item.id}`)}
                                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-amber-600 transition-colors"
                                    title="Edit"
                                  >
                                    <Edit size={15} />
                                  </button>
                                  <button
                                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-rose-600 transition-colors"
                                    title="Hapus"
                                    onClick={() => {
                                      if (confirm(`Hapus role ${item.nama}?`)) {
                                        console.log("Hapus:", item.id);
                                      }
                                    }}
                                  >
                                    <Trash2 size={15} />
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
              )}

              {/* PAGINATION */}
              <div className="px-4 py-3 border-t border-slate-200/80 flex flex-col xs:flex-row items-center justify-between gap-2">
                <p className="text-xs text-slate-500 text-center xs:text-left">
                  <span className="hidden xs:inline">Menampilkan </span>
                  <span className="font-medium text-slate-700">{paginatedData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span>
                  <span className="hidden xs:inline"> sampai </span>
                  <span className="font-medium text-slate-700">{Math.min(currentPage * itemsPerPage, sortedData.length)}</span>
                  <span className="hidden xs:inline"> dari </span>
                  <span className="font-medium text-slate-700">{sortedData.length}</span>
                  <span className="hidden xs:inline"> data</span>
                </p>
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="hidden xs:inline">Previous</span>
                    <span className="xs:hidden">‹</span>
                  </button>
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                          currentPage === page
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  {totalPages > 5 && (
                    <>
                      <span className="text-slate-400 px-0.5">…</span>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                          currentPage === totalPages
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="hidden xs:inline">Next</span>
                    <span className="xs:hidden">›</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-slate-400/80 py-2 border-t border-slate-200/40">
              © 2026 SmartSchool • Data role terakhir diperbarui hari ini
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ===== KOMPONEN STAT CARD =====
function StatCard({ label, value, icon: Icon, color }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
  };
  const iconBg = colorMap[color] || colorMap.blue;
  return (
    <div className="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${iconBg} flex-shrink-0`}>
          <Icon size={16} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider truncate">{label}</p>
          <p className="text-lg font-semibold text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  );
}