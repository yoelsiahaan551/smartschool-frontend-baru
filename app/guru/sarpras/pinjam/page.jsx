"use client";

import { useState, useMemo } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  Package,
  Sparkles,
  Search,
  Projector,
  Speaker,
  Dumbbell,
  DoorOpen,
  Laptop,
  Wrench,
  X,
  CalendarDays,
  Clock,
  CheckCircle2,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ===== DUMMY DATA =====
// Katalog item/ruangan + siapa yang sedang memakainya hari ini.
// Ganti dengan data asli dari API/DB begitu tersedia.

const KATEGORI = ["Semua", "Elektronik", "Ruangan", "Olahraga", "Lainnya"];

const daftarItem = [
  {
    id: 1,
    nama: "Proyektor Epson EB-X05",
    kategori: "Elektronik",
    icon: Projector,
    kode: "ELK-001",
    stokTotal: 3,
    sedangDipakai: [
      { kelas: "9A", jamMulai: "08:00", jamSelesai: "09:30" },
      { kelas: "8B", jamMulai: "10:00", jamSelesai: "11:30" },
    ],
  },
  {
    id: 2,
    nama: "Sound System Portable",
    kategori: "Elektronik",
    icon: Speaker,
    kode: "ELK-002",
    stokTotal: 1,
    sedangDipakai: [
      { kelas: "7C", jamMulai: "09:00", jamSelesai: "12:00" },
    ],
  },
  {
    id: 3,
    nama: "Laptop Lenovo ThinkPad",
    kategori: "Elektronik",
    icon: Laptop,
    kode: "ELK-003",
    stokTotal: 4,
    sedangDipakai: [
      { kelas: "9B", jamMulai: "07:30", jamSelesai: "09:00" },
    ],
  },
  {
    id: 4,
    nama: "Ruang Lab Komputer 2",
    kategori: "Ruangan",
    icon: DoorOpen,
    kode: "RG-002",
    stokTotal: 1,
    sedangDipakai: [],
  },
  {
    id: 5,
    nama: "Ruang Rapat Guru",
    kategori: "Ruangan",
    icon: DoorOpen,
    kode: "RG-005",
    stokTotal: 1,
    sedangDipakai: [
      { kelas: "Rapat MGMP", jamMulai: "13:00", jamSelesai: "14:30" },
    ],
  },
  {
    id: 6,
    nama: "Aula Serbaguna",
    kategori: "Ruangan",
    icon: DoorOpen,
    kode: "RG-001",
    stokTotal: 1,
    sedangDipakai: [],
  },
  {
    id: 7,
    nama: "Matras Olahraga",
    kategori: "Olahraga",
    icon: Dumbbell,
    kode: "OR-004",
    stokTotal: 10,
    sedangDipakai: [
      { kelas: "8A", jamMulai: "08:00", jamSelesai: "09:30" },
    ],
  },
  {
    id: 8,
    nama: "Bola Basket",
    kategori: "Olahraga",
    icon: Dumbbell,
    kode: "OR-007",
    stokTotal: 6,
    sedangDipakai: [],
  },
  {
    id: 9,
    nama: "Kotak P3K Lapangan",
    kategori: "Lainnya",
    icon: Wrench,
    kode: "LN-002",
    stokTotal: 2,
    sedangDipakai: [],
  },
];

const colorByKategori = {
  Elektronik: "bg-blue-600",
  Ruangan: "bg-violet-600",
  Olahraga: "bg-emerald-600",
  Lainnya: "bg-slate-500",
};

// jam kerja sekolah untuk pilihan dropdown jam peminjaman
const pilihanJam = [
  "07:00", "07:30", "08:00", "08:30", "09:00", "09:30",
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
];

export default function GuruSarprasPinjamPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [pencarian, setPencarian] = useState("");
  const [itemDipilih, setItemDipilih] = useState(null);
  const [berhasilKirim, setBerhasilKirim] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  // form state
  const [tanggalPinjam, setTanggalPinjam] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [jumlah, setJumlah] = useState(1);

  const notifications = [
    { id: 1, title: "Pengajuan Disetujui", desc: "Dikirim 1 jam lalu", read: false },
    { id: 2, title: "Batas Pengembalian Alat", desc: "Dikirim 4 jam lalu", read: false },
  ];

  const itemTersaring = useMemo(() => {
    return daftarItem.filter((item) => {
      const cocokKategori = kategoriAktif === "Semua" || item.kategori === kategoriAktif;
      const cocokPencarian = item.nama.toLowerCase().includes(pencarian.toLowerCase());
      return cocokKategori && cocokPencarian;
    });
  }, [kategoriAktif, pencarian]);

  const sisaStok = (item) => item.stokTotal - item.sedangDipakai.length;

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const bukaForm = (item) => {
    setItemDipilih(item);
    setBerhasilKirim(false);
    setTanggalPinjam("");
    setJamMulai("");
    setJamSelesai("");
    setKeperluan("");
    setJumlah(1);
  };

  const tutupForm = () => {
    setItemDipilih(null);
    setBerhasilKirim(false);
  };

  const kirimPengajuan = (e) => {
    e.preventDefault();
    // TODO: kirim ke API/DB
    setBerhasilKirim(true);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="sarpras"
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          user={{ name: "Bu Sari", email: "guru@smartschool.com", avatar: "AS" }}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full space-y-6">

            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-600 text-white shadow-sm flex-shrink-0">
                    <Package size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 truncate">
                    Pinjam Sarana Prasarana
                  </h1>
                </div>
                <p className="text-sm text-slate-500 mt-1 ml-[42px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400 flex-shrink-0" />
                  <span className="truncate">Cek sisa stok dan jadwal pemakaian, lalu ajukan peminjaman.</span>
                </p>
              </div>
            </div>

            {/* SEARCH + FILTER */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={pencarian}
                  onChange={(e) => setPencarian(e.target.value)}
                  placeholder="Cari item atau ruangan..."
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 placeholder:text-slate-400"
                />
              </div>
              <div className="flex gap-1.5 overflow-x-auto sm:overflow-visible">
                {KATEGORI.map((k) => (
                  <button
                    key={k}
                    onClick={() => setKategoriAktif(k)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg border whitespace-nowrap transition-colors ${
                      kategoriAktif === k
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>

            {/* DAFTAR ITEM */}
            <div className="space-y-3">
              {itemTersaring.map((item) => {
                const sisa = sisaStok(item);
                const habis = sisa <= 0;
                const expanded = expandedId === item.id;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden"
                  >
                    {/* HEADER ROW */}
                    <div className="flex items-center gap-3 p-4 sm:p-5">
                      <div className={`p-2.5 rounded-lg text-white shadow-sm flex-shrink-0 ${colorByKategori[item.kategori]}`}>
                        <item.icon size={18} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h2 className="text-sm font-semibold text-slate-800 truncate">{item.nama}</h2>
                          <span className="text-[10px] font-medium text-slate-400 flex-shrink-0">{item.kode}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{item.kategori}</p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${
                            habis
                              ? "bg-red-50 text-red-600 border-red-200"
                              : "bg-emerald-50 text-emerald-600 border-emerald-200"
                          }`}
                        >
                          Sisa {sisa}/{item.stokTotal}
                        </span>

                        {item.sedangDipakai.length > 0 && (
                          <button
                            onClick={() => toggleExpand(item.id)}
                            className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-700 px-2 py-1 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            {item.sedangDipakai.length} sedang dipakai
                            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          </button>
                        )}

                        <button
                          onClick={() => bukaForm(item)}
                          disabled={habis}
                          className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors flex-shrink-0 ${
                            habis
                              ? "text-slate-300 cursor-not-allowed"
                              : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          }`}
                        >
                          Ajukan
                        </button>
                      </div>
                    </div>

                    {/* MOBILE toggle pemakaian */}
                    {item.sedangDipakai.length > 0 && (
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="sm:hidden flex items-center gap-1 text-[11px] font-medium text-slate-500 px-4 pb-3 -mt-1"
                      >
                        {item.sedangDipakai.length} sedang dipakai
                        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>
                    )}

                    {/* DETAIL PEMAKAIAN */}
                    {expanded && item.sedangDipakai.length > 0 && (
                      <div className="border-t border-slate-100 bg-slate-50/60 px-4 sm:px-5 py-3 space-y-2">
                        {item.sedangDipakai.map((p, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-xs">
                            <div className="flex items-center gap-1.5 w-28 flex-shrink-0">
                              <Users size={12} className="text-slate-400" />
                              <span className="font-medium text-slate-700">{p.kelas}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-500">
                              <Clock size={12} className="text-slate-400" />
                              <span>{p.jamMulai} – {p.jamSelesai}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {itemTersaring.length === 0 && (
                <div className="text-center py-12 text-sm text-slate-400">
                  Tidak ada item yang cocok dengan pencarian.
                </div>
              )}
            </div>

          </div>
        </main>
      </div>

      {/* MODAL FORM PENGAJUAN */}
      {itemDipilih && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Ajukan Peminjaman</h3>
                <p className="text-xs text-slate-500 mt-0.5">{itemDipilih.nama}</p>
              </div>
              <button
                onClick={tutupForm}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {berhasilKirim ? (
              <div className="p-8 flex flex-col items-center text-center gap-3">
                <div className="p-3 rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Pengajuan berhasil dikirim</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Menunggu persetujuan dari admin sarpras. Kamu bisa memantau statusnya di menu Peminjaman.
                  </p>
                </div>
                <button
                  onClick={tutupForm}
                  className="mt-2 px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Selesai
                </button>
              </div>
            ) : (
              <form onSubmit={kirimPengajuan} className="p-5 space-y-4">
                {/* Info sisa stok saat ini di dalam form, biar keingetan */}
                <div className="flex items-center justify-between text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                  <span className="text-slate-500">Sisa stok saat ini</span>
                  <span className="font-semibold text-slate-700">
                    {sisaStok(itemDipilih)}/{itemDipilih.stokTotal}
                  </span>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1">
                    <CalendarDays size={12} className="text-slate-400" />
                    Tanggal Pinjam
                  </label>
                  <input
                    type="date"
                    required
                    value={tanggalPinjam}
                    onChange={(e) => setTanggalPinjam(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1">
                      <Clock size={12} className="text-slate-400" />
                      Jam Mulai
                    </label>
                    <select
                      required
                      value={jamMulai}
                      onChange={(e) => setJamMulai(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white"
                    >
                      <option value="" disabled>Pilih jam</option>
                      {pilihanJam.map((jam) => (
                        <option key={jam} value={jam}>{jam}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1">
                      <Clock size={12} className="text-slate-400" />
                      Jam Selesai
                    </label>
                    <select
                      required
                      value={jamSelesai}
                      onChange={(e) => setJamSelesai(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white"
                    >
                      <option value="" disabled>Pilih jam</option>
                      {pilihanJam
                        .filter((jam) => !jamMulai || jam > jamMulai)
                        .map((jam) => (
                          <option key={jam} value={jam}>{jam}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                    Jumlah (maks. {sisaStok(itemDipilih)})
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={sisaStok(itemDipilih)}
                    required
                    value={jumlah}
                    onChange={(e) => setJumlah(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                    Keperluan
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={keperluan}
                    onChange={(e) => setKeperluan(e.target.value)}
                    placeholder="Contoh: Presentasi materi Bab 3 di kelas 9A"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 resize-none placeholder:text-slate-400"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={tutupForm}
                    className="flex-1 px-4 py-2.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Kirim Pengajuan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}