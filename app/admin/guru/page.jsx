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
  UserPlus,
  ChevronRight,
} from "lucide-react";

// =========================================================
// STORAGE
// =========================================================

const STORAGE_KEY = "guru_data";

// =========================================================
// DEFAULT DATA
// =========================================================

const getDefaultGuru = () => {
  return [
    {
      id: 1,
      nama: "Dr. Ahmad Fauzi, M.Pd.",
      nip: "198501012010011001",
      mapel: "Matematika",
      email: "ahmad@sekolah.com",
      phone: "081234567890",
      status: "Aktif",
      alamat: "Jl. Merdeka No. 10, Jakarta",
      tglLahir: "1985-01-01",
      gender: "L",
      joinDate: "2010-01-01",
    },
    {
      id: 2,
      nama: "Siti Rahma, S.Pd.",
      nip: "198712152011012002",
      mapel: "Bahasa Indonesia",
      email: "siti@sekolah.com",
      phone: "081234567891",
      status: "Aktif",
      alamat: "Jl. Sudirman No. 5, Jakarta",
      tglLahir: "1987-12-15",
      gender: "P",
      joinDate: "2011-01-01",
    },
    {
      id: 3,
      nama: "Budi Santoso, S.Si.",
      nip: "199003202012013003",
      mapel: "Fisika",
      email: "budi@sekolah.com",
      phone: "081234567892",
      status: "Nonaktif",
      alamat: "Jl. Diponegoro No. 8, Jakarta",
      tglLahir: "1990-03-20",
      gender: "L",
      joinDate: "2012-01-01",
    },
    {
      id: 4,
      nama: "Dewi Lestari, S.Pd.",
      nip: "199105152013014004",
      mapel: "Biologi",
      email: "dewi@sekolah.com",
      phone: "081234567893",
      status: "Aktif",
      alamat: "Jl. Gatot Subroto No. 12, Jakarta",
      tglLahir: "1991-05-15",
      gender: "P",
      joinDate: "2013-01-01",
    },
    {
      id: 5,
      nama: "Eko Prasetyo, S.Pd.",
      nip: "198801012010011005",
      mapel: "Kimia",
      email: "eko@sekolah.com",
      phone: "081234567894",
      status: "Aktif",
      alamat: "Jl. Ahmad Yani No. 15, Jakarta",
      tglLahir: "1988-01-01",
      gender: "L",
      joinDate: "2010-01-01",
    },
    {
      id: 6,
      nama: "Rina Wulandari, S.Pd.",
      nip: "199202102014022006",
      mapel: "Bahasa Inggris",
      email: "rina@sekolah.com",
      phone: "081234567895",
      status: "Aktif",
      alamat: "Jl. Kuningan No. 20, Jakarta",
      tglLahir: "1992-02-10",
      gender: "P",
      joinDate: "2014-02-01",
    },
    {
      id: 7,
      nama: "Andi Wijaya, S.Kom.",
      nip: "198906122015031007",
      mapel: "Informatika",
      email: "andi@sekolah.com",
      phone: "081234567896",
      status: "Aktif",
      alamat: "Jl. Kemang No. 25, Jakarta",
      tglLahir: "1989-06-12",
      gender: "L",
      joinDate: "2015-03-01",
    },
    {
      id: 8,
      nama: "Maya Sari, S.Pd.",
      nip: "199310182016042008",
      mapel: "IPS",
      email: "maya@sekolah.com",
      phone: "081234567897",
      status: "Aktif",
      alamat: "Jl. Tebet No. 30, Jakarta",
      tglLahir: "1993-10-18",
      gender: "P",
      joinDate: "2016-04-01",
    },
    {
      id: 9,
      nama: "Fajar Nugroho, S.Pd.",
      nip: "198707252011012009",
      mapel: "PJOK",
      email: "fajar@sekolah.com",
      phone: "081234567898",
      status: "Nonaktif",
      alamat: "Jl. Cempaka No. 10, Jakarta",
      tglLahir: "1987-07-25",
      gender: "L",
      joinDate: "2011-01-01",
    },
    {
      id: 10,
      nama: "Lina Marlina, S.Pd.",
      nip: "199112202013014010",
      mapel: "Seni Budaya",
      email: "lina@sekolah.com",
      phone: "081234567899",
      status: "Aktif",
      alamat: "Jl. Melati No. 17, Jakarta",
      tglLahir: "1991-12-20",
      gender: "P",
      joinDate: "2013-01-01",
    },
  ];
};

// =========================================================
// LOCAL STORAGE
// =========================================================

const loadGuru = () => {
  if (typeof window === "undefined") {
    return getDefaultGuru();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      const defaultData = getDefaultGuru();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
      return defaultData;
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error("Gagal membaca data guru:", error);
    return getDefaultGuru();
  }
};

const saveGuru = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

// =========================================================
// PAGE
// =========================================================

export default function AdminGuruPage() {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [guru, setGuru] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  // =======================================================
  // LOAD DATA
  // =======================================================

  useEffect(() => {
    setGuru(loadGuru());
  }, []);

  // =======================================================
  // DELETE
  // =======================================================

  const handleDelete = (id, nama) => {
    const confirmed = window.confirm(
      `Yakin ingin menghapus guru "${nama}"?`
    );

    if (!confirmed) return;

    const updated = guru.filter((item) => item.id !== id);

    setGuru(updated);
    saveGuru(updated);

    alert(`Guru "${nama}" berhasil dihapus!`);
  };

  // =======================================================
  // REFRESH
  // =======================================================

  const handleRefresh = () => {
    const data = loadGuru();
    setGuru(data);
  };

  // =======================================================
  // SEARCH
  // =======================================================

  const filtered = guru.filter((g) => {
    const keyword = search.toLowerCase();

    return (
      g.nama.toLowerCase().includes(keyword) ||
      g.nip.includes(search) ||
      g.mapel.toLowerCase().includes(keyword) ||
      g.email.toLowerCase().includes(keyword)
    );
  });

  // =======================================================
  // STATISTICS
  // =======================================================

  const totalGuru = guru.length;

  const totalAktif = guru.filter(
    (g) => g.status === "Aktif"
  ).length;

  const totalNonaktif = guru.filter(
    (g) => g.status !== "Aktif"
  ).length;

  const totalMapel = new Set(
    guru.map((g) => g.mapel)
  ).size;

  // =======================================================
  // INITIAL
  // =======================================================

  const getInitials = (nama) => {
    if (!nama) return "GU";

    const cleanName = nama
      .replace(/,.*$/, "")
      .trim();

    const parts = cleanName.split(" ");

    if (parts.length >= 2) {
      return (
        parts[0][0] + parts[1][0]
      ).toUpperCase();
    }

    return cleanName
      .substring(0, 2)
      .toUpperCase();
  };

  // =======================================================
  // AVATAR COLOR
  // =======================================================

  const getAvatarColor = (nama) => {
    const colors = [
      "bg-blue-600",
      "bg-indigo-600",
      "bg-sky-600",
      "bg-violet-600",
      "bg-cyan-600",
      "bg-blue-500",
      "bg-indigo-500",
      "bg-slate-600",
    ];

    const index =
      nama.length % colors.length;

    return colors[index];
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar
        active="guru"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      {/* =================================================
          MAIN WRAPPER
      ================================================= */}

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">

        {/* HEADER */}

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

        {/* =================================================
            CONTENT
        ================================================= */}

        <main className="flex-1 overflow-y-auto">

          <div className="w-full p-4 md:p-6 lg:p-8">

            <div className="w-full space-y-5">

              {/* =================================================
                  PAGE HEADER
              ================================================= */}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div className="flex items-center gap-3">

                  {/* ICON */}

                  <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-200">
                    <Users size={21} />
                  </div>

                  {/* TITLE */}

                  <div>

                    <h1 className="text-xl font-semibold text-slate-800">
                      Data Guru
                    </h1>

                    <p className="text-sm text-slate-500">
                      Data induk tenaga pendidik
                    </p>

                  </div>

                </div>

                {/* ACTION */}

                <div className="flex items-center gap-2">

                  {/* REFRESH */}

                  <button
                    onClick={handleRefresh}
                    className="
                      p-2.5
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-slate-500
                      hover:text-blue-600
                      hover:bg-blue-50
                      hover:border-blue-200
                      transition-all
                    "
                    title="Refresh data"
                  >
                    <RefreshCw size={17} />
                  </button>

                  {/* TAMBAH */}

                  <button
                    onClick={() =>
                      setShowModal(true)
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      px-5
                      py-2.5
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      rounded-xl
                      transition-all
                      shadow-sm
                      hover:shadow-md
                      hover:shadow-blue-200
                      font-medium
                    "
                  >
                    <Plus size={18} />

                    <span>
                      Tambah Guru
                    </span>
                  </button>

                </div>

              </div>

              {/* =================================================
                  STATISTICS
              ================================================= */}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

                {/* TOTAL */}

                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">

                  <div className="flex items-center gap-2">

                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                      <Users size={16} />
                    </div>

                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                      Total Guru
                    </p>

                  </div>

                  <p className="text-2xl font-bold text-slate-800 mt-1">
                    {totalGuru}
                  </p>

                </div>

                {/* AKTIF */}

                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">

                  <div className="flex items-center gap-2">

                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                      <CheckCircle size={16} />
                    </div>

                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                      Aktif
                    </p>

                  </div>

                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    {totalAktif}
                  </p>

                </div>

                {/* NONAKTIF */}

                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">

                  <div className="flex items-center gap-2">

                    <div className="p-1.5 rounded-lg bg-rose-50 text-rose-500">
                      <XCircle size={16} />
                    </div>

                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                      Nonaktif
                    </p>

                  </div>

                  <p className="text-2xl font-bold text-rose-500 mt-1">
                    {totalNonaktif}
                  </p>

                </div>

                {/* MAPEL */}

                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">

                  <div className="flex items-center gap-2">

                    <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                      <Users size={16} />
                    </div>

                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                      Mapel
                    </p>

                  </div>

                  <p className="text-2xl font-bold text-indigo-600 mt-1">
                    {totalMapel}
                  </p>

                </div>

              </div>

              {/* =================================================
                  SEARCH
              ================================================= */}

              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">

                <div className="relative">

                  <Search
                    size={17}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    type="text"
                    placeholder="Cari nama, NIP, atau mata pelajaran..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    className="
                      w-full
                      pl-10
                      pr-4
                      py-2.5
                      text-sm
                      text-slate-700
                      bg-slate-50
                      border
                      border-slate-200
                      rounded-xl
                      placeholder:text-slate-400
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500/20
                      focus:border-blue-400
                      transition
                    "
                  />

                </div>

              </div>

              {/* =================================================
                  TABLE
              ================================================= */}

              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">

                <div className="overflow-x-auto">

                  <table className="w-full table-auto">

                    {/* HEADER */}

                    <thead>

                      <tr className="border-b border-slate-200 bg-slate-50/80">

                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[28%]">
                          Profil
                        </th>

                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[15%]">
                          NIP
                        </th>

                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[12%]">
                          Mapel
                        </th>

                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[15%] hidden md:table-cell">
                          Email
                        </th>

                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[10%]">
                          Status
                        </th>

                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[20%]">
                          Aksi
                        </th>

                      </tr>

                    </thead>

                    {/* BODY */}

                    <tbody className="divide-y divide-slate-100">

                      {filtered.map((item) => (

                        <tr
                          key={item.id}
                          className="hover:bg-slate-50/70 transition-colors"
                        >

                          {/* PROFIL */}

                          <td className="px-4 py-4">

                            <div className="flex items-center gap-3">

                              <div
                                className={`
                                  w-10
                                  h-10
                                  rounded-full
                                  ${getAvatarColor(item.nama)}
                                  flex
                                  items-center
                                  justify-center
                                  text-white
                                  font-bold
                                  text-sm
                                  shadow-sm
                                  flex-shrink-0
                                `}
                              >
                                {getInitials(item.nama)}
                              </div>

                              <div className="min-w-0">

                                <p className="font-semibold text-slate-800 text-sm truncate">
                                  {item.nama}
                                </p>

                                <p className="text-xs text-slate-400 truncate">
                                  {item.mapel} · {item.nip}
                                </p>

                              </div>

                            </div>

                          </td>

                          {/* NIP */}

                          <td className="px-4 py-4">

                            <span className="text-sm text-slate-600 whitespace-nowrap">
                              {item.nip}
                            </span>

                          </td>

                          {/* MAPEL */}

                          <td className="px-4 py-4">

                            <span className="text-sm text-slate-600">
                              {item.mapel}
                            </span>

                          </td>

                          {/* EMAIL */}

                          <td className="px-4 py-4 hidden md:table-cell">

                            <span className="text-sm text-slate-500 break-all">
                              {item.email}
                            </span>

                          </td>

                          {/* STATUS */}

                          <td className="px-4 py-4">

                            <span
                              className={`
                                inline-flex
                                items-center
                                gap-1.5
                                text-xs
                                font-medium
                                px-2.5
                                py-1
                                rounded-full
                                border
                                whitespace-nowrap
                                ${
                                  item.status === "Aktif"
                                    ? "bg-blue-50 text-blue-600 border-blue-200"
                                    : "bg-rose-50 text-rose-600 border-rose-200"
                                }
                              `}
                            >

                              <span className="w-1.5 h-1.5 rounded-full bg-current" />

                              {item.status}

                            </span>

                          </td>

                          {/* AKSI */}

                          <td className="px-4 py-4">

                            <div className="flex justify-end gap-1.5">

                              {/* VIEW */}

                              <button
                                onClick={() =>
                                  router.push(
                                    `/admin/guru/${item.id}`
                                  )
                                }
                                className="
                                  p-2
                                  rounded-lg
                                  text-slate-400
                                  hover:bg-blue-50
                                  hover:text-blue-600
                                  transition-all
                                "
                                title="Lihat Profil"
                              >
                                <Eye size={17} />
                              </button>

                              {/* EDIT */}

                              <button
                                onClick={() =>
                                  router.push(
                                    `/admin/guru/edit/${item.id}`
                                  )
                                }
                                className="
                                  p-2
                                  rounded-lg
                                  text-slate-400
                                  hover:bg-amber-50
                                  hover:text-amber-600
                                  transition-all
                                "
                                title="Edit Guru"
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
                                className="
                                  p-2
                                  rounded-lg
                                  text-slate-400
                                  hover:bg-rose-50
                                  hover:text-rose-600
                                  transition-all
                                "
                                title="Hapus Guru"
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

                {/* EMPTY */}

                {filtered.length === 0 && (

                  <div className="p-10 text-center">

                    <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mx-auto mb-3">

                      <Users size={24} />

                    </div>

                    <p className="text-sm font-medium text-slate-600">
                      Tidak ada data guru
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {search
                        ? "Coba ubah kata pencarian"
                        : "Silakan tambahkan guru baru"}
                    </p>

                    {!search && (

                      <button
                        onClick={() =>
                          setShowModal(true)
                        }
                        className="
                          mt-3
                          text-sm
                          text-blue-600
                          font-medium
                          hover:text-blue-700
                          hover:underline
                        "
                      >
                        Tambah guru pertama →
                      </button>

                    )}

                  </div>

                )}

              </div>

              {/* FOOTER */}

              <footer className="text-center text-[11px] text-slate-400 py-3 border-t border-slate-200/60">
                © 2026 SmartSchool • Data Guru
              </footer>

            </div>

          </div>

        </main>

      </div>

      {/* =====================================================
          MODAL TAMBAH GURU
      ===================================================== */}

      {showModal && (

        <div
          className="
            fixed
            inset-0
            bg-slate-900/40
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-50
            p-4
          "
          onClick={() =>
            setShowModal(false)
          }
        >

          <div
            className="
              bg-white
              rounded-2xl
              shadow-2xl
              max-w-md
              w-full
              p-6
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="text-center mb-6">

              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">

                <UserPlus size={28} />

              </div>

              <h3 className="text-xl font-bold text-slate-800">
                Tambah Guru
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Pilih metode penambahan guru
              </p>

            </div>

            {/* OPTIONS */}

            <div className="space-y-3">

              {/* FORM */}

              <button
                onClick={() => {
                  setShowModal(false);

                  router.push(
                    "/admin/guru/tambah?mode=form"
                  );
                }}
                className="
                  w-full
                  flex
                  items-center
                  gap-4
                  p-4
                  border
                  border-slate-200
                  rounded-xl
                  hover:border-blue-300
                  hover:bg-blue-50/50
                  transition-all
                  group
                "
              >

                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition">

                  <User size={20} />

                </div>

                <div className="flex-1 text-left">

                  <p className="font-semibold text-slate-700">
                    Form Biasa
                  </p>

                  <p className="text-xs text-slate-400 mt-0.5">
                    Isi data guru secara manual
                  </p>

                </div>

                <ChevronRight
                  size={18}
                  className="
                    text-slate-300
                    group-hover:text-blue-500
                    transition
                  "
                />

              </button>

              {/* IMPORT */}

              <button
                onClick={() => {
                  setShowModal(false);

                  router.push(
                    "/admin/guru/tambah?mode=import"
                  );
                }}
                className="
                  w-full
                  flex
                  items-center
                  gap-4
                  p-4
                  border
                  border-slate-200
                  rounded-xl
                  hover:border-indigo-300
                  hover:bg-indigo-50/50
                  transition-all
                  group
                "
              >

                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition">

                  <Upload size={20} />

                </div>

                <div className="flex-1 text-left">

                  <p className="font-semibold text-slate-700">
                    Import Data
                  </p>

                  <p className="text-xs text-slate-400 mt-0.5">
                    Upload file Excel atau CSV
                  </p>

                </div>

                <ChevronRight
                  size={18}
                  className="
                    text-slate-300
                    group-hover:text-indigo-500
                    transition
                  "
                />

              </button>

            </div>

            {/* CANCEL */}

            <button
              onClick={() =>
                setShowModal(false)
              }
              className="
                mt-4
                w-full
                py-2.5
                text-sm
                text-slate-500
                hover:text-slate-700
                transition
              "
            >
              Batal
            </button>

          </div>

        </div>

      )}

    </div>
  );
}