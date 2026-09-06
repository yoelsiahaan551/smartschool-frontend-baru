"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

import {
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Pencil,
  UserCheck,
  UserX,
  GraduationCap,
  BriefcaseBusiness,
  ShieldCheck,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Download,
  RefreshCw,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

/* =========================================================
   MOCK DATA
   NANTI BISA DIGANTI HASIL API
========================================================= */

const USERS = [
  {
    id: "USR-001",
    nama: "Ahmad Fauzan",
    username: "ahmad.fauzan",
    email: "ahmad.fauzan@smartschool.com",
    noTelepon: "081234567890",
    peran: "Guru",
    jabatan: "Guru Matematika",
    status: "Aktif",
    avatar: "AF",
  },
  {
    id: "USR-002",
    nama: "Siti Rahma",
    username: "siti.rahma",
    email: "siti.rahma@smartschool.com",
    noTelepon: "081298765432",
    peran: "Guru",
    jabatan: "Guru Bahasa Indonesia",
    status: "Aktif",
    avatar: "SR",
  },
  {
    id: "USR-003",
    nama: "Budi Santoso",
    username: "budi.santoso",
    email: "budi.santoso@smartschool.com",
    noTelepon: "082112345678",
    peran: "Staff",
    jabatan: "Administrasi",
    status: "Aktif",
    avatar: "BS",
  },
  {
    id: "USR-004",
    nama: "Dina Amelia",
    username: "dina.amelia",
    email: "dina.amelia@smartschool.com",
    noTelepon: "085712345678",
    peran: "Guru",
    jabatan: "Guru Bahasa Inggris",
    status: "Aktif",
    avatar: "DA",
  },
  {
    id: "USR-005",
    nama: "Rizky Pratama",
    username: "rizky.pratama",
    email: "rizky.pratama@smartschool.com",
    noTelepon: "081377889900",
    peran: "Siswa",
    jabatan: "Siswa Kelas XII RPL 1",
    status: "Aktif",
    avatar: "RP",
  },
  {
    id: "USR-006",
    nama: "Nadia Putri",
    username: "nadia.putri",
    email: "nadia.putri@smartschool.com",
    noTelepon: "082233445566",
    peran: "Siswa",
    jabatan: "Siswa Kelas XI RPL 2",
    status: "Aktif",
    avatar: "NP",
  },
  {
    id: "USR-007",
    nama: "Fajar Ramadhan",
    username: "fajar.ramadhan",
    email: "fajar.ramadhan@smartschool.com",
    noTelepon: "083811223344",
    peran: "Staff",
    jabatan: "Staff Keuangan",
    status: "Nonaktif",
    avatar: "FR",
  },
  {
    id: "USR-008",
    nama: "Dewi Lestari",
    username: "dewi.lestari",
    email: "dewi.lestari@smartschool.com",
    noTelepon: "081266778899",
    peran: "Guru",
    jabatan: "Guru IPA",
    status: "Aktif",
    avatar: "DL",
  },
  {
    id: "USR-009",
    nama: "Andi Saputra",
    username: "andi.saputra",
    email: "andi.saputra@smartschool.com",
    noTelepon: "085612341234",
    peran: "Siswa",
    jabatan: "Siswa Kelas X TKJ 1",
    status: "Aktif",
    avatar: "AS",
  },
  {
    id: "USR-010",
    nama: "Maya Puspita",
    username: "maya.puspita",
    email: "maya.puspita@smartschool.com",
    noTelepon: "081355667788",
    peran: "Admin",
    jabatan: "Admin Sekolah",
    status: "Aktif",
    avatar: "MP",
  },
];

/* =========================================================
   FORMAT
========================================================= */

const roleConfig = {
  Guru: {
    icon: GraduationCap,
    className: "bg-blue-50 text-blue-600 border-blue-200",
  },

  Siswa: {
    icon: GraduationCap,
    className: "bg-indigo-50 text-indigo-600 border-indigo-200",
  },

  Staff: {
    icon: BriefcaseBusiness,
    className: "bg-amber-50 text-amber-600 border-amber-200",
  },

  Admin: {
    icon: ShieldCheck,
    className: "bg-purple-50 text-purple-600 border-purple-200",
  },
};

/* =========================================================
   ROLE BADGE
========================================================= */

function RoleBadge({ role }) {
  const config = roleConfig[role] || {
    icon: Users,
    className: "bg-slate-100 text-slate-600 border-slate-200",
  };

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold whitespace-nowrap ${config.className}`}
    >
      <Icon size={12} />
      {role}
    </span>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const active = status === "Aktif";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold whitespace-nowrap ${
        active
          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
          : "bg-red-50 text-red-600 border-red-200"
      }`}
    >
      {active ? (
        <CheckCircle2 size={12} />
      ) : (
        <AlertCircle size={12} />
      )}

      {status}
    </span>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-medium text-slate-500 tracking-wide">
            {title}
          </p>

          <p className="mt-1.5 text-2xl font-bold text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-[10px] sm:text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
          <Icon size={17} className={iconClass} />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function PenggunaPage() {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  const itemsPerPage = 7;

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredUsers = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return USERS.filter((user) => {
      const matchSearch =
        user.nama.toLowerCase().includes(keyword) ||
        user.username.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.id.toLowerCase().includes(keyword) ||
        user.jabatan.toLowerCase().includes(keyword);

      const matchRole =
        roleFilter === "Semua" ||
        user.peran === roleFilter;

      const matchStatus =
        statusFilter === "Semua" ||
        user.status === statusFilter;

      return (
        matchSearch &&
        matchRole &&
        matchStatus
      );
    });
  }, [search, roleFilter, statusFilter]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredUsers.length / itemsPerPage,
    ),
  );

  const currentPage = Math.min(
    page,
    totalPages,
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  /* =======================================================
     STATISTICS
  ======================================================= */

  const totalUsers = USERS.length;

  const totalGuru = USERS.filter(
    (user) => user.peran === "Guru",
  ).length;

  const totalSiswa = USERS.filter(
    (user) => user.peran === "Siswa",
  ).length;

  const totalStaff = USERS.filter(
    (user) => user.peran === "Staff",
  ).length;

  const totalActive = USERS.filter(
    (user) => user.status === "Aktif",
  ).length;

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar
        active="pengguna"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
        role="admin"
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">

        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email: "admin@smartschool.com",
            avatar: "AD",
          }}
        />

        <main className="flex-1 overflow-y-auto">

          <div className="p-4 sm:p-6 lg:p-8 space-y-6">

            {/* =================================================
                PAGE HEADER
            ================================================== */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white shadow-lg shadow-[#155DFC]/20">
                  <Users size={20} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-slate-800">
                    List Pengguna
                  </h1>

                  <p className="text-sm text-slate-500 mt-1">
                    Kelola seluruh pengguna yang terdaftar di sekolah.
                  </p>
                </div>

              </div>

              <div className="flex flex-col sm:flex-row gap-2">

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50 transition"
                >
                  <RefreshCw size={15} />
                  Refresh
                </button>

                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      "/admin/pengguna/tambah",
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#155DFC] to-[#0d47c9] text-white text-sm font-semibold shadow-sm hover:brightness-110 transition"
                >
                  <Plus size={16} />
                  Tambah Pengguna
                </button>

              </div>
            </div>

            {/* =================================================
                STATISTICS
            ================================================== */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

              <StatCard
                title="Total Pengguna"
                value={totalUsers}
                description={`${totalActive} pengguna aktif`}
                icon={Users}
                iconClass="text-[#155DFC]"
              />

              <StatCard
                title="Guru"
                value={totalGuru}
                description="Pengguna dengan role Guru"
                icon={GraduationCap}
                iconClass="text-blue-500"
              />

              <StatCard
                title="Siswa"
                value={totalSiswa}
                description="Pengguna dengan role Siswa"
                icon={Users}
                iconClass="text-indigo-500"
              />

              <StatCard
                title="Staff"
                value={totalStaff}
                description="Pengguna dengan role Staff"
                icon={BriefcaseBusiness}
                iconClass="text-amber-500"
              />

            </div>

            {/* =================================================
                QUICK ROLE SUMMARY
            ================================================== */}

            <section className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">

              <div className="p-5 sm:p-6">

                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

                  <div>
                    <h2 className="text-sm font-bold text-slate-800">
                      Ringkasan Pengguna
                    </h2>

                    <p className="text-xs text-slate-400 mt-1">
                      Distribusi pengguna berdasarkan peran.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full xl:w-auto">

                    <button
                      type="button"
                      onClick={() => {
                        setRoleFilter("Semua");
                        setPage(1);
                      }}
                      className={`px-4 py-3 rounded-lg border text-left transition ${
                        roleFilter === "Semua"
                          ? "bg-[#eaf1ff] border-[#c7dbff]"
                          : "bg-white border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <p className="text-[10px] text-slate-400">
                        Semua
                      </p>

                      <p className="text-lg font-bold text-slate-800 mt-1">
                        {totalUsers}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setRoleFilter("Guru");
                        setPage(1);
                      }}
                      className={`px-4 py-3 rounded-lg border text-left transition ${
                        roleFilter === "Guru"
                          ? "bg-[#eaf1ff] border-[#c7dbff]"
                          : "bg-white border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <p className="text-[10px] text-slate-400">
                        Guru
                      </p>

                      <p className="text-lg font-bold text-slate-800 mt-1">
                        {totalGuru}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setRoleFilter("Siswa");
                        setPage(1);
                      }}
                      className={`px-4 py-3 rounded-lg border text-left transition ${
                        roleFilter === "Siswa"
                          ? "bg-[#eaf1ff] border-[#c7dbff]"
                          : "bg-white border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <p className="text-[10px] text-slate-400">
                        Siswa
                      </p>

                      <p className="text-lg font-bold text-slate-800 mt-1">
                        {totalSiswa}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setRoleFilter("Staff");
                        setPage(1);
                      }}
                      className={`px-4 py-3 rounded-lg border text-left transition ${
                        roleFilter === "Staff"
                          ? "bg-[#eaf1ff] border-[#c7dbff]"
                          : "bg-white border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <p className="text-[10px] text-slate-400">
                        Staff
                      </p>

                      <p className="text-lg font-bold text-slate-800 mt-1">
                        {totalStaff}
                      </p>
                    </button>

                  </div>

                </div>
              </div>

            </section>

            {/* =================================================
                FILTER
            ================================================== */}

            <section className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4">

              <div className="flex flex-col lg:flex-row gap-3">

                <div className="relative flex-1">

                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setPage(1);
                    }}
                    placeholder="Cari nama, username, email, ID, atau jabatan..."
                    className="w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20 focus:border-[#155DFC]/50 text-slate-800 placeholder:text-slate-400"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setPage(1);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X size={15} />
                    </button>
                  )}

                </div>

                <div className="flex flex-col sm:flex-row gap-2">

                  <select
                    value={roleFilter}
                    onChange={(event) => {
                      setRoleFilter(event.target.value);
                      setPage(1);
                    }}
                    className="text-sm rounded-lg border border-slate-200 px-3 py-2.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20"
                  >
                    <option value="Semua">
                      Semua Role
                    </option>

                    <option value="Guru">
                      Guru
                    </option>

                    <option value="Siswa">
                      Siswa
                    </option>

                    <option value="Staff">
                      Staff
                    </option>

                    <option value="Admin">
                      Admin
                    </option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(event) => {
                      setStatusFilter(event.target.value);
                      setPage(1);
                    }}
                    className="text-sm rounded-lg border border-slate-200 px-3 py-2.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/20"
                  >
                    <option value="Semua">
                      Semua Status
                    </option>

                    <option value="Aktif">
                      Aktif
                    </option>

                    <option value="Nonaktif">
                      Nonaktif
                    </option>
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setRoleFilter("Semua");
                      setStatusFilter("Semua");
                      setPage(1);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50"
                  >
                    <Filter size={15} />
                    Reset
                  </button>

                </div>

              </div>
            </section>

            {/* =================================================
                TABLE
            ================================================== */}

            <section className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">

              <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <div>
                  <h2 className="text-sm font-bold text-slate-800">
                    Data Pengguna
                  </h2>

                  <p className="text-xs text-slate-400 mt-1">
                    Menampilkan pengguna berdasarkan filter yang dipilih.
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 text-xs font-semibold hover:bg-slate-50 w-fit"
                >
                  <Download size={14} />
                  Export Data
                </button>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full min-w-[1150px] text-sm border-collapse">

                  <thead>

                    <tr className="bg-gradient-to-r from-[#155DFC] to-[#0d47c9] text-white">

                      <th className="px-4 py-3 text-center font-semibold w-[65px]">
                        No
                      </th>

                      <th className="px-4 py-3 text-left font-semibold">
                        Pengguna
                      </th>

                      <th className="px-4 py-3 text-left font-semibold">
                        Kontak
                      </th>

                      <th className="px-4 py-3 text-left font-semibold">
                        Role
                      </th>

                      <th className="px-4 py-3 text-left font-semibold">
                        Jabatan / Keterangan
                      </th>

                      <th className="px-4 py-3 text-center font-semibold">
                        Status
                      </th>

                      <th className="px-4 py-3 text-center font-semibold">
                        Aksi
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {paginatedUsers.map(
                      (user, index) => (
                        <tr
                          key={user.id}
                          className={`border-b border-slate-100 last:border-0 hover:bg-[#eaf1ff] transition-colors ${
                            index % 2 === 0
                              ? "bg-[#f7f9ff]"
                              : "bg-white"
                          }`}
                        >

                          {/* NO */}
                          <td className="px-4 py-3 text-center">

                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#eaf1ff] border border-[#c7dbff] text-[#155DFC] text-xs font-bold">
                              {(currentPage - 1) *
                                itemsPerPage +
                                index +
                                1}
                            </span>

                          </td>

                          {/* USER */}
                          <td className="px-4 py-3">

                            <div className="flex items-center gap-3">

                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white flex items-center justify-center text-xs font-bold shrink-0">
                                {user.avatar}
                              </div>

                              <div className="min-w-0">

                                <p className="font-semibold text-slate-800 truncate max-w-[230px]">
                                  {user.nama}
                                </p>

                                <p className="text-[11px] text-slate-400 mt-0.5">
                                  {user.id}
                                </p>

                              </div>

                            </div>

                          </td>

                          {/* KONTAK */}
                          <td className="px-4 py-3">

                            <div className="space-y-1">

                              <div className="flex items-center gap-2">
                                <Mail
                                  size={13}
                                  className="text-[#155DFC]"
                                />

                                <span className="text-xs text-slate-600">
                                  {user.email}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <Phone
                                  size={13}
                                  className="text-slate-400"
                                />

                                <span className="text-xs text-slate-500">
                                  {user.noTelepon}
                                </span>
                              </div>

                            </div>

                          </td>

                          {/* ROLE */}
                          <td className="px-4 py-3">
                            <RoleBadge role={user.peran} />
                          </td>

                          {/* JABATAN */}
                          <td className="px-4 py-3">

                            <p className="text-xs font-medium text-slate-700">
                              {user.jabatan}
                            </p>

                            <p className="text-[11px] text-slate-400 mt-1">
                              @{user.username}
                            </p>

                          </td>

                          {/* STATUS */}
                          <td className="px-4 py-3 text-center">
                            <StatusBadge
                              status={user.status}
                            />
                          </td>

                          {/* ACTION */}
                          <td className="px-4 py-3">

                            <div className="flex items-center justify-center gap-1.5">

                              <button
                                type="button"
                                onClick={() => {
                                  router.push(
                                    `/admin/pengguna/${user.id}`,
                                  );
                                }}
                                className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-[#155DFC] hover:bg-[#eaf1ff] transition flex items-center justify-center"
                                title="Detail"
                              >
                                <Eye size={14} />
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  router.push(
                                    `/admin/pengguna/${user.id}/edit`,
                                  );
                                }}
                                className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-[#155DFC] hover:bg-[#eaf1ff] transition flex items-center justify-center"
                                title="Edit"
                              >
                                <Pencil size={14} />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedUser(user)
                                }
                                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition ${
                                  user.status === "Aktif"
                                    ? "border-red-200 bg-white text-red-500 hover:bg-red-50"
                                    : "border-emerald-200 bg-white text-emerald-500 hover:bg-emerald-50"
                                }`}
                                title={
                                  user.status ===
                                  "Aktif"
                                    ? "Nonaktifkan"
                                    : "Aktifkan"
                                }
                              >
                                {user.status ===
                                "Aktif" ? (
                                  <UserX size={14} />
                                ) : (
                                  <UserCheck size={14} />
                                )}
                              </button>

                              <button
                                type="button"
                                className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center"
                                title="Lainnya"
                              >
                                <MoreHorizontal
                                  size={14}
                                />
                              </button>

                            </div>

                          </td>

                        </tr>
                      ),
                    )}

                    {/* EMPTY */}
                    {paginatedUsers.length === 0 && (
                      <tr>

                        <td
                          colSpan={7}
                          className="px-4 py-16 text-center"
                        >

                          <div className="flex flex-col items-center">

                            <div className="w-12 h-12 rounded-full bg-[#eaf1ff] border border-[#c7dbff] flex items-center justify-center">
                              <Search
                                size={20}
                                className="text-[#155DFC]"
                              />
                            </div>

                            <p className="mt-3 text-sm font-semibold text-slate-700">
                              Pengguna tidak ditemukan
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              Coba ubah kata pencarian atau filter.
                            </p>

                          </div>

                        </td>

                      </tr>
                    )}

                  </tbody>

                </table>

              </div>

              {/* =================================================
                  PAGINATION
              ================================================== */}

              <div className="px-4 sm:px-5 py-3 border-t border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <p className="text-xs text-slate-500">
                  Menampilkan{" "}
                  <span className="font-semibold text-slate-700">
                    {paginatedUsers.length}
                  </span>{" "}
                  dari{" "}
                  <span className="font-semibold text-slate-700">
                    {filteredUsers.length}
                  </span>{" "}
                  pengguna
                </p>

                <div className="flex items-center gap-1">

                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setPage(
                        Math.max(
                          1,
                          currentPage - 1,
                        ),
                      )
                    }
                    className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-500 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                  >
                    <ChevronLeft size={15} />
                  </button>

                  {Array.from(
                    {
                      length: totalPages,
                    },
                    (_, index) => index + 1,
                  ).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() =>
                        setPage(pageNumber)
                      }
                      className={`w-8 h-8 rounded-lg text-xs font-semibold transition ${
                        currentPage === pageNumber
                          ? "bg-[#155DFC] text-white"
                          : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={
                      currentPage ===
                      totalPages
                    }
                    onClick={() =>
                      setPage(
                        Math.min(
                          totalPages,
                          currentPage + 1,
                        ),
                      )
                    }
                    className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-500 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                  >
                    <ChevronRight size={15} />
                  </button>

                </div>

              </div>

            </section>

          </div>

        </main>

      </div>

      {/* =====================================================
          CONFIRM MODAL
      ====================================================== */}

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() =>
              setSelectedUser(null)
            }
          />

          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    selectedUser.status ===
                    "Aktif"
                      ? "bg-red-50"
                      : "bg-emerald-50"
                  }`}
                >
                  {selectedUser.status ===
                  "Aktif" ? (
                    <UserX
                      size={17}
                      className="text-red-500"
                    />
                  ) : (
                    <UserCheck
                      size={17}
                      className="text-emerald-500"
                    />
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    {selectedUser.status ===
                    "Aktif"
                      ? "Nonaktifkan Pengguna"
                      : "Aktifkan Pengguna"}
                  </h3>

                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Konfirmasi perubahan status akun
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedUser(null)
                }
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400"
              >
                <X size={16} />
              </button>

            </div>

            <div className="p-5">

              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">

                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white flex items-center justify-center text-xs font-bold">
                  {selectedUser.avatar}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {selectedUser.nama}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    {selectedUser.email}
                  </p>
                </div>

              </div>

              <p className="text-sm text-slate-600 leading-6 mt-4">
                Apakah kamu yakin ingin{" "}
                <span className="font-semibold">
                  {selectedUser.status ===
                  "Aktif"
                    ? "menonaktifkan"
                    : "mengaktifkan"}
                </span>{" "}
                akun pengguna ini?
              </p>

            </div>

            <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/70 flex justify-end gap-2">

              <button
                type="button"
                onClick={() =>
                  setSelectedUser(null)
                }
                className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedUser(null)
                }
                className={`px-4 py-2.5 rounded-lg text-white text-sm font-semibold ${
                  selectedUser.status ===
                  "Aktif"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-emerald-500 hover:bg-emerald-600"
                }`}
              >
                {selectedUser.status ===
                "Aktif"
                  ? "Nonaktifkan"
                  : "Aktifkan"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}