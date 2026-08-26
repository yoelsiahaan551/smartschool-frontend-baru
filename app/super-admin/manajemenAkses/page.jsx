"use client";

import { useEffect, useMemo, useState } from "react";
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
  Search,
  Eye,
  Edit,
  Trash2,
  FileSpreadsheet,
  Sparkles,
  ArrowUp,
  ArrowDown,
  BadgeCheck,
  Filter,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ShieldPlus,
  MoreHorizontal,
  Lock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// ============================================================
// DATA DUMMY ROLE
// ============================================================

const initialRoles = [
  {
    id: "role-001",
    nama: "Super Admin",
    namaTampilan: "Super Admin",
    deskripsi:
      "Akses penuh ke seluruh modul dan pengaturan sistem SmartSchool.",
    status: "aktif",
    izin: 8,
    pengguna: 3,
    ikon: "Shield",
  },
  {
    id: "role-002",
    nama: "Admin Sekolah",
    namaTampilan: "Admin Sekolah",
    deskripsi:
      "Mengelola data sekolah, guru, siswa, dan kelas pada satu sekolah.",
    status: "aktif",
    izin: 4,
    pengguna: 125,
    ikon: "ShieldCheck",
  },
  {
    id: "role-003",
    nama: "Guru",
    namaTampilan: "Guru",
    deskripsi:
      "Mengelola nilai, presensi, dan materi ajar untuk kelas yang diampu.",
    status: "aktif",
    izin: 2,
    pengguna: 842,
    ikon: "BookOpen",
  },
  {
    id: "role-004",
    nama: "Wali Kelas",
    namaTampilan: "Wali Kelas",
    deskripsi:
      "Memantau perkembangan siswa dan mengelola data satu kelas.",
    status: "aktif",
    izin: 1,
    pengguna: 210,
    ikon: "UserCheck",
  },
  {
    id: "role-005",
    nama: "Bendahara",
    namaTampilan: "Bendahara",
    deskripsi:
      "Mengelola pembayaran, tagihan, dan laporan keuangan sekolah.",
    status: "nonaktif",
    izin: 2,
    pengguna: 18,
    ikon: "DollarSign",
  },
  {
    id: "role-006",
    nama: "Operator Sekolah",
    namaTampilan: "Operator Sekolah",
    deskripsi:
      "Mengelola administrasi dan data operasional sekolah.",
    status: "aktif",
    izin: 5,
    pengguna: 76,
    ikon: "UserCog",
  },
  {
    id: "role-007",
    nama: "Staf Akademik",
    namaTampilan: "Staf Akademik",
    deskripsi:
      "Mengelola data akademik dan administrasi pembelajaran.",
    status: "aktif",
    izin: 3,
    pengguna: 42,
    ikon: "BookOpen",
  },
];

// ============================================================
// ICON MAP
// ============================================================

const iconMap = {
  Shield,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  UserCog,
  BookOpen,
  DollarSign,
  Users,
  Key,
};

// ============================================================
// STATUS STYLE
// ============================================================

const statusStyle = {
  aktif: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
    icon: CheckCircle2,
  },
  nonaktif: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    dot: "bg-rose-500",
    icon: XCircle,
  },
};

// ============================================================
// MAIN PAGE
// ============================================================

export default function ManajemenAksesPage() {
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState("manajemen-akses");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [roles, setRoles] = useState(initialRoles);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");

  const [sortField, setSortField] = useState("nama");
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);

  const [isMobile, setIsMobile] = useState(false);

  const itemsPerPage = 5;

  // ============================================================
  // NOTIFICATIONS
  // ============================================================

  const notifications = [
    {
      id: 1,
      title: "Pembaruan Sistem v2.0",
      desc: "Dikirim 2 jam lalu",
      read: false,
    },
    {
      id: 2,
      title: "Pengingat: Backup Data",
      desc: "Dikirim 1 hari lalu",
      read: false,
    },
    {
      id: 3,
      title: "Role baru ditambahkan",
      desc: "Dikirim 3 hari lalu",
      read: true,
    },
  ];

  // ============================================================
  // RESPONSIVE CHECK
  // ============================================================

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  // ============================================================
  // STATISTICS
  // ============================================================

  const statistics = useMemo(() => {
    const total = roles.length;

    const aktif = roles.filter(
      (role) => role.status === "aktif"
    ).length;

    const nonaktif = roles.filter(
      (role) => role.status === "nonaktif"
    ).length;

    const pengguna = roles.reduce(
      (total, role) => total + role.pengguna,
      0
    );

    return {
      total,
      aktif,
      nonaktif,
      pengguna,
    };
  }, [roles]);

  // ============================================================
  // FILTER
  // ============================================================

  const filteredData = useMemo(() => {
    const keyword = searchQuery.toLowerCase().trim();

    return roles.filter((item) => {
      const matchSearch =
        item.nama.toLowerCase().includes(keyword) ||
        item.namaTampilan.toLowerCase().includes(keyword) ||
        item.deskripsi.toLowerCase().includes(keyword);

      const matchStatus =
        filterStatus === "Semua" ||
        item.status === filterStatus;

      return matchSearch && matchStatus;
    });
  }, [roles, searchQuery, filterStatus]);

  // ============================================================
  // SORT
  // ============================================================

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];

      if (
        sortField === "pengguna" ||
        sortField === "izin"
      ) {
        valueA = Number(valueA) || 0;
        valueB = Number(valueB) || 0;
      } else {
        valueA = String(valueA || "").toLowerCase();
        valueB = String(valueB || "").toLowerCase();
      }

      if (valueA < valueB) {
        return sortOrder === "asc" ? -1 : 1;
      }

      if (valueA > valueB) {
        return sortOrder === "asc" ? 1 : -1;
      }

      return 0;
    });
  }, [filteredData, sortField, sortOrder]);

  // ============================================================
  // PAGINATION
  // ============================================================

  const totalPages = Math.max(
    1,
    Math.ceil(sortedData.length / itemsPerPage)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ============================================================
  // SORT HANDLER
  // ============================================================

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) =>
        prev === "asc" ? "desc" : "asc"
      );
    } else {
      setSortField(field);
      setSortOrder("asc");
    }

    setCurrentPage(1);
  };

  // ============================================================
  // SORT ICON
  // ============================================================

  const renderSortIcon = (field) => {
    if (sortField !== field) return null;

    return sortOrder === "asc" ? (
      <ArrowUp
        size={13}
        className="text-slate-400"
      />
    ) : (
      <ArrowDown
        size={13}
        className="text-slate-400"
      />
    );
  };

  // ============================================================
  // RESET
  // ============================================================

  const resetFilters = () => {
    setSearchQuery("");
    setFilterStatus("Semua");
    setCurrentPage(1);
  };

  // ============================================================
  // DELETE
  // ============================================================

  const handleDelete = (role) => {
    const confirmed = window.confirm(
      `Apakah kamu yakin ingin menghapus role "${role.nama}"?`
    );

    if (!confirmed) return;

    setRoles((prev) =>
      prev.filter((item) => item.id !== role.id)
    );
  };

  // ============================================================
  // STATUS LABEL
  // ============================================================

  const getStatusLabel = (status) => {
    if (status === "aktif") return "Aktif";
    if (status === "nonaktif") return "Nonaktif";

    return status;
  };

  // ============================================================
  // ROLE ICON
  // ============================================================

  const getRoleIcon = (iconName) => {
    return iconMap[iconName] || Shield;
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar
        active={activeMenu}
        setActive={setActiveMenu}
        collapsed={!sidebarOpen}
        setCollapsed={() =>
          setSidebarOpen((prev) => !prev)
        }
      />

      {/* ======================================================
          MAIN AREA
      ====================================================== */}

      <div className="flex-1 min-w-0 flex flex-col">
        <Header
          toggleSidebar={() =>
            setSidebarOpen((prev) => !prev)
          }
          notifications={notifications}
          user={{
            name: "Sarah",
            email: "sarah@smartschool.com",
            avatar: "SA",
          }}
        />

        <main className="flex-1 w-full">
          <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-6 lg:py-8">

            {/* ==================================================
                PAGE HEADER
            ================================================== */}

            <div className="mb-6">
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

                <div className="min-w-0">
                  <div className="flex items-start gap-3">

                    <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                      <Shield
                        size={21}
                        strokeWidth={2}
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-slate-900 tracking-tight">
                          Manajemen Akses
                        </h1>

                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-blue-100 bg-blue-50 text-blue-700 text-[10px] sm:text-xs font-medium">
                          <ShieldCheck size={12} />
                          Super Admin
                        </span>
                      </div>

                      <p className="mt-1.5 text-sm text-slate-500 max-w-2xl leading-relaxed">
                        Kelola role, pengguna, dan izin akses
                        sistem SmartSchool dari satu halaman.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTONS */}

                <div className="flex flex-col sm:flex-row gap-2.5 w-full xl:w-auto">

                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
                  >
                    <FileSpreadsheet
                      size={16}
                      className="text-slate-500"
                    />
                    Export Data
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        "/super-admin/manajemenAkses/tambah-role"
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium shadow-sm hover:bg-blue-700 hover:shadow transition-all"
                  >
                    <ShieldPlus size={17} />
                    Tambah Role
                  </button>

                </div>
              </div>
            </div>

            {/* ==================================================
                STATISTICS
            ================================================== */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">

              <StatCard
                title="Total Role"
                value={statistics.total}
                description="Role terdaftar"
                icon={Shield}
                variant="blue"
              />

              <StatCard
                title="Role Aktif"
                value={statistics.aktif}
                description="Sedang digunakan"
                icon={BadgeCheck}
                variant="emerald"
              />

              <StatCard
                title="Role Nonaktif"
                value={statistics.nonaktif}
                description="Tidak digunakan"
                icon={Lock}
                variant="rose"
              />

              <StatCard
                title="Pengguna"
                value={statistics.pengguna.toLocaleString(
                  "id-ID"
                )}
                description="Total pengguna terkait"
                icon={Users}
                variant="purple"
              />

            </div>

            {/* ==================================================
                INFO BANNER
            ================================================== */}

            <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3.5">
              <div className="flex items-start gap-3">

                <div className="shrink-0 w-8 h-8 rounded-lg bg-white border border-blue-100 text-blue-600 flex items-center justify-center">
                  <Sparkles size={15} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-blue-900">
                    Pengaturan akses sistem
                  </p>

                  <p className="text-[11px] sm:text-xs text-blue-700/80 mt-0.5 leading-relaxed">
                    Pastikan setiap role hanya memiliki
                    izin yang sesuai dengan kebutuhan
                    pengguna.
                  </p>
                </div>

              </div>
            </div>

            {/* ==================================================
                FILTER
            ================================================== */}

            <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm mb-5">

              <div className="p-4 sm:p-5">

                <div className="flex flex-col lg:flex-row lg:items-center gap-3">

                  {/* SEARCH */}

                  <div className="relative flex-1 min-w-0">

                    <Search
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder="Cari nama role atau deskripsi..."
                      className="w-full h-10 pl-10 pr-4 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />

                  </div>

                  {/* FILTER */}

                  <div className="flex flex-col sm:flex-row gap-2">

                    <div className="relative">

                      <Filter
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />

                      <select
                        value={filterStatus}
                        onChange={(e) => {
                          setFilterStatus(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full sm:w-[150px] h-10 pl-9 pr-8 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-600 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer appearance-none"
                      >
                        <option value="Semua">
                          Semua Status
                        </option>
                        <option value="aktif">
                          Aktif
                        </option>
                        <option value="nonaktif">
                          Nonaktif
                        </option>
                      </select>

                    </div>

                    <button
                      type="button"
                      onClick={resetFilters}
                      className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-700 transition-all"
                    >
                      <RotateCcw size={14} />
                      Reset
                    </button>

                  </div>

                </div>

                {/* FILTER FOOTER */}

                <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100">

                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />

                    <p className="text-xs text-slate-500">
                      Menampilkan{" "}
                      <span className="font-semibold text-slate-700">
                        {filteredData.length}
                      </span>{" "}
                      role
                    </p>
                  </div>

                  <p className="text-xs text-slate-400">
                    Klik judul kolom untuk mengurutkan data
                  </p>

                </div>

              </div>
            </div>

            {/* ==================================================
                TABLE / MOBILE CARD
            ================================================== */}

            <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm overflow-hidden">

              {isMobile ? (
                /* =================================================
                   MOBILE
                ================================================= */

                <div>

                  {paginatedData.length === 0 ? (
                    <EmptyState />
                  ) : (
                    <div className="divide-y divide-slate-100">

                      {paginatedData.map((item) => {
                        const IconComponent =
                          getRoleIcon(item.ikon);

                        const style =
                          statusStyle[item.status];

                        const StatusIcon = style.icon;

                        return (
                          <div
                            key={item.id}
                            className="p-4 hover:bg-slate-50/70 transition-colors"
                          >

                            <div className="flex items-start gap-3">

                              <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                                <IconComponent size={18} />
                              </div>

                              <div className="flex-1 min-w-0">

                                <div className="flex items-start justify-between gap-2">

                                  <div className="min-w-0">
                                    <h3 className="text-sm font-semibold text-slate-800 truncate">
                                      {item.nama}
                                    </h3>

                                    <p className="text-[11px] text-slate-400 mt-0.5">
                                      {item.namaTampilan}
                                    </p>
                                  </div>

                                  <span
                                    className={`shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[10px] font-medium ${style.bg} ${style.text} ${style.border}`}
                                  >
                                    <StatusIcon size={11} />
                                    {getStatusLabel(
                                      item.status
                                    )}
                                  </span>

                                </div>

                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                  {item.deskripsi}
                                </p>

                                <div className="flex flex-wrap items-center gap-2 mt-3">

                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-medium">
                                    <Key size={11} />
                                    {item.izin} izin
                                  </span>

                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-50 border border-purple-100 text-purple-700 text-[10px] font-medium">
                                    <Users size={11} />
                                    {item.pengguna} pengguna
                                  </span>

                                </div>

                                <div className="flex items-center gap-1 mt-3 pt-3 border-t border-slate-100">

                                  <ActionButton
                                    title="Detail"
                                    onClick={() =>
                                      router.push(
                                        `/super-admin/manajemenAkses/${item.id}`
                                      )
                                    }
                                  >
                                    <Eye size={14} />
                                  </ActionButton>

                                  <ActionButton
                                    title="Edit"
                                    hover="amber"
                                    onClick={() =>
                                      router.push(
                                        `/super-admin/manajemenAkses/edit-role/${item.id}`
                                      )
                                    }
                                  >
                                    <Edit size={14} />
                                  </ActionButton>

                                  <ActionButton
                                    title="Hapus"
                                    hover="rose"
                                    onClick={() =>
                                      handleDelete(item)
                                    }
                                  >
                                    <Trash2 size={14} />
                                  </ActionButton>

                                </div>

                              </div>
                            </div>

                          </div>
                        );
                      })}

                    </div>
                  )}

                </div>
              ) : (
                /* =================================================
                   DESKTOP
                ================================================= */

                <div className="overflow-x-auto">

                  <table className="w-full min-w-[760px]">

                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200">

                        <SortableHeader
                          label="Role"
                          field="nama"
                          sortField={sortField}
                          onSort={handleSort}
                          icon={renderSortIcon}
                        />

                        <th className="hidden xl:table-cell px-5 py-3.5 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                          Deskripsi
                        </th>

                        <SortableHeader
                          label="Izin"
                          field="izin"
                          sortField={sortField}
                          onSort={handleSort}
                          icon={renderSortIcon}
                        />

                        <SortableHeader
                          label="Pengguna"
                          field="pengguna"
                          sortField={sortField}
                          onSort={handleSort}
                          icon={renderSortIcon}
                        />

                        <SortableHeader
                          label="Status"
                          field="status"
                          sortField={sortField}
                          onSort={handleSort}
                          icon={renderSortIcon}
                        />

                        <th className="px-5 py-3.5 text-right text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                          Aksi
                        </th>

                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">

                      {paginatedData.length === 0 ? (
                        <tr>
                          <td colSpan={6}>
                            <EmptyState />
                          </td>
                        </tr>
                      ) : (
                        paginatedData.map((item) => {

                          const IconComponent =
                            getRoleIcon(item.ikon);

                          const style =
                            statusStyle[item.status];

                          const StatusIcon = style.icon;

                          return (
                            <tr
                              key={item.id}
                              className="group hover:bg-slate-50/70 transition-colors"
                            >

                              {/* ROLE */}

                              <td className="px-5 py-4">

                                <div className="flex items-center gap-3 min-w-[190px]">

                                  <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
                                    <IconComponent size={17} />
                                  </div>

                                  <div className="min-w-0">

                                    <p className="text-sm font-semibold text-slate-800 truncate">
                                      {item.nama}
                                    </p>

                                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                                      {item.namaTampilan}
                                    </p>

                                  </div>

                                </div>

                              </td>

                              {/* DESKRIPSI */}

                              <td className="hidden xl:table-cell px-5 py-4 max-w-[280px]">

                                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                                  {item.deskripsi}
                                </p>

                              </td>

                              {/* IZIN */}

                              <td className="px-5 py-4">

                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-blue-700 text-[11px] font-medium whitespace-nowrap">
                                  <Key size={11} />
                                  {item.izin}
                                </span>

                              </td>

                              {/* PENGGUNA */}

                              <td className="px-5 py-4">

                                <div className="flex items-center gap-2">

                                  <div className="w-7 h-7 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center">
                                    <Users size={13} />
                                  </div>

                                  <span className="text-sm font-medium text-slate-700">
                                    {item.pengguna.toLocaleString(
                                      "id-ID"
                                    )}
                                  </span>

                                </div>

                              </td>

                              {/* STATUS */}

                              <td className="px-5 py-4">

                                <span
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium whitespace-nowrap ${style.bg} ${style.text} ${style.border}`}
                                >
                                  <StatusIcon size={12} />
                                  {getStatusLabel(
                                    item.status
                                  )}
                                </span>

                              </td>

                              {/* AKSI */}

                              <td className="px-5 py-4">

                                <div className="flex items-center justify-end gap-1">

                                  <ActionButton
                                    title="Detail"
                                    onClick={() =>
                                      router.push(
                                        `/super-admin/manajemenAkses/${item.id}`
                                      )
                                    }
                                  >
                                    <Eye size={15} />
                                  </ActionButton>

                                  <ActionButton
                                    title="Edit"
                                    hover="amber"
                                    onClick={() =>
                                      router.push(
                                        `/super-admin/manajemenAkses/edit-role/${item.id}`
                                      )
                                    }
                                  >
                                    <Edit size={15} />
                                  </ActionButton>

                                  <ActionButton
                                    title="Hapus"
                                    hover="rose"
                                    onClick={() =>
                                      handleDelete(item)
                                    }
                                  >
                                    <Trash2 size={15} />
                                  </ActionButton>

                                  <ActionButton
                                    title="Lainnya"
                                  >
                                    <MoreHorizontal
                                      size={15}
                                    />
                                  </ActionButton>

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

              {/* ==================================================
                  PAGINATION
              ================================================== */}

              <div className="px-4 sm:px-5 py-3.5 border-t border-slate-200 bg-white">

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

                  <p className="text-xs text-slate-500">

                    Menampilkan{" "}

                    <span className="font-semibold text-slate-700">
                      {sortedData.length === 0
                        ? 0
                        : (currentPage - 1) *
                            itemsPerPage +
                          1}
                    </span>

                    {" - "}

                    <span className="font-semibold text-slate-700">
                      {Math.min(
                        currentPage * itemsPerPage,
                        sortedData.length
                      )}
                    </span>

                    {" dari "}

                    <span className="font-semibold text-slate-700">
                      {sortedData.length}
                    </span>{" "}
                    data

                  </p>

                  <div className="flex items-center gap-1">

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.max(1, prev - 1)
                        )
                      }
                      disabled={currentPage === 1}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      title="Halaman sebelumnya"
                    >
                      <ChevronLeft size={15} />
                    </button>

                    {Array.from({
                      length: totalPages,
                    }).map((_, index) => {

                      const page = index + 1;

                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() =>
                            setCurrentPage(page)
                          }
                          className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                            currentPage === page
                              ? "bg-blue-600 text-white shadow-sm"
                              : "text-slate-500 hover:bg-slate-100"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(totalPages, prev + 1)
                        )
                      }
                      disabled={
                        currentPage === totalPages ||
                        sortedData.length === 0
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      title="Halaman berikutnya"
                    >
                      <ChevronRight size={15} />
                    </button>

                  </div>

                </div>

              </div>

            </div>

            {/* ==================================================
                FOOTER
            ================================================== */}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 pb-2">

              <p className="text-[11px] text-slate-400">
                SmartSchool • Manajemen Akses
              </p>

              <p className="text-[11px] text-slate-400">
                Terakhir diperbarui hari ini
              </p>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  variant,
}) {
  const variants = {
    blue: {
      icon: "bg-blue-50 text-blue-600 border-blue-100",
    },
    emerald: {
      icon: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    rose: {
      icon: "bg-rose-50 text-rose-600 border-rose-100",
    },
    purple: {
      icon: "bg-purple-50 text-purple-600 border-purple-100",
    },
  };

  const style = variants[variant] || variants.blue;

  return (
    <div className="group bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all">

      <div className="flex items-center gap-3">

        <div
          className={`w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-lg border flex items-center justify-center ${style.icon}`}
        >
          <Icon size={18} />
        </div>

        <div className="min-w-0">

          <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">
            {title}
          </p>

          <p className="text-lg sm:text-xl font-semibold text-slate-800 mt-0.5">
            {value}
          </p>

          <p className="hidden sm:block text-[10px] text-slate-400 mt-0.5 truncate">
            {description}
          </p>

        </div>

      </div>

    </div>
  );
}

// ============================================================
// SORTABLE HEADER
// ============================================================

function SortableHeader({
  label,
  field,
  sortField,
  onSort,
  icon,
}) {
  return (
    <th
      onClick={() => onSort(field)}
      className="px-5 py-3.5 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 select-none whitespace-nowrap"
    >
      <span className="inline-flex items-center gap-1.5">
        {label}

        {sortField === field && icon(field)}
      </span>
    </th>
  );
}

// ============================================================
// ACTION BUTTON
// ============================================================

function ActionButton({
  children,
  title,
  onClick,
  hover = "blue",
}) {
  const hoverMap = {
    blue: "hover:bg-blue-50 hover:text-blue-600",
    amber: "hover:bg-amber-50 hover:text-amber-600",
    rose: "hover:bg-rose-50 hover:text-rose-600",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 transition-colors ${hoverMap[hover]}`}
    >
      {children}
    </button>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-5">

      <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
        <Search size={20} />
      </div>

      <p className="text-sm font-semibold text-slate-700">
        Tidak ada role ditemukan
      </p>

      <p className="text-xs text-slate-400 mt-1 text-center max-w-sm">
        Coba ubah kata kunci pencarian atau filter
        status untuk melihat data lainnya.
      </p>

    </div>
  );
}