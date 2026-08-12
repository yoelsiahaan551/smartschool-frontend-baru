"use client";

import { useState, useMemo } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  ClipboardCheck,
  Search,
  CheckCircle2,
  Clock3,
  Stethoscope,
  XCircle,
  Users,
  CalendarDays,
  Save,
  RotateCcw,
  ChevronDown,
  Sparkles,
  X,
  Printer,
  TrendingUp,
  Image as ImageIcon,
  Download,
  ExternalLink,
} from "lucide-react";

// ===== DUMMY DATA =====
const classList = [
  { id: "9a", name: "Kelas 9A", mapel: "Matematika" },
  { id: "9b", name: "Kelas 9B", mapel: "Matematika" },
  { id: "9c", name: "Kelas 9C", mapel: "IPA" },
  { id: "8a", name: "Kelas 8A", mapel: "Matematika" },
  { id: "8b", name: "Kelas 8B", mapel: "IPA" },
];

// helper: generate avatar SVG (data URI) langsung di kode — tidak bergantung koneksi internet.
// Di aplikasi nyata, ganti nilai `foto` siswa dengan URL foto asli dari server/database kamu.
const AVATAR_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#f43f5e", "#8b5cf6", "#06b6d4", "#ec4899", "#84cc16"];

const getInitials = (name) =>
  name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

const fotoFor = (name, size = 300) => {
  const hash = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const bg = AVATAR_COLORS[hash % AVATAR_COLORS.length];
  const ini = getInitials(name);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
    <rect width="100%" height="100%" fill="${bg}"/>
    <text x="50%" y="50%" dy=".35em" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.round(size * 0.4)}" fill="#ffffff" font-weight="700">${ini}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const studentsByClass = {
  "9a": [
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
  ],
  "9b": [
    { id: 11, name: "Kirana Ayu", nis: "2409011" },
    { id: 12, name: "Lutfi Hakim", nis: "2409012" },
    { id: 13, name: "Maya Sari", nis: "2409013" },
    { id: 14, name: "Nanda Pratama", nis: "2409014" },
    { id: 15, name: "Olivia Putri", nis: "2409015" },
    { id: 16, name: "Putra Wijaya", nis: "2409016" },
  ],
  "9c": [
    { id: 17, name: "Qori Amanda", nis: "2409017" },
    { id: 18, name: "Rizki Ramadhan", nis: "2409018" },
    { id: 19, name: "Sinta Bella", nis: "2409019" },
    { id: 20, name: "Taufik Hidayat", nis: "2409020" },
    { id: 21, name: "Umi Kalsum", nis: "2409021" },
  ],
  "8a": [
    { id: 22, name: "Vino Alamsyah", nis: "2408022" },
    { id: 23, name: "Wulan Sari", nis: "2408023" },
    { id: 24, name: "Xena Aulia", nis: "2408024" },
    { id: 25, name: "Yusuf Maulana", nis: "2408025" },
  ],
  "8b": [
    { id: 26, name: "Zahra Adelia", nis: "2408026" },
    { id: 27, name: "Andi Firmansyah", nis: "2408027" },
    { id: 28, name: "Bella Safitri", nis: "2408028" },
  ],
};

// tambahkan field foto ke tiap siswa
Object.values(studentsByClass).forEach((list) =>
  list.forEach((s) => {
    s.foto = fotoFor(s.name);
  })
);

const STATUS = {
  hadir: { label: "Hadir", icon: CheckCircle2, activeClass: "bg-emerald-500 border-emerald-500 text-white", chipClass: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  izin: { label: "Izin", icon: Clock3, activeClass: "bg-blue-500 border-blue-500 text-white", chipClass: "bg-blue-50 text-blue-600 border-blue-200" },
  sakit: { label: "Sakit", icon: Stethoscope, activeClass: "bg-amber-500 border-amber-500 text-white", chipClass: "bg-amber-50 text-amber-600 border-amber-200" },
  alpa: { label: "Alpa", icon: XCircle, activeClass: "bg-rose-500 border-rose-500 text-white", chipClass: "bg-rose-50 text-rose-600 border-rose-200" },
};

const todayISO = () => new Date().toISOString().slice(0, 10);

// ===== AVATAR + badge "buka foto" =====
function Avatar({ student, size = 36, onOpenPhoto }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <img
        src={student.foto}
        alt={student.name}
        style={{ width: size, height: size }}
        className="rounded-full object-cover border border-slate-200"
      />

      {/* badge kecil untuk membuka / mengunduh foto */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpenPhoto(student);
        }}
        title="Lihat / unduh foto"
        className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-white border border-slate-300 flex items-center justify-center shadow-sm hover:bg-emerald-50 hover:border-emerald-400 transition-colors"
      >
        <ImageIcon size={9} className="text-slate-500" />
      </button>
    </div>
  );
}

// ===== LIGHTBOX: buka / unduh foto siswa =====
function PhotoLightbox({ student, onClose }) {
  if (!student) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-xs overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img src={student.foto} alt={student.name} className="w-full aspect-square object-cover" />
          <button
            onClick={onClose}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/80 text-slate-600 hover:bg-white transition-colors shadow-sm"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <p className="text-sm font-semibold text-slate-800">{student.name}</p>
            <p className="text-xs text-slate-400">NIS {student.nis}</p>
          </div>
          <div className="flex gap-2">
            <a
              href={student.foto}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ExternalLink size={13} />
              Buka Tab Baru
            </a>
            <a
              href={student.foto}
              download={`foto-${student.nis}.jpg`}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Download size={13} />
              Unduh Foto
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== MAIN COMPONENT =====

export default function AbsensiPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu] = useState("absensi");

  const [classId, setClassId] = useState("9a");
  const [date, setDate] = useState(todayISO());
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(false);
  const [statusFilter, setStatusFilter] = useState(null);
  const [photoStudent, setPhotoStudent] = useState(null);

  const students = studentsByClass[classId] || [];

  // status per siswa: default "hadir" untuk semua
  const [attendance, setAttendance] = useState(() =>
    Object.fromEntries(students.map((s) => [s.id, "hadir"]))
  );
  // catatan/keterangan per siswa (untuk izin/sakit)
  const [notes, setNotes] = useState({});

  // ganti kelas -> reset status & catatan ke default untuk kelas itu
  const handleClassChange = (id) => {
    setClassId(id);
    setSaved(false);
    setStatusFilter(null);
    const list = studentsByClass[id] || [];
    setAttendance(Object.fromEntries(list.map((s) => [s.id, "hadir"])));
    setNotes({});
  };

  const setStatus = (studentId, status) => {
    setSaved(false);
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
    if (status === "hadir") {
      setNotes((prev) => ({ ...prev, [studentId]: "" }));
    }
  };

  const setNote = (studentId, text) => {
    setNotes((prev) => ({ ...prev, [studentId]: text }));
  };

  const markAllPresent = () => {
    setSaved(false);
    setAttendance(Object.fromEntries(students.map((s) => [s.id, "hadir"])));
    setNotes({});
  };

  const filteredStudents = useMemo(() => {
    let list = students;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q) || s.nis.includes(q));
    }
    if (statusFilter) {
      list = list.filter((s) => (attendance[s.id] || "hadir") === statusFilter);
    }
    return list;
  }, [students, search, statusFilter, attendance]);

  const summary = useMemo(() => {
    const counts = { hadir: 0, izin: 0, sakit: 0, alpa: 0 };
    students.forEach((s) => {
      const st = attendance[s.id] || "hadir";
      counts[st] += 1;
    });
    return counts;
  }, [students, attendance]);

  const kehadiranPercent = students.length
    ? Math.round((summary.hadir / students.length) * 100)
    : 0;

  const currentClass = classList.find((c) => c.id === classId);

  const handleSave = () => {
    // dummy save — di aplikasi nyata ini yang manggil API
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

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
                  <div className="p-2 rounded-lg bg-emerald-600 text-white shadow-sm">
                    <ClipboardCheck size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Absensi</h1>
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                    Guru
                  </span>
                </div>
                <p className="text-sm text-slate-500 ml-[52px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400" />
                  Catat kehadiran siswa per kelas hari ini.
                </p>
              </div>

              <button
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm whitespace-nowrap self-start sm:self-auto"
              >
                <Printer size={15} />
                Cetak Rekap
              </button>
            </div>

            {/* FILTER BAR: kelas + tanggal */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                  {/* Pilih kelas */}
                  <div className="relative flex-1 sm:max-w-xs">
                    <select
                      value={classId}
                      onChange={(e) => handleClassChange(e.target.value)}
                      className="w-full appearance-none pl-10 pr-9 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-colors cursor-pointer"
                    >
                      {classList.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} — {c.mapel}
                        </option>
                      ))}
                    </select>
                    <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>

                  {/* Pilih tanggal */}
                  <div className="relative flex-1 sm:max-w-[200px]">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-colors"
                    />
                    <CalendarDays size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <button
                  onClick={markAllPresent}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm whitespace-nowrap"
                >
                  <RotateCcw size={15} />
                  Tandai Semua Hadir
                </button>
              </div>
            </div>

            {/* SUMMARY CHIPS (klik untuk filter) + persentase kehadiran */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg border bg-slate-50 text-slate-500 border-slate-200">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Kehadiran</p>
                  <p className="text-lg font-bold text-slate-800">{kehadiranPercent}%</p>
                </div>
              </div>

              {Object.entries(STATUS).map(([key, cfg]) => {
                const Icon = cfg.icon;
                const isActive = statusFilter === key;
                return (
                  <button
                    key={key}
                    onClick={() => setStatusFilter((prev) => (prev === key ? null : key))}
                    className={`text-left bg-white rounded-xl border p-3.5 shadow-sm flex items-center gap-3 transition-all ${
                      isActive ? "border-slate-400 ring-2 ring-slate-200" : "border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    <div className={`p-2 rounded-lg border ${cfg.chipClass}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{cfg.label}</p>
                      <p className="text-lg font-bold text-slate-800">{summary[key]}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            {statusFilter && (
              <button
                onClick={() => setStatusFilter(null)}
                className="text-xs font-medium text-slate-500 hover:text-slate-700 flex items-center gap-1 -mt-3"
              >
                <X size={12} /> Hapus filter "{STATUS[statusFilter].label}"
              </button>
            )}

            {/* STUDENT LIST */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-700">
                    Daftar Siswa — {currentClass?.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{students.length} siswa terdaftar</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari nama atau NIS..."
                    className="w-full pl-9 pr-3 py-2 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {filteredStudents.length === 0 && (
                  <div className="p-8 text-center text-sm text-slate-400">
                    Tidak ada siswa yang cocok dengan pencarian.
                  </div>
                )}

                {filteredStudents.map((student, idx) => {
                  const current = attendance[student.id] || "hadir";
                  const needsNote = current === "izin" || current === "sakit";
                  return (
                    <div
                      key={student.id}
                      className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 p-3.5 sm:p-4 hover:bg-slate-50/60 transition-colors"
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <span className="text-xs font-medium text-slate-400 w-5 text-center flex-shrink-0 pt-1.5">
                          {idx + 1}
                        </span>
                        <Avatar student={student} size={36} onOpenPhoto={setPhotoStudent} />
                        <div className="min-w-0 pt-0.5">
                          <p className="text-sm font-medium text-slate-800 truncate">{student.name}</p>
                          <p className="text-xs text-slate-400">NIS {student.nis}</p>
                          {needsNote && (
                            <input
                              value={notes[student.id] || ""}
                              onChange={(e) => setNote(student.id, e.target.value)}
                              placeholder={current === "izin" ? "Keterangan izin (opsional)" : "Keterangan sakit (opsional)"}
                              className="mt-1.5 w-full max-w-[220px] text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-colors"
                            />
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 ml-12 sm:ml-0">
                        {Object.entries(STATUS).map(([key, cfg]) => {
                          const Icon = cfg.icon;
                          const isActive = current === key;
                          return (
                            <button
                              key={key}
                              onClick={() => setStatus(student.id, key)}
                              title={cfg.label}
                              className={`
                                flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium
                                transition-all duration-150
                                ${isActive ? cfg.activeClass : "bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-600"}
                              `}
                            >
                              <Icon size={13} />
                              <span className="hidden sm:inline">{cfg.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SAVE BAR */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm">
              <p className="text-xs text-slate-400">
                Pastikan status kehadiran sudah benar sebelum menyimpan. Data akan tercatat untuk tanggal{" "}
                <span className="font-medium text-slate-600">
                  {new Date(date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </span>
                .
              </p>
              <div className="flex items-center gap-3 flex-shrink-0">
                {saved && (
                  <span className="text-xs font-medium text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    Absensi tersimpan
                  </span>
                )}
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <Save size={16} />
                  Simpan Absensi
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>

      <PhotoLightbox student={photoStudent} onClose={() => setPhotoStudent(null)} />
    </div>
  );
}