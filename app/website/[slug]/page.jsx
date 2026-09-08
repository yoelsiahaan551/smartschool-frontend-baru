"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  Loader2,
  AlertCircle,
  ArrowLeft,
  Globe2,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const SUBDOMAIN = "smart";

export default function PublicCmsPage() {
  const params = useParams();

  const slug = params?.slug;

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchPage = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/v1/publik/${SUBDOMAIN}/halaman/${slug}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Halaman tidak dapat ditemukan."
          );
        }

        setPage(result?.data || null);
      } catch (err) {
        console.error("Gagal mengambil halaman publik:", err);

        setError(
          err?.message ||
            "Gagal mengambil halaman."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          </div>

          <h2 className="text-sm font-bold text-slate-800">
            Memuat halaman...
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Mengambil konten halaman sekolah.
          </p>
        </div>
      </main>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error || !page) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-5">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-900">
            Halaman Tidak Ditemukan
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error ||
              "Halaman yang kamu cari tidak tersedia."}
          </p>

          <a
            href="/website"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Website
          </a>
        </div>
      </main>
    );
  }

  // ============================================================
  // PUBLIC PAGE
  // ============================================================

  return (
    <main className="min-h-screen bg-[#f8fafc]">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">

          <a
            href="/website"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Globe2 className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                SmartSchool
              </p>

              <p className="text-[11px] text-slate-400">
                Website Sekolah
              </p>
            </div>
          </a>

          <a
            href="/website"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Website Utama
          </a>

        </div>
      </header>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <section className="px-5 py-10 sm:px-6 sm:py-14 lg:px-8">

        <article className="mx-auto max-w-4xl">

          {/* TITLE */}

          <div className="mb-8 border-b border-slate-200 pb-8">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-semibold text-blue-600">
              <Globe2 className="h-3.5 w-3.5" />
              Informasi Sekolah
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {page.judul}
            </h1>

            {page.slug && (
              <p className="mt-3 text-sm text-slate-400">
                smartschool.sch.id/{page.slug}
              </p>
            )}

          </div>

          {/* CONTENT */}

          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              sm:p-8
              lg:p-10

              text-[15px]
              leading-8
              text-slate-700

              [&_h1]:mb-5
              [&_h1]:text-3xl
              [&_h1]:font-bold
              [&_h1]:text-slate-900

              [&_h2]:mb-4
              [&_h2]:mt-8
              [&_h2]:text-2xl
              [&_h2]:font-bold
              [&_h2]:text-slate-900

              [&_h3]:mb-3
              [&_h3]:mt-6
              [&_h3]:text-xl
              [&_h3]:font-bold
              [&_h3]:text-slate-900

              [&_p]:mb-5

              [&_ul]:mb-5
              [&_ul]:list-disc
              [&_ul]:pl-6

              [&_ol]:mb-5
              [&_ol]:list-decimal
              [&_ol]:pl-6

              [&_li]:mb-2

              [&_a]:font-medium
              [&_a]:text-blue-600
              [&_a]:underline

              [&_strong]:font-bold
              [&_strong]:text-slate-900

              [&_blockquote]:my-6
              [&_blockquote]:border-l-4
              [&_blockquote]:border-blue-500
              [&_blockquote]:bg-blue-50
              [&_blockquote]:px-5
              [&_blockquote]:py-3

              [&_img]:my-6
              [&_img]:max-w-full
              [&_img]:rounded-2xl
            "
          >
            {page.konten ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: page.konten,
                }}
              />
            ) : (
              <p className="text-slate-400">
                Halaman ini belum memiliki konten.
              </p>
            )}
          </div>

        </article>

      </section>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-7 text-center sm:px-6 lg:px-8">
          <p className="text-xs text-slate-400">
            © 2026 SmartSchool • Website Sekolah
          </p>
        </div>
      </footer>

    </main>
  );
}