"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  ClipboardList,
  AlertCircle,
  BookOpen,
  Loader2,
  CheckCircle2,
  Clock3,
  Monitor,
} from "lucide-react";

import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

import { getKelasMapel } from "../../../../services/kelasMapel.service";
import { createUjian } from "../../../../services/ujian.service";

/* =====================================================
   HELPER
===================================================== */

function parseData(response) {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.data?.data)) {
    return response.data.data;
  }

  return [];
}

function getCurrentUser() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return JSON.parse(
      localStorage.getItem("user") || "null"
    );
  } catch {
    return null;
  }
}

function getCurrentUserId() {
  const user = getCurrentUser();

  return (
    user?.id ||
    user?.userId ||
    user?.penggunaId ||
    null
  );
}

/* =====================================================
   PAGE
===================================================== */

export default function TambahUjianPage() {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] =
    useState(false);

  const [kelasMapel, setKelasMapel] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [form, setForm] = useState({
    kelasMapelId: "",
    judul: "",
    deskripsi: "",
    jenis: "Kuis",
    durasi: 60,
    waktuMulai: "",
    waktuSelesai: "",
    nilaiKelulusan: 75,
    modeUjian: "standard",
    dipublikasikan: false,
    penilaianOtomatis: true,
  });

  /* =====================================================
     LOAD KELAS MAPEL
  ===================================================== */

  useEffect(() => {
    loadKelasMapel();
  }, []);

  async function loadKelasMapel() {
    try {
      setLoading(true);
      setError("");

      const response =
        await getKelasMapel();

      console.log(
        "========== KELAS MAPEL =========="
      );

      console.log(
        "RESPONSE:",
        response
      );

      const data = parseData(response);

      console.log(
        "DATA:",
        data
      );

      const userId =
        getCurrentUserId();

      console.log(
        "USER ID:",
        userId
      );

      /*
       * Backend mengembalikan kelas-mapel
       * berdasarkan sekolah.
       *
       * FE menyaring berdasarkan guru
       * yang sedang login.
       */
      const filtered = userId
        ? data.filter(
            (item) =>
              String(
                item?.guruPengajarId || ""
              ) === String(userId) ||
              String(
                item?.guruPengajar?.id || ""
              ) === String(userId)
          )
        : [];

      console.log(
        "FILTERED:",
        filtered
      );

      setKelasMapel(filtered);

      if (filtered.length > 0) {
        setForm((prev) => ({
          ...prev,
          kelasMapelId:
            filtered[0].id,
        }));
      }
    } catch (err) {
      console.error(
        "GAGAL GET KELAS MAPEL:",
        err
      );

      setError(
        err?.message ||
          "Gagal mengambil data kelas dan mata pelajaran."
      );

      setKelasMapel([]);
    } finally {
      setLoading(false);
    }
  }

  /* =====================================================
     SELECTED KELAS MAPEL
  ===================================================== */

  const selectedKelasMapel =
    useMemo(() => {
      return kelasMapel.find(
        (item) =>
          item.id ===
          form.kelasMapelId
      );
    }, [
      kelasMapel,
      form.kelasMapelId,
    ]);

  /* =====================================================
     HANDLE INPUT
  ===================================================== */

  function handleChange(event) {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setError("");
    setSuccess("");

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  /* =====================================================
     SUBMIT
  ===================================================== */

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    /* ---------------------------------------------------
       VALIDASI FE
    --------------------------------------------------- */

    if (!form.kelasMapelId) {
      setError(
        "Kelas dan mata pelajaran wajib dipilih."
      );
      return;
    }

    if (!form.judul.trim()) {
      setError(
        "Judul ujian wajib diisi."
      );
      return;
    }

    if (form.judul.trim().length < 3) {
      setError(
        "Judul ujian minimal 3 karakter."
      );
      return;
    }

    if (!form.jenis) {
      setError(
        "Jenis ujian wajib dipilih."
      );
      return;
    }

    const durasi =
      Number(form.durasi);

    if (!durasi || durasi < 5) {
      setError(
        "Durasi ujian minimal 5 menit."
      );
      return;
    }

    let waktuMulai = null;
    let waktuSelesai = null;

    if (form.waktuMulai) {
      const dateMulai =
        new Date(
          form.waktuMulai
        );

      if (
        Number.isNaN(
          dateMulai.getTime()
        )
      ) {
        setError(
          "Format waktu mulai tidak valid."
        );
        return;
      }

      waktuMulai =
        dateMulai.toISOString();
    }

    if (form.waktuSelesai) {
      const dateSelesai =
        new Date(
          form.waktuSelesai
        );

      if (
        Number.isNaN(
          dateSelesai.getTime()
        )
      ) {
        setError(
          "Format waktu selesai tidak valid."
        );
        return;
      }

      waktuSelesai =
        dateSelesai.toISOString();
    }

    if (
      waktuMulai &&
      waktuSelesai &&
      new Date(waktuMulai) >=
        new Date(waktuSelesai)
    ) {
      setError(
        "Waktu selesai harus lebih besar dari waktu mulai."
      );
      return;
    }

    let nilaiKelulusan = null;

    if (
      form.nilaiKelulusan !== "" &&
      form.nilaiKelulusan !== null &&
      form.nilaiKelulusan !== undefined
    ) {
      nilaiKelulusan =
        Number(
          form.nilaiKelulusan
        );

      if (
        Number.isNaN(
          nilaiKelulusan
        ) ||
        nilaiKelulusan < 0 ||
        nilaiKelulusan > 100
      ) {
        setError(
          "Nilai kelulusan harus berada antara 0 sampai 100."
        );
        return;
      }
    }

    /* ---------------------------------------------------
       PAYLOAD SESUAI VALIDATION BE
    --------------------------------------------------- */

    const payload = {
      kelasMapelId:
        form.kelasMapelId,

      judul:
        form.judul.trim(),

      deskripsi:
        form.deskripsi.trim() || null,

      jenis:
        form.jenis,

      durasi,

      waktuMulai,

      waktuSelesai,

      nilaiKelulusan,

      modeUjian:
        form.modeUjian || "standard",

      dipublikasikan:
        Boolean(
          form.dipublikasikan
        ),

      penilaianOtomatis:
        Boolean(
          form.penilaianOtomatis
        ),
    };

    console.log(
      "========== CREATE UJIAN =========="
    );

    console.log(
      "PAYLOAD:",
      payload
    );

    try {
      setSaving(true);

      const response =
        await createUjian(
          payload
        );

      console.log(
        "CREATE UJIAN RESPONSE:",
        response
      );

      setSuccess(
        "Ujian berhasil dibuat."
      );

      setTimeout(() => {
        router.push(
          "/guru/ujian"
        );

        router.refresh();
      }, 700);
    } catch (err) {
      console.error(
        "GAGAL CREATE UJIAN:",
        err
      );

      setError(
        err?.message ||
          "Gagal membuat ujian."
      );
    } finally {
      setSaving(false);
    }
  }

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar
        active="ujian"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
        role="guru"
      />

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          toggleSidebar={() =>
            setIsCollapsed(
              (prev) => !prev
            )
          }
          notifications={[]}
          user={{
            name: "Guru",
            email:
              "guru@smartschool.com",
            avatar: "GR",
          }}
        />

        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-5xl px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() =>
                  router.push(
                    "/guru/ujian"
                  )
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-100"
                aria-label="Kembali"
              >
                <ArrowLeft
                  size={18}
                />
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <ClipboardList
                    size={22}
                    className="text-blue-600"
                  />

                  <h1 className="text-xl font-bold text-slate-800 sm:text-2xl lg:text-3xl">
                    Tambah Ujian
                  </h1>
                </div>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                  Buat ujian baru untuk kelas dan mata pelajaran
                  yang kamu ajar.
                </p>
              </div>
            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <div className="min-w-0">
                  <p className="font-semibold">
                    Terjadi masalah
                  </p>

                  <p className="mt-1 break-words leading-5">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* =================================================
                SUCCESS
            ================================================= */}

            {success && (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <div>
                  <p className="font-semibold">
                    Berhasil
                  </p>

                  <p className="mt-1">
                    {success}
                  </p>
                </div>
              </div>
            )}

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-5"
            >
              {/* =================================================
                  INFORMASI UJIAN
              ================================================= */}

              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-4 py-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <ClipboardList
                        size={19}
                      />
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-base font-bold text-slate-800 sm:text-lg">
                        Informasi Ujian
                      </h2>

                      <p className="mt-0.5 text-xs leading-5 text-slate-500 sm:text-sm">
                        Lengkapi informasi dasar ujian.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 p-4 sm:p-6 md:grid-cols-2">

                  {/* =================================================
                      KELAS + MAPEL
                  ================================================= */}

                  <div className="md:col-span-2">
                    <label
                      htmlFor="kelasMapelId"
                      className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                      Kelas & Mata Pelajaran
                      <span className="ml-1 text-rose-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <BookOpen
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <select
                        id="kelasMapelId"
                        name="kelasMapelId"
                        value={
                          form.kelasMapelId
                        }
                        onChange={
                          handleChange
                        }
                        disabled={
                          loading ||
                          saving
                        }
                        required
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-10 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                      >
                        <option value="">
                          {loading
                            ? "Memuat kelas dan mata pelajaran..."
                            : kelasMapel.length ===
                                0
                            ? "Tidak ada penugasan"
                            : "Pilih kelas & mata pelajaran"}
                        </option>

                        {kelasMapel.map(
                          (item) => (
                            <option
                              key={item.id}
                              value={item.id}
                            >
                              {item.kelas?.nama ||
                                "Kelas tidak diketahui"}{" "}
                              —{" "}
                              {item.mataPelajaran
                                ?.nama ||
                                "Mata pelajaran tidak diketahui"}
                            </option>
                          )
                        )}
                      </select>

                      {loading && (
                        <Loader2
                          size={17}
                          className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-blue-500"
                        />
                      )}
                    </div>

                    {/* KETERANGAN KOSONG */}
                    {!loading &&
                      kelasMapel.length ===
                        0 && (
                        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                          <p className="text-sm font-semibold text-amber-800">
                            Kelas dan mata pelajaran belum tersedia.
                          </p>

                          <p className="mt-1 text-xs leading-5 text-amber-700">
                            Pastikan akun guru memiliki penugasan
                            pada data kelas-mapel.
                          </p>

                          <button
                            type="button"
                            onClick={
                              loadKelasMapel
                            }
                            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-amber-800 ring-1 ring-amber-200 transition hover:bg-amber-100"
                          >
                            <Loader2
                              size={14}
                            />
                            Muat ulang
                          </button>
                        </div>
                      )}

                    {/* SELECTED */}
                    {selectedKelasMapel && (
                      <div className="mt-3 rounded-xl bg-slate-50 p-3">
                        <p className="mb-2 text-xs font-medium text-slate-500">
                          Penugasan yang dipilih
                        </p>

                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                            <CheckCircle2
                              size={13}
                            />

                            {selectedKelasMapel
                              .kelas?.nama ||
                              "Kelas"}
                          </span>

                          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
                            <CheckCircle2
                              size={13}
                            />

                            {selectedKelasMapel
                              .mataPelajaran
                              ?.nama ||
                              "Mata Pelajaran"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* =================================================
                      JUDUL
                  ================================================= */}

                  <div className="md:col-span-2">
                    <label
                      htmlFor="judul"
                      className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                      Judul Ujian
                      <span className="ml-1 text-rose-500">
                        *
                      </span>
                    </label>

                    <input
                      id="judul"
                      name="judul"
                      type="text"
                      value={
                        form.judul
                      }
                      onChange={
                        handleChange
                      }
                      required
                      minLength={3}
                      maxLength={100}
                      disabled={
                        saving
                      }
                      placeholder="Contoh: UTS Matematika Kelas X"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-50"
                    />

                    <p className="mt-1.5 text-xs text-slate-400">
                      Minimal 3 karakter, maksimal 100 karakter.
                    </p>
                  </div>

                  {/* =================================================
                      DESKRIPSI
                  ================================================= */}

                  <div className="md:col-span-2">
                    <label
                      htmlFor="deskripsi"
                      className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                      Deskripsi
                    </label>

                    <textarea
                      id="deskripsi"
                      name="deskripsi"
                      value={
                        form.deskripsi
                      }
                      onChange={
                        handleChange
                      }
                      rows={4}
                      disabled={
                        saving
                      }
                      placeholder="Tuliskan petunjuk atau informasi tambahan untuk siswa..."
                      className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-50"
                    />
                  </div>

                  {/* =================================================
                      JENIS
                  ================================================= */}

                  <div>
                    <label
                      htmlFor="jenis"
                      className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                      Jenis Ujian
                      <span className="ml-1 text-rose-500">
                        *
                      </span>
                    </label>

                    <select
                      id="jenis"
                      name="jenis"
                      value={
                        form.jenis
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        saving
                      }
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-50"
                    >
                      <option value="UTS">
                        UTS
                      </option>

                      <option value="UAS">
                        UAS
                      </option>

                      <option value="Kuis">
                        Kuis
                      </option>

                      <option value="Harian">
                        Harian
                      </option>

                      <option value="Lainnya">
                        Lainnya
                      </option>
                    </select>
                  </div>

                  {/* =================================================
                      DURASI
                  ================================================= */}

                  <div>
                    <label
                      htmlFor="durasi"
                      className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                      Durasi Ujian
                      <span className="ml-1 text-rose-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <Clock3
                        size={16}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="durasi"
                        type="number"
                        name="durasi"
                        min="5"
                        value={
                          form.durasi
                        }
                        onChange={
                          handleChange
                        }
                        required
                        disabled={
                          saving
                        }
                        className="w-full rounded-xl border border-slate-200 px-10 py-3 pr-16 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-50"
                      />

                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                        menit
                      </span>
                    </div>
                  </div>

                  {/* =================================================
                      NILAI KELULUSAN
                  ================================================= */}

                  <div>
                    <label
                      htmlFor="nilaiKelulusan"
                      className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                      Nilai Kelulusan
                    </label>

                    <input
                      id="nilaiKelulusan"
                      type="number"
                      name="nilaiKelulusan"
                      min="0"
                      max="100"
                      value={
                        form.nilaiKelulusan
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        saving
                      }
                      placeholder="75"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-50"
                    />

                    <p className="mt-1.5 text-xs text-slate-400">
                      Nilai antara 0 sampai 100.
                    </p>
                  </div>

                  {/* =================================================
                      MODE
                  ================================================= */}

                  <div>
                    <label
                      htmlFor="modeUjian"
                      className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                      Mode Ujian
                    </label>

                    <div className="relative">
                      <Monitor
                        size={16}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <select
                        id="modeUjian"
                        name="modeUjian"
                        value={
                          form.modeUjian
                        }
                        onChange={
                          handleChange
                        }
                        disabled={
                          saving
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-10 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-50"
                      >
                        <option value="standard">
                          Standard
                        </option>

                        <option value="online">
                          Online
                        </option>

                        <option value="offline">
                          Offline
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* =================================================
                      WAKTU MULAI
                  ================================================= */}

                  <div>
                    <label
                      htmlFor="waktuMulai"
                      className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                      Waktu Mulai
                    </label>

                    <input
                      id="waktuMulai"
                      type="datetime-local"
                      name="waktuMulai"
                      value={
                        form.waktuMulai
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        saving
                      }
                      className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-50"
                    />
                  </div>

                  {/* =================================================
                      WAKTU SELESAI
                  ================================================= */}

                  <div>
                    <label
                      htmlFor="waktuSelesai"
                      className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                      Waktu Selesai
                    </label>

                    <input
                      id="waktuSelesai"
                      type="datetime-local"
                      name="waktuSelesai"
                      value={
                        form.waktuSelesai
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        saving
                      }
                      className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-50"
                    />
                  </div>
                </div>
              </section>

              {/* =================================================
                  PENGATURAN
              ================================================= */}

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-5">
                  <h2 className="text-base font-bold text-slate-800 sm:text-lg">
                    Pengaturan Ujian
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                    Tentukan cara ujian dipublikasikan dan dinilai.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* PUBLIKASI */}
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">
                    <input
                      type="checkbox"
                      name="dipublikasikan"
                      checked={
                        form.dipublikasikan
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        saving
                      }
                      className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800">
                        Publikasikan ujian
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Siswa dapat melihat dan mengikuti ujian
                        setelah ujian dipublikasikan.
                      </p>
                    </div>
                  </label>

                  {/* OTOMATIS */}
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">
                    <input
                      type="checkbox"
                      name="penilaianOtomatis"
                      checked={
                        form.penilaianOtomatis
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        saving
                      }
                      className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800">
                        Penilaian otomatis
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Cocok digunakan untuk soal pilihan ganda
                        dan benar/salah.
                      </p>
                    </div>
                  </label>
                </div>
              </section>

              {/* =================================================
                  ACTION
              ================================================= */}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      "/guru/ujian"
                    )
                  }
                  disabled={
                    saving
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={
                    saving ||
                    loading ||
                    kelasMapel.length ===
                      0
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save
                        size={16}
                      />
                      Simpan Ujian
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

