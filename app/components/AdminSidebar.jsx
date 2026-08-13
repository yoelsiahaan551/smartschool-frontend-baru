"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard, GraduationCap, Calendar, BookOpen, NotebookPen, Users, Building2, IdCard, User, UserCog, Activity, ClipboardCheck, Award, HelpCircle, FileText, Layers, Wallet, CreditCard, AlertTriangle, ClipboardList, BarChart, School, Briefcase, BookMarked, Package, MessageSquare, Megaphone, MessagesSquare, Bell, Settings, Lock, LogOut, Crown, PanelLeftClose, ChevronDown,
} from "lucide-react";

const MENU_SECTIONS = [
  { type: "item", key: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { type: "header", label: "AKADEMIK" },
  {
    type: "item", key: "akademik", icon: GraduationCap, label: "Akademik", path: "/admin/akademik",
    children: [
      { key: "tahunAjaran", icon: Calendar, label: "Tahun Ajaran", path: "/admin/akademik/tahun-ajaran" },
      { key: "kurikulum", icon: BookOpen, label: "Kurikulum", path: "/admin/akademik/kurikulum" },
      { key: "mataPelajaran", icon: NotebookPen, label: "Mata Pelajaran", path: "/admin/akademik/mata-pelajaran" },
      { key: "kelasRombel", icon: Users, label: "Kelas & Rombel", path: "/admin/akademik/kelas" },
      { key: "jadwalPelajaran", icon: Calendar, label: "Jadwal Pelajaran", path: "/admin/akademik/jadwal" },
    ],
  },
  { type: "header", label: "DATA SEKOLAH" },
  {
    type: "item", key: "dataSekolah", icon: Building2, label: "Data Sekolah", path: "/admin/data-sekolah",
    children: [
      { key: "pesertaDidik", icon: IdCard, label: "Peserta Didik", path: "/admin/peserta-didik" },
      { key: "tenagaPendidik", icon: User, label: "Tenaga Pendidik", path: "/admin/tenaga-pendidik" },
      { key: "orangTua", icon: Users, label: "Orang Tua / Wali", path: "/admin/orang-tua" },
      { key: "pengguna", icon: UserCog, label: "Pengguna", path: "/admin/users" },
    ],
  },
  { type: "header", label: "KEGIATAN AKADEMIK" },
  {
    type: "item", key: "kegiatanAkademik", icon: Activity, label: "Kegiatan Akademik", path: "/admin/kegiatan-akademik",
    children: [
      { key: "absensi", icon: ClipboardCheck, label: "Absensi", path: "/admin/absensi" },
      { key: "penilaian", icon: Award, label: "Penilaian", path: "/admin/penilaian" },
      { key: "ujian", icon: HelpCircle, label: "Ujian", path: "/admin/ujian" },
      { key: "rapor", icon: FileText, label: "Rapor", path: "/admin/penilaian/nilai-rapor" },
      { key: "kenaikanKelas", icon: Layers, label: "Kenaikan Kelas", path: "/admin/penilaian/kenaikan-kelas" },
    ],
  },
  { type: "header", label: "KEUANGAN" },
  {
    type: "item", key: "keuangan", icon: Wallet, label: "Keuangan", path: "/admin/keuangan",
    children: [
      { key: "pembayaran", icon: CreditCard, label: "Pembayaran", path: "/admin/pembayaran" },
      { key: "tagihan", icon: FileText, label: "Tagihan", path: "/admin/pembayaran/tagihan" },
      { key: "tunggakan", icon: AlertTriangle, label: "Tunggakan", path: "/admin/pembayaran/tunggakan" },
      { key: "transaksi", icon: ClipboardList, label: "Transaksi", path: "/admin/pembayaran/transaksi" },
      { key: "laporanKeuangan", icon: BarChart, label: "Laporan Keuangan", path: "/admin/keuangan/laporan" },
    ],
  },
  { type: "header", label: "PROGRAM SEKOLAH" },
  {
    type: "item", key: "programSekolah", icon: School, label: "Program Sekolah", path: "/admin/program-sekolah",
    children: [
      { key: "pkl", icon: Briefcase, label: "PKL / Praktik Kerja", path: "/admin/pkl" },
      { key: "ekstrakurikuler", icon: Users, label: "Ekstrakurikuler", path: "/admin/ekstrakurikuler" },
      { key: "perpustakaan", icon: BookMarked, label: "Perpustakaan", path: "/admin/perpustakaan" },
      { key: "inventaris", icon: Package, label: "Inventaris", path: "/admin/inventaris" },
    ],
  },
  { type: "header", label: "KOMUNIKASI" },
  {
    type: "item", key: "komunikasi", icon: MessageSquare, label: "Komunikasi", path: "/admin/komunikasi",
    children: [
      { key: "pengumuman", icon: Megaphone, label: "Pengumuman", path: "/admin/pengumuman" },
      { key: "pesan", icon: MessagesSquare, label: "Pesan", path: "/admin/komunikasi/pesan" },
      { key: "notifikasi", icon: Bell, label: "Notifikasi", path: "/admin/komunikasi/notifikasi" },
    ],
  },
  { type: "header", label: "LAPORAN" },
  {
    type: "item", key: "laporan", icon: FileText, label: "Laporan", path: "/admin/laporan",
    children: [
      { key: "laporanAkademik", icon: GraduationCap, label: "Laporan Akademik", path: "/admin/laporan/akademik" },
      { key: "laporanPesertaDidik", icon: IdCard, label: "Laporan Peserta Didik", path: "/admin/laporan/peserta-didik" },
      { key: "laporanKehadiran", icon: ClipboardCheck, label: "Laporan Kehadiran", path: "/admin/laporan/kehadiran" },
      { key: "laporanKeuangan", icon: BarChart, label: "Laporan Keuangan", path: "/admin/laporan/keuangan" },
    ],
  },
  { type: "header", label: "KONFIGURASI" },
  {
    type: "item", key: "konfigurasi", icon: Settings, label: "Konfigurasi", path: "/admin/settings",
    children: [
      { key: "profilSekolah", icon: School, label: "Profil Sekolah", path: "/admin/settings/profil-sekolah" },
      { key: "konfigurasiSistem", icon: Settings, label: "Konfigurasi Sistem", path: "/admin/settings/konfigurasi" },
      { key: "notifikasi", icon: Bell, label: "Notifikasi", path: "/admin/settings/notifikasi" },
      { key: "keamanan", icon: Lock, label: "Keamanan", path: "/admin/settings/keamanan" },
    ],
  },
  { type: "header", label: "AKUN" },
  {
    type: "item", key: "akun", icon: User, label: "Akun", path: "/admin/profile",
    children: [
      { key: "profilSaya", icon: User, label: "Profil Saya", path: "/admin/profile" },
      { key: "logout", icon: LogOut, label: "Logout", path: "/admin/logout" },
    ],
  },
];

export default function AdminSidebar({ active, setActive, collapsed, setCollapsed }) {
  const router = useRouter();
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState({});

  useEffect(() => {
    const next = {};
    MENU_SECTIONS.forEach((item) => {
      if (item.children?.some((child) => pathname?.startsWith(child.path))) {
        next[item.key] = true;
      }
    });
    setOpenMenus((prev) => ({ ...prev, ...next }));
  }, [pathname]);

  const toggleSubmenu = (key) => {
    if (collapsed) setCollapsed(false);
    setTimeout(() => {
      setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
    }, collapsed ? 50 : 0);
  };

  const handleMenuClick = (item) => {
    const alreadyOnThisPage = pathname === item.path;
    setActive(item.key);

    if (item.children && alreadyOnThisPage) {
      toggleSubmenu(item.key);
      return;
    }

    if (item.children && item.path) {
      router.push(item.path);
      if (!openMenus[item.key]) setOpenMenus((prev) => ({ ...prev, [item.key]: true }));
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

  const isCollapsedMode = collapsed;

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#1A2332] via-[#0F1729] to-[#0A0F1A] flex flex-col overflow-hidden border-r border-white/5 relative">
      
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-2xl" />
      </div>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: "24px 24px" }} />
      </div>

      <div className="relative z-10 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent flex-shrink-0" />

      {/* Header Logo */}
      <div className="relative z-10 flex items-center justify-between px-4 h-20 border-b border-white/10 flex-shrink-0">
        <button onClick={() => setCollapsed(!collapsed)} className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`relative rounded-xl bg-gradient-to-br from-blue-500/30 to-indigo-500/20 border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-105 ${isCollapsedMode ? "w-12 h-12" : "w-10 h-10"}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent rounded-xl" />
            <Image src="/logo/logoSS.png" alt="Smart School Logo" width={isCollapsedMode ? 32 : 28} height={isCollapsedMode ? 32 : 28} className="object-contain brightness-0 invert" priority />
          </div>

          {!isCollapsedMode && (
            <div className="flex flex-col leading-tight text-left">
              <span className="font-bold text-white text-xl tracking-tight">Smart<span className="text-blue-300">School</span></span>
              <div className="flex items-center gap-1.5">
                <Crown size={10} className="text-yellow-400/80" />
                <span className="text-[10px] text-blue-200/70 font-medium tracking-wider uppercase">Admin Sekolah</span>
              </div>
            </div>
          )}
        </button>

        {!isCollapsedMode && (
          <button onClick={() => setCollapsed(true)} className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 border border-white/20 hover:border-white/40 text-white/70 hover:text-white" title="Ciutkan Sidebar">
            <PanelLeftClose size={18} />
          </button>
        )}
      </div>

      {/* Profil Mini */}
      {!isCollapsedMode && (
        <div className="relative z-10 mx-3 mt-4 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-colors duration-300 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white/30 flex items-center justify-center text-white text-sm font-bold">AD</div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#1A2332] ring-2 ring-emerald-400/50 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Admin Sekolah</p>
              <p className="text-[10px] text-blue-200/60 truncate">admin@sekolah.com</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigasi */}
      <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-4 space-y-0.5 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pb-6">
        {MENU_SECTIONS.map((item, index) => {
          if (item.type === "header") {
            if (isCollapsedMode) return null;
            return (
              <div key={`header-${index}`} className="px-2 pt-5 pb-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-[9px] font-semibold text-white/40 uppercase tracking-[0.2em]">{item.label}</span>
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
              <div
                onClick={() => handleMenuClick(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleMenuClick(item); } }}
                className={`relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ease-out cursor-pointer select-none ${isActive ? "text-white bg-white/20 border border-white/30" : "text-white/50 hover:text-white hover:bg-white/10"} ${isCollapsedMode ? "justify-center px-2" : ""} group`}
              >
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b from-blue-300 to-indigo-300" />}

                <div className={`relative flex items-center justify-center transition-all duration-200 ${isActive ? "text-white" : "text-white/40 group-hover:text-white/80"} ${isCollapsedMode ? "w-10 h-10" : ""}`}>
                  <item.icon size={20} className={`transition-all duration-200 ${isActive ? "scale-110" : ""} group-hover:scale-110`} />
                  {isActive && !isCollapsedMode && <div className="absolute inset-0 bg-blue-400/20 rounded-lg blur-xl -z-10" />}
                  {isActive && isCollapsedMode && <div className="absolute inset-0 bg-blue-400/30 rounded-lg blur-xl -z-10" />}
                </div>

                {!isCollapsedMode && <span className="flex-1 text-left text-xs tracking-wide">{item.label}</span>}

                {!isCollapsedMode && hasChildren && (
                  <button type="button" onClick={(e) => { e.stopPropagation(); toggleSubmenu(item.key); }} className="p-1 -m-1 rounded-md hover:bg-white/10 transition-colors duration-150" title={isOpen ? "Tutup submenu" : "Buka submenu"}>
                    <ChevronDown size={14} className={`text-white/40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                )}

                {!isCollapsedMode && !hasChildren && isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}

                {isCollapsedMode && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#1A2332] backdrop-blur-md text-white text-[10px] font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 ease-out translate-x-1 group-hover:translate-x-0 whitespace-nowrap pointer-events-none border border-white/20 z-[100]">
                    {item.label}
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#1A2332] rotate-45 border-l border-b border-white/20" />
                  </div>
                )}
              </div>

              {/* Submenu */}
              {hasChildren && !isCollapsedMode && (
                <div className={`overflow-hidden transition-all duration-200 ease-out ${isOpen ? "max-h-96 opacity-100 mt-0.5" : "max-h-0 opacity-0"}`}>
                  <div className="ml-4 pl-3 border-l border-white/10 space-y-0.5 py-1">
                    {item.children.map((child) => {
                      const isChildItemActive = active === child.key || pathname === child.path || pathname?.startsWith(child.path);
                      return (
                        <button key={child.key} onClick={() => handleSubItemClick(item.key, child)} className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${isChildItemActive ? "text-white bg-white/15 border border-white/20" : "text-white/45 hover:text-white hover:bg-white/10"}`}>
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

      <div className="relative z-10 h-8 w-full bg-gradient-to-t from-[#0A0F1A] to-transparent pointer-events-none flex-shrink-0" />
    </div>
  );
}