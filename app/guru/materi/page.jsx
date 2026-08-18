"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  BookOpen,
  Search,
  ChevronDown,
  Plus,
  Sparkles,
  FileText,
  Layers,
  CalendarDays,
  Paperclip,
  Eye,
  Pencil,
} from "lucide-react";

// ===== DUMMY DATA =====
// Catatan: ganti dengan data asli dari API/DB begitu tersedia.
const KELAS_OPTIONS = ["Semua Kelas", "9A", "9B", "8A", "8B"];

const materiList = [
  {
    id: 1,
    judul: "Persamaan Linear Satu Variabel",
    kelas: "9A",
    bab: "Bab 1 - Aljabar",
    tanggal: "12 Agustus 2026",
    jumlahFile: 3,
    deskripsi: "Materi dasar persamaan linear beserta contoh soal dan latihan.",
  },
  {
    id: 2,
    judul: "Sistem Persamaan Linear Dua Variabel",
    kelas: "9B",
    bab: "Bab 1 - Aljabar",
    tanggal: "12 Agustus 2026",
    jumlahFile: 2,
    deskripsi: "Metode substitusi dan eliminasi untuk SPLDV.",
  },
  {
    id: 3,
    judul: "Statistika Dasar: Mean, Median, Modus",
    kelas: "9A",
    bab: "Bab 3 - Statistika",
    tanggal: "5 Agustus 2026",
    jumlahFile: 4,
    deskripsi: "Pengenalan ukuran pemusatan data dan cara menghitungnya.",
  },
  {
    id: 4,
    judul: "Bangun Ruang Sisi Datar",
    kelas: "8A",
    bab: "Bab 2 - Geometri",
    tanggal: "1 Agustus 2026",
    jumlahFile: 5,
    deskripsi: "Kubus, balok, prisma, dan limas beserta rumus volume-luas.",
  },
  {
    id: 5,
    judul: "Relasi dan Fungsi",
    kelas: "8B",
    bab: "Bab 1 - Aljabar",
    tanggal: "29 Juli 2026",
    jumlahFile: 2,
    deskripsi: "Pengenalan konsep relasi, fungsi, dan cara penyajiannya.",
  },
  {
    id: 6,
    judul: "Trigonometri: Sudut dan Perbandingan",
    kelas: "9A",
    bab: "Bab 4 - Trigonometri",
    tanggal: "20 Juli 2026",
    jumlahFile: 3,
    deskripsi: "Konsep dasar sinus, cosinus, dan tangen pada segitiga siku-siku.",
  },
];

const kelasBadgeColor = {
  "9A": "bg-blue-50 text-blue-600 border-blue-200",
  "9B": "bg-purple-50 text-purple-600 border-purple-200",
  "8A": "bg-emerald-50 text-emerald-600 border-emerald-200",
  "8B": "bg-amber-50 text-amber-600 border-amber-200",
};

// ===== MAIN COMPONENT =====

export default function GuruMateriPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [kelas, setKelas] = useState(KELAS_OPTIONS[0]);
  const [search, setSearch] = useState("");

  const notifications = [
    { id: 1, title: "Rapat Wali Kelas", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Batas Input Nilai Rapor", desc: "Dikirim 5 jam lalu", read: false },
  ];

  const filteredMateri = useMemo(() => {
    return materiList.filter((m) => {
      const matchKelas = kelas === "Semua Kelas" || m.kelas === kelas;
      const matchSearch = !search.trim() || m.judul.toLowerCase().includes(search.toLowerCase());
      return matchKelas && matchSearch;
    });
  }, [kelas, search]);

  const summary = {
    total: materiList.length,
    bulanIni: materiList.filter((m) => m.tanggal.includes("Agustus")).length,
    kelasTercakup: new Set(materiList.map((m) => m.kelas)).size,
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="materi"
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
                    <BookOpen size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 truncate">
                    Materi
                  </h1>
                </div>
                <p className="text-sm text-slate-500 mt-1 ml-[42px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400 flex-shrink-0" />
                  <span className="truncate">Kelola bahan ajar untuk setiap kelas yang Anda ampu.</span>
                </p>
              </div>

              <button
                onClick={() => router.push("/guru/materi/tambah")}
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-sm whitespace-nowrap flex-shrink-0"
              >
                <Plus size={16} />
                Tambah Materi
              </button>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-blue-50 text-blue-600 border-blue-200 flex-shrink-0">
                  <Layers size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Total Materi</p>
                  <p className="text-lg font-bold text-slate-800">{summary.total}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-emerald-50 text-emerald-600 border-emerald-200 flex-shrink-0">
                  <CalendarDays size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Materi Bulan Ini</p>
                  <p className="text-lg font-bold text-slate-800">{summary.bulanIni}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-purple-50 text-purple-600 border-purple-200 flex-shrink-0">
                  <BookOpen size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Kelas Tercakup</p>
                  <p className="text-lg font-bold text-slate-800">{summary.kelasTercakup}</p>
                </div>
              </div>
            </div>

            {/* FILTER BAR */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <div className="relative w-full sm:w-48">
                  <select
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors cursor-pointer"
                  >
                    {KELAS_OPTIONS.map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative flex-1 min-w-[200px]">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari judul materi..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* GRID MATERI */}
            {filteredMateri.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-10 text-center">
                <BookOpen size={28} className="mx-auto text-slate-300 mb-2" />
                <p className="text-sm text-slate-400">Tidak ada materi yang cocok.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMateri.map((m) => (
                  <div
                    key={m.id}
                    className="bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 p-4 sm:p-5 flex flex-col min-w-0"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
                        <FileText size={18} />
                      </div>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border flex-shrink-0 ${kelasBadgeColor[m.kelas]}`}>
                        {m.kelas}
                      </span>
                    </div>

                    <h3 className="mt-3 text-sm font-semibold text-slate-800 leading-snug line-clamp-2">{m.judul}</h3>
                    <p className="text-xs text-slate-400 mt-1">{m.bab}</p>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed line-clamp-2 flex-1">{m.deskripsi}</p>

                    <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-3 text-xs text-slate-400 min-w-0">
                        <span className="flex items-center gap-1 flex-shrink-0">
                          <CalendarDays size={12} />
                          {m.tanggal}
                        </span>
                        <span className="flex items-center gap-1 flex-shrink-0">
                          <Paperclip size={12} />
                          {m.jumlahFile} file
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => router.push(`/guru/materi/${m.id}`)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <Eye size={13} />
                        Lihat
                      </button>
                      <button
                        onClick={() => router.push(`/guru/materi/${m.id}/edit`)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Pencil size={13} />
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}