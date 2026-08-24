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
} from "lucide-react";

// =========================================================
// DATA (localStorage)
// =========================================================
const STORAGE_KEY = "guru_data";

const getDefaultGuru = () => {
  // 30 data guru (saya singkat, tapi Anda bisa salin dari kode sebelumnya)
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
    // ... tambahkan sampai 30 data, atau gunakan dummy dari kode sebelumnya
  ];
};

const loadGuru = () => {
  if (typeof window === "undefined") return getDefaultGuru();
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getDefaultGuru()));
    return getDefaultGuru();
  }
  return JSON.parse(stored);
};

const saveGuru = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export default function AdminGuruPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [guru, setGuru] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false); // untuk pilihan tambah

  useEffect(() => {
    setGuru(loadGuru());
  }, []);

  const handleDelete = (id, nama) => {
    if (!window.confirm(`Yakin ingin menghapus guru "${nama}"?`)) return;
    const updated = guru.filter((item) => item.id !== id);
    setGuru(updated);
    saveGuru(updated);
    alert(`Guru "${nama}" berhasil dihapus!`);
  };

  const filtered = guru.filter((g) =>
    g.nama.toLowerCase().includes(search.toLowerCase()) ||
    g.nip.includes(search) ||
    g.mapel.toLowerCase().includes(search.toLowerCase())
  );

  const totalGuru = guru.length;
  const totalAktif = guru.filter((g) => g.status === "Aktif").length;
  const totalMapel = new Set(guru.map((g) => g.mapel)).size;

  // Fungsi untuk mengambil inisial nama (untuk avatar)
  const getInitials = (nama) => {
    const parts = nama.split(" ");
    if (parts.length >= 2) {
      return parts[0][0] + parts[1][0];
    }
    return nama.substring(0, 2).toUpperCase();
  };

  // Warna avatar berdasarkan huruf
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
    const index = nama.length % colors.length;
    return colors[index];
  };

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
          toggleSidebar={() => setIsCollapsed(!isCollapsed)}
          notifications={[]}
          user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full p-4 md:p-6 lg:p-8">
            <div className="w-full space-y-5">
              {/* HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-200 flex-shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-slate-800">Data Guru</h1>
                    <p className="text-sm text-slate-500">Data induk tenaga pendidik</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      setGuru(loadGuru());
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all hover:shadow-sm"
                    title="Refresh"
                  >
                    <RefreshCw size={17} className="text-slate-500" />
                  </button>
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-200 transition-all shadow-sm font-medium"
                  >
                    <Plus size={18} /> Tambah Guru
                  </button>
                </div>
              </div>

              {/* STATISTICS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600"><Users size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Total Guru</p>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{totalGuru}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600"><CheckCircle size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Aktif</p>
                  </div>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">{totalAktif}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600"><XCircle size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Nonaktif</p>
                  </div>
                  <p className="text-2xl font-bold text-rose-600 mt-1">{totalGuru - totalAktif}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600"><Users size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Mapel</p>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600 mt-1">{totalMapel}</p>
                </div>
              </div>

              {/* SEARCH */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="relative">
                  <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari nama, NIP, atau mata pelajaran..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm text-black bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition"
                  />
                </div>
              </div>

              {/* TABLE dengan kolom Profil */}
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[28%]">Profil</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[15%]">NIP</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[12%]">Mapel</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[15%] hidden md:table-cell">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[10%]">Status</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[20%]">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filtered.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full ${getAvatarColor(item.nama)} flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0`}>
                                {getInitials(item.nama)}
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-slate-800 text-sm truncate">{item.nama}</p>
                                <p className="text-xs text-slate-400 truncate">{item.mapel} · {item.nip}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-sm text-slate-600 whitespace-nowrap">{item.nip}</span>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-sm text-slate-600 break-words">{item.mapel}</span>
                          </td>
                          <td className="px-4 py-4 hidden md:table-cell">
                            <span className="text-sm text-slate-500 break-all">{item.email}</span>
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border whitespace-nowrap ${
                                item.status === "Aktif"
                                  ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                  : "bg-rose-50 text-rose-600 border-rose-200"
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex justify-end gap-1.5">
                              <button
                                onClick={() => router.push(`/admin/guru/${item.id}`)}
                                className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all hover:shadow-sm"
                                title="Lihat Profil"
                              >
                                <Eye size={17} />
                              </button>
                              <button
                                onClick={() => router.push(`/admin/guru/edit/${item.id}`)}
                                className="p-2 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600 transition-all hover:shadow-sm"
                                title="Edit Guru"
                              >
                                <Edit size={17} />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id, item.nama)}
                                className="p-2 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all hover:shadow-sm"
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
                {filtered.length === 0 && (
                  <div className="p-8 text-center">
                    <Users size={48} className="text-slate-300 mx-auto mb-3" />
                    <p className="text-sm font-medium text-slate-600">Tidak ada data guru</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {search ? "Coba ubah kata pencarian" : "Silakan tambahkan guru baru"}
                    </p>
                    {!search && (
                      <button
                        onClick={() => setShowModal(true)}
                        className="mt-3 text-sm text-emerald-600 font-medium hover:text-emerald-700 hover:underline transition-all"
                      >
                        Tambah guru pertama →
                      </button>
                    )}
                  </div>
                )}
              </div>

              <footer className="text-center text-[11px] text-slate-400 py-3 border-t border-slate-200/60">
                © 2026 SmartSchool • Data Guru
              </footer>
            </div>
          </div>
        </main>
      </div>

      {/* ===== MODAL PILIHAN TAMBAH GURU ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <UserPlus size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Tambah Guru</h3>
              <p className="text-sm text-slate-500 mt-1">Pilih metode penambahan guru</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  router.push("/admin/guru/tambah?mode=form");
                }}
                className="w-full flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition">
                  <User size={20} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-slate-700">Form Biasa</p>
                  <p className="text-xs text-slate-400">Isi data guru secara manual</p>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-500 transition" />
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  router.push("/admin/guru/tambah?mode=import");
                }}
                className="w-full flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition">
                  <Upload size={20} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-slate-700">Import Data</p>
                  <p className="text-xs text-slate-400">Upload file Excel/CSV</p>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-500 transition" />
              </button>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full py-2.5 text-sm text-slate-500 hover:text-slate-700 transition"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Komponen tambahan
const UserPlus = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </svg>
);

const ChevronRight = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);