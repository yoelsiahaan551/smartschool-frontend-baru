"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  File,
  Plus,
  Search,
  MoreVertical,
  Clock,
  Download,
  FileText,
  FileImage,
  FileVideo,
  Presentation,
} from "lucide-react";

const materials = [
  {
    id: 1,
    title: "Bab 4 - Persamaan Linear",
    kelas: "8A",
    type: "pdf",
    size: "2.4 MB",
    updated: "10 menit lalu",
  },
  {
    id: 2,
    title: "Slide Simple Present Tense",
    kelas: "8A",
    type: "ppt",
    size: "5.1 MB",
    updated: "1 hari lalu",
  },
  {
    id: 3,
    title: "Video Sistem Tata Surya",
    kelas: "9A",
    type: "video",
    size: "48 MB",
    updated: "3 hari lalu",
  },
  {
    id: 4,
    title: "Peta Konsep Teks Cerpen",
    kelas: "7B",
    type: "image",
    size: "1.2 MB",
    updated: "5 hari lalu",
  },
];

const typeStyle = {
  pdf: { icon: FileText, color: "text-red-600 bg-red-50 border-red-200", label: "PDF" },
  ppt: { icon: Presentation, color: "text-orange-600 bg-orange-50 border-orange-200", label: "Slide" },
  video: { icon: FileVideo, color: "text-blue-600 bg-blue-50 border-blue-200", label: "Video" },
  image: { icon: FileImage, color: "text-emerald-600 bg-emerald-50 border-emerald-200", label: "Gambar" },
};

export default function MateriPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const notifications = [
    { id: 1, title: "Pengumuman Libur Semester", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Deadline Input Nilai", desc: "Dikirim 5 jam lalu", read: false },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="materi"
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
                  <div className="p-2 rounded-lg bg-amber-500 text-white shadow-sm">
                    <File size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Materi</h1>
                </div>
                <p className="text-sm text-slate-500 ml-[52px]">
                  Unggah bahan ajar berupa dokumen, slide, atau video.
                </p>
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 text-white text-sm font-medium rounded-xl hover:bg-amber-700 transition-colors shadow-sm">
                <Plus size={16} />
                Unggah Materi
              </button>
            </div>

            {/* SEARCH */}
            <div className="relative max-w-sm">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari materi..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            {/* MATERIAL LIST */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-200/60">
                <h3 className="text-sm font-semibold text-slate-700">Semua Materi</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {materials.map((m) => {
                  const t = typeStyle[m.type];
                  return (
                    <div
                      key={m.id}
                      className="p-4 sm:p-5 flex items-center gap-3 hover:bg-slate-50/60 transition-colors"
                    >
                      <div className={`p-2.5 rounded-lg border flex-shrink-0 ${t.color}`}>
                        <t.icon size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-800 truncate">{m.title}</p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-500">
                          <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-full text-[11px] font-medium">
                            Kelas {m.kelas}
                          </span>
                          <span className="text-[11px] font-medium text-slate-400">{t.label}</span>
                          <span>{m.size}</span>
                          <span className="flex items-center gap-1 text-[11px] text-slate-400">
                            <Clock size={11} />
                            {m.updated}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                          <Download size={16} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
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