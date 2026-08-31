"use client";

import { useState, useMemo } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  Search,
  Filter,
  UserCheck,
  Eye,
  Users,
  School,
  CheckCircle2,
  X,
  Phone,
  Mail,
  ClipboardList,
  Plus,
  Trash2,
  PowerOff,
  Power,
  AlertTriangle,
} from "lucide-react";

/**
 * app/admin/guru/wali-kelas/page.jsx
 *
 * Halaman Wali Kelas — daftar penugasan wali kelas per kelas, beserta
 * jumlah siswa binaan dan aksi untuk melihat detail kelas & daftar siswa.
 * Sekarang mendukung: tambah wali kelas baru, nonaktifkan/aktifkan, dan hapus.
 *
 * Skema warna memakai biru brand SmartSchool (#155DFC), sama dengan warna
 * teks "School" di logo sidebar, supaya konsisten dengan identitas aplikasi.
 *
 * CATATAN DATA:
 * MOCK_WALIKELAS di bawah masih dummy dan dipakai sebagai initial state.
 * Kalau nanti nyambung ke API, ganti initial state `wali` dengan hasil fetch,
 * dan sambungkan handleAdd/handleDelete/handleToggleStatus ke endpoint terkait.
 */

const MOCK_WALIKELAS = [
  {
    id: 1,
    kelas: "7A",
    jenjang: "VII",
    waliKelas: "Siti Rahayu, S.Pd",
    nip: "198501152010012001",
    telp: "0812-3456-7890",
    email: "sarah.amelia@smartschool.sch.id",
    jumlahSiswa: 32,
    tahunAjaran: "2025/2026",
    status: "aktif",
    siswa: ["Alya Ramadhani", "Bunga Citra Lestari", "Cahyo Nugroho", "Dimas Prasetyo"],
  },
  {
    id: 2,
    kelas: "7B",
    jenjang: "VII",
    waliKelas: "Andi Prasetyo, S.Pd",
    nip: "198712052012011002",
    telp: "0857-1122-3344",
    email: "andi.prasetyo@smartschool.sch.id",
    jumlahSiswa: 30,
    tahunAjaran: "2025/2026",
    status: "aktif",
    siswa: ["Eka Wulandari", "Fajar Setiawan", "Gilang Ramadhan", "Hana Permatasari"],
  },
  {
    id: 3,
    kelas: "8A",
    jenjang: "VIII",
    waliKelas: "Dewi Anggraini, S.Si",
    nip: "199002202015022004",
    telp: "0821-9988-7766",
    email: "dewi.anggraini@smartschool.sch.id",
    jumlahSiswa: 31,
    tahunAjaran: "2025/2026",
    status: "aktif",
    siswa: ["Indra Kusuma", "Julia Anggraeni", "Krisna Aditya", "Larasati Dewi"],
  },
  {
    id: 4,
    kelas: "8B",
    jenjang: "VIII",
    waliKelas: "Nina Kartika, S.Sn",
    nip: "199105182018022005",
    telp: "0878-5566-7788",
    email: "nina.kartika@smartschool.sch.id",
    jumlahSiswa: 29,
    tahunAjaran: "2025/2026",
    status: "aktif",
    siswa: ["Muhammad Fadli", "Naila Zahra", "Oka Wijaya", "Putri Ayuningtyas"],
  },
  {
    id: 5,
    kelas: "9A",
    jenjang: "IX",
    waliKelas: "Budi Santoso, S.Pd",
    nip: "197803102005011003",
    telp: "0813-2233-4455",
    email: "budi.santoso@smartschool.sch.id",
    jumlahSiswa: 28,
    tahunAjaran: "2025/2026",
    status: "aktif",
    siswa: ["Reza Firmansyah", "Salsabila Putri", "Taufik Hidayat", "Umi Kalsum"],
  },
  {
    id: 6,
    kelas: "9B",
    jenjang: "IX",
    waliKelas: "Rudi Hartono, S.Pd",
    nip: "198309252008011006",
    telp: "0896-4433-2211",
    email: "rudi.hartono@smartschool.sch.id",
    jumlahSiswa: 27,
    tahunAjaran: "2024/2025",
    status: "nonaktif",
    siswa: ["Vino Bastian", "Wulan Sari", "Yoga Pratama", "Zahra Aulia"],
  },
];

const JENJANG_LIST = ["VII", "VIII", "IX"];
const STATUS_OPTIONS = ["Semua Status", "Aktif", "Nonaktif"];

const EMPTY_FORM = {
  kelas: "",
  jenjang: "VII",
  waliKelas: "",
  nip: "",
  telp: "",
  email: "",
  jumlahSiswa: "",
  tahunAjaran: "2025/2026",
};

function getInitials(nama) {
  return nama
    .replace(/,.*/, "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
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
  const dims = size === "sm" ? "w-9 h-9 text-xs" : "w-14 h-14 text-base";
  return (
    <div
      className={`${dims} rounded-full bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white flex items-center justify-center font-bold flex-shrink-0`}
    >
      {getInitials(nama)}
    </div>
  );
}

export default function WaliKelasPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [jenjangFilter, setJenjangFilter] = useState("Semua Jenjang");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [detailKelas, setDetailKelas] = useState(null);

  // Data wali kelas sekarang disimpan di state supaya bisa ditambah/dihapus/diubah.
  const [wali, setWali] = useState(MOCK_WALIKELAS);

  // Modal tambah
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");

  // Konfirmasi hapus
  const [confirmDelete, setConfirmDelete] = useState(null); // objek wali yang mau dihapus

  const jenjangOptions = useMemo(
    () => ["Semua Jenjang", ...Array.from(new Set(wali.map((w) => w.jenjang))).sort()],
    [wali]
  );

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const filteredWali = useMemo(() => {
    return wali.filter((w) => {
      const matchSearch =
        w.kelas.toLowerCase().includes(search.toLowerCase()) ||
        w.waliKelas.toLowerCase().includes(search.toLowerCase());
      const matchJenjang = jenjangFilter === "Semua Jenjang" || w.jenjang === jenjangFilter;
      const matchStatus =
        statusFilter === "Semua Status" ||
        (statusFilter === "Aktif" ? w.status === "aktif" : w.status === "nonaktif");
      return matchSearch && matchJenjang && matchStatus;
    });
  }, [wali, search, jenjangFilter, statusFilter]);

  const totalSiswa = wali.reduce((sum, w) => sum + Number(w.jumlahSiswa || 0), 0);
  const totalKelasAktif = wali.filter((w) => w.status === "aktif").length;

  // ---- Handlers ----

  function handleToggleStatus(id) {
    setWali((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: w.status === "aktif" ? "nonaktif" : "aktif" } : w))
    );
    setDetailKelas((prev) =>
      prev && prev.id === id ? { ...prev, status: prev.status === "aktif" ? "nonaktif" : "aktif" } : prev
    );
  }

  function handleDelete(id) {
    setWali((prev) => prev.filter((w) => w.id !== id));
    setConfirmDelete(null);
    setDetailKelas((prev) => (prev && prev.id === id ? null : prev));
  }

  function openAddModal() {
    setForm(EMPTY_FORM);
    setFormError("");
    setShowAddModal(true);
  }

  function handleFormChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleAddSubmit(e) {
    e.preventDefault();

    if (!form.kelas.trim() || !form.waliKelas.trim() || !form.nip.trim()) {
      setFormError("Kelas, nama wali kelas, dan NIP wajib diisi.");
      return;
    }
    if (wali.some((w) => w.kelas.toLowerCase() === form.kelas.trim().toLowerCase())) {
      setFormError("Kelas tersebut sudah punya wali kelas. Gunakan nama kelas lain.");
      return;
    }

    const newEntry = {
      id: Date.now(),
      kelas: form.kelas.trim(),
      jenjang: form.jenjang,
      waliKelas: form.waliKelas.trim(),
      nip: form.nip.trim(),
      telp: form.telp.trim() || "-",
      email: form.email.trim() || "-",
      jumlahSiswa: Number(form.jumlahSiswa) || 0,
      tahunAjaran: form.tahunAjaran.trim() || "2025/2026",
      status: "aktif",
      siswa: [],
    };

    setWali((prev) => [newEntry, ...prev]);
    setShowAddModal(false);
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        active="guruWaliKelas"
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
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white shadow-lg shadow-slate-900/10">
                  <UserCheck size={20} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Wali Kelas</h1>
                  <p className="text-sm text-slate-500">Penugasan wali kelas dan jumlah siswa binaan tiap kelas.</p>
                </div>
              </div>
              <button
                onClick={openAddModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white text-sm font-semibold shadow-lg shadow-[#155DFC]/20 hover:opacity-90 transition-opacity"
              >
                <Plus size={16} />
                Tambah Wali Kelas
              </button>
            </div>

            {/* STATISTIK RINGKAS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <School size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Total Kelas</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{wali.length}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <UserCheck size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Kelas Aktif</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{totalKelasAktif}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Total Siswa Binaan</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">{totalSiswa}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">Rata-rata / Kelas</p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">
                  {wali.length ? Math.round(totalSiswa / wali.length) : 0}
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
                  placeholder="Cari kelas atau nama wali kelas..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={15} className="text-slate-400 hidden sm:block" />
                <select
                  value={jenjangFilter}
                  onChange={(e) => setJenjangFilter(e.target.value)}
                  className="text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 bg-white text-slate-800 font-medium"
                >
                  {jenjangOptions.map((j) => (
                    <option key={j} value={j}>
                      {j}
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

            {/* TABEL WALI KELAS */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#155DFC] to-[#0d47c9] text-white">
                      <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Kelas</th>
                      <th className="text-left font-semibold px-4 py-3 min-w-[220px]">Wali Kelas</th>
                      <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">NIP</th>
                      <th className="text-center font-semibold px-4 py-3 whitespace-nowrap">Jumlah Siswa</th>
                      <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Tahun Ajaran</th>
                      <th className="text-center font-semibold px-4 py-3 whitespace-nowrap">Status</th>
                      <th className="text-center font-semibold px-4 py-3 whitespace-nowrap">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWali.map((w, idx) => (
                      <tr
                        key={w.id}
                        className={`border-b border-slate-100 last:border-0 transition-colors hover:bg-[#eaf1ff] ${
                          idx % 2 === 0 ? "bg-[#f5f8ff]" : "bg-white"
                        }`}
                      >
                        <td className="px-4 py-2.5">
                          <span className="inline-flex items-center justify-center min-w-[44px] px-2.5 py-1 rounded-lg text-xs font-bold text-[#155DFC] bg-[#eaf1ff] border border-[#c7dbff]">
                            {w.kelas}
                          </span>
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-3">
                            <Avatar nama={w.waliKelas} size="sm" />
                            <span className="font-semibold text-slate-900">{w.waliKelas}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className="font-mono text-xs text-slate-600">{w.nip}</span>
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                            <Users size={13} className="text-slate-400" />
                            {w.jumlahSiswa} siswa
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-slate-700">{w.tahunAjaran}</td>
                        <td className="px-4 py-2.5 text-center">
                          <StatusBadge status={w.status} />
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setDetailKelas(w)}
                              title="Detail kelas"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[#155DFC] bg-[#eaf1ff] hover:bg-[#d6e6ff] text-xs font-medium transition-colors"
                            >
                              <Eye size={13} />
                              Detail
                            </button>
                            <button
                              onClick={() => handleToggleStatus(w.id)}
                              title={w.status === "aktif" ? "Nonaktifkan" : "Aktifkan"}
                              className={`inline-flex items-center justify-center p-1.5 rounded-md text-xs font-medium transition-colors ${
                                w.status === "aktif"
                                  ? "text-amber-600 bg-amber-50 hover:bg-amber-100"
                                  : "text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                              }`}
                            >
                              {w.status === "aktif" ? <PowerOff size={13} /> : <Power size={13} />}
                            </button>
                            <button
                              onClick={() => setConfirmDelete(w)}
                              title="Hapus"
                              className="inline-flex items-center justify-center p-1.5 rounded-md text-red-600 bg-red-50 hover:bg-red-100 text-xs font-medium transition-colors"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredWali.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-400">
                          Tidak ada kelas yang cocok dengan filter ini.
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

      {/* MODAL DETAIL KELAS */}
      {detailKelas && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden max-h-[85vh] flex flex-col">
            <div className="bg-gradient-to-r from-[#155DFC] to-[#0d47c9] px-5 py-5 flex items-start justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <Avatar nama={detailKelas.waliKelas} />
                <div>
                  <p className="text-white/80 text-xs">Wali Kelas {detailKelas.kelas}</p>
                  <p className="font-bold text-white text-base leading-tight">{detailKelas.waliKelas}</p>
                </div>
              </div>
              <button
                onClick={() => setDetailKelas(null)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/80 hover:bg-white/15 flex-shrink-0"
              >
                <X size={15} />
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto">
              <div className="flex items-center gap-2">
                <StatusBadge status={detailKelas.status} />
                <span className="text-xs text-slate-400">Tahun Ajaran {detailKelas.tahunAjaran}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[11px] text-slate-400">NIP</p>
                  <p className="font-medium text-slate-800 font-mono text-xs mt-0.5">{detailKelas.nip}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">Jenjang</p>
                  <p className="font-medium text-slate-800 mt-0.5">Kelas {detailKelas.jenjang}</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <Phone size={14} className="text-[#155DFC] flex-shrink-0" />
                  {detailKelas.telp}
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <Mail size={14} className="text-[#155DFC] flex-shrink-0" />
                  {detailKelas.email}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <ClipboardList size={14} className="text-[#155DFC]" />
                    Siswa Binaan
                  </p>
                  <span className="text-xs font-medium text-slate-400">{detailKelas.jumlahSiswa} siswa</span>
                </div>
                <div className="space-y-1.5">
                  {detailKelas.siswa.map((nama, i) => (
                    <div
                      key={nama}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#f5f8ff] border border-slate-100 text-sm text-slate-700"
                    >
                      <span className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-semibold text-slate-400 flex-shrink-0">
                        {i + 1}
                      </span>
                      {nama}
                    </div>
                  ))}
                  {detailKelas.siswa.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-2">Belum ada data siswa binaan.</p>
                  )}
                  {detailKelas.jumlahSiswa > detailKelas.siswa.length && (
                    <p className="text-xs text-slate-400 text-center pt-1">
                      +{detailKelas.jumlahSiswa - detailKelas.siswa.length} siswa lainnya
                    </p>
                  )}
                </div>
              </div>

              {/* AKSI: Nonaktifkan/Aktifkan & Hapus */}
              <div className="border-t border-slate-100 pt-4 flex gap-2">
                <button
                  onClick={() => handleToggleStatus(detailKelas.id)}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    detailKelas.status === "aktif"
                      ? "text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-200"
                      : "text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200"
                  }`}
                >
                  {detailKelas.status === "aktif" ? <PowerOff size={14} /> : <Power size={14} />}
                  {detailKelas.status === "aktif" ? "Nonaktifkan" : "Aktifkan"}
                </button>
                <button
                  onClick={() => setConfirmDelete(detailKelas)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
                >
                  <Trash2 size={14} />
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH WALI KELAS */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden max-h-[85vh] flex flex-col">
            <div className="bg-gradient-to-r from-[#155DFC] to-[#0d47c9] px-5 py-4 flex items-center justify-between flex-shrink-0">
              <p className="font-bold text-white text-base flex items-center gap-2">
                <Plus size={16} />
                Tambah Wali Kelas
              </p>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/80 hover:bg-white/15 flex-shrink-0"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-5 space-y-3.5 overflow-y-auto">
              {formError && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-3 py-2">
                  <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-500">Kelas *</label>
                  <input
                    type="text"
                    value={form.kelas}
                    onChange={(e) => handleFormChange("kelas", e.target.value)}
                    placeholder="mis. 7C"
                    className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500">Jenjang</label>
                  <select
                    value={form.jenjang}
                    onChange={(e) => handleFormChange("jenjang", e.target.value)}
                    className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 bg-white text-slate-800"
                  >
                    {JENJANG_LIST.map((j) => (
                      <option key={j} value={j}>
                        Kelas {j}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500">Nama Wali Kelas *</label>
                <input
                  type="text"
                  value={form.waliKelas}
                  onChange={(e) => handleFormChange("waliKelas", e.target.value)}
                  placeholder="mis. Rina Marlina, S.Pd"
                  className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500">NIP *</label>
                <input
                  type="text"
                  value={form.nip}
                  onChange={(e) => handleFormChange("nip", e.target.value)}
                  placeholder="mis. 199001012015011001"
                  className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-500">No. Telepon</label>
                  <input
                    type="text"
                    value={form.telp}
                    onChange={(e) => handleFormChange("telp", e.target.value)}
                    placeholder="0812-xxxx-xxxx"
                    className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500">Jumlah Siswa</label>
                  <input
                    type="number"
                    min="0"
                    value={form.jumlahSiswa}
                    onChange={(e) => handleFormChange("jumlahSiswa", e.target.value)}
                    placeholder="0"
                    className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  placeholder="nama@smartschool.sch.id"
                  className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500">Tahun Ajaran</label>
                <input
                  type="text"
                  value={form.tahunAjaran}
                  onChange={(e) => handleFormChange("tahunAjaran", e.target.value)}
                  placeholder="2025/2026"
                  className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-br from-[#155DFC] to-[#0d47c9] hover:opacity-90 transition-opacity"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI HAPUS */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={18} />
              </div>
              <p className="font-bold text-slate-800">Hapus Wali Kelas?</p>
            </div>
            <p className="text-sm text-slate-500 mb-5">
              Data wali kelas <span className="font-semibold text-slate-700">{confirmDelete.waliKelas}</span> untuk
              kelas <span className="font-semibold text-slate-700">{confirmDelete.kelas}</span> akan dihapus secara
              permanen. Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(confirmDelete.id)}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}