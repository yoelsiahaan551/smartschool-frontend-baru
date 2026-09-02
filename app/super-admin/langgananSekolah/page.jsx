"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import {
  Building2,
  CreditCard,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock3,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  Pencil,
  Trash2,
  Plus,
  RefreshCw,
  Download,
  FileText,
  WalletCards,
  AlertCircle,
  TrendingUp,
  MoreHorizontal,
} from "lucide-react";

/* =========================================================
   HELPER
========================================================= */

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function formatDate(date) {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return parsedDate.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const styles = {
    Aktif: {
      icon: CheckCircle2,
      className:
        "border-emerald-200 bg-emerald-50 text-emerald-700",
      dot: "bg-emerald-500",
    },

    "Akan Berakhir": {
      icon: Clock3,
      className:
        "border-amber-200 bg-amber-50 text-amber-700",
      dot: "bg-amber-500",
    },

    Expired: {
      icon: XCircle,
      className:
        "border-red-200 bg-red-50 text-red-700",
      dot: "bg-red-500",
    },
  };

  const current = styles[status] || {
    icon: Clock3,
    className:
      "border-slate-200 bg-slate-50 text-slate-600",
    dot: "bg-slate-400",
  };

  const Icon = current.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold ${current.className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${current.dot}`}
      />

      <Icon size={13} />

      {status || "-"}
    </span>
  );
}

/* =========================================================
   PAYMENT BADGE
========================================================= */

function PaymentBadge({ status }) {
  if (status === "Lunas") {
    return (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
        <CheckCircle2 size={13} />
        Lunas
      </span>
    );
  }

  if (status === "Pending") {
    return (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
        <Clock3 size={13} />
        Pending
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
      {status || "-"}
    </span>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon: Icon,
  label,
  value,
  description,
  iconClass,
  valueClass = "text-slate-900",
}) {
  return (
    <div className="min-w-[230px] flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </p>

          <p
            className={`mt-2 text-2xl font-bold tracking-tight ${valueClass}`}
          >
            {value}
          </p>

          {description && (
            <p className="mt-1 text-xs text-slate-400">
              {description}
            </p>
          )}
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function LanggananSekolahPage() {
  const router = useRouter();

  /* =======================================================
     SIDEBAR
  ======================================================= */

  const [collapsed, setCollapsed] = useState(false);

  /* =======================================================
     DATA
  ======================================================= */

  const [subscriptions, setSubscriptions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* =======================================================
     FILTER
  ======================================================= */

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("Semua Status");

  const [packageFilter, setPackageFilter] =
    useState("Semua Paket");

  /* =======================================================
     SORT
  ======================================================= */

  const [sortBy, setSortBy] = useState("sekolah");

  const [sortDirection, setSortDirection] =
    useState("asc");

  /* =======================================================
     PAGINATION
  ======================================================= */

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(8);

  /* =======================================================
     UI
  ======================================================= */

  const [showFilter, setShowFilter] = useState(false);

  const [openAction, setOpenAction] = useState(null);

  /* =======================================================
     FETCH SUBSCRIPTIONS
  ======================================================= */

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      setError("");

      const API_URL = (
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:5000/api"
      ).replace(/\/$/, "");

      const url = API_URL.endsWith("/api")
        ? `${API_URL}/v1/langganan/sekolah`
        : `${API_URL}/api/v1/langganan/sekolah`;

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Token autentikasi tidak ditemukan. Silakan login kembali."
        );
      }

      const response = await fetch(url, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Gagal mengambil data langganan sekolah."
        );
      }

      const rawData = Array.isArray(result?.data)
        ? result.data
        : [];

      /* ===================================================
         MAPPING DATABASE -> FORMAT FRONTEND
      =================================================== */

      const formattedData = rawData.map((item) => {
        let status = "Akan Berakhir";

        if (
          item.statusLangganan === "active" ||
          item.statusLangganan === "trialing"
        ) {
          status = "Aktif";
        }

        if (item.statusLangganan === "expired") {
          status = "Expired";
        }

        /* -----------------------------------------------
           Jika tanggal berakhir sudah lewat,
           otomatis tampil Expired.
        ------------------------------------------------ */

        if (item.tanggalBerakhir) {
          const endDate = new Date(
            item.tanggalBerakhir
          );

          if (
            !Number.isNaN(endDate.getTime()) &&
            endDate < new Date()
          ) {
            status = "Expired";
          }
        }

        return {
          id: item.id,

          sekolah:
            item.sekolah?.nama ||
            "Sekolah Tidak Diketahui",

          kode: item.sekolah?.kode || "-",

          paket: item.paket?.nama || "-",

          harga: Number(
            item.hargaSaatBerlangganan ??
              item.paket?.harga ??
              0
          ),

          mulai: formatDate(
            item.tanggalMulai
          ),

          berakhir: formatDate(
            item.tanggalBerakhir
          ),

          status,

          pembayaran:
            item.statusPembayaran === "paid"
              ? "Lunas"
              : item.statusPembayaran === "pending"
                ? "Pending"
                : item.statusPembayaran || "-",

          admin:
            item.dibuatOlehNama ||
            item.dibuatOleh?.namaLengkap ||
            "-",

          /* Data asli tetap disimpan
             kalau nanti diperlukan */
          raw: item,
        };
      });

      setSubscriptions(formattedData);
    } catch (err) {
      console.error(
        "FETCH LANGGANAN ERROR:",
        err
      );

      setError(
        err?.message ||
          "Terjadi kesalahan saat mengambil data langganan."
      );

      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     INITIAL FETCH
  ======================================================= */

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  /* =======================================================
     RESET PAGE SAAT FILTER BERUBAH
  ======================================================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    statusFilter,
    packageFilter,
    itemsPerPage,
  ]);

  /* =======================================================
     STATISTICS
  ======================================================= */

  const statistics = useMemo(() => {
    const total = subscriptions.length;

    const active = subscriptions.filter(
      (item) => item.status === "Aktif"
    ).length;

    const expiring = subscriptions.filter(
      (item) => item.status === "Akan Berakhir"
    ).length;

    const expired = subscriptions.filter(
      (item) => item.status === "Expired"
    ).length;

    const revenue = subscriptions
      .filter(
        (item) => item.pembayaran === "Lunas"
      )
      .reduce(
        (sum, item) =>
          sum + Number(item.harga || 0),
        0
      );

    return {
      total,
      active,
      expiring,
      expired,
      revenue,
    };
  }, [subscriptions]);

  /* =======================================================
     FILTER + SORT
  ======================================================= */

  const filteredSubscriptions = useMemo(() => {
    let result = [...subscriptions];

    const keyword = search
      .trim()
      .toLowerCase();

    /* SEARCH */

    if (keyword) {
      result = result.filter((item) => {
        return (
          item.sekolah
            .toLowerCase()
            .includes(keyword) ||
          item.kode
            .toLowerCase()
            .includes(keyword) ||
          item.paket
            .toLowerCase()
            .includes(keyword) ||
          item.admin
            .toLowerCase()
            .includes(keyword)
        );
      });
    }

    /* STATUS */

    if (
      statusFilter !== "Semua Status"
    ) {
      result = result.filter(
        (item) =>
          item.status === statusFilter
      );
    }

    /* PACKAGE */

    if (
      packageFilter !== "Semua Paket"
    ) {
      result = result.filter(
        (item) =>
          item.paket === packageFilter
      );
    }

    /* SORT */

    result.sort((a, b) => {
      if (sortBy === "harga") {
        const first =
          Number(a.harga) || 0;

        const second =
          Number(b.harga) || 0;

        return sortDirection === "asc"
          ? first - second
          : second - first;
      }

      let first = "";
      let second = "";

      if (sortBy === "sekolah") {
        first = a.sekolah || "";
        second = b.sekolah || "";
      }

      if (sortBy === "paket") {
        first = a.paket || "";
        second = b.paket || "";
      }

      if (sortBy === "status") {
        first = a.status || "";
        second = b.status || "";
      }

      return sortDirection === "asc"
        ? first.localeCompare(
            second,
            "id"
          )
        : second.localeCompare(
            first,
            "id"
          );
    });

    return result;
  }, [
    subscriptions,
    search,
    statusFilter,
    packageFilter,
    sortBy,
    sortDirection,
  ]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredSubscriptions.length /
        itemsPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const paginatedSubscriptions =
    useMemo(() => {
      const start =
        (safeCurrentPage - 1) *
        itemsPerPage;

      return filteredSubscriptions.slice(
        start,
        start + itemsPerPage
      );
    }, [
      filteredSubscriptions,
      safeCurrentPage,
      itemsPerPage,
    ]);

  const startNumber =
    filteredSubscriptions.length === 0
      ? 0
      : (safeCurrentPage - 1) *
          itemsPerPage +
        1;

  const endNumber = Math.min(
    safeCurrentPage * itemsPerPage,
    filteredSubscriptions.length
  );

  /* =======================================================
     SORT HANDLER
  ======================================================= */

  const changeSort = (field) => {
    if (sortBy === field) {
      setSortDirection((prev) =>
        prev === "asc"
          ? "desc"
          : "asc"
      );
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  /* =======================================================
     RESET FILTER
  ======================================================= */

  const resetFilter = () => {
    setSearch("");

    setStatusFilter(
      "Semua Status"
    );

    setPackageFilter(
      "Semua Paket"
    );

    setSortBy("sekolah");

    setSortDirection("asc");

    setCurrentPage(1);
  };

  /* =======================================================
     DELETE
     
     Catatan:
     Saat ini hanya menghapus dari tampilan.
     Belum menghapus database.
  ======================================================= */

  const handleDelete = (id) => {
    const target =
      subscriptions.find(
        (item) => item.id === id
      );

    if (!target) return;

    const confirmed =
      window.confirm(
        `Hapus langganan "${target.sekolah}"?`
      );

    if (!confirmed) return;

    setSubscriptions((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );

    setOpenAction(null);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <div className="flex min-h-screen">
        {/* =================================================
            SIDEBAR
        ================================================= */}

        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          role="super-admin"
        />

        {/* =================================================
            MAIN
        ================================================= */}

        <div className="min-w-0 flex-1">
          <Header />

          <main className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
            <div className="mx-auto w-full max-w-[1800px]">
              {/* =================================================
                  PAGE HEADER
              ================================================= */}

              <section className="mb-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                      <CreditCard
                        size={27}
                      />
                    </div>

                    <div className="min-w-0">
                      <h1 className="truncate text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Langganan Sekolah
                      </h1>

                      <p className="mt-1 text-sm text-slate-500 sm:text-base">
                        Kelola data paket dan
                        langganan sekolah secara
                        terpusat
                      </p>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}

                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* EXPORT */}

                    <button
                      type="button"
                      className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Download
                        size={17}
                      />

                      <span>
                        Export
                      </span>
                    </button>

                    {/* REFRESH */}

                    <button
                      type="button"
                      onClick={
                        fetchSubscriptions
                      }
                      disabled={loading}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                      title="Refresh"
                    >
                      <RefreshCw
                        size={18}
                        className={
                          loading
                            ? "animate-spin"
                            : ""
                        }
                      />
                    </button>

                    {/* TAMBAH */}

                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          "/super-admin/langgananSekolah/tambah"
                        )
                      }
                      className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.98]"
                    >
                      <Plus
                        size={18}
                      />

                      Tambah Langganan
                    </button>
                  </div>
                </div>
              </section>

              {/* =================================================
                  STATISTICS
              ================================================= */}

              <section className="mb-6">
                <div className="flex min-w-0 flex-wrap gap-4">
                  <StatCard
                    icon={Building2}
                    label="Total Langganan"
                    value={
                      loading
                        ? "..."
                        : statistics.total
                    }
                    description="Seluruh sekolah"
                    iconClass="bg-blue-50 text-blue-600"
                  />

                  <StatCard
                    icon={CheckCircle2}
                    label="Langganan Aktif"
                    value={
                      loading
                        ? "..."
                        : statistics.active
                    }
                    description="Sedang berjalan"
                    iconClass="bg-emerald-50 text-emerald-600"
                    valueClass="text-emerald-600"
                  />

                  <StatCard
                    icon={Clock3}
                    label="Akan Berakhir"
                    value={
                      loading
                        ? "..."
                        : statistics.expiring
                    }
                    description="Perlu diperpanjang"
                    iconClass="bg-amber-50 text-amber-600"
                    valueClass="text-amber-600"
                  />

                  <StatCard
                    icon={XCircle}
                    label="Expired"
                    value={
                      loading
                        ? "..."
                        : statistics.expired
                    }
                    description="Langganan berakhir"
                    iconClass="bg-red-50 text-red-600"
                    valueClass="text-red-600"
                  />

                  <StatCard
                    icon={TrendingUp}
                    label="Nilai Langganan"
                    value={
                      loading
                        ? "..."
                        : formatRupiah(
                            statistics.revenue
                          )
                    }
                    description="Total pembayaran lunas"
                    iconClass="bg-indigo-50 text-indigo-600"
                    valueClass="text-indigo-600 text-xl"
                  />
                </div>
              </section>

              {/* =================================================
                  FILTER CARD
              ================================================= */}

              <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
                  {/* SEARCH */}

                  <div className="relative min-w-0 flex-1">
                    <Search
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={search}
                      onChange={(e) =>
                        setSearch(
                          e.target.value
                        )
                      }
                      placeholder="Cari sekolah, kode, paket, atau admin..."
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  {/* FILTER BUTTON */}

                  <button
                    type="button"
                    onClick={() =>
                      setShowFilter(
                        !showFilter
                      )
                    }
                    className={`inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${
                      showFilter
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    <SlidersHorizontal
                      size={17}
                    />

                    Filter

                    <ChevronDown
                      size={15}
                      className={`transition-transform ${
                        showFilter
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  {/* SORT */}

                  <button
                    type="button"
                    onClick={() =>
                      changeSort(
                        "sekolah"
                      )
                    }
                    className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <ArrowUpDown
                      size={17}
                    />

                    <span>
                      {sortDirection ===
                      "asc"
                        ? "Nama A-Z"
                        : "Nama Z-A"}
                    </span>
                  </button>
                </div>

                {/* =================================================
                    ADVANCED FILTER
                ================================================= */}

                {showFilter && (
                  <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* STATUS */}

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                        Status
                      </label>

                      <select
                        value={
                          statusFilter
                        }
                        onChange={(e) =>
                          setStatusFilter(
                            e.target.value
                          )
                        }
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                      >
                        <option>
                          Semua Status
                        </option>

                        <option>
                          Aktif
                        </option>

                        <option>
                          Akan Berakhir
                        </option>

                        <option>
                          Expired
                        </option>
                      </select>
                    </div>

                    {/* PAKET */}

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                        Paket
                      </label>

                      <select
                        value={
                          packageFilter
                        }
                        onChange={(e) =>
                          setPackageFilter(
                            e.target.value
                          )
                        }
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                      >
                        <option>
                          Semua Paket
                        </option>

                        <option>
                          Basic
                        </option>

                        <option>
                          Professional
                        </option>

                        <option>
                          Premium
                        </option>
                      </select>
                    </div>

                    {/* SORT */}

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                        Urutkan Berdasarkan
                      </label>

                      <select
                        value={
                          sortBy
                        }
                        onChange={(e) =>
                          setSortBy(
                            e.target.value
                          )
                        }
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                      >
                        <option value="sekolah">
                          Nama Sekolah
                        </option>

                        <option value="paket">
                          Paket
                        </option>

                        <option value="status">
                          Status
                        </option>

                        <option value="harga">
                          Harga
                        </option>
                      </select>
                    </div>

                    {/* RESET */}

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={
                          resetFilter
                        }
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                      >
                        Reset Filter
                      </button>
                    </div>
                  </div>
                )}
              </section>

              {/* =================================================
                  TABLE
              ================================================= */}

              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* TABLE HEADER */}

                <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Daftar Langganan
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Menampilkan{" "}
                      {startNumber}–
                      {endNumber} dari{" "}
                      {
                        filteredSubscriptions.length
                      }{" "}
                      data
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <FileText
                      size={15}
                    />

                    Data langganan sekolah
                  </div>
                </div>

                {/* HORIZONTAL SCROLL */}

                <div className="w-full overflow-x-auto">
                  <table className="w-full min-w-[1250px] border-collapse">
                    <thead>
                      <tr className="bg-blue-600 text-left text-xs font-bold uppercase tracking-wider text-white">
                        <th className="w-[70px] px-5 py-4 text-center">
                          No.
                        </th>

                        <th className="min-w-[280px] px-5 py-4">
                          Sekolah
                        </th>

                        <th className="min-w-[170px] px-5 py-4">
                          Paket
                        </th>

                        <th className="min-w-[180px] px-5 py-4">
                          Harga
                        </th>

                        <th className="min-w-[190px] px-5 py-4">
                          Periode
                        </th>

                        <th className="min-w-[150px] px-5 py-4">
                          Pembayaran
                        </th>

                        <th className="min-w-[150px] px-5 py-4">
                          Status
                        </th>

                        <th className="min-w-[170px] px-5 py-4">
                          Admin
                        </th>

                        <th className="w-[130px] px-5 py-4 text-center">
                          Aksi
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {/* =================================================
                          LOADING
                      ================================================= */}

                      {loading ? (
                        <tr>
                          <td
                            colSpan={9}
                            className="px-5 py-16 text-center"
                          >
                            <div className="flex flex-col items-center">
                              <RefreshCw
                                size={28}
                                className="animate-spin text-blue-600"
                              />

                              <p className="mt-3 text-sm font-semibold text-slate-600">
                                Memuat data
                                langganan...
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                Mengambil data
                                dari database
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : error ? (
                        /* =================================================
                            ERROR
                        ================================================= */

                        <tr>
                          <td
                            colSpan={9}
                            className="px-5 py-16 text-center"
                          >
                            <div className="mx-auto flex max-w-sm flex-col items-center">
                              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                                <AlertCircle
                                  size={25}
                                />
                              </div>

                              <h3 className="mt-4 text-sm font-bold text-slate-700">
                                Gagal mengambil
                                data
                              </h3>

                              <p className="mt-1 text-xs leading-5 text-slate-400">
                                {error}
                              </p>

                              <button
                                type="button"
                                onClick={
                                  fetchSubscriptions
                                }
                                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                              >
                                Coba Lagi
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) : paginatedSubscriptions.length >
                        0 ? (
                        /* =================================================
                            DATA
                        ================================================= */

                        paginatedSubscriptions.map(
                          (
                            item,
                            index
                          ) => (
                            <tr
                              key={
                                item.id
                              }
                              className={`group border-b border-slate-100 transition-colors hover:bg-blue-50/50 ${
                                index %
                                  2 ===
                                0
                                  ? "bg-white"
                                  : "bg-slate-50/40"
                              }`}
                            >
                              {/* NO */}

                              <td className="px-5 py-4 text-center">
                                <span className="text-sm font-semibold text-slate-500">
                                  {(safeCurrentPage -
                                    1) *
                                    itemsPerPage +
                                    index +
                                    1}
                                </span>
                              </td>

                              {/* SEKOLAH */}

                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <Building2
                                      size={
                                        19
                                      }
                                    />
                                  </div>

                                  <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-slate-800">
                                      {
                                        item.sekolah
                                      }
                                    </p>

                                    <p className="mt-0.5 text-xs font-medium text-slate-400">
                                      Kode:{" "}
                                      {
                                        item.kode
                                      }
                                    </p>
                                  </div>
                                </div>
                              </td>

                              {/* PAKET */}

                              <td className="px-5 py-4">
                                <span
                                  className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-xs font-bold ${
                                    item.paket ===
                                    "Premium"
                                      ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                                      : item.paket ===
                                        "Professional"
                                        ? "border-blue-200 bg-blue-50 text-blue-700"
                                        : "border-slate-200 bg-slate-100 text-slate-600"
                                  }`}
                                >
                                  {
                                    item.paket
                                  }
                                </span>
                              </td>

                              {/* HARGA */}

                              <td className="px-5 py-4">
                                <div className="flex items-center gap-2">
                                  <WalletCards
                                    size={
                                      16
                                    }
                                    className="shrink-0 text-blue-500"
                                  />

                                  <span className="whitespace-nowrap text-sm font-bold text-slate-700">
                                    {formatRupiah(
                                      item.harga
                                    )}
                                  </span>
                                </div>
                              </td>

                              {/* PERIODE */}

                              <td className="px-5 py-4">
                                <div className="flex items-start gap-2">
                                  <CalendarDays
                                    size={
                                      16
                                    }
                                    className="mt-0.5 shrink-0 text-slate-400"
                                  />

                                  <div className="text-xs">
                                    <p className="font-semibold text-slate-700">
                                      {
                                        item.mulai
                                      }
                                    </p>

                                    <p className="mt-1 text-slate-400">
                                      s/d{" "}
                                      {
                                        item.berakhir
                                      }
                                    </p>
                                  </div>
                                </div>
                              </td>

                              {/* PEMBAYARAN */}

                              <td className="px-5 py-4">
                                <PaymentBadge
                                  status={
                                    item.pembayaran
                                  }
                                />
                              </td>

                              {/* STATUS */}

                              <td className="px-5 py-4">
                                <StatusBadge
                                  status={
                                    item.status
                                  }
                                />
                              </td>

                              {/* ADMIN */}

                              <td className="px-5 py-4">
                                <span className="text-sm font-medium text-slate-600">
                                  {
                                    item.admin
                                  }
                                </span>
                              </td>

                              {/* AKSI */}

                              <td className="px-5 py-4">
                                <div className="relative flex items-center justify-center gap-1.5">
                                  {/* DETAIL */}

                                  <button
                                    type="button"
                                    onClick={() =>
                                      router.push(
                                        `/super-admin/langganan/${item.id}`
                                      )
                                    }
                                    title="Lihat detail"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                                  >
                                    <Eye
                                      size={
                                        17
                                      }
                                    />
                                  </button>

                                  {/* EDIT */}

                                  <button
                                    type="button"
                                    onClick={() =>
                                      router.push(
                                        `/super-admin/langganan/${item.id}/edit`
                                      )
                                    }
                                    title="Edit"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                                  >
                                    <Pencil
                                      size={
                                        17
                                      }
                                    />
                                  </button>

                                  {/* DELETE */}

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDelete(
                                        item.id
                                      )
                                    }
                                    title="Hapus"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                                  >
                                    <Trash2
                                      size={
                                        17
                                      }
                                    />
                                  </button>

                                  {/* MORE */}

                                  <button
                                    type="button"
                                    onClick={() =>
                                      setOpenAction(
                                        openAction ===
                                          item.id
                                          ? null
                                          : item.id
                                      )
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                  >
                                    <MoreHorizontal
                                      size={
                                        17
                                      }
                                    />
                                  </button>

                                  {/* ACTION MENU */}

                                  {openAction ===
                                    item.id && (
                                    <div className="absolute right-0 top-11 z-30 w-40 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setOpenAction(
                                            null
                                          );

                                          router.push(
                                            `/super-admin/langganan/${item.id}`
                                          );
                                        }}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                                      >
                                        <Eye
                                          size={
                                            14
                                          }
                                        />

                                        Detail
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => {
                                          setOpenAction(
                                            null
                                          );

                                          router.push(
                                            `/super-admin/langganan/${item.id}/edit`
                                          );
                                        }}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                                      >
                                        <Pencil
                                          size={
                                            14
                                          }
                                        />

                                        Edit
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => {
                                          setOpenAction(
                                            null
                                          );

                                          handleDelete(
                                            item.id
                                          );
                                        }}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50"
                                      >
                                        <Trash2
                                          size={
                                            14
                                          }
                                        />

                                        Hapus
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )
                        )
                      ) : (
                        /* =================================================
                            EMPTY
                        ================================================= */

                        <tr>
                          <td
                            colSpan={9}
                            className="px-5 py-16 text-center"
                          >
                            <div className="mx-auto flex max-w-sm flex-col items-center">
                              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                <AlertCircle
                                  size={
                                    25
                                  }
                                />
                              </div>

                              <h3 className="mt-4 text-sm font-bold text-slate-700">
                                Data tidak
                                ditemukan
                              </h3>

                              <p className="mt-1 text-xs leading-5 text-slate-400">
                                Tidak ada data
                                langganan yang
                                sesuai dengan
                                pencarian atau
                                filter.
                              </p>

                              <button
                                type="button"
                                onClick={
                                  resetFilter
                                }
                                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                              >
                                Reset Filter
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* =================================================
                    PAGINATION
                ================================================= */}

                <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* ITEMS PER PAGE */}

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>
                      Tampilkan
                    </span>

                    <select
                      value={
                        itemsPerPage
                      }
                      onChange={(e) =>
                        setItemsPerPage(
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-600 outline-none focus:border-blue-400"
                    >
                      <option value={5}>
                        5
                      </option>

                      <option value={8}>
                        8
                      </option>

                      <option value={10}>
                        10
                      </option>

                      <option value={20}>
                        20
                      </option>
                    </select>

                    <span>
                      data per halaman
                    </span>
                  </div>

                  {/* PAGINATION BUTTONS */}

                  <div className="flex flex-wrap items-center gap-1.5">
                    {/* FIRST */}

                    <button
                      type="button"
                      disabled={
                        safeCurrentPage ===
                        1
                      }
                      onClick={() =>
                        setCurrentPage(1)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronsLeft
                        size={15}
                      />
                    </button>

                    {/* PREVIOUS */}

                    <button
                      type="button"
                      disabled={
                        safeCurrentPage ===
                        1
                      }
                      onClick={() =>
                        setCurrentPage(
                          (prev) =>
                            Math.max(
                              1,
                              prev - 1
                            )
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronLeft
                        size={15}
                      />
                    </button>

                    {/* PAGE NUMBERS */}

                    {Array.from(
                      {
                        length:
                          totalPages,
                      },
                      (_, index) =>
                        index + 1
                    )
                      .filter((page) => {
                        if (
                          totalPages <= 5
                        ) {
                          return true;
                        }

                        return (
                          page === 1 ||
                          page ===
                            totalPages ||
                          Math.abs(
                            page -
                              safeCurrentPage
                          ) <= 1
                        );
                      })
                      .map(
                        (
                          page,
                          index,
                          pages
                        ) => {
                          const previous =
                            pages[
                              index - 1
                            ];

                          const showDots =
                            previous &&
                            page -
                              previous >
                              1;

                          return (
                            <div
                              key={page}
                              className="flex items-center gap-1.5"
                            >
                              {showDots && (
                                <span className="px-1 text-slate-400">
                                  ...
                                </span>
                              )}

                              <button
                                type="button"
                                onClick={() =>
                                  setCurrentPage(
                                    page
                                  )
                                }
                                className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-xs font-semibold transition ${
                                  safeCurrentPage ===
                                  page
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                                }`}
                              >
                                {
                                  page
                                }
                              </button>
                            </div>
                          );
                        }
                      )}

                    {/* NEXT */}

                    <button
                      type="button"
                      disabled={
                        safeCurrentPage ===
                        totalPages
                      }
                      onClick={() =>
                        setCurrentPage(
                          (prev) =>
                            Math.min(
                              totalPages,
                              prev + 1
                            )
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronRight
                        size={15}
                      />
                    </button>

                    {/* LAST */}

                    <button
                      type="button"
                      disabled={
                        safeCurrentPage ===
                        totalPages
                      }
                      onClick={() =>
                        setCurrentPage(
                          totalPages
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronsRight
                        size={15}
                      />
                    </button>
                  </div>
                </div>
              </section>

              {/* =================================================
                  FOOTER INFO
              ================================================= */}

              <div className="mt-4 flex items-center gap-2 px-1 text-xs text-slate-400">
                <AlertCircle
                  size={14}
                />

                <span>
                  Data pada halaman ini
                  diambil langsung dari
                  database melalui API
                  langganan sekolah.
                </span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}