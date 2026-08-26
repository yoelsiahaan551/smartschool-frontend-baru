"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import {
  LayoutDashboard,
  Users,
  UserCheck,
  ClipboardCheck,
  BookMarked,
  Bell,
  Activity,
  BarChart3,
  ArrowUpRight,
  ChevronRight,
  RefreshCw,
  School,
  Clock,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  DollarSign,
  Megaphone,
  Settings,
  Plus,
  ShieldCheck,
  FileText,
  BookOpen,
  GraduationCap,
  MoreHorizontal,
  Circle,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

// =========================================================
// DUMMY DATA
// =========================================================

const statsData = [
  {
    id: 1,
    label: "Unit Sekolah",
    value: "6",
    change: "+1",
    description: "dari bulan lalu",
    icon: School,
    color: "blue",
  },
  {
    id: 2,
    label: "Total Siswa",
    value: "4.312",
    change: "+12%",
    description: "pertumbuhan siswa",
    icon: Users,
    color: "emerald",
  },
  {
    id: 3,
    label: "Total Guru",
    value: "237",
    change: "+8",
    description: "guru aktif",
    icon: UserCheck,
    color: "violet",
  },
  {
    id: 4,
    label: "Kehadiran",
    value: "96,0%",
    change: "+2,4%",
    description: "minggu ini",
    icon: ClipboardCheck,
    color: "amber",
  },
  {
    id: 5,
    label: "Mata Pelajaran",
    value: "28",
    change: "+3",
    description: "mata pelajaran",
    icon: BookMarked,
    color: "indigo",
  },
  {
    id: 6,
    label: "Pendapatan",
    value: "Rp 12,5 Jt",
    change: "+5%",
    description: "bulan ini",
    icon: DollarSign,
    color: "rose",
  },
];

const attendanceData = [
  { label: "Sen", value: 91 },
  { label: "Sel", value: 94 },
  { label: "Rab", value: 92 },
  { label: "Kam", value: 96 },
  { label: "Jum", value: 93 },
  { label: "Sab", value: 89 },
];

const recentActivities = [
  {
    id: 1,
    user: "SMA N 1 Jakarta",
    action: "Menambahkan 12 siswa baru",
    time: "10 menit lalu",
    type: "student",
  },
  {
    id: 2,
    user: "SMK Bina Nusantara",
    action: "Mengunggah 8 materi baru",
    time: "25 menit lalu",
    type: "material",
  },
  {
    id: 3,
    user: "SMA Taruna",
    action: "Membuat pengumuman ujian",
    time: "1 jam lalu",
    type: "announcement",
  },
  {
    id: 4,
    user: "SMPN 2 Bandung",
    action: "Mencatat kehadiran hari ini",
    time: "2 jam lalu",
    type: "attendance",
  },
  {
    id: 5,
    user: "SMA N 2 Surabaya",
    action: "Menginput nilai ujian",
    time: "3 jam lalu",
    type: "grade",
  },
];

const pendingTasks = [
  {
    id: 1,
    title: "7 siswa menunggu verifikasi data",
    category: "Siswa",
    priority: "high",
  },
  {
    id: 2,
    title: "12 tugas belum diperiksa guru",
    category: "Tugas",
    priority: "medium",
  },
  {
    id: 3,
    title: "Jadwal ujian semester belum dipublikasikan",
    category: "Ujian",
    priority: "high",
  },
  {
    id: 4,
    title: "5 materi menunggu publikasi",
    category: "Materi",
    priority: "low",
  },
];

const notificationsData = [
  {
    id: 1,
    title: "Pengumuman Ujian Semester",
    desc: "Jadwal ujian semester telah dibuat",
    time: "30 menit lalu",
    read: false,
  },
  {
    id: 2,
    title: "Data siswa perlu diverifikasi",
    desc: "Terdapat 7 data siswa baru",
    time: "1 jam lalu",
    read: false,
  },
  {
    id: 3,
    title: "Laporan kehadiran tersedia",
    desc: "Laporan kehadiran minggu ini sudah tersedia",
    time: "3 jam lalu",
    read: true,
  },
  {
    id: 4,
    title: "Backup data berhasil",
    desc: "Backup database sekolah berhasil dilakukan",
    time: "Kemarin",
    read: true,
  },
];

const quickActions = [
  {
    label: "Tambah Siswa",
    description: "Data siswa",
    icon: Users,
    path: "/admin/siswa",
  },
  {
    label: "Tambah Guru",
    description: "Data guru",
    icon: UserCheck,
    path: "/admin/guru",
  },
  {
    label: "Buat Kelas",
    description: "Kelola kelas",
    icon: GraduationCap,
    path: "/admin/kelas",
  },
  {
    label: "Buat Jadwal",
    description: "Jadwal sekolah",
    icon: Calendar,
    path: "/admin/jadwal",
  },
  {
    label: "Input Absensi",
    description: "Kehadiran",
    icon: ClipboardCheck,
    path: "/admin/absensi",
  },
  {
    label: "Pengumuman",
    description: "Publikasi info",
    icon: Megaphone,
    path: "/admin/notifikasi",
  },
];

// =========================================================
// HELPERS
// =========================================================

const getActivityIcon = (type) => {
  const map = {
    student: Users,
    material: BookOpen,
    announcement: Megaphone,
    attendance: ClipboardCheck,
    grade: FileText,
  };

  return map[type] || Activity;
};

const getActivityStyle = (type) => {
  const map = {
    student: "bg-blue-50 text-blue-600",
    material: "bg-emerald-50 text-emerald-600",
    announcement: "bg-amber-50 text-amber-600",
    attendance: "bg-sky-50 text-sky-600",
    grade: "bg-indigo-50 text-indigo-600",
  };

  return map[type] || "bg-slate-50 text-slate-600";
};

const getPriorityStyle = (priority) => {
  const map = {
    high: "text-rose-600 bg-rose-50 border-rose-100",
    medium: "text-amber-600 bg-amber-50 border-amber-100",
    low: "text-blue-600 bg-blue-50 border-blue-100",
  };

  return map[priority] || map.low;
};

const getPriorityLabel = (priority) => {
  const map = {
    high: "Penting",
    medium: "Sedang",
    low: "Normal",
  };

  return map[priority] || "Normal";
};

const getStatColor = (color) => {
  const map = {
    blue: {
      icon: "bg-blue-50 text-blue-600",
      line: "bg-blue-600",
      glow: "from-blue-50",
    },
    emerald: {
      icon: "bg-emerald-50 text-emerald-600",
      line: "bg-emerald-500",
      glow: "from-emerald-50",
    },
    violet: {
      icon: "bg-violet-50 text-violet-600",
      line: "bg-violet-500",
      glow: "from-violet-50",
    },
    amber: {
      icon: "bg-amber-50 text-amber-600",
      line: "bg-amber-500",
      glow: "from-amber-50",
    },
    indigo: {
      icon: "bg-indigo-50 text-indigo-600",
      line: "bg-indigo-500",
      glow: "from-indigo-50",
    },
    rose: {
      icon: "bg-rose-50 text-rose-600",
      line: "bg-rose-500",
      glow: "from-rose-50",
    },
  };

  return map[color] || map.blue;
};

// =========================================================
// COMPONENT
// =========================================================

export default function AdminDashboardPage() {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const formatDate = (date) => {
    if (!date) return "";

    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";

    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F8FAFC]">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar
        active="dashboard"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      {/* =====================================================
          MAIN
      ====================================================== */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          notifications={notificationsData.map((item) => ({
            id: item.id,
            title: item.title,
            desc: item.desc,
            read: item.read,
          }))}
          user={{
            name: "Admin Sekolah",
            email: "admin@smartschool.com",
            avatar: "AD",
          }}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1800px] px-3 py-4 sm:px-5 sm:py-5 lg:px-7 xl:px-9">
            <div className="space-y-5 lg:space-y-6">

              {/* =================================================
                  WELCOME HERO
              ================================================== */}

              <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F172A] via-[#172554] to-[#1E3A8A] px-5 py-6 text-white shadow-[0_8px_30px_rgba(15,23,42,0.15)] sm:px-7 sm:py-7">
                
                {/* Decorative circles */}
                <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-400/10 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-20 right-24 h-48 w-48 rounded-full bg-indigo-400/10 blur-2xl" />

                <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-medium text-blue-100 backdrop-blur-sm">
                        <Sparkles size={12} />
                        SmartSchool
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-medium text-emerald-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Sistem Aktif
                      </span>
                    </div>

                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
                      Selamat datang, Admin Sekolah 👋
                    </h1>

                    <p className="mt-2 max-w-2xl text-xs leading-5 text-blue-100/75 sm:text-sm">
                      Pantau aktivitas, data akademik, kehadiran, dan kondisi
                      sekolah melalui satu dashboard terintegrasi.
                    </p>

                    {currentTime && (
                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-blue-100/65">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={13} />
                          {formatDate(currentTime)}
                        </span>

                        <span className="hidden h-1 w-1 rounded-full bg-blue-300/40 sm:block" />

                        <span className="flex items-center gap-1.5">
                          <Clock size={13} />
                          {formatTime(currentTime)} WIB
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <button
                      onClick={() => router.push("/admin/laporan")}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/15"
                    >
                      <BarChart3 size={15} />
                      Lihat Laporan
                    </button>

                    <button
                      onClick={() => window.location.reload()}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-[#1E3A8A] shadow-sm transition hover:bg-blue-50"
                    >
                      <RefreshCw size={14} />
                      Refresh
                    </button>
                  </div>
                </div>
              </section>

              {/* =================================================
                  STATS
              ================================================== */}

              <section className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
                {statsData.map((stat) => {
                  const Icon = stat.icon;
                  const style = getStatColor(stat.color);

                  return (
                    <div
                      key={stat.id}
                      className="group relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.035)] transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_8px_22px_rgba(15,23,42,0.07)]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style.icon}`}
                        >
                          <Icon size={17} strokeWidth={2} />
                        </div>

                        <span className="flex items-center gap-0.5 rounded-md bg-emerald-50 px-1.5 py-1 text-[9px] font-semibold text-emerald-600">
                          <ArrowUpRight size={10} />
                          {stat.change}
                        </span>
                      </div>

                      <div className="mt-4">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                          {stat.label}
                        </p>

                        <p className="mt-1 text-lg font-bold tracking-tight text-slate-800 sm:text-xl">
                          {stat.value}
                        </p>

                        <p className="mt-1 truncate text-[9px] text-slate-400">
                          {stat.description}
                        </p>
                      </div>

                      <div
                        className={`absolute bottom-0 left-0 h-[2px] w-0 ${style.line} transition-all duration-300 group-hover:w-full`}
                      />
                    </div>
                  );
                })}
              </section>

              {/* =================================================
                  ATTENDANCE + SCHOOL SUMMARY
              ================================================== */}

              <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">

                {/* ATTENDANCE */}

                <div className="xl:col-span-2 overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.035)]">
                  
                  <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <BarChart3 size={17} />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold text-slate-700">
                          Statistik Kehadiran
                        </h2>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          Persentase kehadiran siswa minggu ini
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push("/admin/absensi")}
                      className="flex w-fit items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-medium text-blue-600 transition hover:bg-blue-50"
                    >
                      Detail
                      <ChevronRight size={13} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-[1fr_150px]">

                    {/* CHART */}

                    <div className="min-w-0">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold tracking-tight text-slate-800">
                            93,5%
                          </p>
                          <p className="mt-0.5 text-[10px] text-slate-400">
                            Rata-rata minggu ini
                          </p>
                        </div>

                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600">
                          <TrendingUp size={11} />
                          +2,4%
                        </span>
                      </div>

                      <div className="h-[210px]">
                        <div className="relative h-full pl-8">

                          {/* GRID */}

                          <div className="absolute inset-0 flex flex-col justify-between pb-7">
                            {[100, 75, 50, 25, 0].map((value) => (
                              <div
                                key={value}
                                className="flex items-center gap-2"
                              >
                                <span className="absolute -left-8 w-6 text-right text-[8px] text-slate-400">
                                  {value}%
                                </span>

                                <div className="w-full border-t border-dashed border-slate-100" />
                              </div>
                            ))}
                          </div>

                          {/* BARS */}

                          <div className="absolute inset-0 flex items-end justify-between gap-2 pb-7 sm:gap-4">
                            {attendanceData.map((item, index) => {
                              const isLast =
                                index === attendanceData.length - 1;

                              return (
                                <div
                                  key={item.label}
                                  className="group relative flex h-full flex-1 items-end justify-center"
                                >
                                  <div className="absolute bottom-[calc(var(--bar-height)+8px)] left-1/2 hidden -translate-x-1/2 rounded-md bg-slate-800 px-2 py-1 text-[9px] font-medium text-white shadow-lg group-hover:block">
                                    {item.value}%
                                  </div>

                                  <div
                                    className={`w-full max-w-[42px] rounded-t-md transition-all duration-300 ${
                                      isLast
                                        ? "bg-emerald-500"
                                        : "bg-[#2563EB]"
                                    } group-hover:opacity-75`}
                                    style={{
                                      height: `${item.value}%`,
                                      "--bar-height": `${item.value}%`,
                                    }}
                                  />

                                  <span className="absolute -bottom-5 text-[9px] font-medium text-slate-400">
                                    {item.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ATTENDANCE SUMMARY */}

                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          Ringkasan
                        </p>

                        <CheckCircle2
                          size={15}
                          className="text-emerald-500"
                        />
                      </div>

                      <div className="mt-4 space-y-4">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-500">
                              Hadir
                            </span>
                            <span className="text-xs font-semibold text-slate-700">
                              93,5%
                            </span>
                          </div>

                          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-emerald-500"
                              style={{ width: "93.5%" }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-500">
                              Izin
                            </span>
                            <span className="text-xs font-semibold text-slate-700">
                              4,2%
                            </span>
                          </div>

                          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-amber-400"
                              style={{ width: "4.2%" }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-500">
                              Alfa
                            </span>
                            <span className="text-xs font-semibold text-slate-700">
                              2,3%
                            </span>
                          </div>

                          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-rose-400"
                              style={{ width: "2.3%" }}
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => router.push("/admin/absensi")}
                        className="mt-5 flex w-full items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white py-2 text-[10px] font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Laporan Absensi
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* SCHOOL SUMMARY */}

                <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.035)]">

                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                        <School size={17} />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold text-slate-700">
                          Ringkasan Sekolah
                        </h2>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          Statistik utama
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push("/admin/sekolah")}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
                    >
                      <MoreHorizontal size={17} />
                    </button>
                  </div>

                  <div className="px-5">
                    {[
                      {
                        icon: School,
                        label: "Unit Sekolah",
                        value: "6",
                        color: "text-blue-500",
                        bg: "bg-blue-50",
                      },
                      {
                        icon: Users,
                        label: "Total Siswa",
                        value: "4.312",
                        color: "text-emerald-500",
                        bg: "bg-emerald-50",
                      },
                      {
                        icon: UserCheck,
                        label: "Total Guru",
                        value: "237",
                        color: "text-violet-500",
                        bg: "bg-violet-50",
                      },
                      {
                        icon: CheckCircle2,
                        label: "Rata Kehadiran",
                        value: "96,0%",
                        color: "text-amber-500",
                        bg: "bg-amber-50",
                      },
                      {
                        icon: BookMarked,
                        label: "Mata Pelajaran",
                        value: "28",
                        color: "text-indigo-500",
                        bg: "bg-indigo-50",
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.label}
                          className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0"
                        >
                          <div className="flex min-w-0 items-center gap-2.5">
                            <div
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${item.bg}`}
                            >
                              <Icon
                                size={13}
                                className={item.color}
                                strokeWidth={2}
                              />
                            </div>

                            <span className="truncate text-[11px] text-slate-500">
                              {item.label}
                            </span>
                          </div>

                          <span className="ml-3 text-xs font-bold text-slate-700">
                            {item.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="px-5 pb-5 pt-3">
                    <button
                      onClick={() => router.push("/admin/sekolah")}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#1E3A8A] py-2.5 text-[10px] font-semibold text-white transition hover:bg-[#172554]"
                    >
                      Kelola Sekolah
                      <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </section>

              {/* =================================================
                  ACTIVITY + TASK
              ================================================== */}

              <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                {/* ACTIVITY */}

                <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.035)]">

                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        <Activity size={17} />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold text-slate-700">
                          Aktivitas Terbaru
                        </h2>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          Aktivitas terbaru dari sekolah
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push("/admin/laporan")}
                      className="text-[10px] font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                      Lihat Semua
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 px-5">
                    {recentActivities.map((activity) => {
                      const Icon = getActivityIcon(activity.type);

                      return (
                        <div
                          key={activity.id}
                          className="flex items-center gap-3 py-3"
                        >
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${getActivityStyle(
                              activity.type
                            )}`}
                          >
                            <Icon size={14} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[11px] text-slate-600">
                              <span className="font-semibold text-slate-700">
                                {activity.user}
                              </span>{" "}
                              {activity.action}
                            </p>

                            <p className="mt-1 flex items-center gap-1 text-[9px] text-slate-400">
                              <Clock size={10} />
                              {activity.time}
                            </p>
                          </div>

                          <ChevronRight
                            size={13}
                            className="shrink-0 text-slate-300"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* TASK */}

                <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.035)]">

                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                        <AlertTriangle size={17} />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold text-slate-700">
                          Perlu Ditindaklanjuti
                        </h2>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          Beberapa hal membutuhkan perhatian
                        </p>
                      </div>
                    </div>

                    <span className="rounded-md bg-slate-50 px-2 py-1 text-[9px] font-semibold text-slate-400">
                      {pendingTasks.length} item
                    </span>
                  </div>

                  <div className="space-y-2 p-4">
                    {pendingTasks.map((task) => (
                      <div
                        key={task.id}
                        className="group flex items-center gap-3 rounded-lg border border-slate-100 p-3 transition hover:border-blue-100 hover:bg-blue-50/30"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50">
                          <Circle
                            size={11}
                            className="fill-amber-400 text-amber-400"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[11px] font-medium text-slate-700">
                            {task.title}
                          </p>

                          <p className="mt-0.5 text-[9px] text-slate-400">
                            {task.category}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 rounded-md border px-2 py-1 text-[8px] font-semibold ${getPriorityStyle(
                            task.priority
                          )}`}
                        >
                          {getPriorityLabel(task.priority)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* =================================================
                  NOTIFICATION + SYSTEM
              ================================================== */}

              <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">

                {/* NOTIFICATION */}

                <div className="xl:col-span-2 overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.035)]">

                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <Bell size={17} />

                        <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold text-slate-700">
                          Notifikasi
                        </h2>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          Informasi terbaru sistem
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push("/admin/notifikasi")}
                      className="text-[10px] font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Lihat Semua
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 px-5">
                    {notificationsData.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start gap-3 py-3"
                      >
                        <div
                          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                            notification.read
                              ? "bg-slate-50 text-slate-400"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          <Bell size={14} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p
                              className={`truncate text-[11px] ${
                                notification.read
                                  ? "font-medium text-slate-600"
                                  : "font-semibold text-slate-700"
                              }`}
                            >
                              {notification.title}
                            </p>

                            {!notification.read && (
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                            )}
                          </div>

                          <p className="mt-0.5 truncate text-[10px] text-slate-400">
                            {notification.desc}
                          </p>

                          <p className="mt-1 text-[9px] text-slate-400">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SYSTEM STATUS */}

                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0F172A] via-[#172554] to-[#1E3A8A] p-5 text-white shadow-[0_8px_24px_rgba(23,37,84,0.15)]">

                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-400/10 blur-xl" />

                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/10">
                        <ShieldCheck size={17} />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold">
                          Status Sistem
                        </h2>

                        <p className="mt-0.5 text-[10px] text-blue-200">
                          SmartSchool
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 divide-y divide-white/10">
                      <div className="flex items-center justify-between py-3">
                        <span className="text-[10px] text-blue-200">
                          Status Sistem
                        </span>

                        <span className="flex items-center gap-1.5 text-[9px] font-semibold text-emerald-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                          Aktif
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <span className="text-[10px] text-blue-200">
                          Backup Terakhir
                        </span>

                        <span className="text-[9px] font-medium">
                          Hari ini, 08:00
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <span className="text-[10px] text-blue-200">
                          Tahun Ajaran
                        </span>

                        <span className="text-[9px] font-medium">
                          2026/2027
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <span className="text-[10px] text-blue-200">
                          Total Sekolah
                        </span>

                        <span className="text-[9px] font-medium">
                          6 unit
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push("/admin/pengaturan")}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2.5 text-[10px] font-semibold transition hover:bg-white/10"
                    >
                      <Settings size={13} />
                      Pengaturan Sekolah
                    </button>
                  </div>
                </div>
              </section>

              {/* =================================================
                  QUICK ACTION
              ================================================== */}

              <section className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.035)]">

                <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Plus size={17} />
                    </div>

                    <div>
                      <h2 className="text-sm font-semibold text-slate-700">
                        Aksi Cepat
                      </h2>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        Menu yang sering digunakan
                      </p>
                    </div>
                  </div>

                  <span className="text-[9px] text-slate-400">
                    Akses langsung
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 p-4 sm:grid-cols-3 lg:grid-cols-6">
                  {quickActions.map((action) => {
                    const Icon = action.icon;

                    return (
                      <button
                        key={action.label}
                        onClick={() => router.push(action.path)}
                        className="group flex min-w-0 items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-3 text-left transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/60 hover:shadow-sm"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-slate-500 shadow-sm transition group-hover:bg-blue-100 group-hover:text-blue-600">
                          <Icon size={15} />
                        </div>

                        <div className="min-w-0">
                          <span className="block truncate text-[10px] font-semibold text-slate-600 group-hover:text-blue-700">
                            {action.label}
                          </span>

                          <span className="mt-0.5 block truncate text-[8px] text-slate-400">
                            {action.description}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* =================================================
                  FOOTER
              ================================================== */}

              <footer className="border-t border-slate-200/70 py-4 text-center">
                <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
                  <span className="text-[9px] font-medium text-slate-400">
                    © 2026 SmartSchool
                  </span>

                  <span className="hidden text-slate-300 sm:block">•</span>

                  <span className="text-[9px] text-slate-400">
                    Dashboard Admin Sekolah
                  </span>
                </div>
              </footer>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}