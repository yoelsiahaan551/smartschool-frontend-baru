"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  Brain,
  Search,
  ChevronDown,
  Plus,
  Sparkles,
  HelpCircle,
  Layers,
  CalendarDays,
  Timer,
  Eye,
  Pencil,
  Send,
  BarChart3,
} from "lucide-react";

// ===== DUMMY DATA =====
// Catatan: ganti dengan data asli dari API/DB begitu tersedia.
const KELAS_OPTIONS = ["Semua Kelas", "9A", "9B", "8A", "8B"];

const kuizList = [
  {
    id: 1,
    judul: "Kuis Persamaan Linear Satu Variabel",
    kelas: "9A",
    bab: "Bab 1 - Aljabar",
    tanggal: "12 Agustus 2026",
    durasi: 20,
    jumlahSoal: 10,
    status: "Aktif",
    totalSiswa: 32,
    sudahMengerjakan: 18,
  },
  {
    id: 2,
    judul: "Kuis SPLDV: Substitusi dan Eliminasi",
    kelas: "9B",
    bab: "Bab 1 - Aljabar",
    tanggal: "11 Agustus 2026",
    durasi: 30,
    jumlahSoal: 8,
    status: "Aktif",
    totalSiswa: 30,
    sudahMengerjakan: 5,
  },
  {
    id: 3,
    judul: "Kuis Statistika: Mean, Median, Modus",
    kelas: "9A",
    bab: "Bab 3 - Statistika",
    tanggal: "5 Agustus 2026",
    durasi: 15,
    jumlahSoal: 10,
    status: "Selesai",
    totalSiswa: 32,
    sudahMengerjakan: 32,
  },
  {
    id: 4,
    judul: "Kuis Bangun Ruang Sisi Datar",
    kelas: "8A",
    bab: "Bab 2 - Geometri",
    tanggal: "1 Agustus 2026",
    durasi: 25,
    jumlahSoal: 12,
    status: "Selesai",
    totalSiswa: 28,
    sudahMengerjakan: 26,
  },
  {
    id: 5,
    judul: "Kuis Relasi dan Fungsi",
    kelas: "8B",
    bab: "Bab 1 - Aljabar",
    tanggal: "16 Agustus 2026",
    durasi: 15,
    jumlahSoal: 6,
    status: "Draft",
    totalSiswa: 29,
    sudahMengerjakan: 0,
  },
  {
    id: 6,
    judul: "Kuis Trigonometri Dasar",
    kelas: "9A",
    bab: "Bab 4 - Trigonometri",
    tanggal: "20 Juli 2026",
    durasi: 20,
    jumlahSoal: 10,
    status: "Selesai",
    totalSiswa: 32,
    sudahMengerjakan: 30,
  },
];

const kelasBadgeColor = {
  "9A": "bg-blue-50 text-blue-600 border-blue-200",
  "9B": "bg-purple-50 text-purple-600 border-purple-200",
  "8A": "bg-emerald-50 text-emerald-600 border-emerald-200",
  "8B": "bg-amber-50 text-amber-600 border-amber-200",
};

const statusBadgeColor = {
  Draft: "bg-slate-100 text-slate-500 border-slate-200",
  Aktif: "bg-blue-50 text-blue-600 border-blue-200",
  Selesai: "bg-rose-50 text-rose-600 border-rose-200",
};

// ===== MAIN COMPONENT =====

export default function GuruKuizPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [kelas, setKelas] = useState(KELAS_OPTIONS[0]);
  const [search, setSearch] = useState("");

  const notifications = [
    { id: 1, title: "Rapat Wali Kelas", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Batas Input Nilai Rapor", desc: "Dikirim 5 jam lalu", read: false },
  ];

  const filteredKuiz = useMemo(() => {
    return kuizList.filter((k) => {
      const matchKelas = kelas === "Semua Kelas" || k.kelas === kelas;
      const matchSearch = !search.trim() || k.judul.toLowerCase().includes(search.toLowerCase());
      return matchKelas && matchSearch;
    });
  }, [kelas, search]);

  const summary = {
    total: kuizList.length,
    aktif: kuizList.filter((k) => k.status === "Aktif").length,
    kelasTercakup: new Set(kuizList.map((k) => k.kelas)).size,
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="kuiz"
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
                    <Brain size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 truncate">
                    Kuis
                  </h1>
                </div>
                <p className="text-sm text-slate-500 mt-1 ml-[42px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400 flex-shrink-0" />
                  <span className="truncate">Buat dan kelola kuis untuk setiap kelas yang Anda ampu.</span>
                </p>
              </div>

              <button
                onClick={() => router.push("/guru/kuiz/tambah")}
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-sm whitespace-nowrap flex-shrink-0"
              >
                <Plus size={16} />
                Buat Kuis
              </button>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-blue-50 text-blue-600 border-blue-200 flex-shrink-0">
                  <Layers size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Total Kuis</p>
                  <p className="text-lg font-bold text-slate-800">{summary.total}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-emerald-50 text-emerald-600 border-emerald-200 flex-shrink-0">
                  <BarChart3 size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Sedang Aktif</p>
                  <p className="text-lg font-bold text-slate-800">{summary.aktif}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-purple-50 text-purple-600 border-purple-200 flex-shrink-0">
                  <Brain size={16} />
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
                    placeholder="Cari judul kuis..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* GRID KUIS */}
            {filteredKuiz.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-10 text-center">
                <Brain size={28} className="mx-auto text-slate-300 mb-2" />
                <p className="text-sm text-slate-400">Tidak ada kuis yang cocok.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredKuiz.map((k) => {
                  const progress = k.totalSiswa
                    ? Math.round((k.sudahMengerjakan / k.totalSiswa) * 100)
                    : 0;

                  return (
                    <div
                      key={k.id}
                      className="bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 p-4 sm:p-5 flex flex-col min-w-0"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
                          <HelpCircle size={18} />
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${statusBadgeColor[k.status]}`}>
                            {k.status}
                          </span>
                          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${kelasBadgeColor[k.kelas]}`}>
                            {k.kelas}
                          </span>
                        </div>
                      </div>

                      <h3 className="mt-3 text-sm font-semibold text-slate-800 leading-snug line-clamp-2">{k.judul}</h3>
                      <p className="text-xs text-slate-400 mt-1">{k.bab}</p>

                      <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1 flex-shrink-0">
                          <HelpCircle size={12} />
                          {k.jumlahSoal} soal
                        </span>
                        <span className="flex items-center gap-1 flex-shrink-0">
                          <Timer size={12} />
                          {k.durasi} menit
                        </span>
                        <span className="flex items-center gap-1 flex-shrink-0">
                          <CalendarDays size={12} />
                          {k.tanggal}
                        </span>
                      </div>

                      {k.status !== "Draft" && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                            <span>Pengerjaan</span>
                            <span className="font-medium text-slate-600">
                              {k.sudahMengerjakan}/{k.totalSiswa} siswa
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                k.status === "Selesai" ? "bg-rose-400" : "bg-blue-500"
                              }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                        <button
                          onClick={() => router.push(`/guru/kuiz/${k.id}`)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <Eye size={13} />
                          Lihat
                        </button>
                        <button
                          onClick={() => router.push(`/guru/kuiz/${k.id}/edit`)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Pencil size={13} />
                          Edit
                        </button>
                        {k.status === "Draft" && (
                          <button
                            onClick={() => router.push(`/guru/kuiz/${k.id}/kirim`)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            <Send size={13} />
                            Kirim
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}