"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  Calendar, BookOpen, GraduationCap, Clock, Users, FileText,
  Layers, PlusCircle
} from "lucide-react";

export default function AkademikPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const menuAkademik = [
    {
      label: "Tahun Ajaran",
      description: "Kelola tahun ajaran aktif dan non-aktif",
      icon: Calendar,
      path: "/admin/akademik/tahun-ajaran",
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      label: "Semester",
      description: "Atur semester ganjil dan genap",
      icon: Layers,
      path: "/admin/akademik/semester",
      color: "bg-purple-50 text-purple-600 border-purple-200"
    },
    {
      label: "Kurikulum",
      description: "Tetapkan kurikulum yang berlaku",
      icon: BookOpen,
      path: "/admin/akademik/kurikulum",
      color: "bg-emerald-50 text-emerald-600 border-emerald-200"
    },
    {
      label: "Mata Pelajaran",
      description: "Daftar mata pelajaran sekolah",
      icon: GraduationCap,
      path: "/admin/akademik/mata-pelajaran",
      color: "bg-amber-50 text-amber-600 border-amber-200"
    },
    {
      label: "Kelas & Rombel",
      description: "Manajemen kelas dan rombongan belajar",
      icon: Users,
      path: "/admin/akademik/kelas",
      color: "bg-rose-50 text-rose-600 border-rose-200"
    },
    {
      label: "Jadwal Pelajaran",
      description: "Atur jadwal mengajar setiap kelas",
      icon: Clock,
      path: "/admin/akademik/jadwal",
      color: "bg-sky-50 text-sky-600 border-sky-200"
    },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        active="akademik"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
        role="admin"
      />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-600 text-white">
                <FileText size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Manajemen Akademik</h1>
                <p className="text-sm text-slate-500">Kelola seluruh data akademik sekolah secara terpusat.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuAkademik.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    onClick={() => router.push(item.path)}
                    className="group relative bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl border ${item.color}`}>
                        <Icon size={20} />
                      </div>
                      <PlusCircle className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5">{item.description}</p>
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