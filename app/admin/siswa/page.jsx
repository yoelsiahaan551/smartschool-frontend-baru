"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  CheckCircle,
  XCircle,
  Download,
  Printer,
  FileSpreadsheet,
  ChevronDown,
  X,
  AlertTriangle,
} from "lucide-react";

// =========================================================
// STORAGE
// =========================================================
const STORAGE_KEY = "siswa_data";

// =========================================================
// DATA DEFAULT - 45 SISWA
// =========================================================
const getDefaultSiswa = () => {
  const data = [];

  const names = [
    "Ahmad Fauzan",
    "Bella Safira",
    "Cahyo Nugroho",
    "Dinda Maharani",
    "Eko Prasetyo",
    "Fira Amelia",
    "Galang Ramadhan",
    "Hana Putri",
    "Iqbal Maulana",
    "Jihan Anastasya",
    "Kevin Alexander",
    "Larasati Indah",
    "Muhammad Rizky",
    "Nabila Putri",
    "Oscar Wijaya",
    "Putri Maharani",
    "Raka Firmansyah",
    "Salsa Amelia",
    "Tegar Pratama",
    "Ulfa Rahma",
    "Vino Aditya",
    "Wulan Sari",
    "Yoga Saputra",
    "Zahra Khairunnisa",
    "Ardiansyah Putra",
    "Bunga Citra",
    "Daffa Alfarizi",
    "Elsa Permata",
    "Farhan Akbar",
    "Gisella Anjani",
  ];

  const kelasList = [
    "X RPL 1",
    "X RPL 2",
    "X TKJ 1",
    "X TKJ 2",
    "XI RPL 1",
    "XI RPL 2",
    "XI TKJ 1",
    "XI TKJ 2",
    "XII RPL 1",
    "XII RPL 2",
    "XII TKJ 1",
  ];

  const statuses = ["Aktif", "Nonaktif"];
  const genders = ["L", "P"];

  for (let i = 0; i < 45; i++) {
    const nameIdx = i % names.length;
    const kelasIdx = i % kelasList.length;
    const statusIdx = i % 5 === 3 ? 1 : 0;
    const genderIdx = i % 2;

    data.push({
      id: i + 1,
      nama: names[nameIdx],
      nis: String(2401001 + i),
      nisn: String(1234567890 + i),
      kelas: kelasList[kelasIdx],
      email: `${names[nameIdx]
        .split(" ")[0]
        .toLowerCase()}@sekolah.com`,
      phone: `081234567${String(800 + i).padStart(3, "0")}`,
      status: statuses[statusIdx],
      alamat: `Jl. Contoh No. ${i + 1}, Jakarta`,
      tglLahir: `200${String(5 + (i % 4))}-${String(
        1 + (i % 12)
      ).padStart(2, "0")}-${String(
        1 + (i % 28)
      ).padStart(2, "0")}`,
      gender: genders[genderIdx],
      joinDate: `${2020 + (i % 5)}-${String(
        1 + (i % 12)
      ).padStart(2, "0")}-${String(
        1 + (i % 28)
      ).padStart(2, "0")}`,
      kecamatan: `Kec. ${String.fromCharCode(
        65 + (i % 26)
      )}`,
      kota: `Kota ${String.fromCharCode(
        65 + (i % 26)
      )}`,
      kelurahan: `Kel. ${String.fromCharCode(
        65 + (i % 26)
      )}`,
      provinsi: "DKI Jakarta",
      nikOrtu: String(1234567890 + i),
      namaOrtu: `Orang Tua ${i + 1}`,
      pekerjaanOrtu: [
        "PNS",
        "Swasta",
        "Wirausaha",
        "Petani",
      ][i % 4],
      alamatKtpOrtu: `Jl. KTP ${i + 1}`,
      alamatDomisiliOrtu: `Jl. Domisili ${i + 1}`,
      domisiliSama: i % 2 === 0,
    });
  }

  return data;
};

// =========================================================
// LOAD DATA
// =========================================================
const loadSiswa = () => {
  if (typeof window === "undefined") {
    return getDefaultSiswa();
  }

  try {
    const defaultData = getDefaultSiswa();
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultData)
      );

      return defaultData;
    }

    const oldData = JSON.parse(stored);

    if (!Array.isArray(oldData)) {
      return defaultData;
    }

    const merged = [...oldData];

    defaultData.forEach((defaultItem) => {
      if (
        !merged.some(
          (item) =>
            Number(item.id) ===
            Number(defaultItem.id)
        )
      ) {
        merged.push(defaultItem);
      }
    });

    merged.sort(
      (a, b) =>
        Number(a.id) - Number(b.id)
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(merged)
    );

    return merged;
  } catch (error) {
    console.error(
      "Gagal membaca data siswa:",
      error
    );

    return getDefaultSiswa();
  }
};

// =========================================================
// SAVE DATA
// =========================================================
const saveSiswa = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  }
};

// =========================================================
// COMPONENT
// =========================================================
export default function AdminSiswaPage() {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] =
    useState(false);

  const [siswa, setSiswa] = useState([]);

  const [search, setSearch] = useState("");

  // =======================================================
  // DELETE MODAL
  // =======================================================
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    id: null,
    nama: "",
  });

  // =======================================================
  // SORT & FILTER
  // =======================================================
  const [sortBy, setSortBy] =
    useState("nama_asc");

  const [filterStatus, setFilterStatus] =
    useState("semua");

  const [filterKelas, setFilterKelas] =
    useState("semua");

  // =======================================================
  // SEARCHABLE SELECT KELAS
  // =======================================================
  const [kelasSearch, setKelasSearch] =
    useState("");

  const [isKelasOpen, setIsKelasOpen] =
    useState(false);

  const kelasRef = useRef(null);

  // =======================================================
  // PAGINATION
  // =======================================================
  const [currentPage, setCurrentPage] =
    useState(1);

  const [itemsPerPage, setItemsPerPage] =
    useState(10);

  // =======================================================
  // LOAD
  // =======================================================
  useEffect(() => {
    setSiswa(loadSiswa());
  }, []);

  // =======================================================
  // CLOSE DROPDOWN
  // =======================================================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        kelasRef.current &&
        !kelasRef.current.contains(e.target)
      ) {
        setIsKelasOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  // =======================================================
  // OPEN DELETE MODAL
  // =======================================================
  const handleDelete = (id, nama) => {
    setDeleteModal({
      open: true,
      id,
      nama,
    });
  };

  // =======================================================
  // CLOSE DELETE MODAL
  // =======================================================
  const closeDeleteModal = () => {
    setDeleteModal({
      open: false,
      id: null,
      nama: "",
    });
  };

  // =======================================================
  // CONFIRM DELETE
  // =======================================================
  const confirmDelete = () => {
    const { id } = deleteModal;

    if (id === null) {
      return;
    }

    const updated = siswa.filter(
      (item) => item.id !== id
    );

    setSiswa(updated);
    saveSiswa(updated);

    const totalItems = updated.length;

    const maxPage = Math.ceil(
      totalItems / itemsPerPage
    );

    if (
      currentPage > maxPage &&
      maxPage > 0
    ) {
      setCurrentPage(maxPage);
    } else if (totalItems === 0) {
      setCurrentPage(1);
    }

    closeDeleteModal();
  };

  // =======================================================
  // REFRESH
  // =======================================================
  const handleRefresh = () => {
    setSiswa(loadSiswa());
    setCurrentPage(1);
  };

  // =======================================================
  // SEARCH
  // =======================================================
  const filteredBySearch = siswa.filter(
    (s) => {
      const keyword =
        search.toLowerCase();

      return (
        s.nama
          .toLowerCase()
          .includes(keyword) ||
        s.nis.includes(search) ||
        s.kelas
          .toLowerCase()
          .includes(keyword) ||
        s.email
          .toLowerCase()
          .includes(keyword)
      );
    }
  );

  // =======================================================
  // FILTER STATUS
  // =======================================================
  const filteredByStatus =
    filterStatus === "semua"
      ? filteredBySearch
      : filteredBySearch.filter(
          (s) =>
            s.status ===
            filterStatus
        );

  // =======================================================
  // FILTER KELAS
  // =======================================================
  const filteredByKelas =
    filterKelas === "semua"
      ? filteredByStatus
      : filteredByStatus.filter(
          (s) =>
            s.kelas ===
            filterKelas
        );

  // =======================================================
  // SORT
  // =======================================================
  const sorted = [
    ...filteredByKelas,
  ].sort((a, b) => {
    switch (sortBy) {
      case "nama_asc":
        return a.nama.localeCompare(
          b.nama
        );

      case "nama_desc":
        return b.nama.localeCompare(
          a.nama
        );

      case "nis_asc":
        return a.nis.localeCompare(
          b.nis
        );

      case "nis_desc":
        return b.nis.localeCompare(
          a.nis
        );

      case "kelas":
        return a.kelas.localeCompare(
          b.kelas
        );

      case "status":
        return a.status.localeCompare(
          b.status
        );

      default:
        return 0;
    }
  });

  // =======================================================
  // PAGINATION
  // =======================================================
  const totalItems = sorted.length;

  const totalPages = Math.ceil(
    totalItems / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const endIndex = Math.min(
    startIndex + itemsPerPage,
    totalItems
  );

  const currentItems = sorted.slice(
    startIndex,
    endIndex
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    filterStatus,
    filterKelas,
    sortBy,
    itemsPerPage,
  ]);

  const goToPage = (page) => {
    if (
      page >= 1 &&
      page <= totalPages
    ) {
      setCurrentPage(page);
    }
  };

  // =======================================================
  // EXPORT CSV
  // =======================================================
  const exportCSV = () => {
    const headers = [
      "No",
      "Nama",
      "NIS",
      "NISN",
      "Kelas",
      "Email",
      "Telepon",
      "Status",
      "Alamat",
      "Tanggal Lahir",
      "Jenis Kelamin",
      "Bergabung",
    ];

    const rows = sorted.map(
      (s, idx) => [
        idx + 1,
        s.nama,
        s.nis,
        s.nisn || "-",
        s.kelas,
        s.email,
        s.phone,
        s.status,
        s.alamat,
        s.tglLahir,
        s.gender === "L"
          ? "Laki-laki"
          : "Perempuan",
        s.joinDate,
      ]
    );

    let csv =
      headers.join(",") +
      "\n";

    rows.forEach((row) => {
      csv +=
        row.join(",") +
        "\n";
    });

    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = `data_siswa_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =======================================================
  // EXPORT EXCEL
  // =======================================================
  const exportExcel = () => {
    const headers = [
      "No",
      "Nama",
      "NIS",
      "NISN",
      "Kelas",
      "Email",
      "Telepon",
      "Status",
      "Alamat",
      "Tanggal Lahir",
      "Jenis Kelamin",
      "Bergabung",
    ];

    let tableHtml = `
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            th,td{
              border:1px solid #ccc;
              padding:6px 10px;
              font-size:12px;
              font-family:Arial,sans-serif;
            }

            th{
              background:#2563eb;
              color:white;
              font-weight:bold;
            }
          </style>
        </head>

        <body>
          <table>
            <tr>
              ${headers
                .map(
                  (h) =>
                    `<th>${h}</th>`
                )
                .join("")}
            </tr>
    `;

    sorted.forEach((s, idx) => {
      tableHtml += `
        <tr>
          <td>${idx + 1}</td>
          <td>${s.nama}</td>
          <td>${s.nis}</td>
          <td>${s.nisn || "-"}</td>
          <td>${s.kelas}</td>
          <td>${s.email}</td>
          <td>${s.phone}</td>
          <td>${s.status}</td>
          <td>${s.alamat}</td>
          <td>${s.tglLahir}</td>
          <td>
            ${
              s.gender === "L"
                ? "Laki-laki"
                : "Perempuan"
            }
          </td>
          <td>${s.joinDate}</td>
        </tr>
      `;
    });

    tableHtml += `
          </table>
        </body>
      </html>
    `;

    const blob = new Blob(
      [tableHtml],
      {
        type: "application/vnd.ms-excel",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = `data_siswa_${new Date()
      .toISOString()
      .slice(0, 10)}.xls`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =======================================================
  // EXPORT PDF
  // =======================================================
  const exportPDF = () => {
    const printWindow =
      window.open(
        "",
        "_blank",
        "width=1024,height=768"
      );

    if (!printWindow) {
      alert(
        "Mohon izinkan popup untuk mencetak PDF"
      );

      return;
    }

    const headers = [
      "No",
      "Nama",
      "NIS",
      "Kelas",
      "Email",
      "Status",
    ];

    let tableHtml = `
      <html>
        <head>
          <title>Data Siswa</title>

          <style>
            body{
              font-family:Arial,sans-serif;
              padding:20px;
            }

            h1{
              font-size:18px;
              color:#1e293b;
            }

            table{
              width:100%;
              border-collapse:collapse;
              font-size:11px;
            }

            th{
              background:#2563eb;
              color:white;
              padding:8px 10px;
              text-align:left;
            }

            td{
              border:1px solid #e2e8f0;
              padding:6px 10px;
            }

            tr:nth-child(even){
              background:#f8fafc;
            }
          </style>
        </head>

        <body>

          <h1>Data Siswa</h1>

          <p>
            Total: ${sorted.length} siswa |
            ${new Date().toLocaleDateString(
              "id-ID"
            )}
          </p>

          <table>

            <tr>
              ${headers
                .map(
                  (h) =>
                    `<th>${h}</th>`
                )
                .join("")}
            </tr>
    `;

    sorted.forEach((s, idx) => {
      tableHtml += `
        <tr>
          <td>${idx + 1}</td>
          <td>${s.nama}</td>
          <td>${s.nis}</td>
          <td>${s.kelas}</td>
          <td>${s.email}</td>
          <td>${s.status}</td>
        </tr>
      `;
    });

    tableHtml += `
          </table>

        </body>
      </html>
    `;

    printWindow.document.write(
      tableHtml
    );

    printWindow.document.close();

    printWindow.onload =
      function () {
        printWindow.focus();
        printWindow.print();
      };
  };

  // =======================================================
  // STATISTICS
  // =======================================================
  const totalSiswa =
    siswa.length;

  const totalAktif =
    siswa.filter(
      (s) =>
        s.status === "Aktif"
    ).length;

  const totalNonaktif =
    siswa.filter(
      (s) =>
        s.status !== "Aktif"
    ).length;

  const totalKelas =
    new Set(
      siswa.map(
        (s) => s.kelas
      )
    ).size;

  // =======================================================
  // HELPERS
  // =======================================================
  const getInitials = (
    nama
  ) => {
    if (!nama) {
      return "??";
    }

    const parts =
      nama.trim().split(" ");

    if (parts.length >= 2) {
      return (
        parts[0][0] +
        parts[1][0]
      ).toUpperCase();
    }

    return nama
      .substring(0, 2)
      .toUpperCase();
  };

  const getAvatarColor = (
    nama
  ) => {
    const colors = [
      "bg-blue-500",
      "bg-emerald-500",
      "bg-amber-500",
      "bg-rose-500",
      "bg-indigo-500",
      "bg-purple-500",
      "bg-cyan-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-teal-500",
    ];

    return colors[
      nama.length %
        colors.length
    ];
  };

  // =======================================================
  // UNIQUE KELAS
  // =======================================================
  const uniqueKelas = [
    ...new Set(
      siswa.map(
        (s) => s.kelas
      )
    ),
  ].sort();

  // =======================================================
  // FILTER KELAS OPTIONS
  // =======================================================
  const filteredKelasOptions =
    uniqueKelas.filter(
      (k) =>
        k
          .toLowerCase()
          .includes(
            kelasSearch.toLowerCase()
          )
    );

  // =======================================================
  // RETURN
  // =======================================================
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100">

      {/* SIDEBAR */}
      <Sidebar
        active="siswa"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={
          setIsCollapsed
        }
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* HEADER */}
        <Header
          toggleSidebar={() =>
            setIsCollapsed(
              !isCollapsed
            )
          }
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email:
              "admin@smartschool.com",
            avatar: "AD",
          }}
        />

        <main className="min-h-0 flex-1 overflow-y-auto">

          <div className="w-full px-3 py-4 sm:px-4 md:px-6 lg:px-8 xl:px-10">

            <div className="w-full space-y-5">

              {/* =================================================
                  HEADER
              ================================================= */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-200">
                    <Users size={21} />
                  </div>

                  <div className="min-w-0">

                    <h1 className="truncate text-xl font-semibold text-slate-800 sm:text-2xl">
                      Data Siswa
                    </h1>

                    <p className="text-xs text-slate-600 sm:text-sm">
                      Data induk peserta didik
                    </p>

                  </div>

                </div>

                <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">

                  {/* EXPORT */}
                  <div className="relative group">

                    <button className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700">

                      <Download size={17} />

                      <span>
                        Export
                      </span>

                    </button>

                    <div className="absolute right-0 top-full z-10 mt-1 w-44 rounded-xl border border-slate-300 bg-white shadow-lg opacity-0 invisible transition-all group-hover:visible group-hover:opacity-100">

                      <button
                        onClick={
                          exportPDF
                        }
                        className="flex w-full items-center gap-2 rounded-t-xl px-4 py-2.5 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                      >
                        <Printer size={16} />
                        PDF
                      </button>

                      <button
                        onClick={
                          exportExcel
                        }
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                      >
                        <FileSpreadsheet size={16} />
                        Excel
                      </button>

                      <button
                        onClick={
                          exportCSV
                        }
                        className="flex w-full items-center gap-2 rounded-b-xl px-4 py-2.5 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                      >
                        <FileSpreadsheet size={16} />
                        CSV
                      </button>

                    </div>
                  </div>

                  {/* REFRESH */}
                  <button
                    onClick={
                      handleRefresh
                    }
                    className="flex h-10 items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:shadow-sm"
                    title="Refresh"
                  >
                    <RefreshCw size={16} />
                  </button>

                  {/* TAMBAH SISWA */}
                  <button
                    onClick={() =>
                      router.push(
                        "/admin/siswa/tambah"
                      )
                    }
                    className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 hover:shadow-lg sm:flex-none"
                  >
                    <Plus size={18} />

                    <span>
                      Tambah Siswa
                    </span>
                  </button>

                </div>

              </div>

              {/* =================================================
                  STATISTICS
              ================================================= */}
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

                {/* TOTAL */}
                <div className="rounded-xl border border-slate-300 bg-white p-4 shadow-sm transition hover:shadow-md">

                  <div className="flex items-center gap-2">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                      <Users size={16} />
                    </div>

                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                      Total Siswa
                    </p>

                  </div>

                  <p className="mt-1 text-2xl font-bold text-slate-800">
                    {totalSiswa}
                  </p>

                </div>

                {/* AKTIF */}
                <div className="rounded-xl border border-slate-300 bg-white p-4 shadow-sm transition hover:shadow-md">

                  <div className="flex items-center gap-2">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <CheckCircle size={16} />
                    </div>

                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                      Aktif
                    </p>

                  </div>

                  <p className="mt-1 text-2xl font-bold text-emerald-700">
                    {totalAktif}
                  </p>

                </div>

                {/* NONAKTIF */}
                <div className="rounded-xl border border-slate-300 bg-white p-4 shadow-sm transition hover:shadow-md">

                  <div className="flex items-center gap-2">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
                      <XCircle size={16} />
                    </div>

                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                      Nonaktif
                    </p>

                  </div>

                  <p className="mt-1 text-2xl font-bold text-rose-700">
                    {totalNonaktif}
                  </p>

                </div>

                {/* KELAS */}
                <div className="rounded-xl border border-slate-300 bg-white p-4 shadow-sm transition hover:shadow-md">

                  <div className="flex items-center gap-2">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                      <Users size={16} />
                    </div>

                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                      Kelas
                    </p>

                  </div>

                  <p className="mt-1 text-2xl font-bold text-indigo-700">
                    {totalKelas}
                  </p>

                </div>

              </div>

              {/* =================================================
                  SEARCH + FILTER
              ================================================= */}
              <div className="rounded-xl border border-slate-300 bg-white p-4 shadow-sm">

                <div className="flex flex-col gap-3">

                  {/* SEARCH */}
                  <div className="relative w-full">

                    <Search
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      type="text"
                      placeholder="Cari nama, NIS, kelas, atau email..."
                      value={search}
                      onChange={(e) =>
                        setSearch(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/30"
                    />

                  </div>

                  <div className="flex flex-wrap items-center gap-2">

                    {/* FILTER STATUS */}
                    <select
                      value={
                        filterStatus
                      }
                      onChange={(e) =>
                        setFilterStatus(
                          e.target.value
                        )
                      }
                      className="min-w-[120px] rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    >
                      <option value="semua">
                        Semua Status
                      </option>

                      <option value="Aktif">
                        Aktif
                      </option>

                      <option value="Nonaktif">
                        Nonaktif
                      </option>
                    </select>

                    {/* FILTER KELAS */}
                    <div
                      ref={kelasRef}
                      className="relative min-w-[150px]"
                    >

                      <div
                        className="w-full cursor-pointer rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                        onClick={() =>
                          setIsKelasOpen(
                            (prev) =>
                              !prev
                          )
                        }
                      >

                        <div className="flex items-center gap-1">

                          <input
                            type="text"
                            placeholder={
                              filterKelas ===
                              "semua"
                                ? "Semua Kelas"
                                : filterKelas
                            }
                            value={
                              kelasSearch
                            }
                            onChange={(e) => {
                              setKelasSearch(
                                e.target.value
                              );

                              setIsKelasOpen(
                                true
                              );

                              if (
                                e.target
                                  .value ===
                                ""
                              ) {
                                setFilterKelas(
                                  "semua"
                                );
                              }
                            }}
                            onFocus={() =>
                              setIsKelasOpen(
                                true
                              )
                            }
                            className="min-w-[80px] flex-1 bg-transparent text-slate-800 outline-none placeholder:text-slate-500"
                            autoComplete="off"
                          />

                          <ChevronDown
                            size={16}
                            className={`shrink-0 text-slate-500 transition-transform ${
                              isKelasOpen
                                ? "rotate-180"
                                : ""
                            }`}
                          />

                        </div>

                      </div>

                      {isKelasOpen && (
                        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-slate-300 bg-white shadow-lg">

                          <li
                            className={`cursor-pointer px-3 py-2 text-sm transition hover:bg-blue-50 ${
                              filterKelas ===
                              "semua"
                                ? "bg-blue-100 font-semibold text-blue-700"
                                : "text-slate-700"
                            }`}
                            onClick={() => {
                              setFilterKelas(
                                "semua"
                              );

                              setKelasSearch(
                                ""
                              );

                              setIsKelasOpen(
                                false
                              );
                            }}
                          >
                            Semua Kelas
                          </li>

                          {filteredKelasOptions.length ===
                          0 ? (
                            <li className="px-3 py-2 text-sm text-slate-500">
                              Tidak ada kelas yang
                              cocok
                            </li>
                          ) : (
                            filteredKelasOptions.map(
                              (k) => (
                                <li
                                  key={k}
                                  className={`cursor-pointer px-3 py-2 text-sm transition hover:bg-blue-50 ${
                                    filterKelas ===
                                    k
                                      ? "bg-blue-100 font-semibold text-blue-700"
                                      : "text-slate-700"
                                  }`}
                                  onClick={() => {
                                    setFilterKelas(
                                      k
                                    );

                                    setKelasSearch(
                                      ""
                                    );

                                    setIsKelasOpen(
                                      false
                                    );
                                  }}
                                >
                                  {k}
                                </li>
                              )
                            )
                          )}

                        </ul>
                      )}

                    </div>

                    {/* SORT */}
                    <select
                      value={
                        sortBy
                      }
                      onChange={(e) =>
                        setSortBy(
                          e.target.value
                        )
                      }
                      className="min-w-[130px] rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    >

                      <option value="nama_asc">
                        Nama A-Z
                      </option>

                      <option value="nama_desc">
                        Nama Z-A
                      </option>

                      <option value="nis_asc">
                        NIS A-Z
                      </option>

                      <option value="nis_desc">
                        NIS Z-A
                      </option>

                      <option value="kelas">
                        Kelas
                      </option>

                      <option value="status">
                        Status
                      </option>

                    </select>

                    {/* RESET */}
                    <button
                      onClick={() => {
                        setSearch("");
                        setFilterStatus(
                          "semua"
                        );
                        setFilterKelas(
                          "semua"
                        );
                        setKelasSearch(
                          ""
                        );
                        setSortBy(
                          "nama_asc"
                        );
                      }}
                      className="rounded-lg px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800"
                    >
                      Reset
                    </button>

                    <span className="ml-auto hidden text-sm text-slate-600 sm:inline">
                      {
                        filteredByKelas.length
                      }{" "}
                      siswa ditemukan
                    </span>

                  </div>

                </div>

              </div>

              {/* =================================================
                  TABLE
              ================================================= */}
              <div className="w-full overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">

                <div className="w-full overflow-x-auto">

                  <table className="w-full min-w-[800px] table-auto">

                    <thead>

                      <tr className="border-b border-blue-700 bg-blue-600">

                        <th className="w-[6%] whitespace-nowrap px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white">
                          No
                        </th>

                        <th className="w-[27%] whitespace-nowrap px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                          Profil
                        </th>

                        <th className="w-[12%] whitespace-nowrap px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                          NIS
                        </th>

                        <th className="w-[14%] whitespace-nowrap px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                          Kelas
                        </th>

                        <th className="hidden w-[17%] whitespace-nowrap px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white md:table-cell">
                          Email
                        </th>

                        <th className="w-[10%] whitespace-nowrap px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                          Status
                        </th>

                        <th className="w-[14%] whitespace-nowrap px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider text-white">
                          Aksi
                        </th>

                      </tr>

                    </thead>

                    <tbody className="divide-y divide-slate-200">

                      {currentItems.map(
                        (item, index) => {
                          const rowNumber =
                            startIndex +
                            index +
                            1;

                          return (
                            <tr
                              key={
                                item.id
                              }
                              className="group transition-colors hover:bg-blue-50/50"
                            >

                              {/* NO */}
                              <td className="px-3 py-4 text-center text-sm font-medium text-slate-700">
                                {
                                  rowNumber
                                }
                              </td>

                              {/* PROFIL */}
                              <td className="px-3 py-4">

                                <div className="flex min-w-0 items-center gap-3">

                                  <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getAvatarColor(
                                      item.nama
                                    )} text-sm font-bold text-white shadow-sm`}
                                  >
                                    {getInitials(
                                      item.nama
                                    )}
                                  </div>

                                  <div className="min-w-0">

                                    <p className="truncate text-sm font-semibold text-slate-800">
                                      {
                                        item.nama
                                      }
                                    </p>

                                    <p className="truncate text-xs text-slate-500">
                                      {item.gender ===
                                      "L"
                                        ? "Laki-laki"
                                        : "Perempuan"}{" "}
                                      ·{" "}
                                      {
                                        item.nis
                                      }
                                    </p>

                                  </div>

                                </div>

                              </td>

                              {/* NIS */}
                              <td className="px-3 py-4">

                                <span className="whitespace-nowrap text-sm text-slate-700">
                                  {
                                    item.nis
                                  }
                                </span>

                              </td>

                              {/* KELAS */}
                              <td className="px-3 py-4">

                                <span className="inline-flex whitespace-nowrap rounded-lg bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-700">
                                  {
                                    item.kelas
                                  }
                                </span>

                              </td>

                              {/* EMAIL */}
                              <td className="hidden px-3 py-4 md:table-cell">

                                <span className="block max-w-[200px] truncate text-sm text-slate-600">
                                  {
                                    item.email
                                  }
                                </span>

                              </td>

                              {/* STATUS */}
                              <td className="px-3 py-4">

                                <span
                                  className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${
                                    item.status ===
                                    "Aktif"
                                      ? "border-emerald-300 bg-emerald-100 text-emerald-700"
                                      : "border-rose-300 bg-rose-100 text-rose-700"
                                  }`}
                                >

                                  <span className="h-1.5 w-1.5 rounded-full bg-current" />

                                  {
                                    item.status
                                  }

                                </span>

                              </td>

                              {/* AKSI */}
                              <td className="px-3 py-4">

                                <div className="flex justify-end gap-1.5">

                                  {/* DETAIL */}
                                  <button
                                    onClick={() =>
                                      router.push(
                                        `/admin/siswa/${item.id}`
                                      )
                                    }
                                    className="rounded-lg p-2 text-slate-500 transition-all hover:bg-blue-100 hover:text-blue-700 hover:shadow-sm"
                                    title="Lihat Profil"
                                  >
                                    <Eye
                                      size={
                                        17
                                      }
                                    />
                                  </button>

                                  {/* EDIT */}
                                  <button
                                    onClick={() =>
                                      router.push(
                                        `/admin/siswa/edit/${item.id}`
                                      )
                                    }
                                    className="rounded-lg p-2 text-slate-500 transition-all hover:bg-amber-100 hover:text-amber-700 hover:shadow-sm"
                                    title="Edit"
                                  >
                                    <Edit
                                      size={
                                        17
                                      }
                                    />
                                  </button>

                                  {/* DELETE */}
                                  <button
                                    onClick={() =>
                                      handleDelete(
                                        item.id,
                                        item.nama
                                      )
                                    }
                                    className="rounded-lg p-2 text-slate-500 transition-all hover:bg-rose-100 hover:text-rose-700 hover:shadow-sm"
                                    title="Hapus"
                                  >
                                    <Trash2
                                      size={
                                        17
                                      }
                                    />
                                  </button>

                                </div>

                              </td>

                            </tr>
                          );
                        }
                      )}

                    </tbody>

                  </table>

                </div>

                {/* EMPTY STATE */}
                {currentItems.length ===
                  0 && (
                  <div className="p-10 text-center">

                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                      <Users
                        size={28}
                        className="text-slate-400"
                      />
                    </div>

                    <p className="text-sm font-semibold text-slate-700">
                      Tidak ada data siswa
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {search
                        ? "Coba ubah kata pencarian"
                        : "Silakan tambahkan siswa baru"}
                    </p>

                  </div>
                )}

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-300 bg-slate-50 px-4 py-3 sm:flex-row">

                    <div className="flex items-center gap-3 text-sm text-slate-600">

                      <span>
                        Menampilkan{" "}
                        {
                          startIndex +
                          1
                        }{" "}
                        -{" "}
                        {endIndex}{" "}
                        dari{" "}
                        {
                          totalItems
                        }{" "}
                        data
                      </span>

                      <div className="flex items-center gap-1">

                        <span>
                          Tampil
                        </span>

                        <select
                          value={
                            itemsPerPage
                          }
                          onChange={(
                            e
                          ) => {
                            setItemsPerPage(
                              Number(
                                e
                                  .target
                                  .value
                              )
                            );

                            setCurrentPage(
                              1
                            );
                          }}
                          className="cursor-pointer rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        >
                          <option value={10}>
                            10
                          </option>

                          <option value={20}>
                            20
                          </option>

                          <option value={40}>
                            40
                          </option>
                        </select>

                      </div>

                    </div>

                    <div className="flex items-center gap-1">

                      {/* FIRST */}
                      <button
                        onClick={() =>
                          goToPage(1)
                        }
                        disabled={
                          currentPage ===
                          1
                        }
                        className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={
                              2
                            }
                            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                          />
                        </svg>
                      </button>

                      {/* PREVIOUS */}
                      <button
                        onClick={() =>
                          goToPage(
                            currentPage -
                              1
                          )
                        }
                        disabled={
                          currentPage ===
                          1
                        }
                        className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={
                              2
                            }
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>

                      {/* PAGE NUMBERS */}
                      {Array.from(
                        {
                          length:
                            Math.min(
                              5,
                              totalPages
                            ),
                        },
                        (
                          _,
                          i
                        ) => {
                          let pageNumber;

                          if (
                            totalPages <=
                            5
                          ) {
                            pageNumber =
                              i +
                              1;
                          } else if (
                            currentPage <=
                            3
                          ) {
                            pageNumber =
                              i +
                              1;
                          } else if (
                            currentPage >=
                            totalPages -
                              2
                          ) {
                            pageNumber =
                              totalPages -
                              4 +
                              i;
                          } else {
                            pageNumber =
                              currentPage -
                              2 +
                              i;
                          }

                          return (
                            <button
                              key={
                                pageNumber
                              }
                              onClick={() =>
                                goToPage(
                                  pageNumber
                                )
                              }
                              className={`h-8 w-8 rounded-lg text-sm font-medium transition ${
                                currentPage ===
                                pageNumber
                                  ? "bg-blue-600 text-white"
                                  : "text-slate-700 hover:bg-slate-200"
                              }`}
                            >
                              {
                                pageNumber
                              }
                            </button>
                          );
                        }
                      )}

                      {/* NEXT */}
                      <button
                        onClick={() =>
                          goToPage(
                            currentPage +
                              1
                          )
                        }
                        disabled={
                          currentPage ===
                          totalPages
                        }
                        className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={
                              2
                            }
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>

                      {/* LAST */}
                      <button
                        onClick={() =>
                          goToPage(
                            totalPages
                          )
                        }
                        disabled={
                          currentPage ===
                          totalPages
                        }
                        className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={
                              2
                            }
                            d="M13 5l7 7-7 7"
                          />
                        </svg>
                      </button>

                    </div>

                  </div>
                )}

              </div>

              {/* FOOTER */}
              <footer className="border-t border-slate-300 py-4 text-center text-sm text-slate-500">
                © 2026 SmartSchool • Data Siswa
              </footer>

            </div>

          </div>

        </main>

      </div>

      {/* =====================================================
          POPUP HAPUS SISWA
      ===================================================== */}
      {deleteModal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={closeDeleteModal}
        >

          <div
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* ICON + TEXT */}
            <div className="p-6 text-center">

              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
                <AlertTriangle
                  size={30}
                  className="text-rose-600"
                />
              </div>

              <h3 className="text-xl font-bold text-slate-800">
                Hapus Data Siswa?
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Apakah kamu yakin ingin
                menghapus data siswa
                <br />

                <span className="font-semibold text-slate-800">
                  "{deleteModal.nama}"
                </span>
                ?
              </p>

              <p className="mt-3 text-xs text-rose-500">
                Data yang sudah dihapus
                tidak dapat dikembalikan.
              </p>

            </div>

            {/* BUTTON */}
            <div className="flex gap-3 border-t border-slate-200 bg-slate-50 p-4">

              <button
                onClick={
                  closeDeleteModal
                }
                className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Batal
              </button>

              <button
                onClick={
                  confirmDelete
                }
                className="flex-1 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-rose-700"
              >
                <span className="flex items-center justify-center gap-2">
                  <Trash2 size={16} />
                  Hapus
                </span>
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}