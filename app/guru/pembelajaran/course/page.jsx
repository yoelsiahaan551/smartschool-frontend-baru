"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  BookOpen,
  Plus,
  Users,
  Clock,
  MoreVertical,
  Search,
} from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Bahasa Indonesia - Teks Cerpen",
    kelas: "8A",
    siswa: 28,
    progress: 72,
    updated: "Kemarin",
  },
  {
    id: 2,
    title: "Matematika - Persamaan Linear",
    kelas: "8B",
    siswa: 26,
    progress: 45,
    updated: "2 hari lalu",
  },
  {
    id: 3,
    title: "IPA - Sistem Tata Surya",
    kelas: "9A",
    siswa: 30,
    progress: 90,
    updated: "5 hari lalu",
  },
];

export default function CoursePage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const notifications = [
    { id: 1, title: "Pengumuman Libur Semester", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Deadline Input Nilai", desc: "Dikirim 5 jam lalu", read: false },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="course"
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
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-500 text-white shadow-sm">
                    <BookOpen size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Course</h1>
                </div>
                <p className="text-sm text-slate-500 ml-[52px]">
                  Kelola kelas dan modul belajar terstrukturmu di sini.
                </p>
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                <Plus size={16} />
                Buat Course
              </button>
            </div>

            {/* SEARCH */}
            <div className="relative max-w-sm">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari course..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* COURSE LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-5 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => router.push(`/guru/pembelajaran/course/${c.id}`)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex-shrink-0">
                      <BookOpen size={18} />
                    </div>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-800 mt-3">{c.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Kelas {c.kelas}</p>

                  <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{c.progress}% selesai</p>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Users size={13} className="text-slate-400" />
                      {c.siswa} siswa
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock size={11} />
                      {c.updated}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}