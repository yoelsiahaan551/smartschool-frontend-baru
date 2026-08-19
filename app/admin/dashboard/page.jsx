"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import {
  LayoutDashboard,
  Users,
  UserCheck,
  GraduationCap,
  ClipboardCheck,
  BookOpen,
  FileText,
  CalendarDays,
  Bell,
  Activity,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  RefreshCw,
  Plus,
  Megaphone,
  ShieldCheck,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  School,
  BookMarked,
  ClipboardList,
  Settings,
} from "lucide-react";

/* =========================================================
   DUMMY DATA
========================================================= */
const statsData = [
  { id: 1, label: "Total Siswa", value: "1,284", change: "+12%", trend: "up", icon: Users, color: "blue" },
  { id: 2, label: "Total Guru", value: "64", change: "+4%", trend: "up", icon: UserCheck, color: "emerald" },
  { id: 3, label: "Total Kelas", value: "36", change: "+2", trend: "up", icon: GraduationCap, color: "purple" },
  { id: 4, label: "Kehadiran Hari Ini", value: "94.8%", change: "-2.1%", trend: "down", icon: ClipboardCheck, color: "amber" },
];

const recentActivities = [
  { id: 1, user: "Admin Akademik", action: "Menambahkan siswa baru", target: "Andi Pratama - XII RPL 1", time: "10 menit lalu", type: "student" },
  { id: 2, user: "Budi Santoso", action: "Menginput nilai", target: "Matematika - XII RPL 2", time: "25 menit lalu", type: "grade" },
  { id: 3, user: "Siti Rahma", action: "Mengunggah materi", target: "Bahasa Indonesia - Kelas XI", time: "1 jam lalu", type: "material" },
  { id: 4, user: "Admin Sekolah", action: "Membuat pengumuman", target: "Jadwal Ujian Semester", time: "2 jam lalu", type: "announcement" },
  { id: 5, user: "Dewi Lestari", action: "Mencatat kehadiran", target: "Kelas X TKJ 1", time: "3 jam lalu", type: "attendance" },
];

const pendingTasks = [
  { id: 1, title: "7 siswa menunggu verifikasi data", category: "Siswa", priority: "high" },
  { id: 2, title: "12 tugas belum diperiksa guru", category: "Tugas", priority: "medium" },
  { id: 3, title: "Jadwal ujian semester belum dipublikasikan", category: "Ujian", priority: "high" },
  { id: 4, title: "5 materi menunggu publikasi", category: "Materi", priority: "low" },
];

const notificationsData = [
  { id: 1, title: "Pengumuman Ujian Semester", desc: "Jadwal ujian semester telah dibuat", time: "30 menit lalu", read: false },
  { id: 2, title: "Data siswa perlu diverifikasi", desc: "Terdapat 7 data siswa baru", time: "1 jam lalu", read: false },
  { id: 3, title: "Laporan kehadiran tersedia", desc: "Laporan kehadiran minggu ini sudah tersedia", time: "3 jam lalu", read: true },
  { id: 4, title: "Backup data berhasil", desc: "Backup database sekolah berhasil dilakukan", time: "Kemarin", read: true },
];

const attendanceData = [
  { label: "Sen", value: 91 },
  { label: "Sel", value: 94 },
  { label: "Rab", value: 92 },
  { label: "Kam", value: 96 },
  { label: "Jum", value: 93 },
  { label: "Sab", value: 89 },
];

const quickActions = [
  { label: "Kelola Siswa", icon: Users, path: "/admin/siswa", color: "blue" },
  { label: "Kelola Guru", icon: UserCheck, path: "/admin/guru", color: "emerald" },
  { label: "Kelola Kelas", icon: GraduationCap, path: "/admin/kelas", color: "purple" },
  { label: "Materi LMS", icon: BookOpen, path: "/admin/materi", color: "amber" },
  { label: "Ujian & Quiz", icon: ClipboardList, path: "/admin/ujian", color: "rose" },
  { label: "Pengumuman", icon: Megaphone, path: "/admin/pengumuman", color: "slate" },
];

const getActivityIcon = (type) => {
  const map = {
    student: Users,
    grade: FileText,
    material: BookOpen,
    announcement: Megaphone,
    attendance: ClipboardCheck,
  };
  return map[type] || Activity;
};

const getActivityColor = (type) => {
  const map = {
    student: "bg-blue-50 text-blue-600",
    grade: "bg-purple-50 text-purple-600",
    material: "bg-emerald-50 text-emerald-600",
    announcement: "bg-amber-50 text-amber-600",
    attendance: "bg-sky-50 text-sky-600",
  };
  return map[type] || "bg-slate-50 text-slate-600";
};

const getPriorityColor = (priority) => {
  const map = {
    high: "bg-rose-50 text-rose-600 border-rose-200",
    medium: "bg-amber-50 text-amber-600 border-amber-200",
    low: "bg-blue-50 text-blue-600 border-blue-200",
  };
  return map[priority] || "bg-blue-50 text-blue-600 border-blue-200";
};

const getPriorityLabel = (priority) => {
  const map = { high: "Penting", medium: "Sedang", low: "Normal" };
  return map[priority] || "Normal";
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) =>
    date?.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) || "";
  const formatTime = (date) =>
    date?.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) || "";

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* SIDEBAR - langsung tanpa wrapper */}
      <Sidebar
        active="dashboard"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      {/* KONTEN UTAMA */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          notifications={notificationsData.map((n) => ({
            id: n.id,
            title: n.title,
            desc: n.desc,
            read: n.read,
          }))}
          user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "A" }}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8 space-y-5 md:space-y-6">
            {/* HEADER */}
            <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-600 text-white shadow-sm">
                    <LayoutDashboard size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Dashboard</h1>
                  <span className="hidden sm:inline-flex text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    Admin
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-2 sm:ml-[48px]">
                  Selamat datang kembali, Admin. Berikut ringkasan aktivitas sekolah hari ini.
                </p>
                {currentTime && (
                  <p className="text-xs text-slate-400 mt-1 sm:ml-[48px] flex items-center gap-1.5">
                    <Clock size={12} /> {formatDate(currentTime)} • {formatTime(currentTime)} WIB
                  </p>
                )}
              </div>
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
              >
                <RefreshCw size={16} /> Refresh Dashboard
              </button>
            </section>

            {/* STATS */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {statsData.map((stat) => {
                const Icon = stat.icon;
                const colorMap = {
                  blue: "bg-blue-50 text-blue-600",
                  emerald: "bg-emerald-50 text-emerald-600",
                  purple: "bg-purple-50 text-purple-600",
                  amber: "bg-amber-50 text-amber-600",
                };
                const iconColor = colorMap[stat.color] || colorMap.blue;
                const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;
                const trendColor = stat.trend === "up" ? "text-emerald-600" : "text-rose-600";
                return (
                  <div
                    key={stat.id}
                    className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className={`p-2.5 rounded-xl ${iconColor}`}>
                        <Icon size={18} />
                      </div>
                      <span
                        className={`flex items-center gap-0.5 text-xs font-medium ${trendColor} bg-slate-50 px-2 py-1 rounded-full border border-slate-200/60`}
                      >
                        <TrendIcon size={12} /> {stat.change}
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                        {stat.label}
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-slate-800 mt-0.5">{stat.value}</p>
                    </div>
                  </div>
                );
              })}
            </section>

            {/* CHART & SUMMARY */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                      <BarChart3 size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-700">Statistik Kehadiran</h3>
                      <p className="text-[11px] text-slate-400">Kehadiran siswa minggu ini</p>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push("/admin/kehadiran")}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    Detail <ChevronRight size={13} />
                  </button>
                </div>
                <div className="relative h-52 sm:h-56">
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[100, 75, 50, 25, 0].map((value) => (
                      <div key={value} className="flex items-center gap-2">
                        <span className="text-[9px] text-slate-400 w-7">{value}%</span>
                        <div className="flex-1 border-t border-slate-100" />
                      </div>
                    ))}
                  </div>
                  <div className="absolute left-9 right-0 bottom-0 top-0 flex items-end gap-2 sm:gap-4 pt-3 pb-6">
                    {attendanceData.map((item, index) => (
                      <div key={item.label} className="flex-1 h-full flex flex-col justify-end items-center gap-2 group">
                        <div className="relative w-full max-w-[42px] h-full flex items-end">
                          <div
                            className={`w-full rounded-t-lg transition-all duration-500 ${
                              index === attendanceData.length - 1
                                ? "bg-gradient-to-t from-emerald-500 to-emerald-400"
                                : "bg-gradient-to-t from-blue-600 to-blue-400"
                            }`}
                            style={{ height: `${(item.value / 100) * 100}%`, minHeight: "12px" }}
                          />
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                            {item.value}%
                          </div>
                        </div>
                        <span className="absolute bottom-0 text-[10px] text-slate-400">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                    <School size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700">Ringkasan Sekolah</h3>
                    <p className="text-[11px] text-slate-400">Informasi akademik</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users size={15} className="text-blue-500" />
                      <span className="text-sm text-slate-600">Siswa Aktif</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">1.284</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserCheck size={15} className="text-emerald-500" />
                      <span className="text-sm text-slate-600">Guru Aktif</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">64</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookMarked size={15} className="text-purple-500" />
                      <span className="text-sm text-slate-600">Mata Pelajaran</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">28</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen size={15} className="text-amber-500" />
                      <span className="text-sm text-slate-600">Materi LMS</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">342</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ClipboardList size={15} className="text-rose-500" />
                      <span className="text-sm text-slate-600">Ujian Aktif</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">8</span>
                  </div>
                  <div className="pt-3 border-t border-slate-100">
                    <button
                      onClick={() => router.push("/admin/akademik")}
                      className="w-full flex items-center justify-center gap-1 text-sm text-blue-600 font-medium hover:text-blue-700"
                    >
                      Lihat Akademik <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* ACTIVITY & TASKS */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                      <Activity size={16} />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-700">Aktivitas Terbaru</h3>
                  </div>
                  <button
                    onClick={() => router.push("/admin/aktivitas")}
                    className="text-xs text-blue-600 font-medium"
                  >
                    Lihat Semua
                  </button>
                </div>
                <div className="space-y-2">
                  {recentActivities.map((activity) => {
                    const Icon = getActivityIcon(activity.type);
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <div className={`p-2 rounded-lg ${getActivityColor(activity.type)} flex-shrink-0`}>
                          <Icon size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-700">
                            <span className="font-semibold">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-slate-400 truncate mt-0.5">{activity.target}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                      <AlertTriangle size={16} />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-700">Perlu Ditindaklanjuti</h3>
                  </div>
                  <span className="text-xs text-slate-400">{pendingTasks.length} item</span>
                </div>
                <div className="space-y-2">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle size={14} className="text-amber-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 font-medium truncate">{task.title}</p>
                        <p className="text-xs text-slate-400">{task.category}</p>
                      </div>
                      <span className={`text-[10px] px-2 py-1 rounded-full border whitespace-nowrap ${getPriorityColor(task.priority)}`}>
                        {getPriorityLabel(task.priority)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* NOTIFICATIONS & STATUS */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                      <Bell size={16} />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-700">Notifikasi Sekolah</h3>
                  </div>
                  <button
                    onClick={() => router.push("/admin/notifikasi")}
                    className="text-xs text-blue-600 font-medium"
                  >
                    Lihat Semua
                  </button>
                </div>
                <div className="space-y-2">
                  {notificationsData.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                        !notification.read ? "bg-blue-50/50 border-l-2 border-blue-500" : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-white border border-slate-100">
                        <Bell size={14} className={notification.read ? "text-slate-400" : "text-blue-500"} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm ${notification.read ? "text-slate-600" : "font-semibold text-slate-800"}`}>
                            {notification.title}
                          </p>
                          {!notification.read && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{notification.desc}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-5 text-white shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="p-2 rounded-lg bg-white/10">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Status Sekolah</h3>
                    <p className="text-xs text-blue-100">Sistem SmartSchool</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-100">Status Sistem</span>
                    <span className="flex items-center gap-1.5 text-xs font-medium bg-emerald-500/20 text-emerald-100 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />Aktif
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-100">Data Terakhir Backup</span>
                    <span className="text-xs font-medium">Hari ini</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-100">Tahun Ajaran</span>
                    <span className="text-xs font-medium">2026/2027</span>
                  </div>
                  <div className="pt-3 border-t border-white/10">
                    <button
                      onClick={() => router.push("/admin/pengaturan")}
                      className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg py-2.5 text-sm font-medium transition-colors"
                    >
                      <Settings size={15} /> Pengaturan Sekolah
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* QUICK ACTIONS */}
            <section className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-1.5 rounded-lg bg-violet-50 text-violet-600">
                  <Plus size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-700">Aksi Cepat</h3>
                  <p className="text-[11px] text-slate-400">Akses menu yang sering digunakan</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  const colorMap = {
                    blue: "bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200",
                    emerald: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-200",
                    purple: "bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200",
                    amber: "bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-200",
                    rose: "bg-rose-50 text-rose-600 hover:bg-rose-100 border-rose-200",
                    slate: "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200",
                  };
                  return (
                    <button
                      key={action.label}
                      onClick={() => router.push(action.path)}
                      className={`flex flex-col sm:flex-row items-center justify-center gap-2 px-3 py-3 rounded-lg border transition-all hover:-translate-y-0.5 hover:shadow-sm ${colorMap[action.color]}`}
                    >
                      <Icon size={17} />
                      <span className="text-[11px] sm:text-xs font-medium text-center">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <footer className="text-center text-[11px] text-slate-400 py-3 border-t border-slate-200/60">
              © 2026 SmartSchool • School Management & LMS
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}