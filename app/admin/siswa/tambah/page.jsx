"use client";

import { useState, useRef, useEffect } from "react";
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
  MapPin,
  Users,
  UserCheck,
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
  if (typeof window === "undefined") return;
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
// DAFTAR GURU
// =========================================================
const GURU_LIST = [
  "Dr. Ahmad Fauzi, M.Pd.",
  "Siti Rahma, S.Pd.",
  "Budi Santoso, S.Si.",
  "Dewi Lestari, S.Pd.",
  "Eko Prasetyo, S.Pd.",
  "Rina Wulandari, S.Pd.",
  "Andi Wijaya, S.Kom.",
  "Maya Sari, S.Pd.",
  "Fajar Nugroho, S.Pd.",
  "Lina Marlina, S.Pd.",
  "Bambang Sutejo, S.Pd.",
  "Nurul Hikmah, S.Pd.",
  "Dodi Saputra, S.Si.",
  "Ratna Dewi, S.Pd.",
  "Hendra Gunawan, S.Kom.",
];

// =========================================================
// CLASS
// =========================================================
const inputClass =
  "w-full min-w-0 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20";

const labelClass =
  "mb-1.5 block text-sm font-semibold text-slate-700";

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

  const [saving, setSaving] = useState(false);

  // =========================================================
  // FORM STATE
  // =========================================================
  const [formData, setFormData] = useState({
    nama: "",
    nis: "",
    nisn: "",
    kelas: "",
    waliKelas: "",
    kapasitas: "",
    status: "Aktif",
    gender: "L",
    tglLahir: "",
    joinDate: new Date().toISOString().slice(0, 10),

    kecamatan: "",
    kota: "",
    kelurahan: "",
    provinsi: "",

    email: "",
    phone: "",
    alamat: "",

    nikOrtu: "",
    namaOrtu: "",
    pekerjaanOrtu: "",
    alamatKtpOrtu: "",
    alamatDomisiliOrtu: "",
    domisiliSama: true,
  });

  // =========================================================
  // KELAS SEARCH
  // =========================================================
  const [kelasSearch, setKelasSearch] = useState("");
  const [isKelasOpen, setIsKelasOpen] = useState(false);
  const kelasRef = useRef(null);

  const filteredKelas = KELAS_LIST.filter((kelas) =>
    kelas.toLowerCase().includes(kelasSearch.toLowerCase())
  );

  // =========================================================
  // WALI KELAS SEARCH
  // =========================================================
  const [waliSearch, setWaliSearch] = useState("");
  const [isWaliOpen, setIsWaliOpen] = useState(false);
  const waliRef = useRef(null);

  const filteredWali = GURU_LIST.filter((guru) =>
    guru.toLowerCase().includes(waliSearch.toLowerCase())
  );

  // =========================================================
  // CLOSE DROPDOWN
  // =========================================================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        kelasRef.current &&
        !kelasRef.current.contains(e.target)
      ) {
        setIsKelasOpen(false);
      }

      if (
        waliRef.current &&
        !waliRef.current.contains(e.target)
      ) {
        setIsWaliOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =========================================================
  // IMPORT STATE
  // =========================================================
  const [file, setFile] = useState(null);
  const [importStatus, setImportStatus] = useState(null);
  const [importMessage, setImportMessage] = useState("");

  // =========================================================
  // FORM CHANGE
  // =========================================================
  const handleFormChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================================================
  // DOMISILI
  // =========================================================
  const handleDomisiliSama = (e) => {
    const checked = e.target.checked;

    setFormData((prev) => ({
      ...prev,
      domisiliSama: checked,
      alamatDomisiliOrtu: checked
        ? prev.alamatKtpOrtu
        : prev.alamatDomisiliOrtu,
    }));
  };

  // =========================================================
  // COPY ALAMAT KTP
  // =========================================================
  useEffect(() => {
    if (!formData.domisiliSama) return;

    setFormData((prev) => ({
      ...prev,
      alamatDomisiliOrtu: prev.alamatKtpOrtu,
    }));
  }, [formData.alamatKtpOrtu]);

  // =========================================================
  // SUBMIT FORM
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

    if (!formData.nisn.trim()) {
      alert("NISN wajib diisi!");
      return;
    }

    if (!formData.kapasitas.trim()) {
      alert("Kapasitas kelas wajib diisi!");
      return;
    }

    setSaving(true);

    const list = loadSiswa();

    const maxId =
      list.length > 0
        ? Math.max(
            ...list.map(
              (s) => Number(s.id) || 0
            )
          )
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
  // VALIDATE FILE
  // =========================================================
  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;

    const validExtensions = [
      ".xlsx",
      ".xls",
      ".csv",
    ];

    return validExtensions.some((ext) =>
      selectedFile.name
        .toLowerCase()
        .endsWith(ext)
    );
  };

  // =========================================================
  // FILE CHANGE
  // =========================================================
  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    if (!validateFile(selected)) {
      setFile(null);
      setImportStatus("error");
      setImportMessage(
        "Format file tidak sesuai. Gunakan .xlsx, .xls, atau .csv."
      );
      return;
    }

    setFile(selected);
    setImportStatus(null);
    setImportMessage("");
  };

  // =========================================================
  // DROP FILE
  // =========================================================
  const handleDrop = (e) => {
    e.preventDefault();

    const dropped =
      e.dataTransfer.files?.[0];

    if (!dropped) return;

    if (!validateFile(dropped)) {
      setFile(null);
      setImportStatus("error");
      setImportMessage(
        "Format file tidak sesuai. Gunakan .xlsx, .xls, atau .csv."
      );
      return;
    }

    setFile(dropped);
    setImportStatus(null);
    setImportMessage("");
  };

  // =========================================================
  // IMPORT
  // =========================================================
  const handleImport = () => {
    if (!file) {
      setImportStatus("error");
      setImportMessage(
        "Silakan pilih file terlebih dahulu."
      );
      return;
    }

    const list = loadSiswa();

    const maxId =
      list.length > 0
        ? Math.max(
            ...list.map(
              (s) => Number(s.id) || 0
            )
          )
        : 0;

    const newSiswa = [
      {
        id: maxId + 1,
        nama: "Imported Student 1",
        nis: "9999001",
        nisn: "9999001",
        kelas: "X IPA 1",
        waliKelas:
          "Dr. Ahmad Fauzi, M.Pd.",
        kapasitas: "32",
        email:
          "import1@sekolah.com",
        phone: "081234567800",
        status: "Aktif",
        gender: "L",
        tglLahir: "2005-01-01",
        joinDate: "2024-07-01",
        kecamatan: "Kec. A",
        kota: "Kota A",
        kelurahan: "Kel. A",
        provinsi: "Prov. A",
        alamat: "Jl. Import No. 1",
        nikOrtu: "1234567890",
        namaOrtu: "Bapak Import",
        pekerjaanOrtu: "Swasta",
        alamatKtpOrtu: "Jl. KTP 1",
        alamatDomisiliOrtu:
          "Jl. Domisili 1",
        domisiliSama: false,
      },
      {
        id: maxId + 2,
        nama: "Imported Student 2",
        nis: "9999002",
        nisn: "9999002",
        kelas: "XI RPL 1",
        waliKelas:
          "Siti Rahma, S.Pd.",
        kapasitas: "30",
        email:
          "import2@sekolah.com",
        phone: "081234567801",
        status: "Aktif",
        gender: "P",
        tglLahir: "2004-02-01",
        joinDate: "2024-07-01",
        kecamatan: "Kec. B",
        kota: "Kota B",
        kelurahan: "Kel. B",
        provinsi: "Prov. B",
        alamat: "Jl. Import No. 2",
        nikOrtu: "1234567891",
        namaOrtu: "Ibu Import",
        pekerjaanOrtu:
          "Ibu Rumah Tangga",
        alamatKtpOrtu: "Jl. KTP 2",
        alamatDomisiliOrtu:
          "Jl. Domisili 2",
        domisiliSama: true,
      },
    ];

    saveSiswa([
      ...list,
      ...newSiswa,
    ]);

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
      "Nama,NIS,NISN,Kelas,Wali Kelas,Kapasitas,Email,Telepon,Status,Jenis Kelamin,Tanggal Lahir,Tanggal Bergabung,Kecamatan,Kota,Kelurahan,Provinsi,Alamat,NIK Orang Tua,Nama Orang Tua,Pekerjaan Orang Tua,Alamat KTP Orang Tua,Alamat Domisili Orang Tua,Domisili Sama (true/false)";

    const example =
      "Ahmad Fauzan,2401001,1234567890,X IPA 1,Dr. Ahmad Fauzi M.Pd.,32,ahmad@sekolah.com,081234567890,Aktif,L,2006-05-10,2024-07-01,Kec. Merdeka,Kota Merdeka,Kel. Merdeka,Prov. Merdeka,Jl. Merdeka No. 1,1234567890,Bapak Ahmad,PNS,Jl. KTP No. 1,Jl. Domisili No. 1,false";

    const csvContent =
      `${header}\n${example}`;

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "template_data_siswa.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =========================================================
  // RENDER
  // =========================================================
  return (
    <div className="flex min-h-screen w-full bg-slate-100">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside className="relative z-40 shrink-0">
        <Sidebar
          active="siswa"
          setActive={() => {}}
          collapsed={isCollapsed}
          setCollapsed={setIsCollapsed}
        />
      </aside>

      {/* =====================================================
          MAIN
      ====================================================== */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* HEADER */}
        <div className="shrink-0">
          <Header
            toggleSidebar={() =>
              setIsCollapsed((prev) => !prev)
            }
            notifications={[]}
            user={{
              name: "Admin Sekolah",
              email:
                "admin@smartschool.com",
              avatar: "AD",
            }}
          />
        </div>

        {/* ===================================================
            CONTENT
        =================================================== */}
        <main className="min-w-0 flex-1">

          <div className="w-full px-3 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 lg:px-8 lg:py-8">

            <div className="mx-auto w-full min-w-0 max-w-[1800px]">

              {/* =================================================
                  TOP NAV
              ================================================== */}
              <div className="mb-5 flex min-w-0 flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">

                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex w-fit shrink-0 items-center gap-2 rounded-lg text-sm font-medium text-slate-700 transition hover:text-blue-600"
                >
                  <ArrowLeft size={17} />
                  <span>Kembali</span>
                </button>

                <span className="hidden min-w-0 truncate text-sm text-slate-500 sm:block">
                  Admin Sekolah / Siswa / Tambah
                </span>
              </div>

              {/* =================================================
                  TITLE
              ================================================== */}
              <div className="mb-6 min-w-0">

                <div className="flex min-w-0 items-start gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <UserPlus size={21} />
                  </div>

                  <div className="min-w-0">

                    <h1 className="text-xl font-bold text-slate-800 sm:text-2xl lg:text-3xl">
                      Tambah Siswa
                    </h1>

                    <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
                      Tambahkan data peserta didik
                      secara manual atau melalui
                      import file.
                    </p>

                  </div>
                </div>
              </div>

              {/* =================================================
                  TAB
              ================================================== */}
              <div className="mb-5 w-full min-w-0">

                <div className="inline-flex max-w-full overflow-x-auto rounded-xl border border-slate-300 bg-white p-1 shadow-sm">

                  <button
                    type="button"
                    onClick={() =>
                      setActiveTab("form")
                    }
                    className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition sm:px-5 ${
                      activeTab === "form"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <User size={16} />
                    Form Biasa
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveTab("import")
                    }
                    className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition sm:px-5 ${
                      activeTab === "import"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <FileSpreadsheet size={16} />
                    Import Data
                  </button>

                </div>
              </div>

              {/* =================================================
                  FORM
              ================================================== */}
              {activeTab === "form" && (
                <div className="w-full min-w-0 overflow-visible rounded-2xl border border-slate-300 bg-white shadow-sm">

                  {/* HEADER CARD */}
                  <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50/70 via-white to-cyan-50/50 px-4 py-5 sm:px-6 lg:px-7">

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <UserPlus size={19} />
                      </div>

                      <div className="min-w-0">

                        <h2 className="text-sm font-semibold text-slate-800 sm:text-base">
                          Data Siswa Baru
                        </h2>

                        <p className="mt-0.5 text-sm text-slate-600">
                          Lengkapi semua informasi
                          dengan benar.
                        </p>

                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitForm}>

                    <div className="min-w-0 p-4 sm:p-6 lg:p-7 xl:p-8">

                      {/* =================================================
                          DATA UTAMA
                      ================================================== */}
                      <section className="mb-8">

                        <div className="mb-5">
                          <h3 className="text-sm font-semibold text-slate-800">
                            Data Utama
                          </h3>

                          <p className="mt-1 text-sm text-slate-600">
                            Identitas dan status siswa.
                          </p>
                        </div>

                        <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

                          {/* NAMA */}
                          <div className="min-w-0">
                            <label className={labelClass}>
                              Nama Lengkap{" "}
                              <span className="text-rose-600">*</span>
                            </label>

                            <input
                              type="text"
                              name="nama"
                              value={formData.nama}
                              onChange={handleFormChange}
                              placeholder="Contoh: Ahmad Fauzan"
                              required
                              className={inputClass}
                            />
                          </div>

                          {/* NIS */}
                          <div className="min-w-0">
                            <label className={labelClass}>
                              NIS{" "}
                              <span className="text-rose-600">*</span>
                            </label>

                            <input
                              type="text"
                              name="nis"
                              value={formData.nis}
                              onChange={handleFormChange}
                              placeholder="2401001"
                              required
                              className={inputClass}
                            />
                          </div>

                          {/* NISN */}
                          <div className="min-w-0">
                            <label className={labelClass}>
                              NISN{" "}
                              <span className="text-rose-600">*</span>
                            </label>

                            <input
                              type="text"
                              name="nisn"
                              value={formData.nisn}
                              onChange={handleFormChange}
                              placeholder="1234567890"
                              required
                              className={inputClass}
                            />
                          </div>

                          {/* KELAS */}
                          <div
                            ref={kelasRef}
                            className="relative min-w-0"
                          >
                            <label className={labelClass}>
                              Kelas{" "}
                              <span className="text-rose-600">*</span>
                            </label>

                            <div
                              className="w-full min-w-0 cursor-text rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20"
                              onClick={() =>
                                setIsKelasOpen(true)
                              }
                            >
                              <input
                                type="text"
                                placeholder={
                                  formData.kelas ||
                                  "Cari kelas..."
                                }
                                value={kelasSearch}
                                onChange={(e) => {
                                  setKelasSearch(
                                    e.target.value
                                  );
                                  setIsKelasOpen(true);
                                }}
                                onFocus={() =>
                                  setIsKelasOpen(true)
                                }
                                className="w-full min-w-0 bg-transparent text-slate-800 outline-none placeholder:text-slate-500"
                                autoComplete="off"
                              />
                            </div>

                            {isKelasOpen && (
                              <ul className="absolute left-0 right-0 top-full z-[60] mt-1 max-h-60 overflow-y-auto rounded-xl border border-slate-300 bg-white shadow-xl">
                                {filteredKelas.length === 0 ? (
                                  <li className="px-4 py-3 text-sm text-slate-600">
                                    Tidak ada kelas yang cocok
                                  </li>
                                ) : (
                                  filteredKelas.map((kelas) => (
                                    <li
                                      key={kelas}
                                      className={`cursor-pointer px-4 py-2.5 text-sm transition hover:bg-blue-50 ${
                                        formData.kelas === kelas
                                          ? "bg-blue-100 font-semibold text-blue-700"
                                          : "text-slate-700"
                                      }`}
                                      onClick={() => {
                                        setFormData((prev) => ({
                                          ...prev,
                                          kelas,
                                        }));

                                        setKelasSearch("");
                                        setIsKelasOpen(false);
                                      }}
                                    >
                                      {kelas}
                                    </li>
                                  ))
                                )}
                              </ul>
                            )}
                          </div>

                          {/* WALI KELAS */}
                          <div
                            ref={waliRef}
                            className="relative min-w-0"
                          >
                            <label className={labelClass}>
                              Wali Kelas
                            </label>

                            <div
                              className="w-full min-w-0 cursor-text rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20"
                              onClick={() =>
                                setIsWaliOpen(true)
                              }
                            >
                              <input
                                type="text"
                                placeholder={
                                  formData.waliKelas ||
                                  "Cari wali kelas..."
                                }
                                value={waliSearch}
                                onChange={(e) => {
                                  setWaliSearch(
                                    e.target.value
                                  );
                                  setIsWaliOpen(true);
                                }}
                                onFocus={() =>
                                  setIsWaliOpen(true)
                                }
                                className="w-full min-w-0 bg-transparent text-slate-800 outline-none placeholder:text-slate-500"
                                autoComplete="off"
                              />
                            </div>

                            {isWaliOpen && (
                              <ul className="absolute left-0 right-0 top-full z-[60] mt-1 max-h-60 overflow-y-auto rounded-xl border border-slate-300 bg-white shadow-xl">
                                {filteredWali.length === 0 ? (
                                  <li className="px-4 py-3 text-sm text-slate-600">
                                    Tidak ada guru yang cocok
                                  </li>
                                ) : (
                                  filteredWali.map((guru) => (
                                    <li
                                      key={guru}
                                      className={`cursor-pointer px-4 py-2.5 text-sm transition hover:bg-blue-50 ${
                                        formData.waliKelas === guru
                                          ? "bg-blue-100 font-semibold text-blue-700"
                                          : "text-slate-700"
                                      }`}
                                      onClick={() => {
                                        setFormData((prev) => ({
                                          ...prev,
                                          waliKelas: guru,
                                        }));

                                        setWaliSearch("");
                                        setIsWaliOpen(false);
                                      }}
                                    >
                                      <div className="flex min-w-0 items-center gap-2">
                                        <UserCheck
                                          size={14}
                                          className="shrink-0 text-slate-500"
                                        />

                                        <span className="min-w-0 break-words">
                                          {guru}
                                        </span>
                                      </div>
                                    </li>
                                  ))
                                )}
                              </ul>
                            )}
                          </div>

                          {/* KAPASITAS */}
                          <div className="min-w-0">
                            <label className={labelClass}>
                              Kapasitas Kelas{" "}
                              <span className="text-rose-600">*</span>
                            </label>

                            <input
                              type="number"
                              name="kapasitas"
                              value={formData.kapasitas}
                              onChange={handleFormChange}
                              placeholder="32"
                              required
                              min="1"
                              max="50"
                              className={inputClass}
                            />
                          </div>

                          {/* STATUS */}
                          <div className="min-w-0">
                            <label className={labelClass}>
                              Status
                            </label>

                            <select
                              name="status"
                              value={formData.status}
                              onChange={handleFormChange}
                              className={inputClass}
                            >
                              <option value="Aktif">
                                Aktif
                              </option>

                              <option value="Nonaktif">
                                Nonaktif
                              </option>
                            </select>
                          </div>

                          {/* GENDER */}
                          <div className="min-w-0">
                            <label className={labelClass}>
                              Jenis Kelamin
                            </label>

                            <select
                              name="gender"
                              value={formData.gender}
                              onChange={handleFormChange}
                              className={inputClass}
                            >
                              <option value="L">
                                Laki-laki
                              </option>

                              <option value="P">
                                Perempuan
                              </option>
                            </select>
                          </div>

                          {/* TANGGAL LAHIR */}
                          <div className="min-w-0">
                            <label className={labelClass}>
                              Tanggal Lahir
                            </label>

                            <input
                              type="date"
                              name="tglLahir"
                              value={formData.tglLahir}
                              onChange={handleFormChange}
                              className={inputClass}
                            />
                          </div>

                          {/* TANGGAL BERGABUNG */}
                          <div className="min-w-0">
                            <label className={labelClass}>
                              Tanggal Bergabung
                            </label>

                            <input
                              type="date"
                              name="joinDate"
                              value={formData.joinDate}
                              onChange={handleFormChange}
                              className={inputClass}
                            />
                          </div>
                        </div>
                      </section>

                      {/* =================================================
                          ALAMAT
                      ================================================== */}
                      <section className="mb-8 border-t border-slate-200 pt-7">

                        <div className="mb-5 flex items-center gap-2">
                          <MapPin
                            size={18}
                            className="shrink-0 text-blue-600"
                          />

                          <div>
                            <h3 className="text-sm font-semibold text-slate-800">
                              Alamat Lengkap
                            </h3>

                            <p className="mt-1 text-sm text-slate-600">
                              Informasi tempat tinggal siswa.
                            </p>
                          </div>
                        </div>

                        <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

                          <div className="min-w-0">
                            <label className={labelClass}>
                              Kecamatan
                            </label>

                            <input
                              type="text"
                              name="kecamatan"
                              value={formData.kecamatan}
                              onChange={handleFormChange}
                              placeholder="Kecamatan"
                              className={inputClass}
                            />
                          </div>

                          <div className="min-w-0">
                            <label className={labelClass}>
                              Kota / Kabupaten
                            </label>

                            <input
                              type="text"
                              name="kota"
                              value={formData.kota}
                              onChange={handleFormChange}
                              placeholder="Kota / Kabupaten"
                              className={inputClass}
                            />
                          </div>

                          <div className="min-w-0">
                            <label className={labelClass}>
                              Kelurahan / Desa
                            </label>

                            <input
                              type="text"
                              name="kelurahan"
                              value={formData.kelurahan}
                              onChange={handleFormChange}
                              placeholder="Kelurahan / Desa"
                              className={inputClass}
                            />
                          </div>

                          <div className="min-w-0">
                            <label className={labelClass}>
                              Provinsi
                            </label>

                            <input
                              type="text"
                              name="provinsi"
                              value={formData.provinsi}
                              onChange={handleFormChange}
                              placeholder="Provinsi"
                              className={inputClass}
                            />
                          </div>

                          <div className="min-w-0 md:col-span-2 xl:col-span-3">
                            <label className={labelClass}>
                              Alamat Lengkap
                              (Jalan, RT/RW, dll)
                            </label>

                            <textarea
                              name="alamat"
                              value={formData.alamat}
                              onChange={handleFormChange}
                              rows={3}
                              placeholder="Jl. Contoh No. 1, RT 01 RW 02"
                              className={`${inputClass} resize-y`}
                            />
                          </div>
                        </div>
                      </section>

                      {/* =================================================
                          KONTAK
                      ================================================== */}
                      <section className="mb-8 border-t border-slate-200 pt-7">

                        <div className="mb-5">
                          <h3 className="text-sm font-semibold text-slate-800">
                            Informasi Kontak
                          </h3>

                          <p className="mt-1 text-sm text-slate-600">
                            Email dan nomor telepon yang dapat dihubungi.
                          </p>
                        </div>

                        <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">

                          <div className="min-w-0">
                            <label className={labelClass}>
                              Email
                            </label>

                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleFormChange}
                              placeholder="siswa@sekolah.com"
                              className={inputClass}
                            />
                          </div>

                          <div className="min-w-0">
                            <label className={labelClass}>
                              Telepon
                            </label>

                            <input
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleFormChange}
                              placeholder="081234567890"
                              className={inputClass}
                            />
                          </div>

                        </div>
                      </section>

                      {/* =================================================
                          ORANG TUA
                      ================================================== */}
                      <section className="mb-8 border-t border-slate-200 pt-7">

                        <div className="mb-5 flex items-center gap-2">
                          <Users
                            size={18}
                            className="shrink-0 text-blue-600"
                          />

                          <div>
                            <h3 className="text-sm font-semibold text-slate-800">
                              Data Orang Tua / Wali
                            </h3>

                            <p className="mt-1 text-sm text-slate-600">
                              Informasi orang tua atau wali siswa.
                            </p>
                          </div>
                        </div>

                        <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

                          <div className="min-w-0">
                            <label className={labelClass}>
                              NIK Orang Tua
                            </label>

                            <input
                              type="text"
                              name="nikOrtu"
                              value={formData.nikOrtu}
                              onChange={handleFormChange}
                              placeholder="1234567890123456"
                              className={inputClass}
                            />
                          </div>

                          <div className="min-w-0">
                            <label className={labelClass}>
                              Nama Orang Tua
                            </label>

                            <input
                              type="text"
                              name="namaOrtu"
                              value={formData.namaOrtu}
                              onChange={handleFormChange}
                              placeholder="Bapak / Ibu ..."
                              className={inputClass}
                            />
                          </div>

                          <div className="min-w-0">
                            <label className={labelClass}>
                              Pekerjaan
                            </label>

                            <input
                              type="text"
                              name="pekerjaanOrtu"
                              value={formData.pekerjaanOrtu}
                              onChange={handleFormChange}
                              placeholder="PNS / Swasta / dll"
                              className={inputClass}
                            />
                          </div>

                          <div className="min-w-0 md:col-span-2 xl:col-span-3">
                            <label className={labelClass}>
                              Alamat KTP Orang Tua
                            </label>

                            <input
                              type="text"
                              name="alamatKtpOrtu"
                              value={formData.alamatKtpOrtu}
                              onChange={handleFormChange}
                              placeholder="Alamat sesuai KTP"
                              className={inputClass}
                            />
                          </div>

                          <div className="min-w-0 md:col-span-2 xl:col-span-3">

                            <label className={labelClass}>
                              Alamat Domisili Orang Tua
                            </label>

                            <div className="flex min-w-0 flex-col gap-2">

                              <input
                                type="text"
                                name="alamatDomisiliOrtu"
                                value={
                                  formData.alamatDomisiliOrtu
                                }
                                onChange={handleFormChange}
                                placeholder="Alamat domisili sekarang"
                                disabled={
                                  formData.domisiliSama
                                }
                                className={`${inputClass} disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500`}
                              />

                              <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-700">

                                <input
                                  type="checkbox"
                                  name="domisiliSama"
                                  checked={
                                    formData.domisiliSama
                                  }
                                  onChange={
                                    handleDomisiliSama
                                  }
                                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                />

                                <span>
                                  Alamat domisili sama dengan
                                  alamat KTP
                                </span>

                              </label>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* =================================================
                          ACTION
                      ================================================== */}
                      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">

                        <button
                          type="button"
                          onClick={() => router.back()}
                          className="w-full rounded-xl border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 sm:w-auto"
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
                <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">

                  {/* HEADER */}
                  <div className="border-b border-slate-200 bg-gradient-to-r from-indigo-50/70 via-white to-blue-50/50 px-4 py-6 text-center sm:px-6 lg:px-8">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                      <FileSpreadsheet size={27} />
                    </div>

                    <h2 className="mt-3 text-lg font-semibold text-slate-800 sm:text-xl">
                      Import Data Siswa
                    </h2>

                    <p className="mx-auto mt-1 max-w-2xl text-sm leading-5 text-slate-600">
                      Upload file Excel atau CSV untuk
                      menambahkan banyak data siswa sekaligus.
                    </p>
                  </div>

                  <div className="min-w-0 p-4 sm:p-6 lg:p-8">

                    {/* INFO */}
                    <div className="mb-5 flex min-w-0 items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/60 p-4">

                      <Info
                        size={18}
                        className="mt-0.5 shrink-0 text-blue-600"
                      />

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-blue-800">
                          Format file
                        </p>

                        <p className="mt-1 text-sm leading-5 text-blue-700/80">
                          Pastikan file memiliki kolom{" "}
                          <strong>
                            Nama, NIS, NISN, dan Kelas
                          </strong>
                          . Kolom lainnya dapat diisi sesuai
                          kebutuhan.
                        </p>
                      </div>
                    </div>

                    {/* UPLOAD */}
                    <div
                      className={`w-full min-w-0 rounded-2xl border-2 border-dashed p-6 text-center transition-all sm:p-10 ${
                        file
                          ? "border-blue-400 bg-blue-50/30"
                          : "border-slate-300 bg-slate-50/50 hover:border-blue-400 hover:bg-blue-50/30"
                      }`}
                      onDragOver={(e) =>
                        e.preventDefault()
                      }
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

                        <p className="mt-1 text-sm text-slate-500">
                          Format yang didukung: .xlsx, .xls, .csv
                        </p>

                        <span className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                          Pilih File
                        </span>

                      </label>
                    </div>

                    {/* FILE */}
                    {file && (
                      <div className="mt-4 flex min-w-0 flex-col gap-3 rounded-xl border border-slate-300 bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex min-w-0 items-center gap-3">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                            <FileSpreadsheet size={19} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-700">
                              {file.name}
                            </p>

                            <p className="mt-0.5 text-sm text-slate-500">
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
                          className="flex w-fit shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-100 hover:text-rose-700"
                        >
                          <XCircle size={17} />
                          Hapus File
                        </button>
                      </div>
                    )}

                    {/* TEMPLATE */}
                    <div className="mt-5 min-w-0 rounded-xl border border-slate-300 bg-white p-4">

                      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-700">
                            Belum punya template?
                          </p>

                          <p className="mt-1 text-sm leading-5 text-slate-600">
                            Gunakan template CSV berikut sebagai
                            contoh format data siswa.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={handleDownloadTemplate}
                          className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 sm:w-auto"
                        >
                          <Download size={15} />
                          Download Template
                        </button>

                      </div>
                    </div>

                    {/* STATUS */}
                    {importStatus && (
                      <div
                        className={`mt-5 flex min-w-0 items-start gap-3 rounded-xl border p-4 ${
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

                        <span className="min-w-0 break-words text-sm font-medium">
                          {importMessage}
                        </span>
                      </div>
                    )}

                    {/* ACTION */}
                    <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">

                      <button
                        type="button"
                        onClick={() => router.back()}
                        className="w-full rounded-xl border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 sm:w-auto"
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
              <div className="py-6 text-center text-sm text-slate-500">
                © 2026 SmartSchool • Tambah Data Siswa
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
