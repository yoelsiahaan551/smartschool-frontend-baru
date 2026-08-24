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
} from "lucide-react";

const STORAGE_KEY = "guru_data";

const loadGuru = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveGuru = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const MAPEL_LIST = [
  "Matematika",
  "Bahasa Indonesia",
  "Fisika",
  "Biologi",
  "Kimia",
  "Bahasa Inggris",
  "Sejarah",
  "PKN",
  "Agama",
  "Seni Budaya",
  "PJOK",
  "TIK",
  "Prakarya",
];

export default function TambahGuruPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode = searchParams.get("mode") || "form";

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(
    mode === "import" ? "import" : "form"
  );

  // =========================
  // FORM STATE
  // =========================
  const [formData, setFormData] = useState({
    nama: "",
    nip: "",
    mapel: "",
    email: "",
    phone: "",
    status: "Aktif",
    alamat: "",
    tglLahir: "",
    gender: "L",
    joinDate: new Date().toISOString().slice(0, 10),
  });

  // =========================
  // IMPORT STATE
  // =========================
  const [file, setFile] = useState(null);
  const [importStatus, setImportStatus] = useState(null);
  const [importMessage, setImportMessage] = useState("");

  // =========================
  // FORM CHANGE
  // =========================
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // SUBMIT FORM
  // =========================
  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!formData.nama || !formData.nip || !formData.mapel) {
      alert("Nama, NIP, dan Mapel wajib diisi!");
      return;
    }

    const list = loadGuru();

    const newId =
      list.length > 0
        ? Math.max(...list.map((g) => g.id)) + 1
        : 1;

    list.push({
      ...formData,
      id: newId,
    });

    saveGuru(list);

    alert("Guru berhasil ditambahkan!");

    router.push("/admin/guru");
  };

  // =========================
  // FILE CHANGE
  // =========================
  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (selected) {
      setFile(selected);
      setImportStatus(null);
      setImportMessage("");
    }
  };

  // =========================
  // IMPORT DATA
  // =========================
  const handleImport = () => {
    if (!file) {
      setImportStatus("error");
      setImportMessage("Silakan pilih file terlebih dahulu.");
      return;
    }

    // Simulasi import
    const list = loadGuru();

    const baseId =
      list.length > 0
        ? Math.max(...list.map((g) => g.id))
        : 0;

    const newGuru = [
      {
        id: baseId + 1,
        nama: "Imported Guru 1",
        nip: "199001012010011001",
        mapel: "Matematika",
        email: "import1@sekolah.com",
        phone: "081234567800",
        status: "Aktif",
        alamat: "Jl. Import No. 1",
        tglLahir: "1990-01-01",
        gender: "L",
        joinDate: "2010-01-01",
      },
      {
        id: baseId + 2,
        nama: "Imported Guru 2",
        nip: "199002012010011002",
        mapel: "Bahasa Indonesia",
        email: "import2@sekolah.com",
        phone: "081234567801",
        status: "Aktif",
        alamat: "Jl. Import No. 2",
        tglLahir: "1990-02-01",
        gender: "P",
        joinDate: "2010-01-01",
      },
    ];

    const updated = [...list, ...newGuru];

    saveGuru(updated);

    setImportStatus("success");
    setImportMessage(
      `Berhasil mengimport ${newGuru.length} guru!`
    );

    setTimeout(() => {
      router.push("/admin/guru");
    }, 2000);
  };

  // =========================
  // DROP FILE
  // =========================
  const handleDrop = (e) => {
    e.preventDefault();

    const dropped = e.dataTransfer.files[0];

    if (dropped) {
      setFile(dropped);
      setImportStatus(null);
      setImportMessage("");
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* SIDEBAR */}
      <Sidebar
        active="guru"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      {/* CONTENT AREA */}
      <div className="flex min-w-0 flex-1 flex-col h-full overflow-hidden">
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

        {/* MAIN */}
        <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full px-3 py-4 sm:px-4 md:px-6 lg:px-8 xl:px-10">
            <div className="w-full space-y-5 sm:space-y-6">

              {/* BACK BUTTON */}
              <button
                onClick={() => router.back()}
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  text-slate-500
                  transition
                  hover:text-slate-700
                "
              >
                <ArrowLeft size={16} />
                <span>Kembali</span>
              </button>

              {/* TITLE */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-emerald-50
                  text-emerald-600
                  sm:h-10
                  sm:w-10
                ">
                  <UserPlus size={20} />
                </div>

                <div className="min-w-0">
                  <h1 className="
                    text-xl
                    font-bold
                    text-slate-800
                    sm:text-2xl
                  ">
                    Tambah Guru
                  </h1>

                  <p className="
                    mt-0.5
                    text-xs
                    text-slate-500
                    sm:text-sm
                  ">
                    Tambahkan data guru baru ke sistem
                  </p>
                </div>
              </div>

              {/* =========================
                  TABS
              ========================= */}
              <div className="
                flex
                w-full
                gap-1
                overflow-x-auto
                border-b
                border-slate-200
                pb-1
                sm:gap-2
              ">
                <button
                  onClick={() => setActiveTab("form")}
                  className={`
                    shrink-0
                    rounded-t-xl
                    px-3
                    py-2.5
                    text-xs
                    font-medium
                    transition-all
                    sm:px-5
                    sm:text-sm
                    ${
                      activeTab === "form"
                        ? "border-b-2 border-emerald-500 bg-white text-emerald-600 shadow-sm"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                    }
                  `}
                >
                  Form Biasa
                </button>

                <button
                  onClick={() => setActiveTab("import")}
                  className={`
                    shrink-0
                    rounded-t-xl
                    px-3
                    py-2.5
                    text-xs
                    font-medium
                    transition-all
                    sm:px-5
                    sm:text-sm
                    ${
                      activeTab === "import"
                        ? "border-b-2 border-emerald-500 bg-white text-emerald-600 shadow-sm"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                    }
                  `}
                >
                  Import Data
                </button>
              </div>

              {/* =========================
                  FORM BIASA
              ========================= */}
              {activeTab === "form" && (
                <div className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200/80
                  bg-white
                  p-4
                  shadow-sm
                  sm:p-5
                  md:p-6
                  lg:p-7
                ">
                  <form
                    onSubmit={handleSubmitForm}
                    className="space-y-5"
                  >
                    {/* FORM GRID */}
                    <div className="
                      grid
                      grid-cols-1
                      gap-4
                      sm:grid-cols-2
                      lg:gap-5
                      xl:gap-6
                    ">

                      {/* NAMA */}
                      <div className="min-w-0">
                        <label className="
                          mb-1.5
                          block
                          text-sm
                          font-medium
                          text-slate-700
                        ">
                          Nama Lengkap *
                        </label>

                        <input
                          type="text"
                          name="nama"
                          value={formData.nama}
                          onChange={handleFormChange}
                          placeholder="Contoh: Dr. Ahmad Fauzi, M.Pd."
                          required
                          className="
                            w-full
                            min-w-0
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-4
                            py-2.5
                            text-sm
                            text-slate-700
                            outline-none
                            transition
                            placeholder:text-slate-400
                            focus:border-emerald-400
                            focus:ring-2
                            focus:ring-emerald-500/20
                          "
                        />
                      </div>

                      {/* NIP */}
                      <div className="min-w-0">
                        <label className="
                          mb-1.5
                          block
                          text-sm
                          font-medium
                          text-slate-700
                        ">
                          NIP *
                        </label>

                        <input
                          type="text"
                          name="nip"
                          value={formData.nip}
                          onChange={handleFormChange}
                          placeholder="198501012010011001"
                          required
                          className="
                            w-full
                            min-w-0
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-4
                            py-2.5
                            text-sm
                            text-slate-700
                            outline-none
                            transition
                            placeholder:text-slate-400
                            focus:border-emerald-400
                            focus:ring-2
                            focus:ring-emerald-500/20
                          "
                        />
                      </div>

                      {/* MAPEL */}
                      <div className="min-w-0">
                        <label className="
                          mb-1.5
                          block
                          text-sm
                          font-medium
                          text-slate-700
                        ">
                          Mata Pelajaran *
                        </label>

                        <select
                          name="mapel"
                          value={formData.mapel}
                          onChange={handleFormChange}
                          required
                          className="
                            w-full
                            min-w-0
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-4
                            py-2.5
                            text-sm
                            text-slate-700
                            outline-none
                            transition
                            focus:border-emerald-400
                            focus:ring-2
                            focus:ring-emerald-500/20
                          "
                        >
                          <option value="">
                            Pilih Mapel
                          </option>

                          {MAPEL_LIST.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* EMAIL */}
                      <div className="min-w-0">
                        <label className="
                          mb-1.5
                          block
                          text-sm
                          font-medium
                          text-slate-700
                        ">
                          Email
                        </label>

                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          placeholder="guru@sekolah.com"
                          className="
                            w-full
                            min-w-0
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-4
                            py-2.5
                            text-sm
                            text-slate-700
                            outline-none
                            transition
                            placeholder:text-slate-400
                            focus:border-emerald-400
                            focus:ring-2
                            focus:ring-emerald-500/20
                          "
                        />
                      </div>

                      {/* TELEPON */}
                      <div className="min-w-0">
                        <label className="
                          mb-1.5
                          block
                          text-sm
                          font-medium
                          text-slate-700
                        ">
                          Telepon
                        </label>

                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          placeholder="081234567890"
                          className="
                            w-full
                            min-w-0
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-4
                            py-2.5
                            text-sm
                            text-slate-700
                            outline-none
                            transition
                            placeholder:text-slate-400
                            focus:border-emerald-400
                            focus:ring-2
                            focus:ring-emerald-500/20
                          "
                        />
                      </div>

                      {/* STATUS */}
                      <div className="min-w-0">
                        <label className="
                          mb-1.5
                          block
                          text-sm
                          font-medium
                          text-slate-700
                        ">
                          Status
                        </label>

                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleFormChange}
                          className="
                            w-full
                            min-w-0
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-4
                            py-2.5
                            text-sm
                            text-slate-700
                            outline-none
                            transition
                            focus:border-emerald-400
                            focus:ring-2
                            focus:ring-emerald-500/20
                          "
                        >
                          <option value="Aktif">
                            Aktif
                          </option>

                          <option value="Nonaktif">
                            Nonaktif
                          </option>
                        </select>
                      </div>

                      {/* ALAMAT */}
                      <div className="
                        min-w-0
                        sm:col-span-2
                      ">
                        <label className="
                          mb-1.5
                          block
                          text-sm
                          font-medium
                          text-slate-700
                        ">
                          Alamat
                        </label>

                        <input
                          type="text"
                          name="alamat"
                          value={formData.alamat}
                          onChange={handleFormChange}
                          placeholder="Jl. Contoh No. 1, Kota"
                          className="
                            w-full
                            min-w-0
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-4
                            py-2.5
                            text-sm
                            text-slate-700
                            outline-none
                            transition
                            placeholder:text-slate-400
                            focus:border-emerald-400
                            focus:ring-2
                            focus:ring-emerald-500/20
                          "
                        />
                      </div>

                      {/* TANGGAL LAHIR */}
                      <div className="min-w-0">
                        <label className="
                          mb-1.5
                          block
                          text-sm
                          font-medium
                          text-slate-700
                        ">
                          Tanggal Lahir
                        </label>

                        <input
                          type="date"
                          name="tglLahir"
                          value={formData.tglLahir}
                          onChange={handleFormChange}
                          className="
                            w-full
                            min-w-0
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-4
                            py-2.5
                            text-sm
                            text-slate-700
                            outline-none
                            transition
                            focus:border-emerald-400
                            focus:ring-2
                            focus:ring-emerald-500/20
                          "
                        />
                      </div>

                      {/* GENDER */}
                      <div className="min-w-0">
                        <label className="
                          mb-1.5
                          block
                          text-sm
                          font-medium
                          text-slate-700
                        ">
                          Jenis Kelamin
                        </label>

                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleFormChange}
                          className="
                            w-full
                            min-w-0
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-4
                            py-2.5
                            text-sm
                            text-slate-700
                            outline-none
                            transition
                            focus:border-emerald-400
                            focus:ring-2
                            focus:ring-emerald-500/20
                          "
                        >
                          <option value="L">
                            Laki-laki
                          </option>

                          <option value="P">
                            Perempuan
                          </option>
                        </select>
                      </div>

                      {/* TANGGAL BERGABUNG */}
                      <div className="
                        min-w-0
                        sm:col-span-2
                        lg:col-span-1
                      ">
                        <label className="
                          mb-1.5
                          block
                          text-sm
                          font-medium
                          text-slate-700
                        ">
                          Tanggal Bergabung
                        </label>

                        <input
                          type="date"
                          name="joinDate"
                          value={formData.joinDate}
                          onChange={handleFormChange}
                          className="
                            w-full
                            min-w-0
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-4
                            py-2.5
                            text-sm
                            text-slate-700
                            outline-none
                            transition
                            focus:border-emerald-400
                            focus:ring-2
                            focus:ring-emerald-500/20
                          "
                        />
                      </div>
                    </div>

                    {/* ACTION BUTTON */}
                    <div className="
                      flex
                      flex-col-reverse
                      gap-2
                      border-t
                      border-slate-100
                      pt-4
                      sm:flex-row
                      sm:justify-end
                      sm:gap-3
                    ">
                      <button
                        type="button"
                        onClick={() => router.back()}
                        className="
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          px-5
                          py-2.5
                          text-sm
                          font-medium
                          text-slate-600
                          transition
                          hover:bg-slate-50
                          sm:w-auto
                          sm:px-6
                        "
                      >
                        Batal
                      </button>

                      <button
                        type="submit"
                        className="
                          w-full
                          rounded-xl
                          bg-gradient-to-r
                          from-emerald-600
                          to-teal-600
                          px-5
                          py-2.5
                          text-sm
                          font-medium
                          text-white
                          shadow-sm
                          transition
                          hover:shadow-lg
                          hover:shadow-emerald-200
                          sm:w-auto
                          sm:px-6
                        "
                      >
                        Simpan Guru
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* =========================
                  IMPORT DATA
              ========================= */}
              {activeTab === "import" && (
                <div className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200/80
                  bg-white
                  p-4
                  shadow-sm
                  sm:p-5
                  md:p-6
                  lg:p-7
                ">
                  {/* TITLE IMPORT */}
                  <div className="
                    mb-5
                    text-center
                    sm:mb-6
                  ">
                    <FileSpreadsheet
                      size={48}
                      className="
                        mx-auto
                        mb-2
                        text-emerald-500
                      "
                    />

                    <h3 className="
                      text-lg
                      font-semibold
                      text-slate-800
                    ">
                      Import Data Guru
                    </h3>

                    <p className="
                      mx-auto
                      mt-1
                      max-w-xl
                      text-xs
                      leading-5
                      text-slate-500
                      sm:text-sm
                    ">
                      Upload file Excel/CSV.
                      Kolom wajib: Nama, NIP, Mapel.
                    </p>
                  </div>

                  {/* DROP ZONE */}
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="
                      cursor-pointer
                      rounded-xl
                      border-2
                      border-dashed
                      border-slate-300
                      bg-slate-50/50
                      p-5
                      text-center
                      transition-all
                      hover:border-emerald-400
                      sm:p-8
                    "
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
                      className="
                        block
                        cursor-pointer
                      "
                    >
                      <Upload
                        size={32}
                        className="
                          mx-auto
                          mb-3
                          text-slate-400
                        "
                      />

                      <p className="
                        break-words
                        text-sm
                        text-slate-600
                      ">
                        {file
                          ? file.name
                          : "Seret file ke sini atau klik untuk memilih"}
                      </p>

                      <p className="
                        mt-1
                        text-xs
                        text-slate-400
                      ">
                        Format: .xlsx, .xls, .csv
                      </p>
                    </label>
                  </div>

                  {/* SELECTED FILE */}
                  {file && (
                    <div className="
                      mt-4
                      flex
                      flex-col
                      gap-3
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      p-3
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    ">
                      <div className="
                        flex
                        min-w-0
                        items-center
                        gap-3
                      ">
                        <FileSpreadsheet
                          size={20}
                          className="
                            shrink-0
                            text-emerald-500
                          "
                        />

                        <div className="min-w-0">
                          <p
                            title={file.name}
                            className="
                              truncate
                              text-sm
                              font-medium
                              text-slate-700
                            "
                          >
                            {file.name}
                          </p>

                          <p className="
                            text-xs
                            text-slate-400
                          ">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="
                          self-end
                          rounded-lg
                          p-1.5
                          text-slate-400
                          transition
                          hover:bg-rose-50
                          hover:text-rose-600
                          sm:self-auto
                        "
                      >
                        <XCircle size={18} />
                      </button>
                    </div>
                  )}

                  {/* IMPORT STATUS */}
                  {importStatus && (
                    <div
                      className={`
                        mt-4
                        flex
                        items-start
                        gap-3
                        rounded-xl
                        border
                        p-3
                        ${
                          importStatus === "success"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-rose-200 bg-rose-50 text-rose-700"
                        }
                      `}
                    >
                      {importStatus === "success" ? (
                        <CheckCircle
                          size={18}
                          className="mt-0.5 shrink-0"
                        />
                      ) : (
                        <XCircle
                          size={18}
                          className="mt-0.5 shrink-0"
                        />
                      )}

                      <span className="
                        text-sm
                        font-medium
                        leading-5
                      ">
                        {importMessage}
                      </span>
                    </div>
                  )}

                  {/* IMPORT BUTTON */}
                  <div className="
                    mt-6
                    flex
                    flex-col-reverse
                    gap-2
                    border-t
                    border-slate-100
                    pt-4
                    sm:flex-row
                    sm:justify-end
                    sm:gap-3
                  ">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-slate-600
                        transition
                        hover:bg-slate-50
                        sm:w-auto
                        sm:px-6
                      "
                    >
                      Batal
                    </button>

                    <button
                      type="button"
                      onClick={handleImport}
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-gradient-to-r
                        from-emerald-600
                        to-teal-600
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-white
                        shadow-sm
                        transition
                        hover:shadow-lg
                        hover:shadow-emerald-200
                        sm:w-auto
                        sm:px-6
                      "
                    >
                      <Upload size={17} />
                      Import
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}