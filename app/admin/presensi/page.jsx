"use client";

import { useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

import {
  Search,
  Filter,
  CalendarDays,
  Users,
  UserCheck,
  Clock3,
  UserX,
  ClipboardCheck,
  Eye,
  Edit3,
  X,
  Check,
  RotateCcw,
  Download,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  UserRound,
  BookOpen,
  AlertCircle,
} from "lucide-react";

/* =========================================================
   MOCK DATA
========================================================= */

const PRESENSI_DATA = [
  {
    id: 1,
    nama: "Ahmad Fauzan",
    nomorInduk: "1987654321",
    kelas: "XII IPA 1",
    role: "Guru",
    tanggal: "09 September 2026",
    jamMasuk: "06:47",
    jamPulang: "15:32",
    status: "Hadir",
    metode: "Face ID",
    lokasi: "Sekolah",
    keterangan: "-",
    avatar: "AF",
  },
  {
    id: 2,
    nama: "Siti Rahma",
    nomorInduk: "1987654322",
    kelas: "XI IPS 2",
    role: "Guru",
    tanggal: "09 September 2026",
    jamMasuk: "06:51",
    jamPulang: "15:30",
    status: "Hadir",
    metode: "Face ID",
    lokasi: "Sekolah",
    keterangan: "-",
    avatar: "SR",
  },
  {
    id: 3,
    nama: "Budi Santoso",
    nomorInduk: "1987654323",
    kelas: "Staff",
    role: "Staff",
    tanggal: "09 September 2026",
    jamMasuk: "06:55",
    jamPulang: "15:45",
    status: "Hadir",
    metode: "Face ID",
    lokasi: "Sekolah",
    keterangan: "-",
    avatar: "BS",
  },
  {
    id: 4,
    nama: "Rizky Pratama",
    nomorInduk: "20260001",
    kelas: "XII IPA 1",
    role: "Siswa",
    tanggal: "09 September 2026",
    jamMasuk: "06:38",
    jamPulang: "-",
    status: "Hadir",
    metode: "Face ID",
    lokasi: "Sekolah",
    keterangan: "-",
    avatar: "RP",
  },
  {
    id: 5,
    nama: "Nabila Putri",
    nomorInduk: "20260002",
    kelas: "XI IPS 2",
    role: "Siswa",
    tanggal: "09 September 2026",
    jamMasuk: "06:59",
    jamPulang: "-",
    status: "Terlambat",
    metode: "Face ID",
    lokasi: "Sekolah",
    keterangan: "Terlambat 14 menit",
    avatar: "NP",
  },
  {
    id: 6,
    nama: "Fajar Hidayat",
    nomorInduk: "20260003",
    kelas: "X IPA 2",
    role: "Siswa",
    tanggal: "09 September 2026",
    jamMasuk: "-",
    jamPulang: "-",
    status: "Tidak Hadir",
    metode: "-",
    lokasi: "-",
    keterangan: "Tidak ada keterangan",
    avatar: "FH",
  },
  {
    id: 7,
    nama: "Dewi Lestari",
    nomorInduk: "1987654324",
    kelas: "X IPA 1",
    role: "Guru",
    tanggal: "09 September 2026",
    jamMasuk: "07:04",
    jamPulang: "15:28",
    status: "Terlambat",
    metode: "Face ID",
    lokasi: "Sekolah",
    keterangan: "Terlambat 19 menit",
    avatar: "DL",
  },
  {
    id: 8,
    nama: "Maya Anggraini",
    nomorInduk: "1987654325",
    kelas: "XI IPA 1",
    role: "Guru",
    tanggal: "09 September 2026",
    jamMasuk: "06:44",
    jamPulang: "15:35",
    status: "Hadir",
    metode: "Face ID",
    lokasi: "Sekolah",
    keterangan: "-",
    avatar: "MA",
  },
  {
    id: 9,
    nama: "Yoga Saputra",
    nomorInduk: "20260004",
    kelas: "X IPA 2",
    role: "Siswa",
    tanggal: "09 September 2026",
    jamMasuk: "06:53",
    jamPulang: "-",
    status: "Hadir",
    metode: "Face ID",
    lokasi: "Sekolah",
    keterangan: "-",
    avatar: "YS",
  },
  {
    id: 10,
    nama: "Putri Amelia",
    nomorInduk: "20260005",
    kelas: "XII IPS 1",
    role: "Siswa",
    tanggal: "09 September 2026",
    jamMasuk: "-",
    jamPulang: "-",
    status: "Izin",
    metode: "Manual",
    lokasi: "-",
    keterangan: "Izin keluarga",
    avatar: "PA",
  },
  {
    id: 11,
    nama: "Andi Setiawan",
    nomorInduk: "20260006",
    kelas: "XI IPA 1",
    role: "Siswa",
    tanggal: "09 September 2026",
    jamMasuk: "07:00",
    jamPulang: "-",
    status: "Hadir",
    metode: "Face ID",
    lokasi: "Sekolah",
    keterangan: "-",
    avatar: "AS",
  },
  {
    id: 12,
    nama: "Sarah Aulia",
    nomorInduk: "20260007",
    kelas: "XII IPA 2",
    role: "Siswa",
    tanggal: "09 September 2026",
    jamMasuk: "-",
    jamPulang: "-",
    status: "Sakit",
    metode: "Manual",
    lokasi: "-",
    keterangan: "Surat keterangan sakit",
    avatar: "SA",
  },
];

/* =========================================================
   CONFIG
========================================================= */

const STATUS_CONFIG = {
  Hadir: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-100",
    dot: "bg-emerald-500",
  },
  Terlambat: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-100",
    dot: "bg-amber-500",
  },
  Izin: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-100",
    dot: "bg-blue-500",
  },
  Sakit: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-100",
    dot: "bg-violet-500",
  },
  "Tidak Hadir": {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-100",
    dot: "bg-red-500",
  },
};

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const config =
    STATUS_CONFIG[status] || STATUS_CONFIG["Tidak Hadir"];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium ${config.bg} ${config.text} ${config.border}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${config.dot}`}
      />
      {status}
    </span>
  );
}

/* =========================================================
   ROLE BADGE
========================================================= */

function RoleBadge({ role }) {
  const config = {
    Guru: "border-blue-100 bg-blue-50 text-blue-700",
    Siswa: "border-indigo-100 bg-indigo-50 text-indigo-700",
    Staff: "border-slate-200 bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={`inline-flex rounded-md border px-2 py-1 text-[10px] font-medium ${
        config[role] || config.Staff
      }`}
    >
      {role}
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
  iconBg,
  iconColor,
}) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500">
            {title}
          </p>

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
          <Icon size={19} className={iconColor} />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-start gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
          <Icon size={14} className="text-slate-400" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className="mt-0.5 break-words text-xs font-semibold text-slate-700">
            {value || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function PresensiPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [roleFilter, setRoleFilter] = useState("Semua");

  const [statusFilter, setStatusFilter] = useState("Semua");

  const [classFilter, setClassFilter] = useState("Semua");

  const [dateFilter, setDateFilter] = useState(
    "09 September 2026"
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedPresensi, setSelectedPresensi] =
    useState(null);

  const [editPresensi, setEditPresensi] = useState(null);

  const [editStatus, setEditStatus] = useState("");

  const [editKeterangan, setEditKeterangan] =
    useState("");

  const [isSaving, setIsSaving] = useState(false);

  const itemsPerPage = 7;

  /* =========================================================
     FILTER DATA
  ========================================================= */

  const filteredData = useMemo(() => {
    return PRESENSI_DATA.filter((item) => {
      const search = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !search ||
        item.nama.toLowerCase().includes(search) ||
        item.nomorInduk.toLowerCase().includes(search) ||
        item.kelas.toLowerCase().includes(search);

      const matchesRole =
        roleFilter === "Semua" ||
        item.role === roleFilter;

      const matchesStatus =
        statusFilter === "Semua" ||
        item.status === statusFilter;

      const matchesClass =
        classFilter === "Semua" ||
        item.kelas === classFilter;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus &&
        matchesClass
      );
    });
  }, [
    searchQuery,
    roleFilter,
    statusFilter,
    classFilter,
  ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / itemsPerPage)
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const paginatedData = filteredData.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage
  );

  /* =========================================================
     STATISTICS
  ========================================================= */

  const totalPresensi = PRESENSI_DATA.length;

  const totalHadir = PRESENSI_DATA.filter(
    (item) => item.status === "Hadir"
  ).length;

  const totalTerlambat = PRESENSI_DATA.filter(
    (item) => item.status === "Terlambat"
  ).length;

  const totalTidakHadir = PRESENSI_DATA.filter(
    (item) =>
      item.status === "Tidak Hadir" ||
      item.status === "Izin" ||
      item.status === "Sakit"
  ).length;

  const attendancePercentage = Math.round(
    (totalHadir / totalPresensi) * 100
  );

  /* =========================================================
     RESET
  ========================================================= */

  const resetFilters = () => {
    setSearchQuery("");
    setRoleFilter("Semua");
    setStatusFilter("Semua");
    setClassFilter("Semua");
    setDateFilter("09 September 2026");
    setCurrentPage(1);
  };

  /* =========================================================
     OPEN EDIT
  ========================================================= */

  const handleOpenEdit = (item) => {
    setSelectedPresensi(null);
    setEditPresensi(item);
    setEditStatus(item.status);
    setEditKeterangan(
      item.keterangan === "-" ? "" : item.keterangan
    );
  };

  /* =========================================================
     SAVE EDIT
  ========================================================= */

  const handleSaveEdit = async () => {
    if (!editPresensi) return;

    setIsSaving(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    setIsSaving(false);
    setEditPresensi(null);
  };

  /* =========================================================
     TOGGLE SIDEBAR
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
        active="presensi"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
        role="admin"
      />

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* ===================================================
            HEADER
        =================================================== */}

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
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf1ff]">
                    <ClipboardCheck
                      size={20}
                      className="text-[#155DFC]"
                    />
                  </div>

                  <div className="min-w-0">
                    <h1 className="truncate text-lg font-bold tracking-tight text-slate-800 sm:text-xl">
                      Presensi & Kehadiran
                    </h1>

                    <p className="truncate text-xs text-slate-500">
                      Kelola dan pantau kehadiran siswa, guru,
                      dan staff sekolah
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
                  >
                    <Download size={15} />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* =================================================
                DATE SUMMARY
            ================================================= */}

            <div className="mb-4 shrink-0 rounded-xl border border-[#c7dbff] bg-[#f5f8ff] px-4 py-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                    <CalendarDays
                      size={17}
                      className="text-[#155DFC]"
                    />
                  </div>

                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                      Rekap tanggal
                    </p>

                    <p className="text-sm font-semibold text-slate-700">
                      {dateFilter}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <MiniSummary
                    label="Kehadiran"
                    value={`${attendancePercentage}%`}
                  />

                  <MiniSummary
                    label="Hadir"
                    value={totalHadir}
                  />

                  <MiniSummary
                    label="Terlambat"
                    value={totalTerlambat}
                  />

                  <MiniSummary
                    label="Tidak Hadir"
                    value={totalTidakHadir}
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className="mb-4 grid shrink-0 grid-cols-2 gap-3 xl:grid-cols-4">
              <StatCard
                title="Total Presensi"
                value={totalPresensi}
                description="Data presensi hari ini"
                icon={Users}
                iconBg="bg-[#eaf1ff]"
                iconColor="text-[#155DFC]"
              />

              <StatCard
                title="Hadir"
                value={totalHadir}
                description="Kehadiran tercatat"
                icon={UserCheck}
                iconBg="bg-emerald-50"
                iconColor="text-emerald-600"
              />

              <StatCard
                title="Terlambat"
                value={totalTerlambat}
                description="Masuk setelah jam"
                icon={Clock3}
                iconBg="bg-amber-50"
                iconColor="text-amber-600"
              />

              <StatCard
                title="Tidak Hadir"
                value={totalTidakHadir}
                description="Izin, sakit, atau alpa"
                icon={UserX}
                iconBg="bg-red-50"
                iconColor="text-red-500"
              />
            </div>

            {/* =================================================
                TABLE CARD
            ================================================= */}

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
              {/* =================================================
                  FILTER
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
                      placeholder="Cari nama, NIS/NIP, atau kelas..."
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#8bb4ff] focus:bg-white focus:ring-2 focus:ring-[#155DFC]/10"
                    />
                  </div>

                  {/* FILTERS */}

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:flex">
                    <select
                      value={roleFilter}
                      onChange={(e) => {
                        setRoleFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="h-10 min-w-[120px] rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 outline-none focus:border-[#8bb4ff] focus:ring-2 focus:ring-[#155DFC]/10"
                    >
                      <option value="Semua">
                        Semua Pengguna
                      </option>
                      <option value="Siswa">Siswa</option>
                      <option value="Guru">Guru</option>
                      <option value="Staff">Staff</option>
                    </select>

                    <select
                      value={classFilter}
                      onChange={(e) => {
                        setClassFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="h-10 min-w-[130px] rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 outline-none focus:border-[#8bb4ff] focus:ring-2 focus:ring-[#155DFC]/10"
                    >
                      <option value="Semua">
                        Semua Kelas
                      </option>
                      <option value="X IPA 1">
                        X IPA 1
                      </option>
                      <option value="X IPA 2">
                        X IPA 2
                      </option>
                      <option value="XI IPA 1">
                        XI IPA 1
                      </option>
                      <option value="XI IPS 2">
                        XI IPS 2
                      </option>
                      <option value="XII IPA 1">
                        XII IPA 1
                      </option>
                      <option value="XII IPA 2">
                        XII IPA 2
                      </option>
                      <option value="XII IPS 1">
                        XII IPS 1
                      </option>
                    </select>

                    <select
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="h-10 min-w-[135px] rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 outline-none focus:border-[#8bb4ff] focus:ring-2 focus:ring-[#155DFC]/10"
                    >
                      <option value="Semua">
                        Semua Status
                      </option>
                      <option value="Hadir">Hadir</option>
                      <option value="Terlambat">
                        Terlambat
                      </option>
                      <option value="Izin">Izin</option>
                      <option value="Sakit">Sakit</option>
                      <option value="Tidak Hadir">
                        Tidak Hadir
                      </option>
                    </select>

                    <button
                      onClick={resetFilters}
                      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-500 transition hover:bg-slate-50"
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
                <table className="w-full min-w-[1050px] border-collapse">
                  <thead className="sticky top-0 z-10 bg-slate-50">
                    <tr className="border-b border-slate-200">
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Pengguna
                      </th>

                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Kelas / Jabatan
                      </th>

                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Jam Masuk
                      </th>

                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Jam Pulang
                      </th>

                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Status
                      </th>

                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Metode
                      </th>

                      <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Aksi
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {paginatedData.length > 0 ? (
                      paginatedData.map((item) => (
                        <tr
                          key={item.id}
                          className="group transition hover:bg-slate-50/70"
                        >
                          {/* USER */}

                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eaf1ff] text-xs font-bold text-[#155DFC]">
                                {item.avatar}
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-700">
                                  {item.nama}
                                </p>

                                <div className="mt-0.5 flex items-center gap-2">
                                  <p className="text-[11px] text-slate-400">
                                    {item.nomorInduk}
                                  </p>

                                  <RoleBadge role={item.role} />
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* CLASS */}

                          <td className="px-4 py-3">
                            <p className="text-xs font-medium text-slate-700">
                              {item.kelas}
                            </p>

                            <p className="mt-0.5 text-[11px] text-slate-400">
                              {item.role === "Guru"
                                ? "Tenaga Pendidik"
                                : item.role === "Staff"
                                ? "Tenaga Kependidikan"
                                : "Peserta Didik"}
                            </p>
                          </td>

                          {/* MASUK */}

                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Clock
                                size={14}
                                className={
                                  item.jamMasuk === "-"
                                    ? "text-slate-300"
                                    : "text-slate-400"
                                }
                              />

                              <span
                                className={`text-xs font-semibold ${
                                  item.jamMasuk === "-"
                                    ? "text-slate-300"
                                    : "text-slate-700"
                                }`}
                              >
                                {item.jamMasuk}
                              </span>
                            </div>
                          </td>

                          {/* PULANG */}

                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Clock
                                size={14}
                                className={
                                  item.jamPulang === "-"
                                    ? "text-slate-300"
                                    : "text-slate-400"
                                }
                              />

                              <span
                                className={`text-xs font-semibold ${
                                  item.jamPulang === "-"
                                    ? "text-slate-300"
                                    : "text-slate-700"
                                }`}
                              >
                                {item.jamPulang}
                              </span>
                            </div>
                          </td>

                          {/* STATUS */}

                          <td className="px-4 py-3">
                            <StatusBadge status={item.status} />

                            {item.keterangan !== "-" && (
                              <p className="mt-1 max-w-[160px] truncate text-[10px] text-slate-400">
                                {item.keterangan}
                              </p>
                            )}
                          </td>

                          {/* METHOD */}

                          <td className="px-4 py-3">
                            <span className="text-xs font-medium text-slate-600">
                              {item.metode}
                            </span>

                            {item.lokasi !== "-" && (
                              <p className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400">
                                <MapPin size={10} />
                                {item.lokasi}
                              </p>
                            )}
                          </td>

                          {/* ACTION */}

                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() =>
                                  setSelectedPresensi(item)
                                }
                                title="Lihat detail"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-[#eaf1ff] hover:text-[#155DFC]"
                              >
                                <Eye size={16} />
                              </button>

                              <button
                                onClick={() =>
                                  handleOpenEdit(item)
                                }
                                title="Ubah presensi"
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-[#eaf1ff] hover:text-[#155DFC]"
                              >
                                <Edit3 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-16"
                        >
                          <div className="flex flex-col items-center justify-center text-center">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                              <Search
                                size={20}
                                className="text-slate-400"
                              />
                            </div>

                            <p className="text-sm font-semibold text-slate-700">
                              Data presensi tidak ditemukan
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              Coba ubah pencarian atau filter
                              yang digunakan.
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
                    {filteredData.length === 0
                      ? 0
                      : (safeCurrentPage - 1) *
                          itemsPerPage +
                        1}
                  </span>{" "}
                  -{" "}
                  <span className="font-medium text-slate-600">
                    {Math.min(
                      safeCurrentPage * itemsPerPage,
                      filteredData.length
                    )}
                  </span>{" "}
                  dari{" "}
                  <span className="font-medium text-slate-600">
                    {filteredData.length}
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

      {selectedPresensi && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Detail Presensi
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  Informasi kehadiran pengguna
                </p>
              </div>

              <button
                onClick={() => setSelectedPresensi(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* CONTENT */}

            <div className="max-h-[75vh] overflow-y-auto p-5">
              {/* USER HEADER */}

              <div className="mb-5 flex flex-col gap-4 rounded-xl border border-[#c7dbff] bg-[#f5f8ff] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold text-[#155DFC] shadow-sm">
                    {selectedPresensi.avatar}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-base font-bold text-slate-800">
                      {selectedPresensi.nama}
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-400">
                      {selectedPresensi.nomorInduk}
                    </p>
                  </div>
                </div>

                <StatusBadge
                  status={selectedPresensi.status}
                />
              </div>

              {/* INFORMATION */}

              <div className="grid gap-3 sm:grid-cols-2">
                <InfoItem
                  icon={CalendarDays}
                  label="Tanggal"
                  value={selectedPresensi.tanggal}
                />

                <InfoItem
                  icon={UserRound}
                  label="Peran"
                  value={selectedPresensi.role}
                />

                <InfoItem
                  icon={BookOpen}
                  label="Kelas / Jabatan"
                  value={selectedPresensi.kelas}
                />

                <InfoItem
                  icon={Clock3}
                  label="Jam Masuk"
                  value={selectedPresensi.jamMasuk}
                />

                <InfoItem
                  icon={Clock}
                  label="Jam Pulang"
                  value={selectedPresensi.jamPulang}
                />

                <InfoItem
                  icon={ClipboardCheck}
                  label="Metode"
                  value={selectedPresensi.metode}
                />

                <InfoItem
                  icon={MapPin}
                  label="Lokasi"
                  value={selectedPresensi.lokasi}
                />

                <InfoItem
                  icon={AlertCircle}
                  label="Keterangan"
                  value={selectedPresensi.keterangan}
                />
              </div>
            </div>

            {/* FOOTER */}

            <div className="flex flex-col-reverse gap-2 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end">
              <button
                onClick={() => setSelectedPresensi(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Tutup
              </button>

              <button
                onClick={() =>
                  handleOpenEdit(selectedPresensi)
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#155DFC] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0d47c9]"
              >
                <Edit3 size={15} />
                Ubah Presensi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          EDIT MODAL
      ========================================================= */}

      {editPresensi && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Ubah Status Presensi
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  Perbarui data kehadiran pengguna
                </p>
              </div>

              <button
                onClick={() => setEditPresensi(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* CONTENT */}

            <div className="max-h-[75vh] overflow-y-auto p-5">
              {/* USER */}

              <div className="mb-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf1ff] text-sm font-bold text-[#155DFC]">
                  {editPresensi.avatar}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-800">
                    {editPresensi.nama}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400">
                    {editPresensi.nomorInduk} ·{" "}
                    {editPresensi.kelas}
                  </p>
                </div>
              </div>

              {/* STATUS */}

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Status Kehadiran
                </label>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {[
                    "Hadir",
                    "Terlambat",
                    "Izin",
                    "Sakit",
                    "Tidak Hadir",
                  ].map((status) => {
                    const config =
                      STATUS_CONFIG[status];

                    const active =
                      editStatus === status;

                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() =>
                          setEditStatus(status)
                        }
                        className={`rounded-lg border px-3 py-2.5 text-left text-xs font-medium transition ${
                          active
                            ? `${config.bg} ${config.text} ${config.border} ring-2 ring-[#155DFC]/10`
                            : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              active
                                ? config.dot
                                : "bg-slate-300"
                            }`}
                          />

                          {status}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* JAM */}

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Jam Masuk
                  </label>

                  <input
                    type="time"
                    defaultValue={
                      editPresensi.jamMasuk !== "-"
                        ? editPresensi.jamMasuk
                        : ""
                    }
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#8bb4ff] focus:ring-2 focus:ring-[#155DFC]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Jam Pulang
                  </label>

                  <input
                    type="time"
                    defaultValue={
                      editPresensi.jamPulang !== "-"
                        ? editPresensi.jamPulang
                        : ""
                    }
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-[#8bb4ff] focus:ring-2 focus:ring-[#155DFC]/10"
                  />
                </div>
              </div>

              {/* KETERANGAN */}

              <div className="mt-5">
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Keterangan
                </label>

                <textarea
                  value={editKeterangan}
                  onChange={(e) =>
                    setEditKeterangan(e.target.value)
                  }
                  rows={3}
                  placeholder="Tambahkan keterangan jika diperlukan..."
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#8bb4ff] focus:ring-2 focus:ring-[#155DFC]/10"
                />
              </div>

              {/* INFO */}

              <div className="mt-4 flex gap-2 rounded-xl border border-blue-100 bg-[#f5f8ff] p-3">
                <AlertCircle
                  size={15}
                  className="mt-0.5 shrink-0 text-[#155DFC]"
                />

                <p className="text-[11px] leading-relaxed text-slate-500">
                  Perubahan status presensi akan tercatat pada
                  riwayat aktivitas dan dapat digunakan dalam
                  laporan kehadiran sekolah.
                </p>
              </div>
            </div>

            {/* FOOTER */}

            <div className="flex flex-col-reverse gap-2 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end">
              <button
                onClick={() => setEditPresensi(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Batal
              </button>

              <button
                onClick={handleSaveEdit}
                disabled={isSaving}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#155DFC] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0d47c9] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? (
                  <>
                    <RotateCcw
                      size={15}
                      className="animate-spin"
                    />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Check size={15} />
                    Simpan Perubahan
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   MINI SUMMARY
========================================================= */

function MiniSummary({ label, value }) {
  return (
    <div>
      <p className="text-[10px] text-slate-400">{label}</p>

      <p className="text-sm font-bold text-slate-700">
        {value}
      </p>
    </div>
  );
}