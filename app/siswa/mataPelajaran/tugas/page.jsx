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
} from "lucide-react";

const mataPelajaranList = [
  { id: "matematika", nama: "Matematika", guru: "Bu Sari", icon: Calculator, color: "blue" },
  { id: "bindo", nama: "Bahasa Indonesia", guru: "Pak Budi", icon: Languages, color: "rose" },
  { id: "ipa", nama: "IPA", guru: "Bu Dewi", icon: FlaskConical, color: "emerald" },
  { id: "ips", nama: "IPS", guru: "Pak Anwar", icon: Globe2, color: "amber" },
  { id: "binggris", nama: "Bahasa Inggris", guru: "Bu Rina", icon: BookOpen, color: "indigo" },
  { id: "seni", nama: "Seni Budaya", guru: "Bu Wulan", icon: Palette, color: "fuchsia" },
  { id: "musik", nama: "Seni Musik", guru: "Pak Doni", icon: Music, color: "cyan" },
  { id: "penjas", nama: "Penjaskes", guru: "Pak Rudi", icon: Dumbbell, color: "orange" },
];

// status: "belum" | "dikumpulkan" | "terlambat"
const STATUS_STYLE = {
  belum: { label: "Belum Dikerjakan", bg: "bg-amber-50", text: "text-amber-600", icon: Clock },
  dikumpulkan: { label: "Sudah Dikumpulkan", bg: "bg-emerald-50", text: "text-emerald-600", icon: CheckCircle2 },
  terlambat: { label: "Terlambat", bg: "bg-red-50", text: "text-red-600", icon: AlertCircle },
};

const tugasList = [
  {
    id: 1,
    mapelId: "matematika",
    judul: "Latihan Bab 4 - Operasi Pecahan",
    deskripsi: "Kerjakan soal nomor 1-10 di buku paket halaman 88. Tulis tangan lalu foto, atau ketik di dokumen.",
    guru: "Bu Sari",
    deadline: "21 Agu 2026, 23:59",
    status: "belum",
    fileTerkumpul: null,
  },
  {
    id: 2,
    mapelId: "ipa",
    judul: "Laporan Praktikum Fotosintesis",
    deskripsi: "Susun laporan hasil praktikum minggu lalu dalam format PDF, maksimal 3 halaman.",
    guru: "Bu Dewi",
    deadline: "23 Agu 2026, 23:59",
    status: "belum",
    fileTerkumpul: null,
  },
  {
    id: 3,
    mapelId: "binggris",
    judul: "Reading Comprehension Ch.5",
    deskripsi: "Jawab 8 pertanyaan pemahaman bacaan berdasarkan teks di modul unit 5.",
    guru: "Bu Rina",
    deadline: "18 Agu 2026, 23:59",
    status: "dikumpulkan",
    fileTerkumpul: "jawaban_reading_ch5.pdf",
  },
  {
    id: 4,
    mapelId: "binggris",
    judul: "Vocabulary Quiz Worksheet",
    deskripsi: "Isi worksheet kosakata unit 5, kumpulkan dalam bentuk foto atau scan.",
    guru: "Bu Rina",
    deadline: "10 Agu 2026, 23:59",
    status: "terlambat",
    fileTerkumpul: null,
  },
  {
    id: 5,
    mapelId: "ips",
    judul: "Peta Persebaran SDA Indonesia",
    deskripsi: "Gambar atau print peta Indonesia, tandai 5 sumber daya alam utama tiap pulau.",
    guru: "Pak Anwar",
    deadline: "22 Agu 2026, 23:59",
    status: "belum",
    fileTerkumpul: null,
  },
];

export default function TugasPage() {
  return (
    <Suspense fallback={null}>
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
      .filter((t) => (activeMapel === "semua" ? true : t.mapelId === activeMapel))
      .filter((t) => (activeFilter === "semua" ? true : t.status === activeFilter));
  }, [activeMapel, activeFilter]);

  const jumlahBelum = tugasList.filter((t) => t.status === "belum" || t.status === "terlambat").length;

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
          <div className="w-full max-w-5xl mx-auto space-y-6">

            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/siswa/mataPelajaran")}
                className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors flex-shrink-0"
              >
                <ArrowLeft size={16} />
              </button>
              <div className="min-w-0">
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                  {selectedMapel ? selectedMapel.nama : "Semua Mata Pelajaran"}
                </p>
                <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 mt-1 tracking-tight">
                  Tugas
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  {jumlahBelum > 0 ? jumlahBelum + " tugas menunggu untuk dikerjakan." : "Semua tugas sudah dikumpulkan."}
                </p>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              <button
                onClick={() => setActiveMapel("semua")}
                className={activeMapel === "semua" ? "flex-shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-full border bg-slate-800 border-slate-800 text-white" : "flex-shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-full border bg-white border-slate-200 text-slate-500 hover:border-slate-300"}
              >
                Semua Mapel
              </button>
              {mataPelajaranList.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveMapel(m.id)}
                  className={activeMapel === m.id ? "flex-shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-full border bg-slate-800 border-slate-800 text-white" : "flex-shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-full border bg-white border-slate-200 text-slate-500 hover:border-slate-300"}
                >
                  {m.nama}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              {["semua", "belum", "dikumpulkan", "terlambat"].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={activeFilter === f ? "text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600" : "text-xs font-medium px-3 py-1.5 rounded-lg text-slate-500 hover:bg-slate-100"}
                >
                  {f === "semua" ? "Semua Status" : STATUS_STYLE[f].label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredTugas.length > 0 ? (
                filteredTugas.map((tugas) => {
                  const mapel = mataPelajaranList.find((m) => m.id === tugas.mapelId);
                  const s = STATUS_STYLE[tugas.status];
                  const StatusIcon = s.icon;
                  const isOpen = expandedId === tugas.id;
                  return (
                    <div key={tugas.id} className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
                      <button
                        onClick={() => setExpandedId(isOpen ? null : tugas.id)}
                        className="w-full flex items-start gap-3.5 px-5 py-4 text-left hover:bg-slate-50/60 transition-colors"
                      >
                        <div className={"w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 " + s.bg + " " + s.text}>
                          <ClipboardList size={19} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={"text-[10px] font-semibold px-1.5 py-0.5 rounded inline-flex items-center gap-1 " + s.bg + " " + s.text}>
                              <StatusIcon size={10} />
                              {s.label}
                            </span>
                            {activeMapel === "semua" && mapel ? (
                              <span className="text-[11px] font-medium text-slate-400">{mapel.nama}</span>
                            ) : null}
                          </div>
                          <p className="text-sm font-medium text-slate-800 mt-1.5">{tugas.judul}</p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {tugas.guru} - Deadline {tugas.deadline}
                          </p>
                        </div>
                        <div className="flex-shrink-0 mt-1 text-slate-400">
                          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </button>

                      {isOpen ? (
                        <div className="px-5 pb-5 pt-1 border-t border-slate-100">
                          <p className="text-sm text-slate-600 leading-relaxed mt-3">{tugas.deskripsi}</p>
                          <TugasSubmitArea tugas={tugas} />
                        </div>
                      ) : null}
                    </div>
                  );
                })
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm text-center py-14 px-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-300 flex items-center justify-center mx-auto mb-3">
                    <ClipboardList size={22} />
                  </div>
                  <p className="text-sm font-medium text-slate-600">Tidak ada tugas</p>
                  <p className="text-xs text-slate-400 mt-1">Tidak ada tugas yang cocok dengan filter ini.</p>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

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
    // TODO: upload `file` + `catatan` ke server (endpoint pengumpulan tugas).
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-4 bg-emerald-50 rounded-xl p-4 flex items-start gap-3">
        <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-emerald-700">Tugas sudah dikumpulkan</p>
          {fileName ? (
            <p className="text-xs text-emerald-600 mt-0.5 truncate">File: {fileName}</p>
          ) : null}
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs font-medium text-emerald-700 underline mt-2"
          >
            Ganti jawaban
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      <div className="border border-dashed border-slate-300 rounded-xl p-4">
        {fileName ? (
          <div className="flex items-center justify-between gap-2 bg-slate-50 rounded-lg px-3 py-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <Paperclip size={15} className="text-slate-400 flex-shrink-0" />
              <span className="text-sm text-slate-700 truncate">{fileName}</span>
            </div>
            <button onClick={handleRemoveFile} className="text-slate-400 hover:text-slate-600 flex-shrink-0">
              <X size={15} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => inputRef.current && inputRef.current.click()}
            className="w-full flex flex-col items-center gap-2 py-4 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <UploadCloud size={22} />
            <span className="text-xs">Klik untuk unggah file jawaban</span>
            <span className="text-[11px] text-slate-300">PDF, gambar, atau dokumen, maks 10MB</span>
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
        className="w-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl py-2.5 transition-colors"
      >
        Kumpulkan Tugas
      </button>
    </div>
  );
}