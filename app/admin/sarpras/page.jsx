"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  Boxes,
  Package,
  Warehouse,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Wrench,
  RefreshCw,
  Search,
  ClipboardList,
} from "lucide-react";

// =========================================================
// HELPERS — baca data yang sama dengan halaman Aset & Gudang
// =========================================================
const ASET_KEY = "sarpras_aset_data";
const GUDANG_KEY = "sarpras_gudang_data";

const loadFromStorage = (key) => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(key);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

const getStokStatus = (stok, minimum) => {
  if (stok === 0) return "habis";
  if (stok <= minimum) return "menipis";
  return "aman";
};

// Warna & label untuk tiap kondisi aset (mendukung kondisi apapun yang ada di data,
// bukan cuma "baik" — misalnya "rusak", "hilang", "perbaikan", dll)
const KONDISI_STYLE = {
  baik: { label: "Baik", chip: "bg-emerald-50 text-emerald-700", row: "" },
  rusak: { label: "Rusak", chip: "bg-rose-50 text-rose-700", row: "bg-rose-50/40" },
  "rusak ringan": { label: "Rusak Ringan", chip: "bg-amber-50 text-amber-700", row: "bg-amber-50/40" },
  "rusak berat": { label: "Rusak Berat", chip: "bg-rose-50 text-rose-700", row: "bg-rose-50/40" },
  hilang: { label: "Hilang", chip: "bg-slate-100 text-slate-700", row: "bg-slate-50" },
  perbaikan: { label: "Dalam Perbaikan", chip: "bg-amber-50 text-amber-700", row: "bg-amber-50/40" },
};

const kondisiStyleFor = (kondisi) =>
  KONDISI_STYLE[(kondisi || "").toLowerCase()] || {
    label: kondisi || "Tidak diketahui",
    chip: "bg-slate-100 text-slate-700",
    row: "",
  };

// Aksen biru brand SmartSchool (#155DFC -> #0d47c9), dipakai konsisten
// dengan halaman Kartu Identitas Siswa, Wali Kelas, dan Jadwal Pelajaran.

const STOK_STYLE = {
  aman: { label: "Aman", chip: "bg-emerald-50 text-emerald-700", row: "" },
  menipis: { label: "Menipis", chip: "bg-amber-50 text-amber-700", row: "bg-amber-50/40" },
  habis: { label: "Habis", chip: "bg-rose-50 text-rose-700", row: "bg-rose-50/40" },
};

// =========================================================
// MAIN COMPONENT
// =========================================================
export default function AdminSarprasOverviewPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [aset, setAset] = useState([]);
  const [gudang, setGudang] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [tabAktif, setTabAktif] = useState("aset"); // "aset" | "gudang"
  const [search, setSearch] = useState("");

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const loadAll = () => {
    setAset(loadFromStorage(ASET_KEY));
    setGudang(loadFromStorage(GUDANG_KEY));
    setLoaded(true);
  };

  useEffect(() => {
    loadAll();
  }, []);

  // ===== Statistik Aset =====
  const totalJenisAset = aset.length;
  const totalUnitAset = aset.reduce((sum, a) => sum + (a.jumlah || 0), 0);
  const asetBaik = aset.filter((a) => a.kondisi === "baik").length;
  const asetRusak = aset.filter((a) => a.kondisi !== "baik").length;

  // ===== Statistik Gudang =====
  const totalJenisBarang = gudang.length;
  const stokAman = gudang.filter((g) => getStokStatus(g.stok, g.stok_minimum) === "aman").length;
  const stokMenipis = gudang.filter((g) => getStokStatus(g.stok, g.stok_minimum) === "menipis").length;
  const stokHabis = gudang.filter((g) => getStokStatus(g.stok, g.stok_minimum) === "habis").length;

  const perluPerhatian = asetRusak + stokMenipis + stokHabis;

  // ===== Baris tabel lengkap, tergantung tab aktif =====
  const baris = useMemo(() => {
    const q = search.toLowerCase().trim();

    if (tabAktif === "aset") {
      return aset
        .map((a) => ({
          nama: a.nama || a.nama_barang || "-",
          kategori: a.kategori || "-",
          lokasi: a.lokasi || "-",
          statusKey: (a.kondisi || "tidak diketahui").toLowerCase(),
          jumlah: a.jumlah ?? "-",
        }))
        .filter(
          (r) =>
            !q || r.nama.toLowerCase().includes(q) || r.kategori.toLowerCase().includes(q)
        );
    }

    return gudang
      .map((g) => ({
        nama: g.nama || g.nama_barang || "-",
        kategori: g.kategori || "-",
        lokasi: g.lokasi || "-",
        statusKey: getStokStatus(g.stok, g.stok_minimum),
        jumlah: `${g.stok ?? 0} / min. ${g.stok_minimum ?? 0}`,
      }))
      .filter(
        (r) =>
          !q || r.nama.toLowerCase().includes(q) || r.kategori.toLowerCase().includes(q)
      );
  }, [tabAktif, aset, gudang, search]);

  const styleFor = (statusKey) =>
    tabAktif === "aset" ? kondisiStyleFor(statusKey) : STOK_STYLE[statusKey] || STOK_STYLE.habis;

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar active="sarpras" setActive={() => {}} collapsed={isCollapsed} setCollapsed={setIsCollapsed} />

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
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white shadow-lg shadow-slate-900/10 flex-shrink-0">
                    <Boxes size={20} />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-slate-800">Sarana & Prasarana</h1>
                    <p className="text-sm text-slate-500">Ringkasan aset tetap dan stok gudang sekolah</p>
                  </div>
                </div>
                <button
                  onClick={loadAll}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all hover:shadow-sm self-start sm:self-auto"
                  title="Refresh"
                >
                  <RefreshCw size={17} className="text-slate-500" />
                </button>
              </div>

              {/* PERINGATAN GABUNGAN */}
              {loaded && perluPerhatian > 0 && (
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="p-1.5 rounded-lg bg-amber-100 text-amber-600 flex-shrink-0">
                    <AlertTriangle size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-800">
                      Ada {perluPerhatian} hal yang perlu perhatian:
                      {asetRusak > 0 && ` ${asetRusak} aset bermasalah`}
                      {asetRusak > 0 && (stokMenipis > 0 || stokHabis > 0) && ","}
                      {stokMenipis > 0 && ` ${stokMenipis} barang menipis`}
                      {stokMenipis > 0 && stokHabis > 0 && ","}
                      {stokHabis > 0 && ` ${stokHabis} barang habis`}.
                    </p>
                  </div>
                </div>
              )}

              {/* DUA KARTU NAVIGASI UTAMA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* KARTU ASET */}
                <button
                  onClick={() => router.push("/admin/sarpras/aset")}
                  className="text-left bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-lg hover:border-[#155DFC]/40 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white shadow-md">
                      <Package size={22} />
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-slate-300 group-hover:text-[#155DFC] group-hover:translate-x-1 transition-all"
                    />
                  </div>
                  <h3 className="font-semibold text-slate-800 text-base mt-4">Aset</h3>
                  <p className="text-xs text-slate-500 mt-1">Elektronik, furniture, alat praktik, bangunan & kendaraan</p>

                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div>
                      <p className="text-lg font-bold text-slate-800">{totalJenisAset}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">Jenis</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#155DFC]">{totalUnitAset}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">Unit</p>
                    </div>
                    <div>
                      <p className={`text-lg font-bold ${asetRusak > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                        {asetRusak}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">Bermasalah</p>
                    </div>
                  </div>
                </button>

                {/* KARTU GUDANG */}
                <button
                  onClick={() => router.push("/admin/sarpras/gudang")}
                  className="text-left bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-lg hover:border-[#155DFC]/40 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white shadow-md">
                      <Warehouse size={22} />
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-slate-300 group-hover:text-[#155DFC] group-hover:translate-x-1 transition-all"
                    />
                  </div>
                  <h3 className="font-semibold text-slate-800 text-base mt-4">Gudang</h3>
                  <p className="text-xs text-slate-500 mt-1">Stok ATK, kebersihan, bahan praktik & konsumsi</p>

                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div>
                      <p className="text-lg font-bold text-slate-800">{totalJenisBarang}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">Jenis</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-amber-600">{stokMenipis}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">Menipis</p>
                    </div>
                    <div>
                      <p className={`text-lg font-bold ${stokHabis > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                        {stokHabis}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">Habis</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* STATISTIK DETAIL */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600"><CheckCircle size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Aset Baik</p>
                  </div>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">{asetBaik}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600"><Wrench size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Aset Perlu Perbaikan</p>
                  </div>
                  <p className="text-2xl font-bold text-rose-600 mt-1">{asetRusak}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600"><CheckCircle size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Stok Aman</p>
                  </div>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">{stokAman}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600"><XCircle size={16} /></div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Stok Habis</p>
                  </div>
                  <p className="text-2xl font-bold text-rose-600 mt-1">{stokHabis}</p>
                </div>
              </div>

              {/* ================= TABEL DATA LENGKAP (ASET / GUDANG) ================= */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#eaf1ff] text-[#155DFC]">
                      <ClipboardList size={16} />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm">Data Lengkap Sarana & Prasarana</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                      <button
                        onClick={() => setTabAktif("aset")}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                          tabAktif === "aset"
                            ? "bg-white text-[#155DFC] shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        Aset ({totalJenisAset})
                      </button>
                      <button
                        onClick={() => setTabAktif("gudang")}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                          tabAktif === "gudang"
                            ? "bg-white text-[#155DFC] shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        Gudang ({totalJenisBarang})
                      </button>
                    </div>
                    <div className="relative">
                      <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari nama / kategori..."
                        className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-700 w-44"
                      />
                    </div>
                  </div>
                </div>

                {baris.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                    <CheckCircle size={24} className="mb-2 text-emerald-400" />
                    <p className="text-xs">
                      {search
                        ? "Tidak ada data yang cocok dengan pencarian."
                        : `Belum ada data ${tabAktif === "aset" ? "aset" : "gudang"}.`}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-t border-slate-200/80 bg-slate-50/60 text-slate-500 text-[11px] uppercase tracking-wide">
                          <th className="text-left font-medium px-5 py-2.5">Nama</th>
                          <th className="text-left font-medium px-5 py-2.5">Kategori</th>
                          <th className="text-left font-medium px-5 py-2.5">Lokasi</th>
                          <th className="text-left font-medium px-5 py-2.5">Status</th>
                          <th className="text-left font-medium px-5 py-2.5">
                            {tabAktif === "aset" ? "Jumlah Unit" : "Stok / Minimum"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {baris.map((item, idx) => {
                          const style = styleFor(item.statusKey);
                          return (
                            <tr
                              key={`${item.nama}-${idx}`}
                              className={`border-t border-slate-100 hover:brightness-95 transition-colors ${style.row}`}
                            >
                              <td className="px-5 py-3 font-medium text-slate-700">{item.nama}</td>
                              <td className="px-5 py-3 text-slate-500">{item.kategori}</td>
                              <td className="px-5 py-3 text-slate-500">{item.lokasi}</td>
                              <td className="px-5 py-3">
                                <span className={`text-xs font-medium px-2 py-1 rounded-md ${style.chip}`}>
                                  {style.label}
                                </span>
                              </td>
                              <td className="px-5 py-3 text-slate-600">{item.jumlah}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <footer className="text-center text-[11px] text-slate-400 py-3 border-t border-slate-200/60">
                © 2026 SmartSchool • Sarana & Prasarana
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}