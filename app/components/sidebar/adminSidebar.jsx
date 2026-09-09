import {
  LayoutDashboard,
  Users,
  UserCheck,
  UserRoundCog,
  CalendarDays,
  BookOpen,
  BookMarked,
  ListChecks,
  CalendarClock,
  IdCard,
  Library,
  BookOpenCheck,
  BookUp,
  BookDown,
  MonitorPlay,
  ClipboardList,
  Server,
  FileText,
  GraduationCap,
  FileCheck2,
  History,
  Trophy,
  ClipboardCheck,
  Building2,
  Layers,
  Settings,
  FileBarChart,
  CreditCard,
  Receipt,
  MessageSquare,
  AlertTriangle,
  Target,
  UserPlus,
  Wallet,
  ScrollText,
  Database,
} from "lucide-react";

export const adminSidebarConfig = {
  basePath: "/admin",
  brandName: "SmartSchool",
  initials: "SS",
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
    // PENGGUNA
    // ==========================================================
    {
      type: "header",
      label: "Manajemen Pengguna",
    },

    {
      type: "item",
      key: "pengguna",
      icon: Users,
      label: "Pengguna",
      path: "/admin/pengguna",
      children: [
        {
          key: "guru",
          icon: UserCheck,
          label: "Data Guru",
          path: "/admin/guru",
        },
        {
          key: "siswa",
          icon: Users,
          label: "Data Siswa",
          path: "/admin/siswa",
        },
        {
          key: "faceId",
          icon: IdCard,
          label: "Face ID",
          path: "/admin/pengguna/face-id",
        },
      ],
    },

    // ==========================================================
    // DATA SEKOLAH
    // ==========================================================
    {
      type: "header",
      label: "Data Sekolah",
    },

    {
      type: "item",
      key: "kelas",
      icon: Users,
      label: "Kelas",
      path: "/admin/kelas",
    },

    {
      type: "item",
      key: "jurusan",
      icon: Layers,
      label: "Jurusan",
      path: "/admin/jurusan",
    },

    {
      type: "item",
      key: "tahunAjaran",
      icon: CalendarDays,
      label: "Tahun Ajaran",
      path: "/admin/tahun-ajaran",
      children: [
        {
          key: "tambahTahunAjaran",
          icon: FileText,
          label: "Tambah Tahun Ajaran",
          path: "/admin/tahun-ajaran/tambah",
        },
        {
          key: "editTahunAjaran",
          icon: FileText,
          label: "Edit Tahun Ajaran",
          path: "/admin/tahun-ajaran/edit",
        },
      ],
    },

    // ==========================================================
    // AKADEMIK
    // ==========================================================
    {
      type: "header",
      label: "Akademik",
    },

    {
      type: "item",
      key: "mataPelajaran",
      icon: BookOpen,
      label: "Mata Pelajaran",
      path: "/admin/mata-pelajaran",
      children: [
        {
          key: "jadwalMapelSiswa",
          icon: CalendarClock,
          label: "Jadwal Mapel Siswa",
          path: "/admin/siswa/jadwal-mapel",
        },
        {
          key: "tambahMataPelajaran",
          icon: BookMarked,
          label: "Tambah Mata Pelajaran",
          path: "/admin/m/tambah",
        },
        {
          key: "editMataPelajaran",
          icon: BookOpen,
          label: "Edit Mata Pelajaran",
          path: "/admin/mata-pelajaran/edit",
        },
      ],
    },

    {
      type: "item",
      key: "jadwalPelajaran",
      icon: CalendarClock,
      label: "Jadwal Pelajaran",
      path: "/admin/guru/jadwal-mengajar",
      children: [
        {
          key: "jadwalSiswa",
          icon: CalendarDays,
          label: "Jadwal Siswa",
          path: "/admin/siswa/jadwal-mapel",
        },
        {
          key: "jadwalMengajar",
          icon: CalendarClock,
          label: "Jadwal Mengajar",
          path: "/admin/guru/jadwal-mengajar",
        },
        {
          key: "tambahJadwalMengajar",
          icon: CalendarClock,
          label: "Tambah Jadwal",
          path: "/admin/guru/jadwal-mengajar/tambah",
        },
      ],
    },

    {
      type: "item",
      key: "akademik",
      icon: GraduationCap,
      label: "Akademik",
      path: "/admin/akademik",
      children: [
        {
          key: "prestasi",
          icon: Trophy,
          label: "Prestasi",
          path: "/admin/akademik/prestasi",
        },
        {
          key: "rapor",
          icon: FileBarChart,
          label: "Rapor",
          path: "/admin/akademik/rapor",
        },
        {
          key: "nilai",
          icon: ListChecks,
          label: "Nilai",
          path: "/admin/akademik/nilai",
        },
      ],
    },

    // ==========================================================
    // E-RAPORT
    // ==========================================================
    {
      type: "header",
      label: "e-Raport",
    },

    {
      type: "item",
      key: "eraport",
      icon: FileBarChart,
      label: "e-Raport",
      path: "/admin/eraport/entry-nilai",
      children: [
        {
          key: "entryNilai",
          icon: ListChecks,
          label: "Entry Nilai",
          path: "/admin/eraport/entry-nilai",
        },
        {
          key: "cetakRaport",
          icon: FileText,
          label: "Cetak Raport",
          path: "/admin/eraport/cetak-raport",
        },
        {
          key: "pengaturanAgregat",
          icon: Settings,
          label: "Pengaturan Agregat",
          path: "/admin/eraport/pengaturan-agregat",
        },
      ],
    },

    // ==========================================================
    // PRESENSI
    // ==========================================================
    {
      type: "header",
      label: "Presensi",
    },

    {
      type: "item",
      key: "presensi",
      icon: ClipboardCheck,
      label: "Presensi",
      path: "/admin/siswa/absen",
      children: [
        {
          key: "absenSiswa",
          icon: ClipboardCheck,
          label: "Absensi Siswa",
          path: "/admin/siswa/absen",
        },
        {
          key: "izinSiswa",
          icon: FileText,
          label: "Izin Siswa",
          path: "/admin/presensi/izin-siswa",
        },
        {
          key: "rekapGuru",
          icon: FileBarChart,
          label: "Rekap Guru",
          path: "/admin/presensi/rekap-guru",
        },
        {
          key: "izinGuru",
          icon: FileText,
          label: "Izin Guru",
          path: "/admin/presensi/izin-guru",
        },
        {
          key: "pengaturanPresensi",
          icon: Settings,
          label: "Pengaturan Presensi",
          path: "/admin/presensi/pengaturan",
        },
      ],
    },

    // ==========================================================
    // LMS & CBT
    // ==========================================================
    {
  type: "header",
  label: "LMS & CBT",
},

{
  type: "item",
  key: "modulLmsClass",
  icon: MonitorPlay,
  label: "Modul LMS & Class",
  path: "/admin/lms-cbt/modul-class",
},

{
  type: "item",
  key: "materiModulAjar",
  icon: BookOpenCheck,
  label: "Materi dan Modul Ajar",
  path: "/admin/lms-cbt/materi-modul-ajar",
},

{
  type: "item",
  key: "tugasSiswa",
  icon: ClipboardList,
  label: "Tugas Siswa",
  path: "/admin/lms-cbt/tugas-siswa",
},

{
  type: "item",
  key: "ujianCbtOnline",
  icon: FileCheck2,
  label: "Ujian CBT Online",
  path: "/admin/lms-cbt/ujian",
},

{
  type: "item",
  key: "kapasitasServerCbt",
  icon: Server,
  label: "Kapasitas & Server CBT",
  path: "/admin/lms-cbt/server",
},

    // ==========================================================
    // PERPUSTAKAAN
    // ==========================================================
    {
      type: "header",
      label: "Perpustakaan",
    },

    {
      type: "item",
      key: "perpustakaan",
      icon: Library,
      label: "Perpustakaan Digital",
      path: "/admin/perpustakaan",
      children: [
        {
          key: "bukuDigital",
          icon: BookOpen,
          label: "Buku Digital",
          path: "/admin/perpustakaan/buku-digital",
        },
        {
          key: "dataBukuPerpustakaan",
          icon: Library,
          label: "Data Buku Perpustakaan",
          path: "/admin/perpustakaan/data-buku",
        },
        {
          key: "pinjam",
          icon: BookUp,
          label: "Pinjam",
          path: "/admin/perpustakaan/pinjam",
        },
        {
          key: "pengembalian",
          icon: BookDown,
          label: "Pengembalian",
          path: "/admin/perpustakaan/pengembalian",
        },
      ],
    },

    // ==========================================================
    // SARANA & PRASARANA
    // ==========================================================
    {
      type: "header",
      label: "Sarana & Prasarana",
    },

    {
      type: "item",
      key: "sarpras",
      icon: Building2,
      label: "Sarana & Prasarana",
      path: "/admin/sarpras",
      children: [
        {
          key: "gedung",
          icon: Building2,
          label: "Gedung",
          path: "/admin/sarpras/gedung",
        },
        {
          key: "lantai",
          icon: Layers,
          label: "Lantai",
          path: "/admin/sarpras/gedung/lantai",
        },
      ],
    },

    // ==========================================================
    // CMS
    // ==========================================================
    {
      type: "header",
      label: "CMS",
    },

    {
      type: "item",
      key: "cms",
      icon: FileText,
      label: "CMS",
      path: "/cmsAdmin",
      children: [
        {
          key: "articles",
          icon: FileText,
          label: "Articles",
          path: "/cmsAdmin/articles",
        },
        {
          key: "categories",
          icon: Layers,
          label: "Categories",
          path: "/cmsAdmin/categories",
        },
        {
          key: "pages",
          icon: FileText,
          label: "Pages",
          path: "/cmsAdmin/pages",
        },
        {
          key: "media",
          icon: Library,
          label: "Media",
          path: "/cmsAdmin/media",
        },
        {
          key: "banner",
          icon: FileText,
          label: "Banner",
          path: "/cmsAdmin/banner",
        },
        {
          key: "menu",
          icon: ListChecks,
          label: "Menu",
          path: "/cmsAdmin/menu",
        },
        {
          key: "pengumuman",
          icon: MessageSquare,
          label: "Pengumuman",
          path: "/cmsAdmin/pengumuman",
        },
        {
          key: "galeri",
          icon: Library,
          label: "Galeri",
          path: "/cmsAdmin/galeri",
        },
        {
          key: "settings",
          icon: Settings,
          label: "Settings",
          path: "/cmsAdmin/settings",
        },
      ],
    },

    // ==========================================================
    // SISTEM
    // ==========================================================
    {
      type: "header",
      label: "Sistem",
    },

    {
      type: "item",
      key: "kelolaUser",
      icon: UserRoundCog,
      label: "Kelola User",
      path: "/admin/kelola-user",
    },

    {
      type: "item",
      key: "auditLog",
      icon: History,
      label: "Audit Log",
      path: "/admin/audit-log",
    },

    {
      type: "item",
      key: "database",
      icon: Database,
      label: "Database",
      path: "/admin/database",
    },

    // ==========================================================
    // LANGGANAN
    // ==========================================================
    {
      type: "header",
      label: "Langganan",
    },

    {
      type: "item",
      key: "langganan",
      icon: CreditCard,
      label: "Langganan",
      path: "/admin/langganan/paket",
      children: [
        {
          key: "paket",
          icon: CreditCard,
          label: "Paket",
          path: "/admin/langganan/paket",
        },
        {
          key: "riwayatPembayaran",
          icon: History,
          label: "Riwayat Pembayaran",
          path: "/admin/langganan/riwayat-pembayaran",
        },
        {
          key: "invoice",
          icon: Receipt,
          label: "Invoice",
          path: "/admin/langganan/invoice",
        },
      ],
    },

    // ==========================================================
    // BIMBINGAN KONSELING
    // ==========================================================
    {
      type: "header",
      label: "Bimbingan Konseling",
    },

    {
      type: "item",
      key: "bk",
      icon: MessageSquare,
      label: "Bimbingan Konseling",
      path: "/admin/bk/sesi-konseling",
      children: [
        {
          key: "sesiKonseling",
          icon: MessageSquare,
          label: "Sesi Konseling",
          path: "/admin/bk/sesi-konseling",
        },
        {
          key: "pelanggaran",
          icon: AlertTriangle,
          label: "Pelanggaran",
          path: "/admin/bk/pelanggaran",
        },
        {
          key: "kategoriPoint",
          icon: ListChecks,
          label: "Kategori Point",
          path: "/admin/bk/kategori-point",
        },
        {
          key: "asesmentMinatBakat",
          icon: Target,
          label: "Asesment Minat & Bakat",
          path: "/admin/bk/asesment-minat-bakat",
        },
      ],
    },

    // ==========================================================
    // SPMB
    // ==========================================================
    {
      type: "header",
      label: "SPMB",
    },

    {
      type: "item",
      key: "spmb",
      icon: UserPlus,
      label: "SPMB",
      path: "/admin/spmb/data-pendaftaran",
      children: [
        {
          key: "dataPendaftaran",
          icon: Users,
          label: "Data Pendaftaran",
          path: "/admin/spmb/data-pendaftaran",
        },
        {
          key: "gelombang",
          icon: CalendarDays,
          label: "Gelombang",
          path: "/admin/spmb/gelombang",
        },
        {
          key: "pengaturanSpmb",
          icon: Settings,
          label: "Pengaturan",
          path: "/admin/spmb/pengaturan",
        },
      ],
    },

    // ==========================================================
    // KEUANGAN
    // ==========================================================
    {
      type: "header",
      label: "Keuangan",
    },

    {
      type: "item",
      key: "keuangan",
      icon: Wallet,
      label: "Keuangan",
      path: "/admin/keuangan/laporan",
      children: [
        {
          key: "laporanKeuangan",
          icon: FileBarChart,
          label: "Laporan",
          path: "/admin/keuangan/laporan",
        },
        {
          key: "tabunganSiswa",
          icon: Wallet,
          label: "Tabungan Siswa",
          path: "/admin/keuangan/tabunganSiswa",
        },
        {
          key: "spp",
          icon: CreditCard,
          label: "SPP",
          path: "/admin/keuangan/SPP",
        },
        {
          key: "jurnalKas",
          icon: ScrollText,
          label: "Jurnal Kas",
          path: "/admin/keuangan/jurnalKas",
        },
        {
          key: "settingTarif",
          icon: Settings,
          label: "Setting Tarif",
          path: "/admin/keuangan/setting-tarif",
        },
        {
          key: "tunggakan",
          icon: AlertTriangle,
          label: "Tunggakan",
          path: "/admin/keuangan/tunggakan",
        },
      ],
    },
  ],
};