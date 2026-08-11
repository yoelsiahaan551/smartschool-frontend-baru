"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  School,
  Building2,
  Package,
  Users,
  ShieldCheck,
  FileText,
  Settings,
  Bell,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Crown,
  PanelLeft,
  PanelLeftClose,
  Layout,
} from "lucide-react";

const menuSections = [
  { type: "item", key: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/super-admin" },
  { type: "header", label: "PRODUK" },
  { type: "item", key: "paketModul", icon: Package, label: "Paket & Modul", path: "/super-admin/paketModul"},
  { type: "item", key: "langgananSekolah", icon: Users, label: "Langganan Sekolah", path: "/super-admin/langgananSekolah" },
  { type: "header", label: "DATA MASTER" },
  { type: "item", key: "yayasan", icon: School, label: "Yayasan", path: "/super-admin/yayasan" },
  { type: "item", key: "sekolah", icon: Building2, label: "Sekolah", path: "/super-admin/sekolah" },
  { type: "header", label: "ADMINISTRASI" },
 { type: "item", key: "manajemenAkses", icon: ShieldCheck, label: "Manajemen Akses", path: "/super-admin/manajemenAkses"},
  { type: "item", key: "laporanAnalitik", icon: FileText, label: "Laporan & Analitik", path: "/super-admin/laporanAnalitik" },
  { type: "header", label: "SISTEM" },
  { type: "item", key: "pengaturanSistem", icon: Settings, label: "Pengaturan Sistem", path: "/super-admin/pengaturanSistem" },
  { type: "item", key: "notifikasiPengumuman", icon: Bell, label: "Notifikasi & Pengumuman", path: "/super-admin/notifikasiPengumuman" },
  { type: "item", key: "profileLogout", icon: User, label: "Profil & Logout", path: "/super-admin/profileLogout" },
];

export default function Sidebar({ active, setActive, collapsed, setCollapsed }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = (item) => {
    setActive(item.key);
    if (item.path) {
      router.push(item.path);
    }
  };

  return (
    <aside 
      className={`
        ${collapsed ? 'w-[72px]' : 'w-64'} 
        bg-gradient-to-b from-[#1A2332] via-[#0F1729] to-[#0A0F1A]
        flex flex-col 
        transition-all duration-300 ease-in-out
        flex-shrink-0 h-screen sticky top-0
        relative overflow-hidden
        border-r border-white/5
      `}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-2xl" />
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-400/5 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-400/5 rounded-full blur-2xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      {/* Garis gradient di atas */}
      <div className="relative z-10 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

      {/* Logo & Toggle Button */}
      <div className="relative z-10 flex items-center justify-between px-4 h-20 border-b border-white/10">
        {/* Logo sebagai tombol toggle saat collapsed */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 flex-1 min-w-0"
        >
          <div className={`
            relative rounded-xl 
            bg-gradient-to-br from-blue-500/30 to-indigo-500/20
            border border-white/20
            flex items-center justify-center 
            transition-all duration-300
            hover:scale-105
            ${collapsed ? 'w-12 h-12' : 'w-10 h-10'}
          `}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent rounded-xl" />
            <Image
              src="/logo/logoSS.png"
              alt="Smart School Logo"
              width={collapsed ? 32 : 28}
              height={collapsed ? 32 : 28}
              className="object-contain brightness-0 invert"
              priority
            />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight text-left">
              <span className="font-bold text-white text-xl tracking-tight">
                Smart<span className="text-blue-300">School</span>
              </span>
              <div className="flex items-center gap-1.5">
                <Crown size={10} className="text-yellow-400/80" />
                <span className="text-[10px] text-blue-200/70 font-medium tracking-wider uppercase">
                  Super Admin
                </span>
              </div>
            </div>
          )}
        </button>

        {/* Tombol Toggle - hanya muncul saat sidebar tidak collapsed */}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="flex items-center justify-center w-8 h-8 rounded-lg 
              bg-white/10 hover:bg-white/20 transition-colors duration-200
              border border-white/20 hover:border-white/40
              text-white/70 hover:text-white"
            title="Ciutkan Sidebar"
          >
            <PanelLeftClose size={18} />
          </button>
        )}
      </div>

      {/* Mini Profile - Semua shadow dihapus */}
      {!collapsed && (
        <div className="relative z-10 mx-3 mt-4 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white/30 flex items-center justify-center text-white text-sm font-bold">
                SA
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#1A2332] ring-2 ring-emerald-400/50 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Super Admin</p>
              <p className="text-[10px] text-blue-200/60 truncate">admin@smartschool.com</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation - tanpa Logout di bawah */}
      <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-4 space-y-0.5 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pb-6">
        {menuSections.map((item, index) => {
          if (item.type === "header") {
            if (collapsed) return null;
            return (
              <div key={`header-${index}`} className="px-2 pt-5 pb-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-[9px] font-semibold text-white/40 uppercase tracking-[0.2em]">
                    {item.label}
                  </span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
              </div>
            );
          }

          const isActive = active === item.key || pathname === item.path;

          return (
            <button
              key={item.key}
              onClick={() => handleMenuClick(item)}
              className={`
                relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl 
                text-sm font-medium transition-all duration-200 ease-out
                ${isActive 
                  ? 'text-white bg-white/20 border border-white/30' 
                  : 'text-white/50 hover:text-white hover:bg-white/10'
                }
                ${collapsed ? 'justify-center px-2' : ''}
                group
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b from-blue-300 to-indigo-300" />
              )}

              <div className={`
                relative flex items-center justify-center
                transition-all duration-200
                ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/80'}
                ${collapsed ? 'w-10 h-10' : ''}
              `}>
                <item.icon 
                  size={20} 
                  className={`
                    transition-all duration-200
                    ${isActive ? 'scale-110' : ''}
                    group-hover:scale-110
                  `}
                />
                {isActive && !collapsed && (
                  <div className="absolute inset-0 bg-blue-400/20 rounded-lg blur-xl -z-10" />
                )}
                {isActive && collapsed && (
                  <div className="absolute inset-0 bg-blue-400/30 rounded-lg blur-xl -z-10" />
                )}
              </div>
              
              {!collapsed && (
                <span className="flex-1 text-left text-xs tracking-wide">{item.label}</span>
              )}
              
              {!collapsed && isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}

              {collapsed && (
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#1A2332] backdrop-blur-md text-white text-[10px] font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 ease-out translate-x-1 group-hover:translate-x-0 whitespace-nowrap pointer-events-none border border-white/20">
                  {item.label}
                  <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#1A2332] rotate-45 border-l border-b border-white/20" />
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Tidak ada Logout dan Version Info di sini */}
    </aside>
  );
}