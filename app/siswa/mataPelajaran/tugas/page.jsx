"use client";

import { Suspense, useState, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  ArrowLeft,
  ClipboardList,
  Calculator,
  FlaskConical,
  Globe2,
  Languages,
  BookOpen,
  Palette,
  Music,
  Dumbbell,
  Clock,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  Paperclip,
  X,
  ChevronDown,
  ChevronUp,
  Calendar,
  User,
  FileText,
} from "lucide-react";

// ============================================================
// DATA DUMMY (pisahkan ke file terpisah jika perlu)
// ============================================================
const mataPelajaranList = [
  { id: "matematika", nama: "Matematika", guru: "Bu Sari", icon: Calculator },
  { id: "bindo", nama: "Bahasa Indonesia", guru: "Pak Budi", icon: Languages },
  { id: "ipa", nama: "IPA", guru: "Bu Dewi", icon: FlaskConical },
  { id: "ips", nama: "IPS", guru: "Pak Anwar", icon: Globe2 },
  { id: "binggris", nama: "Bahasa Inggris", guru: "Bu Rina", icon: BookOpen },
  { id: "seni", nama: "Seni Budaya", guru: "Bu Wulan", icon: Palette },
  { id: "musik", nama: "Seni Musik", guru: "Pak Doni", icon: Music },
  { id: "penjas", nama: "Penjaskes", guru: "Pak Rudi", icon: Dumbbell },
];

const STATUS_STYLE = {
  belum: {
    label: "Belum Dikerjakan",
    bg: "bg-amber-50",
    text: "text-amber-700",
    icon: Clock,
    border: "border-amber-200",
  },
  dikumpulkan: {
    label: "Sudah Dikumpulkan",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    icon: CheckCircle2,
    border: "border-emerald-200",
  },
  terlambat: {
    label: "Terlambat",
    bg: "bg-rose-50",
    text: "text-rose-700",
    icon: AlertCircle,
    border: "border-rose-200",
  },
};

const tugasList = [
  {
    id: 1,
    mapelId: "matematika",
    judul: "Latihan Bab 4 - Operasi Pecahan",
    deskripsi:
      "Kerjakan soal nomor 1-10 di buku paket halaman 88. Tulis tangan lalu foto, atau ketik di dokumen.",
    guru: "Bu Sari",
    deadline: "21 Agu 2026, 23:59",
    status: "belum",
    fileTerkumpul: null,
  },
  {
    id: 2,
    mapelId: "ipa",
    judul: "Laporan Praktikum Fotosintesis",
    deskripsi:
      "Susun laporan hasil praktikum minggu lalu dalam format PDF, maksimal 3 halaman.",
    guru: "Bu Dewi",
    deadline: "23 Agu 2026, 23:59",
    status: "belum",
    fileTerkumpul: null,
  },
  {
    id: 3,
    mapelId: "binggris",
    judul: "Reading Comprehension Ch.5",
    deskripsi:
      "Jawab 8 pertanyaan pemahaman bacaan berdasarkan teks di modul unit 5.",
    guru: "Bu Rina",
    deadline: "18 Agu 2026, 23:59",
    status: "dikumpulkan",
    fileTerkumpul: "jawaban_reading_ch5.pdf",
  },
  {
    id: 4,
    mapelId: "binggris",
    judul: "Vocabulary Quiz Worksheet",
    deskripsi:
      "Isi worksheet kosakata unit 5, kumpulkan dalam bentuk foto atau scan.",
    guru: "Bu Rina",
    deadline: "10 Agu 2026, 23:59",
    status: "terlambat",
    fileTerkumpul: null,
  },
  {
    id: 5,
    mapelId: "ips",
    judul: "Peta Persebaran SDA Indonesia",
    deskripsi:
      "Gambar atau print peta Indonesia, tandai 5 sumber daya alam utama tiap pulau.",
    guru: "Pak Anwar",
    deadline: "22 Agu 2026, 23:59",
    status: "belum",
    fileTerkumpul: null,
  },
];

// ============================================================
// MAIN PAGE
// ============================================================
export default function TugasPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Memuat...</div>}>
      <TugasPageInner />
    </Suspense>
  );
}

function TugasPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mapelParam = searchParams.get("mapel");

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMapel, setActiveMapel] = useState(mapelParam || "semua");
  const [activeFilter, setActiveFilter] = useState("semua");
  const [expandedId, setExpandedId] = useState(null);

  const selectedMapel = mataPelajaranList.find((m) => m.id === activeMapel);

  const filteredTugas = useMemo(() => {
    return tugasList
      .filter((t) =>
        activeMapel === "semua" ? true : t.mapelId === activeMapel
      )
      .filter((t) =>
        activeFilter === "semua" ? true : t.status === activeFilter
      );
  }, [activeMapel, activeFilter]);

  const jumlahBelum = tugasList.filter(
    (t) => t.status === "belum" || t.status === "terlambat"
  ).length;

  const notifications = [
    { id: 1, title: "Tugas Matematika deadline besok", desc: "Dikirim 1 jam lalu", read: false },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        role="siswa"
        active="mataPelajaran"
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          user={{ name: "Andi Saputra", email: "siswa@smartschool.com", avatar: "AS" }}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-7xl mx-auto space-y-8">
            {/* ===== HEADER ===== */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/siswa/mataPelajaran")}
                className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors flex-shrink-0"
              >
                <ArrowLeft size={18} />
              </button>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  {selectedMapel ? selectedMapel.nama : "Semua Mata Pelajaran"}
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5 tracking-tight">
                  Tugas
                </h1>
                <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                  {jumlahBelum > 0
                    ? `${jumlahBelum} tugas menunggu untuk dikerjakan`
                    : "Semua tugas sudah dikumpulkan"}
                </p>
              </div>
            </div>

            {/* ===== FILTER MAPEL ===== */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
              <button
                onClick={() => setActiveMapel("semua")}
                className={`flex-shrink-0 text-xs font-medium px-4 py-2 rounded-full border transition-all ${
                  activeMapel === "semua"
                    ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                Semua Mapel
              </button>
              {mataPelajaranList.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveMapel(m.id)}
                  className={`flex-shrink-0 text-xs font-medium px-4 py-2 rounded-full border transition-all ${
                    activeMapel === m.id
                      ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {m.nama}
                </button>
              ))}
            </div>

            {/* ===== FILTER STATUS ===== */}
            <div className="flex flex-wrap gap-2">
              {["semua", "belum", "dikumpulkan", "terlambat"].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`text-xs font-medium px-4 py-1.5 rounded-lg transition-all ${
                    activeFilter === f
                      ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {f === "semua" ? "Semua Status" : STATUS_STYLE[f].label}
                </button>
              ))}
            </div>

            {/* ===== LIST TUGAS ===== */}
            <div className="space-y-4">
              {filteredTugas.length > 0 ? (
                filteredTugas.map((tugas) => {
                  const mapel = mataPelajaranList.find(
                    (m) => m.id === tugas.mapelId
                  );
                  const s = STATUS_STYLE[tugas.status];
                  const StatusIcon = s.icon;
                  const isOpen = expandedId === tugas.id;

                  return (
                    <div
                      key={tugas.id}
                      className="bg-white rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                    >
                      {/* Baris utama (selalu terlihat) */}
                      <button
                        onClick={() => setExpandedId(isOpen ? null : tugas.id)}
                        className="w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-slate-50/60 transition-colors"
                      >
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${s.bg} ${s.text}`}
                        >
                          <ClipboardList size={19} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${s.bg} ${s.text} ${s.border} inline-flex items-center gap-1`}
                            >
                              <StatusIcon size={10} />
                              {s.label}
                            </span>
                            {activeMapel === "semua" && mapel && (
                              <span className="text-[11px] font-medium text-slate-400">
                                {mapel.nama}
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-semibold text-slate-800 mt-1.5">
                            {tugas.judul}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-0.5">
                            <span className="flex items-center gap-1">
                              <User size={12} /> {tugas.guru}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} /> Deadline {tugas.deadline}
                            </span>
                          </div>
                        </div>

                        <div className="flex-shrink-0 mt-1 text-slate-400">
                          {isOpen ? (
                            <ChevronUp size={18} />
                          ) : (
                            <ChevronDown size={18} />
                          )}
                        </div>
                      </button>

                      {/* Ekspansi (detail + upload) */}
                      {isOpen && (
                        <div className="px-5 pb-5 pt-2 border-t border-slate-100">
                          <p className="text-sm text-slate-600 leading-relaxed mt-2">
                            {tugas.deskripsi}
                          </p>
                          <TugasSubmitArea tugas={tugas} />
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm text-center py-16 px-5">
                  <div className="w-14 h-14 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center mx-auto mb-4">
                    <ClipboardList size={24} />
                  </div>
                  <p className="text-sm font-medium text-slate-600">
                    Tidak ada tugas
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Tidak ada tugas yang cocok dengan filter ini.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ============================================================
// KOMPONEN SUBMIT TUGAS (di dalam ekspansi)
// ============================================================
function TugasSubmitArea({ tugas }) {
  const [file, setFile] = useState(null);
  const [catatan, setCatatan] = useState("");
  const [submitted, setSubmitted] = useState(tugas.status === "dikumpulkan");
  const [fileName, setFileName] = useState(tugas.fileTerkumpul || null);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files && e.target.files[0];
    if (selected) {
      setFile(selected);
      setFileName(selected.name);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = () => {
    // TODO: upload `file` + `catatan` ke server
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-4 bg-emerald-50 rounded-xl p-4 flex items-start gap-3 border border-emerald-200">
        <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-emerald-700">
            Tugas sudah dikumpulkan
          </p>
          {fileName && (
            <p className="text-xs text-emerald-600 mt-0.5 truncate">
              File: {fileName}
            </p>
          )}
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs font-medium text-emerald-700 underline mt-2 hover:no-underline"
          >
            Ganti jawaban
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      <div className="border-2 border-dashed border-blue-200 rounded-xl p-4 bg-blue-50/30 hover:bg-blue-50/50 transition-colors">
        {fileName ? (
          <div className="flex items-center justify-between gap-2 bg-white rounded-lg px-3 py-2.5 shadow-sm">
            <div className="flex items-center gap-2 min-w-0">
              <Paperclip size={15} className="text-blue-500 flex-shrink-0" />
              <span className="text-sm text-slate-700 truncate">{fileName}</span>
            </div>
            <button
              onClick={handleRemoveFile}
              className="text-slate-400 hover:text-slate-600 flex-shrink-0"
            >
              <X size={15} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => inputRef.current && inputRef.current.click()}
            className="w-full flex flex-col items-center gap-2 py-4 text-slate-400 hover:text-blue-600 transition-colors"
          >
            <UploadCloud size={24} />
            <span className="text-sm font-medium">Klik untuk unggah file jawaban</span>
            <span className="text-[11px] text-slate-300">
              PDF, gambar, atau dokumen, maks 10MB
            </span>
          </button>
        )}
        <input ref={inputRef} type="file" onChange={handleFileChange} className="hidden" />
      </div>

      <textarea
        value={catatan}
        onChange={(e) => setCatatan(e.target.value)}
        placeholder="Catatan tambahan (opsional)..."
        rows={2}
        className="w-full text-sm border border-slate-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
      />

      <button
        onClick={handleSubmit}
        disabled={!fileName}
        className="w-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl py-2.5 transition-colors shadow-sm"
      >
        Kumpulkan Tugas
      </button>
    </div>
  );
}