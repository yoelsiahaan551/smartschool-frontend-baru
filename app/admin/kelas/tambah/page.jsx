"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

import {
  GraduationCap,
  Plus,
  Save,
  X,
  School,
  Users,
  CalendarDays,
  CheckCircle,
  ChevronDown,
  ArrowLeft,
  Info,
  Hash,
} from "lucide-react";

import { createKelas } from "../../../../services/kelas.service";
import { getTahunAjaran } from "../../../../services/tahunAjaran.service";

const TINGKAT_OPTIONS = [
  { value: 10, label: "X (Sepuluh)" },
  { value: 11, label: "XI (Sebelas)" },
  { value: 12, label: "XII (Dua Belas)" },
];

function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
  type = "text",
  min,
}) {
  return (
    <div className="min-w-0 w-full">
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-700">
        {label}
        {required && <span className="ml-1 text-rose-600">*</span>}
      </label>

      <div className="relative w-full">
        <Icon
          size={17}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-slate-50
            py-3
            pl-11
            pr-4
            text-sm
            text-slate-800
            placeholder:text-slate-400
            outline-none
            transition-all
            hover:border-slate-400
            hover:bg-white
            focus:border-blue-500
            focus:bg-white
            focus:ring-4
            focus:ring-blue-500/20
          "
        />
      </div>
    </div>
  );
}

function FormSelect({
  label,
  name,
  value,
  onChange,
  icon: Icon,
  children,
  required = false,
  disabled = false,
}) {
  return (
    <div className="min-w-0 w-full">
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-700">
        {label}
        {required && <span className="ml-1 text-rose-600">*</span>}
      </label>

      <div className="relative w-full">
        <Icon
          size={17}
          className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-500"
        />

        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="
            w-full
            appearance-none
            rounded-xl
            border
            border-slate-300
            bg-slate-50
            py-3
            pl-11
            pr-10
            text-sm
            text-slate-800
            outline-none
            transition-all
            hover:border-slate-400
            hover:bg-white
            focus:border-blue-500
            focus:bg-white
            focus:ring-4
            focus:ring-blue-500/20
            disabled:cursor-not-allowed
            disabled:bg-slate-100
            disabled:text-slate-400
          "
        >
          {children}
        </select>

        <ChevronDown
          size={17}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
        />
      </div>
    </div>
  );
}

export default function AdminKelasTambahPage() {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingTahun, setLoadingTahun] = useState(true);

  const [tahunAjaranList, setTahunAjaranList] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    nama: "",
    tingkat: "",
    tahunAjaranId: "",
    kapasitas: "",
  });

  useEffect(() => {
    loadTahunAjaran();
  }, []);

  async function loadTahunAjaran() {
    try {
      setLoadingTahun(true);
      setError("");

      const data = await getTahunAjaran();

      const list = Array.isArray(data) ? data : [];

      setTahunAjaranList(list);

      const tahunAktif = list.find((item) => item.status === "aktif");

      if (tahunAktif) {
        setForm((prev) => ({
          ...prev,
          tahunAjaranId: tahunAktif.id,
        }));
      }
    } catch (err) {
      console.error("Gagal mengambil tahun ajaran:", err);

      setError(
        err?.message ||
          "Gagal mengambil data tahun ajaran. Silakan coba lagi."
      );
    } finally {
      setLoadingTahun(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.nama.trim()) {
      setError("Nama kelas wajib diisi.");
      return;
    }

    if (!form.tingkat) {
      setError("Tingkat kelas wajib dipilih.");
      return;
    }

    if (!form.tahunAjaranId) {
      setError("Tahun ajaran wajib dipilih.");
      return;
    }

    if (!form.kapasitas) {
      setError("Kapasitas kelas wajib diisi.");
      return;
    }

    const kapasitas = Number(form.kapasitas);

    if (Number.isNaN(kapasitas)) {
      setError("Kapasitas harus berupa angka.");
      return;
    }

    if (kapasitas < 1) {
      setError("Kapasitas kelas minimal 1 siswa.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        nama: form.nama.trim(),
        tingkat: Number(form.tingkat),
        tahunAjaranId: form.tahunAjaranId,
        kapasitas,
        waliKelasId: null,
        lantaiId: null,
        fotoKelasUrl: null,
      };

      console.log("PAYLOAD CREATE KELAS:", payload);

      await createKelas(payload);

      setSuccess("Kelas berhasil ditambahkan.");

      setTimeout(() => {
        router.push("/admin/kelas");
      }, 800);
    } catch (err) {
      console.error("Gagal menambahkan kelas:", err);

      setError(
        err?.message ||
          "Gagal menambahkan kelas. Silakan periksa data dan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100">
      <Sidebar
        active="kelas"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          toggleSidebar={() => setIsCollapsed((prev) => !prev)}
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email: "admin@smartschool.com",
            avatar: "AD",
          }}
        />

        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full px-4 py-5 sm:px-5 sm:py-6 md:px-6 lg:px-8 xl:px-10">
            {/* BACK */}
            <div className="mb-5">
              <button
                type="button"
                onClick={() => router.push("/admin/kelas")}
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-slate-600
                  transition-colors
                  hover:text-blue-700
                "
              >
                <ArrowLeft
                  size={18}
                  className="transition-transform duration-200 group-hover:-translate-x-1"
                />

                <span>Kembali ke Daftar Kelas</span>
              </button>
            </div>

            {/* HEADER */}
            <div className="mb-6 flex min-w-0 items-center gap-3 sm:gap-4">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-600
                  text-white
                  shadow-md
                  shadow-blue-200
                  sm:h-12
                  sm:w-12
                "
              >
                <Plus size={21} />
              </div>

              <div className="min-w-0 flex-1">
                <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
                  Tambah Kelas
                </h1>

                <p className="mt-1 text-sm text-slate-600">
                  Tambahkan data kelas baru ke sekolah
                </p>
              </div>
            </div>

            {/* ALERT ERROR */}
            {error && (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-100">
                  <X size={16} className="text-rose-600" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-rose-800">
                    Gagal menyimpan
                  </p>

                  <p className="mt-1 text-sm leading-relaxed text-rose-700">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* ALERT SUCCESS */}
            {success && (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                  <CheckCircle
                    size={16}
                    className="text-emerald-600"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-emerald-800">
                    Berhasil
                  </p>

                  <p className="mt-1 text-sm text-emerald-700">
                    {success}
                  </p>
                </div>
              </div>
            )}

            {/* CARD */}
            <form
              onSubmit={handleSubmit}
              className="
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-slate-300
                bg-white
                shadow-sm
              "
            >
              {/* CARD HEADER */}
              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-3
                  border-b
                  border-slate-200
                  bg-slate-100/60
                  px-5
                  py-4
                  sm:px-6
                  md:px-7
                "
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <GraduationCap
                    size={18}
                    className="text-blue-700"
                  />
                </div>

                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-slate-800">
                    Informasi Kelas
                  </h2>

                  <p className="mt-0.5 text-sm text-slate-600">
                    Lengkapi data kelas sesuai data sekolah
                  </p>
                </div>
              </div>

              {/* FORM */}
              <div className="w-full p-5 sm:p-6 md:p-7 lg:p-8">
                <div className="grid w-full grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2 lg:gap-x-8 lg:gap-y-6">
                  {/* NAMA */}
                  <FormInput
                    label="Nama Kelas"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    placeholder="Contoh: X RPL 1"
                    icon={GraduationCap}
                    required
                  />

                  {/* TINGKAT */}
                  <FormSelect
                    label="Tingkat"
                    name="tingkat"
                    value={form.tingkat}
                    onChange={handleChange}
                    icon={School}
                    required
                  >
                    <option value="">Pilih tingkat</option>

                    {TINGKAT_OPTIONS.map((item) => (
                      <option
                        key={item.value}
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                  </FormSelect>

                  {/* TAHUN AJARAN */}
                  <FormSelect
                    label="Tahun Ajaran"
                    name="tahunAjaranId"
                    value={form.tahunAjaranId}
                    onChange={handleChange}
                    icon={CalendarDays}
                    required
                    disabled={loadingTahun}
                  >
                    <option value="">
                      {loadingTahun
                        ? "Memuat tahun ajaran..."
                        : "Pilih tahun ajaran"}
                    </option>

                    {tahunAjaranList.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nama} - {item.semester}
                        {item.status === "aktif"
                          ? " (Aktif)"
                          : ""}
                      </option>
                    ))}
                  </FormSelect>

                  {/* KAPASITAS */}
                  <FormInput
                    label="Kapasitas Kelas"
                    name="kapasitas"
                    value={form.kapasitas}
                    onChange={handleChange}
                    placeholder="Contoh: 36"
                    icon={Users}
                    type="number"
                    min="1"
                    required
                  />
                </div>

                {/* INFORMATION */}
                <div className="mt-7 flex w-full items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <Info
                      size={16}
                      className="text-blue-700"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-blue-800">
                      Informasi
                    </p>

                    <p className="mt-1 text-sm leading-relaxed text-blue-700">
                      Data kelas akan disimpan langsung ke database
                      sekolah. Wali kelas dan lokasi kelas dapat
                      dihubungkan setelah data guru dan sarana
                      tersedia.
                    </p>
                  </div>
                </div>

                {/* BACKEND INFO */}
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                      <Hash
                        size={17}
                        className="text-slate-600"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Tingkat
                      </p>

                      <p className="mt-0.5 text-sm text-slate-700">
                        X, XI, atau XII
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                      <CheckCircle
                        size={17}
                        className="text-emerald-600"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Terhubung Backend
                      </p>

                      <p className="mt-0.5 text-sm text-emerald-700">
                        Database sekolah
                      </p>
                    </div>
                  </div>
                </div>

                {/* ACTION */}
                <div
                  className="
                    mt-7
                    flex
                    w-full
                    flex-col-reverse
                    gap-3
                    border-t
                    border-slate-200
                    pt-6
                    sm:flex-row
                    sm:items-center
                    sm:justify-end
                  "
                >
                  <button
                    type="button"
                    onClick={() => router.push("/admin/kelas")}
                    disabled={loading}
                    className="
                      inline-flex
                      min-h-11
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-slate-300
                      px-6
                      py-2.5
                      text-sm
                      font-medium
                      text-slate-700
                      transition-all
                      hover:border-slate-400
                      hover:bg-slate-50
                      hover:text-slate-900
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                      sm:w-auto
                    "
                  >
                    <X size={17} />
                    Batal
                  </button>

                  <button
                    type="submit"
                    disabled={loading || loadingTahun}
                    className="
                      inline-flex
                      min-h-11
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-blue-600
                      px-7
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                      shadow-md
                      shadow-blue-200
                      transition-all
                      hover:bg-blue-700
                      hover:shadow-lg
                      hover:shadow-blue-200/60
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      sm:w-auto
                    "
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <Save size={17} />
                        <span>Simpan Kelas</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="w-full pb-5 pt-6 text-center">
              <p className="text-sm text-slate-500">
                © 2026 SmartSchool • Tambah Kelas
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}