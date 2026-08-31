"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../../components/Header";
import Sidebar from "../../../../components/Sidebar";

import {
  Warehouse,
  ArrowLeft,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  Package,
  Hash,
  MapPin,
  Building2,
  Users,
  Calendar,
  FileText,
  Plus,
  Layers,
  Tag,
  Box,
} from "lucide-react";

export default function TambahGudangPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    nama: "",
    kategori: "",
    kode_barang: "",
    satuan: "",
    stok: "",
    stok_minimum: "",
    lokasi_rak: "",
    supplier: "",
    deskripsi: "",
  });

  const kategoriOptions = ["ATK", "Kebersihan", "Bahan Praktik", "Konsumsi"];
  const satuanOptions = ["pcs", "pak", "rim", "botol", "liter", "meter", "roll", "galon", "buah", "set", "box"];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nama.trim()) newErrors.nama = "Nama barang wajib diisi";
    if (!formData.kategori) newErrors.kategori = "Kategori wajib dipilih";
    if (!formData.kode_barang.trim()) newErrors.kode_barang = "Kode barang wajib diisi";
    if (!formData.satuan) newErrors.satuan = "Satuan wajib dipilih";
    if (!formData.stok || parseInt(formData.stok) < 0) newErrors.stok = "Stok wajib diisi dengan angka valid";
    if (!formData.stok_minimum || parseInt(formData.stok_minimum) < 0) newErrors.stok_minimum = "Stok minimum wajib diisi";
    if (!formData.lokasi_rak.trim()) newErrors.lokasi_rak = "Lokasi rak wajib diisi";
    if (!formData.supplier.trim()) newErrors.supplier = "Supplier wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    setTimeout(() => {
      console.log("Data barang gudang baru:", formData);
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => {
        router.push("/admin/sarpras/gudang");
      }, 1500);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar
        active="sarprasGudang"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          toggleSidebar={() => setIsCollapsed(!isCollapsed)}
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email: "admin@smartschool.com",
            avatar: "AD",
          }}
        />

        <main className="flex-1 p-3 sm:p-5 lg:p-7 xl:p-8">
          <div className="mx-auto w-full max-w-[1200px] space-y-4 sm:space-y-5 lg:space-y-6">

            {/* BACK BUTTON */}
            <button
              onClick={() => router.push("/admin/sarpras/gudang")}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 group"
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-0.5" />
              Kembali ke Data Gudang
            </button>

            {/* PAGE HEADER */}
            <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
              <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-50/70 blur-3xl" />

              <div className="relative flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-6">
                <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)] sm:h-14 sm:w-14">
                    <Plus size={22} strokeWidth={1.9} className="sm:h-[25px] sm:w-[25px]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-xl font-semibold tracking-[-0.025em] text-slate-900 sm:text-2xl lg:text-[26px]">
                        Tambah Barang Gudang
                      </h1>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-600 sm:px-3 sm:py-1 sm:text-[11px]">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        Sarana & Prasarana
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 sm:gap-2">
                      <Package size={13} className="shrink-0 text-blue-400 sm:h-[14px] sm:w-[14px]" strokeWidth={2} />
                      <p className="text-xs leading-5 text-slate-500 sm:text-sm">
                        Tambahkan barang baru ke inventaris gudang sekolah.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-wrap gap-2 sm:flex-row lg:w-auto">
                  <button
                    type="button"
                    onClick={() => router.push("/admin/sarpras/gudang")}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 shadow-[0_2px_5px_rgba(15,23,42,0.05)] transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 active:scale-[0.98] sm:h-11 sm:px-5"
                  >
                    <X size={16} className="sm:h-[17px] sm:w-[17px]" />
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-[0_7px_18px_rgba(15,23,42,0.16)] transition-all hover:bg-slate-800 hover:shadow-[0_9px_22px_rgba(15,23,42,0.20)] active:scale-[0.98] disabled:opacity-60 sm:h-11 sm:px-5"
                  >
                    <Save size={16} strokeWidth={2.3} className="sm:h-[17px] sm:w-[17px]" />
                    {isSaving ? "Menyimpan..." : "Simpan Barang"}
                  </button>
                </div>
              </div>
            </section>

            {/* SUCCESS MESSAGE */}
            {saved && (
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                <CheckCircle size={18} className="text-emerald-600" />
                <span>Barang berhasil ditambahkan! Mengalihkan ke daftar gudang...</span>
              </div>
            )}

            {/* FORM */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)] p-5 sm:p-6 lg:p-7">
              <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Info size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Informasi Barang</p>
                  <p className="text-xs text-slate-400">Masukkan data barang secara lengkap</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Nama Barang */}
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Nama Barang <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.nama}
                      onChange={(e) => handleChange("nama", e.target.value)}
                      placeholder="Contoh: Kertas HVS A4 80gr"
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                        errors.nama ? "border-rose-300" : "border-slate-200"
                      }`}
                    />
                    {errors.nama && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                        <AlertCircle size={12} />
                        {errors.nama}
                      </p>
                    )}
                  </div>

                  {/* Kategori */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Kategori <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.kategori}
                      onChange={(e) => handleChange("kategori", e.target.value)}
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                        errors.kategori ? "border-rose-300" : "border-slate-200"
                      }`}
                    >
                      <option value="">Pilih Kategori</option>
                      {kategoriOptions.map((k) => (
                        <option key={k} value={k}>{k}</option>
                      ))}
                    </select>
                    {errors.kategori && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                        <AlertCircle size={12} />
                        {errors.kategori}
                      </p>
                    )}
                  </div>

                  {/* Kode Barang */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Kode Barang <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.kode_barang}
                      onChange={(e) => handleChange("kode_barang", e.target.value)}
                      placeholder="Contoh: GDG-ATK-001"
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                        errors.kode_barang ? "border-rose-300" : "border-slate-200"
                      }`}
                    />
                    {errors.kode_barang && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                        <AlertCircle size={12} />
                        {errors.kode_barang}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-slate-400">
                      Format: GDG-KATEGORI-001 (contoh: GDG-ATK-001)
                    </p>
                  </div>

                  {/* Satuan */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Satuan <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.satuan}
                      onChange={(e) => handleChange("satuan", e.target.value)}
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                        errors.satuan ? "border-rose-300" : "border-slate-200"
                      }`}
                    >
                      <option value="">Pilih Satuan</option>
                      {satuanOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.satuan && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                        <AlertCircle size={12} />
                        {errors.satuan}
                      </p>
                    )}
                  </div>

                  {/* Stok */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Stok <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.stok}
                      onChange={(e) => handleChange("stok", e.target.value)}
                      placeholder="0"
                      min="0"
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                        errors.stok ? "border-rose-300" : "border-slate-200"
                      }`}
                    />
                    {errors.stok && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                        <AlertCircle size={12} />
                        {errors.stok}
                      </p>
                    )}
                  </div>

                  {/* Stok Minimum */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Stok Minimum <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.stok_minimum}
                      onChange={(e) => handleChange("stok_minimum", e.target.value)}
                      placeholder="10"
                      min="0"
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                        errors.stok_minimum ? "border-rose-300" : "border-slate-200"
                      }`}
                    />
                    {errors.stok_minimum && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                        <AlertCircle size={12} />
                        {errors.stok_minimum}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-slate-400">
                      Jumlah stok minimum untuk peringatan stok menipis
                    </p>
                  </div>

                  {/* Lokasi Rak */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Lokasi Rak <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.lokasi_rak}
                      onChange={(e) => handleChange("lokasi_rak", e.target.value)}
                      placeholder="Contoh: Rak A1, Gudang Belakang"
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                        errors.lokasi_rak ? "border-rose-300" : "border-slate-200"
                      }`}
                    />
                    {errors.lokasi_rak && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                        <AlertCircle size={12} />
                        {errors.lokasi_rak}
                      </p>
                    )}
                  </div>

                  {/* Supplier */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Supplier <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.supplier}
                      onChange={(e) => handleChange("supplier", e.target.value)}
                      placeholder="Contoh: CV Sumber Kertas"
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                        errors.supplier ? "border-rose-300" : "border-slate-200"
                      }`}
                    />
                    {errors.supplier && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                        <AlertCircle size={12} />
                        {errors.supplier}
                      </p>
                    )}
                  </div>

                  {/* Deskripsi */}
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Deskripsi / Catatan
                    </label>
                    <textarea
                      value={formData.deskripsi}
                      onChange={(e) => handleChange("deskripsi", e.target.value)}
                      rows={3}
                      placeholder="Tambahkan deskripsi atau catatan tambahan tentang barang ini..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* INFO BOX */}
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                  <Info size={17} className="mt-0.5 flex-shrink-0 text-blue-600" />
                  <div>
                    <p className="text-xs font-semibold text-blue-800">Informasi Stok</p>
                    <p className="mt-1 text-xs leading-relaxed text-blue-700">
                      Sistem akan memberikan peringatan jika stok mencapai atau di bawah stok minimum.
                      Pastikan stok minimum diisi dengan benar untuk memudahkan monitoring.
                    </p>
                  </div>
                </div>

                {/* FORM ACTIONS */}
                <div className="flex flex-col-reverse gap-2.5 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-end">
                  <button
                    type="button"
                    onClick={() => router.push("/admin/sarpras/gudang")}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-600 shadow-[0_2px_5px_rgba(15,23,42,0.05)] transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 active:scale-[0.98]"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white shadow-[0_7px_18px_rgba(15,23,42,0.16)] transition-all hover:bg-slate-800 hover:shadow-[0_9px_22px_rgba(15,23,42,0.20)] active:scale-[0.98] disabled:opacity-60"
                  >
                    <Save size={17} strokeWidth={2.3} />
                    {isSaving ? "Menyimpan..." : "Simpan Barang"}
                  </button>
                </div>
              </form>
            </section>

            {/* FOOTER */}
            <div className="border-t border-slate-200/70 pt-4 text-center sm:pt-5">
              <p className="text-xs text-slate-400">© 2026 SmartSchool • Tambah Barang Gudang - Sarana & Prasarana</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}