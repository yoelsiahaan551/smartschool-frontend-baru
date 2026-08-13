"use client";

import { useState, useEffect } from "react";
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
  Crown,
  PanelLeftClose,
  GraduationCap,
  MessageSquare,
  BookOpen,
  Megaphone,
  ChevronDown,
  ClipboardCheck,
  AlertTriangle,
  Award,
  IdCard,
  NotebookPen,
  HelpCircle,
  Layers,
  MessagesSquare,
  Video,
  File,
  ClipboardList,

} from "lucide-react";

/**
 * Konfigurasi menu per-role.
 * Tambahkan role baru di sini kalau suatu saat perlu (misal "orang-tua", "siswa", dst)
 * tanpa perlu bikin komponen Sidebar terpisah.
 *
 * Item bisa punya `children` (array) untuk bikin submenu yang bisa expand/collapse.
 */
const roleConfig = {
  "super-admin": {
    basePath: "/super-admin",
    brandName: "Super Admin",
    initials: "SA",
    email: "admin@smartschool.com",
    menuSections: [
      { type: "item", key: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/super-admin" },
      { type: "header", label: "PRODUK" },
      { type: "item", key: "paketModul", icon: Package, label: "Paket & Modul", path: "/super-admin/paketModul" },
      { type: "item", key: "langgananSekolah", icon: Users, label: "Langganan Sekolah", path: "/super-admin/langgananSekolah" },
      { type: "header", label: "DATA MASTER" },
      { type: "item", key: "yayasan", icon: School, label: "Yayasan", path: "/super-admin/yayasan" },
      { type: "item", key: "sekolah", icon: Building2, label: "Sekolah", path: "/super-admin/sekolah" },
      { type: "header", label: "ADMINISTRASI" },
      { type: "item", key: "manajemenAkses", icon: ShieldCheck, label: "Manajemen Akses", path: "/super-admin/manajemenAkses" },
      { type: "item", key: "laporanAnalitik", icon: FileText, label: "Laporan & Analitik", path: "/super-admin/laporanAnalitik" },
      { type: "header", label: "SISTEM" },
      { type: "item", key: "pengaturanSistem", icon: Settings, label: "Pengaturan Sistem", path: "/super-admin/pengaturanSistem" },
      { type: "item", key: "notifikasiPengumuman", icon: Bell, label: "Notifikasi & Pengumuman", path: "/super-admin/notifikasiPengumuman" },
      { type: "item", key: "profileLogout", icon: User, label: "Profil & Logout", path: "/super-admin/profileLogout" },
    ],
  },
  guru: {
    basePath: "/guru",
    brandName: "Guru",
    initials: "GR",
    email: "guru@smartschool.com",
    menuSections: [
      { type: "item", key: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/guru" },

      { type: "header", label: "AKADEMIK" },
      {
        type: "item",
        key: "akademik",
        icon: GraduationCap,
        label: "Akademik",
        path: "/guru/akademik",
        children: [
          { key: "absensi", icon: ClipboardCheck, label: "Absensi", path: "/guru/akademik/absensi" },
          { key: "catatanPelanggaran", icon: AlertTriangle, label: "Catatan Pelanggaran", path: "/guru/akademik/catatanPelanggaran" },
          { key: "catatanPrestasi", icon: Award, label: "Catatan Prestasi", path: "/guru/akademik/catatanPrestasi" },
          { key: "dataSiswa", icon: IdCard, label: "Data Siswa", path: "/guru/akademik/dataSiswa" },
          { key: "nilai", icon: NotebookPen, label: "Nilai", path: "/guru/akademik/nilai" },
          { key: "quiz", icon: HelpCircle, label: "Quiz", path: "/guru/akademik/quiz" },
        ],
      },

      { type: "header", label: "PROSES BELAJAR" },
      {
        type: "item",
        key: "pembelajaran",
        icon: Layers,
        label: "Pembelajaran",
        path: "/guru/pembelajaran",
        children: [
          { key: "course", icon: BookOpen, label: "Course", path: "/guru/pembelajaran/course" },
          { key: "forum", icon: MessagesSquare, label: "Forum", path: "/guru/pembelajaran/forum" },
          { key: "liveClass", icon: Video, label: "Live Class", path: "/guru/pembelajaran/liveClass" },
          { key: "materi", icon: File, label: "Materi", path: "/guru/pembelajaran/materi" },
          { key: "tugas", icon: ClipboardList, label: "Tugas", path: "/guru/pembelajaran/tugas" },
        ],
      },
      { type: "item", key: "chat", icon: MessageSquare, label: "Chat", path: "/guru/chat" },

      { type: "header", label: "INFORMASI" },
      { type: "item", key: "pengumuman", icon: Megaphone, label: "Pengumuman", path: "/guru/pengumuman" },

      { type: "header", label: "AKUN" },
      { type: "item", key: "profile", icon: User, label: "Profil", path: "/guru/profile" },
    ],
  },
 
};

function resolveRole(pathname) {
  if (pathname?.startsWith("/guru")) return "guru";
  if (pathname?.startsWith("/super-admin")) return "super-admin";
  return "super-admin"; // fallback
}

export default function Sidebar({ active, setActive, collapsed, setCollapsed }) {
  const router = useRouter();
  const pathname = usePathname();

  const role = resolveRole(pathname);
  const config = roleConfig[role];
  const menuSections = config.menuSections;

  // Track submenu mana yang lagi terbuka
  const [openMenus, setOpenMenus] = useState({});

  // Auto-expand submenu kalau path aktif ada di dalam salah satu children-nya
  useEffect(() => {
    const next = {};
    menuSections.forEach((item) => {
      if (item.children?.some((child) => pathname?.startsWith(child.path))) {
        next[item.key] = true;
      }
    });
    setOpenMenus((prev) => ({ ...prev, ...next }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const toggleSubmenu = (key) => {
    if (collapsed) setCollapsed(false);
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Klik di badan item:
  // - Kalau belum di halaman itu -> navigasi ke halamannya (submenu belum kebuka)
  // - Kalau udah di halaman itu (klik ke-2 kalinya) -> toggle buka/tutup submenu
  // - Klik di chevron kapan saja -> toggle buka/tutup submenu
  const handleMenuClick = (item) => {
    const alreadyOnThisPage = pathname === item.path;

    setActive(item.key);

    if (item.children && alreadyOnThisPage) {
      toggleSubmenu(item.key);
      return;
    }

    if (item.path) {
      router.push(item.path);
    }
  };

  const handleSubItemClick = (parentKey, child) => {
    setActive(child.key);
    router.push(child.path);
  };

  return (
    <aside
      className={`
        ${collapsed ? "w-[72px]" : "w-64"} 
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
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Garis gradient di atas */}
      <div className="relative z-10 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

      {/* Logo & Toggle Button */}
      <div className="relative z-10 flex items-center justify-between px-4 h-20 border-b border-white/10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 flex-1 min-w-0"
        >
          <div
            className={`
            relative rounded-xl 
            bg-gradient-to-br from-blue-500/30 to-indigo-500/20
            border border-white/20
            flex items-center justify-center 
            transition-all duration-300
            hover:scale-105
            ${collapsed ? "w-12 h-12" : "w-10 h-10"}
          `}
          >
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
                  {config.brandName}
                </span>
              </div>
            </div>
          )}
        </button>

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

      {/* Mini Profile */}
      {!collapsed && (
        <div className="relative z-10 mx-3 mt-4 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white/30 flex items-center justify-center text-white text-sm font-bold">
                {config.initials}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#1A2332] ring-2 ring-emerald-400/50 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{config.brandName}</p>
              <p className="text-[10px] text-blue-200/60 truncate">{config.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
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

          const hasChildren = !!item.children;
          const isChildActive = hasChildren && item.children.some((c) => pathname?.startsWith(c.path));
          const isActive = active === item.key || pathname === item.path || isChildActive;
          const isOpen = !!openMenus[item.key];

          return (
            <div key={item.key}>
              {/*
                Catatan: dulu ini <button> tunggal yang membungkus chevron.
                Sekarang jadi <div role="button"> supaya chevron bisa jadi
                tombol terpisah di dalamnya (nested <button> tidak valid HTML).
                - Klik di badan item, halaman BELUM aktif -> navigasi ke halamannya
                - Klik di badan item, halaman SUDAH aktif -> toggle buka/tutup submenu (klik ke-2)
                - Klik di chevron kapan saja               -> toggle buka/tutup submenu
              */}
              <div
                onClick={() => handleMenuClick(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleMenuClick(item);
                  }
                }}
                className={`
                  relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl 
                  text-sm font-medium transition-all duration-200 ease-out cursor-pointer select-none
                  ${isActive ? "text-white bg-white/20 border border-white/30" : "text-white/50 hover:text-white hover:bg-white/10"}
                  ${collapsed ? "justify-center px-2" : ""}
                  group
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b from-blue-300 to-indigo-300" />
                )}

                <div
                  className={`
                  relative flex items-center justify-center
                  transition-all duration-200
                  ${isActive ? "text-white" : "text-white/40 group-hover:text-white/80"}
                  ${collapsed ? "w-10 h-10" : ""}
                `}
                >
                  <item.icon
                    size={20}
                    className={`
                      transition-all duration-200
                      ${isActive ? "scale-110" : ""}
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

                {!collapsed && <span className="flex-1 text-left text-xs tracking-wide">{item.label}</span>}

                {!collapsed && hasChildren && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // jangan ikut trigger navigasi parent
                      toggleSubmenu(item.key);
                    }}
                    className="p-1 -m-1 rounded-md hover:bg-white/10 transition-colors duration-150"
                    title={isOpen ? "Tutup submenu" : "Buka submenu"}
                  >
                    <ChevronDown
                      size={14}
                      className={`text-white/40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                )}

                {!collapsed && !hasChildren && isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}

                {collapsed && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#1A2332] backdrop-blur-md text-white text-[10px] font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 ease-out translate-x-1 group-hover:translate-x-0 whitespace-nowrap pointer-events-none border border-white/20">
                    {item.label}
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#1A2332] rotate-45 border-l border-b border-white/20" />
                  </div>
                )}
              </div>

              {/* Submenu */}
              {hasChildren && !collapsed && (
                <div
                  className={`overflow-hidden transition-all duration-200 ease-out ${
                    isOpen ? "max-h-96 opacity-100 mt-0.5" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-4 pl-3 border-l border-white/10 space-y-0.5 py-1">
                    {item.children.map((child) => {
                      const isChildItemActive = active === child.key || pathname === child.path;
                      return (
                        <button
                          key={child.key}
                          onClick={() => handleSubItemClick(item.key, child)}
                          className={`
                            flex items-center gap-2.5 w-full px-3 py-2 rounded-lg
                            text-xs font-medium transition-all duration-200
                            ${
                              isChildItemActive
                                ? "text-white bg-white/15 border border-white/20"
                                : "text-white/45 hover:text-white hover:bg-white/10"
                            }
                          `}
                        >
                          <child.icon size={15} className={isChildItemActive ? "text-blue-300" : "text-white/35"} />
                          <span className="flex-1 text-left tracking-wide">{child.label}</span>
                          {isChildItemActive && <div className="w-1 h-1 rounded-full bg-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}