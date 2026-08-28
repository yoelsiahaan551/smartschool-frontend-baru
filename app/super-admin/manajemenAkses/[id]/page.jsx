"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { ArrowLeft, Search } from "lucide-react";

// ================== DATA ROLE ==================
const dummyRoles = [
  {
    id: "role-001",
    nama: "Super Admin",
    namaTampilan: "super-admin",
    deskripsi: "Akses penuh ke seluruh modul dan pengaturan sistem SmartSchool, termasuk manajemen tenant dan langganan.",
    status: "aktif",
    pengguna: 3,
  },
  {
    id: "role-002",
    nama: "Admin Sekolah",
    namaTampilan: "admin",
    deskripsi: "Mengelola data sekolah, guru, siswa, kelas, dan pengaturan operasional pada satu sekolah.",
    status: "aktif",
    pengguna: 125,
  },
  {
    id: "role-003",
    nama: "Yayasan",
    namaTampilan: "yayasan",
    deskripsi: "Memantau seluruh sekolah di bawah naungan yayasan, termasuk laporan akademik dan keuangan lintas sekolah.",
    status: "aktif",
    pengguna: 12,
  },
  {
    id: "role-004",
    nama: "Kepala Sekolah",
    namaTampilan: "admin",
    deskripsi: "Mengawasi kegiatan akademik dan administratif sekolah serta menyetujui laporan dari guru dan staf.",
    status: "aktif",
    pengguna: 24,
  },
  {
    id: "role-005",
    nama: "Guru",
    namaTampilan: "guru",
    deskripsi: "Mengelola nilai, presensi, dan materi ajar untuk kelas dan mata pelajaran yang diampu.",
    status: "aktif",
    pengguna: 842,
  },
  {
    id: "role-006",
    nama: "Wali Kelas",
    namaTampilan: "guru",
    deskripsi: "Memantau perkembangan siswa, presensi, dan catatan perilaku untuk satu kelas yang diampu.",
    status: "aktif",
    pengguna: 210,
  },
  {
    id: "role-007",
    nama: "Guru BK",
    namaTampilan: "guru",
    deskripsi: "Mengelola data bimbingan konseling, catatan kasus, dan laporan perkembangan siswa.",
    status: "aktif",
    pengguna: 36,
  },
  {
    id: "role-008",
    nama: "Bendahara",
    namaTampilan: "admin",
    deskripsi: "Mengelola tagihan, pembayaran SPP, dan laporan keuangan sekolah.",
    status: "aktif",
    pengguna: 18,
  },
  {
    id: "role-009",
    nama: "Staff Tata Usaha",
    namaTampilan: "admin",
    deskripsi: "Mengelola administrasi surat-menyurat, arsip data siswa, dan kebutuhan operasional harian sekolah.",
    status: "aktif",
    pengguna: 45,
  },
  {
    id: "role-010",
    nama: "Admin Sarpras",
    namaTampilan: "adminSarpras",
    deskripsi: "Mengelola data sarana dan prasarana sekolah, inventaris, serta jadwal pemeliharaan.",
    status: "aktif",
    pengguna: 15,
  },
  {
    id: "role-011",
    nama: "Admin PPDB",
    namaTampilan: "adminPPDB",
    deskripsi: "Mengelola proses pendaftaran peserta didik baru, seleksi, dan verifikasi berkas calon siswa.",
    status: "aktif",
    pengguna: 20,
  },
  {
    id: "role-012",
    nama: "CMS Admin",
    namaTampilan: "cms",
    deskripsi: "Mengelola konten dan tampilan situs sekolah, termasuk berita, pengumuman, dan halaman publik.",
    status: "nonaktif",
    pengguna: 6,
  },
  {
    id: "role-013",
    nama: "Siswa",
    namaTampilan: "siswa",
    deskripsi: "Mengakses jadwal, nilai, presensi, dan materi ajar melalui portal siswa.",
    status: "aktif",
    pengguna: 3210,
  },
];

const dummyPermissions = [
  { id: "perm-001", modul: "Akademik", aksi: "view", nama: "Lihat Akademik" },
  { id: "perm-002", modul: "Akademik", aksi: "create", nama: "Tambah Akademik" },
  { id: "perm-003", modul: "Akademik", aksi: "edit", nama: "Edit Akademik" },
  { id: "perm-004", modul: "Akademik", aksi: "delete", nama: "Hapus Akademik" },
  { id: "perm-005", modul: "Presensi", aksi: "view", nama: "Lihat Presensi" },
  { id: "perm-006", modul: "Presensi", aksi: "create", nama: "Tambah Presensi" },
  { id: "perm-007", modul: "Keuangan", aksi: "view", nama: "Lihat Keuangan" },
  { id: "perm-008", modul: "Keuangan", aksi: "create", nama: "Tambah Keuangan" },
  { id: "perm-009", modul: "Sarana Prasarana", aksi: "view", nama: "Lihat Sarpras" },
  { id: "perm-010", modul: "Sarana Prasarana", aksi: "edit", nama: "Edit Sarpras" },
  { id: "perm-011", modul: "PPDB", aksi: "view", nama: "Lihat Pendaftaran" },
  { id: "perm-012", modul: "PPDB", aksi: "edit", nama: "Verifikasi Pendaftaran" },
  { id: "perm-013", modul: "CMS", aksi: "view", nama: "Lihat Konten" },
  { id: "perm-014", modul: "CMS", aksi: "edit", nama: "Edit Konten" },
];

// ================== MAPPING ROLE -> PERMISSION ==================
const rolePermissionsMap = {
  "role-001": dummyPermissions.map((p) => p.id),
  "role-002": [
    "perm-001", "perm-002", "perm-003", "perm-004",
    "perm-005", "perm-006",
    "perm-007", "perm-008",
    "perm-009", "perm-010",
    "perm-011", "perm-012",
  ],
  "role-003": ["perm-001", "perm-005", "perm-007", "perm-009", "perm-011"],
  "role-004": [
    "perm-001", "perm-002", "perm-003",
    "perm-005", "perm-006",
    "perm-007",
    "perm-009",
    "perm-011", "perm-012",
  ],
  "role-005": ["perm-001", "perm-002", "perm-003", "perm-005", "perm-006"],
  "role-006": ["perm-001", "perm-005"],
  "role-007": ["perm-001", "perm-002", "perm-003"],
  "role-008": ["perm-007", "perm-008"],
  "role-009": ["perm-001", "perm-005", "perm-006"],
  "role-010": ["perm-009", "perm-010"],
  "role-011": ["perm-011", "perm-012"],
  "role-012": ["perm-013", "perm-014"],
  "role-013": ["perm-001", "perm-005"],
};

// ================== DATA PENGGUNA + LOG AKTIVITAS PER ROLE ==================
const dummyUsersByRole = {
  "role-001": [
    {
      nama: "Sarah Amelia",
      email: "sarah@smartschool.com",
      aktivitas: [
        { aksi: "edit", modul: "Manajemen Akses", keterangan: "Mengubah pengaturan role Bendahara", waktu: "10 menit lalu" },
        { aksi: "create", modul: "Manajemen Akses", keterangan: "Menambahkan role baru Admin Sarpras", waktu: "2 jam lalu" },
        { aksi: "delete", modul: "PPDB", keterangan: "Menghapus data pendaftar duplikat", waktu: "kemarin, 14:20" },
        { aksi: "view", modul: "Keuangan", keterangan: "Melihat laporan keuangan bulanan", waktu: "kemarin, 09:05" },
        { aksi: "edit", modul: "Akademik", keterangan: "Mengubah jadwal ujian semester", waktu: "2 hari lalu" },
      ],
    },
    {
      nama: "Budi Santoso",
      email: "budi.santoso@smartschool.com",
      aktivitas: [
        { aksi: "create", modul: "CMS", keterangan: "Mempublikasikan pengumuman libur sekolah", waktu: "1 jam lalu" },
        { aksi: "edit", modul: "Sarana Prasarana", keterangan: "Memperbarui data inventaris lab komputer", waktu: "5 jam lalu" },
        { aksi: "delete", modul: "CMS", keterangan: "Menghapus berita kadaluarsa", waktu: "kemarin, 16:40" },
      ],
    },
    {
      nama: "Dewi Lestari",
      email: "dewi.lestari@smartschool.com",
      aktivitas: [
        { aksi: "view", modul: "Akademik", keterangan: "Melihat rekap nilai seluruh kelas", waktu: "30 menit lalu" },
        { aksi: "edit", modul: "Presensi", keterangan: "Mengoreksi data presensi guru", waktu: "3 hari lalu" },
      ],
    },
  ],
  "role-002": [
    {
      nama: "Rina Marlina",
      email: "rina.marlina@smartschool.com",
      aktivitas: [
        { aksi: "create", modul: "Akademik", keterangan: "Menambahkan mata pelajaran baru", waktu: "45 menit lalu" },
        { aksi: "edit", modul: "Presensi", keterangan: "Memperbarui jadwal presensi kelas X", waktu: "kemarin, 11:10" },
      ],
    },
    {
      nama: "Agus Prasetyo",
      email: "agus.prasetyo@smartschool.com",
      aktivitas: [
        { aksi: "create", modul: "PPDB", keterangan: "Menambahkan gelombang pendaftaran baru", waktu: "1 hari lalu" },
        { aksi: "view", modul: "Keuangan", keterangan: "Memeriksa status tagihan SPP", waktu: "2 hari lalu" },
      ],
    },
    {
      nama: "Fitriani Wulandari",
      email: "fitriani.w@smartschool.com",
      aktivitas: [
        { aksi: "edit", modul: "Sarana Prasarana", keterangan: "Mengubah status perbaikan AC ruang kelas", waktu: "6 jam lalu" },
        { aksi: "delete", modul: "PPDB", keterangan: "Menghapus data calon siswa yang mengundurkan diri", waktu: "kemarin, 08:30" },
      ],
    },
    {
      nama: "Hendra Gunawan",
      email: "hendra.gunawan@smartschool.com",
      aktivitas: [
        { aksi: "view", modul: "Akademik", keterangan: "Melihat rekap kehadiran guru", waktu: "3 jam lalu" },
      ],
    },
    {
      nama: "Siti Nurhaliza",
      email: "siti.n@smartschool.com",
      aktivitas: [
        { aksi: "edit", modul: "Keuangan", keterangan: "Memperbarui nominal tagihan SPP kelas XII", waktu: "1 jam lalu" },
        { aksi: "create", modul: "Presensi", keterangan: "Menambahkan jadwal presensi ekstrakurikuler", waktu: "4 hari lalu" },
      ],
    },
  ],
  "role-003": [
    {
      nama: "H. Ahmad Fauzi",
      email: "ahmad.fauzi@yayasan.sch.id",
      aktivitas: [
        { aksi: "view", modul: "Keuangan", keterangan: "Melihat laporan keuangan lintas sekolah", waktu: "2 jam lalu" },
      ],
    },
    {
      nama: "Hj. Ratna Dewi",
      email: "ratna.dewi@yayasan.sch.id",
      aktivitas: [
        { aksi: "view", modul: "Akademik", keterangan: "Melihat laporan akademik seluruh sekolah", waktu: "kemarin, 10:00" },
      ],
    },
    {
      nama: "Yusuf Ibrahim",
      email: "yusuf.ibrahim@yayasan.sch.id",
      aktivitas: [
        { aksi: "view", modul: "PPDB", keterangan: "Memantau progres pendaftaran siswa baru", waktu: "3 hari lalu" },
      ],
    },
  ],
  "role-004": [
    {
      nama: "Drs. Suparman, M.Pd.",
      email: "suparman@smartschool.com",
      aktivitas: [
        { aksi: "edit", modul: "Akademik", keterangan: "Menyetujui perubahan jadwal pelajaran", waktu: "1 jam lalu" },
        { aksi: "view", modul: "Presensi", keterangan: "Melihat rekap kehadiran siswa", waktu: "kemarin, 13:00" },
      ],
    },
    {
      nama: "Dra. Wahyuni, M.Pd.",
      email: "wahyuni@smartschool.com",
      aktivitas: [
        { aksi: "create", modul: "PPDB", keterangan: "Menambahkan kriteria seleksi baru", waktu: "5 jam lalu" },
        { aksi: "edit", modul: "Keuangan", keterangan: "Menyetujui pengajuan anggaran kegiatan", waktu: "2 hari lalu" },
      ],
    },
  ],
  "role-005": [
    {
      nama: "Andi Saputra, S.Pd.",
      email: "andi.saputra@smartschool.com",
      aktivitas: [
        { aksi: "create", modul: "Akademik", keterangan: "Menginput nilai ulangan harian", waktu: "20 menit lalu" },
        { aksi: "edit", modul: "Presensi", keterangan: "Mengoreksi presensi siswa yang salah input", waktu: "kemarin, 07:45" },
      ],
    },
    {
      nama: "Yulia Ningsih, S.Pd.",
      email: "yulia.ningsih@smartschool.com",
      aktivitas: [
        { aksi: "edit", modul: "Akademik", keterangan: "Memperbarui materi ajar kelas XI", waktu: "2 jam lalu" },
      ],
    },
    {
      nama: "Bambang Irawan, S.Pd.",
      email: "bambang.irawan@smartschool.com",
      aktivitas: [
        { aksi: "create", modul: "Presensi", keterangan: "Menambahkan sesi presensi tambahan", waktu: "4 jam lalu" },
      ],
    },
    {
      nama: "Ika Puspita, S.Pd.",
      email: "ika.puspita@smartschool.com",
      aktivitas: [
        { aksi: "view", modul: "Akademik", keterangan: "Melihat rekap nilai kelas X", waktu: "1 hari lalu" },
      ],
    },
    {
      nama: "Rudi Hartono, S.Pd.",
      email: "rudi.hartono@smartschool.com",
      aktivitas: [
        { aksi: "create", modul: "Akademik", keterangan: "Menginput nilai ujian tengah semester", waktu: "3 jam lalu" },
        { aksi: "edit", modul: "Presensi", keterangan: "Mengubah keterangan izin siswa", waktu: "kemarin, 09:15" },
      ],
    },
    {
      nama: "Nurul Aini, S.Pd.",
      email: "nurul.aini@smartschool.com",
      aktivitas: [
        { aksi: "view", modul: "Presensi", keterangan: "Melihat rekap kehadiran mingguan", waktu: "6 jam lalu" },
      ],
    },
  ],
  "role-006": [
    {
      nama: "Dian Permatasari, S.Pd.",
      email: "dian.permatasari@smartschool.com",
      aktivitas: [
        { aksi: "view", modul: "Akademik", keterangan: "Melihat perkembangan siswa kelas VII-A", waktu: "1 jam lalu" },
      ],
    },
    {
      nama: "Fajar Nugroho, S.Pd.",
      email: "fajar.nugroho@smartschool.com",
      aktivitas: [
        { aksi: "view", modul: "Presensi", keterangan: "Melihat catatan perilaku siswa", waktu: "kemarin, 15:30" },
      ],
    },
    {
      nama: "Maya Kusuma, S.Pd.",
      email: "maya.kusuma@smartschool.com",
      aktivitas: [
        { aksi: "view", modul: "Akademik", keterangan: "Melihat rapor sementara kelas VIII-B", waktu: "2 hari lalu" },
      ],
    },
  ],
  "role-007": [
    {
      nama: "Dra. Indah Permatasari, M.Psi.",
      email: "indah.permatasari@smartschool.com",
      aktivitas: [
        { aksi: "create", modul: "Akademik", keterangan: "Menambahkan catatan konseling siswa", waktu: "3 jam lalu" },
      ],
    },
    {
      nama: "Wawan Setiawan, S.Psi.",
      email: "wawan.setiawan@smartschool.com",
      aktivitas: [
        { aksi: "edit", modul: "Akademik", keterangan: "Memperbarui laporan perkembangan kasus", waktu: "kemarin, 10:20" },
      ],
    },
  ],
  "role-008": [
    {
      nama: "Lilis Suryani",
      email: "lilis.suryani@smartschool.com",
      aktivitas: [
        { aksi: "create", modul: "Keuangan", keterangan: "Menambahkan tagihan SPP bulan baru", waktu: "1 jam lalu" },
      ],
    },
    {
      nama: "Joko Prasetyo",
      email: "joko.prasetyo@smartschool.com",
      aktivitas: [
        { aksi: "view", modul: "Keuangan", keterangan: "Melihat laporan pembayaran harian", waktu: "5 jam lalu" },
      ],
    },
  ],
  "role-009": [
    {
      nama: "Eka Wahyuningsih",
      email: "eka.wahyuningsih@smartschool.com",
      aktivitas: [
        { aksi: "edit", modul: "Akademik", keterangan: "Memperbarui data induk siswa", waktu: "2 jam lalu" },
      ],
    },
    {
      nama: "Dedi Kurniawan",
      email: "dedi.kurniawan@smartschool.com",
      aktivitas: [
        { aksi: "view", modul: "Akademik", keterangan: "Melihat arsip surat masuk", waktu: "kemarin, 09:00" },
      ],
    },
    {
      nama: "Sri Wahyuni",
      email: "sri.wahyuni@smartschool.com",
      aktivitas: [
        { aksi: "create", modul: "Presensi", keterangan: "Menambahkan jadwal presensi staff", waktu: "4 hari lalu" },
      ],
    },
  ],
  "role-010": [
    {
      nama: "Slamet Riyadi",
      email: "slamet.riyadi@smartschool.com",
      aktivitas: [
        { aksi: "edit", modul: "Sarana Prasarana", keterangan: "Memperbarui status perbaikan proyektor", waktu: "3 jam lalu" },
      ],
    },
    {
      nama: "Tono Sucipto",
      email: "tono.sucipto@smartschool.com",
      aktivitas: [
        { aksi: "view", modul: "Sarana Prasarana", keterangan: "Melihat jadwal pemeliharaan gedung", waktu: "kemarin, 14:00" },
      ],
    },
  ],
  "role-011": [
    {
      nama: "Anita Rahmawati",
      email: "anita.rahmawati@smartschool.com",
      aktivitas: [
        { aksi: "edit", modul: "PPDB", keterangan: "Memverifikasi berkas calon siswa", waktu: "1 jam lalu" },
      ],
    },
    {
      nama: "Farhan Maulana",
      email: "farhan.maulana@smartschool.com",
      aktivitas: [
        { aksi: "view", modul: "PPDB", keterangan: "Melihat daftar pendaftar gelombang 2", waktu: "6 jam lalu" },
      ],
    },
  ],
  "role-012": [
    {
      nama: "Galih Pratama",
      email: "galih.pratama@smartschool.com",
      aktivitas: [
        { aksi: "edit", modul: "CMS", keterangan: "Memperbarui halaman profil sekolah", waktu: "2 jam lalu" },
      ],
    },
  ],
  "role-013": [
    {
      nama: "Muhammad Rizky",
      email: "muhammad.rizky@siswa.smartschool.com",
      aktivitas: [
        { aksi: "view", modul: "Akademik", keterangan: "Melihat nilai ujian tengah semester", waktu: "1 jam lalu" },
      ],
    },
    {
      nama: "Aulia Zahra",
      email: "aulia.zahra@siswa.smartschool.com",
      aktivitas: [
        { aksi: "view", modul: "Presensi", keterangan: "Melihat riwayat kehadiran pribadi", waktu: "3 jam lalu" },
      ],
    },
    {
      nama: "Bagas Wicaksono",
      email: "bagas.wicaksono@siswa.smartschool.com",
      aktivitas: [
        { aksi: "view", modul: "Akademik", keterangan: "Melihat jadwal pelajaran minggu ini", waktu: "kemarin, 07:00" },
      ],
    },
    {
      nama: "Kayla Anindya",
      email: "kayla.anindya@siswa.smartschool.com",
      aktivitas: [
        { aksi: "view", modul: "Akademik", keterangan: "Mengunduh materi ajar Bahasa Inggris", waktu: "2 hari lalu" },
      ],
    },
  ],
};

const statusColorMap = {
  aktif: { text: "text-emerald-700", dot: "bg-emerald-500" },
  nonaktif: { text: "text-rose-700", dot: "bg-rose-500" },
};

// Label & warna teks polos per jenis aksi (tanpa ikon)
const aksiConfig = {
  view: { label: "Melihat", text: "text-slate-500" },
  create: { label: "Menambah", text: "text-emerald-600" },
  edit: { label: "Mengubah", text: "text-amber-600" },
  delete: { label: "Menghapus", text: "text-rose-600" },
};

export default function DetailRolePage() {
  const params = useParams();
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("manajemen-akses");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [expandedUser, setExpandedUser] = useState(null);
  const usersPerPage = 8;

  const notifications = [
    { id: 1, title: "Pembaruan Sistem v2.0", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Pengingat: Backup Data", desc: "Dikirim 1 hari lalu", read: false },
  ];

  const role = dummyRoles.find((r) => r.id === params.id);
  const grantedIds = rolePermissionsMap[params.id] || [];
  const daftarPengguna = dummyUsersByRole[params.id] || [];
  const penggunaTersaring = daftarPengguna.filter((u) =>
    u.nama.toLowerCase().includes(userSearchQuery.toLowerCase())
  );

  const totalUserPages = Math.ceil(penggunaTersaring.length / usersPerPage) || 1;
  const paginatedUsers = penggunaTersaring.slice(
    (userPage - 1) * usersPerPage,
    userPage * usersPerPage
  );

  const totalGranted = grantedIds.length;
  const totalPermission = dummyPermissions.length;
  const modulDenganAkses = new Set(
    dummyPermissions.filter((p) => grantedIds.includes(p.id)).map((p) => p.modul)
  ).size;
  const totalModul = new Set(dummyPermissions.map((p) => p.modul)).size;

  const totalAktivitas = daftarPengguna.reduce(
    (sum, u) => sum + (u.aktivitas?.length || 0),
    0
  );

  const handleUserSearchChange = (value) => {
    setUserSearchQuery(value);
    setUserPage(1);
  };

  const toggleExpandUser = (email) => {
    setExpandedUser((prev) => (prev === email ? null : email));
  };

  if (!role) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar
          active={activeMenu}
          setActive={setActiveMenu}
          collapsed={!sidebarOpen}
          setCollapsed={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            notifications={notifications}
            user={{ name: "Sarah", email: "sarah@smartschool.com", avatar: "SA" }}
          />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
            <div className="text-center space-y-3">
              <p className="text-sm font-medium text-slate-700">Role tidak ditemukan</p>
              <p className="text-xs text-slate-400">Role dengan id "{params.id}" tidak ada dalam data.</p>
              <button
                onClick={() => router.push("/super-admin/manajemenAkses")}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Kembali ke Manajemen Akses
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const statusStyle = statusColorMap[role.status] || statusColorMap.nonaktif;
  const statusLabel = role.status === "aktif" ? "Aktif" : "Nonaktif";

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        active={activeMenu}
        setActive={setActiveMenu}
        collapsed={!sidebarOpen}
        setCollapsed={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          user={{ name: "Sarah", email: "sarah@smartschool.com", avatar: "SA" }}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="w-full space-y-5 sm:space-y-6">
            {/* BREADCRUMB / BACK */}
            <button
              onClick={() => router.push("/super-admin/manajemenAkses")}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              <ArrowLeft size={15} />
              Kembali ke Manajemen Akses
            </button>

            {/* HEADER ROLE */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-lg sm:text-xl font-semibold text-slate-800">{role.nama}</h1>
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                      {role.namaTampilan}
                    </span>
                    <span className={`text-xs font-medium flex items-center gap-1.5 ${statusStyle.text}`}>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                      {statusLabel}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1 max-w-2xl">{role.deskripsi}</p>
                  <p className="text-xs text-slate-400 mt-2">
                    {role.pengguna.toLocaleString("id-ID")} pengguna memakai peran ini
                  </p>
                </div>
                <button
                  onClick={() => router.push(`/super-admin/manajemenAkses/edit-role?id=${role.id}`)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0"
                >
                  Edit Role
                </button>
              </div>
            </div>

            {/* STATISTIK */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard label="Akses Diberikan" value={`${totalGranted}/${totalPermission}`} />
              <StatCard label="Modul Terjangkau" value={`${modulDenganAkses}/${totalModul}`} />
              <StatCard label="Pengguna Terkait" value={role.pengguna} />
              <StatCard label="Total Aktivitas" value={totalAktivitas} />
            </div>

            {/* DAFTAR PENGGUNA + LOG AKTIVITAS */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4 border-b border-slate-200/80">
                <div>
                  <h2 className="text-sm font-semibold text-slate-700">Daftar Pengguna & Aktivitas</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Riwayat tindakan pengguna dengan peran{" "}
                    <span className="font-medium text-slate-700">{role.nama}</span>
                  </p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari nama pengguna..."
                    value={userSearchQuery}
                    onChange={(e) => handleUserSearchChange(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                  />
                </div>
              </div>

              {paginatedUsers.length === 0 ? (
                <div className="px-4 sm:px-5 py-12 text-center">
                  <p className="text-sm font-medium text-slate-700">Tidak ada pengguna ditemukan</p>
                  <p className="text-xs text-slate-400 mt-1">Coba ubah kata kunci pencarian</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {paginatedUsers.map((u, idx) => {
                    const isOpen = expandedUser === u.email;
                    const jumlahAktivitas = u.aktivitas?.length || 0;
                    const aktivitasTerbaru = u.aktivitas?.[0];

                    return (
                      <div key={u.email}>
                        {/* Baris ringkas user - klik untuk expand log lengkap */}
                        <button
                          onClick={() => toggleExpandUser(u.email)}
                          className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 hover:bg-slate-50/60 transition-colors text-left"
                        >
                          <span className="text-xs text-slate-400 w-6 flex-shrink-0">
                            {(userPage - 1) * usersPerPage + idx + 1}
                          </span>

                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-slate-800 truncate">{u.nama}</p>
                            <p className="text-xs text-slate-400 truncate">{u.email}</p>
                          </div>

                          {aktivitasTerbaru && (
                            <div className="hidden md:block min-w-0 max-w-xs text-right">
                              <p className="text-xs text-slate-600 truncate">
                                <span className={`font-medium ${aksiConfig[aktivitasTerbaru.aksi]?.text}`}>
                                  {aksiConfig[aktivitasTerbaru.aksi]?.label}
                                </span>{" "}
                                · {aktivitasTerbaru.modul}
                              </p>
                              <p className="text-[11px] text-slate-400">{aktivitasTerbaru.waktu}</p>
                            </div>
                          )}

                          <span className="text-xs font-medium text-slate-500 flex-shrink-0 w-20 text-right">
                            {jumlahAktivitas} aktivitas
                          </span>

                          <span className="text-slate-400 flex-shrink-0 text-xs w-4 text-center">
                            {isOpen ? "–" : "+"}
                          </span>
                        </button>

                        {/* Log aktivitas lengkap - muncul saat di-expand */}
                        {isOpen && (
                          <div className="bg-slate-50/60 border-t border-slate-100 px-4 sm:px-5 py-3">
                            {jumlahAktivitas === 0 ? (
                              <p className="text-xs text-slate-400 py-2">
                                Belum ada aktivitas yang terekam untuk pengguna ini.
                              </p>
                            ) : (
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                    <th className="text-left pb-2 pr-3">Aksi</th>
                                    <th className="text-left pb-2 pr-3">Modul</th>
                                    <th className="text-left pb-2 pr-3">Keterangan</th>
                                    <th className="text-right pb-2">Waktu</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200/60">
                                  {u.aktivitas.map((log, logIdx) => (
                                    <tr key={logIdx}>
                                      <td className="py-2 pr-3">
                                        <span className={`font-medium ${aksiConfig[log.aksi]?.text}`}>
                                          {aksiConfig[log.aksi]?.label}
                                        </span>
                                      </td>
                                      <td className="py-2 pr-3 text-slate-600">{log.modul}</td>
                                      <td className="py-2 pr-3 text-slate-500">{log.keterangan}</td>
                                      <td className="py-2 text-right text-slate-400 whitespace-nowrap">
                                        {log.waktu}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* PAGINATION PENGGUNA */}
              <div className="px-4 sm:px-5 py-3 border-t border-slate-200/80 flex flex-col xs:flex-row items-center justify-between gap-2">
                <p className="text-xs text-slate-500 text-center xs:text-left">
                  <span className="hidden xs:inline">Menampilkan </span>
                  <span className="font-medium text-slate-700">
                    {penggunaTersaring.length === 0 ? 0 : (userPage - 1) * usersPerPage + 1}
                  </span>
                  <span className="hidden xs:inline"> sampai </span>
                  <span className="font-medium text-slate-700">
                    {Math.min(userPage * usersPerPage, penggunaTersaring.length)}
                  </span>
                  <span className="hidden xs:inline"> dari </span>
                  <span className="font-medium text-slate-700">{penggunaTersaring.length}</span>
                  <span className="hidden xs:inline"> data sampel</span>
                  {role.pengguna > daftarPengguna.length && (
                    <span className="block xs:inline text-slate-400">
                      {" "}
                      (total {role.pengguna.toLocaleString("id-ID")} di sistem — hubungkan API untuk data & log penuh)
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={() => setUserPage((p) => Math.max(1, p - 1))}
                    disabled={userPage === 1}
                    className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="hidden xs:inline">Previous</span>
                    <span className="xs:hidden">‹</span>
                  </button>
                  {[...Array(totalUserPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setUserPage(page)}
                        className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                          userPage === page
                            ? "bg-blue-600 text-white"
                            : "text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setUserPage((p) => Math.min(totalUserPages, p + 1))}
                    disabled={userPage === totalUserPages}
                    className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="hidden xs:inline">Next</span>
                    <span className="xs:hidden">›</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-slate-400/80 py-2 border-t border-slate-200/40">
              © 2026 SmartSchool. Log aktivitas terakhir diperbarui hari ini.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ===== KOMPONEN STAT CARD (tanpa ikon) =====
function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-sm">
      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-lg font-semibold text-slate-800 mt-1">
        {typeof value === "number" ? value.toLocaleString("id-ID") : value}
      </p>
    </div>
  );
}