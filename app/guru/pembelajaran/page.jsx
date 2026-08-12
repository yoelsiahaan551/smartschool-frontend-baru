"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  Layers,
  Sparkles,
  BookOpen,
  MessagesSquare,
  Video,
  File,
  ClipboardList,
  ArrowRight,
  Users,
  Clock,
  CalendarClock,
  MessageCircle,
  UploadCloud,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";

// ===== DUMMY DATA =====
const modules = [
  {
    key: "course",
    label: "Course",
    path: "/guru/pembelajaran/course",
    icon: BookOpen,
    color: "text-blue-600 bg-blue-50 border-blue-200",
    dot: "bg-blue-500",
    desc: "Susun kelas dan modul belajar terstruktur untuk siswa.",
    stat: "6 course aktif",
  },
  {
    key: "materi",
    label: "Materi",
    path: "/guru/pembelajaran/materi",
    icon: File,
    color: "text-amber-600 bg-amber-50 border-amber-200",
    dot: "bg-amber-500",
    desc: "Unggah bahan ajar berupa dokumen, slide, atau video.",
    stat: "24 file materi",
  },
  {
    key: "tugas",
    label: "Tugas",
    path: "/guru/pembelajaran/tugas",
    icon: ClipboardList,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    dot: "bg-emerald-500",
    desc: "Berikan dan nilai tugas dengan tenggat waktu jelas.",
    stat: "5 tugas berlangsung",
  },
  {
    key: "forum",
    label: "Forum",
    path: "/guru/pembelajaran/forum",
    icon: MessagesSquare,
    color: "text-purple-600 bg-purple-50 border-purple-200",
    dot: "bg-purple-500",
    desc: "Diskusi tanya jawab antara guru dan siswa per kelas.",
    stat: "12 diskusi aktif",
  },
  {
    key: "liveClass",
    label: "Live Class",
    path: "/guru/pembelajaran/liveClass",
    icon: Video,
    color: "text-rose-600 bg-rose-50 border-rose-200",
    dot: "bg-rose-500",
    desc: "Jadwalkan dan mulai sesi kelas tatap maya (video call).",
    stat: "2 sesi terjadwal",
  },
];

const recentActivity = [
  {
    id: 1,
    type: "materi",
    icon: UploadCloud,
    color: "text-amber-600 bg-amber-50",
    title: "Materi baru diunggah",
    desc: "\"Bab 4 - Persamaan Linear\" ke kelas 8A",
    time: "10 menit lalu",
  },
  {
    id: 2,
    type: "tugas",
    icon: CheckCircle2,
    color: "text-emerald-600 bg-emerald-50",
    title: "Tugas dikumpulkan",
    desc: "18 dari 28 siswa sudah mengumpulkan \"Latihan Aljabar\"",
    time: "1 jam lalu",
  },
  {
    id: 3,
    type: "forum",
    icon: MessageCircle,
    color: "text-purple-600 bg-purple-50",
    title: "Pertanyaan baru di forum",
    desc: "Bagas Saputra bertanya di diskusi \"Simple Present Tense\"",
    time: "2 jam lalu",
  },
  {
    id: 4,
    type: "liveClass",
    icon: PlayCircle,
    color: "text-rose-600 bg-rose-50",
    title: "Live Class dijadwalkan",
    desc: "\"Review UTS IPA\" pada Kamis, 14 Agustus 2026, 09.00",
    time: "3 jam lalu",
  },
  {
    id: 5,
    type: "course",
    icon: BookOpen,
    color: "text-blue-600 bg-blue-50",
    title: "Course diperbarui",
    desc: "Modul \"Bahasa Indonesia - Teks Cerpen\" ditambah 2 bab baru",
    time: "Kemarin",
  },
];

const upcomingLive = [
  { id: 1, judul: "Review UTS IPA", kelas: "9A", tanggal: "Kam, 14 Agu 2026", waktu: "09.00 - 10.00" },
  { id: 2, judul: "Diskusi Karya Tulis", kelas: "7B", tanggal: "Jum, 15 Agu 2026", waktu: "13.00 - 14.00" },
];

// ===== MAIN COMPONENT =====

export default function PembelajaranPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu] = useState("pembelajaran");

  const totals = useMemo(
    () => ({
      course: 6,
      materi: 24,
      tugas: 5,
      forum: 12,
      liveClass: 2,
    }),
    []
  );

  const notifications = [
    { id: 1, title: "Pengumuman Libur Semester", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Deadline Input Nilai", desc: "Dikirim 5 jam lalu", read: false },
    { id: 3, title: "Jadwal Rapat Diperbarui", desc: "Dikirim 1 hari lalu", read: true },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active={activeMenu}
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={(value) => setSidebarOpen(!value)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          user={{ name: "Bapak/Ibu Guru", email: "guru@smartschool.com", avatar: "G" }}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-5xl mx-auto space-y-6">

            {/* PAGE HEADER */}
            <div>
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-500 text-white shadow-sm">
                  <Layers size={18} />
                </div>
                <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Pembelajaran</h1>
                <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                  Guru
                </span>
              </div>
              <p className="text-sm text-slate-500 ml-[52px] flex items-center gap-1.5">
                <Sparkles size={14} className="text-slate-400" />
                Semua proses belajar-mengajarmu dalam satu tempat.
              </p>
            </div>

            {/* MODULE CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {modules.map((m) => (
                <button
                  key={m.key}
                  onClick={() => router.push(m.path)}
                  className="text-left bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-5 hover:border-slate-300 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className={`p-2.5 rounded-lg border flex-shrink-0 ${m.color}`}>
                      <m.icon size={20} />
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all mt-1"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800 mt-3">{m.label}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{m.desc}</p>
                  <div className="flex items-center gap-1.5 mt-3">
                    <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
                    <span className="text-[11px] font-medium text-slate-500">{m.stat}</span>
                  </div>
                </button>
              ))}

              {/* Filler card: quick tip */}
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl p-4 sm:p-5 text-white flex flex-col justify-between">
                <div>
                  <Sparkles size={20} className="opacity-90" />
                  <h3 className="text-sm font-semibold mt-3">Tips</h3>
                  <p className="text-xs text-indigo-100 mt-1 leading-relaxed">
                    Unggah materi ke Course sebelum membuat Tugas, supaya siswa punya bahan belajar yang jelas sebelum mengerjakan.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* RECENT ACTIVITY */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-slate-200/60">
                  <h3 className="text-sm font-semibold text-slate-700">Aktivitas Terbaru</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {recentActivity.map((a) => (
                    <div key={a.id} className="p-4 sm:p-5 flex items-start gap-3 hover:bg-slate-50/60 transition-colors">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${a.color}`}>
                        <a.icon size={15} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-800">{a.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{a.desc}</p>
                      </div>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 flex-shrink-0 whitespace-nowrap">
                        <Clock size={11} />
                        {a.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* UPCOMING LIVE CLASS */}
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden h-fit">
                <div className="p-4 sm:p-5 border-b border-slate-200/60 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-700">Live Class Mendatang</h3>
                  <CalendarClock size={15} className="text-slate-400" />
                </div>
                <div className="divide-y divide-slate-100">
                  {upcomingLive.map((l) => (
                    <div key={l.id} className="p-4 sm:p-5">
                      <p className="text-sm font-medium text-slate-800">{l.judul}</p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Users size={11} className="text-slate-400" />
                          Kelas {l.kelas}
                        </span>
                        <span>{l.tanggal}</span>
                        <span>{l.waktu}</span>
                      </div>
                    </div>
                  ))}
                  <div className="p-3">
                    <button
                      onClick={() => router.push("/guru/pembelajaran/liveClass")}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                      Lihat Semua Jadwal
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}