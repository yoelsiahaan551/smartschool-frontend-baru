"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

import {
  Users,
  ArrowLeft,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Hash,
  UserPlus,
  UserCog,
  Briefcase,
  Building2,
  GraduationCap,
  Award,
  Star,
  BookOpen,
  UserCheck,
} from "lucide-react";

const roleLevels = [
  { level: 1, name: "Kepala Sekolah", icon: Star, color: "bg-purple-100 text-purple-600" },
  { level: 2, name: "Wakil Kepala Sekolah", icon: Award, color: "bg-indigo-100 text-indigo-600" },
  { level: 3, name: "Kepala Jurusan", icon: BookOpen, color: "bg-blue-100 text-blue-600" },
  { level: 4, name: "Koordinator BK", icon: UserCheck, color: "bg-cyan-100 text-cyan-600" },
  { level: 5, name: "Bendahara", icon: Shield, color: "bg-emerald-100 text-emerald-600" },
  { level: 6, name: "Guru", icon: GraduationCap, color: "bg-amber-100 text-amber-600" },
  { level: 7, name: "Wali Kelas", icon: Users, color: "bg-rose-100 text-rose-600" },
  { level: 8, name: "Guru BK", icon: UserCog, color: "bg-violet-100 text-violet-600" },
];

export default function TambahUserPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    phone: "",
    role: "",
    nip: "",
    jenis_kelamin: "",
    tgl_lahir: "",
    alamat: "",
    status: "aktif",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nama.trim()) newErrors.nama = "Nama lengkap wajib diisi";
    if (!formData.email.trim()) newErrors.email = "Email wajib diisi";
    if (!formData.phone.trim()) newErrors.phone = "Nomor telepon wajib diisi";
    if (!formData.role) newErrors.role = "Role wajib dipilih";
    if (!formData.nip.trim()) newErrors.nip = "NIP wajib diisi";
    if (!formData.jenis_kelamin) newErrors.jenis_kelamin = "Jenis kelamin wajib dipilih";
    if (!formData.tgl_lahir) newErrors.tgl_lahir = "Tanggal lahir wajib diisi";
    if (!formData.alamat.trim()) newErrors.alamat = "Alamat wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    setTimeout(() => {
      console.log("Data user baru:", formData);
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => {
        router.push("/admin/kelola-user");
      }, 1500);
    }, 1000);
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
      <Sidebar
        active="kelolaUser"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          toggleSidebar={() => setIsCollapsed(!isCollapsed)}
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email: "admin@smartschool.com",
            avatar: "AD",
          }}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full p-3 sm:p-5 lg:p-7 xl:p-8">
            <div className="mx-auto w-full max-w-[1000px] space-y-4 sm:space-y-5 lg:space-y-6">

              {/* BACK BUTTON */}
              <button
                onClick={() => router.push("/admin/kelola-user")}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 group"
              >
                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-0.5" />
                Kembali ke Daftar User
              </button>

              {/* PAGE HEADER */}
              <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
                <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-50/70 blur-3xl" />

                <div className="relative flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-6">
                  <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)] sm:h-14 sm:w-14">
                      <UserPlus size={22} strokeWidth={1.9} className="sm:h-[25px] sm:w-[25px]" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-xl font-semibold tracking-[-0.025em] text-slate-900 sm:text-2xl lg:text-[26px]">
                          Tambah User
                        </h1>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-600 sm:px-3 sm:py-1 sm:text-[11px]">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                          Level Sekolah
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 sm:gap-2">
                        <UserCog size={13} className="shrink-0 text-blue-400 sm:h-[14px] sm:w-[14px]" strokeWidth={2} />
                        <p className="text-xs leading-5 text-slate-500 sm:text-sm">
                          Tambahkan user baru ke lingkungan sekolah.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full flex-wrap gap-2 sm:flex-row lg:w-auto">
                    <button
                      type="button"
                      onClick={() => router.push("/admin/kelola-user")}
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
                      {isSaving ? "Menyimpan..." : "Simpan User"}
                    </button>
                  </div>
                </div>
              </section>

              {/* SUCCESS MESSAGE */}
              {saved && (
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  <CheckCircle size={18} className="text-emerald-600" />
                  <span>User berhasil ditambahkan! Mengalihkan ke daftar user...</span>
                </div>
              )}

              {/* FORM */}
              <section className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)] p-5 sm:p-6 lg:p-7">
                <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Info size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Informasi User</p>
                    <p className="text-xs text-slate-400">Masukkan data user secara lengkap</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* Nama Lengkap */}
                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-xs font-medium text-slate-700">
                        Nama Lengkap <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={formData.nama}
                          onChange={(e) => handleChange("nama", e.target.value)}
                          placeholder="Contoh: Dr. Ahmad Fauzi, M.Pd."
                          className={`w-full rounded-xl border bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                            errors.nama ? "border-rose-300" : "border-slate-200"
                          }`}
                        />
                      </div>
                      {errors.nama && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                          <AlertCircle size={12} />
                          {errors.nama}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-700">
                        Email <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          placeholder="user@sekolah.sch.id"
                          className={`w-full rounded-xl border bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                            errors.email ? "border-rose-300" : "border-slate-200"
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                          <AlertCircle size={12} />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-700">
                        Nomor Telepon <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          placeholder="0812-3456-7890"
                          className={`w-full rounded-xl border bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                            errors.phone ? "border-rose-300" : "border-slate-200"
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                          <AlertCircle size={12} />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* NIP */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-700">
                        NIP <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Hash size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={formData.nip}
                          onChange={(e) => handleChange("nip", e.target.value)}
                          placeholder="198501012010011001"
                          className={`w-full rounded-xl border bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                            errors.nip ? "border-rose-300" : "border-slate-200"
                          }`}
                        />
                      </div>
                      {errors.nip && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                          <AlertCircle size={12} />
                          {errors.nip}
                        </p>
                      )}
                    </div>

                    {/* Role */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-700">
                        Role <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Shield size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select
                          value={formData.role}
                          onChange={(e) => handleChange("role", e.target.value)}
                          className={`w-full appearance-none rounded-xl border bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-900 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                            errors.role ? "border-rose-300" : "border-slate-200"
                          }`}
                        >
                          <option value="">Pilih Role</option>
                          {roleLevels.map((r) => (
                            <option key={r.level} value={r.name}>
                              Level {r.level} - {r.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={17} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                      {errors.role && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                          <AlertCircle size={12} />
                          {errors.role}
                        </p>
                      )}
                    </div>

                    {/* Jenis Kelamin */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-700">
                        Jenis Kelamin <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex gap-3">
                        {["Laki-laki", "Perempuan"].map((gender) => (
                          <button
                            key={gender}
                            type="button"
                            onClick={() => handleChange("jenis_kelamin", gender)}
                            className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                              formData.jenis_kelamin === gender
                                ? "border-blue-400 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20"
                                : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {gender}
                          </button>
                        ))}
                      </div>
                      {errors.jenis_kelamin && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                          <AlertCircle size={12} />
                          {errors.jenis_kelamin}
                        </p>
                      )}
                    </div>

                    {/* Tanggal Lahir */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-700">
                        Tanggal Lahir <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="date"
                          value={formData.tgl_lahir}
                          onChange={(e) => handleChange("tgl_lahir", e.target.value)}
                          className={`w-full rounded-xl border bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                            errors.tgl_lahir ? "border-rose-300" : "border-slate-200"
                          }`}
                        />
                      </div>
                      {errors.tgl_lahir && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                          <AlertCircle size={12} />
                          {errors.tgl_lahir}
                        </p>
                      )}
                    </div>

                    {/* Status */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-700">
                        Status
                      </label>
                      <div className="flex gap-3">
                        {["aktif", "nonaktif"].map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => handleChange("status", status)}
                            className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                              formData.status === status
                                ? status === "aktif"
                                  ? "border-emerald-300 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-500/20"
                                  : "border-rose-300 bg-rose-50 text-rose-700 ring-2 ring-rose-500/20"
                                : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                            }`}
                          >
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
                      <div className="relative">
                        <MapPin size={17} className="absolute left-3.5 top-3.5 text-slate-400" />
                        <textarea
                          value={formData.alamat}
                          onChange={(e) => handleChange("alamat", e.target.value)}
                          rows={3}
                          placeholder="Jl. Merdeka No. 45, Jakarta Pusat"
                          className={`w-full resize-none rounded-xl border bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                            errors.alamat ? "border-rose-300" : "border-slate-200"
                          }`}
                        />
                      </div>
                      {errors.alamat && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                          <AlertCircle size={12} />
                          {errors.alamat}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* INFO BOX */}
                  <div className="mt-4 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                    <Info size={17} className="mt-0.5 flex-shrink-0 text-blue-600" />
                    <div>
                      <p className="text-xs font-semibold text-blue-800">Informasi Role Level</p>
                      <p className="mt-1 text-xs leading-relaxed text-blue-700">
                        Role level menentukan hak akses user di sistem. Pastikan memilih role yang sesuai dengan jabatan user.
                      </p>
                    </div>
                  </div>

                  {/* ROLE LEVEL REFERENCE */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                    <p className="text-xs font-semibold text-slate-700 mb-3">Referensi Role Level</p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {roleLevels.map((role) => {
                        const Icon = role.icon;
                        return (
                          <div
                            key={role.level}
                            className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 ${role.color} bg-opacity-20 border border-slate-200`}
                          >
                            <Icon size={14} />
                            <span className="text-[10px] font-medium text-slate-700">
                              {role.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* FORM ACTIONS */}
                  <div className="flex flex-col-reverse gap-2.5 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-end">
                    <button
                      type="button"
                      onClick={() => router.push("/admin/kelola-user")}
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
                      {isSaving ? "Menyimpan..." : "Simpan User"}
                    </button>
                  </div>
                </form>
              </section>

              {/* FOOTER */}
              <footer className="border-t border-slate-200/70 pt-4 text-center sm:pt-5">
                <p className="text-xs text-slate-400">© 2026 SmartSchool • Tambah User - Level Sekolah</p>
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// =========================================================
// COMPONENT: ChevronDown untuk Select
// =========================================================
function ChevronDown({ size = 17, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}