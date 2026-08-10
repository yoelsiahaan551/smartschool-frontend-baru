"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import {
  Package,
  Layers,
  Grid3x3,
  CheckCircle,
  XCircle,
  Check,
  X,
  Star,
  Crown,
  Zap,
  Sparkles,
  Plus,
  Search,
  Edit,
  Trash2,
  School,
  DollarSign,
  TrendingUp,
  BookOpen,
  Wallet,
  Library,
  ClipboardCheck,
  FileSpreadsheet,
  UserPlus,
  MessageSquareText,
  GraduationCap,
  ScanFace,
  Building,
  Plug,
} from "lucide-react";

// ── Data Modul ──────────────────────────────────────────────
const modulData = [
  { id: "akademik", nama: "Akademik", kategori: "Inti", icon: BookOpen, deskripsi: "Kelola kurikulum, jadwal, dan nilai" },
  { id: "presensi", nama: "Presensi", kategori: "Inti", icon: ClipboardCheck, deskripsi: "Pencatatan kehadiran siswa & guru" },
  { id: "rapor", nama: "Rapor Digital", kategori: "Inti", icon: FileSpreadsheet, deskripsi: "Rapor otomatis dan riwayat nilai" },
  { id: "keuangan", nama: "Keuangan", kategori: "Operasional", icon: Wallet, deskripsi: "SPP, tagihan, dan laporan keuangan" },
  { id: "perpustakaan", nama: "Perpustakaan", kategori: "Operasional", icon: Library, deskripsi: "Manajemen buku dan peminjaman" },
  { id: "ppdb", nama: "PPDB Online", kategori: "Operasional", icon: UserPlus, deskripsi: "Pendaftaran siswa baru online" },
  { id: "notifikasi", nama: "Notifikasi WA", kategori: "Operasional", icon: MessageSquareText, deskripsi: "Notifikasi otomatis via WhatsApp" },
  { id: "elearning", nama: "E-Learning", kategori: "Lanjutan", icon: GraduationCap, deskripsi: "Kelas daring dan bank soal" },
  { id: "absensiwajah", nama: "Absensi Wajah", kategori: "Lanjutan", icon: ScanFace, deskripsi: "Presensi dengan face recognition" },
  { id: "multicabang", nama: "Multi Cabang", kategori: "Lanjutan", icon: Building, deskripsi: "Kelola beberapa unit sekolah sekaligus" },
  { id: "api", nama: "API Integrasi", kategori: "Lanjutan", icon: Plug, deskripsi: "Integrasi dengan sistem eksternal" },
];

// ── Data Paket ──────────────────────────────────────────────
const paketData = [
  {
    id: 1,
    nama: "Starter",
    harga: 500000,
    siklus: "Bulanan",
    status: "Aktif",
    sekolahAktif: 45,
    popular: false,
    warna: "slate",
    modul: ["akademik", "presensi", "rapor"],
  },
  {
    id: 2,
    nama: "Professional",
    harga: 1500000,
    siklus: "Bulanan",
    status: "Aktif",
    sekolahAktif: 58,
    popular: true,
    warna: "blue",
    modul: ["akademik", "presensi", "rapor", "keuangan", "perpustakaan", "ppdb", "notifikasi"],
  },
  {
    id: 3,
    nama: "Enterprise",
    harga: 3500000,
    siklus: "Bulanan",
    status: "Aktif",
    sekolahAktif: 22,
    popular: false,
    warna: "indigo",
    modul: modulData.map((m) => m.id),
  },
];

const formatRupiah = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

const stats = {
  totalPaket: paketData.length,
  totalModul: modulData.length,
  sekolahBerlangganan: paketData.reduce((sum, p) => sum + p.sekolahAktif, 0),
  pendapatan: paketData.reduce((sum, p) => sum + p.harga * p.sekolahAktif, 0),
};

export default function PaketModulPage() {
  const [activeMenu, setActiveMenu] = useState("paket");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPaketModal, setShowPaketModal] = useState(false);
  const [showModulModal, setShowModulModal] = useState(false);
  const [selectedPaket, setSelectedPaket] = useState(null);
  const [selectedModul, setSelectedModul] = useState(null);

  const notifications = [
    { id: 1, title: "Pembaruan Sistem v2.0", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Pengingat: Backup Data", desc: "Dikirim 1 hari lalu", read: false },
    { id: 3, title: "Modul baru ditambahkan", desc: "Dikirim 3 hari lalu", read: true },
  ];

  const filteredModul = modulData.filter(
    (m) =>
      m.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditPaket = (paket) => {
    setSelectedPaket(paket);
    setShowPaketModal(true);
  };

  const handleEditModul = (modul) => {
    setSelectedModul(modul);
    setShowModulModal(true);
  };

  const handleDeleteModul = (modul) => {
    if (confirm(`Apakah Anda yakin ingin menghapus modul ${modul.nama}?`)) {
      // Handle delete
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
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
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-white">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 flex flex-wrap items-center gap-2 sm:gap-3">
                  Paket & Modul
                  <span className="text-xs sm:text-sm font-normal text-slate-400 bg-slate-50/80 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-slate-200/50">
                    Produk
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1 flex items-center gap-1.5 sm:gap-2">
                  <Sparkles size={14} className="text-slate-400 hidden sm:inline" />
                  Atur paket langganan dan modul yang tersedia untuk sekolah.
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <button
                  onClick={() => { setSelectedModul(null); setShowModulModal(true); }}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow"
                >
                  <Grid3x3 size={14} className="text-slate-400 hidden sm:inline" />
                  <span className="hidden xs:inline">Tambah Modul</span>
                  <span className="xs:hidden">Modul</span>
                </button>
                <button
                  onClick={() => { setSelectedPaket(null); setShowPaketModal(true); }}
                  className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:-translate-y-0.5"
                >
                  <Plus size={14} />
                  <span className="hidden xs:inline">Tambah Paket</span>
                  <span className="xs:hidden">Paket</span>
                </button>
              </div>
            </div>

            {/* STATISTIK */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
              <StatCardPremium
                label="Total Paket"
                value={stats.totalPaket}
                icon={Package}
                gradient="from-blue-500 to-blue-600"
                bg="bg-blue-50"
                textColor="text-blue-600"
              />
              <StatCardPremium
                label="Total Modul"
                value={stats.totalModul}
                icon={Layers}
                gradient="from-purple-500 to-purple-600"
                bg="bg-purple-50"
                textColor="text-purple-600"
              />
              <StatCardPremium
                label="Sekolah Berlangganan"
                value={stats.sekolahBerlangganan}
                icon={School}
                gradient="from-emerald-500 to-emerald-600"
                bg="bg-emerald-50"
                textColor="text-emerald-600"
              />
              <StatCardPremium
                label="Pendapatan / Bulan"
                value={formatRupiah(stats.pendapatan)}
                icon={DollarSign}
                gradient="from-amber-500 to-amber-600"
                bg="bg-amber-50"
                textColor="text-amber-600"
              />
            </div>

            {/* PAKET CARDS */}
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-slate-700 mb-3 sm:mb-4 flex items-center gap-2">
                <Package size={16} className="text-slate-400" />
                Paket Langganan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {paketData.map((paket) => (
                  <PaketCard key={paket.id} paket={paket} onEdit={() => handleEditPaket(paket)} />
                ))}
              </div>
            </div>

            {/* MODUL TABLE + MATRIX */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="p-3 sm:p-4 md:p-5 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-sm sm:text-base font-semibold text-slate-700 flex items-center gap-2">
                    <Layers size={16} className="text-slate-400" />
                    Daftar Modul
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">Modul yang tersedia di setiap paket langganan</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari modul..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50/60 border-b border-slate-200/60">
                      <th className="px-3 sm:px-4 py-3 sm:py-3.5 text-left text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Modul</th>
                      <th className="hidden sm:table-cell px-3 sm:px-4 py-3 sm:py-3.5 text-left text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Kategori</th>
                      {paketData.map((paket) => (
                        <th key={paket.id} className="px-2 sm:px-4 py-3 sm:py-3.5 text-center text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                          {paket.nama}
                        </th>
                      ))}
                      <th className="px-3 sm:px-4 py-3 sm:py-3.5 text-right text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/80">
                    {filteredModul.length === 0 ? (
                      <tr>
                        <td colSpan={3 + paketData.length} className="px-4 py-12 text-center text-slate-500">
                          <div className="flex flex-col items-center gap-2">
                            <Search size={32} className="text-slate-300" />
                            <p className="text-sm font-medium">Tidak ada modul yang ditemukan</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredModul.map((modul) => (
                        <tr key={modul.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-3 sm:px-4 py-3 sm:py-3.5">
                            <div className="flex items-center gap-2.5 sm:gap-3">
                              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200/50 flex items-center justify-center shadow-sm flex-shrink-0">
                                <modul.icon size={15} className="text-slate-500" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium text-slate-800 text-xs sm:text-sm truncate">{modul.nama}</p>
                                <p className="text-[10px] sm:text-xs text-slate-400 truncate hidden sm:block">{modul.deskripsi}</p>
                              </div>
                            </div>
                          </td>
                          <td className="hidden sm:table-cell px-3 sm:px-4 py-3 sm:py-3.5">
                            <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-slate-100 text-slate-600 whitespace-nowrap">
                              {modul.kategori}
                            </span>
                          </td>
                          {paketData.map((paket) => (
                            <td key={paket.id} className="px-2 sm:px-4 py-3 sm:py-3.5 text-center">
                              {paket.modul.includes(modul.id) ? (
                                <CheckCircle size={16} className="text-emerald-500 mx-auto" />
                              ) : (
                                <XCircle size={16} className="text-slate-200 mx-auto" />
                              )}
                            </td>
                          ))}
                          <td className="px-3 sm:px-4 py-3 sm:py-3.5 text-right">
                            <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                              <button
                                onClick={() => handleEditModul(modul)}
                                className="p-1.5 sm:p-2 rounded-xl hover:bg-amber-50 text-slate-400 hover:text-amber-600 transition-all"
                                title="Edit"
                              >
                                <Edit size={14} className="sm:w-4 sm:h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteModul(modul)}
                                className="p-1.5 sm:p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all"
                                title="Hapus"
                              >
                                <Trash2 size={14} className="sm:w-4 sm:h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showPaketModal && (
        <PaketModalPremium onClose={() => setShowPaketModal(false)} paket={selectedPaket} />
      )}

      {showModulModal && (
        <ModulModalPremium onClose={() => setShowModulModal(false)} modul={selectedModul} />
      )}
    </div>
  );
}

function StatCardPremium({ label, value, icon: Icon, gradient, bg, textColor }) {
  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl border border-slate-200/60 p-3 sm:p-5 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className={`relative w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${bg} flex items-center justify-center overflow-hidden flex-shrink-0`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
          <Icon size={16} className={`${textColor} relative z-10 sm:w-[22px] sm:h-[22px]`} />
        </div>
        <div className="min-w-0">
          <p className="text-[8px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider truncate">{label}</p>
          <p className="text-sm sm:text-xl font-bold text-slate-800 truncate">{value}</p>
        </div>
      </div>
    </div>
  );
}

function PaketCard({ paket, onEdit }) {
  const colorMap = {
    slate: { ring: "border-slate-200/60", badge: "bg-slate-100 text-slate-600", icon: "bg-slate-50 text-slate-500", btn: "bg-slate-800 hover:bg-slate-900" },
    blue: { ring: "border-blue-300 ring-2 ring-blue-500/20", badge: "bg-blue-50 text-blue-600", icon: "bg-blue-50 text-blue-600", btn: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/25" },
    indigo: { ring: "border-indigo-200/60", badge: "bg-indigo-50 text-indigo-600", icon: "bg-indigo-50 text-indigo-600", btn: "bg-slate-800 hover:bg-slate-900" },
  };
  const c = colorMap[paket.warna];
  const iconForPaket = paket.warna === "blue" ? Star : paket.warna === "indigo" ? Crown : Zap;
  const IconComp = iconForPaket;

  return (
    <div className={`relative bg-white rounded-2xl border ${c.ring} p-4 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col`}>
      {paket.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/25 whitespace-nowrap">
          Paling Populer
        </span>
      )}

      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${c.icon} flex items-center justify-center`}>
          <IconComp size={18} />
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium border ${
          paket.status === "Aktif" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-rose-50 text-rose-600 border-rose-200"
        }`}>
          {paket.status}
        </span>
      </div>

      <h3 className="text-base sm:text-lg font-bold text-slate-800">{paket.nama}</h3>
      <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1">
        <span className="text-xl sm:text-2xl font-bold text-slate-800">{formatRupiah(paket.harga)}</span>
        <span className="text-xs text-slate-400">/{paket.siklus === "Bulanan" ? "bulan" : "tahun"}</span>
      </div>

      <div className="mt-3 sm:mt-4 flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
        <School size={13} className="text-slate-400" />
        <span>{paket.sekolahAktif} sekolah berlangganan</span>
      </div>

      <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-slate-100 space-y-1.5 sm:space-y-2 flex-1">
        {paket.modul.slice(0, 5).map((modId) => {
          const mod = modulData.find((m) => m.id === modId);
          if (!mod) return null;
          return (
            <div key={modId} className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
              <Check size={14} className="text-emerald-500 flex-shrink-0" />
              <span className="truncate">{mod.nama}</span>
            </div>
          );
        })}
        {paket.modul.length > 5 && (
          <p className="text-xs text-slate-400 pl-5 sm:pl-6">+{paket.modul.length - 5} modul lainnya</p>
        )}
      </div>

      <button
        onClick={onEdit}
        className={`mt-4 sm:mt-5 w-full py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium text-white transition-all ${c.btn}`}
      >
        Kelola Paket
      </button>
    </div>
  );
}

function PaketModalPremium({ onClose, paket }) {
  const isEdit = !!paket;
  const [selectedModul, setSelectedModul] = useState(isEdit ? paket.modul : []);

  const toggleModul = (id) => {
    setSelectedModul((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-2 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-200/60 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between z-10">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">
            {isEdit ? "Edit Paket" : "Tambah Paket"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3 sm:mb-4 flex items-center gap-2">
              <Package size={16} className="text-blue-500" />
              Informasi Paket
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Nama Paket</label>
                <input
                  type="text"
                  defaultValue={isEdit ? paket.nama : ""}
                  className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                  placeholder="Masukkan nama paket"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Harga (Rp)</label>
                <input
                  type="number"
                  defaultValue={isEdit ? paket.harga : ""}
                  className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                  placeholder="Masukkan harga"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Siklus Tagihan</label>
                <select className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all cursor-pointer text-slate-600">
                  <option selected={isEdit && paket.siklus === "Bulanan"}>Bulanan</option>
                  <option selected={isEdit && paket.siklus === "Tahunan"}>Tahunan</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Status</label>
                <select className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all cursor-pointer text-slate-600">
                  <option selected={isEdit && paket.status === "Aktif"}>Aktif</option>
                  <option selected={isEdit && paket.status === "Nonaktif"}>Nonaktif</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3 sm:mb-4 flex items-center gap-2">
              <Layers size={16} className="text-purple-500" />
              Modul yang Termasuk
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              {modulData.map((mod) => {
                const checked = selectedModul.includes(mod.id);
                return (
                  <label
                    key={mod.id}
                    className={`flex items-center gap-2.5 px-3 py-2 sm:py-2.5 rounded-xl border cursor-pointer transition-all ${
                      checked ? "bg-blue-50/60 border-blue-200" : "bg-slate-50/80 border-slate-200/60 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleModul(mod.id)}
                      className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                    />
                    <mod.icon size={15} className={checked ? "text-blue-600" : "text-slate-400"} />
                    <span className={`text-xs sm:text-sm ${checked ? "text-blue-700 font-medium" : "text-slate-600"}`}>
                      {mod.nama}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 sm:gap-3 pt-4 border-t border-slate-200/60">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
            >
              Batal
            </button>
            <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all">
              {isEdit ? "Update" : "Simpan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModulModalPremium({ onClose, modul }) {
  const isEdit = !!modul;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-2 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-200/60 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between z-10">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">
            {isEdit ? "Edit Modul" : "Tambah Modul"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Nama Modul</label>
            <input
              type="text"
              defaultValue={isEdit ? modul.nama : ""}
              className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              placeholder="Masukkan nama modul"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Kategori</label>
            <select className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all cursor-pointer text-slate-600">
              <option selected={isEdit && modul.kategori === "Inti"}>Inti</option>
              <option selected={isEdit && modul.kategori === "Operasional"}>Operasional</option>
              <option selected={isEdit && modul.kategori === "Lanjutan"}>Lanjutan</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Deskripsi</label>
            <textarea
              defaultValue={isEdit ? modul.deskripsi : ""}
              rows={3}
              className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none"
              placeholder="Deskripsi singkat modul"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 sm:gap-3 pt-4 border-t border-slate-200/60">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
            >
              Batal
            </button>
            <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all">
              {isEdit ? "Update" : "Simpan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}