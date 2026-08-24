import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  FileText,
  BookOpen,
  ClipboardList,
  HelpCircle,
  ClipboardCheck,
  NotebookPen,
  FileCheck2,
  Package,
  History,
  Settings,
  CalendarDays,
} from "lucide-react";

/**
 * Konfigurasi menu untuk role "guru".
 * Tinggal edit array `menuSections` di sini kalau mau nambah/kurang menu guru,
 * tanpa nyentuh SidebarView.jsx atau Sidebar.jsx sama sekali.
 */
export const guruSidebarConfig = {
  basePath: "/guru",
  brandName: "Portal Guru",
  initials: "AS",
  email: "guru@smartschool.com",
  menuSections: [
    { type: "item", key: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/guru" },

    { type: "header", label: "MENGAJAR" },
    {
      type: "item",
      key: "jadwal",
      icon: Calendar,
      label: "Jadwal",
      path: "/guru/jadwal",
      children: [
        { key: "kalender", icon: CalendarDays, label: "kalender", path: "/guru/jadwal/kalender" },
        { key: "presensi", icon: CheckSquare, label: "Presensi", path: "/guru/jadwal/presensi" },
        { key: "izin", icon: FileText, label: "Izin", path: "/guru/jadwal/izin" },
      ],
    },

    { type: "header", label: "PROSES BELAJAR" },
    { type: "item", key: "materi", icon: BookOpen, label: "Materi", path: "/guru/materi" },
    { type: "item", key: "tugas", icon: ClipboardList, label: "Tugas", path: "/guru/tugas" },
    { type: "item", key: "quiz", icon: HelpCircle, label: "Quiz", path: "/guru/quiz" },

    { type: "header", label: "AKADEMIK" },
    { type: "item", key: "absensi", icon: ClipboardCheck, label: "Absensi", path: "/guru/absensi" },
    { type: "item", key: "histori-absensi", icon: History, label: "Histori Absensi", path: "/guru/histori-absensi" },
    {
      type: "item",
      key: "nilai",
      icon: NotebookPen,
      label: "Nilai",
      path: "/guru/nilai",
      children: [
        { key: "nilaiTugas", icon: ClipboardList, label: "Nilai Tugas", path: "/guru/nilai/nilaiTugas" },
        { key: "nilaiQuiz", icon: HelpCircle, label: "Nilai Quiz", path: "/guru/nilai/nilaiQuiz" },
        { key: "rapor", icon: FileCheck2, label: "Rapor", path: "/guru/nilai/rapor" },
      ],
    },

    { type: "header", label: "SARANA PRASARANA" },
    {
      type: "item",
      key: "sarpras",
      icon: Package,
      label: "Sarpras",
      path: "/guru/sarpras",
      children: [
        { key: "pinjam", icon: Package, label: "Pinjam", path: "/guru/sarpras/pinjam" },
        { key: "peminjaman", icon: ClipboardList, label: "Peminjaman", path: "/guru/sarpras/peminjaman" },
        { key: "riwayat", icon: FileText, label: "Riwayat", path: "/guru/sarpras/riwayat" },
      ],
    },

    { type: "header", label: "AKUN" },
    { type: "item", key: "pengaturan", icon: Settings, label: "Pengaturan", path: "/guru/pengaturan" },
  ],
};