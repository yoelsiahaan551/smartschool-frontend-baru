// app/cmsAdmin/website/page.jsx
"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import {
  FileText,
  Image as ImageIcon,
  Menu,
  Folder,
  Tags,
  LayoutDashboard,
  Plus,
  ChevronRight,
} from "lucide-react";

// =====================================================
// DUMMY DATA
// =====================================================

const stats = {
  totalDokumen: 24,
  totalGaleri: 48,
  totalAlbum: 12,
  totalKategori: 8,
};

// =====================================================
// PAGE
// =====================================================

export default function WebsitePage() {
  const [active, setActive] = useState("website");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 overflow-x-hidden">

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

        <Header
          title="Dashboard Website"
          user={{ name: "Admin" }}
        />

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <main
          className="
            w-full
            min-w-0
            px-4
            sm:px-5
            md:px-6
            lg:px-8
            xl:px-10
            2xl:px-12
            py-5
            sm:py-6
            lg:py-8
          "
        >

          {/* =================================================
              BREADCRUMB
          ================================================= */}

          <nav
            className="
              flex
              items-center
              flex-wrap
              text-sm
              text-gray-500
              mb-5
              sm:mb-6
            "
            aria-label="Breadcrumb"
          >
            <span className="font-medium text-gray-700">
              Dashboard
            </span>

            <ChevronRight
              className="w-4 h-4 mx-1.5 text-gray-400"
            />

            <span className="font-semibold text-gray-900">
              Website
            </span>
          </nav>

          {/* =================================================
              PAGE TITLE
          ================================================= */}

          <div
            className="
              w-full
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-4
              mb-6
              sm:mb-8
            "
          >

            {/* TITLE */}

            <div className="min-w-0">

              <div className="flex items-center gap-2">

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-indigo-50
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <LayoutDashboard
                    className="w-5 h-5 text-indigo-600"
                  />
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
                    Manajemen Website
                  </h1>

                  <p
                    className="
                      text-xs
                      sm:text-sm
                      text-gray-500
                      mt-0.5
                    "
                  >
                    Kelola semua konten website sekolah dengan mudah
                  </p>

                </div>

              </div>

            </div>

            {/* QUICK ACTION */}

            <button
              type="button"
              className="
                w-full
                sm:w-auto
                shrink-0
                inline-flex
                items-center
                justify-center
                gap-2
                bg-indigo-600
                hover:bg-indigo-700
                active:bg-indigo-800
                text-white
                text-sm
                font-medium
                px-4
                py-2.5
                rounded-xl
                shadow-sm
                hover:shadow-md
                transition-all
              "
            >
              <Plus className="w-4 h-4" />

              Tambah Cepat
            </button>

          </div>

          {/* =================================================
              STATISTICS
          ================================================= */}

          <section className="w-full mb-8">

            <div
              className="
                w-full
                grid
                grid-cols-1
                min-[480px]:grid-cols-2
                lg:grid-cols-4
                gap-3
                sm:gap-4
              "
            >

              {/* DOKUMEN */}

              <StatCard
                icon={
                  <FileText
                    className="w-5 h-5 text-blue-600"
                  />
                }
                label="Dokumen"
                value={stats.totalDokumen}
                change="3"
                bgColor="bg-blue-50"
              />

              {/* GALERI */}

              <StatCard
                icon={
                  <ImageIcon
                    className="w-5 h-5 text-purple-600"
                  />
                }
                label="Galeri"
                value={stats.totalGaleri}
                change="12"
                bgColor="bg-purple-50"
              />

              {/* ALBUM */}

              <StatCard
                icon={
                  <Folder
                    className="w-5 h-5 text-orange-600"
                  />
                }
                label="Album"
                value={stats.totalAlbum}
                change="2"
                bgColor="bg-orange-50"
              />

              {/* KATEGORI */}

              <StatCard
                icon={
                  <Tags
                    className="w-5 h-5 text-red-600"
                  />
                }
                label="Kategori"
                value={stats.totalKategori}
                change="1"
                bgColor="bg-red-50"
              />

            </div>

          </section>

          {/* =================================================
              FEATURE SECTION TITLE
          ================================================= */}

          <div className="w-full mb-4 sm:mb-5">

            <h2
              className="
                text-lg
                sm:text-xl
                font-semibold
                text-gray-900
              "
            >
              Kelola Website
            </h2>

            <p
              className="
                text-xs
                sm:text-sm
                text-gray-500
                mt-1
              "
            >
              Pilih bagian website yang ingin kamu kelola.
            </p>

          </div>

          {/* =================================================
              FEATURE CARDS
          ================================================= */}

          <section
            className="
              w-full
              grid
              grid-cols-1
              min-[500px]:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              2xl:grid-cols-5
              gap-3
              sm:gap-4
              xl:gap-5
            "
          >

            {/* =================================================
                DOKUMEN
            ================================================= */}

            <FeatureCard
              icon={
                <FileText
                  className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600"
                />
              }
              title="Dokumen"
              description="Kelola semua dokumen sekolah"
              link="/cmsAdmin/website/dokumen"
              badge="24"
              bgColor="from-blue-50 to-white"
              borderColor="border-blue-200"
              actionLabel="Lihat Dokumen"
            />

            {/* =================================================
                GALERI
            ================================================= */}

            <FeatureCard
              icon={
                <ImageIcon
                  className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600"
                />
              }
              title="Galeri"
              description="Kelola galeri foto & video"
              link="/cmsAdmin/website/galeri"
              badge="48"
              bgColor="from-purple-50 to-white"
              borderColor="border-purple-200"
              actionLabel="Lihat Galeri"
            />

            {/* =================================================
                MENU WEBSITE
            ================================================= */}

            <FeatureCard
              icon={
                <Menu
                  className="w-7 h-7 sm:w-8 sm:h-8 text-green-600"
                />
              }
              title="Menu Website"
              description="Atur menu utama, footer & submenu"
              link="/cmsAdmin/website/menu"
              badge="6"
              bgColor="from-green-50 to-white"
              borderColor="border-green-200"
              actionLabel="Atur Menu"
            />

            {/* =================================================
                ALBUM
            ================================================= */}

            <FeatureCard
              icon={
                <Folder
                  className="w-7 h-7 sm:w-8 sm:h-8 text-orange-600"
                />
              }
              title="Album"
              description="Kelola album galeri"
              link="/cmsAdmin/website/galeri/album"
              badge="12"
              bgColor="from-orange-50 to-white"
              borderColor="border-orange-200"
              actionLabel="Lihat Album"
            />

            {/* =================================================
                KATEGORI
            ================================================= */}

            <FeatureCard
              icon={
                <Tags
                  className="w-7 h-7 sm:w-8 sm:h-8 text-red-600"
                />
              }
              title="Kategori"
              description="Kelola kategori galeri"
              link="/cmsAdmin/website/galeri/kategori"
              badge="8"
              bgColor="from-red-50 to-white"
              borderColor="border-red-200"
              actionLabel="Lihat Kategori"
            />

          </section>

          {/* =================================================
              INFORMATION
          ================================================= */}

          <section
            className="
              w-full
              mt-8
              sm:mt-10
              bg-white
              border
              border-gray-200
              rounded-2xl
              p-4
              sm:p-5
            "
          >

            <div className="flex items-start gap-3">

              <div
                className="
                  w-9
                  h-9
                  rounded-xl
                  bg-indigo-50
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <LayoutDashboard
                  className="w-5 h-5 text-indigo-600"
                />
              </div>

              <div className="min-w-0">

                <h3 className="font-semibold text-gray-800">
                  Manajemen Website Sekolah
                </h3>

                <p
                  className="
                    text-sm
                    text-gray-500
                    mt-1
                    leading-relaxed
                  "
                >
                  Gunakan menu di sidebar untuk mengelola artikel,
                  halaman statis, media, banner, menu website,
                  pengumuman, agenda, dan pengaturan CMS.
                </p>

              </div>

            </div>

          </section>

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer
            className="
              w-full
              mt-8
              sm:mt-10
              pt-5
              pb-4
              border-t
              border-gray-200
              text-center
              text-xs
              text-gray-400
            "
          >
            © 2026 SmartSchool CMS. All rights reserved.
          </footer>

        </main>
      </div>
    </div>
  );
}

// =====================================================
// STAT CARD
// =====================================================

function StatCard({
  icon,
  label,
  value,
  change,
  bgColor,
}) {
  return (
    <div
      className={`
        ${bgColor}
        w-full
        min-w-0
        rounded-2xl
        p-4
        sm:p-5
        border
        border-gray-100
        shadow-sm
        hover:shadow-md
        transition-all
        duration-200
      `}
    >

      <div
        className="
          flex
          items-start
          justify-between
          gap-2
        "
      >

        {/* ICON */}

        <div
          className="
            w-9
            h-9
            sm:w-10
            sm:h-10
            bg-white
            rounded-xl
            shadow-sm
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          {icon}
        </div>

        {/* CHANGE */}

        <span
          className="
            shrink-0
            text-[10px]
            sm:text-xs
            font-medium
            text-emerald-600
            bg-emerald-100
            px-2
            py-1
            rounded-full
          "
        >
          +{change}
        </span>

      </div>

      <p
        className="
          text-2xl
          sm:text-3xl
          font-bold
          text-gray-800
          mt-3
        "
      >
        {value}
      </p>

      <p
        className="
          text-xs
          sm:text-sm
          text-gray-500
          mt-0.5
        "
      >
        {label}
      </p>

    </div>
  );
}

// =====================================================
// FEATURE CARD
// =====================================================

function FeatureCard({
  icon,
  title,
  description,
  link,
  badge,
  bgColor,
  borderColor,
  actionLabel,
}) {
  return (
    <a
      href={link}
      className={`
        group
        relative
        block
        w-full
        min-w-0
        bg-gradient-to-br
        ${bgColor}
        rounded-2xl
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        p-4
        sm:p-5
        lg:p-6
        border
        ${borderColor}
        hover:border-indigo-400
        overflow-hidden
      `}
    >

      {/* BADGE */}

      <span
        className="
          absolute
          top-3
          right-3
          sm:top-4
          sm:right-4
          bg-white/80
          backdrop-blur-sm
          text-[10px]
          sm:text-xs
          font-semibold
          text-gray-700
          px-2
          sm:px-2.5
          py-1
          rounded-full
          shadow-sm
          border
          border-gray-200
        "
      >
        {badge}
      </span>

      {/* CARD CONTENT */}

      <div
        className="
          flex
          items-start
          gap-3
          sm:gap-4
          pr-7
        "
      >

        {/* ICON */}

        <div
          className="
            p-2
            sm:p-2.5
            bg-white
            rounded-xl
            shadow-sm
            group-hover:shadow-md
            transition
            shrink-0
          "
        >
          {icon}
        </div>

        {/* TEXT */}

        <div className="flex-1 min-w-0">

          <h3
            className="
              text-base
              sm:text-lg
              font-semibold
              text-gray-800
              group-hover:text-indigo-600
              transition
              break-words
            "
          >
            {title}
          </h3>

          <p
            className="
              text-xs
              sm:text-sm
              text-gray-500
              mt-1
              leading-relaxed
            "
          >
            {description}
          </p>

        </div>

      </div>

      {/* ACTION */}

      <div
        className="
          mt-4
          sm:mt-5
          flex
          items-center
          text-xs
          sm:text-sm
          font-medium
          text-indigo-600
          group-hover:text-indigo-700
        "
      >

        <span>
          {actionLabel}
        </span>

        <ChevronRight
          className="
            w-4
            h-4
            ml-1
            group-hover:translate-x-1
            transition-transform
          "
        />

      </div>

    </a>
  );
}