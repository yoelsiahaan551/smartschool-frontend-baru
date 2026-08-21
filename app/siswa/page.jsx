"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  BookOpen,
  Calculator,
  FlaskConical,
  Globe2,
  Languages,
  Palette,
  Music,
  Dumbbell,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  GraduationCap,
} from "lucide-react";

// Progress = dummy (persentase materi/tugas yang sudah diselesaikan per mapel).
// Ganti dengan data asli dari API kalau sudah ada.
const mataPelajaranList = [
  { id: "matematika", nama: "Matematika", guru: "Bu Sari", icon: Calculator, color: "blue", progress: 72 },
  { id: "bindo", nama: "Bahasa Indonesia", guru: "Pak Budi", icon: Languages, color: "rose", progress: 88 },
  { id: "ipa", nama: "IPA", guru: "Bu Dewi", icon: FlaskConical, color: "emerald", progress: 45 },
  { id: "ips", nama: "IPS", guru: "Pak Anwar", icon: Globe2, color: "amber", progress: 60 },
  { id: "binggris", nama: "Bahasa Inggris", guru: "Bu Rina", icon: BookOpen, color: "indigo", progress: 95 },
  { id: "seni", nama: "Seni Budaya", guru: "Bu Wulan", icon: Palette, color: "fuchsia", progress: 30 },
  { id: "musik", nama: "Seni Musik", guru: "Pak Doni", icon: Music, color: "cyan", progress: 55 },
  { id: "penjas", nama: "Penjaskes", guru: "Pak Rudi", icon: Dumbbell, color: "orange", progress: 100 },
];

// Setiap warna punya 2 stop gradient buat badge icon + warna progress bar.
// Dikumpulin di satu tempat biar gampang nambah warna baru tanpa nyentuh JSX di bawah.
const colorMap = {
  blue: { grad: "from-blue-500 to-blue-600", bar: "bg-blue-500", ring: "group-hover:ring-blue-100", border: "hover:border-blue-200" },
  rose: { grad: "from-rose-500 to-rose-600", bar: "bg-rose-500", ring: "group-hover:ring-rose-100", border: "hover:border-rose-200" },
  emerald: { grad: "from-emerald-500 to-emerald-600", bar: "bg-emerald-500", ring: "group-hover:ring-emerald-100", border: "hover:border-emerald-200" },
  amber: { grad: "from-amber-500 to-amber-600", bar: "bg-amber-500", ring: "group-hover:ring-amber-100", border: "hover:border-amber-200" },
  indigo: { grad: "from-indigo-500 to-indigo-600", bar: "bg-indigo-500", ring: "group-hover:ring-indigo-100", border: "hover:border-indigo-200" },
  fuchsia: { grad: "from-fuchsia-500 to-fuchsia-600", bar: "bg-fuchsia-500", ring: "group-hover:ring-fuchsia-100", border: "hover:border-fuchsia-200" },
  cyan: { grad: "from-cyan-500 to-cyan-600", bar: "bg-cyan-500", ring: "group-hover:ring-cyan-100", border: "hover:border-cyan-200" },
  orange: { grad: "from-orange-500 to-orange-600", bar: "bg-orange-500", ring: "group-hover:ring-orange-100", border: "hover:border-orange-200" },
};

const quickStats = [
  { key: "kehadiran", label: "Kehadiran bulan ini", value: "92%", icon: ClipboardCheck, tone: "text-emerald-600 bg-emerald-50" },
  { key: "tugas", label: "Tugas belum selesai", value: "3", icon: ClipboardList, tone: "text-amber-600 bg-amber-50" },
  { key: "ujian", label: "Ujian mendatang", value: "2", icon: GraduationCap, tone: "text-blue-600 bg-blue-50" },
];

export default function SiswaDashboardPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const notifications = [
    { id: 1, title: "Tugas Matematika deadline besok", desc: "Dikirim 1 jam lalu", read: false },
    { id: 2, title: "Libur Nasional 24 Agustus", desc: "Dikirim kemarin", read: false },
  ];

  const handleOpenMapel = () => {
    router.push("/siswa/mataPelajaran");
  };

  return (
    // Pola wrapper disamakan persis dengan halaman Profil/Pengumuman:
    // min-h-screen (bukan h-screen + overflow-hidden) di wrapper luar,
    // dan main tanpa overflow-y-auto, supaya sidebar mengikuti tinggi
    // konten halaman dan konsisten saat responsive/zoom.
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        role="siswa"
        active="dashboard"
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          user={{ name: "Andi Saputra", email: "siswa@smartschool.com", avatar: "AS" }}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="w-full space-y-6">

            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Kelas 9A</p>
                <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 mt-1 tracking-tight">
                  Dashboard Siswa
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Ringkasan aktivitas dan mata pelajaran kamu hari ini.
                </p>
              </div>
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickStats.map(({ key, label, value, icon: Icon, tone }) => (
                <div
                  key={key}
                  className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-4 flex items-center gap-3.5"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${tone}`}>
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xl font-bold text-slate-900 leading-none">{value}</p>
                    <p className="text-xs text-slate-500 mt-1 truncate">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* DAFTAR MATA PELAJARAN */}
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between gap-2 px-5 py-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
                    <BookOpen size={16} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-slate-800 truncate">Mata Pelajaran</h3>
                    <p className="text-xs text-slate-400">{mataPelajaranList.length} mapel aktif semester ini</p>
                  </div>
                </div>
                <button
                  onClick={handleOpenMapel}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-0.5 flex-shrink-0"
                >
                  Lihat semua
                  <ChevronRight size={12} />
                </button>
              </div>

              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {mataPelajaranList.map((mapel) => {
                  const Icon = mapel.icon;
                  const c = colorMap[mapel.color];
                  return (
                    <button
                      key={mapel.id}
                      onClick={handleOpenMapel}
                      className={`group text-left bg-white rounded-2xl border border-slate-200 ${c.border} p-4 shadow-sm hover:shadow-md transition-all duration-300 min-w-0`}
                    >
                      <div className="flex items-start justify-between">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.grad} text-white flex items-center justify-center flex-shrink-0 shadow-sm ring-4 ring-transparent ${c.ring} transition-all duration-300`}>
                          <Icon size={19} />
                        </div>
                        <ChevronRight
                          size={16}
                          className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0 mt-1"
                        />
                      </div>

                      <h3 className="mt-3 text-sm font-semibold text-slate-800 truncate">{mapel.nama}</h3>
                      <p className="mt-0.5 text-xs text-slate-500 truncate">{mapel.guru}</p>

                      <div className="mt-3.5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] text-slate-400">Progres</span>
                          <span className="text-[11px] font-medium text-slate-500">{mapel.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${c.bar} rounded-full transition-all duration-500`}
                            style={{ width: `${mapel.progress}%` }}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}