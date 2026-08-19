import {
  LayoutDashboard,
  Users,
  UserCheck,      // for Guru & Mapel
  GraduationCap,
  CalendarDays,   // for Tahun Ajaran
  BookOpen,       // for Akademik
  ClipboardCheck, // for Absensi
  Settings,
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
      path: "/admin/dashboard",
    },

    // DATA MASTER
    { type: "header", label: "DATA MASTER" },
    {
      type: "item",
      key: "guru",
      icon: Users,
      label: "Guru",
      path: "/admin/guru",
    },
    {
      type: "item",
      key: "guruMapel",
      icon: UserCheck,
      label: "Guru & Mapel",
      path: "/admin/guru-mapel",
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
      key: "akademik",
      icon: BookOpen,
      label: "Akademik",
      path: "/admin/akademik",
    },
    {
      type: "item",
      key: "absensi",
      icon: ClipboardCheck,
      label: "Absensi",
      path: "/admin/absensi",
    },

    // SISTEM
    { type: "header", label: "SISTEM" },
    {
      type: "item",
      key: "settings",
      icon: Settings,
      label: "Pengaturan",
      path: "/admin/settings",
    },
  ],
};