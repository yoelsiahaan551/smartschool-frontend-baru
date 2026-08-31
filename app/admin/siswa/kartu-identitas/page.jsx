"use client";

import { useState, useMemo } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  Search,
  Filter,
  IdCard,
  Eye,
  CreditCard,
  Users,
  GraduationCap,
  CheckCircle2,
  X,
  Phone,
  MapPin,
  CalendarDays,
  Printer,
  Download,
  QrCode,
  UserCheck,
  School,
} from "lucide-react";

/**
 * app/admin/siswa/kartu-identitas/page.jsx
 *
 * Halaman Kartu Identitas Siswa — daftar siswa dengan aksi untuk melihat
 * detail profil dan mencetak/preview kartu identitas (ID card) masing-masing.
 *
 * Skema warna memakai biru brand SmartSchool (#155DFC), sama dengan warna
 * teks "School" di logo sidebar, supaya konsisten dengan identitas aplikasi
 * dan halaman Kartu Identitas Guru.
 *
 * CATATAN DATA:
 * MOCK_SISWA di bawah masih dummy. Kalau nanti nyambung ke API, tinggal
 * ganti MOCK_SISWA dengan hasil fetch yang bentuknya sama.
 */

const MOCK_SISWA = [
  {
    id: 1,
    nama: "Alya Ramadhani",
    nisn: "0051234567",
    kelas: "7A",
    jenjang: "VII",
    jenisKelamin: "P",
    status: "aktif",
    tempatLahir: "Tasikmalaya",
    tanggalLahir: "12 Mar 2013",
    alamat: "Jl. Merdeka No. 12, Tasikmalaya",
    namaOrtu: "Hendra Ramadhani",
    teleponOrtu: "0812-3456-7890",
    waliKelas: "Siti Rahayu, S.Pd",
    tahunMasuk: "2025",
  },
  {
    id: 2,
    nama: "Bunga Citra Lestari",
    nisn: "0051234568",
    kelas: "7A",
    jenjang: "VII",
    jenisKelamin: "P",
    status: "aktif",
    tempatLahir: "Bandung",
    tanggalLahir: "24 Jul 2013",
    alamat: "Jl. Cihideung No. 5, Tasikmalaya",
    namaOrtu: "Agus Lestari",
    teleponOrtu: "0813-2233-4455",
    waliKelas: "Siti Rahayu, S.Pd",
    tahunMasuk: "2025",
  },
  {
    id: 3,
    nama: "Cahyo Nugroho",
    nisn: "0051234569",
    kelas: "7B",
    jenjang: "VII",
    jenisKelamin: "L",
    status: "aktif",
    tempatLahir: "Tasikmalaya",
    tanggalLahir: "02 Jan 2013",
    alamat: "Jl. Sutisna Senjaya No. 88, Tasikmalaya",
    namaOrtu: "Wawan Nugroho",
    teleponOrtu: "0821-9988-7766",
    waliKelas: "Andi Prasetyo, S.Pd",
    tahunMasuk: "2025",
  },
  {
    id: 4,
    nama: "Indra Kusuma",
    nisn: "0041234570",
    kelas: "8A",
    jenjang: "VIII",
    jenisKelamin: "L",
    status: "aktif",
    tempatLahir: "Garut",
    tanggalLahir: "18 Sep 2012",
    alamat: "Jl. Yudanegara No. 21, Tasikmalaya",
    namaOrtu: "Sutrisno Kusuma",
    teleponOrtu: "0857-1122-3344",
    waliKelas: "Dewi Anggraini, S.Si",
    tahunMasuk: "2024",
  },
  {
    id: 5,
    nama: "Julia Anggraeni",
    nisn: "0041234571",
    kelas: "8A",
    jenjang: "VIII",
    jenisKelamin: "P",
    status: "nonaktif",
    tempatLahir: "Tasikmalaya",
    tanggalLahir: "30 Nov 2012",
    alamat: "Jl. Ir. H. Djuanda No. 40, Tasikmalaya",
    namaOrtu: "Yayan Anggraeni",
    teleponOrtu: "0878-5566-7788",
    waliKelas: "Dewi Anggraini, S.Si",
    tahunMasuk: "2024",
  },
  {
    id: 6,
    nama: "Reza Firmansyah",
    nisn: "0031234572",
    kelas: "9A",
    jenjang: "IX",
    jenisKelamin: "L",
    status: "aktif",
    tempatLahir: "Ciamis",
    tanggalLahir: "07 Apr 2011",
    alamat: "Jl. Cieunteung No. 9, Tasikmalaya",
    namaOrtu: "Dadang Firmansyah",
    teleponOrtu: "0896-4433-2211",
    waliKelas: "Budi Santoso, S.Pd",
    tahunMasuk: "2023",
  },
];

const KELAS_OPTIONS = ["Semua Kelas", ...Array.from(new Set(MOCK_SISWA.map((s) => s.kelas))).sort()];
const STATUS_OPTIONS = ["Semua Status", "Aktif", "Nonaktif"];

function getInitials(nama) {
  return nama
    .replace(/,.*/, "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function JenisKelaminBadge({ jenisKelamin }) {
  const isPria = jenisKelamin === "L";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
        isPria
          ? "bg-[#eaf1ff] text-[#155DFC] border border-[#c7dbff]"
          : "bg-pink-50 text-pink-600 border border-pink-200"
      }`}
    >
      {isPria ? "Laki-laki" : "Perempuan"}
    </span>
  );
}

function StatusBadge({ status }) {
  const isActive = status === "aktif";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
        isActive
          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
          : "bg-slate-100 text-slate-500 border border-slate-200"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-slate-400"}`} />
      {isActive ? "Aktif" : "Nonaktif"}
    </span>
  );
}

function Avatar({ nama, size = "md" }) {
  const dims = size === "sm" ? "w-9 h-9 text-xs" : "w-16 h-16 text-lg";
  return (
    <div
      className={`${dims} rounded-full bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white flex items-center justify-center font-bold flex-shrink-0`}
    >
      {getInitials(nama)}
    </div>
  );
}

export default function KartuIdentitasSiswaPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [kelasFilter, setKelasFilter] = useState("Semua Kelas");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [detailSiswa, setDetailSiswa] = useState(null);
  const [cardSiswa, setCardSiswa] = useState(null);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const filteredSiswa = useMemo(() => {
    return MOCK_SISWA.filter((s) => {
      const matchSearch =
        s.nama.toLowerCase().includes(search.toLowerCase()) || s.nisn.includes(search);
      const matchKelas = kelasFilter === "Semua Kelas" || s.kelas === kelasFilter;
      const matchStatus =
        statusFilter === "Semua Status" ||
        (statusFilter === "Aktif" ? s.status === "aktif" : s.status === "nonaktif");
      return matchSearch && matchKelas && matchStatus;
    });
  }, [search, kelasFilter, statusFilter]);

  const totalSiswa = MOCK_SISWA.length;
  const totalAktif = MOCK_SISWA.filter((s) => s.status === "aktif").length;
  const totalKelas = new Set(MOCK_SISWA.map((s) => s.kelas)).size;

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        active="siswaKartuIdentitas"
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
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            {/* HEADER */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white shadow-lg shadow-slate-900/10">
                <IdCard size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Kartu Identitas Siswa</h1>
                <p className="text-sm text-slate-500">Data identitas siswa, lihat detail atau cetak ID card.</p>
              </div>
            </div>

            {/* STATISTIK RINGKAS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Total Siswa</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{totalSiswa}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <School size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Jumlah Kelas</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{totalKelas}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Status Aktif</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{totalAktif}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <GraduationCap size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Rata-rata / Kelas</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">
                  {totalKelas ? Math.round(totalSiswa / totalKelas) : 0}
                </p>
              </div>
            </div>

            {/* FILTER BAR */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama atau NISN..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={15} className="text-slate-400 hidden sm:block" />
                <select
                  value={kelasFilter}
                  onChange={(e) => setKelasFilter(e.target.value)}
                  className="text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 bg-white text-slate-800 font-medium"
                >
                  {KELAS_OPTIONS.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 bg-white text-slate-800 font-medium"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* TABEL SISWA */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#155DFC] to-[#0d47c9] text-white">
                      <th className="text-left font-semibold px-4 py-3 min-w-[220px]">Nama</th>
                      <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">NISN</th>
                      <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Kelas</th>
                      <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Jenis Kelamin</th>
                      <th className="text-center font-semibold px-4 py-3 whitespace-nowrap">Status</th>
                      <th className="text-center font-semibold px-4 py-3 whitespace-nowrap">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSiswa.map((s, idx) => (
                      <tr
                        key={s.id}
                        className={`border-b border-slate-100 last:border-0 transition-colors hover:bg-[#eaf1ff] ${
                          idx % 2 === 0 ? "bg-[#f5f8ff]" : "bg-white"
                        }`}
                      >
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-3">
                            <Avatar nama={s.nama} size="sm" />
                            <span className="font-semibold text-slate-900">{s.nama}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className="font-mono text-xs text-slate-600">{s.nisn}</span>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className="inline-flex items-center justify-center min-w-[44px] px-2.5 py-1 rounded-lg text-xs font-bold text-[#155DFC] bg-[#eaf1ff] border border-[#c7dbff]">
                            {s.kelas}
                          </span>
                        </td>
                        <td className="px-4 py-2.5">
                          <JenisKelaminBadge jenisKelamin={s.jenisKelamin} />
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <StatusBadge status={s.status} />
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setDetailSiswa(s)}
                              title="Detail"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[#155DFC] bg-[#eaf1ff] hover:bg-[#d6e6ff] text-xs font-medium transition-colors"
                            >
                              <Eye size={13} />
                              Detail
                            </button>
                            <button
                              onClick={() => setCardSiswa(s)}
                              title="ID Card"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-white bg-gradient-to-r from-[#155DFC] to-[#0d47c9] hover:brightness-110 text-xs font-medium transition-all"
                            >
                              <CreditCard size={13} />
                              ID Card
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredSiswa.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-400">
                          Tidak ada siswa yang cocok dengan filter ini.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* MODAL DETAIL */}
      {detailSiswa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden max-h-[85vh] flex flex-col">
            <div className="bg-gradient-to-r from-[#155DFC] to-[#0d47c9] px-5 py-5 flex items-start justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <Avatar nama={detailSiswa.nama} />
                <div>
                  <p className="font-bold text-white text-base leading-tight">{detailSiswa.nama}</p>
                  <p className="text-white/80 text-xs mt-0.5">Kelas {detailSiswa.kelas}</p>
                </div>
              </div>
              <button
                onClick={() => setDetailSiswa(null)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/80 hover:bg-white/15 flex-shrink-0"
              >
                <X size={15} />
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto">
              <div className="flex items-center gap-2">
                <JenisKelaminBadge jenisKelamin={detailSiswa.jenisKelamin} />
                <StatusBadge status={detailSiswa.status} />
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[11px] text-slate-400">NISN</p>
                  <p className="font-medium text-slate-800 font-mono text-xs mt-0.5">{detailSiswa.nisn}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">Kelas</p>
                  <p className="font-medium text-slate-800 mt-0.5">{detailSiswa.kelas} (Jenjang {detailSiswa.jenjang})</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[11px] text-slate-400">Tempat, Tanggal Lahir</p>
                  <p className="font-medium text-slate-800 mt-0.5">
                    {detailSiswa.tempatLahir}, {detailSiswa.tanggalLahir}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <UserCheck size={14} className="text-[#155DFC] flex-shrink-0" />
                  Wali Kelas: {detailSiswa.waliKelas}
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <MapPin size={14} className="text-[#155DFC] flex-shrink-0" />
                  {detailSiswa.alamat}
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <Phone size={14} className="text-[#155DFC] flex-shrink-0" />
                  {detailSiswa.namaOrtu} ({detailSiswa.teleponOrtu})
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CalendarDays size={14} className="text-[#155DFC] flex-shrink-0" />
                  Tahun Masuk {detailSiswa.tahunMasuk}
                </div>
              </div>

              <button
                onClick={() => {
                  setCardSiswa(detailSiswa);
                  setDetailSiswa(null);
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#155DFC] to-[#0d47c9] text-white text-sm font-semibold hover:brightness-110 transition-all"
              >
                <CreditCard size={15} />
                Lihat ID Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ID CARD */}
      {cardSiswa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-slate-800 text-sm">Preview Kartu Identitas</p>
              <button
                onClick={() => setCardSiswa(null)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100"
              >
                <X size={15} />
              </button>
            </div>

            {/* Kartu identitas — desain kartu fisik, rasio ~ kartu ID standar */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <div className="bg-gradient-to-br from-[#155DFC] to-[#0d47c9] px-4 pt-4 pb-8 relative">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/95 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#155DFC] font-black text-xs">S</span>
                  </div>
                  <div className="leading-tight">
                    <p className="text-white font-bold text-xs">SmartSchool</p>
                    <p className="text-white/70 text-[9px] tracking-wide uppercase">Kartu Identitas Siswa</p>
                  </div>
                </div>
              </div>

              <div className="bg-white px-4 pb-4 -mt-6 relative">
                <div className="flex items-end gap-3">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white flex items-center justify-center font-bold text-lg border-4 border-white shadow-md flex-shrink-0">
                    {getInitials(cardSiswa.nama)}
                  </div>
                  <div className="pb-1 min-w-0">
                    <p className="font-bold text-slate-900 text-sm leading-tight truncate">{cardSiswa.nama}</p>
                    <p className="text-xs text-slate-500 truncate">Kelas {cardSiswa.kelas}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">NISN</span>
                    <span className="font-mono font-medium text-slate-700">{cardSiswa.nisn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kelas</span>
                    <span className="font-medium text-slate-700">{cardSiswa.kelas}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Wali Kelas</span>
                    <span className="font-medium text-slate-700 text-right">{cardSiswa.waliKelas}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">TTL</span>
                    <span className="font-medium text-slate-700 text-right">
                      {cardSiswa.tempatLahir}, {cardSiswa.tanggalLahir}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Berlaku s/d</span>
                    <span className="font-medium text-slate-700">31 Des 2027</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-dashed border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${cardSiswa.status === "aktif" ? "bg-emerald-500" : "bg-slate-400"}`} />
                    <span className="text-[10px] font-medium text-slate-500">
                      {cardSiswa.status === "aktif" ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-md bg-slate-100 flex items-center justify-center">
                    <QrCode size={18} className="text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
                <Download size={15} />
                Unduh
              </button>
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#155DFC] to-[#0d47c9] text-white text-sm font-semibold hover:brightness-110 transition-all">
                <Printer size={15} />
                Cetak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}