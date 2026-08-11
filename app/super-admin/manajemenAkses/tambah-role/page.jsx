"use client";

import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import RoleForm from "../../../components/RoleForm";

export default function TambahRolePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu] = useState("manajemen-akses");
  const notifications = [
    { id: 1, title: "Pembaruan Sistem v2.0", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Pengingat: Backup Data", desc: "Dikirim 1 hari lalu", read: false },
  ];

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
          <RoleForm isEdit={false} />
        </main>
      </div>
    </div>
  );
}