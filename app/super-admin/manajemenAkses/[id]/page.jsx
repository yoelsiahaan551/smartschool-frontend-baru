"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Users,
  UserCheck,
  UserCog,
  BookOpen,
  DollarSign,
  Key,
  ArrowLeft,
  Edit,
  CheckCircle,
  XCircle,
  Lock,
  Unlock,
  Layers,
  Plus,
  X,
} from "lucide-react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { dummyRoles, dummyPermissions } from "../../../../lib/data";
import { useState } from "react";

const iconMap = {
  Shield: Shield,
  ShieldCheck: ShieldCheck,
  ShieldAlert: ShieldAlert,
  UserCheck: UserCheck,
  BookOpen: BookOpen,
  DollarSign: DollarSign,
  Users: Users,
  UserCog: UserCog,
  Key: Key,
};

export default function DetailRolePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const role = dummyRoles.find((item) => item.id === id);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu] = useState("manajemen-akses");
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const notifications = [
    { id: 1, title: "Pembaruan Sistem v2.0", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Pengingat: Backup Data", desc: "Dikirim 1 hari lalu", read: false },
  ];

  if (!role) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="p-4 rounded-full bg-slate-100 mx-auto w-16 h-16 flex items-center justify-center mb-4">
            <Shield size={32} className="text-slate-400" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-700">Role tidak ditemukan</h2>
          <p className="text-sm text-slate-400 mt-1">Data role yang Anda cari tidak tersedia</p>
          <button
            onClick={() => router.push("/super-admin/manajemenAkses")}
            className="mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm hover:shadow"
          >
            Kembali ke Manajemen Akses
          </button>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[role.ikon] || Shield;
  const statusColorMap = {
    aktif: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
    nonaktif: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", dot: "bg-rose-500" },
  };
  const statusStyle = statusColorMap[role.status] || statusColorMap.nonaktif;

  // Simulasi permission yang dimiliki role
  const rolePermissions = dummyPermissions.slice(0, role.izin);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active={activeMenu}
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          user={{ name: "Sarah", email: "sarah@smartschool.com", avatar: "SA" }}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6">

            {/* Tombol Kembali */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              Kembali
            </button>

            {/* Header Detail */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-2xl shadow-sm flex-shrink-0">
                    <IconComponent size={28} />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">{role.nama}</h1>
                    <p className="text-sm text-slate-500 font-mono">ID: {role.id}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${statusStyle.dot} mr-1.5`} />
                    {role.status === "aktif" ? "Aktif" : "Nonaktif"}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600 border border-blue-200">
                    {role.izin} Izin
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-50 text-purple-600 border border-purple-200">
                    {role.pengguna} Pengguna
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-3">{role.deskripsi}</p>
            </div>

            {/* Daftar Izin */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2.5">
                  <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                    <Layers size={16} />
                  </span>
                  Daftar Izin ({role.izin})
                </h3>
                <button
                  onClick={() => setShowPermissionModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Plus size={14} />
                  Kelola Izin
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {rolePermissions.length > 0 ? (
                  rolePermissions.map((perm) => (
                    <div
                      key={perm.id}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/60"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-emerald-500" />
                        <span className="text-sm text-slate-700">{perm.nama}</span>
                      </div>
                      <span className="text-xs text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {perm.modul}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400 col-span-2 text-center py-4">
                    Role ini belum memiliki izin
                  </p>
                )}
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-200/80">
              <button
                onClick={() => router.back()}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Tutup
              </button>
              <button
                onClick={() => router.push(`/super-admin/manajemenAkses/edit-role/${role.id}`)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
              >
                <Edit size={16} />
                Edit Role
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}