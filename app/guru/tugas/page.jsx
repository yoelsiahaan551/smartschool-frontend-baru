"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  ClipboardList,
  Search,
  ChevronDown,
  Plus,
  Sparkles,
  FileText,
  ListChecks,
  Send,
  Clock,
  CalendarDays,
  Paperclip,
  Eye,
  Pencil,
  Users,
  AlertCircle,
} from "lucide-react";

// ===== DUMMY DATA =====
// Catatan: ganti dengan data asli dari API/DB begitu tersedia.
const KELAS_OPTIONS = ["Semua Kelas", "9A", "9B", "8A", "8B"];
const STATUS_OPTIONS = ["Semua Status", "Draft", "Terkirim", "Berakhir"];

const tugasList = [
  {
    id: 1,
    judul: "Latihan Soal Persamaan Linear",
    kelas: "9A",
    bab: "Bab 1 - Aljabar",
    tanggalDibuat: "12 Agustus 2026",
    deadline: "19 Agustus 2026",
    status: "Terkirim",
    jumlahFile: 1,
    totalSiswa: 32,
    sudahMengumpulkan: 21,
    deskripsi: "Kerjakan soal nomor 1-10 di buku paket halaman 24, kumpulkan dalam bentuk foto atau PDF.",
  },
  {
    id: 2,
    judul: "Proyek Kelompok: Survei Data Kelas",
    kelas: "9B",
    bab: "Bab 3 - Statistika",
    tanggalDibuat: "10 Agustus 2026",
    deadline: "24 Agustus 2026",
    status: "Terkirim",
    jumlahFile: 2,
    totalSiswa: 30,
    sudahMengumpulkan: 6,
    deskripsi: "Kumpulkan data tinggi badan seluruh siswa di kelas, hitung mean, median, dan modus.",
  },
  {
    id: 3,
    judul: "Kuis Harian Bangun Ruang",
    kelas: "8A",
    bab: "Bab 2 - Geometri",
    tanggalDibuat: "5 Agustus 2026",
    deadline: "6 Agustus 2026",
    status: "Berakhir",
    jumlahFile: 0,
    totalSiswa: 28,
    sudahMengumpulkan: 27,
    deskripsi: "Kuis singkat 5 soal tentang volume dan luas permukaan kubus serta balok.",
  },
  {
    id: 4,
    judul: "Tugas Rumah: Relasi dan Fungsi",
    kelas: "8B",
    bab: "Bab 1 - Aljabar",
    tanggalDibuat: "16 Agustus 2026",
    deadline: "-",
    status: "Draft",
    jumlahFile: 1,
    totalSiswa: 29,
    sudahMengumpulkan: 0,
    deskripsi: "Rangkuman materi relasi dan fungsi beserta 3 contoh penyajian yang berbeda.",
  },
  {
    id: 5,
    judul: "Latihan Trigonometri Dasar",
    kelas: "9A",
    bab: "Bab 4 - Trigonometri",
    tanggalDibuat: "20 Juli 2026",
    deadline: "27 Juli 2026",
    status: "Berakhir",
    jumlahFile: 1,
    totalSiswa: 32,
    sudahMengumpulkan: 30,
    deskripsi: "Hitung nilai sinus, cosinus, dan tangen pada segitiga siku-siku yang diberikan.",
  },
];

const kelasBadgeColor = {
  "9A": "bg-blue-50 text-blue-600 border-blue-200",
  "9B": "bg-purple-50 text-purple-600 border-purple-200",
  "8A": "bg-emerald-50 text-emerald-600 border-emerald-200",
  "8B": "bg-amber-50 text-amber-600 border-amber-200",
};

const statusBadgeStyle = {
  Draft: "bg-slate-100 text-slate-500 border-slate-200",
  Terkirim: "bg-blue-50 text-blue-600 border-blue-200",
  Berakhir: "bg-rose-50 text-rose-600 border-rose-200",
};

const statusIcon = {
  Draft: FileText,
  Terkirim: Send,
  Berakhir: Clock,
};

// ===== MAIN COMPONENT =====

export default function GuruTugasPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [kelas, setKelas] = useState(KELAS_OPTIONS[0]);
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [search, setSearch] = useState("");

  const notifications = [
    { id: 1, title: "Rapat Wali Kelas", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Batas Input Nilai Rapor", desc: "Dikirim 5 jam lalu", read: false },
  ];

  const filteredTugas = useMemo(() => {
    return tugasList.filter((t) => {
      const matchKelas = kelas === "Semua Kelas" || t.kelas === kelas;
      const matchStatus = status === "Semua Status" || t.status === status;
      const matchSearch = !search.trim() || t.judul.toLowerCase().includes(search.toLowerCase());
      return matchKelas && matchStatus && matchSearch;
    });
  }, [kelas, status, search]);

  const summary = {
    total: tugasList.length,
    aktif: tugasList.filter((t) => t.status === "Terkirim").length,
    draft: tugasList.filter((t) => t.status === "Draft").length,
    perluDinilai: tugasList
      .filter((t) => t.status === "Terkirim" || t.status === "Berakhir")
      .reduce((acc, t) => acc + t.sudahMengumpulkan, 0),
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="tugas"
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
                    <ClipboardList size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 truncate">
                    Tugas
                  </h1>
                </div>
                <p className="text-sm text-slate-500 mt-1 ml-[42px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400 flex-shrink-0" />
                  <span className="truncate">Buat, kirim, dan pantau pengumpulan tugas siswa.</span>
                </p>
              </div>

              <button
                onClick={() => router.push("/guru/tugas/tambah")}
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-sm whitespace-nowrap flex-shrink-0"
              >
                <Plus size={16} />
                Buat Tugas
              </button>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-blue-50 text-blue-600 border-blue-200 flex-shrink-0">
                  <ListChecks size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Total Tugas</p>
                  <p className="text-lg font-bold text-slate-800">{summary.total}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-emerald-50 text-emerald-600 border-emerald-200 flex-shrink-0">
                  <Send size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Sedang Berjalan</p>
                  <p className="text-lg font-bold text-slate-800">{summary.aktif}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-slate-100 text-slate-500 border-slate-200 flex-shrink-0">
                  <FileText size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Draft</p>
                  <p className="text-lg font-bold text-slate-800">{summary.draft}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-amber-50 text-amber-600 border-amber-200 flex-shrink-0">
                  <AlertCircle size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Perlu Dinilai</p>
                  <p className="text-lg font-bold text-slate-800">{summary.perluDinilai}</p>
                </div>
              </div>
            </div>

            {/* FILTER BAR */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <div className="relative w-full sm:w-44">
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

                <div className="relative w-full sm:w-44">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors cursor-pointer"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
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
                    placeholder="Cari judul tugas..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* GRID TUGAS */}
            {filteredTugas.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-10 text-center">
                <ClipboardList size={28} className="mx-auto text-slate-300 mb-2" />
                <p className="text-sm text-slate-400">Tidak ada tugas yang cocok.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTugas.map((t) => {
                  const StatusIcon = statusIcon[t.status];
                  const progress = t.totalSiswa
                    ? Math.round((t.sudahMengumpulkan / t.totalSiswa) * 100)
                    : 0;

                  return (
                    <div
                      key={t.id}
                      className="bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 p-4 sm:p-5 flex flex-col min-w-0"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
                          <ClipboardList size={18} />
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border flex items-center gap-1 ${statusBadgeStyle[t.status]}`}>
                            <StatusIcon size={11} />
                            {t.status}
                          </span>
                          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${kelasBadgeColor[t.kelas]}`}>
                            {t.kelas}
                          </span>
                        </div>
                      </div>

                      <h3 className="mt-3 text-sm font-semibold text-slate-800 leading-snug line-clamp-2">{t.judul}</h3>
                      <p className="text-xs text-slate-400 mt-1">{t.bab}</p>
                      <p className="text-sm text-slate-500 mt-2 leading-relaxed line-clamp-2 flex-1">{t.deskripsi}</p>

                      <div className="flex items-center justify-between gap-2 mt-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1 flex-shrink-0">
                          <CalendarDays size={12} />
                          Deadline: {t.deadline}
                        </span>
                        {t.jumlahFile > 0 && (
                          <span className="flex items-center gap-1 flex-shrink-0">
                            <Paperclip size={12} />
                            {t.jumlahFile} lampiran
                          </span>
                        )}
                      </div>

                      {t.status !== "Draft" && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                            <span className="flex items-center gap-1">
                              <Users size={11} />
                              Pengumpulan
                            </span>
                            <span className="font-medium text-slate-600">
                              {t.sudahMengumpulkan}/{t.totalSiswa} siswa
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                t.status === "Berakhir" ? "bg-rose-400" : "bg-blue-500"
                              }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                        <button
                          onClick={() => router.push(`/guru/tugas/${t.id}`)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <Eye size={13} />
                          Lihat
                        </button>
                        <button
                          onClick={() => router.push(`/guru/tugas/${t.id}/edit`)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Pencil size={13} />
                          Edit
                        </button>
                        {t.status === "Draft" && (
                          <button
                            onClick={() => alert(`Kirim tugas "${t.judul}" ke kelas ${t.kelas}`)}
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