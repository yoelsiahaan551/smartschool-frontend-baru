import {
  LayoutDashboard,
  School,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  BarChart3,
  Settings,
  Bell,
  User,
  LogOut,
  CalendarDays, // for Tahun Ajaran
  UserCheck,    // for Guru & Mapel
} from "lucide-react";

export const adminSidebarConfig = {
  basePath: "/admin",
  brandName: "Admin",
  initials: "AD",
  email: "admin@smartschool.com",
  menuSections: [
    // Dashboard
    {
      type: "item",
      key: "dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin",
    },

    // DATA MASTER
    { type: "header", label: "DATA MASTER" },
    {
      type: "item",
      key: "sekolah",
      icon: School,
      label: "Sekolah",
      path: "/admin/sekolah",
    },
    {
      type: "item",
      key: "guru",
      icon: Users,
      label: "Guru & Mapel",
      path: "/admin/guru",
    },
   
    {
      type: "item",
      key: "siswa",
      icon: Users,
      label: "Siswa",
      path: "/admin/siswa",
    },
    {
      type: "item",
      key: "kelas",
      icon: GraduationCap,
      label: "Kelas",
      path: "/admin/kelas",
    },
    {
      type: "item",
      key: "tahunAjaran",
      icon: CalendarDays,
      label: "Tahun Ajaran",
      path: "/admin/tahun-ajaran",
    },

    // AKADEMIK
    { type: "header", label: "AKADEMIK" },
    {
      type: "item",
      key: "jadwal",
      icon: Calendar,
      label: "Jadwal Pelajaran",
      path: "/admin/jadwal",
    },
    {
      type: "item",
      key: "absensi",
      icon: ClipboardCheck,
      label: "Absensi",
      path: "/admin/absensi",
    },
    {
      type: "item",
      key: "rapor",
      icon: FileText,
      label: "Rapor",
      path: "/admin/rapor",
    },

    // LAPORAN
    { type: "header", label: "LAPORAN" },
    {
      type: "item",
      key: "laporan",
      icon: BarChart3,
      label: "Laporan & Statistik",
      path: "/admin/laporan",
    },

    // SISTEM
    { type: "header", label: "SISTEM" },
    {
      type: "item",
      key: "pengaturan",
      icon: Settings,
      label: "Pengaturan",
      path: "/admin/pengaturan",
    },
    {
      type: "item",
      key: "notifikasi",
      icon: Bell,
      label: "Notifikasi",
      path: "/admin/notifikasi",
    },
  ],
};