import {
  LayoutDashboard,
  GraduationCap,
  ClipboardCheck,
  AlertTriangle,
  Award,
  IdCard,
  NotebookPen,
  HelpCircle,
  Layers,
  BookOpen,
  MessagesSquare,
  Video,
  File,
  ClipboardList,
  MessageSquare,
  Megaphone,
  User,
} from "lucide-react";

/**
 * Konfigurasi menu untuk role "guru".
 * Tinggal edit array `menuSections` di sini kalau mau nambah/kurang menu guru,
 * tanpa nyentuh SidebarView.jsx atau Sidebar.jsx sama sekali.
 */
export const guruSidebarConfig = {
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
};