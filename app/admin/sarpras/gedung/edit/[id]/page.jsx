"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "../../../../../components/Header";
import Sidebar from "../../../../../components/Sidebar";

import {
  Building,
  ArrowLeft,
  Save,
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Edit,
} from "lucide-react";

// Data dummy untuk demo
const dummyData = [
  { id: 1, nama: "Gedung A", kode: "A", status: "aktif", deskripsi: "Gedung utama perkantoran dan ruang teori", alamat: "Jl. Merdeka No. 1, Jakarta Pusat", luas: "500", tahunBerdiri: "2010", jumlahLantai: 3, kapasitas: "300" },
  { id: 2, nama: "Gedung B", kode: "B", status: "aktif", deskripsi: "Gedung laboratorium dan praktikum", alamat: "Jl. Merdeka No. 2, Jakarta Pusat", luas: "400", tahunBerdiri: "2012", jumlahLantai: 2, kapasitas: "200" },
  { id: 3, nama: "Gedung C", kode: "C", status: "aktif", deskripsi: "Gedung perpustakaan dan aula", alamat: "Jl. Merdeka No. 3, Jakarta Pusat", luas: "350", tahunBerdiri: "2015", jumlahLantai: 1, kapasitas: "150" },
  { id: 4, nama: "Gedung D", kode: "D", status: "nonaktif", deskripsi: "Gedung serba guna (renovasi)", alamat: "Jl. Merdeka No. 4, Jakarta Pusat", luas: "600", tahunBerdiri: "2008", jumlahLantai: 4, kapasitas: "400" },
  { id: 5, nama: "Gedung E", kode: "E", status: "aktif", deskripsi: "Gedung workshop dan ruang kreatif", alamat: "Jl. Merdeka No. 5, Jakarta Pusat", luas: "300", tahunBerdiri: "2018", jumlahLantai: 2, kapasitas: "180" },
  { id: 6, nama: "Gedung F", kode: "F", status: "aktif", deskripsi: "Gedung olahraga dan kegiatan ekstrakurikuler", alamat: "Jl. Merdeka No. 6, Jakarta Pusat", luas: "800", tahunBerdiri: "2020", jumlahLantai: 1, kapasitas: "500" },
];

export default function EditGedungPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    nama: "",
    kode: "",
    status: "aktif",
    deskripsi: "",
    alamat: "",
    luas: "",
    tahunBerdiri: "",
    jumlahLantai: 1,
    kapasitas: "",
  });

  useEffect(() => {
    // Simulasi loading data
    setTimeout(() => {
      const data = dummyData.find((item) => item.id === parseInt(id));
      if (data) {
        setFormData({
          nama: data.nama || "",
          kode: data.kode || "",
          status: data.status || "aktif",
          deskripsi: data.deskripsi || "",
          alamat: data.alamat || "",
          luas: data.luas || "",
          tahunBerdiri: data.tahunBerdiri || "",
          jumlahLantai: data.jumlahLantai || 1,
          kapasitas: data.kapasitas || "",
        });
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nama.trim()) newErrors.nama = "Nama gedung wajib diisi";
    if (!formData.kode.trim()) newErrors.kode = "Kode gedung wajib diisi";
    if (!formData.alamat.trim()) newErrors.alamat = "Alamat wajib diisi";
    if (!formData.luas.trim()) newErrors.luas = "Luas gedung wajib diisi";
    if (!formData.tahunBerdiri.trim()) newErrors.tahunBerdiri = "Tahun berdiri wajib diisi";
    if (!formData.kapasitas.trim()) newErrors.kapasitas = "Kapasitas wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    setTimeout(() => {
      console.log("Data gedung diupdate:", { id, ...formData });
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => {
        router.push("/admin/sarpras/gedung");
      }, 1500);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[#f8fafc]">
        <Sidebar active="sarpras" setActive={() => {}} collapsed={isCollapsed} setCollapsed={setIsCollapsed} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header toggleSidebar={() => setIsCollapsed(!isCollapsed)} notifications={[]} user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }} />
          <main className="flex-1 p-8">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-slate-500">Memuat data gedung...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar
        active="sarpras"
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
              onClick={() => router.push("/admin/sarpras/gedung")}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-amber-600 group"
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-0.5" />
              Kembali ke Daftar Gedung
            </button>

            {/* PAGE HEADER */}
            <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
              <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-amber-50/70 blur-3xl" />

              <div className="relative flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-6">
                <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-[0_8px_20px_rgba(245,158,11,0.25)] sm:h-14 sm:w-14">
                    <Edit size={22} strokeWidth={1.9} className="sm:h-[25px] sm:w-[25px]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-xl font-semibold tracking-[-0.025em] text-slate-900 sm:text-2xl lg:text-[26px]">
                        Edit Gedung
                      </h1>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold text-amber-600 sm:px-3 sm:py-1 sm:text-[11px]">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        ID: #{id}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 sm:gap-2">
                      <Building size={13} className="shrink-0 text-amber-400 sm:h-[14px] sm:w-[14px]" strokeWidth={2} />
                      <p className="text-xs leading-5 text-slate-500 sm:text-sm">
                        Perbarui informasi gedung yang ada di sistem.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-wrap gap-2 sm:flex-row lg:w-auto">
                  <button
                    type="button"
                    onClick={() => router.push("/admin/sarpras/gedung")}
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
                    {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>
                </div>
              </div>
            </section>

            {/* SUCCESS MESSAGE */}
            {saved && (
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                <CheckCircle size={18} className="text-emerald-600" />
                <span>Perubahan gedung berhasil disimpan! Mengalihkan ke daftar gedung...</span>
              </div>
            )}

            {/* FORM */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)] p-5 sm:p-6 lg:p-7">
              <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Info size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Informasi Gedung</p>
                  <p className="text-xs text-slate-400">Perbarui data gedung secara lengkap</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Nama Gedung */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Nama Gedung <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.nama}
                      onChange={(e) => handleChange("nama", e.target.value)}
                      placeholder="Contoh: Gedung Utama"
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10 ${
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

                  {/* Kode Gedung */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Kode Gedung <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.kode}
                      onChange={(e) => handleChange("kode", e.target.value)}
                      placeholder="Contoh: A, B, C"
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10 ${
                        errors.kode ? "border-rose-300" : "border-slate-200"
                      }`}
                    />
                    {errors.kode && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                        <AlertCircle size={12} />
                        {errors.kode}
                      </p>
                    )}
                  </div>

                  {/* Jumlah Lantai */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Jumlah Lantai
                    </label>
                    <select
                      value={formData.jumlahLantai}
                      onChange={(e) => handleChange("jumlahLantai", parseInt(e.target.value))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>{num} Lantai</option>
                      ))}
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Status
                    </label>
                    <div className="flex flex-wrap items-center gap-2">
                      {["aktif", "nonaktif"].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => handleChange("status", status)}
                          className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-medium transition-all ${
                            formData.status === status
                              ? status === "aktif"
                                ? "border-emerald-300 bg-emerald-50 text-emerald-700 shadow-[0_2px_8px_rgba(16,185,129,0.15)]"
                                : "border-rose-300 bg-rose-50 text-rose-700 shadow-[0_2px_8px_rgba(244,63,94,0.15)]"
                              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {status === "aktif" ? (
                            <CheckCircle size={14} />
                          ) : (
                            <XCircle size={14} />
                          )}
                          {status === "aktif" ? "Aktif" : "Nonaktif"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Alamat */}
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Alamat <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.alamat}
                      onChange={(e) => handleChange("alamat", e.target.value)}
                      placeholder="Contoh: Jl. Pendidikan No. 123, Jakarta"
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10 ${
                        errors.alamat ? "border-rose-300" : "border-slate-200"
                      }`}
                    />
                    {errors.alamat && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                        <AlertCircle size={12} />
                        {errors.alamat}
                      </p>
                    )}
                  </div>

                  {/* Luas Gedung */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Luas Gedung (m²) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.luas}
                      onChange={(e) => handleChange("luas", e.target.value)}
                      placeholder="Contoh: 500"
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10 ${
                        errors.luas ? "border-rose-300" : "border-slate-200"
                      }`}
                    />
                    {errors.luas && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                        <AlertCircle size={12} />
                        {errors.luas}
                      </p>
                    )}
                  </div>

                  {/* Tahun Berdiri */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Tahun Berdiri <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.tahunBerdiri}
                      onChange={(e) => handleChange("tahunBerdiri", e.target.value)}
                      placeholder="Contoh: 2010"
                      min="1900"
                      max={new Date().getFullYear()}
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10 ${
                        errors.tahunBerdiri ? "border-rose-300" : "border-slate-200"
                      }`}
                    />
                    {errors.tahunBerdiri && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                        <AlertCircle size={12} />
                        {errors.tahunBerdiri}
                      </p>
                    )}
                  </div>

                  {/* Kapasitas */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Kapasitas (orang) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.kapasitas}
                      onChange={(e) => handleChange("kapasitas", e.target.value)}
                      placeholder="Contoh: 200"
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10 ${
                        errors.kapasitas ? "border-rose-300" : "border-slate-200"
                      }`}
                    />
                    {errors.kapasitas && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                        <AlertCircle size={12} />
                        {errors.kapasitas}
                      </p>
                    )}
                  </div>

                  {/* Deskripsi */}
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Deskripsi
                    </label>
                    <textarea
                      value={formData.deskripsi}
                      onChange={(e) => handleChange("deskripsi", e.target.value)}
                      rows={4}
                      placeholder="Tambahkan deskripsi lengkap tentang gedung ini..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
                    />
                  </div>
                </div>

                {/* FORM ACTIONS */}
                <div className="flex flex-col-reverse gap-2.5 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-end">
                  <button
                    type="button"
                    onClick={() => router.push("/admin/sarpras/gedung")}
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
                    {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>
                </div>
              </form>
            </section>

            {/* FOOTER */}
            <div className="border-t border-slate-200/70 pt-4 text-center sm:pt-5">
              <p className="text-xs text-slate-400">© 2026 SmartSchool • Edit Gedung - Sarana & Prasarana</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}