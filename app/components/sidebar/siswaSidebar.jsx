import {
  Home,
  BookOpen,
  FileText,
  ClipboardList,
  GraduationCap,
  ClipboardCheck,
  User,
} from "lucide-react";

/**
 * Konfigurasi menu untuk role "siswa".
 *
 * Struktur folder aktual (app/siswa):
 * - page.jsx                          -> Beranda (/siswa)
 * - absensi/page.jsx                  -> Absensi (/siswa/absensi)
 * - mataPelajaran/page.jsx            -> Mata Pelajaran (/siswa/mataPelajaran)
 *   - materi/page.jsx                 -> Materi (/siswa/mataPelajaran/materi)
 *   - tugas/page.jsx                  -> Tugas (/siswa/mataPelajaran/tugas)
 *   - ujian/page.jsx                  -> Ujian (/siswa/mataPelajaran/ujian)
 * - profil/page.jsx                   -> Profil Saya (/siswa/profil)
 *
 * "mataPelajaran" dibikin bertingkat (children) karena punya 3 sub-halaman
 * (materi, tugas, ujian) yang masing-masing punya page.jsx sendiri.
 *
 * Kalau mau nambah/kurang menu siswa, tinggal edit array `menuSections`
 * di sini, tanpa nyentuh SidebarView.jsx atau Sidebar.jsx.
 */
export const siswaSidebarConfig = {
  basePath: "/siswa",
  brandName: "Portal Siswa",
  initials: "SW",
  email: "siswa@smartschool.com",
  menuSections: [
    { type: "item", key: "dashboard", icon: Home, label: "dashboard", path: "/siswa" },
    { type: "item", key: "absensi", icon: ClipboardCheck, label: "Absensi", path: "/siswa/absensi" },
    { type: "item", key: "ujian", icon: ClipboardCheck, label: "Ujian", path: "/siswa/ujian" },
    {
      type: "item",
      key: "mataPelajaran",
      icon: BookOpen,
      label: "Mata Pelajaran",
      path: "/siswa/mataPelajaran",
      children: [
        { key: "materi", icon: FileText, label: "Materi", path: "/siswa/mataPelajaran/materi" },
        { key: "tugas", icon: ClipboardList, label: "Tugas", path: "/siswa/mataPelajaran/tugas" },
        { key: "ujian", icon: GraduationCap, label: "Ujian", path: "/siswa/mataPelajaran/ujian" },
      ],
    },
    { type: "item", key: "pengaturan", icon: User, label: "Pengaturan", path: "/siswa/pengaturan" },
  ],
};