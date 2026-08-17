"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
    School,
    Building2,
    Users,
    GraduationCap,
    Package,
    Plus,
    Search,
    Eye,
    Edit,
    Trash2,
    FileSpreadsheet,
    CheckCircle,
    XCircle,
    Clock as ClockIcon,
    Sparkles,
    ArrowUp,
    ArrowDown,
} from "lucide-react";

// Data contoh (bisa dipindah ke file lib/data)
const sekolahData = [
    {
        id: 1,
        logo: "🏫",
        nama: "SMA Negeri 1 Jakarta",
        npsn: "2020212",
        jenjang: "SMA",
        statusSekolah: "Negeri",
        yayasan: "-",
        paket: "Professional",
        status: "Aktif",
        bergabung: "2024-01-15",
        email: "sman1jakarta@sch.id",
        telepon: "(021) 1234567",
        website: "www.sman1jakarta.sch.id",
        alamat: "Jl. Merdeka No. 1, Jakarta Pusat",
        provinsi: "DKI Jakarta",
        kota: "Jakarta Pusat",
        kecamatan: "Gambir",
        kelurahan: "Gambir",
        kodePos: "10110",
        tanggalMulai: "2024-01-15",
        tanggalBerakhir: "2025-01-15",
        totalGuru: 45,
        totalSiswa: 720,
        totalKelas: 24,
        totalMapel: 12,
        totalAdmin: 3,
    },
    {
        id: 2,
        logo: "🏫",
        nama: "SMP Negeri 2 Bandung",
        npsn: "2020345",
        jenjang: "SMP",
        statusSekolah: "Negeri",
        yayasan: "-",
        paket: "Starter",
        status: "Aktif",
        bergabung: "2024-02-10",
        email: "smpn2bandung@sch.id",
        telepon: "(022) 9876543",
        website: "www.smpn2bandung.sch.id",
        alamat: "Jl. Asia Afrika No. 45, Bandung",
        provinsi: "Jawa Barat",
        kota: "Bandung",
        kecamatan: "Sumur Bandung",
        kelurahan: "Citarum",
        kodePos: "40112",
        tanggalMulai: "2024-02-10",
        tanggalBerakhir: "2025-02-10",
        totalGuru: 30,
        totalSiswa: 540,
        totalKelas: 18,
        totalMapel: 10,
        totalAdmin: 2,
    },
    {
        id: 3,
        logo: "🏫",
        nama: "SD Islam Al-Ikhlas",
        npsn: "2030456",
        jenjang: "SD",
        statusSekolah: "Swasta",
        yayasan: "Yayasan Al-Ikhlas",
        paket: "Enterprise",
        status: "Aktif",
        bergabung: "2024-03-01",
        email: "sd.ikhlas@sch.id",
        telepon: "(021) 5551234",
        website: "www.sdikhlas.sch.id",
        alamat: "Jl. Kebon Kacang No. 12, Jakarta Selatan",
        provinsi: "DKI Jakarta",
        kota: "Jakarta Selatan",
        kecamatan: "Setiabudi",
        kelurahan: "Karet",
        kodePos: "12930",
        tanggalMulai: "2024-03-01",
        tanggalBerakhir: "2025-03-01",
        totalGuru: 25,
        totalSiswa: 390,
        totalKelas: 12,
        totalMapel: 8,
        totalAdmin: 2,
    },
    {
        id: 4,
        logo: "🏫",
        nama: "SMK Pariwisata 1",
        npsn: "2040789",
        jenjang: "SMK",
        statusSekolah: "Swasta",
        yayasan: "Yayasan Pariwisata",
        paket: "Professional",
        status: "Trial",
        bergabung: "2024-04-15",
        email: "smkpar1@sch.id",
        telepon: "(0361) 234567",
        website: "www.smkpar1.sch.id",
        alamat: "Jl. Legian No. 88, Denpasar",
        provinsi: "Bali",
        kota: "Denpasar",
        kecamatan: "Kuta",
        kelurahan: "Legian",
        kodePos: "80361",
        tanggalMulai: "2024-04-15",
        tanggalBerakhir: "2024-10-15",
        totalGuru: 35,
        totalSiswa: 480,
        totalKelas: 16,
        totalMapel: 14,
        totalAdmin: 3,
    },
    {
        id: 5,
        logo: "🏫",
        nama: "SMA Negeri 3 Surabaya",
        npsn: "2050101",
        jenjang: "SMA",
        statusSekolah: "Negeri",
        yayasan: "-",
        paket: "Starter",
        status: "Nonaktif",
        bergabung: "2023-05-20",
        email: "sman3sby@sch.id",
        telepon: "(031) 345678",
        website: "www.sman3surabaya.sch.id",
        alamat: "Jl. Raya Darmo No. 56, Surabaya",
        provinsi: "Jawa Timur",
        kota: "Surabaya",
        kecamatan: "Darmo",
        kelurahan: "Darmo",
        kodePos: "60226",
        tanggalMulai: "2023-05-20",
        tanggalBerakhir: "2024-05-20",
        totalGuru: 50,
        totalSiswa: 800,
        totalKelas: 27,
        totalMapel: 12,
        totalAdmin: 4,
    },
];

const stats = {
    total: 125,
    aktif: 120,
    nonaktif: 5,
    trial: 18,
    totalGuru: 240,
    totalSiswa: 3620,
};

const provinsiOptions = ["Semua", "DKI Jakarta", "Banten", "Jawa Barat", "Jawa Timur"];
const kotaOptions = ["Semua", "Jakarta Pusat", "Jakarta Utara", "Jakarta Barat", "Tangerang Selatan", "Tangerang", "Depok", "Bandung", "Denpasar"];
const jenjangOptions = ["Semua", "SD", "SMP", "SMA", "SMK"];
const statusOptions = ["Semua", "Aktif", "Nonaktif", "Trial"];

const statusColorMap = {
    Aktif: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
    Trial: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
    Nonaktif: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", dot: "bg-rose-500" },
};

const paketColorMap = {
    Enterprise: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
    Professional: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
    Starter: { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" },
};

export default function DataSekolahPage() {
    const router = useRouter();
    const [activeMenu, setActiveMenu] = useState("sekolah");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProvinsi, setSelectedProvinsi] = useState("Semua");
    const [selectedKota, setSelectedKota] = useState("Semua");
    const [selectedJenjang, setSelectedJenjang] = useState("Semua");
    const [selectedStatus, setSelectedStatus] = useState("Semua");
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [sortField, setSortField] = useState("nama");
    const [sortOrder, setSortOrder] = useState("asc");
    const itemsPerPage = 5;

    const notifications = [
        { id: 1, title: "Pembaruan Sistem v2.0", desc: "Dikirim 2 jam lalu", read: false },
        { id: 2, title: "Pengingat: Backup Data", desc: "Dikirim 1 hari lalu", read: false },
        { id: 3, title: "Sekolah baru mendaftar", desc: "Dikirim 3 hari lalu", read: true },
    ];

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Filtering
    const filteredData = sekolahData.filter((item) => {
        const matchSearch =
            item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.npsn.includes(searchQuery) ||
            item.yayasan.toLowerCase().includes(searchQuery.toLowerCase());
        const matchProvinsi = selectedProvinsi === "Semua" || item.provinsi === selectedProvinsi;
        const matchKota = selectedKota === "Semua" || item.kota === selectedKota;
        const matchJenjang = selectedJenjang === "Semua" || item.jenjang === selectedJenjang;
        const matchStatus = selectedStatus === "Semua" || item.status === selectedStatus;
        return matchSearch && matchProvinsi && matchKota && matchJenjang && matchStatus;
    });

    // Sorting
    const sortedData = [...filteredData].sort((a, b) => {
        let valA = a[sortField]?.toString().toLowerCase() || "";
        let valB = b[sortField]?.toString().toLowerCase() || "";
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

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

    const handleDelete = (school) => {
        if (confirm(`Apakah Anda yakin ingin menghapus ${school.nama}?`)) {
            console.log("Hapus:", school.id);
        }
    };

    const resetFilters = () => {
        setSearchQuery("");
        setSelectedProvinsi("Semua");
        setSelectedKota("Semua");
        setSelectedJenjang("Semua");
        setSelectedStatus("Semua");
    };

    return (
        // Pola wrapper disamakan persis dengan halaman Profil/Pengumuman/Dashboard/Manajemen Akses/Yayasan:
        // min-h-screen (bukan h-screen + overflow-hidden) di wrapper luar,
        // dan main tanpa overflow-y-auto (p-4 sm:p-6 lg:p-8) supaya sidebar mengikuti
        // tinggi konten halaman dan konsisten saat responsive/zoom.
        <div className="flex min-h-screen bg-slate-50">
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
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="w-full space-y-5 sm:space-y-6">

                        {/* HEADER */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div>
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2 rounded-lg bg-blue-600 text-white shadow-sm">
                                        <School size={18} />
                                    </div>
                                    <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">
                                        Data Sekolah
                                    </h1>
                                    <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                                        Master
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 ml-[52px] flex items-center gap-1.5">
                                    <Sparkles size={14} className="text-slate-400" />
                                    Kelola seluruh sekolah yang terdaftar pada SmartSchool.
                                </p>
                            </div>
                            <div className="flex items-center gap-2.5 ml-[52px] sm:ml-0">
                                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                                    <FileSpreadsheet size={16} className="text-slate-400" />
                                    <span className="hidden xs:inline">Export</span>
                                </button>
                                <button
                                    onClick={() => router.push("/super-admin/sekolah/tambah")}
                                    className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
                                >
                                    <Plus size={16} />
                                    <span className="hidden xs:inline">Tambah Sekolah</span>
                                    <span className="xs:hidden">Tambah</span>
                                </button>
                            </div>
                        </div>

                        {/* STATISTIK */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                            <StatCard label="Total Sekolah" value={stats.total} icon={School} color="blue" />
                            <StatCard label="Aktif" value={stats.aktif} icon={CheckCircle} color="emerald" />
                            <StatCard label="Trial" value={stats.trial} icon={ClockIcon} color="amber" />
                            <StatCard label="Nonaktif" value={stats.nonaktif} icon={XCircle} color="rose" />
                            <StatCard label="Total Guru" value={stats.totalGuru} icon={Users} color="violet" />
                            <StatCard label="Total Siswa" value={stats.totalSiswa} icon={GraduationCap} color="teal" />
                        </div>

                        {/* FILTER & SEARCH */}
                        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                            <div className="flex flex-col gap-3">
                                <div className="relative w-full">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari nama sekolah, NPSN, atau yayasan..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-slate-400"
                                    />
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <select
                                        value={selectedProvinsi}
                                        onChange={(e) => setSelectedProvinsi(e.target.value)}
                                        className="px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-600 min-w-[100px]"
                                    >
                                        {provinsiOptions.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={selectedKota}
                                        onChange={(e) => setSelectedKota(e.target.value)}
                                        className="px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-600 min-w-[100px]"
                                    >
                                        {kotaOptions.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={selectedJenjang}
                                        onChange={(e) => setSelectedJenjang(e.target.value)}
                                        className="px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-600 min-w-[80px]"
                                    >
                                        {jenjangOptions.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-slate-600 min-w-[80px]"
                                    >
                                        {statusOptions.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
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

                        {/* TABLE */}
                        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                            {isMobile && paginatedData.length > 0 ? (
                                <div className="divide-y divide-slate-100 p-3">
                                    {paginatedData.map((item, index) => {
                                        const statusStyle = statusColorMap[item.status] || statusColorMap.Aktif;
                                        const paketStyle = paketColorMap[item.paket] || paketColorMap.Starter;
                                        const rowNumber = startIndex + index + 1;
                                        return (
                                            <div key={item.id} className="py-3 space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs font-medium text-slate-400 w-6 text-right">
                                                        {rowNumber}
                                                    </span>
                                                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg shadow-sm flex-shrink-0">
                                                        {item.logo}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-slate-800 text-sm truncate">{item.nama}</p>
                                                        <p className="text-xs text-slate-500 font-mono">{item.npsn}</p>
                                                    </div>
                                                    <div className="flex items-center gap-0.5">
                                                        <button
                                                            onClick={() => router.push(`/super-admin/sekolah/${item.id}`)}
                                                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors"
                                                        >
                                                            <Eye size={15} />
                                                        </button>
                                                        <button
                                                            onClick={() => router.push(`/super-admin/sekolah/edit/${item.id}`)}
                                                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-amber-600 transition-colors"
                                                        >
                                                            <Edit size={15} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-1.5 ml-9">
                                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                                        {item.jenjang}
                                                    </span>
                                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${paketStyle.bg} ${paketStyle.text} ${paketStyle.border}`}>
                                                        {item.paket}
                                                    </span>
                                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                                                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${statusStyle.dot} mr-1`} />
                                                        {item.status}
                                                    </span>
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
                                                <th className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">No</th>
                                                <th className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Logo</th>
                                                <th
                                                    onClick={() => handleSort("nama")}
                                                    className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 select-none"
                                                >
                                                    <span className="flex items-center">
                                                        Nama Sekolah
                                                        {renderSortIcon("nama")}
                                                    </span>
                                                </th>
                                                <th
                                                    onClick={() => handleSort("npsn")}
                                                    className="hidden md:table-cell px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 select-none"
                                                >
                                                    <span className="flex items-center">
                                                        NPSN
                                                        {renderSortIcon("npsn")}
                                                    </span>
                                                </th>
                                                <th className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Jenjang</th>
                                                <th className="hidden lg:table-cell px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Yayasan</th>
                                                <th className="hidden sm:table-cell px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Paket</th>
                                                <th className="px-4 py-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                                <th className="px-4 py-3 text-right text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {paginatedData.length === 0 ? (
                                                <tr>
                                                    <td colSpan={9} className="px-4 py-12 text-center text-slate-500">
                                                        <div className="flex flex-col items-center gap-2">
                                                            <Search size={32} className="text-slate-300" />
                                                            <p className="text-sm font-medium">Tidak ada data yang ditemukan</p>
                                                            <p className="text-xs text-slate-400">Coba ubah filter atau kata kunci pencarian</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                paginatedData.map((item, index) => {
                                                    const statusStyle = statusColorMap[item.status] || statusColorMap.Aktif;
                                                    const paketStyle = paketColorMap[item.paket] || paketColorMap.Starter;
                                                    const rowNumber = startIndex + index + 1;
                                                    return (
                                                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                                                            <td className="px-4 py-3 text-sm text-slate-500 text-center">
                                                                {rowNumber}
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-base shadow-sm">
                                                                    {item.logo}
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3 font-medium text-slate-800 text-sm truncate max-w-[120px] sm:max-w-none">
                                                                {item.nama}
                                                            </td>
                                                            <td className="hidden md:table-cell px-4 py-3 text-slate-500 font-mono text-xs">
                                                                {item.npsn}
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                                                    {item.jenjang}
                                                                </span>
                                                            </td>
                                                            <td className="hidden lg:table-cell px-4 py-3 text-slate-500 text-sm truncate max-w-[120px]">
                                                                {item.yayasan}
                                                            </td>
                                                            <td className="hidden sm:table-cell px-4 py-3">
                                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${paketStyle.bg} ${paketStyle.text} ${paketStyle.border}`}>
                                                                    {item.paket}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                                                                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${statusStyle.dot} mr-1`} />
                                                                    {item.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3 text-right">
                                                                <div className="flex items-center justify-end gap-0.5">
                                                                    <button
                                                                        onClick={() => router.push(`/super-admin/sekolah/${item.id}`)}
                                                                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors"
                                                                        title="Detail"
                                                                    >
                                                                        <Eye size={15} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => router.push(`/super-admin/sekolah/edit/${item.id}`)}
                                                                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-amber-600 transition-colors"
                                                                        title="Edit"
                                                                    >
                                                                        <Edit size={15} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDelete(item)}
                                                                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-rose-600 transition-colors"
                                                                        title="Hapus"
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
                                    <span className="font-medium text-slate-700">{paginatedData.length === 0 ? 0 : startIndex + 1}</span>
                                    <span className="hidden xs:inline"> sampai </span>
                                    <span className="font-medium text-slate-700">{Math.min(startIndex + paginatedData.length, sortedData.length)}</span>
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

                        {/* FOOTER */}
                        <div className="text-center text-xs text-slate-400/80 py-2 border-t border-slate-200/40">
                            © 2026 SmartSchool • Data Sekolah terakhir diperbarui hari ini
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

// ===== KOMPONEN STAT CARD =====
function StatCard({ label, value, icon: Icon, color }) {
    const colorClasses = {
        blue: "bg-blue-50 text-blue-600",
        emerald: "bg-emerald-50 text-emerald-600",
        amber: "bg-amber-50 text-amber-600",
        rose: "bg-rose-50 text-rose-600",
        violet: "bg-violet-50 text-violet-600",
        teal: "bg-teal-50 text-teal-600",
    };

    const iconBg = colorClasses[color] || colorClasses.blue;

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