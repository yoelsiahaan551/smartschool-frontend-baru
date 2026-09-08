"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  Loader2,
  AlertCircle,
  Menu,
  X,
  School,
  MessageCircle,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const SUBDOMAIN = "smart";

// ============================================================
// SLUG KONTAK DARI DATABASE
// ============================================================
const SLUG_KONTAK = "kontak-1788757150853";

export default function KontakPage() {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchKontak() {
      try {
        if (!API_URL) {
          throw new Error(
            "NEXT_PUBLIC_API_URL belum dikonfigurasi."
          );
        }

        if (!SLUG_KONTAK) {
          throw new Error(
            "Slug halaman kontak belum diatur."
          );
        }

        const response = await fetch(
          `${API_URL}/api/v1/publik/${SUBDOMAIN}/halaman/${SLUG_KONTAK}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message ||
              result?.error ||
              "Gagal mengambil data halaman kontak."
          );
        }

        if (!mounted) return;

        setPage(result?.data || null);
      } catch (err) {
        console.error("FETCH KONTAK ERROR:", err);

        if (!mounted) return;

        setError(
          err?.message ||
            "Terjadi kesalahan saat mengambil data kontak."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchKontak();

    return () => {
      mounted = false;
    };
  }, []);

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
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white shadow-lg shadow-blue-700/20">
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
              className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700"
            >
              Beranda
            </Link>

            <Link
              href="/website/tentang"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700"
            >
              Tentang
            </Link>

            <Link
              href="/website/akademik"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700"
            >
              Akademik
            </Link>

            <Link
              href="/website/articles"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700"
            >
              Artikel
            </Link>

            <Link
              href="/website/kontak"
              className="text-sm font-semibold text-blue-700"
            >
              Kontak
            </Link>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            aria-label={
              mobileMenu ? "Tutup menu" : "Buka menu"
            }
            aria-expanded={mobileMenu}
            onClick={() =>
              setMobileMenu((current) => !current)
            }
            className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
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
                onClick={() => setMobileMenu(false)}
                className="font-medium text-slate-600 transition-colors hover:text-blue-700"
              >
                Beranda
              </Link>

              <Link
                href="/website/tentang"
                onClick={() => setMobileMenu(false)}
                className="font-medium text-slate-600 transition-colors hover:text-blue-700"
              >
                Tentang
              </Link>

              <Link
                href="/website/akademik"
                onClick={() => setMobileMenu(false)}
                className="font-medium text-slate-600 transition-colors hover:text-blue-700"
              >
                Akademik
              </Link>

              <Link
                href="/website/articles"
                onClick={() => setMobileMenu(false)}
                className="font-medium text-slate-600 transition-colors hover:text-blue-700"
              >
                Artikel
              </Link>

              <Link
                href="/website/kontak"
                onClick={() => setMobileMenu(false)}
                className="font-semibold text-blue-700"
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
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <Link
            href="/website"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-blue-300 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </Link>

          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              <MessageCircle size={17} />
              Hubungi Kami
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {page?.judul || "Kontak"}
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Temukan informasi kontak dan layanan
              komunikasi sekolah melalui halaman ini.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================
          CONTACT CARDS
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <ContactCard
            icon={<MapPin size={21} />}
            title="Alamat"
            description="Informasi alamat sekolah dapat dilihat pada informasi kontak di bawah."
            iconClass="bg-blue-50 text-blue-700"
          />

          <ContactCard
            icon={<Phone size={21} />}
            title="Telepon"
            description="Hubungi pihak sekolah melalui nomor telepon resmi."
            iconClass="bg-indigo-50 text-indigo-700"
          />

          <ContactCard
            icon={<Mail size={21} />}
            title="Email"
            description="Kirim pertanyaan melalui email resmi sekolah."
            iconClass="bg-sky-50 text-sky-700"
          />

          <ContactCard
            icon={<Clock size={21} />}
            title="Jam Layanan"
            description="Informasi waktu pelayanan sekolah tersedia melalui konten halaman."
            iconClass="bg-emerald-50 text-emerald-700"
          />
        </div>
      </section>

      {/* ======================================================
          BACKEND CONTENT
      ====================================================== */}
      <section className="mx-auto max-w-5xl px-6 pb-20 lg:px-8">
        {/* LOADING */}
        {loading && (
          <div className="flex min-h-[350px] items-center justify-center border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50">
                <Loader2
                  size={30}
                  className="animate-spin text-blue-700"
                />
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Memuat informasi kontak
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Mengambil data dari server...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="border border-red-200 bg-white p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <AlertCircle size={22} />
              </div>

              <div className="min-w-0">
                <h3 className="font-semibold text-slate-900">
                  Gagal memuat halaman kontak
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    window.location.reload()
                  }
                  className="mt-5 inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && !page && (
          <div className="border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100">
              <Mail
                size={28}
                className="text-slate-400"
              />
            </div>

            <h3 className="mt-5 font-semibold text-slate-900">
              Informasi kontak belum tersedia
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Halaman kontak belum memiliki data.
            </p>
          </div>
        )}

        {/* CONTENT */}
        {!loading && !error && page && (
          <article className="overflow-hidden border border-slate-200 bg-white shadow-sm">
            {/* HEADER CONTENT */}
            <div className="border-b border-slate-200 px-6 py-7 sm:px-10">
              <div className="flex items-center gap-3 text-sm text-blue-700">
                <MessageCircle size={18} />

                <span className="font-semibold">
                  Informasi Kontak
                </span>
              </div>

              <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                {page.judul}
              </h1>
            </div>

            {/* HTML CONTENT DARI CMS */}
            <div className="px-6 py-8 sm:px-10 sm:py-10">
              {page.konten ? (
                <div
                  className="
                    max-w-none
                    text-[15px]
                    leading-8
                    text-slate-600

                    [&_p]:mb-5
                    [&_p:last-child]:mb-0

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

                    [&_ul]:mb-5
                    [&_ul]:list-disc
                    [&_ul]:pl-6

                    [&_ol]:mb-5
                    [&_ol]:list-decimal
                    [&_ol]:pl-6

                    [&_li]:mb-2

                    [&_strong]:font-semibold
                    [&_strong]:text-slate-900

                    [&_em]:italic

                    [&_blockquote]:my-6
                    [&_blockquote]:border-l-4
                    [&_blockquote]:border-blue-600
                    [&_blockquote]:pl-5
                    [&_blockquote]:italic
                    [&_blockquote]:text-slate-500

                    [&_a]:font-medium
                    [&_a]:text-blue-700
                    [&_a]:underline
                    [&_a]:underline-offset-2
                  "
                  dangerouslySetInnerHTML={{
                    __html: page.konten,
                  }}
                />
              ) : (
                <p className="text-sm text-slate-500">
                  Konten belum tersedia.
                </p>
              )}
            </div>
          </article>
        )}
      </section>

      {/* ======================================================
          FOOTER
      ====================================================== */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* BRAND */}
            <div>
              <p className="font-semibold text-slate-900">
                Smart School
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Portal informasi sekolah
              </p>
            </div>

            {/* FOOTER NAV */}
            <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link
                href="/website"
                className="text-slate-500 transition-colors hover:text-blue-700"
              >
                Beranda
              </Link>

              <Link
                href="/website/tentang"
                className="text-slate-500 transition-colors hover:text-blue-700"
              >
                Tentang
              </Link>

              <Link
                href="/website/akademik"
                className="text-slate-500 transition-colors hover:text-blue-700"
              >
                Akademik
              </Link>

              <Link
                href="/website/articles"
                className="text-slate-500 transition-colors hover:text-blue-700"
              >
                Artikel
              </Link>

              <Link
                href="/website/kontak"
                className="font-medium text-blue-700"
              >
                Kontak
              </Link>
            </nav>

            {/* COPYRIGHT */}
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Smart School
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ============================================================
   CONTACT CARD
============================================================ */

function ContactCard({
  icon,
  title,
  description,
  iconClass,
}) {
  return (
    <div className="border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div
        className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <h3 className="font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}