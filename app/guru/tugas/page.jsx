"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

import {
  ClipboardList,
  Search,
  ChevronDown,
  Plus,
  Sparkles,
  FileText,
  ListChecks,
  Send,
  Clock,
  CalendarDays,
  Eye,
  Pencil,
  Users,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import { getTugasGuru } from "../../../services/tugas.service";

// ======================================================
// CONSTANT
// ======================================================

const STATUS_OPTIONS = [
  "Semua Status",
  "Terkirim",
  "Berakhir",
];

// ======================================================
// HELPERS
// ======================================================

function formatTanggal(date) {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return parsedDate.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getKelasNama(tugas) {
  return (
    tugas?.kelas?.nama ??
    tugas?.kelas?.namaKelas ??
    tugas?.kelasNama ??
    "-"
  );
}

function getMapelNama(tugas) {
  return (
    tugas?.mataPelajaran?.nama ??
    tugas?.mataPelajaran?.namaMapel ??
    tugas?.mataPelajaran?.nama_mata_pelajaran ??
    tugas?.mapelNama ??
    "-"
  );
}

function getJumlahPengumpulan(tugas) {
  return Number(
    tugas?._count?.pengumpulanTugasSiswa ??
      tugas?.jumlahPengumpulan ??
      0
  );
}

function getTotalSiswa(tugas) {
  return Number(
    tugas?.kelas?._count?.anggota ??
      tugas?.kelas?.jumlahSiswa ??
      tugas?.kelas?.jumlah_siswa ??
      0
  );
}

function getStatusTugas(tugas) {
  if (!tugas?.batasWaktu) {
    return "Terkirim";
  }

  const deadline = new Date(tugas.batasWaktu);

  if (Number.isNaN(deadline.getTime())) {
    return "Terkirim";
  }

  const sekarang = new Date();

  if (sekarang > deadline) {
    return "Berakhir";
  }

  return "Terkirim";
}

// ======================================================
// BADGE
// ======================================================

const statusBadgeStyle = {
  Terkirim:
    "bg-blue-50 text-blue-600 border-blue-200",

  Berakhir:
    "bg-rose-50 text-rose-600 border-rose-200",
};

const statusIcon = {
  Terkirim: Send,
  Berakhir: Clock,
};

// ======================================================
// MAIN
// ======================================================

export default function GuruTugasPage() {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [tugasList, setTugasList] = useState([]);

  const [status, setStatus] =
    useState("Semua Status");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ====================================================
  // NOTIFICATION
  // ====================================================

  const notifications = [
    {
      id: 1,
      title: "Rapat Wali Kelas",
      desc: "Dikirim 2 jam lalu",
      read: false,
    },
    {
      id: 2,
      title: "Batas Input Nilai Rapor",
      desc: "Dikirim 5 jam lalu",
      read: false,
    },
  ];

  // ====================================================
  // LOAD DATA
  // ====================================================

  const loadTugas = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTugasGuru();

      console.log("DATA TUGAS GURU:", data);

      setTugasList(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (err) {
      console.error(
        "Gagal mengambil tugas:",
        err
      );

      setError(
        err?.message ||
          "Gagal mengambil data tugas"
      );

      setTugasList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTugas();
  }, []);

  // ====================================================
  // NORMALIZED DATA
  // ====================================================

  const tugasNormalized = useMemo(() => {
    return tugasList.map((tugas) => {
      const statusTugas =
        getStatusTugas(tugas);

      return {
        ...tugas,

        kelasDisplay:
          getKelasNama(tugas),

        mapelDisplay:
          getMapelNama(tugas),

        statusDisplay:
          statusTugas,

        jumlahPengumpulan:
          getJumlahPengumpulan(tugas),

        totalSiswa:
          getTotalSiswa(tugas),

        deadlineDisplay:
          formatTanggal(
            tugas.batasWaktu
          ),
      };
    });
  }, [tugasList]);

  // ====================================================
  // FILTER
  // ====================================================

  const kelasOptions = useMemo(() => {
    const kelas = tugasNormalized
      .map(
        (item) =>
          item.kelasDisplay
      )
      .filter(
        (item) =>
          item &&
          item !== "-"
      );

    return [
      "Semua Kelas",
      ...Array.from(
        new Set(kelas)
      ),
    ];
  }, [tugasNormalized]);

  const [kelas, setKelas] =
    useState("Semua Kelas");

  const filteredTugas = useMemo(() => {
    return tugasNormalized.filter(
      (tugas) => {
        const matchKelas =
          kelas === "Semua Kelas" ||
          tugas.kelasDisplay ===
            kelas;

        const matchStatus =
          status === "Semua Status" ||
          tugas.statusDisplay ===
            status;

        const searchLower =
          search
            .trim()
            .toLowerCase();

        const matchSearch =
          !searchLower ||
          tugas.judul
            ?.toLowerCase()
            .includes(searchLower) ||
          tugas.kelasDisplay
            ?.toLowerCase()
            .includes(searchLower) ||
          tugas.mapelDisplay
            ?.toLowerCase()
            .includes(searchLower);

        return (
          matchKelas &&
          matchStatus &&
          matchSearch
        );
      }
    );
  }, [
    tugasNormalized,
    kelas,
    status,
    search,
  ]);

  // ====================================================
  // SUMMARY
  // ====================================================

  const summary = useMemo(() => {
    const total =
      tugasNormalized.length;

    const aktif =
      tugasNormalized.filter(
        (tugas) =>
          tugas.statusDisplay ===
          "Terkirim"
      ).length;

    const berakhir =
      tugasNormalized.filter(
        (tugas) =>
          tugas.statusDisplay ===
          "Berakhir"
      ).length;

    const perluDinilai =
      tugasNormalized.reduce(
        (total, tugas) =>
          total +
          tugas.jumlahPengumpulan,
        0
      );

    return {
      total,
      aktif,
      berakhir,
      perluDinilai,
    };
  }, [tugasNormalized]);

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">

      {/* SIDEBAR */}
      <Sidebar
        active="tugas"
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={() =>
          setSidebarOpen(
            !sidebarOpen
          )
        }
      />

      {/* CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* HEADER */}
        <Header
          toggleSidebar={() =>
            setSidebarOpen(
              !sidebarOpen
            )
          }
          notifications={
            notifications
          }
          user={{
            name: "Guru",
            email:
              "guru@smartschool.com",
            avatar: "GU",
          }}
        />

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">

          <div className="w-full space-y-6">

            {/* ==================================================
                PAGE HEADER
            ================================================== */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div className="min-w-0">

                <div className="flex items-center gap-2.5">

                  <div className="p-2 rounded-lg bg-blue-600 text-white shadow-sm flex-shrink-0">

                    <ClipboardList
                      size={18}
                    />

                  </div>

                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 truncate">
                    Tugas
                  </h1>

                </div>

                <p className="text-sm text-slate-500 mt-1 ml-[42px] flex items-center gap-1.5">

                  <Sparkles
                    size={14}
                    className="text-slate-400 flex-shrink-0"
                  />

                  <span className="truncate">
                    Buat, kirim, dan pantau pengumpulan tugas siswa.
                  </span>

                </p>

              </div>

              <button
                onClick={() =>
                  router.push(
                    "/guru/tugas/tambah"
                  )
                }
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-sm whitespace-nowrap flex-shrink-0"
              >

                <Plus size={16} />

                Buat Tugas

              </button>

            </div>

            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl p-4 flex items-center justify-between gap-3">

                <div className="flex items-center gap-2 min-w-0">

                  <AlertCircle
                    size={18}
                    className="flex-shrink-0"
                  />

                  <p className="text-sm">
                    {error}
                  </p>

                </div>

                <button
                  onClick={loadTugas}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-white border border-rose-200 rounded-lg hover:bg-rose-100"
                >

                  <RefreshCw
                    size={13}
                  />

                  Coba Lagi

                </button>

              </div>
            )}

            {/* ==================================================
                SUMMARY
            ================================================== */}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

              {/* TOTAL */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">

                <div className="p-2 rounded-lg border bg-blue-50 text-blue-600 border-blue-200 flex-shrink-0">

                  <ListChecks
                    size={16}
                  />

                </div>

                <div className="min-w-0">

                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">
                    Total Tugas
                  </p>

                  <p className="text-lg font-bold text-slate-800">
                    {loading
                      ? "-"
                      : summary.total}
                  </p>

                </div>

              </div>

              {/* AKTIF */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">

                <div className="p-2 rounded-lg border bg-emerald-50 text-emerald-600 border-emerald-200 flex-shrink-0">

                  <Send
                    size={16}
                  />

                </div>

                <div className="min-w-0">

                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">
                    Sedang Berjalan
                  </p>

                  <p className="text-lg font-bold text-slate-800">
                    {loading
                      ? "-"
                      : summary.aktif}
                  </p>

                </div>

              </div>

              {/* BERAKHIR */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">

                <div className="p-2 rounded-lg border bg-rose-50 text-rose-500 border-rose-200 flex-shrink-0">

                  <Clock
                    size={16}
                  />

                </div>

                <div className="min-w-0">

                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">
                    Berakhir
                  </p>

                  <p className="text-lg font-bold text-slate-800">
                    {loading
                      ? "-"
                      : summary.berakhir}
                  </p>

                </div>

              </div>

              {/* PERLU DINILAI */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">

                <div className="p-2 rounded-lg border bg-amber-50 text-amber-600 border-amber-200 flex-shrink-0">

                  <AlertCircle
                    size={16}
                  />

                </div>

                <div className="min-w-0">

                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">
                    Perlu Dinilai
                  </p>

                  <p className="text-lg font-bold text-slate-800">
                    {loading
                      ? "-"
                      : summary.perluDinilai}
                  </p>

                </div>

              </div>

            </div>

            {/* ==================================================
                FILTER
            ================================================== */}

            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">

              <div className="flex flex-col lg:flex-row gap-3">

                {/* KELAS */}
                <div className="relative w-full lg:w-48">

                  <select
                    value={kelas}
                    onChange={(e) =>
                      setKelas(
                        e.target.value
                      )
                    }
                    className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors cursor-pointer"
                  >

                    {kelasOptions.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}

                  </select>

                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />

                </div>

                {/* STATUS */}
                <div className="relative w-full lg:w-48">

                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(
                        e.target.value
                      )
                    }
                    className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors cursor-pointer"
                  >

                    {STATUS_OPTIONS.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}

                  </select>

                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />

                </div>

                {/* SEARCH */}
                <div className="relative flex-1 min-w-0">

                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                    placeholder="Cari judul tugas, kelas, atau mapel..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors"
                  />

                </div>

              </div>

            </div>

            {/* ==================================================
                LOADING
            ================================================== */}

            {loading && (
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-12 text-center">

                <RefreshCw
                  size={28}
                  className="mx-auto text-blue-500 animate-spin mb-3"
                />

                <p className="text-sm text-slate-500">
                  Mengambil data tugas...
                </p>

              </div>
            )}

            {/* ==================================================
                EMPTY
            ================================================== */}

            {!loading &&
              !error &&
              filteredTugas.length ===
                0 && (
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-12 text-center">

                  <ClipboardList
                    size={32}
                    className="mx-auto text-slate-300 mb-3"
                  />

                  <p className="text-sm font-medium text-slate-600">
                    Belum ada tugas
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Tugas yang dibuat untuk kelas yang kamu ampu akan muncul di sini.
                  </p>

                  <button
                    onClick={() =>
                      router.push(
                        "/guru/tugas/tambah"
                      )
                    }
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  >

                    <Plus size={15} />

                    Buat Tugas

                  </button>

                </div>
              )}

            {/* ==================================================
                GRID
            ================================================== */}

            {!loading &&
              filteredTugas.length >
                0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

                  {filteredTugas.map(
                    (tugas) => {

                      const StatusIcon =
                        statusIcon[
                          tugas.statusDisplay
                        ] || Clock;

                      const totalSiswa =
                        tugas.totalSiswa;

                      const sudahMengumpulkan =
                        tugas.jumlahPengumpulan;

                      const progress =
                        totalSiswa > 0
                          ? Math.min(
                              100,
                              Math.round(
                                (sudahMengumpulkan /
                                  totalSiswa) *
                                  100
                              )
                            )
                          : 0;

                      return (
                        <div
                          key={tugas.id}
                          className="bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 p-4 sm:p-5 flex flex-col min-w-0"
                        >

                          {/* TOP */}
                          <div className="flex items-start justify-between gap-2">

                            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">

                              <ClipboardList
                                size={18}
                              />

                            </div>

                            <span
                              className={`text-[11px] font-medium px-2 py-1 rounded-full border flex items-center gap-1 ${
                                statusBadgeStyle[
                                  tugas.statusDisplay
                                ]
                              }`}
                            >

                              <StatusIcon
                                size={11}
                              />

                              {
                                tugas.statusDisplay
                              }

                            </span>

                          </div>

                          {/* TITLE */}
                          <h3 className="mt-3 text-sm font-semibold text-slate-800 leading-snug line-clamp-2">

                            {tugas.judul ||
                              "Tanpa judul"}

                          </h3>

                          {/* MAPEL */}
                          <p className="text-xs font-medium text-blue-600 mt-1">

                            {tugas.mapelDisplay}

                          </p>

                          {/* KELAS */}
                          <div className="mt-2">

                            <span className="inline-flex items-center px-2 py-1 text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200 rounded-md">

                              {tugas.kelasDisplay}

                            </span>

                          </div>

                          {/* DESKRIPSI */}
                          <p className="text-sm text-slate-500 mt-3 leading-relaxed line-clamp-3 flex-1">

                            {tugas.deskripsi ||
                              "Tidak ada deskripsi tugas."}

                          </p>

                          {/* DEADLINE */}
                          <div className="flex items-center gap-1.5 mt-4 text-xs text-slate-400">

                            <CalendarDays
                              size={12}
                            />

                            <span>
                              Deadline:{" "}
                              {
                                tugas.deadlineDisplay
                              }
                            </span>

                          </div>

                          {/* PENGUMPULAN */}
                          <div className="mt-3">

                            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">

                              <span className="flex items-center gap-1">

                                <Users
                                  size={11}
                                />

                                Pengumpulan

                              </span>

                              <span className="font-medium text-slate-600">

                                {
                                  sudahMengumpulkan
                                }

                                {totalSiswa >
                                  0
                                  ? `/${totalSiswa}`
                                  : ""}{" "}
                                siswa

                              </span>

                            </div>

                            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">

                              <div
                                className={`h-full rounded-full ${
                                  tugas.statusDisplay ===
                                  "Berakhir"
                                    ? "bg-rose-400"
                                    : "bg-blue-500"
                                }`}
                                style={{
                                  width: `${progress}%`,
                                }}
                              />

                            </div>

                          </div>

                          {/* ACTION */}
                          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">

                            <button
                              onClick={() =>
                                router.push(
                                  `/guru/tugas/${tugas.id}`
                                )
                              }
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                            >

                              <Eye
                                size={13}
                              />

                              Lihat

                            </button>

                            <button
                              onClick={() =>
                                router.push(
                                  `/guru/tugas/${tugas.id}/edit`
                                )
                              }
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                            >

                              <Pencil
                                size={13}
                              />

                              Edit

                            </button>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>
              )}

          </div>

        </main>

      </div>

    </div>
  );
}