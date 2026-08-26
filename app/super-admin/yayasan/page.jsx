"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { yayasanData } from "../../../lib/data";

import {
    Landmark,
    CheckCircle2,
    XCircle,
    Plus,
    Search,
    Eye,
    Pencil,
    Trash2,
    FileSpreadsheet,
    ArrowUp,
    ArrowDown,
    School,
    TrendingUp,
    Clock3,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Users,
    Building2,
    SlidersHorizontal,
    RotateCcw,
    ArrowUpRight,
    MoreHorizontal,
} from "lucide-react";

// =========================================================
// DATA STATISTIK
// =========================================================

const stats = {
    total: 42,
    aktif: 36,
    nonaktif: 4,
    trial: 2,
    totalSekolah: 187,
    pertumbuhan: 12.5,
};

// =========================================================
// FILTER OPTIONS
// =========================================================

const provinsiOptions = [
    "Semua",
    "DKI Jakarta",
    "Banten",
    "Jawa Barat",
    "Jawa Timur",
];

const kotaOptions = [
    "Semua",
    "Jakarta Pusat",
    "Jakarta Utara",
    "Jakarta Barat",
    "Tangerang Selatan",
    "Tangerang",
    "Depok",
];

const statusOptions = [
    "Semua",
    "Aktif",
    "Nonaktif",
    "Trial",
];

// =========================================================
// STATUS STYLE
// =========================================================

const statusColorMap = {
    Aktif: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        dot: "bg-emerald-500",
    },

    Trial: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        dot: "bg-amber-500",
    },

    Nonaktif: {
        bg: "bg-rose-50",
        text: "text-rose-700",
        border: "border-rose-200",
        dot: "bg-rose-500",
    },
};

// =========================================================
// MAIN COMPONENT
// =========================================================

export default function DataYayasanPage() {
    const router = useRouter();

    const [activeMenu, setActiveMenu] = useState("yayasan");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProvinsi, setSelectedProvinsi] = useState("Semua");
    const [selectedKota, setSelectedKota] = useState("Semua");
    const [selectedStatus, setSelectedStatus] = useState("Semua");

    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    const [sortField, setSortField] = useState("nama");
    const [sortOrder, setSortOrder] = useState("asc");

    const itemsPerPage = 5;

    // =====================================================
    // RESPONSIVE
    // =====================================================

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();

        window.addEventListener("resize", checkMobile);

        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    // =====================================================
    // RESET PAGE SAAT FILTER BERUBAH
    // =====================================================

    useEffect(() => {
        setCurrentPage(1);
    }, [
        searchQuery,
        selectedProvinsi,
        selectedKota,
        selectedStatus,
    ]);

    // =====================================================
    // NOTIFICATIONS
    // =====================================================

    const notifications = [
        {
            id: 1,
            title: "Pembaruan Sistem v2.0",
            desc: "Dikirim 2 jam lalu",
            read: false,
        },
        {
            id: 2,
            title: "Pengingat: Backup Data",
            desc: "Dikirim 1 hari lalu",
            read: false,
        },
        {
            id: 3,
            title: "Yayasan baru mendaftar",
            desc: "Dikirim 3 hari lalu",
            read: true,
        },
    ];

    // =====================================================
    // FILTER DATA
    // =====================================================

    const filteredData = yayasanData.filter((item) => {
        const search = searchQuery.toLowerCase();

        const matchSearch =
            item.nama?.toLowerCase().includes(search) ||
            item.npyp?.toLowerCase().includes(search) ||
            item.ketua?.toLowerCase().includes(search);

        const matchProvinsi =
            selectedProvinsi === "Semua" ||
            item.provinsi === selectedProvinsi;

        const matchKota =
            selectedKota === "Semua" ||
            item.kota === selectedKota;

        const matchStatus =
            selectedStatus === "Semua" ||
            item.status === selectedStatus;

        return (
            matchSearch &&
            matchProvinsi &&
            matchKota &&
            matchStatus
        );
    });

    // =====================================================
    // SORTING
    // =====================================================

    const sortedData = [...filteredData].sort((a, b) => {
        const valA = a[sortField]?.toString().toLowerCase() || "";
        const valB = b[sortField]?.toString().toLowerCase() || "";

        if (valA < valB) {
            return sortOrder === "asc" ? -1 : 1;
        }

        if (valA > valB) {
            return sortOrder === "asc" ? 1 : -1;
        }

        return 0;
    });

    // =====================================================
    // PAGINATION
    // =====================================================

    const totalPages = Math.ceil(
        sortedData.length / itemsPerPage
    );

    const safeCurrentPage =
        totalPages > 0
            ? Math.min(currentPage, totalPages)
            : 1;

    const startIndex =
        (safeCurrentPage - 1) * itemsPerPage;

    const paginatedData = sortedData.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    // =====================================================
    // SORT HANDLER
    // =====================================================

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(
                sortOrder === "asc" ? "desc" : "asc"
            );
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    // =====================================================
    // SORT ICON
    // =====================================================

    const renderSortIcon = (field) => {
        if (sortField !== field) {
            return (
                <ArrowUp
                    size={12}
                    className="ml-1.5 text-slate-300"
                />
            );
        }

        return sortOrder === "asc" ? (
            <ArrowUp
                size={12}
                className="ml-1.5 text-blue-600"
            />
        ) : (
            <ArrowDown
                size={12}
                className="ml-1.5 text-blue-600"
            />
        );
    };

    // =====================================================
    // ACTION HANDLERS
    // =====================================================

    const handleViewDetail = (id) => {
        router.push(`/super-admin/yayasan/${id}`);
    };

    const handleEdit = (id) => {
        router.push(`/super-admin/yayasan/edit/${id}`);
    };

    const handleDelete = (yayasan) => {
        const confirmed = window.confirm(
            `Apakah Anda yakin ingin menghapus ${yayasan.nama}?`
        );

        if (confirmed) {
            console.log("Hapus:", yayasan.id);
        }
    };

    // =====================================================
    // RESET FILTER
    // =====================================================

    const resetFilters = () => {
        setSearchQuery("");
        setSelectedProvinsi("Semua");
        setSelectedKota("Semua");
        setSelectedStatus("Semua");
        setCurrentPage(1);
    };

    // =====================================================
    // ACTIVE FILTER COUNT
    // =====================================================

    const activeFilterCount = [
        selectedProvinsi !== "Semua",
        selectedKota !== "Semua",
        selectedStatus !== "Semua",
    ].filter(Boolean).length;

    // =====================================================
    // RENDER
    // =====================================================

    return (
        <div className="flex min-h-screen bg-[#f8fafc]">

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <Sidebar
                active={activeMenu}
                setActive={setActiveMenu}
                collapsed={!sidebarOpen}
                setCollapsed={() =>
                    setSidebarOpen(!sidebarOpen)
                }
            />

            {/* =================================================
                MAIN WRAPPER
            ================================================= */}

            <div className="flex-1 flex flex-col min-w-0">

                {/* HEADER */}

                <Header
                    toggleSidebar={() =>
                        setSidebarOpen(!sidebarOpen)
                    }
                    notifications={notifications}
                    user={{
                        name: "Sarah",
                        email: "sarah@smartschool.com",
                        avatar: "SA",
                    }}
                />

                {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                <main className="flex-1 p-4 sm:p-6 lg:p-8">

                    <div className="w-full max-w-[1800px] mx-auto space-y-6">

                        {/* =================================================
                            PAGE HEADER
                        ================================================= */}

                        <section className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-sm">

                            {/* Decorative background */}

                            <div className="absolute right-0 top-0 w-72 h-72 bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />

                            <div className="absolute right-24 bottom-0 w-40 h-40 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative p-5 sm:p-6 lg:p-7">

                                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

                                    <div className="min-w-0">

                                        <div className="flex items-center gap-3">

                                            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20 flex-shrink-0">
                                                <Landmark size={22} strokeWidth={1.8} />
                                            </div>

                                            <div className="min-w-0">

                                                <div className="flex items-center gap-2 flex-wrap">

                                                    <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
                                                        Data Yayasan
                                                    </h1>

                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] sm:text-xs font-semibold">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                        Master Data
                                                    </span>

                                                </div>

                                                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                                                    Kelola seluruh yayasan yang menaungi sekolah dalam ekosistem SmartSchool.
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                    {/* ACTION BUTTON */}

                                    <div className="flex items-center gap-2">

                                        <button
                                            type="button"
                                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                                        >
                                            <FileSpreadsheet
                                                size={16}
                                                strokeWidth={1.8}
                                            />

                                            <span className="hidden sm:inline">
                                                Export
                                            </span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                router.push(
                                                    "/super-admin/yayasan/tambah"
                                                )
                                            }
                                            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                                        >
                                            <Plus
                                                size={17}
                                                strokeWidth={2}
                                            />

                                            <span>
                                                Tambah Yayasan
                                            </span>
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </section>

                        {/* =================================================
                            STATISTICS
                        ================================================= */}

                        <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">

                            <StatCard
                                label="Total Yayasan"
                                value={stats.total}
                                icon={Landmark}
                                color="blue"
                            />

                            <StatCard
                                label="Yayasan Aktif"
                                value={stats.aktif}
                                icon={CheckCircle2}
                                color="emerald"
                            />

                            <StatCard
                                label="Masa Trial"
                                value={stats.trial}
                                icon={Clock3}
                                color="amber"
                            />

                            <StatCard
                                label="Nonaktif"
                                value={stats.nonaktif}
                                icon={XCircle}
                                color="rose"
                            />

                            <StatCard
                                label="Total Sekolah"
                                value={stats.totalSekolah}
                                icon={School}
                                color="violet"
                            />

                            <StatCard
                                label="Pertumbuhan"
                                value={`+${stats.pertumbuhan}%`}
                                icon={TrendingUp}
                                color="teal"
                            />

                        </section>

                        {/* =================================================
                            FILTER SECTION
                        ================================================= */}

                        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">

                            {/* FILTER HEADER */}

                            <div className="px-4 sm:px-5 py-4 border-b border-slate-100">

                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

                                    <div className="flex items-center gap-2">

                                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                                            <SlidersHorizontal size={16} />
                                        </div>

                                        <div>
                                            <h2 className="text-sm font-semibold text-slate-800">
                                                Filter Data
                                            </h2>

                                            <p className="text-[11px] text-slate-400">
                                                Gunakan filter untuk menemukan yayasan dengan cepat
                                            </p>
                                        </div>

                                    </div>

                                    {activeFilterCount > 0 && (
                                        <span className="inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-medium">
                                            {activeFilterCount} filter aktif
                                        </span>
                                    )}

                                </div>

                            </div>

                            {/* FILTER BODY */}

                            <div className="p-4 sm:p-5">

                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[minmax(260px,1.8fr)_1fr_1fr_1fr_auto] gap-3">

                                    {/* SEARCH */}

                                    <div className="relative">

                                        <Search
                                            size={17}
                                            strokeWidth={1.8}
                                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                        />

                                        <input
                                            type="text"
                                            placeholder="Cari nama yayasan, kode NPYP, atau ketua..."
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(
                                                    e.target.value
                                                )
                                            }
                                            className="w-full h-10 pl-10 pr-3 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                                        />

                                    </div>

                                    {/* PROVINSI */}

                                    <FilterSelect
                                        value={selectedProvinsi}
                                        onChange={setSelectedProvinsi}
                                        options={provinsiOptions}
                                        icon={MapPin}
                                        label="Provinsi"
                                    />

                                    {/* KOTA */}

                                    <FilterSelect
                                        value={selectedKota}
                                        onChange={setSelectedKota}
                                        options={kotaOptions}
                                        icon={Building2}
                                        label="Kota"
                                    />

                                    {/* STATUS */}

                                    <FilterSelect
                                        value={selectedStatus}
                                        onChange={setSelectedStatus}
                                        options={statusOptions}
                                        icon={CheckCircle2}
                                        label="Status"
                                    />

                                    {/* RESET */}

                                    <button
                                        type="button"
                                        onClick={resetFilters}
                                        className="h-10 px-4 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 text-slate-500 text-sm font-medium hover:bg-slate-50 hover:text-slate-700 transition-all"
                                    >
                                        <RotateCcw size={15} />

                                        <span>
                                            Reset
                                        </span>
                                    </button>

                                </div>

                                {/* RESULT COUNT */}

                                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                                    <p className="text-xs text-slate-400">
                                        Menampilkan{" "}
                                        <span className="font-semibold text-slate-600">
                                            {paginatedData.length}
                                        </span>{" "}
                                        dari{" "}
                                        <span className="font-semibold text-slate-600">
                                            {sortedData.length}
                                        </span>{" "}
                                        yayasan
                                    </p>

                                    <p className="text-xs text-slate-400">
                                        Halaman{" "}
                                        <span className="font-semibold text-slate-600">
                                            {safeCurrentPage}
                                        </span>{" "}
                                        dari{" "}
                                        <span className="font-semibold text-slate-600">
                                            {totalPages || 1}
                                        </span>
                                    </p>

                                </div>

                            </div>

                        </section>

                        {/* =================================================
                            DATA TABLE
                        ================================================= */}

                        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">

                            {/* TABLE HEADER */}

                            <div className="px-4 sm:px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                                <div className="flex items-center gap-3">

                                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                        <Landmark
                                            size={17}
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    <div>

                                        <h2 className="text-sm font-semibold text-slate-800">
                                            Daftar Yayasan
                                        </h2>

                                        <p className="text-[11px] text-slate-400">
                                            Data master yayasan SmartSchool
                                        </p>

                                    </div>

                                </div>

                                <div className="inline-flex items-center gap-2 text-xs text-slate-400">

                                    <Users size={14} />

                                    <span>
                                        {sortedData.length} data
                                    </span>

                                </div>

                            </div>

                            {/* =================================================
                                MOBILE
                            ================================================= */}

                            {isMobile ? (

                                <div className="divide-y divide-slate-100">

                                    {paginatedData.length === 0 ? (

                                        <EmptyState />

                                    ) : (

                                        paginatedData.map(
                                            (item, index) => {

                                                const statusStyle =
                                                    statusColorMap[
                                                        item.status
                                                    ] ||
                                                    statusColorMap.Aktif;

                                                const rowNumber =
                                                    startIndex +
                                                    index +
                                                    1;

                                                return (
                                                    <div
                                                        key={item.id}
                                                        className="p-4 hover:bg-slate-50/50 transition-colors"
                                                    >

                                                        <div className="flex items-start gap-3">

                                                            {/* NUMBER */}

                                                            <div className="w-6 pt-2 text-xs font-medium text-slate-400 text-center">
                                                                {rowNumber}
                                                            </div>

                                                            {/* ICON */}

                                                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                                                <Landmark
                                                                    size={20}
                                                                    strokeWidth={1.7}
                                                                />
                                                            </div>

                                                            {/* CONTENT */}

                                                            <div className="flex-1 min-w-0">

                                                                <div className="flex items-start justify-between gap-2">

                                                                    <div className="min-w-0">

                                                                        <p className="text-sm font-semibold text-slate-800 truncate">
                                                                            {item.nama}
                                                                        </p>

                                                                        <p className="mt-0.5 text-[11px] text-slate-400 font-mono">
                                                                            {item.npyp}
                                                                        </p>

                                                                    </div>

                                                                    <StatusBadge
                                                                        status={
                                                                            item.status
                                                                        }
                                                                    />

                                                                </div>

                                                                <div className="mt-3 flex flex-wrap gap-2">

                                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-medium">
                                                                        <School size={12} />
                                                                        {item.jumlahSekolah} Sekolah
                                                                    </span>

                                                                    {item.kota && (
                                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-500 border border-slate-100 text-[10px] font-medium">
                                                                            <MapPin size={12} />
                                                                            {item.kota}
                                                                        </span>
                                                                    )}

                                                                </div>

                                                            </div>

                                                        </div>

                                                        {/* MOBILE ACTION */}

                                                        <div className="mt-3 ml-9 flex items-center gap-2">

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleViewDetail(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="flex-1 h-9 inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium hover:bg-blue-100 transition-colors"
                                                            >
                                                                <Eye size={14} />
                                                                Detail
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="h-9 px-3 inline-flex items-center justify-center rounded-lg bg-slate-50 text-slate-500 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                                                            >
                                                                <Pencil size={14} />
                                                            </button>

                                                        </div>

                                                    </div>
                                                );
                                            }
                                        )

                                    )}

                                </div>

                            ) : (

                                /* =================================================
                                    DESKTOP TABLE
                                ================================================= */

                                <div className="overflow-x-auto">

                                    <table className="w-full min-w-[900px] text-sm">

                                        <thead>

                                            <tr className="bg-slate-50/70 border-b border-slate-200">

                                                <TableHeader>
                                                    No
                                                </TableHeader>

                                                <TableHeader>
                                                    Yayasan
                                                </TableHeader>

                                                <TableHeader
                                                    sortable
                                                    onClick={() =>
                                                        handleSort("npyp")
                                                    }
                                                >
                                                    <span className="inline-flex items-center">
                                                        Kode Yayasan
                                                        {renderSortIcon("npyp")}
                                                    </span>
                                                </TableHeader>

                                                <TableHeader>
                                                    Ketua Yayasan
                                                </TableHeader>

                                                <TableHeader>
                                                    Sekolah
                                                </TableHeader>

                                                <TableHeader>
                                                    Status
                                                </TableHeader>

                                                <TableHeader align="right">
                                                    Aksi
                                                </TableHeader>

                                            </tr>

                                        </thead>

                                        <tbody className="divide-y divide-slate-100">

                                            {paginatedData.length === 0 ? (

                                                <tr>

                                                    <td colSpan={7}>

                                                        <EmptyState />

                                                    </td>

                                                </tr>

                                            ) : (

                                                paginatedData.map(
                                                    (item, index) => {

                                                        const rowNumber =
                                                            startIndex +
                                                            index +
                                                            1;

                                                        return (
                                                            <tr
                                                                key={item.id}
                                                                className="group hover:bg-slate-50/70 transition-colors"
                                                            >

                                                                {/* NO */}

                                                                <td className="px-5 py-4 text-xs text-slate-400 w-14">
                                                                    {rowNumber
                                                                        .toString()
                                                                        .padStart(
                                                                            2,
                                                                            "0"
                                                                        )}
                                                                </td>

                                                                {/* YAYASAN */}

                                                                <td className="px-5 py-4">

                                                                    <div className="flex items-center gap-3 min-w-[230px]">

                                                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                                                            <Landmark
                                                                                size={19}
                                                                                strokeWidth={1.7}
                                                                            />
                                                                        </div>

                                                                        <div className="min-w-0">

                                                                            <p className="font-semibold text-slate-800 truncate max-w-[250px]">
                                                                                {item.nama}
                                                                            </p>

                                                                            <p className="mt-0.5 text-[11px] text-slate-400">
                                                                                {item.provinsi ||
                                                                                    "Indonesia"}
                                                                            </p>

                                                                        </div>

                                                                    </div>

                                                                </td>

                                                                {/* NPYP */}

                                                                <td className="px-5 py-4">

                                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-xs font-mono text-slate-500">
                                                                        {item.npyp}
                                                                    </span>

                                                                </td>

                                                                {/* KETUA */}

                                                                <td className="px-5 py-4">

                                                                    <div className="flex items-center gap-2.5">

                                                                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
                                                                            <Users
                                                                                size={14}
                                                                            />
                                                                        </div>

                                                                        <div className="min-w-0">

                                                                            <p className="text-sm text-slate-700 truncate max-w-[160px]">
                                                                                {item.ketua}
                                                                            </p>

                                                                            {item.kota && (
                                                                                <p className="text-[10px] text-slate-400 mt-0.5">
                                                                                    {item.kota}
                                                                                </p>
                                                                            )}

                                                                        </div>

                                                                    </div>

                                                                </td>

                                                                {/* SEKOLAH */}

                                                                <td className="px-5 py-4">

                                                                    <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-blue-50/70 border border-blue-100 text-blue-600">

                                                                        <School
                                                                            size={13}
                                                                        />

                                                                        <span className="text-xs font-semibold">
                                                                            {item.jumlahSekolah}
                                                                        </span>

                                                                        <span className="text-[10px] text-blue-500">
                                                                            unit
                                                                        </span>

                                                                    </div>

                                                                </td>

                                                                {/* STATUS */}

                                                                <td className="px-5 py-4">

                                                                    <StatusBadge
                                                                        status={
                                                                            item.status
                                                                        }
                                                                    />

                                                                </td>

                                                                {/* ACTION */}

                                                                <td className="px-5 py-4">

                                                                    <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">

                                                                        <ActionButton
                                                                            icon={Eye}
                                                                            title="Lihat detail"
                                                                            color="blue"
                                                                            onClick={() =>
                                                                                handleViewDetail(
                                                                                    item.id
                                                                                )
                                                                            }
                                                                        />

                                                                        <ActionButton
                                                                            icon={Pencil}
                                                                            title="Edit yayasan"
                                                                            color="amber"
                                                                            onClick={() =>
                                                                                handleEdit(
                                                                                    item.id
                                                                                )
                                                                            }
                                                                        />

                                                                        <ActionButton
                                                                            icon={Trash2}
                                                                            title="Hapus yayasan"
                                                                            color="rose"
                                                                            onClick={() =>
                                                                                handleDelete(
                                                                                    item
                                                                                )
                                                                            }
                                                                        />

                                                                    </div>

                                                                </td>

                                                            </tr>
                                                        );
                                                    }
                                                )

                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                            {/* =================================================
                                PAGINATION
                            ================================================= */}

                            <div className="px-4 sm:px-5 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">

                                <p className="text-xs text-slate-400">

                                    Menampilkan{" "}

                                    <span className="font-semibold text-slate-600">
                                        {sortedData.length === 0
                                            ? 0
                                            : startIndex + 1}
                                    </span>

                                    {" "}–{" "}

                                    <span className="font-semibold text-slate-600">
                                        {Math.min(
                                            startIndex +
                                                paginatedData.length,
                                            sortedData.length
                                        )}
                                    </span>

                                    {" "}dari{" "}

                                    <span className="font-semibold text-slate-600">
                                        {sortedData.length}
                                    </span>

                                    {" "}data

                                </p>

                                <div className="flex items-center gap-1">

                                    <button
                                        type="button"
                                        disabled={
                                            safeCurrentPage === 1
                                        }
                                        onClick={() =>
                                            setCurrentPage(
                                                Math.max(
                                                    1,
                                                    safeCurrentPage - 1
                                                )
                                            )
                                        }
                                        className="w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-500 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>

                                    {totalPages > 0 &&
                                        getPaginationPages(
                                            safeCurrentPage,
                                            totalPages
                                        ).map(
                                            (page, index) =>
                                                page === "..." ? (
                                                    <span
                                                        key={`ellipsis-${index}`}
                                                        className="w-8 text-center text-slate-400 text-xs"
                                                    >
                                                        ...
                                                    </span>
                                                ) : (
                                                    <button
                                                        key={page}
                                                        type="button"
                                                        onClick={() =>
                                                            setCurrentPage(
                                                                page
                                                            )
                                                        }
                                                        className={`w-9 h-9 rounded-lg text-xs font-medium transition-all ${
                                                            safeCurrentPage ===
                                                            page
                                                                ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                                                                : "text-slate-500 hover:bg-slate-100"
                                                        }`}
                                                    >
                                                        {page}
                                                    </button>
                                                )
                                        )}

                                    <button
                                        type="button"
                                        disabled={
                                            totalPages === 0 ||
                                            safeCurrentPage ===
                                                totalPages
                                        }
                                        onClick={() =>
                                            setCurrentPage(
                                                Math.min(
                                                    totalPages,
                                                    safeCurrentPage + 1
                                                )
                                            )
                                        }
                                        className="w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-500 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRight size={16} />
                                    </button>

                                </div>

                            </div>

                        </section>

                        {/* =================================================
                            FOOTER
                        ================================================= */}

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-2 border-t border-slate-200/60">

                            <p className="text-[11px] text-slate-400">
                                SmartSchool Management System
                            </p>

                            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Sistem berjalan normal
                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

// =========================================================
// STAT CARD
// =========================================================

function StatCard({
    label,
    value,
    icon: Icon,
    color,
}) {
    const colorClasses = {
        blue: {
            icon: "bg-blue-50 text-blue-600",
            accent: "bg-blue-500",
        },

        emerald: {
            icon: "bg-emerald-50 text-emerald-600",
            accent: "bg-emerald-500",
        },

        amber: {
            icon: "bg-amber-50 text-amber-600",
            accent: "bg-amber-500",
        },

        rose: {
            icon: "bg-rose-50 text-rose-600",
            accent: "bg-rose-500",
        },

        violet: {
            icon: "bg-violet-50 text-violet-600",
            accent: "bg-violet-500",
        },

        teal: {
            icon: "bg-teal-50 text-teal-600",
            accent: "bg-teal-500",
        },
    };

    const current =
        colorClasses[color] ||
        colorClasses.blue;

    return (
        <div className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

            {/* Accent */}

            <div
                className={`absolute top-0 left-0 right-0 h-[2px] ${current.accent} opacity-70`}
            />

            <div className="flex items-center gap-3">

                <div
                    className={`w-10 h-10 rounded-xl ${current.icon} flex items-center justify-center flex-shrink-0`}
                >
                    <Icon
                        size={18}
                        strokeWidth={1.8}
                    />
                </div>

                <div className="min-w-0">

                    <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wide text-slate-400 truncate">
                        {label}
                    </p>

                    <div className="flex items-center gap-1.5 mt-0.5">

                        <p className="text-lg sm:text-xl font-bold tracking-tight text-slate-800">
                            {value}
                        </p>

                        {color === "teal" && (
                            <ArrowUpRight
                                size={13}
                                className="text-teal-500"
                            />
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

// =========================================================
// FILTER SELECT
// =========================================================

function FilterSelect({
    value,
    onChange,
    options,
    icon: Icon,
    label,
}) {
    return (
        <div className="relative">

            <Icon
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />

            <select
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                aria-label={label}
                className="w-full h-10 appearance-none pl-9 pr-8 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-xl outline-none cursor-pointer transition-all focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
            >
                {options.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>

            <ChevronRight
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none"
            />

        </div>
    );
}

// =========================================================
// TABLE HEADER
// =========================================================

function TableHeader({
    children,
    sortable = false,
    onClick,
    align = "left",
}) {
    return (
        <th
            onClick={onClick}
            className={`px-5 py-3.5 text-${align} text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400 ${
                sortable
                    ? "cursor-pointer hover:text-slate-600 select-none"
                    : ""
            }`}
        >
            {children}
        </th>
    );
}

// =========================================================
// STATUS BADGE
// =========================================================

function StatusBadge({ status }) {
    const style =
        statusColorMap[status] ||
        statusColorMap.Aktif;

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold border ${style.bg} ${style.text} ${style.border}`}
        >
            <span
                className={`w-1.5 h-1.5 rounded-full ${style.dot}`}
            />

            {status}
        </span>
    );
}

// =========================================================
// ACTION BUTTON
// =========================================================

function ActionButton({
    icon: Icon,
    title,
    color,
    onClick,
}) {
    const colors = {
        blue:
            "hover:bg-blue-50 hover:text-blue-600",
        amber:
            "hover:bg-amber-50 hover:text-amber-600",
        rose:
            "hover:bg-rose-50 hover:text-rose-600",
    };

    return (
        <button
            type="button"
            title={title}
            onClick={onClick}
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 transition-all ${colors[color]}`}
        >
            <Icon
                size={15}
                strokeWidth={1.8}
            />
        </button>
    );
}

// =========================================================
// EMPTY STATE
// =========================================================

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-5">

            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
                <Search
                    size={24}
                    strokeWidth={1.7}
                />
            </div>

            <h3 className="text-sm font-semibold text-slate-700">
                Data tidak ditemukan
            </h3>

            <p className="mt-1 text-xs text-slate-400 text-center max-w-sm">
                Tidak ada yayasan yang sesuai dengan pencarian atau filter yang dipilih.
            </p>

        </div>
    );
}

// =========================================================
// PAGINATION HELPER
// =========================================================

function getPaginationPages(
    currentPage,
    totalPages
) {
    if (totalPages <= 5) {
        return Array.from(
            { length: totalPages },
            (_, i) => i + 1
        );
    }

    if (currentPage <= 3) {
        return [
            1,
            2,
            3,
            4,
            "...",
            totalPages,
        ];
    }

    if (currentPage >= totalPages - 2) {
        return [
            1,
            "...",
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ];
    }

    return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
    ];
}