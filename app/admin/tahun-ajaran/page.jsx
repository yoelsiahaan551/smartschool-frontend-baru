"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  CalendarDays,
  Plus,
  Search,
  Edit,
  Trash2,
  RefreshCw,
  CheckCircle,
  XCircle,
  Check,
  AlertCircle,
  Layers3,
  Clock3,
  X,
  Database,
  Eye,
} from "lucide-react";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import {
  getTahunAjaran,
  updateTahunAjaran,
  deleteTahunAjaran,
} from "../../../services/tahunAjaran.service";

export default function AdminTahunAjaranPage() {
  // =========================================================
  // STATE
  // =========================================================

  const [isCollapsed, setIsCollapsed] = useState(false);

  const [tahunAjaran, setTahunAjaran] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  // =========================================================
  // LOAD DATA
  // =========================================================

  const loadData = async (isRefresh = false) => {
    try {
      setError("");

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await getTahunAjaran();

      console.log(
        "========== TAHUN AJARAN API =========="
      );

      console.log("Response:", response);

      console.log(
        "======================================"
      );

      const data = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.data?.data)
        ? response.data.data
        : [];

      setTahunAjaran(data);
    } catch (err) {
      console.error(
        "Gagal mengambil tahun ajaran:",
        err
      );

      setTahunAjaran([]);

      setError(
        err instanceof Error
          ? err.message
          : "Gagal mengambil data tahun ajaran."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    loadData(false);
  }, []);

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return tahunAjaran;
    }

    return tahunAjaran.filter((item) => {
      const nama = String(
        item?.nama ?? ""
      ).toLowerCase();

      const semester = String(
        item?.semester ?? ""
      ).toLowerCase();

      const status = String(
        item?.status ?? ""
      ).toLowerCase();

      return (
        nama.includes(keyword) ||
        semester.includes(keyword) ||
        status.includes(keyword)
      );
    });
  }, [tahunAjaran, search]);

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredData.length / itemsPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) *
    itemsPerPage;

  const currentItems = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // =========================================================
  // SAFE PAGE
  // =========================================================

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // =========================================================
  // STATISTICS
  // =========================================================

  const activeYear = useMemo(() => {
    return tahunAjaran.find(
      (item) => item?.status === "aktif"
    );
  }, [tahunAjaran]);

  const activeCount = useMemo(() => {
    return tahunAjaran.filter(
      (item) => item?.status === "aktif"
    ).length;
  }, [tahunAjaran]);

  const inactiveCount = useMemo(() => {
    return tahunAjaran.filter(
      (item) =>
        item?.status === "tidak_aktif"
    ).length;
  }, [tahunAjaran]);

  // =========================================================
  // SET ACTIVE
  // =========================================================

  const handleSetActive = async (item) => {
    if (item?.status === "aktif") {
      return;
    }

    const confirmed = window.confirm(
      `Aktifkan tahun ajaran "${item?.nama}" semester ${item?.semester}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await updateTahunAjaran(item.id, {
        status: "aktif",
      });

      await loadData(true);
    } catch (err) {
      console.error(
        "Gagal mengaktifkan tahun ajaran:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Gagal mengaktifkan tahun ajaran."
      );
    }
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (item) => {
    const message =
      item?.status === "aktif"
        ? `Tahun ajaran "${item?.nama}" sedang aktif. Yakin ingin menghapusnya?`
        : `Yakin ingin menghapus tahun ajaran "${item?.nama}" semester ${item?.semester}?`;

    const confirmed = window.confirm(
      message
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteTahunAjaran(item.id);

      const updated = tahunAjaran.filter(
        (row) => row.id !== item.id
      );

      setTahunAjaran(updated);

      const nextTotalPages = Math.max(
        1,
        Math.ceil(
          updated.length / itemsPerPage
        )
      );

      if (currentPage > nextTotalPages) {
        setCurrentPage(nextTotalPages);
      }
    } catch (err) {
      console.error(
        "Gagal menghapus tahun ajaran:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Gagal menghapus tahun ajaran."
      );
    }
  };

  // =========================================================
  // RESET SEARCH
  // =========================================================

  const handleResetSearch = () => {
    setSearch("");
    setCurrentPage(1);
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-slate-50">
        <Sidebar
          active="tahunAjaran"
          setActive={() => {}}
          collapsed={isCollapsed}
          setCollapsed={setIsCollapsed}
        />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Header
            toggleSidebar={() =>
              setIsCollapsed(
                (prev) => !prev
              )
            }
            notifications={[]}
            user={{
              name: "Admin Sekolah",
              email: "admin@smartschool.com",
              avatar: "AD",
            }}
          />

          <main className="flex min-h-0 flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#155DFC] border-t-transparent" />

              <p className="text-sm font-medium text-slate-500">
                Memuat data tahun ajaran...
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
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
          CONTENT
      ====================================================== */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* ===================================================
            HEADER
        =================================================== */}

        <Header
          toggleSidebar={() =>
            setIsCollapsed(
              (prev) => !prev
            )
          }
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email: "admin@smartschool.com",
            avatar: "AD",
          }}
        />

        {/* ===================================================
            MAIN
        =================================================== */}

        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 xl:px-10">
            <div className="space-y-6">

              {/* =================================================
                  PAGE HEADER
              ================================================== */}

              <section>
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

                  {/* TITLE */}

                  <div className="flex min-w-0 items-start gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf1ff] text-[#155DFC] border border-[#c7dbff]">
                      <CalendarDays
                        size={21}
                      />
                    </div>

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
                          Tahun Ajaran
                        </h1>

                        {activeYear && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            {activeYear.nama}
                          </span>
                        )}

                      </div>

                      <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                        Kelola periode akademik dan semester sekolah.
                      </p>

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">

                    <button
                      type="button"
                      onClick={() =>
                        loadData(true)
                      }
                      disabled={refreshing}
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-[#c7dbff] hover:bg-[#eaf1ff] hover:text-[#155DFC] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <RefreshCw
                        size={14}
                        className={
                          refreshing
                            ? "animate-spin"
                            : ""
                        }
                      />
                      Refresh
                    </button>

                    <Link
                      href="/admin/tahun-ajaran/tambah"
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#155DFC] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0d47c9]"
                    >
                      <Plus size={15} />
                      Tambah Tahun Ajaran
                    </Link>

                  </div>
                </div>
              </section>

              {/* =================================================
                  ERROR
              ================================================== */}

              {error && (
                <section className="rounded-xl border border-red-200 bg-red-50 p-4">

                  <div className="flex items-start gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100">
                      <AlertCircle
                        size={17}
                        className="text-red-600"
                      />
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="text-sm font-semibold text-red-700">
                        Terjadi kesalahan
                      </p>

                      <p className="mt-1 break-words text-xs leading-5 text-red-600">
                        {error}
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setError("")
                      }
                      className="rounded-lg p-1 text-red-400 transition hover:bg-red-100 hover:text-red-600"
                    >
                      <X size={16} />
                    </button>

                  </div>

                </section>
              )}

              {/* =================================================
                  SUMMARY
              ================================================== */}

              <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                {/* TOTAL */}

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                  <div className="flex items-center justify-between gap-4">

                    <div className="min-w-0">

                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Total Periode
                      </p>

                      <p className="mt-1.5 text-2xl font-bold text-slate-800">
                        {tahunAjaran.length}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-400">
                        Seluruh tahun ajaran
                      </p>

                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eaf1ff] text-[#155DFC]">
                      <Layers3
                        size={19}
                      />
                    </div>

                  </div>

                </div>

                {/* ACTIVE */}

                <div className="rounded-xl border border-emerald-200 bg-white p-4 shadow-sm">

                  <div className="flex items-center justify-between gap-4">

                    <div className="min-w-0">

                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                        Periode Aktif
                      </p>

                      <p className="mt-1.5 text-2xl font-bold text-emerald-700">
                        {activeCount}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-400">
                        Sedang digunakan
                      </p>

                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <CheckCircle
                        size={19}
                      />
                    </div>

                  </div>

                </div>

                {/* INACTIVE */}

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                  <div className="flex items-center justify-between gap-4">

                    <div className="min-w-0">

                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Tidak Aktif
                      </p>

                      <p className="mt-1.5 text-2xl font-bold text-slate-700">
                        {inactiveCount}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-400">
                        Periode sebelumnya
                      </p>

                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                      <Clock3
                        size={19}
                      />
                    </div>

                  </div>

                </div>

              </section>

              {/* =================================================
                  TABLE
              ================================================== */}

              <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                {/* TABLE HEADER */}

                <div className="border-b border-slate-200 px-4 py-4 sm:px-5">

                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div className="min-w-0">

                      <h2 className="text-sm font-bold text-slate-800 sm:text-base">
                        Daftar Tahun Ajaran
                      </h2>

                      <p className="mt-1 text-xs text-slate-400">
                        Kelola periode akademik sekolah.
                      </p>

                    </div>

                    {/* SEARCH */}

                    <div className="w-full lg:w-[360px]">

                      <div className="relative">

                        <Search
                          size={16}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="text"
                          value={search}
                          onChange={(e) => {
                            setSearch(
                              e.target.value
                            );
                            setCurrentPage(1);
                          }}
                          placeholder="Cari tahun ajaran..."
                          className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-9 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#155DFC] focus:ring-4 focus:ring-[#155DFC]/10"
                        />

                        {search && (
                          <button
                            type="button"
                            onClick={
                              handleResetSearch
                            }
                            className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                          >
                            <X size={14} />
                          </button>
                        )}

                      </div>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    TABLE
                ================================================== */}

                <div className="overflow-x-auto">

                  <table className="w-full min-w-[800px] border-collapse">

                    <thead>

                      <tr className="bg-slate-50">

                        <th className="w-[70px] border-b border-slate-200 px-5 py-3.5 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          No
                        </th>

                        <th className="border-b border-slate-200 px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Tahun Ajaran
                        </th>

                        <th className="border-b border-slate-200 px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Semester
                        </th>

                        <th className="border-b border-slate-200 px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Status
                        </th>

                        <th className="border-b border-slate-200 px-5 py-3.5 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Aksi
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {currentItems.length ===
                      0 ? (
                        <tr>

                          <td
                            colSpan={5}
                            className="px-5 py-16 text-center"
                          >

                            <div className="mx-auto flex max-w-sm flex-col items-center">

                              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                                <CalendarDays
                                  size={22}
                                />
                              </div>

                              <p className="mt-4 text-sm font-bold text-slate-700">
                                {search
                                  ? "Data tidak ditemukan"
                                  : "Belum ada tahun ajaran"}
                              </p>

                              <p className="mt-1 text-xs leading-5 text-slate-400">
                                {search
                                  ? "Coba gunakan kata pencarian lain."
                                  : "Belum ada tahun ajaran pada sekolah ini."}
                              </p>

                              {search ? (
                                <button
                                  type="button"
                                  onClick={
                                    handleResetSearch
                                  }
                                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                                >
                                  <X size={14} />
                                  Reset Pencarian
                                </button>
                              ) : (
                                <Link
                                  href="/admin/tahun-ajaran/tambah"
                                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#155DFC] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#0d47c9]"
                                >
                                  <Plus
                                    size={14}
                                  />
                                  Tambah Tahun Ajaran
                                </Link>
                              )}

                            </div>

                          </td>

                        </tr>
                      ) : (
                        currentItems.map(
                          (
                            item,
                            index
                          ) => {
                            const isActive =
                              item?.status ===
                              "aktif";

                            return (
                              <tr
                                key={
                                  item.id
                                }
                                className={`transition-colors hover:bg-[#f7f9ff] ${
                                  isActive
                                    ? "bg-emerald-50/20"
                                    : "bg-white"
                                }`}
                              >

                                {/* NO */}

                                <td className="border-b border-slate-100 px-5 py-4 text-center text-xs font-medium text-slate-500">
                                  {startIndex +
                                    index +
                                    1}
                                </td>

                                {/* TAHUN */}

                                <td className="border-b border-slate-100 px-5 py-4">

                                  <div className="flex items-center gap-3">

                                    <div
                                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                        isActive
                                          ? "bg-emerald-50 text-emerald-600"
                                          : "bg-[#eaf1ff] text-[#155DFC]"
                                      }`}
                                    >
                                      <CalendarDays
                                        size={16}
                                      />
                                    </div>

                                    <div className="min-w-0">

                                      <p className="truncate text-sm font-semibold text-slate-800">
                                        {item?.nama ||
                                          "-"}
                                      </p>

                                      {isActive && (
                                        <p className="mt-0.5 text-[10px] font-medium text-emerald-600">
                                          Periode aktif
                                        </p>
                                      )}

                                    </div>

                                  </div>

                                </td>

                                {/* SEMESTER */}

                                <td className="border-b border-slate-100 px-5 py-4">

                                  <span
                                    className={`inline-flex rounded-md border px-2.5 py-1 text-[10px] font-semibold ${
                                      item?.semester ===
                                      "Ganjil"
                                        ? "border-indigo-100 bg-indigo-50 text-indigo-600"
                                        : "border-blue-100 bg-blue-50 text-blue-600"
                                    }`}
                                  >
                                    {item?.semester ||
                                      "-"}
                                  </span>

                                </td>

                                {/* STATUS */}

                                <td className="border-b border-slate-100 px-5 py-4">

                                  <span
                                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                                      isActive
                                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                        : "border-slate-200 bg-slate-100 text-slate-500"
                                    }`}
                                  >
                                    {isActive ? (
                                      <CheckCircle
                                        size={11}
                                      />
                                    ) : (
                                      <XCircle
                                        size={11}
                                      />
                                    )}

                                    {isActive
                                      ? "Aktif"
                                      : "Tidak Aktif"}
                                  </span>

                                </td>

                                {/* ACTION */}

                                <td className="border-b border-slate-100 px-5 py-4">

                                  <div className="flex flex-wrap items-center justify-end gap-2">

                                    {/* DETAIL */}

                                    <Link
                                      href={`/admin/tahun-ajaran/${item.id}`}
                                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-[#c7dbff] hover:bg-[#eaf1ff] hover:text-[#155DFC]"
                                      title="Detail"
                                    >
                                      <Eye
                                        size={14}
                                      />
                                    </Link>

                                    {/* SET ACTIVE */}

                                    {!isActive && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleSetActive(
                                            item
                                          )
                                        }
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[10px] font-semibold text-emerald-700 transition hover:bg-emerald-100"
                                      >
                                        <Check
                                          size={13}
                                        />
                                        Set Aktif
                                      </button>
                                    )}

                                    {/* EDIT */}

                                    <Link
                                      href={`/admin/tahun-ajaran/edit/${item.id}`}
                                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-[#c7dbff] hover:bg-[#eaf1ff] hover:text-[#155DFC]"
                                      title="Edit"
                                    >
                                      <Edit
                                        size={14}
                                      />
                                    </Link>

                                    {/* DELETE */}

                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleDelete(
                                          item
                                        )
                                      }
                                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                      title="Hapus"
                                    >
                                      <Trash2
                                        size={14}
                                      />
                                    </button>

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

                {/* =================================================
                    PAGINATION
                ================================================== */}

                {filteredData.length > 0 && (
                  <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">

                    <p className="text-[11px] text-slate-500">
                      Menampilkan{" "}
                      <span className="font-semibold text-slate-700">
                        {startIndex + 1}
                      </span>{" "}
                      -{" "}
                      <span className="font-semibold text-slate-700">
                        {Math.min(
                          startIndex +
                            currentItems.length,
                          filteredData.length
                        )}
                      </span>{" "}
                      dari{" "}
                      <span className="font-semibold text-slate-700">
                        {filteredData.length}
                      </span>{" "}
                      data
                    </p>

                    <div className="flex items-center gap-1.5">

                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage(
                            (prev) =>
                              Math.max(
                                1,
                                prev - 1
                              )
                          )
                        }
                        disabled={
                          safeCurrentPage ===
                          1
                        }
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Sebelumnya
                      </button>

                      {Array.from(
                        {
                          length:
                            totalPages,
                        },
                        (_, index) =>
                          index + 1
                      )
                        .slice(
                          Math.max(
                            0,
                            safeCurrentPage -
                              3
                          ),
                          Math.min(
                            totalPages,
                            safeCurrentPage +
                              2
                          )
                        )
                        .map(
                          (page) => (
                            <button
                              key={page}
                              type="button"
                              onClick={() =>
                                setCurrentPage(
                                  page
                                )
                              }
                              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition ${
                                safeCurrentPage ===
                                page
                                  ? "bg-[#155DFC] text-white"
                                  : "text-slate-500 hover:bg-slate-100"
                              }`}
                            >
                              {page}
                            </button>
                          )
                        )}

                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage(
                            (prev) =>
                              Math.min(
                                totalPages,
                                prev + 1
                              )
                          )
                        }
                        disabled={
                          safeCurrentPage ===
                          totalPages
                        }
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Berikutnya
                      </button>

                    </div>

                  </div>
                )}

              </section>

              {/* =================================================
                  INFORMATION
              ================================================== */}

              <section className="rounded-xl border border-[#c7dbff] bg-[#f7f9ff] p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#155DFC] shadow-sm">
                    <Database size={17} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs font-bold text-slate-700">
                      Informasi periode akademik
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-slate-500">
                      {activeYear
                        ? `${activeYear.nama} · ${activeYear.semester} merupakan tahun ajaran aktif yang sedang digunakan oleh sekolah.`
                        : "Belum ada tahun ajaran yang ditetapkan sebagai periode aktif."}
                    </p>

                  </div>

                </div>

              </section>

              {/* FOOTER */}

              <footer className="pb-4 pt-1 text-center">
                <p className="text-[10px] text-slate-400">
                  © 2026 SmartSchool • Tahun Ajaran
                </p>
              </footer>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}