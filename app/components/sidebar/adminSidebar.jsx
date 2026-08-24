import {
  LayoutDashboard,
  Users,
  UserCheck,      // for Guru & Mapel
   UserRoundCog,
  CalendarDays,   // for Tahun Ajaran
  BookOpen,       // for Akademik
  UploadCloud,
  GraduationCap,    // for Impor Siswa
  Boxes,          // for Sarpras
  Package,        // for Aset
  Warehouse,      // for Gudang
  Settings,
  ClipboardList,  // for Monitoring Siswa
  NotebookPen,    // for Nilai
  Award,          // for Prestasi
  FileSpreadsheet,// for Rapor
  Smile,          // for Sikap & Perilaku
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
      label: "Data Guru",
      path: "/admin/guru",
    },
    {
      type: "item",
      key: "staf",
      icon:  UserRoundCog,
      label: "Data Staf",
      path: "/admin/staf",
    },
    {
      type: "item",
      key: "siswa",
      icon: GraduationCap,
      label: "Data Siswa",
      path: "/admin/siswa",
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
    {
      type: "item",
      key: "imporSiswa",
      icon: UploadCloud,
      label: "Impor Siswa",
      path: "/admin/impor-siswa",
    },

    // AKADEMIK
    { type: "header", label: "AKADEMIK" },
    {
      type: "item",
      key: "akademik",
      icon: BookOpen,
      label: "Akademik",
      // Punya path sendiri -> klik pertama langsung membuka halaman ringkasan
      // Akademik. Klik lagi saat sudah di halaman ini akan toggle submenu
      // (Sidebar.jsx sudah menangani ini otomatis lewat handleMenuClick).
      path: "/admin/akademik",
      // Children ini disesuaikan PERSIS dengan folder yang ada di
      // app/admin/akademik/*: monitoringSiswa, nilai, prestasi, rapor,
      // sikapPerilaku. Kalau nanti ada folder baru, tambahin entri baru
      // di sini dengan bentuk yang sama.
      children: [
        {
          key: "akademikMonitoringSiswa",
          icon: ClipboardList,
          label: "Monitoring Siswa",
          path: "/admin/akademik/monitoringSiswa",
        },
        {
          key: "akademikNilai",
          icon: NotebookPen,
          label: "Nilai",
          path: "/admin/akademik/nilai",
        },
        {
          key: "akademikPrestasi",
          icon: Award,
          label: "Prestasi",
          path: "/admin/akademik/prestasi",
        },
        {
          key: "akademikRapor",
          icon: FileSpreadsheet,
          label: "Rapor",
          path: "/admin/akademik/rapor",
        },
        {
          key: "akademikSikapPerilaku",
          icon: Smile,
          label: "Sikap & Perilaku",
          path: "/admin/akademik/sikapPerilaku",
        },
      ],
    },

    // SARANA & PRASARANA
    { type: "header", label: "SARANA & PRASARANA" },
    {
      type: "item",
      key: "sarpras",
      icon: Boxes,
      label: "Sarpras",
      // Punya path sendiri -> klik pertama langsung membuka halaman ringkasan
      // Sarpras. Klik lagi saat sudah di halaman ini akan toggle submenu
      // (Sidebar.jsx sudah menangani ini otomatis lewat handleMenuClick).
      path: "/admin/sarpras",
      children: [
        {
          key: "sarprasAset",
          icon: Package,
          label: "Aset",
          path: "/admin/sarpras/aset",
        },
        {
          key: "sarprasGudang",
          icon: Warehouse,
          label: "Gudang",
          path: "/admin/sarpras/gudang",
        },
      ],
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