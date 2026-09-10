"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit3,
  Trash2,
  RefreshCw,
  CheckCircle2,
  XCircle,
  UserRound,
  ScanFace,
  Camera,
  X,
  ShieldCheck,
  Mail,
  Phone,
  CalendarDays,
  Fingerprint,
  Save,
  AlertCircle,
  Users,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

/* =========================================================
   MOCK DATA
========================================================= */

const FACE_USERS = [
  {
    id: 1,
    nama: "Ahmad Fauzan",
    username: "ahmad.fauzan",
    email: "ahmad.fauzan@smartschool.com",
    noTelepon: "081234567890",
    peran: "Guru",
    jabatan: "Guru Matematika",
    status: "Aktif",
    faceStatus: "Terdaftar",
    faceId: "FACE-0001",
    registeredAt: "12 Agustus 2026",
    updatedAt: "12 Agustus 2026",
    avatar: "AF",
    confidence: 98,
  },
  {
    id: 2,
    nama: "Siti Rahma",
    username: "siti.rahma",
    email: "siti.rahma@smartschool.com",
    noTelepon: "081298765432",
    peran: "Guru",
    jabatan: "Guru Bahasa Indonesia",
    status: "Aktif",
    faceStatus: "Terdaftar",
    faceId: "FACE-0002",
    registeredAt: "13 Agustus 2026",
    updatedAt: "13 Agustus 2026",
    avatar: "SR",
    confidence: 97,
  },
  {
    id: 3,
    nama: "Budi Santoso",
    username: "budi.santoso",
    email: "budi.santoso@smartschool.com",
    noTelepon: "082112345678",
    peran: "Staff",
    jabatan: "Administrasi",
    status: "Aktif",
    faceStatus: "Terdaftar",
    faceId: "FACE-0003",
    registeredAt: "15 Agustus 2026",
    updatedAt: "15 Agustus 2026",
    avatar: "BS",
    confidence: 96,
  },
  {
    id: 4,
    nama: "Dewi Lestari",
    username: "dewi.lestari",
    email: "dewi.lestari@smartschool.com",
    noTelepon: "082233445566",
    peran: "Guru",
    jabatan: "Guru IPA",
    status: "Aktif",
    faceStatus: "Belum Terdaftar",
    faceId: null,
    registeredAt: null,
    updatedAt: null,
    avatar: "DL",
    confidence: null,
  },
  {
    id: 5,
    nama: "Rizky Pratama",
    username: "rizky.pratama",
    email: "rizky.pratama@smartschool.com",
    noTelepon: "083112223333",
    peran: "Siswa",
    jabatan: "XII IPA 1",
    status: "Aktif",
    faceStatus: "Terdaftar",
    faceId: "FACE-0005",
    registeredAt: "18 Agustus 2026",
    updatedAt: "18 Agustus 2026",
    avatar: "RP",
    confidence: 95,
  },
  {
    id: 6,
    nama: "Nabila Putri",
    username: "nabila.putri",
    email: "nabila.putri@smartschool.com",
    noTelepon: "083877665544",
    peran: "Siswa",
    jabatan: "XI IPS 2",
    status: "Aktif",
    faceStatus: "Terdaftar",
    faceId: "FACE-0006",
    registeredAt: "19 Agustus 2026",
    updatedAt: "19 Agustus 2026",
    avatar: "NP",
    confidence: 98,
  },
  {
    id: 7,
    nama: "Fajar Hidayat",
    username: "fajar.hidayat",
    email: "fajar.hidayat@smartschool.com",
    noTelepon: "085712345678",
    peran: "Staff",
    jabatan: "Operator Sekolah",
    status: "Aktif",
    faceStatus: "Belum Terdaftar",
    faceId: null,
    registeredAt: null,
    updatedAt: null,
    avatar: "FH",
    confidence: null,
  },
  {
    id: 8,
    nama: "Admin Sekolah",
    username: "admin",
    email: "admin@smartschool.com",
    noTelepon: "081111111111",
    peran: "Admin",
    jabatan: "Administrator",
    status: "Aktif",
    faceStatus: "Terdaftar",
    faceId: "FACE-0008",
    registeredAt: "20 Agustus 2026",
    updatedAt: "20 Agustus 2026",
    avatar: "AD",
    confidence: 99,
  },
  {
    id: 9,
    nama: "Yoga Saputra",
    username: "yoga.saputra",
    email: "yoga.saputra@smartschool.com",
    noTelepon: "082211223344",
    peran: "Siswa",
    jabatan: "X IPA 2",
    status: "Nonaktif",
    faceStatus: "Terdaftar",
    faceId: "FACE-0009",
    registeredAt: "21 Agustus 2026",
    updatedAt: "21 Agustus 2026",
    avatar: "YS",
    confidence: 94,
  },
  {
    id: 10,
    nama: "Maya Anggraini",
    username: "maya.anggraini",
    email: "maya.anggraini@smartschool.com",
    noTelepon: "085677889900",
    peran: "Guru",
    jabatan: "Guru Bahasa Inggris",
    status: "Aktif",
    faceStatus: "Terdaftar",
    faceId: "FACE-0010",
    registeredAt: "22 Agustus 2026",
    updatedAt: "22 Agustus 2026",
    avatar: "MA",
    confidence: 97,
  },
];

/* =========================================================
   CONFIG
========================================================= */

const roleConfig = {
  Guru: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-100",
  },
  Siswa: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-100",
  },
  Staff: {
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200",
  },
  Admin: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-100",
  },
};

/* =========================================================
   BADGES
========================================================= */

function RoleBadge({ role }) {
  const config = roleConfig[role] || roleConfig.Staff;

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${config.bg} ${config.text} ${config.border}`}
    >
      {role}
    </span>
  );
}

function FaceStatusBadge({ status }) {
  const registered = status === "Terdaftar";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium ${
        registered
          ? "border-emerald-100 bg-emerald-50 text-emerald-700"
          : "border-amber-100 bg-amber-50 text-amber-700"
      }`}
    >
      {registered ? (
        <CheckCircle2 size={13} />
      ) : (
        <AlertCircle size={13} />
      )}

      {status}
    </span>
  );
}

function AccountStatus({ status }) {
  const active = status === "Aktif";

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium ${
        active ? "text-emerald-600" : "text-slate-400"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-emerald-500" : "bg-slate-300"
        }`}
      />
      {status}
    </span>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ title, value, description, icon: Icon, iconBg }) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500">{title}</p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-800">
            {value}
          </p>

          <p className="mt-1 truncate text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
        >
          <Icon size={19} className="text-[#155DFC]" />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function FaceIdPage() {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("Semua");
  const [faceFilter, setFaceFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState("Semua");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const itemsPerPage = 7;

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredUsers = useMemo(() => {
    return FACE_USERS.filter((user) => {
      const search = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !search ||
        user.nama.toLowerCase().includes(search) ||
        user.username.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.jabatan.toLowerCase().includes(search);

      const matchesRole =
        roleFilter === "Semua" || user.peran === roleFilter;

      const matchesFace =
        faceFilter === "Semua" || user.faceStatus === faceFilter;

      const matchesStatus =
        statusFilter === "Semua" || user.status === statusFilter;

      return (
        matchesSearch &&
        matchesRole &&
        matchesFace &&
        matchesStatus
      );
    });
  }, [searchQuery, roleFilter, faceFilter, statusFilter]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / itemsPerPage)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedUsers = filteredUsers.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage
  );

  /* =========================================================
     STATISTICS
  ========================================================= */

  const totalUsers = FACE_USERS.length;

  const registeredUsers = FACE_USERS.filter(
    (user) => user.faceStatus === "Terdaftar"
  ).length;

  const notRegisteredUsers = FACE_USERS.filter(
    (user) => user.faceStatus === "Belum Terdaftar"
  ).length;

  const activeUsers = FACE_USERS.filter(
    (user) => user.status === "Aktif"
  ).length;

  /* =========================================================
     RESET FILTER
  ========================================================= */

  const resetFilters = () => {
    setSearchQuery("");
    setRoleFilter("Semua");
    setFaceFilter("Semua");
    setStatusFilter("Semua");
    setCurrentPage(1);
  };

  /* =========================================================
     OPEN EDIT
  ========================================================= */

  const handleOpenEdit = (user) => {
    setSelectedUser(null);
    setEditUser(user);
    setIsCameraActive(false);
    setIsCaptured(false);
  };

  /* =========================================================
     OPEN DETAIL
  ========================================================= */

  const handleOpenDetail = (user) => {
    setSelectedUser(user);
  };

  /* =========================================================
     CAMERA
  ========================================================= */

  const handleStartCamera = () => {
    setIsCameraActive(true);
    setIsCaptured(false);
  };

  const handleCapture = () => {
    setIsCaptured(true);
    setIsCameraActive(false);
  };

  const handleResetCapture = () => {
    setIsCaptured(false);
    setIsCameraActive(false);
  };

  /* =========================================================
     SAVE FACE ID
  ========================================================= */

  const handleSaveFaceId = async () => {
    if (!editUser) return;

    setIsSaving(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSaving(false);
    setEditUser(null);
    setIsCaptured(false);
    setIsCameraActive(false);
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async () => {
    if (!deleteUser) return;

    await new Promise((resolve) => setTimeout(resolve, 700));

    setDeleteUser(null);
  };

  /* =========================================================
     SIDEBAR
  ========================================================= */

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar
        active="faceId"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
        role="admin"
      />

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* HEADER */}

        <div className="sticky top-0 z-40 shrink-0">
          <Header
            toggleSidebar={toggleSidebar}
            notifications={[]}
            user={{
              name: "Admin Sekolah",
              email: "admin@smartschool.com",
              avatar: "AD",
            }}
          />
        </div>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <main className="min-h-0 flex-1 overflow-hidden">
          <div className="flex h-full min-h-0 flex-col px-4 py-4 sm:px-5 lg:px-6">
            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="mb-4 shrink-0">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eaf1ff]">
                      <ScanFace
                        size={19}
                        className="text-[#155DFC]"
                      />
                    </div>

                    <div className="min-w-0">
                      <h1 className="truncate text-lg font-bold tracking-tight text-slate-800 sm:text-xl">
                        Face ID
                      </h1>

                      <p className="truncate text-xs text-slate-500">
                        Kelola data pengenalan wajah pengguna sekolah
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    router.push("/admin/pengguna/face-id/tambah")
                  }
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#155DFC] to-[#0d47c9] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
                >
                  <Plus size={17} />
                  Tambah Face ID
                </button>
              </div>
            </div>

            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className="mb-4 grid shrink-0 grid-cols-2 gap-3 xl:grid-cols-4">
              <StatCard
                title="Total Pengguna"
                value={totalUsers}
                description="Seluruh pengguna"
                icon={Users}
                iconBg="bg-[#eaf1ff]"
              />

              <StatCard
                title="Face ID Terdaftar"
                value={registeredUsers}
                description="Sudah memiliki Face ID"
                icon={CheckCircle2}
                iconBg="bg-emerald-50"
              />

              <StatCard
                title="Belum Terdaftar"
                value={notRegisteredUsers}
                description="Perlu registrasi"
                icon={XCircle}
                iconBg="bg-amber-50"
              />

              <StatCard
                title="Pengguna Aktif"
                value={activeUsers}
                description="Akun berstatus aktif"
                icon={UserRound}
                iconBg="bg-indigo-50"
              />
            </div>

            {/* =================================================
                MAIN CARD
            ================================================= */}

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
              {/* =================================================
                  FILTER BAR
              ================================================= */}

              <div className="shrink-0 border-b border-slate-100 p-3 sm:p-4">
                <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
                  {/* SEARCH */}

                  <div className="relative min-w-0 flex-1">
                    <Search
                      size={17}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder="Cari nama, username, email, atau jabatan..."
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#8bb4ff] focus:bg-white focus:ring-2 focus:ring-[#155DFC]/10"
                    />
                  </div>

                  {/* FILTERS */}

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:flex">
                    <div className="relative">
                      <Filter
                        size={14}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <select
                        value={roleFilter}
                        onChange={(e) => {
                          setRoleFilter(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="h-10 min-w-[135px] appearance-none rounded-lg border border-slate-200 bg-white pl-8 pr-8 text-xs font-medium text-slate-600 outline-none focus:border-[#8bb4ff] focus:ring-2 focus:ring-[#155DFC]/10"
                      >
                        <option value="Semua">Semua Peran</option>
                        <option value="Guru">Guru</option>
                        <option value="Siswa">Siswa</option>
                        <option value="Staff">Staff</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>

                    <select
                      value={faceFilter}
                      onChange={(e) => {
                        setFaceFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="h-10 min-w-[145px] rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 outline-none focus:border-[#8bb4ff] focus:ring-2 focus:ring-[#155DFC]/10"
                    >
                      <option value="Semua">Semua Face ID</option>
                      <option value="Terdaftar">Terdaftar</option>
                      <option value="Belum Terdaftar">
                        Belum Terdaftar
                      </option>
                    </select>

                    <select
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="h-10 min-w-[125px] rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 outline-none focus:border-[#8bb4ff] focus:ring-2 focus:ring-[#155DFC]/10"
                    >
                      <option value="Semua">Semua Status</option>
                      <option value="Aktif">Aktif</option>
                      <option value="Nonaktif">Nonaktif</option>
                    </select>

                    <button
                      onClick={resetFilters}
                      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-500 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      <RotateCcw size={14} />
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* =================================================
                  TABLE
              ================================================= */}

              <div className="min-h-0 flex-1 overflow-auto">
                <table className="w-full min-w-[900px] border-collapse">
                  <thead className="sticky top-0 z-10 bg-slate-50">
                    <tr className="border-b border-slate-200">
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Pengguna
                      </th>

                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Peran
                      </th>

                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Face ID
                      </th>

                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Confidence
                      </th>

                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Status
                      </th>

                      <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Aksi
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {paginatedUsers.length > 0 ? (
                      paginatedUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="group transition hover:bg-slate-50/70"
                        >
                          {/* USER */}

                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eaf1ff] text-xs font-bold text-[#155DFC]">
                                {user.avatar}
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-700">
                                  {user.nama}
                                </p>

                                <p className="truncate text-xs text-slate-400">
                                  @{user.username}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* ROLE */}

                          <td className="px-4 py-3">
                            <RoleBadge role={user.peran} />

                            <p className="mt-1 max-w-[150px] truncate text-[11px] text-slate-400">
                              {user.jabatan}
                            </p>
                          </td>

                          {/* FACE */}

                          <td className="px-4 py-3">
                            <FaceStatusBadge
                              status={user.faceStatus}
                            />

                            {user.faceId && (
                              <p className="mt-1 text-[11px] text-slate-400">
                                {user.faceId}
                              </p>
                            )}
                          </td>

                          {/* CONFIDENCE */}

                          <td className="px-4 py-3">
                            {user.confidence ? (
                              <div className="w-[110px]">
                                <div className="mb-1 flex items-center justify-between">
                                  <span className="text-xs font-semibold text-slate-700">
                                    {user.confidence}%
                                  </span>
                                </div>

                                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                                  <div
                                    className="h-full rounded-full bg-[#155DFC]"
                                    style={{
                                      width: `${user.confidence}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            ) : (
                              <span className="text-xs text-slate-400">
                                —
                              </span>
                            )}
                          </td>

                          {/* STATUS */}

                          <td className="px-4 py-3">
                            <AccountStatus status={user.status} />
                          </td>

                          {/* ACTION */}

                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => handleOpenDetail(user)}
                                title="Lihat detail"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-[#eaf1ff] hover:text-[#155DFC]"
                              >
                                <Eye size={16} />
                              </button>

                              <button
                                onClick={() => handleOpenEdit(user)}
                                title="Edit Face ID"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-[#eaf1ff] hover:text-[#155DFC]"
                              >
                                <Edit3 size={16} />
                              </button>

                              <button
                                onClick={() => setDeleteUser(user)}
                                title="Hapus Face ID"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-4 py-16">
                          <div className="flex flex-col items-center justify-center text-center">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                              <Search
                                size={20}
                                className="text-slate-400"
                              />
                            </div>

                            <p className="text-sm font-semibold text-slate-700">
                              Data tidak ditemukan
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
              ================================================= */}

              <div className="flex shrink-0 flex-col gap-2 border-t border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-400">
                  Menampilkan{" "}
                  <span className="font-medium text-slate-600">
                    {filteredUsers.length === 0
                      ? 0
                      : (safeCurrentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  -{" "}
                  <span className="font-medium text-slate-600">
                    {Math.min(
                      safeCurrentPage * itemsPerPage,
                      filteredUsers.length
                    )}
                  </span>{" "}
                  dari{" "}
                  <span className="font-medium text-slate-600">
                    {filteredUsers.length}
                  </span>{" "}
                  data
                </p>

                <div className="flex items-center gap-1">
                  <button
                    disabled={safeCurrentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.max(1, prev - 1)
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={15} />
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-medium transition ${
                        safeCurrentPage === page
                          ? "bg-[#155DFC] text-white"
                          : "border border-transparent text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    disabled={safeCurrentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(totalPages, prev + 1)
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* =========================================================
          DETAIL MODAL
      ========================================================= */}

      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Detail Face ID
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  Informasi registrasi Face ID pengguna
                </p>
              </div>

              <button
                onClick={() => setSelectedUser(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* CONTENT */}

            <div className="max-h-[75vh] overflow-y-auto p-5">
              <div className="grid gap-5 md:grid-cols-[180px_1fr]">
                {/* FACE PREVIEW */}

                <div className="flex flex-col items-center">
                  <div className="relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-2xl border border-[#c7dbff] bg-[#eaf1ff]">
                    <ScanFace
                      size={70}
                      strokeWidth={1.4}
                      className="text-[#155DFC]"
                    />

                    {selectedUser.faceStatus === "Terdaftar" && (
                      <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-white/90 px-2 py-1 text-center text-[10px] font-semibold text-emerald-600 shadow-sm">
                        Face terdeteksi
                      </div>
                    )}
                  </div>

                  <div className="mt-3 text-center">
                    <FaceStatusBadge
                      status={selectedUser.faceStatus}
                    />
                  </div>
                </div>

                {/* INFORMATION */}

                <div>
                  <div className="mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-800">
                        {selectedUser.nama}
                      </h3>

                      <RoleBadge role={selectedUser.peran} />
                    </div>

                    <p className="mt-1 text-xs text-slate-400">
                      @{selectedUser.username}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <InfoItem
                      icon={Mail}
                      label="Email"
                      value={selectedUser.email}
                    />

                    <InfoItem
                      icon={Phone}
                      label="No. Telepon"
                      value={selectedUser.noTelepon}
                    />

                    <InfoItem
                      icon={UserRound}
                      label="Jabatan / Kelas"
                      value={selectedUser.jabatan}
                    />

                    <InfoItem
                      icon={ShieldCheck}
                      label="Status Akun"
                      value={selectedUser.status}
                    />

                    <InfoItem
                      icon={Fingerprint}
                      label="Face ID"
                      value={selectedUser.faceId || "Belum tersedia"}
                    />

                    <InfoItem
                      icon={CalendarDays}
                      label="Registrasi"
                      value={selectedUser.registeredAt || "Belum terdaftar"}
                    />
                  </div>

                  {selectedUser.confidence && (
                    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-500">
                          Tingkat Confidence
                        </span>

                        <span className="text-sm font-bold text-[#155DFC]">
                          {selectedUser.confidence}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full rounded-full bg-[#155DFC]"
                          style={{
                            width: `${selectedUser.confidence}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* FOOTER */}

            <div className="flex flex-col-reverse gap-2 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Tutup
              </button>

              <button
                onClick={() => handleOpenEdit(selectedUser)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#155DFC] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0d47c9]"
              >
                <Edit3 size={15} />
                Perbarui Face ID
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          EDIT FACE ID MODAL
      ========================================================= */}

      {editUser && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-[2px]">
          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* HEADER */}

            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eaf1ff]">
                  <ScanFace
                    size={18}
                    className="text-[#155DFC]"
                  />
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-800">
                    {editUser.faceStatus === "Terdaftar"
                      ? "Perbarui Face ID"
                      : "Daftarkan Face ID"}
                  </h2>

                  <p className="text-xs text-slate-400">
                    {editUser.nama}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setEditUser(null);
                  setIsCameraActive(false);
                  setIsCaptured(false);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* BODY */}

            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
                {/* CAMERA AREA */}

                <div>
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">
                    <div className="relative aspect-[4/3] min-h-[280px]">
                      {/* CAMERA ACTIVE */}

                      {isCameraActive && !isCaptured && (
                        <>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative h-52 w-40 rounded-[45%] border-2 border-blue-400/80">
                              <div className="absolute left-1/2 top-1/2 h-px w-32 -translate-x-1/2 bg-blue-400/70" />

                              <div className="absolute left-1/2 top-1/2 h-32 w-px -translate-y-1/2 bg-blue-400/70" />

                              <div className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-blue-400" />
                            </div>
                          </div>

                          <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                            <span className="rounded-md bg-black/40 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur">
                              Kamera aktif
                            </span>

                            <span className="flex items-center gap-1.5 rounded-md bg-emerald-500/90 px-2.5 py-1 text-[10px] font-semibold text-white">
                              <span className="h-1.5 w-1.5 rounded-full bg-white" />
                              Ready
                            </span>
                          </div>

                          <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                            <button
                              onClick={handleCapture}
                              className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white/70 bg-[#155DFC] text-white shadow-lg transition hover:scale-105 hover:bg-[#0d47c9]"
                            >
                              <Camera size={22} />
                            </button>
                          </div>
                        </>
                      )}

                      {/* CAPTURED */}

                      {isCaptured && (
                        <>
                          <div className="absolute inset-0 flex items-center justify-center bg-[#eaf1ff]">
                            <div className="relative flex h-52 w-40 items-center justify-center rounded-[45%] border-2 border-emerald-500 bg-white/70">
                              <UserRound
                                size={72}
                                strokeWidth={1.2}
                                className="text-[#155DFC]"
                              />

                              <div className="absolute inset-x-0 top-1/2 h-px bg-emerald-400/60" />
                            </div>
                          </div>

                          <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                            <span className="rounded-md bg-emerald-500 px-2.5 py-1 text-[10px] font-semibold text-white">
                              Wajah berhasil dipindai
                            </span>

                            <span className="rounded-md bg-white px-2.5 py-1 text-[10px] font-bold text-emerald-600 shadow-sm">
                              98%
                            </span>
                          </div>

                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                            <button
                              onClick={handleResetCapture}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-md transition hover:bg-slate-50"
                            >
                              <RefreshCw size={13} />
                              Scan Ulang
                            </button>
                          </div>
                        </>
                      )}

                      {/* INITIAL */}

                      {!isCameraActive && !isCaptured && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                            <ScanFace
                              size={34}
                              strokeWidth={1.3}
                              className="text-white"
                            />
                          </div>

                          <h3 className="text-sm font-semibold text-white">
                            Siapkan registrasi wajah
                          </h3>

                          <p className="mt-1 max-w-xs text-xs leading-relaxed text-slate-400">
                            Pastikan wajah terlihat jelas dan
                            berada di tengah area kamera.
                          </p>

                          <button
                            onClick={handleStartCamera}
                            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#155DFC] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0d47c9]"
                          >
                            <Camera size={15} />
                            Mulai Kamera
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* INSTRUCTION */}

                  <div className="mt-3 rounded-xl border border-blue-100 bg-[#f5f8ff] p-3">
                    <div className="flex gap-2.5">
                      <div className="mt-0.5 shrink-0">
                        <ShieldCheck
                          size={16}
                          className="text-[#155DFC]"
                        />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-700">
                          Panduan registrasi
                        </p>

                        <ul className="mt-1 space-y-1 text-[11px] leading-relaxed text-slate-500">
                          <li>
                            • Pastikan wajah menghadap kamera.
                          </li>

                          <li>
                            • Gunakan pencahayaan yang cukup.
                          </li>

                          <li>
                            • Hindari menggunakan masker atau
                            menutupi wajah.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* USER INFO */}

                <div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Informasi Pengguna
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf1ff] text-sm font-bold text-[#155DFC]">
                        {editUser.avatar}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-800">
                          {editUser.nama}
                        </p>

                        <p className="truncate text-xs text-slate-400">
                          @{editUser.username}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      <SmallInfo
                        label="Peran"
                        value={editUser.peran}
                      />

                      <SmallInfo
                        label="Jabatan / Kelas"
                        value={editUser.jabatan}
                      />

                      <SmallInfo
                        label="Email"
                        value={editUser.email}
                      />

                      <SmallInfo
                        label="Status"
                        value={editUser.status}
                      />
                    </div>
                  </div>

                  {/* FACE STATUS */}

                  <div className="mt-3 rounded-xl border border-slate-200 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Status Face ID
                    </p>

                    <div className="mt-3">
                      <FaceStatusBadge
                        status={
                          isCaptured
                            ? "Terdaftar"
                            : editUser.faceStatus
                        }
                      />
                    </div>

                    {editUser.faceId && !isCaptured && (
                      <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                        <span className="text-xs text-slate-500">
                          ID terdaftar
                        </span>

                        <span className="text-xs font-semibold text-slate-700">
                          {editUser.faceId}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}

            <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] text-slate-400">
                Data Face ID digunakan untuk proses autentikasi
                dan presensi.
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditUser(null);
                    setIsCameraActive(false);
                    setIsCaptured(false);
                  }}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  Batal
                </button>

                <button
                  disabled={!isCaptured || isSaving}
                  onClick={handleSaveFaceId}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#155DFC] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0d47c9] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw
                        size={15}
                        className="animate-spin"
                      />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save size={15} />
                      Simpan Face ID
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          DELETE MODAL
      ========================================================= */}

      {deleteUser && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
                <Trash2
                  size={19}
                  className="text-red-500"
                />
              </div>

              <div className="min-w-0">
                <h2 className="text-base font-bold text-slate-800">
                  Hapus Face ID?
                </h2>

                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Face ID milik{" "}
                  <span className="font-semibold text-slate-700">
                    {deleteUser.nama}
                  </span>{" "}
                  akan dihapus dari sistem. Akun pengguna tidak
                  akan ikut terhapus.
                </p>
              </div>

              <button
                onClick={() => setDeleteUser(null)}
                className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X size={17} />
              </button>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                onClick={() => setDeleteUser(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Batal
              </button>

              <button
                onClick={handleDelete}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <Trash2 size={15} />
                Hapus Face ID
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50">
          <Icon size={14} className="text-slate-400" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className="mt-0.5 truncate text-xs font-semibold text-slate-700">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SMALL INFO
========================================================= */

function SmallInfo({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-0.5 break-words text-xs font-medium text-slate-700">
        {value}
      </p>
    </div>
  );
}