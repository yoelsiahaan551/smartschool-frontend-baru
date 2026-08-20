"use client";

import { useState } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { Save, Share2, Link as LinkIcon } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

export default function SosialMediaPage() {
  const [active, setActive] = useState("pengaturan");
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [platforms, setPlatforms] = useState([
    {
      id: "facebook",
      label: "Facebook",
      url: "https://facebook.com/smartschool",
      enabled: true,
    },
    {
      id: "instagram",
      label: "Instagram",
      url: "https://instagram.com/smartschool",
      enabled: true,
    },
    {
      id: "twitter",
      label: "Twitter / X",
      url: "https://twitter.com/smartschool",
      enabled: false,
    },
    {
      id: "youtube",
      label: "YouTube",
      url: "https://youtube.com/@smartschool",
      enabled: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://linkedin.com/company/smartschool",
      enabled: false,
    },
  ]);

  const activeCount = platforms.filter((p) => p.enabled).length;
  const inactiveCount = platforms.length - activeCount;

  const handleToggle = (id) => {
    setPlatforms((prev) =>
      prev.map((platform) =>
        platform.id === id
          ? { ...platform, enabled: !platform.enabled }
          : platform
      )
    );
  };

  const handleUrlChange = (id, url) => {
    setPlatforms((prev) =>
      prev.map((platform) =>
        platform.id === id ? { ...platform, url } : platform
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("✅ Pengaturan Sosial Media berhasil disimpan! (Mockup)");
    }, 1500);
  };

  const renderIcon = (id) => {
    const iconClass = "w-4 h-4 sm:w-5 sm:h-5";

    switch (id) {
      case "facebook":
        return <FaFacebookF className={iconClass} />;

      case "instagram":
        return <FaInstagram className={iconClass} />;

      case "twitter":
        return <FaTwitter className={iconClass} />;

      case "youtube":
        return <FaYoutube className={iconClass} />;

      case "linkedin":
        return <FaLinkedinIn className={iconClass} />;

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-slate-50">

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
          MAIN
      ====================================================== */}
      <main
        className="
          flex-1
          min-w-0
          w-0
          min-h-screen
          overflow-x-hidden
          overflow-y-auto
          bg-slate-50
          transition-all
          duration-300
        "
      >
        <Header title="Sosial Media" user={{ name: "Admin" }} />

        {/* =====================================================
            CONTENT
            TANPA max-width AGAR SAAT ZOOM OUT
            CARD MEMANJANG PENUH KIRI-KANAN
        ====================================================== */}
        <div
          className="
            w-full
            min-w-0
            px-3
            py-4
            sm:px-4
            sm:py-5
            md:px-5
            md:py-6
            lg:px-6
            lg:py-7
            xl:px-8
            xl:py-8
            2xl:px-10
            2xl:py-9
            space-y-4
            sm:space-y-5
            lg:space-y-6
          "
        >

          {/* =====================================================
              BREADCRUMB
          ====================================================== */}
          <nav className="w-full min-w-0 overflow-hidden">
            <ol
              className="
                flex
                flex-wrap
                items-center
                gap-x-2
                gap-y-1
                text-[11px]
                sm:text-xs
                md:text-sm
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
                Sosial Media
              </li>
            </ol>
          </nav>

          {/* =====================================================
              HEADER CARD
          ====================================================== */}
          <section
            className="
              w-full
              min-w-0
              bg-white
              border
              border-slate-200/70
              rounded-xl
              sm:rounded-2xl
              shadow-sm
              p-4
              sm:p-5
              md:p-6
              lg:p-7
            "
          >
            <div
              className="
                w-full
                min-w-0
                flex
                flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-4
                lg:gap-6
              "
            >

              {/* TITLE */}
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">

                <div
                  className="
                    shrink-0
                    flex
                    items-center
                    justify-center
                    p-2.5
                    sm:p-3
                    bg-indigo-50
                    rounded-xl
                    sm:rounded-2xl
                    border
                    border-indigo-100
                  "
                >
                  <Share2 className="w-5 h-5 text-indigo-600" />
                </div>

                <div className="min-w-0">
                  <h1
                    className="
                      text-lg
                      sm:text-xl
                      md:text-2xl
                      lg:text-3xl
                      font-bold
                      tracking-tight
                      text-slate-900
                      truncate
                    "
                  >
                    Sosial Media
                  </h1>

                  <p
                    className="
                      text-xs
                      sm:text-sm
                      text-slate-500
                      mt-1
                      leading-relaxed
                    "
                  >
                    Hubungkan akun media sosial sekolah ke website.
                  </p>
                </div>
              </div>

              {/* STATISTICS */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                  sm:gap-3
                  px-3
                  sm:px-4
                  py-2
                  rounded-full
                  border
                  border-slate-200/70
                  bg-slate-50
                  shrink-0
                  self-start
                  lg:self-center
                "
              >
                <span
                  className="
                    flex
                    items-center
                    gap-1.5
                    text-[10px]
                    sm:text-xs
                    font-medium
                    text-emerald-600
                    whitespace-nowrap
                  "
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {activeCount} Aktif
                </span>

                {inactiveCount > 0 && (
                  <>
                    <span className="text-slate-300">
                      |
                    </span>

                    <span
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-[10px]
                        sm:text-xs
                        font-medium
                        text-slate-500
                        whitespace-nowrap
                      "
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                      {inactiveCount} Nonaktif
                    </span>
                  </>
                )}
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
              rounded-xl
              sm:rounded-2xl
              border
              border-slate-200/70
              shadow-sm
              overflow-hidden
            "
          >

            {/* FORM CONTENT */}
            <div
              className="
                w-full
                min-w-0
                p-3
                sm:p-4
                md:p-5
                lg:p-6
                xl:p-7
                space-y-3
                sm:space-y-4
              "
            >
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`
                    w-full
                    min-w-0
                    p-3
                    sm:p-4
                    md:p-5
                    lg:p-6
                    rounded-xl
                    sm:rounded-2xl
                    border
                    transition-all
                    duration-200
                    ${
                      platform.enabled
                        ? "border-indigo-100 bg-indigo-50/20 hover:bg-indigo-50/40"
                        : "border-slate-100 bg-slate-50/30 hover:bg-slate-50"
                    }
                  `}
                >

                  {/* ROW */}
                  <div
                    className="
                      w-full
                      min-w-0
                      flex
                      flex-col
                      md:flex-row
                      md:items-center
                      gap-3
                      md:gap-4
                      lg:gap-5
                    "
                  >

                    {/* ICON */}
                    <div
                      className={`
                        shrink-0
                        self-start
                        md:self-center
                        flex
                        items-center
                        justify-center
                        p-2
                        sm:p-2.5
                        rounded-xl
                        ${
                          platform.enabled
                            ? "bg-indigo-100 text-indigo-600 shadow-sm ring-1 ring-indigo-200/50"
                            : "bg-slate-200 text-slate-400"
                        }
                      `}
                    >
                      {renderIcon(platform.id)}
                    </div>

                    {/* LABEL */}
                    <div
                      className="
                        shrink-0
                        w-full
                        md:w-28
                        lg:w-32
                        xl:w-36
                      "
                    >
                      <span
                        className="
                          block
                          text-xs
                          sm:text-sm
                          font-semibold
                          text-slate-800
                        "
                      >
                        {platform.label}
                      </span>
                    </div>

                    {/* URL INPUT */}
                    <div className="relative flex-1 min-w-0 w-full">

                      {platform.enabled && (
                        <LinkIcon
                          className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            w-3.5
                            h-3.5
                            text-slate-400
                            pointer-events-none
                          "
                        />
                      )}

                      <input
                        type="url"
                        value={platform.url}
                        onChange={(e) =>
                          handleUrlChange(
                            platform.id,
                            e.target.value
                          )
                        }
                        disabled={!platform.enabled}
                        placeholder="https://..."
                        className={`
                          w-full
                          min-w-0
                          ${
                            platform.enabled
                              ? "pl-9"
                              : "pl-3"
                          }
                          pr-3
                          py-2
                          sm:py-2.5
                          lg:py-3
                          rounded-lg
                          sm:rounded-xl
                          border
                          text-xs
                          sm:text-sm
                          text-slate-700
                          outline-none
                          transition-all
                          focus:ring-2
                          focus:ring-indigo-500/30
                          focus:border-indigo-500
                          ${
                            platform.enabled
                              ? "bg-white border-slate-200"
                              : "bg-slate-100/80 border-slate-200/80 text-slate-400 cursor-not-allowed"
                          }
                        `}
                      />
                    </div>

                    {/* TOGGLE */}
                    <label
                      className="
                        relative
                        inline-flex
                        items-center
                        cursor-pointer
                        shrink-0
                        self-end
                        md:self-center
                      "
                    >
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={platform.enabled}
                        onChange={() =>
                          handleToggle(platform.id)
                        }
                      />

                      <div
                        className="
                          w-10
                          h-5
                          sm:w-11
                          sm:h-6
                          bg-slate-300
                          rounded-full
                          peer
                          peer-focus:outline-none
                          peer-focus:ring-4
                          peer-focus:ring-indigo-300/30
                          peer-checked:bg-indigo-600
                          after:content-['']
                          after:absolute
                          after:top-[2px]
                          after:left-[2px]
                          after:bg-white
                          after:border
                          after:border-slate-300
                          after:rounded-full
                          after:h-4
                          after:w-4
                          sm:after:h-5
                          sm:after:w-5
                          after:transition-all
                          peer-checked:after:translate-x-full
                          peer-checked:after:border-white
                          shadow-inner
                        "
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* ACTION */}
            <div
              className="
                w-full
                flex
                flex-col
                sm:flex-row
                gap-3
                justify-end
                p-3
                sm:p-4
                md:p-5
                lg:p-6
                border-t
                border-slate-100
                bg-slate-50/40
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
                  px-6
                  sm:px-8
                  py-2.5
                  lg:py-3
                  w-full
                  sm:w-auto
                  bg-indigo-600
                  text-white
                  text-xs
                  sm:text-sm
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
          </form>

          {/* =====================================================
              LIVE PREVIEW
          ====================================================== */}
          <section
            className="
              w-full
              min-w-0
              bg-slate-800
              rounded-xl
              sm:rounded-2xl
              border
              border-slate-700
              shadow-sm
              overflow-hidden
              p-4
              sm:p-5
              md:p-6
              lg:p-7
            "
          >

            {/* PREVIEW HEADER */}
            <div
              className="
                flex
                items-center
                gap-2
                mb-4
                pb-3
                border-b
                border-slate-700
                min-w-0
              "
            >
              <span
                className="
                  text-[9px]
                  sm:text-[10px]
                  font-bold
                  text-slate-400
                  uppercase
                  tracking-wider
                  whitespace-nowrap
                "
              >
                Live Preview
              </span>

              <div className="flex-1 h-px bg-slate-700 min-w-0" />

              <span
                className="
                  text-[9px]
                  sm:text-[10px]
                  text-slate-500
                  whitespace-nowrap
                "
              >
                Footer Website
              </span>
            </div>

            {/* SOCIAL ICONS */}
            <div
              className="
                w-full
                flex
                flex-wrap
                items-center
                justify-center
                gap-2
                sm:gap-3
              "
            >
              {platforms.map((platform) => {
                if (!platform.enabled) return null;

                return (
                  <a
                    key={platform.id}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={platform.label}
                    className="
                      flex
                      items-center
                      justify-center
                      w-9
                      h-9
                      sm:w-10
                      sm:h-10
                      rounded-full
                      bg-slate-700/50
                      text-slate-300
                      hover:bg-indigo-600
                      hover:text-white
                      transition-all
                      duration-200
                      hover:scale-110
                      hover:shadow-lg
                      hover:shadow-indigo-600/20
                    "
                  >
                    {renderIcon(platform.id)}
                  </a>
                );
              })}

              {activeCount === 0 && (
                <p
                  className="
                    text-xs
                    sm:text-sm
                    text-slate-500
                    italic
                    text-center
                  "
                >
                  Tidak ada platform yang aktif untuk ditampilkan.
                </p>
              )}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}