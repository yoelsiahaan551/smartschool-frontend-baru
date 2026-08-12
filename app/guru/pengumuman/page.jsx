"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  Megaphone,
  Search,
  Pin,
  Clock,
  Calendar,
  Users,
  ChevronRight,
  Bell,
} from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Libur Semester Ganjil 2026",
    from: "Kepala Sekolah",
    audience: "Semua Kelas",
    content:
      "Diberitahukan kepada seluruh dewan guru bahwa libur semester ganjil akan dimulai tanggal 20 Desember 2026 sampai dengan 5 Januari 2027.",
    date: "12 Agu 2026",
    time: "08.30",
    pinned: true,
    category: "sekolah",
  },
  {
    id: 2,
    title: "Deadline Input Nilai Rapor",
    from: "Tata Usaha",
    audience: "Semua Guru",
    content:
      "Mohon seluruh guru mata pelajaran menyelesaikan input nilai rapor paling lambat tanggal 15 Agustus 2026 melalui sistem akademik.",
    date: "12 Agu 2026",
    time: "07.15",
    pinned: true,
    category: "akademik",
  },
  {
    id: 3,
    title: "Rapat Koordinasi Wali Kelas",
    from: "Wakil Kepala Sekolah",
    audience: "Wali Kelas",
    content:
      "Rapat koordinasi wali kelas akan dilaksanakan hari Jumat, 15 Agustus 2026 pukul 13.00 di ruang guru.",
    date: "11 Agu 2026",
    time: "16.00",
    pinned: false,
    category: "rapat",
  },
  {
    id: 4,
    title: "Jadwal Ujian Tengah Semester",
    from: "Kurikulum",
    audience: "Semua Kelas",
    content:
      "Jadwal Ujian Tengah Semester Ganjil dapat diunduh melalui portal sekolah mulai hari ini. Mohon diinformasikan kepada siswa.",
    date: "10 Agu 2026",
    time: "10.20",
    pinned: false,
    category: "akademik",
  },
];

const categoryStyle = {
  sekolah: { label: "Sekolah", color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
  akademik: { label: "Akademik", color: "text-blue-600 bg-blue-50 border-blue-200" },
  rapat: { label: "Rapat", color: "text-amber-600 bg-amber-50 border-amber-200" },
};

export default function PengumumanPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selected, setSelected] = useState(announcements[0]);

  const notifications = [
    { id: 1, title: "Pengumuman Libur Semester", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Deadline Input Nilai", desc: "Dikirim 5 jam lalu", read: false },
  ];

  const pinnedItems = announcements.filter((a) => a.pinned);
  const regularItems = announcements.filter((a) => !a.pinned);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="pengumuman"
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={(value) => setSidebarOpen(!value)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          notifications={notifications}
          user={{ name: "Bapak/Ibu Guru", email: "guru@smartschool.com", avatar: "G" }}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-5xl mx-auto space-y-6">

            {/* PAGE HEADER */}
            <div>
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-orange-500 text-white shadow-sm">
                  <Megaphone size={18} />
                </div>
                <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Pengumuman</h1>
              </div>
              <p className="text-sm text-slate-500 ml-[52px]">
                Informasi dan pengumuman resmi dari sekolah.
              </p>
            </div>

            {/* SEARCH */}
            <div className="relative max-w-sm">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari pengumuman..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

              {/* LIST KIRI */}
              <div className="lg:col-span-2 space-y-4">
                {pinnedItems.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 px-1">
                      <Pin size={12} />
                      Disematkan
                    </p>
                    <div className="space-y-2">
                      {pinnedItems.map((a) => {
                        const c = categoryStyle[a.category];
                        const isActive = selected.id === a.id;
                        return (
                          <button
                            key={a.id}
                            onClick={() => setSelected(a)}
                            className={`w-full text-left bg-white rounded-xl border p-3.5 transition-all ${
                              isActive
                                ? "border-orange-300 shadow-sm ring-1 ring-orange-100"
                                : "border-slate-200/80 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <Pin size={12} className="text-orange-500 mt-1 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-slate-800 truncate">{a.title}</p>
                                <div className="flex items-center gap-2 mt-1.5">
                                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${c.color}`}>
                                    {c.label}
                                  </span>
                                  <span className="text-[11px] text-slate-400">{a.date}</span>
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
                    Lainnya
                  </p>
                  <div className="space-y-2">
                    {regularItems.map((a) => {
                      const c = categoryStyle[a.category];
                      const isActive = selected.id === a.id;
                      return (
                        <button
                          key={a.id}
                          onClick={() => setSelected(a)}
                          className={`w-full text-left bg-white rounded-xl border p-3.5 transition-all ${
                            isActive
                              ? "border-orange-300 shadow-sm ring-1 ring-orange-100"
                              : "border-slate-200/80 hover:border-slate-300"
                          }`}
                        >
                          <p className="text-sm font-medium text-slate-800 truncate">{a.title}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${c.color}`}>
                              {c.label}
                            </span>
                            <span className="text-[11px] text-slate-400">{a.date}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* DETAIL KANAN */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 sm:p-6 h-fit sticky top-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {selected.pinned && <Pin size={14} className="text-orange-500" />}
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${categoryStyle[selected.category].color}`}>
                        {categoryStyle[selected.category].label}
                      </span>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
                      <Bell size={16} />
                    </button>
                  </div>

                  <h2 className="text-lg font-semibold text-slate-800 mt-3">{selected.title}</h2>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Users size={12} className="text-slate-400" />
                      {selected.from} → {selected.audience}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-slate-400" />
                      {selected.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-slate-400" />
                      {selected.time}
                    </span>
                  </div>

                  <div className="h-px bg-slate-100 my-4" />

                  <p className="text-sm text-slate-600 leading-relaxed">{selected.content}</p>

                  <button className="flex items-center gap-1 text-xs font-medium text-orange-600 hover:text-orange-700 mt-5">
                    Lihat semua pengumuman
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}