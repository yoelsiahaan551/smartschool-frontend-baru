"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "../../../../components/Header";
import Sidebar from "../../../../components/Sidebar";
import {
  GraduationCap,
  Save,
  X,
  School,
  UserCheck,
  Hash,
  Users,
  MapPin,
  CalendarDays,
  CheckCircle,
  ChevronDown,
  ArrowLeft,
  Edit3,
  Loader2,
  Info,
} from "lucide-react";

const STORAGE_KEY = "kelas_data";

/* =========================================================
   LOCAL STORAGE
========================================================= */

const loadKelas = () => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Gagal membaca data kelas:", error);
    return [];
  }
};

const saveKelas = (data) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Gagal menyimpan data kelas:", error);
  }
};

/* =========================================================
   PAGE
========================================================= */

export default function AdminKelasEditPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params?.id);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    jenjang: "X",
    wali_kelas: "",
    nip_wali: "",
    jumlah_siswa: "",
    ruangan: "",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  });

  /* =========================================================
     SIDEBAR
  ========================================================= */

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  /* =========================================================
     LOAD DATA
  ========================================================= */

  useEffect(() => {
    if (!id || Number.isNaN(id)) {
      setNotFound(true);
      setPageLoading(false);
      return;
    }

    const data = loadKelas();

    const item = data.find(
      (kelas) => Number(kelas.id) === id
    );

    if (!item) {
      setNotFound(true);
      setPageLoading(false);
      return;
    }

    setForm({
      nama: item.nama || "",
      jenjang: item.jenjang || "X",
      wali_kelas: item.wali_kelas || "",
      nip_wali: item.nip_wali || "",
      jumlah_siswa:
        item.jumlah_siswa !== undefined &&
        item.jumlah_siswa !== null
          ? String(item.jumlah_siswa)
          : "",
      ruangan: item.ruangan || "",
      tahun_ajaran:
        item.tahun_ajaran || "2026/2027",
      status: item.status || "aktif",
    });

    setPageLoading(false);
  }, [id]);

  /* =========================================================
     HANDLE INPUT
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = () => {
    if (!form.nama.trim()) {
      alert("Nama kelas wajib diisi!");
      return;
    }

    if (!form.wali_kelas.trim()) {
      alert("Wali kelas wajib diisi!");
      return;
    }

    if (
      form.jumlah_siswa !== "" &&
      (Number.isNaN(Number(form.jumlah_siswa)) ||
        Number(form.jumlah_siswa) < 0)
    ) {
      alert("Jumlah siswa harus berupa angka yang valid!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const currentData = loadKelas();

      const updatedData = currentData.map((item) =>
        Number(item.id) === id
          ? {
              ...item,
              ...form,
              id: item.id,
              jumlah_siswa:
                Number(form.jumlah_siswa) || 0,
            }
          : item
      );

      saveKelas(updatedData);

      setLoading(false);

      alert("Data kelas berhasil diperbarui!");

      router.push("/admin/kelas");
    }, 500);
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (pageLoading) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-slate-50">
        <Sidebar
          active="kelas"
          setActive={() => {}}
          collapsed={isCollapsed}
          setCollapsed={setIsCollapsed}
        />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Header
            toggleSidebar={toggleSidebar}
            notifications={[]}
            user={{
              name: "Admin Sekolah",
              email: "admin@smartschool.com",
              avatar: "AD",
            }}
          />

          <main className="flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2
                size={28}
                className="animate-spin text-blue-600"
              />

              <p className="text-sm text-slate-500">
                Memuat data kelas...
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  /* =========================================================
     NOT FOUND
  ========================================================= */

  if (notFound) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-slate-50">
        <Sidebar
          active="kelas"
          setActive={() => {}}
          collapsed={isCollapsed}
          setCollapsed={setIsCollapsed}
        />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Header
            toggleSidebar={toggleSidebar}
            notifications={[]}
            user={{
              name: "Admin Sekolah",
              email: "admin@smartschool.com",
              avatar: "AD",
            }}
          />

          <main className="flex flex-1 items-center justify-center overflow-y-auto p-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50">
                <X
                  size={30}
                  className="text-rose-500"
                />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-slate-800">
                Data Tidak Ditemukan
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Kelas yang Anda cari tidak tersedia
                atau mungkin telah dihapus dari sistem.
              </p>

              <button
                type="button"
                onClick={() =>
                  router.push("/admin/kelas")
                }
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
              >
                <ArrowLeft size={16} />
                Kembali ke Daftar Kelas
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  /* =========================================================
     MAIN PAGE
  ========================================================= */

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar
        active="kelas"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      {/* =====================================================
          CONTENT WRAPPER
      ===================================================== */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* ===================================================
            HEADER
        =================================================== */}

        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email: "admin@smartschool.com",
            avatar: "AD",
          }}
        />

        {/* ===================================================
            MAIN
        =================================================== */}

        <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full px-3 py-4 sm:px-5 sm:py-5 lg:px-6 xl:px-8">
            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="mb-5 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* LEFT */}
              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    router.push("/admin/kelas")
                  }
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-700"
                  title="Kembali"
                >
                  <ArrowLeft size={18} />
                </button>

                <div className="flex min-w-0 items-center gap-3">
                  {/* ICON */}
                  <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:flex">
                    <Edit3 size={19} />
                  </div>

                  {/* TITLE */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h1 className="truncate text-lg font-semibold tracking-tight text-slate-800 sm:text-xl">
                        Edit Kelas
                      </h1>

                      <span className="hidden rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 sm:inline-flex">
                        ID {id}
                      </span>
                    </div>

                    <p className="truncate text-xs text-slate-500 sm:text-sm">
                      Perbarui informasi kelas dan wali kelas
                    </p>
                  </div>
                </div>
              </div>

              {/* STATUS */}
              <div className="flex shrink-0 items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm sm:self-auto">
                <span
                  className={`h-2 w-2 rounded-full ${
                    form.status === "aktif"
                      ? "bg-emerald-500"
                      : "bg-slate-400"
                  }`}
                />

                <span className="text-xs font-medium capitalize text-slate-600">
                  {form.status === "aktif"
                    ? "Kelas Aktif"
                    : "Nonaktif"}
                </span>
              </div>
            </div>

            {/* =================================================
                FORM CARD
            ================================================= */}

            <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* =================================================
                  CARD HEADER
              ================================================= */}

              <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-4 py-4 sm:px-6 lg:px-7">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <School size={18} />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-sm font-semibold text-slate-800">
                      Informasi Kelas
                    </h2>

                    <p className="mt-0.5 text-xs leading-5 text-slate-500">
                      Pastikan data yang dimasukkan
                      sesuai dengan informasi akademik
                      sekolah.
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  FORM BODY
              ================================================= */}

              <div className="w-full p-4 sm:p-6 lg:p-7">
                <div className="grid w-full grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                  {/* =================================================
                      NAMA KELAS
                  ================================================= */}

                  <div className="min-w-0 md:col-span-2">
                    <label
                      htmlFor="nama"
                      className="mb-1.5 block text-xs font-semibold text-slate-600"
                    >
                      Nama Kelas
                      <span className="ml-1 text-rose-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <GraduationCap
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="nama"
                        type="text"
                        name="nama"
                        value={form.nama}
                        onChange={handleChange}
                        placeholder="Contoh: X RPL 1"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  {/* =================================================
                      JENJANG
                  ================================================= */}

                  <div className="min-w-0">
                    <label
                      htmlFor="jenjang"
                      className="mb-1.5 block text-xs font-semibold text-slate-600"
                    >
                      Jenjang
                      <span className="ml-1 text-rose-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <School
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <select
                        id="jenjang"
                        name="jenjang"
                        value={form.jenjang}
                        onChange={handleChange}
                        className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-9 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      >
                        <option value="X">
                          X (Sepuluh)
                        </option>

                        <option value="XI">
                          XI (Sebelas)
                        </option>

                        <option value="XII">
                          XII (Dua Belas)
                        </option>
                      </select>

                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>

                  {/* =================================================
                      TAHUN AJARAN
                  ================================================= */}

                  <div className="min-w-0">
                    <label
                      htmlFor="tahun_ajaran"
                      className="mb-1.5 block text-xs font-semibold text-slate-600"
                    >
                      Tahun Ajaran
                    </label>

                    <div className="relative">
                      <CalendarDays
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <select
                        id="tahun_ajaran"
                        name="tahun_ajaran"
                        value={form.tahun_ajaran}
                        onChange={handleChange}
                        className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-9 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      >
                        <option value="2024/2025">
                          2024/2025
                        </option>

                        <option value="2025/2026">
                          2025/2026
                        </option>

                        <option value="2026/2027">
                          2026/2027
                        </option>
                      </select>

                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>

                  {/* =================================================
                      WALI KELAS
                  ================================================= */}

                  <div className="min-w-0">
                    <label
                      htmlFor="wali_kelas"
                      className="mb-1.5 block text-xs font-semibold text-slate-600"
                    >
                      Wali Kelas
                      <span className="ml-1 text-rose-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <UserCheck
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="wali_kelas"
                        type="text"
                        name="wali_kelas"
                        value={form.wali_kelas}
                        onChange={handleChange}
                        placeholder="Nama wali kelas"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  {/* =================================================
                      NIP
                  ================================================= */}

                  <div className="min-w-0">
                    <label
                      htmlFor="nip_wali"
                      className="mb-1.5 block text-xs font-semibold text-slate-600"
                    >
                      NIP Wali Kelas
                    </label>

                    <div className="relative">
                      <Hash
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="nip_wali"
                        type="text"
                        name="nip_wali"
                        value={form.nip_wali}
                        onChange={handleChange}
                        placeholder="NIP wali kelas"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  {/* =================================================
                      JUMLAH SISWA
                  ================================================= */}

                  <div className="min-w-0">
                    <label
                      htmlFor="jumlah_siswa"
                      className="mb-1.5 block text-xs font-semibold text-slate-600"
                    >
                      Jumlah Siswa
                    </label>

                    <div className="relative">
                      <Users
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="jumlah_siswa"
                        type="number"
                        name="jumlah_siswa"
                        value={form.jumlah_siswa}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  {/* =================================================
                      RUANGAN
                  ================================================= */}

                  <div className="min-w-0">
                    <label
                      htmlFor="ruangan"
                      className="mb-1.5 block text-xs font-semibold text-slate-600"
                    >
                      Ruangan
                    </label>

                    <div className="relative">
                      <MapPin
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="ruangan"
                        type="text"
                        name="ruangan"
                        value={form.ruangan}
                        onChange={handleChange}
                        placeholder="Contoh: R. 101"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  {/* =================================================
                      STATUS
                  ================================================= */}

                  <div className="min-w-0">
                    <label
                      htmlFor="status"
                      className="mb-1.5 block text-xs font-semibold text-slate-600"
                    >
                      Status
                    </label>

                    <div className="relative">
                      <CheckCircle
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <select
                        id="status"
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-9 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      >
                        <option value="aktif">
                          Aktif
                        </option>

                        <option value="nonaktif">
                          Nonaktif
                        </option>
                      </select>

                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>
                </div>

                {/* =================================================
                    INFO
                ================================================= */}

                <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3">
                  <Info
                    size={17}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <p className="text-xs leading-5 text-blue-700">
                    Kolom bertanda{" "}
                    <span className="font-semibold text-rose-500">
                      *
                    </span>{" "}
                    wajib diisi sebelum data diperbarui.
                  </p>
                </div>

                {/* =================================================
                    ACTION BUTTON
                ================================================= */}

                <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      router.push("/admin/kelas")
                    }
                    disabled={loading}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    <X size={16} />
                    Batal
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {loading ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Simpan Perubahan
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* =================================================
                FOOTER
            ================================================= */}

            <p className="mt-4 pb-3 text-center text-[11px] text-slate-400">
              SmartSchool • Administrasi Kelas
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

