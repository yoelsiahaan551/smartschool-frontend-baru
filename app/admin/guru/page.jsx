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
  Mail,
  Phone,
  UserCheck,
} from "lucide-react";

// =========================================================
// HELPERS & DUMMY DATA (30 data)
// =========================================================
const STORAGE_KEY = "guru_data";

const getDefaultGuru = () => [
  { id: 1, nama: "Dr. Ahmad Fauzi, M.Pd.", nip: "198501012010011001", mapel: "Matematika", email: "ahmad@sekolah.com", phone: "081234567890", status: "Aktif" },
  { id: 2, nama: "Siti Rahma, S.Pd.", nip: "198712152011012002", mapel: "Bahasa Indonesia", email: "siti@sekolah.com", phone: "081234567891", status: "Aktif" },
  { id: 3, nama: "Budi Santoso, S.Si.", nip: "199003202012013003", mapel: "Fisika", email: "budi@sekolah.com", phone: "081234567892", status: "Nonaktif" },
  { id: 4, nama: "Dewi Lestari, S.Pd.", nip: "199105152013014004", mapel: "Biologi", email: "dewi@sekolah.com", phone: "081234567893", status: "Aktif" },
  { id: 5, nama: "Eko Prasetyo, S.Pd.", nip: "198801012010011005", mapel: "Kimia", email: "eko@sekolah.com", phone: "081234567894", status: "Aktif" },
  { id: 6, nama: "Rina Sari, S.Pd.", nip: "199012152011012006", mapel: "Bahasa Inggris", email: "rina@sekolah.com", phone: "081234567895", status: "Aktif" },
  { id: 7, nama: "Agus Setiawan, S.Pd.", nip: "198704202012013007", mapel: "Sejarah", email: "agus@sekolah.com", phone: "081234567896", status: "Nonaktif" },
  { id: 8, nama: "Sri Wahyuni, S.Pd.", nip: "198805152013014008", mapel: "PKN", email: "sri@sekolah.com", phone: "081234567897", status: "Aktif" },
  { id: 9, nama: "Hendra Gunawan, S.Pd.", nip: "198902102014015009", mapel: "Agama", email: "hendra@sekolah.com", phone: "081234567898", status: "Aktif" },
  { id: 10, nama: "Maya Sari, S.Pd.", nip: "199106152015016010", mapel: "Seni Budaya", email: "maya@sekolah.com", phone: "081234567899", status: "Nonaktif" },
  { id: 11, nama: "Dedi Kurniawan, S.Pd.", nip: "198601012010011011", mapel: "PJOK", email: "dedi@sekolah.com", phone: "081234567800", status: "Aktif" },
  { id: 12, nama: "Ratna Dewi, S.Pd.", nip: "198712152011012012", mapel: "TIK", email: "ratna@sekolah.com", phone: "081234567801", status: "Aktif" },
  { id: 13, nama: "Rudi Hartono, S.Pd.", nip: "199003202012013013", mapel: "Prakarya", email: "rudi@sekolah.com", phone: "081234567802", status: "Nonaktif" },
  { id: 14, nama: "Lina Marlina, S.Pd.", nip: "199105152013014014", mapel: "Matematika", email: "lina@sekolah.com", phone: "081234567803", status: "Aktif" },
  { id: 15, nama: "Yudi Setiawan, S.Pd.", nip: "198801012010011015", mapel: "Fisika", email: "yudi@sekolah.com", phone: "081234567804", status: "Aktif" },
  { id: 16, nama: "Nina Susanti, S.Pd.", nip: "199012152011012016", mapel: "Kimia", email: "nina@sekolah.com", phone: "081234567805", status: "Aktif" },
  { id: 17, nama: "Tono Saputra, S.Pd.", nip: "198704202012013017", mapel: "Biologi", email: "tono@sekolah.com", phone: "081234567806", status: "Nonaktif" },
  { id: 18, nama: "Wati Kusuma, S.Pd.", nip: "198805152013014018", mapel: "Bahasa Indonesia", email: "wati@sekolah.com", phone: "081234567807", status: "Aktif" },
  { id: 19, nama: "Eko Nugroho, S.Pd.", nip: "198902102014015019", mapel: "Bahasa Inggris", email: "eko.n@sekolah.com", phone: "081234567808", status: "Aktif" },
  { id: 20, nama: "Rina Melati, S.Pd.", nip: "199106152015016020", mapel: "Sejarah", email: "rina.m@sekolah.com", phone: "081234567809", status: "Nonaktif" },
  { id: 21, nama: "Hardi Prasetyo, S.Pd.", nip: "198601012010011021", mapel: "PKN", email: "hardi@sekolah.com", phone: "081234567810", status: "Aktif" },
  { id: 22, nama: "Dewi Sartika, S.Pd.", nip: "198712152011012022", mapel: "Agama", email: "dewi.s@sekolah.com", phone: "081234567811", status: "Aktif" },
  { id: 23, nama: "Slamet Riyadi, S.Pd.", nip: "199003202012013023", mapel: "Seni Budaya", email: "slamet@sekolah.com", phone: "081234567812", status: "Nonaktif" },
  { id: 24, nama: "Mega Utami, S.Pd.", nip: "199105152013014024", mapel: "PJOK", email: "mega@sekolah.com", phone: "081234567813", status: "Aktif" },
  { id: 25, nama: "Rizki Maulana, S.Pd.", nip: "198801012010011025", mapel: "TIK", email: "rizki@sekolah.com", phone: "081234567814", status: "Aktif" },
  { id: 26, nama: "Dina Safitri, S.Pd.", nip: "199012152011012026", mapel: "Prakarya", email: "dina@sekolah.com", phone: "081234567815", status: "Aktif" },
  { id: 27, nama: "Fajar Surya, S.Pd.", nip: "198704202012013027", mapel: "Matematika", email: "fajar@sekolah.com", phone: "081234567816", status: "Nonaktif" },
  { id: 28, nama: "Vina Rahma, S.Pd.", nip: "198805152013014028", mapel: "Fisika", email: "vina@sekolah.com", phone: "081234567817", status: "Aktif" },
  { id: 29, nama: "Gilang Ramadhan, S.Pd.", nip: "198902102014015029", mapel: "Kimia", email: "gilang@sekolah.com", phone: "081234567818", status: "Aktif" },
  { id: 30, nama: "Citra Ayu, S.Pd.", nip: "199106152015016030", mapel: "Biologi", email: "citra@sekolah.com", phone: "081234567819", status: "Nonaktif" },
];

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

// =========================================================
// MAIN COMPONENT
// =========================================================
export default function AdminGuruPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [guru, setGuru] = useState([]);
  const [search, setSearch] = useState("");

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

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

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar active="guru" setActive={() => {}} collapsed={isCollapsed} setCollapsed={setIsCollapsed} />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
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
                      window.location.reload();
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all hover:shadow-sm"
                    title="Refresh"
                  >
                    <RefreshCw size={17} className="text-slate-500" />
                  </button>
                  <button
                    onClick={() => router.push("/admin/guru/tambah")}
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
                    <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600"><UserCheck size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Mapel</p>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600 mt-1">{new Set(guru.map(g => g.mapel)).size}</p>
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

              {/* TABLE */}
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[22%]">Nama</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[15%]">NIP</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[15%]">Mapel</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[18%] hidden md:table-cell">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[10%]">Status</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[20%]">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filtered.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-4 py-4">
                            <p className="font-semibold text-slate-800 text-sm break-words">{item.nama}</p>
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
                            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border whitespace-nowrap ${
                              item.status === "Aktif"
                                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                : "bg-rose-50 text-rose-600 border-rose-200"
                            }`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex justify-end gap-1.5">
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
                        onClick={() => router.push("/admin/guru/tambah")}
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
    </div>
  );
}