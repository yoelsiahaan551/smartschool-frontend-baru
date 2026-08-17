"use client";

import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import LanggananForm from "../../../components/LanggananForm";

export default function TambahLanggananPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu] = useState("langganan");
  const notifications = [
    { id: 1, title: "Pembaruan Sistem v2.0", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Pengingat: Backup Data", desc: "Dikirim 1 hari lalu", read: false },
  ];

  return (
    // Pola wrapper disamakan persis dengan halaman Profil/Pengumuman/Dashboard/Langganan Sekolah:
    // min-h-screen (bukan h-screen + overflow-hidden) di wrapper luar,
    // dan main tanpa overflow-y-auto (p-4 sm:p-6 lg:p-8) supaya sidebar mengikuti
    // tinggi konten halaman dan konsisten saat responsive/zoom.
    <div className="flex min-h-screen bg-slate-50">
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <LanggananForm isEdit={false} />
        </main>
      </div>
    </div>
  );
}