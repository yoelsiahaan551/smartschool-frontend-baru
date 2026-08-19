"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  Boxes,
  Plus,
  Search,
  Edit,
  Trash2,
  RefreshCw,
  Wrench,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Building2,
  Filter,
  ChevronDown,
  PackageCheck,
} from "lucide-react";

// =========================================================
// HELPERS
// =========================================================
const STORAGE_KEY = "sarpras_aset_data";

const getDefaultAset = () => [
  // ===== KATEGORI: ELEKTRONIK =====
  {
    id: 1,
    nama: "Proyektor Epson EB-X500",
    kategori: "Elektronik",
    kode_aset: "SPR-ELK-001",
    lokasi: "R. 101",
    jumlah: 1,
    kondisi: "baik",
    penanggung_jawab: "Budi Santoso, S.Si.",
    tanggal_pengadaan: "2024-07-12",
    status: "tersedia",
  },
  {
    id: 2,
    nama: "AC Split Daikin 1 PK",
    kategori: "Elektronik",
    kode_aset: "SPR-ELK-002",
    lokasi: "R. 102",
    jumlah: 2,
    kondisi: "baik",
    penanggung_jawab: "Siti Rahma, S.Pd.",
    tanggal_pengadaan: "2023-03-05",
    status: "tersedia",
  },
  {
    id: 3,
    nama: "Komputer PC Rakitan i5",
    kategori: "Elektronik",
    kode_aset: "SPR-ELK-003",
    lokasi: "Lab. Komputer 1",
    jumlah: 30,
    kondisi: "rusak_ringan",
    penanggung_jawab: "Eko Prasetyo, S.Pd.",
    tanggal_pengadaan: "2022-01-18",
    status: "dipinjam",
  },
  {
    id: 4,
    nama: "Printer Canon MP287",
    kategori: "Elektronik",
    kode_aset: "SPR-ELK-004",
    lokasi: "R. Tata Usaha",
    jumlah: 3,
    kondisi: "rusak_berat",
    penanggung_jawab: "Maya Sari, S.Pd.",
    tanggal_pengadaan: "2021-09-09",
    status: "perbaikan",
  },

  // ===== KATEGORI: FURNITURE =====
  {
    id: 5,
    nama: "Meja Siswa Kayu",
    kategori: "Furniture",
    kode_aset: "SPR-FUR-001",
    lokasi: "R. 103",
    jumlah: 32,
    kondisi: "baik",
    penanggung_jawab: "Dewi Lestari, S.Pd.",
    tanggal_pengadaan: "2023-06-20",
    status: "tersedia",
  },
  {
    id: 6,
    nama: "Kursi Siswa Plastik",
    kategori: "Furniture",
    kode_aset: "SPR-FUR-002",
    lokasi: "R. 104",
    jumlah: 32,
    kondisi: "baik",
    penanggung_jawab: "Agus Setiawan, S.Pd.",
    tanggal_pengadaan: "2023-06-20",
    status: "tersedia",
  },
  {
    id: 7,
    nama: "Lemari Arsip Besi",
    kategori: "Furniture",
    kode_aset: "SPR-FUR-003",
    lokasi: "R. Perpustakaan",
    jumlah: 5,
    kondisi: "rusak_ringan",
    penanggung_jawab: "Rina Sari, S.Pd.",
    tanggal_pengadaan: "2020-11-02",
    status: "tersedia",
  },

  // ===== KATEGORI: ALAT PRAKTIK =====
  {
    id: 8,
    nama: "Router Cisco 2911",
    kategori: "Alat Praktik",
    kode_aset: "SPR-PRK-001",
    lokasi: "Lab. TKJ",
    jumlah: 10,
    kondisi: "baik",
    penanggung_jawab: "Hendra Gunawan, S.Pd.",
    tanggal_pengadaan: "2024-02-14",
    status: "tersedia",
  },
  {
    id: 9,
    nama: "Mesin Jahit Portable",
    kategori: "Alat Praktik",
    kode_aset: "SPR-PRK-002",
    lokasi: "R. Praktik Tata Busana",
    jumlah: 15,
    kondisi: "rusak_ringan",
    penanggung_jawab: "Sri Wahyuni, S.Pd.",
    tanggal_pengadaan: "2022-08-30",
    status: "tersedia",
  },
  {
    id: 10,
    nama: "Kalkulator Akuntansi",
    kategori: "Alat Praktik",
    kode_aset: "SPR-PRK-003",
    lokasi: "R. 105",
    jumlah: 25,
    kondisi: "baik",
    penanggung_jawab: "Eko Prasetyo, S.Pd.",
    tanggal_pengadaan: "2024-01-10",
    status: "dipinjam",
  },

  // ===== KATEGORI: BANGUNAN & FASILITAS =====
  {
    id: 11,
    nama: "Lapangan Basket",
    kategori: "Bangunan",
    kode_aset: "SPR-BGN-001",
    lokasi: "Area Olahraga",
    jumlah: 1,
    kondisi: "baik",
    penanggung_jawab: "Agus Setiawan, S.Pd.",
    tanggal_pengadaan: "2019-05-01",
    status: "tersedia",
  },
  {
    id: 12,
    nama: "Toilet Siswa Lantai 2",
    kategori: "Bangunan",
    kode_aset: "SPR-BGN-002",
    lokasi: "Lantai 2",
    jumlah: 4,
    kondisi: "rusak_berat",
    penanggung_jawab: "Hendra Gunawan, S.Pd.",
    tanggal_pengadaan: "2018-03-15",
    status: "perbaikan",
  },
  {
    id: 13,
    nama: "Musala Sekolah",
    kategori: "Bangunan",
    kode_aset: "SPR-BGN-003",
    lokasi: "Gedung Utama",
    jumlah: 1,
    kondisi: "baik",
    penanggung_jawab: "Dr. Ahmad Fauzi, M.Pd.",
    tanggal_pengadaan: "2017-08-17",
    status: "tersedia",
  },

  // ===== KATEGORI: KENDARAAN =====
  {
    id: 14,
    nama: "Bus Sekolah Isuzu Elf",
    kategori: "Kendaraan",
    kode_aset: "SPR-KND-001",
    lokasi: "Garasi Sekolah",
    jumlah: 2,
    kondisi: "baik",
    penanggung_jawab: "Dr. Ahmad Fauzi, M.Pd.",
    tanggal_pengadaan: "2021-04-22",
    status: "tersedia",
  },
  {
    id: 15,
    nama: "Motor Dinas Operasional",
    kategori: "Kendaraan",
    kode_aset: "SPR-KND-002",
    lokasi: "Garasi Sekolah",
    jumlah: 3,
    kondisi: "rusak_ringan",
    penanggung_jawab: "Budi Santoso, S.Si.",
    tanggal_pengadaan: "2020-10-11",
    status: "dipinjam",
  },
];

const loadAset = () => {
  if (typeof window === "undefined") return getDefaultAset();
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getDefaultAset()));
    return getDefaultAset();
  }
  return JSON.parse(stored);
};

const saveAset = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const kondisiConfig = {
  baik: {
    label: "Baik",
    icon: CheckCircle,
    className: "bg-emerald-50 text-emerald-600 border-emerald-200",
  },
  rusak_ringan: {
    label: "Rusak Ringan",
    icon: AlertTriangle,
    className: "bg-amber-50 text-amber-600 border-amber-200",
  },
  rusak_berat: {
    label: "Rusak Berat",
    icon: XCircle,
    className: "bg-rose-50 text-rose-600 border-rose-200",
  },
};

const statusConfig = {
  tersedia: { label: "Tersedia", className: "bg-blue-50 text-blue-600 border-blue-200" },
  dipinjam: { label: "Dipinjam", className: "bg-purple-50 text-purple-600 border-purple-200" },
  perbaikan: { label: "Perbaikan", className: "bg-slate-100 text-slate-500 border-slate-200" },
};

// =========================================================
// MAIN COMPONENT
// =========================================================
export default function AdminSarprasAsetPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [aset, setAset] = useState([]);
  const [search, setSearch] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("Semua");
  const [kondisiFilter, setKondisiFilter] = useState("Semua");
  const [expandedKategori, setExpandedKategori] = useState([
    "Elektronik",
    "Furniture",
    "Alat Praktik",
    "Bangunan",
    "Kendaraan",
  ]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    setAset(loadAset());
  }, []);

  const handleDelete = (id, nama) => {
    if (!window.confirm(`Yakin ingin menghapus aset "${nama}"?`)) return;
    const updated = aset.filter((item) => item.id !== id);
    setAset(updated);
    saveAset(updated);
    alert(`Aset "${nama}" berhasil dihapus!`);
  };

  const toggleKategori = (kategori) => {
    setExpandedKategori((prev) =>
      prev.includes(kategori) ? prev.filter((k) => k !== kategori) : [...prev, kategori]
    );
  };

  const filtered = aset.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.kode_aset.toLowerCase().includes(search.toLowerCase()) ||
      item.lokasi.toLowerCase().includes(search.toLowerCase());
    const matchKategori = kategoriFilter === "Semua" || item.kategori === kategoriFilter;
    const matchKondisi = kondisiFilter === "Semua" || item.kondisi === kondisiFilter;
    return matchSearch && matchKategori && matchKondisi;
  });

  const groupedByKategori = filtered.reduce((acc, item) => {
    if (!acc[item.kategori]) acc[item.kategori] = [];
    acc[item.kategori].push(item);
    return acc;
  }, {});

  const kategoriKeys = ["Elektronik", "Furniture", "Alat Praktik", "Bangunan", "Kendaraan"];

  // Statistics
  const totalAset = aset.length;
  const totalUnit = aset.reduce((sum, s) => sum + s.jumlah, 0);
  const totalBaik = aset.filter((s) => s.kondisi === "baik").length;
  const totalRusak = aset.filter((s) => s.kondisi !== "baik").length;

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar active="sarprasAset" setActive={() => {}} collapsed={isCollapsed} setCollapsed={setIsCollapsed} />

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
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-200 flex-shrink-0">
                    <Boxes size={20} />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-slate-800">Aset Sarana & Prasarana</h1>
                    <p className="text-sm text-slate-500">Kelola aset tetap, fasilitas, dan kondisi barang sekolah</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      setAset(loadAset());
                      window.location.reload();
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all hover:shadow-sm"
                    title="Refresh"
                  >
                    <RefreshCw size={17} className="text-slate-500" />
                  </button>
                  <button
                    onClick={() => router.push("/admin/sarpras/aset/tambah")}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:shadow-lg hover:shadow-teal-200 transition-all shadow-sm font-medium"
                  >
                    <Plus size={18} /> Tambah Aset
                  </button>
                </div>
              </div>

              {/* STATISTICS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600"><Boxes size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Jenis Aset</p>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{totalAset}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-cyan-50 text-cyan-600"><PackageCheck size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Total Unit</p>
                  </div>
                  <p className="text-2xl font-bold text-cyan-600 mt-1">{totalUnit}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600"><CheckCircle size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Kondisi Baik</p>
                  </div>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">{totalBaik}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600"><Wrench size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Perlu Perbaikan</p>
                  </div>
                  <p className="text-2xl font-bold text-rose-600 mt-1">{totalRusak}</p>
                </div>
              </div>

              {/* SEARCH & FILTER */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari nama aset, kode, atau lokasi..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition"
                    />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Filter size={17} className="text-slate-400" />
                    <select
                      value={kategoriFilter}
                      onChange={(e) => setKategoriFilter(e.target.value)}
                      className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 text-slate-600 min-w-[140px] cursor-pointer"
                    >
                      <option value="Semua">Semua Kategori</option>
                      {kategoriKeys.map((k) => (
                        <option key={k} value={k}>{k}</option>
                      ))}
                    </select>
                    <select
                      value={kondisiFilter}
                      onChange={(e) => setKondisiFilter(e.target.value)}
                      className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 text-slate-600 min-w-[140px] cursor-pointer"
                    >
                      <option value="Semua">Semua Kondisi</option>
                      <option value="baik">Baik</option>
                      <option value="rusak_ringan">Rusak Ringan</option>
                      <option value="rusak_berat">Rusak Berat</option>
                    </select>
                    <button
                      onClick={() => {
                        setSearch("");
                        setKategoriFilter("Semua");
                        setKondisiFilter("Semua");
                      }}
                      className="px-3 py-2.5 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors whitespace-nowrap"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* ASSET TABLE PER KATEGORI */}
              <div className="space-y-4">
                {kategoriKeys.map((kategori) => {
                  const items = groupedByKategori[kategori] || [];
                  const isExpanded = expandedKategori.includes(kategori);
                  const totalItem = items.length;
                  const unit = items.reduce((sum, s) => sum + s.jumlah, 0);
                  const adaRusak = items.some((s) => s.kondisi !== "baik");

                  if (items.length === 0 && (kategoriFilter !== "Semua" || kondisiFilter !== "Semua")) return null;
                  if (items.length === 0 && search) return null;

                  return (
                    <div key={kategori} className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      {/* Kategori Header */}
                      <div
                        className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-teal-50/60 to-cyan-50/60 border-b border-slate-200/80 cursor-pointer hover:from-teal-100/40 hover:to-cyan-100/40 transition-all"
                        onClick={() => toggleKategori(kategori)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-md">
                            <Building2 size={18} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-800 text-base">{kategori}</h3>
                            <p className="text-xs text-slate-500">
                              {totalItem} jenis aset • {unit} unit
                              {adaRusak && (
                                <span className="ml-2 inline-flex items-center gap-1 text-amber-600 font-medium">
                                  <AlertTriangle size={12} /> Ada yang perlu perbaikan
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 font-medium">
                            {isExpanded ? "Sembunyikan" : "Tampilkan"}
                          </span>
                          <div className="p-1 rounded-full hover:bg-white/50 transition-colors">
                            <ChevronDown
                              size={18}
                              className={`text-slate-500 transition-transform duration-300 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Item Table */}
                      {isExpanded && (
                        items.length === 0 ? (
                          <div className="p-6 text-center text-sm text-slate-400">Belum ada aset di kategori ini</div>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="bg-slate-50/60 text-slate-500 text-[11px] uppercase tracking-wide">
                                  <th className="text-left font-medium px-5 py-2.5">Nama Aset</th>
                                  <th className="text-left font-medium px-5 py-2.5">Kode Aset</th>
                                  <th className="text-left font-medium px-5 py-2.5">Lokasi</th>
                                  <th className="text-left font-medium px-5 py-2.5">Jumlah</th>
                                  <th className="text-left font-medium px-5 py-2.5">Kondisi</th>
                                  <th className="text-left font-medium px-5 py-2.5">Status</th>
                                  <th className="text-left font-medium px-5 py-2.5">Penanggung Jawab</th>
                                  <th className="text-left font-medium px-5 py-2.5">Tgl. Pengadaan</th>
                                  <th className="text-right font-medium px-5 py-2.5">Aksi</th>
                                </tr>
                              </thead>
                              <tbody>
                                {items.map((item) => {
                                  const kondisi = kondisiConfig[item.kondisi];
                                  const status = statusConfig[item.status];
                                  const KondisiIcon = kondisi.icon;
                                  return (
                                    <tr
                                      key={item.id}
                                      className={`border-t border-slate-100 hover:bg-slate-50/60 transition-colors ${
                                        item.kondisi !== "baik" ? "bg-slate-50/30" : ""
                                      }`}
                                    >
                                      <td className="px-5 py-3 font-medium text-slate-700 whitespace-nowrap">{item.nama}</td>
                                      <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{item.kode_aset}</td>
                                      <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{item.lokasi}</td>
                                      <td className="px-5 py-3 text-slate-600 whitespace-nowrap">{item.jumlah} unit</td>
                                      <td className="px-5 py-3 whitespace-nowrap">
                                        <span
                                          className={`inline-flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full border ${kondisi.className}`}
                                        >
                                          <KondisiIcon size={11} />
                                          {kondisi.label}
                                        </span>
                                      </td>
                                      <td className="px-5 py-3 whitespace-nowrap">
                                        <span
                                          className={`inline-flex items-center text-[10px] font-medium px-2.5 py-1 rounded-full border ${status.className}`}
                                        >
                                          {status.label}
                                        </span>
                                      </td>
                                      <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{item.penanggung_jawab}</td>
                                      <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{item.tanggal_pengadaan}</td>
                                      <td className="px-5 py-3">
                                        <div className="flex items-center justify-end gap-1.5">
                                          <button
                                            onClick={() => router.push(`/admin/sarpras/aset/edit/${item.id}`)}
                                            className="p-2 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600 transition-all hover:shadow-sm"
                                            title="Edit Aset"
                                          >
                                            <Edit size={16} />
                                          </button>
                                          <button
                                            onClick={() => handleDelete(item.id, item.nama)}
                                            className="p-2 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all hover:shadow-sm"
                                            title="Hapus Aset"
                                          >
                                            <Trash2 size={16} />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )
                      )}
                    </div>
                  );
                })}
              </div>

              {filtered.length === 0 && (
                <div className="bg-white rounded-xl border border-slate-200/80 p-12 text-center shadow-sm">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-teal-50">
                      <Boxes size={48} className="text-teal-300" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-600">Tidak ada data aset</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {search || kategoriFilter !== "Semua" || kondisiFilter !== "Semua"
                      ? "Coba ubah filter pencarian"
                      : "Silakan tambahkan aset baru"}
                  </p>
                  {!search && kategoriFilter === "Semua" && kondisiFilter === "Semua" && (
                    <button
                      onClick={() => router.push("/admin/sarpras/aset/tambah")}
                      className="mt-3 text-sm text-teal-600 font-medium hover:text-teal-700 hover:underline transition-all"
                    >
                      Tambah aset pertama →
                    </button>
                  )}
                </div>
              )}

              <footer className="text-center text-[11px] text-slate-400 py-3 border-t border-slate-200/60">
                © 2026 SmartSchool • Aset Sarana & Prasarana
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}