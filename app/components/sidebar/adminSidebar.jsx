import {
  LayoutDashboard,
  Users,
  UserCheck,
  UserRoundCog,
  UserPlus,
  UserRound,
  GraduationCap,
  CalendarDays,
  CalendarClock,
  BookOpen,
  BookMarked,
  UserCog,
  IdCard,
  Boxes,
  Package,
  Warehouse,
  Settings,
  NotebookPen,
  School,
  Award,
  FileSpreadsheet,
  Smile,
  DoorOpen,
  Building2,
  Layers,
  CreditCard,
  History,
  Receipt,
} from "lucide-react";

export const adminSidebarConfig = {
  basePath: "/admin",
  brandName: "Admin Sekolah",
  initials: "AS",
  email: "admin@smartschool.com",

  menuSections: [
    // ==========================================================
    // DASHBOARD
    // ==========================================================
    {
      type: "item",
      key: "dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin/dashboard",
    },

    // ==========================================================
    // DATA MASTER
    // ==========================================================
    {
      type: "header",
      label: "DATA MASTER",
    },

    // ==========================================================
    // PENGGUNA
    // ==========================================================
    {
      type: "item",
      key: "pengguna",
      icon: Users,
      label: "Pengguna",
      path: "/admin/pengguna",

      children: [
        {
          key: "listPengguna",
          icon: Users,
          label: "List Pengguna",
          path: "/admin/pengguna",
        },

        {
          key: "dataGuru",
          icon: UserCheck,
          label: "Data Guru",
          path: "/admin/guru",
        },

        {
          key: "dataSiswa",
          icon: GraduationCap,
          label: "Data Siswa",
          path: "/admin/siswa",
        },

        {
          key: "dataStaff",
          icon: UserRoundCog,
          label: "Data Staff",
          path: "/admin/staf",
        },
      ],
    },

    // ==========================================================
    // KELAS
    // ==========================================================
    {
      type: "item",
      key: "kelas",
      icon: GraduationCap,
      label: "Kelas",
      path: "/admin/kelas",

      children: [
        {
          key: "listKelas",
          icon: GraduationCap,
          label: "List Kelas",
          path: "/admin/kelas",
        },

        {
          key: "tambahKelas",
          icon: UserPlus,
          label: "Tambah Kelas",
          path: "/admin/kelas/tambah",
        },


        {
          key: "editKelas",
          icon: UserCog,
          label: "Edit Kelas",
          path: "/admin/kelas/edit",
        },
      ],
    },

    // ==========================================================
    // TAHUN AJARAN
    // ==========================================================
    {
      type: "item",
      key: "tahunAjaran",
      icon: CalendarDays,
      label: "Tahun Ajaran",
      path: "/admin/tahun-ajaran",

      children: [
        {
          key: "listTahunAjaran",
          icon: CalendarDays,
          label: "List Tahun Ajaran",
          path: "/admin/tahun-ajaran",
        },

        {
          key: "tambahTahunAjaran",
          icon: UserPlus,
          label: "Tambah Tahun Ajaran",
          path: "/admin/tahun-ajaran/tambah",
        },

        {
          key: "profileTahunAjaran",
          icon: CalendarDays,
          label: "Profile Tahun Ajaran",
          path: "/admin/tahun-ajaran",
        },

        {
          key: "editTahunAjaran",
          icon: UserCog,
          label: "Edit Tahun Ajaran",
          path: "/admin/tahun-ajaran/edit",
        },
      ],
    },


    // ==========================================================
    // MATA PELAJARAN
    // ==========================================================
    {
      type: "item",
      key: "mataPelajaran",
      icon: BookOpen,
      label: "Mata Pelajaran",
      path: "/admin/siswa/jadwal-mapel",

      children: [
        {
          key: "listMataPelajaran",
          icon: BookMarked,
          label: "List Mata Pelajaran",
          path: "/admin/mata-pelajaran",
        },

        {
          key: "tambahMataPelajaran",
          icon: UserPlus,
          label: "Tambah Mata Pelajaran",
          path: "/admin/mata-pelajaran/tambah",
        },

        {
          key: "editMataPelajaran",
          icon: UserCog,
          label: "Edit Mata Pelajaran",
          path: "/admin/mata-pelajaran/edit",
        },
      ],
    },


    // ==========================================================
    // AKADEMIK
    // ==========================================================
    {
      type: "header",
      label: "AKADEMIK",
    },

    // Dashboard Akademik
    {
      type: "item",
      key: "akademik",
      icon: LayoutDashboard,
      label: "Dashboard Akademik",
      path: "/admin/akademik",
    },

    // Manajemen Jadwal Pelajaran
    {
      type: "item",
      key: "jadwalPelajaran",
      icon: CalendarClock,
      label: "Manajemen Jadwal Pelajaran",
      path: "/admin/guru/jadwal-mengajar",

      children: [
        {
          key: "listJadwalPelajaran",
          icon: CalendarDays,
          label: "List Jadwal Pelajaran",
          path: "/admin/akademik/jadwal",
        },

        {
          key: "assignJadwalMengajar",
          icon: UserCheck,
          label: "Assign Jadwal Mengajar",
          path: "/admin/guru/jadwal-mengajar/tambah",
        },
      ],
    },

    // Manajemen Absensi
    {
      type: "item",
      key: "absensi",
      icon: CalendarDays,
      label: "Manajemen Absensi",
      path: "/admin/siswa/absen",
    },

    // Prestasi
    {
      type: "item",
      key: "prestasi",
      icon: Award,
      label: "Prestasi",
      path: "/admin/akademik/prestasi",
    },

    // Raport
    {
      type: "item",
      key: "raport",
      icon: FileSpreadsheet,
      label: "Raport",
      path: "/admin/akademik/rapor",
    },

    // Nilai
    {
      type: "item",
      key: "nilai",
      icon: NotebookPen,
      label: "Nilai",
      path: "/admin/akademik/nilai",
    },

    // ==========================================================
    // SARANA & PRASARANA
    // ==========================================================
    {
      type: "header",
      label: "SARANA & PRASARANA",
    },

    // Sarpras
    {
      type: "item",
      key: "sarpras",
      icon: Boxes,
      label: "Sarpras",
      path: "/admin/sarpras",
    },

    // Aset
    {
      type: "item",
      key: "aset",
      icon: Package,
      label: "Aset",
      path: "/admin/sarpras/aset",
    },

    // Gudang
    {
      type: "item",
      key: "gudang",
      icon: Warehouse,
      label: "Gudang",
      path: "/admin/sarpras/gudang",
    },

    // Gedung
    {
      type: "item",
      key: "gedung",
      icon: School,
      label: "Gedung",
      path: "/admin/sarpras/gedung",

      children: [
        {
          key: "lantai",
          icon: Layers,
          label: "Lantai",
          path: "/admin/sarpras/gedung/lantai",
        },
      ],
    },

    // ==========================================================
    // SISTEM
    // ==========================================================
    {
      type: "header",
      label: "SISTEM",
    },

    // Kelola User
    {
      type: "item",
      key: "kelolaUser",
      icon: UserCog,
      label: "Kelola User",
      path: "/admin/kelola-user",
    },

    // Pengaturan Umum
    {
      type: "item",
      key: "pengaturan",
      icon: Settings,
      label: "Pengaturan Umum",
      path: "/admin/settings",
    },

    // ==========================================================
    // LANGGANAN
    // ==========================================================
    {
      type: "header",
      label: "LANGGANAN",
    },

    // Paket Langganan
    {
      type: "item",
      key: "paketLangganan",
      icon: CreditCard,
      label: "Paket Langganan",
      path: "/admin/langganan/paket",
    },

    // Riwayat Pembayaran
    {
      type: "item",
      key: "riwayatPembayaran",
      icon: History,
      label: "Riwayat Pembayaran",
      path: "/admin/langganan/riwayat-pembayaran",
    },

    // Tagihan / Invoice
    {
      type: "item",
      key: "invoice",
      icon: Receipt,
      label: "Tagihan / Invoice",
      path: "/admin/langganan/invoice",
    },
  ],
};