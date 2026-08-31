"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  RefreshCw,
  CheckCircle,
  XCircle,
  Filter,
  UserCog,
  Mail,
  Phone,
  MapPin,
  Calendar,
  UserCheck,
  UserX,
  Shield,
  Building2,
  GraduationCap,
  BookOpen,
  Award,
  Star,
  Clock,
  ChevronDown,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  AlertCircle,
  Info,
  Save,
  X,
  ArrowLeft,
  Eye,
} from "lucide-react";

// =========================================================
// DATA DUMMY USER SEKOLAH
// =========================================================
const STORAGE_KEY = "sekolah_user_data";

const getDefaultUsers = () => [
  {
    id: 1,
    nama: "Dr. Ahmad Fauzi, M.Pd.",
    email: "kepsek@smktaruna.sch.id",
    phone: "0812-3456-7890",
    role: "Kepala Sekolah",
    roleLevel: 1,
    status: "aktif",
    nip: "198501012010011001",
    jenis_kelamin: "Laki-laki",
    tgl_lahir: "1985-01-01",
    alamat: "Jl. Merdeka No. 45, Jakarta Pusat",
    bergabung: "2024-01-15",
    terakhir_login: "2026-09-01 08:30:22",
    foto: null,
  },
  {
    id: 2,
    nama: "Dra. Siti Rahmawati, M.Pd.",
    email: "wakil@smktaruna.sch.id",
    phone: "0812-3456-7891",
    role: "Wakil Kepala Sekolah",
    roleLevel: 2,
    status: "aktif",
    nip: "198702152010012002",
    jenis_kelamin: "Perempuan",
    tgl_lahir: "1987-02-15",
    alamat: "Jl. Merdeka No. 46, Jakarta Pusat",
    bergabung: "2024-02-10",
    terakhir_login: "2026-08-31 15:45:10",
    foto: null,
  },
  {
    id: 3,
    nama: "Drs. Budi Santoso, S.Si.",
    email: "kajur@smktaruna.sch.id",
    phone: "0812-3456-7892",
    role: "Kepala Jurusan",
    roleLevel: 3,
    status: "aktif",
    nip: "198803201010011003",
    jenis_kelamin: "Laki-laki",
    tgl_lahir: "1988-03-20",
    alamat: "Jl. Merdeka No. 47, Jakarta Pusat",
    bergabung: "2024-03-01",
    terakhir_login: "2026-08-30 10:20:33",
    foto: null,
  },
  {
    id: 4,
    nama: "Dr. Ir. Dewi Lestari, M.Si.",
    email: "bk@smktaruna.sch.id",
    phone: "0812-3456-7893",
    role: "Koordinator BK",
    roleLevel: 4,
    status: "aktif",
    nip: "198904251010011004",
    jenis_kelamin: "Perempuan",
    tgl_lahir: "1989-04-25",
    alamat: "Jl. Merdeka No. 48, Jakarta Pusat",
    bergabung: "2024-04-15",
    terakhir_login: "2026-08-29 14:15:55",
    foto: null,
  },
  {
    id: 5,
    nama: "Hendra Gunawan, S.Pd.",
    email: "bendahara@smktaruna.sch.id",
    phone: "0812-3456-7894",
    role: "Bendahara",
    roleLevel: 5,
    status: "nonaktif",
    nip: "199005151010011005",
    jenis_kelamin: "Laki-laki",
    tgl_lahir: "1990-05-15",
    alamat: "Jl. Merdeka No. 49, Jakarta Pusat",
    bergabung: "2024-05-20",
    terakhir_login: "2026-08-15 09:30:12",
    foto: null,
  },
  {
    id: 6,
    nama: "Dr. Rina Sari, S.Pd., M.Pd.",
    email: "guru@smktaruna.sch.id",
    phone: "0812-3456-7895",
    role: "Guru",
    roleLevel: 6,
    status: "aktif",
    nip: "199107151010011006",
    jenis_kelamin: "Perempuan",
    tgl_lahir: "1991-07-15",
    alamat: "Jl. Merdeka No. 50, Jakarta Pusat",
    bergabung: "2024-06-10",
    terakhir_login: "2026-08-30 12:45:30",
    foto: null,
  },
  {
    id: 7,
    nama: "Agus Setiawan, S.Pd.",
    email: "wali@smktaruna.sch.id",
    phone: "0812-3456-7896",
    role: "Wali Kelas",
    roleLevel: 7,
    status: "aktif",
    nip: "199208201010011007",
    jenis_kelamin: "Laki-laki",
    tgl_lahir: "1992-08-20",
    alamat: "Jl. Merdeka No. 51, Jakarta Pusat",
    bergabung: "2024-07-01",
    terakhir_login: "2026-08-28 16:20:45",
    foto: null,
  },
  {
    id: 8,
    nama: "Maya Sari, S.Pd.",
    email: "guru_bk@smktaruna.sch.id",
    phone: "0812-3456-7897",
    role: "Guru BK",
    roleLevel: 8,
    status: "aktif",
    nip: "199303151010011008",
    jenis_kelamin: "Perempuan",
    tgl_lahir: "1993-03-15",
    alamat: "Jl. Merdeka No. 52, Jakarta Pusat",
    bergabung: "2024-08-15",
    terakhir_login: "2026-08-27 11:10:20",
    foto: null,
  },
];

const loadUsers = () => {
  if (typeof window === "undefined") return getDefaultUsers();
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getDefaultUsers()));
    return getDefaultUsers();
  }
  return JSON.parse(stored);
};

const saveUsers = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const roleLevels = [
  { level: 1, name: "Kepala Sekolah", icon: Star, color: "bg-purple-100 text-purple-600" },
  { level: 2, name: "Wakil Kepala Sekolah", icon: Award, color: "bg-indigo-100 text-indigo-600" },
  { level: 3, name: "Kepala Jurusan", icon: BookOpen, color: "bg-blue-100 text-blue-600" },
  { level: 4, name: "Koordinator BK", icon: UserCheck, color: "bg-cyan-100 text-cyan-600" },
  { level: 5, name: "Bendahara", icon: Shield, color: "bg-emerald-100 text-emerald-600" },
  { level: 6, name: "Guru", icon: GraduationCap, color: "bg-amber-100 text-amber-600" },
  { level: 7, name: "Wali Kelas", icon: Users, color: "bg-rose-100 text-rose-600" },
  { level: 8, name: "Guru BK", icon: UserCog, color: "bg-violet-100 text-violet-600" },
];

// =========================================================
// MAIN COMPONENT
// =========================================================
export default function KelolaUserPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setUsers(loadUsers());
  }, []);

  const handleDelete = (id, nama) => {
    if (!window.confirm(`Yakin ingin menghapus user "${nama}"?`)) return;
    const updated = users.filter((item) => item.id !== id);
    setUsers(updated);
    saveUsers(updated);
  };

  const handleToggleStatus = (id) => {
    const updated = users.map((item) =>
      item.id === id ? { ...item, status: item.status === "aktif" ? "nonaktif" : "aktif" } : item
    );
    setUsers(updated);
    saveUsers(updated);
  };

  const filtered = useMemo(() => {
    return users
      .filter((item) => {
        const matchSearch =
          item.nama.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase()) ||
          item.role.toLowerCase().includes(search.toLowerCase()) ||
          item.nip.includes(search);
        const matchRole = roleFilter === "Semua" || item.role === roleFilter;
        const matchStatus = statusFilter === "Semua" || item.status === statusFilter;
        return matchSearch && matchRole && matchStatus;
      })
      .sort((a, b) => a.roleLevel - b.roleLevel || a.nama.localeCompare(b.nama));
  }, [users, search, roleFilter, statusFilter]);

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = filtered.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter, statusFilter]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (safePage <= 3) return [1, 2, 3, 4, 5];
    if (safePage >= totalPages - 2) return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [safePage - 2, safePage - 1, safePage, safePage + 1, safePage + 2];
  };

  const getInitials = (nama) => {
    if (!nama) return "U";
    const parts = nama.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return nama.substring(0, 2).toUpperCase();
  };

  const totalAktif = users.filter((u) => u.status === "aktif").length;

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
      <Sidebar
        active="kelolaUser"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          toggleSidebar={() => setIsCollapsed(!isCollapsed)}
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email: "admin@smartschool.com",
            avatar: "AD",
          }}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full p-3 sm:p-5 lg:p-7 xl:p-8">
            <div className="mx-auto w-full max-w-[1600px] space-y-4 sm:space-y-5 lg:space-y-6">

              {/* PAGE HEADER */}
              <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
                <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-50/70 blur-3xl" />

                <div className="relative flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-6">
                  <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)] sm:h-14 sm:w-14">
                      <Users size={22} strokeWidth={1.9} className="sm:h-[25px] sm:w-[25px]" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-xl font-semibold tracking-[-0.025em] text-slate-900 sm:text-2xl lg:text-[26px]">
                          Kelola User
                        </h1>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-600 sm:px-3 sm:py-1 sm:text-[11px]">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                          Level Sekolah
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 sm:gap-2">
                        <UserCog size={13} className="shrink-0 text-blue-400 sm:h-[14px] sm:w-[14px]" strokeWidth={2} />
                        <p className="text-xs leading-5 text-slate-500 sm:text-sm">
                          Kelola pengguna di lingkungan sekolah Anda.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full flex-wrap gap-2 sm:flex-row lg:w-auto">
                    <button
                      onClick={() => setUsers(loadUsers())}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-[0_2px_5px_rgba(15,23,42,0.05)] transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 active:scale-[0.98] sm:h-11 sm:w-11"
                      title="Refresh data"
                    >
                      <RefreshCw size={16} className="sm:h-[17px] sm:w-[17px]" />
                    </button>

                    <button
                      onClick={() => router.push("/admin/kelola-user/tambah")}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-[0_7px_18px_rgba(15,23,42,0.16)] transition-all hover:bg-slate-800 hover:shadow-[0_9px_22px_rgba(15,23,42,0.20)] active:scale-[0.98] sm:h-11 sm:px-5"
                    >
                      <Plus size={16} strokeWidth={2.3} className="sm:h-[17px] sm:w-[17px]" />
                      Tambah User
                    </button>
                  </div>
                </div>
              </section>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard label="Total User" value={users.length} icon={Users} color="blue" />
                <StatCard label="Aktif" value={totalAktif} icon={CheckCircle} color="emerald" />
                <StatCard label="Nonaktif" value={users.length - totalAktif} icon={UserX} color="rose" />
                <StatCard label="Role Level" value={roleLevels.length} icon={Shield} color="indigo" />
              </div>

              {/* SEARCH & FILTER */}
              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:p-5">
                <div className="mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 sm:h-9 sm:w-9">
                    <Filter size={14} className="sm:h-[16px] sm:w-[16px]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Filter & Pencarian</p>
                    <p className="text-xs text-slate-400">Cari dan filter data user</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="relative">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari nama, email, NIP..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 outline-none transition-all hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="Semua">Semua Role</option>
                    {roleLevels.map((r) => (
                      <option key={r.level} value={r.name}>{r.name}</option>
                    ))}
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 outline-none transition-all hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="Semua">Semua Status</option>
                    <option value="aktif">Aktif</option>
                    <option value="nonaktif">Nonaktif</option>
                  </select>

                  <button
                    onClick={() => {
                      setSearch("");
                      setRoleFilter("Semua");
                      setStatusFilter("Semua");
                    }}
                    className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800"
                  >
                    Reset
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                  <p className="text-xs text-slate-400">
                    Menampilkan <span className="font-semibold text-slate-600">{totalItems}</span> data user
                  </p>
                </div>
              </section>

              {/* TABLE */}
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_3px_14px_rgba(15,23,42,0.05)]">
                <div className="border-b border-slate-100 px-5 py-4 sm:px-6 sm:py-5">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-sm font-semibold text-slate-800">Daftar User</h2>
                      <p className="text-xs text-slate-500">User yang terdaftar di lingkungan sekolah</p>
                    </div>
                    <div className="text-xs text-slate-500">{totalItems} user</div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1000px] border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        <th className="w-12 px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">No</th>
                        <th className="min-w-[200px] px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Nama / NIP</th>
                        <th className="min-w-[180px] px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Email / Phone</th>
                        <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Role</th>
                        <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Status</th>
                        <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Terakhir Login</th>
                        <th className="w-32 px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {currentItems.map((item, index) => {
                        const rowNumber = startIndex + index + 1;
                        const roleInfo = roleLevels.find((r) => r.name === item.role);
                        const RoleIcon = roleInfo?.icon || Users;
                        const isActive = item.status === "aktif";

                        return (
                          <tr key={item.id} className="transition-colors hover:bg-slate-50/70">
                            <td className="px-4 py-3.5 text-center text-sm text-slate-400">
                              {rowNumber}
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-bold">
                                  {getInitials(item.nama)}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-slate-800">{item.nama}</p>
                                  <p className="text-xs text-slate-400">NIP: {item.nip}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="min-w-0">
                                <p className="text-sm text-slate-700">{item.email}</p>
                                <p className="text-xs text-slate-400">{item.phone}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-1.5">
                                <div className={`p-1 rounded ${roleInfo?.color || "bg-slate-100 text-slate-600"}`}>
                                  <RoleIcon size={14} />
                                </div>
                                <span className="text-sm font-medium text-slate-700">{item.role}</span>
                                <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
                                  Lv.{item.roleLevel}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                                  isActive
                                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                    : "border-rose-200 bg-rose-50 text-rose-700"
                                }`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${
                                    isActive ? "bg-emerald-500" : "bg-rose-500"
                                  }`}
                                />
                                {isActive ? "Aktif" : "Nonaktif"}
                              </span>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                <Clock size={13} className="text-slate-400" />
                                {item.terakhir_login}
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center justify-center gap-0.5">
                                <button
                                  onClick={() => handleToggleStatus(item.id)}
                                  className={`p-1.5 rounded-lg transition-all ${
                                    isActive
                                      ? "text-slate-400 hover:bg-amber-50 hover:text-amber-600"
                                      : "text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"
                                  }`}
                                  title={isActive ? "Nonaktifkan" : "Aktifkan"}
                                >
                                  {isActive ? <UserX size={15} /> : <UserCheck size={15} />}
                                </button>
                                <button
                                  onClick={() => router.push(`/admin/kelola-user/edit/${item.id}`)}
                                  className="p-1.5 rounded-lg text-slate-400 transition-all hover:bg-amber-50 hover:text-amber-600"
                                  title="Edit"
                                >
                                  <Edit size={15} />
                                </button>
                                <button
                                  onClick={() => router.push(`/admin/kelola-user/detail/${item.id}`)}
                                  className="p-1.5 rounded-lg text-slate-400 transition-all hover:bg-blue-50 hover:text-blue-600"
                                  title="Detail"
                                >
                                  <Eye size={15} />
                                </button>
                                <button
                                  onClick={() => handleDelete(item.id, item.nama)}
                                  className="p-1.5 rounded-lg text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-600"
                                  title="Hapus"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {currentItems.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                      <Users size={24} />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-slate-700">Tidak ada data user</h3>
                    <p className="mt-1 text-xs text-slate-400">
                      {search || roleFilter !== "Semua" || statusFilter !== "Semua"
                        ? "Coba ubah filter pencarian"
                        : "Silakan tambahkan user baru"}
                    </p>
                  </div>
                )}

                {/* PAGINATION */}
                {totalItems > 0 && (
                  <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span>
                        Menampilkan <span className="font-semibold text-slate-700">{startIndex + 1}</span> -{" "}
                        <span className="font-semibold text-slate-700">{endIndex}</span> dari{" "}
                        <span className="font-semibold text-slate-700">{totalItems}</span> data
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => goToPage(1)}
                        disabled={safePage === 1}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-slate-400 transition-all hover:border-slate-200 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronsLeft size={14} />
                      </button>
                      <button
                        onClick={() => goToPage(safePage - 1)}
                        disabled={safePage === 1}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-slate-400 transition-all hover:border-slate-200 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronLeft size={14} />
                      </button>

                      {getPageNumbers().map((page) => (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-semibold transition-all ${
                            safePage === page
                              ? "bg-blue-600 text-white shadow-[0_4px_10px_rgba(37,99,235,0.25)]"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        onClick={() => goToPage(safePage + 1)}
                        disabled={safePage === totalPages}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-slate-400 transition-all hover:border-slate-200 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronRight size={14} />
                      </button>
                      <button
                        onClick={() => goToPage(totalPages)}
                        disabled={safePage === totalPages}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-slate-400 transition-all hover:border-slate-200 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronsRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </section>

              {/* ROLE LEVEL REFERENCE */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <Shield size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Role Level Sekolah</p>
                    <p className="text-xs text-slate-400">Referensi level akses di lingkungan sekolah</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
                  {roleLevels.map((role) => {
                    const Icon = role.icon;
                    const count = users.filter((u) => u.role === role.name).length;
                    return (
                      <div
                        key={role.level}
                        className={`rounded-xl border border-slate-200 p-3 text-center transition-all hover:border-blue-200 hover:shadow-sm ${role.color}`}
                      >
                        <div className="flex justify-center">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-white/80 ${role.color}`}>
                            <Icon size={15} />
                          </div>
                        </div>
                        <p className="mt-1.5 text-[10px] font-semibold text-slate-700 leading-tight">{role.name}</p>
                        <p className="text-[10px] text-slate-400">Level {role.level}</p>
                        <p className="mt-0.5 text-[10px] font-medium text-blue-600">{count} user</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* FOOTER */}
              <footer className="border-t border-slate-200/70 pt-4 text-center sm:pt-5">
                <p className="text-xs text-slate-400">© 2026 SmartSchool • Kelola User - Level Sekolah</p>
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// =========================================================
// STAT CARD
// =========================================================
function StatCard({ label, value, icon: Icon, color }) {
  const colorMap = {
    blue: { bg: "bg-blue-50", text: "text-blue-600" },
    emerald: { bg: "bg-emerald-50", text: "text-emerald-600" },
    rose: { bg: "bg-rose-50", text: "text-rose-600" },
    indigo: { bg: "bg-indigo-50", text: "text-indigo-600" },
  };

  const styles = colorMap[color] || colorMap.blue;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_7px_20px_rgba(15,23,42,0.08)] sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-slate-400">{label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-800">{value}</p>
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.bg} ${styles.text}`}>
          <Icon size={20} strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
}