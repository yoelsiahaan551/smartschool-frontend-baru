"use client";

import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  FileCheck2,
  ClipboardCheck,
  History,
  Award,
  CalendarDays,
  CalendarCheck,
  UserCheck,
  Package,
  HandCoins,
  Clock3,
  Settings,
  User,
} from "lucide-react";

export const guruSidebarConfig = {
  role: "guru",

  brandName: "Guru",

  menuSections: [
    // =====================================================
    // DASHBOARD
    // =====================================================
    {
      type: "item",
      key: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/guru",
    },

    // =====================================================
    // PROSES BELAJAR
    // =====================================================
    {
      type: "header",
      key: "proses-belajar-header",
      label: "Proses Belajar",
    },

    {
      type: "dropdown",
      key: "materi",
      label: "Materi",
      icon: BookOpen,
      path: "/guru/materi",
      children: [
        {
          key: "tugas",
          label: "Tugas",
          icon: ClipboardList,
          path: "/guru/tugas",
        },
        {
          key: "ujian",
          label: "Ujian",
          icon: FileCheck2,
          path: "/guru/ujian",
        },
      ],
    },

    // =====================================================
    // AKADEMIK
    // =====================================================
    {
      type: "header",
      key: "akademik-header",
      label: "Akademik",
    },

    {
      type: "item",
      key: "absensi",
      label: "Absensi",
      icon: ClipboardCheck,
      path: "/guru/absensi",
    },

    {
      type: "item",
      key: "histori-absensi",
      label: "Histori Absensi",
      icon: History,
      path: "/guru/histori-absensi",
    },

    {
      type: "dropdown",
      key: "nilai",
      label: "Nilai",
      icon: Award,
      path: "/guru/nilai",
      children: [
        {
          key: "nilai-tugas",
          label: "Nilai Tugas",
          icon: ClipboardList,
          path: "/guru/nilai/nilaiTugas",
        },
        {
          key: "nilai-ujian",
          label: "Nilai Ujian",
          icon: FileCheck2,
          path: "/guru/nilaiUjian",
        },
        {
          key: "rapor",
          label: "Rapor",
          icon: Award,
          path: "/guru/nilai/rapor",
        },
      ],
    },

    // =====================================================
    // JADWAL
    // =====================================================
    {
      type: "header",
      key: "jadwal-header",
      label: "Jadwal",
    },

    {
      type: "dropdown",
      key: "jadwal",
      label: "Jadwal",
      icon: CalendarDays,
      children: [
        {
          key: "kalender",
          label: "Kalender",
          icon: CalendarDays,
          path: "/guru/jadwal",
        },
        {
          key: "presensi-jadwal",
          label: "Presensi",
          icon: CalendarCheck,
          path: "/guru/jadwal/presensi",
        },
        {
          key: "izin",
          label: "Izin",
          icon: UserCheck,
          path: "/guru/jadwal/izin",
        },
      ],
    },

    // =====================================================
    // SARANA PRASARANA
    // =====================================================
    {
      type: "header",
      key: "sarpras-header",
      label: "Sarana Prasarana",
    },

    {
      type: "dropdown",
      key: "sarpras",
      label: "Sarpras",
      icon: Package,
      children: [
        {
          key: "pinjam",
          label: "Pinjam",
          icon: HandCoins,
          path: "/guru/sarpras/pinjam",
        },
        {
          key: "peminjaman",
          label: "Peminjaman",
          icon: Package,
          path: "/guru/sarpras/peminjaman",
        },
        {
          key: "riwayat-peminjaman",
          label: "Riwayat",
          icon: Clock3,
          path: "/guru/sarpras/riwayat",
        },
      ],
    },

    // =====================================================
    // AKUN
    // =====================================================
    {
      type: "header",
      key: "akun-header",
      label: "Akun",
    },

    {
      type: "item",
      key: "pengaturan",
      label: "Pengaturan",
      icon: Settings,
      path: "/guru/pengaturan",
    },

    {
      type: "item",
      key: "profile",
      label: "Profile",
      icon: User,
      path: "/guru/profile",
    },
  ],
};