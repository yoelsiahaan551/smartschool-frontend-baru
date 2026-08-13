"use client";

import { useState, useMemo } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  NotebookPen,
  Search,
  ChevronDown,
  Sparkles,
  Users,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Save,
  RotateCcw,
  BarChart3,
} from "lucide-react";

// ===== DUMMY DATA =====
const MAPEL_OPTIONS = ["Matematika", "Bahasa Indonesia", "Bahasa Inggris", "IPA", "IPS"];
const KELAS_OPTIONS = ["7", "8", "9"];
const SEMESTER_OPTIONS = ["Ganjil", "Genap"];

const KKM = 75;

const studentsByKelas = {
  "7": [
    { id: 5, nama: "Eka Wulandari", nis: "2409005" },
    { id: 6, nama: "Fajar Nugroho", nis: "2409006" },
  ],
  "8": [
    { id: 1, nama: "Syuja Suka Bolos", nis: "2409001" },
    { id: 2, nama: "Bagas Saputra", nis: "2409002" },
    { id: 3, nama: "Citra Lestari", nis: "2409003" },
    { id: 4, nama: "Dimas Prakoso", nis: "2409004" },
  ],
  "9": [
    { id: 7, nama: "Gita Ramadhani", nis: "2409007" },
    { id: 8, nama: "Hendra Kusuma", nis: "2409008" },
    { id: 9, nama: "Indah Permata", nis: "2409009" },
    { id: 10, nama: "Joko Widodo Putra", nis: "2409010" },
  ],
};

// nilai dummy: key = `${mapel}-${kelas}-${semester}-${studentId}`
const initialNilai = {
  "Matematika-8-Ganjil-1": { tugas: 88, uh: 82, uts: 79, uas: 85 },
  "Matematika-8-Ganjil-2": { tugas: 75, uh: 70, uts: 68, uas: 72 },
  "Matematika-8-Ganjil-3": { tugas: 92, uh: 90, uts: 88, uas: 91 },
  "Matematika-8-Ganjil-4": { tugas: 60, uh: 58, uts: 55, uas: 62 },
};

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const round1 = (n) => Math.round(n * 10) / 10;

// ===== MAIN COMPONENT =====

export default function NilaiPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu] = useState("nilai");

  const [mapel, setMapel] = useState(MAPEL_OPTIONS[0]);
  const [kelas, setKelas] = useState(KELAS_OPTIONS[1]);
  const [semester, setSemester] = useState(SEMESTER_OPTIONS[0]);
  const [search, setSearch] = useState("");
  const [nilaiData, setNilaiData] = useState(initialNilai);
  const [dirty, setDirty] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  const activeStudents = studentsByKelas[kelas] || [];

  const filteredStudents = useMemo(() => {
    if (!search.trim()) return activeStudents;
    const q = search.toLowerCase();
    return activeStudents.filter((s) => s.nama.toLowerCase().includes(q) || s.nis.includes(q));
  }, [activeStudents, search]);

  const getKey = (studentId) => `${mapel}-${kelas}-${semester}-${studentId}`;

  const getNilai = (studentId) => {
    return nilaiData[getKey(studentId)] || { tugas: "", uh: "", uts: "", uas: "" };
  };

  const updateNilai = (studentId, field, value) => {
    const key = getKey(studentId);
    const clean = value === "" ? "" : Math.max(0, Math.min(100, Number(value)));
    setNilaiData((prev) => ({
      ...prev,
      [key]: { ...(prev[key] || { tugas: "", uh: "", uts: "", uas: "" }), [field]: clean },
    }));
    setDirty(true);
    setSavedFlash(false);
  };

  const computeAverage = (studentId) => {
    const n = getNilai(studentId);
    const values = [n.tugas, n.uh, n.uts, n.uas].filter((v) => v !== "" && v !== undefined && v !== null);
    if (values.length === 0) return null;
    const sum = values.reduce((a, b) => a + Number(b), 0);
    return round1(sum / values.length);
  };

  const handleSave = () => {
    setDirty(false);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2500);
  };

  const handleReset = () => {
    setNilaiData(initialNilai);
    setDirty(false);
    setSavedFlash(false);
  };

  const summary = useMemo(() => {
    const averages = activeStudents.map((s) => computeAverage(s.id)).filter((v) => v !== null);
    if (averages.length === 0) {
      return { rataKelas: null, tertinggi: null, terendah: null, tuntas: 0, total: activeStudents.length };
    }
    const rataKelas = round1(averages.reduce((a, b) => a + b, 0) / averages.length);
    const tertinggi = Math.max(...averages);
    const terendah = Math.min(...averages);
    const tuntas = averages.filter((v) => v >= KKM).length;
    return { rataKelas, tertinggi, terendah, tuntas, total: activeStudents.length };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nilaiData, activeStudents, mapel, kelas, semester]);

  const notifications = [
    { id: 1, title: "Pengumuman Libur Semester", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Deadline Input Nilai", desc: "Dikirim 5 jam lalu", read: false },
    { id: 3, title: "Jadwal Rapat Diperbarui", desc: "Dikirim 1 hari lalu", read: true },
  ];

  const scoreFields = [
    { key: "tugas", label: "Tugas" },
    { key: "uh", label: "UH" },
    { key: "uts", label: "UTS" },
    { key: "uas", label: "UAS" },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active={activeMenu}
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={(value) => setSidebarOpen(!value)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          user={{ name: "Bapak/Ibu Guru", email: "guru@smartschool.com", avatar: "G" }}
        />
        {/* === MAIN DENGAN MIN-H-SCREEN DAN OVERFLOW VERTIKAL === */}
        <main className="flex-1 overflow-y-auto min-h-screen p-4 sm:p-6 lg:p-8">
          <div className="w-full space-y-6">
            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-teal-500 text-white shadow-sm">
                    <NotebookPen size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Nilai</h1>
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                    Guru
                  </span>
                </div>
                <p className="text-sm text-slate-500 ml-[52px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400" />
                  Input dan pantau nilai siswa per mata pelajaran.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-3.5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <RotateCcw size={15} />
                  Reset
                </button>
                <button
                  onClick={handleSave}
                  disabled={!dirty}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm whitespace-nowrap"
                >
                  <Save size={16} />
                  Simpan Nilai
                </button>
              </div>
            </div>

            {savedFlash && (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
                <CheckCircle2 size={16} />
                Nilai berhasil disimpan.
              </div>
            )}

            {/* FILTER BAR — melebar penuh */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <div className="relative flex-1 min-w-[140px]">
                  <select
                    value={mapel}
                    onChange={(e) => setMapel(e.target.value)}
                    className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors cursor-pointer"
                  >
                    {MAPEL_OPTIONS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative flex-1 min-w-[120px]">
                  <select
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors cursor-pointer"
                  >
                    {KELAS_OPTIONS.map((k) => (
                      <option key={k} value={k}>Kelas {k}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative flex-1 min-w-[120px]">
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors cursor-pointer"
                  >
                    {SEMESTER_OPTIONS.map((s) => (
                      <option key={s} value={s}>Semester {s}</option>
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
                    placeholder="Cari nama atau NIS..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg border bg-teal-50 text-teal-600 border-teal-200">
                  <BarChart3 size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Rata-rata Kelas</p>
                  <p className="text-lg font-bold text-slate-800">{summary.rataKelas ?? "—"}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg border bg-emerald-50 text-emerald-600 border-emerald-200">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Nilai Tertinggi</p>
                  <p className="text-lg font-bold text-slate-800">{summary.tertinggi ?? "—"}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg border bg-rose-50 text-rose-600 border-rose-200">
                  <TrendingDown size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Nilai Terendah</p>
                  <p className="text-lg font-bold text-slate-800">{summary.terendah ?? "—"}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg border bg-blue-50 text-blue-600 border-blue-200">
                  <Users size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Tuntas (KKM {KKM})</p>
                  <p className="text-lg font-bold text-slate-800">{summary.tuntas}/{summary.total}</p>
                </div>
              </div>
            </div>

            {/* TABEL DENGAN BORDER & SCROLL HORIZONTAL */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-200/60 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-700">
                  {mapel} · Kelas {kelas} · Semester {semester}
                </h3>
                <span className="text-xs text-slate-400">{filteredStudents.length} siswa</span>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[1000px] text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80">
                      <th className="border border-slate-200 text-left font-medium text-slate-500 text-xs uppercase tracking-wider px-4 sm:px-5 py-3 whitespace-nowrap">
                        Siswa
                      </th>
                      {scoreFields.map((f) => (
                        <th
                          key={f.key}
                          className="border border-slate-200 text-center font-medium text-slate-500 text-xs uppercase tracking-wider px-2 py-3 whitespace-nowrap w-20"
                        >
                          {f.label}
                        </th>
                      ))}
                      <th className="border border-slate-200 text-center font-medium text-slate-500 text-xs uppercase tracking-wider px-3 py-3 whitespace-nowrap w-24">
                        Rata-rata
                      </th>
                      <th className="border border-slate-200 text-center font-medium text-slate-500 text-xs uppercase tracking-wider px-3 py-3 whitespace-nowrap w-24">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.length === 0 && (
                      <tr>
                        <td colSpan={7} className="border border-slate-200 p-10 text-center">
                          <Users size={28} className="mx-auto text-slate-300 mb-2" />
                          <p className="text-sm text-slate-400">Tidak ada siswa yang cocok di kelas ini.</p>
                        </td>
                      </tr>
                    )}

                    {filteredStudents.map((student) => {
                      const nilai = getNilai(student.id);
                      const avg = computeAverage(student.id);
                      const tuntas = avg !== null && avg >= KKM;
                      return (
                        <tr key={student.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="border border-slate-200 px-4 sm:px-5 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                                {initials(student.nama)}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-slate-800 truncate">{student.nama}</p>
                                <p className="text-[11px] text-slate-400">NIS {student.nis}</p>
                              </div>
                            </div>
                          </td>
                          {scoreFields.map((f) => (
                            <td key={f.key} className="border border-slate-200 px-2 py-3 text-center">
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={nilai[f.key]}
                                onChange={(e) => updateNilai(student.id, f.key, e.target.value)}
                                placeholder="-"
                                className="w-16 mx-auto block text-center px-2 py-1.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
                              />
                            </td>
                          ))}
                          <td className="border border-slate-200 px-3 py-3 text-center whitespace-nowrap">
                            <span className="text-sm font-semibold text-slate-800">{avg ?? "—"}</span>
                          </td>
                          <td className="border border-slate-200 px-3 py-3 text-center whitespace-nowrap">
                            {avg === null ? (
                              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border bg-slate-100 text-slate-400 border-slate-300">
                                Belum diisi
                              </span>
                            ) : (
                              <span
                                className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                                  tuntas
                                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                    : "bg-rose-50 text-rose-600 border-rose-200"
                                }`}
                              >
                                {tuntas ? "Tuntas" : "Belum Tuntas"}
                              </span>
                            )}
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