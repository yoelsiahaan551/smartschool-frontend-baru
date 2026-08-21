"use client";

import { Suspense, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  ArrowLeft,
  FileText,
  Video,
  Presentation,
  Image as ImageIcon,
  File,
  Download,
  Eye,
  Search,
  Calculator,
  FlaskConical,
  Globe2,
  Languages,
  BookOpen,
  Palette,
  Music,
  Dumbbell,
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

const colorMap = {
  blue: { bg: "bg-blue-50", text: "text-blue-600" },
  rose: { bg: "bg-rose-50", text: "text-rose-600" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600" },
  amber: { bg: "bg-amber-50", text: "text-amber-600" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-600" },
  fuchsia: { bg: "bg-fuchsia-50", text: "text-fuchsia-600" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-600" },
  orange: { bg: "bg-orange-50", text: "text-orange-600" },
};

const FILE_TYPE_STYLE = {
  pdf: { icon: FileText, bg: "bg-red-50", text: "text-red-600", label: "PDF" },
  video: { icon: Video, bg: "bg-purple-50", text: "text-purple-600", label: "Video" },
  ppt: { icon: Presentation, bg: "bg-orange-50", text: "text-orange-600", label: "Slide" },
  gambar: { icon: ImageIcon, bg: "bg-blue-50", text: "text-blue-600", label: "Gambar" },
  lainnya: { icon: File, bg: "bg-slate-50", text: "text-slate-500", label: "File" },
};

const materiList = [
  { id: 1, mapelId: "matematika", judul: "Bab 4 - Operasi Pecahan", guru: "Bu Sari", tipe: "pdf", ukuran: "1.2 MB", tanggal: "18 Agu 2026", fileUrl: "#" },
  { id: 2, mapelId: "matematika", judul: "Video Pembahasan Soal Pecahan", guru: "Bu Sari", tipe: "video", ukuran: "45 MB", tanggal: "15 Agu 2026", fileUrl: "#" },
  { id: 3, mapelId: "matematika", judul: "Rangkuman Bab 3 - Aljabar", guru: "Bu Sari", tipe: "pdf", ukuran: "890 KB", tanggal: "10 Agu 2026", fileUrl: "#" },
  { id: 4, mapelId: "binggris", judul: "Grammar Past Continuous Tense", guru: "Bu Rina", tipe: "ppt", ukuran: "3.4 MB", tanggal: "19 Agu 2026", fileUrl: "#" },
  { id: 5, mapelId: "binggris", judul: "Vocabulary List Unit 5", guru: "Bu Rina", tipe: "pdf", ukuran: "540 KB", tanggal: "12 Agu 2026", fileUrl: "#" },
  { id: 6, mapelId: "ipa", judul: "Diagram Proses Fotosintesis", guru: "Bu Dewi", tipe: "gambar", ukuran: "2.1 MB", tanggal: "17 Agu 2026", fileUrl: "#" },
  { id: 7, mapelId: "ipa", judul: "Modul Praktikum Fotosintesis", guru: "Bu Dewi", tipe: "pdf", ukuran: "1.8 MB", tanggal: "14 Agu 2026", fileUrl: "#" },
  { id: 8, mapelId: "ips", judul: "Peta Persebaran Sumber Daya Alam", guru: "Pak Anwar", tipe: "gambar", ukuran: "3.0 MB", tanggal: "16 Agu 2026", fileUrl: "#" },
  { id: 9, mapelId: "bindo", judul: "Materi Teks Eksposisi", guru: "Pak Budi", tipe: "pdf", ukuran: "760 KB", tanggal: "11 Agu 2026", fileUrl: "#" },
];

export default function MateriPage() {
  return (
    <Suspense fallback={null}>
      <MateriPageInner />
    </Suspense>
  );
}

function MateriPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mapelParam = searchParams.get("mapel");

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMapel, setActiveMapel] = useState(mapelParam || "semua");
  const [query, setQuery] = useState("");

  const selectedMapel = mataPelajaranList.find((m) => m.id === activeMapel);

  const filteredMateri = useMemo(() => {
    return materiList
      .filter((m) => (activeMapel === "semua" ? true : m.mapelId === activeMapel))
      .filter((m) => m.judul.toLowerCase().includes(query.toLowerCase()));
  }, [activeMapel, query]);

  const notifications = [
    { id: 1, title: "Materi baru dari Bu Rina", desc: "Grammar Past Continuous Tense", read: false },
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
                  Materi
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Bahan belajar yang sudah diupload guru, bisa dilihat atau diunduh kapan saja.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                <button
                  onClick={() => setActiveMapel("semua")}
                  className={activeMapel === "semua" ? "flex-shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-full border bg-slate-800 border-slate-800 text-white" : "flex-shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-full border bg-white border-slate-200 text-slate-500 hover:border-slate-300"}
                >
                  Semua
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

              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari materi..."
                  className="w-full text-sm bg-white border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
              {filteredMateri.length > 0 ? (
                <div className="divide-y divide-slate-50">
                  {filteredMateri.map((item) => {
                    const mapel = mataPelajaranList.find((m) => m.id === item.mapelId);
                    const ft = FILE_TYPE_STYLE[item.tipe];
                    const FtIcon = ft.icon;
                    return (
                      <div key={item.id} className="flex items-center gap-3.5 px-5 py-4 hover:bg-slate-50/60 transition-colors">
                        <div className={"w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 " + ft.bg + " " + ft.text}>
                          <FtIcon size={19} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                              {ft.label}
                            </span>
                            {activeMapel === "semua" && mapel ? (
                              <span className="text-[11px] font-medium text-slate-400">{mapel.nama}</span>
                            ) : null}
                          </div>
                          <p className="text-sm font-medium text-slate-800 mt-1 truncate">{item.judul}</p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {item.guru} - {item.tanggal} - {item.ukuran}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors" title="Lihat">
                            <Eye size={16} />
                          </a>
                          <a href={item.fileUrl} download className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors" title="Unduh">
                            <Download size={16} />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-14 px-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-300 flex items-center justify-center mx-auto mb-3">
                    <FileText size={22} />
                  </div>
                  <p className="text-sm font-medium text-slate-600">Belum ada materi</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {query ? "Coba kata kunci pencarian lain." : "Guru belum mengupload materi untuk mata pelajaran ini."}
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