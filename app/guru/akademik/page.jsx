"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  GraduationCap,
  ClipboardCheck,
  Edit,
  FilePlus2,
  Star,
  AlertTriangle,
  Users,
  ChevronRight,
  Sparkles,
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

// ===== DUMMY DATA =====
const akademikMenu = [
  {
    id: "absensi",
    title: "Absensi",
    desc: "Catat kehadiran siswa per kelas setiap hari",
    icon: ClipboardCheck,
    color: "blue",
    path: "/guru/akademik/absensi",
    stat: "96% hadir hari ini",
  },
  {
    id: "nilai",
    title: "Input Nilai",
    desc: "Kelola nilai tugas, ujian, dan rapor siswa",
    icon: Edit,
    color: "purple",
    path: "/guru/akademik/nilai",
    stat: "17 belum dinilai",
  },
  {
    id: "quiz",
    title: "Quiz",
    desc: "Buat dan kelola quiz untuk setiap kelas",
    icon: FilePlus2,
    color: "amber",
    path: "/guru/akademik/quiz",
    stat: "3 quiz aktif",
  },
  {
    id: "prestasi",
    title: "Catatan Prestasi",
    desc: "Dokumentasikan pencapaian dan prestasi siswa",
    icon: Star,
    color: "emerald",
    path: "/guru/akademik/catatanPrestasi",
    stat: "5 prestasi bulan ini",
  },
  {
    id: "pelanggaran",
    title: "Catatan Pelanggaran",
    desc: "Catat dan pantau pelanggaran disiplin siswa",
    icon: AlertTriangle,
    color: "rose",
    path: "/guru/akademik/catatanPelanggaran",
    stat: "2 kasus minggu ini",
  },
  {
    id: "dataSiswa",
    title: "Data Siswa",
    desc: "Lihat profil dan riwayat akademik siswa",
    icon: Users,
    color: "slate",
    path: "/guru/akademik/dataSiswa",
    stat: "214 siswa terdaftar",
  },
];

const kelasList = [
  { id: 1, nama: "Kelas 9A", siswa: 36, kehadiran: 97, tugasBelumNilai: 4, trend: "up" },
  { id: 2, nama: "Kelas 9B", siswa: 34, kehadiran: 95, tugasBelumNilai: 6, trend: "down" },
  { id: 3, nama: "Kelas 9C", siswa: 35, kehadiran: 96, tugasBelumNilai: 2, trend: "same" },
  { id: 4, nama: "Kelas 8A", siswa: 37, kehadiran: 98, tugasBelumNilai: 1, trend: "up" },
  { id: 5, nama: "Kelas 8B", siswa: 36, kehadiran: 94, tugasBelumNilai: 3, trend: "down" },
  { id: 6, nama: "Kelas 8C", siswa: 36, kehadiran: 96, tugasBelumNilai: 1, trend: "same" },
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

const TrendIcon = ({ trend }) => {
  if (trend === "up") return <TrendingUp size={13} className="text-emerald-500" />;
  if (trend === "down") return <TrendingDown size={13} className="text-rose-500" />;
  return <Minus size={13} className="text-slate-400" />;
};

// ===== MAIN COMPONENT =====

export default function AkademikPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");

  const filteredMenu = akademikMenu.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  const notifications = [
    { id: 1, title: "Pengumuman Libur Semester", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Deadline Input Nilai", desc: "Dikirim 5 jam lalu", read: false },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="akademik"
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
                    <GraduationCap size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">
                    Akademik
                  </h1>
                </div>
                <p className="text-sm text-slate-500 ml-[52px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400" />
                  Kelola absensi, nilai, dan catatan siswa dari satu tempat.
                </p>
              </div>
              <div className="relative ml-[52px] sm:ml-0 w-full sm:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari menu akademik..."
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-colors shadow-sm"
                />
              </div>
            </div>

            {/* MENU GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMenu.length === 0 && (
                <div className="col-span-full text-center py-10 text-sm text-slate-400">
                  Tidak ada menu yang cocok dengan pencarian "{search}"
                </div>
              )}
              {filteredMenu.map((item) => {
                const Icon = item.icon;
                const c = colorMap[item.color];
                return (
                  <button
                    key={item.id}
                    onClick={() => router.push(item.path)}
                    className={`group text-left bg-white rounded-xl border ${c.border} ${c.hoverBorder} p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
                  >
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-xl ${c.bg} ${c.text} ring-4 ring-transparent ${c.ring} transition-all duration-300`}>
                        <Icon size={20} />
                      </div>
                      <ChevronRight
                        size={18}
                        className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all duration-300 mt-1"
                      />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-slate-800">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    <div className={`mt-4 inline-flex items-center text-xs font-medium ${c.text} ${c.bg} px-2.5 py-1 rounded-full`}>
                      {item.stat}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* CLASS OVERVIEW TABLE */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                    <Users size={16} />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-700">Ringkasan per Kelas</h3>
                </div>
                <span className="text-xs text-slate-400">{kelasList.length} kelas</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] font-medium text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      <th className="px-4 sm:px-5 py-3">Kelas</th>
                      <th className="px-4 py-3">Siswa</th>
                      <th className="px-4 py-3">Kehadiran</th>
                      <th className="px-4 py-3">Belum Dinilai</th>
                      <th className="px-4 sm:px-5 py-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kelasList.map((kelas) => (
                      <tr key={kelas.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors">
                        <td className="px-4 sm:px-5 py-3 font-medium text-slate-800">{kelas.nama}</td>
                        <td className="px-4 py-3 text-slate-600">{kelas.siswa}</td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1.5 text-slate-600">
                            {kelas.kehadiran}%
                            <TrendIcon trend={kelas.trend} />
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${
                            kelas.tugasBelumNilai > 3
                              ? "bg-rose-50 text-rose-600 border-rose-200"
                              : "bg-slate-50 text-slate-500 border-slate-200"
                          }`}>
                            {kelas.tugasBelumNilai} tugas
                          </span>
                        </td>
                        <td className="px-4 sm:px-5 py-3 text-right">
                          <button
                            onClick={() => router.push(`/guru/akademik/dataSiswa?kelas=${encodeURIComponent(kelas.nama)}`)}
                            className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-0.5"
                          >
                            Detail
                            <ChevronRight size={12} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}