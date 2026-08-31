import {
  LayoutDashboard,
  Users,
  UserCheck,
  UserRoundCog,
  CalendarDays,
  BookOpen,
  BookMarked,
  CalendarClock,
  IdCard,
  GraduationCap,
  Boxes,
  Package,
  Warehouse,
  Settings,
  NotebookPen,
  Award,
  FileSpreadsheet,
  Smile,
  DoorOpen, // for Ruang
} from "lucide-react";

export const adminSidebarConfig = {
  basePath: "/admin",
  brandName: "Admin",
  initials: "AD",
  email: "admin@smartschool.com",

  menuSections: [
    // DASHBOARD
    {
      type: "item",
      key: "dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin/dashboard",
    },

    // DATA MASTER
    {
      type: "header",
      label: "DATA MASTER",
    },

    {
      type: "item",
      key: "guru",
      icon: Users,
      label: "Data Guru",
      path: "/admin/guru",
      children: [
        {
          key: "guruMapel",
          icon: BookMarked,
          label: "Mapel",
          path: "/admin/guru/mapel",
        },
        {
          key: "guruJadwalMengajar",
          icon: CalendarClock,
          label: "Jadwal Mengajar",
          path: "/admin/guru/jadwal-mengajar",
        },
        {
          key: "guruWaliKelas",
          icon: UserCheck,
          label: "Wali Kelas",
          path: "/admin/guru/wali-kelas",
        },
        {
          key: "guruKartuIdentitas",
          icon: IdCard,
          label: "Kartu Identitas Guru",
          path: "/admin/guru/kartu-identitas",
        },
      ],
    },

    {
      type: "item",
      key: "staf",
      icon: UserRoundCog,
      label: "Data Staf",
      path: "/admin/staf",
    },

    {
      type: "item",
      key: "siswa",
      icon: GraduationCap,
      label: "Data Siswa",
      path: "/admin/siswa",
      children: [
        {
          key: "siswaJadwalMapel",
          icon: CalendarClock,
          label: "Jadwal Mata Pelajaran",
          path: "/admin/siswa/jadwal-mapel",
        },
        {
          key: "siswaKartuIdentitas",
          icon: IdCard,
          label: "Kartu Identitas",
          path: "/admin/siswa/kartu-identitas",
        },
      ],
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

    // RUANG
    {
      type: "item",
      key: "ruang",
      icon: DoorOpen,
      label: "Ruangan",
      path: "/admin/ruangan",
    },

    // AKADEMIK
    {
      type: "header",
      label: "AKADEMIK",
    },

    {
      type: "item",
      key: "akademik",
      icon: BookOpen,
      label: "Akademik",
      path: "/admin/akademik",
      children: [
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
    {
      type: "header",
      label: "SARANA & PRASARANA",
    },

    {
      type: "item",
      key: "sarpras",
      icon: Boxes,
      label: "Sarpras",
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
    {
      type: "header",
      label: "SISTEM",
    },

    {
      type: "item",
      key: "settings",
      icon: Settings,
      label: "Pengaturan",
      path: "/admin/settings",
    },
  ],
};