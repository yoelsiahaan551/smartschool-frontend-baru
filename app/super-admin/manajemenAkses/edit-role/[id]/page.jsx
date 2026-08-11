"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import Header from "../../../../components/Header";
import RoleForm from "../../../../components/RoleForm";
import { dummyRoles } from "../../../../../lib/data";

export default function EditRolePage() {
  const params = useParams();
  const id = params.id;
  const initialData = dummyRoles.find((item) => item.id === id);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu] = useState("manajemen-akses");
  const notifications = [
    { id: 1, title: "Pembaruan Sistem v2.0", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Pengingat: Backup Data", desc: "Dikirim 1 hari lalu", read: false },
  ];

  if (!initialData) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-700">Data tidak ditemukan</h2>
          <button
            onClick={() => window.location.href = "/super-admin/manajemenAkses"}
            className="mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

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
          <RoleForm initialData={initialData} isEdit={true} />
        </main>
      </div>
    </div>
  );
}