"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import {
  LayoutDashboard,
  Calendar,
  NotebookPen,
  ClipboardCheck,
  BookOpen,
  ClipboardList,
  HelpCircle,
  ChevronRight,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
  Bell,
} from "lucide-react";

// =====================================================
// DUMMY DATA
// =====================================================

const kpiStrip = [
  {
    id: "kelas",
    label: "Kelas Diampu",
    value: "4",
    icon: Calendar,
    color: "blue",
  },
  {
    id: "siswa",
    label: "Siswa Diampu",
    value: "138",
    icon: ClipboardCheck,
    color: "purple",
  },
  {
    id: "tugasBelumDinilai",
    label: "Tugas Belum Dinilai",
    value: "12",
    icon: ClipboardList,
    color: "amber",
  },
  {
    id: "kehadiran",
    label: "Rata Kehadiran",
    value: "96.0%",
    icon: ClipboardCheck,
    color: "emerald",
  },
];

const quickMenu = [
  {
    id: "jadwal",
    title: "Jadwal",
    desc: "Jadwal mengajar, presensi masuk, dan pengajuan izin",
    icon: Calendar,
    color: "blue",
    path: "/guru/jadwal",
    stat: "3 sesi hari ini",
    featured: true,
  },
  {
    id: "nilai",
    title: "Nilai",
    desc: "Input dan rekap nilai tugas, quiz, hingga rapor siswa",
    icon: NotebookPen,
    color: "rose",
    path: "/guru/nilai",
    stat: "12 belum dinilai",
    featured: true,
  },
  {
    id: "absensi",
    title: "Absensi",
    desc: "Presensi kehadiran siswa per kelas",
    icon: ClipboardCheck,
    color: "purple",
    path: "/guru/absensi",
    stat: "4 kelas",
  },
  {
    id: "materi",
    title: "Materi",
    desc: "Bahan ajar untuk setiap kelas",
    icon: BookOpen,
    color: "emerald",
    path: "/guru/materi",
    stat: "18 materi",
  },
  {
    id: "tugas",
    title: "Tugas",
    desc: "Buat dan pantau pengumpulan tugas",
    icon: ClipboardList,
    color: "amber",
    path: "/guru/tugas",
    stat: "5 tugas aktif",
  },
  {
    id: "quiz",
    title: "Quiz",
    desc: "Kelola bank soal dan sesi quiz",
    icon: HelpCircle,
    color: "slate",
    path: "/guru/quiz",
    stat: "2 quiz berjalan",
  },
];

const kelasList = [
  {
    id: 1,
    nama: "Kelas 9A",
    siswa: 34,
    kehadiran: 98,
    trend: "up",
  },
  {
    id: 2,
    nama: "Kelas 9B",
    siswa: 33,
    kehadiran: 95,
    trend: "down",
  },
  {
    id: 3,
    nama: "Kelas 8A",
    siswa: 36,
    kehadiran: 96,
    trend: "same",
  },
  {
    id: 4,
    nama: "Kelas 8B",
    siswa: 35,
    kehadiran: 94,
    trend: "down",
  },
];

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200",
    hoverBorder: "hover:border-blue-300",
    ring: "group-hover:ring-blue-100",
  },

  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-200",
    hoverBorder: "hover:border-purple-300",
    ring: "group-hover:ring-purple-100",
  },

  amber: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-200",
    hoverBorder: "hover:border-amber-300",
    ring: "group-hover:ring-amber-100",
  },

  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
    hoverBorder: "hover:border-emerald-300",
    ring: "group-hover:ring-emerald-100",
  },

  rose: {
    bg: "bg-rose-50",
    text: "text-rose-600",
    border: "border-rose-200",
    hoverBorder: "hover:border-rose-300",
    ring: "group-hover:ring-rose-100",
  },

  slate: {
    bg: "bg-slate-50",
    text: "text-slate-600",
    border: "border-slate-200",
    hoverBorder: "hover:border-slate-300",
    ring: "group-hover:ring-slate-100",
  },
};

// =====================================================
// TREND ICON
// =====================================================

const TrendIcon = ({ trend }) => {
  if (trend === "up") {
    return (
      <TrendingUp
        size={14}
        className="text-emerald-500 flex-shrink-0"
      />
    );
  }

  if (trend === "down") {
    return (
      <TrendingDown
        size={14}
        className="text-rose-500 flex-shrink-0"
      />
    );
  }

  return (
    <Minus
      size={14}
      className="text-slate-400 flex-shrink-0"
    />
  );
};

// =====================================================
// MAIN
// =====================================================

export default function GuruDashboardPage() {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const notifications = [
    {
      id: 1,
      title: "Rapat Wali Kelas",
      desc: "Dikirim 2 jam lalu",
      read: false,
    },
    {
      id: 2,
      title: "Batas Input Nilai Rapor",
      desc: "Dikirim 5 jam lalu",
      read: false,
    },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar
        active="dashboard"
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={() => setSidebarOpen((prev) => !prev)}
      />

      {/* =================================================
          CONTENT WRAPPER
      ================================================= */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* HEADER */}

        <Header
          toggleSidebar={() =>
            setSidebarOpen((prev) => !prev)
          }
          notifications={notifications}
          user={{
            name: "Bu Sari",
            email: "guru@smartschool.com",
            avatar: "AS",
          }}
        />

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <main
          className="
            flex-1
            min-w-0
            overflow-x-hidden
            overflow-y-auto
            p-3
            sm:p-4
            md:p-5
            lg:p-6
            xl:p-7
          "
        >
          <div className="w-full min-w-0 space-y-5 sm:space-y-6">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <section className="w-full min-w-0">

              <div
                className="
                  flex
                  min-w-0
                  flex-col
                  gap-3
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >

                <div className="min-w-0">

                  <div className="flex min-w-0 items-center gap-2.5">

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-600
                        text-white
                        shadow-sm
                        sm:h-10
                        sm:w-10
                      "
                    >
                      <LayoutDashboard size={18} />
                    </div>

                    <h1
                      className="
                        min-w-0
                        text-lg
                        font-semibold
                        leading-tight
                        text-slate-800
                        sm:text-xl
                        lg:text-2xl
                      "
                    >
                      Selamat pagi, Bu Sari
                    </h1>

                  </div>

                  <div
                    className="
                      mt-2
                      flex
                      min-w-0
                      items-center
                      gap-1.5
                      pl-[45px]
                    "
                  >

                    <Sparkles
                      size={14}
                      className="flex-shrink-0 text-slate-400"
                    />

                    <p className="min-w-0 text-xs text-slate-500 sm:text-sm">
                      Senin, 17 Agustus 2026 · Wali kelas 9A
                    </p>

                  </div>

                </div>

              </div>

            </section>

            {/* =================================================
                KPI
            ================================================= */}

            <section
              className="
                grid
                w-full
                min-w-0
                grid-cols-2
                overflow-hidden
                rounded-2xl
                border
                border-slate-200/80
                bg-white
                shadow-sm
                sm:grid-cols-4
              "
            >

              {kpiStrip.map((kpi) => {
                const Icon = kpi.icon;
                const c = colorMap[kpi.color];

                return (
                  <div
                    key={kpi.id}
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-2.5
                      border-b
                      border-slate-100
                      p-3
                      sm:border-b-0
                      sm:border-r
                      sm:p-4
                      lg:p-5
                      last:border-r-0
                      [&:nth-child(3)]:border-b-0
                      sm:[&:nth-child(2)]:border-r
                      sm:[&:nth-child(3)]:border-r
                    "
                  >

                    <div
                      className={`
                        flex
                        h-9
                        w-9
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        ${c.bg}
                        ${c.text}
                        sm:h-10
                        sm:w-10
                      `}
                    >
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0">

                      <p
                        className="
                          text-base
                          font-semibold
                          leading-tight
                          text-slate-800
                          sm:text-lg
                        "
                      >
                        {kpi.value}
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-[10px]
                          leading-tight
                          text-slate-500
                          sm:text-xs
                        "
                      >
                        {kpi.label}
                      </p>

                    </div>

                  </div>
                );
              })}

            </section>

            {/* =================================================
                QUICK MENU
            ================================================= */}

            <section
              className="
                grid
                w-full
                min-w-0
                grid-cols-1
                gap-3
                sm:grid-cols-2
                lg:grid-cols-4
                lg:gap-4
              "
            >

              {quickMenu.map((item) => {
                const Icon = item.icon;
                const c = colorMap[item.color];

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => router.push(item.path)}
                    className={`
                      group
                      relative
                      min-w-0
                      overflow-hidden
                      rounded-2xl
                      border
                      bg-white
                      text-left
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:shadow-md
                      ${c.border}
                      ${c.hoverBorder}
                      ${item.featured ? "lg:col-span-2" : ""}
                    `}
                  >

                    {/* decorative circle */}

                    <div
                      className={`
                        pointer-events-none
                        absolute
                        -right-8
                        -top-8
                        h-24
                        w-24
                        rounded-full
                        ${c.bg}
                        opacity-70
                      `}
                    />

                    <div
                      className="
                        relative
                        flex
                        h-full
                        min-w-0
                        flex-col
                        p-4
                        sm:p-5
                      "
                    >

                      <div className="flex items-start justify-between gap-3">

                        <div
                          className={`
                            flex
                            h-10
                            w-10
                            flex-shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            ${c.bg}
                            ${c.text}
                            ring-4
                            ring-transparent
                            ${c.ring}
                          `}
                        >
                          <Icon size={19} />
                        </div>

                        <ChevronRight
                          size={17}
                          className="
                            mt-1
                            flex-shrink-0
                            text-slate-300
                            transition-all
                            duration-300
                            group-hover:translate-x-0.5
                            group-hover:text-slate-500
                          "
                        />

                      </div>

                      <h3
                        className="
                          mt-3
                          text-sm
                          font-semibold
                          leading-tight
                          text-slate-800
                          sm:text-base
                        "
                      >
                        {item.title}
                      </h3>

                      <p
                        className="
                          mt-1.5
                          min-w-0
                          text-xs
                          leading-relaxed
                          text-slate-500
                          sm:text-sm
                        "
                      >
                        {item.desc}
                      </p>

                      <div className="mt-3">

                        <span
                          className={`
                            inline-flex
                            max-w-full
                            items-center
                            rounded-full
                            px-2.5
                            py-1
                            text-[10px]
                            font-medium
                            sm:text-[11px]
                            ${c.bg}
                            ${c.text}
                          `}
                        >
                          <span className="truncate">
                            {item.stat}
                          </span>
                        </span>

                      </div>

                    </div>

                  </button>
                );
              })}

            </section>

            {/* =================================================
                BOTTOM SECTION
            ================================================= */}

            <section
              className="
                grid
                w-full
                min-w-0
                grid-cols-1
                gap-4
                lg:grid-cols-3
                lg:gap-5
              "
            >

              {/* =============================================
                  KEHADIRAN
              ============================================= */}

              <div
                className="
                  min-w-0
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200/80
                  bg-white
                  shadow-sm
                  lg:col-span-2
                "
              >

                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    justify-between
                    gap-3
                    border-b
                    border-slate-100
                    p-4
                    sm:p-5
                  "
                >

                  <div className="flex min-w-0 items-center gap-2.5">

                    <div
                      className="
                        flex
                        h-8
                        w-8
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-blue-50
                        text-blue-600
                      "
                    >
                      <Calendar size={16} />
                    </div>

                    <h3
                      className="
                        min-w-0
                        text-sm
                        font-semibold
                        text-slate-700
                      "
                    >
                      Kehadiran per Kelas
                    </h3>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      router.push("/guru/absensi")
                    }
                    className="
                      inline-flex
                      flex-shrink-0
                      items-center
                      gap-0.5
                      text-xs
                      font-medium
                      text-blue-600
                      transition-colors
                      hover:text-blue-700
                    "
                  >
                    Lihat semua
                    <ChevronRight size={12} />
                  </button>

                </div>

                <div className="space-y-4 p-4 sm:p-5">

                  {kelasList.map((kelas) => (
                    <div
                      key={kelas.id}
                      className="
                        grid
                        min-w-0
                        grid-cols-[64px_minmax(0,1fr)_42px_16px]
                        items-center
                        gap-2
                        sm:grid-cols-[80px_minmax(0,1fr)_45px_18px]
                        sm:gap-3
                      "
                    >

                      <span
                        className="
                          min-w-0
                          truncate
                          text-xs
                          font-medium
                          text-slate-700
                          sm:text-sm
                        "
                      >
                        {kelas.nama}
                      </span>

                      <div
                        className="
                          h-2
                          min-w-0
                          overflow-hidden
                          rounded-full
                          bg-slate-100
                        "
                      >
                        <div
                          className="
                            h-full
                            rounded-full
                            bg-blue-500
                          "
                          style={{
                            width: `${kelas.kehadiran}%`,
                          }}
                        />
                      </div>

                      <span
                        className="
                          text-right
                          text-xs
                          text-slate-600
                          sm:text-sm
                        "
                      >
                        {kelas.kehadiran}%
                      </span>

                      <TrendIcon trend={kelas.trend} />

                    </div>
                  ))}

                </div>

              </div>

              {/* =============================================
                  NOTIFICATION
              ============================================= */}

              <div
                className="
                  min-w-0
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200/80
                  bg-white
                  shadow-sm
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                    border-b
                    border-slate-100
                    p-4
                    sm:p-5
                  "
                >

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-rose-50
                      text-rose-600
                    "
                  >
                    <Bell size={16} />
                  </div>

                  <h3
                    className="
                      min-w-0
                      text-sm
                      font-semibold
                      text-slate-700
                    "
                  >
                    Notifikasi Terbaru
                  </h3>

                </div>

                <div className="divide-y divide-slate-50">

                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="
                        flex
                        min-w-0
                        items-start
                        gap-3
                        p-4
                        transition-colors
                        hover:bg-slate-50/60
                        sm:p-5
                      "
                    >

                      <div
                        className={`
                          mt-1.5
                          h-1.5
                          w-1.5
                          flex-shrink-0
                          rounded-full
                          ${
                            n.read
                              ? "bg-slate-300"
                              : "bg-blue-500"
                          }
                        `}
                      />

                      <div className="min-w-0">

                        <p
                          className="
                            text-sm
                            font-medium
                            leading-tight
                            text-slate-800
                          "
                        >
                          {n.title}
                        </p>

                        <p
                          className="
                            mt-1
                            text-xs
                            text-slate-400
                          "
                        >
                          {n.desc}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </section>

          </div>
        </main>

      </div>
    </div>
  );
}

