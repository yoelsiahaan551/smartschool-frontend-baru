"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Sidebar from "../../../../components/Sidebar";
import Header from "../../../../components/Header";

import {
  getDetailTugas,
  updateTugas,
} from "../../../../../services/tugas.service";

import {
  ClipboardList,
  ArrowLeft,
  Save,
  AlertCircle,
  CalendarDays,
  Users,
  BookOpen,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react";

// ======================================================
// HELPERS
// ======================================================

function formatTanggalInput(date) {
  if (!date) return "";

  const d = new Date(date);

  if (isNaN(d.getTime())) return "";

  // Gunakan waktu lokal untuk datetime-local
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function formatTanggal(date) {
  if (!date) return "-";

  const d = new Date(date);

  if (isNaN(d.getTime())) return "-";

  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatJam(date) {
  if (!date) return "-";

  const d = new Date(date);

  if (isNaN(d.getTime())) return "-";

  return d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ======================================================
// MAIN
// ======================================================

export default function EditTugasPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [tugas, setTugas] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    batasWaktu: "",
  });

  // ======================================================
  // NOTIFICATIONS
  // ======================================================

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

  // ======================================================
  // LOAD DETAIL TUGAS
  // ======================================================

  useEffect(() => {
    if (!id) return;

    const loadTugas = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getDetailTugas(id);

        console.log("RESPONSE DETAIL TUGAS:", response);

        const data =
          response?.data?.data ??
          response?.data ??
          response;

        if (!data) {
          throw new Error("Data tugas tidak ditemukan");
        }

        setTugas(data);

        setForm({
          judul: data?.judul || "",
          deskripsi: data?.deskripsi || "",
          batasWaktu: formatTanggalInput(data?.batasWaktu),
        });
      } catch (err) {
        console.error("ERROR LOAD TUGAS:", err);

        setError(
          err?.message || "Gagal memuat data tugas"
        );
      } finally {
        setLoading(false);
      }
    };

    loadTugas();
  }, [id]);

  // ======================================================
  // HANDLE INPUT
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Hilangkan error ketika user mulai memperbaiki input
    if (error) {
      setError("");
    }
  };

  // ======================================================
  // HANDLE SUBMIT
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validasi judul
    if (!form.judul.trim()) {
      setError("Judul tugas wajib diisi.");
      return;
    }

    if (form.judul.trim().length < 3) {
      setError("Judul tugas minimal 3 karakter.");
      return;
    }

    // Validasi batas waktu
    if (!form.batasWaktu) {
      setError("Batas waktu wajib diisi.");
      return;
    }

    const deadline = new Date(form.batasWaktu);

    if (isNaN(deadline.getTime())) {
      setError("Format batas waktu tidak valid.");
      return;
    }

    try {
      setSaving(true);

      // ==================================================
      // PENTING:
      // datetime-local -> ISO DateTime
      // BE kamu menggunakan z.string().datetime()
      // ==================================================

      const batasWaktuISO = deadline.toISOString();

      const payload = {
        judul: form.judul.trim(),
        deskripsi: form.deskripsi.trim(),
        batasWaktu: batasWaktuISO,
      };

      console.log("PAYLOAD UPDATE TUGAS:", payload);

      await updateTugas(id, payload);

      setSuccess("Tugas berhasil diperbarui.");

      // Tunggu sebentar supaya pesan berhasil terlihat
      setTimeout(() => {
        router.push(`/guru/tugas/${id}`);
      }, 1000);
    } catch (err) {
      console.error("ERROR UPDATE TUGAS:", err);

      setError(
        err?.message || "Gagal menyimpan perubahan tugas."
      );
    } finally {
      setSaving(false);
    }
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden bg-slate-50">
        <Sidebar
          active="tugas"
          setActive={() => {}}
          collapsed={!sidebarOpen}
          setCollapsed={() =>
            setSidebarOpen(!sidebarOpen)
          }
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="shrink-0">
            <Header
              toggleSidebar={() =>
                setSidebarOpen(!sidebarOpen)
              }
              notifications={notifications}
              user={{
                name: "Guru",
                email: "guru@smartschool.com",
                avatar: "GU",
              }}
            />
          </div>

          <main className="flex min-h-0 flex-1 items-center justify-center p-4">
            <div className="text-center">
              <Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-blue-500" />

              <p className="text-sm text-slate-500">
                Memuat data tugas...
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // ======================================================
  // ERROR LOAD
  // ======================================================

  if (error && !tugas) {
    return (
      <div className="flex h-screen overflow-hidden bg-slate-50">
        <Sidebar
          active="tugas"
          setActive={() => {}}
          collapsed={!sidebarOpen}
          setCollapsed={() =>
            setSidebarOpen(!sidebarOpen)
          }
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="shrink-0">
            <Header
              toggleSidebar={() =>
                setSidebarOpen(!sidebarOpen)
              }
              notifications={notifications}
              user={{
                name: "Guru",
                email: "guru@smartschool.com",
                avatar: "GU",
              }}
            />
          </div>

          <main className="flex flex-1 items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl border border-rose-200 bg-white p-6 text-center shadow-sm">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50">
                <AlertCircle className="h-6 w-6 text-rose-500" />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-800">
                Gagal Memuat Tugas
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  router.push("/guru/tugas")
                }
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600"
              >
                <ArrowLeft size={16} />
                Kembali ke Tugas
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // ======================================================
  // DATA RELATION
  // ======================================================

  const kelasNama =
    tugas?.kelasMapel?.kelas?.nama ||
    "-";

  const mapelNama =
    tugas?.kelasMapel?.mataPelajaran?.nama ||
    "-";

  const guruNama =
    tugas?.kelasMapel?.guruPengajar?.namaLengkap ||
    "-";

  // ======================================================
  // MAIN PAGE
  // ======================================================

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <Sidebar
        active="tugas"
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={() =>
          setSidebarOpen(!sidebarOpen)
        }
      />

      {/* ==================================================
          CONTENT
      ================================================== */}

      <div className="flex min-w-0 flex-1 flex-col">

        {/* HEADER */}

        <div className="shrink-0">
          <Header
            toggleSidebar={() =>
              setSidebarOpen(!sidebarOpen)
            }
            notifications={notifications}
            user={{
              name: "Guru",
              email: "guru@smartschool.com",
              avatar: "GU",
            }}
          />
        </div>

        {/* ==================================================
            MAIN
        ================================================== */}

        <main className="min-h-0 flex-1 overflow-y-auto">

          <div className="mx-auto w-full max-w-4xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">

            {/* ==================================================
                BACK BUTTON
            ================================================== */}

            <button
              type="button"
              onClick={() =>
                router.push(`/guru/tugas/${id}`)
              }
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
            >
              <ArrowLeft size={16} />

              Kembali ke Detail Tugas
            </button>

            {/* ==================================================
                PAGE TITLE
            ================================================== */}

            <div className="mb-5">

              <div className="flex items-start gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <ClipboardList size={21} />
                </div>

                <div className="min-w-0">

                  <h1 className="text-xl font-semibold tracking-tight text-slate-800 sm:text-2xl">
                    Edit Tugas
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    Perbarui informasi tugas yang sudah dibuat.
                  </p>

                </div>

              </div>

            </div>

            {/* ==================================================
                CARD
            ================================================== */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              {/* ==================================================
                  CARD HEADER
              ================================================== */}

              <div className="border-b border-slate-100 px-5 py-4 sm:px-6">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <h2 className="text-sm font-semibold text-slate-800 sm:text-base">
                      Informasi Tugas
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Ubah data yang diperlukan kemudian simpan.
                    </p>
                  </div>

                  {/* STATUS INFO */}

                  <div className="flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600">
                    <ClipboardList size={13} />
                    Tugas
                  </div>

                </div>

              </div>

              {/* ==================================================
                  FORM
              ================================================== */}

              <form onSubmit={handleSubmit}>

                <div className="space-y-6 p-5 sm:p-6">

                  {/* ==================================================
                      ERROR
                  ================================================== */}

                  {error && (
                    <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">

                      <AlertCircle
                        size={18}
                        className="mt-0.5 shrink-0"
                      />

                      <div className="min-w-0">
                        <p className="text-sm font-medium">
                          Gagal menyimpan
                        </p>

                        <p className="mt-1 break-words text-xs leading-5">
                          {error}
                        </p>
                      </div>

                    </div>
                  )}

                  {/* ==================================================
                      SUCCESS
                  ================================================== */}

                  {success && (
                    <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">

                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0"
                      />

                      <div>
                        <p className="text-sm font-medium">
                          Berhasil
                        </p>

                        <p className="mt-1 text-xs">
                          {success}
                        </p>
                      </div>

                    </div>
                  )}

                  {/* ==================================================
                      JUDUL
                  ================================================== */}

                  <div>

                    <label
                      htmlFor="judul"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Judul Tugas
                      <span className="ml-1 text-rose-500">
                        *
                      </span>
                    </label>

                    <input
                      id="judul"
                      name="judul"
                      type="text"
                      value={form.judul}
                      onChange={handleChange}
                      disabled={saving}
                      placeholder="Contoh: Tugas Matriks"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <p className="mt-1.5 text-xs text-slate-400">
                      Minimal 3 karakter.
                    </p>

                  </div>

                  {/* ==================================================
                      DESKRIPSI
                  ================================================== */}

                  <div>

                    <label
                      htmlFor="deskripsi"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Deskripsi Tugas
                    </label>

                    <textarea
                      id="deskripsi"
                      name="deskripsi"
                      rows={5}
                      value={form.deskripsi}
                      onChange={handleChange}
                      disabled={saving}
                      placeholder="Tulis instruksi atau deskripsi tugas..."
                      className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <p className="mt-1.5 text-xs text-slate-400">
                      Deskripsi bersifat opsional.
                    </p>

                  </div>

                  {/* ==================================================
                      DEADLINE
                  ================================================== */}

                  <div>

                    <label
                      htmlFor="batasWaktu"
                      className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
                    >
                      <Clock
                        size={15}
                        className="text-blue-500"
                      />

                      Batas Waktu
                      <span className="text-rose-500">
                        *
                      </span>
                    </label>

                    <input
                      id="batasWaktu"
                      name="batasWaktu"
                      type="datetime-local"
                      value={form.batasWaktu}
                      onChange={handleChange}
                      disabled={saving}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <p className="mt-1.5 text-xs text-slate-400">
                      Tentukan tanggal dan waktu terakhir siswa
                      dapat mengumpulkan tugas.
                    </p>

                  </div>

                  {/* ==================================================
                      INFO READ ONLY
                  ================================================== */}

                  <div className="rounded-xl border border-slate-200 bg-slate-50">

                    <div className="border-b border-slate-200 px-4 py-3">

                      <p className="text-sm font-semibold text-slate-700">
                        Informasi Pembelajaran
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Data berikut mengikuti Kelas Mapel yang
                        sudah tersimpan.
                      </p>

                    </div>

                    <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">

                      {/* KELAS */}

                      <div className="flex items-start gap-3 p-4">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-500 shadow-sm">
                          <Users size={16} />
                        </div>

                        <div className="min-w-0">

                          <p className="text-xs text-slate-400">
                            Kelas
                          </p>

                          <p className="mt-1 break-words text-sm font-semibold text-slate-700">
                            {kelasNama}
                          </p>

                        </div>

                      </div>

                      {/* MAPEL */}

                      <div className="flex items-start gap-3 p-4">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-500 shadow-sm">
                          <BookOpen size={16} />
                        </div>

                        <div className="min-w-0">

                          <p className="text-xs text-slate-400">
                            Mata Pelajaran
                          </p>

                          <p className="mt-1 break-words text-sm font-semibold text-slate-700">
                            {mapelNama}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* DEADLINE CURRENT */}

                    {tugas?.batasWaktu && (
                      <div className="border-t border-slate-200 px-4 py-3">

                        <div className="flex items-center gap-2 text-xs text-slate-500">

                          <CalendarDays
                            size={14}
                            className="text-slate-400"
                          />

                          <span>
                            Batas saat ini:
                          </span>

                          <span className="font-medium text-slate-700">
                            {formatTanggal(
                              tugas.batasWaktu
                            )}{" "}
                            {formatJam(
                              tugas.batasWaktu
                            )}
                          </span>

                        </div>

                      </div>
                    )}

                  </div>

                </div>

                {/* ==================================================
                    ACTION FOOTER
                ================================================== */}

                <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">

                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">

                    {/* BATAL */}

                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/guru/tugas/${id}`
                        )
                      }
                      disabled={saving}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                      <ArrowLeft size={16} />

                      Batal
                    </button>

                    {/* SIMPAN */}

                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
                          <Save size={16} />

                          Simpan Perubahan
                        </>
                      )}
                    </button>

                  </div>

                </div>

              </form>

            </div>

            {/* ==================================================
                BOTTOM INFO
            ================================================== */}

            <div className="mt-4 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">

              <AlertCircle
                size={16}
                className="mt-0.5 shrink-0 text-blue-500"
              />

              <p className="text-xs leading-5 text-blue-700">
                Kelas dan mata pelajaran tidak dapat diubah dari
                halaman ini karena mengikuti data Kelas Mapel yang
                sudah tersimpan di sistem.
              </p>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}