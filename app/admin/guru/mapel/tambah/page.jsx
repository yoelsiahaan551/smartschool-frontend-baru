"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../../components/Header";
import Sidebar from "../../../../components/Sidebar";
import {
  ArrowLeft,
  BookMarked,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Hash,
  Type,
  ToggleLeft,
  Info,
} from "lucide-react";

import { createMataPelajaran } from "../../../../../services/mapel.service";

function StatusPreviewBadge({ status }) {
  const isActive = status === "aktif";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
        isActive
          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
          : "bg-slate-100 text-slate-500 border border-slate-200"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isActive ? "bg-emerald-500" : "bg-slate-400"
        }`}
      />
      {isActive ? "Aktif" : "Nonaktif"}
    </span>
  );
}

export default function TambahMapelPage() {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const [form, setForm] = useState({
    nama: "",
    kode: "",
    status: "aktif",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nama.trim() || !form.kode.trim()) {
      setError("Nama dan kode mata pelajaran wajib diisi.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const response = await createMataPelajaran({
        nama: form.nama.trim(),
        kode: form.kode.trim(),
        status: form.status,
      });

      if (!response?.success) {
        throw new Error(
          response?.message || "Gagal menambahkan mata pelajaran."
        );
      }

      setSuccess(true);

      setTimeout(() => {
        router.push("/admin/guru/mapel");
      }, 900);
    } catch (err) {
      console.error("Error create mapel:", err);
      setError(err?.message || "Gagal menambahkan mata pelajaran.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        active="guruMapel"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
        role="admin"
      />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email: "admin@smartschool.com",
            avatar: "AD",
          }}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            {/* HEADER */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/admin/guru/mapel")}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors shrink-0"
                title="Kembali ke daftar mapel"
              >
                <ArrowLeft size={20} />
              </button>

              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white shadow-lg shadow-slate-900/10 shrink-0">
                <BookMarked size={20} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  Tambah Mapel
                </h1>
                <p className="text-sm text-slate-500">
                  Isi data mata pelajaran baru untuk ditambahkan ke sekolah.
                </p>
              </div>
            </div>

            {/* SUCCESS */}
            {success && (
              <div className="flex items-center gap-3 p-4 rounded-xl border border-emerald-200 bg-emerald-50">
                <CheckCircle2
                  size={20}
                  className="text-emerald-600 shrink-0"
                />
                <p className="text-sm font-medium text-emerald-800">
                  Mata pelajaran berhasil ditambahkan. Mengalihkan...
                </p>
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div className="flex items-start gap-3 p-4 rounded-xl border border-rose-200 bg-rose-50">
                <AlertCircle
                  size={20}
                  className="text-rose-600 mt-0.5 shrink-0"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-rose-800">
                    Gagal menambahkan mata pelajaran
                  </p>
                  <p className="text-sm text-rose-700 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* KONTEN: FORM + PANEL INFO */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
                  <h2 className="text-sm font-semibold text-slate-700">
                    Detail Mata Pelajaran
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Lengkapi field di bawah ini dengan data yang sesuai.
                  </p>
                </div>

                <div className="p-6 space-y-5">
                  {/* NAMA */}
                  <div>
                    <label
                      htmlFor="nama"
                      className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5"
                    >
                      <Type size={14} className="text-slate-400" />
                      Nama Mata Pelajaran
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="nama"
                      type="text"
                      value={form.nama}
                      onChange={handleChange("nama")}
                      placeholder="Contoh: Matematika"
                      disabled={saving}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800 disabled:bg-slate-50 disabled:text-slate-400"
                    />
                  </div>

                  {/* KODE */}
                  <div>
                    <label
                      htmlFor="kode"
                      className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5"
                    >
                      <Hash size={14} className="text-slate-400" />
                      Kode Mata Pelajaran
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="kode"
                      type="text"
                      value={form.kode}
                      onChange={handleChange("kode")}
                      placeholder="Contoh: MTK-01"
                      disabled={saving}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800 font-mono disabled:bg-slate-50 disabled:text-slate-400"
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      Kode harus unik, tidak boleh sama dengan mata pelajaran lain.
                    </p>
                  </div>

                  {/* STATUS */}
                  <div>
                    <label
                      htmlFor="status"
                      className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5"
                    >
                      <ToggleLeft size={14} className="text-slate-400" />
                      Status
                    </label>
                    <select
                      id="status"
                      value={form.status}
                      onChange={handleChange("status")}
                      disabled={saving}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 bg-white text-slate-800 disabled:bg-slate-50 disabled:text-slate-400"
                    >
                      <option value="aktif">Aktif</option>
                      <option value="nonaktif">Nonaktif</option>
                    </select>
                    <p className="text-xs text-slate-400 mt-1">
                      Mapel nonaktif tidak akan muncul sebagai pilihan saat
                      penjadwalan kelas.
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/60">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#155DFC] hover:bg-[#0d47c9] text-white rounded-xl transition-all shadow-sm font-medium text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <Loader2 size={17} className="animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save size={17} />
                        Simpan Mapel
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push("/admin/guru/mapel")}
                    disabled={saving}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-medium text-sm disabled:opacity-60"
                  >
                    Batal
                  </button>
                </div>
              </form>

              {/* PANEL KANAN: PREVIEW + TIPS */}
              <div className="space-y-6">
                {/* PREVIEW CARD */}
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/60">
                    <h2 className="text-sm font-semibold text-slate-700">
                      Pratinjau
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tampilan mapel ini di daftar setelah disimpan.
                    </p>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-medium text-[#155DFC] bg-[#eaf1ff] px-2 py-1 rounded-md">
                        {form.kode.trim() || "KODE"}
                      </span>
                      <StatusPreviewBadge status={form.status} />
                    </div>
                    <p className="text-base font-semibold text-slate-900">
                      {form.nama.trim() || "Nama mata pelajaran"}
                    </p>
                  </div>
                </div>

                {/* TIPS / INFO */}
                <div className="bg-[#eaf1ff] rounded-xl border border-[#155DFC]/15 p-5">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Info size={16} className="text-[#155DFC]" />
                    <h2 className="text-sm font-semibold text-[#0d47c9]">
                      Tips Pengisian
                    </h2>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside">
                    <li>Gunakan nama lengkap dan baku, contoh "Bahasa Indonesia".</li>
                    <li>Kode sebaiknya singkat dan mudah dikenali, contoh "BIN-01".</li>
                    <li>Set status "Nonaktif" untuk mapel yang sedang tidak dipakai.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}