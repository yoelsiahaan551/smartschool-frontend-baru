
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { dummyPages } from "../../../lib/dummyData";
import {
  File,
  Plus,
  Search,
  X,
  Home,
  ExternalLink,
  Pencil,
  Trash2,
  MoreHorizontal,
  CheckCircle2,
  Globe2,
  LayoutTemplate,
  Eye,
  ChevronRight,
} from "lucide-react";

export default function PagesPage() {
  const [active, setActive] = useState("pages");
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPage, setSelectedPage] = useState(null);

  const totalPages = dummyPages.length;

  const homepageCount = dummyPages.filter(
    (page) => page.is_homepage
  ).length;

  const filteredPages = useMemo(() => {
    return dummyPages.filter((page) =>
      page.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="flex min-h-screen w-full bg-[#f6f7fb]">
      {/* =========================================================
          SIDEBAR
      ========================================================= */}
      <Sidebar
        active={active}
        setActive={setActive}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* =========================================================
          MAIN AREA
      ========================================================= */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* ===== HEADER ===== */}
        <Header
          title="Halaman Statis"
          user={{
            name: "CMS Admin",
            email: "cms@smartschool.com",
            avatar: "CA",
          }}
        />

        {/* ===== CONTENT ===== */}
        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="w-full min-w-0 px-3 py-4 sm:px-5 sm:py-6 md:px-7 lg:px-9 xl:px-10">
            <div className="mx-auto w-full max-w-[1700px]">

              {/* =====================================================
                  TOP BAR
              ===================================================== */}
              <div className="mb-6 flex flex-col gap-4 lg:mb-7 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 shadow-sm">
                      <LayoutTemplate className="h-5 w-5 text-violet-600" />
                    </div>

                    <div className="min-w-0">
                      <h1 className="truncate text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Halaman Statis
                      </h1>

                      <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                        Kelola halaman informasi website sekolah dengan mudah.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ACTION */}
                <div className="flex w-full shrink-0 sm:w-auto">
                  <Link
                    href="/cmsAdmin/pages/tambah"
                    className="
                      inline-flex w-full items-center justify-center gap-2
                      rounded-xl
                      bg-gradient-to-r from-violet-600 to-indigo-600
                      px-5 py-3
                      text-sm font-semibold text-white
                      shadow-lg shadow-violet-600/20
                      transition-all duration-200
                      hover:-translate-y-0.5
                      hover:shadow-xl hover:shadow-violet-600/25
                      sm:w-auto
                    "
                  >
                    <Plus className="h-4 w-4" />
                    Buat Halaman
                  </Link>
                </div>
              </div>

              {/* =====================================================
                  HERO / SUMMARY
              ===================================================== */}
              <section className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-[#17152d] via-[#242044] to-[#38306a] p-5 shadow-xl shadow-slate-300/30 sm:p-6 lg:p-7">
                {/* Decorative */}
                <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-violet-400/10 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />

                <div className="relative flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                  <div className="min-w-0 max-w-2xl">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-violet-100 backdrop-blur-sm">
                      <Globe2 className="h-3.5 w-3.5" />
                      Website Content
                    </div>

                    <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                      Kelola struktur halaman website
                    </h2>

                    <p className="mt-2 max-w-xl text-xs leading-6 text-slate-300 sm:text-sm">
                      Buat, edit, dan atur halaman informasi seperti
                      Tentang Kami, Kontak, Profil Sekolah, dan halaman
                      lainnya dalam satu tempat.
                    </p>
                  </div>

                  {/* QUICK STATS */}
                  <div className="grid w-full grid-cols-2 gap-3 sm:max-w-md">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-md">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                          Total Halaman
                        </span>

                        <File className="h-4 w-4 text-violet-300" />
                      </div>

                      <p className="text-2xl font-bold text-white">
                        {totalPages}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-400">
                        halaman tersedia
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-md">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                          Homepage
                        </span>

                        <Home className="h-4 w-4 text-indigo-300" />
                      </div>

                      <p className="text-2xl font-bold text-white">
                        {homepageCount}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-400">
                        halaman utama
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* =====================================================
                  CONTENT HEADER
              ===================================================== */}
              <div className="mb-4 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-800">
                    Daftar Halaman
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Semua halaman statis yang tersedia di website.
                  </p>
                </div>

                {/* SEARCH */}
                <div className="relative w-full xl:w-[360px]">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    placeholder="Cari halaman..."
                    value={searchQuery}
                    onChange={(e) =>
                      setSearchQuery(e.target.value)
                    }
                    className="
                      w-full rounded-xl
                      border border-slate-200
                      bg-white
                      py-3 pl-10 pr-10
                      text-sm text-slate-700
                      outline-none
                      shadow-sm
                      transition-all
                      placeholder:text-slate-400
                      hover:border-slate-300
                      focus:border-violet-400
                      focus:ring-4 focus:ring-violet-500/10
                    "
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* =====================================================
                  TABLE CARD
              ===================================================== */}
              <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                {/* TABLE HEADER */}
                <div className="flex flex-col gap-3 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50">
                      <File className="h-4 w-4 text-violet-600" />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-800">
                        Semua Halaman
                      </h3>

                      <p className="text-[11px] text-slate-400">
                        {filteredPages.length} halaman ditemukan
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-600">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Sistem aktif
                  </div>
                </div>

                {/* ===================================================
                    DESKTOP TABLE
                =================================================== */}
                <div className="w-full overflow-x-auto">
                  <table className="w-full min-w-[850px] border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/70">
                        <th className="px-6 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Halaman
                        </th>

                        <th className="px-6 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          URL
                        </th>

                        <th className="px-6 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Status
                        </th>

                        <th className="px-6 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Tipe
                        </th>

                        <th className="px-6 py-3.5 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Aksi
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {filteredPages.length > 0 ? (
                        filteredPages.map((page, index) => (
                          <tr
                            key={page.id ?? index}
                            className="group transition-colors hover:bg-violet-50/30"
                          >
                            {/* PAGE */}
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 text-violet-600 ring-1 ring-violet-100">
                                  {page.is_homepage ? (
                                    <Home className="h-4 w-4" />
                                  ) : (
                                    <File className="h-4 w-4" />
                                  )}
                                </div>

                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="max-w-[260px] truncate text-sm font-semibold text-slate-800">
                                      {page.title}
                                    </p>

                                    {page.is_homepage && (
                                      <span className="shrink-0 rounded-full bg-violet-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-violet-600">
                                        Utama
                                      </span>
                                    )}
                                  </div>

                                  <p className="mt-0.5 text-[11px] text-slate-400">
                                    Halaman statis
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* URL */}
                            <td className="px-6 py-4">
                              <div className="inline-flex max-w-[260px] items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5">
                                <Globe2 className="h-3.5 w-3.5 shrink-0 text-slate-400" />

                                <span className="truncate text-xs text-slate-500">
                                  /{page.slug || page.title?.toLowerCase().replace(/\s+/g, "-")}
                                </span>
                              </div>
                            </td>

                            {/* STATUS */}
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                Aktif
                              </span>
                            </td>

                            {/* TYPE */}
                            <td className="px-6 py-4">
                              <span className="text-xs font-medium text-slate-500">
                                Static Page
                              </span>
                            </td>

                            {/* ACTION */}
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedPage(page)
                                  }
                                  title="Lihat"
                                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>

                                <Link
                                  href={`/cmsAdmin/pages/edit/${page.id}`}
                                  title="Edit"
                                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-violet-50 hover:text-violet-600"
                                >
                                  <Pencil className="h-4 w-4" />
                                </Link>

                                <button
                                  type="button"
                                  title="Hapus"
                                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>

                                <button
                                  type="button"
                                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-16 text-center"
                          >
                            <div className="mx-auto flex max-w-sm flex-col items-center">
                              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                                <Search className="h-6 w-6 text-slate-400" />
                              </div>

                              <h3 className="text-sm font-bold text-slate-700">
                                Halaman tidak ditemukan
                              </h3>

                              <p className="mt-1 text-xs leading-5 text-slate-400">
                                Coba gunakan kata kunci pencarian
                                yang berbeda.
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* FOOTER */}
                <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <p className="text-xs text-slate-400">
                    Menampilkan{" "}
                    <span className="font-semibold text-slate-600">
                      {filteredPages.length}
                    </span>{" "}
                    dari{" "}
                    <span className="font-semibold text-slate-600">
                      {totalPages}
                    </span>{" "}
                    halaman
                  </p>

                  <Link
                    href="/cmsAdmin/pages/tambah"
                    className="inline-flex w-fit items-center gap-2 text-xs font-semibold text-violet-600 transition hover:text-violet-700"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Tambah halaman baru
                  </Link>
                </div>
              </section>

              {/* =====================================================
                  INFORMATION CARDS
              ===================================================== */}
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                    <LayoutTemplate className="h-4 w-4" />
                  </div>

                  <h3 className="text-sm font-bold text-slate-800">
                    Halaman Statis
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Gunakan untuk informasi yang relatif tetap
                    seperti profil sekolah dan kontak.
                  </p>
                </div>

                <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <Globe2 className="h-4 w-4" />
                  </div>

                  <h3 className="text-sm font-bold text-slate-800">
                    URL Terstruktur
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Pastikan URL halaman singkat, jelas, dan mudah
                    diingat oleh pengunjung.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>

                  <h3 className="text-sm font-bold text-slate-800">
                    Konten Terorganisir
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Kelola seluruh halaman website dalam satu
                    dashboard yang rapi.
                  </p>
                </div>
              </div>

              {/* =====================================================
                  FOOTER
              ===================================================== */}
              <footer className="py-7 text-center">
                <p className="text-[11px] text-slate-400">
                  © 2026 SmartSchool • CMS Management
                </p>
              </footer>
            </div>
          </div>
        </main>
      </div>

      {/* =========================================================
          PREVIEW MODAL
      ========================================================= */}
      {selectedPage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <Eye className="h-4 w-4" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Preview Halaman
                  </h3>

                  <p className="text-[11px] text-slate-400">
                    Informasi halaman
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPage(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Judul
                </p>

                <h4 className="mt-1 text-xl font-bold text-slate-900">
                  {selectedPage.title}
                </h4>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  URL
                </p>

                <div className="mt-2 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-3">
                  <Globe2 className="h-4 w-4 text-violet-500" />

                  <span className="break-all text-sm text-slate-600">
                    /{selectedPage.slug || selectedPage.title?.toLowerCase().replace(/\s+/g, "-")}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />

                  <span className="text-xs font-semibold text-emerald-700">
                    Halaman aktif
                  </span>
                </div>

                {selectedPage.is_homepage && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600">
                    <Home className="h-3.5 w-3.5" />
                    Homepage
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/50 p-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setSelectedPage(null)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Tutup
              </button>

              <Link
                href={`/cmsAdmin/pages/edit/${selectedPage.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700"
              >
                <Pencil className="h-4 w-4" />
                Edit Halaman
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}