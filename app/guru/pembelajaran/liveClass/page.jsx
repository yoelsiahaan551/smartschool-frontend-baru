"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  Video,
  Plus,
  Users,
  Clock,
  MoreVertical,
  Search,
  Calendar,
  PlayCircle,
} from "lucide-react";

const liveClasses = [
  {
    id: 1,
    title: "Review UTS IPA",
    kelas: "9A",
    tanggal: "Kam, 14 Agu 2026",
    waktu: "09.00 - 10.00",
    siswa: 30,
    status: "upcoming",
  },
  {
    id: 2,
    title: "Diskusi Karya Tulis",
    kelas: "7B",
    tanggal: "Jum, 15 Agu 2026",
    waktu: "13.00 - 14.00",
    siswa: 24,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Pembahasan Latihan Aljabar",
    kelas: "8B",
    tanggal: "Sen, 11 Agu 2026",
    waktu: "10.00 - 11.00",
    siswa: 26,
    status: "selesai",
  },
];

const statusStyle = {
  upcoming: {
    label: "Terjadwal",
    color: "text-blue-600 bg-blue-50 border-blue-200",
    dot: "bg-blue-500",
  },
  live: {
    label: "Sedang Berlangsung",
    color: "text-rose-600 bg-rose-50 border-rose-200",
    dot: "bg-rose-500",
  },
  selesai: {
    label: "Selesai",
    color: "text-slate-500 bg-slate-50 border-slate-200",
    dot: "bg-slate-400",
  },
};

export default function LiveClassPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const notifications = [
    { id: 1, title: "Pengumuman Libur Semester", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Deadline Input Nilai", desc: "Dikirim 5 jam lalu", read: false },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="liveClass"
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
                  <div className="p-2 rounded-lg bg-rose-500 text-white shadow-sm">
                    <Video size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Live Class</h1>
                </div>
                <p className="text-sm text-slate-500 ml-[52px]">
                  Jadwalkan dan mulai sesi kelas tatap maya (video call).
                </p>
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 text-white text-sm font-medium rounded-xl hover:bg-rose-700 transition-colors shadow-sm">
                <Plus size={16} />
                Jadwalkan Live Class
              </button>
            </div>

            {/* SEARCH */}
            <div className="relative max-w-sm">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari live class..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
            </div>

            {/* LIVE CLASS LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveClasses.map((l) => {
                const s = statusStyle[l.status];
                return (
                  <div
                    key={l.id}
                    className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-5 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => router.push(`/guru/pembelajaran/liveClass/${l.id}`)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 flex-shrink-0">
                        <Video size={18} />
                      </div>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>

                    <h3 className="text-sm font-semibold text-slate-800 mt-3">{l.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Kelas {l.kelas}</p>

                    <div className="flex items-center gap-1.5 mt-3">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border flex items-center gap-1 ${s.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        {s.label}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-slate-400" />
                        {l.tanggal}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-slate-400" />
                        {l.waktu}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                      <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Users size={13} className="text-slate-400" />
                        {l.siswa} siswa
                      </span>
                      {l.status !== "selesai" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/guru/pembelajaran/liveClass/${l.id}/room`);
                          }}
                          className="flex items-center gap-1 text-[11px] font-medium text-rose-600 hover:text-rose-700"
                        >
                          <PlayCircle size={13} />
                          Mulai
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}