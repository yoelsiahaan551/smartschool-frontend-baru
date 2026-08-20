"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  Settings,
  Globe,
  Search,
  Share2,
  Palette,
  ArrowRight,
  Monitor,
  LayoutGrid,
} from "lucide-react";

export default function PengaturanPage() {
  const router = useRouter();

  // =====================================================
  // SIDEBAR
  // =====================================================
  const [active, setActive] = useState("pengaturan");
  const [collapsed, setCollapsed] = useState(false);

  // =====================================================
  // MENU DATA
  // =====================================================
  const menuItems = [
    {
      id: "identitas",
      title: "Identitas Website",
      description:
        "Atur nama, deskripsi, logo, favicon, dan kontak sekolah.",
      icon: Globe,
      color: "blue",
      route: "/cmsAdmin/pengaturan/identitas",
      count: "1 Pengaturan",
    },
    {
      id: "seo",
      title: "SEO",
      description:
        "Optimalkan meta title, description, dan script tracking website.",
      icon: Search,
      color: "purple",
      route: "/cmsAdmin/pengaturan/seo",
      count: "4 Pengaturan",
    },
    {
      id: "sosial-media",
      title: "Sosial Media",
      description:
        "Hubungkan akun Facebook, Instagram, YouTube, dan lainnya.",
      icon: Share2,
      color: "pink",
      route: "/cmsAdmin/pengaturan/sosial-media",
      count: "5 Platform",
    },
    {
      id: "tampilan",
      title: "Pengaturan Tampilan",
      description:
        "Sesuaikan tema warna, jenis font, dan layout website.",
      icon: Palette,
      color: "emerald",
      route: "/cmsAdmin/pengaturan/tampilan",
      count: "3 Pengaturan",
    },
  ];

  // =====================================================
  // COLOR MAP
  // =====================================================
  const colorMap = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-l-blue-500",
      line: "bg-blue-500",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-l-purple-500",
      line: "bg-purple-500",
    },
    pink: {
      bg: "bg-pink-50",
      text: "text-pink-600",
      border: "border-l-pink-500",
      line: "bg-pink-500",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-l-emerald-500",
      line: "bg-emerald-500",
    },
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50 overflow-hidden">
      {/* =====================================================
          SIDEBAR
      ===================================================== */}
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
      ===================================================== */}
      <main
        className="
          flex-1
          min-w-0
          w-0
          max-w-full
          overflow-x-hidden
          overflow-y-auto
          bg-slate-50
          transition-all
          duration-300
        "
      >
        <Header title="Pengaturan CMS" user={{ name: "Admin" }} />

        {/* =====================================================
            CONTENT WRAPPER
            TIDAK menggunakan max-w-6xl
            supaya saat zoom out ikut melebar
        ===================================================== */}
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
            2xl:px-12
            lg:py-8
            space-y-5
            sm:space-y-6
          "
        >
          {/* =====================================================
              BREADCRUMB
          ===================================================== */}
          <nav className="w-full min-w-0 overflow-hidden">
            <ol
              className="
                flex
                items-center
                flex-wrap
                gap-x-2
                gap-y-1
                text-[11px]
                sm:text-xs
                lg:text-sm
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

              <li className="text-slate-300 shrink-0">/</li>

              <li className="text-indigo-600 font-semibold truncate">
                Pengaturan
              </li>
            </ol>
          </nav>

          {/* =====================================================
              HEADER
          ===================================================== */}
          <section
            className="
              w-full
              min-w-0
              bg-white
              p-4
              sm:p-5
              lg:p-6
              rounded-xl
              sm:rounded-2xl
              border
              border-slate-200/70
              shadow-sm
            "
          >
            <div
              className="
                flex
                flex-col
                gap-4
                xl:flex-row
                xl:items-center
                xl:justify-between
              "
            >
              {/* TITLE */}
              <div
                className="
                  flex
                  items-start
                  gap-3
                  sm:gap-4
                  min-w-0
                  flex-1
                "
              >
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
                  <Settings className="w-5 h-5 text-indigo-600" />
                </div>

                <div className="min-w-0">
                  <h1
                    className="
                      text-lg
                      sm:text-xl
                      lg:text-2xl
                      font-bold
                      tracking-tight
                      text-slate-900
                    "
                  >
                    Pengaturan CMS
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
                    Konfigurasikan semua aspek website sekolah Anda
                    dari satu tempat.
                  </p>
                </div>
              </div>

              {/* COUNTER */}
              <div
                className="
                  inline-flex
                  w-fit
                  items-center
                  gap-2
                  px-3
                  py-1.5
                  bg-slate-100
                  rounded-full
                  text-[11px]
                  sm:text-xs
                  font-medium
                  text-slate-600
                  shrink-0
                "
              >
                <LayoutGrid className="w-3.5 h-3.5" />

                <span>4 Menu Pengaturan</span>
              </div>
            </div>
          </section>

          {/* =====================================================
              SUMMARY CARDS
              AKAN MELEBAR MENGIKUTI WIDTH
          ===================================================== */}
          <section
            className="
              w-full
              min-w-0
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-3
              sm:gap-4
            "
          >
            {menuItems.map((item) => {
              const colors = colorMap[item.color];

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => router.push(item.route)}
                  className={`
                    group
                    relative
                    text-left
                    w-full
                    min-w-0
                    bg-white
                    p-4
                    rounded-xl
                    sm:rounded-2xl
                    border
                    border-slate-200/70
                    ${colors.border}
                    border-l-4
                    hover:shadow-md
                    hover:-translate-y-0.5
                    transition-all
                    duration-300
                    overflow-hidden
                  `}
                >
                  {/* DECORATION */}
                  <div
                    className={`
                      absolute
                      top-0
                      right-0
                      w-24
                      h-24
                      ${colors.bg}
                      rounded-full
                      opacity-20
                      -translate-y-1/2
                      translate-x-1/2
                      blur-2xl
                      transition-all
                      duration-300
                      group-hover:scale-125
                    `}
                  />

                  <div
                    className="
                      relative
                      z-10
                      flex
                      items-center
                      gap-3
                      min-w-0
                    "
                  >
                    <div
                      className={`
                        shrink-0
                        p-2
                        ${colors.bg}
                        ${colors.text}
                        rounded-lg
                      `}
                    >
                      <item.icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className="
                          text-[10px]
                          sm:text-xs
                          font-semibold
                          text-slate-500
                          uppercase
                          tracking-wider
                          truncate
                        "
                      >
                        {item.title}
                      </p>

                      <p
                        className="
                          text-sm
                          font-bold
                          text-slate-800
                          mt-0.5
                          group-hover:text-indigo-600
                          transition-colors
                          truncate
                        "
                      >
                        {item.count}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </section>

          {/* =====================================================
              MAIN SETTINGS CARDS
              FULL WIDTH RESPONSIVE
          ===================================================== */}
          <section
            className="
              w-full
              min-w-0
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-4
              sm:gap-5
              lg:gap-6
            "
          >
            {menuItems.map((item) => {
              const colors = colorMap[item.color];

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => router.push(item.route)}
                  className="
                    group
                    relative
                    text-left
                    w-full
                    min-w-0
                    bg-white
                    rounded-xl
                    sm:rounded-2xl
                    border
                    border-slate-200/70
                    shadow-sm
                    hover:shadow-xl
                    hover:-translate-y-1
                    transition-all
                    duration-300
                    overflow-hidden
                    p-4
                    sm:p-5
                    lg:p-6
                    flex
                    flex-col
                  "
                >
                  {/* TOP COLOR LINE */}
                  <div
                    className={`
                      absolute
                      top-0
                      left-0
                      right-0
                      h-1
                      ${colors.line}
                      opacity-70
                    `}
                  />

                  {/* CARD CONTENT */}
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-3
                      sm:gap-4
                      min-w-0
                    "
                  >
                    <div
                      className="
                        flex
                        items-start
                        gap-3
                        sm:gap-4
                        min-w-0
                        flex-1
                      "
                    >
                      {/* ICON */}
                      <div
                        className={`
                          shrink-0
                          p-2.5
                          sm:p-3
                          rounded-xl
                          sm:rounded-2xl
                          ${colors.bg}
                          ${colors.text}
                          shadow-sm
                        `}
                      >
                        <item.icon
                          className="
                            w-5
                            h-5
                            sm:w-6
                            sm:h-6
                          "
                        />
                      </div>

                      {/* TEXT */}
                      <div className="min-w-0 flex-1">
                        <h3
                          className="
                            text-base
                            sm:text-lg
                            font-bold
                            text-slate-900
                            group-hover:text-indigo-600
                            transition-colors
                            break-words
                          "
                        >
                          {item.title}
                        </h3>

                        <p
                          className="
                            text-xs
                            sm:text-sm
                            text-slate-500
                            mt-1
                            leading-relaxed
                            line-clamp-3
                          "
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ACTION */}
                  <div
                    className="
                      flex
                      items-center
                      justify-end
                      mt-4
                      pt-4
                      border-t
                      border-slate-100
                    "
                  >
                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        text-xs
                        sm:text-sm
                        font-semibold
                        text-indigo-600
                        group-hover:translate-x-1
                        transition-all
                      "
                    >
                      Kelola Pengaturan

                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </section>

          {/* =====================================================
              TIPS
          ===================================================== */}
          <section
            className="
              w-full
              min-w-0
              bg-indigo-50/60
              border
              border-indigo-200/60
              rounded-xl
              sm:rounded-2xl
              p-4
              sm:p-5
              flex
              items-start
              gap-3
              sm:gap-4
              shadow-sm
            "
          >
            {/* ICON */}
            <div
              className="
                shrink-0
                p-2
                sm:p-2.5
                bg-indigo-100/90
                rounded-lg
                text-indigo-600
                ring-1
                ring-indigo-200/50
                shadow-sm
              "
            >
              <Monitor className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>

            {/* TEXT */}
            <div className="min-w-0 flex-1">
              <h4
                className="
                  text-xs
                  sm:text-sm
                  font-bold
                  text-indigo-800
                "
              >
                Tips Konfigurasi
              </h4>

              <p
                className="
                  text-xs
                  sm:text-sm
                  text-indigo-700/90
                  mt-1
                  leading-relaxed
                "
              >
                Pastikan Anda telah mengatur{" "}
                <strong>Identitas Website</strong> terlebih
                dahulu. Selanjutnya, lengkapi{" "}
                <strong>SEO</strong> agar website mudah
                ditemukan, lalu sesuaikan{" "}
                <strong>Tampilan</strong> dengan branding
                sekolah Anda.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}