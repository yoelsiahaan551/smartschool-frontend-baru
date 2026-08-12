"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  ClipboardList,
  Plus,
  Search,
  MoreVertical,
  Clock,
  Users,
  AlertCircle,
} from "lucide-react";

const assignments = [
  {
    id: 1,
    title: "Latihan Aljabar - Persamaan Linear",
    kelas: "8B",
    deadline: "14 Agu 2026, 23.59",
    submitted: 18,
    total: 28,
    status: "berlangsung",
  },
  {
    id: 2,
    title: "Esai Teks Cerpen",
    kelas: "7B",
    deadline: "16 Agu 2026, 23.59",
    submitted: 5,
    total: 24,
    status: "berlangsung",
  },
  {
    id: 3,
    title: "Laporan Praktikum Tata Surya",
    kelas: "9A",
    deadline: "10 Agu 2026, 23.59",
    submitted: 30,
    total: 30,
    status: "selesai",
  },
  {
    id: 4,
    title: "Quiz Simple Present Tense",
    kelas: "8A",
    deadline: "9 Agu 2026, 23.59",
    submitted: 22,
    total: 28,
    status: "terlambat",
  },
];

const statusStyle = {
  berlangsung: {
    label: "Berlangsung",
    color: "text-blue-600 bg-blue-50 border-blue-200",
    dot: "bg-blue-500",
  },
  selesai: {
    label: "Selesai",
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    dot: "bg-emerald-500",
  },
  terlambat: {
    label: "Deadline Terlewat",
    color: "text-red-600 bg-red-50 border-red-200",
    dot: "bg-red-500",
  },
};

export default function TugasPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const notifications = [
    { id: 1, title: "Pengumuman Libur Semester", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Deadline Input Nilai", desc: "Dikirim 5 jam lalu", read: false },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="tugas"
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
                  <div className="p-2 rounded-lg bg-emerald-500 text-white shadow-sm">
                    <ClipboardList size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Tugas</h1>
                </div>
                <p className="text-sm text-slate-500 ml-[52px]">
                  Berikan dan nilai tugas dengan tenggat waktu jelas.
                </p>
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-colors shadow-sm">
                <Plus size={16} />
                Buat Tugas
              </button>
            </div>

            {/* SEARCH */}
            <div className="relative max-w-sm">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari tugas..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            {/* ASSIGNMENT LIST */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-200/60">
                <h3 className="text-sm font-semibold text-slate-700">Semua Tugas</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {assignments.map((a) => {
                  const s = statusStyle[a.status];
                  const progress = Math.round((a.submitted / a.total) * 100);
                  return (
                    <div
                      key={a.id}
                      onClick={() => router.push(`/guru/pembelajaran/tugas/${a.id}`)}
                      className="p-4 sm:p-5 hover:bg-slate-50/60 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-3">
                        {/* KIRI: full width */}
                        <div className="min-w-0 flex-1 w-full">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-medium text-slate-800">{a.title}</p>
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border flex items-center gap-1 ${s.color}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                              {s.label}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-slate-500">
                            <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-full text-[11px] font-medium">
                              Kelas {a.kelas}
                            </span>
                            <span className="flex items-center gap-1">
                              {a.status === "terlambat" ? (
                                <AlertCircle size={11} className="text-red-400" />
                              ) : (
                                <Clock size={11} className="text-slate-400" />
                              )}
                              Deadline: {a.deadline}
                            </span>
                          </div>

                          {/* Progress bar - full width, tidak dibatasi max-w */}
                          <div className="mt-3 w-full">
                            <div className="flex items-center justify-between mb-1">
                              <span className="flex items-center gap-1 text-[11px] text-slate-500">
                                <Users size={11} className="text-slate-400" />
                                {a.submitted}/{a.total} mengumpulkan
                              </span>
                              <span className="text-[11px] font-medium text-slate-500">{progress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  a.status === "selesai" ? "bg-emerald-500" : a.status === "terlambat" ? "bg-red-400" : "bg-blue-500"
                                }`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* KANAN: tombol titik tiga */}
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 flex-shrink-0"
                        >
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
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