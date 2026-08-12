"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  BookOpen,
  Star,
  Activity,
  Clock,
  Calendar,
  ChevronRight,
  Sparkles,
  Zap,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  CheckCircle,
  XCircle,
  RefreshCw,
  Edit,
  FilePlus2,
  MessageSquare,
  GraduationCap,
  AlertTriangle,
} from "lucide-react";

// ===== DUMMY DATA =====
const statsData = [
  {
    id: 1,
    label: "Total Kelas",
    value: "6",
    change: "+1",
    trend: "up",
    icon: BookOpen,
    color: "blue",
  },
  {
    id: 2,
    label: "Total Siswa",
    value: "214",
    change: "+8",
    trend: "up",
    icon: Users,
    color: "purple",
  },
  {
    id: 3,
    label: "Kehadiran Hari Ini",
    value: "96%",
    change: "+2%",
    trend: "up",
    icon: ClipboardCheck,
    color: "emerald",
  },
  {
    id: 4,
    label: "Tugas Belum Dinilai",
    value: "17",
    change: "-5",
    trend: "down",
    icon: FilePlus2,
    color: "amber",
  },
];

const recentActivities = [
  {
    id: 1,
    user: "Anda",
    action: "Menginput nilai ujian",
    target: "Matematika - Kelas 9A",
    timestamp: "2026-08-11T13:10:00Z",
    type: "grade",
  },
  {
    id: 2,
    user: "Anda",
    action: "Mencatat kehadiran",
    target: "Kelas 8B - 32 siswa hadir",
    timestamp: "2026-08-11T08:05:00Z",
    type: "attendance",
  },
  {
    id: 3,
    user: "Anda",
    action: "Membuat quiz baru",
    target: "Bab 4 - IPA Kelas 9C",
    timestamp: "2026-08-10T15:30:00Z",
    type: "quiz",
  },
  {
    id: 4,
    user: "Anda",
    action: "Mencatat prestasi siswa",
    target: "Rina Amelia - Juara 1 OSN",
    timestamp: "2026-08-10T11:00:00Z",
    type: "achievement",
  },
  {
    id: 5,
    user: "Anda",
    action: "Mencatat pelanggaran",
    target: "Kelas 9A - Terlambat masuk",
    timestamp: "2026-08-09T07:20:00Z",
    type: "violation",
  },
];

const upcomingTasks = [
  { id: 1, title: "Input Nilai UTS Kelas 9A", due: "2026-08-12", priority: "high" },
  { id: 2, title: "Koreksi Quiz Bab 4 - 9C", due: "2026-08-13", priority: "medium" },
  { id: 3, title: "Rapat Guru Mapel", due: "2026-08-15", priority: "low" },
  { id: 4, title: "Laporan Perkembangan Siswa", due: "2026-08-18", priority: "high" },
];

const recentNotifications = [
  { id: 1, title: "Pengumuman Libur Semester", desc: "Info jadwal libur dari sekolah", read: false, time: "2 jam lalu" },
  { id: 2, title: "Deadline Input Nilai", desc: "Batas input nilai UTS 12 Agustus", read: false, time: "5 jam lalu" },
  { id: 3, title: "Jadwal Rapat Diperbarui", desc: "Rapat guru mapel dipindah ke Jumat", read: true, time: "1 hari lalu" },
];

const classSummary = {
  totalKelas: 6,
  totalSiswa: 214,
  rataKehadiran: 96,
  perluPerhatian: 4,
};

const chartData = [
  { label: "Jan", value: 90 },
  { label: "Feb", value: 92 },
  { label: "Mar", value: 88 },
  { label: "Apr", value: 94 },
  { label: "Mei", value: 91 },
  { label: "Jun", value: 95 },
  { label: "Jul", value: 93 },
  { label: "Agu", value: 96 },
];

// ===== UTILITY =====
const timeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "Baru saja";
  if (diffMin < 60) return `${diffMin} menit lalu`;
  if (diffHour < 24) return `${diffHour} jam lalu`;
  if (diffDay < 7) return `${diffDay} hari lalu`;
  return past.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
};

const getPriorityColor = (priority) => {
  const map = {
    high: "bg-rose-50 text-rose-600 border-rose-200",
    medium: "bg-amber-50 text-amber-600 border-amber-200",
    low: "bg-blue-50 text-blue-600 border-blue-200",
  };
  return map[priority] || map.low;
};

const getPriorityLabel = (priority) => {
  const map = { high: "Tinggi", medium: "Sedang", low: "Rendah" };
  return map[priority] || priority;
};

const getActivityIcon = (type) => {
  const map = {
    grade: Edit,
    attendance: ClipboardCheck,
    quiz: FilePlus2,
    achievement: Star,
    violation: AlertTriangle,
  };
  return map[type] || Activity;
};

const getActivityColor = (type) => {
  const map = {
    grade: "text-blue-500 bg-blue-50",
    attendance: "text-emerald-500 bg-emerald-50",
    quiz: "text-purple-500 bg-purple-50",
    achievement: "text-amber-500 bg-amber-50",
    violation: "text-rose-500 bg-rose-50",
  };
  return map[type] || "text-slate-500 bg-slate-50";
};

// ===== MAIN COMPONENT =====

export default function GuruDashboardPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu] = useState("dashboard");

  const notifications = [
    { id: 1, title: "Pengumuman Libur Semester", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Deadline Input Nilai", desc: "Dikirim 5 jam lalu", read: false },
    { id: 3, title: "Jadwal Rapat Diperbarui", desc: "Dikirim 1 hari lalu", read: true },
  ];

  const maxChartValue = Math.max(...chartData.map((d) => d.value)) || 1;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active={activeMenu}
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          user={{ name: "Bapak/Ibu Guru", email: "guru@smartschool.com", avatar: "G" }}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-600 text-white shadow-sm">
                    <LayoutDashboard size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">
                    Dashboard
                  </h1>
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                    Guru
                  </span>
                </div>
                <p className="text-sm text-slate-500 ml-[52px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400" />
                  Selamat datang kembali! Berikut ringkasan kelas Anda hari ini.
                </p>
              </div>
              <div className="flex items-center gap-2.5 ml-[52px] sm:ml-0">
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
                >
                  <RefreshCw size={16} />
                  <span className="hidden xs:inline">Refresh</span>
                </button>
              </div>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {statsData.map((stat) => {
                const Icon = stat.icon;
                const colorMap = {
                  blue: "bg-blue-50 text-blue-600",
                  purple: "bg-purple-50 text-purple-600",
                  emerald: "bg-emerald-50 text-emerald-600",
                  amber: "bg-amber-50 text-amber-600",
                };
                const iconBg = colorMap[stat.color] || colorMap.blue;
                const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;
                const trendColor = stat.trend === "up" ? "text-emerald-600" : "text-rose-600";
                return (
                  <div
                    key={stat.id}
                    className="group bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className={`p-2.5 rounded-xl ${iconBg} flex-shrink-0`}>
                        <Icon size={18} />
                      </div>
                      <span className={`flex items-center gap-0.5 text-xs font-medium ${trendColor} bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200/60`}>
                        <TrendIcon size={12} />
                        {stat.change}
                      </span>
                    </div>
                    <div className="mt-3">
                      <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CHART & CLASS SUMMARY */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* CHART */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                      <BarChart3 size={16} />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-700">Tren Kehadiran Siswa</h3>
                  </div>
                  <span className="text-xs text-slate-400">2026</span>
                </div>

                <div className="relative pt-2">
                  <div className="flex items-end h-48 gap-1 sm:gap-2">
                    {chartData.map((item, idx) => {
                      const height = (item.value / maxChartValue) * 100;
                      const isLast = idx === chartData.length - 1;
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                          <div className="relative w-full max-w-[36px]">
                            <div
                              className={`w-full bg-gradient-to-t from-blue-500 to-indigo-400 rounded-t-lg transition-all duration-700 hover:opacity-80 ${
                                isLast ? "from-emerald-500 to-emerald-400" : ""
                              }`}
                              style={{
                                height: `${height}%`,
                                minHeight: "8px",
                                transition: "height 0.7s ease-in-out",
                              }}
                            />
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              {item.value}% hadir
                            </div>
                          </div>
                          <span className={`text-[8px] sm:text-[10px] font-medium ${
                            isLast ? "text-blue-600 font-semibold" : "text-slate-400"
                          }`}>
                            {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="absolute inset-0 pointer-events-none">
                    {[0, 25, 50, 75, 100].map((percent) => (
                      <div
                        key={percent}
                        className="border-t border-slate-200/40"
                        style={{ top: `${100 - percent}%`, position: "absolute", width: "100%" }}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between mt-2 text-[9px] text-slate-400">
                    <span>0</span>
                    <span>{maxChartValue}%</span>
                  </div>
                </div>
              </div>

              {/* Class Summary */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                    <GraduationCap size={16} />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-700">Ringkasan Kelas</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Total Kelas</span>
                    <span className="text-sm font-semibold text-slate-800">{classSummary.totalKelas}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Total Siswa</span>
                    <span className="text-sm font-semibold text-slate-800">{classSummary.totalSiswa}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 flex items-center gap-1.5">
                      <CheckCircle size={14} className="text-emerald-500" />
                      Rata-rata Kehadiran
                    </span>
                    <span className="text-sm font-semibold text-emerald-600">{classSummary.rataKehadiran}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 flex items-center gap-1.5">
                      <XCircle size={14} className="text-rose-500" />
                      Perlu Perhatian
                    </span>
                    <span className="text-sm font-semibold text-rose-600">{classSummary.perluPerhatian} siswa</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200/60">
                    <button
                      onClick={() => router.push("/guru/akademik/dataSiswa")}
                      className="w-full text-center text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center justify-center gap-1"
                    >
                      Lihat Data Siswa
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTIVITIES & TASKS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Recent Activities */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                      <Activity size={16} />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-700">Aktivitas Terbaru</h3>
                  </div>
                  <button
                    onClick={() => router.push("/guru/profile")}
                    className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Lihat Semua
                  </button>
                </div>
                <div className="space-y-3">
                  {recentActivities.slice(0, 4).map((activity) => {
                    const Icon = getActivityIcon(activity.type);
                    const colorClass = getActivityColor(activity.type);
                    return (
                      <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50/60 transition-colors">
                        <div className={`p-1.5 rounded-lg ${colorClass} flex-shrink-0 mt-0.5`}>
                          <Icon size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1">
                            <span className="text-sm font-medium text-slate-800">{activity.user}</span>
                            <span className="text-sm text-slate-500">{activity.action}</span>
                            <span className="text-sm font-medium text-slate-700 truncate">{activity.target}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">{timeAgo(activity.timestamp)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Upcoming Tasks & Notifications */}
              <div className="space-y-4">
                {/* Upcoming Tasks */}
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                        <Calendar size={16} />
                      </div>
                      <h3 className="text-sm font-semibold text-slate-700">Tugas Mendatang</h3>
                    </div>
                    <span className="text-xs text-slate-400">{upcomingTasks.length} tugas</span>
                  </div>
                  <div className="space-y-2">
                    {upcomingTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50/60 transition-colors">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${task.priority === "high" ? "bg-rose-500" : task.priority === "medium" ? "bg-amber-500" : "bg-blue-500"}`} />
                          <span className="text-sm text-slate-700 truncate">{task.title}</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(task.priority)}`}>
                          {getPriorityLabel(task.priority)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Notifications */}
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                        <Bell size={16} />
                      </div>
                      <h3 className="text-sm font-semibold text-slate-700">Notifikasi</h3>
                    </div>
                    <button
                      onClick={() => router.push("/guru/pengumuman")}
                      className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    >
                      Lihat Semua
                    </button>
                  </div>
                  <div className="space-y-2">
                    {recentNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-2 rounded-lg hover:bg-slate-50/60 transition-colors cursor-pointer ${!notif.read ? "bg-blue-50/30 border-l-2 border-l-blue-500" : ""}`}
                      >
                        <div className="flex items-start gap-2">
                          <Bell size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${!notif.read ? "font-medium text-slate-800" : "text-slate-600"}`}>{notif.title}</p>
                            <p className="text-xs text-slate-400 truncate">{notif.desc}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{notif.time}</p>
                          </div>
                          {!notif.read && (
                            <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-1.5 rounded-lg bg-violet-50 text-violet-600">
                  <Zap size={16} />
                </div>
                <h3 className="text-sm font-semibold text-slate-700">Aksi Cepat</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: "Isi Absensi", icon: ClipboardCheck, path: "/guru/akademik/absensi", color: "blue" },
                  { label: "Input Nilai", icon: Edit, path: "/guru/akademik/nilai", color: "purple" },
                  { label: "Buat Quiz", icon: FilePlus2, path: "/guru/akademik/quiz", color: "amber" },
                  { label: "Catat Prestasi", icon: Star, path: "/guru/akademik/catatanPrestasi", color: "emerald" },
                  { label: "Catat Pelanggaran", icon: AlertTriangle, path: "/guru/akademik/catatanPelanggaran", color: "rose" },
                  { label: "Chat", icon: MessageSquare, path: "/guru/chat", color: "slate" },
                ].map((action) => {
                  const Icon = action.icon;
                  const colorMap = {
                    blue: "bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200",
                    purple: "bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200",
                    amber: "bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-200",
                    emerald: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-200",
                    rose: "bg-rose-50 text-rose-600 hover:bg-rose-100 border-rose-200",
                    slate: "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200",
                  };
                  return (
                    <button
                      key={action.label}
                      onClick={() => router.push(action.path)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all hover:scale-105 ${colorMap[action.color]}`}
                    >
                      <Icon size={16} />
                      <span className="text-xs font-medium">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FOOTER */}
            <div className="text-center text-xs text-slate-400/80 py-2 border-t border-slate-200/40">
              © 2026 SmartSchool • Dashboard terakhir diperbarui {new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}