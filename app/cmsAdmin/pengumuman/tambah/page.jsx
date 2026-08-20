"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  Save,
  X,
  ArrowLeft,
  Megaphone,
  Calendar,
  FileText,
  Clock,
} from "lucide-react";

export default function TambahPengumumanPage() {
  const router = useRouter();

  const [active, setActive] = useState("pengumuman");
  const [collapsed, setCollapsed] = useState(false);

  const [form, setForm] = useState({
    judul: "",
    kategori: "",
    konten: "",
    status: "draft",
    tanggal: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.judul || !form.konten) {
      alert("Harap isi Judul dan Konten pengumuman!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("✅ Pengumuman berhasil disimpan! (Mockup)");
      router.push("/cmsAdmin/pengumuman");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-slate-50">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside className="flex-shrink-0">
        <Sidebar
          active={active}
          setActive={setActive}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </aside>

      {/* =====================================================
          MAIN
      ====================================================== */}
      <main className="flex min-w-0 w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto bg-slate-50 transition-all duration-300">
        <Header title="Tambah Pengumuman" user={{ name: "Admin" }} />

        {/* ===================================================
            CONTENT WRAPPER
        ==================================================== */}
        <div className="w-full min-w-0 px-3 py-5 sm:px-5 sm:py-7 md:px-7 lg:px-8 xl:px-10 lg:py-9">
          <div className="mx-auto w-full max-w-5xl space-y-5 sm:space-y-6">

            {/* =================================================
                BREADCRUMB
            ================================================== */}
            <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <nav className="min-w-0">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm font-medium text-slate-500">
                  <li className="shrink-0">
                    <a
                      href="/cmsAdmin"
                      className="transition-colors hover:text-indigo-600"
                    >
                      Dashboard
                    </a>
                  </li>

                  <li className="text-slate-300">/</li>

                  <li className="shrink-0">
                    <a
                      href="/cmsAdmin/pengumuman"
                      className="transition-colors hover:text-indigo-600"
                    >
                      Pengumuman
                    </a>
                  </li>

                  <li className="text-slate-300">/</li>

                  <li className="min-w-0 truncate font-semibold text-indigo-600">
                    Tambah Baru
                  </li>
                </ol>
              </nav>

              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex w-fit shrink-0 items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Kembali</span>
              </button>
            </div>

            {/* =================================================
                FORM CARD
            ================================================== */}
            <form
              onSubmit={handleSubmit}
              className="w-full min-w-0 overflow-hidden rounded-xl border border-slate-200/70 bg-white shadow-sm sm:rounded-2xl"
            >
              {/* ===============================================
                  FORM HEADER
              ================================================ */}
              <div className="flex min-w-0 items-center gap-3 border-b border-slate-100 bg-slate-50/60 px-4 py-4 sm:px-6 sm:py-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50 sm:h-10 sm:w-10">
                  <Megaphone className="h-4 w-4 text-indigo-600 sm:h-5 sm:w-5" />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                    Detail Pengumuman
                  </h3>

                  <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">
                    Isi informasi pengumuman yang akan ditampilkan.
                  </p>
                </div>
              </div>

              {/* ===============================================
                  FORM CONTENT
              ================================================ */}
              <div className="min-w-0 space-y-5 p-4 sm:space-y-6 sm:p-6 lg:p-7">

                {/* =============================================
                    JUDUL
                ============================================== */}
                <div className="min-w-0">
                  <label
                    htmlFor="judul"
                    className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700"
                  >
                    Judul Pengumuman{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative min-w-0">
                    <Megaphone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      id="judul"
                      type="text"
                      required
                      value={form.judul}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          judul: e.target.value,
                        })
                      }
                      placeholder="Contoh: Libur Akhir Semester"
                      className="block w-full min-w-0 rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs text-black outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:text-sm"
                    />
                  </div>
                </div>

                {/* =============================================
                    KATEGORI + STATUS
                ============================================== */}
                <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">

                  {/* KATEGORI */}
                  <div className="min-w-0">
                    <label
                      htmlFor="kategori"
                      className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700"
                    >
                      Kategori
                    </label>

                    <select
                      id="kategori"
                      value={form.kategori}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          kategori: e.target.value,
                        })
                      }
                      className="block w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-black outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:text-sm"
                    >
                      <option value="">Pilih Kategori</option>
                      <option value="Akademik">Akademik</option>
                      <option value="Kegiatan">Kegiatan</option>
                      <option value="PPDB">PPDB</option>
                    </select>
                  </div>

                  {/* STATUS */}
                  <div className="min-w-0">
                    <label
                      htmlFor="status"
                      className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700"
                    >
                      Status
                    </label>

                    <select
                      id="status"
                      value={form.status}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          status: e.target.value,
                        })
                      }
                      className="block w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-black outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:text-sm"
                    >
                      <option value="draft">
                        📝 Draft
                      </option>

                      <option value="published">
                        ✅ Publikasikan Sekarang
                      </option>

                      <option value="scheduled">
                        ⏰ Jadwalkan Nanti
                      </option>
                    </select>
                  </div>
                </div>

                {/* =============================================
                    TANGGAL JIKA SCHEDULED
                ============================================== */}
                {form.status === "scheduled" && (
                  <div className="min-w-0">
                    <label
                      htmlFor="tanggal"
                      className="mb-1.5 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700"
                    >
                      <Clock className="h-4 w-4 shrink-0 text-indigo-500" />
                      Waktu Terbit
                    </label>

                    <div className="relative min-w-0">
                      <Calendar className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        id="tanggal"
                        type="datetime-local"
                        required
                        value={form.tanggal}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            tanggal: e.target.value,
                          })
                        }
                        className="block w-full min-w-0 rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs text-black outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:text-sm"
                      />
                    </div>
                  </div>
                )}

                {/* =============================================
                    KONTEN
                ============================================== */}
                <div className="min-w-0">
                  <label
                    htmlFor="konten"
                    className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700"
                  >
                    Konten Pengumuman{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative min-w-0">
                    <FileText className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />

                    <textarea
                      id="konten"
                      required
                      rows={6}
                      value={form.konten}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          konten: e.target.value,
                        })
                      }
                      placeholder="Tulis isi pengumuman di sini..."
                      className="block w-full min-w-0 resize-y rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs text-black outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:text-sm"
                    />
                  </div>
                </div>

                {/* =============================================
                    ACTION BUTTONS
                ============================================== */}
                <div className="flex min-w-0 flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">

                  {/* BATAL */}
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-semibold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 sm:w-auto sm:text-sm"
                  >
                    <X className="h-4 w-4" />
                    Batal
                  </button>

                  {/* SIMPAN */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:text-sm"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />

                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>

                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Simpan Pengumuman
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}