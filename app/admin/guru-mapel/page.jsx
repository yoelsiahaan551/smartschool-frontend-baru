"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  Users,
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  RefreshCw,
  CheckCircle,
  XCircle,
  UserCheck,
  GraduationCap,
  Filter,
  ChevronDown,
  User,
  BookMarked,
} from "lucide-react";

// =========================================================
// DUMMY DATA - GURU & MATA PELAJARAN
// =========================================================
const dummyGuru = [
  {
    id: 1,
    nama: "Dr. Ahmad Fauzi, M.Pd.",
    nip: "198501012010011001",
    email: "ahmad@sekolah.com",
    phone: "081234567890",
    mapel: "Matematika",
    status: "aktif",
  },
  {
    id: 2,
    nama: "Siti Rahma, S.Pd.",
    nip: "198712152011012002",
    email: "siti@sekolah.com",
    phone: "081234567891",
    mapel: "Bahasa Indonesia",
    status: "aktif",
  },
  {
    id: 3,
    nama: "Budi Santoso, S.Si.",
    nip: "199003202012013003",
    email: "budi@sekolah.com",
    phone: "081234567892",
    mapel: "Fisika",
    status: "nonaktif",
  },
  {
    id: 4,
    nama: "Dewi Lestari, S.Pd.",
    nip: "199105152013014004",
    email: "dewi@sekolah.com",
    phone: "081234567893",
    mapel: "Biologi",
    status: "aktif",
  },
  {
    id: 5,
    nama: "Eko Prasetyo, S.Kom.",
    nip: "198706102014015005",
    email: "eko@sekolah.com",
    phone: "081234567894",
    mapel: "Pemrograman Dasar",
    status: "aktif",
  },
  {
    id: 6,
    nama: "Rina Sari, S.Pd.",
    nip: "199202152015016006",
    email: "rina@sekolah.com",
    phone: "081234567895",
    mapel: "Bahasa Inggris",
    status: "aktif",
  },
];

const dummyMapel = [
  { id: 1, nama: "Matematika", kode: "MATH" },
  { id: 2, nama: "Bahasa Indonesia", kode: "BIN" },
  { id: 3, nama: "Fisika", kode: "FIS" },
  { id: 4, nama: "Biologi", kode: "BIO" },
  { id: 5, nama: "Pemrograman Dasar", kode: "PROG" },
  { id: 6, nama: "Bahasa Inggris", kode: "BIG" },
  { id: 7, nama: "Kimia", kode: "KIM" },
  { id: 8, nama: "Sejarah", kode: "SEJ" },
  { id: 9, nama: "Geografi", kode: "GEO" },
  { id: 10, nama: "Ekonomi", kode: "EKO" },
];

const dummyKelas = [
  { id: 1, nama: "X RPL 1", jenjang: "X" },
  { id: 2, nama: "X RPL 2", jenjang: "X" },
  { id: 3, nama: "X TKJ 1", jenjang: "X" },
  { id: 4, nama: "XI RPL 1", jenjang: "XI" },
  { id: 5, nama: "XI TKJ 1", jenjang: "XI" },
  { id: 6, nama: "XII RPL 1", jenjang: "XII" },
  { id: 7, nama: "XII RPL 2", jenjang: "XII" },
];

// Assignments: guru_id -> mapel_id -> kelas_id
const dummyAssignments = [
  { id: 1, guru_id: 1, mapel_id: 1, kelas_id: 1 },
  { id: 2, guru_id: 1, mapel_id: 1, kelas_id: 4 },
  { id: 3, guru_id: 2, mapel_id: 2, kelas_id: 1 },
  { id: 4, guru_id: 3, mapel_id: 3, kelas_id: 3 },
  { id: 5, guru_id: 5, mapel_id: 5, kelas_id: 1 },
  { id: 6, guru_id: 6, mapel_id: 6, kelas_id: 2 },
];

// =========================================================
// MAIN COMPONENT
// =========================================================
export default function AdminGuruMapelPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [guru, setGuru] = useState(dummyGuru);
  const [mapel] = useState(dummyMapel);
  const [kelas] = useState(dummyKelas);
  const [assignments, setAssignments] = useState(dummyAssignments);
  const [search, setSearch] = useState("");
  const [filterMapel, setFilterMapel] = useState("Semua");
  const [filterKelas, setFilterKelas] = useState("Semua");

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // =========================================================
  // FILTER
  // =========================================================
  const filtered = assignments.filter((a) => {
    const guruItem = guru.find((g) => g.id === a.guru_id);
    const mapelItem = mapel.find((m) => m.id === a.mapel_id);
    const kelasItem = kelas.find((k) => k.id === a.kelas_id);
    const matchSearch =
      (guruItem?.nama || "").toLowerCase().includes(search.toLowerCase()) ||
      (mapelItem?.nama || "").toLowerCase().includes(search.toLowerCase()) ||
      (kelasItem?.nama || "").toLowerCase().includes(search.toLowerCase());
    const matchMapel = filterMapel === "Semua" || a.mapel_id === parseInt(filterMapel);
    const matchKelas = filterKelas === "Semua" || a.kelas_id === parseInt(filterKelas);
    return matchSearch && matchMapel && matchKelas;
  });

  // =========================================================
  // HANDLER HAPUS
  // =========================================================
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus assign ini?");
    if (!confirmDelete) return;

    setAssignments((prev) => prev.filter((a) => a.id !== id));
    alert("Assign berhasil dihapus!");
  };

  // =========================================================
  // STATISTICS
  // =========================================================
  const totalGuru = guru.filter((g) => g.status === "aktif").length;
  const totalMapel = mapel.length;
  const totalAssign = assignments.length;
  const totalKelas = kelas.length;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        active="guru"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full p-4 md:p-6 lg:p-8">
            <div className="w-full space-y-5">
              {/* ===== HEADER ===== */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200 flex-shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-slate-800">
                      Kelola Guru &amp; Mapel
                    </h1>
                    <p className="text-sm text-slate-500">
                      Assign guru ke mata pelajaran di kelas tertentu
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => window.location.reload()}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all hover:shadow-sm"
                    title="Refresh"
                  >
                    <RefreshCw size={17} className="text-slate-500" />
                  </button>
                  <Link
                    href="/admin/guru-mapel/tambah"
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all shadow-sm font-medium"
                  >
                    <Plus size={18} /> Assign Guru
                  </Link>
                </div>
              </div>

              {/* ===== STATISTICS ===== */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                      <UserCheck size={16} />
                    </div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                      Guru Aktif
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{totalGuru}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                      <BookOpen size={16} />
                    </div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                      Mapel
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-purple-600 mt-1">{totalMapel}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                      <CheckCircle size={16} />
                    </div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                      Total Assign
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">{totalAssign}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                      <GraduationCap size={16} />
                    </div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                      Kelas
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600 mt-1">{totalKelas}</p>
                </div>
              </div>

              {/* ===== SEARCH & FILTER ===== */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari guru, mapel, atau kelas..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition placeholder:text-slate-400"
                    />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Filter size={17} className="text-slate-400" />
                    <select
                      value={filterMapel}
                      onChange={(e) => setFilterMapel(e.target.value)}
                      className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-600 min-w-[130px] cursor-pointer"
                    >
                      <option value="Semua">Semua Mapel</option>
                      {mapel.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.nama}
                        </option>
                      ))}
                    </select>
                    <select
                      value={filterKelas}
                      onChange={(e) => setFilterKelas(e.target.value)}
                      className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-600 min-w-[130px] cursor-pointer"
                    >
                      <option value="Semua">Semua Kelas</option>
                      {kelas.map((k) => (
                        <option key={k.id} value={k.id}>
                          {k.nama}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        setSearch("");
                        setFilterMapel("Semua");
                        setFilterKelas("Semua");
                      }}
                      className="px-3 py-2.5 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors whitespace-nowrap"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* ===== ASSIGNMENT LIST ===== */}
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[25%]">
                          Guru
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[20%]">
                          Mata Pelajaran
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[20%]">
                          Kelas
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[15%]">
                          Status
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[20%]">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filtered.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center">
                            <div className="flex justify-center mb-3">
                              <div className="p-4 rounded-full bg-blue-50">
                                <BookOpen size={40} className="text-blue-300" />
                              </div>
                            </div>
                            <p className="text-sm font-medium text-slate-600">
                              Belum ada assign guru
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                              {search || filterMapel !== "Semua" || filterKelas !== "Semua"
                                ? "Coba ubah filter pencarian"
                                : "Klik 'Assign Guru' untuk menambahkan"}
                            </p>
                          </td>
                        </tr>
                      ) : (
                        filtered.map((a) => {
                          const guruItem = guru.find((g) => g.id === a.guru_id);
                          const mapelItem = mapel.find((m) => m.id === a.mapel_id);
                          const kelasItem = kelas.find((k) => k.id === a.kelas_id);
                          const isActive = guruItem?.status === "aktif";
                          return (
                            <tr key={a.id} className="hover:bg-slate-50/60 transition-colors">
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="p-1.5 rounded-full bg-blue-50 text-blue-600">
                                    <User size={16} />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-slate-800 text-sm">
                                      {guruItem?.nama || "-"}
                                    </p>
                                    <p className="text-xs text-slate-400">{guruItem?.nip || "-"}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-200 text-xs font-medium">
                                  <BookMarked size={13} />
                                  {mapelItem?.nama || "-"}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 text-xs font-medium">
                                  <GraduationCap size={13} />
                                  {kelasItem?.nama || "-"}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <span
                                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
                                    isActive
                                      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                      : "bg-slate-100 text-slate-400 border-slate-200"
                                  }`}
                                >
                                  {isActive ? (
                                    <CheckCircle size={12} />
                                  ) : (
                                    <XCircle size={12} />
                                  )}
                                  {isActive ? "Aktif" : "Nonaktif"}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <div className="flex justify-end gap-1.5">
                                  <Link
                                    href={`/admin/guru-mapel/edit/${a.id}`}
                                    className="p-2 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600 transition-all hover:shadow-sm"
                                    title="Edit Assign"
                                  >
                                    <Edit size={17} />
                                  </Link>
                                  <button
                                    onClick={() => handleDelete(a.id)}
                                    className="p-2 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all hover:shadow-sm"
                                    title="Hapus Assign"
                                  >
                                    <Trash2 size={17} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <footer className="text-center text-[11px] text-slate-400 py-3 border-t border-slate-200/60">
                © 2026 SmartSchool • Kelola Guru &amp; Mapel
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}