import {
  LayoutDashboard,
  Users,
  UserCheck,
  UserRoundCog,
  UserPlus,
  ScanFace,
  GraduationCap,
  Split,
  CalendarDays,
  CalendarClock,
  CalendarCheck,
  BookOpen,
  BookMarked,
  BookUp,
  BookDown,
  Library,
  UserCog,
  Boxes,
  School,
  Layers,
  Settings,
  Settings2,
  NotebookPen,
  PenLine,
  Printer,
  Award,
  FileSpreadsheet,
  CreditCard,
  History,
  Receipt,
  MonitorPlay,
  FileText,
  ClipboardList,
  ClipboardCheck,
  FileCheck2,
  FileSignature,
  Server,
  HeartHandshake,
  AlertTriangle,
  Tags,
  Brain,
  FileInput,
  Wallet,
  PiggyBank,
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

    // Pengguna
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
          label: "Data Guru & Pegawai",
          path: "/admin/guru",
        },
        {
          key: "dataSiswa",
          icon: GraduationCap,
          label: "Data Siswa",
          path: "/admin/siswa",
        },
        {
          key: "faceId",
          icon: ScanFace,
          label: "Face ID",
          path: "/admin/pengguna/face-id",
        },
      ],
    },

    // Kelas
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
      ],
    },

    // Jurusan
    {
      type: "item",
      key: "jurusan",
      icon: Split,
      label: "Jurusan",
      path: "/admin/jurusan",

      children: [
        {
          key: "listJurusan",
          icon: Split,
          label: "List Jurusan",
          path: "/admin/jurusan",
        },
      ],
    },

    // Tahun Ajaran
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

    // Jadwal Pelajaran
    {
      type: "item",
      key: "jadwalPelajaran",
      icon: CalendarClock,
      label: "Jadwal Pelajaran",
      path: "/admin/akademik/jadwal",

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

    // Mata Pelajaran
    {
      type: "item",
      key: "mataPelajaran",
      icon: BookOpen,
      label: "Mata Pelajaran",
      path: "/admin/mata-pelajaran",

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

    // Perpustakaan Digital
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
      path: "/admin/lms/modul-class",
    },
    {
      type: "item",
      key: "materiModulAjar",
      icon: FileText,
      label: "Materi dan Modul Ajar",
      path: "/admin/lms/materi-modul-ajar",
    },
    {
      type: "item",
      key: "tugasSiswa",
      icon: ClipboardList,
      label: "Tugas Siswa",
      path: "/admin/lms/tugas-siswa",
    },
    {
      type: "item",
      key: "ujianCbtOnline",
      icon: FileCheck2,
      label: "Ujian CBT Online",
      path: "/admin/cbt/ujian",
    },
    {
      type: "item",
      key: "kapasitasServerCbt",
      icon: Server,
      label: "Kapasitas & Server CBT",
      path: "/admin/cbt/server",
    },

    // ==========================================================
    // E-RAPORT DIGITAL
    // ==========================================================
    {
      type: "header",
      label: "E-RAPORT DIGITAL",
    },
    {
      type: "item",
      key: "entryNilaiSiswa",
      icon: PenLine,
      label: "Entry Nilai Siswa",
      path: "/admin/eraport/entry-nilai",
    },
    {
      type: "item",
      key: "cetakRaportSiswa",
      icon: Printer,
      label: "Cetak Raport Siswa",
      path: "/admin/eraport/cetak-raport",
    },
    {
      type: "item",
      key: "pengaturanAgregatNilai",
      icon: Settings2,
      label: "Pengaturan Agregat Nilai (A-B-C-D)",
      path: "/admin/eraport/pengaturan-agregat",
    },

    // ==========================================================
    // PRESENSI & KEHADIRAN
    // ==========================================================
    {
      type: "header",
      label: "PRESENSI & KEHADIRAN",
    },
    {
      type: "item",
      key: "rekapPresensiSiswa",
      icon: ClipboardCheck,
      label: "Rekap Presensi Siswa",
      path: "/admin/siswa/absen",
    },
    {
      type: "item",
      key: "permohonanIzinSiswa",
      icon: FileText,
      label: "Permohonan Izin Siswa",
      path: "/admin/presensi/izin-siswa",
    },
    {
      type: "item",
      key: "rekapPresensiGuru",
      icon: CalendarCheck,
      label: "Rekap Presensi Guru",
      path: "/admin/presensi/rekap-guru",
    },
    {
      type: "item",
      key: "permohonanIzinGuru",
      icon: FileSignature,
      label: "Permohonan Izin Guru",
      path: "/admin/presensi/izin-guru",
    },
    {
      type: "item",
      key: "pengaturanPresensi",
      icon: Settings,
      label: "Pengaturan Presensi",
      path: "/admin/presensi/pengaturan",
    },

    // ==========================================================
    // AKADEMIK
    // ==========================================================
    {
      type: "header",
      label: "AKADEMIK",
    },
    {
      type: "item",
      key: "akademik",
      icon: LayoutDashboard,
      label: "Dashboard Akademik",
      path: "/admin/akademik",
    },
    {
      type: "item",
      key: "prestasi",
      icon: Award,
      label: "Prestasi",
      path: "/admin/akademik/prestasi",
    },
    {
      type: "item",
      key: "raport",
      icon: FileSpreadsheet,
      label: "Raport",
      path: "/admin/akademik/rapor",
    },
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
    {
      type: "item",
      key: "sarpras",
      icon: Boxes,
      label: "Sarpras",
      path: "/admin/sarpras",
    },
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
    {
      type: "item",
      key: "kelolaUser",
      icon: UserCog,
      label: "Kelola User & Izin",
      path: "/admin/kelola-user",
    },

    // ==========================================================
    // LANGGANAN
    // ==========================================================
    {
      type: "header",
      label: "LANGGANAN",
    },
    {
      type: "item",
      key: "paketLangganan",
      icon: CreditCard,
      label: "Paket Langganan",
      path: "/admin/langganan/paket",
    },
    {
      type: "item",
      key: "riwayatPembayaran",
      icon: History,
      label: "Riwayat Pembayaran",
      path: "/admin/langganan/riwayat-pembayaran",
    },
    {
      type: "item",
      key: "invoice",
      icon: Receipt,
      label: "Tagihan / Invoice",
      path: "/admin/langganan/invoice",
    },

    // ==========================================================
    // BIMBINGAN & KONSELING (BK)
    // ==========================================================
    {
      type: "header",
      label: "BIMBINGAN & KONSELING",
    },
    {
      type: "item",
      key: "sesiKonselingSiswa",
      icon: HeartHandshake,
      label: "Sesi Konseling Siswa",
      path: "/admin/bk/sesi-konseling",
    },
    {
      type: "item",
      key: "pelanggaranSiswa",
      icon: AlertTriangle,
      label: "Pelanggaran Siswa",
      path: "/admin/bk/pelanggaran",
    },
    {
      type: "item",
      key: "kategoriPointPelanggaran",
      icon: Tags,
      label: "Kategori dan Point Pelanggaran",
      path: "/admin/bk/kategori-point",
    },
    {
      type: "item",
      key: "asesmentMinatBakat",
      icon: Brain,
      label: "Asesment & Minat Bakat Siswa",
      path: "/admin/bk/asesment-minat-bakat",
    },

    // ==========================================================
    // PENERIMAAN (SPMB)
    // ==========================================================
    {
      type: "header",
      label: "PENERIMAAN (SPMB)",
    },
    {
      type: "item",
      key: "dataPendaftaran",
      icon: FileInput,
      label: "Data Pendaftaran",
      path: "/admin/spmb/data-pendaftaran",
    },
    {
      type: "item",
      key: "gelombang",
      icon: Layers,
      label: "Gelombang",
      path: "/admin/spmb/gelombang",
    },
    {
      type: "item",
      key: "pengaturanSpmb",
      icon: Settings,
      label: "Pengaturan",
      path: "/admin/spmb/pengaturan",
    },

    // ==========================================================
    // KEUANGAN & KAS
    // ==========================================================
    {
      type: "header",
      label: "KEUANGAN & KAS",
    },
    {
      type: "item",
      key: "spp",
      icon: Wallet,
      label: "SPP",
      path: "/admin/keuangan/spp",
    },
    {
      type: "item",
      key: "tabunganSiswa",
      icon: PiggyBank,
      label: "Tabungan Siswa",
      path: "/admin/keuangan/tabungan-siswa",
    },
  ],
};