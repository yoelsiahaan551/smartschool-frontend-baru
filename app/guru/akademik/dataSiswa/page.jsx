"use client";

import { useState, useMemo } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  IdCard,
  Search,
  Plus,
  X,
  Trash2,
  Pencil,
  ChevronDown,
  Sparkles,
  Users,
  UserRound,
  Phone,
  MapPin,
  Cake,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ===== DUMMY DATA =====
const KELAS_OPTIONS = ["7", "8", "9"];

const STATUS = {
  aktif: { label: "Aktif", chip: "bg-emerald-50 text-emerald-600 border-emerald-200", dot: "bg-emerald-500" },
  nonaktif: { label: "Nonaktif", chip: "bg-slate-100 text-slate-500 border-slate-300", dot: "bg-slate-400" },
};

const initialStudents = [
  {
    id: 1,
    nama: "Rina Amelia",
    nis: "2409001",
    nisn: "0091234561",
    jenisKelamin: "P",
    kelas: "8",
    tempatLahir: "Bandung",
    tanggalLahir: "2012-03-14",
    alamat: "Jl. Merdeka No. 12, Bandung",
    namaOrangTua: "Sutrisno Amelia",
    noHp: "0812-3456-7801",
    status: "aktif",
  },
  {
    id: 2,
    nama: "Bagas Saputra",
    nis: "2409002",
    nisn: "0091234562",
    jenisKelamin: "L",
    kelas: "8",
    tempatLahir: "Jakarta",
    tanggalLahir: "2012-06-02",
    alamat: "Jl. Kenanga No. 5, Jakarta Selatan",
    namaOrangTua: "Slamet Saputra",
    noHp: "0813-2233-4455",
    status: "aktif",
  },
  {
    id: 3,
    nama: "Citra Lestari",
    nis: "2409003",
    nisn: "0091234563",
    jenisKelamin: "P",
    kelas: "8",
    tempatLahir: "Surabaya",
    tanggalLahir: "2012-01-22",
    alamat: "Jl. Diponegoro No. 88, Surabaya",
    namaOrangTua: "Wahyudi Lestari",
    noHp: "0857-1122-3344",
    status: "aktif",
  },
  {
    id: 4,
    nama: "Dimas Prakoso",
    nis: "2409004",
    nisn: "0091234564",
    jenisKelamin: "L",
    kelas: "8",
    tempatLahir: "Yogyakarta",
    tanggalLahir: "2012-09-10",
    alamat: "Jl. Malioboro No. 3, Yogyakarta",
    namaOrangTua: "Agus Prakoso",
    noHp: "0821-9988-7766",
    status: "nonaktif",
  },
  {
    id: 5,
    nama: "Eka Wulandari",
    nis: "2409005",
    nisn: "0091234565",
    jenisKelamin: "P",
    kelas: "7",
    tempatLahir: "Semarang",
    tanggalLahir: "2013-05-18",
    alamat: "Jl. Pandanaran No. 21, Semarang",
    namaOrangTua: "Hariyanto Wulan",
    noHp: "0878-1234-5678",
    status: "aktif",
  },
  {
    id: 6,
    nama: "Fajar Nugroho",
    nis: "2409006",
    nisn: "0091234566",
    jenisKelamin: "L",
    kelas: "7",
    tempatLahir: "Malang",
    tanggalLahir: "2013-11-30",
    alamat: "Jl. Ijen No. 45, Malang",
    namaOrangTua: "Nugroho Adi",
    noHp: "0812-5566-7788",
    status: "aktif",
  },
  {
    id: 7,
    nama: "Gita Ramadhani",
    nis: "2409007",
    nisn: "0091234567",
    jenisKelamin: "P",
    kelas: "9",
    tempatLahir: "Bogor",
    tanggalLahir: "2011-02-08",
    alamat: "Jl. Pajajaran No. 67, Bogor",
    namaOrangTua: "Ramadhan Fauzi",
    noHp: "0895-3344-5566",
    status: "aktif",
  },
  {
    id: 8,
    nama: "Hendra Kusuma",
    nis: "2409008",
    nisn: "0091234568",
    jenisKelamin: "L",
    kelas: "9",
    tempatLahir: "Medan",
    tanggalLahir: "2011-07-25",
    alamat: "Jl. Sisingamangaraja No. 9, Medan",
    namaOrangTua: "Kusuma Wijaya",
    noHp: "0813-7788-9900",
    status: "aktif",
  },
  {
    id: 9,
    nama: "Indah Permata",
    nis: "2409009",
    nisn: "0091234569",
    jenisKelamin: "P",
    kelas: "9",
    tempatLahir: "Makassar",
    tanggalLahir: "2011-12-03",
    alamat: "Jl. Pettarani No. 14, Makassar",
    namaOrangTua: "Permata Sari",
    noHp: "0822-4455-6677",
    status: "aktif",
  },
  {
    id: 10,
    nama: "Joko Widodo Putra",
    nis: "2409010",
    nisn: "0091234570",
    jenisKelamin: "L",
    kelas: "9",
    tempatLahir: "Solo",
    tanggalLahir: "2011-04-17",
    alamat: "Jl. Slamet Riyadi No. 100, Solo",
    namaOrangTua: "Widodo Santoso",
    noHp: "0857-6677-8899",
    status: "nonaktif",
  },
];

const PAGE_SIZE = 6;

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const formatTanggal = (iso) =>
  new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

const hitungUsia = (iso) => {
  const lahir = new Date(iso);
  const now = new Date();
  let usia = now.getFullYear() - lahir.getFullYear();
  const belumUlangTahun =
    now.getMonth() < lahir.getMonth() ||
    (now.getMonth() === lahir.getMonth() && now.getDate() < lahir.getDate());
  if (belumUlangTahun) usia -= 1;
  return usia;
};

// ===== MAIN COMPONENT =====

export default function DataSiswaPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu] = useState("dataSiswa");

  const [students, setStudents] = useState(initialStudents);
  const [filterKelas, setFilterKelas] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(1);

  const emptyForm = {
    nama: "",
    nis: "",
    nisn: "",
    jenisKelamin: "L",
    kelas: KELAS_OPTIONS[0],
    tempatLahir: "",
    tanggalLahir: "",
    alamat: "",
    namaOrangTua: "",
    noHp: "",
    status: "aktif",
  };
  const [form, setForm] = useState(emptyForm);

  const updateForm = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (student) => {
    setEditingId(student.id);
    setForm({ ...student });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama.trim() || !form.nis.trim()) return;

    if (editingId) {
      setStudents((prev) => prev.map((s) => (s.id === editingId ? { ...form, id: editingId } : s)));
    } else {
      setStudents((prev) => [{ ...form, id: Date.now() }, ...prev]);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => (filterKelas === "all" ? true : s.kelas === filterKelas))
      .filter((s) => (filterStatus === "all" ? true : s.status === filterStatus))
      .filter((s) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          s.nama.toLowerCase().includes(q) ||
          s.nis.includes(q) ||
          s.nisn.includes(q) ||
          s.kelas.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => a.nama.localeCompare(b.nama));
  }, [students, filterKelas, filterStatus, search]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / PAGE_SIZE));
  const pagedStudents = filteredStudents.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changePage = (next) => {
    setPage(Math.min(Math.max(1, next), totalPages));
  };

  const summary = useMemo(() => {
    const total = students.length;
    const aktif = students.filter((s) => s.status === "aktif").length;
    const lakiLaki = students.filter((s) => s.jenisKelamin === "L").length;
    const perempuan = students.filter((s) => s.jenisKelamin === "P").length;
    return { total, aktif, lakiLaki, perempuan };
  }, [students]);

  const notifications = [
    { id: 1, title: "Pengumuman Libur Semester", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Deadline Input Nilai", desc: "Dikirim 5 jam lalu", read: false },
    { id: 3, title: "Jadwal Rapat Diperbarui", desc: "Dikirim 1 hari lalu", read: true },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active={activeMenu}
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={(value) => setSidebarOpen(!value)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          user={{ name: "Bapak/Ibu Guru", email: "guru@smartschool.com", avatar: "G" }}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-5xl mx-auto space-y-6">

            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-indigo-500 text-white shadow-sm">
                    <IdCard size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Data Siswa</h1>
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                    Guru
                  </span>
                </div>
                <p className="text-sm text-slate-500 ml-[52px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400" />
                  Kelola data identitas dan informasi siswa di kelas Anda.
                </p>
              </div>
              <button
                onClick={openAddForm}
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors shadow-sm whitespace-nowrap"
              >
                <Plus size={16} />
                Tambah Siswa
              </button>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg border bg-slate-50 text-slate-600 border-slate-200">
                  <Users size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total Siswa</p>
                  <p className="text-lg font-bold text-slate-800">{summary.total}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg border bg-emerald-50 text-emerald-600 border-emerald-200">
                  <UserRound size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Aktif</p>
                  <p className="text-lg font-bold text-slate-800">{summary.aktif}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg border bg-blue-50 text-blue-600 border-blue-200">
                  <UserRound size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Laki-laki</p>
                  <p className="text-lg font-bold text-slate-800">{summary.lakiLaki}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3">
                <div className="p-2 rounded-lg border bg-pink-50 text-pink-600 border-pink-200">
                  <UserRound size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Perempuan</p>
                  <p className="text-lg font-bold text-slate-800">{summary.perempuan}</p>
                </div>
              </div>
            </div>

            {/* ADD / EDIT FORM (toggle) */}
            {showForm && (
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200/60">
                  <h3 className="text-sm font-semibold text-slate-700">
                    {editingId ? "Edit Data Siswa" : "Tambah Siswa Baru"}
                  </h3>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nama */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Nama Lengkap</label>
                      <input
                        type="text"
                        value={form.nama}
                        onChange={(e) => updateForm({ nama: e.target.value })}
                        required
                        placeholder="Contoh: Rina Amelia"
                        className="w-full px-3.5 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    {/* NIS */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">NIS</label>
                      <input
                        type="text"
                        value={form.nis}
                        onChange={(e) => updateForm({ nis: e.target.value })}
                        required
                        placeholder="2409011"
                        className="w-full px-3.5 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    {/* NISN */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">NISN</label>
                      <input
                        type="text"
                        value={form.nisn}
                        onChange={(e) => updateForm({ nisn: e.target.value })}
                        placeholder="0091234571"
                        className="w-full px-3.5 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    {/* Jenis kelamin */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Jenis Kelamin</label>
                      <div className="flex gap-2">
                        {[
                          { key: "L", label: "Laki-laki" },
                          { key: "P", label: "Perempuan" },
                        ].map((opt) => (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => updateForm({ jenisKelamin: opt.key })}
                            className={`flex-1 px-3 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                              form.jenisKelamin === opt.key
                                ? "bg-indigo-50 text-indigo-600 border-indigo-300"
                                : "bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-600"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Kelas */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Kelas</label>
                      <div className="relative">
                        <select
                          value={form.kelas}
                          onChange={(e) => updateForm({ kelas: e.target.value })}
                          className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors cursor-pointer"
                        >
                          {KELAS_OPTIONS.map((k) => (
                            <option key={k} value={k}>{k}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Tempat lahir */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Tempat Lahir</label>
                      <input
                        type="text"
                        value={form.tempatLahir}
                        onChange={(e) => updateForm({ tempatLahir: e.target.value })}
                        placeholder="Bandung"
                        className="w-full px-3.5 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    {/* Tanggal lahir */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Tanggal Lahir</label>
                      <input
                        type="date"
                        value={form.tanggalLahir}
                        onChange={(e) => updateForm({ tanggalLahir: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    {/* Nama orang tua */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Nama Orang Tua / Wali</label>
                      <input
                        type="text"
                        value={form.namaOrangTua}
                        onChange={(e) => updateForm({ namaOrangTua: e.target.value })}
                        placeholder="Sutrisno Amelia"
                        className="w-full px-3.5 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    {/* No HP */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">No. HP Orang Tua / Wali</label>
                      <input
                        type="text"
                        value={form.noHp}
                        onChange={(e) => updateForm({ noHp: e.target.value })}
                        placeholder="0812-3456-7890"
                        className="w-full px-3.5 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    {/* Alamat */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Alamat</label>
                      <textarea
                        value={form.alamat}
                        onChange={(e) => updateForm({ alamat: e.target.value })}
                        rows={2}
                        placeholder="Jl. Merdeka No. 12, Bandung"
                        className="w-full px-3.5 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">Status</label>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(STATUS).map(([key, cfg]) => {
                        const isActive = form.status === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => updateForm({ status: key })}
                            className={`
                              flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs font-medium transition-all
                              ${isActive ? `${cfg.chip} border-current` : "bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-600"}
                            `}
                          >
                            <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                            {cfg.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingId(null);
                      }}
                      className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors shadow-sm"
                    >
                      <Plus size={16} />
                      {editingId ? "Simpan Perubahan" : "Simpan Siswa"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* FILTER BAR */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 sm:max-w-[160px]">
                  <select
                    value={filterKelas}
                    onChange={(e) => {
                      setFilterKelas(e.target.value);
                      setPage(1);
                    }}
                    className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors cursor-pointer"
                  >
                    <option value="all">Semua Kelas</option>
                    {KELAS_OPTIONS.map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative flex-1 sm:max-w-[160px]">
                  <select
                    value={filterStatus}
                    onChange={(e) => {
                      setFilterStatus(e.target.value);
                      setPage(1);
                    }}
                    className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors cursor-pointer"
                  >
                    <option value="all">Semua Status</option>
                    {Object.entries(STATUS).map(([key, cfg]) => (
                      <option key={key} value={key}>{cfg.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative flex-1">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Cari nama, NIS, NISN, atau kelas..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* STUDENT LIST */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-200/60">
                <h3 className="text-sm font-semibold text-slate-700">
                  Daftar Siswa ({filteredStudents.length})
                </h3>
              </div>

              <div className="divide-y divide-slate-100">
                {pagedStudents.length === 0 && (
                  <div className="p-10 text-center">
                    <Users size={28} className="mx-auto text-slate-300 mb-2" />
                    <p className="text-sm text-slate-400">Belum ada data siswa yang cocok.</p>
                  </div>
                )}

                {pagedStudents.map((student) => {
                  const statusCfg = STATUS[student.status];
                  return (
                    <div key={student.id} className="p-4 sm:p-5 hover:bg-slate-50/60 transition-colors group">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 bg-gradient-to-br ${
                            student.jenisKelamin === "P" ? "from-pink-400 to-rose-500" : "from-blue-400 to-indigo-500"
                          }`}
                        >
                          {initials(student.nama)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold text-slate-800">{student.nama}</span>
                            <span className="text-xs text-slate-400">NIS {student.nis}</span>
                            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border bg-indigo-50 text-indigo-600 border-indigo-200 flex items-center gap-1">
                              <GraduationCap size={11} />
                              Kelas {student.kelas}
                            </span>
                            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${statusCfg.chip}`}>
                              {statusCfg.label}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-slate-500">
                            {student.tanggalLahir && (
                              <span className="flex items-center gap-1">
                                <Cake size={12} className="text-slate-400" />
                                {student.tempatLahir ? `${student.tempatLahir}, ` : ""}
                                {formatTanggal(student.tanggalLahir)} ({hitungUsia(student.tanggalLahir)} th)
                              </span>
                            )}
                            {student.namaOrangTua && (
                              <span className="flex items-center gap-1">
                                <UserRound size={12} className="text-slate-400" />
                                {student.namaOrangTua}
                              </span>
                            )}
                            {student.noHp && (
                              <span className="flex items-center gap-1">
                                <Phone size={12} className="text-slate-400" />
                                {student.noHp}
                              </span>
                            )}
                          </div>

                          {student.alamat && (
                            <p className="text-xs text-slate-400 mt-1 flex items-start gap-1">
                              <MapPin size={12} className="text-slate-400 mt-0.5 flex-shrink-0" />
                              {student.alamat}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => openEditForm(student)}
                            className="p-1.5 rounded-lg text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 transition-colors opacity-0 group-hover:opacity-100"
                            title="Edit data"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
                            className="p-1.5 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
                            title="Hapus data"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* PAGINATION */}
              {filteredStudents.length > 0 && (
                <div className="flex items-center justify-between p-4 sm:p-5 border-t border-slate-200/60">
                  <p className="text-xs text-slate-400">
                    Menampilkan {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, filteredStudents.length)} dari {filteredStudents.length} siswa
                  </p>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => changePage(page - 1)}
                      disabled={page === 1}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft size={15} />
                    </button>
                    <span className="text-xs font-medium text-slate-600 px-2">
                      {page} / {totalPages}
                    </span>
                    <button
                      onClick={() => changePage(page + 1)}
                      disabled={page === totalPages}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}