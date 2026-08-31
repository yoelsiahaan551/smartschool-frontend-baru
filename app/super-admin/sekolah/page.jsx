"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

import {
  School,
  Building2,
  Users,
  GraduationCap,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  FileSpreadsheet,
  CheckCircle,
  XCircle,
  Clock3,
  ArrowUp,
  ArrowDown,
  SlidersHorizontal,
  LayoutGrid,
  TrendingUp,
  Database,
} from "lucide-react";

// ============================================================
// DATA SEKOLAH
// ============================================================

const sekolahData = [
  {
    id: 1,
    nama: "SMA Negeri 1 Jakarta",
    npsn: "2020212",
    jenjang: "SMA",
    statusSekolah: "Negeri",
    yayasan: "-",
    paket: "Professional",
    status: "Aktif",
    bergabung: "2024-01-15",
    email: "sman1jakarta@sch.id",
    telepon: "(021) 1234567",
    website: "www.sman1jakarta.sch.id",
    alamat: "Jl. Merdeka No. 1, Jakarta Pusat",
    provinsi: "DKI Jakarta",
    kota: "Jakarta Pusat",
    kecamatan: "Gambir",
    kelurahan: "Gambir",
    kodePos: "10110",
    tanggalMulai: "2024-01-15",
    tanggalBerakhir: "2025-01-15",
    totalGuru: 45,
    totalSiswa: 720,
    totalKelas: 24,
    totalMapel: 12,
    totalAdmin: 3,
  },
  {
    id: 2,
    nama: "SMP Negeri 2 Bandung",
    npsn: "2020345",
    jenjang: "SMP",
    statusSekolah: "Negeri",
    yayasan: "-",
    paket: "Starter",
    status: "Aktif",
    bergabung: "2024-02-10",
    email: "smpn2bandung@sch.id",
    telepon: "(022) 9876543",
    website: "www.smpn2bandung.sch.id",
    alamat: "Jl. Asia Afrika No. 45, Bandung",
    provinsi: "Jawa Barat",
    kota: "Bandung",
    kecamatan: "Sumur Bandung",
    kelurahan: "Citarum",
    kodePos: "40112",
    tanggalMulai: "2024-02-10",
    tanggalBerakhir: "2025-02-10",
    totalGuru: 30,
    totalSiswa: 540,
    totalKelas: 18,
    totalMapel: 10,
    totalAdmin: 2,
  },
  {
    id: 3,
    nama: "SD Islam Al-Ikhlas",
    npsn: "2030456",
    jenjang: "SD",
    statusSekolah: "Swasta",
    yayasan: "Yayasan Al-Ikhlas",
    paket: "Enterprise",
    status: "Aktif",
    bergabung: "2024-03-01",
    email: "sd.ikhlas@sch.id",
    telepon: "(021) 5551234",
    website: "www.sdikhlas.sch.id",
    alamat: "Jl. Kebon Kacang No. 12, Jakarta Selatan",
    provinsi: "DKI Jakarta",
    kota: "Jakarta Selatan",
    kecamatan: "Setiabudi",
    kelurahan: "Karet",
    kodePos: "12930",
    tanggalMulai: "2024-03-01",
    tanggalBerakhir: "2025-03-01",
    totalGuru: 25,
    totalSiswa: 390,
    totalKelas: 12,
    totalMapel: 8,
    totalAdmin: 2,
  },
  {
    id: 4,
    nama: "SMK Pariwisata 1",
    npsn: "2040789",
    jenjang: "SMK",
    statusSekolah: "Swasta",
    yayasan: "Yayasan Pariwisata",
    paket: "Professional",
    status: "Trial",
    bergabung: "2024-04-15",
    email: "smkpar1@sch.id",
    telepon: "(0361) 234567",
    website: "www.smkpar1.sch.id",
    alamat: "Jl. Legian No. 88, Denpasar",
    provinsi: "Bali",
    kota: "Denpasar",
    kecamatan: "Kuta",
    kelurahan: "Legian",
    kodePos: "80361",
    tanggalMulai: "2024-04-15",
    tanggalBerakhir: "2024-10-15",
    totalGuru: 35,
    totalSiswa: 480,
    totalKelas: 16,
    totalMapel: 14,
    totalAdmin: 3,
  },
  {
    id: 5,
    nama: "SMA Negeri 3 Surabaya",
    npsn: "2050101",
    jenjang: "SMA",
    statusSekolah: "Negeri",
    yayasan: "-",
    paket: "Starter",
    status: "Nonaktif",
    bergabung: "2023-05-20",
    email: "sman3sby@sch.id",
    telepon: "(031) 345678",
    website: "www.sman3surabaya.sch.id",
    alamat: "Jl. Raya Darmo No. 56, Surabaya",
    provinsi: "Jawa Timur",
    kota: "Surabaya",
    kecamatan: "Darmo",
    kelurahan: "Darmo",
    kodePos: "60226",
    tanggalMulai: "2023-05-20",
    tanggalBerakhir: "2024-05-20",
    totalGuru: 50,
    totalSiswa: 800,
    totalKelas: 27,
    totalMapel: 12,
    totalAdmin: 4,
  },
];

// ============================================================
// STATISTIK
// ============================================================

const stats = {
  total: 125,
  aktif: 120,
  nonaktif: 5,
  trial: 18,
  totalGuru: 240,
  totalSiswa: 3620,
};

// ============================================================
// FILTER
// ============================================================

const provinsiOptions = [
  "Semua",
  "DKI Jakarta",
  "Banten",
  "Jawa Barat",
  "Jawa Timur",
  "Bali",
];

const kotaOptions = [
  "Semua",
  "Jakarta Pusat",
  "Jakarta Utara",
  "Jakarta Barat",
  "Jakarta Selatan",
  "Tangerang Selatan",
  "Tangerang",
  "Depok",
  "Bandung",
  "Denpasar",
  "Surabaya",
];

const jenjangOptions = ["Semua", "SD", "SMP", "SMA", "SMK"];

const statusOptions = ["Semua", "Aktif", "Nonaktif", "Trial"];

// ============================================================
// STATUS STYLE
// ============================================================

const statusColorMap = {
  Aktif: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },

  Trial: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },

  Nonaktif: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    dot: "bg-rose-500",
  },
};

// ============================================================
// PAKET STYLE
// ============================================================

const paketColorMap = {
  Enterprise: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
  },

  Professional: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },

  Starter: {
    bg: "bg-slate-50",
    text: "text-slate-600",
    border: "border-slate-200",
  },
};

// ============================================================
// COMPONENT: SORT CONTROL
// ============================================================

function SortControl({ sortField, sortOrder, onSort }) {
  const sortOptions = [
    { value: "nama", label: "Nama Sekolah" },
    { value: "npsn", label: "NPSN" },
    { value: "jenjang", label: "Jenjang" },
    { value: "status", label: "Status" },
    { value: "paket", label: "Paket" },
  ];

  return (
    <div className="flex items-center gap-2">
      <select
        value={sortField}
        onChange={(e) => onSort(e.target.value, sortOrder)}
        className="
          h-9
          rounded-xl
          border
          border-slate-200
          bg-slate-50
          px-3
          text-xs
          font-medium
          text-slate-600
          outline-none
          transition-all
          focus:border-blue-400
          focus:bg-white
          focus:ring-4
          focus:ring-blue-500/10
        "
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <button
        onClick={() => onSort(sortField, sortOrder === "asc" ? "desc" : "asc")}
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-slate-50
          text-slate-500
          transition-all
          hover:border-slate-300
          hover:bg-slate-100
        "
        title={sortOrder === "asc" ? "Urutkan menurun" : "Urutkan menaik"}
      >
        {sortOrder === "asc" ? (
          <ArrowUp size={16} className="text-blue-500" />
        ) : (
          <ArrowDown size={16} className="text-blue-500" />
        )}
      </button>
    </div>
  );
}

// ============================================================
// PAGE
// ============================================================

export default function DataSekolahPage() {
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState("sekolah");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvinsi, setSelectedProvinsi] = useState("Semua");
  const [selectedKota, setSelectedKota] = useState("Semua");
  const [selectedJenjang, setSelectedJenjang] = useState("Semua");
  const [selectedStatus, setSelectedStatus] = useState("Semua");

  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const [sortField, setSortField] = useState("nama");
  const [sortOrder, setSortOrder] = useState("asc");

  const itemsPerPage = 5;

  // ==========================================================
  // NOTIFICATIONS
  // ==========================================================

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
      title: "Sekolah baru mendaftar",
      desc: "Dikirim 3 hari lalu",
      read: true,
    },
  ];

  // ==========================================================
  // RESPONSIVE
  // ==========================================================

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // ==========================================================
  // FILTERING
  // ==========================================================

  const filteredData = sekolahData.filter((item) => {
    const keyword = searchQuery.toLowerCase().trim();

    const matchSearch =
      item.nama.toLowerCase().includes(keyword) ||
      item.npsn.toLowerCase().includes(keyword) ||
      item.yayasan.toLowerCase().includes(keyword);

    const matchProvinsi =
      selectedProvinsi === "Semua" ||
      item.provinsi === selectedProvinsi;

    const matchKota =
      selectedKota === "Semua" ||
      item.kota === selectedKota;

    const matchJenjang =
      selectedJenjang === "Semua" ||
      item.jenjang === selectedJenjang;

    const matchStatus =
      selectedStatus === "Semua" ||
      item.status === selectedStatus;

    return (
      matchSearch &&
      matchProvinsi &&
      matchKota &&
      matchJenjang &&
      matchStatus
    );
  });

  // ==========================================================
  // SORTING
  // ==========================================================

  const sortedData = [...filteredData].sort((a, b) => {
    const valA =
      a[sortField]?.toString().toLowerCase() || "";

    const valB =
      b[sortField]?.toString().toLowerCase() || "";

    if (valA < valB) {
      return sortOrder === "asc" ? -1 : 1;
    }

    if (valA > valB) {
      return sortOrder === "asc" ? 1 : -1;
    }

    return 0;
  });

  // ==========================================================
  // PAGINATION
  // ==========================================================

  const totalPages = Math.max(
    1,
    Math.ceil(sortedData.length / itemsPerPage)
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const paginatedData = sortedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ==========================================================
  // SORT HANDLERS
  // ==========================================================

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(
        sortOrder === "asc" ? "desc" : "asc"
      );
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleSortChange = (field, order) => {
    setSortField(field);
    setSortOrder(order);
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return null;

    return sortOrder === "asc" ? (
      <ArrowUp
        size={13}
        className="text-blue-500"
      />
    ) : (
      <ArrowDown
        size={13}
        className="text-blue-500"
      />
    );
  };

  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDelete = (school) => {
    if (
      confirm(
        `Apakah Anda yakin ingin menghapus ${school.nama}?`
      )
    ) {
      console.log("Hapus:", school.id);
    }
  };

  // ==========================================================
  // RESET
  // ==========================================================

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedProvinsi("Semua");
    setSelectedKota("Semua");
    setSelectedJenjang("Semua");
    setSelectedStatus("Semua");
    setCurrentPage(1);
  };

  const resetSort = () => {
    setSortField("nama");
    setSortOrder("asc");
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">

      {/* SIDEBAR */}
      <Sidebar
        active={activeMenu}
        setActive={setActiveMenu}
        collapsed={!sidebarOpen}
        setCollapsed={() =>
          setSidebarOpen(!sidebarOpen)
        }
      />

      <div className="flex min-w-0 flex-1 flex-col">

        {/* HEADER */}
        <Header
          toggleSidebar={() =>
            setSidebarOpen(!sidebarOpen)
          }
          notifications={notifications}
          user={{
            name: "Sarah",
            email: "sarah@smartschool.com",
            avatar: "SA",
          }}
        />

        <main className="flex-1 p-3 sm:p-5 lg:p-7 xl:p-8">

          <div className="mx-auto w-full max-w-[1600px] space-y-5 sm:space-y-6">

            {/* ==================================================
                PREMIUM PAGE HEADER
            ================================================== */}

            <section
              className="
                relative overflow-hidden
                rounded-2xl
                border border-slate-200
                bg-white
                shadow-[0_2px_10px_rgba(15,23,42,0.05)]
              "
            >

              {/* subtle background */}
              <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-50/70 blur-3xl" />

              <div className="relative flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-7">

                {/* LEFT */}
                <div className="flex min-w-0 items-start gap-4">

                  {/* ICON */}
                  <div
                    className="
                      flex h-12 w-12 shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-gradient-to-br
                      from-blue-600
                      to-indigo-600
                      text-white
                      shadow-[0_8px_20px_rgba(37,99,235,0.25)]
                      sm:h-14 sm:w-14
                    "
                  >
                    <School
                      size={25}
                      strokeWidth={1.9}
                    />
                  </div>

                  <div className="min-w-0">

                    {/* TITLE */}
                    <div className="flex flex-wrap items-center gap-2.5">

                      <h1
                        className="
                          text-[22px]
                          font-semibold
                          tracking-[-0.025em]
                          text-slate-900
                          sm:text-2xl
                          lg:text-[28px]
                        "
                      >
                        Data Sekolah
                      </h1>

                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-full
                          border
                          border-blue-100
                          bg-blue-50
                          px-3
                          py-1
                          text-[11px]
                          font-semibold
                          text-blue-600
                        "
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        Master Data
                      </span>

                    </div>

                    {/* DESCRIPTION */}
                    <div className="mt-1.5 flex items-center gap-2">

                      <LayoutGrid
                        size={14}
                        className="shrink-0 text-blue-400"
                        strokeWidth={2}
                      />

                      <p className="text-sm leading-5 text-slate-500">
                        Kelola seluruh sekolah yang terdaftar
                        pada ekosistem SmartSchool.
                      </p>

                    </div>

                  </div>
                </div>

                {/* RIGHT ACTION */}
                <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">

                  <button
                    type="button"
                    className="
                      inline-flex
                      h-11
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-5
                      text-sm
                      font-medium
                      text-slate-600
                      shadow-[0_2px_5px_rgba(15,23,42,0.05)]
                      transition-all
                      hover:border-slate-300
                      hover:bg-slate-50
                      hover:text-slate-800
                      active:scale-[0.98]
                    "
                  >
                    <FileSpreadsheet
                      size={17}
                      className="text-slate-500"
                    />
                    Export
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        "/super-admin/sekolah/tambah"
                      )
                    }
                    className="
                      inline-flex
                      h-11
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-slate-900
                      px-5
                      text-sm
                      font-semibold
                      text-white
                      shadow-[0_7px_18px_rgba(15,23,42,0.16)]
                      transition-all
                      hover:bg-slate-800
                      hover:shadow-[0_9px_22px_rgba(15,23,42,0.20)]
                      active:scale-[0.98]
                    "
                  >
                    <Plus
                      size={17}
                      strokeWidth={2.3}
                    />
                    Tambah Sekolah
                  </button>

                </div>

              </div>
            </section>

            {/* ==================================================
                STATISTIK
            ================================================== */}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">

              <StatCard
                label="Total Sekolah"
                value={stats.total}
                icon={School}
                color="blue"
              />

              <StatCard
                label="Sekolah Aktif"
                value={stats.aktif}
                icon={CheckCircle}
                color="emerald"
              />

              <StatCard
                label="Masa Trial"
                value={stats.trial}
                icon={Clock3}
                color="amber"
              />

              <StatCard
                label="Nonaktif"
                value={stats.nonaktif}
                icon={XCircle}
                color="rose"
              />

              <StatCard
                label="Total Guru"
                value={stats.totalGuru}
                icon={Users}
                color="violet"
              />

              <StatCard
                label="Total Siswa"
                value={stats.totalSiswa}
                icon={GraduationCap}
                color="teal"
              />

            </div>

            {/* ==================================================
                FILTER
            ================================================== */}

            <section
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-[0_2px_10px_rgba(15,23,42,0.04)]
                sm:p-5
              "
            >

              <div className="mb-4 flex items-center gap-3">

                <div
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-xl
                    bg-slate-100
                    text-slate-500
                  "
                >
                  <SlidersHorizontal size={16} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Filter Data
                  </p>

                  <p className="text-xs text-slate-400">
                    Cari dan filter sekolah
                  </p>
                </div>

              </div>

              <div
                className="
                  grid
                  gap-3
                  xl:grid-cols-[minmax(260px,1.5fr)_repeat(4,minmax(130px,1fr))_auto]
                "
              >

                {/* SEARCH */}
                <div className="relative">

                  <Search
                    size={16}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    type="text"
                    placeholder="Cari nama, NPSN, atau yayasan..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="
                      h-10
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      pl-10
                      pr-3
                      text-sm
                      text-slate-700
                      outline-none
                      transition-all
                      placeholder:text-slate-400
                      focus:border-blue-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-500/10
                    "
                  />

                </div>

                <FilterSelect
                  value={selectedProvinsi}
                  onChange={(value) => {
                    setSelectedProvinsi(value);
                    setCurrentPage(1);
                  }}
                  options={provinsiOptions}
                />

                <FilterSelect
                  value={selectedKota}
                  onChange={(value) => {
                    setSelectedKota(value);
                    setCurrentPage(1);
                  }}
                  options={kotaOptions}
                />

                <FilterSelect
                  value={selectedJenjang}
                  onChange={(value) => {
                    setSelectedJenjang(value);
                    setCurrentPage(1);
                  }}
                  options={jenjangOptions}
                />

                <FilterSelect
                  value={selectedStatus}
                  onChange={(value) => {
                    setSelectedStatus(value);
                    setCurrentPage(1);
                  }}
                  options={statusOptions}
                />

                <button
                  type="button"
                  onClick={resetFilters}
                  className="
                    h-10
                    rounded-xl
                    px-4
                    text-sm
                    font-medium
                    text-slate-500
                    transition-colors
                    hover:bg-slate-100
                    hover:text-slate-700
                  "
                >
                  Reset
                </button>

              </div>

              {/* SORT CONTROL - MOBILE */}
              {isMobile && (
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                  <p className="text-xs text-slate-400">Urutkan berdasarkan</p>
                  <SortControl
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSort={handleSortChange}
                  />
                </div>
              )}

              {/* SORT INDICATOR - DESKTOP */}
              {!isMobile && (
                <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-400">
                    Menampilkan{" "}
                    <span className="font-semibold text-slate-600">
                      {filteredData.length}
                    </span>{" "}
                    data sekolah
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-slate-400">
                      Klik nama kolom untuk mengurutkan
                    </p>
                    {sortField && (
                      <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                        <span>
                          {sortField === "nama" ? "Nama" : 
                           sortField === "npsn" ? "NPSN" :
                           sortField === "jenjang" ? "Jenjang" :
                           sortField === "status" ? "Status" : "Paket"}
                        </span>
                        {sortOrder === "asc" ? (
                          <ArrowUp size={11} />
                        ) : (
                          <ArrowDown size={11} />
                        )}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={resetSort}
                      className="
                        text-[10px]
                        text-slate-400
                        transition-colors
                        hover:text-slate-600
                        hover:underline
                      "
                    >
                      Reset Sort
                    </button>
                  </div>
                </div>
              )}

            </section>

            {/* ==================================================
                TABLE
            ================================================== */}

            <section
              className="
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-[0_3px_14px_rgba(15,23,42,0.05)]
              "
            >

              {isMobile ? (

                /* ================= MOBILE ================= */

                <div className="divide-y divide-slate-100">

                  {paginatedData.length === 0 ? (
                    <EmptyState />
                  ) : (
                    paginatedData.map((item, index) => (
                      <MobileSchoolCard
                        key={item.id}
                        item={item}
                        number={startIndex + index + 1}
                        router={router}
                        onDelete={handleDelete}
                        sortField={sortField}
                        sortOrder={sortOrder}
                      />
                    ))
                  )}

                </div>

              ) : (

                /* ================= DESKTOP ================= */

                <div className="w-full overflow-x-auto">

                  <table className="w-full min-w-[1080px] border-collapse">

                    <colgroup>
                      <col className="w-[60px]" />
                      <col className="w-[280px]" />
                      <col className="w-[120px]" />
                      <col className="w-[100px]" />
                      <col className="w-[180px]" />
                      <col className="w-[140px]" />
                      <col className="w-[140px]" />
                      <col className="w-[120px]" />
                    </colgroup>

                    <thead>

                      <tr className="border-b border-slate-200 bg-slate-50/80">

                        <TableHead>
                          No
                        </TableHead>

                        <TableHead
                          sortable
                          onClick={() =>
                            handleSort("nama")
                          }
                        >
                          <span className="flex items-center gap-1">
                            Nama Sekolah
                            {renderSortIcon("nama")}
                          </span>
                        </TableHead>

                        <TableHead
                          sortable
                          onClick={() =>
                            handleSort("npsn")
                          }
                        >
                          <span className="flex items-center gap-1">
                            NPSN
                            {renderSortIcon("npsn")}
                          </span>
                        </TableHead>

                        <TableHead
                          sortable
                          onClick={() =>
                            handleSort("jenjang")
                          }
                        >
                          <span className="flex items-center gap-1">
                            Jenjang
                            {renderSortIcon("jenjang")}
                          </span>
                        </TableHead>

                        <TableHead>
                          Yayasan
                        </TableHead>

                        <TableHead
                          sortable
                          onClick={() =>
                            handleSort("paket")
                          }
                        >
                          <span className="flex items-center gap-1">
                            Paket
                            {renderSortIcon("paket")}
                          </span>
                        </TableHead>

                        <TableHead
                          sortable
                          onClick={() =>
                            handleSort("status")
                          }
                        >
                          <span className="flex items-center gap-1">
                            Status
                            {renderSortIcon("status")}
                          </span>
                        </TableHead>

                        <TableHead align="right">
                          Aksi
                        </TableHead>

                      </tr>

                    </thead>

                    <tbody className="divide-y divide-slate-100">

                      {paginatedData.length === 0 ? (

                        <tr>

                          <td
                            colSpan={8}
                            className="px-6 py-16"
                          >
                            <EmptyState />
                          </td>

                        </tr>

                      ) : (

                        paginatedData.map(
                          (item, index) => {

                            const statusStyle =
                              statusColorMap[
                                item.status
                              ] ||
                              statusColorMap.Aktif;

                            const paketStyle =
                              paketColorMap[
                                item.paket
                              ] ||
                              paketColorMap.Starter;

                            return (
                              <tr
                                key={item.id}
                                className="
                                  group
                                  h-[88px]
                                  transition-colors
                                  hover:bg-slate-50/70
                                "
                              >

                                {/* NO */}
                                <td
                                  className="
                                    px-5
                                    py-4
                                    text-center
                                    text-sm
                                    text-slate-400
                                  "
                                >
                                  {startIndex + index + 1}
                                </td>

                                {/* NAMA */}
                                <td className="px-4 py-4">

                                  <div className="flex items-center gap-3">

                                    <div
                                      className="
                                        flex
                                        h-11
                                        w-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-blue-100
                                        bg-blue-50
                                        text-blue-600
                                        transition-all
                                        group-hover:border-blue-200
                                        group-hover:bg-blue-100
                                      "
                                    >
                                      <Building2
                                        size={20}
                                        strokeWidth={1.9}
                                      />
                                    </div>

                                    <div className="min-w-0">

                                      <p className="truncate text-sm font-semibold text-slate-800">
                                        {item.nama}
                                      </p>

                                      <p className="mt-1 text-xs text-slate-400">
                                        {item.statusSekolah}
                                      </p>

                                    </div>

                                  </div>

                                </td>

                                {/* NPSN */}
                                <td className="px-4 py-4">

                                  <span
                                    className="
                                      font-mono
                                      text-xs
                                      font-medium
                                      tracking-wide
                                      text-slate-500
                                    "
                                  >
                                    {item.npsn}
                                  </span>

                                </td>

                                {/* JENJANG */}
                                <td className="px-4 py-4">

                                  <span
                                    className="
                                      inline-flex
                                      items-center
                                      rounded-lg
                                      border
                                      border-slate-200
                                      bg-slate-50
                                      px-2.5
                                      py-1
                                      text-xs
                                      font-medium
                                      text-slate-600
                                    "
                                  >
                                    {item.jenjang}
                                  </span>

                                </td>

                                {/* YAYASAN */}
                                <td className="px-4 py-4">

                                  <p
                                    className="
                                      max-w-[160px]
                                      truncate
                                      text-sm
                                      text-slate-500
                                    "
                                    title={item.yayasan}
                                  >
                                    {item.yayasan}
                                  </p>

                                </td>

                                {/* PAKET */}
                                <td className="px-4 py-4">

                                  <span
                                    className={`
                                      inline-flex
                                      items-center
                                      rounded-lg
                                      border
                                      px-2.5
                                      py-1
                                      text-xs
                                      font-medium
                                      ${paketStyle.bg}
                                      ${paketStyle.text}
                                      ${paketStyle.border}
                                    `}
                                  >
                                    {item.paket}
                                  </span>

                                </td>

                                {/* STATUS */}
                                <td className="px-4 py-4">

                                  <span
                                    className={`
                                      inline-flex
                                      items-center
                                      gap-1.5
                                      rounded-full
                                      border
                                      px-2.5
                                      py-1
                                      text-xs
                                      font-medium
                                      ${statusStyle.bg}
                                      ${statusStyle.text}
                                      ${statusStyle.border}
                                    `}
                                  >

                                    <span
                                      className={`
                                        h-1.5
                                        w-1.5
                                        rounded-full
                                        ${statusStyle.dot}
                                      `}
                                    />

                                    {item.status}

                                  </span>

                                </td>

                                {/* ACTION */}
                                <td className="px-4 py-4">

                                  <div className="flex items-center justify-end gap-1">

                                    <ActionButton
                                      title="Lihat detail"
                                      onClick={() =>
                                        router.push(
                                          `/super-admin/sekolah/${item.id}`
                                        )
                                      }
                                    >
                                      <Eye size={16} />
                                    </ActionButton>

                                    <ActionButton
                                      title="Edit sekolah"
                                      hover="amber"
                                      onClick={() =>
                                        router.push(
                                          `/super-admin/sekolah/edit/${item.id}`
                                        )
                                      }
                                    >
                                      <Edit size={16} />
                                    </ActionButton>

                                    <ActionButton
                                      title="Hapus sekolah"
                                      hover="rose"
                                      onClick={() =>
                                        handleDelete(item)
                                      }
                                    >
                                      <Trash2 size={16} />
                                    </ActionButton>

                                  </div>

                                </td>

                              </tr>
                            );
                          }
                        )

                      )}

                    </tbody>

                  </table>

                </div>

              )}

              {/* ==================================================
                  PAGINATION
              ================================================== */}

              <div
                className="
                  flex
                  flex-col
                  gap-3
                  border-t
                  border-slate-200
                  px-4
                  py-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  sm:px-5
                "
              >

                <p className="text-xs text-slate-500">

                  Menampilkan{" "}

                  <span className="font-semibold text-slate-700">
                    {paginatedData.length === 0
                      ? 0
                      : startIndex + 1}
                  </span>

                  {" – "}

                  <span className="font-semibold text-slate-700">
                    {Math.min(
                      startIndex +
                        paginatedData.length,
                      sortedData.length
                    )}
                  </span>

                  {" dari "}

                  <span className="font-semibold text-slate-700">
                    {sortedData.length}
                  </span>

                  {" data"}

                </p>

                <div className="flex items-center justify-center gap-1">

                  {/* PREVIOUS */}
                  <button
                    onClick={() =>
                      setCurrentPage(
                        Math.max(
                          1,
                          currentPage - 1
                        )
                      )
                    }
                    disabled={currentPage === 1}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      text-slate-400
                      transition-all
                      hover:bg-slate-50
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    <ArrowUp
                      size={14}
                      className="-rotate-90"
                    />
                  </button>

                  {/* PAGE NUMBERS */}
                  {[...Array(Math.min(totalPages, 5))].map(
                    (_, i) => {

                      const page = i + 1;

                      return (
                        <button
                          key={page}
                          onClick={() =>
                            setCurrentPage(page)
                          }
                          className={`
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            text-xs
                            font-semibold
                            transition-all
                            ${
                              currentPage === page
                                ? "bg-blue-600 text-white shadow-[0_4px_10px_rgba(37,99,235,0.25)]"
                                : "text-slate-500 hover:bg-slate-100"
                            }
                          `}
                        >
                          {page}
                        </button>
                      );
                    }
                  )}

                  {totalPages > 5 && (
                    <>
                      <span className="px-0.5 text-slate-400">
                        …
                      </span>

                      <button
                        onClick={() =>
                          setCurrentPage(totalPages)
                        }
                        className={`
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          text-xs
                          font-semibold
                          transition-all
                          ${
                            currentPage === totalPages
                              ? "bg-blue-600 text-white"
                              : "text-slate-500 hover:bg-slate-100"
                          }
                        `}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  {/* NEXT */}
                  <button
                    onClick={() =>
                      setCurrentPage(
                        Math.min(
                          totalPages,
                          currentPage + 1
                        )
                      )
                    }
                    disabled={
                      currentPage === totalPages ||
                      totalPages === 0
                    }
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      text-slate-400
                      transition-all
                      hover:bg-slate-50
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    <ArrowDown
                      size={14}
                      className="-rotate-90"
                    />
                  </button>

                </div>

              </div>

            </section>

            {/* ==================================================
                FOOTER
            ================================================== */}

            <div className="border-t border-slate-200/70 pt-5 text-center">

              <p className="text-xs text-slate-400">
                © 2026 SmartSchool • Data Sekolah
                terakhir diperbarui hari ini
              </p>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

// ============================================================
// TABLE HEAD
// ============================================================

function TableHead({
  children,
  sortable = false,
  onClick,
  align = "left",
}) {
  return (
    <th
      onClick={onClick}
      className={`
        h-12
        px-4
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.08em]
        text-slate-400
        ${
          align === "right"
            ? "text-right"
            : "text-left"
        }
        ${
          sortable
            ? "cursor-pointer select-none hover:text-blue-600"
            : ""
        }
      `}
    >
      <div
        className={`
          flex
          items-center
          gap-1.5
          ${
            align === "right"
              ? "justify-end"
              : "justify-start"
          }
        `}
      >
        {children}
      </div>
    </th>
  );
}

// ============================================================
// FILTER SELECT
// ============================================================

function FilterSelect({
  value,
  onChange,
  options,
}) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="
        h-10
        w-full
        rounded-xl
        border
        border-slate-200
        bg-slate-50
        px-3
        text-sm
        text-slate-600
        outline-none
        transition-all
        hover:border-slate-300
        focus:border-blue-400
        focus:bg-white
        focus:ring-4
        focus:ring-blue-500/10
      "
    >
      {options.map((option) => (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  );
}

// ============================================================
// ACTION BUTTON
// ============================================================

function ActionButton({
  children,
  onClick,
  title,
  hover = "blue",
}) {
  const hoverClass = {
    blue: "hover:bg-blue-50 hover:text-blue-600",
    amber:
      "hover:bg-amber-50 hover:text-amber-600",
    rose:
      "hover:bg-rose-50 hover:text-rose-600",
  };

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-lg
        text-slate-400
        transition-all
        ${hoverClass[hover]}
      `}
    >
      {children}
    </button>
  );
}

// ============================================================
// MOBILE CARD
// ============================================================

function MobileSchoolCard({
  item,
  number,
  router,
  onDelete,
  sortField,
  sortOrder,
}) {
  const statusStyle =
    statusColorMap[item.status] ||
    statusColorMap.Aktif;

  const paketStyle =
    paketColorMap[item.paket] ||
    paketColorMap.Starter;

  // Highlight field yang sedang di-sort
  const getHighlightClass = (field) => {
    if (sortField === field) {
      return "bg-blue-50 border-blue-200 text-blue-700";
    }
    return "";
  };

  return (
    <div className="p-4 transition-colors hover:bg-slate-50/50">

      <div className="flex items-start gap-3">

        {/* NUMBER */}
        <span className="w-5 pt-2 text-xs font-medium text-slate-400">
          {number}
        </span>

        {/* ICON */}
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-blue-100
            bg-blue-50
            text-blue-600
          "
        >
          <Building2
            size={20}
            strokeWidth={1.9}
          />
        </div>

        {/* INFORMATION */}
        <div className="min-w-0 flex-1">

          <p className={`truncate text-sm font-semibold ${
            sortField === "nama" 
              ? "text-blue-700" 
              : "text-slate-800"
          }`}>
            {item.nama}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs">
            <span className={`text-slate-400 ${
              sortField === "npsn" ? "font-semibold text-blue-600" : ""
            }`}>
              {item.npsn}
            </span>
            <span className="text-slate-300">•</span>
            <span className={`text-slate-400 ${
              sortField === "jenjang" ? "font-semibold text-blue-600" : ""
            }`}>
              {item.jenjang}
            </span>
            <span className="text-slate-300">•</span>
            <span className={`text-slate-400 ${
              sortField === "status" ? "font-semibold text-blue-600" : ""
            }`}>
              {item.status}
            </span>
          </div>

        </div>

        {/* ACTION */}
        <div className="flex items-center gap-1">

          <ActionButton
            title="Detail"
            onClick={() =>
              router.push(
                `/super-admin/sekolah/${item.id}`
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
                `/super-admin/sekolah/edit/${item.id}`
              )
            }
          >
            <Edit size={15} />
          </ActionButton>

          <ActionButton
            title="Hapus"
            hover="rose"
            onClick={() => onDelete(item)}
          >
            <Trash2 size={15} />
          </ActionButton>

        </div>

      </div>

      {/* BADGES */}
      <div className="ml-8 mt-3 flex flex-wrap items-center gap-1.5">

        <span
          className={`rounded-lg border px-2.5 py-1 text-[10px] font-medium ${
            sortField === "jenjang" 
              ? "border-blue-300 bg-blue-50 text-blue-700"
              : "border-slate-200 bg-slate-50 text-slate-600"
          }`}
        >
          {item.jenjang}
        </span>

        <span
          className={`rounded-lg border px-2.5 py-1 text-[10px] font-medium ${
            sortField === "paket"
              ? "border-blue-300 bg-blue-50 text-blue-700"
              : `${paketStyle.bg} ${paketStyle.text} ${paketStyle.border}`
          }`}
        >
          {item.paket}
        </span>

        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium ${
            sortField === "status"
              ? "border-blue-300 bg-blue-50 text-blue-700"
              : `${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              sortField === "status" ? "bg-blue-500" : statusStyle.dot
            }`}
          />

          {item.status}
        </span>

        {/* Tampilkan indikator sort */}
        {sortField && (
          <span className="ml-auto text-[10px] text-slate-300">
            {sortOrder === "asc" ? "↑" : "↓"}
          </span>
        )}

      </div>

    </div>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">

      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-slate-100
          text-slate-400
        "
      >
        <Database size={24} />
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-700">
        Tidak ada data ditemukan
      </p>

      <p className="mt-1 text-xs text-slate-400">
        Coba ubah kata kunci atau filter pencarian.
      </p>

    </div>
  );
}

// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}) {
  const colorMap = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-100",
    },

    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-100",
    },

    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-100",
    },

    rose: {
      bg: "bg-rose-50",
      text: "text-rose-600",
      border: "border-rose-100",
    },

    violet: {
      bg: "bg-violet-50",
      text: "text-violet-600",
      border: "border-violet-100",
    },

    teal: {
      bg: "bg-teal-50",
      text: "text-teal-600",
      border: "border-teal-100",
    },
  };

  const styles =
    colorMap[color] ||
    colorMap.blue;

  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-3.5
        shadow-[0_2px_10px_rgba(15,23,42,0.04)]
        transition-all
        hover:-translate-y-0.5
        hover:shadow-[0_7px_20px_rgba(15,23,42,0.08)]
        sm:p-4
      "
    >

      <div className="flex items-center gap-3">

        {/* ICON */}
        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${styles.bg}
            ${styles.text}
          `}
        >
          <Icon
            size={18}
            strokeWidth={1.9}
          />
        </div>

        {/* VALUE */}
        <div className="min-w-0">

          <p
            className="
              truncate
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.06em]
              text-slate-400
            "
          >
            {label}
          </p>

          <p
            className="
              mt-0.5
              text-xl
              font-semibold
              tracking-tight
              text-slate-800
            "
          >
            {typeof value === "number"
              ? value.toLocaleString("id-ID")
              : value}
          </p>

        </div>

      </div>

    </div>
  );
}