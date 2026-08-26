"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

import {
  CalendarDays,
  Plus,
  Save,
  X,
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Info,
} from "lucide-react";

// =========================================================
// DUMMY DATA
// =========================================================
const DEFAULT_DATA = [
  {
    id: 1,
    nama: "2024/2025",
    tanggal_mulai: "2024-07-01",
    tanggal_selesai: "2025-06-30",
    semester: "Ganjil",
    status: "nonaktif",
    dibuatPada: "2024-06-15T08:00:00Z",
    updatedAt: "2024-07-01T00:00:00Z",
  },
];

// =========================================================
// PAGE
// =========================================================
export default function TambahTahunAjaranPage() {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    tanggal_mulai: "",
    tanggal_selesai: "",
    semester: "Ganjil",
    status: "nonaktif",
  });

  const [existingData, setExistingData] = useState([]);

  // =========================================================
  // SIDEBAR
  // =========================================================
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  // =========================================================
  // LOAD DATA EXISTING
  // =========================================================
  useEffect(() => {
    try {
      const stored = localStorage.getItem(
        "tahunAjaranData"
      );

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setExistingData(parsed);
        } else {
          setExistingData([]);
        }
      } else {
        setExistingData([]);
      }
    } catch (error) {
      console.error(
        "Gagal membaca tahun ajaran:",
        error
      );

      setExistingData([]);
    }
  }, []);

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
    // Nama
    if (!form.nama.trim()) {
      alert("Nama tahun ajaran wajib diisi!");
      return false;
    }

    // Format nama tahun ajaran
    const tahunRegex = /^\d{4}\/\d{4}$/;

    if (!tahunRegex.test(form.nama.trim())) {
      alert(
        "Format tahun ajaran harus seperti 2026/2027."
      );
      return false;
    }

    // Tanggal
    if (!form.tanggal_mulai) {
      alert("Tanggal mulai wajib diisi!");
      return false;
    }

    if (!form.tanggal_selesai) {
      alert("Tanggal selesai wajib diisi!");
      return false;
    }

    // Validasi tanggal
    if (
      new Date(form.tanggal_mulai) >=
      new Date(form.tanggal_selesai)
    ) {
      alert(
        "Tanggal mulai harus sebelum tanggal selesai!"
      );
      return false;
    }

    // Cek duplikat
    const exists = existingData.some(
      (item) =>
        item.nama?.toLowerCase() ===
        form.nama.trim().toLowerCase()
    );

    if (exists) {
      alert(
        `Tahun ajaran "${form.nama}" sudah ada!`
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
        const newItem = {
          id: Date.now(),
          ...form,
          nama: form.nama.trim(),
          dibuatPada: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const stored = localStorage.getItem(
          "tahunAjaranData"
        );

        let currentData = [];

        try {
          currentData = stored
            ? JSON.parse(stored)
            : [];
        } catch {
          currentData = [];
        }

        // Jika data bukan array
        if (!Array.isArray(currentData)) {
          currentData = [];
        }

        // Jika data baru dibuat aktif,
        // nonaktifkan semua data sebelumnya.
        let finalData;

        if (form.status === "aktif") {
          finalData = [
            ...currentData.map((item) => ({
              ...item,
              status: "nonaktif",
            })),
            newItem,
          ];
        } else {
          finalData = [
            ...currentData,
            newItem,
          ];
        }

        localStorage.setItem(
          "tahunAjaranData",
          JSON.stringify(finalData)
        );

        alert(
          "Tahun ajaran berhasil ditambahkan!"
        );

        router.push("/admin/tahun-ajaran");
      } catch (error) {
        console.error(
          "Gagal menyimpan tahun ajaran:",
          error
        );

        alert(
          "Terjadi kesalahan saat menyimpan data."
        );
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  // =========================================================
  // MAIN UI
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
          RIGHT SIDE
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
            MAIN CONTENT
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
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                {/* ICON */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
                  <Plus
                    size={22}
                    strokeWidth={2.2}
                  />
                </div>

                {/* TITLE */}
                <div className="min-w-0">
                  <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
                    Tambah Tahun Ajaran
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    Buat periode tahun ajaran baru
                    untuk sistem akademik sekolah.
                  </p>
                </div>
              </div>

              {/* HEADER INFO */}
              <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm lg:flex">
                <CalendarDays
                  size={16}
                  className="text-indigo-500"
                />

                <span className="text-xs font-semibold text-slate-600">
                  Periode Akademik
                </span>
              </div>
            </div>

            {/* =================================================
                CONTENT GRID
            ================================================== */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
              {/* =================================================
                  FORM
              ================================================== */}
              <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                {/* FORM HEADER */}
                <div className="border-b border-slate-100 px-5 py-4 sm:px-6 lg:px-7">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                        Informasi Tahun Ajaran
                      </h2>

                      <p className="mt-1 text-xs text-slate-400">
                        Isi informasi periode akademik
                        yang ingin ditambahkan.
                      </p>
                    </div>

                    <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 sm:flex">
                      <CalendarDays size={17} />
                    </div>
                  </div>
                </div>

                {/* FORM BODY */}
                <div className="p-5 sm:p-6 lg:p-7">
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {/* =================================================
                        NAMA TAHUN AJARAN
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

                      <div className="relative">
                        <CalendarDays
                          size={17}
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          id="nama"
                          type="text"
                          name="nama"
                          value={form.nama}
                          onChange={handleChange}
                          placeholder="Contoh: 2026/2027"
                          className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                        />
                      </div>

                      <div className="mt-2 flex items-start gap-1.5 text-[11px] text-slate-400">
                        <AlertCircle
                          size={13}
                          className="mt-px shrink-0"
                        />

                        <span>
                          Gunakan format Tahun/Tahun,
                          misalnya 2026/2027.
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
                        <CheckCircle2
                          size={13}
                          className="mt-px shrink-0 text-emerald-500"
                        />

                        <span>
                          Tahun ajaran aktif menjadi
                          periode utama sekolah.
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
                      WARNING STATUS
                  ================================================== */}
                  <div className="mt-6 flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">
                      <Info size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-700">
                        Catatan status
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Jika status diatur menjadi aktif,
                        tahun ajaran lain akan otomatis
                        menjadi nonaktif sehingga hanya
                        terdapat satu periode aktif.
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

                        Simpan Tahun Ajaran
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* =================================================
                  SIDE INFORMATION
              ================================================== */}
              <aside className="hidden min-w-0 xl:block">
                <div className="sticky top-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  {/* HEADER */}
                  <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <CalendarDays size={17} />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-slate-800">
                          Panduan
                        </h3>

                        <p className="text-[11px] text-slate-400">
                          Tahun ajaran
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* STEPS */}
                  <div className="space-y-5 p-5">
                    {/* STEP 1 */}
                    <div className="flex gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                        1
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-700">
                          Tentukan nama
                        </p>

                        <p className="mt-1 text-[11px] leading-5 text-slate-400">
                          Gunakan format seperti
                          2026/2027.
                        </p>
                      </div>
                    </div>

                    {/* STEP 2 */}
                    <div className="flex gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                        2
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-700">
                          Atur periode
                        </p>

                        <p className="mt-1 text-[11px] leading-5 text-slate-400">
                          Masukkan tanggal mulai dan
                          tanggal selesai.
                        </p>
                      </div>
                    </div>

                    {/* STEP 3 */}
                    <div className="flex gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                        3
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-700">
                          Tentukan status
                        </p>

                        <p className="mt-1 text-[11px] leading-5 text-slate-400">
                          Aktifkan jika periode tersebut
                          akan digunakan sebagai periode
                          utama.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* FOOTER INFO */}
                  <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle
                        size={14}
                        className="mt-0.5 shrink-0 text-indigo-500"
                      />

                      <p className="text-[10px] leading-4 text-slate-400">
                        Data tahun ajaran akan digunakan
                        pada berbagai proses akademik
                        seperti jadwal, absensi, dan
                        penilaian.
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            {/* =================================================
                MOBILE INFO
            ================================================== */}
            <div className="mt-6 xl:hidden">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Info size={16} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-700">
                      Panduan singkat
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-slate-400">
                      Gunakan format tahun seperti
                      2026/2027 dan pastikan tanggal mulai
                      lebih awal dari tanggal selesai.
                    </p>
                  </div>
                </div>
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