"use client";

import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  CheckSquare,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Timer,
  CalendarDays,
} from "lucide-react";

// ===== DUMMY DATA =====
// Catatan: ganti dengan data asli dari API/DB begitu tersedia.
const jadwalHariIni = [
  { id: 1, jam: "07.00 - 08.30", mapel: "Matematika", kelas: "9A", status: "hadir" },
  { id: 2, jam: "09.15 - 10.45", mapel: "Matematika", kelas: "9B", status: "berlangsung" },
  { id: 3, jam: "13.00 - 14.00", mapel: "Quiz Aljabar", kelas: "9A", status: "belum" },
];

const riwayatPresensi = [
  { id: 1, tanggal: "16 Agustus 2026", jamMasuk: "06.52", status: "tepat waktu" },
  { id: 2, tanggal: "15 Agustus 2026", jamMasuk: "07.08", status: "terlambat" },
  { id: 3, tanggal: "14 Agustus 2026", jamMasuk: "06.45", status: "tepat waktu" },
  { id: 4, tanggal: "13 Agustus 2026", jamMasuk: "-", status: "izin" },
  { id: 5, tanggal: "12 Agustus 2026", jamMasuk: "06.55", status: "tepat waktu" },
];

const summary = {
  hadirBulanIni: "20/23",
  terlambat: 2,
  izin: 1,
};

const statusRiwayat = {
  "tepat waktu": { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
  terlambat: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
  izin: { bg: "bg-slate-100", text: "text-slate-500", border: "border-slate-200" },
};

const statusSesi = {
  hadir: { bg: "bg-emerald-50", text: "text-emerald-600", label: "Sudah presensi" },
  berlangsung: { bg: "bg-blue-50", text: "text-blue-600", label: "Sedang berlangsung" },
  belum: { bg: "bg-slate-100", text: "text-slate-500", label: "Belum waktunya" },
};

// ===== MAIN COMPONENT =====

export default function GuruPresensiPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sudahPresensi, setSudahPresensi] = useState(false);
  const [waktuCheckin, setWaktuCheckin] = useState(null);

  const notifications = [
    { id: 1, title: "Rapat Wali Kelas", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Batas Input Nilai Rapor", desc: "Dikirim 5 jam lalu", read: false },
  ];

  const handleCheckin = () => {
    const now = new Date();
    setWaktuCheckin(now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
    setSudahPresensi(true);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="presensi"
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
                    <CheckSquare size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 truncate">
                    Presensi
                  </h1>
                </div>
                <p className="text-sm text-slate-500 mt-1 ml-[42px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400 flex-shrink-0" />
                  <span className="truncate">Catat kehadiran Anda dan pantau riwayat presensi.</span>
                </p>
              </div>
            </div>

            {/* CHECK-IN CARD */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Senin, 17 Agustus 2026</p>
                  <p className="text-2xl sm:text-3xl font-semibold text-slate-800 mt-1">
                    {sudahPresensi ? `Presensi tercatat, ${waktuCheckin}` : "Belum presensi hari ini"}
                  </p>
                  <p className="text-sm text-slate-500 mt-2 flex items-center gap-1.5">
                    <MapPin size={14} className="text-slate-400 flex-shrink-0" />
                    SMP Smart School 1 &middot; Lokasi terverifikasi
                  </p>
                </div>

                <button
                  onClick={handleCheckin}
                  disabled={sudahPresensi}
                  className={`flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg shadow-sm whitespace-nowrap flex-shrink-0 transition-colors ${
                    sudahPresensi
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {sudahPresensi ? (
                    <>
                      <CheckCircle2 size={16} />
                      Sudah check-in
                    </>
                  ) : (
                    <>
                      <Clock size={16} />
                      Check-in Sekarang
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-emerald-50 text-emerald-600 border-emerald-200 flex-shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Hadir Bulan Ini</p>
                  <p className="text-lg font-bold text-slate-800">{summary.hadirBulanIni}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-amber-50 text-amber-600 border-amber-200 flex-shrink-0">
                  <Timer size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Terlambat</p>
                  <p className="text-lg font-bold text-slate-800">{summary.terlambat}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0 col-span-2 sm:col-span-1">
                <div className="p-2 rounded-lg border bg-slate-100 text-slate-500 border-slate-200 flex-shrink-0">
                  <XCircle size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Izin</p>
                  <p className="text-lg font-bold text-slate-800">{summary.izin}</p>
                </div>
              </div>
            </div>

            {/* JADWAL HARI INI */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-200/60">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <CalendarDays size={15} className="text-slate-400" />
                  Sesi Mengajar Hari Ini
                </h3>
              </div>
              <div className="divide-y divide-slate-100">
                {jadwalHariIni.map((sesi) => {
                  const s = statusSesi[sesi.status];
                  return (
                    <div key={sesi.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 sm:px-5 py-3.5">
                      <span className="text-xs font-medium text-slate-400 sm:w-32 flex-shrink-0">{sesi.jam}</span>
                      <span className="text-sm font-medium text-slate-800 truncate sm:flex-1">{sesi.mapel}</span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border bg-slate-100 text-slate-500 border-slate-200 flex-shrink-0 w-fit">
                        Kelas {sesi.kelas}
                      </span>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${s.bg} ${s.text} flex-shrink-0 w-fit`}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIWAYAT PRESENSI */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-200/60">
                <h3 className="text-sm font-semibold text-slate-700 truncate">Riwayat Presensi</h3>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[480px] text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80">
                      <th className="border border-slate-200 text-left font-medium text-slate-500 text-xs uppercase tracking-wider px-4 sm:px-5 py-3 whitespace-nowrap">
                        Tanggal
                      </th>
                      <th className="border border-slate-200 text-center font-medium text-slate-500 text-xs uppercase tracking-wider px-3 py-3 whitespace-nowrap">
                        Jam Masuk
                      </th>
                      <th className="border border-slate-200 text-center font-medium text-slate-500 text-xs uppercase tracking-wider px-3 py-3 whitespace-nowrap">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {riwayatPresensi.map((r) => {
                      const s = statusRiwayat[r.status];
                      return (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="border border-slate-200 px-4 sm:px-5 py-3 whitespace-nowrap">
                            <span className="text-sm font-medium text-slate-800">{r.tanggal}</span>
                          </td>
                          <td className="border border-slate-200 px-3 py-3 text-center text-slate-600 whitespace-nowrap">
                            {r.jamMasuk}
                          </td>
                          <td className="border border-slate-200 px-3 py-3 text-center whitespace-nowrap">
                            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${s.bg} ${s.text} ${s.border} capitalize`}>
                              {r.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}