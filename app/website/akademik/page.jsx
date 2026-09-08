"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  GraduationCap,
  Loader2,
  AlertCircle,
  Menu,
  X,
  School,
  Users,
  Award,
  Building2,
  RefreshCw,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ============================================================
// SUBDOMAIN SEKOLAH
// ============================================================
const SUBDOMAIN = "smart";

// ============================================================
// SLUG AKADEMIK DARI DATABASE
//
// WAJIB sama persis dengan kolom `slug` pada tabel halaman_cms.
//
// Contoh:
// akademik-1788759936763
// ============================================================
const SLUG_AKADEMIK = "akademik-1788759936763";

export default function AkademikPage() {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [mobileMenu, setMobileMenu] = useState(false);

  // ============================================================
  // FETCH DATA AKADEMIK
  // ============================================================
  useEffect(() => {
    const fetchAkademik = async () => {
      try {
        setLoading(true);
        setError("");
        setPage(null);

        // ------------------------------------------------------
        // CEK API URL
        // ------------------------------------------------------
        if (!API_URL) {
          throw new Error(
            "NEXT_PUBLIC_API_URL belum dikonfigurasi."
          );
        }

        // ------------------------------------------------------
        // CEK SUBDOMAIN
        // ------------------------------------------------------
        if (!SUBDOMAIN) {
          throw new Error(
            "Subdomain sekolah belum dikonfigurasi."
          );
        }

        // ------------------------------------------------------
        // CEK SLUG
        // ------------------------------------------------------
        if (!SLUG_AKADEMIK) {
          throw new Error(
            "Slug halaman akademik belum dikonfigurasi."
          );
        }

        // ------------------------------------------------------
        // URL PUBLIC BACKEND
        //
        // GET
        // /api/v1/publik/:subdomain/halaman/:slug
        // ------------------------------------------------------
        const url =
          `${API_URL}/api/v1/publik/` +
          `${encodeURIComponent(SUBDOMAIN)}/halaman/` +
          `${encodeURIComponent(SLUG_AKADEMIK)}`;

        console.log(
          "FETCH AKADEMIK:",
          url
        );

        // ------------------------------------------------------
        // FETCH
        // ------------------------------------------------------
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },

          // Supaya browser tidak terlalu mudah menggunakan
          // response cache lama ketika admin mengedit CMS.
          cache: "no-store",
        });

        // ------------------------------------------------------
        // PARSE RESPONSE
        // ------------------------------------------------------
        let result = null;

        try {
          result = await response.json();
        } catch (jsonError) {
          console.error(
            "JSON RESPONSE ERROR:",
            jsonError
          );

          throw new Error(
            "Server mengembalikan response yang tidak valid."
          );
        }

        console.log(
          "RESPONSE AKADEMIK:",
          result
        );

        // ------------------------------------------------------
        // HANDLE ERROR BACKEND
        // ------------------------------------------------------
        if (!response.ok) {
          throw new Error(
            result?.message ||
              result?.error ||
              `Gagal mengambil halaman akademik. Status: ${response.status}`
          );
        }

        // ------------------------------------------------------
        // AMBIL DATA
        // ------------------------------------------------------
        const halaman = result?.data;

        if (!halaman) {
          throw new Error(
            "Data halaman akademik tidak ditemukan."
          );
        }

        // ------------------------------------------------------
        // VALIDASI DATA
        // ------------------------------------------------------
        if (!halaman.slug) {
          console.warn(
            "Halaman berhasil diambil tetapi slug tidak tersedia:",
            halaman
          );
        }

        setPage(halaman);
      } catch (err) {
        console.error(
          "FETCH AKADEMIK ERROR:",
          err
        );

        setError(
          err?.message ||
            "Terjadi kesalahan saat mengambil data akademik."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAkademik();
  }, []);

  // ============================================================
  // RETRY
  // ============================================================
  const handleRetry = () => {
    window.location.reload();
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* ======================================================
          NAVBAR
      ====================================================== */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

          {/* ==================================================
              LOGO
          ================================================== */}
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

          {/* ==================================================
              DESKTOP NAVIGATION
          ================================================== */}
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
              className="text-sm font-semibold text-blue-700"
            >
              Akademik
            </Link>

            <Link
              href="/website/articles"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
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

          {/* ==================================================
              MOBILE MENU BUTTON
          ================================================== */}
          <button
            type="button"
            onClick={() =>
              setMobileMenu((prev) => !prev)
            }
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
            aria-label={
              mobileMenu
                ? "Tutup menu"
                : "Buka menu"
            }
          >
            {mobileMenu ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* ==================================================
            MOBILE NAVIGATION
        ================================================== */}
        {mobileMenu && (
          <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
            <nav className="flex flex-col gap-4">

              <Link
                href="/website"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="font-medium text-slate-600 transition hover:text-blue-700"
              >
                Beranda
              </Link>

              <Link
                href="/website/tentang"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="font-medium text-slate-600 transition hover:text-blue-700"
              >
                Tentang
              </Link>

              <Link
                href="/website/akademik"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="font-semibold text-blue-700"
              >
                Akademik
              </Link>

              <Link
                href="/website/articles"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="font-medium text-slate-600 transition hover:text-blue-700"
              >
                Artikel
              </Link>

              <Link
                href="/website/kontak"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="font-medium text-slate-600 transition hover:text-blue-700"
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

        {/* Background decoration */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

          {/* Back */}
          <Link
            href="/website"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-blue-300 transition hover:text-white"
          >
            <ArrowLeft size={16} />

            Kembali ke Beranda
          </Link>

          <div className="max-w-3xl">

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              <GraduationCap size={17} />

              Informasi Akademik
            </div>

            {/* Title */}
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {page?.judul || "Akademik"}
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Informasi mengenai program akademik,
              pembelajaran, dan kegiatan pendidikan
              sekolah.
            </p>

          </div>
        </div>
      </section>

      {/* ======================================================
          QUICK INFORMATION
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* ==================================================
              KURIKULUM
          ================================================== */}
          <div className="border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <BookOpen size={21} />
            </div>

            <h3 className="font-semibold text-slate-900">
              Kurikulum
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Pembelajaran terstruktur sesuai
              kebutuhan peserta didik.
            </p>
          </div>

          {/* ==================================================
              PEMBELAJARAN
          ================================================== */}
          <div className="border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
              <GraduationCap size={21} />
            </div>

            <h3 className="font-semibold text-slate-900">
              Pembelajaran
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Mendukung proses belajar yang aktif
              dan berorientasi pada kompetensi.
            </p>
          </div>

          {/* ==================================================
              PESERTA DIDIK
          ================================================== */}
          <div className="border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
              <Users size={21} />
            </div>

            <h3 className="font-semibold text-slate-900">
              Peserta Didik
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Pengembangan potensi akademik dan
              non-akademik.
            </p>
          </div>

          {/* ==================================================
              PRESTASI
          ================================================== */}
          <div className="border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Award size={21} />
            </div>

            <h3 className="font-semibold text-slate-900">
              Prestasi
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Mendorong peserta didik untuk mencapai
              prestasi terbaik.
            </p>
          </div>

        </div>
      </section>

      {/* ======================================================
          CONTENT FROM CMS / BACKEND
      ====================================================== */}
      <section className="mx-auto max-w-5xl px-6 pb-20 lg:px-8">

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
                  Memuat informasi akademik...
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Mengambil data dari server.
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

              {/* Icon */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                <AlertCircle size={22} />
              </div>

              {/* Content */}
              <div className="flex-1">

                <h3 className="font-semibold text-red-800">
                  Gagal memuat halaman
                </h3>

                <p className="mt-2 text-sm leading-6 text-red-700">
                  {error}
                </p>

                {/* Debug information */}
                <div className="mt-4 rounded-lg border border-red-200 bg-white p-4">

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Informasi Request
                  </p>

                  <p className="mt-2 break-all font-mono text-xs text-slate-600">
                    {API_URL}/api/v1/publik/
                    {SUBDOMAIN}/halaman/
                    {SLUG_AKADEMIK}
                  </p>

                </div>

                {/* Retry */}
                <button
                  type="button"
                  onClick={handleRetry}
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
        {!loading && !error && !page && (
          <div className="border border-slate-200 bg-white p-12 text-center shadow-sm">

            <Building2
              size={42}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-5 text-lg font-semibold text-slate-900">
              Halaman tidak ditemukan
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Informasi akademik belum tersedia
              pada portal sekolah.
            </p>

          </div>
        )}

        {/* ====================================================
            PAGE CONTENT
        ==================================================== */}
        {!loading && !error && page && (
          <article className="overflow-hidden border border-slate-200 bg-white shadow-sm">

            {/* ==================================================
                ARTICLE HEADER
            ================================================== */}
            <div className="border-b border-slate-200 px-6 py-7 sm:px-10">

              <div className="flex items-center gap-3 text-sm text-blue-700">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                  <BookOpen size={18} />
                </div>

                <span className="font-semibold">
                  Informasi Akademik
                </span>

              </div>

              <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {page.judul}
              </h1>

            </div>

            {/* ==================================================
                CMS HTML CONTENT
            ================================================== */}
            <div className="px-6 py-8 sm:px-10 sm:py-10">

              {page.konten ? (
                <div
                  className="
                    prose
                    prose-slate
                    max-w-none

                    text-[15px]
                    leading-8

                    prose-headings:font-bold
                    prose-headings:text-slate-900

                    prose-p:text-slate-600
                    prose-p:leading-8

                    prose-strong:text-slate-900

                    prose-a:text-blue-700
                    prose-a:no-underline
                    hover:prose-a:underline

                    prose-ul:text-slate-600
                    prose-ol:text-slate-600

                    prose-li:text-slate-600
                    prose-li:my-1

                    prose-blockquote:border-blue-600
                    prose-blockquote:text-slate-600

                    prose-img:mx-auto
                    prose-img:my-8
                    prose-img:w-full
                    prose-img:max-h-[520px]
                    prose-img:object-cover
                    prose-img:rounded-xl
                    prose-img:border
                    prose-img:border-slate-200
                    prose-img:shadow-sm
                  "
                  dangerouslySetInnerHTML={{
                    __html: page.konten,
                  }}
                />
              ) : (
                <div className="py-12 text-center">

                  <BookOpen
                    size={40}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-4 text-sm text-slate-500">
                    Konten akademik belum tersedia.
                  </p>

                </div>
              )}

            </div>
          </article>
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