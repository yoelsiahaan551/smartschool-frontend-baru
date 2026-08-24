"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  CheckCircle,
  XCircle,
  User,
  Upload,
  FileSpreadsheet,
  ChevronRight,
  UserPlus,
} from "lucide-react";

// =========================================================
// STORAGE
// =========================================================
const STORAGE_KEY = "siswa_data";

// =========================================================
// DATA DEFAULT - 30 SISWA
// =========================================================
const getDefaultSiswa = () => {
  return [
    {
      id: 1,
      nama: "Ahmad Fauzan",
      nis: "2401001",
      kelas: "X RPL 1",
      email: "ahmad.f@sekolah.com",
      phone: "081234567890",
      status: "Aktif",
      alamat: "Jl. Merdeka No. 12, Jakarta",
      tglLahir: "2006-05-10",
      gender: "L",
      joinDate: "2024-07-01",
    },
    {
      id: 2,
      nama: "Bella Safira",
      nis: "2401002",
      kelas: "X RPL 1",
      email: "bella@sekolah.com",
      phone: "081234567891",
      status: "Aktif",
      alamat: "Jl. Sudirman No. 8, Jakarta",
      tglLahir: "2006-08-22",
      gender: "P",
      joinDate: "2024-07-01",
    },
    {
      id: 3,
      nama: "Cahyo Nugroho",
      nis: "2401003",
      kelas: "X RPL 1",
      email: "cahyo@sekolah.com",
      phone: "081234567892",
      status: "Nonaktif",
      alamat: "Jl. Diponegoro No. 5, Jakarta",
      tglLahir: "2006-03-15",
      gender: "L",
      joinDate: "2024-07-01",
    },
    {
      id: 4,
      nama: "Dinda Maharani",
      nis: "2401004",
      kelas: "X RPL 2",
      email: "dinda@sekolah.com",
      phone: "081234567893",
      status: "Aktif",
      alamat: "Jl. Pemuda No. 18, Jakarta",
      tglLahir: "2006-06-20",
      gender: "P",
      joinDate: "2024-07-01",
    },
    {
      id: 5,
      nama: "Eko Prasetyo",
      nis: "2401005",
      kelas: "X RPL 2",
      email: "eko@sekolah.com",
      phone: "081234567894",
      status: "Aktif",
      alamat: "Jl. Gatot Subroto No. 22, Jakarta",
      tglLahir: "2006-01-18",
      gender: "L",
      joinDate: "2024-07-01",
    },
    {
      id: 6,
      nama: "Fira Amelia",
      nis: "2401006",
      kelas: "X RPL 2",
      email: "fira@sekolah.com",
      phone: "081234567895",
      status: "Aktif",
      alamat: "Jl. Cendana No. 7, Jakarta",
      tglLahir: "2006-09-12",
      gender: "P",
      joinDate: "2024-07-01",
    },
    {
      id: 7,
      nama: "Galang Ramadhan",
      nis: "2401007",
      kelas: "X TKJ 1",
      email: "galang@sekolah.com",
      phone: "081234567896",
      status: "Aktif",
      alamat: "Jl. Veteran No. 14, Jakarta",
      tglLahir: "2006-04-25",
      gender: "L",
      joinDate: "2024-07-01",
    },
    {
      id: 8,
      nama: "Hana Putri",
      nis: "2401008",
      kelas: "X TKJ 1",
      email: "hana@sekolah.com",
      phone: "081234567897",
      status: "Aktif",
      alamat: "Jl. Melati No. 9, Jakarta",
      tglLahir: "2006-07-14",
      gender: "P",
      joinDate: "2024-07-01",
    },
    {
      id: 9,
      nama: "Iqbal Maulana",
      nis: "2401009",
      kelas: "X TKJ 1",
      email: "iqbal@sekolah.com",
      phone: "081234567898",
      status: "Aktif",
      alamat: "Jl. Kenanga No. 11, Jakarta",
      tglLahir: "2006-02-28",
      gender: "L",
      joinDate: "2024-07-01",
    },
    {
      id: 10,
      nama: "Jihan Anastasya",
      nis: "2401010",
      kelas: "X TKJ 2",
      email: "jihan@sekolah.com",
      phone: "081234567899",
      status: "Aktif",
      alamat: "Jl. Anggrek No. 16, Jakarta",
      tglLahir: "2006-10-05",
      gender: "P",
      joinDate: "2024-07-01",
    },
    {
      id: 11,
      nama: "Kevin Alexander",
      nis: "2401011",
      kelas: "X TKJ 2",
      email: "kevin@sekolah.com",
      phone: "081234567880",
      status: "Aktif",
      alamat: "Jl. Mawar No. 20, Jakarta",
      tglLahir: "2006-11-19",
      gender: "L",
      joinDate: "2024-07-01",
    },
    {
      id: 12,
      nama: "Larasati Indah",
      nis: "2401012",
      kelas: "X TKJ 2",
      email: "larasati@sekolah.com",
      phone: "081234567881",
      status: "Aktif",
      alamat: "Jl. Dahlia No. 25, Jakarta",
      tglLahir: "2006-12-03",
      gender: "P",
      joinDate: "2024-07-01",
    },
    {
      id: 13,
      nama: "Muhammad Rizky",
      nis: "2401013",
      kelas: "X AK 1",
      email: "rizky@sekolah.com",
      phone: "081234567882",
      status: "Aktif",
      alamat: "Jl. Mangga No. 4, Jakarta",
      tglLahir: "2006-03-22",
      gender: "L",
      joinDate: "2024-07-01",
    },
    {
      id: 14,
      nama: "Nabila Putri",
      nis: "2401014",
      kelas: "X AK 1",
      email: "nabila@sekolah.com",
      phone: "081234567883",
      status: "Aktif",
      alamat: "Jl. Jeruk No. 10, Jakarta",
      tglLahir: "2006-05-17",
      gender: "P",
      joinDate: "2024-07-01",
    },
    {
      id: 15,
      nama: "Oscar Wijaya",
      nis: "2401015",
      kelas: "X AK 1",
      email: "oscar@sekolah.com",
      phone: "081234567884",
      status: "Aktif",
      alamat: "Jl. Cemara No. 15, Jakarta",
      tglLahir: "2006-08-30",
      gender: "L",
      joinDate: "2024-07-01",
    },
    {
      id: 16,
      nama: "Putri Maharani",
      nis: "2401016",
      kelas: "XI RPL 1",
      email: "putri@sekolah.com",
      phone: "081234567885",
      status: "Aktif",
      alamat: "Jl. Flamboyan No. 6, Jakarta",
      tglLahir: "2005-04-11",
      gender: "P",
      joinDate: "2023-07-03",
    },
    {
      id: 17,
      nama: "Raka Firmansyah",
      nis: "2401017",
      kelas: "XI RPL 1",
      email: "raka@sekolah.com",
      phone: "081234567886",
      status: "Aktif",
      alamat: "Jl. Teratai No. 19, Jakarta",
      tglLahir: "2005-02-14",
      gender: "L",
      joinDate: "2023-07-03",
    },
    {
      id: 18,
      nama: "Salsa Amelia",
      nis: "2401018",
      kelas: "XI RPL 1",
      email: "salsa@sekolah.com",
      phone: "081234567887",
      status: "Aktif",
      alamat: "Jl. Bougenville No. 8, Jakarta",
      tglLahir: "2005-09-21",
      gender: "P",
      joinDate: "2023-07-03",
    },
    {
      id: 19,
      nama: "Tegar Pratama",
      nis: "2401019",
      kelas: "XI RPL 2",
      email: "tegar@sekolah.com",
      phone: "081234567888",
      status: "Aktif",
      alamat: "Jl. Pinus No. 13, Jakarta",
      tglLahir: "2005-06-16",
      gender: "L",
      joinDate: "2023-07-03",
    },
    {
      id: 20,
      nama: "Ulfa Rahma",
      nis: "2401020",
      kelas: "XI RPL 2",
      email: "ulfa@sekolah.com",
      phone: "081234567889",
      status: "Aktif",
      alamat: "Jl. Kamboja No. 3, Jakarta",
      tglLahir: "2005-10-09",
      gender: "P",
      joinDate: "2023-07-03",
    },
    {
      id: 21,
      nama: "Vino Aditya",
      nis: "2401021",
      kelas: "XI TKJ 1",
      email: "vino@sekolah.com",
      phone: "081234567870",
      status: "Aktif",
      alamat: "Jl. Sawo No. 17, Jakarta",
      tglLahir: "2005-01-27",
      gender: "L",
      joinDate: "2023-07-03",
    },
    {
      id: 22,
      nama: "Wulan Sari",
      nis: "2401022",
      kelas: "XI TKJ 1",
      email: "wulan@sekolah.com",
      phone: "081234567871",
      status: "Aktif",
      alamat: "Jl. Nangka No. 21, Jakarta",
      tglLahir: "2005-07-13",
      gender: "P",
      joinDate: "2023-07-03",
    },
    {
      id: 23,
      nama: "Yoga Saputra",
      nis: "2401023",
      kelas: "XI TKJ 2",
      email: "yoga@sekolah.com",
      phone: "081234567872",
      status: "Aktif",
      alamat: "Jl. Durian No. 12, Jakarta",
      tglLahir: "2005-05-24",
      gender: "L",
      joinDate: "2023-07-03",
    },
    {
      id: 24,
      nama: "Zahra Khairunnisa",
      nis: "2401024",
      kelas: "XI TKJ 2",
      email: "zahra@sekolah.com",
      phone: "081234567873",
      status: "Aktif",
      alamat: "Jl. Apel No. 9, Jakarta",
      tglLahir: "2005-11-06",
      gender: "P",
      joinDate: "2023-07-03",
    },
    {
      id: 25,
      nama: "Ardiansyah Putra",
      nis: "2401025",
      kelas: "XII RPL 1",
      email: "ardiansyah@sekolah.com",
      phone: "081234567874",
      status: "Aktif",
      alamat: "Jl. Mangga Dua No. 15, Jakarta",
      tglLahir: "2004-03-18",
      gender: "L",
      joinDate: "2022-07-04",
    },
    {
      id: 26,
      nama: "Bunga Citra",
      nis: "2401026",
      kelas: "XII RPL 1",
      email: "bunga@sekolah.com",
      phone: "081234567875",
      status: "Aktif",
      alamat: "Jl. Melur No. 18, Jakarta",
      tglLahir: "2004-08-12",
      gender: "P",
      joinDate: "2022-07-04",
    },
    {
      id: 27,
      nama: "Daffa Alfarizi",
      nis: "2401027",
      kelas: "XII RPL 2",
      email: "daffa@sekolah.com",
      phone: "081234567876",
      status: "Aktif",
      alamat: "Jl. Sakura No. 7, Jakarta",
      tglLahir: "2004-06-05",
      gender: "L",
      joinDate: "2022-07-04",
    },
    {
      id: 28,
      nama: "Elsa Permata",
      nis: "2401028",
      kelas: "XII RPL 2",
      email: "elsa@sekolah.com",
      phone: "081234567877",
      status: "Aktif",
      alamat: "Jl. Anyelir No. 11, Jakarta",
      tglLahir: "2004-09-25",
      gender: "P",
      joinDate: "2022-07-04",
    },
    {
      id: 29,
      nama: "Farhan Akbar",
      nis: "2401029",
      kelas: "XII TKJ 1",
      email: "farhan@sekolah.com",
      phone: "081234567878",
      status: "Aktif",
      alamat: "Jl. Pahlawan No. 30, Jakarta",
      tglLahir: "2004-02-11",
      gender: "L",
      joinDate: "2022-07-04",
    },
    {
      id: 30,
      nama: "Gisella Anjani",
      nis: "2401030",
      kelas: "XII TKJ 1",
      email: "gisella@sekolah.com",
      phone: "081234567879",
      status: "Aktif",
      alamat: "Jl. Rajawali No. 16, Jakarta",
      tglLahir: "2004-12-20",
      gender: "P",
      joinDate: "2022-07-04",
    },
  ];
};

// =========================================================
// LOAD DATA
// =========================================================
const loadSiswa = () => {
  if (typeof window === "undefined") {
    return getDefaultSiswa();
  }

  try {
    const defaultData = getDefaultSiswa();
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultData)
      );

      return defaultData;
    }

    const oldData = JSON.parse(stored);

    if (!Array.isArray(oldData)) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultData)
      );

      return defaultData;
    }

    // Gabungkan data lama dengan data default.
    // Jadi kalau sebelumnya hanya ada 3 data,
    // otomatis menjadi 30 data.
    const merged = [...oldData];

    defaultData.forEach((defaultItem) => {
      const exists = merged.some(
        (item) => Number(item.id) === Number(defaultItem.id)
      );

      if (!exists) {
        merged.push(defaultItem);
      }
    });

    merged.sort((a, b) => Number(a.id) - Number(b.id));

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(merged)
    );

    return merged;
  } catch (error) {
    console.error("Gagal membaca data siswa:", error);

    const defaultData = getDefaultSiswa();

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultData)
    );

    return defaultData;
  }
};

// =========================================================
// SAVE DATA
// =========================================================
const saveSiswa = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  }
};

// =========================================================
// COMPONENT
// =========================================================
export default function AdminSiswaPage() {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [siswa, setSiswa] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  // =========================================================
  // INITIAL LOAD
  // =========================================================
  useEffect(() => {
    setSiswa(loadSiswa());
  }, []);

  // =========================================================
  // DELETE
  // =========================================================
  const handleDelete = (id, nama) => {
    if (
      !window.confirm(
        `Yakin ingin menghapus siswa "${nama}"?`
      )
    ) {
      return;
    }

    const updated = siswa.filter(
      (item) => item.id !== id
    );

    setSiswa(updated);
    saveSiswa(updated);

    alert(`Siswa "${nama}" berhasil dihapus!`);
  };

  // =========================================================
  // SEARCH
  // =========================================================
  const filtered = siswa.filter((s) => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return true;

    return (
      s.nama.toLowerCase().includes(keyword) ||
      s.nis.toLowerCase().includes(keyword) ||
      s.kelas.toLowerCase().includes(keyword) ||
      s.email.toLowerCase().includes(keyword)
    );
  });

  // =========================================================
  // STATISTICS
  // =========================================================
  const totalSiswa = siswa.length;

  const totalAktif = siswa.filter(
    (s) => s.status === "Aktif"
  ).length;

  const totalNonaktif = siswa.filter(
    (s) => s.status !== "Aktif"
  ).length;

  const totalKelas = new Set(
    siswa.map((s) => s.kelas)
  ).size;

  // =========================================================
  // INITIALS
  // =========================================================
  const getInitials = (nama) => {
    if (!nama) return "??";

    const parts = nama.trim().split(" ");

    if (parts.length >= 2) {
      return (
        parts[0][0] + parts[1][0]
      ).toUpperCase();
    }

    return nama
      .substring(0, 2)
      .toUpperCase();
  };

  // =========================================================
  // AVATAR COLOR
  // =========================================================
  const getAvatarColor = (nama) => {
    const colors = [
      "bg-blue-500",
      "bg-emerald-500",
      "bg-amber-500",
      "bg-rose-500",
      "bg-indigo-500",
      "bg-purple-500",
      "bg-cyan-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-teal-500",
    ];

    return colors[
      nama.length % colors.length
    ];
  };

  // =========================================================
  // REFRESH
  // =========================================================
  const handleRefresh = () => {
    const data = loadSiswa();
    setSiswa(data);
  };

  // =========================================================
  // RESET DATA DEMO
  // =========================================================
  const handleResetData = () => {
    const confirmReset = window.confirm(
      "Reset data siswa ke data demo 30 siswa?"
    );

    if (!confirmReset) return;

    const defaultData = getDefaultSiswa();

    saveSiswa(defaultData);
    setSiswa(defaultData);

    alert(
      "Data siswa berhasil direset menjadi 30 data."
    );
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* =====================================================
          SIDEBAR
      ===================================================== */}
      <Sidebar
        active="siswa"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      {/* =====================================================
          MAIN AREA
      ===================================================== */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          toggleSidebar={() =>
            setIsCollapsed(!isCollapsed)
          }
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email: "admin@smartschool.com",
            avatar: "AD",
          }}
        />

        {/* ===================================================
            CONTENT
        =================================================== */}
        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="w-full px-3 py-4 sm:px-4 md:px-6 lg:px-8 xl:px-10">
            <div className="w-full space-y-5">
              {/* =================================================
                  HEADER
              ================================================= */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-200">
                    <Users size={21} />
                  </div>

                  <div className="min-w-0">
                    <h1 className="truncate text-xl font-semibold text-slate-800 sm:text-2xl">
                      Data Siswa
                    </h1>

                    <p className="text-xs text-slate-500 sm:text-sm">
                      Data induk peserta didik
                    </p>
                  </div>
                </div>

                {/* ACTION */}
                <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
                  

                  <button
                    onClick={handleResetData}
                    className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:shadow-sm"
                    title="Reset data demo"
                  >
                    <RefreshCw size={16} />

                    <span className="hidden sm:inline">
                      Reset 
                    </span>
                  </button>

                  <button
                    onClick={() => setShowModal(true)}
                    className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-4 text-sm font-medium text-white shadow-sm transition hover:shadow-lg hover:shadow-blue-200 sm:flex-none"
                  >
                    <Plus size={18} />

                    <span>
                      Tambah Siswa
                    </span>
                  </button>
                </div>
              </div>

              {/* =================================================
                  STATISTICS
              ================================================= */}
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {/* TOTAL */}
                <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Users size={16} />
                    </div>

                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      Total Siswa
                    </p>
                  </div>

                  <p className="mt-1 text-2xl font-bold text-slate-800">
                    {totalSiswa}
                  </p>
                </div>

                {/* AKTIF */}
                <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <CheckCircle size={16} />
                    </div>

                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      Aktif
                    </p>
                  </div>

                  <p className="mt-1 text-2xl font-bold text-emerald-600">
                    {totalAktif}
                  </p>
                </div>

                {/* NONAKTIF */}
                <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                      <XCircle size={16} />
                    </div>

                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      Nonaktif
                    </p>
                  </div>

                  <p className="mt-1 text-2xl font-bold text-rose-600">
                    {totalNonaktif}
                  </p>
                </div>

                {/* KELAS */}
                <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <Users size={16} />
                    </div>

                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      Kelas
                    </p>
                  </div>

                  <p className="mt-1 text-2xl font-bold text-indigo-600">
                    {totalKelas}
                  </p>
                </div>
              </div>

              {/* =================================================
                  SEARCH
              ================================================= */}
              <div className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm sm:p-4">
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    placeholder="Cari nama, NIS, kelas, atau email..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {search && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-slate-400">
                      Menampilkan{" "}
                      <span className="font-semibold text-slate-600">
                        {filtered.length}
                      </span>{" "}
                      dari{" "}
                      <span className="font-semibold text-slate-600">
                        {totalSiswa}
                      </span>{" "}
                      siswa
                    </p>

                    <button
                      onClick={() => setSearch("")}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700"
                    >
                      Hapus pencarian
                    </button>
                  </div>
                )}
              </div>

              {/* =================================================
                  TABLE CARD
              ================================================= */}
              <div className="w-full overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
                {/* TABLE WRAPPER */}
                <div className="w-full overflow-x-auto">
                  <table className="w-full min-w-[760px] table-auto">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        <th className="w-[32%] whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Profil
                        </th>

                        <th className="w-[12%] whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                          NIS
                        </th>

                        <th className="w-[14%] whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Kelas
                        </th>

                        <th className="w-[17%] whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Email
                        </th>

                        <th className="w-[11%] whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Status
                        </th>

                        <th className="w-[14%] whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Aksi
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {filtered.map((item) => (
                        <tr
                          key={item.id}
                          className="group transition-colors hover:bg-slate-50/70"
                        >
                          {/* PROFIL */}
                          <td className="px-4 py-4">
                            <div className="flex min-w-0 items-center gap-3">
                              <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getAvatarColor(
                                  item.nama
                                )} text-sm font-bold text-white shadow-sm`}
                              >
                                {getInitials(item.nama)}
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-800">
                                  {item.nama}
                                </p>

                                <p className="truncate text-xs text-slate-400">
                                  {item.gender === "L"
                                    ? "Laki-laki"
                                    : "Perempuan"}
                                  {" · "}
                                  {item.nis}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* NIS */}
                          <td className="px-4 py-4">
                            <span className="whitespace-nowrap text-sm text-slate-600">
                              {item.nis}
                            </span>
                          </td>

                          {/* KELAS */}
                          <td className="px-4 py-4">
                            <span className="inline-flex whitespace-nowrap rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
                              {item.kelas}
                            </span>
                          </td>

                          {/* EMAIL */}
                          <td className="px-4 py-4">
                            <span className="block max-w-[220px] truncate text-sm text-slate-500">
                              {item.email}
                            </span>
                          </td>

                          {/* STATUS */}
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${
                                item.status === "Aktif"
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                                  : "border-rose-200 bg-rose-50 text-rose-600"
                              }`}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-current" />

                              {item.status}
                            </span>
                          </td>

                          {/* ACTION */}
                          <td className="px-4 py-4">
                            <div className="flex justify-end gap-1.5">
                              {/* DETAIL */}
                              <button
                                onClick={() =>
                                  router.push(
                                    `/admin/siswa/${item.id}`
                                  )
                                }
                                className="rounded-lg p-2 text-slate-400 transition-all hover:bg-blue-50 hover:text-blue-600 hover:shadow-sm"
                                title="Lihat Profil"
                              >
                                <Eye size={17} />
                              </button>

                              {/* EDIT */}
                              <button
                                onClick={() =>
                                  router.push(
                                    `/admin/siswa/edit/${item.id}`
                                  )
                                }
                                className="rounded-lg p-2 text-slate-400 transition-all hover:bg-amber-50 hover:text-amber-600 hover:shadow-sm"
                                title="Edit Siswa"
                              >
                                <Edit size={17} />
                              </button>

                              {/* DELETE */}
                              <button
                                onClick={() =>
                                  handleDelete(
                                    item.id,
                                    item.nama
                                  )
                                }
                                className="rounded-lg p-2 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-600 hover:shadow-sm"
                                title="Hapus Siswa"
                              >
                                <Trash2 size={17} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* EMPTY STATE */}
                {filtered.length === 0 && (
                  <div className="p-10 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                      <Users
                        size={28}
                        className="text-slate-300"
                      />
                    </div>

                    <p className="text-sm font-semibold text-slate-600">
                      Tidak ada data siswa
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {search
                        ? "Coba ubah kata pencarian"
                        : "Silakan tambahkan siswa baru"}
                    </p>

                    {!search && (
                      <button
                        onClick={() =>
                          setShowModal(true)
                        }
                        className="mt-4 text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
                      >
                        Tambah siswa pertama →
                      </button>
                    )}
                  </div>
                )}

                {/* TABLE FOOTER */}
                {filtered.length > 0 && (
                  <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-400">
                      Menampilkan{" "}
                      <span className="font-semibold text-slate-600">
                        {filtered.length}
                      </span>{" "}
                      data siswa
                    </p>

                    <p className="text-xs text-slate-400">
                      Total{" "}
                      <span className="font-semibold text-slate-600">
                        {totalSiswa}
                      </span>{" "}
                      siswa
                    </p>
                  </div>
                )}
              </div>

              {/* =================================================
                  FOOTER
              ================================================= */}
              <footer className="border-t border-slate-200/60 py-4 text-center text-[11px] text-slate-400">
                © 2026 SmartSchool • Data Siswa
              </footer>
            </div>
          </div>
        </main>
      </div>

      {/* =====================================================
          MODAL TAMBAH SISWA
      ===================================================== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* MODAL HEADER */}
            <div className="border-b border-slate-100 p-6">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <UserPlus size={28} />
                </div>

                <h3 className="text-xl font-bold text-slate-800">
                  Tambah Siswa
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Pilih metode penambahan siswa
                </p>
              </div>
            </div>

            {/* OPTIONS */}
            <div className="space-y-3 p-6">
              {/* FORM */}
              <button
                onClick={() => {
                  setShowModal(false);
                  router.push(
                    "/admin/siswa/tambah?mode=form"
                  );
                }}
                className="group flex w-full items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition-all hover:border-blue-300 hover:bg-blue-50/50"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
                  <User size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-700">
                    Form Biasa
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Isi data siswa secara manual
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="shrink-0 text-slate-300 transition group-hover:text-blue-500"
                />
              </button>

              {/* IMPORT */}
              <button
                onClick={() => {
                  setShowModal(false);
                  router.push(
                    "/admin/siswa/tambah?mode=import"
                  );
                }}
                className="group flex w-full items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition-all hover:border-indigo-300 hover:bg-indigo-50/50"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-100">
                  <Upload size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-700">
                    Import Data
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Upload file Excel atau CSV
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="shrink-0 text-slate-300 transition group-hover:text-indigo-500"
                />
              </button>

              {/* CANCEL */}
              <button
                onClick={() => setShowModal(false)}
                className="mt-1 w-full rounded-xl py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}