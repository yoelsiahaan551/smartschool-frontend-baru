"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Header from "../../../../components/Header";
import Sidebar from "../../../../components/Sidebar";

import {
  Edit3,
  Save,
  X,
  CalendarDays,
  Calendar,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Clock3,
} from "lucide-react";

// =========================================================
// DUMMY DATA
// =========================================================
const dummyTahunAjaran = [
  {
    id: 1,
    nama: "2024/2025",
    tanggal_mulai: "2024-07-01",
    tanggal_selesai: "2025-06-30",
    semester: "Ganjil",
    status: "aktif",
    dibuatPada: "2024-06-15T08:00:00Z",
    updatedAt: "2024-07-01T00:00:00Z",
  },
  {
    id: 2,
    nama: "2025/2026",
    tanggal_mulai: "2025-07-01",
    tanggal_selesai: "2026-06-30",
    semester: "Genap",
    status: "nonaktif",
    dibuatPada: "2025-06-15T08:00:00Z",
    updatedAt: "2025-06-15T08:00:00Z",
  },
  {
    id: 3,
    nama: "2023/2024",
    tanggal_mulai: "2023-07-01",
    tanggal_selesai: "2024-06-30",
    semester: "Ganjil",
    status: "nonaktif",
    dibuatPada: "2023-06-15T08:00:00Z",
    updatedAt: "2023-06-15T08:00:00Z",
  },
  {
    id: 4,
    nama: "2026/2027",
    tanggal_mulai: "2026-07-01",
    tanggal_selesai: "2027-06-30",
    semester: "Genap",
    status: "nonaktif",
    dibuatPada: "2026-06-15T08:00:00Z",
    updatedAt: "2026-06-15T08:00:00Z",
  },
];

// =========================================================
// PAGE
// =========================================================
export default function EditTahunAjaranPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params?.id);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [form, setForm] = useState({
    nama: "",
    tanggal_mulai: "",
    tanggal_selesai: "",
    semester: "Ganjil",
    status: "nonaktif",
  });

  const [currentItem, setCurrentItem] = useState(null);

  // =========================================================
  // SIDEBAR
  // =========================================================
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  // =========================================================
  // LOAD DATA
  // =========================================================
  useEffect(() => {
    const loadData = () => {
      try {
        const stored = localStorage.getItem("tahunAjaranData");

        const data = stored
          ? JSON.parse(stored)
          : dummyTahunAjaran;

        const item = data.find((t) => t.id === id);

        if (!item) {
          alert("Data tahun ajaran tidak ditemukan!");
          router.push("/admin/tahun-ajaran");
          return;
        }

        setCurrentItem(item);

        setForm({
          nama: item.nama || "",
          tanggal_mulai: item.tanggal_mulai || "",
          tanggal_selesai: item.tanggal_selesai || "",
          semester: item.semester || "Ganjil",
          status: item.status || "nonaktif",
        });
      } catch (error) {
        console.error("Gagal memuat data:", error);
        alert("Terjadi kesalahan saat memuat data.");
        router.push("/admin/tahun-ajaran");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id, router]);

  // =========================================================
  // HANDLE CHANGE
  // =========================================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // VALIDATION
  // =========================================================
  const validateForm = () => {
    if (!form.nama.trim()) {
      alert("Nama tahun ajaran wajib diisi!");
      return false;
    }

    if (!form.tanggal_mulai) {
      alert("Tanggal mulai wajib diisi!");
      return false;
    }

    if (!form.tanggal_selesai) {
      alert("Tanggal selesai wajib diisi!");
      return false;
    }

    if (
      new Date(form.tanggal_mulai) >=
      new Date(form.tanggal_selesai)
    ) {
      alert(
        "Tanggal mulai harus lebih awal dari tanggal selesai!"
      );
      return false;
    }

    return true;
  };

  // =========================================================
  // SUBMIT
  // =========================================================
  const handleSubmit = () => {
    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      try {
        const stored = localStorage.getItem(
          "tahunAjaranData"
        );

        const data = stored
          ? JSON.parse(stored)
          : dummyTahunAjaran;

        let updatedData;

        // Jika status menjadi aktif,
        // nonaktifkan tahun ajaran lainnya.
        if (
          form.status === "aktif" &&
          currentItem?.status !== "aktif"
        ) {
          updatedData = data.map((item) => ({
            ...item,
            status:
              item.id === id ? "aktif" : "nonaktif",
            ...(item.id === id
              ? {
                  ...form,
                  updatedAt: new Date().toISOString(),
                }
              : {}),
          }));
        } else {
          updatedData = data.map((item) =>
            item.id === id
              ? {
                  ...item,
                  ...form,
                  updatedAt: new Date().toISOString(),
                }
              : item
          );
        }

        localStorage.setItem(
          "tahunAjaranData",
          JSON.stringify(updatedData)
        );

        alert(
          "Tahun ajaran berhasil diperbarui!"
        );

        router.push("/admin/tahun-ajaran");
      } catch (error) {
        console.error("Gagal menyimpan data:", error);
        alert(
          "Terjadi kesalahan saat menyimpan data."
        );
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  // =========================================================
  // LOADING SCREEN
  // =========================================================
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-indigo-200 border-t-indigo-600" />

          <p className="text-sm font-medium text-slate-500">
            Memuat data...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN PAGE
  // =========================================================
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <Sidebar
        active="tahunAjaran"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      {/* =====================================================
          RIGHT CONTENT AREA
      ====================================================== */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* ===================================================
            HEADER
        ==================================================== */}
        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email: "admin@smartschool.com",
            avatar: "AD",
          }}
        />

        {/* ===================================================
            SCROLLABLE CONTENT
        ==================================================== */}
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8 xl:px-10">
            {/* =================================================
                BACK BUTTON
            ================================================== */}
            <Link
              href="/admin/tahun-ajaran"
              className="group mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-indigo-600"
            >
              <ArrowLeft
                size={17}
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />

              <span>
                Kembali ke Daftar Tahun Ajaran
              </span>
            </Link>

            {/* =================================================
                PAGE HEADER
            ================================================== */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                {/* ICON */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
                  <Edit3
                    size={21}
                    strokeWidth={2}
                  />
                </div>

                {/* TITLE */}
                <div className="min-w-0">
                  <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
                    Edit Tahun Ajaran
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    Perbarui informasi tahun ajaran
                    yang sudah ada.
                  </p>
                </div>
              </div>

              {/* STATUS */}
              {currentItem && (
                <div className="flex shrink-0 items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm sm:self-center">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      currentItem.status === "aktif"
                        ? "bg-emerald-500"
                        : "bg-slate-400"
                    }`}
                  />

                  <span className="text-xs font-semibold text-slate-600">
                    {currentItem.status === "aktif"
                      ? "Tahun Ajaran Aktif"
                      : "Tahun Ajaran Nonaktif"}
                  </span>
                </div>
              )}
            </div>

            {/* =================================================
                CURRENT DATA
            ================================================== */}
            {currentItem && (
              <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                {/* HEADER */}
                <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Clock3
                      size={15}
                      className="text-indigo-500"
                    />

                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Informasi Saat Ini
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                  {/* TAHUN */}
                  <div className="flex min-w-0 items-center gap-3 px-4 py-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <CalendarDays size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Tahun Ajaran
                      </p>

                      <p className="mt-0.5 truncate text-sm font-semibold text-slate-700">
                        {currentItem.nama}
                      </p>
                    </div>
                  </div>

                  {/* SEMESTER */}
                  <div className="flex min-w-0 items-center gap-3 px-4 py-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                      <Calendar size={17} />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Semester
                      </p>

                      <span
                        className={`mt-1 inline-flex rounded-md px-2 py-1 text-[11px] font-semibold ${
                          currentItem.semester ===
                          "Ganjil"
                            ? "bg-indigo-50 text-indigo-600"
                            : "bg-sky-50 text-sky-600"
                        }`}
                      >
                        {currentItem.semester}
                      </span>
                    </div>
                  </div>

                  {/* STATUS */}
                  <div className="flex min-w-0 items-center gap-3 px-4 py-3.5">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        currentItem.status ===
                        "aktif"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <CheckCircle2 size={17} />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Status
                      </p>

                      <p
                        className={`mt-0.5 text-sm font-semibold ${
                          currentItem.status ===
                          "aktif"
                            ? "text-emerald-600"
                            : "text-slate-500"
                        }`}
                      >
                        {currentItem.status ===
                        "aktif"
                          ? "Aktif"
                          : "Nonaktif"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
                FORM CARD
            ================================================== */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              {/* =================================================
                  FORM HEADER
              ================================================== */}
              <div className="border-b border-slate-100 px-5 py-4 sm:px-6 lg:px-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                      Informasi Tahun Ajaran
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Lengkapi data berikut untuk memperbarui
                      tahun ajaran.
                    </p>
                  </div>

                  <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 sm:flex">
                    <CalendarDays size={17} />
                  </div>
                </div>
              </div>

              {/* =================================================
                  FORM BODY
              ================================================== */}
              <div className="p-5 sm:p-6 lg:p-7">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {/* =================================================
                      NAMA
                  ================================================== */}
                  <div className="lg:col-span-2">
                    <label
                      htmlFor="nama"
                      className="mb-2 block text-xs font-semibold text-slate-600"
                    >
                      Nama Tahun Ajaran
                      <span className="ml-1 text-rose-500">
                        *
                      </span>
                    </label>

                    <input
                      id="nama"
                      type="text"
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      placeholder="Contoh: 2026/2027"
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    />

                    <div className="mt-2 flex items-start gap-1.5 text-[11px] text-slate-400">
                      <AlertCircle
                        size={13}
                        className="mt-px shrink-0"
                      />

                      <span>
                        Gunakan format Tahun/Tahun,
                        contoh 2026/2027.
                      </span>
                    </div>
                  </div>

                  {/* =================================================
                      SEMESTER
                  ================================================== */}
                  <div className="min-w-0">
                    <label
                      htmlFor="semester"
                      className="mb-2 block text-xs font-semibold text-slate-600"
                    >
                      Semester
                      <span className="ml-1 text-rose-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <select
                        id="semester"
                        name="semester"
                        value={form.semester}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-700 outline-none transition duration-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      >
                        <option value="Ganjil">
                          Ganjil
                        </option>

                        <option value="Genap">
                          Genap
                        </option>
                      </select>

                      <ChevronDown
                        size={17}
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>

                  {/* =================================================
                      STATUS
                  ================================================== */}
                  <div className="min-w-0">
                    <label
                      htmlFor="status"
                      className="mb-2 block text-xs font-semibold text-slate-600"
                    >
                      Status
                    </label>

                    <div className="relative">
                      <select
                        id="status"
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-700 outline-none transition duration-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      >
                        <option value="nonaktif">
                          Nonaktif
                        </option>

                        <option value="aktif">
                          Aktif
                        </option>
                      </select>

                      <ChevronDown
                        size={17}
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>

                    <div className="mt-2 flex items-start gap-1.5 text-[11px] text-slate-400">
                      <AlertCircle
                        size={13}
                        className="mt-px shrink-0"
                      />

                      <span>
                        Hanya satu tahun ajaran yang dapat
                        berstatus aktif.
                      </span>
                    </div>
                  </div>

                  {/* =================================================
                      TANGGAL MULAI
                  ================================================== */}
                  <div className="min-w-0">
                    <label
                      htmlFor="tanggal_mulai"
                      className="mb-2 block text-xs font-semibold text-slate-600"
                    >
                      Tanggal Mulai
                      <span className="ml-1 text-rose-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <Calendar
                        size={17}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="tanggal_mulai"
                        type="date"
                        name="tanggal_mulai"
                        value={form.tanggal_mulai}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition duration-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      />
                    </div>
                  </div>

                  {/* =================================================
                      TANGGAL SELESAI
                  ================================================== */}
                  <div className="min-w-0">
                    <label
                      htmlFor="tanggal_selesai"
                      className="mb-2 block text-xs font-semibold text-slate-600"
                    >
                      Tanggal Selesai
                      <span className="ml-1 text-rose-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <Calendar
                        size={17}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="tanggal_selesai"
                        type="date"
                        name="tanggal_selesai"
                        value={form.tanggal_selesai}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition duration-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      />
                    </div>
                  </div>
                </div>

                {/* =================================================
                    INFO BOX
                ================================================== */}
                <div className="mt-6 flex items-start gap-3 rounded-lg border border-indigo-100 bg-indigo-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                    <AlertCircle size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-bold text-indigo-700">
                      Informasi
                    </p>

                    <p className="mt-1 text-xs leading-5 text-indigo-600">
                      Tahun ajaran digunakan sebagai periode
                      utama dalam pengelolaan jadwal,
                      penilaian, absensi, dan kegiatan
                      akademik sekolah.
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  ACTION FOOTER
              ================================================== */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-7">
                {/* BATAL */}
                <Link
                  href="/admin/tahun-ajaran"
                  className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 sm:w-auto"
                >
                  <X size={16} />
                  Batal
                </Link>

                {/* SIMPAN */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition duration-200 hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

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

            {/* =================================================
                FOOTER
            ================================================== */}
            <div className="px-2 py-6 text-center">
              <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400">
                <span>SmartSchool</span>

                <span className="h-1 w-1 rounded-full bg-slate-300" />

                <span>Admin Sekolah</span>

                <span className="h-1 w-1 rounded-full bg-slate-300" />

                <span>2026</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}