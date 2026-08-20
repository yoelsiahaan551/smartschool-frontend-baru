"use client";

import { useState } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  Save,
  Globe,
  Mail,
  Phone,
  MapPin,
  UploadCloud,
  X,
} from "lucide-react";

export default function IdentitasPage() {
  const [active, setActive] = useState("pengaturan");
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "SmartSchool CMS",
    description:
      "Sistem manajemen sekolah berbasis web terintegrasi.",
    email: "admin@sekolah.sch.id",
    phone: "+62 812 3456 7890",
    address:
      "Jl. Pendidikan No. 1, Kota Smart, Indonesia",
  });

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(
    "https://via.placeholder.com/150"
  );

  const [favicon, setFavicon] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(
    "https://via.placeholder.com/32"
  );

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
  // HANDLE FILE
  // =========================
  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    if (type === "logo") {
      setLogo(file);
      setLogoPreview(url);
    } else {
      setFavicon(file);
      setFaviconPreview(url);
    }
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      alert(
        "✅ Identitas website berhasil disimpan! (Mockup)"
      );
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
      <main className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto bg-slate-50 transition-all duration-300">
        <Header
          title="Identitas Website"
          user={{ name: "Admin" }}
        />

        {/* =====================================================
            CONTENT WRAPPER
        ====================================================== */}
        <div
          className="
            w-full
            min-w-0
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
            space-y-6
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
                Identitas
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
              flex
              flex-col
              sm:flex-row
              sm:items-center
              gap-3
              sm:gap-4
            "
          >
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
              <Globe className="w-5 h-5 text-indigo-600" />
            </div>

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
                Identitas Website
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
                Atur informasi dasar, logo, dan profil
                website sekolah Anda.
              </p>
            </div>
          </section>

          {/* =====================================================
              MAIN CARD
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
                CARD HEADER
            ================================================== */}
            <div
              className="
                px-4
                sm:px-6
                md:px-8
                py-5
                border-b
                border-slate-100
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-3
              "
            >
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Informasi Website
                </h2>

                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Kelola identitas dan informasi utama website sekolah.
                </p>
              </div>

              <div
                className="
                  hidden
                  md:flex
                  items-center
                  gap-2
                  text-xs
                  text-slate-400
                "
              >
                <Globe className="w-4 h-4" />
                Identitas Website
              </div>
            </div>

            {/* =================================================
                CARD BODY
            ================================================== */}
            <div
              className="
                p-4
                sm:p-6
                md:p-8
                space-y-8
              "
            >
              {/* =================================================
                  UPLOAD SECTION
              ================================================== */}
              <section>
                <div className="mb-5">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Branding Website
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Upload logo utama dan favicon yang digunakan
                    pada website.
                  </p>
                </div>

                <div
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-2
                    gap-5
                    lg:gap-6
                  "
                >
                  {/* =================================================
                      LOGO
                  ================================================== */}
                  <div
                    className="
                      min-w-0
                      border
                      border-slate-200
                      rounded-2xl
                      p-4
                      sm:p-5
                      bg-slate-50/40
                    "
                  >
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <label className="text-sm font-semibold text-slate-700">
                        Logo Website
                      </label>

                      <span
                        className="
                          text-[10px]
                          sm:text-xs
                          text-slate-400
                          bg-white
                          px-2.5
                          py-1
                          rounded-full
                          border
                          border-slate-200
                        "
                      >
                        PNG / JPG
                      </span>
                    </div>

                    <div
                      className="
                        relative
                        w-full
                        min-h-[180px]
                        sm:min-h-[200px]
                        border-2
                        border-dashed
                        border-slate-300
                        rounded-2xl
                        p-5
                        flex
                        items-center
                        justify-center
                        bg-white
                        hover:bg-slate-50
                        hover:border-indigo-300
                        transition-all
                        overflow-hidden
                      "
                    >
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        className="
                          max-h-[140px]
                          sm:max-h-[160px]
                          max-w-[80%]
                          object-contain
                        "
                      />

                      <div
                        className="
                          absolute
                          bottom-3
                          left-1/2
                          -translate-x-1/2
                          flex
                          items-center
                          gap-1.5
                          px-3
                          py-1.5
                          rounded-full
                          bg-white/95
                          border
                          border-slate-200
                          shadow-sm
                          text-[10px]
                          sm:text-xs
                          text-slate-500
                          whitespace-nowrap
                          pointer-events-none
                        "
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        Klik untuk mengganti
                      </div>

                      <input
                        type="file"
                        className="
                          absolute
                          inset-0
                          w-full
                          h-full
                          opacity-0
                          cursor-pointer
                        "
                        accept="image/*"
                        onChange={(e) =>
                          handleFileChange(e, "logo")
                        }
                      />
                    </div>

                    <p className="text-[10px] sm:text-xs text-slate-400 mt-3">
                      Disarankan ukuran 150 × 150px.
                    </p>
                  </div>

                  {/* =================================================
                      FAVICON
                  ================================================== */}
                  <div
                    className="
                      min-w-0
                      border
                      border-slate-200
                      rounded-2xl
                      p-4
                      sm:p-5
                      bg-slate-50/40
                    "
                  >
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <label className="text-sm font-semibold text-slate-700">
                        Favicon
                      </label>

                      <span
                        className="
                          text-[10px]
                          sm:text-xs
                          text-slate-400
                          bg-white
                          px-2.5
                          py-1
                          rounded-full
                          border
                          border-slate-200
                        "
                      >
                        ICO / PNG
                      </span>
                    </div>

                    <div
                      className="
                        relative
                        w-full
                        min-h-[180px]
                        sm:min-h-[200px]
                        border-2
                        border-dashed
                        border-slate-300
                        rounded-2xl
                        p-5
                        flex
                        items-center
                        justify-center
                        bg-white
                        hover:bg-slate-50
                        hover:border-indigo-300
                        transition-all
                        overflow-hidden
                      "
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div
                          className="
                            w-20
                            h-20
                            sm:w-24
                            sm:h-24
                            rounded-2xl
                            bg-slate-50
                            border
                            border-slate-200
                            flex
                            items-center
                            justify-center
                            overflow-hidden
                          "
                        >
                          <img
                            src={faviconPreview}
                            alt="Favicon Preview"
                            className="
                              max-w-[64px]
                              max-h-[64px]
                              object-contain
                            "
                          />
                        </div>

                        <span className="text-[10px] sm:text-xs text-slate-400">
                          Preview Favicon
                        </span>
                      </div>

                      <div
                        className="
                          absolute
                          bottom-3
                          left-1/2
                          -translate-x-1/2
                          flex
                          items-center
                          gap-1.5
                          px-3
                          py-1.5
                          rounded-full
                          bg-white/95
                          border
                          border-slate-200
                          shadow-sm
                          text-[10px]
                          sm:text-xs
                          text-slate-500
                          whitespace-nowrap
                          pointer-events-none
                        "
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        Klik untuk mengganti
                      </div>

                      <input
                        type="file"
                        className="
                          absolute
                          inset-0
                          w-full
                          h-full
                          opacity-0
                          cursor-pointer
                        "
                        accept="image/*"
                        onChange={(e) =>
                          handleFileChange(e, "favicon")
                        }
                      />
                    </div>

                    <p className="text-[10px] sm:text-xs text-slate-400 mt-3">
                      Disarankan ukuran 32 × 32px.
                    </p>
                  </div>
                </div>
              </section>

              {/* =================================================
                  DIVIDER
              ================================================== */}
              <div className="h-px bg-slate-100" />

              {/* =================================================
                  BASIC INFORMATION
              ================================================== */}
              <section>
                <div className="mb-5">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Informasi Dasar
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Informasi ini akan digunakan sebagai identitas
                    utama website.
                  </p>
                </div>

                <div
                  className="
                    grid
                    grid-cols-1
                    lg:grid-cols-2
                    gap-5
                    lg:gap-6
                  "
                >
                  {/* NAMA WEBSITE */}
                  <div className="min-w-0">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Nama Website
                    </label>

                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Masukkan nama website"
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
                  </div>

                  {/* EMAIL */}
                  <div className="min-w-0">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      <Mail className="w-4 h-4 inline mr-2 text-slate-400" />
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="admin@sekolah.sch.id"
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
                  </div>

                  {/* DESKRIPSI */}
                  <div className="lg:col-span-2 min-w-0">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Deskripsi Singkat
                    </label>

                    <textarea
                      name="description"
                      rows={4}
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Tulis deskripsi singkat website..."
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
                  </div>

                  {/* TELEPON */}
                  <div className="min-w-0">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      <Phone className="w-4 h-4 inline mr-2 text-slate-400" />
                      Telepon
                    </label>

                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+62 812 xxxx xxxx"
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
                  </div>

                  {/* ALAMAT */}
                  <div className="min-w-0">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      <MapPin className="w-4 h-4 inline mr-2 text-slate-400" />
                      Alamat
                    </label>

                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Alamat sekolah"
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
                  </div>
                </div>
              </section>
            </div>

            {/* =================================================
                FOOTER ACTION
            ================================================== */}
            <div
              className="
                px-4
                sm:px-6
                md:px-8
                py-4
                sm:py-5
                border-t
                border-slate-100
                bg-slate-50/50
                flex
                flex-col
                sm:flex-row
                gap-3
                justify-end
              "
            >
              <button
                type="button"
                onClick={() => window.history.back()}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-6
                  py-2.5
                  w-full
                  sm:w-auto
                  bg-white
                  text-slate-600
                  text-sm
                  font-semibold
                  rounded-xl
                  border
                  border-slate-200
                  hover:bg-slate-50
                  transition-all
                "
              >
                <X className="w-4 h-4" />
                Batal
              </button>

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
                  bg-indigo-600
                  text-white
                  text-sm
                  font-semibold
                  rounded-xl
                  shadow-lg
                  shadow-indigo-600/20
                  hover:bg-indigo-700
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
          </form>
        </div>
      </main>
    </div>
  );
}