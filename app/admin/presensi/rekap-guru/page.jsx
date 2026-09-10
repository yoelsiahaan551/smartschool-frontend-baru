"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  FileSpreadsheet,
  Filter,
  RefreshCw,
  Search,
  Users,
  UserCheck,
  UserX,
  XCircle,
} from "lucide-react";

/* ================================================================
   DUMMY DATA
================================================================ */

const INITIAL_DATA = [
  {
    id: 1,
    nama: "Dian Puspita, S.Pd.",
    nip: "198705122014022001",
    jabatan: "Guru Matematika",
    status: "hadir",
    jamMasuk: "06:54",
    jamPulang: "15:02",
    terlambat: 0,
    izin: 0,
    sakit: 0,
    alpha: 0,
    totalHari: 22,
  },
  {
    id: 2,
    nama: "Budi Santoso, S.Pd.",
    nip: "198903182015031002",
    jabatan: "Guru Bahasa Indonesia",
    status: "hadir",
    jamMasuk: "06:58",
    jamPulang: "15:00",
    terlambat: 0,
    izin: 0,
    sakit: 0,
    alpha: 0,
    totalHari: 22,
  },
  {
    id: 3,
    nama: "Rina Maharani, S.Pd.",
    nip: "199101222016022003",
    jabatan: "Guru Bahasa Inggris",
    status: "terlambat",
    jamMasuk: "07:18",
    jamPulang: "15:05",
    terlambat: 2,
    izin: 0,
    sakit: 0,
    alpha: 0,
    totalHari: 22,
  },
  {
    id: 4,
    nama: "Andi Wijaya, S.Pd.",
    nip: "198812052014011004",
    jabatan: "Guru IPA",
    status: "izin",
    jamMasuk: "-",
    jamPulang: "-",
    terlambat: 0,
    izin: 1,
    sakit: 0,
    alpha: 0,
    totalHari: 22,
  },
  {
    id: 5,
    nama: "Sari Wulandari, S.Pd.",
    nip: "199207112018022005",
    jabatan: "Guru Seni Budaya",
    status: "sakit",
    jamMasuk: "-",
    jamPulang: "-",
    terlambat: 0,
    izin: 0,
    sakit: 2,
    alpha: 0,
    totalHari: 22,
  },
  {
    id: 6,
    nama: "Doni Pratama, S.Pd.",
    nip: "199005202017031006",
    jabatan: "Guru Penjaskes",
    status: "hadir",
    jamMasuk: "06:51",
    jamPulang: "15:10",
    terlambat: 0,
    izin: 0,
    sakit: 0,
    alpha: 0,
    totalHari: 22,
  },
  {
    id: 7,
    nama: "Wulan Permata, S.Sn.",
    nip: "199102152019022007",
    jabatan: "Guru Seni Musik",
    status: "terlambat",
    jamMasuk: "07:12",
    jamPulang: "15:00",
    terlambat: 1,
    izin: 0,
    sakit: 0,
    alpha: 0,
    totalHari: 22,
  },
  {
    id: 8,
    nama: "Anwar Hidayat, S.Pd.",
    nip: "198806082013011008",
    jabatan: "Guru IPS",
    status: "alpha",
    jamMasuk: "-",
    jamPulang: "-",
    terlambat: 0,
    izin: 0,
    sakit: 0,
    alpha: 1,
    totalHari: 22,
  },
  {
    id: 9,
    nama: "Dewi Lestari, S.Pd.",
    nip: "199008102015032009",
    jabatan: "Guru Biologi",
    status: "hadir",
    jamMasuk: "06:56",
    jamPulang: "15:03",
    terlambat: 0,
    izin: 0,
    sakit: 0,
    alpha: 0,
    totalHari: 22,
  },
  {
    id: 10,
    nama: "Rudi Hartono, S.Pd.",
    nip: "198907142016011010",
    jabatan: "Guru Fisika",
    status: "hadir",
    jamMasuk: "06:59",
    jamPulang: "15:01",
    terlambat: 0,
    izin: 0,
    sakit: 0,
    alpha: 0,
    totalHari: 22,
  },
];

/* ================================================================
   STATUS CONFIG
================================================================ */

const STATUS_CONFIG = {
  hadir: {
    label: "Hadir",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
  terlambat: {
    label: "Terlambat",
    className: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
  izin: {
    label: "Izin",
    className: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  sakit: {
    label: "Sakit",
    className: "bg-violet-50 text-violet-700 border-violet-200",
    dot: "bg-violet-500",
  },
  alpha: {
    label: "Alpha",
    className: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500",
  },
};

/* ================================================================
   PAGE
================================================================ */

export default function RekapGuruPage() {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [data, setData] = useState(INITIAL_DATA);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("semua");

  const [tanggal, setTanggal] = useState("2026-09-10");

  const [selectedId, setSelectedId] = useState(
    INITIAL_DATA[0].id
  );

  /* ==============================================================
     NOTIFICATIONS
     
     WAJIB ARRAY karena Header melakukan:
     notifications.filter(...)
  ============================================================== */

  const notifications = [
    {
      id: 1,
      title: "Rekap presensi tersedia",
      desc: "Rekap presensi guru hari ini telah diperbarui.",
      read: false,
    },
    {
      id: 2,
      title: "Permohonan izin baru",
      desc: "Ada permohonan izin guru yang perlu ditinjau.",
      read: true,
    },
  ];

  /* ==============================================================
     FILTER DATA
  ============================================================== */

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return data.filter((item) => {
      const matchesSearch =
        !keyword ||
        item.nama.toLowerCase().includes(keyword) ||
        item.nip.toLowerCase().includes(keyword) ||
        item.jabatan.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "semua" ||
        item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [data, search, statusFilter]);

  /* ==============================================================
     SELECTED
  ============================================================== */

  const selectedGuru =
    data.find((item) => item.id === selectedId) ||
    filteredData[0] ||
    null;

  /* ==============================================================
     STATISTICS
  ============================================================== */

  const totalGuru = data.length;

  const totalHadir = data.filter(
    (item) => item.status === "hadir"
  ).length;

  const totalTerlambat = data.filter(
    (item) => item.status === "terlambat"
  ).length;

  const totalTidakHadir = data.filter(
    (item) =>
      item.status === "izin" ||
      item.status === "sakit" ||
      item.status === "alpha"
  ).length;

  /* ==============================================================
     REFRESH DUMMY
  ============================================================== */

  const handleRefresh = () => {
    setData(INITIAL_DATA);
    setSearch("");
    setStatusFilter("semua");
    setSelectedId(INITIAL_DATA[0].id);
  };

  /* ==============================================================
     EXPORT DUMMY
  ============================================================== */

  const handleExport = () => {
    alert(
      "Export Excel masih menggunakan mode dummy. Nantinya dapat dihubungkan ke API/export backend."
    );
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* ==========================================================
          SIDEBAR
      ========================================================== */}

      <Sidebar
        role="admin"
        active="rekapPresensiGuru"
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={() =>
          setSidebarOpen(!sidebarOpen)
        }
      />

      {/* ==========================================================
          MAIN
      ========================================================== */}

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() =>
            setSidebarOpen(!sidebarOpen)
          }
          notifications={notifications}
          user={{
            name: "Admin Sekolah",
            email: "admin@smartschool.com",
            avatar: "AS",
          }}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-[1550px] mx-auto p-4 sm:p-6 lg:p-8">
            {/* ====================================================
                HEADER
            ==================================================== */}

            <div className="flex flex-col gap-5 mb-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={() =>
                      router.push("/admin/presensi")
                    }
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm flex-shrink-0"
                  >
                    <ArrowLeft size={18} />
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />

                      <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        Presensi & Kehadiran
                      </p>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                      Rekap Presensi Guru
                    </h1>

                    <p className="text-sm text-slate-500 mt-1.5">
                      Pantau dan kelola rekap kehadiran guru
                      secara terstruktur.
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRefresh}
                    className="h-10 px-3.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm inline-flex items-center gap-2"
                  >
                    <RefreshCw size={15} />
                    Refresh
                  </button>

                  <button
                    type="button"
                    onClick={handleExport}
                    className="h-10 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all shadow-sm inline-flex items-center gap-2"
                  >
                    <Download size={15} />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* ====================================================
                STAT CARDS
            ==================================================== */}

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <StatCard
                icon={Users}
                label="Total Guru"
                value={totalGuru}
                description="Guru terdaftar"
                iconClass="bg-blue-50 text-blue-600"
              />

              <StatCard
                icon={UserCheck}
                label="Hadir"
                value={totalHadir}
                description="Guru hadir"
                iconClass="bg-emerald-50 text-emerald-600"
              />

              <StatCard
                icon={Clock3}
                label="Terlambat"
                value={totalTerlambat}
                description="Perlu diperhatikan"
                iconClass="bg-amber-50 text-amber-600"
              />

              <StatCard
                icon={UserX}
                label="Tidak Hadir"
                value={totalTidakHadir}
                description="Izin, sakit, atau alpha"
                iconClass="bg-red-50 text-red-600"
              />
            </div>

            {/* ====================================================
                FILTER
            ==================================================== */}

            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-4 mb-6">
              <div className="flex flex-col xl:flex-row gap-3">
                {/* DATE */}

                <div className="relative xl:w-56 flex-shrink-0">
                  <CalendarDays
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="date"
                    value={tanggal}
                    onChange={(e) =>
                      setTanggal(e.target.value)
                    }
                    className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-700 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                {/* SEARCH */}

                <div className="relative flex-1 min-w-0">
                  <Search
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Cari nama guru, NIP, atau jabatan..."
                    className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all"
                  />
                </div>

                {/* STATUS */}

                <div className="flex items-center gap-2 overflow-x-auto pb-1 xl:pb-0">
                  <div className="hidden sm:flex w-10 h-10 rounded-xl bg-slate-50 items-center justify-center text-slate-500 flex-shrink-0">
                    <Filter size={16} />
                  </div>

                  <FilterButton
                    active={statusFilter === "semua"}
                    onClick={() =>
                      setStatusFilter("semua")
                    }
                  >
                    Semua
                  </FilterButton>

                  <FilterButton
                    active={statusFilter === "hadir"}
                    onClick={() =>
                      setStatusFilter("hadir")
                    }
                  >
                    Hadir
                  </FilterButton>

                  <FilterButton
                    active={statusFilter === "terlambat"}
                    onClick={() =>
                      setStatusFilter("terlambat")
                    }
                  >
                    Terlambat
                  </FilterButton>

                  <FilterButton
                    active={statusFilter === "izin"}
                    onClick={() =>
                      setStatusFilter("izin")
                    }
                  >
                    Izin
                  </FilterButton>

                  <FilterButton
                    active={statusFilter === "sakit"}
                    onClick={() =>
                      setStatusFilter("sakit")
                    }
                  >
                    Sakit
                  </FilterButton>

                  <FilterButton
                    active={statusFilter === "alpha"}
                    onClick={() =>
                      setStatusFilter("alpha")
                    }
                  >
                    Alpha
                  </FilterButton>
                </div>
              </div>
            </div>

            {/* ====================================================
                CONTENT
            ==================================================== */}

            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
              {/* ==================================================
                  TABLE
              ================================================== */}

              <section className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden min-w-0">
                <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-slate-800">
                      Data Kehadiran Guru
                    </h2>

                    <p className="text-xs text-slate-500 mt-0.5">
                      {filteredData.length} data ditampilkan
                    </p>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <FileSpreadsheet size={17} />
                  </div>
                </div>

                {filteredData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px]">
                      <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-100">
                          <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Guru
                          </th>

                          <th className="text-left px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Status
                          </th>

                          <th className="text-left px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Jam Masuk
                          </th>

                          <th className="text-left px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Jam Pulang
                          </th>

                          <th className="text-center px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Terlambat
                          </th>

                          <th className="text-right px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Detail
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {filteredData.map((item) => {
                          const isSelected =
                            selectedGuru?.id === item.id;

                          return (
                            <tr
                              key={item.id}
                              onClick={() =>
                                setSelectedId(item.id)
                              }
                              className={`cursor-pointer transition-colors ${
                                isSelected
                                  ? "bg-blue-50/60"
                                  : "hover:bg-slate-50"
                              }`}
                            >
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                      isSelected
                                        ? "bg-blue-600 text-white"
                                        : "bg-blue-50 text-blue-700"
                                    }`}
                                  >
                                    {getInitials(item.nama)}
                                  </div>

                                  <div className="min-w-0">
                                    <p className="text-sm font-bold text-slate-800 truncate max-w-[250px]">
                                      {item.nama}
                                    </p>

                                    <p className="text-xs text-slate-500 mt-0.5 truncate max-w-[250px]">
                                      {item.jabatan}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="px-4 py-4">
                                <StatusBadge
                                  status={item.status}
                                />
                              </td>

                              <td className="px-4 py-4">
                                <span className="text-sm font-semibold text-slate-700">
                                  {item.jamMasuk}
                                </span>
                              </td>

                              <td className="px-4 py-4">
                                <span className="text-sm font-semibold text-slate-700">
                                  {item.jamPulang}
                                </span>
                              </td>

                              <td className="px-4 py-4 text-center">
                                <span
                                  className={
                                    item.terlambat > 0
                                      ? "text-sm font-bold text-amber-600"
                                      : "text-sm font-medium text-slate-400"
                                  }
                                >
                                  {item.terlambat}
                                </span>
                              </td>

                              <td className="px-5 py-4 text-right">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedId(item.id);
                                  }}
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                                >
                                  Lihat
                                  <span>→</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <EmptyState
                    onReset={() => {
                      setSearch("");
                      setStatusFilter("semua");
                    }}
                  />
                )}
              </section>

              {/* ==================================================
                  DETAIL CARD
              ================================================== */}

              <aside className="xl:sticky xl:top-6">
                {selectedGuru ? (
                  <GuruDetailCard guru={selectedGuru} />
                ) : (
                  <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
                    <Users
                      size={25}
                      className="mx-auto text-slate-300"
                    />

                    <p className="text-sm font-semibold text-slate-700 mt-3">
                      Belum ada data
                    </p>
                  </div>
                )}
              </aside>
            </div>

            {/* ====================================================
                MOBILE ACTION
            ==================================================== */}

            <div className="grid grid-cols-2 gap-3 mt-5 sm:hidden">
              <button
                type="button"
                onClick={handleRefresh}
                className="h-11 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-600 flex items-center justify-center gap-2"
              >
                <RefreshCw size={15} />
                Refresh
              </button>

              <button
                type="button"
                onClick={handleExport}
                className="h-11 rounded-xl bg-blue-600 text-white text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Download size={15} />
                Export
              </button>
            </div>

            {/* ====================================================
                FOOTER
            ==================================================== */}

            <div className="py-8 text-center">
              <p className="text-xs text-slate-400">
                SmartSchool Admin • Rekap Presensi Guru
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ================================================================
   STAT CARD
================================================================ */

function StatCard({
  icon: Icon,
  label,
  value,
  description,
  iconClass,
}) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">
            {label}
          </p>

          <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1.5">
            {value}
          </p>

          <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
            {description}
          </p>
        </div>

        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconClass}`}
        >
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   FILTER BUTTON
================================================================ */

function FilterButton({
  active,
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-10 px-3.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
        active
          ? "bg-blue-600 text-white shadow-sm"
          : "bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
      }`}
    >
      {children}
    </button>
  );
}

/* ================================================================
   STATUS BADGE
================================================================ */

function StatusBadge({ status }) {
  const config =
    STATUS_CONFIG[status] ||
    STATUS_CONFIG.hadir;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold whitespace-nowrap ${config.className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${config.dot}`}
      />

      {config.label}
    </span>
  );
}

/* ================================================================
   DETAIL CARD
================================================================ */

function GuruDetailCard({ guru }) {
  const hadirPersen =
    guru.totalHari > 0
      ? Math.round(
          ((guru.totalHari -
            guru.izin -
            guru.sakit -
            guru.alpha) /
            guru.totalHari) *
            100
        )
      : 0;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
      {/* HEADER */}

      <div className="relative bg-[#155DFC] p-5 sm:p-6 text-white overflow-hidden">
        <div className="absolute -right-10 -top-12 w-36 h-36 rounded-full bg-white/10" />

        <div className="absolute right-12 -bottom-20 w-32 h-32 rounded-full bg-white/10" />

        <div className="relative">
          <div className="flex items-center justify-between gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center font-bold">
              {getInitials(guru.nama)}
            </div>

            <StatusBadge status={guru.status} />
          </div>

          <h2 className="text-lg font-bold mt-4">
            {guru.nama}
          </h2>

          <p className="text-xs text-blue-100 mt-1">
            {guru.jabatan}
          </p>
        </div>
      </div>

      {/* BODY */}

      <div className="p-5 sm:p-6">
        <div className="space-y-4">
          <DetailRow
            label="NIP"
            value={guru.nip}
          />

          <DetailRow
            label="Jam Masuk"
            value={guru.jamMasuk}
          />

          <DetailRow
            label="Jam Pulang"
            value={guru.jamPulang}
          />

          <DetailRow
            label="Jumlah Keterlambatan"
            value={`${guru.terlambat} kali`}
          />
        </div>

        {/* SUMMARY */}

        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Ringkasan Kehadiran
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            <MiniStat
              label="Hadir"
              value={guru.totalHari - guru.izin - guru.sakit - guru.alpha}
              className="bg-emerald-50 text-emerald-700"
            />

            <MiniStat
              label="Izin"
              value={guru.izin}
              className="bg-blue-50 text-blue-700"
            />

            <MiniStat
              label="Sakit"
              value={guru.sakit}
              className="bg-violet-50 text-violet-700"
            />

            <MiniStat
              label="Alpha"
              value={guru.alpha}
              className="bg-red-50 text-red-700"
            />
          </div>
        </div>

        {/* PERSENTASE */}

        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-600">
              Persentase Kehadiran
            </p>

            <p className="text-sm font-bold text-blue-600">
              {hadirPersen}%
            </p>
          </div>

          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{
                width: `${Math.min(
                  Math.max(hadirPersen, 0),
                  100
                )}%`,
              }}
            />
          </div>
        </div>

        {/* DATE */}

        <div className="mt-5 p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500">
            <CalendarDays size={15} />
          </div>

          <div>
            <p className="text-[11px] text-slate-400">
              Tanggal Rekap
            </p>

            <p className="text-sm font-semibold text-slate-700 mt-0.5">
              {formatDate("2026-09-10")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   DETAIL ROW
================================================================ */

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="text-sm font-semibold text-slate-700 text-right">
        {value}
      </p>
    </div>
  );
}

/* ================================================================
   MINI STAT
================================================================ */

function MiniStat({
  label,
  value,
  className,
}) {
  return (
    <div
      className={`rounded-xl px-3.5 py-3 ${className}`}
    >
      <p className="text-[11px] opacity-70">
        {label}
      </p>

      <p className="text-lg font-bold mt-0.5">
        {value}
      </p>
    </div>
  );
}

/* ================================================================
   EMPTY STATE
================================================================ */

function EmptyState({ onReset }) {
  return (
    <div className="px-6 py-16 text-center">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
        <Search size={23} />
      </div>

      <h3 className="text-sm font-bold text-slate-800 mt-4">
        Data tidak ditemukan
      </h3>

      <p className="text-xs text-slate-500 mt-1">
        Tidak ada data guru yang sesuai dengan filter.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
      >
        <RefreshCw size={14} />
        Reset Filter
      </button>
    </div>
  );
}

/* ================================================================
   HELPERS
================================================================ */

function getInitials(name) {
  return name
    .replace(/,/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}