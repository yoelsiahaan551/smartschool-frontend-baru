"use client";

import { useState, useMemo } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  Award,
  Search,
  Plus,
  X,
  Trash2,
  ChevronDown,
  Sparkles,
  CalendarDays,
  Trophy,
  TrendingUp,
  Medal,
  Star,
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
  sekolah: { label: "Sekolah", poin: 10, chip: "bg-slate-100 text-slate-600 border-slate-300", dot: "bg-slate-500" },
  kabupaten: { label: "Kab/Kota", poin: 20, chip: "bg-blue-50 text-blue-600 border-blue-200", dot: "bg-blue-500" },
  provinsi: { label: "Provinsi", poin: 35, chip: "bg-purple-50 text-purple-600 border-purple-200", dot: "bg-purple-500" },
  nasional: { label: "Nasional", poin: 50, chip: "bg-amber-50 text-amber-600 border-amber-200", dot: "bg-amber-500" },
  internasional: { label: "Internasional", poin: 75, chip: "bg-emerald-50 text-emerald-600 border-emerald-200", dot: "bg-emerald-500" },
};

const PERINGKAT_OPTIONS = ["Juara 1", "Juara 2", "Juara 3", "Harapan 1", "Harapan 2", "Peserta Terbaik", "Partisipasi"];

const jenisPrestasiOptions = [
  "Akademik (OSN / Olimpiade)",
  "Olahraga",
  "Seni & Budaya",
  "Keagamaan",
  "Organisasi / Kepemimpinan",
  "Karya Tulis / Riset",
  "Lainnya",
];

const initialRecords = [
  {
    id: 1,
    studentId: 5,
    tanggal: "2026-08-04",
    jenis: "Akademik (OSN / Olimpiade)",
    tingkat: "provinsi",
    peringkat: "Juara 1",
    catatan: "Juara 1 OSN Matematika tingkat Provinsi mewakili sekolah.",
  },
  {
    id: 2,
    studentId: 2,
    tanggal: "2026-08-01",
    jenis: "Olahraga",
    tingkat: "kabupaten",
    peringkat: "Juara 2",
    catatan: "Juara 2 lomba lari 100m O2SN tingkat Kabupaten.",
  },
  {
    id: 3,
    studentId: 9,
    tanggal: "2026-07-28",
    jenis: "Seni & Budaya",
    tingkat: "sekolah",
    peringkat: "Juara 1",
    catatan: "Juara 1 lomba menyanyi solo dalam perayaan HUT sekolah.",
  },
  {
    id: 4,
    studentId: 5,
    tanggal: "2026-07-20",
    jenis: "Karya Tulis / Riset",
    tingkat: "nasional",
    peringkat: "Harapan 1",
    catatan: "Harapan 1 lomba karya tulis ilmiah remaja tingkat Nasional.",
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

export default function CatatanPrestasiPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu] = useState("catatanPrestasi");

  const [records, setRecords] = useState(initialRecords);
  const [filterTingkat, setFilterTingkat] = useState("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  // form state
  const emptyForm = {
    studentId: String(students[0]?.id ?? ""),
    tanggal: todayISO(),
    jenis: jenisPrestasiOptions[0],
    tingkat: "sekolah",
    peringkat: PERINGKAT_OPTIONS[0],
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
      peringkat: form.peringkat,
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
          r.jenis.toLowerCase().includes(q) ||
          r.peringkat.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
  }, [records, filterTingkat, search]);

  const summary = useMemo(() => {
    const counts = { total: records.length, juara1: 0, provNasInt: 0 };
    records.forEach((r) => {
      if (r.peringkat === "Juara 1") counts.juara1 += 1;
      if (["provinsi", "nasional", "internasional"].includes(r.tingkat)) counts.provNasInt += 1;
    });
    return counts;
  }, [records]);

  const topAchiever = useMemo(() => {
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
                  <div className="p-2 rounded-lg bg-amber-500 text-white shadow-sm">
                    <Award size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Catatan Prestasi</h1>
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                    Guru
                  </span>
                </div>
                <p className="text-sm text-slate-500 ml-[52px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400" />
                  Catat dan apresiasi pencapaian siswa.
                </p>
              </div>
              <button
                onClick={openForm}
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors shadow-sm whitespace-nowrap"
              >
                <Plus size={16} />
                Catat Prestasi
              </button>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg border bg-slate-50 text-slate-600 border-slate-200">
                  <Trophy size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total Prestasi</p>
                  <p className="text-lg font-bold text-slate-800">{summary.total}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg border bg-amber-50 text-amber-600 border-amber-200">
                  <Medal size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Juara 1</p>
                  <p className="text-lg font-bold text-slate-800">{summary.juara1}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg border bg-purple-50 text-purple-600 border-purple-200">
                  <Star size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Provinsi ke Atas</p>
                  <p className="text-lg font-bold text-slate-800">{summary.provNasInt}</p>
                </div>
              </div>
            </div>

            {/* TOP ACHIEVER CALLOUT */}
            {topAchiever && (
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm flex items-center gap-3.5">
                <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 flex-shrink-0">
                  <TrendingUp size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-400">Poin prestasi tertinggi saat ini</p>
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {topAchiever.student.name}{" "}
                    <span className="font-normal text-slate-500">— {topAchiever.poin} poin</span>
                  </p>
                </div>
              </div>
            )}

            {/* ADD FORM (toggle) */}
            {showForm && (
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200/60">
                  <h3 className="text-sm font-semibold text-slate-700">Catat Prestasi Baru</h3>
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
                          className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors cursor-pointer"
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
                          className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
                        />
                        <CalendarDays size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Jenis prestasi */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Jenis Prestasi</label>
                      <div className="relative">
                        <select
                          value={form.jenis}
                          onChange={(e) => updateForm({ jenis: e.target.value })}
                          className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors cursor-pointer"
                        >
                          {jenisPrestasiOptions.map((j) => (
                            <option key={j} value={j}>{j}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Peringkat / hasil */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Peringkat / Hasil</label>
                      <div className="relative">
                        <select
                          value={form.peringkat}
                          onChange={(e) => updateForm({ peringkat: e.target.value })}
                          className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors cursor-pointer"
                        >
                          {PERINGKAT_OPTIONS.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Tingkat kejuaraan */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">Tingkat Kejuaraan</label>
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
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">Catatan / Keterangan</label>
                    <textarea
                      value={form.catatan}
                      onChange={(e) => updateForm({ catatan: e.target.value })}
                      rows={3}
                      placeholder="Ceritakan singkat konteks pencapaiannya..."
                      className="w-full px-3.5 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors resize-none"
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
                      className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
                    >
                      <Plus size={16} />
                      Simpan Prestasi
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
                    className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors cursor-pointer"
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
                    placeholder="Cari nama siswa, NIS, jenis, atau peringkat..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* RECORDS LIST */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-200/60">
                <h3 className="text-sm font-semibold text-slate-700">
                  Riwayat Prestasi ({filteredRecords.length})
                </h3>
              </div>

              <div className="divide-y divide-slate-100">
                {filteredRecords.length === 0 && (
                  <div className="p-10 text-center">
                    <Trophy size={28} className="mx-auto text-slate-300 mb-2" />
                    <p className="text-sm text-slate-400">Belum ada catatan prestasi yang cocok.</p>
                  </div>
                )}

                {filteredRecords.map((record) => {
                  const student = getStudent(record.studentId);
                  const cfg = TINGKAT[record.tingkat];
                  if (!student) return null;
                  return (
                    <div key={record.id} className="p-4 sm:p-5 hover:bg-slate-50/60 transition-colors group">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {initials(student.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold text-slate-800">{student.name}</span>
                            <span className="text-xs text-slate-400">NIS {student.nis}</span>
                            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${cfg.chip}`}>
                              {cfg.label}
                            </span>
                            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
                              <Medal size={11} />
                              {record.peringkat}
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