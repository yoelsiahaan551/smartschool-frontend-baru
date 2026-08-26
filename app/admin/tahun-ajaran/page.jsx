"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import {
  CalendarDays,
  Plus,
  Search,
  Edit,
  Trash2,
  RefreshCw,
  CheckCircle,
  XCircle,
  Calendar,
  Check,
  AlertCircle,
  ArrowRight,
  Clock3,
  Layers3,
  Activity,
} from "lucide-react";

// =========================================================
// DUMMY DATA
// =========================================================
const DEFAULT_DATA = [
  {
    id: 1,
    nama: "2024/2025",
    tanggal_mulai: "2024-07-01",
    tanggal_selesai: "2025-06-30",
    semester: "Ganjil",
    status: "aktif",
    dibuatPada: "2024-06-15T08:00:00Z",
    updatedAt: "2024-07-01T00:00:00Z",
  },
  {
    id: 2,
    nama: "2025/2026",
    tanggal_mulai: "2025-07-01",
    tanggal_selesai: "2026-06-30",
    semester: "Genap",
    status: "nonaktif",
    dibuatPada: "2025-06-15T08:00:00Z",
    updatedAt: "2025-06-15T08:00:00Z",
  },
  {
    id: 3,
    nama: "2023/2024",
    tanggal_mulai: "2023-07-01",
    tanggal_selesai: "2024-06-30",
    semester: "Ganjil",
    status: "nonaktif",
    dibuatPada: "2023-06-15T08:00:00Z",
    updatedAt: "2023-06-15T08:00:00Z",
  },
  {
    id: 4,
    nama: "2026/2027",
    tanggal_mulai: "2026-07-01",
    tanggal_selesai: "2027-06-30",
    semester: "Genap",
    status: "nonaktif",
    dibuatPada: "2026-06-15T08:00:00Z",
    updatedAt: "2026-06-15T08:00:00Z",
  },
];

// =========================================================
// MAIN COMPONENT
// =========================================================
export default function AdminTahunAjaranPage() {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [tahunAjaran, setTahunAjaran] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 5;

  // =========================================================
  // SIDEBAR
  // =========================================================
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  // =========================================================
  // LOAD DATA
  // =========================================================
  useEffect(() => {
    const loadData = () => {
      const stored = localStorage.getItem("tahunAjaranData");

      if (stored) {
        try {
          const parsed = JSON.parse(stored);

          if (Array.isArray(parsed)) {
            setTahunAjaran(parsed);
          } else {
            setTahunAjaran(DEFAULT_DATA);
            localStorage.setItem(
              "tahunAjaranData",
              JSON.stringify(DEFAULT_DATA)
            );
          }
        } catch {
          setTahunAjaran(DEFAULT_DATA);

          localStorage.setItem(
            "tahunAjaranData",
            JSON.stringify(DEFAULT_DATA)
          );
        }
      } else {
        setTahunAjaran(DEFAULT_DATA);

        localStorage.setItem(
          "tahunAjaranData",
          JSON.stringify(DEFAULT_DATA)
        );
      }

      setLoading(false);
    };

    loadData();
  }, []);

  // =========================================================
  // FILTER
  // =========================================================
  const filtered = tahunAjaran.filter((item) =>
    item.nama?.toLowerCase().includes(search.toLowerCase())
  );

  // =========================================================
  // PAGINATION
  // =========================================================
  const totalPages = Math.ceil(
    filtered.length / itemsPerPage
  );

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // =========================================================
  // STATISTICS
  // =========================================================
  const activeYear = tahunAjaran.find(
    (item) => item.status === "aktif"
  );

  const activeCount = tahunAjaran.filter(
    (item) => item.status === "aktif"
  ).length;

  const inactiveCount = tahunAjaran.filter(
    (item) => item.status !== "aktif"
  ).length;

  // =========================================================
  // DELETE
  // =========================================================
  const handleDelete = (id, nama) => {
    if (
      !window.confirm(
        `Yakin ingin menghapus tahun ajaran "${nama}"?`
      )
    ) {
      return;
    }

    const updated = tahunAjaran.filter(
      (item) => item.id !== id
    );

    setTahunAjaran(updated);

    localStorage.setItem(
      "tahunAjaranData",
      JSON.stringify(updated)
    );

    alert(
      `Tahun ajaran "${nama}" berhasil dihapus!`
    );

    if (
      paginated.length === 1 &&
      currentPage > 1
    ) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // =========================================================
  // SET ACTIVE
  // =========================================================
  const handleSetActive = (id) => {
    const item = tahunAjaran.find(
      (t) => t.id === id
    );

    if (!item) return;

    if (item.status === "aktif") {
      alert("Tahun ajaran ini sudah aktif!");
      return;
    }

    if (
      !window.confirm(
        `Yakin ingin mengaktifkan tahun ajaran "${item.nama}"?`
      )
    ) {
      return;
    }

    const updated = tahunAjaran.map((t) => ({
      ...t,
      status:
        t.id === id ? "aktif" : "nonaktif",
    }));

    setTahunAjaran(updated);

    localStorage.setItem(
      "tahunAjaranData",
      JSON.stringify(updated)
    );

    alert(
      `Tahun ajaran "${item.nama}" berhasil diaktifkan!`
    );
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "id-ID",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================================================
  // LOADING
  // =========================================================
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />

          <p className="text-sm font-medium text-slate-500">
            Memuat data tahun ajaran...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <Sidebar
        active="tahunAjaran"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      {/* =====================================================
          CONTENT WRAPPER
      ====================================================== */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* HEADER */}
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
        ==================================================== */}
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full px-4 py-5 sm:px-6 lg:px-8 xl:px-10">
            {/* =================================================
                TOP HEADER
            ================================================== */}
            <section className="relative mb-6 overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-5 shadow-sm sm:p-6 lg:p-7">
              {/* Decorative */}
              <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-indigo-100/60 blur-2xl" />

              <div className="pointer-events-none absolute -bottom-16 right-32 h-36 w-36 rounded-full bg-blue-100/50 blur-2xl" />

              <div className="relative flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                {/* TITLE */}
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
                    <CalendarDays size={23} />
                  </div>

                  <div className="min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="rounded-md bg-indigo-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                        Akademik
                      </span>

                      {activeYear && (
                        <span className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Aktif
                        </span>
                      )}
                    </div>

                    <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
                      Kelola Tahun Ajaran
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                      Atur periode tahun ajaran dan
                      semester akademik sekolah.
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="relative flex flex-col gap-2 sm:flex-row sm:flex-wrap xl:justify-end">
                  {activeYear && (
                    <div className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold text-emerald-700 shadow-sm">
                      <CheckCircle size={15} />

                      <span>
                        Aktif: {activeYear.nama}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() =>
                      window.location.reload()
                    }
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                    title="Refresh"
                  >
                    <RefreshCw size={15} />

                    <span>Refresh</span>
                  </button>

                  <Link
                    href="/admin/tahun-ajaran/tambah"
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-lg"
                  >
                    <Plus size={16} />

                    Tambah Tahun Ajaran
                  </Link>
                </div>
              </div>
            </section>

            {/* =================================================
                STATISTICS
            ================================================== */}
            <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {/* TOTAL */}
              <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-indigo-50 transition-transform duration-300 group-hover:scale-125" />

                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Total Periode
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-800">
                      {tahunAjaran.length}
                    </p>

                    <p className="mt-1 text-[11px] text-slate-400">
                      Tahun ajaran tersimpan
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Layers3 size={21} />
                  </div>
                </div>
              </div>

              {/* ACTIVE */}
              <div className="group relative overflow-hidden rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-emerald-100 transition-transform duration-300 group-hover:scale-125" />

                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                      Periode Aktif
                    </p>

                    <p className="mt-2 text-2xl font-bold text-emerald-700">
                      {activeCount}
                    </p>

                    <p className="mt-1 text-[11px] text-emerald-600/70">
                      Periode sedang digunakan
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                    <Activity size={21} />
                  </div>
                </div>
              </div>

              {/* INACTIVE */}
              <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:col-span-2 xl:col-span-1">
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-slate-200/70 transition-transform duration-300 group-hover:scale-125" />

                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Nonaktif
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-700">
                      {inactiveCount}
                    </p>

                    <p className="mt-1 text-[11px] text-slate-400">
                      Periode sebelumnya
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
                    <Clock3 size={21} />
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                TABLE SECTION
            ================================================== */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* TABLE HEADER */}
              <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                      Daftar Tahun Ajaran
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Kelola seluruh periode akademik
                      sekolah.
                    </p>
                  </div>

                  {/* SEARCH */}
                  <div className="w-full lg:max-w-md">
                    <div className="relative">
                      <Search
                        size={17}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        placeholder="Cari tahun ajaran..."
                        value={search}
                        onChange={(e) => {
                          setSearch(
                            e.target.value
                          );
                          setCurrentPage(1);
                        }}
                        className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  DESKTOP TABLE
              ================================================== */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-white">
                      <th className="w-[22%] px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Tahun Ajaran
                      </th>

                      <th className="w-[15%] px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Semester
                      </th>

                      <th className="w-[25%] px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Periode
                      </th>

                      <th className="w-[15%] px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Status
                      </th>

                      <th className="w-[23%] px-5 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Aksi
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {paginated.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-5 py-16 text-center"
                        >
                          <div className="mx-auto flex max-w-sm flex-col items-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                              <CalendarDays
                                size={27}
                              />
                            </div>

                            <p className="mt-4 text-sm font-bold text-slate-700">
                              {search
                                ? "Tidak ada hasil pencarian"
                                : "Belum ada data tahun ajaran"}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-400">
                              {search
                                ? "Coba gunakan kata kunci pencarian yang berbeda."
                                : "Tambahkan tahun ajaran baru untuk mulai mengelola periode akademik."}
                            </p>

                            {!search && (
                              <Link
                                href="/admin/tahun-ajaran/tambah"
                                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                              >
                                <Plus
                                  size={15}
                                />
                                Tambah Tahun Ajaran
                              </Link>
                            )}
                          </div>
                        </td>
                      </tr>
                    ) : (
                      paginated.map((item) => {
                        const isActive =
                          item.status ===
                          "aktif";

                        return (
                          <tr
                            key={item.id}
                            className={`group transition-colors duration-150 hover:bg-indigo-50/30 ${
                              isActive
                                ? "bg-emerald-50/20"
                                : "bg-white"
                            }`}
                          >
                            {/* TAHUN */}
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                    isActive
                                      ? "bg-emerald-50 text-emerald-600"
                                      : "bg-indigo-50 text-indigo-600"
                                  }`}
                                >
                                  <CalendarDays
                                    size={17}
                                  />
                                </div>

                                <div>
                                  <p className="text-sm font-bold text-slate-800">
                                    {item.nama}
                                  </p>

                                  {isActive && (
                                    <p className="mt-0.5 text-[10px] font-semibold text-emerald-600">
                                      Periode aktif
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* SEMESTER */}
                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex rounded-md border px-2.5 py-1 text-[11px] font-semibold ${
                                  item.semester ===
                                  "Ganjil"
                                    ? "border-indigo-100 bg-indigo-50 text-indigo-600"
                                    : "border-blue-100 bg-blue-50 text-blue-600"
                                }`}
                              >
                                {item.semester}
                              </span>
                            </td>

                            {/* PERIODE */}
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <Calendar
                                  size={14}
                                  className="shrink-0 text-slate-400"
                                />

                                <span>
                                  {formatDate(
                                    item.tanggal_mulai
                                  )}
                                </span>

                                <ArrowRight
                                  size={13}
                                  className="shrink-0 text-slate-300"
                                />

                                <span>
                                  {formatDate(
                                    item.tanggal_selesai
                                  )}
                                </span>
                              </div>
                            </td>

                            {/* STATUS */}
                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-semibold ${
                                  isActive
                                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                    : "border-slate-200 bg-slate-100 text-slate-500"
                                }`}
                              >
                                {isActive ? (
                                  <CheckCircle
                                    size={12}
                                  />
                                ) : (
                                  <XCircle
                                    size={12}
                                  />
                                )}

                                {isActive
                                  ? "Aktif"
                                  : "Nonaktif"}
                              </span>
                            </td>

                            {/* AKSI */}
                            <td className="px-5 py-4">
                              <div className="flex items-center justify-end gap-2">
                                {!isActive && (
                                  <button
                                    onClick={() =>
                                      handleSetActive(
                                        item.id
                                      )
                                    }
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100"
                                  >
                                    <Check
                                      size={13}
                                    />
                                    Set Aktif
                                  </button>
                                )}

                                <Link
                                  href={`/admin/tahun-ajaran/edit/${item.id}`}
                                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                                  title="Edit"
                                >
                                  <Edit
                                    size={15}
                                  />
                                </Link>

                                <button
                                  onClick={() =>
                                    handleDelete(
                                      item.id,
                                      item.nama
                                    )
                                  }
                                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                                  title="Hapus"
                                >
                                  <Trash2
                                    size={15}
                                  />
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

              {/* =================================================
                  PAGINATION
              ================================================== */}
              {totalPages > 1 && (
                <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[11px] text-slate-500">
                    Menampilkan{" "}
                    <span className="font-semibold text-slate-700">
                      {paginated.length}
                    </span>{" "}
                    dari{" "}
                    <span className="font-semibold text-slate-700">
                      {filtered.length}
                    </span>{" "}
                    data
                  </p>

                  <div className="flex items-center gap-1">
                    {/* PREV */}
                    <button
                      onClick={() =>
                        setCurrentPage(
                          Math.max(
                            1,
                            currentPage - 1
                          )
                        )
                      }
                      disabled={
                        currentPage === 1
                      }
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-white hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Prev
                    </button>

                    {/* PAGES */}
                    {[
                      ...Array(
                        Math.min(totalPages, 5)
                      ),
                    ].map((_, i) => {
                      const page = i + 1;

                      return (
                        <button
                          key={page}
                          onClick={() =>
                            setCurrentPage(page)
                          }
                          className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition ${
                            currentPage === page
                              ? "bg-indigo-600 text-white shadow-sm"
                              : "text-slate-500 hover:bg-white hover:text-indigo-600"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    {totalPages > 5 && (
                      <>
                        <span className="px-1 text-xs text-slate-400">
                          ...
                        </span>

                        <button
                          onClick={() =>
                            setCurrentPage(
                              totalPages
                            )
                          }
                          className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition ${
                            currentPage ===
                            totalPages
                              ? "bg-indigo-600 text-white"
                              : "text-slate-500 hover:bg-white hover:text-indigo-600"
                          }`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}

                    {/* NEXT */}
                    <button
                      onClick={() =>
                        setCurrentPage(
                          Math.min(
                            totalPages,
                            currentPage + 1
                          )
                        )
                      }
                      disabled={
                        currentPage === totalPages
                      }
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-white hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* =================================================
                BOTTOM INFO
            ================================================== */}
            <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* INFO */}
              <div className="flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
                  <AlertCircle size={17} />
                </div>

                <div>
                  <p className="text-xs font-bold text-indigo-800">
                    Informasi pengelolaan
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-indigo-700/70">
                    Hanya satu tahun ajaran yang dapat
                    berstatus aktif. Saat periode baru
                    diaktifkan, periode lainnya akan
                    otomatis menjadi nonaktif.
                  </p>
                </div>
              </div>

              {/* ACTIVE YEAR */}
              <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                  <CheckCircle size={17} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold text-emerald-800">
                    Tahun ajaran aktif
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-emerald-700/70">
                    {activeYear
                      ? `Saat ini ${activeYear.nama} menjadi periode aktif sekolah.`
                      : "Belum ada tahun ajaran yang ditetapkan sebagai aktif."}
                  </p>
                </div>
              </div>
            </section>

            {/* =================================================
                FOOTER
            ================================================== */}
            <footer className="mt-7 border-t border-slate-200/70 py-5 text-center">
              <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-500">
                  SmartSchool
                </span>

                <span className="h-1 w-1 rounded-full bg-slate-300" />

                <span>Admin Sekolah</span>

                <span className="h-1 w-1 rounded-full bg-slate-300" />

                <span>Kelola Tahun Ajaran</span>

                <span className="h-1 w-1 rounded-full bg-slate-300" />

                <span>2026</span>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}