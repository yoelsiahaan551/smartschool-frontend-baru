"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  MessagesSquare,
  Plus,
  Users,
  Clock,
  MoreVertical,
  Search,
  MessageCircle,
} from "lucide-react";

const discussions = [
  {
    id: 1,
    title: "Simple Present Tense - Latihan Soal",
    kelas: "8A",
    replies: 12,
    siswa: 28,
    updated: "10 menit lalu",
  },
  {
    id: 2,
    title: "Pertanyaan Bab 4 - Persamaan Linear",
    kelas: "8B",
    replies: 5,
    siswa: 26,
    updated: "1 jam lalu",
  },
  {
    id: 3,
    title: "Diskusi Karya Tulis - Teks Cerpen",
    kelas: "7B",
    replies: 8,
    siswa: 24,
    updated: "3 jam lalu",
  },
];

export default function ForumPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const notifications = [
    { id: 1, title: "Pengumuman Libur Semester", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Deadline Input Nilai", desc: "Dikirim 5 jam lalu", read: false },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="forum"
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
                  <div className="p-2 rounded-lg bg-purple-500 text-white shadow-sm">
                    <MessagesSquare size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Forum</h1>
                </div>
                <p className="text-sm text-slate-500 ml-[52px]">
                  Diskusi tanya jawab antara guru dan siswa per kelas.
                </p>
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition-colors shadow-sm">
                <Plus size={16} />
                Buat Diskusi
              </button>
            </div>

            {/* SEARCH */}
            <div className="relative max-w-sm">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari diskusi..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>

            {/* FORUM LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {discussions.map((d) => (
                <div
                  key={d.id}
                  className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-5 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => router.push(`/guru/pembelajaran/forum/${d.id}`)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="p-2.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-600 flex-shrink-0">
                      <MessagesSquare size={18} />
                    </div>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-800 mt-3">{d.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Kelas {d.kelas}</p>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MessageCircle size={13} className="text-slate-400" />
                      {d.replies} balasan
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock size={11} />
                      {d.updated}
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