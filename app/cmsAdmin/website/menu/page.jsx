// app/cmsAdmin/website/menu/page.jsx
"use client";

import { useState } from "react";

import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

import {
  Plus,
  Layout,
  Footprints,
  Layers,
  List,
  Monitor,
  Smartphone,
  Settings,
  ChevronRight,
  Menu as MenuIcon,
} from "lucide-react";

export default function MenuPage() {
  // =====================================================
  // SIDEBAR STATE
  // =====================================================

  const [active, setActive] = useState("menu");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-slate-50 overflow-x-hidden">
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar
        active={active}
        setActive={setActive}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* =================================================
          MAIN AREA
      ================================================= */}

      <div className="flex-1 min-w-0 w-full">
        {/* =================================================
            HEADER
        ================================================= */}

        <Header title="Menu" user={{ name: "Admin" }} />

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <main className="w-full min-w-0 bg-slate-50">
          <div
            className="
              w-full
              min-w-0
              px-3
              sm:px-4
              md:px-5
              lg:px-6
              xl:px-8
              2xl:px-10
              py-4
              sm:py-6
              lg:py-8
            "
          >
            {/* =================================================
                CONTENT WRAPPER

                TIDAK menggunakan max-w-7xl
                supaya ketika zoom out area ikut melebar
            ================================================= */}

            <div className="w-full min-w-0 space-y-5 sm:space-y-6">
              {/* =================================================
                  BREADCRUMB
              ================================================= */}

              <nav
                className="
                  flex
                  items-center
                  flex-wrap
                  gap-1
                  text-xs
                  sm:text-sm
                  text-gray-500
                "
                aria-label="Breadcrumb"
              >
                <a
                  href="/cmsAdmin"
                  className="hover:text-indigo-600 transition"
                >
                  Dashboard
                </a>

                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />

                <a
                  href="/cmsAdmin/website"
                  className="hover:text-indigo-600 transition"
                >
                  Website
                </a>

                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />

                <span className="text-indigo-600 font-semibold">
                  Manajemen Menu
                </span>
              </nav>

              {/* =================================================
                  PAGE HEADER
              ================================================= */}

              <div
                className="
                  flex
                  flex-col
                  xl:flex-row
                  xl:items-center
                  xl:justify-between
                  gap-4
                "
              >
                {/* TITLE */}

                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      shrink-0
                      w-10
                      h-10
                      sm:w-11
                      sm:h-11
                      bg-indigo-50
                      text-indigo-600
                      rounded-xl
                    "
                  >
                    <Layout className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <div className="min-w-0">
                    <h1
                      className="
                        text-xl
                        sm:text-2xl
                        lg:text-3xl
                        font-bold
                        text-gray-900
                        truncate
                      "
                    >
                      Manajemen Menu
                    </h1>

                    <p
                      className="
                        text-xs
                        sm:text-sm
                        text-gray-500
                        mt-1
                        hidden
                        sm:block
                      "
                    >
                      Atur navigasi header, footer, dan struktur menu website
                      Anda
                    </p>
                  </div>
                </div>

                {/* ACTION BUTTON */}

                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:flex
                    gap-2
                    w-full
                    xl:w-auto
                  "
                >
                  <a
                    href="/cmsAdmin/website/menu/tambah"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-indigo-600
                      px-4
                      sm:px-5
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                      shadow-sm
                      hover:bg-indigo-700
                      hover:shadow-md
                      transition-all
                      whitespace-nowrap
                    "
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Menu
                  </a>

                  <a
                    href="/cmsAdmin/website/menu/pengaturan"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      text-gray-700
                      shadow-sm
                      hover:bg-gray-50
                      hover:border-gray-300
                      transition
                      whitespace-nowrap
                    "
                  >
                    <Settings className="w-4 h-4" />
                    Pengaturan
                  </a>
                </div>
              </div>

              {/* =================================================
                  STATISTICS
              ================================================= */}

              <div
                className="
                  grid
                  grid-cols-1
                  min-[420px]:grid-cols-2
                  lg:grid-cols-4
                  gap-3
                  sm:gap-4
                  w-full
                "
              >
                <StatCard
                  icon={<List className="w-5 h-5" />}
                  iconBg="bg-blue-50"
                  iconColor="text-blue-600"
                  label="Total Menu"
                  value="12"
                />

                <StatCard
                  icon={<Monitor className="w-5 h-5" />}
                  iconBg="bg-purple-50"
                  iconColor="text-purple-600"
                  label="Menu Header"
                  value="6"
                />

                <StatCard
                  icon={<Footprints className="w-5 h-5" />}
                  iconBg="bg-orange-50"
                  iconColor="text-orange-600"
                  label="Menu Footer"
                  value="4"
                />

                <StatCard
                  icon={<Layers className="w-5 h-5" />}
                  iconBg="bg-green-50"
                  iconColor="text-green-600"
                  label="Sub Menu"
                  value="2"
                />
              </div>

              {/* =================================================
                  MENU MANAGEMENT CARDS

                  Pada layar lebar:
                  2 card

                  Pada layar kecil:
                  1 card

                  Card menggunakan min-w-0 agar tidak
                  memaksa horizontal overflow.
              ================================================= */}

              <div
                className="
                  grid
                  grid-cols-1
                  xl:grid-cols-2
                  gap-4
                  sm:gap-5
                  lg:gap-6
                  w-full
                "
              >
                {/* =================================================
                    HEADER MENU CARD
                ================================================= */}

                <MenuManagementCard
                  type="header"
                  title="Menu Header"
                  description="Navigasi utama website"
                  count="6 Aktif"
                  icon={<Monitor className="w-7 h-7 sm:w-8 sm:h-8" />}
                  iconBg="bg-indigo-50"
                  iconColor="text-indigo-600"
                  buttonBg="bg-indigo-50"
                  buttonBorder="border-indigo-200"
                  buttonText="text-indigo-700"
                  buttonHover="hover:bg-indigo-100"
                  link="/cmsAdmin/website/menu/header"
                  menus={[
                    "Beranda",
                    "Profil",
                    "Layanan",
                  ]}
                />

                {/* =================================================
                    FOOTER MENU CARD
                ================================================= */}

                <MenuManagementCard
                  type="footer"
                  title="Menu Footer"
                  description="Navigasi bawah website"
                  count="4 Aktif"
                  icon={<Footprints className="w-7 h-7 sm:w-8 sm:h-8" />}
                  iconBg="bg-purple-50"
                  iconColor="text-purple-600"
                  buttonBg="bg-purple-50"
                  buttonBorder="border-purple-200"
                  buttonText="text-purple-700"
                  buttonHover="hover:bg-purple-100"
                  link="/cmsAdmin/website/menu/footer"
                  menus={[
                    "Syarat & Ketentuan",
                    "Kebijakan Privasi",
                    "Kontak Kami",
                  ]}
                />
              </div>

              {/* =================================================
                  MOBILE / RESPONSIVE TIPS
              ================================================= */}

              <div
                className="
                  w-full
                  bg-indigo-50/70
                  border
                  border-indigo-100
                  rounded-2xl
                  p-4
                  sm:p-5
                "
              >
                <div className="flex items-start gap-3">
                  <div
                    className="
                      shrink-0
                      p-2
                      bg-indigo-100
                      rounded-xl
                      text-indigo-600
                    "
                  >
                    <Smartphone className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <h4
                      className="
                        text-sm
                        sm:text-base
                        font-semibold
                        text-indigo-800
                      "
                    >
                      Tips Manajemen Menu
                    </h4>

                    <p
                      className="
                        text-xs
                        sm:text-sm
                        leading-6
                        text-indigo-700/80
                        mt-1
                      "
                    >
                      Atur urutan menu dengan drag-and-drop, dan pastikan
                      semua menu utama terlihat dengan baik di perangkat
                      desktop maupun mobile.
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  FOOTER
              ================================================= */}

              <div
                className="
                  pt-5
                  border-t
                  border-gray-200
                  text-center
                  text-xs
                  text-gray-400
                "
              >
                © 2026 SmartSchool CMS. All rights reserved.
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
}) {
  return (
    <div
      className="
        w-full
        min-w-0
        bg-white
        p-3
        sm:p-4
        rounded-2xl
        shadow-sm
        border
        border-gray-100
        hover:shadow-md
        transition
      "
    >
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <div
          className={`
            shrink-0
            p-2
            sm:p-2.5
            ${iconBg}
            ${iconColor}
            rounded-xl
          `}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p
            className="
              text-[10px]
              sm:text-xs
              text-gray-500
              font-medium
              truncate
            "
          >
            {label}
          </p>

          <p
            className="
              text-lg
              sm:text-xl
              font-bold
              text-gray-900
            "
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MENU MANAGEMENT CARD
========================================================= */

function MenuManagementCard({
  title,
  description,
  count,
  icon,
  iconBg,
  iconColor,
  buttonBg,
  buttonBorder,
  buttonText,
  buttonHover,
  link,
  menus,
}) {
  return (
    <div
      className="
        group
        relative
        w-full
        min-w-0
        bg-white
        rounded-2xl
        shadow-sm
        border
        border-gray-100
        p-4
        sm:p-5
        lg:p-6
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        flex
        flex-col
      "
    >
      {/* =================================================
          CARD HEADER
      ================================================= */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-start
          sm:justify-between
          gap-4
          mb-5
        "
      >
        {/* ICON + TITLE */}

        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div
            className={`
              shrink-0
              p-2.5
              sm:p-3
              ${iconBg}
              ${iconColor}
              rounded-2xl
            `}
          >
            {icon}
          </div>

          <div className="min-w-0">
            <h2
              className="
                text-lg
                sm:text-xl
                font-bold
                text-gray-900
                truncate
              "
            >
              {title}
            </h2>

            <p
              className="
                text-xs
                sm:text-sm
                text-gray-500
                mt-0.5
              "
            >
              {description}
            </p>
          </div>
        </div>

        {/* STATUS */}

        <span
          className="
            self-start
            shrink-0
            px-3
            py-1.5
            bg-emerald-100
            text-emerald-700
            text-[10px]
            sm:text-xs
            font-semibold
            rounded-full
            whitespace-nowrap
          "
        >
          {count}
        </span>
      </div>

      {/* =================================================
          MENU LIST
      ================================================= */}

      <div
        className="
          space-y-3
          flex-1
          mb-5
          sm:mb-6
          min-w-0
        "
      >
        {menus.map((menu, index) => (
          <div
            key={menu}
            className="
              flex
              items-center
              gap-3
              text-xs
              sm:text-sm
              text-gray-600
              min-w-0
            "
          >
            <div
              className="
                w-2
                h-2
                bg-gray-300
                rounded-full
                shrink-0
              "
            />

            <span className="truncate">
              {menu}
            </span>
          </div>
        ))}

        <div
          className="
            text-indigo-500
            text-xs
            sm:text-sm
            font-medium
            cursor-pointer
            hover:underline
            pt-1
          "
        >
          + Lihat semua ({count.replace(" Aktif", "")} menu)
        </div>
      </div>

      {/* =================================================
          BUTTON
      ================================================= */}

      <a
        href={link}
        className={`
          inline-flex
          items-center
          justify-center
          gap-2
          w-full
          py-3
          px-4
          rounded-xl
          border
          ${buttonBorder}
          ${buttonBg}
          ${buttonText}
          font-semibold
          text-xs
          sm:text-sm
          ${buttonHover}
          transition-colors
          whitespace-nowrap
        `}
      >
        Kelola {title}
        <ChevronRight className="w-4 h-4" />
      </a>
    </div>
  );
}