"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  Plus,
  Pencil,
  Trash2,
  ChevronRight,
  X,
  Search,
  GripVertical,
} from "lucide-react";

// =========================================================
// DUMMY DATA — nanti tinggal disambungkan ke API PPDB kamu
// =========================================================

const initialJalur = [
  {
    id: 1,
    nama: "Jalur Reguler",
    deskripsi: "Jalur umum berdasarkan nilai rapor dan hasil tes seleksi.",
    kuota: 700,
    pendaftar: 601,
    persyaratan: ["Nilai rapor semester 1-5", "Kartu Keluarga", "Ijazah/SKL"],
    color: "#3B82F6",
    status: "Aktif",
  },
  {
    id: 2,
    nama: "Jalur Prestasi",
    deskripsi: "Bagi calon peserta didik dengan prestasi akademik maupun non-akademik.",
    kuota: 450,
    pendaftar: 412,
    persyaratan: ["Sertifikat prestasi", "Nilai rapor", "Surat rekomendasi sekolah"],
    color: "#D97706",
    status: "Aktif",
  },
  {
    id: 3,
    nama: "Jalur Afirmasi",
    deskripsi: "Diperuntukkan bagi keluarga tidak mampu dan penyandang disabilitas.",
    kuota: 200,
    pendaftar: 178,
    persyaratan: ["Kartu Keluarga Sejahtera (KKS)", "Surat keterangan tidak mampu"],
    color: "#E11D48",
    status: "Aktif",
  },
  {
    id: 4,
    nama: "Jalur Mutasi",
    deskripsi: "Bagi peserta didik pindahan mengikuti perpindahan tugas orang tua/wali.",
    kuota: 60,
    pendaftar: 57,
    persyaratan: ["Surat pindah tugas orang tua", "Rapor sekolah asal"],
    color: "#7C3AED",
    status: "Nonaktif",
  },
];

const STATUS_STYLES = {
  Aktif: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Nonaktif: "bg-slate-100 text-slate-500 border-slate-200",
};

const STATUS_FILTERS = ["Semua", "Aktif", "Nonaktif"];

function formatRupiah(n) {
  return n.toLocaleString("id-ID");
}

function emptyForm() {
  return {
    id: null,
    nama: "",
    deskripsi: "",
    kuota: "",
    persyaratan: "",
    color: "#3B82F6",
    status: "Aktif",
  };
}

const PRESET_COLORS = ["#3B82F6", "#D97706", "#E11D48", "#7C3AED", "#059669", "#0EA5E9"];

export default function JalurPPDBPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [jalurList, setJalurList] = useState(initialJalur);
  const [activeStatus, setActiveStatus] = useState("Semua");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [deleteTarget, setDeleteTarget] = useState(null);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const filtered = jalurList.filter((j) => {
    const matchStatus = activeStatus === "Semua" || j.status === activeStatus;
    const matchSearch = j.nama.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalKuota = jalurList.reduce((a, j) => a + j.kuota, 0);
  const totalPendaftar = jalurList.reduce((a, j) => a + j.pendaftar, 0);
  const aktifCount = jalurList.filter((j) => j.status === "Aktif").length;

  const openTambah = () => {
    setForm(emptyForm());
    setShowModal(true);
  };

  const openEdit = (j) => {
    setForm({
      id: j.id,
      nama: j.nama,
      deskripsi: j.deskripsi,
      kuota: j.kuota,
      persyaratan: j.persyaratan.join("\n"),
      color: j.color,
      status: j.status,
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama || !form.kuota) return;

    const persyaratanList = form.persyaratan
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);

    if (form.id) {
      setJalurList((prev) =>
        prev.map((j) =>
          j.id === form.id
            ? {
                ...j,
                nama: form.nama,
                deskripsi: form.deskripsi,
                kuota: Number(form.kuota),
                persyaratan: persyaratanList,
                color: form.color,
                status: form.status,
              }
            : j
        )
      );
    } else {
      setJalurList((prev) => [
        ...prev,
        {
          id: Date.now(),
          nama: form.nama,
          deskripsi: form.deskripsi,
          kuota: Number(form.kuota),
          pendaftar: 0,
          persyaratan: persyaratanList,
          color: form.color,
          status: form.status,
        },
      ]);
    }
    setShowModal(false);
  };

  const confirmDelete = () => {
    setJalurList((prev) => prev.filter((j) => j.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="flex h-screen w-full bg-[#EEF0F2] overflow-hidden">
      <Sidebar
        role="adminPPDB"
        active="jalur"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{ name: "Admin PPDB", email: "adminppdb@smartschool.com", avatar: "PP" }}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full p-4 md:p-6 lg:p-8">
            <div className="w-full space-y-5 max-w-[1320px] mx-auto">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>PPDB</span>
                <ChevronRight size={12} />
                <span className="text-slate-600 font-medium">Jalur Pendaftaran</span>
              </div>

              {/* ===== KARTU RINGKASAN ===== */}
              <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5">
                  <p className="text-xs text-slate-400">Total Jalur</p>
                  <p className="text-2xl font-bold text-slate-800 mt-2">
                    {jalurList.length}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5">
                  <p className="text-xs text-slate-400">Jalur Aktif</p>
                  <p className="text-2xl font-bold text-emerald-500 mt-2">
                    {aktifCount}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5">
                  <p className="text-xs text-slate-400">Total Kuota</p>
                  <p className="text-2xl font-bold text-slate-800 mt-2">
                    {formatRupiah(totalKuota)}
                  </p>
                </div>
                <div className="bg-[#F6F7F8] rounded-xl p-5 flex flex-col items-center justify-center text-center">
                  <p className="text-xs text-slate-400">Kuota Terisi</p>
                  <p className="text-3xl font-bold text-slate-500 mt-3">
                    {totalKuota > 0 ? Math.round((totalPendaftar / totalKuota) * 100) : 0}%
                  </p>
                </div>
              </section>

              {/* ===== PANEL UTAMA ===== */}
              <section className="bg-white rounded-xl overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-5">
                    {STATUS_FILTERS.map((f) => (
                      <button
                        key={f}
                        onClick={() => setActiveStatus(f)}
                        className={`relative pb-2.5 text-sm font-medium transition-colors ${
                          activeStatus === f
                            ? "text-blue-600"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {f}
                        {activeStatus === f && (
                          <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-blue-600 rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500 border border-slate-200 rounded-md px-3 py-1.5">
                      <Search size={13} className="text-slate-400" />
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari jalur..."
                        className="outline-none bg-transparent placeholder:text-slate-400 w-32"
                      />
                    </div>
                    <button
                      onClick={openTambah}
                      className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3.5 py-2 rounded-md transition-colors"
                    >
                      <Plus size={14} />
                      Tambah Jalur
                    </button>
                  </div>
                </div>

                {/* ===== DAFTAR JALUR (CARD GRID) ===== */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
                  {filtered.length === 0 && (
                    <p className="text-center text-slate-400 text-sm col-span-2 py-10">
                      Tidak ada jalur ditemukan.
                    </p>
                  )}
                  {filtered.map((j) => {
                    const persen = j.kuota > 0 ? Math.min(100, Math.round((j.pendaftar / j.kuota) * 100)) : 0;
                    return (
                      <div
                        key={j.id}
                        className="border border-slate-100 rounded-xl p-4 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-3 h-3 rounded-full flex-shrink-0"
                              style={{ backgroundColor: j.color }}
                            />
                            <h4 className="text-sm font-semibold text-slate-700">{j.nama}</h4>
                          </div>
                          <span
                            className={`text-[11px] font-medium px-2.5 py-1 rounded-full border flex-shrink-0 ${STATUS_STYLES[j.status]}`}
                          >
                            {j.status}
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                          {j.deskripsi}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {j.persyaratan.map((p, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] text-slate-500 bg-slate-50 border border-slate-100 rounded-full px-2 py-1"
                            >
                              {p}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 mt-4">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${persen}%`, backgroundColor: j.color }}
                            />
                          </div>
                          <span className="text-xs text-slate-500 font-mono tabular-nums whitespace-nowrap">
                            {j.pendaftar}/{j.kuota}
                          </span>
                        </div>

                        <div className="flex items-center justify-end gap-2 mt-3.5 pt-3 border-t border-slate-50">
                          <button
                            onClick={() => openEdit(j)}
                            className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md transition-colors"
                          >
                            <Pencil size={12} />
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteTarget(j)}
                            className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-600 hover:bg-rose-50 px-2 py-1 rounded-md transition-colors"
                          >
                            <Trash2 size={12} />
                            Hapus
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <footer className="text-center text-[11px] text-slate-400 py-3">
                © 2026 SmartSchool &middot; Dashboard Admin PPDB &middot; All rights reserved
              </footer>
            </div>
          </div>
        </main>
      </div>

      {/* ===== MODAL TAMBAH/EDIT ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-semibold text-slate-800">
                {form.id ? "Edit Jalur" : "Tambah Jalur"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Nama Jalur</label>
                <input
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  placeholder="Contoh: Jalur Zonasi"
                  className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-blue-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 mb-1 block">Deskripsi</label>
                <textarea
                  value={form.deskripsi}
                  onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                  placeholder="Penjelasan singkat mengenai jalur ini"
                  rows={2}
                  className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-blue-400 resize-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 mb-1 block">Kuota</label>
                <input
                  type="number"
                  min="0"
                  value={form.kuota}
                  onChange={(e) => setForm({ ...form, kuota: e.target.value })}
                  placeholder="500"
                  className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-blue-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 mb-1 block">
                  Persyaratan <span className="text-slate-350">(satu per baris)</span>
                </label>
                <textarea
                  value={form.persyaratan}
                  onChange={(e) => setForm({ ...form, persyaratan: e.target.value })}
                  placeholder={"Kartu Keluarga\nNilai rapor semester 1-5"}
                  rows={3}
                  className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-blue-400 resize-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 mb-1 block">Warna Label</label>
                <div className="flex items-center gap-2">
                  {PRESET_COLORS.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setForm({ ...form, color: c })}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        form.color === c ? "scale-110 border-slate-400" : "border-transparent"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 mb-1 block">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 outline-none focus:border-blue-400 bg-white"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-xs font-medium text-slate-500 hover:text-slate-700 px-4 py-2"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  {form.id ? "Simpan Perubahan" : "Tambah Jalur"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== MODAL KONFIRMASI HAPUS ===== */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-sm p-6">
            <h3 className="text-sm font-semibold text-slate-800 mb-2">Hapus Jalur?</h3>
            <p className="text-xs text-slate-500 mb-5">
              Jalur <span className="font-medium text-slate-700">{deleteTarget.nama}</span> akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="text-xs font-medium text-slate-500 hover:text-slate-700 px-4 py-2"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="text-xs font-medium bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md transition-colors"
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