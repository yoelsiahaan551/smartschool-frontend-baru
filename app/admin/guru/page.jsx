"use client";

import { useState, useEffect } from "react";
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
  User,
  Upload,
  UserPlus,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  Filter,
  Download,
  FileSpreadsheet,
  FileText,
  Printer,
} from "lucide-react";

// =========================================================
// STORAGE
// =========================================================

const STORAGE_KEY = "guru_data";

// =========================================================
// DEFAULT DATA
// =========================================================

const getDefaultGuru = () => {
  const data = [];

  const names = [
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
    "Tuti Rahayu, S.Pd.",
    "Agus Salim, S.Pd.I.",
    "Diana Kusuma, S.Pd.",
    "Rudi Hartono, S.Pd.",
    "Sari Wulandari, S.Pd.",
    "Irwan Setiawan, S.Pd.",
    "Yuli Astuti, S.Pd.",
    "Anton Budiman, S.Si.",
    "Nina Susanti, S.Pd.",
    "Rahmat Hidayat, S.Pd.",
  ];

  const mapels = [
    "Matematika",
    "Bahasa Indonesia",
    "Fisika",
    "Biologi",
    "Kimia",
    "Bahasa Inggris",
    "Informatika",
    "IPS",
    "PJOK",
    "Seni Budaya",
    "PKN",
    "Agama",
    "Prakarya",
    "Geografi",
    "Sejarah",
    "Ekonomi",
    "Sosiologi",
    "Antropologi",
  ];

  const statuses = ["Aktif", "Nonaktif"];
  const genders = ["L", "P"];

  for (let i = 0; i < 45; i++) {
    const nameIdx = i % names.length;
    const mapelIdx = i % mapels.length;
    const statusIdx = i % 5 === 3 ? 1 : 0;
    const genderIdx = i % 2;

    data.push({
      id: i + 1,
      nama: names[nameIdx],
      nip: `198${String(50 + i).padStart(2, "0")}${String(
        10 + i
      ).padStart(2, "0")}${String(2010 + (i % 7)).padStart(2, "0")}${String(
        1001 + i
      ).padStart(4, "0")}`,
      mapel: mapels[mapelIdx],
      email: `${names[nameIdx].split(" ")[0].toLowerCase()}@sekolah.com`,
      phone: `081234567${String(800 + i).padStart(3, "0")}`,
      status: statuses[statusIdx],
      alamat: `Jl. Contoh No. ${i + 1}, Jakarta`,
      tglLahir: `198${String(50 + i).padStart(2, "0")}-${String(
        1 + (i % 12)
      ).padStart(2, "0")}-${String(1 + (i % 28)).padStart(2, "0")}`,
      gender: genders[genderIdx],
      joinDate: `${2010 + (i % 7)}-${String(1 + (i % 12)).padStart(
        2,
        "0"
      )}-${String(1 + (i % 28)).padStart(2, "0")}`,
    });
  }

  return data;
};

// =========================================================
// LOCAL STORAGE
// =========================================================

const loadGuru = () => {
  if (typeof window === "undefined") {
    return getDefaultGuru();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      const defaultData = getDefaultGuru();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
      return defaultData;
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error("Gagal membaca data guru:", error);
    return getDefaultGuru();
  }
};

const saveGuru = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

// =========================================================
// PAGE
// =========================================================

export default function AdminGuruPage() {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [guru, setGuru] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [sortBy, setSortBy] = useState("nama_asc");
  const [filterStatus, setFilterStatus] = useState("semua");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // =======================================================
  // LOAD DATA
  // =======================================================

  useEffect(() => {
    setGuru(loadGuru());
  }, []);

  // =======================================================
  // DELETE
  // =======================================================

  const handleDelete = (id, nama) => {
    const confirmed = window.confirm(
      `Yakin ingin menghapus guru "${nama}"?`
    );

    if (!confirmed) return;

    const updated = guru.filter((item) => item.id !== id);

    setGuru(updated);
    saveGuru(updated);

    const totalItemsAfterDelete = updated.length;
    const maxPage = Math.ceil(totalItemsAfterDelete / itemsPerPage);

    if (currentPage > maxPage && maxPage > 0) {
      setCurrentPage(maxPage);
    } else if (totalItemsAfterDelete === 0) {
      setCurrentPage(1);
    }

    alert(`Guru "${nama}" berhasil dihapus!`);
  };

  // =======================================================
  // REFRESH
  // =======================================================

  const handleRefresh = () => {
    const data = loadGuru();
    setGuru(data);
    setCurrentPage(1);
  };

  // =======================================================
  // SEARCH
  // =======================================================

  const filteredBySearch = guru.filter((g) => {
    const keyword = search.toLowerCase();

    return (
      g.nama.toLowerCase().includes(keyword) ||
      g.nip.includes(search) ||
      g.mapel.toLowerCase().includes(keyword) ||
      g.email.toLowerCase().includes(keyword)
    );
  });

  // =======================================================
  // FILTER STATUS
  // =======================================================

  const filteredByStatus =
    filterStatus === "semua"
      ? filteredBySearch
      : filteredBySearch.filter((g) => g.status === filterStatus);

  // =======================================================
  // SORT
  // =======================================================

  const sorted = [...filteredByStatus].sort((a, b) => {
    switch (sortBy) {
      case "nama_asc":
        return a.nama.localeCompare(b.nama);

      case "nama_desc":
        return b.nama.localeCompare(a.nama);

      case "nip_asc":
        return a.nip.localeCompare(b.nip);

      case "nip_desc":
        return b.nip.localeCompare(a.nip);

      case "status":
        return a.status.localeCompare(b.status);

      default:
        return 0;
    }
  });

  // =======================================================
  // PAGINATION
  // =======================================================

  const totalItems = sorted.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const currentItems = sorted.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterStatus, sortBy, itemsPerPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
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
      "NIP",
      "Mapel",
      "Email",
      "Telepon",
      "Status",
      "Alamat",
      "Tanggal Lahir",
      "Jenis Kelamin",
      "Tanggal Bergabung",
    ];

    const rows = sorted.map((g, idx) => [
      idx + 1,
      g.nama,
      g.nip,
      g.mapel,
      g.email,
      g.phone,
      g.status,
      g.alamat,
      g.tglLahir,
      g.gender === "L" ? "Laki-laki" : "Perempuan",
      g.joinDate,
    ]);

    const escapeCSV = (value) => {
      const stringValue = String(value ?? "");
      return `"${stringValue.replace(/"/g, '""')}"`;
    };

    let csv = headers.map(escapeCSV).join(",") + "\n";

    rows.forEach((row) => {
      csv += row.map(escapeCSV).join(",") + "\n";
    });

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `data_guru_${new Date()
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
      "NIP",
      "Mapel",
      "Email",
      "Telepon",
      "Status",
      "Alamat",
      "Tanggal Lahir",
      "Jenis Kelamin",
      "Tanggal Bergabung",
    ];

    let tableHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:x="urn:schemas-microsoft-com:office:excel"
            xmlns="http://www.w3.org/TR/REC-html40">

      <head>
        <meta charset="UTF-8">

        <style>
          th, td {
            border: 1px solid #ccc;
            padding: 6px 10px;
            font-size: 12px;
            font-family: Arial, sans-serif;
          }

          th {
            background: #f0f0f0;
            font-weight: bold;
          }
        </style>
      </head>

      <body>
        <table>
          <tr>
            ${headers.map((h) => `<th>${h}</th>`).join("")}
          </tr>
    `;

    sorted.forEach((g, idx) => {
      tableHtml += `
        <tr>
          <td>${idx + 1}</td>
          <td>${g.nama}</td>
          <td>${g.nip}</td>
          <td>${g.mapel}</td>
          <td>${g.email}</td>
          <td>${g.phone}</td>
          <td>${g.status}</td>
          <td>${g.alamat}</td>
          <td>${g.tglLahir}</td>
          <td>${g.gender === "L" ? "Laki-laki" : "Perempuan"}</td>
          <td>${g.joinDate}</td>
        </tr>
      `;
    });

    tableHtml += `
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([tableHtml], {
      type: "application/vnd.ms-excel",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `data_guru_${new Date()
      .toISOString()
      .slice(0, 10)}.xls`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =======================================================
  // EXPORT PDF / PRINT
  // =======================================================

  const exportPDF = () => {
    const printWindow = window.open(
      "",
      "_blank",
      "width=1024,height=768"
    );

    if (!printWindow) {
      alert("Mohon izinkan popup untuk mencetak PDF");
      return;
    }

    const headers = [
      "No",
      "Nama",
      "NIP",
      "Mapel",
      "Email",
      "Status",
    ];

    let tableHtml = `
      <html>
        <head>
          <title>Data Guru</title>

          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }

            h1 {
              font-size: 18px;
              color: #1e293b;
              margin-bottom: 10px;
            }

            p {
              font-size: 12px;
              color: #64748b;
              margin-bottom: 20px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 11px;
            }

            th {
              background: #2563eb;
              color: white;
              padding: 8px 10px;
              text-align: left;
            }

            td {
              border: 1px solid #e2e8f0;
              padding: 6px 10px;
            }

            tr:nth-child(even) {
              background: #f8fafc;
            }

            .total {
              margin-top: 15px;
              font-size: 12px;
              color: #475569;
            }
          </style>
        </head>

        <body>
          <h1>Data Guru</h1>

          <p>
            Total: ${sorted.length} guru |
            ${new Date().toLocaleDateString("id-ID")}
          </p>

          <table>
            <tr>
              ${headers.map((h) => `<th>${h}</th>`).join("")}
            </tr>
    `;

    sorted.forEach((g, idx) => {
      tableHtml += `
        <tr>
          <td>${idx + 1}</td>
          <td>${g.nama}</td>
          <td>${g.nip}</td>
          <td>${g.mapel}</td>
          <td>${g.email}</td>
          <td>${g.status}</td>
        </tr>
      `;
    });

    tableHtml += `
          </table>

          <p class="total">
            Dicetak dari SmartSchool -
            ${new Date().toLocaleString("id-ID")}
          </p>
        </body>
      </html>
    `;

    printWindow.document.write(tableHtml);
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };

  // =======================================================
  // STATISTICS
  // =======================================================

  const totalGuru = guru.length;

  const totalAktif = guru.filter(
    (g) => g.status === "Aktif"
  ).length;

  const totalNonaktif = guru.filter(
    (g) => g.status !== "Aktif"
  ).length;

  const totalMapel = new Set(
    guru.map((g) => g.mapel)
  ).size;

  // =======================================================
  // INITIALS
  // =======================================================

  const getInitials = (nama) => {
    if (!nama) return "GU";

    const cleanName = nama
      .replace(/,.*$/, "")
      .trim();

    const parts = cleanName.split(" ");

    if (parts.length >= 2) {
      return (
        parts[0][0] + parts[1][0]
      ).toUpperCase();
    }

    return cleanName
      .substring(0, 2)
      .toUpperCase();
  };

  const getAvatarColor = (nama) => {
    const colors = [
      "bg-blue-600",
      "bg-indigo-600",
      "bg-sky-600",
      "bg-violet-600",
      "bg-cyan-600",
      "bg-blue-500",
      "bg-indigo-500",
      "bg-slate-600",
    ];

    return colors[
      nama.length % colors.length
    ];
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div className="flex h-screen w-full bg-slate-100 overflow-hidden">
      <Sidebar
        active="guru"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
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

        <main className="flex-1 overflow-y-auto">
          <div className="w-full p-4 md:p-6 lg:p-8">
            <div className="w-full space-y-5">

              {/* =================================================
                  PAGE HEADER
              ================================================= */}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-200">
                    <Users size={21} />
                  </div>

                  <div>
                    <h1 className="text-xl font-semibold text-slate-800">
                      Data Guru
                    </h1>

                    <p className="text-sm text-slate-600">
                      Data induk tenaga pendidik
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">

                  {/* EXPORT */}

                  <div className="relative group">
                    <button
                      className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all text-sm font-medium"
                    >
                      <Download size={17} />
                      <span>Export</span>
                    </button>

                    <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl border border-slate-300 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                      <button
                        onClick={exportPDF}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-t-xl transition"
                      >
                        <Printer size={16} />
                        PDF
                      </button>

                      <button
                        onClick={exportExcel}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
                      >
                        <FileSpreadsheet size={16} />
                        Excel
                      </button>

                      <button
                        onClick={exportCSV}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-b-xl transition"
                      >
                        <FileText size={16} />
                        CSV
                      </button>
                    </div>
                  </div>

                  {/* REFRESH */}

                  <button
                    onClick={handleRefresh}
                    className="p-2.5 rounded-xl border border-slate-300 bg-white text-slate-600 hover:text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all"
                    title="Refresh data"
                  >
                    <RefreshCw size={17} />
                  </button>

                  {/* ADD */}

                  <button
                    onClick={() =>
                      setShowModal(true)
                    }
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-blue-200 font-medium"
                  >
                    <Plus size={18} />
                    <span>Tambah Guru</span>
                  </button>
                </div>
              </div>

              {/* =================================================
                  STATISTICS
              ================================================= */}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white rounded-xl border border-slate-300 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                      <Users size={16} />
                    </div>

                    <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                      Total Guru
                    </p>
                  </div>

                  <p className="text-2xl font-bold text-slate-800 mt-1">
                    {totalGuru}
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-300 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
                      <CheckCircle size={16} />
                    </div>

                    <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                      Aktif
                    </p>
                  </div>

                  <p className="text-2xl font-bold text-slate-800 mt-1">
                    {totalAktif}
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-300 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
                      <XCircle size={16} />
                    </div>

                    <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                      Nonaktif
                    </p>
                  </div>

                  <p className="text-2xl font-bold text-slate-800 mt-1">
                    {totalNonaktif}
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-300 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
                      <Users size={16} />
                    </div>

                    <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                      Mapel
                    </p>
                  </div>

                  <p className="text-2xl font-bold text-indigo-700 mt-1">
                    {totalMapel}
                  </p>
                </div>
              </div>

              {/* =================================================
                  FILTER
              ================================================= */}

              <div className="bg-white rounded-xl border border-slate-300 p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-3">

                  <div className="relative flex-1">
                    <Search
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      type="text"
                      placeholder="Cari nama, NIP, atau mata pelajaran..."
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-800 bg-slate-50 border border-slate-300 rounded-xl placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Filter
                      size={17}
                      className="text-slate-500 shrink-0"
                    />

                    <select
                      value={filterStatus}
                      onChange={(e) =>
                        setFilterStatus(e.target.value)
                      }
                      className="py-2.5 px-3 pr-8 text-sm text-slate-700 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition appearance-none cursor-pointer"
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
                  </div>

                  <div className="flex items-center gap-2">
                    <ArrowUpDown
                      size={17}
                      className="text-slate-500 shrink-0"
                    />

                    <select
                      value={sortBy}
                      onChange={(e) =>
                        setSortBy(e.target.value)
                      }
                      className="py-2.5 px-3 pr-8 text-sm text-slate-700 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition appearance-none cursor-pointer"
                    >
                      <option value="nama_asc">
                        Nama A-Z
                      </option>
                      <option value="nama_desc">
                        Nama Z-A
                      </option>
                      <option value="nip_asc">
                        NIP A-Z
                      </option>
                      <option value="nip_desc">
                        NIP Z-A
                      </option>
                      <option value="status">
                        Status
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* =================================================
                  TABLE
              ================================================= */}

              <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden">

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px] table-fixed">

                    <colgroup>
                      <col className="w-[6%]" />
                      <col className="w-[25%]" />
                      <col className="w-[15%]" />
                      <col className="w-[12%]" />
                      <col className="w-[17%]" />
                      <col className="w-[10%]" />
                      <col className="w-[15%]" />
                    </colgroup>

                    <thead>
                      <tr className="border-b border-blue-700 bg-gradient-to-r from-blue-600 to-blue-700">

                        {/* NO */}
                        <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                          No
                        </th>

                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                          Profil
                        </th>

                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                          NIP
                        </th>

                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                          Mapel
                        </th>

                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                          Email
                        </th>

                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                          Status
                        </th>

                        <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                          Aksi
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-blue-100">

                      {currentItems.map((item, index) => {
                        const rowNumber =
                          startIndex + index + 1;

                        return (
                          <tr
                            key={item.id}
                            className={`transition-colors hover:bg-blue-100 ${
                              index % 2 === 0 ? "bg-blue-50/60" : "bg-white"
                            }`}
                          >

                            {/* NO */}
                            <td className="px-4 py-4 text-center align-middle text-sm font-medium text-slate-700">
                              <span className="inline-flex items-center justify-center min-w-[24px]">
                                {rowNumber}
                              </span>
                            </td>

                            {/* PROFIL */}
                            <td className="px-4 py-4 align-middle">
                              <div className="flex items-center gap-3 min-w-0">
                                <div
                                  className={`w-10 h-10 rounded-full ${getAvatarColor(
                                    item.nama
                                  )} flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0`}
                                >
                                  {getInitials(
                                    item.nama
                                  )}
                                </div>

                                <div className="min-w-0">
                                  <p className="font-semibold text-slate-800 text-sm truncate">
                                    {item.nama}
                                  </p>

                                  <p className="text-xs text-slate-500 truncate">
                                    {item.mapel} ·{" "}
                                    {item.nip}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* NIP */}
                            <td className="px-4 py-4 align-middle">
                              <span className="text-sm text-slate-700 whitespace-nowrap">
                                {item.nip}
                              </span>
                            </td>

                            {/* MAPEL */}
                            <td className="px-4 py-4 align-middle">
                              <span className="text-sm text-slate-700">
                                {item.mapel}
                              </span>
                            </td>

                            {/* EMAIL */}
                            <td className="px-4 py-4 align-middle">
                              <span className="text-sm text-slate-600 break-all">
                                {item.email}
                              </span>
                            </td>

                            {/* STATUS */}
                            <td className="px-4 py-4 align-middle">
                              <span
                                className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border whitespace-nowrap ${
                                  item.status ===
                                  "Aktif"
                                    ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                                    : "bg-rose-100 text-rose-700 border-rose-300"
                                }`}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-current" />

                                {item.status}
                              </span>
                            </td>

                            {/* AKSI */}
                            <td className="px-4 py-4 align-middle">
                              <div className="flex justify-center gap-1.5">

                                <button
                                  onClick={() =>
                                    router.push(
                                      `/admin/guru/${item.id}`
                                    )
                                  }
                                  className="p-2 rounded-lg text-slate-500 hover:bg-blue-100 hover:text-blue-700 transition-all"
                                  title="Lihat Profil"
                                >
                                  <Eye size={17} />
                                </button>

                                <button
                                  onClick={() =>
                                    router.push(
                                      `/admin/guru/edit/${item.id}`
                                    )
                                  }
                                  className="p-2 rounded-lg text-slate-500 hover:bg-amber-100 hover:text-amber-700 transition-all"
                                  title="Edit Guru"
                                >
                                  <Edit size={17} />
                                </button>

                                <button
                                  onClick={() =>
                                    handleDelete(
                                      item.id,
                                      item.nama
                                    )
                                  }
                                  className="p-2 rounded-lg text-slate-500 hover:bg-rose-100 hover:text-rose-700 transition-all"
                                  title="Hapus Guru"
                                >
                                  <Trash2 size={17} />
                                </button>

                              </div>
                            </td>

                          </tr>
                        );
                      })}

                    </tbody>
                  </table>
                </div>

                {/* EMPTY STATE */}

                {sorted.length === 0 && (
                  <div className="p-10 text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mx-auto mb-3">
                      <Users size={24} />
                    </div>

                    <p className="text-sm font-medium text-slate-700">
                      Tidak ada data guru
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      {search
                        ? "Coba ubah kata pencarian"
                        : "Silakan tambahkan guru baru"}
                    </p>

                    {!search && (
                      <button
                        onClick={() =>
                          setShowModal(true)
                        }
                        className="mt-3 text-sm text-blue-700 font-medium hover:text-blue-800 hover:underline"
                      >
                        Tambah guru pertama →
                      </button>
                    )}
                  </div>
                )}

                {/* PAGINATION */}

                {totalPages > 1 && (
                  <div className="flex flex-col lg:flex-row items-center justify-between px-4 py-3 border-t border-slate-300 bg-slate-50 gap-3">

                    <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600">

                      <span>
                        Menampilkan{" "}
                        <strong className="font-semibold text-slate-700">
                          {startIndex + 1}
                        </strong>{" "}
                        -{" "}
                        <strong className="font-semibold text-slate-700">
                          {endIndex}
                        </strong>{" "}
                        dari{" "}
                        <strong className="font-semibold text-slate-700">
                          {totalItems}
                        </strong>{" "}
                        data
                      </span>

                      <div className="flex items-center gap-1.5">
                        <span>Tampil</span>

                        <select
                          value={itemsPerPage}
                          onChange={(e) => {
                            setItemsPerPage(
                              Number(e.target.value)
                            );
                            setCurrentPage(1);
                          }}
                          className="py-1 px-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-slate-700 cursor-pointer"
                        >
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={40}>40</option>
                        </select>
                      </div>

                    </div>

                    {/* PAGINATION BUTTONS */}

                    <div className="flex items-center gap-1">

                      <button
                        onClick={() =>
                          goToPage(1)
                        }
                        disabled={currentPage === 1}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition"
                        title="Halaman pertama"
                      >
                        <ChevronsLeft size={16} />
                      </button>

                      <button
                        onClick={() =>
                          goToPage(
                            currentPage - 1
                          )
                        }
                        disabled={currentPage === 1}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition"
                        title="Halaman sebelumnya"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      {Array.from(
                        {
                          length: Math.min(
                            5,
                            totalPages
                          ),
                        },
                        (_, i) => {
                          let pageNumber;

                          if (totalPages <= 5) {
                            pageNumber = i + 1;
                          } else if (
                            currentPage <= 3
                          ) {
                            pageNumber = i + 1;
                          } else if (
                            currentPage >=
                            totalPages - 2
                          ) {
                            pageNumber =
                              totalPages - 4 + i;
                          } else {
                            pageNumber =
                              currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNumber}
                              onClick={() =>
                                goToPage(
                                  pageNumber
                                )
                              }
                              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                                currentPage ===
                                pageNumber
                                  ? "bg-blue-600 text-white shadow-sm"
                                  : "text-slate-700 hover:bg-slate-200"
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        }
                      )}

                      <button
                        onClick={() =>
                          goToPage(
                            currentPage + 1
                          )
                        }
                        disabled={
                          currentPage === totalPages
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition"
                        title="Halaman berikutnya"
                      >
                        <ChevronRight size={16} />
                      </button>

                      <button
                        onClick={() =>
                          goToPage(totalPages)
                        }
                        disabled={
                          currentPage === totalPages
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition"
                        title="Halaman terakhir"
                      >
                        <ChevronsRight size={16} />
                      </button>

                    </div>
                  </div>
                )}
              </div>

              {/* FOOTER */}

              <footer className="text-center text-sm text-slate-500 py-3 border-t border-slate-300">
                © 2026 SmartSchool • Data Guru
              </footer>

            </div>
          </div>
        </main>
      </div>

      {/* =====================================================
          MODAL TAMBAH GURU
      ===================================================== */}

      {showModal && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() =>
            setShowModal(false)
          }
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-3">
                <UserPlus size={28} />
              </div>

              <h3 className="text-xl font-bold text-slate-800">
                Tambah Guru
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Pilih metode penambahan guru
              </p>
            </div>

            <div className="space-y-3">

              <button
                onClick={() => {
                  setShowModal(false);

                  router.push(
                    "/admin/guru/tambah?mode=form"
                  );
                }}
                className="w-full flex items-center gap-4 p-4 border border-slate-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 group-hover:bg-blue-200 transition">
                  <User size={20} />
                </div>

                <div className="flex-1 text-left">
                  <p className="font-semibold text-slate-700">
                    Form Biasa
                  </p>

                  <p className="text-xs text-slate-500 mt-0.5">
                    Isi data guru secara manual
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="text-slate-400 group-hover:text-blue-600 transition"
                />
              </button>

              <button
                onClick={() => {
                  setShowModal(false);

                  router.push(
                    "/admin/guru/tambah?mode=import"
                  );
                }}
                className="w-full flex items-center gap-4 p-4 border border-slate-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-50/50 transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 group-hover:bg-indigo-200 transition">
                  <Upload size={20} />
                </div>

                <div className="flex-1 text-left">
                  <p className="font-semibold text-slate-700">
                    Import Data
                  </p>

                  <p className="text-xs text-slate-500 mt-0.5">
                    Upload file Excel atau CSV
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="text-slate-400 group-hover:text-indigo-600 transition"
                />
              </button>

            </div>

            <button
              onClick={() =>
                setShowModal(false)
              }
              className="mt-4 w-full py-2.5 text-sm text-slate-600 hover:text-slate-800 transition"
            >
              Batal
            </button>

          </div>
        </div>
      )}
    </div>
  );
}