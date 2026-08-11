"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  Package,
  Layers,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Search,
  Sparkles,
  Crown,
  Star,
  Zap,
  Users,
  CircleDollarSign,
  BadgeCheck,
  BookOpen,
  Wallet,
  UserCog,
  Library,
  ClipboardCheck,
  UserPlus,
  MessageSquare,
  Boxes,
  ChevronDown,
  MoreHorizontal,
  Copy,
  ShieldCheck,
  ArrowRight,
  LayoutGrid,
} from "lucide-react";

// ================== DATA AWAL ==================

const MODUL_LIST = [
  { id: "akademik", nama: "Akademik", desk: "Nilai, jadwal & rapor digital", icon: BookOpen },
  { id: "keuangan", nama: "Keuangan", desk: "SPP, tagihan & laporan keuangan", icon: Wallet },
  { id: "kepegawaian", nama: "Kepegawaian", desk: "Data guru & staff sekolah", icon: UserCog },
  { id: "perpustakaan", nama: "Perpustakaan", desk: "Katalog & sirkulasi buku", icon: Library },
  { id: "presensi", nama: "Presensi", desk: "Absensi digital siswa & guru", icon: ClipboardCheck },
  { id: "ppdb", nama: "PPDB", desk: "Pendaftaran siswa baru online", icon: UserPlus },
  { id: "komunikasi", nama: "Komunikasi", desk: "Pesan ke orang tua & wali murid", icon: MessageSquare },
  { id: "inventaris", nama: "Inventaris", desk: "Aset & barang milik sekolah", icon: Boxes },
];

const PAKET_AWAL = [
  {
    id: 1,
    nama: "Starter",
    icon: Star,
    warna: "slate",
    harga: 250000,
    siklus: "bulan",
    deskripsi: "Cocok untuk sekolah yang baru memulai digitalisasi.",
    modul: ["akademik", "presensi"],
    langganan: 36,
    status: "aktif",
  },
  {
    id: 2,
    nama: "Professional",
    icon: Zap,
    warna: "blue",
    harga: 550000,
    siklus: "bulan",
    deskripsi: "Untuk sekolah yang butuh pengelolaan lebih lengkap.",
    modul: ["akademik", "presensi", "keuangan", "kepegawaian", "komunikasi"],
    langganan: 48,
    status: "aktif",
    populer: true,
  },
  {
    id: 3,
    nama: "Enterprise",
    icon: Crown,
    warna: "purple",
    harga: 1200000,
    siklus: "bulan",
    deskripsi: "Solusi menyeluruh untuk yayasan dengan banyak unit sekolah.",
    modul: MODUL_LIST.map((m) => m.id),
    langganan: 18,
    status: "aktif",
  },
  {
    id: 4,
    nama: "Trial",
    icon: Sparkles,
    warna: "amber",
    harga: 0,
    siklus: "14 hari",
    deskripsi: "Uji coba gratis sebelum berlangganan penuh.",
    modul: ["akademik", "presensi"],
    langganan: 0,
    status: "nonaktif",
  },
];

const WARNA_MAP = {
  slate: { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-200", ring: "ring-slate-200", solid: "bg-slate-600" },
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", ring: "ring-blue-200", solid: "bg-blue-600" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", ring: "ring-purple-200", solid: "bg-purple-600" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", ring: "ring-amber-200", solid: "bg-amber-600" },
};

function formatRupiah(angka) {
  if (angka === 0) return "Gratis";
  return "Rp" + angka.toLocaleString("id-ID");
}

// ================== HALAMAN ==================

export default function PaketModulPage() {
  const [activeMenu, setActiveMenu] = useState("paket-modul");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [paketList, setPaketList] = useState(PAKET_AWAL);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPaket, setEditingPaket] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [search, setSearch] = useState("");

  const notifications = [
    { id: 1, title: "Pembaruan Sistem v2.0", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Pengingat: Backup Data", desc: "Dikirim 1 hari lalu", read: false },
  ];

  const totalPaket = paketList.length;
  const paketAktif = paketList.filter((p) => p.status === "aktif").length;
  const totalLangganan = paketList.reduce((sum, p) => sum + p.langganan, 0);
  const totalPendapatan = paketList.reduce((sum, p) => sum + p.harga * p.langganan, 0);

  function openTambah() {
    setEditingPaket(null);
    setModalOpen(true);
  }

  function openEdit(paket) {
    setEditingPaket(paket);
    setModalOpen(true);
  }

  function simpanPaket(data) {
    if (editingPaket) {
      setPaketList((list) => list.map((p) => (p.id === editingPaket.id ? { ...p, ...data } : p)));
    } else {
      setPaketList((list) => [
        ...list,
        { ...data, id: Math.max(0, ...list.map((p) => p.id)) + 1, langganan: 0, icon: Package, warna: "slate" },
      ]);
    }
    setModalOpen(false);
  }

  function hapusPaket(id) {
    setPaketList((list) => list.filter((p) => p.id !== id));
    setConfirmDelete(null);
  }

  function duplikatPaket(paket) {
    setPaketList((list) => [
      ...list,
      { ...paket, id: Math.max(0, ...list.map((p) => p.id)) + 1, nama: paket.nama + " (Salinan)", langganan: 0, populer: false },
    ]);
  }

  function toggleStatus(id) {
    setPaketList((list) =>
      list.map((p) => (p.id === id ? { ...p, status: p.status === "aktif" ? "nonaktif" : "aktif" } : p))
    );
  }

  const filteredPaket = paketList.filter((p) => p.nama.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
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
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-slate-50/30">
          <div className="max-w-7xl mx-auto space-y-5 md:space-y-7">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-slate-800 tracking-tight flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-600 text-white shadow-sm">
                    <Package size={18} />
                  </span>
                  Paket &amp; Modul
                </h1>
                <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1.5 ml-[44px]">
                  <Sparkles size={14} className="text-slate-400" />
                  Kelola paket langganan dan modul yang tersedia untuk setiap sekolah.
                </p>
              </div>
              <button
                onClick={openTambah}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all"
              >
                <Plus size={16} />
                Tambah Paket
              </button>
            </div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <StatCard icon={Package} label="Total Paket" value={totalPaket} color="blue" />
              <StatCard icon={BadgeCheck} label="Paket Aktif" value={paketAktif} color="emerald" />
              <StatCard icon={Users} label="Total Langganan" value={totalLangganan} color="purple" />
              <StatCard icon={CircleDollarSign} label="Estimasi Pendapatan" value={formatRupiah(totalPendapatan)} color="orange" />
            </div>

            {/* SEARCH & FILTER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari paket..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-slate-400 transition"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="hidden sm:inline">{filteredPaket.length} paket ditemukan</span>
              </div>
            </div>

            {/* GRID PAKET */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {filteredPaket.map((paket) => (
                <PaketCard
                  key={paket.id}
                  paket={paket}
                  onEdit={() => openEdit(paket)}
                  onDelete={() => setConfirmDelete(paket)}
                  onDuplicate={() => duplikatPaket(paket)}
                  onToggleStatus={() => toggleStatus(paket.id)}
                />
              ))}
              {filteredPaket.length === 0 && (
                <div className="col-span-full text-center py-12 text-slate-400 text-sm border border-dashed border-slate-200 rounded-xl bg-white/50">
                  <Package size={32} className="mx-auto text-slate-300 mb-2" />
                  Tidak ada paket yang cocok dengan pencarian.
                </div>
              )}
            </div>

            {/* TABEL MATRIKS MODUL */}
            <ModulMatrix paketList={paketList} />
          </div>
        </main>
      </div>

      {modalOpen && (
        <PaketModal
          paket={editingPaket}
          onClose={() => setModalOpen(false)}
          onSave={simpanPaket}
        />
      )}

      {confirmDelete && (
        <ConfirmDeleteModal
          paket={confirmDelete}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => hapusPaket(confirmDelete.id)}
        />
      )}
    </div>
  );
}

// ================== STAT CARD ==================

function StatCard({ icon: Icon, label, value, color }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl ${colorMap[color]} flex items-center justify-center flex-shrink-0`}>
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{label}</p>
          <p className="text-lg font-semibold text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  );
}

// ================== KARTU PAKET ==================

function PaketCard({ paket, onEdit, onDelete, onDuplicate, onToggleStatus }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const warna = WARNA_MAP[paket.warna] || WARNA_MAP.slate;
  const Icon = paket.icon || Package;

  return (
    <div
      className={`relative bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-all duration-200 ${
        paket.populer ? `border-blue-300 ring-1 ring-blue-200` : "border-slate-200/80"
      }`}
    >
      {paket.populer && (
        <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white bg-blue-600 shadow-sm">
          Paling Populer
        </span>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${warna.bg} ${warna.text} flex items-center justify-center shadow-sm`}>
          <Icon size={18} />
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <MoreHorizontal size={16} />
          </button>
          {menuOpen && (
            <div
              onMouseLeave={() => setMenuOpen(false)}
              className="absolute right-0 mt-1 w-40 bg-white rounded-lg border border-slate-200 shadow-lg py-1 z-10"
            >
              <button onClick={() => { onEdit(); setMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50">
                <Pencil size={12} /> Edit
              </button>
              <button onClick={() => { onDuplicate(); setMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50">
                <Copy size={12} /> Duplikat
              </button>
              <button onClick={() => { onToggleStatus(); setMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50">
                <ShieldCheck size={12} /> {paket.status === "aktif" ? "Nonaktifkan" : "Aktifkan"}
              </button>
              <button onClick={() => { onDelete(); setMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-500 hover:bg-rose-50">
                <Trash2 size={12} /> Hapus
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="text-base font-semibold text-slate-800">{paket.nama}</h3>
      <p className="text-xs text-slate-400 mt-1 min-h-[2.4em] leading-relaxed">{paket.deskripsi}</p>

      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-xl font-bold text-slate-800">{formatRupiah(paket.harga)}</span>
        {paket.harga > 0 && <span className="text-xs text-slate-400">/ {paket.siklus}</span>}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
            paket.status === "aktif" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-slate-50 text-slate-500 border-slate-200"
          }`}
        >
          {paket.status === "aktif" ? "Aktif" : "Nonaktif"}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-400">
          <Users size={12} /> {paket.langganan} sekolah
        </span>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1">
          {paket.modul.length} Modul termasuk
        </p>
        {paket.modul.slice(0, 4).map((modId) => {
          const mod = MODUL_LIST.find((m) => m.id === modId);
          if (!mod) return null;
          return (
            <div key={modId} className="flex items-center gap-1.5 text-xs text-slate-600">
              <Check size={12} className="text-emerald-500 flex-shrink-0" />
              {mod.nama}
            </div>
          );
        })}
        {paket.modul.length > 4 && (
          <p className="text-[10px] text-slate-400 pl-[18px]">+{paket.modul.length - 4} modul lainnya</p>
        )}
      </div>

      <button
        onClick={onEdit}
        className="mt-4 w-full text-center py-2 rounded-lg text-sm font-medium text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors"
      >
        Kelola Paket
      </button>
    </div>
  );
}

// ================== MATRIKS MODUL PER PAKET ==================

function ModulMatrix({ paketList }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
          <Layers size={16} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-700">Matriks Modul per Paket</h3>
          <p className="text-xs text-slate-400">Perbandingan modul yang tersedia di setiap paket</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="text-left text-xs text-slate-400 border-b border-slate-200/60">
              <th className="pb-2 font-medium sticky left-0 bg-white">Modul</th>
              {paketList.map((p) => (
                <th key={p.id} className="pb-2 font-medium text-center px-2">{p.nama}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODUL_LIST.map((mod) => (
              <tr key={mod.id} className="border-b border-slate-100/80 last:border-0 hover:bg-slate-50/50 transition-colors">
                <td className="py-2.5 sticky left-0 bg-white hover:bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <mod.icon size={14} className="text-slate-400" />
                    <span className="font-medium text-slate-700">{mod.nama}</span>
                  </div>
                </td>
                {paketList.map((p) => (
                  <td key={p.id} className="py-2.5 text-center">
                    {p.modul.includes(mod.id) ? (
                      <Check size={16} className="text-emerald-500 mx-auto" />
                    ) : (
                      <X size={16} className="text-slate-200 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ================== MODAL TAMBAH / EDIT PAKET ==================

function PaketModal({ paket, onClose, onSave }) {
  const [nama, setNama] = useState(paket?.nama || "");
  const [deskripsi, setDeskripsi] = useState(paket?.deskripsi || "");
  const [harga, setHarga] = useState(paket?.harga ?? 0);
  const [siklus, setSiklus] = useState(paket?.siklus || "bulan");
  const [status, setStatus] = useState(paket?.status || "aktif");
  const [modulTerpilih, setModulTerpilih] = useState(paket?.modul || []);

  function toggleModul(id) {
    setModulTerpilih((list) => (list.includes(id) ? list.filter((m) => m !== id) : [...list, id]));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!nama.trim()) return;
    onSave({ nama, deskripsi, harga: Number(harga), siklus, status, modul: modulTerpilih });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white">
          <h3 className="text-lg font-semibold text-slate-800">
            {paket ? "Edit Paket" : "Tambah Paket Baru"}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="text-xs font-medium text-slate-500">Nama Paket</label>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              placeholder="Contoh: Professional"
              className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-700 transition"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">Deskripsi</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              rows={2}
              placeholder="Deskripsi singkat paket ini"
              className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-700 resize-none transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-500">Harga (Rp)</label>
              <input
                type="number"
                min="0"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-700 transition"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Siklus</label>
              <select
                value={siklus}
                onChange={(e) => setSiklus(e.target.value)}
                className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-700 bg-white transition"
              >
                <option value="bulan">Per Bulan</option>
                <option value="tahun">Per Tahun</option>
                <option value="14 hari">14 Hari (Trial)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">Status</label>
            <div className="mt-1 flex gap-2">
              <button
                type="button"
                onClick={() => setStatus("aktif")}
                className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                  status === "aktif" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >
                Aktif
              </button>
              <button
                type="button"
                onClick={() => setStatus("nonaktif")}
                className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                  status === "nonaktif" ? "bg-slate-100 text-slate-600 border-slate-300" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >
                Nonaktif
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">Modul Termasuk</label>
            <div className="mt-1.5 grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
              {MODUL_LIST.map((mod) => {
                const checked = modulTerpilih.includes(mod.id);
                return (
                  <button
                    type="button"
                    key={mod.id}
                    onClick={() => toggleModul(mod.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-left transition-colors ${
                      checked ? "bg-blue-50 border-blue-200" : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border ${
                        checked ? "bg-blue-600 border-blue-600" : "border-slate-300"
                      }`}
                    >
                      {checked && <Check size={10} className="text-white" />}
                    </span>
                    <mod.icon size={13} className="text-slate-400 flex-shrink-0" />
                    <span className="text-xs text-slate-600 truncate">{mod.nama}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all"
            >
              {paket ? "Simpan Perubahan" : "Tambah Paket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ================== MODAL KONFIRMASI HAPUS ==================

function ConfirmDeleteModal({ paket, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={22} />
        </div>
        <h3 className="text-center text-lg font-semibold text-slate-800">Hapus paket "{paket.nama}"?</h3>
        <p className="text-center text-sm text-slate-500 mt-2">
          Tindakan ini tidak dapat dibatalkan. {paket.langganan > 0 && `Paket ini masih memiliki ${paket.langganan} sekolah berlangganan.`}
        </p>
        <div className="flex items-center gap-3 mt-5">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 shadow-sm hover:shadow transition-all"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}