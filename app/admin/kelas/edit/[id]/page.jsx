"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import Header from "../../../../components/Header";
import Sidebar from "../../../../components/Sidebar";

import {
  GraduationCap,
  Save,
  X,
  School,
  Users,
  CalendarDays,
  CheckCircle,
  ChevronDown,
  ArrowLeft,
  Edit3,
  Loader2,
  Info,
  AlertCircle,
} from "lucide-react";

import {
  getKelasById,
  updateKelas,
} from "../../../../../services/kelas.service";

import {
  getTahunAjaran,
} from "../../../../../services/tahunAjaran.service";

// =========================================================
// OPTIONS
// =========================================================

const TINGKAT_OPTIONS = [
  {
    value: 10,
    label: "X (Sepuluh)",
  },
  {
    value: 11,
    label: "XI (Sebelas)",
  },
  {
    value: 12,
    label: "XII (Dua Belas)",
  },
];

// =========================================================
// MAIN
// =========================================================

export default function AdminKelasEditPage() {
  const router = useRouter();
  const params = useParams();

  // =======================================================
  // UUID
  // =======================================================

  const id = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id;

  // =======================================================
  // STATE
  // =======================================================

  const [isCollapsed, setIsCollapsed] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [loadingTahun, setLoadingTahun] =
    useState(true);

  const [error, setError] =
    useState("");

  const [tahunError, setTahunError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [tahunAjaranList, setTahunAjaranList] =
    useState([]);

  const [jumlahSiswa, setJumlahSiswa] =
    useState(0);

  const [form, setForm] = useState({
    nama: "",
    tingkat: "",
    tahunAjaranId: "",
    kapasitas: "",
    waliKelasId: "",
    lantaiId: "",
    fotoKelasUrl: null,
  });

  // =======================================================
  // SIDEBAR
  // =======================================================

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  // =======================================================
  // LOAD TAHUN AJARAN
  // =======================================================

  useEffect(() => {
    let mounted = true;

    async function loadTahun() {
      try {
        setLoadingTahun(true);
        setTahunError("");

        const response =
          await getTahunAjaran();

        if (!mounted) return;

        const list =
          Array.isArray(response)
            ? response
            : Array.isArray(
                response?.data
              )
            ? response.data
            : Array.isArray(
                response?.data?.data
              )
            ? response.data.data
            : [];

        setTahunAjaranList(list);
      } catch (err) {
        console.error(
          "Gagal mengambil tahun ajaran:",
          err
        );

        if (!mounted) return;

        // Jangan menggagalkan halaman edit
        // hanya karena tahun ajaran gagal
        setTahunError(
          err?.message ||
            "Gagal mengambil data tahun ajaran."
        );

        setTahunAjaranList([]);
      } finally {
        if (mounted) {
          setLoadingTahun(false);
        }
      }
    }

    loadTahun();

    return () => {
      mounted = false;
    };
  }, []);

  // =======================================================
  // LOAD DETAIL KELAS
  // =======================================================

  useEffect(() => {
    if (!id) {
      setError(
        "ID kelas tidak ditemukan."
      );

      setPageLoading(false);

      return;
    }

    let mounted = true;

    async function loadDetail() {
      try {
        setPageLoading(true);
        setError("");

        console.log(
          "======================================"
        );

        console.log(
          "LOAD DETAIL KELAS"
        );

        console.log(
          "ID:",
          id
        );

        const response =
          await getKelasById(id);

        console.log(
          "RESPONSE DETAIL:",
          response
        );

        // =================================================
        // SUPPORT BEBERAPA BENTUK RESPONSE
        // =================================================

        const data =
          response?.data?.data ??
          response?.data ??
          response?.result ??
          response;

        console.log(
          "DATA DETAIL:",
          data
        );

        console.log(
          "======================================"
        );

        if (
          !data ||
          !data.id
        ) {
          throw new Error(
            "Data kelas tidak ditemukan."
          );
        }

        if (!mounted) return;

        // =================================================
        // SET FORM
        // =================================================

        setForm({
          nama:
            data.nama || "",

          tingkat:
            data.tingkat !== null &&
            data.tingkat !== undefined
              ? String(data.tingkat)
              : "",

          tahunAjaranId:
            data.tahunAjaranId ||
            data.tahun_ajaran_id ||
            data.tahunAjaran?.id ||
            "",

          kapasitas:
            data.kapasitas !== null &&
            data.kapasitas !== undefined
              ? String(
                  data.kapasitas
                )
              : "",

          waliKelasId:
            data.waliKelasId ||
            data.wali_kelas_id ||
            data.waliKelas?.id ||
            "",

          lantaiId:
            data.lantaiId ||
            data.lantai_id ||
            data.lantai?.id ||
            "",

          fotoKelasUrl:
            data.fotoKelasUrl ||
            data.foto_kelas_url ||
            null,
        });

        // =================================================
        // JUMLAH SISWA
        // =================================================

        const count =
          Number(
            data?._count?.anggota ??
              data?.jumlahSiswa ??
              data?.jumlah_siswa ??
              0
          );

        setJumlahSiswa(
          Number.isFinite(count)
            ? count
            : 0
        );
      } catch (err) {
        console.error(
          "Gagal mengambil detail kelas:",
          err
        );

        if (!mounted) return;

        setError(
          err?.message ||
            "Gagal mengambil data kelas."
        );
      } finally {
        if (mounted) {
          setPageLoading(false);
        }
      }
    }

    loadDetail();

    return () => {
      mounted = false;
    };
  }, [id]);

  // =======================================================
  // HANDLE CHANGE
  // =======================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // =======================================================
  // SUBMIT
  // =======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // =================================================
    // VALIDATION
    // =================================================

    if (!id) {
      setError(
        "ID kelas tidak ditemukan."
      );

      return;
    }

    if (!form.nama.trim()) {
      setError(
        "Nama kelas wajib diisi."
      );

      return;
    }

    if (!form.tingkat) {
      setError(
        "Tingkat kelas wajib dipilih."
      );

      return;
    }

    if (!form.tahunAjaranId) {
      setError(
        "Tahun ajaran wajib dipilih."
      );

      return;
    }

    if (!form.kapasitas) {
      setError(
        "Kapasitas kelas wajib diisi."
      );

      return;
    }

    const kapasitas =
      Number(form.kapasitas);

    if (
      !Number.isFinite(
        kapasitas
      )
    ) {
      setError(
        "Kapasitas harus berupa angka."
      );

      return;
    }

    if (kapasitas < 1) {
      setError(
        "Kapasitas kelas minimal 1 siswa."
      );

      return;
    }

    // =================================================
    // UPDATE
    // =================================================

    try {
      setLoading(true);

      const payload = {
        nama:
          form.nama.trim(),

        tingkat:
          Number(form.tingkat),

        tahunAjaranId:
          form.tahunAjaranId,

        kapasitas,

        waliKelasId:
          form.waliKelasId ||
          null,

        lantaiId:
          form.lantaiId ||
          null,

        fotoKelasUrl:
          form.fotoKelasUrl ||
          null,
      };

      console.log(
        "======================================"
      );

      console.log(
        "UPDATE KELAS"
      );

      console.log(
        "ID:",
        id
      );

      console.log(
        "PAYLOAD:",
        payload
      );

      console.log(
        "======================================"
      );

      await updateKelas(
        id,
        payload
      );

      setSuccess(
        "Data kelas berhasil diperbarui."
      );

      setTimeout(() => {
        router.push(
          `/admin/kelas/${id}`
        );

        router.refresh();
      }, 800);
    } catch (err) {
      console.error(
        "Gagal memperbarui kelas:",
        err
      );

      setError(
        err?.message ||
          "Gagal memperbarui data kelas."
      );
    } finally {
      setLoading(false);
    }
  };

  // =======================================================
  // PAGE LOADING
  // =======================================================

  if (pageLoading) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-slate-50">

        <Sidebar
          active="kelas"
          setActive={() => {}}
          collapsed={
            isCollapsed
          }
          setCollapsed={
            setIsCollapsed
          }
        />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

          <Header
            toggleSidebar={
              toggleSidebar
            }
            notifications={[]}
            user={{
              name: "Admin Sekolah",
              email:
                "admin@smartschool.com",
              avatar: "AD",
            }}
          />

          <main className="flex min-h-0 flex-1 items-center justify-center">

            <div className="flex flex-col items-center gap-3">

              <Loader2
                size={30}
                className="animate-spin text-blue-600"
              />

              <p className="text-sm font-medium text-slate-500">
                Memuat data kelas...
              </p>

            </div>

          </main>

        </div>

      </div>
    );
  }

  // =======================================================
  // MAIN
  // =======================================================

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar
        active="kelas"
        setActive={() => {}}
        collapsed={
          isCollapsed
        }
        setCollapsed={
          setIsCollapsed
        }
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* HEADER */}

        <Header
          toggleSidebar={
            toggleSidebar
          }
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email:
              "admin@smartschool.com",
            avatar: "AD",
          }}
        />

        {/* MAIN */}

        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">

          <div className="w-full px-3 py-4 sm:px-5 sm:py-5 md:px-6 lg:px-8 xl:px-10">

            <div className="mx-auto w-full max-w-[1200px]">

              {/* =================================================
                  BACK
              ================================================= */}

              <div className="mb-5">

                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/admin/kelas/${id}`
                    )
                  }
                  className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"
                >
                  <ArrowLeft
                    size={17}
                    className="transition-transform group-hover:-translate-x-1"
                  />

                  Kembali ke Detail Kelas
                </button>

              </div>

              {/* =================================================
                  HEADER
              ================================================= */}

              <div className="mb-6 flex min-w-0 items-center gap-3 sm:gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200 sm:h-12 sm:w-12">
                  <Edit3 size={21} />
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex flex-wrap items-center gap-2">

                    <h1 className="truncate text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
                      Edit Kelas
                    </h1>

                    <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500">
                      Database
                    </span>

                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    Perbarui informasi kelas
                    yang tersimpan di database.
                  </p>

                </div>

              </div>

              {/* =================================================
                  ERROR DETAIL
              ================================================= */}

              {error && (
                <div className="mb-5 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-100">
                    <AlertCircle
                      size={18}
                      className="text-rose-600"
                    />
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="text-sm font-semibold text-rose-800">
                      Gagal memuat / menyimpan data
                    </p>

                    <p className="mt-1 break-words text-sm leading-6 text-rose-700">
                      {error}
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setError("")
                    }
                    className="rounded-lg p-1 text-rose-400 hover:bg-rose-100 hover:text-rose-600"
                  >
                    <X size={16} />
                  </button>

                </div>
              )}

              {/* =================================================
                  TAHUN AJARAN WARNING
              ================================================= */}

              {tahunError && (
                <div className="mb-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                    <AlertCircle
                      size={18}
                      className="text-amber-600"
                    />
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="text-sm font-semibold text-amber-800">
                      Tahun ajaran tidak dapat dimuat
                    </p>

                    <p className="mt-1 text-sm leading-6 text-amber-700">
                      {tahunError}
                    </p>

                    <p className="mt-1 text-xs text-amber-600">
                      Data kelas tetap dapat dibuka,
                      tetapi pilihan tahun ajaran
                      membutuhkan data dari backend.
                    </p>

                  </div>

                </div>
              )}

              {/* =================================================
                  SUCCESS
              ================================================= */}

              {success && (
                <div className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                    <CheckCircle
                      size={18}
                      className="text-emerald-600"
                    />
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-emerald-800">
                      Berhasil
                    </p>

                    <p className="mt-1 text-sm leading-6 text-emerald-700">
                      {success}
                    </p>

                  </div>

                </div>
              )}

              {/* =================================================
                  FORM CARD
              ================================================= */}

              <form
                onSubmit={
                  handleSubmit
                }
                className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >

                {/* CARD HEADER */}

                <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-4 py-4 sm:px-6 md:px-7">

                  <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <School size={19} />
                    </div>

                    <div className="min-w-0">

                      <h2 className="text-sm font-bold text-slate-800">
                        Informasi Kelas
                      </h2>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Perbarui data kelas
                        sesuai dengan informasi
                        sekolah.
                      </p>

                    </div>

                  </div>

                </div>

                {/* FORM BODY */}

                <div className="w-full p-4 sm:p-6 md:p-7 lg:p-8">

                  <div className="grid w-full grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">

                    {/* =================================================
                        NAMA
                    ================================================= */}

                    <div className="min-w-0 md:col-span-2">

                      <label
                        htmlFor="nama"
                        className="mb-1.5 block text-xs font-semibold text-slate-600"
                      >
                        Nama Kelas
                        <span className="ml-1 text-rose-500">
                          *
                        </span>
                      </label>

                      <div className="relative">

                        <GraduationCap
                          size={17}
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          id="nama"
                          type="text"
                          name="nama"
                          value={
                            form.nama
                          }
                          onChange={
                            handleChange
                          }
                          disabled={
                            loading
                          }
                          placeholder="Contoh: X RPL 1"
                          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                        />

                      </div>

                    </div>

                    {/* =================================================
                        TINGKAT
                    ================================================= */}

                    <div className="min-w-0">

                      <label
                        htmlFor="tingkat"
                        className="mb-1.5 block text-xs font-semibold text-slate-600"
                      >
                        Tingkat
                        <span className="ml-1 text-rose-500">
                          *
                        </span>
                      </label>

                      <div className="relative">

                        <School
                          size={17}
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <select
                          id="tingkat"
                          name="tingkat"
                          value={
                            form.tingkat
                          }
                          onChange={
                            handleChange
                          }
                          disabled={
                            loading
                          }
                          className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                          <option value="">
                            Pilih tingkat
                          </option>

                          {TINGKAT_OPTIONS.map(
                            (item) => (
                              <option
                                key={
                                  item.value
                                }
                                value={
                                  item.value
                                }
                              >
                                {
                                  item.label
                                }
                              </option>
                            )
                          )}

                        </select>

                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                      </div>

                    </div>

                    {/* =================================================
                        TAHUN AJARAN
                    ================================================= */}

                    <div className="min-w-0">

                      <label
                        htmlFor="tahunAjaranId"
                        className="mb-1.5 block text-xs font-semibold text-slate-600"
                      >
                        Tahun Ajaran
                        <span className="ml-1 text-rose-500">
                          *
                        </span>
                      </label>

                      <div className="relative">

                        <CalendarDays
                          size={17}
                          className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                        />

                        <select
                          id="tahunAjaranId"
                          name="tahunAjaranId"
                          value={
                            form.tahunAjaranId
                          }
                          onChange={
                            handleChange
                          }
                          disabled={
                            loading ||
                            loadingTahun
                          }
                          className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                          <option value="">
                            {loadingTahun
                              ? "Memuat tahun ajaran..."
                              : "Pilih tahun ajaran"}
                          </option>

                          {/* 
                            Kalau list backend tersedia,
                            tampilkan semua tahun ajaran.
                          */}

                          {tahunAjaranList.map(
                            (item) => (
                              <option
                                key={
                                  item.id
                                }
                                value={
                                  item.id
                                }
                              >
                                {item.nama}
                                {" - "}
                                {
                                  item.semester
                                }

                                {item.status ===
                                "aktif"
                                  ? " (Aktif)"
                                  : ""}
                              </option>
                            )
                          )}

                          {/* 
                            Kalau tahun ajaran kelas
                            belum ada di list karena
                            endpoint error, tetap
                            jangan hilangkan nilainya.
                          */}

                          {form.tahunAjaranId &&
                            !tahunAjaranList.some(
                              (
                                item
                              ) =>
                                item.id ===
                                form.tahunAjaranId
                            ) && (
                              <option
                                value={
                                  form.tahunAjaranId
                                }
                              >
                                Tahun ajaran
                                saat ini
                              </option>
                            )}

                        </select>

                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                      </div>

                    </div>

                    {/* =================================================
                        KAPASITAS
                    ================================================= */}

                    <div className="min-w-0">

                      <label
                        htmlFor="kapasitas"
                        className="mb-1.5 block text-xs font-semibold text-slate-600"
                      >
                        Kapasitas Kelas
                        <span className="ml-1 text-rose-500">
                          *
                        </span>
                      </label>

                      <div className="relative">

                        <Users
                          size={17}
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          id="kapasitas"
                          name="kapasitas"
                          type="number"
                          min="1"
                          value={
                            form.kapasitas
                          }
                          onChange={
                            handleChange
                          }
                          disabled={
                            loading
                          }
                          placeholder="30"
                          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                        />

                      </div>

                    </div>

                    {/* =================================================
                        JUMLAH SISWA
                    ================================================= */}

                    <div className="min-w-0">

                      <label
                        htmlFor="jumlahSiswa"
                        className="mb-1.5 block text-xs font-semibold text-slate-600"
                      >
                        Jumlah Siswa
                      </label>

                      <div className="relative">

                        <Users
                          size={17}
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          id="jumlahSiswa"
                          type="text"
                          value={
                            jumlahSiswa
                          }
                          readOnly
                          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-100 pl-10 pr-3 text-sm font-semibold text-slate-700 outline-none"
                        />

                      </div>

                      <p className="mt-1.5 text-xs text-slate-400">
                        Jumlah siswa mengikuti
                        data anggota kelas.
                      </p>

                    </div>

                  </div>

                  {/* =================================================
                      INFO
                  ================================================= */}

                  <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100">

                      <Info
                        size={16}
                        className="text-blue-700"
                      />

                    </div>

                    <div className="min-w-0">

                      <p className="text-sm font-semibold text-blue-800">
                        Informasi
                      </p>

                      <p className="mt-1 text-xs leading-5 text-blue-700">
                        Jumlah siswa tidak diubah
                        melalui halaman ini. Nilainya
                        mengikuti anggota siswa yang
                        terhubung ke kelas di database.
                      </p>

                    </div>

                  </div>

                  {/* =================================================
                      STATUS BACKEND
                  ================================================= */}

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                        <School
                          size={17}
                          className="text-slate-600"
                        />
                      </div>

                      <div className="min-w-0">

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Sumber Data
                        </p>

                        <p className="mt-0.5 truncate text-sm text-slate-700">
                          Database Sekolah
                        </p>

                      </div>

                    </div>

                    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                        <CheckCircle
                          size={17}
                          className="text-emerald-600"
                        />
                      </div>

                      <div className="min-w-0">

                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                          Kelas
                        </p>

                        <p className="mt-0.5 truncate text-sm text-emerald-700">
                          Siap Diedit
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      ACTION
                  ================================================= */}

                  <div className="mt-7 flex w-full flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-end">

                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/admin/kelas/${id}`
                        )
                      }
                      disabled={
                        loading
                      }
                      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                      <X size={17} />
                      Batal
                    </button>

                    <button
                      type="submit"
                      disabled={
                        loading ||
                        loadingTahun
                      }
                      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      {loading ? (
                        <>
                          <Loader2
                            size={17}
                            className="animate-spin"
                          />

                          <span>
                            Menyimpan...
                          </span>
                        </>
                      ) : (
                        <>
                          <Save
                            size={17}
                          />

                          <span>
                            Simpan Perubahan
                          </span>
                        </>
                      )}
                    </button>

                  </div>

                </div>
              </form>

              {/* FOOTER */}

              <p className="py-6 text-center text-[11px] text-slate-400">
                SmartSchool • Administrasi Kelas
              </p>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}