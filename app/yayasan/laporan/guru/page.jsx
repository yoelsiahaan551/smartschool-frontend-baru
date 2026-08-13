"use client";

import { useState, useMemo } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  GraduationCap,
  Search,
  ChevronDown,
  ChevronLeft,
  Sparkles,
  UserPlus,
  Mail,
  Phone,
  BookOpen,
  Users,
  MapPin,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";

// ===== DUMMY DATA =====
// Catatan: ganti dengan data asli dari API/DB begitu tersedia.
const UNIT_OPTIONS = ["Semua Unit", "SD Smart School 1", "SD Smart School 2", "SMP Smart School 1", "SMP Smart School 2", "SMA Smart School 1", "SMA Smart School 2"];
const STATUS_OPTIONS = ["Semua Status", "Aktif", "Cuti"];

const dataGuru = [
  {
    id: 1,
    nama: "Siti Nurhaliza, S.Pd",
    nip: "198705142010012001",
    mapel: "Matematika",
    unit: "SMP Smart School 1",
    jabatan: "Wali Kelas 8A",
    kelasDiampu: 3,
    siswaDiampu: 96,
    email: "siti.nurhaliza@smartschool.com",
    telepon: "0812-3456-7801",
    bergabung: "2010",
    status: "Aktif",
  },
  {
    id: 2,
    nama: "Budi Santoso, M.Pd",
    nip: "198203112008011002",
    mapel: "Bahasa Indonesia",
    unit: "SMP Smart School 1",
    jabatan: "Guru Senior",
    kelasDiampu: 4,
    siswaDiampu: 128,
    email: "budi.santoso@smartschool.com",
    telepon: "0812-3456-7802",
    bergabung: "2008",
    status: "Aktif",
  },
  {
    id: 3,
    nama: "Rina Marlina, S.Pd",
    nip: "199001202015012003",
    mapel: "IPA",
    unit: "SMP Smart School 2",
    jabatan: "Guru Mata Pelajaran",
    kelasDiampu: 3,
    siswaDiampu: 102,
    email: "rina.marlina@smartschool.com",
    telepon: "0812-3456-7803",
    bergabung: "2015",
    status: "Cuti",
  },
  {
    id: 4,
    nama: "Andi Wijaya, S.Pd",
    nip: "198811052012011004",
    mapel: "IPS",
    unit: "SMP Smart School 2",
    jabatan: "Wali Kelas 8B",
    kelasDiampu: 3,
    siswaDiampu: 99,
    email: "andi.wijaya@smartschool.com",
    telepon: "0812-3456-7804",
    bergabung: "2012",
    status: "Aktif",
  },
  {
    id: 5,
    nama: "Dewi Kusuma, S.Pd",
    nip: "199205172016012005",
    mapel: "Bahasa Inggris",
    unit: "SD Smart School 1",
    jabatan: "Guru Mata Pelajaran",
    kelasDiampu: 5,
    siswaDiampu: 140,
    email: "dewi.kusuma@smartschool.com",
    telepon: "0812-3456-7805",
    bergabung: "2016",
    status: "Aktif",
  },
  {
    id: 6,
    nama: "Fajar Ramadhan, S.Pd",
    nip: "198609232011011006",
    mapel: "PJOK",
    unit: "SD Smart School 2",
    jabatan: "Guru Mata Pelajaran",
    kelasDiampu: 6,
    siswaDiampu: 168,
    email: "fajar.ramadhan@smartschool.com",
    telepon: "0812-3456-7806",
    bergabung: "2011",
    status: "Aktif",
  },
  {
    id: 7,
    nama: "Yulia Puspita, M.Pd",
    nip: "198412302009012007",
    mapel: "Fisika",
    unit: "SMA Smart School 1",
    jabatan: "Kepala Lab IPA",
    kelasDiampu: 3,
    siswaDiampu: 90,
    email: "yulia.puspita@smartschool.com",
    telepon: "0812-3456-7807",
    bergabung: "2009",
    status: "Aktif",
  },
  {
    id: 8,
    nama: "Hendra Gunawan, S.Pd",
    nip: "199103082017011008",
    mapel: "Kimia",
    unit: "SMA Smart School 1",
    jabatan: "Guru Mata Pelajaran",
    kelasDiampu: 3,
    siswaDiampu: 87,
    email: "hendra.gunawan@smartschool.com",
    telepon: "0812-3456-7808",
    bergabung: "2017",
    status: "Aktif",
  },
  {
    id: 9,
    nama: "Maya Anggraeni, S.Pd",
    nip: "198907142013012009",
    mapel: "Ekonomi",
    unit: "SMA Smart School 2",
    jabatan: "Wali Kelas 11 IPS 1",
    kelasDiampu: 4,
    siswaDiampu: 116,
    email: "maya.anggraeni@smartschool.com",
    telepon: "0812-3456-7809",
    bergabung: "2013",
    status: "Aktif",
  },
  {
    id: 10,
    nama: "Rian Pratama, S.Pd",
    nip: "199306252019011010",
    mapel: "Sejarah",
    unit: "SMA Smart School 2",
    jabatan: "Guru Mata Pelajaran",
    kelasDiampu: 4,
    siswaDiampu: 121,
    email: "rian.pratama@smartschool.com",
    telepon: "0812-3456-7810",
    bergabung: "2019",
    status: "Cuti",
  },
];

// ambil inisial nama untuk avatar (maks 2 huruf, abaikan gelar)
const getInisial = (nama) => {
  const namaBersih = nama.split(",")[0].trim();
  const parts = namaBersih.split(" ").filter(Boolean);
  const inisial = (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
  return inisial.toUpperCase();
};

const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-purple-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-indigo-500",
  "bg-teal-500",
];

// ===== MAIN COMPONENT =====

export default function DataGuruPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [unit, setUnit] = useState(UNIT_OPTIONS[0]);
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [search, setSearch] = useState("");

  const filteredGuru = useMemo(() => {
    return dataGuru.filter((g) => {
      const matchUnit = unit === "Semua Unit" || g.unit === unit;
      const matchStatus = status === "Semua Status" || g.status === status;
      const matchSearch =
        !search.trim() ||
        g.nama.toLowerCase().includes(search.toLowerCase()) ||
        g.mapel.toLowerCase().includes(search.toLowerCase()) ||
        g.nip.includes(search);
      return matchUnit && matchStatus && matchSearch;
    });
  }, [unit, status, search]);

  const totalKelas = useMemo(() => filteredGuru.reduce((a, g) => a + g.kelasDiampu, 0), [filteredGuru]);
  const totalSiswa = useMemo(() => filteredGuru.reduce((a, g) => a + g.siswaDiampu, 0), [filteredGuru]);
  const totalAktif = useMemo(() => filteredGuru.filter((g) => g.status === "Aktif").length, [filteredGuru]);

  const notifications = [
    { id: 1, title: "Pengumuman Libur Semester", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Deadline Input Nilai", desc: "Dikirim 5 jam lalu", read: false },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="laporan"
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
                <button
                  onClick={() => router.push("/yayasan/laporan")}
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors mb-1"
                >
                  <ChevronLeft size={13} />
                  Laporan & Analitik
                </button>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-500 text-white shadow-sm flex-shrink-0">
                    <GraduationCap size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 truncate">
                    Data Guru
                  </h1>
                </div>
                <p className="text-sm text-slate-500 mt-1 ml-[42px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400 flex-shrink-0" />
                  <span className="truncate">Daftar dan profil seluruh guru di lingkungan yayasan.</span>
                </p>
              </div>

              <button className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-sm whitespace-nowrap flex-shrink-0">
                <UserPlus size={16} />
                Tambah Guru
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
                    placeholder="Cari nama, NIP, atau mata pelajaran..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="relative flex-1 min-w-[200px]">
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors cursor-pointer"
                  >
                    {UNIT_OPTIONS.map((u) => (
                      <option key={u} value={u}>{u}</option>
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
                  <Users size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Total Guru</p>
                  <p className="text-lg font-bold text-slate-800">{filteredGuru.length}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-emerald-50 text-emerald-600 border-emerald-200 flex-shrink-0">
                  <GraduationCap size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Guru Aktif</p>
                  <p className="text-lg font-bold text-slate-800">{totalAktif}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-purple-50 text-purple-600 border-purple-200 flex-shrink-0">
                  <BookOpen size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Total Kelas Diampu</p>
                  <p className="text-lg font-bold text-slate-800">{totalKelas}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border bg-amber-50 text-amber-600 border-amber-200 flex-shrink-0">
                  <Users size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">Total Siswa Diampu</p>
                  <p className="text-lg font-bold text-slate-800">{totalSiswa.toLocaleString("id-ID")}</p>
                </div>
              </div>
            </div>

            {/* GRID KARTU GURU */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-700">Daftar Guru</h3>
                <span className="text-xs text-slate-400">{filteredGuru.length} guru</span>
              </div>

              {filteredGuru.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-10 text-center">
                  <Users size={28} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-sm text-slate-400">Tidak ada guru yang cocok.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredGuru.map((g, idx) => (
                    <div
                      key={g.id}
                      className="bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all overflow-hidden flex flex-col"
                    >
                      {/* Header kartu */}
                      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-start gap-3">
                        <div
                          className={`w-12 h-12 rounded-full ${AVATAR_COLORS[idx % AVATAR_COLORS.length]} text-white flex items-center justify-center font-semibold text-sm flex-shrink-0`}
                        >
                          {getInisial(g.nama)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-800 truncate">{g.nama}</p>
                          <p className="text-xs text-slate-400 truncate">NIP {g.nip}</p>
                          <span
                            className={`inline-block mt-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                              g.status === "Aktif"
                                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                : "bg-amber-50 text-amber-600 border-amber-200"
                            }`}
                          >
                            {g.status}
                          </span>
                        </div>
                      </div>

                      {/* Detail kartu */}
                      <div className="p-4 sm:p-5 flex-1 space-y-2.5">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <BookOpen size={13} className="text-slate-400 flex-shrink-0" />
                          <span className="truncate">{g.mapel} &middot; {g.jabatan}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <MapPin size={13} className="text-slate-400 flex-shrink-0" />
                          <span className="truncate">{g.unit}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Calendar size={13} className="text-slate-400 flex-shrink-0" />
                          <span className="truncate">Bergabung sejak {g.bergabung}</span>
                        </div>
                      </div>

                      {/* Footer kartu: kontak & jumlah kelas/siswa */}
                      <div className="px-4 sm:px-5 py-3 bg-slate-50/70 border-t border-slate-100 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Kelas Diampu</span>
                          <span className="font-semibold text-slate-700">{g.kelasDiampu} kelas</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Siswa Diampu</span>
                          <span className="font-semibold text-slate-700">{g.siswaDiampu.toLocaleString("id-ID")} siswa</span>
                        </div>
                        <div className="flex items-center gap-2 pt-1.5 border-t border-slate-200/70">
                          <Mail size={12} className="text-slate-400 flex-shrink-0" />
                          <span className="text-[11px] text-slate-500 truncate">{g.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={12} className="text-slate-400 flex-shrink-0" />
                          <span className="text-[11px] text-slate-500 truncate">{g.telepon}</span>
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