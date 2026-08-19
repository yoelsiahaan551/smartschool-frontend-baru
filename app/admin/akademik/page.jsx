"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  ClipboardList,
  NotebookPen,
  Award,
  FileSpreadsheet,
  Smile,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

/**
 * app/admin/akademik/page.jsx
 *
 * Landing/dashboard untuk modul Akademik — daftar menu di sini disesuaikan
 * PERSIS dengan folder yang beneran ada di app/admin/akademik/*:
 *   - monitoringSiswa
 *   - nilai
 *   - prestasi
 *   - rapor
 *   - sikapPerilaku
 *
 * Kalau nanti nambah folder baru di app/admin/akademik/, tinggal tambahin
 * satu entri baru di array `menuAkademik` di bawah — bentuknya konsisten:
 * { label, description, icon, path }.
 */

const menuAkademik = [
  {
    label: "Monitoring Siswa",
    description: "Pantau perkembangan dan aktivitas belajar siswa",
    icon: ClipboardList,
    path: "/admin/akademik/monitoringSiswa",
    color: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    label: "Nilai",
    description: "Kelola dan lihat nilai akademik siswa",
    icon: NotebookPen,
    path: "/admin/akademik/nilai",
    color: "bg-emerald-50 text-emerald-600 border-emerald-200",
  },
  {
    label: "Prestasi",
    description: "Catat dan kelola prestasi siswa",
    icon: Award,
    path: "/admin/akademik/prestasi",
    color: "bg-amber-50 text-amber-600 border-amber-200",
  },
  {
    label: "Rapor",
    description: "Susun dan cetak rapor siswa",
    icon: FileSpreadsheet,
    path: "/admin/akademik/rapor",
    color: "bg-purple-50 text-purple-600 border-purple-200",
  },
  {
    label: "Sikap & Perilaku",
    description: "Catat penilaian sikap dan perilaku siswa",
    icon: Smile,
    path: "/admin/akademik/sikapPerilaku",
    color: "bg-rose-50 text-rose-600 border-rose-200",
  },
];

export default function AkademikPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

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
            {/* HEADER */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
                <GraduationCap size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Akademik</h1>
                <p className="text-sm text-slate-500">
                  Kelola data akademik siswa: monitoring, nilai, prestasi, rapor, dan sikap perilaku.
                </p>
              </div>
            </div>

            {/* MENU AKADEMIK */}
            <div>
              <h2 className="text-sm font-semibold text-slate-600 mb-3">Modul Akademik</h2>
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
                        <ArrowRight
                          size={18}
                          className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
                        />
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
          </div>
        </main>
      </div>
    </div>
  );
}