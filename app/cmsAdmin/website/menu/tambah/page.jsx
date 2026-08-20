"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../../components/Header";
import Sidebar from "../../../../components/Sidebar";
import {
  Save,
  X,
  ArrowLeft,
  Menu as MenuIcon,
  Link as LinkIcon,
  AlertCircle,
} from "lucide-react";

export default function TambahMenuPage() {
  const router = useRouter();

  // =========================
  // SIDEBAR
  // =========================
  const [active, setActive] = useState("menu");
  const [collapsed, setCollapsed] = useState(false);

  // =========================
  // FORM STATE
  // =========================
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!label.trim()) {
      newErrors.label = "Nama menu wajib diisi";
    }

    if (!url.trim()) {
      newErrors.url = "URL/Link wajib diisi";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      alert(
        `✅ Menu "${label}" berhasil ditambahkan! (Mockup sukses)`
      );

      router.push("/cmsAdmin/website/menu");
    }, 1500);
  };

  return (
    <div
      className="
        flex
        min-h-screen
        w-full
        bg-slate-50
        overflow-x-hidden
      "
    >
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
      <main
        className="
          flex-1
          min-w-0
          w-full
          overflow-x-hidden
          overflow-y-auto
          bg-slate-50
          transition-all
          duration-300
        "
      >
        {/* HEADER */}
        <Header
          title="Tambah Menu"
          user={{ name: "Admin" }}
        />

        {/* ===================================================
            CONTENT WRAPPER
        ==================================================== */}
        <div
          className="
            w-full
            min-w-0
            px-3
            py-5
            sm:px-4
            sm:py-6
            md:px-6
            lg:px-8
            xl:px-10
            lg:py-8
          "
        >
          <div
            className="
              w-full
              max-w-5xl
              mx-auto
              min-w-0
              space-y-5
              sm:space-y-6
            "
          >
            {/* =================================================
                BREADCRUMB & BACK
            ================================================== */}
            <div
              className="
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              {/* BREADCRUMB */}
              <nav
                className="
                  min-w-0
                  max-w-full
                  overflow-x-auto
                "
                aria-label="Breadcrumb"
              >
                <ol
                  className="
                    flex
                    items-center
                    gap-2
                    whitespace-nowrap
                    text-xs
                    sm:text-sm
                    font-medium
                    text-slate-500
                    tracking-wide
                  "
                >
                  <li className="shrink-0">
                    <a
                      href="/cmsAdmin"
                      className="
                        hover:text-indigo-600
                        transition-colors
                      "
                    >
                      Dashboard
                    </a>
                  </li>

                  <li className="text-slate-300 shrink-0">
                    /
                  </li>

                  <li className="shrink-0">
                    <a
                      href="/cmsAdmin/website/menu"
                      className="
                        hover:text-indigo-600
                        transition-colors
                      "
                    >
                      Menu
                    </a>
                  </li>

                  <li className="text-slate-300 shrink-0">
                    /
                  </li>

                  <li className="text-indigo-600 font-semibold shrink-0">
                    Tambah Baru
                  </li>
                </ol>
              </nav>

              {/* BACK BUTTON */}
              <button
                type="button"
                onClick={() => router.back()}
                className="
                  inline-flex
                  w-fit
                  shrink-0
                  items-center
                  gap-2
                  text-xs
                  sm:text-sm
                  text-slate-600
                  hover:text-indigo-600
                  transition-colors
                "
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                Kembali
              </button>
            </div>

            {/* =================================================
                TITLE SECTION
            ================================================== */}
            <div
              className="
                flex
                items-start
                gap-3
                sm:gap-4
                min-w-0
              "
            >
              {/* ICON */}
              <div
                className="
                  shrink-0
                  p-2.5
                  sm:p-3
                  bg-indigo-50
                  rounded-xl
                  sm:rounded-2xl
                  border
                  border-indigo-100
                "
              >
                <MenuIcon
                  className="
                    w-5
                    h-5
                    text-indigo-600
                  "
                />
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
                  Tambah Menu Baru
                </h1>

                <p
                  className="
                    text-xs
                    sm:text-sm
                    text-slate-500
                    mt-1
                    leading-relaxed
                    max-w-2xl
                  "
                >
                  Tambahkan item navigasi baru untuk header
                  atau footer website.
                </p>
              </div>
            </div>

            {/* =================================================
                FORM CARD
            ================================================== */}
            <div
              className="
                w-full
                min-w-0
                bg-white
                rounded-xl
                sm:rounded-2xl
                border
                border-slate-200/70
                shadow-sm
                overflow-hidden
              "
            >
              {/* FORM HEADER */}
              <div
                className="
                  border-b
                  border-slate-100
                  px-4
                  sm:px-5
                  md:px-6
                  py-3.5
                  sm:py-4
                  bg-slate-50/60
                "
              >
                <h3
                  className="
                    text-[10px]
                    sm:text-xs
                    font-semibold
                    text-slate-500
                    uppercase
                    tracking-wider
                  "
                >
                  Detail Menu
                </h3>
              </div>

              {/* =================================================
                  FORM
              ================================================== */}
              <form
                onSubmit={handleSubmit}
                className="
                  p-4
                  sm:p-5
                  md:p-6
                  space-y-5
                  sm:space-y-6
                "
              >
                {/* =================================================
                    NAMA MENU
                ================================================== */}
                <div className="min-w-0">
                  <label
                    htmlFor="label"
                    className="
                      block
                      text-xs
                      sm:text-sm
                      font-semibold
                      text-slate-700
                      mb-1.5
                      tracking-wide
                    "
                  >
                    Nama Menu{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <div className="relative min-w-0">
                    <MenuIcon
                      className="
                        absolute
                        left-3
                        sm:left-3.5
                        top-1/2
                        -translate-y-1/2
                        w-4
                        h-4
                        text-slate-400
                        pointer-events-none
                      "
                    />

                    <input
                      id="label"
                      type="text"
                      value={label}
                      onChange={(e) => {
                        setLabel(e.target.value);

                        if (errors.label) {
                          setErrors((prev) => ({
                            ...prev,
                            label: null,
                          }));
                        }
                      }}
                      placeholder="Contoh: Beranda, Profil, Galeri"
                      className={`
                        w-full
                        min-w-0
                        pl-9
                        sm:pl-10
                        pr-3
                        sm:pr-4
                        py-2.5
                        sm:py-3
                        rounded-lg
                        sm:rounded-xl
                        border
                        text-xs
                        sm:text-sm
                        font-medium
                        text-slate-800
                        transition-all
                        duration-200
                        outline-none
                        bg-white
                        ${
                          errors.label
                            ? "border-red-300 ring-1 ring-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                        }
                      `}
                    />
                  </div>

                  {errors.label && (
                    <p
                      className="
                        mt-1.5
                        text-xs
                        sm:text-sm
                        text-red-500
                        flex
                        items-start
                        gap-1.5
                        font-medium
                      "
                    >
                      <AlertCircle
                        className="
                          w-3.5
                          h-3.5
                          shrink-0
                          mt-0.5
                        "
                      />

                      <span>{errors.label}</span>
                    </p>
                  )}
                </div>

                {/* =================================================
                    URL
                ================================================== */}
                <div className="min-w-0">
                  <label
                    htmlFor="url"
                    className="
                      block
                      text-xs
                      sm:text-sm
                      font-semibold
                      text-slate-700
                      mb-1.5
                      tracking-wide
                    "
                  >
                    URL / Tautan{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <div className="relative min-w-0">
                    <LinkIcon
                      className="
                        absolute
                        left-3
                        sm:left-3.5
                        top-1/2
                        -translate-y-1/2
                        w-4
                        h-4
                        text-slate-400
                        pointer-events-none
                      "
                    />

                    <input
                      id="url"
                      type="text"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);

                        if (errors.url) {
                          setErrors((prev) => ({
                            ...prev,
                            url: null,
                          }));
                        }
                      }}
                      placeholder="Contoh: /tentang-kami, /galeri, https://website.com"
                      className={`
                        w-full
                        min-w-0
                        pl-9
                        sm:pl-10
                        pr-3
                        sm:pr-4
                        py-2.5
                        sm:py-3
                        rounded-lg
                        sm:rounded-xl
                        border
                        text-xs
                        sm:text-sm
                        font-medium
                        text-slate-800
                        font-mono
                        transition-all
                        duration-200
                        outline-none
                        bg-white
                        ${
                          errors.url
                            ? "border-red-300 ring-1 ring-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                        }
                      `}
                    />
                  </div>

                  {errors.url ? (
                    <p
                      className="
                        mt-1.5
                        text-xs
                        sm:text-sm
                        text-red-500
                        flex
                        items-start
                        gap-1.5
                        font-medium
                      "
                    >
                      <AlertCircle
                        className="
                          w-3.5
                          h-3.5
                          shrink-0
                          mt-0.5
                        "
                      />

                      <span>{errors.url}</span>
                    </p>
                  ) : (
                    <p
                      className="
                        mt-1.5
                        text-[10px]
                        sm:text-xs
                        text-slate-400
                        flex
                        items-start
                        gap-1
                        leading-relaxed
                      "
                    >
                      <span>
                        Gunakan URL internal (dimulai
                        dengan `/`) atau URL eksternal
                        lengkap.
                      </span>
                    </p>
                  )}
                </div>

                {/* =================================================
                    ACTION BUTTONS
                ================================================== */}
                <div
                  className="
                    pt-5
                    sm:pt-6
                    border-t
                    border-slate-100
                    flex
                    flex-col
                    sm:flex-row
                    gap-2.5
                    sm:gap-3
                    sm:justify-end
                  "
                >
                  {/* BATAL */}
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      px-5
                      sm:px-6
                      py-2.5
                      w-full
                      sm:w-auto
                      border
                      border-slate-200
                      bg-white
                      text-slate-600
                      text-xs
                      sm:text-sm
                      font-semibold
                      rounded-lg
                      sm:rounded-xl
                      hover:bg-slate-50
                      hover:border-slate-300
                      transition-all
                      duration-200
                    "
                  >
                    <X className="w-4 h-4 shrink-0" />
                    Batal
                  </button>

                  {/* SIMPAN */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      px-6
                      sm:px-8
                      py-2.5
                      w-full
                      sm:w-auto
                      bg-indigo-600
                      text-white
                      text-xs
                      sm:text-sm
                      font-semibold
                      rounded-lg
                      sm:rounded-xl
                      shadow-md
                      shadow-indigo-600/20
                      hover:bg-indigo-700
                      hover:shadow-lg
                      hover:shadow-indigo-600/30
                      active:scale-95
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                      transition-all
                      duration-200
                    "
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="
                            animate-spin
                            w-4
                            h-4
                            text-white
                            shrink-0
                          "
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />

                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>

                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 shrink-0" />
                        Simpan Menu
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}