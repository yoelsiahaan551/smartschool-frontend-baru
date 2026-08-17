"use client";

import { useState, useMemo, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  ClipboardCheck,
  ChevronDown,
  Sparkles,
  Users,
  CheckCircle2,
  Stethoscope,
  FileText,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Save,
  History,
  Pencil,
  CalendarDays,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

// ===== DUMMY DATA =====
// Catatan: ganti dengan data asli dari API/DB begitu tersedia.
// Guru ini mengampu 1 mata pelajaran (mis. Matematika) di beberapa kelas.
const MATA_PELAJARAN = "Matematika";
const KELAS_OPTIONS = ["9A", "9B", "8A", "8B"];

const siswaPerKelas = {
  "9A": [
    { id: "9a-01", nis: "2409001", nama: "Ahmad Fauzi" },
    { id: "9a-02", nis: "2409002", nama: "Bunga Citra Lestari" },
    { id: "9a-03", nis: "2409003", nama: "Dewi Anggraini" },
    { id: "9a-04", nis: "2409004", nama: "Farhan Maulana" },
    { id: "9a-05", nis: "2409005", nama: "Gita Permatasari" },
    { id: "9a-06", nis: "2409006", nama: "Hendra Saputra" },
    { id: "9a-07", nis: "2409007", nama: "Indah Wulandari" },
    { id: "9a-08", nis: "2409008", nama: "Joko Prasetyo" },
    { id: "9a-09", nis: "2409009", nama: "Kirana Salsabila" },
    { id: "9a-10", nis: "2409010", nama: "Lukman Hakim" },
  ],
  "9B": [
    { id: "9b-01", nis: "2409011", nama: "Muhammad Rizki" },
    { id: "9b-02", nis: "2409012", nama: "Nadia Ramadhani" },
    { id: "9b-03", nis: "2409013", nama: "Oscar Pratama" },
    { id: "9b-04", nis: "2409014", nama: "Putri Ayu Ningsih" },
    { id: "9b-05", nis: "2409015", nama: "Qori Ramadhan" },
    { id: "9b-06", nis: "2409016", nama: "Rina Amelia" },
    { id: "9b-07", nis: "2409017", nama: "Satria Nugraha" },
    { id: "9b-08", nis: "2409018", nama: "Tania Putri" },
  ],
  "8A": [
    { id: "8a-01", nis: "2408001", nama: "Umar Abdullah" },
    { id: "8a-02", nis: "2408002", nama: "Vina Anggreini" },
    { id: "8a-03", nis: "2408003", nama: "Wahyu Setiawan" },
    { id: "8a-04", nis: "2408004", nama: "Xena Meilani" },
    { id: "8a-05", nis: "2408005", nama: "Yusuf Ibrahim" },
    { id: "8a-06", nis: "2408006", nama: "Zahra Amalia" },
    { id: "8a-07", nis: "2408007", nama: "Agus Setiadi" },
    { id: "8a-08", nis: "2408008", nama: "Bella Safitri" },
  ],
  "8B": [
    { id: "8b-01", nis: "2408011", nama: "Chandra Wijaya" },
    { id: "8b-02", nis: "2408012", nama: "Dinda Puspita" },
    { id: "8b-03", nis: "2408013", nama: "Eko Firmansyah" },
    { id: "8b-04", nis: "2408014", nama: "Fitri Handayani" },
    { id: "8b-05", nis: "2408015", nama: "Galih Pratama" },
    { id: "8b-06", nis: "2408016", nama: "Hana Nuraini" },
  ],
};

// Riwayat absensi yang sudah pernah diisi guru sebelumnya (dummy)
const initialRiwayat = [
  {
    id: "r1",
    kelas: "9A",
    tanggal: "15 Agustus 2026",
    detail: {
      "9a-01": "Hadir", "9a-02": "Hadir", "9a-03": "Sakit", "9a-04": "Hadir",
      "9a-05": "Hadir", "9a-06": "Hadir", "9a-07": "Izin", "9a-08": "Hadir",
      "9a-09": "Hadir", "9a-10": "Hadir",
    },
    catatan: { "9a-03": "Demam, ada surat dokter", "9a-07": "Acara keluarga" },
  },
  {
    id: "r2",
    kelas: "9A",
    tanggal: "13 Agustus 2026",
    detail: {
      "9a-01": "Hadir", "9a-02": "Hadir", "9a-03": "Hadir", "9a-04": "Hadir",
      "9a-05": "Alpa", "9a-06": "Hadir", "9a-07": "Hadir", "9a-08": "Hadir",
      "9a-09": "Sakit", "9a-10": "Hadir",
    },
    catatan: { "9a-09": "Flu" },
  },
  {
    id: "r3",
    kelas: "9B",
    tanggal: "14 Agustus 2026",
    detail: {
      "9b-01": "Hadir", "9b-02": "Hadir", "9b-03": "Hadir", "9b-04": "Izin",
      "9b-05": "Hadir", "9b-06": "Hadir", "9b-07": "Hadir", "9b-08": "Hadir",
    },
    catatan: { "9b-04": "Ada keperluan keluarga" },
  },
];

const STATUS_LIST = [
  { key: "Hadir", label: "Hadir", icon: CheckCircle2, color: "emerald" },
  { key: "Sakit", label: "Sakit", icon: Stethoscope, color: "amber" },
  { key: "Izin", label: "Izin", icon: FileText, color: "blue" },
  { key: "Alpa", label: "Alpa", icon: XCircle, color: "rose" },
];

const colorClasses = {
  emerald: {
    active: "bg-emerald-500 text-white border-emerald-500",
    idle: "bg-white text-slate-500 border-slate-200 hover:border-emerald-300 hover:text-emerald-600",
    badge: "bg-emerald-50 text-emerald-600 border-emerald-200",
    bar: "bg-emerald-500",
  },
  amber: {
    active: "bg-amber-500 text-white border-amber-500",
    idle: "bg-white text-slate-500 border-slate-200 hover:border-amber-300 hover:text-amber-600",
    badge: "bg-amber-50 text-amber-600 border-amber-200",
    bar: "bg-amber-500",
  },
  blue: {
    active: "bg-blue-500 text-white border-blue-500",
    idle: "bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600",
    badge: "bg-blue-50 text-blue-600 border-blue-200",
    bar: "bg-blue-500",
  },
  rose: {
    active: "bg-rose-500 text-white border-rose-500",
    idle: "bg-white text-slate-500 border-slate-200 hover:border-rose-300 hover:text-rose-600",
    badge: "bg-rose-50 text-rose-600 border-rose-200",
    bar: "bg-rose-500",
  },
};

const TANGGAL_HARI_INI = "17 Agustus 2026";

export default function GuruAbsensiPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [kelas, setKelas] = useState(KELAS_OPTIONS[0]);
  const [tanggal, setTanggal] = useState(TANGGAL_HARI_INI);
  const [riwayat, setRiwayat] = useState(initialRiwayat);
  const [form, setForm] = useState({});
  const [catatanForm, setCatatanForm] = useState({});
  const [savedFlash, setSavedFlash] = useState(false);

  const notifications = [
    { id: 1, title: "Rapat Wali Kelas", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Batas Input Nilai Rapor", desc: "Dikirim 5 jam lalu", read: false },
  ];

  const daftarSiswa = siswaPerKelas[kelas] || [];

  // Setiap kali kelas atau tanggal berganti, muat data yang sudah ada (kalau ada)
  // atau siapkan form baru dengan semua siswa berstatus "Hadir" sebagai default.
  useEffect(() => {
    const existing = riwayat.find((r) => r.kelas === kelas && r.tanggal === tanggal);
    if (existing) {
      setForm(existing.detail);
      setCatatanForm(existing.catatan || {});
    } else {
      const defaultForm = {};
      daftarSiswa.forEach((s) => {
        defaultForm[s.id] = "Hadir";
      });
      setForm(defaultForm);
      setCatatanForm({});
    }
    setSavedFlash(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kelas, tanggal]);

  const sudahTersimpan = riwayat.some((r) => r.kelas === kelas && r.tanggal === tanggal);

  const rekap = useMemo(() => {
    const counts = { Hadir: 0, Sakit: 0, Izin: 0, Alpa: 0 };
    Object.values(form).forEach((status) => {
      if (counts[status] !== undefined) counts[status] += 1;
    });
    return counts;
  }, [form]);

  const riwayatKelasIni = useMemo(() => {
    return riwayat
      .filter((r) => r.kelas === kelas)
      .sort((a, b) => (a.tanggal < b.tanggal ? 1 : -1));
  }, [riwayat, kelas]);

  // Statistik ringkas kelas ini, dihitung dari seluruh riwayat yang ada.
  const statistikKelas = useMemo(() => {
    if (riwayatKelasIni.length === 0) return { rataRata: null, perluPerhatian: [] };
    let totalPersen = 0;
    const absenCount = {};
    riwayatKelasIni.forEach((r) => {
      const totalHariItu = Object.keys(r.detail).length || daftarSiswa.length;
      const hadir = Object.values(r.detail).filter((s) => s === "Hadir").length;
      totalPersen += totalHariItu ? (hadir / totalHariItu) * 100 : 0;
      Object.entries(r.detail).forEach(([sid, st]) => {
        if (st !== "Hadir") absenCount[sid] = (absenCount[sid] || 0) + 1;
      });
    });
    const rataRata = Math.round(totalPersen / riwayatKelasIni.length);
    const perluPerhatian = Object.entries(absenCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([sid, count]) => {
        const siswa = daftarSiswa.find((s) => s.id === sid);
        return { nama: siswa ? siswa.nama : sid, count };
      });
    return { rataRata, perluPerhatian };
  }, [riwayatKelasIni, daftarSiswa]);

  const setStatusSiswa = (siswaId, status) => {
    setForm((prev) => ({ ...prev, [siswaId]: status }));
    if (status === "Hadir") {
      setCatatanForm((prev) => {
        const next = { ...prev };
        delete next[siswaId];
        return next;
      });
    }
  };

  const setCatatanSiswa = (siswaId, value) => {
    setCatatanForm((prev) => ({ ...prev, [siswaId]: value }));
  };

  const tandaiSemua = (status) => {
    const next = {};
    daftarSiswa.forEach((s) => {
      next[s.id] = status;
    });
    setForm(next);
    if (status === "Hadir") setCatatanForm({});
  };

  const simpanAbsensi = () => {
    setRiwayat((prev) => {
      const idx = prev.findIndex((r) => r.kelas === kelas && r.tanggal === tanggal);
      const entry = {
        id: idx >= 0 ? prev[idx].id : `r-${Date.now()}`,
        kelas,
        tanggal,
        detail: form,
        catatan: catatanForm,
      };
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = entry;
        return copy;
      }
      return [entry, ...prev];
    });
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2500);
  };

  const bukaRiwayat = (r) => {
    setTanggal(r.tanggal);
  };

  const totalSiswa = daftarSiswa.length;
  const persenHadir = totalSiswa ? Math.round((rekap.Hadir / totalSiswa) * 100) : 0;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="absensi"
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
                    <ClipboardCheck size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 truncate">
                    Absensi
                  </h1>
                </div>
                <p className="text-sm text-slate-500 mt-1 ml-[42px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400 flex-shrink-0" />
                  <span className="truncate">Rekap kehadiran siswa mata pelajaran {MATA_PELAJARAN} per pertemuan.</span>
                </p>
              </div>
            </div>

            {/* KELAS & TANGGAL SELECTOR */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                <div className="relative w-full sm:w-44">
                  <select
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors cursor-pointer"
                  >
                    {KELAS_OPTIONS.map((k) => (
                      <option key={k} value={k}>Kelas {k}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-1 py-1">
                  <button
                    onClick={() => {
                      const idx = riwayatKelasIni.findIndex((r) => r.tanggal === tanggal);
                      if (idx >= 0 && idx < riwayatKelasIni.length - 1) setTanggal(riwayatKelasIni[idx + 1].tanggal);
                    }}
                    className="p-1.5 rounded-md text-slate-400 hover:bg-white hover:text-slate-600 transition-colors"
                    aria-label="Tanggal sebelumnya"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="flex items-center gap-1.5 px-2 text-sm font-medium text-slate-700 whitespace-nowrap">
                    <CalendarDays size={14} className="text-slate-400" />
                    {tanggal}
                    {tanggal === TANGGAL_HARI_INI && (
                      <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">Hari ini</span>
                    )}
                  </span>
                  <button
                    onClick={() => setTanggal(TANGGAL_HARI_INI)}
                    className="p-1.5 rounded-md text-slate-400 hover:bg-white hover:text-slate-600 transition-colors"
                    aria-label="Kembali ke hari ini"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <span className={`text-[11px] font-medium px-2.5 py-1.5 rounded-full border flex-shrink-0 ${
                  sudahTersimpan ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-slate-100 text-slate-500 border-slate-200"
                }`}>
                  {sudahTersimpan ? "Sudah diabsen · bisa diedit" : "Belum diabsen"}
                </span>
              </div>
            </div>

            {/* SUMMARY CARDS - live sesuai yang ditandai guru */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-slate-100 text-slate-500 border-slate-200 flex-shrink-0">
                  <Users size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Total Siswa</p>
                  <p className="text-lg font-bold text-slate-800">{totalSiswa}</p>
                </div>
              </div>
              {STATUS_LIST.map((s) => (
                <div key={s.key} className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-lg border flex-shrink-0 ${colorClasses[s.color].badge}`}>
                    <s.icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">{s.label}</p>
                    <p className="text-lg font-bold text-slate-800">{rekap[s.key]}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* KONTEN UTAMA: form absensi (kiri, lebih lebar) + panel statistik & riwayat (kanan) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

              {/* FORM ABSENSI */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-5 border-b border-slate-100">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-800">Daftar Hadir · Kelas {kelas}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {rekap.Hadir} dari {totalSiswa} siswa hadir ({persenHadir}%)
                    </p>
                  </div>
                  <button
                    onClick={() => tandaiSemua("Hadir")}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors whitespace-nowrap"
                  >
                    <CheckCircle2 size={13} />
                    Tandai Semua Hadir
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {daftarSiswa.map((siswa, idx) => {
                    const statusAktif = form[siswa.id] || "Hadir";
                    const perluCatatan = statusAktif !== "Hadir";
                    return (
                      <div
                        key={siswa.id}
                        className="flex flex-col gap-3 p-4 sm:px-5 sm:py-3.5 hover:bg-slate-50/60 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <div className="flex items-center gap-3 min-w-0 sm:w-56 flex-shrink-0">
                            <span className="w-6 text-xs font-medium text-slate-400 flex-shrink-0">{idx + 1}.</span>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-slate-800 truncate">{siswa.nama}</p>
                              <p className="text-[11px] text-slate-400">NIS {siswa.nis}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 flex-wrap">
                            {STATUS_LIST.map((s) => {
                              const isActive = statusAktif === s.key;
                              return (
                                <button
                                  key={s.key}
                                  onClick={() => setStatusSiswa(siswa.id, s.key)}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                                    isActive ? colorClasses[s.color].active : colorClasses[s.color].idle
                                  }`}
                                >
                                  <s.icon size={13} />
                                  {s.label}
                                </button>
                              );
                            })}
                          </div>

                          {perluCatatan && (
                            <input
                              type="text"
                              value={catatanForm[siswa.id] || ""}
                              onChange={(e) => setCatatanSiswa(siswa.id, e.target.value)}
                              placeholder="Catatan (opsional) — mis. ada surat dokter"
                              className="flex-1 min-w-[160px] px-3 py-1.5 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors"
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 p-4 sm:p-5 border-t border-slate-100 bg-slate-50/60">
                  {savedFlash && (
                    <span className="text-xs font-medium text-emerald-600">Absensi tersimpan.</span>
                  )}
                  <button
                    onClick={simpanAbsensi}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
                  >
                    <Save size={15} />
                    {sudahTersimpan ? "Simpan Perubahan" : "Simpan Absensi"}
                  </button>
                </div>
              </div>

              {/* PANEL KANAN: statistik + riwayat ringkas */}
              <div className="lg:col-span-1 space-y-6">

                {/* STATISTIK KELAS */}
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={16} className="text-slate-400" />
                    <h2 className="text-sm font-semibold text-slate-800">Statistik Kelas {kelas}</h2>
                  </div>

                  {statistikKelas.rataRata === null ? (
                    <p className="text-xs text-slate-400">Belum ada data cukup untuk statistik.</p>
                  ) : (
                    <>
                      <div className="mb-4">
                        <div className="flex items-baseline justify-between mb-1.5">
                          <span className="text-xs text-slate-400">Rata-rata kehadiran</span>
                          <span className="text-lg font-bold text-slate-800">{statistikKelas.rataRata}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-emerald-500"
                            style={{ width: `${statistikKelas.rataRata}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1.5">
                          dari {riwayatKelasIni.length} pertemuan tercatat
                        </p>
                      </div>

                      {statistikKelas.perluPerhatian.length > 0 && (
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <AlertTriangle size={13} className="text-amber-500" />
                            <span className="text-xs font-medium text-slate-600">Perlu perhatian</span>
                          </div>
                          <div className="space-y-1.5">
                            {statistikKelas.perluPerhatian.map((p) => (
                              <div key={p.nama} className="flex items-center justify-between text-xs">
                                <span className="text-slate-600 truncate pr-2">{p.nama}</span>
                                <span className="text-amber-600 font-medium flex-shrink-0">{p.count}x tidak hadir</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* RIWAYAT ABSENSI KELAS INI */}
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2 p-4 sm:p-5 border-b border-slate-100">
                    <History size={16} className="text-slate-400" />
                    <h2 className="text-sm font-semibold text-slate-800">Riwayat Absensi</h2>
                  </div>

                  {riwayatKelasIni.length === 0 ? (
                    <div className="p-6 text-center">
                      <p className="text-xs text-slate-400">Belum ada riwayat absensi untuk kelas ini.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {riwayatKelasIni.map((r) => {
                        const counts = { Hadir: 0, Sakit: 0, Izin: 0, Alpa: 0 };
                        Object.values(r.detail).forEach((st) => {
                          if (counts[st] !== undefined) counts[st] += 1;
                        });
                        return (
                          <div key={r.id} className="p-4 sm:p-5">
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-700 truncate">
                                <CalendarDays size={13} className="text-slate-400 flex-shrink-0" />
                                {r.tanggal}
                              </span>
                              {r.tanggal === tanggal && (
                                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full flex-shrink-0">
                                  Dibuka
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {STATUS_LIST.map((s) => (
                                <span
                                  key={s.key}
                                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${colorClasses[s.color].badge}`}
                                >
                                  {s.label} {counts[s.key]}
                                </span>
                              ))}
                              <button
                                onClick={() => bukaRiwayat(r)}
                                className="ml-auto flex items-center justify-center gap-1 px-2.5 py-1 text-[11px] font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                              >
                                <Pencil size={11} />
                                Edit
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}