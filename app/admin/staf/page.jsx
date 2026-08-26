"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

import {
  Users,
  UserPlus,
  Search,
  Eye,
  Edit,
  Trash2,
  FileSpreadsheet,
  Plus,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  Mail,
  Phone,
  User,
  Shield,
  MoreHorizontal,
  RefreshCw,
  Filter,
  SlidersHorizontal,
} from "lucide-react";

// ===== DATA DUMMY =====
const stafData = [
  {
    id: 1,
    nama: "Dr. Ahmad Fauzi, M.Pd.",
    email: "ahmad.fauzi@smartschool.com",
    telepon: "0812-3456-7890",
    role: "Super Admin",
    status: "Aktif",
    terakhirLogin: "2026-08-26T08:30:00Z",
    bergabung: "2024-01-15",
    avatar: "AF",
  },
  {
    id: 2,
    nama: "Dewi Lestari, S.Kom.",
    email: "dewi.lestari@smartschool.com",
    telepon: "0813-4567-8901",
    role: "Admin Sekolah",
    status: "Aktif",
    terakhirLogin: "2026-08-25T14:20:00Z",
    bergabung: "2024-02-10",
    avatar: "DL",
  },
  {
    id: 3,
    nama: "Budi Santoso, S.E.",
    email: "budi.santoso@smartschool.com",
    telepon: "0814-5678-9012",
    role: "Admin Yayasan",
    status: "Aktif",
    terakhirLogin: "2026-08-24T09:15:00Z",
    bergabung: "2024-03-01",
    avatar: "BS",
  },
  {
    id: 4,
    nama: "Siti Rahayu, S.Pd.",
    email: "siti.rahayu@smartschool.com",
    telepon: "0815-6789-0123",
    role: "Guru",
    status: "Nonaktif",
    terakhirLogin: "2026-08-20T11:00:00Z",
    bergabung: "2024-04-15",
    avatar: "SR",
  },
  {
    id: 5,
    nama: "M. Rizki Firmansyah, S.Si.",
    email: "rizki.firmansyah@smartschool.com",
    telepon: "0816-7890-1234",
    role: "Staf TU",
    status: "Trial",
    terakhirLogin: "2026-08-22T16:45:00Z",
    bergabung: "2024-05-20",
    avatar: "RF",
  },
];

const stats = {
  total: 45,
  aktif: 38,
  nonaktif: 5,
  trial: 2,
};

const roleOptions = ["Semua", "Super Admin", "Admin Sekolah", "Admin Yayasan", "Guru", "Staf TU"];
const statusOptions = ["Semua", "Aktif", "Nonaktif", "Trial"];

const statusColorMap = {
  Aktif: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  Trial: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
  Nonaktif: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", dot: "bg-rose-500" },
};

const roleColorMap = {
  "Super Admin": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  "Admin Sekolah": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "Admin Yayasan": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  Guru: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "Staf TU": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
};

// ===== UTILITY =====
const formatTanggal = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const timeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "Baru saja";
  if (diffMin < 60) return `${diffMin} menit lalu`;
  if (diffHour < 24) return `${diffHour} jam lalu`;
  if (diffDay < 7) return `${diffDay} hari lalu`;
  return formatTanggal(dateString);
};

// ===== KOMPONEN UTAMA =====
export default function StafPage() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("staf");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [sortField, setSortField] = useState("nama");
  const [sortOrder, setSortOrder] = useState("asc");

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
  const filteredData = stafData.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = filterRole === "Semua" || item.role === filterRole;
    const matchStatus = filterStatus === "Semua" || item.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  // Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    const valA = a[sortField]?.toString().toLowerCase() || "";
    const valB = b[sortField]?.toString().toLowerCase() || "";
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ?
      <ArrowUp size={13} className="ml-1 inline text-blue-500" /> :
      <ArrowDown size={13} className="ml-1 inline text-blue-500" />;
  };

  const resetFilters = () => {
    setSearchQuery("");
    setFilterRole("Semua");
    setFilterStatus("Semua");
    setCurrentPage(1);
  };

  const handleDelete = (staf) => {
    if (confirm(`Apakah Anda yakin ingin menghapus ${staf.nama}?`)) {
      console.log("Hapus:", staf.id);
    }
  };

  return (
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
          user={{ name: "Super Admin", email: "admin@smartschool.com", avatar: "SA" }}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="w-full space-y-5 sm:space-y-6">

            {/* =====================================================
                HEADER
            ===================================================== */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-[0_6px_18px_rgba(37,99,235,0.22)]">
                  <Users size={20} strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-2xl font-bold leading-none text-slate-800 sm:text-3xl">
                      Manajemen Staf
                    </h1>
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-500 shadow-sm">
                      Admin
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-5 text-slate-500 flex items-center gap-1.5">
                    <span>Kelola seluruh staf dan administrator sistem.</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
                >
                  <RefreshCw size={16} className="text-slate-400" />
                  <span className="hidden xs:inline">Refresh</span>
                </button>
                <button
                  onClick={() => router.push("/admin/staf/tambah")}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
                >
                  <Plus size={16} />
                  <span>Tambah Staf</span>
                </button>
              </div>
            </div>

            {/* =====================================================
                STATISTIK
            ===================================================== */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard label="Total Staf" value={stats.total} icon={Users} color="blue" />
              <StatCard label="Aktif" value={stats.aktif} icon={CheckCircle} color="emerald" />
              <StatCard label="Trial" value={stats.trial} icon={Clock} color="amber" />
              <StatCard label="Nonaktif" value={stats.nonaktif} icon={XCircle} color="rose" />
            </div>

            {/* =====================================================
                FILTER & SEARCH
            ===================================================== */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
              <div className="flex flex-col gap-3">
                <div className="relative w-full">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari nama, email, atau role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition placeholder:text-slate-400"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-600 min-w-[120px]"
                  >
                    {roleOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-600 min-w-[120px]"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <button
                    onClick={resetFilters}
                    className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Reset
                  </button>
                  <span className="ml-auto text-xs text-slate-400 hidden sm:inline">
                    {filteredData.length} staf ditemukan
                  </span>
                </div>
              </div>
            </div>

            {/* =====================================================
                TABLE
            ===================================================== */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              {isMobile && paginatedData.length > 0 ? (
                <div className="divide-y divide-slate-100 p-3">
                  {paginatedData.map((item, index) => {
                    const statusStyle = statusColorMap[item.status] || statusColorMap.Aktif;
                    const roleStyle = roleColorMap[item.role] || roleColorMap["Staf TU"];
                    const rowNumber = startIndex + index + 1;
                    return (
                      <div key={item.id} className="py-3 space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-slate-400 w-6 text-right">
                            {rowNumber}
                          </span>
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm flex-shrink-0">
                            {item.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-800 text-sm truncate">{item.nama}</p>
                            <p className="text-xs text-slate-500 truncate">{item.email}</p>
                          </div>
                          <button
                            onClick={() => router.push(`/admin/staf/${item.id}`)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors"
                          >
                            <Eye size={15} />
                          </button>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 ml-9">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${roleStyle.bg} ${roleStyle.text} ${roleStyle.border}`}>
                            {item.role}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${statusStyle.dot} mr-1`} />
                            {item.status}
                          </span>
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
                        <th className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">No</th>
                        <th
                          onClick={() => handleSort("nama")}
                          className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 select-none"
                        >
                          <span className="flex items-center">
                            Nama
                            {renderSortIcon("nama")}
                          </span>
                        </th>
                        <th className="hidden md:table-cell px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                        <th className="hidden sm:table-cell px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Telepon</th>
                        <th
                          onClick={() => handleSort("role")}
                          className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 select-none"
                        >
                          <span className="flex items-center">
                            Role
                            {renderSortIcon("role")}
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
                        <th className="hidden lg:table-cell px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Terakhir Login</th>
                        <th className="px-4 py-3 text-right text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginatedData.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                            <div className="flex flex-col items-center gap-2">
                              <Search size={32} className="text-slate-300" />
                              <p className="text-sm font-medium">Tidak ada staf ditemukan</p>
                              <p className="text-xs text-slate-400">Coba ubah filter atau kata kunci pencarian</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        paginatedData.map((item, index) => {
                          const statusStyle = statusColorMap[item.status] || statusColorMap.Aktif;
                          const roleStyle = roleColorMap[item.role] || roleColorMap["Staf TU"];
                          const rowNumber = startIndex + index + 1;
                          return (
                            <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                              <td className="px-4 py-3 text-sm text-slate-500 text-center">
                                {rowNumber}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm shadow-sm flex-shrink-0">
                                    {item.avatar}
                                  </div>
                                  <span className="font-medium text-slate-800 truncate max-w-[120px] sm:max-w-none">
                                    {item.nama}
                                  </span>
                                </div>
                              </td>
                              <td className="hidden md:table-cell px-4 py-3 text-slate-500 text-sm truncate max-w-[150px]">
                                {item.email}
                              </td>
                              <td className="hidden sm:table-cell px-4 py-3 text-slate-500 text-sm">
                                {item.telepon}
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${roleStyle.bg} ${roleStyle.text} ${roleStyle.border}`}>
                                  {item.role}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${statusStyle.dot} mr-1`} />
                                  {item.status}
                                </span>
                              </td>
                              <td className="hidden lg:table-cell px-4 py-3 text-xs text-slate-500">
                                {timeAgo(item.terakhirLogin)}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-0.5">
                                  <button
                                    onClick={() => router.push(`/admin/staf/${item.id}`)}
                                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors"
                                    title="Detail"
                                  >
                                    <Eye size={15} />
                                  </button>
                                  <button
                                    onClick={() => router.push(`/admin/staf/edit/${item.id}`)}
                                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-amber-600 transition-colors"
                                    title="Edit"
                                  >
                                    <Edit size={15} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(item)}
                                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-rose-600 transition-colors"
                                    title="Hapus"
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
                  <span className="font-medium text-slate-700">{paginatedData.length === 0 ? 0 : startIndex + 1}</span>
                  <span className="hidden xs:inline"> sampai </span>
                  <span className="font-medium text-slate-700">{Math.min(startIndex + paginatedData.length, sortedData.length)}</span>
                  <span className="hidden xs:inline"> dari </span>
                  <span className="font-medium text-slate-700">{sortedData.length}</span>
                  <span className="hidden xs:inline"> staf</span>
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

            {/* FOOTER */}
            <div className="text-center text-xs text-slate-400/80 py-2 border-t border-slate-200/40">
              © 2026 SmartSchool • Data staf terakhir diperbarui hari ini
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
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
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