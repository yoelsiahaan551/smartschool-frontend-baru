"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  NotebookPen,
  Sparkles,
  ClipboardList,
  HelpCircle,
  FileCheck2,
  ArrowRight,
  Users,
  BarChart3,
  AlertTriangle,
} from "lucide-react";

// ===== DUMMY DATA =====
// Ringkasan lintas-kelas untuk ditampilkan di halaman index Nilai.
// Ganti dengan agregat asli dari API/DB begitu tersedia.
const MATA_PELAJARAN = "Matematika";

const subHalaman = [
  {
    key: "nilaiTugas",
    href: "/guru/nilai/nilaiTugas",
    icon: ClipboardList,
    color: "blue",
    label: "Nilai Tugas",
    deskripsi: "Input nilai tugas harian, ulangan harian, UTS, dan UAS per kelas.",
    info: "4 kelas · 12 penilaian bulan ini",
  },
  {
    key: "nilaiQuiz",
    href: "/guru/nilai/nilaiQuiz",
    icon: HelpCircle,
    color: "amber",
    label: "Nilai Quiz",
    deskripsi: "Rekap hasil quiz siswa berdasarkan jumlah jawaban benar.",
    info: "4 kelas · 3 quiz bulan ini",
  },
  {
    key: "rapor",
    href: "/guru/nilai/rapor",
    icon: FileCheck2,
    color: "emerald",
    label: "Rapor",
    deskripsi: "Nilai akhir gabungan seluruh komponen, siap dicetak untuk rapor.",
    info: "4 kelas · semester ganjil",
  },
];

const colorClasses = {
  blue: { badge: "bg-blue-50 text-blue-600 border-blue-200", iconBg: "bg-blue-600" },
  amber: { badge: "bg-amber-50 text-amber-600 border-amber-200", iconBg: "bg-amber-500" },
  emerald: { badge: "bg-emerald-50 text-emerald-600 border-emerald-200", iconBg: "bg-emerald-500" },
};

const ringkasanKelas = [
  { kelas: "9A", rataRata: 83.4, perluPerhatian: 2 },
  { kelas: "9B", rataRata: 78.9, perluPerhatian: 3 },
  { kelas: "8A", rataRata: 81.2, perluPerhatian: 1 },
  { kelas: "8B", rataRata: 85.6, perluPerhatian: 0 },
];

export default function GuruNilaiIndexPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const notifications = [
    { id: 1, title: "Rapat Wali Kelas", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Batas Input Nilai Rapor", desc: "Dikirim 5 jam lalu", read: false },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="nilai"
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          user={{ name: "Bu Sari", email: "guru@smartschool.com", avatar: "AS" }}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full space-y-6">

            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-600 text-white shadow-sm flex-shrink-0">
                    <NotebookPen size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 truncate">
                    Nilai
                  </h1>
                </div>
                <p className="text-sm text-slate-500 mt-1 ml-[42px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400 flex-shrink-0" />
                  <span className="truncate">Pusat penilaian mata pelajaran {MATA_PELAJARAN} — pilih jenis nilai di bawah.</span>
                </p>
              </div>
            </div>

            {/* SUB-HALAMAN CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {subHalaman.map((s) => (
                <Link
                  key={s.key}
                  href={s.href}
                  className="group bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-lg text-white shadow-sm flex-shrink-0 ${colorClasses[s.color].iconBg}`}>
                      <s.icon size={18} />
                    </div>
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-800">{s.label}</h2>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{s.deskripsi}</p>
                  </div>
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border w-fit ${colorClasses[s.color].badge}`}>
                    {s.info}
                  </span>
                </Link>
              ))}
            </div>

            {/* RINGKASAN PER KELAS */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 p-4 sm:p-5 border-b border-slate-100">
                <BarChart3 size={16} className="text-slate-400" />
                <h2 className="text-sm font-semibold text-slate-800">Ringkasan Nilai per Kelas</h2>
              </div>
              <div className="divide-y divide-slate-100">
                {ringkasanKelas.map((k) => (
                  <div key={k.kelas} className="flex items-center gap-4 p-4 sm:px-5 sm:py-3.5">
                    <div className="flex items-center gap-2 w-20 flex-shrink-0">
                      <Users size={14} className="text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">{k.kelas}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-400">Rata-rata nilai</span>
                        <span className="text-xs font-semibold text-slate-700">{k.rataRata}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full rounded-full bg-blue-500" style={{ width: `${Math.min(k.rataRata, 100)}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 w-40 flex-shrink-0 justify-end">
                      {k.perluPerhatian > 0 ? (
                        <span className="flex items-center gap-1 text-[11px] font-medium text-amber-600 bg-amber-50 border border-amber-200 px-2 py-1 rounded-full">
                          <AlertTriangle size={11} />
                          {k.perluPerhatian} siswa perlu perhatian
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full">
                          Semua aman
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}