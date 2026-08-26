"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "../../../components/Sidebar";

import {
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Tag,
  Type,
  AlignLeft,
  Eye,
  Save,
  Send,
  X,
  CheckCircle,
  Lightbulb,
  Hash,
  Globe,
  Star,
  UploadCloud,
} from "lucide-react";

export default function CreateArticlePage() {
  const router = useRouter();

  const [active, setActive] = useState("articles");
  const [collapsed, setCollapsed] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    content: "",
    status: "draft",
    featured: false,
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    "Berita Sekolah",
    "Pengumuman",
    "Kegiatan",
    "Prestasi",
    "Artikel",
    "Informasi",
  ];

  // =========================================================
  // HANDLE INPUT
  // =========================================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "title") {
      const generatedSlug = value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-");

      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: generatedSlug,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================================================
  // HANDLE IMAGE
  // =========================================================
  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      alert("File yang dipilih harus berupa gambar.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 5MB.");
      return;
    }

    setImage(selectedFile);

    const previewUrl = URL.createObjectURL(selectedFile);
    setImagePreview(previewUrl);
  };

  const removeImage = () => {
    setImage(null);

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview("");
  };

  // =========================================================
  // SUBMIT
  // =========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Judul artikel wajib diisi.");
      return;
    }

    if (!formData.category) {
      alert("Silakan pilih kategori artikel.");
      return;
    }

    if (!formData.content.trim()) {
      alert("Isi artikel wajib diisi.");
      return;
    }

    setIsLoading(true);

    // Simulasi penyimpanan
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);

      setTimeout(() => {
        router.push("/cmsAdmin/articles");
      }, 1500);
    }, 1500);
  };

  // =========================================================
  // PREVIEW
  // =========================================================
  const handlePreview = () => {
    if (!formData.title && !formData.content) {
      alert("Isi artikel terlebih dahulu sebelum preview.");
      return;
    }

    alert("Preview artikel akan ditampilkan di sini.");
  };

  return (
    <div className="min-h-screen w-full bg-slate-100">

      {/* =====================================================
          LAYOUT
      ===================================================== */}
      <div className="flex min-h-screen w-full">

        {/* ===================================================
            SIDEBAR
        =================================================== */}
        <Sidebar
          active={active}
          setActive={setActive}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        {/* ===================================================
            MAIN CONTENT
        =================================================== */}
        <div className="min-w-0 flex-1">

          <main className="min-h-screen w-full overflow-x-auto">

            <div className="w-full min-w-0 px-3 py-4 sm:px-5 sm:py-6 md:px-7 lg:px-10 xl:px-12">

              <div className="mx-auto w-full max-w-[1800px]">

                {/* =================================================
                    TOP BAR
                ================================================= */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  {/* BREADCRUMB */}
                  <div className="flex min-w-0 items-center gap-2 overflow-hidden text-xs sm:text-sm">

                    <Link
                      href="/cmsAdmin"
                      className="shrink-0 font-medium text-slate-400 transition hover:text-slate-700"
                    >
                      Dashboard
                    </Link>

                    <span className="text-slate-300">
                      /
                    </span>

                    <Link
                      href="/cmsAdmin/articles"
                      className="shrink-0 font-medium text-slate-400 transition hover:text-slate-700"
                    >
                      Artikel
                    </Link>

                    <span className="text-slate-300">
                      /
                    </span>

                    <span className="truncate font-semibold text-slate-700">
                      Tambah Artikel
                    </span>

                  </div>

                  

                </div>

                {/* =================================================
                    NAVY HEADER CARD
                ================================================= */}
                <section className="relative mb-6 overflow-hidden rounded-[26px] border border-slate-700/50 bg-gradient-to-br from-[#0f172a] via-[#172554] to-[#1e293b] shadow-xl shadow-slate-300/50">

                  {/* DECORATION */}
                  <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-white/[0.05]" />

                  <div className="pointer-events-none absolute -bottom-36 right-28 h-80 w-80 rounded-full bg-blue-300/[0.05]" />

                  <div className="pointer-events-none absolute right-[35%] top-[-80px] h-48 w-48 rounded-full border border-white/[0.04]" />

                  <div className="relative p-5 sm:p-6 md:p-8 lg:p-9">

                    <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

                      {/* LEFT HEADER */}
                      <div className="flex min-w-0 items-start gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-inner backdrop-blur-md sm:h-14 sm:w-14">
                          <FileText className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                        </div>

                        <div className="min-w-0">

                          <div className="mb-2 flex flex-wrap items-center gap-2">

                            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-200">
                              CMS
                            </span>

                            <span className="text-xs text-slate-400">
                              Manajemen Konten
                            </span>

                          </div>

                          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                            Tambah Artikel Baru
                          </h1>

                          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-300 sm:text-sm">
                            Buat artikel baru untuk membagikan informasi,
                            berita, kegiatan, dan prestasi sekolah.
                          </p>

                        </div>

                      </div>

                      {/* HEADER ACTION */}
                      <div className="flex shrink-0 flex-wrap gap-2">

                        <button
                          type="button"
                          onClick={handlePreview}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/15"
                        >
                          <Eye className="h-4 w-4" />
                          Preview
                        </button>

                        <Link
                          href="/cmsAdmin/articles"
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-lg transition-all hover:bg-slate-100"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Kembali
                        </Link>

                      </div>

                    </div>

                  </div>

                </section>

                {/* =================================================
                    FORM
                ================================================= */}
                <form onSubmit={handleSubmit}>

                  <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">

                    {/* =================================================
                        LEFT COLUMN
                    ================================================= */}
                    <div className="min-w-0 space-y-6">

                      {/* =============================================
                          INFORMASI ARTIKEL
                      ============================================= */}
                      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-5 py-4 sm:px-6">

                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
                              <FileText className="h-4 w-4" />
                            </div>

                            <div>
                              <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                                Informasi Artikel
                              </h2>

                              <p className="mt-0.5 text-xs text-slate-400">
                                Informasi utama artikel
                              </p>
                            </div>

                          </div>

                        </div>

                        <div className="space-y-5 p-5 sm:p-6">

                          {/* TITLE */}
                          <div>

                            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                              <Type className="h-4 w-4 text-slate-500" />
                              Judul Artikel
                              <span className="text-red-500">*</span>
                            </label>

                            <input
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleChange}
                              placeholder="Contoh: Siswa SmartSchool Raih Juara Nasional"
                              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-500 focus:ring-4 focus:ring-slate-500/10"
                            />

                            <p className="mt-1.5 text-xs text-slate-400">
                              Buat judul yang singkat, jelas, dan menarik.
                            </p>

                          </div>

                          {/* SLUG */}
                          <div>

                            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                              <Hash className="h-4 w-4 text-slate-500" />
                              Slug
                            </label>

                            <div className="flex min-w-0">

                              <span className="inline-flex shrink-0 items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 px-3 text-xs text-slate-400">
                                /artikel/
                              </span>

                              <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="judul-artikel"
                                className="min-w-0 flex-1 rounded-r-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-500/10"
                              />

                            </div>

                          </div>

                          {/* CATEGORY */}
                          <div>

                            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                              <Tag className="h-4 w-4 text-slate-500" />
                              Kategori
                              <span className="text-red-500">*</span>
                            </label>

                            <select
                              name="category"
                              value={formData.category}
                              onChange={handleChange}
                              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all focus:border-slate-500 focus:ring-4 focus:ring-slate-500/10"
                            >
                              <option value="">
                                Pilih kategori artikel
                              </option>

                              {categories.map((category) => (
                                <option
                                  key={category}
                                  value={category}
                                >
                                  {category}
                                </option>
                              ))}
                            </select>

                          </div>

                          {/* EXCERPT */}
                          <div>

                            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                              <AlignLeft className="h-4 w-4 text-slate-500" />
                              Ringkasan Artikel
                            </label>

                            <textarea
                              name="excerpt"
                              value={formData.excerpt}
                              onChange={handleChange}
                              rows={3}
                              placeholder="Tuliskan ringkasan singkat artikel..."
                              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-slate-500 focus:ring-4 focus:ring-slate-500/10"
                            />

                            <p className="mt-1.5 text-xs text-slate-400">
                              Ringkasan akan ditampilkan sebagai deskripsi
                              artikel.
                            </p>

                          </div>

                        </div>

                      </section>

                      {/* =============================================
                          CONTENT
                      ============================================= */}
                      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-5 py-4 sm:px-6">

                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
                              <AlignLeft className="h-4 w-4" />
                            </div>

                            <div>
                              <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                                Isi Artikel
                              </h2>

                              <p className="mt-0.5 text-xs text-slate-400">
                                Tulis isi artikel yang akan ditampilkan
                              </p>
                            </div>

                          </div>

                        </div>

                        <div className="p-5 sm:p-6">

                          {/* TOOLBAR */}
                          <div className="flex flex-wrap items-center gap-1 rounded-t-xl border border-b-0 border-slate-200 bg-slate-50 p-2">

                            <button
                              type="button"
                              className="rounded-lg px-3 py-1.5 text-sm font-bold text-slate-600 transition hover:bg-white"
                            >
                              B
                            </button>

                            <button
                              type="button"
                              className="rounded-lg px-3 py-1.5 text-sm italic text-slate-600 transition hover:bg-white"
                            >
                              I
                            </button>

                            <button
                              type="button"
                              className="rounded-lg px-3 py-1.5 text-sm underline text-slate-600 transition hover:bg-white"
                            >
                              U
                            </button>

                            <div className="mx-1 h-5 w-px bg-slate-200" />

                            <span className="px-2 text-xs text-slate-400">
                              Editor Artikel
                            </span>

                          </div>

                          <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows={16}
                            placeholder="Mulai tulis isi artikel di sini..."
                            className="w-full resize-y rounded-b-xl border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-700 outline-none placeholder:text-slate-400 focus:border-slate-500 focus:ring-4 focus:ring-slate-500/10"
                          />

                          <div className="mt-2 flex justify-between gap-3 text-xs text-slate-400">

                            <span className="hidden sm:block">
                              Gunakan paragraf yang singkat agar mudah dibaca.
                            </span>

                            <span className="ml-auto shrink-0">
                              {formData.content.length} karakter
                            </span>

                          </div>

                        </div>

                      </section>

                      {/* =============================================
                          IMAGE
                      ============================================= */}
                      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-5 py-4 sm:px-6">

                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
                              <ImageIcon className="h-4 w-4" />
                            </div>

                            <div>
                              <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                                Gambar Utama
                              </h2>

                              <p className="mt-0.5 text-xs text-slate-400">
                                Gambar thumbnail artikel
                              </p>
                            </div>

                          </div>

                        </div>

                        <div className="p-5 sm:p-6">

                          {imagePreview ? (

                            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">

                              <img
                                src={imagePreview}
                                alt="Preview gambar artikel"
                                className="max-h-[420px] w-full object-cover"
                              />

                              <button
                                type="button"
                                onClick={removeImage}
                                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/95 text-red-500 shadow-lg transition hover:bg-white"
                              >
                                <X className="h-4 w-4" />
                              </button>

                            </div>

                          ) : (

                            <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-12 text-center transition-all hover:border-slate-400 hover:bg-slate-100">

                              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200 text-slate-700 transition group-hover:scale-105">
                                <UploadCloud className="h-7 w-7" />
                              </div>

                              <p className="text-sm font-semibold text-slate-700">
                                Upload gambar utama
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                PNG, JPG atau WEBP • Maksimal 5MB
                              </p>

                              <span className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800">
                                Pilih Gambar
                              </span>

                              <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={handleImageChange}
                                className="hidden"
                              />

                            </label>

                          )}

                        </div>

                      </section>

                    </div>

                    {/* =================================================
                        RIGHT COLUMN
                    ================================================= */}
                    <aside className="min-w-0 space-y-6">

                      {/* =============================================
                          PUBLISH SETTINGS
                      ============================================= */}
                      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-5 py-4">

                          <h2 className="text-sm font-bold text-slate-800">
                            Pengaturan Publikasi
                          </h2>

                        </div>

                        <div className="space-y-5 p-5">

                          <div>

                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                              Status
                            </label>

                            <select
                              name="status"
                              value={formData.status}
                              onChange={handleChange}
                              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-500/10"
                            >
                              <option value="draft">
                                Draft
                              </option>

                              <option value="published">
                                Published
                              </option>
                            </select>

                          </div>

                          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3 transition hover:bg-slate-100">

                            <input
                              type="checkbox"
                              name="featured"
                              checked={formData.featured}
                              onChange={handleChange}
                              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-800 focus:ring-slate-500"
                            />

                            <div>

                              <div className="flex items-center gap-1.5">

                                <Star className="h-3.5 w-3.5 text-amber-500" />

                                <p className="text-sm font-semibold text-slate-700">
                                  Artikel Unggulan
                                </p>

                              </div>

                              <p className="mt-0.5 text-xs text-slate-400">
                                Tampilkan artikel di bagian unggulan website.
                              </p>

                            </div>

                          </label>

                        </div>

                      </section>

                      {/* =============================================
                          SEO
                      ============================================= */}
                      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-5 py-4">

                          <div className="flex items-center gap-2">

                            <Globe className="h-4 w-4 text-slate-600" />

                            <h2 className="text-sm font-bold text-slate-800">
                              SEO & URL
                            </h2>

                          </div>

                        </div>

                        <div className="space-y-4 p-5">

                          <div className="rounded-xl bg-slate-50 p-3">

                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                              URL Preview
                            </p>

                            <p className="mt-1 break-all text-xs font-medium leading-relaxed text-slate-600">
                              smartschool.id/artikel/
                              {formData.slug || "judul-artikel"}
                            </p>

                          </div>

                          <div>

                            <p className="mb-2 text-xs font-semibold text-slate-600">
                              Status SEO
                            </p>

                            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5">

                              <CheckCircle className="h-4 w-4 text-emerald-500" />

                              <span className="text-xs font-medium text-emerald-700">
                                URL siap digunakan
                              </span>

                            </div>

                          </div>

                        </div>

                      </section>

                      {/* =============================================
                          TIPS
                      ============================================= */}
                      <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-5 shadow-lg">

                        <div className="flex items-start gap-3">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                            <Lightbulb className="h-4 w-4" />
                          </div>

                          <div>

                            <h3 className="text-sm font-bold text-white">
                              Tips Artikel
                            </h3>

                            <ul className="mt-3 space-y-2 text-xs leading-relaxed text-slate-300">

                              <li>
                                • Gunakan judul yang jelas dan menarik.
                              </li>

                              <li>
                                • Gunakan gambar yang relevan.
                              </li>

                              <li>
                                • Pisahkan artikel menjadi beberapa paragraf.
                              </li>

                              <li>
                                • Periksa kembali tulisan sebelum publish.
                              </li>

                            </ul>

                          </div>

                        </div>

                      </section>

                    </aside>

                  </div>

                  {/* =================================================
                      ACTION FOOTER
                  ================================================= */}
                  <div className="sticky bottom-0 z-20 mt-6">

                    <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-md sm:p-5">

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                        <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">

                          <FileText className="h-4 w-4" />

                          <span>
                            Pastikan semua data sudah benar sebelum menyimpan.
                          </span>

                        </div>

                        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">

                          <button
                            type="button"
                            onClick={() => router.back()}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50"
                          >
                            <X className="h-4 w-4" />
                            Batal
                          </button>

                          <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                          >

                            {isLoading ? (
                              <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Menyimpan...
                              </>
                            ) : formData.status === "published" ? (
                              <>
                                <Send className="h-4 w-4" />
                                Publikasikan Artikel
                              </>
                            ) : (
                              <>
                                <Save className="h-4 w-4" />
                                Simpan Draft
                              </>
                            )}

                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                </form>

                {/* =================================================
                    SUCCESS NOTIFICATION
                ================================================= */}
                {showSuccess && (
                  <div className="fixed right-4 top-4 z-[100] flex max-w-sm items-center gap-3 rounded-2xl border border-emerald-200 bg-white px-5 py-4 shadow-2xl sm:right-6 sm:top-6">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Artikel berhasil disimpan
                      </p>

                      <p className="text-xs text-slate-400">
                        Mengarahkan ke daftar artikel...
                      </p>
                    </div>

                  </div>
                )}

                {/* =================================================
                    FOOTER
                ================================================= */}
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
    </div>
  );
}