"use client";

import { useState, useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  School,
  Search,
  ChevronDown,
  Sparkles,
  Plus,
  MapPin,
  Phone,
  Mail,
  User,
  Users,
  GraduationCap,
  BadgeCheck,
  Pencil,
  Trash2,
} from "lucide-react";

// ===== DUMMY DATA =====
// Catatan: ganti dengan data asli dari API/DB begitu tersedia.
const JENJANG_OPTIONS = ["Semua Jenjang", "SD", "SMP", "SMA"];
const STATUS_OPTIONS = ["Semua Status", "Aktif", "Nonaktif"];

const dataSekolah = [
  {
    id: 1,
    nama: "SD Smart School 1",
    npsn: "20104521",
    jenjang: "SD",
    akreditasi: "A",
    alamat: "Jl. Melati No. 12, Jakarta Selatan",
    kepalaSekolah: "Dra. Ratna Widiastuti, M.Pd",
    telepon: "(021) 7654321",
    email: "sd1@smartschool.com",
    tahunBerdiri: "1998",
    totalSiswa: 612,
    totalGuru: 34,
    totalKelas: 18,
    status: "Aktif",
  },
  {
    id: 2,
    nama: "SD Smart School 2",
    npsn: "20104522",
    jenjang: "SD",
    akreditasi: "A",
    alamat: "Jl. Anggrek No. 8, Jakarta Timur",
    kepalaSekolah: "Drs. Bambang Hartono",
    telepon: "(021) 7654322",
    email: "sd2@smartschool.com",
    tahunBerdiri: "2003",
    totalSiswa: 548,
    totalGuru: 30,
    totalKelas: 18,
    status: "Aktif",
  },
  {
    id: 3,
    nama: "SMP Smart School 1",
    npsn: "20104523",
    jenjang: "SMP",
    akreditasi: "A",
    alamat: "Jl. Kenanga No. 21, Jakarta Selatan",
    kepalaSekolah: "H. Ahmad Fauzi, S.Pd., M.M.",
    telepon: "(021) 7654323",
    email: "smp1@smartschool.com",
    tahunBerdiri: "2000",
    totalSiswa: 734,
    totalGuru: 42,
    totalKelas: 9,
    status: "Aktif",
  },
  {
    id: 4,
    nama: "SMP Smart School 2",
    npsn: "20104524",
    jenjang: "SMP",
    akreditasi: "B",
    alamat: "Jl. Mawar No. 5, Jakarta Barat",
    kepalaSekolah: "Dra. Sri Wahyuni",
    telepon: "(021) 7654324",
    email: "smp2@smartschool.com",
    tahunBerdiri: "2006",
    totalSiswa: 689,
    totalGuru: 39,
    totalKelas: 9,
    status: "Aktif",
  },
  {
    id: 5,
    nama: "SMA Smart School 1",
    npsn: "20104525",
    jenjang: "SMA",
    akreditasi: "A",
    alamat: "Jl. Dahlia No. 3, Jakarta Selatan",
    kepalaSekolah: "Prof. Dr. Wijaya Kusuma, M.Pd.",
    telepon: "(021) 7654325",
    email: "sma1@smartschool.com",
    tahunBerdiri: "1995",
    totalSiswa: 812,
    totalGuru: 48,
    totalKelas: 9,
    status: "Aktif",
  },
  {
    id: 6,
    nama: "SMA Smart School 2",
    npsn: "20104526",
    jenjang: "SMA",
    akreditasi: "A",
    alamat: "Jl. Cempaka No. 17, Jakarta Utara",
    kepalaSekolah: "Dr. Indah Permatasari, M.Pd.",
    telepon: "(021) 7654326",
    email: "sma2@smartschool.com",
    tahunBerdiri: "2009",
    totalSiswa: 917,
    totalGuru: 53,
    totalKelas: 9,
    status: "Nonaktif",
  },
];

// ===== MAIN COMPONENT =====

export default function DataMasterSekolahPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [jenjang, setJenjang] = useState(JENJANG_OPTIONS[0]);
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [search, setSearch] = useState("");

  const filteredSekolah = useMemo(() => {
    return dataSekolah.filter((s) => {
      const matchJenjang = jenjang === "Semua Jenjang" || s.jenjang === jenjang;
      const matchStatus = status === "Semua Status" || s.status === status;
      const matchSearch =
        !search.trim() ||
        s.nama.toLowerCase().includes(search.toLowerCase()) ||
        s.npsn.includes(search) ||
        s.kepalaSekolah.toLowerCase().includes(search.toLowerCase());
      return matchJenjang && matchStatus && matchSearch;
    });
  }, [jenjang, status, search]);

  const summary = useMemo(() => {
    const totalUnit = filteredSekolah.length;
    const totalSiswa = filteredSekolah.reduce((a, s) => a + s.totalSiswa, 0);
    const totalGuru = filteredSekolah.reduce((a, s) => a + s.totalGuru, 0);
    const totalAktif = filteredSekolah.filter((s) => s.status === "Aktif").length;
    return { totalUnit, totalSiswa, totalGuru, totalAktif };
  }, [filteredSekolah]);

  const notifications = [
    { id: 1, title: "Pengumuman Libur Semester", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Deadline Input Nilai", desc: "Dikirim 5 jam lalu", read: false },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="sekolah"
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          user={{ name: "Admin Yayasan", email: "admin@smartschool.com", avatar: "Y" }}
        />
        <main className="flex-1 overflow-y-auto min-h-screen p-4 sm:p-6 lg:p-8">
          <div className="w-full space-y-6">

            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400 mb-1">Data Master</p>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-500 text-white shadow-sm flex-shrink-0">
                    <School size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 truncate">
                    Data Sekolah
                  </h1>
                </div>
                <p className="text-sm text-slate-500 mt-1 ml-[42px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400 flex-shrink-0" />
                  <span className="truncate">Kelola data unit sekolah di lingkungan yayasan.</span>
                </p>
              </div>

              <button className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-sm whitespace-nowrap flex-shrink-0">
                <Plus size={16} />
                Tambah Sekolah
              </button>
            </div>

            {/* FILTER BAR */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari nama sekolah, NPSN, atau kepala sekolah..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="relative flex-1 min-w-[160px]">
                  <select
                    value={jenjang}
                    onChange={(e) => setJenjang(e.target.value)}
                    className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors cursor-pointer"
                  >
                    {JENJANG_OPTIONS.map((j) => (
                      <option key={j} value={j}>{j}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative flex-1 min-w-[160px]">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors cursor-pointer"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-blue-50 text-blue-600 border-blue-200 flex-shrink-0">
                  <School size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Total Unit Sekolah</p>
                  <p className="text-lg font-bold text-slate-800">{summary.totalUnit}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-emerald-50 text-emerald-600 border-emerald-200 flex-shrink-0">
                  <BadgeCheck size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Sekolah Aktif</p>
                  <p className="text-lg font-bold text-slate-800">{summary.totalAktif}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-purple-50 text-purple-600 border-purple-200 flex-shrink-0">
                  <Users size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Total Siswa</p>
                  <p className="text-lg font-bold text-slate-800">{summary.totalSiswa.toLocaleString("id-ID")}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-amber-50 text-amber-600 border-amber-200 flex-shrink-0">
                  <GraduationCap size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Total Guru</p>
                  <p className="text-lg font-bold text-slate-800">{summary.totalGuru}</p>
                </div>
              </div>
            </div>

            {/* GRID KARTU SEKOLAH */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-700">Daftar Unit Sekolah</h3>
                <span className="text-xs text-slate-400">{filteredSekolah.length} sekolah</span>
              </div>

              {filteredSekolah.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-10 text-center">
                  <School size={28} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-sm text-slate-400">Tidak ada sekolah yang cocok.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredSekolah.map((s) => (
                    <div
                      key={s.id}
                      className="bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all overflow-hidden flex flex-col"
                    >
                      {/* Header kartu */}
                      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-11 h-11 rounded-lg bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                            <School size={19} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-800 truncate">{s.nama}</p>
                            <p className="text-xs text-slate-400 truncate">NPSN {s.npsn}</p>
                            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border bg-slate-100 text-slate-500 border-slate-200">
                                {s.jenjang}
                              </span>
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border bg-blue-50 text-blue-600 border-blue-200">
                                Akreditasi {s.akreditasi}
                              </span>
                              <span
                                className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                                  s.status === "Aktif"
                                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                    : "bg-slate-100 text-slate-500 border-slate-200"
                                }`}
                              >
                                {s.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                            <Pencil size={14} />
                          </button>
                          <button className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Detail kartu */}
                      <div className="p-4 sm:p-5 flex-1 space-y-2.5">
                        <div className="flex items-start gap-2 text-xs text-slate-600">
                          <MapPin size={13} className="text-slate-400 flex-shrink-0 mt-0.5" />
                          <span>{s.alamat}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <User size={13} className="text-slate-400 flex-shrink-0" />
                          <span className="truncate">Kepala Sekolah: {s.kepalaSekolah}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Phone size={13} className="text-slate-400 flex-shrink-0" />
                          <span>{s.telepon}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Mail size={13} className="text-slate-400 flex-shrink-0" />
                          <span className="truncate">{s.email}</span>
                        </div>
                      </div>

                      {/* Footer: statistik ringkas */}
                      <div className="px-4 sm:px-5 py-3 bg-slate-50/70 border-t border-slate-100 grid grid-cols-3 divide-x divide-slate-200/70">
                        <div className="text-center px-1">
                          <p className="text-sm font-bold text-slate-800">{s.totalSiswa.toLocaleString("id-ID")}</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wide">Siswa</p>
                        </div>
                        <div className="text-center px-1">
                          <p className="text-sm font-bold text-slate-800">{s.totalGuru}</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wide">Guru</p>
                        </div>
                        <div className="text-center px-1">
                          <p className="text-sm font-bold text-slate-800">{s.totalKelas}</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wide">Kelas</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}