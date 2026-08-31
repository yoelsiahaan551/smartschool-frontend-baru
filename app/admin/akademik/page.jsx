"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  ClipboardList,
  NotebookPen,
  Award,
  FileSpreadsheet,
  Smile,
  GraduationCap,
  Search,
} from "lucide-react";

// =========================================================
// SUMBER DATA SISWA (key sama dengan halaman Data Siswa)
// =========================================================
const STORAGE_KEY = "siswa_data";

const FALLBACK_SISWA = [
  { id: 1, nama: "Ahmad Fauzan", kelas: "X RPL 1" },
  { id: 2, nama: "Bella Safira", kelas: "X RPL 1" },
  { id: 4, nama: "Dinda Maharani", kelas: "X RPL 2" },
  { id: 7, nama: "Galang Ramadhan", kelas: "X TKJ 1" },
  { id: 10, nama: "Jihan Anastasya", kelas: "X TKJ 2" },
  { id: 13, nama: "Muhammad Rizky", kelas: "X AK 1" },
  { id: 16, nama: "Putri Maharani", kelas: "XI RPL 1" },
  { id: 19, nama: "Tegar Pratama", kelas: "XI RPL 2" },
  { id: 22, nama: "Wulan Sari", kelas: "XI TKJ 1" },
  { id: 25, nama: "Ardiansyah Putra", kelas: "XII RPL 1" },
];

const loadSiswaList = () => {
  if (typeof window === "undefined") return FALLBACK_SISWA;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const data = stored ? JSON.parse(stored) : null;
    return Array.isArray(data) && data.length > 0 ? data : FALLBACK_SISWA;
  } catch {
    return FALLBACK_SISWA;
  }
};

// =========================================================
// GENERATOR RINGKASAN AKADEMIK (deterministik per siswa —
// tinggal diganti sumber aslinya begitu modul nilai / prestasi
// / sikap / rapor sudah punya storage sendiri)
// =========================================================
const seedFromId = (id) => {
  const str = String(id);
  let h = 0;
  for (const ch of str) h = (h * 31 + ch.charCodeAt(0)) % 1000000;
  return h + 1;
};

const pseudoRandom = (seed, min, max) => {
  const x = Math.sin(seed) * 10000;
  const frac = x - Math.floor(x);
  return Math.floor(frac * (max - min + 1)) + min;
};

const PRESTASI_POOL = [
  "Juara 1 Lomba Debat Bahasa Inggris",
  "Juara 2 LKS Tingkat Provinsi",
  "Medali Emas OSN Matematika",
  "Juara Harapan Lomba Fotografi",
  "Best Presenter Seminar Nasional",
];

const buildRingkasan = (siswaList) => {
  return siswaList.map((s) => {
    const seed = seedFromId(s.id);
    const nilai = pseudoRandom(seed, 68, 98);
    const prestasi = pseudoRandom(seed + 1, 0, 100) < 25 ? 1 + pseudoRandom(seed + 5, 0, 1) : 0;
    const sikapRoll = pseudoRandom(seed + 2, 0, 99);
    const sikap =
      sikapRoll < 6
        ? "Perlu Perhatian"
        : sikapRoll < 22
        ? "Cukup"
        : sikapRoll < 65
        ? "Baik"
        : "Sangat Baik";
    const raporSelesai = pseudoRandom(seed + 3, 0, 99) < 78;
    const prestasiLabel =
      prestasi > 0 ? PRESTASI_POOL[seedFromId(s.id + "p") % PRESTASI_POOL.length] : null;

    return { ...s, nilai, prestasi, sikap, raporSelesai, prestasiLabel };
  });
};

const getInitials = (nama = "") => {
  const parts = nama.trim().split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return nama.substring(0, 2).toUpperCase();
};

const getAvatarColor = (nama = "") => {
  const colors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-cyan-500",
    "bg-teal-500",
  ];
  return colors[nama.length % colors.length];
};

const SIKAP_STYLE = {
  "Sangat Baik": "border-emerald-200 bg-emerald-50 text-emerald-600",
  Baik: "border-blue-200 bg-blue-50 text-blue-600",
  Cukup: "border-amber-200 bg-amber-50 text-amber-600",
  "Perlu Perhatian": "border-rose-200 bg-rose-50 text-rose-600",
};

export default function AkademikPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [ringkasan, setRingkasan] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setRingkasan(buildRingkasan(loadSiswaList()));
  }, []);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // ---------------------------------------------------------
  // AGREGAT UNTUK INFO BAR
  // ---------------------------------------------------------
  const totalSiswa = ringkasan.length;
  const rataRata = totalSiswa
    ? Math.round(ringkasan.reduce((a, b) => a + b.nilai, 0) / totalSiswa)
    : 0;
  const totalPrestasi = ringkasan.reduce((a, b) => a + b.prestasi, 0);
  const perluPerhatian = ringkasan.filter((s) => s.sikap === "Perlu Perhatian").length;
  const raporPercent = totalSiswa
    ? Math.round((ringkasan.filter((s) => s.raporSelesai).length / totalSiswa) * 100)
    : 0;

  // ---------------------------------------------------------
  // RINGKASAN PER KELAS
  // ---------------------------------------------------------
  const perKelasMap = {};
  ringkasan.forEach((s) => {
    if (!perKelasMap[s.kelas]) perKelasMap[s.kelas] = [];
    perKelasMap[s.kelas].push(s);
  });
  const ringkasanKelas = Object.entries(perKelasMap)
    .map(([kelas, arr]) => ({
      kelas,
      jumlah: arr.length,
      rataRata: Math.round(arr.reduce((a, b) => a + b.nilai, 0) / arr.length),
      prestasi: arr.reduce((a, b) => a + b.prestasi, 0),
      perluPerhatian: arr.filter((s) => s.sikap === "Perlu Perhatian").length,
      raporPercent: Math.round(
        (arr.filter((s) => s.raporSelesai).length / arr.length) * 100
      ),
    }))
    .sort((a, b) => a.kelas.localeCompare(b.kelas));

  // ---------------------------------------------------------
  // FILTER SEARCH (tabel siswa)
  // ---------------------------------------------------------
  const filtered = ringkasan.filter((s) => {
    const keyword = search.toLowerCase().trim();
    if (!keyword) return true;
    return (
      s.nama.toLowerCase().includes(keyword) || s.kelas.toLowerCase().includes(keyword)
    );
  });

  const quickLinks = [
    { label: "Monitoring Siswa", icon: ClipboardList, path: "/admin/akademik/monitoringSiswa" },
    { label: "Nilai", icon: NotebookPen, path: "/admin/akademik/nilai" },
    { label: "Prestasi", icon: Award, path: "/admin/akademik/prestasi" },
    { label: "Rapor", icon: FileSpreadsheet, path: "/admin/akademik/rapor" },
    { label: "Sikap & Perilaku", icon: Smile, path: "/admin/akademik/sikapPerilaku" },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        active="akademik"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
        role="admin"
      />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 space-y-5">
            {/* HEADER */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
                <GraduationCap size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Akademik</h1>
                <p className="text-sm text-slate-500">
                  Ringkasan nilai, prestasi, sikap, dan rapor seluruh siswa.
                </p>
              </div>
            </div>

            {/* INFO BAR — ringkasan angka, bukan card */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-slate-200/80 bg-white px-5 py-3.5 text-sm shadow-sm">
              <span className="text-slate-500">
                Total Siswa <b className="text-slate-800">{totalSiswa}</b>
              </span>
              <span className="h-4 w-px bg-slate-200" />
              <span className="text-slate-500">
                Rata-rata Nilai <b className="text-slate-800">{rataRata}</b>
              </span>
              <span className="h-4 w-px bg-slate-200" />
              <span className="text-slate-500">
                Total Prestasi <b className="text-slate-800">{totalPrestasi}</b>
              </span>
              <span className="h-4 w-px bg-slate-200" />
              <span className="text-slate-500">
                Perlu Perhatian <b className="text-rose-600">{perluPerhatian}</b>
              </span>
              <span className="h-4 w-px bg-slate-200" />
              <span className="text-slate-500">
                Rapor Selesai <b className="text-slate-800">{raporPercent}%</b>
              </span>
            </div>

            {/* QUICK LINKS — pill, bukan card besar */}
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:border-blue-300 hover:text-blue-600"
                  >
                    <Icon size={13} />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* ================= TABEL RINGKASAN PER KELAS ================= */}
            <div className="w-full overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-semibold text-slate-700">Ringkasan per Kelas</p>
              </div>
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80">
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Kelas</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Jumlah Siswa</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Rata-rata Nilai</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Prestasi</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Perlu Perhatian</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Rapor Selesai</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {ringkasanKelas.map((k) => (
                      <tr key={k.kelas} className="hover:bg-slate-50/70">
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">{k.kelas}</td>
                        <td className="px-4 py-3 text-sm text-slate-500">{k.jumlah}</td>
                        <td className="px-4 py-3 text-sm text-slate-500">{k.rataRata}</td>
                        <td className="px-4 py-3 text-sm text-slate-500">{k.prestasi}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={k.perluPerhatian > 0 ? "font-medium text-rose-600" : "text-slate-400"}>
                            {k.perluPerhatian}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-500">{k.raporPercent}%</td>
                      </tr>
                    ))}
                    {ringkasanKelas.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-6 text-center text-sm text-slate-400">
                          Belum ada data.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ================= TABEL DATA AKADEMIK SISWA ================= */}
            <div className="w-full overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold text-slate-700">Data Akademik Siswa</p>
                <div className="relative w-full sm:w-64">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari nama atau kelas..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[720px] table-auto">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80">
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Profil</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Kelas</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Nilai</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Prestasi</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Sikap</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Rapor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50/70">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${getAvatarColor(s.nama)} text-xs font-bold text-white`}>
                              {getInitials(s.nama)}
                            </div>
                            <span className="text-sm font-medium text-slate-700">{s.nama}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex rounded-lg bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600">
                            {s.kelas}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">{s.nilai}</td>
                        <td className="px-4 py-3 text-sm text-slate-500">{s.prestasi}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${SIKAP_STYLE[s.sikap]}`}>
                            {s.sikap}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${
                              s.raporSelesai
                                ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                                : "border-slate-200 bg-slate-50 text-slate-500"
                            }`}
                          >
                            {s.raporSelesai ? "Selesai" : "Proses"}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-6 text-center text-sm text-slate-400">
                          Tidak ada data yang cocok.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {filtered.length > 0 && (
                <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-400">
                  Menampilkan <span className="font-semibold text-slate-600">{filtered.length}</span> dari{" "}
                  <span className="font-semibold text-slate-600">{totalSiswa}</span> siswa
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}