"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  Save,
  Search,
  Code,
} from "lucide-react";

export default function SeoPage() {
  const router = useRouter();

  const [active, setActive] = useState("pengaturan");
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    metaTitle: "SmartSchool CMS | Website Resmi Sekolah",
    metaDescription:
      "Sistem manajemen sekolah berbasis web terintegrasi dengan fitur modern.",
    metaKeywords:
      "sekolah, cms, manajemen sekolah, pendaftaran siswa",
    canonicalUrl: "https://sekolah.sch.id",
    gaCode: "UA-12345678-1",
    customHeader: "",
    customFooter: "",
  });

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      alert("✅ Pengaturan SEO berhasil disimpan! (Mockup)");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-slate-50">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <div className="shrink-0">
        <Sidebar
          active={active}
          setActive={setActive}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <main className="flex-1 min-w-0 w-0 overflow-y-auto overflow-x-hidden bg-slate-50 transition-all duration-300">

        {/* HEADER */}
        <Header
          title="SEO"
          user={{ name: "Admin" }}
        />

        {/* =====================================================
            CONTENT WRAPPER
        ====================================================== */}
        <div
          className="
            w-full
            min-w-0
            max-w-[1600px]
            mx-auto
            px-3
            py-5
            sm:px-4
            sm:py-6
            md:px-6
            md:py-8
            lg:px-8
            lg:py-10
            xl:px-10
            2xl:px-12
            space-y-5
            md:space-y-6
          "
        >

          {/* =====================================================
              BREADCRUMB
          ====================================================== */}
          <nav className="w-full min-w-0 overflow-hidden">

            <ol
              className="
                flex
                items-center
                flex-wrap
                gap-x-2
                gap-y-1
                text-xs
                sm:text-sm
                font-medium
                text-slate-500
              "
            >
              <li className="shrink-0">
                <a
                  href="/cmsAdmin"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Dashboard
                </a>
              </li>

              <li className="text-slate-300 shrink-0">
                /
              </li>

              <li className="shrink-0">
                <a
                  href="/cmsAdmin/pengaturan"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Pengaturan
                </a>
              </li>

              <li className="text-slate-300 shrink-0">
                /
              </li>

              <li className="text-indigo-600 font-semibold truncate">
                SEO
              </li>
            </ol>

          </nav>

          {/* =====================================================
              PAGE HEADER
          ====================================================== */}
          <section
            className="
              w-full
              min-w-0
              bg-white
              p-4
              sm:p-5
              md:p-6
              rounded-2xl
              border
              border-slate-200/60
              shadow-sm
            "
          >

            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                gap-3
                sm:gap-4
                min-w-0
              "
            >

              {/* ICON */}
              <div
                className="
                  shrink-0
                  w-fit
                  p-2.5
                  sm:p-3
                  bg-indigo-50
                  rounded-xl
                  sm:rounded-2xl
                  border
                  border-indigo-100
                "
              >
                <Search className="w-5 h-5 text-indigo-600" />
              </div>

              {/* TITLE */}
              <div className="min-w-0">

                <h1
                  className="
                    text-lg
                    sm:text-xl
                    md:text-2xl
                    font-bold
                    tracking-tight
                    text-slate-900
                  "
                >
                  Pengaturan SEO
                </h1>

                <p
                  className="
                    text-xs
                    sm:text-sm
                    text-slate-500
                    mt-0.5
                    leading-relaxed
                  "
                >
                  Optimalkan website agar mudah ditemukan di mesin pencari
                  (Google).
                </p>

              </div>

            </div>

          </section>

          {/* =====================================================
              FORM CARD
          ====================================================== */}
          <form
            onSubmit={handleSubmit}
            className="
              w-full
              min-w-0
              bg-white
              rounded-2xl
              border
              border-slate-200/70
              shadow-sm
              overflow-hidden
            "
          >

            {/* =================================================
                FORM CONTENT
            ================================================== */}
            <div
              className="
                p-4
                sm:p-5
                md:p-6
                lg:p-8
                xl:p-9
              "
            >

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-5
                  md:gap-6
                  min-w-0
                "
              >

                {/* =================================================
                    META TITLE
                ================================================== */}
                <div className="md:col-span-2 min-w-0">

                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Meta Title (Judul Halaman)
                  </label>

                  <input
                    name="metaTitle"
                    value={form.metaTitle}
                    onChange={handleChange}
                    className="
                      w-full
                      min-w-0
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-sm
                      text-slate-800
                      placeholder:text-slate-400
                      focus:outline-none
                      focus:ring-2
                      focus:ring-indigo-500/20
                      focus:border-indigo-500
                      transition-all
                    "
                  />

                  <p className="mt-1 text-xs text-slate-400">
                    Maksimal 60 karakter untuk hasil yang optimal.
                  </p>

                </div>

                {/* =================================================
                    META DESCRIPTION
                ================================================== */}
                <div className="md:col-span-2 min-w-0">

                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Meta Description
                  </label>

                  <textarea
                    name="metaDescription"
                    rows="3"
                    value={form.metaDescription}
                    onChange={handleChange}
                    className="
                      w-full
                      min-w-0
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-sm
                      text-slate-800
                      placeholder:text-slate-400
                      focus:outline-none
                      focus:ring-2
                      focus:ring-indigo-500/20
                      focus:border-indigo-500
                      transition-all
                      resize-none
                    "
                  />

                  <p className="mt-1 text-xs text-slate-400">
                    Maksimal 160 karakter.
                  </p>

                </div>

                {/* =================================================
                    KEYWORDS
                ================================================== */}
                <div className="min-w-0">

                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Keywords (Tag)
                  </label>

                  <input
                    name="metaKeywords"
                    value={form.metaKeywords}
                    onChange={handleChange}
                    className="
                      w-full
                      min-w-0
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-sm
                      text-slate-800
                      focus:outline-none
                      focus:ring-2
                      focus:ring-indigo-500/20
                      focus:border-indigo-500
                      transition-all
                    "
                  />

                </div>

                {/* =================================================
                    CANONICAL URL
                ================================================== */}
                <div className="min-w-0">

                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Canonical URL
                  </label>

                  <input
                    name="canonicalUrl"
                    value={form.canonicalUrl}
                    onChange={handleChange}
                    className="
                      w-full
                      min-w-0
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-sm
                      text-slate-800
                      focus:outline-none
                      focus:ring-2
                      focus:ring-indigo-500/20
                      focus:border-indigo-500
                      transition-all
                    "
                  />

                </div>

                {/* =================================================
                    GOOGLE ANALYTICS
                ================================================== */}
                <div
                  className="
                    md:col-span-2
                    min-w-0
                    border-t
                    border-slate-100
                    pt-6
                  "
                >

                  <label
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-slate-700
                      mb-1.5
                    "
                  >
                    <Code className="w-4 h-4 text-indigo-500 shrink-0" />

                    <span>
                      Google Analytics ID (Tracking ID)
                    </span>
                  </label>

                  <input
                    name="gaCode"
                    value={form.gaCode}
                    onChange={handleChange}
                    placeholder="Contoh: G-XXXXXXXXXX"
                    className="
                      w-full
                      min-w-0
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-sm
                      font-mono
                      text-slate-800
                      placeholder:text-slate-400
                      focus:outline-none
                      focus:ring-2
                      focus:ring-indigo-500/20
                      focus:border-indigo-500
                      transition-all
                    "
                  />

                </div>

                {/* =================================================
                    CUSTOM HEADER
                ================================================== */}
                <div className="md:col-span-2 min-w-0">

                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Custom Script Header
                  </label>

                  <textarea
                    name="customHeader"
                    rows="4"
                    value={form.customHeader}
                    onChange={handleChange}
                    placeholder="<script>...</script>"
                    className="
                      w-full
                      min-w-0
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-sm
                      font-mono
                      text-slate-800
                      placeholder:text-slate-400
                      focus:outline-none
                      focus:ring-2
                      focus:ring-indigo-500/20
                      focus:border-indigo-500
                      transition-all
                      resize-none
                    "
                  />

                </div>

                {/* =================================================
                    CUSTOM FOOTER
                ================================================== */}
                <div className="md:col-span-2 min-w-0">

                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Custom Script Footer
                  </label>

                  <textarea
                    name="customFooter"
                    rows="4"
                    value={form.customFooter}
                    onChange={handleChange}
                    placeholder="<script>...</script>"
                    className="
                      w-full
                      min-w-0
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-sm
                      font-mono
                      text-slate-800
                      placeholder:text-slate-400
                      focus:outline-none
                      focus:ring-2
                      focus:ring-indigo-500/20
                      focus:border-indigo-500
                      transition-all
                      resize-none
                    "
                  />

                </div>

              </div>

            </div>

            {/* =================================================
                ACTION FOOTER
            ================================================== */}
            <div
              className="
                w-full
                border-t
                border-slate-100
                bg-slate-50/50
                px-4
                sm:px-5
                md:px-6
                lg:px-8
                py-4
              "
            >

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-3
                  justify-end
                "
              >

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-8
                    py-2.5
                    w-full
                    sm:w-auto
                    min-w-[180px]
                    bg-indigo-600
                    text-white
                    text-sm
                    font-semibold
                    rounded-xl
                    shadow-lg
                    shadow-indigo-600/20
                    hover:bg-indigo-700
                    hover:shadow-xl
                    active:scale-95
                    transition-all
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >

                  {loading ? (
                    <span className="animate-pulse">
                      Menyimpan...
                    </span>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Simpan Perubahan
                    </>
                  )}

                </button>

              </div>

            </div>

          </form>

        </div>
      </main>
    </div>
  );
}