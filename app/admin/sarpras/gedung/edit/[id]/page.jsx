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
  AlertCircle,
  Info,
  Edit,
} from "lucide-react";

import {
  getGedung,
  updateGedung,
} from "../../../../../services/infrastruktur.service";

export default function EditGedungPage() {
  const router = useRouter();
  const params = useParams();

  const id = params?.id;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    nama: "",
    kode: "",
    fotoUrl: "",
  });

  /* =========================================================
     FETCH DATA GEDUNG
  ========================================================= */

  useEffect(() => {
    const fetchGedungDetail = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");

        /*
         * Backend belum menyediakan endpoint detail gedung
         * khusus berdasarkan ID.
         *
         * Jadi kita ambil seluruh data gedung lalu mencari
         * gedung berdasarkan ID.
         */
        const response = await getGedung();

        const result =
          response?.data ??
          response?.result ??
          response ??
          [];

        const gedungList = Array.isArray(result)
          ? result
          : [];

        const data = gedungList.find(
          (item) => String(item?.id) === String(id)
        );

        if (!data) {
          setErrorMessage("Data gedung tidak ditemukan.");
          return;
        }

        setFormData({
          nama: data?.nama ?? "",
          kode: data?.kode ?? "",
          fotoUrl: data?.fotoUrl ?? "",
        });
      } catch (error) {
        console.error(
          "Error fetch detail gedung:",
          error
        );

        setErrorMessage(
          error?.message ||
            "Gagal mengambil data gedung."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchGedungDetail();
  }, [id]);

  /* =========================================================
     HANDLE CHANGE
  ========================================================= */

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validate = () => {
    const newErrors = {};

    if (!formData.nama.trim()) {
      newErrors.nama = "Nama gedung wajib diisi";
    }

    if (formData.nama.trim().length > 100) {
      newErrors.nama =
        "Nama gedung maksimal 100 karakter";
    }

    if (formData.kode.trim().length > 50) {
      newErrors.kode =
        "Kode gedung maksimal 50 karakter";
    }

    /*
     * Jika fotoUrl diisi, harus berupa URL valid.
     */
    if (formData.fotoUrl.trim()) {
      try {
        new URL(formData.fotoUrl.trim());
      } catch {
        newErrors.fotoUrl =
          "Foto URL harus berupa URL yang valid";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (!id) {
      setErrorMessage(
        "ID gedung tidak ditemukan."
      );
      return;
    }

    try {
      setIsSaving(true);
      setSaved(false);
      setErrorMessage("");

      const payload = {
        nama: formData.nama.trim(),
        kode: formData.kode.trim()
          ? formData.kode.trim()
          : null,
        fotoUrl: formData.fotoUrl.trim()
          ? formData.fotoUrl.trim()
          : null,
      };

      await updateGedung(id, payload);

      setSaved(true);

      setTimeout(() => {
        router.push("/admin/sarpras/gedung");
      }, 1200);
    } catch (error) {
      console.error(
        "Error update gedung:",
        error
      );

      setErrorMessage(
        error?.message ||
          "Gedung gagal diperbarui. Silakan coba lagi."
      );
    } finally {
      setIsSaving(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
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
            toggleSidebar={() =>
              setIsCollapsed(!isCollapsed)
            }
            notifications={[]}
            user={{
              name: "Admin Sekolah",
              email: "admin@smartschool.com",
              avatar: "AD",
            }}
          />

          <main className="flex-1 p-8">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-amber-600" />

                <p className="mt-4 text-sm text-slate-500">
                  Memuat data gedung...
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* SIDEBAR */}

      <Sidebar
        active="sarpras"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* HEADER */}

        <Header
          toggleSidebar={() =>
            setIsCollapsed(!isCollapsed)
          }
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email: "admin@smartschool.com",
            avatar: "AD",
          }}
        />

        <main className="flex-1 p-3 sm:p-5 lg:p-7 xl:p-8">
          <div className="mx-auto w-full max-w-[1200px] space-y-4 sm:space-y-5 lg:space-y-6">

            {/* =================================================
                BACK BUTTON
            ================================================= */}

            <button
              onClick={() =>
                router.push(
                  "/admin/sarpras/gedung"
                )
              }
              className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-amber-600"
            >
              <ArrowLeft
                size={18}
                className="transition-transform group-hover:-translate-x-0.5"
              />

              Kembali ke Daftar Gedung
            </button>

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.05)]">

              <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-amber-50/70 blur-3xl" />

              <div className="relative flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-6">

                <div className="flex min-w-0 items-start gap-3 sm:gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-[0_8px_20px_rgba(245,158,11,0.25)] sm:h-14 sm:w-14">
                    <Edit
                      size={22}
                      strokeWidth={1.9}
                      className="sm:h-[25px] sm:w-[25px]"
                    />
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

                      <Building
                        size={13}
                        className="shrink-0 text-amber-400 sm:h-[14px] sm:w-[14px]"
                        strokeWidth={2}
                      />

                      <p className="text-xs leading-5 text-slate-500 sm:text-sm">
                        Perbarui informasi gedung
                        yang ada di sistem.
                      </p>

                    </div>

                  </div>
                </div>

                <div className="flex w-full flex-wrap gap-2 sm:flex-row lg:w-auto">

                  {/* BATAL */}

                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        "/admin/sarpras/gedung"
                      )
                    }
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 shadow-[0_2px_5px_rgba(15,23,42,0.05)] transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 active:scale-[0.98] sm:h-11 sm:px-5"
                  >
                    <X
                      size={16}
                      className="sm:h-[17px] sm:w-[17px]"
                    />

                    Batal
                  </button>

                  {/* SIMPAN */}

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-[0_7px_18px_rgba(15,23,42,0.16)] transition-all hover:bg-slate-800 hover:shadow-[0_9px_22px_rgba(15,23,42,0.20)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:h-11 sm:px-5"
                  >
                    <Save
                      size={16}
                      strokeWidth={2.3}
                      className="sm:h-[17px] sm:w-[17px]"
                    />

                    {isSaving
                      ? "Menyimpan..."
                      : "Simpan Perubahan"}
                  </button>

                </div>
              </div>
            </section>

            {/* =================================================
                ERROR
            ================================================= */}

            {errorMessage && (
              <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">

                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0 text-rose-600"
                />

                <div>
                  <p className="font-semibold">
                    Terjadi kesalahan
                  </p>

                  <p className="mt-0.5 text-xs">
                    {errorMessage}
                  </p>
                </div>

              </div>
            )}

            {/* =================================================
                SUCCESS
            ================================================= */}

            {saved && (
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">

                <CheckCircle
                  size={18}
                  className="text-emerald-600"
                />

                <span>
                  Perubahan gedung berhasil
                  disimpan! Mengalihkan ke daftar
                  gedung...
                </span>

              </div>
            )}

            {/* =================================================
                FORM
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:p-6 lg:p-7">

              <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Info size={16} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Informasi Gedung
                  </p>

                  <p className="text-xs text-slate-400">
                    Perbarui data gedung sesuai
                    informasi yang tersimpan di
                    sistem.
                  </p>
                </div>

              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  {/* =================================================
                      NAMA GEDUNG
                  ================================================= */}

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Nama Gedung{" "}
                      <span className="text-rose-500">
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      value={formData.nama}
                      onChange={(e) =>
                        handleChange(
                          "nama",
                          e.target.value
                        )
                      }
                      maxLength={100}
                      placeholder="Contoh: Gedung Utama"
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10 ${
                        errors.nama
                          ? "border-rose-300"
                          : "border-slate-200"
                      }`}
                    />

                    <div className="mt-1 flex items-center justify-between">
                      {errors.nama ? (
                        <p className="flex items-center gap-1 text-xs text-rose-600">
                          <AlertCircle size={12} />

                          {errors.nama}
                        </p>
                      ) : (
                        <span />
                      )}

                      <span className="text-[10px] text-slate-400">
                        {formData.nama.length}/100
                      </span>
                    </div>
                  </div>

                  {/* =================================================
                      KODE GEDUNG
                  ================================================= */}

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Kode Gedung
                    </label>

                    <input
                      type="text"
                      value={formData.kode}
                      onChange={(e) =>
                        handleChange(
                          "kode",
                          e.target.value
                        )
                      }
                      maxLength={50}
                      placeholder="Contoh: A, B, C"
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10 ${
                        errors.kode
                          ? "border-rose-300"
                          : "border-slate-200"
                      }`}
                    />

                    <div className="mt-1 flex items-center justify-between">
                      {errors.kode ? (
                        <p className="flex items-center gap-1 text-xs text-rose-600">
                          <AlertCircle size={12} />

                          {errors.kode}
                        </p>
                      ) : (
                        <span className="text-[10px] text-slate-400">
                          Maksimal 50 karakter
                        </span>
                      )}

                      <span className="text-[10px] text-slate-400">
                        {formData.kode.length}/50
                      </span>
                    </div>
                  </div>

                  {/* =================================================
                      FOTO URL
                  ================================================= */}

                  <div className="md:col-span-2">

                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      URL Foto Gedung
                    </label>

                    <input
                      type="url"
                      value={formData.fotoUrl}
                      onChange={(e) =>
                        handleChange(
                          "fotoUrl",
                          e.target.value
                        )
                      }
                      placeholder="https://contoh.com/foto-gedung.jpg"
                      className={`w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10 ${
                        errors.fotoUrl
                          ? "border-rose-300"
                          : "border-slate-200"
                      }`}
                    />

                    {errors.fotoUrl && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                        <AlertCircle size={12} />

                        {errors.fotoUrl}
                      </p>
                    )}

                    <p className="mt-1.5 text-xs text-slate-400">
                      Opsional. Masukkan URL gambar
                      gedung yang valid.
                    </p>

                  </div>

                </div>

                {/* =================================================
                    INFO BACKEND
                ================================================= */}

                <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">

                  <div className="flex items-start gap-3">

                    <Info
                      size={17}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <div>

                      <p className="text-xs font-semibold text-blue-800">
                        Informasi Data
                      </p>

                      <p className="mt-1 text-xs leading-5 text-blue-700">
                        Data gedung yang dapat
                        diperbarui adalah nama, kode,
                        dan URL foto. Data lantai
                        dikelola secara terpisah melalui
                        fitur pengelolaan lantai.
                      </p>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    FORM ACTIONS
                ================================================= */}

                <div className="flex flex-col-reverse gap-2.5 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-end">

                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        "/admin/sarpras/gedung"
                      )
                    }
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-600 shadow-[0_2px_5px_rgba(15,23,42,0.05)] transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 active:scale-[0.98]"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white shadow-[0_7px_18px_rgba(15,23,42,0.16)] transition-all hover:bg-slate-800 hover:shadow-[0_9px_22px_rgba(15,23,42,0.20)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Save
                      size={17}
                      strokeWidth={2.3}
                    />

                    {isSaving
                      ? "Menyimpan..."
                      : "Simpan Perubahan"}
                  </button>

                </div>

              </form>
            </section>

            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="border-t border-slate-200/70 pt-4 text-center sm:pt-5">
              <p className="text-xs text-slate-400">
                © 2026 SmartSchool • Edit Gedung -
                Sarana & Prasarana
              </p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}