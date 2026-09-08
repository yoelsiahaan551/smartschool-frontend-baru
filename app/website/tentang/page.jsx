"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Heart,
  Lightbulb,
  MapPin,
  Phone,
  Mail,
  Target,
  Users,
  Loader2,
  AlertCircle,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const SUBDOMAIN = "smart";

// GANTI dengan slug "Tentang" dari database
const SLUG_TENTANG = "tentang-1788756910687";

export default function TentangPage() {
  const [halaman, setHalaman] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTentang() {
      try {
        setLoading(true);
        setError("");

        if (!API_URL) {
          throw new Error("NEXT_PUBLIC_API_URL belum dikonfigurasi.");
        }

        if (
          !SLUG_TENTANG ||
          SLUG_TENTANG === "GANTI_DENGAN_SLUG_TENTANG"
        ) {
          throw new Error(
            "Slug halaman Tentang belum diatur di frontend."
          );
        }

        const response = await fetch(
          `${API_URL}/api/v1/publik/${SUBDOMAIN}/halaman/${SLUG_TENTANG}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message ||
              result?.error ||
              "Gagal mengambil halaman Tentang."
          );
        }

        setHalaman(result?.data || null);
      } catch (err) {
        console.error("Gagal mengambil halaman Tentang:", err);
        setError(err.message || "Terjadi kesalahan.");
      } finally {
        setLoading(false);
      }
    }

    fetchTentang();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg">
              <Loader2 className="h-7 w-7 animate-spin text-white" />
            </div>

            <p className="text-sm font-medium text-slate-600">
              Memuat informasi sekolah...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-lg rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
              <AlertCircle className="h-7 w-7 text-red-500" />
            </div>

            <h1 className="text-xl font-bold text-slate-900">
              Gagal Memuat Halaman
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!halaman) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">
              Halaman tidak ditemukan
            </h1>

            <p className="mt-2 text-slate-500">
              Informasi Tentang belum tersedia.
            </p>

            <Link
              href="/website"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/website"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>

            <div>
              <p className="text-lg font-bold tracking-tight text-slate-900">
                Smart School
              </p>
              <p className="text-xs font-medium text-slate-500">
                Pendidikan Masa Depan
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/website"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Beranda
            </Link>

            <Link
              href="/website/tentang"
              className="text-sm font-semibold text-blue-600"
            >
              Tentang
            </Link>

            <Link
              href="/website/akademik"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Akademik
            </Link>

            <Link
              href="/website/articles"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Artikel
            </Link>

            <Link
              href="/website/kontak"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Kontak
            </Link>
          </nav>

          <Link
            href="/login"
            className="hidden rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 md:inline-flex"
          >
            Portal Sekolah
          </Link>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-blue-200">
              <BookOpen className="h-4 w-4" />
              Tentang Smart School
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Mengenal{" "}
              <span className="text-blue-400">
                Smart School
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Mengenal lebih dekat sekolah, nilai, visi, dan
              komitmen kami dalam menciptakan pendidikan yang
              berkualitas.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          {/* Main Content */}
          <article>
            <div className="mb-8">
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Tentang Kami
              </span>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                {halaman.judul}
              </h2>
            </div>

            <div
              className="
                prose
                prose-slate
                max-w-none
                prose-headings:text-slate-900
                prose-headings:font-bold
                prose-p:text-slate-600
                prose-p:leading-8
                prose-li:text-slate-600
                prose-strong:text-slate-900
                prose-a:text-blue-600
              "
              dangerouslySetInnerHTML={{
                __html: halaman.konten || "",
              }}
            />

            {/* Kalau konten dari backend masih berupa plain text */}
            {!halaman.konten && (
              <p className="text-slate-500">
                Informasi tentang sekolah belum tersedia.
              </p>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <Target className="h-6 w-6 text-blue-600" />
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                Visi Pendidikan
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Membangun lingkungan pendidikan yang inovatif,
                inklusif, dan berorientasi pada perkembangan
                peserta didik.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                Nilai Kami
              </h3>

              <div className="mt-5 space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                    <Lightbulb className="h-4 w-4 text-blue-600" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Inovatif
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Terus berkembang mengikuti kebutuhan zaman.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                    <Heart className="h-4 w-4 text-blue-600" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Berintegritas
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Menjunjung kejujuran dan tanggung jawab.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Kolaboratif
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Membangun kerja sama antara sekolah,
                      siswa, dan orang tua.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ================= FEATURE ================= */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Mengapa Smart School
            </span>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Pendidikan yang berpusat pada siswa
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Kami mengembangkan lingkungan belajar yang
              mendukung siswa untuk bertumbuh secara akademik
              maupun personal.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<GraduationCap />}
              title="Pembelajaran Berkualitas"
              description="Mendukung proses pembelajaran dengan pendekatan yang relevan dan terarah."
            />

            <FeatureCard
              icon={<Users />}
              title="Komunitas Positif"
              description="Membangun lingkungan sekolah yang aman, kolaboratif, dan mendukung."
            />

            <FeatureCard
              icon={<CheckCircle2 />}
              title="Pengembangan Potensi"
              description="Memberikan ruang bagi siswa untuk mengembangkan kemampuan dan kreativitas."
            />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-blue-600 px-8 py-12 lg:px-14">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-white">
                  Ingin mengetahui lebih lanjut?
                </h2>

                <p className="mt-3 leading-7 text-blue-100">
                  Temukan informasi akademik dan layanan
                  sekolah melalui portal Smart School.
                </p>
              </div>

              <Link
                href="/website/akademik"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                Lihat Akademik
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>

                <div>
                  <p className="font-bold">
                    Smart School
                  </p>
                  <p className="text-xs text-slate-400">
                    Pendidikan Masa Depan
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
                Platform informasi sekolah yang membantu
                memberikan akses informasi pendidikan secara
                mudah dan terintegrasi.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-semibold">
                Navigasi
              </h3>

              <div className="mt-5 space-y-3 text-sm text-slate-400">
                <Link
                  href="/website"
                  className="block hover:text-white"
                >
                  Beranda
                </Link>

                <Link
                  href="/website/tentang"
                  className="block hover:text-white"
                >
                  Tentang
                </Link>

                <Link
                  href="/website/akademik"
                  className="block hover:text-white"
                >
                  Akademik
                </Link>

                <Link
                  href="/website/articles"
                  className="block hover:text-white"
                >
                  Artikel
                </Link>

                <Link
                  href="/website/kontak"
                  className="block hover:text-white"
                >
                  Kontak
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold">
                Kontak
              </h3>

              <div className="mt-5 space-y-4 text-sm text-slate-400">
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-blue-400" />
                  <span>
                    Jakarta, Indonesia
                  </span>
                </div>

                <div className="flex gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-blue-400" />
                  <span>
                    021-12345678
                  </span>
                </div>

                <div className="flex gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-blue-400" />
                  <span>
                    info@smartschool.sch.id
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-500">
            © {new Date().getFullYear()} Smart School. All
            rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <div className="h-6 w-6">
          {icon}
        </div>
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}