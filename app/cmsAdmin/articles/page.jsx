// app/cmsAdmin/articles/page.jsx

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Search,
  X,
  CheckCircle2,
  FilePenLine,
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
  Filter,
  CalendarDays,
  ChevronDown,
  ArrowUpDown,
  BarChart3,
  Clock3,
  LayoutList,
} from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { dummyArticles } from "../../../lib/dummyData";

export default function ArticlesPage() {
  const [active, setActive] = useState("articles");
  const [collapsed, setCollapsed] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [openMenu, setOpenMenu] = useState(null);

  // ============================================================
  // STATISTICS
  // ============================================================

  const totalArticles = dummyArticles.length;

  const publishedArticles = dummyArticles.filter(
    (article) => article.status === "published"
  ).length;

  const draftArticles = dummyArticles.filter(
    (article) => article.status === "draft"
  ).length;

  const totalViews = dummyArticles.reduce(
    (total, article) => total + (Number(article.views) || 0),
    0
  );

  // ============================================================
  // FILTER + SORT
  // ============================================================

  const filteredArticles = useMemo(() => {
    let result = [...dummyArticles];

    // SEARCH
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      result = result.filter((article) => {
        return (
          article.title?.toLowerCase().includes(query) ||
          article.category?.toLowerCase().includes(query) ||
          article.author?.toLowerCase().includes(query)
        );
      });
    }

    // STATUS
    if (statusFilter !== "all") {
      result = result.filter(
        (article) => article.status === statusFilter
      );
    }

    // SORT
    result.sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.created_at || 0) -
          new Date(a.created_at || 0)
        );
      }

      if (sortBy === "oldest") {
        return (
          new Date(a.created_at || 0) -
          new Date(b.created_at || 0)
        );
      }

      if (sortBy === "title") {
        return (a.title || "").localeCompare(
          b.title || ""
        );
      }

      return 0;
    });

    return result;
  }, [searchQuery, statusFilter, sortBy]);

  // ============================================================
  // FORMAT DATE
  // ============================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ============================================================
  // FORMAT NUMBER
  // ============================================================

  const formatNumber = (number) => {
    return new Intl.NumberFormat("id-ID").format(number || 0);
  };

  // ============================================================
  // CLEAR SEARCH
  // ============================================================

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen w-full bg-slate-100">
      <div className="flex min-h-screen w-full">
        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        <Sidebar
          active={active}
          setActive={setActive}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <div className="flex min-w-0 flex-1 flex-col">
          {/* HEADER */}

          <Header
            user={{
              name: "CMS Admin",
              email: "admin@smartschool.com",
              avatar: "CA",
            }}
            notifications={[]}
            toggleSidebar={() => setCollapsed(!collapsed)}
          />

          {/* ===================================================
              MAIN
          =================================================== */}

          <main className="min-w-0 flex-1 overflow-x-hidden">
            <div className="w-full px-4 py-5 sm:px-6 lg:px-8 xl:px-10">
              <div className="mx-auto w-full max-w-[1500px] space-y-6">
                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-50 blur-3xl" />
                  <div className="absolute bottom-0 left-1/3 h-24 w-24 rounded-full bg-indigo-50 blur-2xl" />

                  <div className="relative flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                        <FileText
                          size={23}
                          strokeWidth={2}
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
                            Manajemen Artikel
                          </h1>

                          <span className="inline-flex items-center rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-600">
                            CMS
                          </span>
                        </div>

                        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
                          Kelola, pantau, dan publikasikan seluruh
                          konten artikel website SmartSchool.
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/cmsAdmin/articles/tambah"
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
                    >
                      <Plus size={17} />
                      Buat Artikel
                    </Link>
                  </div>
                </section>

                {/* =================================================
                    STATISTICS
                ================================================= */}

                <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {/* TOTAL */}

                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Total Artikel
                        </p>

                        <p className="mt-1 text-2xl font-bold tracking-tight text-slate-800">
                          {totalArticles}
                        </p>

                        <p className="mt-1 text-[11px] text-slate-400">
                          Seluruh artikel
                        </p>
                      </div>

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <LayoutList size={18} />
                      </div>
                    </div>
                  </div>

                  {/* PUBLISHED */}

                  <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Dipublikasikan
                        </p>

                        <p className="mt-1 text-2xl font-bold tracking-tight text-emerald-600">
                          {publishedArticles}
                        </p>

                        <p className="mt-1 text-[11px] text-slate-400">
                          Artikel aktif
                        </p>
                      </div>

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        <CheckCircle2 size={18} />
                      </div>
                    </div>
                  </div>

                  {/* DRAFT */}

                  <div className="rounded-xl border border-amber-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Draft
                        </p>

                        <p className="mt-1 text-2xl font-bold tracking-tight text-amber-600">
                          {draftArticles}
                        </p>

                        <p className="mt-1 text-[11px] text-slate-400">
                          Belum dipublikasikan
                        </p>
                      </div>

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                        <FilePenLine size={18} />
                      </div>
                    </div>
                  </div>

                  {/* VIEWS */}

                  <div className="rounded-xl border border-violet-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Total Dilihat
                        </p>

                        <p className="mt-1 text-2xl font-bold tracking-tight text-violet-600">
                          {formatNumber(totalViews)}
                        </p>

                        <p className="mt-1 text-[11px] text-slate-400">
                          Semua artikel
                        </p>
                      </div>

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                        <Eye size={18} />
                      </div>
                    </div>
                  </div>
                </section>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  {/* TOOLBAR */}

                  <div className="border-b border-slate-200 p-4 sm:p-5">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                      {/* TITLE */}

                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                          <BarChart3 size={17} />
                        </div>

                        <div>
                          <h2 className="text-sm font-semibold text-slate-800">
                            Daftar Artikel
                          </h2>

                          <p className="text-xs text-slate-400">
                            {filteredArticles.length} artikel
                            ditampilkan
                          </p>
                        </div>
                      </div>

                      {/* CONTROLS */}

                      <div className="flex flex-col gap-2 sm:flex-row">
                        {/* SEARCH */}

                        <div className="relative min-w-0 sm:w-64">
                          <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) =>
                              setSearchQuery(e.target.value)
                            }
                            placeholder="Cari artikel..."
                            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-9 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                          />

                          {searchQuery && (
                            <button
                              type="button"
                              onClick={clearSearch}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                              <X size={15} />
                            </button>
                          )}
                        </div>

                        {/* FILTER */}

                        <div className="relative">
                          <Filter
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <select
                            value={statusFilter}
                            onChange={(e) =>
                              setStatusFilter(e.target.value)
                            }
                            className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-9 text-sm text-slate-600 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:w-40"
                          >
                            <option value="all">
                              Semua Status
                            </option>
                            <option value="published">
                              Published
                            </option>
                            <option value="draft">
                              Draft
                            </option>
                          </select>

                          <ChevronDown
                            size={14}
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                          />
                        </div>

                        {/* SORT */}

                        <div className="relative">
                          <ArrowUpDown
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <select
                            value={sortBy}
                            onChange={(e) =>
                              setSortBy(e.target.value)
                            }
                            className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-9 text-sm text-slate-600 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:w-40"
                          >
                            <option value="newest">
                              Terbaru
                            </option>
                            <option value="oldest">
                              Terlama
                            </option>
                            <option value="title">
                              Judul A-Z
                            </option>
                          </select>

                          <ChevronDown
                            size={14}
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      TABLE
                  ================================================= */}

                  <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[850px] border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/80">
                          <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Artikel
                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Kategori
                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Status
                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Dilihat
                          </th>

                          <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Tanggal
                          </th>

                          <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Aksi
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {filteredArticles.length > 0 ? (
                          filteredArticles.map((article) => (
                            <tr
                              key={article.id}
                              className="group transition-colors hover:bg-slate-50/70"
                            >
                              {/* ARTICLE */}

                              <td className="max-w-[380px] px-5 py-4">
                                <div className="flex min-w-0 items-center gap-3">
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <FileText size={17} />
                                  </div>

                                  <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-slate-700">
                                      {article.title}
                                    </p>

                                    <p className="mt-0.5 truncate text-xs text-slate-400">
                                      {article.author ||
                                        "CMS Admin"}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              {/* CATEGORY */}

                              <td className="px-4 py-4">
                                <span className="inline-flex max-w-[150px] truncate rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                  {article.category ||
                                    "Uncategorized"}
                                </span>
                              </td>

                              {/* STATUS */}

                              <td className="px-4 py-4">
                                {article.status ===
                                "published" ? (
                                  <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    Published
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-100 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                    Draft
                                  </span>
                                )}
                              </td>

                              {/* VIEWS */}

                              <td className="px-4 py-4">
                                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                  <Eye
                                    size={14}
                                    className="text-slate-400"
                                  />

                                  {formatNumber(
                                    article.views || 0
                                  )}
                                </div>
                              </td>

                              {/* DATE */}

                              <td className="px-4 py-4">
                                <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-slate-500">
                                  <CalendarDays
                                    size={14}
                                    className="text-slate-400"
                                  />

                                  {formatDate(
                                    article.created_at
                                  )}
                                </div>
                              </td>

                              {/* ACTION */}

                              <td className="px-5 py-4 text-right">
                                <div className="relative flex justify-end">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setOpenMenu(
                                        openMenu === article.id
                                          ? null
                                          : article.id
                                      )
                                    }
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                  >
                                    <MoreHorizontal
                                      size={18}
                                    />
                                  </button>

                                  {openMenu === article.id && (
                                    <div className="absolute right-0 top-10 z-20 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-left shadow-xl">
                                      <Link
                                        href={`/cmsAdmin/articles/${article.id}`}
                                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                                      >
                                        <Eye size={14} />
                                        Lihat
                                      </Link>

                                      <Link
                                        href={`/cmsAdmin/articles/${article.id}/edit`}
                                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                                      >
                                        <Pencil size={14} />
                                        Edit
                                      </Link>

                                      <button
                                        type="button"
                                        className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                                        onClick={() => {
                                          setOpenMenu(null);
                                          alert(
                                            "Fitur hapus artikel dapat dihubungkan ke API."
                                          );
                                        }}
                                      >
                                        <Trash2 size={14} />
                                        Hapus
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="6"
                              className="px-5 py-16 text-center"
                            >
                              <div className="flex flex-col items-center justify-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                                  <Search size={21} />
                                </div>

                                <h3 className="mt-3 text-sm font-semibold text-slate-700">
                                  Artikel tidak ditemukan
                                </h3>

                                <p className="mt-1 max-w-sm text-xs text-slate-400">
                                  Coba gunakan kata kunci lain
                                  atau ubah filter pencarian.
                                </p>

                                {(searchQuery ||
                                  statusFilter !== "all") && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSearchQuery("");
                                      setStatusFilter("all");
                                    }}
                                    className="mt-4 text-xs font-semibold text-blue-600 hover:text-blue-700"
                                  >
                                    Reset filter
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* =================================================
                      FOOTER TABLE
                  ================================================= */}

                  <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock3 size={14} />

                      <span>
                        Menampilkan{" "}
                        <span className="font-semibold text-slate-600">
                          {filteredArticles.length}
                        </span>{" "}
                        dari{" "}
                        <span className="font-semibold text-slate-600">
                          {totalArticles}
                        </span>{" "}
                        artikel
                      </span>
                    </div>

                    <div className="text-xs text-slate-400">
                      Data artikel CMS SmartSchool
                    </div>
                  </div>
                </section>

                {/* =================================================
                    FOOTER
                ================================================= */}

                <footer className="border-t border-slate-200 py-4 text-center text-xs text-slate-400">
                  © 2026 SmartSchool • Content Management System
                </footer>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}