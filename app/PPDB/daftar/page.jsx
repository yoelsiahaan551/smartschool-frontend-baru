"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Check,
  UploadCloud,
  MapPin,
  Sparkles,
  Users,
  FileCheck2,
  User,
  FileText,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

// ===== DUMMY DATA =====
// Catatan: ganti dengan data asli dari API/DB begitu tersedia.

const steps = [
  { id: 1, label: "Buat Akun", icon: User },
  { id: 2, label: "Lengkapi Berkas", icon: FileText },
  { id: 3, label: "Pilih Jalur & Sekolah", icon: ClipboardList },
  { id: 4, label: "Review", icon: ShieldCheck },
];

const jalurOptions = [
  { id: "zonasi", title: "Jalur Zonasi", desc: "Domisili dalam radius zona sekolah sesuai KK.", icon: MapPin, color: "blue" },
  { id: "prestasi", title: "Jalur Prestasi", desc: "Prestasi akademik/non-akademik bersertifikat.", icon: Sparkles, color: "amber" },
  { id: "afirmasi", title: "Jalur Afirmasi", desc: "Keluarga kurang mampu / penyandang disabilitas.", icon: Users, color: "emerald" },
  { id: "pindahan", title: "Jalur Perpindahan Tugas", desc: "Mengikuti perpindahan tugas orang tua/wali.", icon: FileCheck2, color: "rose" },
];

const sekolahOptions = [
  "SMA Negeri 1 SmartSchool",
  "SMA Negeri 2 SmartSchool",
  "SMA Negeri 3 SmartSchool",
];

const dokumenList = [
  { id: "kk", label: "Kartu Keluarga (KK)" },
  { id: "akta", label: "Akta Kelahiran" },
  { id: "rapor", label: "Fotokopi Rapor Kelas Terakhir" },
  { id: "foto", label: "Pas Foto 3x4" },
];

const colorMap = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", ring: "ring-blue-500" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", ring: "ring-amber-500" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", ring: "ring-emerald-500" },
  rose: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-200", ring: "ring-rose-500" },
};

export default function DaftarPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    nik: "",
    namaSiswa: "",
    namaOrtu: "",
    email: "",
    telepon: "",
    password: "",
    jalur: "",
    sekolah: "",
  });
  const [uploaded, setUploaded] = useState({});
  const [errors, setErrors] = useState({});

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!form.nik || form.nik.length < 16) newErrors.nik = "NIK harus 16 digit";
      if (!form.namaSiswa) newErrors.namaSiswa = "Nama calon siswa wajib diisi";
      if (!form.namaOrtu) newErrors.namaOrtu = "Nama orang tua/wali wajib diisi";
      if (!form.email) newErrors.email = "Email wajib diisi";
      if (!form.password || form.password.length < 6) newErrors.password = "Minimal 6 karakter";
    }
    if (step === 2) {
      dokumenList.forEach((d) => {
        if (!uploaded[d.id]) newErrors[d.id] = "Dokumen wajib diunggah";
      });
    }
    if (step === 3) {
      if (!form.jalur) newErrors.jalur = "Pilih salah satu jalur";
      if (!form.sekolah) newErrors.sekolah = "Pilih sekolah tujuan";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((s) => Math.min(s + 1, steps.length));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    setCurrentStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = () => {
    // Catatan: kirim `form` + `uploaded` ke API pendaftaran di sini.
    router.push("/PPDB/daftar/berhasil");
  };

  const handleFileChange = (id, file) => {
    if (!file) return;
    setUploaded((u) => ({ ...u, [id]: file.name }));
    setErrors((e) => ({ ...e, [id]: undefined }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => router.push("/PPDB")}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={16} />
            Kembali
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 rounded-lg bg-blue-600 text-white flex-shrink-0">
              <GraduationCap size={16} />
            </div>
            <span className="text-sm font-semibold text-slate-800 truncate">Formulir Pendaftaran</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* STEPPER */}
        <div className="mb-8">
          <div className="flex items-center">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              const isActive = s.id === currentStep;
              const isDone = s.id < currentStep;
              return (
                <div key={s.id} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                        isDone
                          ? "bg-blue-600 text-white"
                          : isActive
                          ? "bg-blue-600 text-white ring-4 ring-blue-100"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {isDone ? <Check size={15} /> : <Icon size={15} />}
                    </div>
                    <span
                      className={`hidden sm:block text-[11px] font-medium text-center max-w-[80px] ${
                        isActive ? "text-slate-800" : "text-slate-400"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {idx !== steps.length - 1 && (
                    <div className={`h-px flex-1 mx-2 ${isDone ? "bg-blue-600" : "bg-slate-200"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-8">
          {/* STEP 1 — BUAT AKUN */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-800">Buat Akun</h2>
              <p className="mt-1 text-sm text-slate-500">
                Gunakan NIK dan data orang tua/wali yang valid sesuai Kartu Keluarga.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="NIK Calon Siswa" error={errors.nik}>
                  <input
                    value={form.nik}
                    onChange={(e) => update("nik", e.target.value.replace(/\D/g, ""))}
                    maxLength={16}
                    placeholder="16 digit NIK"
                    className={inputClass(errors.nik)}
                  />
                </Field>
                <Field label="Nama Calon Siswa" error={errors.namaSiswa}>
                  <input
                    value={form.namaSiswa}
                    onChange={(e) => update("namaSiswa", e.target.value)}
                    placeholder="Nama lengkap sesuai akta"
                    className={inputClass(errors.namaSiswa)}
                  />
                </Field>
                <Field label="Nama Orang Tua/Wali" error={errors.namaOrtu}>
                  <input
                    value={form.namaOrtu}
                    onChange={(e) => update("namaOrtu", e.target.value)}
                    placeholder="Nama lengkap orang tua/wali"
                    className={inputClass(errors.namaOrtu)}
                  />
                </Field>
                <Field label="Nomor Telepon" error={errors.telepon}>
                  <input
                    value={form.telepon}
                    onChange={(e) => update("telepon", e.target.value.replace(/\D/g, ""))}
                    placeholder="08xxxxxxxxxx"
                    className={inputClass(errors.telepon)}
                  />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="nama@email.com"
                    className={inputClass(errors.email)}
                  />
                </Field>
                <Field label="Password" error={errors.password}>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className={inputClass(errors.password)}
                  />
                </Field>
              </div>
            </div>
          )}

          {/* STEP 2 — LENGKAPI BERKAS */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-800">Lengkapi Berkas</h2>
              <p className="mt-1 text-sm text-slate-500">
                Unggah dokumen dalam format JPG/PNG/PDF, maksimal 2MB per file.
              </p>
              <div className="mt-6 space-y-3">
                {dokumenList.map((d) => (
                  <label
                    key={d.id}
                    className={`flex items-center justify-between gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                      errors[d.id]
                        ? "border-rose-300 bg-rose-50/40"
                        : uploaded[d.id]
                        ? "border-emerald-200 bg-emerald-50/40"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          uploaded[d.id] ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {uploaded[d.id] ? <Check size={16} /> : <UploadCloud size={16} />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800">{d.label}</p>
                        <p className="text-xs text-slate-500 truncate">
                          {uploaded[d.id] ? uploaded[d.id] : errors[d.id] ? errors[d.id] : "Belum ada file dipilih"}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-blue-600 flex-shrink-0">
                      {uploaded[d.id] ? "Ganti" : "Unggah"}
                    </span>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(d.id, e.target.files?.[0])}
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 — PILIH JALUR & SEKOLAH */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-800">Pilih Jalur & Sekolah</h2>
              <p className="mt-1 text-sm text-slate-500">Tentukan jalur pendaftaran sesuai kondisi calon siswa.</p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {jalurOptions.map((j) => {
                  const Icon = j.icon;
                  const c = colorMap[j.color];
                  const selected = form.jalur === j.id;
                  return (
                    <button
                      type="button"
                      key={j.id}
                      onClick={() => update("jalur", j.id)}
                      className={`text-left rounded-xl border p-4 transition-all ${
                        selected ? `${c.border} ring-2 ${c.ring} bg-white` : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg ${c.bg} ${c.text} flex items-center justify-center`}>
                        <Icon size={16} />
                      </div>
                      <p className="mt-2.5 text-sm font-semibold text-slate-800">{j.title}</p>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed">{j.desc}</p>
                    </button>
                  );
                })}
              </div>
              {errors.jalur && <p className="mt-2 text-xs text-rose-500">{errors.jalur}</p>}

              <div className="mt-6">
                <Field label="Sekolah Tujuan" error={errors.sekolah}>
                  <select
                    value={form.sekolah}
                    onChange={(e) => update("sekolah", e.target.value)}
                    className={inputClass(errors.sekolah)}
                  >
                    <option value="">Pilih sekolah</option>
                    {sekolahOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>
          )}

          {/* STEP 4 — REVIEW */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-800">Review Pendaftaran</h2>
              <p className="mt-1 text-sm text-slate-500">Periksa kembali data sebelum mengirim pendaftaran.</p>

              <div className="mt-6 space-y-4">
                <ReviewGroup title="Data Akun">
                  <ReviewRow label="NIK" value={form.nik || "-"} />
                  <ReviewRow label="Nama Calon Siswa" value={form.namaSiswa || "-"} />
                  <ReviewRow label="Nama Orang Tua/Wali" value={form.namaOrtu || "-"} />
                  <ReviewRow label="Email" value={form.email || "-"} />
                  <ReviewRow label="Telepon" value={form.telepon || "-"} />
                </ReviewGroup>

                <ReviewGroup title="Dokumen">
                  {dokumenList.map((d) => (
                    <ReviewRow key={d.id} label={d.label} value={uploaded[d.id] || "-"} />
                  ))}
                </ReviewGroup>

                <ReviewGroup title="Jalur & Sekolah">
                  <ReviewRow
                    label="Jalur"
                    value={jalurOptions.find((j) => j.id === form.jalur)?.title || "-"}
                  />
                  <ReviewRow label="Sekolah Tujuan" value={form.sekolah || "-"} />
                </ReviewGroup>
              </div>

              <label className="mt-6 flex items-start gap-2.5 text-sm text-slate-600">
                <input type="checkbox" required className="mt-0.5" />
                <span>Saya menyatakan data yang diisi sudah benar dan bertanggung jawab atas kebenarannya.</span>
              </label>
            </div>
          )}

          {/* NAVIGATION */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
            {currentStep > 1 ? (
              <button
                onClick={goBack}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 border border-slate-200 hover:border-slate-300 px-4 py-2.5 rounded-lg transition-colors"
              >
                <ChevronLeft size={15} />
                Sebelumnya
              </button>
            ) : (
              <span />
            )}

            {currentStep < steps.length ? (
              <button
                onClick={goNext}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition-colors"
              >
                Selanjutnya
                <ChevronRight size={15} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition-colors"
              >
                Kirim Pendaftaran
                <Check size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

function inputClass(hasError) {
  return `w-full text-sm text-slate-800 bg-white border rounded-lg px-3 py-2.5 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${
    hasError ? "border-rose-300" : "border-slate-200"
  }`;
}

function ReviewGroup({ title, children }) {
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-600">{title}</div>
      <div className="divide-y divide-slate-100">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-2.5">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-800 text-right truncate">{value}</span>
    </div>
  );
}