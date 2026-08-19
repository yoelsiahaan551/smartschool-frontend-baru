// app/cmsAdmin/articles/page.jsx

"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import ArticleTable from "../../components/cms/ArticleTable";
import Link from "next/link";
import { dummyArticles } from "../../../lib/dummyData";
import { FileText, Plus, Search, X } from "lucide-react";

export default function ArticlesPage() {
  const [active, setActive] = useState("articles");
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const totalArticles = dummyArticles.length;
  const published = dummyArticles.filter((a) => a.status === "published").length;
  const drafts = dummyArticles.filter((a) => a.status === "draft").length;

  const filteredArticles = dummyArticles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearSearch = () => setSearchQuery("");

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-white">
      {/* SIDEBAR */}
      <Sidebar
        active={active}
        setActive={setActive}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* MAIN CONTENT */}
      <main
        className={`
          flex-1
          min-w-0
          w-0
          overflow-x-hidden
          bg-white
          transition-all
          duration-300
        `}
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
                sm:gap-4
                lg:mb-8
              "
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <FileText
                    className="
                      w-5
                      h-5
                      shrink-0
                      text-blue-600
                      sm:w-6
                      sm:h-6
                      lg:w-7
                      lg:h-7
                    "
                  />
                  <h1
                    className="
                      truncate
                      text-xl
                      font-bold
                      text-gray-900
                      sm:text-2xl
                      lg:text-3xl
                    "
                  >
                    Daftar Artikel
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
                  Kelola semua artikel yang telah Anda buat
                </p>
              </div>

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
                <Link
                  href="/cmsAdmin/articles/tambah"
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
                  <Plus className="h-4 w-4 shrink-0" />
                  <span>Buat Artikel</span>
                </Link>
              </div>
            </div>

            {/* ================= STATISTICS ================= */}
            <div
              className="
                grid
                w-full
                max-w-xl
                grid-cols-3
                gap-2
                mb-6
                sm:gap-3
                lg:mb-8
              "
            >
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
                  {totalArticles}
                </p>
              </div>

              <div
                className="
                  min-w-0
                  rounded-xl
                  border
                  border-green-100
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
                    text-green-500
                    sm:text-xs
                  "
                >
                  Published
                </p>
                <p
                  className="
                    mt-1
                    text-xl
                    font-bold
                    text-green-600
                    sm:text-2xl
                  "
                >
                  {published}
                </p>
              </div>

              <div
                className="
                  min-w-0
                  rounded-xl
                  border
                  border-yellow-100
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
                    text-yellow-500
                    sm:text-xs
                  "
                >
                  Draft
                </p>
                <p
                  className="
                    mt-1
                    text-xl
                    font-bold
                    text-yellow-600
                    sm:text-2xl
                  "
                >
                  {drafts}
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
                  placeholder="Cari artikel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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

            {/* ================= ARTICLE TABLE ================= */}
            <div
              className="
                w-full
                min-w-0
                overflow-x-auto
                rounded-xl
              "
            >
              <ArticleTable articles={filteredArticles} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}