"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  GraduationCap,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Check,
  UploadCloud,
  FileCheck2,
  User,
  FileText,
  ClipboardList,
  ShieldCheck,
  MapPin,
  Sparkles,
  Users,
  School,
  Loader2,
  AlertCircle,
} from "lucide-react";

import {
  daftarPpdb,
  uploadBerkasPpdb,
} from "../../../services/ppdb.service";

// ======================================================
// BERKAS SESUAI BE
// BE hanya menerima: KK | AKTE | IJAZAH
// ======================================================

const dokumenList = [
  {
    id: "KK",
    label: "Kartu Keluarga (KK)",
  },
  {
    id: "AKTE",
    label: "Akta Kelahiran",
  },
  {
    id: "IJAZAH",
    label: "Ijazah",
  },
];

// ======================================================
// JALUR - HANYA LABEL UI
// ID ASLI DIAMBIL DARI URL
// ?jalurPpdbId=UUID
// ======================================================

const jalurOptions = [
  {
    id: "zonasi",
    title: "Jalur Zonasi",
    desc: "Domisili dalam radius zona sekolah sesuai ketentuan.",
    icon: MapPin,
    color: "blue",
  },
  {
    id: "prestasi",
    title: "Jalur Prestasi",
    desc: "Prestasi akademik atau non-akademik.",
    icon: Sparkles,
    color: "amber",
  },
  {
    id: "afirmasi",
    title: "Jalur Afirmasi",
    desc: "Jalur sesuai ketentuan afirmasi.",
    icon: Users,
    color: "emerald",
  },
  {
    id: "pindahan",
    title: "Jalur Perpindahan Tugas",
    desc: "Mengikuti perpindahan tugas orang tua/wali.",
    icon: FileCheck2,
    color: "rose",
  },
];

// ======================================================
// STEPS
// ======================================================

const steps = [
  {
    id: 1,
    label: "Data Calon Siswa",
    icon: User,
  },
  {
    id: 2,
    label: "Data Orang Tua",
    icon: Users,
  },
  {
    id: 3,
    label: "Jalur & Sekolah",
    icon: ClipboardList,
  },
  {
    id: 4,
    label: "Berkas",
    icon: FileText,
  },
  {
    id: 5,
    label: "Review",
    icon: ShieldCheck,
  },
];

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200",
    ring: "ring-blue-500",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-200",
    ring: "ring-amber-500",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
    ring: "ring-emerald-500",
  },
  rose: {
    bg: "bg-rose-50",
    text: "text-rose-600",
    border: "border-rose-200",
    ring: "ring-rose-500",
  },
};

export default function DaftarPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ======================================================
  // ID DARI URL
  // BE membutuhkan:
  // sekolahId
  // jalurPpdbId
  // ======================================================

  const sekolahId = searchParams.get("sekolahId") || "";
  const jalurPpdbId = searchParams.get("jalurPpdbId") || "";

  const [currentStep, setCurrentStep] = useState(1);

  // ======================================================
  // FORM SESUAI pendaftaranPpdbSchema
  // ======================================================

  const [form, setForm] = useState({
    namaLengkap: "",
    nisn: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    alamat: "",
    telepon: "",
    email: "",
    namaAyah: "",
    namaIbu: "",
    asalSekolah: "",
    nilaiRapor: "",
    jalur: "",
  });

  // ======================================================
  // FILE
  // ======================================================

  const [uploaded, setUploaded] = useState({});
  const [files, setFiles] = useState({});

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ======================================================
  // UPDATE FORM
  // ======================================================

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    setErrors((current) => ({
      ...current,
      [key]: undefined,
    }));

    setSubmitError("");
  };

  // ======================================================
  // VALIDASI
  // ======================================================

  const validateStep = (step) => {
    const newErrors = {};

    // -----------------------------------------------
    // STEP 1
    // -----------------------------------------------

    if (step === 1) {
      if (!form.namaLengkap.trim()) {
        newErrors.namaLengkap = "Nama lengkap wajib diisi";
      }

      if (!form.nisn.trim()) {
        newErrors.nisn = "NISN wajib diisi";
      } else if (form.nisn.length < 10) {
        newErrors.nisn = "NISN minimal 10 digit";
      }

      if (!form.tempatLahir.trim()) {
        newErrors.tempatLahir = "Tempat lahir wajib diisi";
      }

      if (!form.tanggalLahir) {
        newErrors.tanggalLahir = "Tanggal lahir wajib diisi";
      }

      if (!form.jenisKelamin) {
        newErrors.jenisKelamin = "Jenis kelamin wajib dipilih";
      }

      if (!form.alamat.trim()) {
        newErrors.alamat = "Alamat wajib diisi";
      } else if (form.alamat.trim().length < 5) {
        newErrors.alamat = "Alamat minimal 5 karakter";
      }
    }

    // -----------------------------------------------
    // STEP 2
    // -----------------------------------------------

    if (step === 2) {
      if (!form.namaAyah.trim()) {
        newErrors.namaAyah = "Nama ayah wajib diisi";
      }

      if (!form.namaIbu.trim()) {
        newErrors.namaIbu = "Nama ibu wajib diisi";
      }

      if (!form.email.trim()) {
        newErrors.email = "Email wajib diisi";
      } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        newErrors.email = "Format email tidak valid";
      }

      if (form.telepon && form.telepon.length > 20) {
        newErrors.telepon = "Nomor telepon maksimal 20 karakter";
      }
    }

    // -----------------------------------------------
    // STEP 3
    // -----------------------------------------------

    if (step === 3) {
      if (!sekolahId) {
        newErrors.sekolahId =
          "Sekolah tujuan belum ditentukan.";
      }

      if (!jalurPpdbId) {
        newErrors.jalurPpdbId =
          "Jalur PPDB belum ditentukan.";
      }

      if (!form.jalur) {
        newErrors.jalur = "Pilih salah satu jalur";
      }

      if (!form.asalSekolah.trim()) {
        newErrors.asalSekolah = "Asal sekolah wajib diisi";
      }

      if (form.nilaiRapor !== "") {
        const nilai = Number(form.nilaiRapor);

        if (Number.isNaN(nilai) || nilai < 0 || nilai > 100) {
          newErrors.nilaiRapor =
            "Nilai rapor harus berada di antara 0-100";
        }
      }
    }

    // -----------------------------------------------
    // STEP 4
    // -----------------------------------------------

    if (step === 4) {
      dokumenList.forEach((document) => {
        if (!files[document.id]) {
          newErrors[document.id] =
            "Dokumen wajib diunggah";
        }
      });
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ======================================================
  // NEXT
  // ======================================================

  const goNext = () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setCurrentStep((current) =>
      Math.min(current + 1, steps.length)
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ======================================================
  // BACK
  // ======================================================

  const goBack = () => {
    setCurrentStep((current) =>
      Math.max(current - 1, 1)
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ======================================================
  // FILE CHANGE
  // ======================================================

  const handleFileChange = (id, file) => {
    if (!file) return;

    setErrors((current) => ({
      ...current,
      [id]: undefined,
    }));

    setSubmitError("");

    // -----------------------------------------------
    // VALIDASI TIPE FILE
    // -----------------------------------------------

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrors((current) => ({
        ...current,
        [id]:
          "Format file harus JPG, PNG, atau PDF",
      }));

      return;
    }

    // -----------------------------------------------
    // MAX 2 MB
    // -----------------------------------------------

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      setErrors((current) => ({
        ...current,
        [id]:
          "Ukuran file maksimal 2MB",
      }));

      return;
    }

    setFiles((current) => ({
      ...current,
      [id]: file,
    }));

    setUploaded((current) => ({
      ...current,
      [id]: file.name,
    }));
  };

  // ======================================================
  // SUBMIT
  // ======================================================

  const handleSubmit = async () => {
    // Pastikan step terakhir valid
    const validStep1 = validateStep(1);
    const validStep2 = validateStep(2);
    const validStep3 = validateStep(3);
    const validStep4 = validateStep(4);

    if (
      !validStep1 ||
      !validStep2 ||
      !validStep3 ||
      !validStep4
    ) {
      setSubmitError(
        "Masih ada data atau berkas yang belum lengkap."
      );
      return;
    }

    if (!sekolahId || !jalurPpdbId) {
      setSubmitError(
        "Sekolah atau jalur PPDB belum ditentukan."
      );
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      // ==================================================
      // 1. DAFTAR PPDB
      // SESUAI daftarPpdb() DI BE
      // ==================================================

      const payload = {
        sekolahId,
        jalurPpdbId,
        namaLengkap: form.namaLengkap.trim(),
        nisn: form.nisn.trim(),
        tempatLahir: form.tempatLahir.trim(),
        tanggalLahir: form.tanggalLahir,
        jenisKelamin: form.jenisKelamin,
        alamat: form.alamat.trim(),
        telepon: form.telepon.trim() || undefined,
        email: form.email.trim() || undefined,
        namaAyah: form.namaAyah.trim() || undefined,
        namaIbu: form.namaIbu.trim() || undefined,
        asalSekolah:
          form.asalSekolah.trim() || undefined,
        nilaiRapor:
          form.nilaiRapor !== ""
            ? Number(form.nilaiRapor)
            : undefined,
      };

      const response = await daftarPpdb(payload);

      if (!response?.success || !response?.data?.id) {
        throw new Error(
          response?.message ||
            "Pendaftaran PPDB gagal diproses."
        );
      }

      const pendaftaranId = response.data.id;

      // ==================================================
      // 2. UPLOAD BERKAS
      // BE:
      // POST /:id/berkas
      //
      // namaBerkas:
      // KK | AKTE | IJAZAH
      // ==================================================

      for (const document of dokumenList) {
        const file = files[document.id];

        if (!file) {
          continue;
        }

        await uploadBerkasPpdb(
          pendaftaranId,
          file,
          document.id
        );
      }

      // ==================================================
      // 3. BERHASIL
      // ==================================================

      router.push(
        `/PPDB/daftar/berhasil?id=${encodeURIComponent(
          pendaftaranId
        )}`
      );
    } catch (error) {
      console.error(
        "Error submit PPDB:",
        error
      );

      setSubmitError(
        error?.message ||
          "Terjadi kesalahan saat mengirim pendaftaran."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ======================================================
  // RENDER
  // ======================================================

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

            <span className="text-sm font-semibold text-slate-800 truncate">
              Formulir Pendaftaran
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* ==================================================
            ERROR GLOBAL
        ================================================== */}

        {submitError && (
          <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 flex items-start gap-3">
            <AlertCircle
              size={18}
              className="text-rose-500 mt-0.5 flex-shrink-0"
            />

            <div>
              <p className="text-sm font-semibold text-rose-700">
                Pendaftaran belum berhasil
              </p>

              <p className="mt-1 text-xs text-rose-600">
                {submitError}
              </p>
            </div>
          </div>
        )}

        {/* ==================================================
            STEPPER
        ================================================== */}

        <div className="mb-8">
          <div className="flex items-center">
            {steps.map((step, index) => {
              const Icon = step.icon;

              const isActive =
                step.id === currentStep;

              const isDone =
                step.id < currentStep;

              return (
                <div
                  key={step.id}
                  className="flex items-center flex-1 last:flex-none"
                >
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
                      {isDone ? (
                        <Check size={15} />
                      ) : (
                        <Icon size={15} />
                      )}
                    </div>

                    <span
                      className={`hidden sm:block text-[11px] font-medium text-center max-w-[90px] ${
                        isActive
                          ? "text-slate-800"
                          : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {index !== steps.length - 1 && (
                    <div
                      className={`h-px flex-1 mx-2 ${
                        isDone
                          ? "bg-blue-600"
                          : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================================================
            FORM CARD
        ================================================== */}

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-8">
          {/* ==================================================
              STEP 1
          ================================================== */}

          {currentStep === 1 && (
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-800">
                Data Calon Siswa
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Masukkan data calon siswa sesuai dokumen resmi.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field
                  label="Nama Lengkap"
                  error={errors.namaLengkap}
                >
                  <input
                    value={form.namaLengkap}
                    onChange={(e) =>
                      update(
                        "namaLengkap",
                        e.target.value
                      )
                    }
                    placeholder="Nama lengkap calon siswa"
                    className={inputClass(
                      errors.namaLengkap
                    )}
                  />
                </Field>

                <Field
                  label="NISN"
                  error={errors.nisn}
                >
                  <input
                    value={form.nisn}
                    onChange={(e) =>
                      update(
                        "nisn",
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    maxLength={20}
                    placeholder="Nomor Induk Siswa Nasional"
                    className={inputClass(
                      errors.nisn
                    )}
                  />
                </Field>

                <Field
                  label="Tempat Lahir"
                  error={errors.tempatLahir}
                >
                  <input
                    value={form.tempatLahir}
                    onChange={(e) =>
                      update(
                        "tempatLahir",
                        e.target.value
                      )
                    }
                    placeholder="Kota tempat lahir"
                    className={inputClass(
                      errors.tempatLahir
                    )}
                  />
                </Field>

                <Field
                  label="Tanggal Lahir"
                  error={errors.tanggalLahir}
                >
                  <input
                    type="date"
                    value={form.tanggalLahir}
                    onChange={(e) =>
                      update(
                        "tanggalLahir",
                        e.target.value
                      )
                    }
                    className={inputClass(
                      errors.tanggalLahir
                    )}
                  />
                </Field>

                <Field
                  label="Jenis Kelamin"
                  error={errors.jenisKelamin}
                >
                  <select
                    value={form.jenisKelamin}
                    onChange={(e) =>
                      update(
                        "jenisKelamin",
                        e.target.value
                      )
                    }
                    className={inputClass(
                      errors.jenisKelamin
                    )}
                  >
                    <option value="">
                      Pilih jenis kelamin
                    </option>
                    <option value="L">
                      Laki-laki
                    </option>
                    <option value="P">
                      Perempuan
                    </option>
                  </select>
                </Field>

                <Field
                  label="Nomor Telepon"
                  error={errors.telepon}
                >
                  <input
                    value={form.telepon}
                    onChange={(e) =>
                      update(
                        "telepon",
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    maxLength={20}
                    placeholder="08xxxxxxxxxx"
                    className={inputClass(
                      errors.telepon
                    )}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field
                    label="Alamat"
                    error={errors.alamat}
                  >
                    <textarea
                      value={form.alamat}
                      onChange={(e) =>
                        update(
                          "alamat",
                          e.target.value
                        )
                      }
                      rows={3}
                      placeholder="Alamat lengkap calon siswa"
                      className={inputClass(
                        errors.alamat
                      )}
                    />
                  </Field>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================
              STEP 2
          ================================================== */}

          {currentStep === 2 && (
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-800">
                Data Orang Tua / Wali
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Lengkapi informasi orang tua/wali dan kontak.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field
                  label="Nama Ayah"
                  error={errors.namaAyah}
                >
                  <input
                    value={form.namaAyah}
                    onChange={(e) =>
                      update(
                        "namaAyah",
                        e.target.value
                      )
                    }
                    placeholder="Nama lengkap ayah"
                    className={inputClass(
                      errors.namaAyah
                    )}
                  />
                </Field>

                <Field
                  label="Nama Ibu"
                  error={errors.namaIbu}
                >
                  <input
                    value={form.namaIbu}
                    onChange={(e) =>
                      update(
                        "namaIbu",
                        e.target.value
                      )
                    }
                    placeholder="Nama lengkap ibu"
                    className={inputClass(
                      errors.namaIbu
                    )}
                  />
                </Field>

                <Field
                  label="Email"
                  error={errors.email}
                >
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      update(
                        "email",
                        e.target.value
                      )
                    }
                    placeholder="nama@email.com"
                    className={inputClass(
                      errors.email
                    )}
                  />
                </Field>

                <Field
                  label="Nomor Telepon"
                  error={errors.telepon}
                >
                  <input
                    value={form.telepon}
                    onChange={(e) =>
                      update(
                        "telepon",
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    maxLength={20}
                    placeholder="08xxxxxxxxxx"
                    className={inputClass(
                      errors.telepon
                    )}
                  />
                </Field>
              </div>
            </div>
          )}

          {/* ==================================================
              STEP 3
          ================================================== */}

          {currentStep === 3 && (
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-800">
                Pilih Jalur & Sekolah
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Pilih jalur PPDB dan lengkapi informasi asal sekolah.
              </p>

              {/* INFO ID BE */}

              {(!sekolahId || !jalurPpdbId) && (
                <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                  <div className="flex gap-3">
                    <AlertCircle
                      size={18}
                      className="text-amber-600 mt-0.5 flex-shrink-0"
                    />

                    <div>
                      <p className="text-sm font-semibold text-amber-800">
                        Data sekolah/jalur belum tersedia
                      </p>

                      <p className="mt-1 text-xs text-amber-700 leading-relaxed">
                        Halaman ini membutuhkan
                        <b> sekolahId </b>
                        dan
                        <b> jalurPpdbId </b>
                        dari database.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <p className="text-xs font-medium text-slate-600 mb-2">
                  Jalur Pendaftaran
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {jalurOptions.map((jalur) => {
                    const Icon = jalur.icon;
                    const color =
                      colorMap[jalur.color];

                    const selected =
                      form.jalur === jalur.id;

                    return (
                      <button
                        type="button"
                        key={jalur.id}
                        onClick={() =>
                          update(
                            "jalur",
                            jalur.id
                          )
                        }
                        className={`text-left rounded-xl border p-4 transition-all ${
                          selected
                            ? `${color.border} ring-2 ${color.ring} bg-white`
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-lg ${color.bg} ${color.text} flex items-center justify-center`}
                        >
                          <Icon size={16} />
                        </div>

                        <p className="mt-2.5 text-sm font-semibold text-slate-800">
                          {jalur.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                          {jalur.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {errors.jalur && (
                  <p className="mt-2 text-xs text-rose-500">
                    {errors.jalur}
                  </p>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field
                  label="Asal Sekolah"
                  error={errors.asalSekolah}
                >
                  <input
                    value={form.asalSekolah}
                    onChange={(e) =>
                      update(
                        "asalSekolah",
                        e.target.value
                      )
                    }
                    placeholder="Nama sekolah asal"
                    className={inputClass(
                      errors.asalSekolah
                    )}
                  />
                </Field>

                <Field
                  label="Nilai Rapor"
                  error={errors.nilaiRapor}
                >
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={form.nilaiRapor}
                    onChange={(e) =>
                      update(
                        "nilaiRapor",
                        e.target.value
                      )
                    }
                    placeholder="0 - 100"
                    className={inputClass(
                      errors.nilaiRapor
                    )}
                  />
                </Field>
              </div>

              {/* SEKOLAH ID */}

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex gap-3">
                  <School
                    size={18}
                    className="text-blue-600 mt-0.5"
                  />

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-700">
                      Sekolah Tujuan
                    </p>

                    <p className="mt-1 text-xs text-slate-500 break-all">
                      {sekolahId ||
                        "Belum ditentukan"}
                    </p>
                  </div>
                </div>
              </div>

              {/* JALUR ID */}

              <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex gap-3">
                  <ClipboardList
                    size={18}
                    className="text-blue-600 mt-0.5"
                  />

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-700">
                      Jalur PPDB
                    </p>

                    <p className="mt-1 text-xs text-slate-500 break-all">
                      {jalurPpdbId ||
                        "Belum ditentukan"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================
              STEP 4
          ================================================== */}

          {currentStep === 4 && (
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-800">
                Lengkapi Berkas
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Unggah dokumen dalam format JPG, PNG, atau PDF.
                Maksimal 2MB per file.
              </p>

              <div className="mt-6 space-y-3">
                {dokumenList.map((document) => (
                  <label
                    key={document.id}
                    className={`flex items-center justify-between gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                      errors[document.id]
                        ? "border-rose-300 bg-rose-50/40"
                        : files[document.id]
                        ? "border-emerald-200 bg-emerald-50/40"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          files[document.id]
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {files[document.id] ? (
                          <Check size={16} />
                        ) : (
                          <UploadCloud size={16} />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800">
                          {document.label}
                        </p>

                        <p className="text-xs text-slate-500 truncate">
                          {uploaded[document.id]
                            ? uploaded[
                                document.id
                              ]
                            : errors[
                                document.id
                              ]
                            ? errors[
                                document.id
                              ]
                            : "Belum ada file dipilih"}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-medium text-blue-600 flex-shrink-0">
                      {files[document.id]
                        ? "Ganti"
                        : "Unggah"}
                    </span>

                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      className="hidden"
                      onChange={(e) =>
                        handleFileChange(
                          document.id,
                          e.target.files?.[0]
                        )
                      }
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* ==================================================
              STEP 5
          ================================================== */}

          {currentStep === 5 && (
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-800">
                Review Pendaftaran
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Periksa kembali data sebelum mengirim pendaftaran.
              </p>

              <div className="mt-6 space-y-4">
                {/* DATA SISWA */}

                <ReviewGroup title="Data Calon Siswa">
                  <ReviewRow
                    label="Nama Lengkap"
                    value={
                      form.namaLengkap || "-"
                    }
                  />

                  <ReviewRow
                    label="NISN"
                    value={form.nisn || "-"}
                  />

                  <ReviewRow
                    label="Tempat Lahir"
                    value={
                      form.tempatLahir || "-"
                    }
                  />

                  <ReviewRow
                    label="Tanggal Lahir"
                    value={
                      form.tanggalLahir || "-"
                    }
                  />

                  <ReviewRow
                    label="Jenis Kelamin"
                    value={
                      form.jenisKelamin === "L"
                        ? "Laki-laki"
                        : form.jenisKelamin ===
                          "P"
                        ? "Perempuan"
                        : "-"
                    }
                  />

                  <ReviewRow
                    label="Alamat"
                    value={form.alamat || "-"}
                  />
                </ReviewGroup>

                {/* ORANG TUA */}

                <ReviewGroup title="Orang Tua / Kontak">
                  <ReviewRow
                    label="Nama Ayah"
                    value={
                      form.namaAyah || "-"
                    }
                  />

                  <ReviewRow
                    label="Nama Ibu"
                    value={
                      form.namaIbu || "-"
                    }
                  />

                  <ReviewRow
                    label="Email"
                    value={form.email || "-"}
                  />

                  <ReviewRow
                    label="Telepon"
                    value={
                      form.telepon || "-"
                    }
                  />
                </ReviewGroup>

                {/* PPDB */}

                <ReviewGroup title="PPDB">
                  <ReviewRow
                    label="Jalur"
                    value={
                      jalurOptions.find(
                        (item) =>
                          item.id ===
                          form.jalur
                      )?.title || "-"
                    }
                  />

                  <ReviewRow
                    label="Jalur PPDB ID"
                    value={
                      jalurPpdbId || "-"
                    }
                  />

                  <ReviewRow
                    label="Sekolah ID"
                    value={
                      sekolahId || "-"
                    }
                  />

                  <ReviewRow
                    label="Asal Sekolah"
                    value={
                      form.asalSekolah || "-"
                    }
                  />

                  <ReviewRow
                    label="Nilai Rapor"
                    value={
                      form.nilaiRapor || "-"
                    }
                  />
                </ReviewGroup>

                {/* BERKAS */}

                <ReviewGroup title="Berkas">
                  {dokumenList.map(
                    (document) => (
                      <ReviewRow
                        key={document.id}
                        label={
                          document.label
                        }
                        value={
                          uploaded[
                            document.id
                          ] || "-"
                        }
                      />
                    )
                  )}
                </ReviewGroup>
              </div>

              <div className="mt-6 flex items-start gap-2.5">
                <input
                  id="agreement"
                  type="checkbox"
                  className="mt-0.5"
                  required
                />

                <label
                  htmlFor="agreement"
                  className="text-sm text-slate-600"
                >
                  Saya menyatakan bahwa seluruh
                  data yang diisi sudah benar dan
                  bertanggung jawab atas kebenarannya.
                </label>
              </div>
            </div>
          )}

          {/* ==================================================
              NAVIGATION
          ================================================== */}

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
            {currentStep > 1 ? (
              <button
                onClick={goBack}
                disabled={submitting}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 border border-slate-200 hover:border-slate-300 px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50"
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
                disabled={submitting}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                Selanjutnya
                <ChevronRight size={15} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2
                      size={15}
                      className="animate-spin"
                    />
                    Mengirim...
                  </>
                ) : (
                  <>
                    Kirim Pendaftaran
                    <Check size={15} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// FIELD
// ======================================================

function Field({
  label,
  error,
  children,
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1.5">
        {label}
      </label>

      {children}

      {error && (
        <p className="mt-1 text-xs text-rose-500">
          {error}
        </p>
      )}
    </div>
  );
}

// ======================================================
// INPUT CLASS
// ======================================================

function inputClass(hasError) {
  return `w-full text-sm text-slate-800 bg-white border rounded-lg px-3 py-2.5 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${
    hasError
      ? "border-rose-300"
      : "border-slate-200"
  }`;
}

// ======================================================
// REVIEW GROUP
// ======================================================

function ReviewGroup({
  title,
  children,
}) {
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-600">
        {title}
      </div>

      <div className="divide-y divide-slate-100">
        {children}
      </div>
    </div>
  );
}

// ======================================================
// REVIEW ROW
// ======================================================

function ReviewRow({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-2.5">
      <span className="text-xs text-slate-500">
        {label}
      </span>

      <span className="text-sm font-medium text-slate-800 text-right truncate max-w-[65%]">
        {value}
      </span>
    </div>
  );
}