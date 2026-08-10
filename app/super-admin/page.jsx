"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import {
  School,
  Building2,
  Users,
  GraduationCap,
  Package,
  UserCheck,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart,
  Calendar,
  Clock,
  Bell,
  Plus,
  Database,
  Server,
  Globe,
  HardDrive,
  Cpu,
  Activity,
  ChevronRight,
  MoreHorizontal,
  Zap,
  Megaphone,
  Monitor,
  Sparkles,
  Layers,
  Gift,
  Star,
  Shield,
  Award,
  BadgeCheck,
  Rocket,
  Settings,
  LayoutGrid,
  Grid3x3,
  CircleDollarSign,
  Coins,
  Timer,
  TimerReset,
  UserCog,
  BookOpen,
  FileText,
  Mail,
  MessageSquare,
  Share2,
  Users2,
  Handshake,
  Briefcase,
  Target,
  Lightbulb,
  Flame,
  Crown,
  Diamond,
  Gem,
  Medal,
  Trophy,
} from "lucide-react";


const totalSekolah = 125;
const totalYayasan = 18;
const totalUser = 5246;
const totalSiswa = 25300;
const paketAktif = 4;
const totalLangganan = 102;
const akanBerakhir = 12;
const pendapatan = "Rp85.000.000";

const sekolahPerBulan = [12, 18, 22, 30, 28, 35, 42, 50, 55, 65, 70, 80];
const pendapatanPerBulan = [5000000, 7500000, 10000000, 12500000, 15000000, 18500000, 22000000, 26000000, 31000000, 37000000, 43000000, 50000000];

const paketData = [
  { name: "Starter", value: 35, color: "#94a3b8" },
  { name: "Professional", value: 45, color: "#64748b" },
  { name: "Enterprise", value: 20, color: "#475569" },
];

const langgananHampirHabis = [
  { sekolah: "SMK TB", paket: "Enterprise", berakhir: "3 hari", status: "urgent" },
  { sekolah: "SMA 5", paket: "Starter", berakhir: "5 hari", status: "warning" },
  { sekolah: "SMP Harapan", paket: "Professional", berakhir: "7 hari", status: "warning" },
  { sekolah: "SDN 01 Jakarta", paket: "Pro", berakhir: "10 hari", status: "normal" },
];

const aktivitas = [
  { waktu: "10 menit lalu", aksi: "Yayasan baru ditambahkan" },
  { waktu: "15 menit lalu", aksi: "Sekolah baru mendaftar" },
  { waktu: "30 menit lalu", aksi: "Paket Enterprise diperbarui" },
  { waktu: "1 jam lalu", aksi: "Role Guru dibuat" },
  { waktu: "2 jam lalu", aksi: "Admin sekolah login" },
];

const pengumuman = [
  { title: "Maintenance Server", date: "Sabtu, 12 Agustus" },
  { title: "Versi 2.0 Telah Dirilis", date: "2 hari lalu" },
  { title: "Backup Database Berhasil", date: "1 hari lalu" },
];

const systemStatus = [
  { name: "Database", status: "online", icon: Database },
  { name: "Backend API", status: "online", icon: Server },
  { name: "Frontend", status: "online", icon: Globe },
  { name: "Storage", status: "85%", icon: HardDrive },
  { name: "CPU", status: "32%", icon: Cpu },
  { name: "RAM", status: "58%", icon: Activity },
];

const kalenderEvents = [
  { date: "5", title: "5 Langganan Berakhir Hari Ini", type: "expired" },
  { date: "3", title: "3 Pengumuman", type: "announcement" },
  { date: "2", title: "2 Maintenance", type: "maintenance" },
];


export default function SuperAdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const notifications = [
    { id: 1, title: "Pembaruan Sistem v2.0", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Pengingat: Backup Data", desc: "Dikirim 1 hari lalu", read: false },
    { id: 3, title: "Sekolah baru mendaftar", desc: "Dikirim 3 hari lalu", read: true },
  ];

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar
        active={activeMenu}
        setActive={setActiveMenu}
        collapsed={!sidebarOpen}
        setCollapsed={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          user={{ name: "Sarah", email: "sarah@smartschool.com", avatar: "SA" }}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-white">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}


function DashboardContent() {
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
      {/* HEADER DASHBOARD */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-light text-slate-800 tracking-tight">
            Dashboard
            <span className="ml-2 md:ml-3 text-xs md:text-sm font-normal text-slate-400 bg-white px-2 md:px-3 py-1 rounded-full border border-slate-200/60 shadow-sm">
              Super Admin
            </span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5 md:mt-1 flex items-center gap-1.5 md:gap-2">
            <Sparkles size={12} className="md:size-[14px] text-slate-400" />
            Selamat Datang, Sarah — Kelola seluruh sistem SmartSchool dari satu tempat.
          </p>
        </div>
        <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-slate-500 bg-white/80 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-slate-200/60 shadow-sm">
          <Calendar size={14} className="md:size-[16px] text-slate-400" />
          <span className="font-medium text-slate-600 hidden sm:inline">{today}</span>
          <span className="font-medium text-slate-600 sm:hidden">
            {today.split(",")[0]}, {today.split(",")[1]?.trim()}
          </span>
          <div className="w-px h-4 bg-slate-200" />
          <Bell size={14} className="md:size-[16px] text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" />
        </div>
      </div>

      {/* STATISTIK UTAMA — BARIS 1 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatCardPremium icon={School} label="Total Sekolah" value={totalSekolah} color="blue" />
        <StatCardPremium icon={Building2} label="Total Yayasan" value={totalYayasan} color="emerald" />
        <StatCardPremium icon={Users} label="Total User" value={totalUser.toLocaleString()} color="purple" />
        <StatCardPremium icon={GraduationCap} label="Total Siswa" value={totalSiswa.toLocaleString()} color="amber" />
      </div>

      {/* STATISTIK UTAMA — BARIS 2 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatCardPremium icon={Package} label="Paket Aktif" value={paketAktif} color="indigo" />
        <StatCardPremium icon={UserCheck} label="Langganan" value={totalLangganan} color="teal" />
        <StatCardPremium icon={AlertTriangle} label="Akan Berakhir" value={akanBerakhir} color="rose" />
        <StatCardPremium icon={DollarSign} label="Pendapatan" value={pendapatan} color="orange" />
      </div>

      {/* GRAFIK: LINE & BAR */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        <ChartCardPremium 
          title="Pertumbuhan Sekolah" 
          subtitle="Jumlah sekolah yang bergabung per bulan"
          icon={TrendingUp}
        >
          <LineChart data={sekolahPerBulan} labels={["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]} color="#3b82f6" />
        </ChartCardPremium>
        <ChartCardPremium 
          title="Pendapatan Langganan" 
          subtitle="Pendapatan per bulan (Rp)"
          icon={CircleDollarSign}
        >
          <BarChart data={pendapatanPerBulan} labels={["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]} color="#8b5cf6" />
        </ChartCardPremium>
      </div>

      {/* PIE CHART & TABEL LANGANAN */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        <div className="md:col-span-1">
          <PieChartCardPremium data={paketData} />
        </div>
        <div className="md:col-span-2">
          <ExpiringTablePremium data={langgananHampirHabis} />
        </div>
      </div>

      {/* AKTIVITAS & PENGUMUMAN */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        <ActivityLogPremium data={aktivitas} />
        <AnnouncementsPremium data={pengumuman} />
      </div>

      {/* QUICK ACTION */}
      <QuickActionsPremium />

      {/* SYSTEM STATUS & KALENDER */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        <div className="md:col-span-2">
          <SystemStatusPremium data={systemStatus} />
        </div>
        <div className="md:col-span-1">
          <CalendarMiniPremium events={kalenderEvents} />
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-[10px] md:text-xs text-slate-400 border-t border-slate-200/60 pt-3 md:pt-4 flex items-center justify-center gap-1.5 md:gap-2">
        <Shield size={10} className="md:size-[12px] text-slate-400" />
        <span>&copy; 2026 Smart School — Super Admin Panel</span>
      </div>
    </div>
  );
}


function StatCardPremium({ icon: Icon, label, value, color }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
    amber: "bg-amber-50 text-amber-600",
    indigo: "bg-indigo-50 text-indigo-600",
    teal: "bg-teal-50 text-teal-600",
    rose: "bg-rose-50 text-rose-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="group bg-white rounded-xl border border-slate-200 p-3 md:p-4 lg:p-5 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-center gap-3 md:gap-4">
        <div className={`w-9 h-9 md:w-10 md:h-11 rounded-xl ${colorMap[color]} flex items-center justify-center shadow-sm group-hover:shadow transition-all`}>
          <Icon size={16} className="md:size-[18px] lg:size-[20px]" />
        </div>
        <div>
          <p className="text-[10px] md:text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</p>
          <p className="text-base md:text-xl lg:text-2xl font-semibold text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  );
}


function ChartCardPremium({ title, subtitle, children, icon: Icon }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 lg:p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5">
        {Icon && (
          <div className="p-1.5 md:p-2 rounded-lg bg-slate-50 border border-slate-200/60">
            <Icon size={16} className="md:size-[18px] text-slate-500" />
          </div>
        )}
        <div>
          <h3 className="text-sm md:text-base font-semibold text-slate-700">{title}</h3>
          <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}


function LineChart({ data, labels, color }) {
  const max = Math.max(...data);
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d / max) * 80 - 10;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="relative h-36 md:h-48 w-full">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {[0, 25, 50, 75, 100].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />
        ))}
        <polygon points={`0,100 ${points} 100,100`} fill={`${color}10`} />
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = 100 - (d / max) * 80 - 10;
          return (
            <circle key={i} cx={x} cy={y} r="2.5" fill={color} stroke="white" strokeWidth="1.5" />
          );
        })}
      </svg>
      <div className="flex justify-between mt-1 text-[8px] md:text-[10px] text-slate-400">
        {labels.map((label, i) => (
          <span key={i} style={{ width: `${100 / labels.length}%`, textAlign: 'center' }}>{label}</span>
        ))}
      </div>
    </div>
  );
}


function BarChart({ data, labels, color }) {
  const max = Math.max(...data);

  return (
    <div className="h-36 md:h-48 w-full">
      <div className="flex items-end h-28 md:h-40 gap-0.5 md:gap-1">
        {data.map((d, i) => {
          const height = (d / max) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center group">
              <div
                className="w-full rounded-t transition-all hover:opacity-80"
                style={{
                  height: `${Math.max(height, 5)}%`,
                  background: `linear-gradient(to top, ${color}dd, ${color})`,
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-1 text-[8px] md:text-[10px] text-slate-400">
        {labels.map((label, i) => (
          <span key={i} style={{ width: `${100 / labels.length}%`, textAlign: 'center' }}>{label}</span>
        ))}
      </div>
    </div>
  );
}


function PieChartCardPremium({ data }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 lg:p-6 shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5">
        <div className="p-1.5 md:p-2 rounded-lg bg-slate-50 border border-slate-200/60">
          <PieChart size={16} className="md:size-[18px] text-slate-500" />
        </div>
        <h3 className="text-sm md:text-base font-semibold text-slate-700">Statistik Paket</h3>
      </div>
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 md:w-40 md:h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {data.map((item, index) => {
              const prev = data.slice(0, index).reduce((sum, d) => sum + d.value, 0);
              const start = (prev / total) * 100;
              const end = ((prev + item.value) / total) * 100;
              const x1 = 50 + 40 * Math.cos((start / 100) * 2 * Math.PI);
              const y1 = 50 + 40 * Math.sin((start / 100) * 2 * Math.PI);
              const x2 = 50 + 40 * Math.cos((end / 100) * 2 * Math.PI);
              const y2 = 50 + 40 * Math.sin((end / 100) * 2 * Math.PI);
              const large = end - start > 50 ? 1 : 0;
              return (
                <path
                  key={index}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${large} 1 ${x2} ${y2} Z`}
                  fill={item.color}
                  stroke="white"
                  strokeWidth="2"
                  className="transition-all hover:opacity-80"
                />
              );
            })}
          </svg>
        </div>
        <div className="mt-3 md:mt-4 w-full space-y-1 md:space-y-1.5">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600">{item.name}</span>
              </div>
              <span className="font-medium text-slate-700">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function ExpiringTablePremium({ data }) {
  const statusColors = {
    urgent: "bg-rose-50 text-rose-600 border-rose-200",
    warning: "bg-amber-50 text-amber-600 border-amber-200",
    normal: "bg-slate-50 text-slate-600 border-slate-200",
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 lg:p-6 shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
      <div className="flex items-center justify-between mb-4 md:mb-5">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="p-1.5 md:p-2 rounded-lg bg-slate-50 border border-slate-200/60">
            <TimerReset size={16} className="md:size-[18px] text-slate-500" />
          </div>
          <h3 className="text-sm md:text-base font-semibold text-slate-700">Langganan Hampir Habis</h3>
        </div>
        <span className="text-[10px] md:text-xs text-slate-500 hover:text-slate-700 cursor-pointer transition-colors font-medium">Lihat semua</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs md:text-sm">
          <thead>
            <tr className="text-left text-[10px] md:text-xs text-slate-400 border-b border-slate-200/60">
              <th className="pb-2 font-medium">Sekolah</th>
              <th className="pb-2 font-medium">Paket</th>
              <th className="pb-2 font-medium">Berakhir</th>
              <th className="pb-2 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="border-b border-slate-100/80 last:border-0">
                <td className="py-2 md:py-2.5 font-medium text-slate-700">{item.sekolah}</td>
                <td className="py-2 md:py-2.5 text-slate-600">{item.paket}</td>
                <td className="py-2 md:py-2.5">
                  <span className={`px-1.5 md:px-2.5 py-0.5 rounded-full text-[8px] md:text-[10px] font-medium border ${statusColors[item.status]}`}>
                    {item.berakhir}
                  </span>
                </td>
                <td className="py-2 md:py-2.5 text-right">
                  <button className="text-[10px] md:text-xs text-slate-500 hover:text-slate-700 font-medium transition-colors hover:underline">
                    Perpanjang
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function ActivityLogPremium({ data }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 lg:p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5">
        <div className="p-1.5 md:p-2 rounded-lg bg-slate-50 border border-slate-200/60">
          <Zap size={16} className="md:size-[18px] text-slate-500" />
        </div>
        <h3 className="text-sm md:text-base font-semibold text-slate-700">Aktivitas Terbaru</h3>
      </div>
      <div className="space-y-3 md:space-y-4">
        {data.map((item, i) => (
          <div key={i} className="flex items-start gap-2 md:gap-3">
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-slate-300 mt-1.5 md:mt-2 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs md:text-sm text-slate-600">{item.aksi}</p>
              <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">{item.waktu}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function AnnouncementsPremium({ data }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 lg:p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5">
        <div className="p-1.5 md:p-2 rounded-lg bg-slate-50 border border-slate-200/60">
          <Megaphone size={16} className="md:size-[18px] text-slate-500" />
        </div>
        <h3 className="text-sm md:text-base font-semibold text-slate-700">Pengumuman</h3>
      </div>
      <div className="space-y-2 md:space-y-3">
        {data.map((item, i) => (
          <div key={i} className="flex items-start gap-2 md:gap-3 pb-2 md:pb-3 border-b border-slate-100/80 last:border-0">
            <div className="p-1 rounded bg-slate-50 border border-slate-200/40">
              <Bell size={10} className="md:size-[12px] text-slate-400" />
            </div>
            <div>
              <p className="text-xs md:text-sm font-medium text-slate-700">{item.title}</p>
              <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function QuickActionsPremium() {
  const actions = [
    { label: "Tambah Sekolah", icon: School },
    { label: "Tambah Yayasan", icon: Building2 },
    { label: "Tambah Paket", icon: Package },
    { label: "Tambah Langganan", icon: UserCheck },
    { label: "Buat Pengumuman", icon: Megaphone },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 lg:p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5">
        <div className="p-1.5 md:p-2 rounded-lg bg-slate-50 border border-slate-200/60">
          <Rocket size={16} className="md:size-[18px] text-slate-500" />
        </div>
        <h3 className="text-sm md:text-base font-semibold text-slate-700">Quick Action</h3>
      </div>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {actions.map((action, i) => (
          <button
            key={i}
            className="flex items-center gap-1.5 md:gap-2.5 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-[11px] md:text-sm font-medium text-slate-600 bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 hover:text-slate-800 transition-all duration-200"
          >
            <action.icon size={12} className="md:size-[15px] text-slate-400" />
            <span className="hidden xs:inline">{action.label}</span>
            <span className="xs:hidden">{action.label.split(" ")[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}


function SystemStatusPremium({ data }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 lg:p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5">
        <div className="p-1.5 md:p-2 rounded-lg bg-slate-50 border border-slate-200/60">
          <Monitor size={16} className="md:size-[18px] text-slate-500" />
        </div>
        <h3 className="text-sm md:text-base font-semibold text-slate-700">Ringkasan Sistem</h3>
      </div>
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        {data.map((item, i) => {
          const isPercentage = typeof item.status === 'string' && item.status.includes('%');
          const isOnline = item.status === 'online';
          const statusColor = isOnline ? 'text-emerald-600' : isPercentage ? 'text-amber-600' : 'text-slate-400';
          const dotColor = isOnline ? 'bg-emerald-500' : isPercentage ? 'bg-amber-500' : 'bg-slate-300';

          return (
            <div key={i} className="flex items-center justify-between p-2 md:p-3 bg-slate-50/80 rounded-lg border border-slate-200/40 hover:bg-slate-100/50 transition-colors">
              <div className="flex items-center gap-1.5 md:gap-2.5">
                <item.icon size={12} className="md:size-[15px] text-slate-400" />
                <span className="text-[11px] md:text-sm text-slate-600">{item.name}</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <span className={`text-[10px] md:text-xs font-medium ${statusColor}`}>{item.status}</span>
                <span className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${dotColor}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


function CalendarMiniPremium({ events }) {
  const typeColors = {
    expired: "bg-rose-50 border-rose-200 text-rose-700",
    announcement: "bg-blue-50 border-blue-200 text-blue-700",
    maintenance: "bg-amber-50 border-amber-200 text-amber-700",
  };

  const today = new Date();
  const monthName = today.toLocaleDateString("id-ID", { month: "long", year: "numeric" });

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 lg:p-6 shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      {/* Header Kalender */}
      <div className="flex items-center justify-between mb-3 md:mb-5">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="p-1.5 md:p-2 rounded-lg bg-slate-50 border border-slate-200/60">
            <Calendar size={16} className="md:size-[18px] text-slate-500" />
          </div>
          <h3 className="text-sm md:text-base font-semibold text-slate-700">Kalender</h3>
        </div>
        <span className="text-xs md:text-sm font-medium text-slate-600">{monthName}</span>
      </div>

      {/* Mini Grid Hari */}
      <div className="grid grid-cols-7 gap-0.5 md:gap-1 text-center text-[8px] md:text-xs font-medium text-slate-400 mb-1 md:mb-2">
        {["S", "S", "R", "K", "J", "S", "M"].map((day, i) => (
          <span key={i} className="py-0.5 md:py-1">{day}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5 md:gap-1 text-center text-[10px] md:text-sm">
        {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
          const hasEvent = events.some(e => parseInt(e.date) === date);
          const isToday = date === today.getDate();
          const eventData = events.find(e => parseInt(e.date) === date);

          return (
            <div
              key={date}
              className={`
                py-0.5 md:py-1.5 rounded-md md:rounded-lg transition-all duration-200
                ${isToday ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-200' : ''}
                ${hasEvent && !isToday ? 'bg-slate-100 text-slate-700 font-medium border border-slate-200' : ''}
                ${!hasEvent && !isToday ? 'text-slate-500 hover:bg-slate-50' : ''}
                cursor-default
              `}
            >
              <span className="text-[9px] md:text-sm">{date}</span>
              {hasEvent && !isToday && (
                <span className="block w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-blue-400 mx-auto mt-0.5" />
              )}
              {isToday && (
                <span className="block w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-white/70 mx-auto mt-0.5" />
              )}
            </div>
          );
        })}
      </div>

      {/* Daftar Event */}
      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-slate-200/60 space-y-1.5 md:space-y-2.5 flex-1">
        {events.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-1.5 md:gap-3 p-1.5 md:p-2.5 rounded-lg border ${typeColors[item.type] || "bg-slate-50 border-slate-200 text-slate-700"}`}
          >
            <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-white/70 flex items-center justify-center font-bold text-[10px] md:text-sm shadow-sm">
              {item.date}
            </div>
            <div className="flex-1">
              <p className="text-[10px] md:text-sm font-medium">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tombol lihat semua */}
      <div className="mt-2 md:mt-3 text-center">
        <button className="text-[9px] md:text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors">
          Lihat Kalender Lengkap →
        </button>
      </div>
    </div>
  );
}