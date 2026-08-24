"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  ArrowLeft,
  Upload,
  FileSpreadsheet,
  CheckCircle,
  XCircle,
  UserPlus,
  User,
  Download,
  Info,
} from "lucide-react";

const STORAGE_KEY = "siswa_data";

// =========================================================
// LOCAL STORAGE
// =========================================================
const loadSiswa = () => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);

  try {
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveSiswa = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// =========================================================
// DAFTAR KELAS
// =========================================================
const KELAS_LIST = [
  "X IPA 1",
  "X IPA 2",
  "X IPA 3",
  "X IPS 1",
  "X IPS 2",
  "X IPS 3",
  "X RPL 1",
  "X RPL 2",
  "X TKJ 1",
  "X TKJ 2",

  "XI IPA 1",
  "XI IPA 2",
  "XI IPA 3",
  "XI IPS 1",
  "XI IPS 2",
  "XI IPS 3",
  "XI RPL 1",
  "XI RPL 2",
  "XI TKJ 1",
  "XI TKJ 2",

  "XII IPA 1",
  "XII IPA 2",
  "XII IPA 3",
  "XII IPS 1",
  "XII IPS 2",
  "XII IPS 3",
  "XII RPL 1",
  "XII RPL 2",
  "XII TKJ 1",
  "XII TKJ 2",
];

// =========================================================
// COMPONENT
// =========================================================
export default function TambahSiswaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode = searchParams.get("mode") || "form";

  const [isCollapsed, setIsCollapsed] = useState(false);

  const [activeTab, setActiveTab] = useState(
    mode === "import" ? "import" : "form"
  );

  const [formData, setFormData] = useState({
    nama: "",
    nis: "",
    kelas: "",
    email: "",
    phone: "",
    status: "Aktif",
    alamat: "",
    tglLahir: "",
    gender: "L",
    joinDate: new Date().toISOString().slice(0, 10),
  });

  const [file, setFile] = useState(null);
  const [importStatus, setImportStatus] = useState(null);
  const [importMessage, setImportMessage] = useState("");
  const [saving, setSaving] = useState(false);

  // =========================================================
  // FORM CHANGE
  // =========================================================
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // TAMBAH SISWA MANUAL
  // =========================================================
  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!formData.nama.trim()) {
      alert("Nama lengkap wajib diisi!");
      return;
    }

    if (!formData.nis.trim()) {
      alert("NIS wajib diisi!");
      return;
    }

    if (!formData.kelas) {
      alert("Kelas wajib dipilih!");
      return;
    }

    setSaving(true);

    const list = loadSiswa();

    const maxId =
      list.length > 0
        ? Math.max(...list.map((s) => Number(s.id) || 0))
        : 0;

    const newSiswa = {
      ...formData,
      id: maxId + 1,
    };

    saveSiswa([...list, newSiswa]);

    alert("Siswa berhasil ditambahkan!");

    router.push("/admin/siswa");
  };

  // =========================================================
  // FILE CHANGE
  // =========================================================
  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    setFile(selected);
    setImportStatus(null);
    setImportMessage("");
  };

  // =========================================================
  // DROP FILE
  // =========================================================
  const handleDrop = (e) => {
    e.preventDefault();

    const dropped = e.dataTransfer.files?.[0];

    if (!dropped) return;

    const validExtensions = [".xlsx", ".xls", ".csv"];

    const isValid = validExtensions.some((ext) =>
      dropped.name.toLowerCase().endsWith(ext)
    );

    if (!isValid) {
      setImportStatus("error");
      setImportMessage(
        "Format file tidak sesuai. Gunakan file .xlsx, .xls, atau .csv."
      );
      return;
    }

    setFile(dropped);
    setImportStatus(null);
    setImportMessage("");
  };

  // =========================================================
  // IMPORT DATA
  // =========================================================
  const handleImport = () => {
    if (!file) {
      setImportStatus("error");
      setImportMessage("Silakan pilih file terlebih dahulu.");
      return;
    }

    const list = loadSiswa();

    const maxId =
      list.length > 0
        ? Math.max(...list.map((s) => Number(s.id) || 0))
        : 0;

    // -------------------------------------------------------
    // DATA SIMULASI IMPORT
    // -------------------------------------------------------
    const newSiswa = [
      {
        id: maxId + 1,
        nama: "Imported Student 1",
        nis: "9999001",
        kelas: "X IPA 1",
        email: "import1@sekolah.com",
        phone: "081234567800",
        status: "Aktif",
        alamat: "Jl. Import No. 1",
        tglLahir: "2005-01-01",
        gender: "L",
        joinDate: "2024-07-01",
      },
      {
        id: maxId + 2,
        nama: "Imported Student 2",
        nis: "9999002",
        kelas: "X IPA 2",
        email: "import2@sekolah.com",
        phone: "081234567801",
        status: "Aktif",
        alamat: "Jl. Import No. 2",
        tglLahir: "2005-02-01",
        gender: "P",
        joinDate: "2024-07-01",
      },
      {
        id: maxId + 3,
        nama: "Imported Student 3",
        nis: "9999003",
        kelas: "XI IPS 1",
        email: "import3@sekolah.com",
        phone: "081234567802",
        status: "Aktif",
        alamat: "Jl. Import No. 3",
        tglLahir: "2004-03-01",
        gender: "L",
        joinDate: "2024-07-01",
      },
      {
        id: maxId + 4,
        nama: "Imported Student 4",
        nis: "9999004",
        kelas: "XI RPL 1",
        email: "import4@sekolah.com",
        phone: "081234567803",
        status: "Aktif",
        alamat: "Jl. Import No. 4",
        tglLahir: "2004-04-01",
        gender: "P",
        joinDate: "2024-07-01",
      },
      {
        id: maxId + 5,
        nama: "Imported Student 5",
        nis: "9999005",
        kelas: "XII RPL 1",
        email: "import5@sekolah.com",
        phone: "081234567804",
        status: "Aktif",
        alamat: "Jl. Import No. 5",
        tglLahir: "2003-05-01",
        gender: "L",
        joinDate: "2024-07-01",
      },
    ];

    const updated = [...list, ...newSiswa];

    saveSiswa(updated);

    setImportStatus("success");
    setImportMessage(
      `Berhasil mengimport ${newSiswa.length} siswa!`
    );

    setTimeout(() => {
      router.push("/admin/siswa");
    }, 1800);
  };

  // =========================================================
  // DOWNLOAD TEMPLATE
  // =========================================================
  const handleDownloadTemplate = () => {
    const header =
      "Nama,NIS,Kelas,Email,Telepon,Status,Alamat,Tanggal Lahir,Jenis Kelamin,Tanggal Bergabung";

    const example =
      "Ahmad Fauzan,2401001,X IPA 1,ahmad@sekolah.com,081234567890,Aktif,Jl. Merdeka No. 1,2006-05-10,L,2024-07-01";

    const csvContent = `${header}\n${example}`;

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "template_data_siswa.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =========================================================
  // RENDER
  // =========================================================
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <Sidebar
        active="siswa"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      {/* =====================================================
          MAIN APPLICATION
      ====================================================== */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* HEADER */}
        <Header
          toggleSidebar={() => setIsCollapsed(!isCollapsed)}
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email: "admin@smartschool.com",
            avatar: "AD",
          }}
        />

        {/* ===================================================
            CONTENT
        ==================================================== */}
        <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full px-3 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 lg:px-8 lg:py-8">
            <div className="mx-auto w-full max-w-[1400px]">
              {/* =================================================
                  TOP NAVIGATION
              ================================================== */}
              <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex w-fit items-center gap-2 rounded-lg text-sm font-medium text-slate-500 transition hover:text-slate-800"
                >
                  <ArrowLeft size={17} />
                  <span>Kembali</span>
                </button>

                <span className="hidden text-xs text-slate-400 sm:block">
                  Admin Sekolah / Siswa / Tambah
                </span>
              </div>

              {/* =================================================
                  PAGE TITLE
              ================================================== */}
              <div className="mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <UserPlus size={20} />
                  </div>

                  <div className="min-w-0">
                    <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
                      Tambah Siswa
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                      Tambahkan data peserta didik secara manual atau melalui
                      import file.
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  TAB NAVIGATION
              ================================================== */}
              <div className="mb-5 w-full overflow-x-auto">
                <div className="flex min-w-max gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setActiveTab("form")}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition sm:px-5 ${
                      activeTab === "form"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                    }`}
                  >
                    <User size={16} />
                    Form Biasa
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("import")}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition sm:px-5 ${
                      activeTab === "import"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                    }`}
                  >
                    <FileSpreadsheet size={16} />
                    Import Data
                  </button>
                </div>
              </div>

              {/* =================================================
                  FORM BIASA
              ================================================== */}
              {activeTab === "form" && (
                <div className="w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                  {/* CARD HEADER */}
                  <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50/70 via-white to-cyan-50/50 px-4 py-4 sm:px-6 sm:py-5 lg:px-7">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <UserPlus size={19} />
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-sm font-semibold text-slate-800 sm:text-base">
                          Data Siswa Baru
                        </h2>

                        <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">
                          Lengkapi informasi siswa dengan benar.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* FORM */}
                  <form onSubmit={handleSubmitForm}>
                    <div className="p-4 sm:p-6 lg:p-7">
                      {/* DATA UTAMA */}
                      <div className="mb-6">
                        <div className="mb-4">
                          <h3 className="text-sm font-semibold text-slate-700">
                            Data Utama
                          </h3>

                          <p className="mt-1 text-xs text-slate-400">
                            Informasi dasar peserta didik.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                          {/* NAMA */}
                          <div className="min-w-0">
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                              Nama Lengkap{" "}
                              <span className="text-rose-500">*</span>
                            </label>

                            <input
                              type="text"
                              name="nama"
                              value={formData.nama}
                              onChange={handleFormChange}
                              placeholder="Contoh: Ahmad Fauzan"
                              required
                              className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                            />
                          </div>

                          {/* NIS */}
                          <div className="min-w-0">
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                              NIS <span className="text-rose-500">*</span>
                            </label>

                            <input
                              type="text"
                              name="nis"
                              value={formData.nis}
                              onChange={handleFormChange}
                              placeholder="2401001"
                              required
                              className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                            />
                          </div>

                          {/* KELAS */}
                          <div className="min-w-0">
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                              Kelas <span className="text-rose-500">*</span>
                            </label>

                            <select
                              name="kelas"
                              value={formData.kelas}
                              onChange={handleFormChange}
                              required
                              className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                            >
                              <option value="">Pilih Kelas</option>

                              {KELAS_LIST.map((kelas) => (
                                <option key={kelas} value={kelas}>
                                  {kelas}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* STATUS */}
                          <div className="min-w-0">
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                              Status
                            </label>

                            <select
                              name="status"
                              value={formData.status}
                              onChange={handleFormChange}
                              className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                            >
                              <option value="Aktif">Aktif</option>
                              <option value="Nonaktif">Nonaktif</option>
                            </select>
                          </div>

                          {/* GENDER */}
                          <div className="min-w-0">
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                              Jenis Kelamin
                            </label>

                            <select
                              name="gender"
                              value={formData.gender}
                              onChange={handleFormChange}
                              className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                            >
                              <option value="L">Laki-laki</option>
                              <option value="P">Perempuan</option>
                            </select>
                          </div>

                          {/* TANGGAL LAHIR */}
                          <div className="min-w-0">
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                              Tanggal Lahir
                            </label>

                            <input
                              type="date"
                              name="tglLahir"
                              value={formData.tglLahir}
                              onChange={handleFormChange}
                              className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                            />
                          </div>

                          {/* TANGGAL BERGABUNG */}
                          <div className="min-w-0">
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                              Tanggal Bergabung
                            </label>

                            <input
                              type="date"
                              name="joinDate"
                              value={formData.joinDate}
                              onChange={handleFormChange}
                              className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                            />
                          </div>
                        </div>
                      </div>

                      {/* KONTAK */}
                      <div className="mb-6 border-t border-slate-100 pt-6">
                        <div className="mb-4">
                          <h3 className="text-sm font-semibold text-slate-700">
                            Informasi Kontak
                          </h3>

                          <p className="mt-1 text-xs text-slate-400">
                            Informasi kontak dan alamat siswa.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          {/* EMAIL */}
                          <div className="min-w-0">
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                              Email
                            </label>

                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleFormChange}
                              placeholder="siswa@sekolah.com"
                              className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                            />
                          </div>

                          {/* TELEPON */}
                          <div className="min-w-0">
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                              Telepon
                            </label>

                            <input
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleFormChange}
                              placeholder="081234567890"
                              className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                            />
                          </div>

                          {/* ALAMAT */}
                          <div className="min-w-0 md:col-span-2">
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                              Alamat
                            </label>

                            <textarea
                              name="alamat"
                              value={formData.alamat}
                              onChange={handleFormChange}
                              rows={3}
                              placeholder="Jl. Contoh No. 1, Kota"
                              className="w-full min-w-0 resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                            />
                          </div>
                        </div>
                      </div>

                      {/* ACTION */}
                      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                        <button
                          type="button"
                          onClick={() => router.back()}
                          className="w-full rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 sm:w-auto"
                        >
                          Batal
                        </button>

                        <button
                          type="submit"
                          disabled={saving}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:shadow-lg hover:shadow-blue-200 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                          {saving ? (
                            <>
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                              Menyimpan...
                            </>
                          ) : (
                            <>
                              <UserPlus size={17} />
                              Simpan Siswa
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* =================================================
                  IMPORT DATA
              ================================================== */}
              {activeTab === "import" && (
                <div className="w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                  {/* HEADER */}
                  <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50/70 via-white to-blue-50/50 px-4 py-5 text-center sm:px-6 lg:px-8">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                      <FileSpreadsheet size={27} />
                    </div>

                    <h2 className="mt-3 text-lg font-semibold text-slate-800">
                      Import Data Siswa
                    </h2>

                    <p className="mx-auto mt-1 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">
                      Upload file Excel atau CSV untuk menambahkan banyak data
                      siswa sekaligus.
                    </p>
                  </div>

                  <div className="p-4 sm:p-6 lg:p-8">
                    {/* INFO */}
                    <div className="mb-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                      <Info
                        size={18}
                        className="mt-0.5 shrink-0 text-blue-600"
                      />

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-blue-800">
                          Format file
                        </p>

                        <p className="mt-1 text-xs leading-5 text-blue-700/80 sm:text-sm">
                          Pastikan file memiliki kolom{" "}
                          <strong>Nama, NIS, dan Kelas</strong>. Kolom lainnya
                          dapat diisi sesuai kebutuhan.
                        </p>
                      </div>
                    </div>

                    {/* UPLOAD AREA */}
                    <div
                      className={`w-full rounded-2xl border-2 border-dashed p-6 text-center transition-all sm:p-10 ${
                        file
                          ? "border-blue-300 bg-blue-50/30"
                          : "border-slate-300 bg-slate-50/50 hover:border-blue-400 hover:bg-blue-50/30"
                      }`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={handleFileChange}
                        className="hidden"
                        id="fileInput"
                      />

                      <label
                        htmlFor="fileInput"
                        className="block cursor-pointer"
                      >
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-500 shadow-sm">
                          <Upload size={27} />
                        </div>

                        <p className="mt-4 break-words px-2 text-sm font-medium text-slate-700 sm:text-base">
                          {file
                            ? file.name
                            : "Seret file ke sini atau klik untuk memilih"}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Format yang didukung: .xlsx, .xls, .csv
                        </p>

                        <span className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-blue-700">
                          Pilih File
                        </span>
                      </label>
                    </div>

                    {/* SELECTED FILE */}
                    {file && (
                      <div className="mt-4 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <FileSpreadsheet size={19} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-700">
                              {file.name}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {(file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setFile(null);
                            setImportStatus(null);
                            setImportMessage("");
                          }}
                          className="flex w-fit items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-rose-500 transition hover:bg-rose-50 hover:text-rose-600"
                        >
                          <XCircle size={17} />
                          Hapus File
                        </button>
                      </div>
                    )}

                    {/* TEMPLATE */}
                    <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-700">
                            Belum punya template?
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            Gunakan template CSV berikut sebagai contoh format
                            data siswa.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={handleDownloadTemplate}
                          className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:w-auto"
                        >
                          <Download size={15} />
                          Download Template
                        </button>
                      </div>
                    </div>

                    {/* STATUS */}
                    {importStatus && (
                      <div
                        className={`mt-5 flex items-start gap-3 rounded-xl border p-4 ${
                          importStatus === "success"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-rose-200 bg-rose-50 text-rose-700"
                        }`}
                      >
                        {importStatus === "success" ? (
                          <CheckCircle
                            size={19}
                            className="mt-0.5 shrink-0"
                          />
                        ) : (
                          <XCircle
                            size={19}
                            className="mt-0.5 shrink-0"
                          />
                        )}

                        <span className="text-sm font-medium">
                          {importMessage}
                        </span>
                      </div>
                    )}

                    {/* ACTION */}
                    <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={() => router.back()}
                        className="w-full rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 sm:w-auto"
                      >
                        Batal
                      </button>

                      <button
                        type="button"
                        onClick={handleImport}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:shadow-lg hover:shadow-blue-200 sm:w-auto"
                      >
                        <Upload size={17} />
                        Import Data
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================
                  FOOTER
              ================================================== */}
              <div className="py-5 text-center text-[11px] text-slate-400">
                © 2026 SmartSchool • Tambah Data Siswa
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}