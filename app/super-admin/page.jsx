"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  LayoutDashboard,
  School,
  Building2,
  Users,
  Package,
  UserCheck,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Calendar,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Edit,
  Sparkles,
  Crown,
  Zap,
  Award,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  CreditCard,
  Bell,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Settings,
} from "lucide-react";

// ===== DUMMY DATA =====
const statsData = [
  {
    id: 1,
    label: "Total Sekolah",
    value: "128",
    change: "+12",
    trend: "up",
    icon: School,
    color: "blue",
  },
  {
    id: 2,
    label: "Total Yayasan",
    value: "42",
    change: "+3",
    trend: "up",
    icon: Building2,
    color: "purple",
  },
  {
    id: 3,
    label: "Pengguna Aktif",
    value: "1.198",
    change: "+54",
    trend: "up",
    icon: Users,
    color: "emerald",
  },
  {
    id: 4,
    label: "Langganan Aktif",
    value: "105",
    change: "-2",
    trend: "down",
    icon: Package,
    color: "amber",
  },
];

const recentActivities = [
  {
    id: 1,
    user: "Super Admin",
    action: "Menambahkan sekolah baru",
    target: "SMA Bina Bangsa",
    timestamp: "2026-08-11T14:30:00Z",
    type: "create",
  },
  {
    id: 2,
    user: "Super Admin",
    action: "Memperbarui paket langganan",
    target: "SMA Negeri 1 Jakarta",
    timestamp: "2026-08-11T10:15:00Z",
    type: "update",
  },
  {
    id: 3,
    user: "Admin Sekolah",
    action: "Menambahkan user baru",
    target: "Guru - SMP BPK Penabur",
    timestamp: "2026-08-10T16:45:00Z",
    type: "create",
  },
  {
    id: 4,
    user: "Super Admin",
    action: "Memverifikasi yayasan",
    target: "YPI Harapan",
    timestamp: "2026-08-10T09:00:00Z",
    type: "update",
  },
  {
    id: 5,
    user: "Sistem",
    action: "Pembayaran berhasil",
    target: "SMA Al-Azhar - Rp1.200.000",
    timestamp: "2026-08-09T13:20:00Z",
    type: "payment",
  },
];

const upcomingTasks = [
  { id: 1, title: "Backup Database", due: "2026-08-12", priority: "high" },
  { id: 2, title: "Review Langganan Expired", due: "2026-08-13", priority: "medium" },
  { id: 3, title: "Update Sistem v2.1", due: "2026-08-15", priority: "low" },
  { id: 4, title: "Laporan Bulanan", due: "2026-08-18", priority: "high" },
];

const recentNotifications = [
  { id: 1, title: "Pembaruan Sistem v2.0", desc: "SmartSchool telah diperbarui ke versi 2.0", read: false, time: "2 jam lalu" },
  { id: 2, title: "Pengingat: Backup Data", desc: "Lakukan backup data secara rutin", read: false, time: "5 jam lalu" },
  { id: 3, title: "Yayasan baru mendaftar", desc: "YPI Harapan telah mendaftar", read: true, time: "1 hari lalu" },
];

const subscriptionStats = {
  total: 128,
  aktif: 105,
  trial: 18,
  expired: 5,
};

// ===== DATA GRAFIK YANG LEBIH LENGKAP =====
const chartData = [
  { month: "Jan", value: 42, label: "Jan" },
  { month: "Feb", value: 48, label: "Feb" },
  { month: "Mar", value: 55, label: "Mar" },
  { month: "Apr", value: 62, label: "Apr" },
  { month: "May", value: 70, label: "Mei" },
  { month: "Jun", value: 78, label: "Jun" },
  { month: "Jul", value: 85, label: "Jul" },
  { month: "Aug", value: 92, label: "Agu" },
  { month: "Sep", value: 0, label: "Sep" },
  { month: "Oct", value: 0, label: "Okt" },
  { month: "Nov", value: 0, label: "Nov" },
  { month: "Dec", value: 0, label: "Des" },
];

// ===== UTILITY =====
const formatTanggal = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

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
  return formatTanggal(dateString);
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
    create: CheckCircle,
    update: Edit,
    payment: DollarSign,
  };
  return map[type] || Activity;
};

const getActivityColor = (type) => {
  const map = {
    create: "text-emerald-500 bg-emerald-50",
    update: "text-blue-500 bg-blue-50",
    payment: "text-purple-500 bg-purple-50",
  };
  return map[type] || "text-slate-500 bg-slate-50";
};

// ===== MAIN COMPONENT =====

export default function DashboardPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu] = useState("dashboard");

  const notifications = [
    { id: 1, title: "Pembaruan Sistem v2.0", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Pengingat: Backup Data", desc: "Dikirim 1 hari lalu", read: false },
    { id: 3, title: "Yayasan baru mendaftar", desc: "Dikirim 3 hari lalu", read: true },
  ];

  const maxChartValue = Math.max(...chartData.map((d) => d.value)) || 1;
  const currentMonthIndex = new Date().getMonth();
  const displayData = chartData.slice(0, currentMonthIndex + 1);

  return (
    // Pola wrapper disamakan persis dengan halaman Profil/Pengumuman:
    // min-h-screen (bukan h-screen + overflow-hidden) di wrapper luar,
    // Sidebar dipanggil langsung tanpa pembungkus flex-shrink-0 tambahan,
    // dan main tanpa overflow-y-auto (p-4 sm:p-6 lg:p-8), supaya sidebar
    // mengikuti tinggi konten halaman dan konsisten saat responsive/zoom.
    <div className="flex min-h-screen bg-slate-50">
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
          user={{ name: "Super Admin", email: "admin@smartschool.com", avatar: "SA" }}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="w-full space-y-6">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="p-2 rounded-lg bg-blue-600 text-white shadow-sm flex-shrink-0">
                    <LayoutDashboard size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 truncate">
                    Dashboard
                  </h1>
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 flex-shrink-0 whitespace-nowrap">
                    Super Admin
                  </span>
                </div>
                <p className="text-sm text-slate-500 sm:ml-[52px] mt-1 sm:mt-0 flex items-start gap-1.5 min-w-0">
                  <Sparkles size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="min-w-0">Selamat datang kembali, Super Admin! Berikut ringkasan sistem Anda.</span>
                </p>
              </div>
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm flex-shrink-0"
                >
                  <RefreshCw size={16} className="flex-shrink-0" />
                  <span className="hidden xs:inline whitespace-nowrap">Refresh</span>
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
                    <div className="flex items-start justify-between gap-2">
                      <div className={`p-2.5 rounded-xl ${iconBg} flex-shrink-0`}>
                        <Icon size={18} />
                      </div>
                      <span className={`flex items-center gap-0.5 text-xs font-medium ${trendColor} bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200/60 flex-shrink-0 whitespace-nowrap`}>
                        <TrendIcon size={12} />
                        {stat.change}
                      </span>
                    </div>
                    <div className="mt-3 min-w-0">
                      <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-800 truncate">{stat.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CHART & SUBSCRIPTION SUMMARY */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* CHART - DENGAN VISUALISASI YANG JELAS */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4 gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
                      <BarChart3 size={16} />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-700 truncate">Pertumbuhan Sekolah</h3>
                  </div>
                  <span className="text-xs text-slate-400 flex-shrink-0">2026</span>
                </div>

                {/* GRAFIK BAR DENGAN TAMPILAN YANG LEBIH JELAS */}
                <div className="relative pt-2">
                  <div className="flex items-end h-48 gap-1 sm:gap-2">
                    {displayData.map((item, idx) => {
                      const height = item.value > 0 ? (item.value / maxChartValue) * 100 : 4;
                      const isLast = idx === displayData.length - 1;
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                          <div className="relative w-full max-w-[36px]">
                            <div
                              className={`w-full bg-gradient-to-t from-blue-500 to-indigo-400 rounded-t-lg transition-all duration-700 hover:opacity-80 ${
                                isLast ? "from-emerald-500 to-emerald-400" : ""
                              }`}
                              style={{ 
                                height: `${height}%`,
                                minHeight: item.value > 0 ? "8px" : "4px",
                                transition: "height 0.7s ease-in-out"
                              }}
                            />
                            {/* Tooltip value on hover */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              {item.value} sekolah
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

                  {/* Garis bantu horizontal */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[0, 25, 50, 75, 100].map((percent) => (
                      <div
                        key={percent}
                        className="border-t border-slate-200/40"
                        style={{ top: `${100 - percent}%`, position: "absolute", width: "100%" }}
                      />
                    ))}
                  </div>

                  {/* Label nilai maksimum */}
                  <div className="flex justify-between mt-2 text-[9px] text-slate-400">
                    <span>0</span>
                    <span>{maxChartValue}</span>
                  </div>
                </div>
              </div>

              {/* Subscription Summary */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
                <div className="flex items-center gap-2.5 mb-4 min-w-0">
                  <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600 flex-shrink-0">
                    <Package size={16} />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-700 truncate">Ringkasan Langganan</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-slate-600 truncate">Total Sekolah</span>
                    <span className="text-sm font-semibold text-slate-800 flex-shrink-0">{subscriptionStats.total}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-slate-600 flex items-center gap-1.5 min-w-0 truncate">
                      <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                      Aktif
                    </span>
                    <span className="text-sm font-semibold text-emerald-600 flex-shrink-0">{subscriptionStats.aktif}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-slate-600 flex items-center gap-1.5 min-w-0 truncate">
                      <Clock size={14} className="text-amber-500 flex-shrink-0" />
                      Trial
                    </span>
                    <span className="text-sm font-semibold text-amber-600 flex-shrink-0">{subscriptionStats.trial}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-slate-600 flex items-center gap-1.5 min-w-0 truncate">
                      <XCircle size={14} className="text-rose-500 flex-shrink-0" />
                      Expired
                    </span>
                    <span className="text-sm font-semibold text-rose-600 flex-shrink-0">{subscriptionStats.expired}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200/60">
                    <button
                      onClick={() => router.push("/super-admin/langgananSekolah")}
                      className="w-full text-center text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center justify-center gap-1"
                    >
                      Kelola Langganan
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTIVITIES & TASKS - tetap sama seperti sebelumnya */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Recent Activities */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4 gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 flex-shrink-0">
                      <Activity size={16} />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-700 truncate">Aktivitas Terbaru</h3>
                  </div>
                  <button
                    onClick={() => router.push("/super-admin/profil")}
                    className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors flex-shrink-0 whitespace-nowrap"
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
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 flex-shrink-0">
                        <Calendar size={16} />
                      </div>
                      <h3 className="text-sm font-semibold text-slate-700 truncate">Tugas Mendatang</h3>
                    </div>
                    <span className="text-xs text-slate-400 flex-shrink-0 whitespace-nowrap">{upcomingTasks.length} tugas</span>
                  </div>
                  <div className="space-y-2">
                    {upcomingTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-slate-50/60 transition-colors">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${task.priority === "high" ? "bg-rose-500" : task.priority === "medium" ? "bg-amber-500" : "bg-blue-500"}`} />
                          <span className="text-sm text-slate-700 truncate">{task.title}</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 whitespace-nowrap ${getPriorityColor(task.priority)}`}>
                          {getPriorityLabel(task.priority)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Notifications */}
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
                        <Bell size={16} />
                      </div>
                      <h3 className="text-sm font-semibold text-slate-700 truncate">Notifikasi</h3>
                    </div>
                    <button
                      onClick={() => router.push("/super-admin/notifikasi")}
                      className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors flex-shrink-0 whitespace-nowrap"
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
              <div className="flex items-center gap-2.5 mb-4 min-w-0">
                <div className="p-1.5 rounded-lg bg-violet-50 text-violet-600 flex-shrink-0">
                  <Zap size={16} />
                </div>
                <h3 className="text-sm font-semibold text-slate-700 truncate">Aksi Cepat</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: "Tambah Sekolah", icon: School, path: "/super-admin/sekolah/tambah", color: "blue" },
                  { label: "Tambah Yayasan", icon: Building2, path: "/super-admin/yayasan/tambah", color: "purple" },
                  { label: "Buat Pengumuman", icon: Bell, path: "/super-admin/notifikasi", color: "amber" },
                  { label: "Kelola Paket", icon: Package, path: "/super-admin/paketModul", color: "emerald" },
                  { label: "Manajemen Akses", icon: Users, path: "/super-admin/manajemenAkses", color: "rose" },
                  { label: "Pengaturan", icon: Settings, path: "/super-admin/pengaturan", color: "slate" },
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
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all hover:scale-105 min-w-0 ${colorMap[action.color]}`}
                    >
                      <Icon size={16} className="flex-shrink-0" />
                      <span className="text-xs font-medium truncate">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FOOTER */}
            <div className="text-center text-xs text-slate-400/80 py-2 border-t border-slate-200/40 px-2">
              <span className="break-words">
                © 2026 SmartSchool • Dashboard terakhir diperbarui {new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}