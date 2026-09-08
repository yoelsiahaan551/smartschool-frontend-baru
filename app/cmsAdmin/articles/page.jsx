"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { apiFetch } from "../../../lib/api";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  RefreshCw,
  Check,
  FileText,
  X,
  Loader2,
} from "lucide-react";

/* =========================================================
   HELPERS
========================================================= */

function extractList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.data)) return data.data.data;
  if (Array.isArray(data?.result)) return data.result;

  return [];
}

function formatDate(date) {
  if (!date) return "—";

  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return "—";
  }
}

function getStatus(status) {
  const value = String(status || "").toLowerCase();

  if (value === "published") {
    return {
      label: "Published",
      className: "bg-emerald-50 text-emerald-700 border-emerald-100",
      dot: "bg-emerald-500",
    };
  }

  return {
    label: "Draft",
    className: "bg-amber-50 text-amber-700 border-amber-100",
    dot: "bg-amber-500",
  };
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const config = getStatus(status);

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-bold ${config.className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

/* =========================================================
   ARTICLE IMAGE
========================================================= */

function ArticleImage({ article, large = false }) {
  const imageClass = large
    ? "h-16 w-24"
    : "h-14 w-20";

  if (article?.gambarUtama) {
    return (
      <div
        className={`${imageClass} shrink-0 overflow-hidden rounded-lg bg-slate-100`}
      >
        <img
          src={article.gambarUtama}
          alt={article.judul || "Artikel"}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`${imageClass} flex shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50`}
    >
      <FileText
        size={20}
        strokeWidth={1.7}
        className="text-slate-300"
      />
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ label, value, description }) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition duration-200 hover:border-slate-300 hover:shadow-[0_6px_20px_rgba(15,23,42,0.05)]">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <div className="mt-2 flex items-end justify-between gap-3">
        <p className="text-[26px] font-bold tracking-tight text-[#0F172A]">
          {value}
        </p>

        <span className="pb-1 text-[11px] font-medium text-slate-400">
          {description}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function ArticlesPage() {
  const router = useRouter();

  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  /* =======================================================
     LOAD DATA
  ======================================================= */

  async function loadData() {
    try {
      setLoading(true);
      setErrorMessage("");

      const [articleResponse, categoryResponse] =
        await Promise.all([
          apiFetch("/api/v1/cms/artikel"),
          apiFetch("/api/v1/cms/kategori-artikel"),
        ]);

      setArticles(extractList(articleResponse));
      setCategories(extractList(categoryResponse));
    } catch (error) {
      console.error(
        "Gagal mengambil data artikel:",
        error
      );

      setArticles([]);
      setCategories([]);

      setErrorMessage(
        error?.message ||
          "Gagal mengambil data artikel dari server."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredArticles = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return articles.filter((article) => {
      const title = String(
        article?.judul || ""
      ).toLowerCase();

      const summary = String(
        article?.ringkasan || ""
      ).toLowerCase();

      const slug = String(
        article?.slug || ""
      ).toLowerCase();

      const matchesSearch =
        !keyword ||
        title.includes(keyword) ||
        summary.includes(keyword) ||
        slug.includes(keyword);

      const articleStatus = String(
        article?.status || ""
      ).toLowerCase();

      const matchesStatus =
        statusFilter === "all" ||
        articleStatus === statusFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        String(article?.kategoriArtikelId || "") ===
          String(categoryFilter);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    articles,
    search,
    statusFilter,
    categoryFilter,
  ]);

  /* =======================================================
     STATISTICS
  ======================================================= */

  const totalArticles = articles.length;

  const publishedArticles = articles.filter(
    (article) =>
      String(article?.status || "").toLowerCase() ===
      "published"
  ).length;

  const draftArticles = articles.filter(
    (article) =>
      String(article?.status || "").toLowerCase() ===
      "draft"
  ).length;

  /* =======================================================
     DELETE
  ======================================================= */

  async function handleDelete() {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      setErrorMessage("");

      await apiFetch(
        `/api/v1/cms/artikel/${deleteTarget.id}`,
        {
          method: "DELETE",
        }
      );

      setArticles((prev) =>
        prev.filter(
          (article) =>
            article.id !== deleteTarget.id
        )
      );

      setDeleteTarget(null);
    } catch (error) {
      console.error(
        "Gagal menghapus artikel:",
        error
      );

      setErrorMessage(
        error?.message ||
          "Gagal menghapus artikel."
      );
    } finally {
      setDeleting(false);
    }
  }

  /* =======================================================
     RESET FILTER
  ======================================================= */

  function resetFilters() {
    setSearch("");
    setStatusFilter("all");
    setCategoryFilter("all");
  }

  const hasFilter =
    search ||
    statusFilter !== "all" ||
    categoryFilter !== "all";

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#F8FAFC]">
      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <Sidebar />

      {/* ===================================================
          MAIN AREA
      =================================================== */}

      <div
        className="
          absolute
          inset-y-0
          left-[60px]
          right-0
          flex
          min-w-0
          flex-col
          overflow-hidden
          lg:left-[260px]
        "
      >
        {/* =================================================
            HEADER COMPONENT
        ================================================= */}

        <div className="shrink-0">
          <Header />
        </div>

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main className="min-h-0 flex-1 overflow-hidden p-4 sm:p-5 lg:p-6">
          <div className="mx-auto flex h-full w-full max-w-[1440px] min-w-0 flex-col">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="mb-5 flex shrink-0 flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div className="min-w-0">

                {/* Breadcrumb */}

                <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em]">
                  <span className="text-blue-600">
                    CMS
                  </span>

                  <span className="text-slate-300">
                    /
                  </span>

                  <span className="text-slate-400">
                    Artikel
                  </span>
                </div>

                <h1 className="text-[25px] font-bold tracking-tight text-[#0F172A] sm:text-[28px]">
                  Artikel Sekolah
                </h1>

                <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                  Kelola berita, informasi,
                  pengumuman, dan konten sekolah
                  secara terstruktur.
                </p>
              </div>

              {/* ACTION */}

              <div className="flex shrink-0 gap-2">

                <button
                  type="button"
                  onClick={loadData}
                  disabled={loading}
                  className="
                    inline-flex
                    h-10
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-3.5
                    text-sm
                    font-semibold
                    text-slate-600
                    shadow-sm
                    transition
                    hover:border-slate-300
                    hover:bg-slate-50
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <RefreshCw
                    size={14}
                    className={
                      loading
                        ? "animate-spin"
                        : ""
                    }
                  />

                  <span>Refresh</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      "/cmsAdmin/articles/tambah"
                    )
                  }
                  className="
                    inline-flex
                    h-10
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-[#2563EB]
                    px-4
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-[#1D4ED8]
                    hover:shadow-md
                  "
                >
                  <Plus size={15} />

                  <span>
                    Tambah Artikel
                  </span>
                </button>

              </div>
            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {errorMessage && (
              <div className="mb-4 flex shrink-0 items-center gap-3 rounded-lg border border-red-100 bg-red-50 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-red-600">
                    {errorMessage}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setErrorMessage("")
                  }
                  className="shrink-0 text-red-400 transition hover:text-red-600"
                >
                  <X size={15} />
                </button>
              </div>
            )}

            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className="mb-4 grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-3">

              <StatCard
                label="Total Artikel"
                value={totalArticles}
                description="Semua"
              />

              <StatCard
                label="Published"
                value={publishedArticles}
                description="Terbit"
              />

              <StatCard
                label="Draft"
                value={draftArticles}
                description="Konsep"
              />

            </div>

            {/* =================================================
                FILTER BAR
            ================================================= */}

            <div className="mb-3 shrink-0 rounded-xl border border-slate-200 bg-white p-3 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">

              <div className="flex flex-col gap-2 lg:flex-row">

                {/* SEARCH */}

                <div className="relative min-w-0 flex-1">

                  <Search
                    size={16}
                    strokeWidth={1.8}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Cari judul, ringkasan, atau slug artikel..."
                    className="
                      h-10
                      w-full
                      rounded-lg
                      border
                      border-slate-200
                      bg-slate-50
                      pl-10
                      pr-10
                      text-sm
                      text-slate-700
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() =>
                        setSearch("")
                      }
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                        transition
                        hover:text-slate-600
                      "
                    >
                      <X size={15} />
                    </button>
                  )}

                </div>

                {/* STATUS */}

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                  className="
                    h-10
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-3
                    text-sm
                    font-medium
                    text-slate-600
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                    lg:w-[170px]
                  "
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

                {/* CATEGORY */}

                <select
                  value={categoryFilter}
                  onChange={(e) =>
                    setCategoryFilter(
                      e.target.value
                    )
                  }
                  className="
                    h-10
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-3
                    text-sm
                    font-medium
                    text-slate-600
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                    lg:w-[210px]
                  "
                >
                  <option value="all">
                    Semua Kategori
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.nama}
                      </option>
                    )
                  )}
                </select>

                {/* RESET */}

                {hasFilter && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="
                      h-10
                      shrink-0
                      rounded-lg
                      border
                      border-slate-200
                      bg-slate-50
                      px-3
                      text-xs
                      font-semibold
                      text-slate-500
                      transition
                      hover:bg-slate-100
                      hover:text-slate-700
                    "
                  >
                    Reset
                  </button>
                )}

              </div>
            </div>

            {/* =================================================
                TABLE CONTAINER
            ================================================= */}

            <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)]">

              {/* =================================================
                  DESKTOP TABLE
              ================================================= */}

              <div className="hidden h-full overflow-auto md:block">

                <table className="w-full min-w-[920px] border-collapse">

                  <thead className="sticky top-0 z-10">

                    <tr className="border-b border-slate-200 bg-slate-50">

                      <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Artikel
                      </th>

                      <th className="w-[190px] px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Kategori
                      </th>

                      <th className="w-[130px] px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Status
                      </th>

                      <th className="w-[150px] px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Tanggal
                      </th>

                      <th className="w-[130px] px-5 py-3.5 text-right text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Aksi
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {/* LOADING */}

                    {loading && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-5 py-20 text-center"
                        >
                          <Loader2
                            size={24}
                            className="mx-auto animate-spin text-blue-600"
                          />

                          <p className="mt-3 text-sm font-semibold text-slate-500">
                            Memuat artikel...
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Mengambil data dari server
                          </p>
                        </td>
                      </tr>
                    )}

                    {/* EMPTY */}

                    {!loading &&
                      filteredArticles.length ===
                        0 && (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-5 py-20 text-center"
                          >
                            <div className="mx-auto max-w-md">

                              <p className="text-sm font-semibold text-slate-600">
                                {hasFilter
                                  ? "Artikel tidak ditemukan"
                                  : "Belum ada artikel"}
                              </p>

                              <p className="mt-1 text-sm leading-6 text-slate-400">
                                {hasFilter
                                  ? "Tidak ada artikel yang sesuai dengan filter yang dipilih."
                                  : "Tambahkan artikel pertama untuk mulai mengelola konten sekolah."}
                              </p>

                              {hasFilter ? (
                                <button
                                  type="button"
                                  onClick={
                                    resetFilters
                                  }
                                  className="
                                    mt-4
                                    rounded-lg
                                    border
                                    border-slate-200
                                    bg-white
                                    px-4
                                    py-2
                                    text-xs
                                    font-semibold
                                    text-slate-600
                                    shadow-sm
                                    transition
                                    hover:bg-slate-50
                                  "
                                >
                                  Reset Filter
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    router.push(
                                      "/cmsAdmin/articles/tambah"
                                    )
                                  }
                                  className="
                                    mt-4
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-lg
                                    bg-[#2563EB]
                                    px-4
                                    py-2.5
                                    text-xs
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-[#1D4ED8]
                                  "
                                >
                                  <Plus size={14} />
                                  Tambah Artikel
                                </button>
                              )}

                            </div>
                          </td>
                        </tr>
                      )}

                    {/* DATA */}

                    {!loading &&
                      filteredArticles.map(
                        (article) => (
                          <tr
                            key={article.id}
                            className="
                              group
                              transition
                              hover:bg-slate-50/70
                            "
                          >

                            {/* ARTICLE */}

                            <td className="px-5 py-4">

                              <div className="flex min-w-0 items-center gap-3">

                                <ArticleImage
                                  article={
                                    article
                                  }
                                  large
                                />

                                <div className="min-w-0">

                                  <p className="
                                    max-w-[390px]
                                    truncate
                                    text-sm
                                    font-semibold
                                    text-[#0F172A]
                                  ">
                                    {article.judul ||
                                      "Tanpa judul"}
                                  </p>

                                  <p className="
                                    mt-1
                                    max-w-[390px]
                                    truncate
                                    text-xs
                                    text-slate-400
                                  ">
                                    {article.ringkasan ||
                                      "Tidak ada ringkasan"}
                                  </p>

                                </div>

                              </div>

                            </td>

                            {/* CATEGORY */}

                            <td className="px-5 py-4">

                              <span className="
                                inline-flex
                                max-w-[160px]
                                truncate
                                rounded-md
                                bg-slate-50
                                px-2.5
                                py-1.5
                                text-xs
                                font-medium
                                text-slate-600
                              ">
                                {article
                                  ?.kategoriArtikel
                                  ?.nama ||
                                  "Tanpa kategori"}
                              </span>

                            </td>

                            {/* STATUS */}

                            <td className="px-5 py-4">
                              <StatusBadge
                                status={
                                  article.status
                                }
                              />
                            </td>

                            {/* DATE */}

                            <td className="px-5 py-4">

                              <span className="text-xs font-medium text-slate-500">
                                {formatDate(
                                  article.createdAt ||
                                    article.dibuatPada ||
                                    article.created_at
                                )}
                              </span>

                            </td>

                            {/* ACTION */}

                            <td className="px-5 py-4">

                              <div className="flex justify-end gap-1.5">

                                <button
                                  type="button"
                                  onClick={() =>
                                    router.push(
                                      `/cmsAdmin/articles/${article.id}`
                                    )
                                  }
                                  title="Lihat artikel"
                                  className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-md
                                    border
                                    border-slate-200
                                    bg-white
                                    text-slate-500
                                    transition
                                    hover:border-slate-300
                                    hover:bg-slate-50
                                    hover:text-slate-700
                                  "
                                >
                                  <Eye size={14} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    router.push(
                                      `/cmsAdmin/articles/${article.id}/edit`
                                    )
                                  }
                                  title="Edit artikel"
                                  className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-md
                                    border
                                    border-blue-100
                                    bg-blue-50
                                    text-blue-600
                                    transition
                                    hover:border-blue-200
                                    hover:bg-blue-100
                                  "
                                >
                                  <Pencil size={14} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setDeleteTarget(
                                      article
                                    )
                                  }
                                  title="Hapus artikel"
                                  className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-md
                                    border
                                    border-red-100
                                    bg-red-50
                                    text-red-500
                                    transition
                                    hover:border-red-200
                                    hover:bg-red-100
                                  "
                                >
                                  <Trash2 size={14} />
                                </button>

                              </div>

                            </td>

                          </tr>
                        )
                      )}

                  </tbody>

                </table>

              </div>

              {/* =================================================
                  MOBILE
              ================================================= */}

              <div className="h-full divide-y divide-slate-100 overflow-auto md:hidden">

                {/* LOADING */}

                {loading && (
                  <div className="flex h-full items-center justify-center p-10 text-center">
                    <div>
                      <Loader2
                        size={24}
                        className="mx-auto animate-spin text-blue-600"
                      />

                      <p className="mt-3 text-sm font-semibold text-slate-500">
                        Memuat artikel...
                      </p>
                    </div>
                  </div>
                )}

                {/* EMPTY */}

                {!loading &&
                  filteredArticles.length ===
                    0 && (
                    <div className="flex h-full items-center justify-center p-8 text-center">
                      <div>
                        <p className="text-sm font-semibold text-slate-600">
                          {hasFilter
                            ? "Artikel tidak ditemukan"
                            : "Belum ada artikel"}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-400">
                          {hasFilter
                            ? "Coba ubah filter pencarian."
                            : "Belum ada konten artikel."}
                        </p>

                        <button
                          type="button"
                          onClick={
                            hasFilter
                              ? resetFilters
                              : () =>
                                  router.push(
                                    "/cmsAdmin/articles/tambah"
                                  )
                          }
                          className="
                            mt-4
                            rounded-lg
                            bg-[#2563EB]
                            px-4
                            py-2
                            text-xs
                            font-semibold
                            text-white
                          "
                        >
                          {hasFilter
                            ? "Reset Filter"
                            : "Tambah Artikel"}
                        </button>
                      </div>
                    </div>
                  )}

                {/* MOBILE DATA */}

                {!loading &&
                  filteredArticles.map(
                    (article) => (
                      <div
                        key={article.id}
                        className="group p-4 transition hover:bg-slate-50"
                      >

                        <div className="flex gap-3">

                          <ArticleImage
                            article={article}
                          />

                          <div className="min-w-0 flex-1">

                            <h3 className="
                              line-clamp-2
                              text-sm
                              font-semibold
                              leading-5
                              text-[#0F172A]
                            ">
                              {article.judul ||
                                "Tanpa judul"}
                            </h3>

                            <p className="
                              mt-1
                              line-clamp-2
                              text-xs
                              leading-5
                              text-slate-400
                            ">
                              {article.ringkasan ||
                                "Tidak ada ringkasan"}
                            </p>

                            <div className="mt-2">
                              <StatusBadge
                                status={
                                  article.status
                                }
                              />
                            </div>

                          </div>

                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">

                          <div className="min-w-0">

                            <p className="
                              truncate
                              text-xs
                              font-medium
                              text-slate-500
                            ">
                              {article
                                ?.kategoriArtikel
                                ?.nama ||
                                "Tanpa kategori"}
                            </p>

                            <p className="mt-0.5 text-[10px] text-slate-400">
                              {formatDate(
                                article.createdAt ||
                                  article.dibuatPada ||
                                  article.created_at
                              )}
                            </p>

                          </div>

                          <div className="flex shrink-0 gap-1.5">

                            <button
                              type="button"
                              onClick={() =>
                                router.push(
                                  `/cmsAdmin/articles/${article.id}`
                                )
                              }
                              className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-md
                                border
                                border-slate-200
                                bg-white
                                text-slate-500
                              "
                            >
                              <Eye size={14} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                router.push(
                                  `/cmsAdmin/articles/${article.id}/edit`
                                )
                              }
                              className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-md
                                border
                                border-blue-100
                                bg-blue-50
                                text-blue-600
                              "
                            >
                              <Pencil size={14} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setDeleteTarget(
                                  article
                                )
                              }
                              className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-md
                                border
                                border-red-100
                                bg-red-50
                                text-red-500
                              "
                            >
                              <Trash2 size={14} />
                            </button>

                          </div>

                        </div>

                      </div>
                    )
                  )}

              </div>

            </div>

            {/* =================================================
                FOOTER
            ================================================= */}

            {!loading &&
              articles.length > 0 && (
                <div className="mt-2 flex shrink-0 items-center justify-between text-[11px] text-slate-400">

                  <span>
                    Menampilkan{" "}
                    <strong className="font-semibold text-slate-600">
                      {filteredArticles.length}
                    </strong>{" "}
                    dari{" "}
                    <strong className="font-semibold text-slate-600">
                      {articles.length}
                    </strong>{" "}
                    artikel
                  </span>

                  {(search ||
                    statusFilter !== "all" ||
                    categoryFilter !==
                      "all") && (
                    <button
                      type="button"
                      onClick={
                        resetFilters
                      }
                      className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Reset filter
                    </button>
                  )}

                </div>
              )}

          </div>
        </main>
      </div>

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {deleteTarget && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-slate-950/45
            p-4
            backdrop-blur-[2px]
          "
          onMouseDown={(e) => {
            if (
              e.target ===
              e.currentTarget
            ) {
              if (!deleting) {
                setDeleteTarget(null);
              }
            }
          }}
        >

          <div className="
            w-full
            max-w-md
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-2xl
          ">

            {/* MODAL HEADER */}

            <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-red-500
                  ">
                    Konfirmasi
                  </p>

                  <h2 className="
                    mt-1
                    text-lg
                    font-bold
                    tracking-tight
                    text-[#0F172A]
                  ">
                    Hapus Artikel?
                  </h2>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    !deleting &&
                    setDeleteTarget(
                      null
                    )
                  }
                  disabled={deleting}
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    text-slate-400
                    transition
                    hover:bg-slate-100
                    hover:text-slate-600
                    disabled:opacity-50
                  "
                >
                  <X size={17} />
                </button>

              </div>

            </div>

            {/* MODAL CONTENT */}

            <div className="px-5 py-5 sm:px-6">

              <p className="text-sm leading-6 text-slate-500">
                Artikel berikut akan
                dihapus dari daftar konten:
              </p>

              <div className="
                mt-3
                rounded-lg
                border
                border-slate-200
                bg-slate-50
                px-4
                py-3
              ">
                <p className="
                  line-clamp-2
                  text-sm
                  font-semibold
                  leading-5
                  text-slate-700
                ">
                  {deleteTarget.judul ||
                    "Tanpa judul"}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {deleteTarget
                    ?.kategoriArtikel
                    ?.nama ||
                    "Tanpa kategori"}
                </p>
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-400">
                Tindakan ini tidak dapat
                dibatalkan.
              </p>

            </div>

            {/* MODAL FOOTER */}

            <div className="
              flex
              flex-col-reverse
              gap-2
              border-t
              border-slate-200
              bg-slate-50
              px-5
              py-4
              sm:flex-row
              sm:justify-end
              sm:px-6
            ">

              <button
                type="button"
                onClick={() =>
                  setDeleteTarget(
                    null
                  )
                }
                disabled={deleting}
                className="
                  h-10
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-5
                  text-sm
                  font-semibold
                  text-slate-600
                  transition
                  hover:bg-slate-50
                  disabled:opacity-50
                "
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="
                  inline-flex
                  h-10
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-red-600
                  px-5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {deleting ? (
                  <>
                    <Loader2
                      size={14}
                      className="animate-spin"
                    />
                    Menghapus...
                  </>
                ) : (
                  <>
                    <Trash2 size={14} />
                    Hapus Artikel
                  </>
                )}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}