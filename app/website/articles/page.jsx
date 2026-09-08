"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Newspaper,
  Loader2,
  AlertCircle,
  Menu,
  X,
  School,
  CalendarDays,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ============================================================
// SUBDOMAIN SEKOLAH
// HARUS SAMA DENGAN DATABASE
// ============================================================
const SUBDOMAIN = "smart";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [mobileMenu, setMobileMenu] = useState(false);

  // ============================================================
  // LOAD ARTIKEL
  // ============================================================
  const loadArtikel = async () => {
    try {
      setLoading(true);
      setError("");

      // --------------------------------------------------------
      // VALIDASI API URL
      // --------------------------------------------------------
      if (!API_URL) {
        throw new Error(
          "NEXT_PUBLIC_API_URL belum dikonfigurasi."
        );
      }

      // --------------------------------------------------------
      // VALIDASI SUBDOMAIN
      // --------------------------------------------------------
      if (!SUBDOMAIN) {
        throw new Error(
          "Subdomain sekolah belum dikonfigurasi."
        );
      }

      // --------------------------------------------------------
      // URL BACKEND
      // Backend:
      //
      // GET /api/v1/publik/:subdomain/artikel
      // --------------------------------------------------------
      const url =
        `${API_URL}/api/v1/publik/` +
        `${encodeURIComponent(SUBDOMAIN)}/artikel`;

      console.log("=================================");
      console.log("FETCH ARTIKEL PUBLIC");
      console.log("API URL:", API_URL);
      console.log("SUBDOMAIN:", SUBDOMAIN);
      console.log("REQUEST:", url);
      console.log("=================================");

      // --------------------------------------------------------
      // FETCH
      // --------------------------------------------------------
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      });

      // --------------------------------------------------------
      // PARSE RESPONSE
      // --------------------------------------------------------
      let result = null;

      try {
        result = await response.json();
      } catch (jsonError) {
        console.error(
          "Gagal membaca JSON:",
          jsonError
        );

        throw new Error(
          "Server mengembalikan response yang tidak valid."
        );
      }

      console.log(
        "ARTICLE RESPONSE:",
        result
      );

      // --------------------------------------------------------
      // HANDLE ERROR
      // --------------------------------------------------------
      if (!response.ok) {
        throw new Error(
          result?.message ||
            result?.error ||
            `Gagal mengambil artikel. Status: ${response.status}`
        );
      }

      // --------------------------------------------------------
      // AMBIL DATA
      // --------------------------------------------------------
      const data = result?.data;

      if (!Array.isArray(data)) {
        throw new Error(
          "Format data artikel dari server tidak valid."
        );
      }

      setArticles(data);
    } catch (err) {
      console.error(
        "LOAD ARTIKEL ERROR:",
        err
      );

      setError(
        err?.message ||
          "Terjadi kesalahan saat mengambil artikel."
      );

      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // INITIAL LOAD
  // ============================================================
  useEffect(() => {
    loadArtikel();
  }, []);

  // ============================================================
  // FORMAT DATE
  // ============================================================
  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Intl.DateTimeFormat(
        "id-ID",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ).format(new Date(date));
    } catch {
      return "-";
    }
  };

  // ============================================================
  // IMAGE FALLBACK
  // ============================================================
  const getImage = (article) => {
    if (
      article?.gambarUtama &&
      article.gambarUtama.trim() !== ""
    ) {
      return article.gambarUtama;
    }

    return null;
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* ======================================================
          NAVBAR
      ====================================================== */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

          {/* LOGO */}
          <Link
            href="/website"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white shadow-lg">
              <School size={23} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">
                Smart School
              </h1>

              <p className="text-xs text-slate-500">
                Portal Sekolah
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 md:flex">

            <Link
              href="/website"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
            >
              Beranda
            </Link>

            <Link
              href="/website/tentang"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
            >
              Tentang
            </Link>

            <Link
              href="/website/akademik"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
            >
              Akademik
            </Link>

            <Link
              href="/website/articles"
              className="text-sm font-semibold text-blue-700"
            >
              Artikel
            </Link>

            <Link
              href="/website/kontak"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
            >
              Kontak
            </Link>

          </nav>

          {/* MOBILE */}
          <button
            type="button"
            onClick={() =>
              setMobileMenu((prev) => !prev)
            }
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
            aria-label="Menu"
          >
            {mobileMenu ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>

        </div>

        {/* MOBILE NAV */}
        {mobileMenu && (
          <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">

            <nav className="flex flex-col gap-4">

              <Link
                href="/website"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="font-medium text-slate-600"
              >
                Beranda
              </Link>

              <Link
                href="/website/tentang"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="font-medium text-slate-600"
              >
                Tentang
              </Link>

              <Link
                href="/website/akademik"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="font-medium text-slate-600"
              >
                Akademik
              </Link>

              <Link
                href="/website/articles"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="font-semibold text-blue-700"
              >
                Artikel
              </Link>

              <Link
                href="/website/kontak"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="font-medium text-slate-600"
              >
                Kontak
              </Link>

            </nav>

          </div>
        )}

      </header>

      {/* ======================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-slate-900">

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

          <Link
            href="/website"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-blue-300 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </Link>

          <div className="max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              <Newspaper size={17} />
              Informasi Sekolah
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Artikel Sekolah
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Temukan informasi, berita, kegiatan,
              dan berbagai artikel terbaru dari
              Smart School.
            </p>

          </div>
        </div>

      </section>

      {/* ======================================================
          CONTENT
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

        {/* ====================================================
            LOADING
        ==================================================== */}
        {loading && (
          <div className="flex min-h-[350px] items-center justify-center border border-slate-200 bg-white shadow-sm">

            <div className="flex flex-col items-center gap-4 text-center">

              <Loader2
                size={34}
                className="animate-spin text-blue-700"
              />

              <div>
                <p className="font-medium text-slate-700">
                  Memuat artikel...
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Mengambil artikel terbaru dari server.
                </p>
              </div>

            </div>

          </div>
        )}

        {/* ====================================================
            ERROR
        ==================================================== */}
        {!loading && error && (
          <div className="border border-red-200 bg-red-50 p-8 shadow-sm">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                <AlertCircle size={22} />
              </div>

              <div className="flex-1">

                <h3 className="font-semibold text-red-800">
                  Gagal memuat artikel
                </h3>

                <p className="mt-2 text-sm leading-6 text-red-700">
                  {error}
                </p>

                {/* REQUEST DEBUG */}
                <div className="mt-4 border border-red-200 bg-white p-4">

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Request API
                  </p>

                  <p className="mt-2 break-all font-mono text-xs text-slate-600">
                    {API_URL}/api/v1/publik/
                    {SUBDOMAIN}/artikel
                  </p>

                </div>

                <button
                  type="button"
                  onClick={loadArtikel}
                  className="mt-5 inline-flex items-center gap-2 border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50"
                >
                  <RefreshCw size={16} />
                  Coba Lagi
                </button>

              </div>
            </div>

          </div>
        )}

        {/* ====================================================
            EMPTY
        ==================================================== */}
        {!loading &&
          !error &&
          articles.length === 0 && (
            <div className="border border-slate-200 bg-white p-12 text-center shadow-sm">

              <Newspaper
                size={42}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Belum ada artikel
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Belum terdapat artikel yang
                dipublikasikan oleh sekolah.
              </p>

            </div>
          )}

        {/* ====================================================
            ARTICLE GRID
        ==================================================== */}
        {!loading &&
          !error &&
          articles.length > 0 && (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

              {articles.map((article) => {

                const image = getImage(article);

                return (
                  <article
                    key={article.id}
                    className="group flex h-full flex-col overflow-hidden border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >

                    {/* IMAGE */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">

                      {image ? (
                        <img
                          src={image}
                          alt={article.judul || "Artikel sekolah"}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Newspaper
                            size={42}
                            className="text-slate-300"
                          />
                        </div>
                      )}

                      {/* CATEGORY */}
                      {article.kategoriArtikel?.nama && (
                        <div className="absolute left-4 top-4">
                          <span className="inline-flex items-center border border-white/20 bg-slate-900/85 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                            {article.kategoriArtikel.nama}
                          </span>
                        </div>
                      )}

                    </div>

                    {/* BODY */}
                    <div className="flex flex-1 flex-col p-6">

                      {/* DATE */}
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-400">

                        <CalendarDays size={14} />

                        <span>
                          {formatDate(
                            article.dibuatPada ||
                              article.createdAt
                          )}
                        </span>

                      </div>

                      {/* TITLE */}
                      <h3 className="mt-3 line-clamp-2 text-xl font-bold leading-7 text-slate-900 transition group-hover:text-blue-700">
                        {article.judul}
                      </h3>

                      {/* SUMMARY */}
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                        {article.ringkasan ||
                          "Baca informasi selengkapnya mengenai artikel ini."}
                      </p>

                      {/* BUTTON */}
                      <div className="mt-auto pt-6">

                        <Link
                          href={`/website/articles/${article.id}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-800"
                        >
                          Baca Selengkapnya

                          <ArrowRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </Link>

                      </div>

                    </div>

                  </article>
                );
              })}

            </div>
          )}

      </section>

      {/* ======================================================
          FOOTER
      ====================================================== */}
      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">

          <div>
            <p className="font-semibold text-slate-900">
              Smart School
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Portal informasi sekolah
            </p>
          </div>

          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Smart School
          </p>

        </div>

      </footer>

    </main>
  );
}