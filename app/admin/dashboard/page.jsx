"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import {
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
    },
    emerald: {
      icon: "bg-emerald-50 text-emerald-600",
      line: "bg-emerald-500",
    },
    violet: {
      icon: "bg-violet-50 text-violet-600",
      line: "bg-violet-500",
    },
    amber: {
      icon: "bg-amber-50 text-amber-600",
      line: "bg-amber-500",
    },
    indigo: {
      icon: "bg-indigo-50 text-indigo-600",
      line: "bg-indigo-500",
    },
    rose: {
      icon: "bg-rose-50 text-rose-600",
      line: "bg-rose-500",
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
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <div className="shrink-0">
        <Sidebar
          active="dashboard"
          setActive={() => {}}
          collapsed={isCollapsed}
          setCollapsed={setIsCollapsed}
        />
      </div>

      {/* =====================================================
          MAIN AREA
      ====================================================== */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* HEADER */}

        <div className="shrink-0">
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
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
          <div className="w-full min-w-0 px-3 py-4 sm:px-5 sm:py-5 lg:px-6 xl:px-8">
            <div className="w-full min-w-0 space-y-5 sm:space-y-6">

              {/* =================================================
                  HERO
              ================================================== */}

              <section className="relative w-full min-w-0 overflow-hidden rounded-2xl bg-[#0F172A] px-5 py-6 text-white shadow-md sm:px-6 sm:py-7">
                <div className="relative z-10 flex min-w-0 flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-medium text-blue-100">
                        <Sparkles size={14} />
                        SmartSchool
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-medium text-emerald-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Sistem Aktif
                      </span>
                    </div>

                    <h1 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">
                      Selamat datang, Admin Sekolah
                    </h1>

                    <p className="mt-1 max-w-3xl text-sm leading-relaxed text-blue-100/80">
                      Pantau aktivitas, data akademik, kehadiran, dan kondisi
                      sekolah melalui satu dashboard terintegrasi.
                    </p>

                    {currentTime && (
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-blue-100/70">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          {formatDate(currentTime)}
                        </span>

                        <span className="hidden h-1 w-1 rounded-full bg-blue-300/40 sm:block" />

                        <span className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {formatTime(currentTime)} WIB
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <button
                      onClick={() => router.push("/admin/laporan")}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-white/10"
                    >
                      <BarChart3 size={16} />
                      Lihat Laporan
                    </button>

                    <button
                      onClick={() => window.location.reload()}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-[#0F172A] shadow-sm transition hover:bg-blue-50"
                    >
                      <RefreshCw size={16} />
                      Refresh
                    </button>
                  </div>
                </div>
              </section>

              {/* =================================================
                  STATS
              ================================================== */}

              <section className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
                {statsData.map((stat) => {
                  const Icon = stat.icon;
                  const style = getStatColor(stat.color);

                  return (
                    <div
                      key={stat.id}
                      className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style.icon}`}
                        >
                          <Icon size={18} strokeWidth={2} />
                        </div>

                        <span className="flex shrink-0 items-center gap-0.5 rounded bg-emerald-50 px-1.5 py-1 text-[9px] font-semibold text-emerald-600">
                          <ArrowUpRight size={12} />
                          {stat.change}
                        </span>
                      </div>

                      <div className="mt-3 min-w-0">
                        <p className="truncate text-[10px] font-medium uppercase tracking-wider text-slate-400">
                          {stat.label}
                        </p>

                        <p className="mt-0.5 truncate text-xl font-bold tracking-tight text-slate-800">
                          {stat.value}
                        </p>

                        <p className="mt-0.5 truncate text-[10px] text-slate-400">
                          {stat.description}
                        </p>
                      </div>

                      <div
                        className={`mt-3 h-0.5 w-full rounded-full ${style.line} opacity-40`}
                      />
                    </div>
                  );
                })}
              </section>

              {/* =================================================
                  ATTENDANCE + SCHOOL SUMMARY
              ================================================== */}

              <section className="grid w-full min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
                
                {/* ATTENDANCE */}

                <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex min-w-0 flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <BarChart3 size={18} />
                      </div>

                      <div className="min-w-0">
                        <h2 className="truncate text-sm font-semibold text-slate-700">
                          Statistik Kehadiran
                        </h2>

                        <p className="truncate text-[10px] text-slate-400">
                          Persentase kehadiran siswa minggu ini
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push("/admin/absensi")}
                      className="flex shrink-0 items-center gap-1 self-start rounded-lg px-2 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-50 sm:self-auto"
                    >
                      Detail
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="grid min-w-0 grid-cols-1 gap-5 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_160px]">
                    
                    {/* CHART */}

                    <div className="min-w-0">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-2xl font-bold tracking-tight text-slate-800">
                            93,5%
                          </p>

                          <p className="text-[10px] text-slate-400">
                            Rata-rata minggu ini
                          </p>
                        </div>

                        <span className="inline-flex shrink-0 items-center gap-1 rounded bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600">
                          <TrendingUp size={12} />
                          +2,4%
                        </span>
                      </div>

                      <div className="h-[180px] w-full min-w-0">
                        <div className="relative h-full min-w-0 pl-7">
                          
                          {/* GRID */}

                          <div className="absolute inset-0 flex flex-col justify-between pb-6">
                            {[100, 75, 50, 25, 0].map((v) => (
                              <div
                                key={v}
                                className="relative flex items-center gap-2"
                              >
                                <span className="absolute -left-7 w-6 text-right text-[8px] text-slate-400">
                                  {v}%
                                </span>

                                <div className="w-full border-t border-dashed border-slate-100" />
                              </div>
                            ))}
                          </div>

                          {/* BARS */}

                          <div className="absolute inset-0 flex min-w-0 items-end justify-between gap-2 pb-6">
                            {attendanceData.map((item, idx) => {
                              const isLast =
                                idx === attendanceData.length - 1;

                              return (
                                <div
                                  key={item.label}
                                  className="group relative flex h-full min-w-0 flex-1 items-end justify-center"
                                >
                                  <div className="absolute bottom-[calc(100%-2px)] left-1/2 hidden -translate-x-1/2 rounded bg-slate-800 px-1.5 py-0.5 text-[9px] text-white group-hover:block">
                                    {item.value}%
                                  </div>

                                  <div
                                    className={`w-full max-w-[40px] rounded-t transition-all duration-300 ${
                                      isLast
                                        ? "bg-emerald-500"
                                        : "bg-blue-600"
                                    }`}
                                    style={{
                                      height: `${item.value}%`,
                                    }}
                                  />

                                  <span className="absolute -bottom-4 text-[9px] font-medium text-slate-400">
                                    {item.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SUMMARY */}

                    <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          Ringkasan
                        </p>

                        <CheckCircle2
                          size={16}
                          className="text-emerald-500"
                        />
                      </div>

                      <div className="mt-3 space-y-3">
                        <div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Hadir</span>
                            <span className="font-semibold text-slate-700">
                              93,5%
                            </span>
                          </div>

                          <div className="mt-1 h-1.5 rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-emerald-500"
                              style={{ width: "93.5%" }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Izin</span>
                            <span className="font-semibold text-slate-700">
                              4,2%
                            </span>
                          </div>

                          <div className="mt-1 h-1.5 rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-amber-400"
                              style={{ width: "4.2%" }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Alfa</span>
                            <span className="font-semibold text-slate-700">
                              2,3%
                            </span>
                          </div>

                          <div className="mt-1 h-1.5 rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-rose-400"
                              style={{ width: "2.3%" }}
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => router.push("/admin/absensi")}
                        className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-2 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Laporan Absensi
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* SCHOOL SUMMARY */}

                <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                        <School size={18} />
                      </div>

                      <div className="min-w-0">
                        <h2 className="truncate text-sm font-semibold text-slate-700">
                          Ringkasan Sekolah
                        </h2>

                        <p className="truncate text-[10px] text-slate-400">
                          Statistik utama
                        </p>
                      </div>
                    </div>

                    <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-slate-400 transition hover:bg-slate-50">
                      <MoreHorizontal size={16} />
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
                          className="flex min-w-0 items-center justify-between gap-3 border-b border-slate-100 py-3 last:border-0"
                        >
                          <div className="flex min-w-0 items-center gap-2.5">
                            <div
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${item.bg}`}
                            >
                              <Icon
                                size={14}
                                className={item.color}
                                strokeWidth={2}
                              />
                            </div>

                            <span className="truncate text-xs text-slate-500">
                              {item.label}
                            </span>
                          </div>

                          <span className="shrink-0 text-sm font-bold text-slate-700">
                            {item.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="px-5 pb-5 pt-3">
                    <button
                      onClick={() => router.push("/admin/sekolah")}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#0F172A] py-2.5 text-xs font-semibold text-white transition hover:bg-[#1E293B]"
                    >
                      Kelola Sekolah
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </section>

              {/* =================================================
                  ACTIVITY + TASK
              ================================================== */}

              <section className="grid w-full min-w-0 grid-cols-1 gap-5 lg:grid-cols-2">
                
                {/* ACTIVITY */}

                <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex min-w-0 items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        <Activity size={18} />
                      </div>

                      <div className="min-w-0">
                        <h2 className="truncate text-sm font-semibold text-slate-700">
                          Aktivitas Terbaru
                        </h2>

                        <p className="truncate text-[10px] text-slate-400">
                          Aktivitas terbaru dari sekolah
                        </p>
                      </div>
                    </div>

                    <button className="shrink-0 text-xs font-semibold text-blue-600 hover:text-blue-700">
                      Lihat Semua
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 px-5">
                    {recentActivities.map((activity) => {
                      const Icon = getActivityIcon(activity.type);

                      return (
                        <div
                          key={activity.id}
                          className="flex min-w-0 items-center gap-3 py-3"
                        >
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${getActivityStyle(
                              activity.type
                            )}`}
                          >
                            <Icon size={15} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs text-slate-600">
                              <span className="font-semibold text-slate-700">
                                {activity.user}
                              </span>{" "}
                              {activity.action}
                            </p>

                            <p className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400">
                              <Clock size={12} />
                              {activity.time}
                            </p>
                          </div>

                          <ChevronRight
                            size={14}
                            className="shrink-0 text-slate-300"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* TASK */}

                <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex min-w-0 items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                        <AlertTriangle size={18} />
                      </div>

                      <div className="min-w-0">
                        <h2 className="truncate text-sm font-semibold text-slate-700">
                          Perlu Ditindaklanjuti
                        </h2>

                        <p className="truncate text-[10px] text-slate-400">
                          Beberapa hal membutuhkan perhatian
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                      {pendingTasks.length} item
                    </span>
                  </div>

                  <div className="space-y-2 p-4">
                    {pendingTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex min-w-0 items-center gap-3 rounded-lg border border-slate-100 p-3 transition hover:border-blue-100 hover:bg-blue-50/20"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50">
                          <Circle
                            size={12}
                            className="fill-amber-400 text-amber-400"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium text-slate-700">
                            {task.title}
                          </p>

                          <p className="text-[10px] text-slate-400">
                            {task.category}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 rounded-md border px-2 py-0.5 text-[9px] font-semibold ${getPriorityStyle(
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

              <section className="grid w-full min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
                
                {/* NOTIFICATION */}

                <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex min-w-0 items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <Bell size={18} />

                        <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" />
                      </div>

                      <div className="min-w-0">
                        <h2 className="truncate text-sm font-semibold text-slate-700">
                          Notifikasi
                        </h2>

                        <p className="truncate text-[10px] text-slate-400">
                          Informasi terbaru sistem
                        </p>
                      </div>
                    </div>

                    <button className="shrink-0 text-xs font-semibold text-blue-600 hover:text-blue-700">
                      Lihat Semua
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 px-5">
                    {notificationsData.map((notif) => (
                      <div
                        key={notif.id}
                        className="flex min-w-0 items-start gap-3 py-3"
                      >
                        <div
                          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                            notif.read
                              ? "bg-slate-50 text-slate-400"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          <Bell size={14} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex min-w-0 items-center gap-2">
                            <p
                              className={`truncate text-xs ${
                                notif.read
                                  ? "font-medium text-slate-600"
                                  : "font-semibold text-slate-700"
                              }`}
                            >
                              {notif.title}
                            </p>

                            {!notif.read && (
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                            )}
                          </div>

                          <p className="truncate text-[10px] text-slate-400">
                            {notif.desc}
                          </p>

                          <p className="mt-0.5 text-[9px] text-slate-400">
                            {notif.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SYSTEM STATUS */}

                <div className="relative min-w-0 overflow-hidden rounded-xl bg-[#0F172A] p-5 text-white shadow-md">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-400/5 blur-xl" />

                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/10">
                        <ShieldCheck size={18} />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold">
                          Status Sistem
                        </h2>

                        <p className="text-[10px] text-blue-200">
                          SmartSchool
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 divide-y divide-white/10">
                      <div className="flex items-center justify-between gap-3 py-3">
                        <span className="text-xs text-blue-200">
                          Status Sistem
                        </span>

                        <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-emerald-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                          Aktif
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3 py-3">
                        <span className="text-xs text-blue-200">
                          Backup Terakhir
                        </span>

                        <span className="shrink-0 text-xs font-medium">
                          Hari ini, 08:00
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3 py-3">
                        <span className="text-xs text-blue-200">
                          Tahun Ajaran
                        </span>

                        <span className="shrink-0 text-xs font-medium">
                          2026/2027
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3 py-3">
                        <span className="text-xs text-blue-200">
                          Total Sekolah
                        </span>

                        <span className="shrink-0 text-xs font-medium">
                          6 unit
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push("/admin/pengaturan")}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2.5 text-xs font-semibold transition hover:bg-white/10"
                    >
                      <Settings size={14} />
                      Pengaturan Sekolah
                    </button>
                  </div>
                </div>
              </section>

              {/* =================================================
                  QUICK ACTION
              ================================================== */}

              <section className="w-full min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex min-w-0 flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Plus size={18} />
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-semibold text-slate-700">
                        Aksi Cepat
                      </h2>

                      <p className="truncate text-[10px] text-slate-400">
                        Menu yang sering digunakan
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400">
                    Akses langsung
                  </span>
                </div>

                <div className="grid min-w-0 grid-cols-1 gap-3 p-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
                  {quickActions.map((action) => {
                    const Icon = action.icon;

                    return (
                      <button
                        key={action.label}
                        onClick={() => router.push(action.path)}
                        className="group flex min-w-0 items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-3 text-left transition hover:border-blue-200 hover:bg-blue-50/30"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-50 text-slate-500 transition group-hover:bg-blue-100 group-hover:text-blue-600">
                          <Icon size={16} />
                        </div>

                        <div className="min-w-0">
                          <span className="block truncate text-xs font-semibold text-slate-600">
                            {action.label}
                          </span>

                          <span className="block truncate text-[9px] text-slate-400">
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

              <footer className="border-t border-slate-200 py-4 text-center">
                <p className="text-[10px] text-slate-400">
                  &copy; 2026 SmartSchool &bull; Dashboard Admin Sekolah
                </p>
              </footer>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}