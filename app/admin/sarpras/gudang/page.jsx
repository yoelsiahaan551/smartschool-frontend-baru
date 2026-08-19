"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  Warehouse,
  Plus,
  Search,
  Edit,
  Trash2,
  RefreshCw,
  PackageMinus,
  PackagePlus,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Filter,
  ChevronDown,
  Boxes,
  ClipboardList,
} from "lucide-react";

// =========================================================
// HELPERS
// =========================================================
const STORAGE_KEY = "sarpras_gudang_data";

const getDefaultGudang = () => [
  // ===== KATEGORI: ATK =====
  {
    id: 1,
    nama: "Kertas HVS A4 80gr",
    kategori: "ATK",
    kode_barang: "GDG-ATK-001",
    satuan: "rim",
    stok: 45,
    stok_minimum: 20,
    lokasi_rak: "Rak A1",
    supplier: "CV Sumber Kertas",
    terakhir_update: "2026-08-10",
  },
  {
    id: 2,
    nama: "Tinta Printer Epson 003 Hitam",
    kategori: "ATK",
    kode_barang: "GDG-ATK-002",
    satuan: "botol",
    stok: 6,
    stok_minimum: 10,
    lokasi_rak: "Rak A2",
    supplier: "Toko Komputer Jaya",
    terakhir_update: "2026-08-05",
  },
  {
    id: 3,
    nama: "Spidol Whiteboard",
    kategori: "ATK",
    kode_barang: "GDG-ATK-003",
    satuan: "pcs",
    stok: 0,
    stok_minimum: 15,
    lokasi_rak: "Rak A1",
    supplier: "CV Sumber Kertas",
    terakhir_update: "2026-07-28",
  },
  {
    id: 4,
    nama: "Map Plastik Snelhecter",
    kategori: "ATK",
    kode_barang: "GDG-ATK-004",
    satuan: "pak",
    stok: 32,
    stok_minimum: 10,
    lokasi_rak: "Rak A3",
    supplier: "CV Sumber Kertas",
    terakhir_update: "2026-08-14",
  },

  // ===== KATEGORI: KEBERSIHAN =====
  {
    id: 5,
    nama: "Sapu Lidi",
    kategori: "Kebersihan",
    kode_barang: "GDG-KBR-001",
    satuan: "pcs",
    stok: 12,
    stok_minimum: 8,
    lokasi_rak: "Gudang Belakang",
    supplier: "Toko Bersih Jaya",
    terakhir_update: "2026-08-01",
  },
  {
    id: 6,
    nama: "Cairan Pembersih Lantai",
    kategori: "Kebersihan",
    kode_barang: "GDG-KBR-002",
    satuan: "liter",
    stok: 4,
    stok_minimum: 10,
    lokasi_rak: "Gudang Belakang",
    supplier: "Toko Bersih Jaya",
    terakhir_update: "2026-08-16",
  },
  {
    id: 7,
    nama: "Kantong Sampah Besar",
    kategori: "Kebersihan",
    kode_barang: "GDG-KBR-003",
    satuan: "pak",
    stok: 25,
    stok_minimum: 15,
    lokasi_rak: "Gudang Belakang",
    supplier: "Toko Bersih Jaya",
    terakhir_update: "2026-08-12",
  },

  // ===== KATEGORI: BAHAN PRAKTIK =====
  {
    id: 8,
    nama: "Kain Katun Praktik Jahit",
    kategori: "Bahan Praktik",
    kode_barang: "GDG-PRK-001",
    satuan: "meter",
    stok: 18,
    stok_minimum: 20,
    lokasi_rak: "Gudang Praktik",
    supplier: "Toko Kain Sentosa",
    terakhir_update: "2026-08-09",
  },
  {
    id: 9,
    nama: "Kabel UTP Cat6",
    kategori: "Bahan Praktik",
    kode_barang: "GDG-PRK-002",
    satuan: "roll",
    stok: 7,
    stok_minimum: 5,
    lokasi_rak: "Gudang Praktik",
    supplier: "Toko Komputer Jaya",
    terakhir_update: "2026-08-11",
  },
  {
    id: 10,
    nama: "Konektor RJ-45",
    kategori: "Bahan Praktik",
    kode_barang: "GDG-PRK-003",
    satuan: "pak",
    stok: 0,
    stok_minimum: 5,
    lokasi_rak: "Gudang Praktik",
    supplier: "Toko Komputer Jaya",
    terakhir_update: "2026-07-30",
  },

  // ===== KATEGORI: KONSUMSI =====
  {
    id: 11,
    nama: "Air Mineral Galon",
    kategori: "Konsumsi",
    kode_barang: "GDG-KSM-001",
    satuan: "galon",
    stok: 9,
    stok_minimum: 5,
    lokasi_rak: "Dapur Sekolah",
    supplier: "Depo Air Bersih",
    terakhir_update: "2026-08-17",
  },
  {
    id: 12,
    nama: "Gula & Kopi Rapat",
    kategori: "Konsumsi",
    kode_barang: "GDG-KSM-002",
    satuan: "pak",
    stok: 3,
    stok_minimum: 6,
    lokasi_rak: "Dapur Sekolah",
    supplier: "Toko Sembako Ibu Nur",
    terakhir_update: "2026-08-15",
  },
];

const loadGudang = () => {
  if (typeof window === "undefined") return getDefaultGudang();
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getDefaultGudang()));
    return getDefaultGudang();
  }
  return JSON.parse(stored);
};

const saveGudang = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const getStokStatus = (stok, minimum) => {
  if (stok === 0) return "habis";
  if (stok <= minimum) return "menipis";
  return "aman";
};

const stokStatusConfig = {
  aman: {
    label: "Aman",
    icon: CheckCircle,
    className: "bg-emerald-50 text-emerald-600 border-emerald-200",
  },
  menipis: {
    label: "Menipis",
    icon: AlertTriangle,
    className: "bg-amber-50 text-amber-600 border-amber-200",
  },
  habis: {
    label: "Habis",
    icon: XCircle,
    className: "bg-rose-50 text-rose-600 border-rose-200",
  },
};

// =========================================================
// MAIN COMPONENT
// =========================================================
export default function AdminSarprasGudangPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [gudang, setGudang] = useState([]);
  const [search, setSearch] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("Semua");
  const [stokFilter, setStokFilter] = useState("Semua");
  const [expandedKategori, setExpandedKategori] = useState([
    "ATK",
    "Kebersihan",
    "Bahan Praktik",
    "Konsumsi",
  ]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    setGudang(loadGudang());
  }, []);

  const handleDelete = (id, nama) => {
    if (!window.confirm(`Yakin ingin menghapus barang "${nama}" dari gudang?`)) return;
    const updated = gudang.filter((item) => item.id !== id);
    setGudang(updated);
    saveGudang(updated);
    alert(`Barang "${nama}" berhasil dihapus!`);
  };

  const handleStokChange = (id, delta) => {
    const updated = gudang.map((item) => {
      if (item.id !== id) return item;
      const newStok = Math.max(0, item.stok + delta);
      return { ...item, stok: newStok, terakhir_update: new Date().toISOString().slice(0, 10) };
    });
    setGudang(updated);
    saveGudang(updated);
  };

  const toggleKategori = (kategori) => {
    setExpandedKategori((prev) =>
      prev.includes(kategori) ? prev.filter((k) => k !== kategori) : [...prev, kategori]
    );
  };

  const filtered = gudang.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.kode_barang.toLowerCase().includes(search.toLowerCase()) ||
      item.lokasi_rak.toLowerCase().includes(search.toLowerCase());
    const matchKategori = kategoriFilter === "Semua" || item.kategori === kategoriFilter;
    const status = getStokStatus(item.stok, item.stok_minimum);
    const matchStok = stokFilter === "Semua" || status === stokFilter;
    return matchSearch && matchKategori && matchStok;
  });

  const groupedByKategori = filtered.reduce((acc, item) => {
    if (!acc[item.kategori]) acc[item.kategori] = [];
    acc[item.kategori].push(item);
    return acc;
  }, {});

  const kategoriKeys = ["ATK", "Kebersihan", "Bahan Praktik", "Konsumsi"];

  // Statistics
  const totalJenis = gudang.length;
  const totalAman = gudang.filter((g) => getStokStatus(g.stok, g.stok_minimum) === "aman").length;
  const totalMenipis = gudang.filter((g) => getStokStatus(g.stok, g.stok_minimum) === "menipis").length;
  const totalHabis = gudang.filter((g) => getStokStatus(g.stok, g.stok_minimum) === "habis").length;

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar active="sarprasGudang" setActive={() => {}} collapsed={isCollapsed} setCollapsed={setIsCollapsed} />

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
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-200 flex-shrink-0">
                    <Warehouse size={20} />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-slate-800">Gudang Sarana & Prasarana</h1>
                    <p className="text-sm text-slate-500">Pantau stok barang habis pakai dan kebutuhan restok</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      setGudang(loadGudang());
                      window.location.reload();
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all hover:shadow-sm"
                    title="Refresh"
                  >
                    <RefreshCw size={17} className="text-slate-500" />
                  </button>
                  <button
                    onClick={() => router.push("/admin/sarpras/gudang/tambah")}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-200 transition-all shadow-sm font-medium"
                  >
                    <Plus size={18} /> Tambah Barang
                  </button>
                </div>
              </div>

              {/* STATISTICS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600"><Boxes size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Jenis Barang</p>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{totalJenis}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600"><CheckCircle size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Stok Aman</p>
                  </div>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">{totalAman}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600"><AlertTriangle size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Stok Menipis</p>
                  </div>
                  <p className="text-2xl font-bold text-amber-600 mt-1">{totalMenipis}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600"><XCircle size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Stok Habis</p>
                  </div>
                  <p className="text-2xl font-bold text-rose-600 mt-1">{totalHabis}</p>
                </div>
              </div>

              {/* PERINGATAN RESTOK */}
              {(totalMenipis > 0 || totalHabis > 0) && (
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="p-1.5 rounded-lg bg-amber-100 text-amber-600 flex-shrink-0">
                    <ClipboardList size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-800">
                      {totalHabis > 0 && `${totalHabis} barang habis`}
                      {totalHabis > 0 && totalMenipis > 0 && " dan "}
                      {totalMenipis > 0 && `${totalMenipis} barang menipis`}
                      , perlu segera direstok.
                    </p>
                  </div>
                </div>
              )}

              {/* SEARCH & FILTER */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari nama barang, kode, atau lokasi rak..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400 transition"
                    />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Filter size={17} className="text-slate-400" />
                    <select
                      value={kategoriFilter}
                      onChange={(e) => setKategoriFilter(e.target.value)}
                      className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400 text-slate-600 min-w-[140px] cursor-pointer"
                    >
                      <option value="Semua">Semua Kategori</option>
                      {kategoriKeys.map((k) => (
                        <option key={k} value={k}>{k}</option>
                      ))}
                    </select>
                    <select
                      value={stokFilter}
                      onChange={(e) => setStokFilter(e.target.value)}
                      className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400 text-slate-600 min-w-[140px] cursor-pointer"
                    >
                      <option value="Semua">Semua Status Stok</option>
                      <option value="aman">Aman</option>
                      <option value="menipis">Menipis</option>
                      <option value="habis">Habis</option>
                    </select>
                    <button
                      onClick={() => {
                        setSearch("");
                        setKategoriFilter("Semua");
                        setStokFilter("Semua");
                      }}
                      className="px-3 py-2.5 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors whitespace-nowrap"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* STOCK TABLE PER KATEGORI */}
              <div className="space-y-4">
                {kategoriKeys.map((kategori) => {
                  const items = groupedByKategori[kategori] || [];
                  const isExpanded = expandedKategori.includes(kategori);
                  const totalItem = items.length;
                  const adaMasalah = items.some(
                    (g) => getStokStatus(g.stok, g.stok_minimum) !== "aman"
                  );

                  if (items.length === 0 && (kategoriFilter !== "Semua" || stokFilter !== "Semua")) return null;
                  if (items.length === 0 && search) return null;

                  return (
                    <div key={kategori} className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      {/* Kategori Header */}
                      <div
                        className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-cyan-50/60 to-blue-50/60 border-b border-slate-200/80 cursor-pointer hover:from-cyan-100/40 hover:to-blue-100/40 transition-all"
                        onClick={() => toggleKategori(kategori)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-md">
                            <Warehouse size={18} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-800 text-base">{kategori}</h3>
                            <p className="text-xs text-slate-500">
                              {totalItem} jenis barang
                              {adaMasalah && (
                                <span className="ml-2 inline-flex items-center gap-1 text-amber-600 font-medium">
                                  <AlertTriangle size={12} /> Perlu perhatian
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
                          <div className="p-6 text-center text-sm text-slate-400">Belum ada barang di kategori ini</div>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="bg-slate-50/60 text-slate-500 text-[11px] uppercase tracking-wide">
                                  <th className="text-left font-medium px-5 py-2.5">Nama Barang</th>
                                  <th className="text-left font-medium px-5 py-2.5">Kode Barang</th>
                                  <th className="text-left font-medium px-5 py-2.5">Lokasi Rak</th>
                                  <th className="text-left font-medium px-5 py-2.5">Stok</th>
                                  <th className="text-left font-medium px-5 py-2.5">Status</th>
                                  <th className="text-left font-medium px-5 py-2.5">Supplier</th>
                                  <th className="text-left font-medium px-5 py-2.5">Update Terakhir</th>
                                  <th className="text-right font-medium px-5 py-2.5">Aksi</th>
                                </tr>
                              </thead>
                              <tbody>
                                {items.map((item) => {
                                  const status = getStokStatus(item.stok, item.stok_minimum);
                                  const cfg = stokStatusConfig[status];
                                  const StatusIcon = cfg.icon;
                                  return (
                                    <tr
                                      key={item.id}
                                      className={`border-t border-slate-100 hover:bg-slate-50/60 transition-colors ${
                                        status !== "aman" ? "bg-slate-50/30" : ""
                                      }`}
                                    >
                                      <td className="px-5 py-3 font-medium text-slate-700 whitespace-nowrap">{item.nama}</td>
                                      <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{item.kode_barang}</td>
                                      <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{item.lokasi_rak}</td>
                                      <td className="px-5 py-3 text-slate-600 whitespace-nowrap">
                                        {item.stok} {item.satuan}{" "}
                                        <span className="text-slate-400">(min. {item.stok_minimum})</span>
                                      </td>
                                      <td className="px-5 py-3 whitespace-nowrap">
                                        <span
                                          className={`inline-flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full border ${cfg.className}`}
                                        >
                                          <StatusIcon size={11} />
                                          {cfg.label}
                                        </span>
                                      </td>
                                      <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{item.supplier}</td>
                                      <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{item.terakhir_update}</td>
                                      <td className="px-5 py-3">
                                        <div className="flex items-center justify-end gap-1.5">
                                          <button
                                            onClick={() => handleStokChange(item.id, -1)}
                                            className="p-2 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all hover:shadow-sm"
                                            title="Kurangi Stok"
                                          >
                                            <PackageMinus size={16} />
                                          </button>
                                          <button
                                            onClick={() => handleStokChange(item.id, 1)}
                                            className="p-2 rounded-lg hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-all hover:shadow-sm"
                                            title="Tambah Stok"
                                          >
                                            <PackagePlus size={16} />
                                          </button>
                                          <button
                                            onClick={() => router.push(`/admin/sarpras/gudang/edit/${item.id}`)}
                                            className="p-2 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600 transition-all hover:shadow-sm"
                                            title="Edit Barang"
                                          >
                                            <Edit size={16} />
                                          </button>
                                          <button
                                            onClick={() => handleDelete(item.id, item.nama)}
                                            className="p-2 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all hover:shadow-sm"
                                            title="Hapus Barang"
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
                    <div className="p-4 rounded-full bg-cyan-50">
                      <Warehouse size={48} className="text-cyan-300" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-600">Tidak ada data gudang</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {search || kategoriFilter !== "Semua" || stokFilter !== "Semua"
                      ? "Coba ubah filter pencarian"
                      : "Silakan tambahkan barang baru"}
                  </p>
                  {!search && kategoriFilter === "Semua" && stokFilter === "Semua" && (
                    <button
                      onClick={() => router.push("/admin/sarpras/gudang/tambah")}
                      className="mt-3 text-sm text-cyan-600 font-medium hover:text-cyan-700 hover:underline transition-all"
                    >
                      Tambah barang pertama →
                    </button>
                  )}
                </div>
              )}

              <footer className="text-center text-[11px] text-slate-400 py-3 border-t border-slate-200/60">
                © 2026 SmartSchool • Gudang Sarana & Prasarana
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}