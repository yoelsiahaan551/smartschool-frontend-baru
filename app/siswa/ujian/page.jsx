"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

import {
  Calendar,
  Clock,
  Search,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  FileText,
} from "lucide-react";

// =========================================================
// DATA UJIAN
// =========================================================

const daftarUjian = [
  {
    id: "ujian-1",
    judul: "UTS Matematika Semester 1",
    mapel: "Matematika",
    guru: "Bu Sari",
    kelas: "X IPA 1",
    tanggal: "2026-08-30",
    durasi: "90 menit",
    soal: 30,
    status: "belum",
    warna: "blue",
    icon: "📐",
  },
  {
    id: "ujian-2",
    judul: "UAS Matematika Semester 1",
    mapel: "Matematika",
    guru: "Bu Sari",
    kelas: "X IPA 1",
    tanggal: "2026-09-15",
    durasi: "120 menit",
    soal: 40,
    status: "belum",
    warna: "blue",
    icon: "📐",
  },
  {
    id: "ujian-3",
    judul: "UTS Bahasa Indonesia",
    mapel: "Bahasa Indonesia",
    guru: "Pak Budi",
    kelas: "X IPA 1",
    tanggal: "2026-08-28",
    durasi: "90 menit",
    soal: 25,
    status: "belum",
    warna: "rose",
    icon: "📝",
  },
  {
    id: "ujian-4",
    judul: "UTS IPA Semester 1",
    mapel: "IPA",
    guru: "Bu Dewi",
    kelas: "X IPA 1",
    tanggal: "2026-08-25",
    durasi: "90 menit",
    soal: 30,
    status: "sedang",
    warna: "emerald",
    icon: "🔬",
  },
  {
    id: "ujian-5",
    judul: "UTS IPS Semester 1",
    mapel: "IPS",
    guru: "Pak Anwar",
    kelas: "X IPA 1",
    tanggal: "2026-08-27",
    durasi: "90 menit",
    soal: 25,
    status: "belum",
    warna: "amber",
    icon: "🌍",
  },
  {
    id: "ujian-6",
    judul: "UTS Bahasa Inggris",
    mapel: "Bahasa Inggris",
    guru: "Bu Rina",
    kelas: "X IPA 1",
    tanggal: "2026-08-29",
    durasi: "90 menit",
    soal: 30,
    status: "belum",
    warna: "indigo",
    icon: "📖",
  },
  {
    id: "ujian-7",
    judul: "UTS Penjaskes",
    mapel: "Penjaskes",
    guru: "Pak Rudi",
    kelas: "X IPA 1",
    tanggal: "2026-08-31",
    durasi: "60 menit",
    soal: 20,
    status: "selesai",
    warna: "orange",
    icon: "🏃",
  },
];

// =========================================================
// COLOR MAP
// =========================================================

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
    grad: "from-blue-500 to-blue-600",
    hover: "hover:border-blue-300",
  },

  rose: {
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-600",
    grad: "from-rose-500 to-rose-600",
    hover: "hover:border-rose-300",
  },

  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-600",
    grad: "from-emerald-500 to-emerald-600",
    hover: "hover:border-emerald-300",
  },

  amber: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-600",
    grad: "from-amber-500 to-amber-600",
    hover: "hover:border-amber-300",
  },

  indigo: {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-600",
    grad: "from-indigo-500 to-indigo-600",
    hover: "hover:border-indigo-300",
  },

  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-600",
    grad: "from-orange-500 to-orange-600",
    hover: "hover:border-orange-300",
  },
};

// =========================================================
// PAGE
// =========================================================

export default function DaftarUjianPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("semua");

  // =========================================================
  // FILTER
  // =========================================================

  const filtered = daftarUjian.filter((ujian) => {
    const keyword = search.toLowerCase().trim();

    const matchSearch =
      ujian.judul.toLowerCase().includes(keyword) ||
      ujian.mapel.toLowerCase().includes(keyword) ||
      ujian.guru.toLowerCase().includes(keyword);

    if (!matchSearch) return false;

    if (
      filterStatus !== "semua" &&
      ujian.status !== filterStatus
    ) {
      return false;
    }

    return true;
  });

  // =========================================================
  // STATISTIK
  // =========================================================

  const stats = {
    total: daftarUjian.length,

    belum: daftarUjian.filter(
      (u) => u.status === "belum"
    ).length,

    sedang: daftarUjian.filter(
      (u) => u.status === "sedang"
    ).length,

    selesai: daftarUjian.filter(
      (u) => u.status === "selesai"
    ).length,
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);

    return d.toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // CARD CLICK
  // =========================================================

  const handleCardClick = (ujianId) => {
    router.push(`/siswa/ujian/${ujianId}`);
  };

  // =========================================================
  // STATUS BADGE
  // =========================================================

  const getStatusBadge = (status) => {
    const map = {
      belum: {
        label: "Belum Dimulai",
        color:
          "bg-slate-100 text-slate-600 border-slate-200",
        icon: <Clock size={12} />,
      },

      sedang: {
        label: "Sedang Berlangsung",
        color:
          "bg-amber-100 text-amber-700 border-amber-200",
        icon: <AlertCircle size={12} />,
      },

      selesai: {
        label: "Selesai",
        color:
          "bg-emerald-100 text-emerald-700 border-emerald-200",
        icon: <CheckCircle size={12} />,
      },
    };

    return map[status] || map.belum;
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar
        role="siswa"
        active="dashboard"
        setActive={() => {}}
        collapsed={false}
        setCollapsed={() => {}}
      />

      {/* =====================================================
          AREA KONTEN
      ===================================================== */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* HEADER */}

        <div className="flex-shrink-0">
          <Header
            toggleSidebar={() => {}}
            notifications={[]}
            user={{
              name: "Andi Saputra",
              email: "siswa@smartschool.com",
              avatar: "AS",
            }}
          />
        </div>

        {/* ===================================================
            MAIN
        =================================================== */}

        <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">

          <div className="w-full min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8 xl:px-10">

            <div className="w-full min-w-0 space-y-6">

              {/* =================================================
                  HEADER HALAMAN
              ================================================= */}

              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

                <div className="min-w-0">

                  <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                    Daftar Ujian
                  </h1>

                  <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">

                    <span>
                      {stats.total} ujian terjadwal
                    </span>

                    <span className="h-1 w-1 rounded-full bg-slate-300" />

                    <span className="text-amber-600">
                      {stats.sedang} sedang berlangsung
                    </span>

                  </p>

                </div>

                {/* FILTER STATUS */}

                <div className="flex w-full flex-wrap gap-2 xl:w-auto xl:justify-end">

                  {/* SEMUA */}

                  <button
                    onClick={() =>
                      setFilterStatus("semua")
                    }
                    className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      filterStatus === "semua"
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Semua ({stats.total})
                  </button>

                  {/* BELUM */}

                  <button
                    onClick={() =>
                      setFilterStatus("belum")
                    }
                    className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      filterStatus === "belum"
                        ? "border-slate-600 bg-slate-600 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Belum ({stats.belum})
                  </button>

                  {/* SEDANG */}

                  <button
                    onClick={() =>
                      setFilterStatus("sedang")
                    }
                    className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      filterStatus === "sedang"
                        ? "border-amber-500 bg-amber-500 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Sedang ({stats.sedang})
                  </button>

                  {/* SELESAI */}

                  <button
                    onClick={() =>
                      setFilterStatus("selesai")
                    }
                    className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      filterStatus === "selesai"
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Selesai ({stats.selesai})
                  </button>

                </div>

              </div>

              {/* =================================================
                  SEARCH
              ================================================= */}

              <div className="w-full sm:max-w-xl">

                <div className="relative">

                  <Search
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    placeholder="Cari ujian, mapel, atau guru..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 shadow-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />

                </div>

              </div>

              {/* =================================================
                  CARD UJIAN
              ================================================= */}

              {filtered.length === 0 ? (

                <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center shadow-sm">

                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-300">
                    <Search size={32} />
                  </div>

                  <p className="text-sm font-medium text-slate-600">
                    Tidak ada ujian ditemukan
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Coba ubah kata pencarian atau filter
                  </p>

                </div>

              ) : (

                <div
                  className="
                    grid
                    w-full
                    min-w-0
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                    2xl:grid-cols-5
                  "
                >

                  {filtered.map((ujian) => {

                    const c =
                      colorMap[ujian.warna];

                    const statusBadge =
                      getStatusBadge(
                        ujian.status
                      );

                    const isSelesai =
                      ujian.status ===
                      "selesai";

                    return (

                      <div
                        key={ujian.id}
                        onClick={() =>
                          handleCardClick(
                            ujian.id
                          )
                        }
                        className={`
                          group
                          min-w-0
                          cursor-pointer
                          overflow-hidden
                          rounded-2xl
                          border
                          ${c.border}
                          bg-white
                          shadow-sm
                          transition-all
                          duration-300
                          ${c.hover}
                          hover:-translate-y-1
                          hover:shadow-xl
                        `}
                      >

                        {/* ===================================
                            CARD HEADER
                        =================================== */}

                        <div
                          className={`
                            relative
                            flex
                            h-28
                            items-center
                            justify-center
                            bg-gradient-to-br
                            ${c.grad}
                            sm:h-32
                          `}
                        >

                          <div className="absolute inset-0 bg-black/10" />

                          <div className="relative text-4xl drop-shadow-lg sm:text-5xl">
                            {ujian.icon}
                          </div>

                          <div className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3">

                            <span
                              className={`
                                inline-flex
                                items-center
                                gap-1
                                whitespace-nowrap
                                rounded-full
                                border
                                px-2
                                py-1
                                text-[9px]
                                font-medium
                                sm:px-2.5
                                sm:text-[10px]
                                ${statusBadge.color}
                              `}
                            >
                              {statusBadge.icon}
                              {statusBadge.label}
                            </span>

                          </div>

                        </div>

                        {/* ===================================
                            CARD BODY
                        =================================== */}

                        <div className="min-w-0 p-4">

                          <h3 className="line-clamp-2 text-sm font-bold leading-tight text-slate-800 sm:text-base">
                            {ujian.judul}
                          </h3>

                          <p className="mt-1 truncate text-sm text-slate-500">
                            {ujian.mapel} ·{" "}
                            {ujian.guru}
                          </p>

                          <p className="truncate text-xs text-slate-400">
                            {ujian.kelas}
                          </p>

                          {/* INFO */}

                          <div className="mt-3 grid grid-cols-1 gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500">

                            <span className="flex min-w-0 items-center gap-1.5">

                              <Calendar
                                size={13}
                                className="shrink-0 text-slate-400"
                              />

                              <span className="truncate">
                                {formatDate(
                                  ujian.tanggal
                                )}
                              </span>

                            </span>

                            <div className="flex items-center justify-between gap-2">

                              <span className="flex items-center gap-1.5">

                                <Clock
                                  size={13}
                                  className="shrink-0 text-slate-400"
                                />

                                {ujian.durasi}

                              </span>

                              <span className="flex items-center gap-1.5">

                                <FileText
                                  size={13}
                                  className="shrink-0 text-slate-400"
                                />

                                {ujian.soal} soal

                              </span>

                            </div>

                          </div>

                          {/* BUTTON */}

                          <button
                            onClick={(e) => {
                              e.stopPropagation();

                              handleCardClick(
                                ujian.id
                              );
                            }}
                            className={`
                              mt-3
                              flex
                              w-full
                              items-center
                              justify-center
                              gap-1.5
                              rounded-xl
                              py-2.5
                              text-sm
                              font-medium
                              transition
                              ${
                                isSelesai
                                  ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                  : ujian.status ===
                                    "sedang"
                                  ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                              }
                            `}
                          >

                            {isSelesai
                              ? "Lihat Hasil"
                              : ujian.status ===
                                "sedang"
                              ? "Lanjutkan Ujian"
                              : "Mulai Ujian"}

                            <ChevronRight
                              size={15}
                            />

                          </button>

                        </div>

                      </div>

                    );
                  })}

                </div>

              )}

              {/* =================================================
                  FOOTER
              ================================================= */}

              <footer className="border-t border-slate-100 py-4 text-center text-xs text-slate-400">
                © 2026 SmartSchool • Daftar Ujian Siswa
              </footer>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}