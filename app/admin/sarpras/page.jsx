"use client";

import { useState, useEffect } from "react";
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
  HelpCircle,
  BarChart3,
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
  baik: { label: "Baik", bar: "bg-emerald-500", text: "text-emerald-600", chip: "bg-emerald-50 text-emerald-700" },
  rusak: { label: "Rusak", bar: "bg-rose-500", text: "text-rose-600", chip: "bg-rose-50 text-rose-700" },
  "rusak ringan": { label: "Rusak Ringan", bar: "bg-amber-500", text: "text-amber-600", chip: "bg-amber-50 text-amber-700" },
  "rusak berat": { label: "Rusak Berat", bar: "bg-rose-600", text: "text-rose-700", chip: "bg-rose-50 text-rose-700" },
  hilang: { label: "Hilang", bar: "bg-slate-500", text: "text-slate-600", chip: "bg-slate-100 text-slate-700" },
  perbaikan: { label: "Dalam Perbaikan", bar: "bg-amber-500", text: "text-amber-600", chip: "bg-amber-50 text-amber-700" },
};

const kondisiStyleFor = (kondisi) =>
  KONDISI_STYLE[(kondisi || "").toLowerCase()] || {
    label: kondisi || "Tidak diketahui",
    bar: "bg-slate-400",
    text: "text-slate-600",
    chip: "bg-slate-100 text-slate-700",
  };

const STOK_STYLE = {
  aman: { label: "Aman", bar: "bg-emerald-500", chip: "bg-emerald-50 text-emerald-700" },
  menipis: { label: "Menipis", bar: "bg-amber-500", chip: "bg-amber-50 text-amber-700" },
  habis: { label: "Habis", bar: "bg-rose-500", chip: "bg-rose-50 text-rose-700" },
};

// Bar horizontal sederhana pakai CSS (tanpa dependency chart)
function HBar({ label, count, total, colorClass, chipClass }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className={`text-xs font-medium px-2 py-0.5 rounded-md w-32 flex-shrink-0 truncate ${chipClass}`}>
        {label}
      </span>
      <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${colorClass} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-slate-600 w-16 text-right flex-shrink-0">
        {count} <span className="text-slate-400 font-normal">({pct}%)</span>
      </span>
    </div>
  );
}

// =========================================================
// MAIN COMPONENT
// =========================================================
export default function AdminSarprasOverviewPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [aset, setAset] = useState([]);
  const [gudang, setGudang] = useState([]);
  const [loaded, setLoaded] = useState(false);

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

  // ===== Distribusi kondisi aset (dinamis, bukan cuma baik/rusak) =====
  const kondisiCounts = aset.reduce((acc, a) => {
    const key = (a.kondisi || "tidak diketahui").toLowerCase();
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const kondisiEntries = Object.entries(kondisiCounts).sort((a, b) => b[1] - a[1]);

  // ===== Tabel gabungan: aset & barang yang butuh perhatian =====
  const asetBermasalah = aset
    .filter((a) => a.kondisi !== "baik")
    .map((a) => ({
      tipe: "Aset",
      nama: a.nama || a.nama_barang || "-",
      kategori: a.kategori || "-",
      status: a.kondisi,
      jumlah: a.jumlah ?? "-",
      styleGroup: "kondisi",
    }));

  const gudangBermasalah = gudang
    .filter((g) => getStokStatus(g.stok, g.stok_minimum) !== "aman")
    .map((g) => ({
      tipe: "Gudang",
      nama: g.nama || g.nama_barang || "-",
      kategori: g.kategori || "-",
      status: getStokStatus(g.stok, g.stok_minimum),
      jumlah: `${g.stok ?? 0} / min. ${g.stok_minimum ?? 0}`,
      styleGroup: "stok",
    }));

  const daftarBermasalah = [...asetBermasalah, ...gudangBermasalah];

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
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-200 flex-shrink-0">
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
                  className="text-left bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-lg hover:border-teal-300 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-md">
                      <Package size={22} />
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all"
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
                      <p className="text-lg font-bold text-cyan-600">{totalUnitAset}</p>
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
                  className="text-left bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-lg hover:border-cyan-300 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-md">
                      <Warehouse size={22} />
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-slate-300 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all"
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

              {/* ================= DIAGRAM DISTRIBUSI ================= */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Distribusi kondisi aset */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
                      <BarChart3 size={16} />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm">Distribusi Kondisi Aset</h3>
                  </div>

                  {kondisiEntries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                      <HelpCircle size={22} className="mb-2" />
                      <p className="text-xs">Belum ada data aset</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {kondisiEntries.map(([kondisi, count]) => {
                        const style = kondisiStyleFor(kondisi);
                        return (
                          <HBar
                            key={kondisi}
                            label={style.label}
                            count={count}
                            total={totalJenisAset}
                            colorClass={style.bar}
                            chipClass={style.chip}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Distribusi status stok gudang */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-cyan-50 text-cyan-600">
                      <BarChart3 size={16} />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm">Distribusi Status Stok Gudang</h3>
                  </div>

                  {totalJenisBarang === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                      <HelpCircle size={22} className="mb-2" />
                      <p className="text-xs">Belum ada data gudang</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <HBar
                        label={STOK_STYLE.aman.label}
                        count={stokAman}
                        total={totalJenisBarang}
                        colorClass={STOK_STYLE.aman.bar}
                        chipClass={STOK_STYLE.aman.chip}
                      />
                      <HBar
                        label={STOK_STYLE.menipis.label}
                        count={stokMenipis}
                        total={totalJenisBarang}
                        colorClass={STOK_STYLE.menipis.bar}
                        chipClass={STOK_STYLE.menipis.chip}
                      />
                      <HBar
                        label={STOK_STYLE.habis.label}
                        count={stokHabis}
                        total={totalJenisBarang}
                        colorClass={STOK_STYLE.habis.bar}
                        chipClass={STOK_STYLE.habis.chip}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* ================= TABEL BARANG/ASET BERMASALAH ================= */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 p-5 pb-4">
                  <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                    <ClipboardList size={16} />
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm">
                    Daftar Aset & Barang Perlu Perhatian
                  </h3>
                  <span className="ml-auto text-xs font-medium text-slate-400">
                    {daftarBermasalah.length} item
                  </span>
                </div>

                {daftarBermasalah.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                    <CheckCircle size={24} className="mb-2 text-emerald-400" />
                    <p className="text-xs">Semua aset baik & stok aman, tidak ada yang perlu perhatian</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-t border-slate-200/80 bg-slate-50/60 text-slate-500 text-[11px] uppercase tracking-wide">
                          <th className="text-left font-medium px-5 py-2.5">Nama</th>
                          <th className="text-left font-medium px-5 py-2.5">Tipe</th>
                          <th className="text-left font-medium px-5 py-2.5">Kategori</th>
                          <th className="text-left font-medium px-5 py-2.5">Status</th>
                          <th className="text-left font-medium px-5 py-2.5">Jumlah / Stok</th>
                        </tr>
                      </thead>
                      <tbody>
                        {daftarBermasalah.map((item, idx) => {
                          const style =
                            item.styleGroup === "stok"
                              ? STOK_STYLE[item.status] || STOK_STYLE.habis
                              : kondisiStyleFor(item.status);
                          return (
                            <tr
                              key={`${item.tipe}-${item.nama}-${idx}`}
                              className="border-t border-slate-100 hover:bg-slate-50/60 transition-colors"
                            >
                              <td className="px-5 py-3 font-medium text-slate-700">{item.nama}</td>
                              <td className="px-5 py-3 text-slate-500">{item.tipe}</td>
                              <td className="px-5 py-3 text-slate-500">{item.kategori}</td>
                              <td className="px-5 py-3">
                                <span className={`text-xs font-medium px-2 py-1 rounded-md ${style.chip}`}>
                                  {style.label}
                                </span>
                              </td>
                              <td className="px-5 py-3 text-slate-600">{item.jumlah}</td>
                            </tr>
                          );DLWL;;L;'DWLA'
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