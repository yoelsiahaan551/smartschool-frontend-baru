"use client";

import { useState, useMemo } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  HelpCircle,
  Search,
  Plus,
  X,
  Trash2,
  Pencil,
  ChevronDown,
  Sparkles,
  ClipboardList,
  Users,
  Timer,
  BarChart3,
  CheckCircle2,
  Circle,
  Eye,
  Send,
  FileEdit,
  Copy,
} from "lucide-react";

// ===== DUMMY DATA =====
const MAPEL_OPTIONS = ["Matematika", "Bahasa Indonesia", "Bahasa Inggris", "IPA", "IPS"];
const KELAS_OPTIONS = ["7", "8", "9"];

const STATUS = {
  draft: { label: "Draf", chip: "bg-slate-100 text-slate-500 border-slate-300", dot: "bg-slate-400" },
  terbit: { label: "Diterbitkan", chip: "bg-emerald-50 text-emerald-600 border-emerald-200", dot: "bg-emerald-500" },
  selesai: { label: "Selesai", chip: "bg-blue-50 text-blue-600 border-blue-200", dot: "bg-blue-500" },
};

const emptyQuestion = () => ({
  id: Date.now() + Math.random(),
  teks: "",
  opsi: ["", "", "", ""],
  jawabanBenar: 0,
});

const initialQuizzes = [
  {
    id: 1,
    judul: "Kuis Aljabar Dasar",
    mapel: "Matematika",
    kelas: "8",
    durasi: 30,
    status: "terbit",
    peserta: 24,
    totalSiswa: 28,
    rataSkor: 82,
    soal: [
      { id: 1, teks: "Hasil dari 3x + 5 = 20 adalah x = ...", opsi: ["3", "5", "7", "15"], jawabanBenar: 1 },
      { id: 2, teks: "Bentuk sederhana dari 2(x + 3) adalah ...", opsi: ["2x + 3", "2x + 6", "x + 6", "2x + 5"], jawabanBenar: 1 },
    ],
  },
  {
    id: 2,
    judul: "Ulangan Harian Cerpen",
    mapel: "Bahasa Indonesia",
    kelas: "8",
    durasi: 40,
    status: "selesai",
    peserta: 28,
    totalSiswa: 28,
    rataSkor: 76,
    soal: [
      { id: 1, teks: "Unsur intrinsik yang menunjukkan pesan moral cerita disebut ...", opsi: ["Alur", "Tema", "Amanat", "Latar"], jawabanBenar: 2 },
    ],
  },
  {
    id: 3,
    judul: "Quiz Simple Present Tense",
    mapel: "Bahasa Inggris",
    kelas: "7",
    durasi: 20,
    status: "draft",
    peserta: 0,
    totalSiswa: 22,
    rataSkor: null,
    soal: [
      { id: 1, teks: "She ___ to school every day.", opsi: ["go", "goes", "going", "gone"], jawabanBenar: 1 },
      { id: 2, teks: "They ___ football on Sundays.", opsi: ["play", "plays", "playing", "played"], jawabanBenar: 0 },
    ],
  },
  {
    id: 4,
    judul: "Kuis Sistem Pencernaan",
    mapel: "IPA",
    kelas: "9",
    durasi: 25,
    status: "terbit",
    peserta: 18,
    totalSiswa: 26,
    rataSkor: 88,
    soal: [
      { id: 1, teks: "Enzim yang mencerna protein di lambung adalah ...", opsi: ["Amilase", "Pepsin", "Lipase", "Renin"], jawabanBenar: 1 },
    ],
  },
];

// ===== MAIN COMPONENT =====

export default function QuizPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu] = useState("quiz");

  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [filterMapel, setFilterMapel] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewId, setPreviewId] = useState(null);

  const emptyForm = {
    judul: "",
    mapel: MAPEL_OPTIONS[0],
    kelas: KELAS_OPTIONS[0],
    durasi: 30,
    status: "draft",
    soal: [emptyQuestion()],
  };
  const [form, setForm] = useState(emptyForm);

  const updateForm = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (quiz) => {
    setEditingId(quiz.id);
    setForm({
      judul: quiz.judul,
      mapel: quiz.mapel,
      kelas: quiz.kelas,
      durasi: quiz.durasi,
      status: quiz.status,
      soal: quiz.soal.map((s) => ({ ...s, opsi: [...s.opsi] })),
    });
    setShowForm(true);
  };

  const addQuestion = () => updateForm({ soal: [...form.soal, emptyQuestion()] });

  const removeQuestion = (qid) => {
    if (form.soal.length <= 1) return;
    updateForm({ soal: form.soal.filter((s) => s.id !== qid) });
  };

  const updateQuestionText = (qid, teks) => {
    updateForm({ soal: form.soal.map((s) => (s.id === qid ? { ...s, teks } : s)) });
  };

  const updateOption = (qid, idx, value) => {
    updateForm({
      soal: form.soal.map((s) => {
        if (s.id !== qid) return s;
        const opsi = [...s.opsi];
        opsi[idx] = value;
        return { ...s, opsi };
      }),
    });
  };

  const setCorrectAnswer = (qid, idx) => {
    updateForm({ soal: form.soal.map((s) => (s.id === qid ? { ...s, jawabanBenar: idx } : s)) });
  };

  const handleSubmit = (e, publish) => {
    e.preventDefault();
    if (!form.judul.trim()) return;
    const validSoal = form.soal.filter((s) => s.teks.trim() && s.opsi.every((o) => o.trim()));
    if (validSoal.length === 0) return;

    const payload = {
      judul: form.judul.trim(),
      mapel: form.mapel,
      kelas: form.kelas,
      durasi: Number(form.durasi) || 0,
      status: publish ? "terbit" : "draft",
      soal: validSoal,
    };

    if (editingId) {
      setQuizzes((prev) =>
        prev.map((q) => (q.id === editingId ? { ...q, ...payload } : q))
      );
    } else {
      setQuizzes((prev) => [
        { ...payload, id: Date.now(), peserta: 0, totalSiswa: 25, rataSkor: null },
        ...prev,
      ]);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
  };

  const handleDuplicate = (quiz) => {
    setQuizzes((prev) => [
      {
        ...quiz,
        id: Date.now(),
        judul: `${quiz.judul} (Salinan)`,
        status: "draft",
        peserta: 0,
        rataSkor: null,
      },
      ...prev,
    ]);
  };

  const filteredQuizzes = useMemo(() => {
    return quizzes
      .filter((q) => (filterMapel === "all" ? true : q.mapel === filterMapel))
      .filter((q) => (filterStatus === "all" ? true : q.status === filterStatus))
      .filter((q) => {
        if (!search.trim()) return true;
        const s = search.toLowerCase();
        return q.judul.toLowerCase().includes(s) || q.mapel.toLowerCase().includes(s);
      });
  }, [quizzes, filterMapel, filterStatus, search]);

  const summary = useMemo(() => {
    const total = quizzes.length;
    const aktif = quizzes.filter((q) => q.status === "terbit").length;
    const totalPeserta = quizzes.reduce((a, q) => a + (q.peserta || 0), 0);
    const withScore = quizzes.filter((q) => q.rataSkor !== null);
    const rataSkor = withScore.length
      ? Math.round(withScore.reduce((a, q) => a + q.rataSkor, 0) / withScore.length)
      : null;
    return { total, aktif, totalPeserta, rataSkor };
  }, [quizzes]);

  const previewQuiz = quizzes.find((q) => q.id === previewId);

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
                  <div className="p-2 rounded-lg bg-violet-500 text-white shadow-sm">
                    <HelpCircle size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Quiz</h1>
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                    Guru
                  </span>
                </div>
                <p className="text-sm text-slate-500 ml-[52px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400" />
                  Buat dan kelola kuis pilihan ganda untuk siswa.
                </p>
              </div>
              <button
                onClick={openAddForm}
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-violet-500 rounded-lg hover:bg-violet-600 transition-colors shadow-sm whitespace-nowrap"
              >
                <Plus size={16} />
                Buat Kuis
              </button>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg border bg-slate-50 text-slate-600 border-slate-200">
                  <ClipboardList size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total Kuis</p>
                  <p className="text-lg font-bold text-slate-800">{summary.total}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg border bg-emerald-50 text-emerald-600 border-emerald-200">
                  <Send size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Diterbitkan</p>
                  <p className="text-lg font-bold text-slate-800">{summary.aktif}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg border bg-blue-50 text-blue-600 border-blue-200">
                  <Users size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total Peserta</p>
                  <p className="text-lg font-bold text-slate-800">{summary.totalPeserta}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg border bg-violet-50 text-violet-600 border-violet-200">
                  <BarChart3 size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Rata-rata Skor</p>
                  <p className="text-lg font-bold text-slate-800">{summary.rataSkor ?? "—"}</p>
                </div>
              </div>
            </div>

            {/* ADD / EDIT FORM (toggle) */}
            {showForm && (
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200/60">
                  <h3 className="text-sm font-semibold text-slate-700">
                    {editingId ? "Edit Kuis" : "Buat Kuis Baru"}
                  </h3>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                <form className="p-4 sm:p-5 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Judul */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Judul Kuis</label>
                      <input
                        type="text"
                        value={form.judul}
                        onChange={(e) => updateForm({ judul: e.target.value })}
                        required
                        placeholder="Contoh: Kuis Aljabar Dasar"
                        className="w-full px-3.5 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-colors"
                      />
                    </div>

                    {/* Mapel */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Mata Pelajaran</label>
                      <div className="relative">
                        <select
                          value={form.mapel}
                          onChange={(e) => updateForm({ mapel: e.target.value })}
                          className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-colors cursor-pointer"
                        >
                          {MAPEL_OPTIONS.map((m) => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Kelas */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Kelas</label>
                      <div className="relative">
                        <select
                          value={form.kelas}
                          onChange={(e) => updateForm({ kelas: e.target.value })}
                          className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-colors cursor-pointer"
                        >
                          {KELAS_OPTIONS.map((k) => (
                            <option key={k} value={k}>Kelas {k}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Durasi */}
                    <div className="sm:col-span-2 sm:w-40">
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Durasi (menit)</label>
                      <div className="relative">
                        <input
                          type="number"
                          min={1}
                          value={form.durasi}
                          onChange={(e) => updateForm({ durasi: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-colors"
                        />
                        <Timer size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* SOAL BUILDER */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-medium text-slate-500">Daftar Soal ({form.soal.length})</label>
                      <button
                        type="button"
                        onClick={addQuestion}
                        className="flex items-center gap-1.5 text-xs font-medium text-violet-600 hover:text-violet-700 transition-colors"
                      >
                        <Plus size={14} />
                        Tambah Soal
                      </button>
                    </div>

                    <div className="space-y-3">
                      {form.soal.map((s, qIdx) => (
                        <div key={s.id} className="rounded-lg border border-slate-200 bg-slate-50/60 p-3.5">
                          <div className="flex items-start gap-2 mb-2.5">
                            <span className="flex-shrink-0 mt-2 w-5 h-5 rounded-full bg-violet-100 text-violet-600 text-[11px] font-bold flex items-center justify-center">
                              {qIdx + 1}
                            </span>
                            <input
                              type="text"
                              value={s.teks}
                              onChange={(e) => updateQuestionText(s.id, e.target.value)}
                              placeholder="Tulis pertanyaan di sini..."
                              className="flex-1 px-3 py-2 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-colors"
                            />
                            {form.soal.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeQuestion(s.id)}
                                className="flex-shrink-0 p-2 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                title="Hapus soal"
                              >
                                <Trash2 size={15} />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-7">
                            {s.opsi.map((opt, oIdx) => {
                              const isCorrect = s.jawabanBenar === oIdx;
                              return (
                                <div key={oIdx} className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setCorrectAnswer(s.id, oIdx)}
                                    title="Tandai sebagai jawaban benar"
                                    className={`flex-shrink-0 transition-colors ${
                                      isCorrect ? "text-emerald-500" : "text-slate-300 hover:text-slate-400"
                                    }`}
                                  >
                                    {isCorrect ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                                  </button>
                                  <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => updateOption(s.id, oIdx, e.target.value)}
                                    placeholder={`Opsi ${String.fromCharCode(65 + oIdx)}`}
                                    className={`flex-1 px-3 py-1.5 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 ${
                                      isCorrect
                                        ? "bg-emerald-50/60 border-emerald-200 text-emerald-800"
                                        : "bg-white border-slate-200 text-slate-700"
                                    }`}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingId(null);
                      }}
                      className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleSubmit(e, false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-violet-600 bg-violet-50 border border-violet-200 rounded-lg hover:bg-violet-100 transition-colors"
                    >
                      <FileEdit size={16} />
                      Simpan sebagai Draf
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleSubmit(e, true)}
                      className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-violet-500 rounded-lg hover:bg-violet-600 transition-colors shadow-sm"
                    >
                      <Send size={16} />
                      Terbitkan Kuis
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
                    value={filterMapel}
                    onChange={(e) => setFilterMapel(e.target.value)}
                    className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-colors cursor-pointer"
                  >
                    <option value="all">Semua Mapel</option>
                    {MAPEL_OPTIONS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative flex-1 sm:max-w-[160px]">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-colors cursor-pointer"
                  >
                    <option value="all">Semua Status</option>
                    {Object.entries(STATUS).map(([key, cfg]) => (
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
                    placeholder="Cari judul kuis atau mapel..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* QUIZ LIST */}
            <div className="space-y-3">
              {filteredQuizzes.length === 0 && (
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-10 text-center">
                  <HelpCircle size={28} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-sm text-slate-400">Belum ada kuis yang cocok.</p>
                </div>
              )}

              {filteredQuizzes.map((quiz) => {
                const statusCfg = STATUS[quiz.status];
                const progress = quiz.totalSiswa ? Math.round((quiz.peserta / quiz.totalSiswa) * 100) : 0;
                return (
                  <div
                    key={quiz.id}
                    className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-5 hover:border-violet-200 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-semibold text-slate-800">{quiz.judul}</h4>
                          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${statusCfg.chip}`}>
                            {statusCfg.label}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-slate-500">
                          <span>{quiz.mapel}</span>
                          <span>Kelas {quiz.kelas}</span>
                          <span className="flex items-center gap-1">
                            <ClipboardList size={12} className="text-slate-400" />
                            {quiz.soal.length} soal
                          </span>
                          <span className="flex items-center gap-1">
                            <Timer size={12} className="text-slate-400" />
                            {quiz.durasi} menit
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => setPreviewId(quiz.id)}
                          className="p-1.5 rounded-lg text-slate-300 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                          title="Pratinjau soal"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => openEditForm(quiz)}
                          className="p-1.5 rounded-lg text-slate-300 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                          title="Edit kuis"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDuplicate(quiz)}
                          className="p-1.5 rounded-lg text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                          title="Duplikat kuis"
                        >
                          <Copy size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(quiz.id)}
                          className="p-1.5 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Hapus kuis"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    {quiz.status !== "draft" && (
                      <div className="mt-3.5 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                            <span>Peserta mengerjakan</span>
                            <span className="font-medium text-slate-700">{quiz.peserta}/{quiz.totalSiswa}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-violet-400"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                        {quiz.rataSkor !== null && (
                          <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 sm:pl-4 sm:border-l sm:border-slate-100">
                            <BarChart3 size={14} className="text-violet-500" />
                            Rata-rata: {quiz.rataSkor}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </main>
      </div>

      {/* PREVIEW MODAL */}
      {previewQuiz && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setPreviewId(null)}
        >
          <div
            className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200/60">
              <div>
                <h3 className="text-sm font-semibold text-slate-800">{previewQuiz.judul}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{previewQuiz.mapel} · Kelas {previewQuiz.kelas} · {previewQuiz.soal.length} soal</p>
              </div>
              <button
                onClick={() => setPreviewId(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="overflow-y-auto p-4 sm:p-5 space-y-4">
              {previewQuiz.soal.map((s, idx) => (
                <div key={s.id}>
                  <p className="text-sm font-medium text-slate-800 mb-2">
                    {idx + 1}. {s.teks}
                  </p>
                  <div className="space-y-1.5 pl-1">
                    {s.opsi.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border ${
                          oIdx === s.jawabanBenar
                            ? "bg-emerald-50/60 border-emerald-200 text-emerald-700"
                            : "bg-slate-50 border-slate-200 text-slate-600"
                        }`}
                      >
                        {oIdx === s.jawabanBenar ? (
                          <CheckCircle2 size={14} className="flex-shrink-0" />
                        ) : (
                          <Circle size={14} className="flex-shrink-0 text-slate-300" />
                        )}
                        <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}