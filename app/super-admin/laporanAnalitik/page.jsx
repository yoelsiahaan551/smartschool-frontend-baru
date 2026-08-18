"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  FileText,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Search,
  RefreshCw,
  Sparkles,
  School,
  Building2,
  Users,
  Package,
  DollarSign,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  ChevronRight,
  Eye,
  FileSpreadsheet,
  Printer,
  Mail,
  MoreHorizontal,
  Zap,
  Award,
  Crown,
} from "lucide-react";

// ===== DUMMY DATA =====
const summaryStats = [
  { label: "Total Sekolah", value: "128", change: "+12", trend: "up", icon: School, color: "blue" },
  { label: "Total Yayasan", value: "42", change: "+3", trend: "up", icon: Building2, color: "purple" },
  { label: "Pengguna Aktif", value: "1.198", change: "+54", trend: "up", icon: Users, color: "emerald" },
  { label: "Total Pendapatan", value: "Rp 2,4 M", change: "+18%", trend: "up", icon: DollarSign, color: "amber" },
  { label: "Langganan Aktif", value: "105", change: "-2", trend: "down", icon: Package, color: "rose" },
  { label: "Tingkat Retensi", value: "92%", change: "+5%", trend: "up", icon: Award, color: "violet" },
];

const monthlyData = [
  { month: "Jan", sekolah: 42, pendapatan: 180, pengguna: 850 },
  { month: "Feb", sekolah: 48, pendapatan: 210, pengguna: 920 },
  { month: "Mar", sekolah: 55, pendapatan: 250, pengguna: 980 },
  { month: "Apr", sekolah: 62, pendapatan: 290, pengguna: 1050 },
  { month: "May", sekolah: 70, pendapatan: 340, pengguna: 1120 },
  { month: "Jun", sekolah: 78, pendapatan: 390, pengguna: 1180 },
  { month: "Jul", sekolah: 85, pendapatan: 430, pengguna: 1198 },
  { month: "Aug", sekolah: 92, pendapatan: 480, pengguna: 1198 },
];

const reportData = [
  { id: 1, sekolah: "SMA Negeri 1 Jakarta", yayasan: "-", paket: "Professional", siswa: 720, guru: 45, pendapatan: 550000, status: "Aktif" },
  { id: 2, sekolah: "SMA Al-Azhar", yayasan: "Yayasan Al-Azhar", paket: "Enterprise", siswa: 560, guru: 38, pendapatan: 1200000, status: "Aktif" },
  { id: 3, sekolah: "SMP BPK Penabur", yayasan: "Yayasan BPK Penabur", paket: "Starter", siswa: 380, guru: 28, pendapatan: 250000, status: "Nonaktif" },
  { id: 4, sekolah: "SMA Taruna Nusantara", yayasan: "Yayasan Pengembangan", paket: "Professional", siswa: 450, guru: 30, pendapatan: 550000, status: "Trial" },
  { id: 5, sekolah: "SDN 01 Menteng", yayasan: "-", paket: "Professional", siswa: 320, guru: 22, pendapatan: 550000, status: "Aktif" },
  { id: 6, sekolah: "SMK Bina Insani", yayasan: "Yayasan Bina Insani", paket: "Enterprise", siswa: 850, guru: 52, pendapatan: 1200000, status: "Aktif" },
  { id: 7, sekolah: "SMP Islam Al-Falah", yayasan: "Yayasan Al-Falah", paket: "Starter", siswa: 340, guru: 25, pendapatan: 250000, status: "Trial" },
];

// ===== UTILITY =====
const formatRupiah = (angka) => {
  if (!angka) return "Rp0";
  return "Rp" + angka.toLocaleString("id-ID");
};

const getStatusColor = (status) => {
  const map = {
    Aktif: "bg-emerald-50 text-emerald-600 border-emerald-200",
    Trial: "bg-amber-50 text-amber-600 border-amber-200",
    Nonaktif: "bg-rose-50 text-rose-600 border-rose-200",
  };
  return map[status] || map.Nonaktif;
};

// ===== MAIN COMPONENT =====

export default function LaporanAnalitikPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu] = useState("laporan");
  const [activeTab, setActiveTab] = useState("ringkasan");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPaket, setFilterPaket] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const notifications = [
    { id: 1, title: "Pembaruan Sistem v2.0", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Pengingat: Backup Data", desc: "Dikirim 1 hari lalu", read: false },
  ];

  const maxSekolah = Math.max(...monthlyData.map(d => d.sekolah));
  const maxPendapatan = Math.max(...monthlyData.map(d => d.pendapatan));
  const maxPengguna = Math.max(...monthlyData.map(d => d.pengguna));

  const filteredReport = reportData.filter(item => {
    const matchSearch = item.sekolah.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       item.yayasan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPaket = filterPaket === "Semua" || item.paket === filterPaket;
    const matchStatus = filterStatus === "Semua" || item.status === filterStatus;
    return matchSearch && matchPaket && matchStatus;
  });

  const totalPages = Math.ceil(filteredReport.length / itemsPerPage);
  const paginatedReport = filteredReport.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const tabs = [
    { id: "ringkasan", label: "Ringkasan", icon: BarChart3 },
    { id: "sekolah", label: "Data Sekolah", icon: School },
    { id: "keuangan", label: "Keuangan", icon: DollarSign },
    { id: "pengguna", label: "Pengguna", icon: Users },
  ];

  const paketOptions = ["Semua", "Starter", "Professional", "Enterprise"];
  const statusOptions = ["Semua", "Aktif", "Trial", "Nonaktif"];

  return (
    // Pola wrapper disamakan persis dengan halaman Profil/Pengumuman/Dashboard/Langganan Sekolah:
    // min-h-screen (bukan h-screen + overflow-hidden) di wrapper luar,
    // dan main tanpa overflow-y-auto (p-4 sm:p-6 lg:p-8) supaya sidebar mengikuti
    // tinggi konten halaman dan konsisten saat responsive/zoom.
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-50 via-white to-slate-50/80">
          <div className="w-full space-y-6">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25">
                    <FileText size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                    Laporan & Analitik
                  </h1>
                  <span className="text-xs font-medium text-slate-400 bg-white px-3 py-0.5 rounded-full border border-slate-200 shadow-sm">
                    Super Admin
                  </span>
                </div>
                <p className="text-sm text-slate-500 ml-[52px] flex items-center gap-1.5 mt-0.5">
                  <Sparkles size={14} className="text-amber-400" />
                  Pantau performa sistem dan analisis data secara mendalam.
                </p>
              </div>
              <div className="flex items-center gap-2 ml-[52px] sm:ml-0 flex-wrap">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow">
                  <FileSpreadsheet size={16} />
                  <span className="hidden xs:inline">Export</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow">
                  <Printer size={16} />
                  <span className="hidden xs:inline">Cetak</span>
                </button>
              </div>
            </div>

            {/* STATS CARDS - Premium */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {summaryStats.map((stat) => {
                const Icon = stat.icon;
                const colorMap = {
                  blue: "bg-blue-50 text-blue-600",
                  purple: "bg-purple-50 text-purple-600",
                  emerald: "bg-emerald-50 text-emerald-600",
                  amber: "bg-amber-50 text-amber-600",
                  rose: "bg-rose-50 text-rose-600",
                  violet: "bg-violet-50 text-violet-600",
                };
                const iconBg = colorMap[stat.color] || colorMap.blue;
                const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;
                const trendColor = stat.trend === "up" ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50";
                return (
                  <div
                    key={stat.label}
                    className="group bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg ${iconBg} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={16} />
                      </div>
                      <span className={`flex items-center gap-0.5 text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${trendColor} border border-slate-200/60`}>
                        <TrendIcon size={10} />
                        {stat.change}
                      </span>
                    </div>
                    <div className="mt-2">
                      <p className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
                      <p className="text-base font-bold text-slate-800">{stat.value}</p>
                    </div>
                    <div className="mt-1.5 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full w-3/4 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-full group-hover:w-full transition-all duration-700`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* TABS */}
            <div className="border-b border-slate-200/80 overflow-x-auto">
              <nav className="flex gap-1 min-w-max">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-all
                        ${isActive
                          ? 'border-blue-600 text-blue-600 bg-blue-50/50 shadow-sm'
                          : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                        }
                      `}
                    >
                      <Icon size={16} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* CONTENT */}
            <div className="space-y-4">
              {activeTab === "ringkasan" && (
                <RingkasanTab monthlyData={monthlyData} maxSekolah={maxSekolah} maxPendapatan={maxPendapatan} maxPengguna={maxPengguna} />
              )}
              {activeTab === "sekolah" && (
                <SekolahTab 
                  reportData={paginatedReport} 
                  filteredData={filteredReport}
                  searchQuery={searchQuery} 
                  setSearchQuery={setSearchQuery}
                  filterPaket={filterPaket} 
                  setFilterPaket={setFilterPaket}
                  filterStatus={filterStatus} 
                  setFilterStatus={setFilterStatus}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                  paketOptions={paketOptions}
                  statusOptions={statusOptions}
                  formatRupiah={formatRupiah}
                  getStatusColor={getStatusColor}
                />
              )}
              {activeTab === "keuangan" && <KeuanganTab monthlyData={monthlyData} formatRupiah={formatRupiah} />}
              {activeTab === "pengguna" && <PenggunaTab monthlyData={monthlyData} />}
            </div>

            {/* FOOTER */}
            <div className="text-center text-[10px] text-slate-400/80 py-3 border-t border-slate-200/40">
              © 2026 SmartSchool • Data diperbarui secara real-time
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ===== TAB RINGKASAN - PREMIUM CHARTS =====
function RingkasanTab({ monthlyData, maxSekolah, maxPendapatan, maxPengguna }) {
  const [selectedMetric, setSelectedMetric] = useState("sekolah");
  const metrics = [
    { id: "sekolah", label: "Sekolah", color: "#3b82f6", gradient: "from-blue-500 to-indigo-500", dataKey: "sekolah", max: maxSekolah },
    { id: "pendapatan", label: "Pendapatan (Juta)", color: "#10b981", gradient: "from-emerald-500 to-teal-500", dataKey: "pendapatan", max: maxPendapatan },
    { id: "pengguna", label: "Pengguna", color: "#8b5cf6", gradient: "from-purple-500 to-violet-500", dataKey: "pengguna", max: maxPengguna },
  ];

  const currentMetric = metrics.find(m => m.id === selectedMetric) || metrics[0];
  const maxVal = currentMetric.max || 1;

  return (
    <div className="space-y-4">
      {/* Chart Controls */}
      <div className="flex flex-wrap items-center gap-2 bg-white rounded-xl border border-slate-200/80 p-3 shadow-sm">
        <span className="text-xs font-medium text-slate-500 mr-1">Tampilkan:</span>
        {metrics.map((metric) => (
          <button
            key={metric.id}
            onClick={() => setSelectedMetric(metric.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              selectedMetric === metric.id
                ? `bg-gradient-to-r ${metric.gradient} text-white shadow-md`
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {metric.label}
          </button>
        ))}
      </div>

      {/* Premium Area Chart with Gradient */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-500/20">
              <TrendingUp size={14} />
            </div>
            <h3 className="text-sm font-semibold text-slate-700">Analitik {currentMetric.label}</h3>
          </div>
          <span className="text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200">
            {monthlyData.length} bulan
          </span>
        </div>

        {/* SVG Area Chart */}
        <div className="relative">
          <svg className="w-full h-56" viewBox="0 0 700 220" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`areaGradient-${selectedMetric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={currentMetric.color} stopOpacity="0.35" />
                <stop offset="50%" stopColor={currentMetric.color} stopOpacity="0.10" />
                <stop offset="100%" stopColor={currentMetric.color} stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id={`lineGradient-${selectedMetric}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={currentMetric.color} stopOpacity="1" />
                <stop offset="50%" stopColor={currentMetric.color} stopOpacity="0.9" />
                <stop offset="100%" stopColor={currentMetric.color} stopOpacity="0.7" />
              </linearGradient>
              <filter id={`glow-${selectedMetric}`}>
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Grid Lines */}
            {[0, 25, 50, 75, 100].map((percent) => {
              const y = 205 - (percent / 100) * 190;
              return (
                <line
                  key={percent}
                  x1="25"
                  y1={y}
                  x2="675"
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="0.8"
                  strokeDasharray="5,5"
                  opacity="0.6"
                />
              );
            })}

            {/* Area Path */}
            <polygon
              points={monthlyData.map((d, i) => {
                const x = 25 + (i / (monthlyData.length - 1)) * 650;
                const val = d[currentMetric.dataKey];
                const y = 205 - (val / maxVal) * 190;
                return `${x},${y}`;
              }).join(" ") + `,675,205,25,205`}
              fill={`url(#areaGradient-${selectedMetric})`}
              className="transition-all duration-1000"
            />

            {/* Line Path */}
            <polyline
              points={monthlyData.map((d, i) => {
                const x = 25 + (i / (monthlyData.length - 1)) * 650;
                const val = d[currentMetric.dataKey];
                const y = 205 - (val / maxVal) * 190;
                return `${x},${y}`;
              }).join(" ")}
              fill="none"
              stroke={`url(#lineGradient-${selectedMetric})`}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#glow-${selectedMetric})`}
            />

            {/* Data Points */}
            {monthlyData.map((d, i) => {
              const x = 25 + (i / (monthlyData.length - 1)) * 650;
              const val = d[currentMetric.dataKey];
              const y = 205 - (val / maxVal) * 190;
              const isLast = i === monthlyData.length - 1;
              return (
                <g key={i} className="group">
                  <circle
                    cx={x}
                    cy={y}
                    r={isLast ? 5 : 3.5}
                    fill={isLast ? currentMetric.color : "white"}
                    stroke={currentMetric.color}
                    strokeWidth={isLast ? 2.5 : 1.8}
                    className="transition-all duration-300 cursor-pointer"
                  />
                  {/* Tooltip on hover - using foreignObject */}
                  <foreignObject
                    x={x - 25}
                    y={y - 35}
                    width="50"
                    height="25"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  >
                    <div className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded-lg text-center shadow-lg">
                      {val}
                    </div>
                  </foreignObject>
                </g>
              );
            })}

            {/* X-Axis Labels */}
            {monthlyData.map((d, i) => {
              const x = 25 + (i / (monthlyData.length - 1)) * 650;
              return (
                <text
                  key={i}
                  x={x}
                  y="215"
                  fontSize="10"
                  fill="#94a3b8"
                  textAnchor="middle"
                  className="font-medium"
                >
                  {d.month}
                </text>
              );
            })}

            {/* Y-Axis Labels */}
            {[0, 25, 50, 75, 100].map((percent) => {
              const y = 205 - (percent / 100) * 190;
              const value = Math.round((percent / 100) * maxVal);
              return (
                <text
                  key={percent}
                  x="20"
                  y={y + 3}
                  fontSize="9"
                  fill="#94a3b8"
                  textAnchor="end"
                  className="font-medium"
                >
                  {value}
                </text>
              );
            })}
          </svg>

          {/* Current Value Highlight */}
          <div className="absolute top-2 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-800">
              {monthlyData[monthlyData.length - 1][currentMetric.dataKey]}
              {selectedMetric === "pendapatan" ? " Jt" : ""}
            </span>
            <span className="text-[10px] text-slate-400 ml-1">
              {currentMetric.label === "Pendapatan (Juta)" ? "Jt" : "unit"}
            </span>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-slate-200/60">
          <div className="text-center">
            <p className="text-[9px] text-slate-400">Terendah</p>
            <p className="text-sm font-bold text-slate-700">
              {Math.min(...monthlyData.map(d => d[currentMetric.dataKey]))}
              {selectedMetric === "pendapatan" ? " Jt" : ""}
            </p>
          </div>
          <div className="text-center">
            <p className="text-[9px] text-slate-400">Rata-rata</p>
            <p className="text-sm font-bold text-slate-700">
              {Math.round(monthlyData.reduce((sum, d) => sum + d[currentMetric.dataKey], 0) / monthlyData.length)}
              {selectedMetric === "pendapatan" ? " Jt" : ""}
            </p>
          </div>
          <div className="text-center">
            <p className="text-[9px] text-slate-400">Tertinggi</p>
            <p className="text-sm font-bold text-slate-700">
              {Math.max(...monthlyData.map(d => d[currentMetric.dataKey]))}
              {selectedMetric === "pendapatan" ? " Jt" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Kombinasi grafik ringkas untuk 3 metrik */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.id === "sekolah" ? School : metric.id === "pendapatan" ? DollarSign : Users;
          const colorMap = {
            sekolah: "bg-blue-50 text-blue-600",
            pendapatan: "bg-emerald-50 text-emerald-600",
            pengguna: "bg-purple-50 text-purple-600",
          };
          const currentVal = monthlyData[monthlyData.length - 1][metric.dataKey];
          const firstVal = monthlyData[0][metric.dataKey];
          const growth = firstVal > 0 ? ((currentVal - firstVal) / firstVal * 100) : 0;
          const max = Math.max(...monthlyData.map(d => d[metric.dataKey])) || 1;

          return (
            <div
              key={metric.id}
              className="bg-white rounded-xl border border-slate-200/80 p-3 shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedMetric(metric.id)}
            >
              <div className="flex items-center justify-between">
                <div className={`p-1.5 rounded-lg ${colorMap[metric.id]}`}>
                  <Icon size={14} />
                </div>
                <span className={`text-xs font-medium ${growth >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                  {growth >= 0 ? "+" : ""}{growth.toFixed(1)}%
                </span>
              </div>
              <p className="text-lg font-bold text-slate-800 mt-1">{currentVal}{metric.id === "pendapatan" ? " Jt" : ""}</p>
              <p className="text-[9px] text-slate-400">{metric.label}</p>
              <div className="mt-1.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${metric.gradient}`}
                  style={{ width: `${(currentVal / max) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===== TAB SEKOLAH =====
function SekolahTab({ 
  reportData, filteredData, searchQuery, setSearchQuery,
  filterPaket, setFilterPaket, filterStatus, setFilterStatus,
  currentPage, setCurrentPage, totalPages,
  paketOptions, statusOptions, formatRupiah, getStatusColor
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200/80 flex flex-col sm:flex-row gap-3 bg-gradient-to-r from-slate-50/50 to-transparent">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari sekolah atau yayasan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-shadow"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={filterPaket}
            onChange={(e) => setFilterPaket(e.target.value)}
            className="px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-600 cursor-pointer"
          >
            {paketOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-600 cursor-pointer"
          >
            {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <button
            onClick={() => { setSearchQuery(""); setFilterPaket("Semua"); setFilterStatus("Semua"); }}
            className="px-3 py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80">
              <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Sekolah</th>
              <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Yayasan</th>
              <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Paket</th>
              <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Siswa</th>
              <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Guru</th>
              <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Pendapatan</th>
              <th className="px-4 py-2.5 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reportData.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-400">Tidak ada data</td></tr>
            ) : (
              reportData.map((item) => {
                const statusColor = getStatusColor(item.status);
                return (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-2.5 font-medium text-slate-800">{item.sekolah}</td>
                    <td className="px-4 py-2.5 text-slate-500 hidden md:table-cell">{item.yayasan}</td>
                    <td className="px-4 py-2.5">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200">
                        {item.paket}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-slate-600 hidden sm:table-cell">{item.siswa}</td>
                    <td className="px-4 py-2.5 text-slate-600 hidden lg:table-cell">{item.guru}</td>
                    <td className="px-4 py-2.5 text-slate-600 hidden md:table-cell">{formatRupiah(item.pendapatan)}</td>
                    <td className="px-4 py-2.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColor}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-slate-200/80 flex flex-col xs:flex-row items-center justify-between gap-2">
          <span className="text-xs text-slate-500">{filteredData.length} data</span>
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded-lg disabled:opacity-40 transition-colors"
            >
              Previous
            </button>
            {[...Array(Math.min(totalPages, 5))].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 text-sm rounded-lg transition-colors ${currentPage === i + 1 ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"}`}
              >
                {i + 1}
              </button>
            ))}
            {totalPages > 5 && <span className="text-slate-400 px-1">…</span>}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded-lg disabled:opacity-40 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== TAB KEUANGAN =====
function KeuanganTab({ monthlyData, formatRupiah }) {
  const totalPendapatan = monthlyData.reduce((sum, d) => sum + d.pendapatan, 0);
  const rataRata = totalPendapatan / monthlyData.length;
  const maxPendapatan = Math.max(...monthlyData.map(d => d.pendapatan));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs text-slate-400">Total Pendapatan</p>
          <p className="text-2xl font-bold text-slate-800">{formatRupiah(totalPendapatan)}</p>
          <div className="mt-1 h-1 w-full bg-slate-100 rounded-full">
            <div className="h-full w-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs text-slate-400">Rata-rata / Bulan</p>
          <p className="text-2xl font-bold text-slate-800">{formatRupiah(Math.round(rataRata))}</p>
          <p className="text-[10px] text-slate-400 mt-1">Dari {monthlyData.length} bulan</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs text-slate-400">Bulan Tertinggi</p>
          <p className="text-2xl font-bold text-emerald-600">{formatRupiah(maxPendapatan)}</p>
          <p className="text-[10px] text-slate-400 mt-1">
            {monthlyData.find(d => d.pendapatan === maxPendapatan)?.month}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Detail Pendapatan per Bulan</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/50">
                <th className="px-3 py-2 text-left text-xs font-medium text-slate-400">Bulan</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-slate-400">Pendapatan</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-slate-400">%</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((item, idx) => {
                const persen = (item.pendapatan / totalPendapatan) * 100;
                return (
                  <tr key={idx} className="border-b border-slate-100/80 last:border-0 hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 py-2 font-medium text-slate-700">{item.month}</td>
                    <td className="px-3 py-2 text-right text-slate-600">{formatRupiah(item.pendapatan)}</td>
                    <td className="px-3 py-2 text-right">
                      <span className="text-xs text-slate-500">{persen.toFixed(1)}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ===== TAB PENGGUNA =====
function PenggunaTab({ monthlyData }) {
  const totalPengguna = monthlyData[monthlyData.length - 1]?.pengguna || 0;
  const growth = monthlyData.length > 1 
    ? ((monthlyData[monthlyData.length - 1].pengguna - monthlyData[0].pengguna) / monthlyData[0].pengguna) * 100 
    : 0;
  const maxPengguna = Math.max(...monthlyData.map(d => d.pengguna));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs text-slate-400">Total Pengguna</p>
          <p className="text-2xl font-bold text-slate-800">{totalPengguna.toLocaleString()}</p>
          <div className="mt-1 h-1 w-full bg-slate-100 rounded-full">
            <div className="h-full w-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs text-slate-400">Pertumbuhan</p>
          <p className={`text-2xl font-bold ${growth >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
            {growth >= 0 ? "+" : ""}{growth.toFixed(1)}%
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Sejak awal</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs text-slate-400">Bulan Ini</p>
          <p className="text-2xl font-bold text-violet-600">{monthlyData[monthlyData.length - 1]?.pengguna.toLocaleString()}</p>
          <p className="text-[10px] text-slate-400 mt-1">{monthlyData[monthlyData.length - 1]?.month}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Distribusi Pengguna per Bulan</h4>
        <div className="relative">
          <svg className="w-full h-40" viewBox="0 0 680 150" preserveAspectRatio="none">
            <defs>
              <linearGradient id="userBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {[0, 25, 50, 75, 100].map((percent) => {
              const y = 135 - (percent / 100) * 120;
              return (
                <line
                  key={percent}
                  x1="30"
                  y1={y}
                  x2="660"
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="0.5"
                  strokeDasharray="4,4"
                  opacity="0.5"
                />
              );
            })}

            {monthlyData.map((item, idx) => {
              const x = 30 + (idx / (monthlyData.length - 1)) * 630;
              const height = (item.pengguna / maxPengguna) * 120;
              const y = 135 - height;
              return (
                <rect
                  key={idx}
                  x={x - 6}
                  y={y}
                  width="12"
                  height={height || 2}
                  rx="2"
                  fill={`url(#userBarGradient)`}
                  className="transition-all duration-700 hover:opacity-70 cursor-pointer"
                >
                  <title>{item.month}: {item.pengguna} pengguna</title>
                </rect>
              );
            })}

            {monthlyData.map((item, idx) => {
              const x = 30 + (idx / (monthlyData.length - 1)) * 630;
              return (
                <text
                  key={idx}
                  x={x}
                  y="142"
                  fontSize="9"
                  fill="#94a3b8"
                  textAnchor="middle"
                  className="font-medium"
                >
                  {item.month}
                </text>
              );
            })}
          </svg>

          <div className="absolute top-2 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-violet-600">
              {monthlyData[monthlyData.length - 1]?.pengguna}
            </span>
            <span className="text-[10px] text-slate-400 ml-1">terbaru</span>
          </div>
        </div>
        <div className="flex justify-between mt-1 text-[9px] text-slate-400 px-1">
          <span>0</span>
          <span>{maxPengguna}</span>
        </div>
      </div>
    </div>
  );
}