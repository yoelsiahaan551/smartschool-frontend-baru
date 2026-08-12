"use client";

import { useState, useMemo } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  AlertTriangle,
  Search,
  Plus,
  X,
  Trash2,
  ChevronDown,
  Sparkles,
  CalendarDays,
  FileWarning,
  TrendingDown,
  UserX,
} from "lucide-react";

// ===== DUMMY DATA =====
const students = [
  { id: 1, name: "Rina Amelia", nis: "2409001" },
  { id: 2, name: "Bagas Saputra", nis: "2409002" },
  { id: 3, name: "Citra Lestari", nis: "2409003" },
  { id: 4, name: "Dimas Prakoso", nis: "2409004" },
  { id: 5, name: "Eka Wulandari", nis: "2409005" },
  { id: 6, name: "Fajar Nugroho", nis: "2409006" },
  { id: 7, name: "Gita Ramadhani", nis: "2409007" },
  { id: 8, name: "Hendra Kusuma", nis: "2409008" },
  { id: 9, name: "Indah Permata", nis: "2409009" },
  { id: 10, name: "Joko Widodo Putra", nis: "2409010" },
];

const TINGKAT = {
  ringan: { label: "Ringan", poin: 5, chip: "bg-blue-50 text-blue-600 border-blue-200", dot: "bg-blue-500" },
  sedang: { label: "Sedang", poin: 15, chip: "bg-amber-50 text-amber-600 border-amber-200", dot: "bg-amber-500" },
  berat: { label: "Berat", poin: 30, chip: "bg-rose-50 text-rose-600 border-rose-200", dot: "bg-rose-500" },
};

const jenisPelanggaranOptions = [
  "Terlambat masuk kelas",
  "Tidak mengerjakan tugas",
  "Seragam tidak lengkap",
  "Membawa HP tanpa izin",
  "Bolos pelajaran",
  "Membuat gaduh di kelas",
  "Berkelahi",
  "Lainnya",
];

const initialRecords = [
  {
    id: 1,
    studentId: 1,
    tanggal: "2026-08-09",
    jenis: "Terlambat masuk kelas",
    tingkat: "ringan",
    catatan: "Datang 15 menit setelah bel masuk, tidak ada surat keterangan.",
  },
  {
    id: 2,
    studentId: 8,
    tanggal: "2026-08-08",
    jenis: "Membawa HP tanpa izin",
    tingkat: "sedang",
    catatan: "Kedapatan bermain HP saat jam pelajaran berlangsung.",
  },
  {
    id: 3,
    studentId: 3,
    tanggal: "2026-08-05",
    jenis: "Tidak mengerjakan tugas",
    tingkat: "ringan",
    catatan: "Tugas PR Matematika tidak dikumpulkan tanpa keterangan.",
  },
  {
    id: 4,
    studentId: 6,
    tanggal: "2026-08-02",
    jenis: "Berkelahi",
    tingkat: "berat",
    catatan: "Terlibat cekcok fisik dengan siswa lain di kantin.",
  },
];

const todayISO = () => new Date().toISOString().slice(0, 10);

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const formatTanggal = (iso) =>
  new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

// ===== MAIN COMPONENT =====

export default function CatatanPelanggaranPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu] = useState("catatanPelanggaran");

  const [records, setRecords] = useState(initialRecords);
  const [filterTingkat, setFilterTingkat] = useState("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  // form state
  const emptyForm = {
    studentId: String(students[0]?.id ?? ""),
    tanggal: todayISO(),
    jenis: jenisPelanggaranOptions[0],
    tingkat: "ringan",
    catatan: "",
  };
  const [form, setForm] = useState(emptyForm);

  const updateForm = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const openForm = () => {
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.studentId) return;
    const newRecord = {
      id: Date.now(),
      studentId: Number(form.studentId),
      tanggal: form.tanggal,
      jenis: form.jenis,
      tingkat: form.tingkat,
      catatan: form.catatan.trim(),
    };
    setRecords((prev) => [newRecord, ...prev]);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const getStudent = (studentId) => students.find((s) => s.id === studentId);

  const filteredRecords = useMemo(() => {
    return records
      .filter((r) => (filterTingkat === "all" ? true : r.tingkat === filterTingkat))
      .filter((r) => {
        if (!search.trim()) return true;
        const student = getStudent(r.studentId);
        const q = search.toLowerCase();
        return (
          student?.name.toLowerCase().includes(q) ||
          student?.nis.includes(q) ||
          r.jenis.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
  }, [records, filterTingkat, search]);

  const summary = useMemo(() => {
    const counts = { total: records.length, ringan: 0, sedang: 0, berat: 0 };
    records.forEach((r) => (counts[r.tingkat] += 1));
    return counts;
  }, [records]);

  const topOffender = useMemo(() => {
    const tally = {};
    records.forEach((r) => {
      tally[r.studentId] = (tally[r.studentId] || 0) + (TINGKAT[r.tingkat]?.poin || 0);
    });
    const entries = Object.entries(tally).sort((a, b) => b[1] - a[1]);
    if (entries.length === 0) return null;
    const [studentId, poin] = entries[0];
    const student = getStudent(Number(studentId));
    return student ? { student, poin } : null;
  }, [records]);

  const notifications = [
    { id: 1, title: "Pengumuman Libur Semester", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Deadline Input Nilai", desc: "Dikirim 5 jam lalu", read: false },
    { id: 3, title: "Jadwal Rapat Diperbarui", desc: "Dikirim 1 hari lalu", read: true },
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
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-5xl mx-auto space-y-6">

            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-rose-600 text-white shadow-sm">
                    <AlertTriangle size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Catatan Pelanggaran</h1>
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                    Guru
                  </span>
                </div>
                <p className="text-sm text-slate-500 ml-[52px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400" />
                  Catat dan pantau pelanggaran disiplin siswa.
                </p>
              </div>
              <button
                onClick={openForm}
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors shadow-sm whitespace-nowrap"
              >
                <Plus size={16} />
                Catat Pelanggaran
              </button>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg border bg-slate-50 text-slate-600 border-slate-200">
                  <FileWarning size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total</p>
                  <p className="text-lg font-bold text-slate-800">{summary.total}</p>
                </div>
              </div>
              {Object.entries(TINGKAT).map(([key, cfg]) => (
                <div key={key} className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3">
                  <div className={`p-2 rounded-lg border ${cfg.chip}`}>
                    <span className={`block w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{cfg.label}</p>
                    <p className="text-lg font-bold text-slate-800">{summary[key]}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* TOP OFFENDER CALLOUT */}
            {topOffender && (
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm flex items-center gap-3.5">
                <div className="p-2.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 flex-shrink-0">
                  <TrendingDown size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-400">Poin pelanggaran tertinggi saat ini</p>
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {topOffender.student.name}{" "}
                    <span className="font-normal text-slate-500">— {topOffender.poin} poin</span>
                  </p>
                </div>
              </div>
            )}

            {/* ADD FORM (toggle) */}
            {showForm && (
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200/60">
                  <h3 className="text-sm font-semibold text-slate-700">Catat Pelanggaran Baru</h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Siswa */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Siswa</label>
                      <div className="relative">
                        <select
                          value={form.studentId}
                          onChange={(e) => updateForm({ studentId: e.target.value })}
                          required
                          className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-colors cursor-pointer"
                        >
                          {students.map((s) => (
                            <option key={s.id} value={s.id}>{s.name} — {s.nis}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Tanggal */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Tanggal</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={form.tanggal}
                          onChange={(e) => updateForm({ tanggal: e.target.value })}
                          required
                          className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-colors"
                        />
                        <CalendarDays size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Jenis pelanggaran */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Jenis Pelanggaran</label>
                      <div className="relative">
                        <select
                          value={form.jenis}
                          onChange={(e) => updateForm({ jenis: e.target.value })}
                          className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-colors cursor-pointer"
                        >
                          {jenisPelanggaranOptions.map((j) => (
                            <option key={j} value={j}>{j}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Tingkat */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">Tingkat Pelanggaran</label>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(TINGKAT).map(([key, cfg]) => {
                        const isActive = form.tingkat === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => updateForm({ tingkat: key })}
                            className={`
                              flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs font-medium transition-all
                              ${isActive ? `${cfg.chip} border-current` : "bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-600"}
                            `}
                          >
                            <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                            {cfg.label}
                            <span className="text-[10px] opacity-70">({cfg.poin} poin)</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Catatan */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">Catatan / Kronologi</label>
                    <textarea
                      value={form.catatan}
                      onChange={(e) => updateForm({ catatan: e.target.value })}
                      rows={3}
                      placeholder="Jelaskan kejadian secara singkat dan jelas..."
                      className="w-full px-3.5 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors shadow-sm"
                    >
                      <Plus size={16} />
                      Simpan Catatan
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* FILTER BAR */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 sm:max-w-[200px]">
                  <select
                    value={filterTingkat}
                    onChange={(e) => setFilterTingkat(e.target.value)}
                    className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-colors cursor-pointer"
                  >
                    <option value="all">Semua Tingkat</option>
                    {Object.entries(TINGKAT).map(([key, cfg]) => (
                      <option key={key} value={key}>{cfg.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative flex-1">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari nama siswa, NIS, atau jenis pelanggaran..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* RECORDS LIST */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-200/60">
                <h3 className="text-sm font-semibold text-slate-700">
                  Riwayat Pelanggaran ({filteredRecords.length})
                </h3>
              </div>

              <div className="divide-y divide-slate-100">
                {filteredRecords.length === 0 && (
                  <div className="p-10 text-center">
                    <UserX size={28} className="mx-auto text-slate-300 mb-2" />
                    <p className="text-sm text-slate-400">Tidak ada catatan pelanggaran yang cocok.</p>
                  </div>
                )}

                {filteredRecords.map((record) => {
                  const student = getStudent(record.studentId);
                  const cfg = TINGKAT[record.tingkat];
                  if (!student) return null;
                  return (
                    <div key={record.id} className="p-4 sm:p-5 hover:bg-slate-50/60 transition-colors group">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {initials(student.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold text-slate-800">{student.name}</span>
                            <span className="text-xs text-slate-400">NIS {student.nis}</span>
                            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${cfg.chip}`}>
                              {cfg.label}
                            </span>
                          </div>
                          <p className="text-sm text-slate-700 mt-1">{record.jenis}</p>
                          {record.catatan && (
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{record.catatan}</p>
                          )}
                          <p className="text-[11px] text-slate-400 mt-1.5">{formatTanggal(record.tanggal)}</p>
                        </div>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="p-1.5 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                          title="Hapus catatan"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}