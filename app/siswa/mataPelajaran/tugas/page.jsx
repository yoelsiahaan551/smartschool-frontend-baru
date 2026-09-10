"use client";

import {
  Suspense,
  useState,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

import {
  ArrowLeft,
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  Paperclip,
  X,
  ChevronDown,
  ChevronUp,
  Calendar,
  User,
  Loader2,
  RefreshCw,
  FileText,
  ExternalLink,
} from "lucide-react";

// ============================================================
// API
// ============================================================

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ============================================================
// STATUS
// ============================================================

const STATUS_STYLE = {
  belum: {
    label: "Belum Dikerjakan",
    bg: "bg-amber-50",
    text: "text-amber-700",
    icon: Clock,
    border: "border-amber-200",
  },

  dikumpulkan: {
    label: "Sudah Dikumpulkan",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    icon: CheckCircle2,
    border: "border-emerald-200",
  },

  terlambat: {
    label: "Terlambat",
    bg: "bg-rose-50",
    text: "text-rose-700",
    icon: AlertCircle,
    border: "border-rose-200",
  },

  dinilai: {
    label: "Sudah Dinilai",
    bg: "bg-blue-50",
    text: "text-blue-700",
    icon: CheckCircle2,
    border: "border-blue-200",
  },
};

// ============================================================
// MAIN PAGE
// ============================================================

export default function TugasPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2 size={18} className="animate-spin" />
            Memuat...
          </div>
        </div>
      }
    >
      <TugasPageInner />
    </Suspense>
  );
}

// ============================================================
// PAGE INNER
// ============================================================

function TugasPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /*
   * PENTING:
   *
   * Sekarang parameter yang digunakan adalah:
   *
   * /siswa/tugas?kelasMapelId=UUID
   *
   * Bukan:
   *
   * /siswa/tugas?mapel=matematika
   */

  const kelasMapelId =
    searchParams.get("kelasMapelId");

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const [tugasList, setTugasList] =
    useState([]);

  const [kelasMapel, setKelasMapel] =
    useState(null);

  const [activeFilter, setActiveFilter] =
    useState("semua");

  const [expandedId, setExpandedId] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const notifications = [
    {
      id: 1,
      title: "Tugas",
      desc: "Periksa tugas terbaru kamu",
      read: false,
    },
  ];

  // ==========================================================
  // TOKEN
  // ==========================================================

  const getToken = () => {
    if (typeof window === "undefined") {
      return null;
    }

    return (
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken")
    );
  };

  // ==========================================================
  // HEADER AUTH
  // ==========================================================

  const getHeaders = () => {
    const token = getToken();

    return {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    };
  };

  // ==========================================================
  // GET DETAIL TUGAS
  // ==========================================================

  const getDetailTugas = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/tugas/${id}`,
        {
          method: "GET",
          headers: getHeaders(),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        return null;
      }

      return result?.data || null;
    } catch (error) {
      console.error(
        "GET DETAIL TUGAS ERROR:",
        error
      );

      return null;
    }
  };

  // ==========================================================
  // GET TUGAS
  // ==========================================================

  const fetchTugas = async () => {
    if (!kelasMapelId) {
      setLoading(false);
      setError(
        "kelasMapelId tidak ditemukan. Buka halaman tugas melalui mata pelajaran yang dipilih."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      // ------------------------------------------------------
      // 1. Ambil daftar tugas berdasarkan kelasMapelId
      // ------------------------------------------------------

      const response = await fetch(
        `${API_URL}/api/v1/tugas/kelas-mapel/${kelasMapelId}`,
        {
          method: "GET",
          headers: getHeaders(),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Gagal mengambil daftar tugas."
        );
      }

      const tugasDasar =
        result?.data || [];

      // ------------------------------------------------------
      // 2. Ambil detail masing-masing tugas
      //
      // Detail diperlukan supaya kita mendapatkan:
      //
      // kelasMapel
      // mataPelajaran
      // kelas
      // pengumpulanTugasSiswa
      // ------------------------------------------------------

      const tugasDenganDetail =
        await Promise.all(
          tugasDasar.map(async (tugas) => {
            const detail =
              await getDetailTugas(
                tugas.id
              );

            return detail || tugas;
          })
        );

      setTugasList(
        tugasDenganDetail
      );

      // ------------------------------------------------------
      // 3. Ambil informasi kelas mapel
      // ------------------------------------------------------

      if (
        tugasDenganDetail.length > 0 &&
        tugasDenganDetail[0]?.kelasMapel
      ) {
        setKelasMapel(
          tugasDenganDetail[0]
            .kelasMapel
        );
      }
    } catch (error) {
      console.error(
        "FETCH TUGAS ERROR:",
        error
      );

      setError(
        error?.message ||
          "Terjadi kesalahan saat mengambil tugas."
      );

      setTugasList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTugas();
  }, [kelasMapelId]);

  // ==========================================================
  // NORMALISASI TUGAS
  // ==========================================================

  const normalizedTugas = useMemo(() => {
    return tugasList.map((tugas) => {
      const pengumpulan =
        tugas?.pengumpulanTugasSiswa?.[0] ||
        null;

      let status = pengumpulan?.status;

      // Kalau belum ada pengumpulan
      if (!status) {
        if (
          tugas?.batasWaktu &&
          new Date() >
            new Date(tugas.batasWaktu)
        ) {
          status = "terlambat";
        } else {
          status = "belum";
        }
      }

      const mataPelajaran =
        tugas?.kelasMapel
          ?.mataPelajaran;

      const guru =
        tugas?.kelasMapel
          ?.guruPengajar;

      return {
        ...tugas,

        status,

        mapelId:
          mataPelajaran?.id || null,

        mapelNama:
          mataPelajaran?.nama ||
          mataPelajaran?.namaMataPelajaran ||
          "Mata Pelajaran",

        guruNama:
          guru?.namaLengkap ||
          "Guru",

        fileTerkumpul:
          pengumpulan?.urlFile ||
          null,

        keterangan:
          pengumpulan?.keterangan ||
          "",

        nilai:
          pengumpulan?.nilai ??
          null,

        pengumpulanId:
          pengumpulan?.id ||
          null,
      };
    });
  }, [tugasList]);

  // ==========================================================
  // FILTER
  // ==========================================================

  const filteredTugas = useMemo(() => {
    if (activeFilter === "semua") {
      return normalizedTugas;
    }

    return normalizedTugas.filter(
      (tugas) =>
        tugas.status === activeFilter
    );
  }, [
    normalizedTugas,
    activeFilter,
  ]);

  // ==========================================================
  // STATISTIK
  // ==========================================================

  const jumlahBelum =
    normalizedTugas.filter(
      (tugas) =>
        tugas.status === "belum" ||
        tugas.status === "terlambat"
    ).length;

  const jumlahDikumpulkan =
    normalizedTugas.filter(
      (tugas) =>
        tugas.status === "dikumpulkan" ||
        tugas.status === "dinilai"
    ).length;

  // ==========================================================
  // FORMAT TANGGAL
  // ==========================================================

  const formatTanggal = (tanggal) => {
    if (!tanggal) {
      return "-";
    }

    try {
      return new Intl.DateTimeFormat(
        "id-ID",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      ).format(new Date(tanggal));
    } catch {
      return tanggal;
    }
  };

  // ==========================================================
  // JUDUL MAPEL
  // ==========================================================

  const namaMapel =
    kelasMapel
      ?.mataPelajaran?.nama ||
    kelasMapel
      ?.mataPelajaran
      ?.namaMataPelajaran ||
    "Semua Mata Pelajaran";

  const namaKelas =
    kelasMapel?.kelas?.nama ||
    kelasMapel?.kelas?.namaKelas ||
    "";

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">

      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar
        role="siswa"
        active="mataPelajaran"
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={() =>
          setSidebarOpen(
            !sidebarOpen
          )
        }
      />

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="flex-1 flex flex-col min-w-0">

        <Header
          toggleSidebar={() =>
            setSidebarOpen(
              !sidebarOpen
            )
          }
          notifications={notifications}
          user={{
            name: "Andi Saputra",
            email:
              "siswa@smartschool.com",
            avatar: "AS",
          }}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">

          <div className="w-full max-w-7xl mx-auto space-y-7">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="flex items-center gap-4">

              <button
                onClick={() =>
                  router.push(
                    "/siswa/mataPelajaran"
                  )
                }
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 transition-colors flex-shrink-0"
              >
                <ArrowLeft
                  size={18}
                />
              </button>

              <div className="min-w-0">

                <div className="flex items-center gap-2 flex-wrap">

                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    {namaMapel}
                  </p>

                  {namaKelas && (
                    <>
                      <span className="text-slate-300">
                        /
                      </span>

                      <p className="text-xs text-slate-400 font-medium">
                        {namaKelas}
                      </p>
                    </>
                  )}

                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5 tracking-tight">
                  Tugas
                </h1>

                <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">

                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />

                  {loading
                    ? "Memuat tugas..."
                    : jumlahBelum > 0
                    ? `${jumlahBelum} tugas menunggu untuk dikerjakan`
                    : "Semua tugas sudah dikumpulkan"}

                </p>

              </div>

              {/* REFRESH */}

              <button
                onClick={fetchTugas}
                disabled={loading}
                className="ml-auto p-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 transition-colors"
                title="Refresh tugas"
              >
                <RefreshCw
                  size={17}
                  className={
                    loading
                      ? "animate-spin"
                      : ""
                  }
                />
              </button>

            </div>

            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">

                <div className="flex items-start gap-3">

                  <AlertCircle
                    size={18}
                    className="text-rose-600 flex-shrink-0 mt-0.5"
                  />

                  <div className="min-w-0">

                    <p className="text-sm font-semibold text-rose-700">
                      Gagal memuat tugas
                    </p>

                    <p className="text-xs text-rose-600 mt-1">
                      {error}
                    </p>

                  </div>

                </div>

              </div>
            )}

            {/* ==================================================
                SUMMARY
            ================================================== */}

            {!loading &&
              !error &&
              normalizedTugas.length >
                0 && (
                <div className="grid grid-cols-2 gap-3 max-w-md">

                  <div className="bg-white border border-slate-200 rounded-xl p-4">

                    <p className="text-xs text-slate-400">
                      Menunggu
                    </p>

                    <p className="text-xl font-bold text-slate-900 mt-1">
                      {jumlahBelum}
                    </p>

                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-4">

                    <p className="text-xs text-slate-400">
                      Dikumpulkan
                    </p>

                    <p className="text-xl font-bold text-slate-900 mt-1">
                      {jumlahDikumpulkan}
                    </p>

                  </div>

                </div>
              )}

            {/* ==================================================
                FILTER STATUS
            ================================================== */}

            <div className="flex flex-wrap gap-2">

              {[
                "semua",
                "belum",
                "dikumpulkan",
                "terlambat",
                "dinilai",
              ].map((filter) => {

                const label =
                  filter === "semua"
                    ? "Semua Status"
                    : STATUS_STYLE[
                        filter
                      ]?.label ||
                      filter;

                return (
                  <button
                    key={filter}
                    onClick={() =>
                      setActiveFilter(
                        filter
                      )
                    }
                    className={`text-xs font-medium px-4 py-2 rounded-lg transition-all ${
                      activeFilter ===
                      filter
                        ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}

            </div>

            {/* ==================================================
                LOADING
            ================================================== */}

            {loading ? (
              <div className="space-y-4">

                {[1, 2, 3].map(
                  (item) => (
                    <div
                      key={item}
                      className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse"
                    >
                      <div className="flex gap-4">

                        <div className="w-11 h-11 rounded-xl bg-slate-100 flex-shrink-0" />

                        <div className="flex-1 space-y-3">

                          <div className="w-28 h-4 bg-slate-100 rounded" />

                          <div className="w-2/3 h-4 bg-slate-100 rounded" />

                          <div className="w-1/2 h-3 bg-slate-100 rounded" />

                        </div>

                      </div>
                    </div>
                  )
                )}

              </div>
            ) : filteredTugas.length >
              0 ? (

              /* ==================================================
                 LIST
              ================================================== */

              <div className="space-y-4">

                {filteredTugas.map(
                  (tugas) => {

                    const style =
                      STATUS_STYLE[
                        tugas.status
                      ] ||
                      STATUS_STYLE.belum;

                    const StatusIcon =
                      style.icon;

                    const isOpen =
                      expandedId ===
                      tugas.id;

                    return (
                      <div
                        key={tugas.id}
                        className="bg-white rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                      >

                        {/* ==================================================
                            MAIN ROW
                        ================================================== */}

                        <button
                          type="button"
                          onClick={() =>
                            setExpandedId(
                              isOpen
                                ? null
                                : tugas.id
                            )
                          }
                          className="w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-slate-50/60 transition-colors"
                        >

                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${style.bg} ${style.text}`}
                          >
                            <ClipboardList
                              size={19}
                            />
                          </div>

                          <div className="min-w-0 flex-1">

                            <div className="flex items-center gap-2 flex-wrap">

                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${style.bg} ${style.text} ${style.border} inline-flex items-center gap-1`}
                              >
                                <StatusIcon
                                  size={10}
                                />

                                {
                                  style.label
                                }
                              </span>

                              <span className="text-[11px] font-medium text-slate-400">
                                {
                                  tugas.mapelNama
                                }
                              </span>

                            </div>

                            <p className="text-sm font-semibold text-slate-800 mt-1.5 truncate">
                              {
                                tugas.judul
                              }
                            </p>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-1">

                              <span className="flex items-center gap-1">
                                <User
                                  size={12}
                                />

                                {
                                  tugas.guruNama
                                }
                              </span>

                              <span className="flex items-center gap-1">
                                <Calendar
                                  size={12}
                                />

                                Deadline{" "}
                                {formatTanggal(
                                  tugas.batasWaktu
                                )}
                              </span>

                            </div>

                          </div>

                          <div className="flex-shrink-0 mt-1 text-slate-400">

                            {isOpen ? (
                              <ChevronUp
                                size={18}
                              />
                            ) : (
                              <ChevronDown
                                size={18}
                              />
                            )}

                          </div>

                        </button>

                        {/* ==================================================
                            DETAIL
                        ================================================== */}

                        {isOpen && (
                          <div className="px-5 pb-5 pt-4 border-t border-slate-100">

                            <div className="space-y-4">

                              {/* DESKRIPSI */}

                              <div>

                                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                                  Deskripsi Tugas
                                </p>

                                <p className="text-sm text-slate-600 leading-relaxed">
                                  {tugas.deskripsi ||
                                    "Tidak ada deskripsi tugas."}
                                </p>

                              </div>

                              {/* INFO */}

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                                <div className="bg-slate-50 rounded-xl p-3">

                                  <div className="flex items-center gap-2 text-slate-400">
                                    <User
                                      size={14}
                                    />

                                    <span className="text-xs">
                                      Guru
                                    </span>
                                  </div>

                                  <p className="text-sm font-medium text-slate-700 mt-1">
                                    {
                                      tugas.guruNama
                                    }
                                  </p>

                                </div>

                                <div className="bg-slate-50 rounded-xl p-3">

                                  <div className="flex items-center gap-2 text-slate-400">
                                    <Calendar
                                      size={14}
                                    />

                                    <span className="text-xs">
                                      Deadline
                                    </span>
                                  </div>

                                  <p className="text-sm font-medium text-slate-700 mt-1">
                                    {formatTanggal(
                                      tugas.batasWaktu
                                    )}
                                  </p>

                                </div>

                              </div>

                              {/* NILAI */}

                              {tugas.nilai !==
                                null &&
                                tugas.nilai !==
                                  undefined && (
                                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">

                                    <p className="text-xs font-medium text-blue-600">
                                      Nilai Tugas
                                    </p>

                                    <p className="text-2xl font-bold text-blue-700 mt-1">
                                      {
                                        tugas.nilai
                                      }
                                    </p>

                                  </div>
                                )}

                              {/* SUBMIT */}

                              <TugasSubmitArea
                                tugas={tugas}
                                token={getToken()}
                                onSubmitted={
                                  fetchTugas
                                }
                              />

                            </div>

                          </div>
                        )}

                      </div>
                    );
                  }
                )}

              </div>

            ) : (

              /* ==================================================
                 EMPTY
              ================================================== */

              <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm text-center py-16 px-5">

                <div className="w-14 h-14 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center mx-auto mb-4">
                  <ClipboardList
                    size={24}
                  />
                </div>

                <p className="text-sm font-medium text-slate-600">
                  Tidak ada tugas
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Belum ada tugas yang
                  cocok dengan filter ini.
                </p>

              </div>

            )}

          </div>

        </main>
      </div>
    </div>
  );
}

// ============================================================
// SUBMIT TUGAS
// ============================================================

function TugasSubmitArea({
  tugas,
  token,
  onSubmitted,
}) {
  const existingSubmission =
    tugas?.pengumpulanTugasSiswa?.[0] ||
    null;

  const [file, setFile] =
    useState(null);

  const [catatan, setCatatan] =
    useState(
      existingSubmission?.keterangan ||
        ""
    );

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const inputRef = useRef(null);

  const hasSubmitted =
    !!existingSubmission;

  const existingFile =
    existingSubmission?.urlFile ||
    null;

  const fileName =
    file?.name ||
    existingFile
      ?.split("/")
      ?.pop() ||
    null;

  // ==========================================================
  // PILIH FILE
  // ==========================================================

  const handleFileChange = (event) => {
    const selected =
      event.target.files?.[0];

    if (!selected) {
      return;
    }

    setError("");

    // Maksimal 10 MB
    if (
      selected.size >
      10 * 1024 * 1024
    ) {
      setError(
        "Ukuran file maksimal 10MB."
      );

      event.target.value = "";
      return;
    }

    setFile(selected);
  };

  // ==========================================================
  // HAPUS FILE
  // ==========================================================

  const handleRemoveFile = () => {
    setFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError("");

      if (!file) {
        throw new Error(
          "Silakan pilih file jawaban terlebih dahulu."
        );
      }

      /*
       * ======================================================
       * CATATAN PENTING
       * ======================================================
       *
       * Backend kamu sekarang:
       *
       * POST /api/v1/tugas/:id/submit
       *
       * hanya menerima:
       *
       * {
       *   urlFile: "...",
       *   keterangan: "..."
       * }
       *
       * Jadi file belum bisa langsung dikirim ke endpoint ini.
       *
       * Kita membutuhkan endpoint upload terlebih dahulu.
       */

      throw new Error(
        "Endpoint upload file belum tersedia di backend. Endpoint submit tugas membutuhkan urlFile."
      );

      /*
       * NANTI SETELAH ENDPOINT UPLOAD ADA:
       *
       * 1. upload file
       * 2. dapatkan urlFile
       * 3. POST submit tugas
       */

    } catch (error) {
      console.error(
        "SUBMIT TUGAS ERROR:",
        error
      );

      setError(
        error?.message ||
          "Gagal mengumpulkan tugas."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================================
  // SUDAH DIKUMPULKAN
  // ==========================================================

  if (hasSubmitted) {
    return (
      <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">

        <div className="flex items-start gap-3">

          <CheckCircle2
            size={18}
            className="text-emerald-600 flex-shrink-0 mt-0.5"
          />

          <div className="min-w-0 flex-1">

            <p className="text-sm font-semibold text-emerald-700">
              Tugas sudah dikumpulkan
            </p>

            {fileName && (
              <div className="flex items-center gap-2 mt-2">

                <FileText
                  size={14}
                  className="text-emerald-600"
                />

                <span className="text-xs text-emerald-600 truncate">
                  {fileName}
                </span>

              </div>
            )}

            {existingSubmission?.keterangan && (
              <p className="text-xs text-emerald-600 mt-2">
                Catatan:{" "}
                {
                  existingSubmission.keterangan
                }
              </p>
            )}

            {existingFile && (
              <a
                href={
                  existingFile.startsWith(
                    "http"
                  )
                    ? existingFile
                    : `${API_URL}${existingFile}`
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 mt-3"
              >
                Lihat file
                <ExternalLink
                  size={12}
                />
              </a>
            )}

            {existingSubmission?.status && (
              <div className="mt-3">

                <span className="inline-flex text-[10px] font-semibold px-2 py-1 rounded-md bg-white text-emerald-700 border border-emerald-200">
                  {
                    existingSubmission.status
                  }
                </span>

              </div>
            )}

          </div>

        </div>

      </div>
    );
  }

  // ==========================================================
  // FORM SUBMIT
  // ==========================================================

  return (
    <div className="space-y-3">

      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3">

          <div className="flex items-start gap-2">

            <AlertCircle
              size={16}
              className="text-rose-600 flex-shrink-0 mt-0.5"
            />

            <p className="text-xs text-rose-700">
              {error}
            </p>

          </div>

        </div>
      )}

      {/* UPLOAD */}

      <div className="border-2 border-dashed border-blue-200 rounded-xl p-4 bg-blue-50/30 hover:bg-blue-50/50 transition-colors">

        {fileName ? (
          <div className="flex items-center justify-between gap-2 bg-white rounded-lg px-3 py-2.5 shadow-sm">

            <div className="flex items-center gap-2 min-w-0">

              <Paperclip
                size={15}
                className="text-blue-500 flex-shrink-0"
              />

              <span className="text-sm text-slate-700 truncate">
                {fileName}
              </span>

            </div>

            <button
              type="button"
              onClick={
                handleRemoveFile
              }
              className="text-slate-400 hover:text-slate-600 flex-shrink-0"
            >
              <X size={15} />
            </button>

          </div>
        ) : (
          <button
            type="button"
            onClick={() =>
              inputRef.current?.click()
            }
            className="w-full flex flex-col items-center gap-2 py-4 text-slate-400 hover:text-blue-600 transition-colors"
          >

            <UploadCloud
              size={24}
            />

            <span className="text-sm font-medium">
              Klik untuk unggah file jawaban
            </span>

            <span className="text-[11px] text-slate-300">
              PDF, gambar, atau dokumen,
              maks 10MB
            </span>

          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          onChange={
            handleFileChange
          }
          className="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />

      </div>

      {/* CATATAN */}

      <textarea
        value={catatan}
        onChange={(event) =>
          setCatatan(
            event.target.value
          )
        }
        placeholder="Catatan tambahan (opsional)..."
        rows={2}
        className="w-full text-sm border border-slate-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
      />

      {/* SUBMIT */}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={
          !file ||
          submitting
        }
        className="w-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl py-2.5 transition-colors shadow-sm flex items-center justify-center gap-2"
      >

        {submitting ? (
          <>
            <Loader2
              size={16}
              className="animate-spin"
            />

            Mengumpulkan...
          </>
        ) : (
          "Kumpulkan Tugas"
        )}

      </button>

    </div>
  );
}