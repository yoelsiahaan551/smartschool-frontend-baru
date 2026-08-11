"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  Package,
  Building2,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Sparkles,
  Eye,
  Edit,
  Trash2,
  FileSpreadsheet,
  Plus,
  ArrowUp,
  ArrowDown,
  Users,
  DollarSign,
  CreditCard,
  BadgeCheck,
  Ban,
  MoreHorizontal,
  Copy,
  RefreshCw,
  Printer,
  Mail,
  Phone,
  MapPin,
  User,
  ChevronDown,
  Filter,
  Layers,
  Crown,
  Zap,
  Star,
  CircleDollarSign,
} from "lucide-react";

// ===== DATA DUMMY (sesuai dengan skema) =====
const dummyLangganan = [
  {
    id: "lang-001",
    sekolah: {
      id: "sklh-01",
      nama: "SMA Negeri 1 Jakarta",
      subdomain: "sman1jakarta",
      logo: "🏫",
      alamat: "Jl. Merdeka No. 1, Jakarta Pusat",
      telepon: "(021) 1234567",
      email: "sman1jakarta@sch.id",
    },
    paket: {
      id: "pkt-01",
      nama: "Professional",
      icon: Zap,
      harga: 550000,
    },
    statusPembayaran: "lunas",
    statusLangganan: "aktif",
    tanggalMulai: "2024-01-15T00:00:00Z",
    tanggalBerakhir: "2025-01-15T00:00:00Z",
    hargaSaatBerlangganan: 550000,
    siklusPenagihan: "bulan",
    fiturAktif: ["akademik", "presensi", "keuangan"],
    xenditInvoiceId: "INV-001",
    xenditPaymentLink: "https://xendit.co/pay/inv-001",
    riwayatPembayaran: [
      { id: "pay-001", jumlah: 550000, metode: "xendit", status: "sukses", dibuatPada: "2024-01-15T00:00:00Z" },
      { id: "pay-002", jumlah: 550000, metode: "xendit", status: "sukses", dibuatPada: "2024-02-15T00:00:00Z" },
    ],
  },
  // ... tambahkan data lain sesuai kebutuhan
];

// ===== STATISTIK =====
const hitungStatistik = (data) => {
  const total = data.length;
  const aktif = data.filter((l) => l.statusLangganan === "aktif").length;
  const trial = data.filter((l) => l.statusLangganan === "trial").length;
  const akanBerakhir = data.filter((l) => {
    if (l.statusLangganan !== "aktif") return false;
    const sisaHari = (new Date(l.tanggalBerakhir) - new Date()) / (1000 * 60 * 60 * 24);
    return sisaHari <= 30 && sisaHari > 0;
  }).length;
  const expired = data.filter((l) => l.statusLangganan === "nonaktif" || new Date(l.tanggalBerakhir) < new Date()).length;
  const pending = data.filter((l) => l.statusPembayaran === "pending").length;
  const totalPendapatan = data.reduce((sum, l) => sum + (l.hargaSaatBerlangganan || 0), 0);
  return { total, aktif, trial, akanBerakhir, expired, pending, totalPendapatan };
};

export default function LanggananSekolahPage() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("langganan");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [filterPaket, setFilterPaket] = useState("Semua");
  const [filterPeriode, setFilterPeriode] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [sortField, setSortField] = useState("sekolah.nama");
  const [sortOrder, setSortOrder] = useState("asc");
  const itemsPerPage = 5;

  const notifications = [
    { id: 1, title: "Pembaruan Sistem v2.0", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Pengingat: Backup Data", desc: "Dikirim 1 hari lalu", read: false },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filter data
  const filteredData = dummyLangganan.filter((item) => {
    const matchSearch =
      item.sekolah.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === "Semua" || item.statusLangganan === filterStatus;
    const matchPaket = filterPaket === "Semua" || item.paket.nama === filterPaket;
    const matchPeriode = filterPeriode === "Semua" || item.siklusPenagihan === filterPeriode;
    return matchSearch && matchStatus && matchPaket && matchPeriode;
  });

  // Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    let valA, valB;
    if (sortField === "sekolah.nama") {
      valA = a.sekolah.nama.toLowerCase();
      valB = b.sekolah.nama.toLowerCase();
    } else if (sortField === "paket.nama") {
      valA = a.paket.nama.toLowerCase();
      valB = b.paket.nama.toLowerCase();
    } else if (sortField === "tanggalMulai") {
      valA = new Date(a.tanggalMulai).getTime();
      valB = new Date(b.tanggalMulai).getTime();
    } else if (sortField === "statusLangganan") {
      valA = a.statusLangganan;
      valB = b.statusLangganan;
    } else {
      valA = a[sortField] || "";
      valB = b[sortField] || "";
    }
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ?
      <ArrowUp size={14} className="ml-1 inline text-slate-400" /> :
      <ArrowDown size={14} className="ml-1 inline text-slate-400" />;
  };

  const resetFilters = () => {
    setSearchQuery("");
    setFilterStatus("Semua");
    setFilterPaket("Semua");
    setFilterPeriode("Semua");
  };

  const stats = hitungStatistik(dummyLangganan);

  const statusLanggananOptions = ["Semua", "aktif", "trial", "nonaktif"];
  const paketOptions = ["Semua", "Starter", "Professional", "Enterprise"];
  const periodeOptions = ["Semua", "bulan", "tahun"];

  const statusLanggananColorMap = {
    aktif: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
    trial: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
    nonaktif: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", dot: "bg-rose-500" },
  };

  const statusPembayaranColorMap = {
    lunas: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
    pending: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
    gagal: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  };

  const getStatusLanggananLabel = (status) => {
    const map = { aktif: "Aktif", trial: "Trial", nonaktif: "Nonaktif" };
    return map[status] || status;
  };

  const getStatusPembayaranLabel = (status) => {
    const map = { lunas: "Lunas", pending: "Pending", gagal: "Gagal" };
    return map[status] || status;
  };

  const formatTanggal = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatRupiah = (angka) => {
    if (!angka) return "Rp0";
    return "Rp" + angka.toLocaleString("id-ID");
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active={activeMenu}
        setActive={setActiveMenu}
        collapsed={!sidebarOpen}
        setCollapsed={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          user={{ name: "Sarah", email: "sarah@smartschool.com", avatar: "SA" }}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-600 text-white shadow-sm">
                    <Package size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">
                    Langganan Sekolah
                  </h1>
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                    Super Admin
                  </span>
                </div>
                <p className="text-sm text-slate-500 ml-[52px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400" />
                  Kelola seluruh langganan sekolah yang menggunakan SmartSchool.
                </p>
              </div>
              <div className="flex items-center gap-2.5 ml-[52px] sm:ml-0">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                  <FileSpreadsheet size={16} className="text-slate-400" />
                  <span className="hidden xs:inline">Export</span>
                </button>
                <button
                  onClick={() => router.push("/super-admin/langgananSekolah/tambah")}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
                >
                  <Plus size={16} />
                  <span className="hidden xs:inline">Tambah Langganan</span>
                </button>
              </div>
            </div>

            {/* STATISTIK */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <StatCard label="Total Sekolah" value={stats.total} icon={Building2} color="blue" />
              <StatCard label="Aktif" value={stats.aktif} icon={CheckCircle} color="emerald" />
              <StatCard label="Trial" value={stats.trial} icon={Clock} color="amber" />
              <StatCard label="Akan Berakhir" value={stats.akanBerakhir} icon={AlertCircle} color="orange" />
              <StatCard label="Expired" value={stats.expired} icon={XCircle} color="rose" />
              <StatCard label="Pendapatan" value={formatRupiah(stats.totalPendapatan)} icon={DollarSign} color="violet" />
            </div>

            {/* FILTER & SEARCH */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
              <div className="flex flex-col gap-3">
                <div className="relative w-full">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari nama sekolah atau ID langganan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-slate-400"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-600 min-w-[120px]"
                  >
                    {statusLanggananOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt === "Semua" ? "Status" : getStatusLanggananLabel(opt)}
                      </option>
                    ))}
                  </select>
                  <select
                    value={filterPaket}
                    onChange={(e) => setFilterPaket(e.target.value)}
                    className="px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-600 min-w-[120px]"
                  >
                    {paketOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <select
                    value={filterPeriode}
                    onChange={(e) => setFilterPeriode(e.target.value)}
                    className="px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-600 min-w-[120px]"
                  >
                    {periodeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt === "Semua" ? "Periode" : opt === "bulan" ? "Bulanan" : "Tahunan"}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={resetFilters}
                    className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Reset
                  </button>
                  <span className="ml-auto text-xs text-slate-400 hidden sm:inline">
                    {filteredData.length} data ditemukan
                  </span>
                </div>
              </div>
            </div>

            {/* TABEL */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              {isMobile && paginatedData.length > 0 ? (
                <div className="divide-y divide-slate-100 p-3">
                  {paginatedData.map((item) => {
                    const statusStyle = statusLanggananColorMap[item.statusLangganan] || statusLanggananColorMap.nonaktif;
                    const paymentStyle = statusPembayaranColorMap[item.statusPembayaran] || statusPembayaranColorMap.pending;
                    return (
                      <div key={item.id} className="py-3 space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg shadow-sm flex-shrink-0">
                            {item.sekolah.logo}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-800 text-sm truncate">{item.sekolah.nama}</p>
                            <p className="text-xs text-slate-500 font-mono">{item.id}</p>
                          </div>
                          <button
                            onClick={() => router.push(`/super-admin/langgananSekolah/${item.id}`)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors"
                          >
                            <Eye size={15} />
                          </button>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${statusStyle.dot} mr-1`} />
                            {getStatusLanggananLabel(item.statusLangganan)}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${paymentStyle.bg} ${paymentStyle.text} ${paymentStyle.border}`}>
                            {getStatusPembayaranLabel(item.statusPembayaran)}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-200">
                            {item.paket.nama}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">
                          {formatTanggal(item.tanggalMulai)} → {formatTanggal(item.tanggalBerakhir)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200/80">
                        <th className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                        <th
                          onClick={() => handleSort("sekolah.nama")}
                          className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 select-none"
                        >
                          <span className="flex items-center">
                            Sekolah
                            {renderSortIcon("sekolah.nama")}
                          </span>
                        </th>
                        <th
                          onClick={() => handleSort("paket.nama")}
                          className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 select-none"
                        >
                          <span className="flex items-center">
                            Paket
                            {renderSortIcon("paket.nama")}
                          </span>
                        </th>
                        <th className="hidden md:table-cell px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Periode</th>
                        <th
                          onClick={() => handleSort("tanggalMulai")}
                          className="hidden lg:table-cell px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 select-none"
                        >
                          <span className="flex items-center">
                            Mulai
                            {renderSortIcon("tanggalMulai")}
                          </span>
                        </th>
                        <th
                          onClick={() => handleSort("statusLangganan")}
                          className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 select-none"
                        >
                          <span className="flex items-center">
                            Status
                            {renderSortIcon("statusLangganan")}
                          </span>
                        </th>
                        <th className="hidden sm:table-cell px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Pembayaran</th>
                        <th className="px-4 py-3 text-right text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginatedData.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                            <div className="flex flex-col items-center gap-2">
                              <Search size={32} className="text-slate-300" />
                              <p className="text-sm font-medium">Tidak ada data langganan</p>
                              <p className="text-xs text-slate-400">Coba ubah filter atau kata kunci pencarian</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        paginatedData.map((item) => {
                          const statusStyle = statusLanggananColorMap[item.statusLangganan] || statusLanggananColorMap.nonaktif;
                          const paymentStyle = statusPembayaranColorMap[item.statusPembayaran] || statusPembayaranColorMap.pending;
                          return (
                            <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                              <td className="px-4 py-3 font-mono text-xs text-slate-500">{item.id}</td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-base shadow-sm">
                                    {item.sekolah.logo}
                                  </div>
                                  <div className="min-w-0">
                                    <p className="font-medium text-slate-800 text-sm truncate">{item.sekolah.nama}</p>
                                    <p className="text-xs text-slate-500 font-mono truncate">{item.sekolah.subdomain}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200">
                                  {item.paket.nama}
                                </span>
                              </td>
                              <td className="hidden md:table-cell px-4 py-3 text-xs text-slate-600">
                                {item.siklusPenagihan === "bulan" ? "Bulanan" : "Tahunan"}
                              </td>
                              <td className="hidden lg:table-cell px-4 py-3 text-xs text-slate-600">
                                {formatTanggal(item.tanggalMulai)}
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${statusStyle.dot} mr-1`} />
                                  {getStatusLanggananLabel(item.statusLangganan)}
                                </span>
                              </td>
                              <td className="hidden sm:table-cell px-4 py-3">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${paymentStyle.bg} ${paymentStyle.text} ${paymentStyle.border}`}>
                                  {getStatusPembayaranLabel(item.statusPembayaran)}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-0.5">
                                  <button
                                    onClick={() => router.push(`/super-admin/langgananSekolah/${item.id}`)}
                                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors"
                                    title="Detail"
                                  >
                                    <Eye size={15} />
                                  </button>
                                  <button
                                    onClick={() => router.push(`/super-admin/langgananSekolah/edit/${item.id}`)}
                                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-amber-600 transition-colors"
                                    title="Edit"
                                  >
                                    <Edit size={15} />
                                  </button>
                                  <button
                                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-rose-600 transition-colors"
                                    title="Hapus"
                                    onClick={() => {
                                      if (confirm(`Hapus langganan ${item.id}?`)) {
                                        console.log("Hapus:", item.id);
                                      }
                                    }}
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* PAGINATION */}
              <div className="px-4 py-3 border-t border-slate-200/80 flex flex-col xs:flex-row items-center justify-between gap-2">
                <p className="text-xs text-slate-500 text-center xs:text-left">
                  <span className="hidden xs:inline">Menampilkan </span>
                  <span className="font-medium text-slate-700">{paginatedData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span>
                  <span className="hidden xs:inline"> sampai </span>
                  <span className="font-medium text-slate-700">{Math.min(currentPage * itemsPerPage, sortedData.length)}</span>
                  <span className="hidden xs:inline"> dari </span>
                  <span className="font-medium text-slate-700">{sortedData.length}</span>
                  <span className="hidden xs:inline"> data</span>
                </p>
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="hidden xs:inline">Previous</span>
                    <span className="xs:hidden">‹</span>
                  </button>
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                          currentPage === page
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  {totalPages > 5 && (
                    <>
                      <span className="text-slate-400 px-0.5">…</span>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                          currentPage === totalPages
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="hidden xs:inline">Next</span>
                    <span className="xs:hidden">›</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-slate-400/80 py-2 border-t border-slate-200/40">
              © 2026 SmartSchool • Data langganan terakhir diperbarui hari ini
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ===== KOMPONEN STAT CARD =====
function StatCard({ label, value, icon: Icon, color }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
    orange: "bg-orange-50 text-orange-600",
    violet: "bg-violet-50 text-violet-600",
  };
  const iconBg = colorMap[color] || colorMap.blue;
  return (
    <div className="bg-white rounded-lg border border-slate-200/80 p-3.5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${iconBg} flex-shrink-0`}>
          <Icon size={16} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider truncate">{label}</p>
          <p className="text-lg font-semibold text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  );
}