"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  Calendar,
  Plus,
  Search,
  Edit,
  Trash2,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Save,
  X,
  AlertCircle,
  Check,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

// =========================================================
// DUMMY DATA
// =========================================================
const dummyTahunAjaran = [
  {
    id: 1,
    nama: "2024/2025",
    tanggal_mulai: "2024-07-01",
    tanggal_selesai: "2025-06-30",
    semester: "Ganjil",
    status: "aktif",
    dibuatPada: "2024-06-15T08:00:00Z",
    updatedAt: "2024-07-01T00:00:00Z",
  },
  {
    id: 2,
    nama: "2025/2026",
    tanggal_mulai: "2025-07-01",
    tanggal_selesai: "2026-06-30",
    semester: "Genap",
    status: "nonaktif",
    dibuatPada: "2025-06-15T08:00:00Z",
    updatedAt: "2025-06-15T08:00:00Z",
  },
  {
    id: 3,
    nama: "2023/2024",
    tanggal_mulai: "2023-07-01",
    tanggal_selesai: "2024-06-30",
    semester: "Ganjil",
    status: "nonaktif",
    dibuatPada: "2023-06-15T08:00:00Z",
    updatedAt: "2023-06-15T08:00:00Z",
  },
  {
    id: 4,
    nama: "2026/2027",
    tanggal_mulai: "2026-07-01",
    tanggal_selesai: "2027-06-30",
    semester: "Genap",
    status: "nonaktif",
    dibuatPada: "2026-06-15T08:00:00Z",
    updatedAt: "2026-06-15T08:00:00Z",
  },
];

// =========================================================
// MAIN COMPONENT
// =========================================================
export default function AdminTahunAjaranPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [tahunAjaran, setTahunAjaran] = useState(dummyTahunAjaran);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // =========================================================
  // FORM STATE
  // =========================================================
  const [form, setForm] = useState({
    nama: "",
    tanggal_mulai: "",
    tanggal_selesai: "",
    semester: "Ganjil",
    status: "nonaktif",
  });

  // =========================================================
  // FILTER
  // =========================================================
  const filtered = tahunAjaran.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // =========================================================
  // FORM HANDLERS
  // =========================================================
  const resetForm = () => {
    setForm({
      nama: "",
      tanggal_mulai: "",
      tanggal_selesai: "",
      semester: "Ganjil",
      status: "nonaktif",
    });
    setEditingItem(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({
      nama: item.nama,
      tanggal_mulai: item.tanggal_mulai,
      tanggal_selesai: item.tanggal_selesai,
      semester: item.semester,
      status: item.status,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // =========================================================
  // CRUD
  // =========================================================
  const handleSubmit = () => {
    if (!form.nama.trim() || !form.tanggal_mulai || !form.tanggal_selesai) {
      alert("Semua field wajib diisi!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (editingItem) {
        setTahunAjaran((prev) =>
          prev.map((item) =>
            item.id === editingItem.id
              ? {
                  ...item,
                  ...form,
                  updatedAt: new Date().toISOString(),
                }
              : item
          )
        );
        alert("Tahun ajaran berhasil diperbarui!");
      } else {
        const newItem = {
          id: Date.now(),
          ...form,
          dibuatPada: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setTahunAjaran((prev) => [...prev, newItem]);
        alert("Tahun ajaran berhasil ditambahkan!");
      }

      setLoading(false);
      setShowModal(false);
      resetForm();
    }, 500);
  };

  const handleDelete = (id, nama) => {
    const confirmDelete = window.confirm(`Yakin ingin menghapus tahun ajaran "${nama}"?`);
    if (!confirmDelete) return;

    setTahunAjaran((prev) => prev.filter((item) => item.id !== id));
    alert(`Tahun ajaran "${nama}" berhasil dihapus!`);
  };

  const handleSetActive = (id) => {
    const item = tahunAjaran.find((t) => t.id === id);
    if (!item) return;

    if (item.status === "aktif") {
      alert("Tahun ajaran ini sudah aktif!");
      return;
    }

    const confirmActive = window.confirm(
      `Yakin ingin mengaktifkan tahun ajaran "${item.nama}"?\nTahun ajaran lain akan otomatis dinonaktifkan.`
    );
    if (!confirmActive) return;

    setTahunAjaran((prev) =>
      prev.map((t) => ({
        ...t,
        status: t.id === id ? "aktif" : "nonaktif",
      }))
    );
    alert(`Tahun ajaran "${item.nama}" berhasil diaktifkan!`);
  };

  // =========================================================
  // RENDER
  // =========================================================
  const activeYear = tahunAjaran.find((t) => t.status === "aktif");

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        active="tahunAjaran"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full p-4 md:p-6 lg:p-8">
            <div className="w-full space-y-5">
              {/* ===== HEADER ===== */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-600 text-white shadow-sm flex-shrink-0">
                    <CalendarDays size={18} />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-slate-800">Kelola Tahun Ajaran</h1>
                    <p className="text-sm text-slate-500">
                      Tambah, edit, dan atur tahun ajaran aktif.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {activeYear && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                      <CheckCircle size={14} />
                      Tahun Aktif: {activeYear.nama}
                    </span>
                  )}
                  <button
                    onClick={() => window.location.reload()}
                    className="p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                  >
                    <RefreshCw size={16} className="text-slate-500" />
                  </button>
                  <button
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm whitespace-nowrap"
                  >
                    <Plus size={16} /> Tambah Tahun Ajaran
                  </button>
                </div>
              </div>

              {/* ===== SEARCH ===== */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari tahun ajaran (contoh: 2024/2025)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
                  />
                </div>
              </div>

              {/* ===== TABLE ===== */}
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[20%]">
                          Tahun Ajaran
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[15%]">
                          Semester
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[20%]">
                          Periode
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[12%]">
                          Status
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap w-[33%]">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginated.map((item) => {
                        const isActive = item.status === "aktif";
                        return (
                          <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-4 py-4">
                              <p className="font-semibold text-slate-800 text-sm">
                                {item.nama}
                              </p>
                            </td>
                            <td className="px-4 py-4">
                              <span className="text-sm text-slate-600">
                                {item.semester}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                <Calendar size={13} className="text-slate-400" />
                                {new Date(item.tanggal_mulai).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                                <span className="text-slate-300">→</span>
                                {new Date(item.tanggal_selesai).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <span
                                className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
                                  isActive
                                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                    : "bg-slate-100 text-slate-500 border-slate-200"
                                }`}
                              >
                                {isActive ? (
                                  <CheckCircle size={12} />
                                ) : (
                                  <XCircle size={12} />
                                )}
                                {isActive ? "Aktif" : "Nonaktif"}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex justify-end gap-1.5 flex-wrap">
                                {!isActive && (
                                  <button
                                    onClick={() => handleSetActive(item.id)}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 transition-colors text-xs font-medium"
                                  >
                                    <Check size={14} /> Set Aktif
                                  </button>
                                )}
                                <button
                                  onClick={() => handleOpenEdit(item)}
                                  className="p-1.5 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600 transition-colors"
                                  title="Edit"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  onClick={() => handleDelete(item.id, item.nama)}
                                  className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                                  title="Hapus"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {filtered.length === 0 && (
                  <div className="p-8 text-center">
                    <CalendarDays size={48} className="text-slate-300 mx-auto mb-3" />
                    <p className="text-sm text-slate-500">Tidak ada data tahun ajaran</p>
                    <button
                      onClick={handleOpenAdd}
                      className="mt-3 text-sm text-indigo-600 font-medium hover:text-indigo-700"
                    >
                      Tambah tahun ajaran pertama →
                    </button>
                  </div>
                )}

                {/* ===== PAGINATION ===== */}
                {totalPages > 1 && (
                  <div className="px-4 py-3 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-xs text-slate-500">
                      Menampilkan {paginated.length} dari {filtered.length} data
                    </p>
                    <div className="flex items-center gap-0.5">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Prev
                      </button>
                      {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                            currentPage === i + 1
                              ? "bg-indigo-600 text-white shadow-sm"
                              : "text-slate-500 hover:bg-slate-100"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      {totalPages > 5 && (
                        <>
                          <span className="text-slate-400 px-0.5">…</span>
                          <button
                            onClick={() => setCurrentPage(totalPages)}
                            className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                              currentPage === totalPages
                                ? "bg-indigo-600 text-white shadow-sm"
                                : "text-slate-500 hover:bg-slate-100"
                            }`}
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <footer className="text-center text-[11px] text-slate-400 py-3 border-t border-slate-200/60">
                © 2026 SmartSchool • Kelola Tahun Ajaran
              </footer>
            </div>
          </div>
        </main>
      </div>

      {/* ===== MODAL TAMBAH / EDIT ===== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Header Modal */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {editingItem ? "Edit Tahun Ajaran" : "Tambah Tahun Ajaran"}
                </h3>
                <p className="text-xs text-slate-400">
                  {editingItem
                    ? "Perbarui informasi tahun ajaran"
                    : "Isi data tahun ajaran baru"}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body Modal */}
            <div className="p-6 space-y-4">
              {/* Nama */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Nama Tahun Ajaran <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Contoh: 2024/2025"
                  className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Format: TahunAjaran/TahunAjaran (contoh: 2024/2025)
                </p>
              </div>

              {/* Semester */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Semester <span className="text-rose-500">*</span>
                </label>
                <select
                  name="semester"
                  value={form.semester}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition cursor-pointer text-slate-600"
                >
                  <option value="Ganjil">Ganjil</option>
                  <option value="Genap">Genap</option>
                </select>
              </div>

              {/* Tanggal Mulai & Selesai */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">
                    Tanggal Mulai <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="tanggal_mulai"
                    value={form.tanggal_mulai}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">
                    Tanggal Selesai <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="tanggal_selesai"
                    value={form.tanggal_selesai}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition cursor-pointer text-slate-600"
                >
                  <option value="nonaktif">Nonaktif</option>
                  <option value="aktif">Aktif</option>
                </select>
                <p className="text-[10px] text-amber-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  Jika diaktifkan, tahun ajaran lain akan otomatis dinonaktifkan
                </p>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="flex items-center gap-3 px-6 py-4 border-t border-slate-100 sticky bottom-0 bg-white rounded-b-2xl">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm hover:shadow flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    {editingItem ? "Perbarui" : "Simpan"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}