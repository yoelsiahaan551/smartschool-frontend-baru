"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import MediaTable from "../../components/cms/MediaTable";
import Link from "next/link";
import { dummyMedia } from "../../../lib/dummyData";
import {
  Image,
  Search,
  X,
  Upload,
} from "lucide-react";

export default function MediaPage() {
  const [active, setActive] = useState("media");
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMedia = dummyMedia.filter((item) =>
    item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const totalMedia = dummyMedia.length;

  const totalImages = dummyMedia.filter((m) =>
    m.type.startsWith("image/")
  ).length;

  const totalVideos = dummyMedia.filter((m) =>
    m.type.startsWith("video/")
  ).length;

  const totalPdf = dummyMedia.filter(
    (m) => m.type === "application/pdf"
  ).length;

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-gray-50">

      {/* SIDEBAR */}
      <Sidebar
        active={active}
        setActive={setActive}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* MAIN CONTENT */}
      <main
        className="
          flex-1
          min-w-0
          w-0
          overflow-x-hidden
          bg-gray-50
          transition-all
          duration-300
        "
      >
        <div
          className="
            w-full
            min-w-0
            px-3
            py-4
            sm:px-4
            sm:py-5
            md:px-6
            md:py-6
            lg:px-8
            lg:py-8
          "
        >
          <div className="w-full min-w-0">

            {/* ================= HEADER ================= */}
            <div
              className="
                flex
                flex-col
                gap-4
                mb-6
                sm:flex-row
                sm:items-center
                sm:justify-between
                lg:mb-8
              "
            >
              {/* TITLE */}
              <div className="min-w-0 flex-1">

                <div className="flex items-center gap-2">
                  <Image
                    className="
                      h-5
                      w-5
                      shrink-0
                      text-blue-600
                      sm:h-6
                      sm:w-6
                    "
                  />

                  <h1
                    className="
                      truncate
                      text-xl
                      font-bold
                      text-gray-800
                      sm:text-2xl
                      lg:text-3xl
                    "
                  >
                    Media
                  </h1>
                </div>

                <p
                  className="
                    mt-1
                    text-xs
                    text-gray-500
                    sm:text-sm
                  "
                >
                  Kelola semua file media website Anda
                </p>

              </div>

              {/* ACTION */}
              <div
                className="
                  flex
                  w-full
                  items-center
                  gap-2
                  sm:w-auto
                  sm:shrink-0
                "
              >

             

                {/* UPLOAD */}
                <Link
                  href="/cmsAdmin/media/upload"
                  className="
                    inline-flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-4
                    py-2
                    text-xs
                    font-medium
                    text-white
                    shadow-sm
                    transition-all
                    hover:bg-blue-700
                    hover:shadow-md
                    sm:flex-none
                    sm:text-sm
                  "
                >
                  <Upload className="h-4 w-4 shrink-0" />

                  <span>
                    Upload Media
                  </span>
                </Link>

              </div>
            </div>

            {/* ================= STATISTIK ================= */}
            <div
              className="
                grid
                w-full
                max-w-3xl
                grid-cols-2
                gap-2
                mb-6
                sm:grid-cols-4
                sm:gap-3
                lg:mb-8
              "
            >

              {/* TOTAL */}
              <div
                className="
                  min-w-0
                  rounded-xl
                  border
                  border-gray-100
                  bg-white
                  px-3
                  py-3
                  shadow-sm
                  sm:px-4
                "
              >
                <p
                  className="
                    truncate
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-wider
                    text-gray-400
                    sm:text-xs
                  "
                >
                  Total
                </p>

                <p
                  className="
                    mt-1
                    text-xl
                    font-bold
                    text-gray-800
                    sm:text-2xl
                  "
                >
                  {totalMedia}
                </p>
              </div>

              {/* GAMBAR */}
              <div
                className="
                  min-w-0
                  rounded-xl
                  border
                  border-blue-100
                  bg-white
                  px-3
                  py-3
                  shadow-sm
                  sm:px-4
                "
              >
                <p
                  className="
                    truncate
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-wider
                    text-blue-500
                    sm:text-xs
                  "
                >
                  Gambar
                </p>

                <p
                  className="
                    mt-1
                    text-xl
                    font-bold
                    text-blue-600
                    sm:text-2xl
                  "
                >
                  {totalImages}
                </p>
              </div>

              {/* VIDEO */}
              <div
                className="
                  min-w-0
                  rounded-xl
                  border
                  border-purple-100
                  bg-white
                  px-3
                  py-3
                  shadow-sm
                  sm:px-4
                "
              >
                <p
                  className="
                    truncate
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-wider
                    text-purple-500
                    sm:text-xs
                  "
                >
                  Video
                </p>

                <p
                  className="
                    mt-1
                    text-xl
                    font-bold
                    text-purple-600
                    sm:text-2xl
                  "
                >
                  {totalVideos}
                </p>
              </div>

              {/* PDF */}
              <div
                className="
                  min-w-0
                  rounded-xl
                  border
                  border-red-100
                  bg-white
                  px-3
                  py-3
                  shadow-sm
                  sm:px-4
                "
              >
                <p
                  className="
                    truncate
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-wider
                    text-red-500
                    sm:text-xs
                  "
                >
                  PDF
                </p>

                <p
                  className="
                    mt-1
                    text-xl
                    font-bold
                    text-red-600
                    sm:text-2xl
                  "
                >
                  {totalPdf}
                </p>
              </div>

            </div>

            {/* ================= SEARCH ================= */}
            <div className="mb-5 w-full">
              <div className="relative w-full max-w-md">

                <Search
                  className="
                    absolute
                    left-3
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="text"
                  placeholder="Cari file..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    py-2.5
                    pl-10
                    pr-10
                    text-sm
                    text-gray-700
                    outline-none
                    transition-all
                    placeholder:text-gray-400
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                  "
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      transition
                      hover:text-gray-600
                    "
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

              </div>
            </div>

            {/* ================= TABLE ================= */}
            <div
              className="
                w-full
                min-w-0
                overflow-x-auto
                rounded-xl
              "
            >
              <MediaTable
                media={filteredMedia}
              />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}