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
  Briefcase,
  CheckCircle2,
  X,
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  Printer,
  Download,
  QrCode,
} from "lucide-react";

/**
 * app/admin/guru/kartu-identitas/page.jsx
 *
 * Halaman Kartu Identitas — daftar guru & staff dengan aksi untuk melihat
 * detail profil dan mencetak/preview kartu identitas (ID card) masing-masing.
 *
 * Skema warna memakai biru brand SmartSchool (#155DFC), sama dengan warna
 * teks "School" di logo sidebar, supaya konsisten dengan identitas aplikasi.
 *
 * CATATAN DATA:
 * MOCK_PEGAWAI di bawah masih dummy. Kalau nanti nyambung ke API, tinggal
 * ganti MOCK_PEGAWAI dengan hasil fetch yang bentuknya sama.
 */

const MOCK_PEGAWAI = [
  {
    id: 1,
    nama: "Sarah Amelia, S.Pd",
    nip: "198501152010012001",
    tipe: "Guru",
    jabatan: "Guru Matematika",
    level: "Guru",
    status: "aktif",
    unit: "Mata Pelajaran Matematika",
    telp: "0812-3456-7890",
    email: "sarah.amelia@smartschool.sch.id",
    alamat: "Jl. Merdeka No. 12, Tasikmalaya",
    tglMasuk: "15 Jan 2010",
    golongan: "III/c",
  },
  {
    id: 2,
    nama: "Budi Santoso, S.E",
    nip: "197803102005011003",
    tipe: "Staff",
    jabatan: "Tata Usaha",
    level: "Staff",
    status: "aktif",
    unit: "Administrasi & Keuangan",
    telp: "0813-2233-4455",
    email: "budi.santoso@smartschool.sch.id",
    alamat: "Jl. Cihideung No. 5, Tasikmalaya",
    tglMasuk: "10 Mar 2005",
    golongan: "III/a",
  },
  {
    id: 3,
    nama: "Dewi Anggraini, S.Si",
    nip: "199002202015022004",
    tipe: "Guru",
    jabatan: "Guru IPA",
    level: "Guru",
    status: "aktif",
    unit: "Mata Pelajaran IPA",
    telp: "0821-9988-7766",
    email: "dewi.anggraini@smartschool.sch.id",
    alamat: "Jl. Sutisna Senjaya No. 88, Tasikmalaya",
    tglMasuk: "20 Feb 2015",
    golongan: "III/b",
  },
  {
    id: 4,
    nama: "Andi Prasetyo, S.Pd",
    nip: "198712052012011002",
    tipe: "Guru",
    jabatan: "Guru Bahasa Indonesia",
    level: "Guru",
    status: "nonaktif",
    unit: "Mata Pelajaran Bahasa Indonesia",
    telp: "0857-1122-3344",
    email: "andi.prasetyo@smartschool.sch.id",
    alamat: "Jl. Yudanegara No. 21, Tasikmalaya",
    tglMasuk: "05 Des 2012",
    golongan: "III/a",
  },
  {
    id: 5,
    nama: "Nina Kartika, S.Sn",
    nip: "199105182018022005",
    tipe: "Guru",
    jabatan: "Guru Seni Budaya",
    level: "Guru",
    status: "aktif",
    unit: "Mata Pelajaran Seni Budaya",
    telp: "0878-5566-7788",
    email: "nina.kartika@smartschool.sch.id",
    alamat: "Jl. Ir. H. Djuanda No. 40, Tasikmalaya",
    tglMasuk: "18 Mei 2018",
    golongan: "III/a",
  },
  {
    id: 6,
    nama: "Rudi Hartono, S.Pd",
    nip: "198309252008011006",
    tipe: "Staff",
    jabatan: "Petugas Sarana Prasarana",
    level: "Staff",
    status: "aktif",
    unit: "Sarana & Prasarana",
    telp: "0896-4433-2211",
    email: "rudi.hartono@smartschool.sch.id",
    alamat: "Jl. Cieunteung No. 9, Tasikmalaya",
    tglMasuk: "25 Sep 2008",
    golongan: "II/d",
  },
];

const TIPE_OPTIONS = ["Semua Tipe", "Guru", "Staff"];
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

function TipeBadge({ tipe }) {
  const isGuru = tipe === "Guru";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
        isGuru ? "bg-[#eaf1ff] text-[#155DFC] border border-[#c7dbff]" : "bg-amber-50 text-amber-600 border border-amber-200"
      }`}
    >
      {isGuru ? <GraduationCap size={11} /> : <Briefcase size={11} />}
      {tipe}
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

export default function KartuIdentitasPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [tipeFilter, setTipeFilter] = useState("Semua Tipe");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [detailPegawai, setDetailPegawai] = useState(null);
  const [cardPegawai, setCardPegawai] = useState(null);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const filteredPegawai = useMemo(() => {
    return MOCK_PEGAWAI.filter((p) => {
      const matchSearch =
        p.nama.toLowerCase().includes(search.toLowerCase()) || p.nip.includes(search);
      const matchTipe = tipeFilter === "Semua Tipe" || p.tipe === tipeFilter;
      const matchStatus =
        statusFilter === "Semua Status" ||
        (statusFilter === "Aktif" ? p.status === "aktif" : p.status === "nonaktif");
      return matchSearch && matchTipe && matchStatus;
    });
  }, [search, tipeFilter, statusFilter]);

  const totalGuru = MOCK_PEGAWAI.filter((p) => p.tipe === "Guru").length;
  const totalStaff = MOCK_PEGAWAI.filter((p) => p.tipe === "Staff").length;
  const totalAktif = MOCK_PEGAWAI.filter((p) => p.status === "aktif").length;

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        active="guruKartuIdentitas"
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
                <h1 className="text-2xl font-bold text-slate-800">Kartu Identitas</h1>
                <p className="text-sm text-slate-500">Data identitas guru & staff, lihat detail atau cetak ID card.</p>
              </div>
            </div>

            {/* STATISTIK RINGKAS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Total Pegawai</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{MOCK_PEGAWAI.length}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <GraduationCap size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Guru</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{totalGuru}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Briefcase size={14} className="text-amber-500" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Staff</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{totalStaff}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Status Aktif</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{totalAktif}</p>
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
                  placeholder="Cari nama atau NIP..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={15} className="text-slate-400 hidden sm:block" />
                <select
                  value={tipeFilter}
                  onChange={(e) => setTipeFilter(e.target.value)}
                  className="text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 bg-white text-slate-800 font-medium"
                >
                  {TIPE_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
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

            {/* TABEL PEGAWAI */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#155DFC] to-[#0d47c9] text-white">
                      <th className="text-left font-semibold px-4 py-3 min-w-[220px]">Nama</th>
                      <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">NIP</th>
                      <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Tipe</th>
                      <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Jabatan</th>
                      <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Level</th>
                      <th className="text-center font-semibold px-4 py-3 whitespace-nowrap">Status</th>
                      <th className="text-center font-semibold px-4 py-3 whitespace-nowrap">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPegawai.map((p, idx) => (
                      <tr
                        key={p.id}
                        className={`border-b border-slate-100 last:border-0 transition-colors hover:bg-[#eaf1ff] ${
                          idx % 2 === 0 ? "bg-[#f5f8ff]" : "bg-white"
                        }`}
                      >
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-3">
                            <Avatar nama={p.nama} size="sm" />
                            <span className="font-semibold text-slate-900">{p.nama}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className="font-mono text-xs text-slate-600">{p.nip}</span>
                        </td>
                        <td className="px-4 py-2.5">
                          <TipeBadge tipe={p.tipe} />
                        </td>
                        <td className="px-4 py-2.5 text-slate-700">{p.jabatan}</td>
                        <td className="px-4 py-2.5 text-slate-700">{p.level}</td>
                        <td className="px-4 py-2.5 text-center">
                          <StatusBadge status={p.status} />
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setDetailPegawai(p)}
                              title="Detail"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[#155DFC] bg-[#eaf1ff] hover:bg-[#d6e6ff] text-xs font-medium transition-colors"
                            >
                              <Eye size={13} />
                              Detail
                            </button>
                            <button
                              onClick={() => setCardPegawai(p)}
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
                    {filteredPegawai.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-400">
                          Tidak ada pegawai yang cocok dengan filter ini.
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
      {detailPegawai && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#155DFC] to-[#0d47c9] px-5 py-5 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar nama={detailPegawai.nama} />
                <div>
                  <p className="font-bold text-white text-base leading-tight">{detailPegawai.nama}</p>
                  <p className="text-white/80 text-xs mt-0.5">{detailPegawai.jabatan}</p>
                </div>
              </div>
              <button
                onClick={() => setDetailPegawai(null)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/80 hover:bg-white/15"
              >
                <X size={15} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <TipeBadge tipe={detailPegawai.tipe} />
                <StatusBadge status={detailPegawai.status} />
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[11px] text-slate-400">NIP</p>
                  <p className="font-medium text-slate-800 font-mono text-xs mt-0.5">{detailPegawai.nip}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">Golongan</p>
                  <p className="font-medium text-slate-800 mt-0.5">{detailPegawai.golongan}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[11px] text-slate-400">Unit / Bidang</p>
                  <p className="font-medium text-slate-800 mt-0.5">{detailPegawai.unit}</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <Phone size={14} className="text-[#155DFC] flex-shrink-0" />
                  {detailPegawai.telp}
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <Mail size={14} className="text-[#155DFC] flex-shrink-0" />
                  {detailPegawai.email}
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <MapPin size={14} className="text-[#155DFC] flex-shrink-0" />
                  {detailPegawai.alamat}
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CalendarDays size={14} className="text-[#155DFC] flex-shrink-0" />
                  Bergabung {detailPegawai.tglMasuk}
                </div>
              </div>

              <button
                onClick={() => {
                  setCardPegawai(detailPegawai);
                  setDetailPegawai(null);
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
      {cardPegawai && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-slate-800 text-sm">Preview Kartu Identitas</p>
              <button
                onClick={() => setCardPegawai(null)}
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
                    <p className="text-white/70 text-[9px] tracking-wide uppercase">
                      {cardPegawai.tipe === "Guru" ? "Kartu Identitas Guru" : "Kartu Identitas Staff"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white px-4 pb-4 -mt-6 relative">
                <div className="flex items-end gap-3">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white flex items-center justify-center font-bold text-lg border-4 border-white shadow-md flex-shrink-0">
                    {getInitials(cardPegawai.nama)}
                  </div>
                  <div className="pb-1 min-w-0">
                    <p className="font-bold text-slate-900 text-sm leading-tight truncate">{cardPegawai.nama}</p>
                    <p className="text-xs text-slate-500 truncate">{cardPegawai.jabatan}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">NIP</span>
                    <span className="font-mono font-medium text-slate-700">{cardPegawai.nip}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tipe</span>
                    <span className="font-medium text-slate-700">{cardPegawai.tipe}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Unit</span>
                    <span className="font-medium text-slate-700 text-right">{cardPegawai.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Berlaku s/d</span>
                    <span className="font-medium text-slate-700">31 Des 2027</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-dashed border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${cardPegawai.status === "aktif" ? "bg-emerald-500" : "bg-slate-400"}`} />
                    <span className="text-[10px] font-medium text-slate-500">
                      {cardPegawai.status === "aktif" ? "Aktif" : "Nonaktif"}
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