"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  File,
  Plus,
  Save,
  X,
  Home,
  AlertCircle,
  CheckCircle2,
  Globe,
  Sparkles,
  Layout,
  Type,
  Link2,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header"; // ✅ IMPORT HEADER
import RichTextEditor from "../../../components/cms/RichTextEditor";

// ============================================================
// VALIDATION
// ============================================================

const pageSchema = z.object({
  title: z
    .string()
    .min(3, "Judul minimal 3 karakter"),

  slug: z
    .string()
    .min(3, "Slug minimal 3 karakter")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug hanya boleh menggunakan huruf kecil, angka, dan strip (-)"
    ),

  content: z
    .string()
    .min(10, "Konten minimal 10 karakter"),

  is_homepage: z.boolean().optional(),
});

// ============================================================
// PAGE
// ============================================================

export default function CreatePagePage() {
  const router = useRouter();

  const [active, setActive] = useState("pages");
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  // ============================================================
  // FORM
  // ============================================================

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(pageSchema),

    defaultValues: {
      title: "",
      slug: "",
      content: "",
      is_homepage: false,
    },
  });

  const isHomepageChecked = watch("is_homepage");
  const titleValue = watch("title");
  const slugValue = watch("slug");

  // ============================================================
  // TITLE -> SLUG
  // ============================================================

  const handleTitleChange = (e) => {
    const value = e.target.value;

    setValue("title", value, {
      shouldValidate: true,
      shouldDirty: true,
    });

    const generatedSlug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setValue("slug", generatedSlug, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // ============================================================
  // CONTENT
  // ============================================================

  const handleContentChange = (html) => {
    setContent(html);

    setValue("content", html, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // ============================================================
  // SUBMIT
  // ============================================================

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // Simulasi API
      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      console.log("DATA HALAMAN:", data);

      alert("Halaman berhasil disimpan.");

      router.push("/cmsAdmin/pages");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan halaman.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // ERROR FIELD
  // ============================================================

  const FieldError = ({ message }) => {
    if (!message) return null;

    return (
      <p className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-red-500">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        <span>{message}</span>
      </p>
    );
  };

  // ============================================================
  // RETURN
  // ============================================================

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar
        active={active}
        setActive={setActive}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* ======================================================
          CONTENT AREA

          Penting:
          - flex-1
          - min-w-0
          - tidak memakai w-0
          - tidak memakai overflow-hidden pada parent
      ====================================================== */}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* ===== HEADER ===== */}
        <Header
          title="Tambah Halaman Statis"
          user={{
            name: "CMS Admin",
            email: "cms@smartschool.com",
            avatar: "CA",
          }}
        />

        <main className="min-h-screen w-full">
          <div className="w-full px-3 py-4 sm:px-5 sm:py-6 md:px-7 lg:px-9 xl:px-10">
            <div className="mx-auto w-full max-w-[1500px]">

              {/* ==================================================
                  TOP BAR
              ================================================== */}

              <div className="mb-5 flex flex-col gap-4 sm:mb-7 lg:flex-row lg:items-center lg:justify-between">

                {/* BREADCRUMB */}

                <div className="flex min-w-0 flex-wrap items-center gap-2 text-xs sm:text-sm">
                  <Link
                    href="/cmsAdmin"
                    className="font-medium text-slate-400 transition-colors hover:text-purple-600"
                  >
                    Dashboard
                  </Link>

                  <span className="text-slate-300">/</span>

                  <Link
                    href="/cmsAdmin/pages"
                    className="font-medium text-slate-400 transition-colors hover:text-purple-600"
                  >
                    Halaman Statis
                  </Link>

                  <span className="text-slate-300">/</span>

                  <span className="font-semibold text-slate-700">
                    Tambah Halaman
                  </span>
                </div>

                {/* BACK */}

                <Link
                  href="/cmsAdmin/pages"
                  className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Kembali
                </Link>
              </div>

              {/* ==================================================
                  PREMIUM HEADER
              ================================================== */}

              <section className="relative mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 shadow-xl shadow-slate-900/10">

                {/* DECORATIVE */}

                <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

                <div className="pointer-events-none absolute right-1/4 top-1/2 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

                <div className="relative p-5 sm:p-7 md:p-8 lg:p-9">
                  <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

                    {/* TITLE */}

                    <div className="flex min-w-0 items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-lg backdrop-blur-md sm:h-14 sm:w-14">
                        <File className="h-6 w-6 text-purple-200 sm:h-7 sm:w-7" />
                      </div>

                      <div className="min-w-0">
                        <div className="mb-1.5 flex items-center gap-2">
                          <Sparkles className="h-3.5 w-3.5 text-purple-300" />

                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-200">
                            CMS Management
                          </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                          Tambah Halaman Statis
                        </h1>

                        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-300 sm:text-sm">
                          Buat halaman baru untuk website sekolah
                          dengan tampilan profesional dan konten
                          yang mudah dikelola.
                        </p>
                      </div>
                    </div>

                    {/* STATUS */}

                    <div className="flex w-full shrink-0 items-center gap-3 sm:w-auto">
                      <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md sm:flex-none">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/15">
                          <Layout className="h-4 w-4 text-purple-200" />
                        </div>

                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                            Status
                          </p>

                          <p className="text-sm font-semibold text-white">
                            Halaman Baru
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* ==================================================
                  MAIN GRID
              ================================================== */}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">

                  {/* =================================================
                      LEFT CONTENT
                  ================================================= */}

                  <div className="min-w-0 space-y-6">

                    {/* ================= INFORMASI ================= */}

                    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">

                      <div className="border-b border-slate-100 bg-gradient-to-r from-purple-50 via-white to-white px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                            <File className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">
                            <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                              Informasi Halaman
                            </h2>

                            <p className="mt-0.5 text-xs text-slate-400">
                              Tentukan informasi dasar halaman
                            </p>
                          </div>

                        </div>
                      </div>

                      <div className="space-y-6 p-5 sm:p-6 md:p-7">

                        {/* TITLE */}

                        <div>
                          <label
                            htmlFor="title"
                            className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
                          >
                            <Type className="h-4 w-4 text-purple-500" />

                            Judul Halaman

                            <span className="text-red-500">*</span>
                          </label>

                          <input
                            id="title"
                            type="text"
                            autoComplete="off"
                            value={titleValue || ""}
                            onChange={handleTitleChange}
                            placeholder="Contoh: Tentang Kami"
                            className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:bg-white focus:bg-white focus:ring-4 ${
                              errors.title
                                ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                                : "border-slate-200 focus:border-purple-500 focus:ring-purple-500/10"
                            }`}
                          />

                          <FieldError
                            message={errors.title?.message}
                          />
                        </div>

                        {/* SLUG */}

                        <div>
                          <label
                            htmlFor="slug"
                            className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
                          >
                            <Link2 className="h-4 w-4 text-purple-500" />

                            Slug

                            <span className="text-red-500">*</span>
                          </label>

                          <div className="relative">
                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                              /
                            </span>

                            <input
                              id="slug"
                              {...register("slug")}
                              type="text"
                              autoComplete="off"
                              placeholder="tentang-kami"
                              className={`w-full rounded-xl border bg-slate-50 py-3 pl-8 pr-4 font-mono text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:bg-white focus:bg-white focus:ring-4 ${
                                errors.slug
                                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                                  : "border-slate-200 focus:border-purple-500 focus:ring-purple-500/10"
                              }`}
                            />
                          </div>

                          <FieldError
                            message={errors.slug?.message}
                          />

                          {!errors.slug && (
                            <p className="mt-2 text-xs text-slate-400">
                              Gunakan huruf kecil, angka, dan strip (-).
                            </p>
                          )}
                        </div>

                      </div>
                    </section>

                    {/* ================= CONTENT ================= */}

                    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">

                      <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50 via-white to-white px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                            <File className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">
                            <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                              Konten Halaman
                            </h2>

                            <p className="mt-0.5 text-xs text-slate-400">
                              Tulis konten yang akan ditampilkan
                            </p>
                          </div>

                        </div>
                      </div>

                      <div className="min-w-0 p-5 sm:p-6 md:p-7">

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Isi Konten
                          <span className="ml-1 text-red-500">*</span>
                        </label>

                        <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white transition-all focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-500/10">
                          <RichTextEditor
                            value={content}
                            onChange={handleContentChange}
                          />
                        </div>

                        <FieldError
                          message={errors.content?.message}
                        />

                        <div className="mt-3 flex flex-col gap-1 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                          <span>
                            Gunakan format teks yang konsisten agar halaman terlihat profesional.
                          </span>

                          <span className="shrink-0 font-medium">
                            {content?.replace(/<[^>]*>/g, "").length || 0} karakter
                          </span>
                        </div>

                      </div>
                    </section>

                    {/* ================= HOMEPAGE ================= */}

                    <section
                      className={`overflow-hidden rounded-2xl border transition-all ${
                        isHomepageChecked
                          ? "border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-sm"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <div className="p-5 sm:p-6">

                        <label
                          htmlFor="is_homepage"
                          className="flex cursor-pointer items-start gap-4"
                        >

                          <div className="flex shrink-0 items-center pt-0.5">
                            <input
                              id="is_homepage"
                              type="checkbox"
                              {...register("is_homepage")}
                              className="h-5 w-5 cursor-pointer rounded-md border-slate-300 text-purple-600 focus:ring-2 focus:ring-purple-500"
                            />
                          </div>

                          <div className="min-w-0 flex-1">

                            <div className="flex items-center gap-2">
                              <Home className="h-5 w-5 shrink-0 text-purple-500" />

                              <span className="text-sm font-bold text-slate-800 sm:text-base">
                                Jadikan sebagai halaman beranda
                              </span>
                            </div>

                            <p className="mt-1.5 text-xs leading-relaxed text-slate-500 sm:text-sm">
                              {isHomepageChecked
                                ? "Halaman ini akan digunakan sebagai halaman utama website."
                                : "Centang jika halaman ini ingin digunakan sebagai halaman utama website."}
                            </p>

                          </div>

                          {isHomepageChecked && (
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-purple-600" />
                          )}

                        </label>

                      </div>
                    </section>

                  </div>

                  {/* =================================================
                      RIGHT SIDEBAR SETTINGS
                  ================================================= */}

                  <aside className="min-w-0 space-y-6">

                    {/* PREVIEW */}

                    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-purple-50 px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-purple-500" />

                          <h2 className="text-sm font-bold text-slate-800">
                            Preview URL
                          </h2>
                        </div>
                      </div>

                      <div className="p-5">

                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            URL Halaman
                          </p>

                          <p className="mt-2 break-all text-xs font-semibold leading-relaxed text-purple-600">
                            smartschool.id/
                            {slugValue || "nama-halaman"}
                          </p>

                        </div>

                        <div className="mt-4 flex items-start gap-3 rounded-xl bg-emerald-50 p-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />

                          <div>
                            <p className="text-xs font-semibold text-emerald-700">
                              Struktur URL siap
                            </p>

                            <p className="mt-0.5 text-[11px] leading-relaxed text-emerald-600">
                              URL akan dibuat berdasarkan slug halaman.
                            </p>
                          </div>
                        </div>

                      </div>
                    </section>

                    {/* PAGE INFO */}

                    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                      <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Layout className="h-4 w-4 text-indigo-500" />

                          <h2 className="text-sm font-bold text-slate-800">
                            Ringkasan Halaman
                          </h2>
                        </div>
                      </div>

                      <div className="space-y-4 p-5">

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Judul
                          </p>

                          <p className="mt-1 break-words text-sm font-semibold text-slate-700">
                            {titleValue || "Belum diisi"}
                          </p>
                        </div>

                        <div className="h-px bg-slate-100" />

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Tipe
                          </p>

                          <p className="mt-1 text-sm font-semibold text-slate-700">
                            Halaman Statis
                          </p>
                        </div>

                        <div className="h-px bg-slate-100" />

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Beranda
                          </p>

                          <p className="mt-1 text-sm font-semibold text-slate-700">
                            {isHomepageChecked
                              ? "Ya"
                              : "Tidak"}
                          </p>
                        </div>

                      </div>
                    </section>

                    {/* TIPS */}

                    <section className="overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 via-indigo-50 to-white p-5">

                      <div className="flex items-start gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                          <Sparkles className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-slate-800">
                            Tips Halaman
                          </h3>

                          <ul className="mt-2 space-y-2 text-xs leading-relaxed text-slate-600">
                            <li>
                              • Gunakan judul yang singkat dan jelas.
                            </li>

                            <li>
                              • Buat slug yang mudah dibaca.
                            </li>

                            <li>
                              • Gunakan struktur paragraf yang rapi.
                            </li>

                            <li>
                              • Pastikan konten sudah diperiksa sebelum disimpan.
                            </li>
                          </ul>
                        </div>

                      </div>
                    </section>

                  </aside>
                </div>

                {/* ==================================================
                    ACTION BAR
                ================================================== */}

                <div className="mt-6">

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      <div className="hidden min-w-0 items-center gap-2 text-xs text-slate-400 md:flex">
                        <File className="h-4 w-4 shrink-0" />

                        <span className="truncate">
                          Pastikan semua informasi sudah benar sebelum menyimpan.
                        </span>
                      </div>

                      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:justify-end">

                        {/* BATAL */}

                        <button
                          type="button"
                          onClick={() => router.back()}
                          disabled={loading}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                        >
                          <X className="h-4 w-4" />
                          Batal
                        </button>

                        {/* SIMPAN */}

                        <button
                          type="submit"
                          disabled={loading}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                          {loading ? (
                            <>
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                              Menyimpan...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4" />

                              Simpan Halaman
                            </>
                          )}
                        </button>

                      </div>
                    </div>

                  </div>
                </div>
              </form>

              {/* ==================================================
                  FOOTER
              ================================================== */}

              <footer className="py-8 text-center">
                <p className="text-xs text-slate-400">
                  © 2026 SmartSchool • CMS Management
                </p>
              </footer>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}