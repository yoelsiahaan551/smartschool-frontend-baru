"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  BookOpen,
  Calculator,
  FlaskConical,
  Globe2,
  Languages,
  Palette,
  Music,
  Dumbbell,
  ChevronRight,
  FileText,
  ClipboardList,
  GraduationCap,
  ArrowLeft,
  Bell,
  UploadCloud,
  CalendarClock,
} from "lucide-react";

/**
 * Halaman Mata Pelajaran (/siswa/mataPelajaran)
 *
 * Alur sama seperti sebelumnya (grid -> detail per mapel), ditambah:
 * - "Info Terbaru" di tampilan grid: feed aktivitas semua mapel
 *   (tugas baru, materi baru, jadwal ujian) diurutkan dari yang
 *   paling baru.
 * - "Aktivitas Terbaru" di panel detail: feed yang sama tapi
 *   difilter khusus mapel yang lagi dibuka.
 *
 * Data `mataPelajaranList` dan `aktivitasTerbaru` masih dummy.
 * Ganti dengan data asli dari API (idealnya aktivitas diurutkan
 * server-side berdasarkan timestamp asli, bukan string manual).
 */

const mataPelajaranList = [
  { id: "matematika", nama: "Matematika", guru: "Bu Sari", icon: Calculator, color: "blue", materi: 8, tugas: 2, ujian: 1 },
  { id: "bindo", nama: "Bahasa Indonesia", guru: "Pak Budi", icon: Languages, color: "rose", materi: 6, tugas: 0, ujian: 1 },
  { id: "ipa", nama: "IPA", guru: "Bu Dewi", icon: FlaskConical, color: "emerald", materi: 10, tugas: 1, ujian: 0 },
  { id: "ips", nama: "IPS", guru: "Pak Anwar", icon: Globe2, color: "amber", materi: 7, tugas: 1, ujian: 0 },
  { id: "binggris", nama: "Bahasa Inggris", guru: "Bu Rina", icon: BookOpen, color: "indigo", materi: 9, tugas: 2, ujian: 1 },
  { id: "seni", nama: "Seni Budaya", guru: "Bu Wulan", icon: Palette, color: "fuchsia", materi: 4, tugas: 0, ujian: 0 },
  { id: "musik", nama: "Seni Musik", guru: "Pak Doni", icon: Music, color: "cyan", materi: 5, tugas: 0, ujian: 0 },
  { id: "penjas", nama: "Penjaskes", guru: "Pak Rudi", icon: Dumbbell, color: "orange", materi: 3, tugas: 0, ujian: 0 },
];

const colorMap = {
  blue: { grad: "from-blue-500 to-blue-600", bg: "bg-blue-50", text: "text-blue-600", ring: "group-hover:ring-blue-100", border: "hover:border-blue-200" },
  rose: { grad: "from-rose-500 to-rose-600", bg: "bg-rose-50", text: "text-rose-600", ring: "group-hover:ring-rose-100", border: "hover:border-rose-200" },
  emerald: { grad: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50", text: "text-emerald-600", ring: "group-hover:ring-emerald-100", border: "hover:border-emerald-200" },
  amber: { grad: "from-amber-500 to-amber-600", bg: "bg-amber-50", text: "text-amber-600", ring: "group-hover:ring-amber-100", border: "hover:border-amber-200" },
  indigo: { grad: "from-indigo-500 to-indigo-600", bg: "bg-indigo-50", text: "text-indigo-600", ring: "group-hover:ring-indigo-100", border: "hover:border-indigo-200" },
  fuchsia: { grad: "from-fuchsia-500 to-fuchsia-600", bg: "bg-fuchsia-50", text: "text-fuchsia-600", ring: "group-hover:ring-fuchsia-100", border: "hover:border-fuchsia-200" },
  cyan: { grad: "from-cyan-500 to-cyan-600", bg: "bg-cyan-50", text: "text-cyan-600", ring: "group-hover:ring-cyan-100", border: "hover:border-cyan-200" },
  orange: { grad: "from-orange-500 to-orange-600", bg: "bg-orange-50", text: "text-orange-600", ring: "group-hover:ring-orange-100", border: "hover:border-orange-200" },
};

// type: "tugas" | "materi" | "ujian" -> menentukan ikon & warna badge feed
const TYPE_STYLE = {
  tugas: { icon: ClipboardList, label: "Tugas Baru", bg: "bg-amber-50", text: "text-amber-600" },
  materi: { icon: UploadCloud, label: "Materi Baru", bg: "bg-blue-50", text: "text-blue-600" },
  ujian: { icon: CalendarClock, label: "Jadwal Ujian", bg: "bg-violet-50", text: "text-violet-600" },
};

// Dummy feed aktivitas, urutan paling baru di atas.
// `mapelId` dipakai buat filter aktivitas per mapel di panel detail.
const aktivitasTerbaru = [
  { id: 1, mapelId: "matematika", type: "tugas", judul: "Latihan Bab 4 - Pecahan", guru: "Bu Sari", waktu: "12 menit lalu" },
  { id: 2, mapelId: "binggris", type: "materi", judul: "Grammar: Past Continuous Tense", guru: "Bu Rina", waktu: "1 jam lalu" },
  { id: 3, mapelId: "ipa", type: "tugas", judul: "Laporan Praktikum Fotosintesis", guru: "Bu Dewi", waktu: "3 jam lalu" },
  { id: 4, mapelId: "bindo", type: "ujian", judul: "Ujian Tengah Semester - 28 Agustus", guru: "Pak Budi", waktu: "Kemarin" },
  { id: 5, mapelId: "matematika", type: "ujian", judul: "Ulangan Harian Bab 4 - 25 Agustus", guru: "Bu Sari", waktu: "Kemarin" },
  { id: 6, mapelId: "ips", type: "materi", judul: "Peta Persebaran Sumber Daya Alam", guru: "Pak Anwar", waktu: "2 hari lalu" },
  { id: 7, mapelId: "binggris", type: "tugas", judul: "Reading Comprehension Ch.5", guru: "Bu Rina", waktu: "3 hari lalu" },
];

export default function MataPelajaranPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  const selected = mataPelajaranList.find((m) => m.id === selectedId);

  const goTo = (section) => {
    router.push(`/siswa/mataPelajaran/${section}?mapel=${selectedId}`);
  };

  const feedUntukMapel = (mapelId) =>
    aktivitasTerbaru.filter((a) => a.mapelId === mapelId);

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
          <div className="w-full max-w-7xl mx-auto space-y-6">

            {/* PAGE HEADER */}
            <div className="flex items-center gap-3">
              {selected && (
                <button
                  onClick={() => setSelectedId(null)}
                  className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors flex-shrink-0"
                >
                  <ArrowLeft size={16} />
                </button>
              )}
              <div className="min-w-0">
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Kelas 9A</p>
                <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 mt-1 tracking-tight truncate">
                  {selected ? selected.nama : "Mata Pelajaran"}
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  {selected
                    ? `Diampu oleh ${selected.guru}`
                    : "Pilih salah satu mata pelajaran untuk lihat materi, tugas, dan ujian."}
                </p>
              </div>
            </div>

            {!selected ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ==== GRID DAFTAR MAPEL ==== */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/70 shadow-sm p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mataPelajaranList.map((mapel) => {
                      const Icon = mapel.icon;
                      const c = colorMap[mapel.color];
                      const totalAktivitas = mapel.tugas + mapel.ujian;
                      return (
                        <button
                          key={mapel.id}
                          onClick={() => setSelectedId(mapel.id)}
                          className={`group text-left bg-white rounded-2xl border border-slate-200 ${c.border} p-4 shadow-sm hover:shadow-md transition-all duration-300 min-w-0`}
                        >
                          <div className="flex items-start justify-between">
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.grad} text-white flex items-center justify-center flex-shrink-0 shadow-sm ring-4 ring-transparent ${c.ring} transition-all duration-300`}>
                              <Icon size={19} />
                            </div>
                            {totalAktivitas > 0 && (
                              <span className="text-[10px] font-semibold text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                                {totalAktivitas}
                              </span>
                            )}
                          </div>
                          <h3 className="mt-3 text-sm font-semibold text-slate-800 truncate">{mapel.nama}</h3>
                          <p className="mt-0.5 text-xs text-slate-500 truncate">{mapel.guru}</p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-[11px] text-slate-400">{mapel.materi} materi</span>
                            <ChevronRight
                              size={14}
                              className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all duration-300"
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ==== INFO TERBARU (feed semua mapel) ==== */}
                <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden flex flex-col">
                  <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
                      <Bell size={16} />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-800">Info Terbaru</h3>
                  </div>
                  <div className="divide-y divide-slate-50 overflow-y-auto max-h-[420px]">
                    {aktivitasTerbaru.map((item) => (
                      <FeedItem
                        key={item.id}
                        item={item}
                        mapel={mataPelajaranList.find((m) => m.id === item.mapelId)}
                        onClick={() => setSelectedId(item.mapelId)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* ==== PANEL DETAIL MAPEL TERPILIH ==== */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <SectionCard
                    icon={FileText}
                    label="Materi"
                    desc="Bahan bacaan & rangkuman"
                    count={selected.materi}
                    countLabel="materi"
                    color={selected.color}
                    onClick={() => goTo("materi")}
                  />
                  <SectionCard
                    icon={ClipboardList}
                    label="Tugas"
                    desc="Tugas yang perlu dikumpulkan"
                    count={selected.tugas}
                    countLabel="belum selesai"
                    color={selected.color}
                    highlight={selected.tugas > 0}
                    onClick={() => goTo("tugas")}
                  />
                  <SectionCard
                    icon={GraduationCap}
                    label="Ujian"
                    desc="Jadwal & hasil ujian"
                    count={selected.ujian}
                    countLabel="mendatang"
                    color={selected.color}
                    highlight={selected.ujian > 0}
                    onClick={() => goTo("ujian")}
                  />
                </div>

                {/* ==== AKTIVITAS TERBARU (khusus mapel ini) ==== */}
                <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
                      <Bell size={16} />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-800">Aktivitas Terbaru</h3>
                  </div>
                  {feedUntukMapel(selected.id).length > 0 ? (
                    <div className="divide-y divide-slate-50">
                      {feedUntukMapel(selected.id).map((item) => (
                        <FeedItem key={item.id} item={item} mapel={selected} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400 px-5 py-6 text-center">
                      Belum ada aktivitas terbaru untuk mapel ini.
                    </p>
                  )}
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

function SectionCard({ icon: Icon, label, desc, count, countLabel, color, highlight, onClick }) {
  const c = colorMap[color];
  return (
    <button
      onClick={onClick}
      className={`group text-left bg-white rounded-2xl border border-slate-200 ${c.border} p-5 shadow-sm hover:shadow-md transition-all duration-300`}
    >
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl ${c.bg} ${c.text} flex items-center justify-center flex-shrink-0`}>
          <Icon size={20} />
        </div>
        <ChevronRight
          size={16}
          className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all duration-300"
        />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-slate-800">{label}</h3>
      <p className="mt-0.5 text-xs text-slate-500">{desc}</p>
      <div className="mt-4 flex items-baseline gap-1.5">
        <span className={`text-2xl font-bold ${highlight ? c.text : "text-slate-800"}`}>{count}</span>
        <span className="text-xs text-slate-400">{countLabel}</span>
      </div>
    </button>
  );
}

// Satu baris di feed "Info Terbaru" / "Aktivitas Terbaru".
// Kalau `mapel` di-pass & ada `onClick`, tampilkan juga nama mapelnya
// (dipakai di feed gabungan semua mapel).
function FeedItem({ item, mapel, onClick }) {
  const t = TYPE_STYLE[item.type];
  const TypeIcon = t.icon;
  const Wrapper = onClick ? "button" : "div";

  return (
    <Wrapper
      onClick={onClick}
      className={`w-full flex items-start gap-3 px-5 py-3.5 text-left ${
        onClick ? "hover:bg-slate-50 transition-colors" : ""
      }`}
    >
      <div className={`w-8 h-8 rounded-lg ${t.bg} ${t.text} flex items-center justify-center flex-shrink-0 mt-0.5`}>
        <TypeIcon size={15} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`text-[10px] font-semibold ${t.text} ${t.bg} px-1.5 py-0.5 rounded`}>
            {t.label}
          </span>
          {mapel && (
            <span className="text-[11px] font-medium text-slate-400">{mapel.nama}</span>
          )}
        </div>
        <p className="text-sm text-slate-700 mt-1 truncate">{item.judul}</p>
        <p className="text-xs text-slate-400 mt-0.5">{item.guru} &middot; {item.waktu}</p>
      </div>
    </Wrapper>
  );
}