"use client";

import { useState, useMemo, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  GraduationCap,
  ChevronDown,
  Sparkles,
  Users,
  Award,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  History,
  Pencil,
  Save,
  PlusCircle,
  BarChart3,
} from "lucide-react";

// ===== DUMMY DATA =====
// Catatan: ganti dengan data asli dari API/DB begitu tersedia.
// Guru ini mengampu 1 mata pelajaran (mis. Matematika) di beberapa kelas.
const MATA_PELAJARAN = "Matematika";
const KELAS_OPTIONS = ["9A", "9B", "8A", "8B"];
const JENIS_OPTIONS = ["Tugas Harian", "Ulangan Harian", "UTS", "UAS"];
const KKM = 75; // Kriteria Ketuntasan Minimal

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

// Riwayat penilaian yang sudah pernah diisi guru sebelumnya (dummy)
const initialRiwayat = [
  {
    id: "n1",
    kelas: "9A",
    jenis: "Ulangan Harian",
    judul: "Bab 3 - Persamaan Linear",
    tanggal: "12 Agustus 2026",
    nilai: {
      "9a-01": 88, "9a-02": 92, "9a-03": 65, "9a-04": 78,
      "9a-05": 95, "9a-06": 70, "9a-07": 82, "9a-08": 58,
      "9a-09": 90, "9a-10": 74,
    },
    catatan: { "9a-03": "Belum menguasai eliminasi", "9a-08": "Perlu remedial" },
  },
  {
    id: "n2",
    kelas: "9A",
    jenis: "Tugas Harian",
    judul: "Latihan Soal Bab 2",
    tanggal: "5 Agustus 2026",
    nilai: {
      "9a-01": 85, "9a-02": 90, "9a-03": 72, "9a-04": 80,
      "9a-05": 88, "9a-06": 75, "9a-07": 79, "9a-08": 68,
      "9a-09": 91, "9a-10": 77,
    },
    catatan: {},
  },
  {
    id: "n3",
    kelas: "9B",
    jenis: "Ulangan Harian",
    judul: "Bab 3 - Persamaan Linear",
    tanggal: "13 Agustus 2026",
    nilai: {
      "9b-01": 80, "9b-02": 76, "9b-03": 60, "9b-04": 84,
      "9b-05": 91, "9b-06": 73, "9b-07": 66, "9b-08": 88,
    },
    catatan: { "9b-03": "Sering absen saat materi ini" },
  },
];

function getPredikat(nilai) {
  if (nilai === null || nilai === undefined || nilai === "") return null;
  const n = Number(nilai);
  if (n >= 90) return { label: "A", color: "emerald" };
  if (n >= KKM) return { label: "B", color: "blue" };
  if (n >= 60) return { label: "C", color: "amber" };
  return { label: "D", color: "rose" };
}

const colorClasses = {
  emerald: {
    badge: "bg-emerald-50 text-emerald-600 border-emerald-200",
    bar: "bg-emerald-500",
    text: "text-emerald-600",
  },
  blue: {
    badge: "bg-blue-50 text-blue-600 border-blue-200",
    bar: "bg-blue-500",
    text: "text-blue-600",
  },
  amber: {
    badge: "bg-amber-50 text-amber-600 border-amber-200",
    bar: "bg-amber-500",
    text: "text-amber-600",
  },
  rose: {
    badge: "bg-rose-50 text-rose-600 border-rose-200",
    bar: "bg-rose-500",
    text: "text-rose-600",
  },
  slate: {
    badge: "bg-slate-100 text-slate-500 border-slate-200",
    bar: "bg-slate-300",
    text: "text-slate-500",
  },
};

const TANGGAL_HARI_INI = "17 Agustus 2026";

export default function GuruNilaiTugasPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [kelas, setKelas] = useState(KELAS_OPTIONS[0]);
  const [jenis, setJenis] = useState(JENIS_OPTIONS[0]);
  const [judul, setJudul] = useState("");
  const [tanggal, setTanggal] = useState(TANGGAL_HARI_INI);
  const [selectedId, setSelectedId] = useState(null); // id riwayat yang sedang dibuka, null = penilaian baru
  const [riwayat, setRiwayat] = useState(initialRiwayat);
  const [form, setForm] = useState({});
  const [catatanForm, setCatatanForm] = useState({});
  const [savedFlash, setSavedFlash] = useState(false);

  const notifications = [
    { id: 1, title: "Rapat Wali Kelas", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Batas Input Nilai Rapor", desc: "Dikirim 5 jam lalu", read: false },
  ];

  const daftarSiswa = siswaPerKelas[kelas] || [];

  // Saat kelas berganti, reset ke mode "penilaian baru" dan siapkan form kosong.
  useEffect(() => {
    setSelectedId(null);
    setJenis(JENIS_OPTIONS[0]);
    setJudul("");
    setTanggal(TANGGAL_HARI_INI);
    const kosong = {};
    (siswaPerKelas[kelas] || []).forEach((s) => {
      kosong[s.id] = "";
    });
    setForm(kosong);
    setCatatanForm({});
    setSavedFlash(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kelas]);

  const bukaRiwayat = (r) => {
    setSelectedId(r.id);
    setJenis(r.jenis);
    setJudul(r.judul);
    setTanggal(r.tanggal);
    const isi = {};
    daftarSiswa.forEach((s) => {
      isi[s.id] = r.nilai[s.id] ?? "";
    });
    setForm(isi);
    setCatatanForm(r.catatan || {});
    setSavedFlash(false);
  };

  const penilaianBaru = () => {
    setSelectedId(null);
    setJenis(JENIS_OPTIONS[0]);
    setJudul("");
    setTanggal(TANGGAL_HARI_INI);
    const kosong = {};
    daftarSiswa.forEach((s) => {
      kosong[s.id] = "";
    });
    setForm(kosong);
    setCatatanForm({});
    setSavedFlash(false);
  };

  const setNilaiSiswa = (siswaId, value) => {
    if (value !== "" && (Number.isNaN(Number(value)) || Number(value) < 0 || Number(value) > 100)) return;
    setForm((prev) => ({ ...prev, [siswaId]: value }));
  };

  const setCatatanSiswa = (siswaId, value) => {
    setCatatanForm((prev) => ({ ...prev, [siswaId]: value }));
  };

  const nilaiTerisi = Object.values(form).filter((v) => v !== "" && v !== null && v !== undefined);
  const totalSiswa = daftarSiswa.length;

  const rekap = useMemo(() => {
    const angka = nilaiTerisi.map(Number);
    if (angka.length === 0) return { rataRata: 0, tertinggi: 0, terendah: 0, belumTuntas: 0, belumDinilai: totalSiswa };
    const rataRata = Math.round((angka.reduce((a, b) => a + b, 0) / angka.length) * 10) / 10;
    const tertinggi = Math.max(...angka);
    const terendah = Math.min(...angka);
    const belumTuntas = angka.filter((n) => n < KKM).length;
    return { rataRata, tertinggi, terendah, belumTuntas, belumDinilai: totalSiswa - angka.length };
  }, [form, totalSiswa]); // eslint-disable-line react-hooks/exhaustive-deps

  const riwayatKelasIni = useMemo(() => {
    return riwayat
      .filter((r) => r.kelas === kelas)
      .sort((a, b) => (a.tanggal < b.tanggal ? 1 : -1));
  }, [riwayat, kelas]);

  // Statistik ringkas kelas ini, dihitung dari seluruh riwayat penilaian.
  const statistikKelas = useMemo(() => {
    if (riwayatKelasIni.length === 0) return { rataRata: null, perluPerhatian: [] };
    let totalRata = 0;
    const rekapSiswa = {};
    riwayatKelasIni.forEach((r) => {
      const angka = Object.values(r.nilai).map(Number).filter((n) => !Number.isNaN(n));
      const rataItem = angka.length ? angka.reduce((a, b) => a + b, 0) / angka.length : 0;
      totalRata += rataItem;
      Object.entries(r.nilai).forEach(([sid, n]) => {
        if (!rekapSiswa[sid]) rekapSiswa[sid] = [];
        rekapSiswa[sid].push(Number(n));
      });
    });
    const rataRata = Math.round((totalRata / riwayatKelasIni.length) * 10) / 10;
    const perluPerhatian = Object.entries(rekapSiswa)
      .map(([sid, arr]) => ({
        sid,
        rata: arr.reduce((a, b) => a + b, 0) / arr.length,
      }))
      .filter((x) => x.rata < KKM)
      .sort((a, b) => a.rata - b.rata)
      .slice(0, 3)
      .map((x) => {
        const siswa = daftarSiswa.find((s) => s.id === x.sid);
        return { nama: siswa ? siswa.nama : x.sid, rata: Math.round(x.rata * 10) / 10 };
      });
    return { rataRata, perluPerhatian };
  }, [riwayatKelasIni, daftarSiswa]);

  const simpanNilai = () => {
    setRiwayat((prev) => {
      const idx = selectedId ? prev.findIndex((r) => r.id === selectedId) : -1;
      const entry = {
        id: selectedId || `n-${Date.now()}`,
        kelas,
        jenis,
        judul: judul.trim() || jenis,
        tanggal,
        nilai: form,
        catatan: catatanForm,
      };
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = entry;
        return copy;
      }
      setSelectedId(entry.id);
      return [entry, ...prev];
    });
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2500);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="nilaiTugas"
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
                    <GraduationCap size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 truncate">
                    Nilai Tugas
                  </h1>
                </div>
                <p className="text-sm text-slate-500 mt-1 ml-[42px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400 flex-shrink-0" />
                  <span className="truncate">Input dan rekap nilai siswa mata pelajaran {MATA_PELAJARAN}.</span>
                </p>
              </div>
            </div>

            {/* KELAS, JENIS & JUDUL SELECTOR */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                <div className="relative w-full sm:w-40">
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

                <div className="relative w-full sm:w-44">
                  <select
                    value={jenis}
                    onChange={(e) => setJenis(e.target.value)}
                    className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors cursor-pointer"
                  >
                    {JENIS_OPTIONS.map((j) => (
                      <option key={j} value={j}>{j}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                <input
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Judul / materi penilaian (mis. Bab 3 - Aljabar)"
                  className="flex-1 min-w-[200px] px-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors"
                />

                <input
                  type="text"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="w-full sm:w-40 px-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors"
                />

                <button
                  onClick={penilaianBaru}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  <PlusCircle size={14} />
                  Penilaian Baru
                </button>

                <span className={`text-[11px] font-medium px-2.5 py-1.5 rounded-full border flex-shrink-0 ${
                  selectedId ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-slate-100 text-slate-500 border-slate-200"
                }`}>
                  {selectedId ? "Sudah tersimpan · bisa diedit" : "Belum disimpan"}
                </span>
              </div>
            </div>

            {/* SUMMARY CARDS - live sesuai nilai yang diinput guru */}
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
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-blue-50 text-blue-600 border-blue-200 flex-shrink-0">
                  <BarChart3 size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Rata-rata</p>
                  <p className="text-lg font-bold text-slate-800">{rekap.rataRata || "-"}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-emerald-50 text-emerald-600 border-emerald-200 flex-shrink-0">
                  <TrendingUp size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Tertinggi</p>
                  <p className="text-lg font-bold text-slate-800">{rekap.tertinggi || "-"}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-rose-50 text-rose-600 border-rose-200 flex-shrink-0">
                  <TrendingDown size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Terendah</p>
                  <p className="text-lg font-bold text-slate-800">{rekap.terendah || "-"}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-amber-50 text-amber-600 border-amber-200 flex-shrink-0">
                  <AlertTriangle size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Belum Tuntas</p>
                  <p className="text-lg font-bold text-slate-800">{rekap.belumTuntas}</p>
                </div>
              </div>
            </div>

            {/* KONTEN UTAMA: form nilai (kiri, lebih lebar) + panel statistik & riwayat (kanan) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

              {/* FORM NILAI */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-5 border-b border-slate-100">
                  <div className="min-w-0">
                    <h2 className="text-sm font-semibold text-slate-800 truncate">
                      {judul.trim() || jenis} · Kelas {kelas}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {nilaiTerisi.length} dari {totalSiswa} siswa sudah dinilai · KKM {KKM}
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {daftarSiswa.map((siswa, idx) => {
                    const nilaiSiswa = form[siswa.id] ?? "";
                    const predikat = getPredikat(nilaiSiswa);
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

                          <div className="flex items-center gap-2 flex-shrink-0">
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={nilaiSiswa}
                              onChange={(e) => setNilaiSiswa(siswa.id, e.target.value)}
                              placeholder="0-100"
                              className="w-20 px-3 py-1.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors"
                            />
                            <span className={`inline-flex items-center justify-center w-8 h-8 text-xs font-semibold rounded-lg border flex-shrink-0 ${
                              predikat ? colorClasses[predikat.color].badge : colorClasses.slate.badge
                            }`}>
                              {predikat ? predikat.label : "-"}
                            </span>
                          </div>

                          <input
                            type="text"
                            value={catatanForm[siswa.id] || ""}
                            onChange={(e) => setCatatanSiswa(siswa.id, e.target.value)}
                            placeholder="Catatan (opsional)"
                            className="flex-1 min-w-[160px] px-3 py-1.5 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 p-4 sm:p-5 border-t border-slate-100 bg-slate-50/60">
                  {savedFlash && (
                    <span className="text-xs font-medium text-emerald-600">Nilai tersimpan.</span>
                  )}
                  <button
                    onClick={simpanNilai}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
                  >
                    <Save size={15} />
                    {selectedId ? "Simpan Perubahan" : "Simpan Nilai"}
                  </button>
                </div>
              </div>

              {/* PANEL KANAN: statistik + riwayat penilaian */}
              <div className="lg:col-span-1 space-y-6">

                {/* STATISTIK KELAS */}
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Award size={16} className="text-slate-400" />
                    <h2 className="text-sm font-semibold text-slate-800">Statistik Kelas {kelas}</h2>
                  </div>

                  {statistikKelas.rataRata === null ? (
                    <p className="text-xs text-slate-400">Belum ada data cukup untuk statistik.</p>
                  ) : (
                    <>
                      <div className="mb-4">
                        <div className="flex items-baseline justify-between mb-1.5">
                          <span className="text-xs text-slate-400">Rata-rata seluruh penilaian</span>
                          <span className="text-lg font-bold text-slate-800">{statistikKelas.rataRata}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{ width: `${Math.min(statistikKelas.rataRata, 100)}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1.5">
                          dari {riwayatKelasIni.length} penilaian tercatat
                        </p>
                      </div>

                      {statistikKelas.perluPerhatian.length > 0 && (
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <AlertTriangle size={13} className="text-amber-500" />
                            <span className="text-xs font-medium text-slate-600">Perlu perhatian (di bawah KKM)</span>
                          </div>
                          <div className="space-y-1.5">
                            {statistikKelas.perluPerhatian.map((p) => (
                              <div key={p.nama} className="flex items-center justify-between text-xs">
                                <span className="text-slate-600 truncate pr-2">{p.nama}</span>
                                <span className="text-amber-600 font-medium flex-shrink-0">rata-rata {p.rata}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* RIWAYAT PENILAIAN KELAS INI */}
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2 p-4 sm:p-5 border-b border-slate-100">
                    <History size={16} className="text-slate-400" />
                    <h2 className="text-sm font-semibold text-slate-800">Riwayat Penilaian</h2>
                  </div>

                  {riwayatKelasIni.length === 0 ? (
                    <div className="p-6 text-center">
                      <p className="text-xs text-slate-400">Belum ada riwayat penilaian untuk kelas ini.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {riwayatKelasIni.map((r) => {
                        const angka = Object.values(r.nilai).map(Number).filter((n) => !Number.isNaN(n));
                        const rataItem = angka.length ? Math.round((angka.reduce((a, b) => a + b, 0) / angka.length) * 10) / 10 : 0;
                        return (
                          <div key={r.id} className="p-4 sm:p-5">
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-slate-700 truncate">{r.judul}</p>
                                <p className="text-[11px] text-slate-400 mt-0.5">{r.jenis} · {r.tanggal}</p>
                              </div>
                              {r.id === selectedId && (
                                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full flex-shrink-0">
                                  Dibuka
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 flex-wrap mt-2">
                              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full border bg-blue-50 text-blue-600 border-blue-200">
                                Rata-rata {rataItem}
                              </span>
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