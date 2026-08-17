"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Sparkles,
  CheckSquare,
  FileText,
  CalendarDays,
  CircleDot,
} from "lucide-react";

// ===== DUMMY DATA =====
// Catatan: ganti dengan data asli dari API/DB begitu tersedia.
const HARI_OPTIONS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

const jadwalMingguan = {
  Senin: [
    { id: 1, jam: "07.00 - 08.30", mapel: "Matematika", kelas: "9A", ruang: "R.301", status: "selesai" },
    { id: 2, jam: "09.15 - 10.45", mapel: "Matematika", kelas: "9B", ruang: "R.302", status: "berlangsung" },
    { id: 3, jam: "13.00 - 14.00", mapel: "Quiz Aljabar", kelas: "9A", ruang: "R.301", status: "akan datang" },
  ],
  Selasa: [
    { id: 4, jam: "07.00 - 08.30", mapel: "Matematika", kelas: "8A", ruang: "R.201", status: "akan datang" },
    { id: 5, jam: "10.00 - 11.30", mapel: "Matematika", kelas: "8B", ruang: "R.202", status: "akan datang" },
  ],
  Rabu: [
    { id: 6, jam: "08.00 - 09.30", mapel: "Matematika", kelas: "9A", ruang: "R.301", status: "akan datang" },
  ],
  Kamis: [
    { id: 7, jam: "07.00 - 08.30", mapel: "Matematika", kelas: "9B", ruang: "R.302", status: "akan datang" },
    { id: 8, jam: "09.15 - 10.45", mapel: "Matematika", kelas: "8A", ruang: "R.201", status: "akan datang" },
  ],
  Jumat: [
    { id: 9, jam: "07.30 - 09.00", mapel: "Matematika", kelas: "8B", ruang: "R.202", status: "akan datang" },
  ],
};

const summary = {
  sesiHariIni: 3,
  jamPerMinggu: 18,
  presensiBulanIni: "22/23",
  izinDiajukan: 1,
};

const statusStyle = {
  selesai: { bg: "bg-slate-100", text: "text-slate-500", dot: "bg-slate-400", label: "Selesai" },
  berlangsung: { bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-500", label: "Berlangsung" },
  "akan datang": { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-400", label: "Akan datang" },
};

// ===== MAIN COMPONENT =====

export default function GuruJadwalPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hariAktif, setHariAktif] = useState("Senin");

  const notifications = [
    { id: 1, title: "Rapat Wali Kelas", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Batas Input Nilai Rapor", desc: "Dikirim 5 jam lalu", read: false },
  ];

  const sesiHari = useMemo(() => jadwalMingguan[hariAktif] ?? [], [hariAktif]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="jadwal"
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
                    <Calendar size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 truncate">
                    Jadwal Mengajar
                  </h1>
                </div>
                <p className="text-sm text-slate-500 mt-1 ml-[42px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400 flex-shrink-0" />
                  <span className="truncate">Jadwal kelas, presensi masuk, dan pengajuan izin Anda.</span>
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => router.push("/guru/jadwal/presensi")}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-sm whitespace-nowrap"
                >
                  <CheckSquare size={16} />
                  Presensi
                </button>
                <button
                  onClick={() => router.push("/guru/jadwal/izin")}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap"
                >
                  <FileText size={16} />
                  Ajukan Izin
                </button>
              </div>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-blue-50 text-blue-600 border-blue-200 flex-shrink-0">
                  <CalendarDays size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Sesi Hari Ini</p>
                  <p className="text-lg font-bold text-slate-800">{summary.sesiHariIni}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-purple-50 text-purple-600 border-purple-200 flex-shrink-0">
                  <Clock size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Jam per Minggu</p>
                  <p className="text-lg font-bold text-slate-800">{summary.jamPerMinggu}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-emerald-50 text-emerald-600 border-emerald-200 flex-shrink-0">
                  <CheckSquare size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Presensi Bulan Ini</p>
                  <p className="text-lg font-bold text-slate-800">{summary.presensiBulanIni}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-amber-50 text-amber-600 border-amber-200 flex-shrink-0">
                  <FileText size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Izin Diajukan</p>
                  <p className="text-lg font-bold text-slate-800">{summary.izinDiajukan}</p>
                </div>
              </div>
            </div>

            {/* JADWAL MINGGUAN */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-700 truncate">Jadwal Minggu Ini</h3>

                <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 w-full sm:w-auto overflow-x-auto">
                  {HARI_OPTIONS.map((hari) => (
                    <button
                      key={hari}
                      onClick={() => setHariAktif(hari)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex-shrink-0 ${
                        hariAktif === hari
                          ? "bg-white text-slate-800 shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {hari}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {sesiHari.length === 0 && (
                  <div className="p-10 text-center">
                    <Calendar size={28} className="mx-auto text-slate-300 mb-2" />
                    <p className="text-sm text-slate-400">Tidak ada jadwal mengajar di hari {hariAktif}.</p>
                  </div>
                )}

                {sesiHari.map((sesi) => {
                  const s = statusStyle[sesi.status];
                  return (
                    <div key={sesi.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 sm:px-5 py-3.5">
                      <span className="text-xs font-medium text-slate-400 sm:w-32 flex-shrink-0 flex items-center gap-1.5">
                        <Clock size={13} className="flex-shrink-0" />
                        {sesi.jam}
                      </span>
                      <span className="text-sm font-medium text-slate-800 truncate sm:flex-1">{sesi.mapel}</span>
                      <span className="text-xs text-slate-500 flex items-center gap-1.5 flex-shrink-0">
                        <MapPin size={13} className="flex-shrink-0" />
                        {sesi.ruang}
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border bg-slate-100 text-slate-500 border-slate-200 flex-shrink-0">
                        Kelas {sesi.kelas}
                      </span>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${s.bg} ${s.text} flex items-center gap-1 flex-shrink-0 w-fit`}>
                        <CircleDot size={10} className={`${s.dot} rounded-full`} />
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PINTASAN PRESENSI & IZIN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => router.push("/guru/jadwal/presensi")}
                className="group text-left bg-white rounded-2xl border border-blue-200 hover:border-blue-300 p-5 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden min-w-0"
              >
                <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-blue-50 opacity-70" />
                <div className="relative min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-xl bg-blue-50 text-blue-600 flex-shrink-0">
                      <CheckSquare size={20} />
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-800 truncate">Check-in Presensi</h3>
                  <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">Catat kehadiran Anda saat masuk mengajar hari ini.</p>
                </div>
              </button>

              <button
                onClick={() => router.push("/guru/jadwal/izin")}
                className="group text-left bg-white rounded-2xl border border-amber-200 hover:border-amber-300 p-5 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden min-w-0"
              >
                <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-amber-50 opacity-70" />
                <div className="relative min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-xl bg-amber-50 text-amber-600 flex-shrink-0">
                      <FileText size={20} />
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-800 truncate">Pengajuan Izin</h3>
                  <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">Ajukan izin tidak hadir mengajar dan pantau statusnya.</p>
                </div>
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}