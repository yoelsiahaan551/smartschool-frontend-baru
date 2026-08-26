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
} from "lucide-react";

// =========================================================
// STORAGE
// =========================================================

const STORAGE_KEY = "kelas_data";

// =========================================================
// DEFAULT DATA
// =========================================================

const getDefaultKelas = () => [
  // =======================================================
  // KELAS X
  // =======================================================

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

  // =======================================================
  // KELAS XI
  // =======================================================

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

  // =======================================================
  // KELAS XII
  // =======================================================

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

// =========================================================
// LOCAL STORAGE
// =========================================================

const loadKelas = () => {
  if (typeof window === "undefined") {
    return getDefaultKelas();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      const defaults = getDefaultKelas();

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaults)
      );

      return defaults;
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error("Gagal membaca data kelas:", error);

    return getDefaultKelas();
  }
};

const saveKelas = (data) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
};

// =========================================================
// STAT CARD
// =========================================================

function StatCard({
  icon: Icon,
  label,
  value,
  description,
  iconClass,
  valueClass,
}) {
  return (
    <div
      className="
        group
        min-w-0
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            {label}
          </p>

          <p
            className={`mt-2 text-2xl font-bold tracking-tight ${
              valueClass || "text-slate-800"
            }`}
          >
            {value}
          </p>

          <p className="mt-1 truncate text-[11px] text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
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

  const [isCollapsed, setIsCollapsed] =
    useState(false);

  const [kelas, setKelas] = useState([]);

  const [search, setSearch] = useState("");

  const [jenjangFilter, setJenjangFilter] =
    useState("Semua");

  const [expandedJenjang, setExpandedJenjang] =
    useState(["X", "XI", "XII"]);

  // =======================================================
  // SIDEBAR
  // =======================================================

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  // =======================================================
  // LOAD DATA
  // =======================================================

  useEffect(() => {
    setKelas(loadKelas());
  }, []);

  // =======================================================
  // DELETE
  // =======================================================

  const handleDelete = (id, nama) => {
    const confirmed = window.confirm(
      `Yakin ingin menghapus kelas "${nama}"?`
    );

    if (!confirmed) return;

    const updated = kelas.filter(
      (item) => item.id !== id
    );

    setKelas(updated);

    saveKelas(updated);

    alert(
      `Kelas "${nama}" berhasil dihapus!`
    );
  };

  // =======================================================
  // REFRESH
  // =======================================================

  const handleRefresh = () => {
    const data = loadKelas();

    setKelas(data);
  };

  // =======================================================
  // TOGGLE JENJANG
  // =======================================================

  const toggleJenjang = (jenjang) => {
    setExpandedJenjang((prev) =>
      prev.includes(jenjang)
        ? prev.filter((item) => item !== jenjang)
        : [...prev, jenjang]
    );
  };

  // =======================================================
  // FILTER
  // =======================================================

  const filtered = kelas.filter((item) => {
    const searchValue =
      search.toLowerCase().trim();

    const matchSearch =
      item.nama
        ?.toLowerCase()
        .includes(searchValue) ||
      item.wali_kelas
        ?.toLowerCase()
        .includes(searchValue);

    const matchJenjang =
      jenjangFilter === "Semua" ||
      item.jenjang === jenjangFilter;

    return matchSearch && matchJenjang;
  });

  // =======================================================
  // GROUPING
  // =======================================================

  const groupedByJenjang =
    filtered.reduce((acc, item) => {
      if (!acc[item.jenjang]) {
        acc[item.jenjang] = [];
      }

      acc[item.jenjang].push(item);

      return acc;
    }, {});

  const jenjangKeys = [
    "X",
    "XI",
    "XII",
  ];

  // =======================================================
  // STATISTICS
  // =======================================================

  const totalKelas = kelas.length;

  const totalAktif = kelas.filter(
    (item) => item.status === "aktif"
  ).length;

  const totalNonaktif =
    totalKelas - totalAktif;

  const totalSiswa = kelas.reduce(
    (sum, item) =>
      sum + Number(item.jumlah_siswa || 0),
    0
  );

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <Sidebar
        active="kelas"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      {/* ===================================================
          MAIN AREA
      =================================================== */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* HEADER */}

        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email: "admin@smartschool.com",
            avatar: "AD",
          }}
        />

        {/* =================================================
            CONTENT
        ================================================= */}

        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full px-4 py-5 sm:px-5 sm:py-6 md:px-6 lg:px-8 xl:px-10">
            <div className="w-full space-y-5">
              {/* =================================================
                  PAGE HEADER
              ================================================= */}

              <section
                className="
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                {/* TITLE */}

                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-600
                      text-white
                      shadow-md
                      shadow-blue-200
                      sm:h-12
                      sm:w-12
                    "
                  >
                    <GraduationCap size={22} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h1 className="truncate text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
                        Kelola Kelas
                      </h1>

                      <span className="hidden rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-600 sm:inline-flex">
                        {totalKelas} Kelas
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs text-slate-500 sm:text-sm">
                      Kelola seluruh kelas dan wali kelas
                      berdasarkan jenjang
                    </p>
                  </div>
                </div>

                {/* ACTION */}

                <div className="flex w-full items-center gap-2 sm:w-auto">
                  <button
                    type="button"
                    onClick={handleRefresh}
                    title="Refresh data"
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-slate-500
                      shadow-sm
                      transition-all
                      hover:border-blue-200
                      hover:bg-blue-50
                      hover:text-blue-600
                    "
                  >
                    <RefreshCw size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        "/admin/kelas/tambah"
                      )
                    }
                    className="
                      flex
                      min-h-10
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-blue-600
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                      shadow-md
                      shadow-blue-200
                      transition-all
                      hover:bg-blue-700
                      hover:shadow-lg
                      sm:flex-none
                      sm:px-5
                    "
                  >
                    <Plus size={18} />

                    <span>Tambah Kelas</span>
                  </button>
                </div>
              </section>

              {/* =================================================
                  STATISTICS
              ================================================= */}

              <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                <StatCard
                  icon={GraduationCap}
                  label="Total Kelas"
                  value={totalKelas}
                  description="Seluruh kelas terdaftar"
                  iconClass="bg-blue-50 text-blue-600"
                  valueClass="text-slate-800"
                />

                <StatCard
                  icon={CheckCircle}
                  label="Kelas Aktif"
                  value={totalAktif}
                  description="Kelas yang sedang aktif"
                  iconClass="bg-emerald-50 text-emerald-600"
                  valueClass="text-emerald-600"
                />

                <StatCard
                  icon={XCircle}
                  label="Nonaktif"
                  value={totalNonaktif}
                  description="Kelas tidak aktif"
                  iconClass="bg-rose-50 text-rose-600"
                  valueClass="text-rose-600"
                />

                <StatCard
                  icon={Users}
                  label="Total Siswa"
                  value={totalSiswa}
                  description="Jumlah seluruh siswa"
                  iconClass="bg-indigo-50 text-indigo-600"
                  valueClass="text-indigo-600"
                />
              </section>

              {/* =================================================
                  SEARCH & FILTER
              ================================================= */}

              <section
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-4
                  shadow-sm
                "
              >
                <div className="mb-3 flex items-center gap-2">
                  <SlidersHorizontal
                    size={16}
                    className="text-blue-600"
                  />

                  <p className="text-xs font-semibold text-slate-700">
                    Pencarian & Filter
                  </p>
                </div>

                <div className="flex w-full flex-col gap-3 lg:flex-row">
                  {/* SEARCH */}

                  <div className="relative min-w-0 flex-1">
                    <Search
                      size={17}
                      className="
                        pointer-events-none
                        absolute
                        left-3.5
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      type="text"
                      placeholder="Cari nama kelas atau wali kelas..."
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        py-2.5
                        pl-10
                        pr-4
                        text-sm
                        text-slate-700
                        placeholder:text-slate-400
                        outline-none
                        transition-all
                        hover:border-slate-300
                        hover:bg-white
                        focus:border-blue-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-500/10
                      "
                    />
                  </div>

                  {/* FILTER */}

                  <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
                    <div className="relative min-w-0 flex-1 sm:min-w-[180px]">
                      <Filter
                        size={16}
                        className="
                          pointer-events-none
                          absolute
                          left-3
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      />

                      <select
                        value={jenjangFilter}
                        onChange={(e) =>
                          setJenjangFilter(
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          appearance-none
                          rounded-xl
                          border
                          border-slate-200
                          bg-slate-50
                          py-2.5
                          pl-9
                          pr-9
                          text-sm
                          text-slate-600
                          outline-none
                          transition-all
                          hover:border-slate-300
                          hover:bg-white
                          focus:border-blue-500
                          focus:bg-white
                          focus:ring-4
                          focus:ring-blue-500/10
                        "
                      >
                        <option value="Semua">
                          Semua Jenjang
                        </option>

                        <option value="X">
                          Kelas X
                        </option>

                        <option value="XI">
                          Kelas XI
                        </option>

                        <option value="XII">
                          Kelas XII
                        </option>
                      </select>

                      <ChevronDown
                        size={16}
                        className="
                          pointer-events-none
                          absolute
                          right-3
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      />
                    </div>

                    {/* RESET */}

                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setJenjangFilter("Semua");
                      }}
                      className="
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-slate-500
                        transition-all
                        hover:border-blue-200
                        hover:bg-blue-50
                        hover:text-blue-600
                      "
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {/* RESULT INFO */}

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                  <p className="text-[11px] text-slate-400">
                    Menampilkan{" "}
                    <span className="font-semibold text-slate-600">
                      {filtered.length}
                    </span>{" "}
                    dari{" "}
                    <span className="font-semibold text-slate-600">
                      {totalKelas}
                    </span>{" "}
                    kelas
                  </p>

                  {(search ||
                    jenjangFilter !==
                      "Semua") && (
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-medium text-blue-600">
                      Filter aktif
                    </span>
                  )}
                </div>
              </section>

              {/* =================================================
                  CLASS GROUPS
              ================================================= */}

              <section className="space-y-4">
                {jenjangKeys.map((jenjang) => {
                  const items =
                    groupedByJenjang[jenjang] ||
                    [];

                  const isExpanded =
                    expandedJenjang.includes(
                      jenjang
                    );

                  const total = items.length;

                  const siswa = items.reduce(
                    (sum, item) =>
                      sum +
                      Number(
                        item.jumlah_siswa || 0
                      ),
                    0
                  );

                  const activeCount =
                    items.filter(
                      (item) =>
                        item.status === "aktif"
                    ).length;

                  if (
                    items.length === 0 &&
                    jenjangFilter !== "Semua"
                  ) {
                    return null;
                  }

                  if (
                    items.length === 0 &&
                    search
                  ) {
                    return null;
                  }

                  return (
                    <div
                      key={jenjang}
                      className="
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        shadow-sm
                        transition-all
                        hover:shadow-md
                      "
                    >
                      {/* =====================================
                          JENJANG HEADER
                      ===================================== */}

                      <button
                        type="button"
                        onClick={() =>
                          toggleJenjang(
                            jenjang
                          )
                        }
                        className="
                          flex
                          w-full
                          items-center
                          justify-between
                          gap-4
                          border-b
                          border-slate-100
                          bg-slate-50/70
                          px-4
                          py-4
                          text-left
                          transition-all
                          hover:bg-blue-50/50
                          sm:px-5
                        "
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          {/* ICON */}

                          <div
                            className="
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              bg-blue-100
                              text-blue-600
                            "
                          >
                            <School size={19} />
                          </div>

                          {/* TEXT */}

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                                Kelas {jenjang}
                              </h2>

                              <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-500 ring-1 ring-slate-200">
                                {total} kelas
                              </span>
                            </div>

                            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                              <span className="text-[11px] text-slate-400">
                                {siswa} siswa
                              </span>

                              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

                              <span className="text-[11px] text-emerald-600">
                                {activeCount} aktif
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* CHEVRON */}

                        <div
                          className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-slate-200
                            bg-white
                            text-slate-400
                            transition-colors
                          "
                        >
                          <ChevronDown
                            size={17}
                            className={`
                              transition-transform
                              duration-300
                              ${
                                isExpanded
                                  ? "rotate-180"
                                  : ""
                              }
                            `}
                          />
                        </div>
                      </button>

                      {/* =====================================
                          CLASS ITEMS
                      ===================================== */}

                      {isExpanded && (
                        <div className="divide-y divide-slate-100">
                          {items.length === 0 ? (
                            <div className="p-8 text-center">
                              <p className="text-sm text-slate-400">
                                Belum ada kelas
                                di jenjang ini.
                              </p>
                            </div>
                          ) : (
                            items.map(
                              (item) => {
                                const isActive =
                                  item.status ===
                                  "aktif";

                                return (
                                  <div
                                    key={item.id}
                                    className={`
                                      group
                                      p-4
                                      transition-colors
                                      hover:bg-slate-50/70
                                      sm:p-5
                                      ${
                                        !isActive
                                          ? "bg-slate-50/30"
                                          : ""
                                      }
                                    `}
                                  >
                                    <div
                                      className="
                                        flex
                                        min-w-0
                                        flex-col
                                        gap-4
                                        lg:flex-row
                                        lg:items-center
                                        lg:justify-between
                                      "
                                    >
                                      {/* LEFT */}

                                      <div className="flex min-w-0 items-start gap-3">
                                        {/* CLASS ICON */}

                                        <div
                                          className={`
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            ${
                                              isActive
                                                ? "bg-blue-50 text-blue-600"
                                                : "bg-slate-100 text-slate-400"
                                            }
                                          `}
                                        >
                                          <GraduationCap
                                            size={19}
                                          />
                                        </div>

                                        {/* CLASS INFO */}

                                        <div className="min-w-0 flex-1">
                                          <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="text-sm font-bold text-slate-800">
                                              {
                                                item.nama
                                              }
                                            </h3>

                                            <span
                                              className={`
                                                inline-flex
                                                items-center
                                                gap-1.5
                                                rounded-full
                                                border
                                                px-2
                                                py-0.5
                                                text-[10px]
                                                font-semibold
                                                ${
                                                  isActive
                                                    ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                                                    : "border-slate-200 bg-slate-100 text-slate-400"
                                                }
                                              `}
                                            >
                                              {isActive ? (
                                                <CheckCircle
                                                  size={
                                                    10
                                                  }
                                                />
                                              ) : (
                                                <XCircle
                                                  size={
                                                    10
                                                  }
                                                />
                                              )}

                                              {isActive
                                                ? "Aktif"
                                                : "Nonaktif"}
                                            </span>
                                          </div>

                                          {/* DETAILS */}

                                          <div className="mt-2 grid grid-cols-1 gap-x-5 gap-y-1.5 sm:grid-cols-2 xl:grid-cols-4">
                                            {/* WALI */}

                                            <span className="flex min-w-0 items-center gap-1.5 text-xs text-slate-600">
                                              <UserCheck
                                                size={
                                                  13
                                                }
                                                className="shrink-0 text-blue-500"
                                              />

                                              <span className="truncate">
                                                {
                                                  item.wali_kelas
                                                }
                                              </span>
                                            </span>

                                            {/* SISWA */}

                                            <span className="flex items-center gap-1.5 text-xs text-slate-500">
                                              <Users
                                                size={
                                                  13
                                                }
                                                className="shrink-0 text-indigo-500"
                                              />

                                              {
                                                item.jumlah_siswa
                                              }{" "}
                                              siswa
                                            </span>

                                            {/* RUANGAN */}

                                            {item.ruangan && (
                                              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                                                <MapPin
                                                  size={
                                                    13
                                                  }
                                                  className="shrink-0 text-slate-400"
                                                />

                                                {
                                                  item.ruangan
                                                }
                                              </span>
                                            )}

                                            {/* TAHUN */}

                                            <span className="flex items-center gap-1.5 text-xs text-slate-500">
                                              <CalendarDays
                                                size={
                                                  13
                                                }
                                                className="shrink-0 text-slate-400"
                                              />

                                              {
                                                item.tahun_ajaran
                                              }
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* ACTION */}

                                      <div className="flex shrink-0 items-center gap-2 border-t border-slate-100 pt-3 lg:border-0 lg:pt-0">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            router.push(
                                              `/admin/kelas/edit/${item.id}`
                                            )
                                          }
                                          className="
                                            flex
                                            h-9
                                            items-center
                                            justify-center
                                            gap-1.5
                                            rounded-lg
                                            border
                                            border-slate-200
                                            bg-white
                                            px-3
                                            text-xs
                                            font-medium
                                            text-slate-500
                                            transition-all
                                            hover:border-blue-200
                                            hover:bg-blue-50
                                            hover:text-blue-600
                                          "
                                        >
                                          <Edit
                                            size={
                                              15
                                            }
                                          />

                                          <span>
                                            Edit
                                          </span>
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleDelete(
                                              item.id,
                                              item.nama
                                            )
                                          }
                                          className="
                                            flex
                                            h-9
                                            items-center
                                            justify-center
                                            gap-1.5
                                            rounded-lg
                                            border
                                            border-slate-200
                                            bg-white
                                            px-3
                                            text-xs
                                            font-medium
                                            text-slate-500
                                            transition-all
                                            hover:border-rose-200
                                            hover:bg-rose-50
                                            hover:text-rose-600
                                          "
                                        >
                                          <Trash2
                                            size={
                                              15
                                            }
                                          />

                                          <span>
                                            Hapus
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            )
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>

              {/* =================================================
                  EMPTY STATE
              ================================================= */}

              {filtered.length === 0 && (
                <div
                  className="
                    flex
                    min-h-[280px]
                    w-full
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-6
                    py-10
                    text-center
                    shadow-sm
                  "
                >
                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-blue-50
                      text-blue-300
                    "
                  >
                    <GraduationCap
                      size={32}
                    />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-slate-700">
                    Tidak ada data kelas
                  </p>

                  <p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-400">
                    {search ||
                    jenjangFilter !== "Semua"
                      ? "Tidak ditemukan kelas yang sesuai dengan pencarian atau filter."
                      : "Belum ada data kelas yang tersedia."}
                  </p>

                  {search ||
                  jenjangFilter !== "Semua" ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setJenjangFilter(
                          "Semua"
                        );
                      }}
                      className="
                        mt-4
                        rounded-xl
                        bg-blue-50
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        text-blue-600
                        transition-colors
                        hover:bg-blue-100
                      "
                    >
                      Reset Filter
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          "/admin/kelas/tambah"
                        )
                      }
                      className="
                        mt-4
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        px-4
                        py-2.5
                        text-xs
                        font-semibold
                        text-white
                        shadow-sm
                        transition-all
                        hover:bg-blue-700
                      "
                    >
                      <Plus size={15} />

                      Tambah Kelas
                    </button>
                  )}
                </div>
              )}

              {/* =================================================
                  FOOTER
              ================================================= */}

              <footer className="border-t border-slate-200/70 py-4 text-center">
                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                  <LayoutGrid size={12} />

                  <span>
                    © 2026 SmartSchool • Kelola Kelas &
                    Wali Kelas
                  </span>
                </div>
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}