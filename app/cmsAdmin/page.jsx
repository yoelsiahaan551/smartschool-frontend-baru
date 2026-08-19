// app/cmsAdmin/page.jsx

"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/cms/StatCard";
import { dummyStats, dummyArticles } from "../../lib/dummyData";

export default function CmsDashboardPage() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const {
    totalArticles,
    publishedArticles,
    totalPages,
    totalViews,
  } = dummyStats;

  const latestArticles = dummyArticles.slice(0, 5);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 overflow-hidden">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar
        active={active}
        setActive={setActive}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* =====================================================
          AREA UTAMA
      ====================================================== */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* HEADER */}
        <Header
          user={{
            name: "CMS Admin",
            email: "admin@smartschool.com",
            avatar: "CA",
          }}
          notifications={[]}
        />

        {/* ===================================================
            MAIN
        ==================================================== */}

        <main
          className="
            flex-1
            min-w-0
            overflow-y-auto
            overflow-x-hidden
            p-[clamp(0.75rem,1.5vw,1.5rem)]
          "
        >

          {/* =================================================
              DASHBOARD WRAPPER
          ================================================= */}

          <div
            className="
              w-full
              min-w-0
              mx-auto
            "
          >

            {/* =================================================
                DASHBOARD CARD
            ================================================= */}

            <section
              className="
                w-full
                min-w-0
                rounded-2xl
                border
                border-gray-100
                bg-white
                shadow-sm
                p-[clamp(0.75rem,1.5vw,1.5rem)]
              "
            >

              {/* =================================================
                  HEADER DASHBOARD
              ================================================= */}

              <div
                className="
                  flex
                  w-full
                  min-w-0
                  flex-wrap
                  items-center
                  justify-between
                  gap-[clamp(0.75rem,1.5vw,1.5rem)]
                  mb-[clamp(1rem,2vw,1.75rem)]
                "
              >

                {/* TITLE */}

                <div className="min-w-0 flex-1">

                  <h1
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-2
                      font-bold
                      text-gray-800
                      text-[clamp(1.125rem,2vw,1.75rem)]
                    "
                  >
                    <span className="shrink-0">
                      📊
                    </span>

                    <span className="truncate">
                      Dashboard CMS
                    </span>
                  </h1>

                  <p
                    className="
                      mt-1
                      text-gray-500
                      text-[clamp(0.7rem,0.9vw,0.875rem)]
                    "
                  >
                    Kelola konten website Anda dengan mudah
                  </p>

                </div>

                {/* ACTION */}

                <div
                  className="
                    flex
                    shrink-0
                    flex-wrap
                    items-center
                    gap-2
                  "
                >

                  

                  <a
                    href="/cmsAdmin/articles/create"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-1.5
                      whitespace-nowrap
                      rounded-xl
                      bg-blue-600
                      px-[clamp(0.65rem,1vw,1rem)]
                      py-[clamp(0.4rem,0.6vw,0.625rem)]
                      text-[clamp(0.65rem,0.8vw,0.875rem)]
                      font-medium
                      text-white
                      shadow-sm
                      transition-all
                      hover:bg-blue-700
                      hover:shadow-md
                    "
                  >
                    <span>+</span>
                    <span>Buat Artikel Baru</span>
                  </a>

                </div>

              </div>

              {/* =================================================
                  STATISTIK
              ================================================== */}

              <div
                className="
                  grid
                  w-full
                  min-w-0
                  grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))]
                  gap-[clamp(0.5rem,1vw,1rem)]
                  mb-[clamp(1rem,1.5vw,1.5rem)]
                "
              >

                <StatCard
                  title="Total Artikel"
                  value={totalArticles}
                  icon="📝"
                  color="blue"
                  subtitle={`${publishedArticles} dipublikasikan`}
                />

                <StatCard
                  title="Artikel Terbit"
                  value={publishedArticles}
                  icon="✅"
                  color="green"
                  subtitle="dari total artikel"
                />

                <StatCard
                  title="Halaman Statis"
                  value={totalPages}
                  icon="📄"
                  color="purple"
                  subtitle="halaman aktif"
                />

                <StatCard
                  title="Total Dilihat"
                  value={totalViews}
                  icon="👁️"
                  color="orange"
                  subtitle="views sepanjang masa"
                />

              </div>

              {/* =================================================
                  ARTIKEL + TIPS
              ================================================== */}

              <div
                className="
                  grid
                  w-full
                  min-w-0
                  grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))]
                  gap-[clamp(0.75rem,1.25vw,1.25rem)]
                "
              >

                {/* =================================================
                    ARTIKEL TERBARU
                ================================================== */}

                <div
                  className="
                    min-w-0
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-[clamp(0.75rem,1.25vw,1.25rem)]
                    shadow-sm
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-2
                      mb-4
                    "
                  >

                    <h2
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-2
                        font-semibold
                        text-gray-800
                        text-[clamp(0.9rem,1.2vw,1.125rem)]
                      "
                    >
                      <span>📌</span>

                      <span className="truncate">
                        Artikel Terbaru
                      </span>
                    </h2>

                  </div>

                  <ul className="space-y-3">

                    {latestArticles.map((article) => (

                      <li
                        key={article.id}
                        className="
                          flex
                          min-w-0
                          items-start
                          gap-2
                        "
                      >

                        {/* DOT */}

                        <span
                          className="
                            mt-1.5
                            h-1.5
                            w-1.5
                            shrink-0
                            rounded-full
                            bg-blue-500
                          "
                        />

                        {/* ARTICLE */}

                        <div
                          className="
                            min-w-0
                            flex-1
                          "
                        >

                          <p
                            className="
                              truncate
                              font-medium
                              text-gray-700
                              text-[clamp(0.65rem,0.8vw,0.875rem)]
                            "
                            title={article.title}
                          >
                            {article.title}
                          </p>

                          <p
                            className="
                              mt-0.5
                              truncate
                              text-gray-400
                              text-[clamp(0.55rem,0.7vw,0.75rem)]
                            "
                          >
                            {article.status === "published"
                              ? "✅ Published"
                              : "📝 Draft"}

                            {" • "}

                            {article.category ||
                              "Uncategorized"}
                          </p>

                        </div>

                        {/* DATE */}

                        <span
                          className="
                            shrink-0
                            whitespace-nowrap
                            text-gray-400
                            text-[clamp(0.5rem,0.65vw,0.7rem)]
                          "
                        >
                          {new Date(
                            article.created_at
                          ).toLocaleDateString("id-ID")}
                        </span>

                      </li>

                    ))}

                  </ul>

                  {/* FOOTER */}

                  <div
                    className="
                      mt-4
                      border-t
                      border-gray-100
                      pt-3
                    "
                  >

                    <a
                      href="/cmsAdmin/articles"
                      className="
                        text-blue-600
                        hover:text-blue-700
                        hover:underline
                        font-medium
                        text-[clamp(0.65rem,0.8vw,0.875rem)]
                      "
                    >
                      Lihat semua artikel →
                    </a>

                  </div>

                </div>

                {/* =================================================
                    TIPS
                ================================================== */}

                <div
                  className="
                    min-w-0
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-[clamp(0.75rem,1.25vw,1.25rem)]
                    shadow-sm
                  "
                >

                  <h2
                    className="
                      mb-4
                      flex
                      items-center
                      gap-2
                      font-semibold
                      text-gray-800
                      text-[clamp(0.9rem,1.2vw,1.125rem)]
                    "
                  >
                    <span>💡</span>

                    <span>
                      Tips Menulis Konten
                    </span>
                  </h2>

                  <ul className="space-y-3">

                    {/* TIP 1 */}

                    <li className="flex items-start gap-2.5">

                      <span
                        className="
                          shrink-0
                          font-semibold
                          text-blue-500
                          text-[clamp(0.8rem,1vw,1rem)]
                        "
                      >
                        1.
                      </span>

                      <div className="min-w-0">

                        <p
                          className="
                            font-medium
                            text-gray-700
                            text-[clamp(0.65rem,0.8vw,0.875rem)]
                          "
                        >
                          Judul yang Menarik
                        </p>

                        <p
                          className="
                            mt-0.5
                            leading-relaxed
                            text-gray-400
                            text-[clamp(0.55rem,0.7vw,0.75rem)]
                          "
                        >
                          Buat judul yang jelas dan
                          mengandung kata kunci utama.
                        </p>

                      </div>

                    </li>

                    {/* TIP 2 */}

                    <li className="flex items-start gap-2.5">

                      <span
                        className="
                          shrink-0
                          font-semibold
                          text-blue-500
                          text-[clamp(0.8rem,1vw,1rem)]
                        "
                      >
                        2.
                      </span>

                      <div className="min-w-0">

                        <p
                          className="
                            font-medium
                            text-gray-700
                            text-[clamp(0.65rem,0.8vw,0.875rem)]
                          "
                        >
                          Sertakan Gambar
                        </p>

                        <p
                          className="
                            mt-0.5
                            leading-relaxed
                            text-gray-400
                            text-[clamp(0.55rem,0.7vw,0.75rem)]
                          "
                        >
                          Gambar membuat artikel lebih
                          hidup dan mudah dipahami.
                        </p>

                      </div>

                    </li>

                    {/* TIP 3 */}

                    <li className="flex items-start gap-2.5">

                      <span
                        className="
                          shrink-0
                          font-semibold
                          text-blue-500
                          text-[clamp(0.8rem,1vw,1rem)]
                        "
                      >
                        3.
                      </span>

                      <div className="min-w-0">

                        <p
                          className="
                            font-medium
                            text-gray-700
                            text-[clamp(0.65rem,0.8vw,0.875rem)]
                          "
                        >
                          Periksa Ejaan
                        </p>

                        <p
                          className="
                            mt-0.5
                            leading-relaxed
                            text-gray-400
                            text-[clamp(0.55rem,0.7vw,0.75rem)]
                          "
                        >
                          Pastikan tidak ada typo sebelum
                          mempublikasikan artikel.
                        </p>

                      </div>

                    </li>

                    {/* TIP 4 */}

                    <li className="flex items-start gap-2.5">

                      <span
                        className="
                          shrink-0
                          font-semibold
                          text-blue-500
                          text-[clamp(0.8rem,1vw,1rem)]
                        "
                      >
                        4.
                      </span>

                      <div className="min-w-0">

                        <p
                          className="
                            font-medium
                            text-gray-700
                            text-[clamp(0.65rem,0.8vw,0.875rem)]
                          "
                        >
                          Gunakan Subjudul
                        </p>

                        <p
                          className="
                            mt-0.5
                            leading-relaxed
                            text-gray-400
                            text-[clamp(0.55rem,0.7vw,0.75rem)]
                          "
                        >
                          Bagilah konten menjadi bagian-bagian
                          kecil agar mudah dibaca.
                        </p>

                      </div>

                    </li>

                  </ul>

                  {/* FOOTER */}

                  <div
                    className="
                      mt-4
                      border-t
                      border-gray-100
                      pt-3
                    "
                  >

                    <p
                      className="
                        text-gray-400
                        text-[clamp(0.55rem,0.7vw,0.75rem)]
                      "
                    >
                      ✨ Semakin sering menulis,
                      semakin mahir.
                    </p>

                  </div>

                </div>

              </div>

            </section>

          </div>

        </main>
      </div>
    </div>
  );
}