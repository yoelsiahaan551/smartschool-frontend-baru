"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

import {
  CalendarDays,
  ArrowLeft,
  Edit,
  CheckCircle2,
  XCircle,
  Clock3,
  Database,
  School,
  Hash,
  CalendarCheck,
  RefreshCw,
  AlertCircle,
  Info,
} from "lucide-react";

import { getTahunAjaran } from "../../../../services/tahunAjaran.service";

export default function DetailTahunAjaranPage() {
  // =========================================================
  // ROUTER
  // =========================================================

  const router = useRouter();
  const params = useParams();

  const id = params?.id;

  // =========================================================
  // STATE
  // =========================================================

  const [isCollapsed, setIsCollapsed] =
    useState(false);

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  // =========================================================
  // LOAD DETAIL
  // =========================================================

  const loadDetail = async (
    isRefresh = false
  ) => {
    try {
      setError("");

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response =
        await getTahunAjaran();

      console.log(
        "========== DETAIL TAHUN AJARAN =========="
      );

      console.log(
        "Response:",
        response
      );

      console.log(
        "ID:",
        id
      );

      console.log(
        "========================================="
      );

      const list = Array.isArray(
        response
      )
        ? response
        : Array.isArray(
            response?.data
          )
        ? response.data
        : Array.isArray(
            response?.data?.data
          )
        ? response.data.data
        : [];

      const found = list.find(
        (item) =>
          String(item?.id) ===
          String(id)
      );

      if (!found) {
        setData(null);

        setError(
          "Data tahun ajaran tidak ditemukan."
        );

        return;
      }

      setData(found);
    } catch (err) {
      console.error(
        "Gagal mengambil detail tahun ajaran:",
        err
      );

      setData(null);

      setError(
        err instanceof Error
          ? err.message
          : "Gagal mengambil detail tahun ajaran."
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
    if (id) {
      loadDetail(false);
    }
  }, [id]);

  // =========================================================
  // SIDEBAR
  // =========================================================

  const toggleSidebar = () => {
    setIsCollapsed(
      (prev) => !prev
    );
  };

  // =========================================================
  // STATUS
  // =========================================================

  const isActive =
    data?.status === "aktif";

  const statusLabel = isActive
    ? "Aktif"
    : "Tidak Aktif";

  // =========================================================
  // DATE FORMAT
  // =========================================================

  const formatDate = (value) => {
    if (!value) {
      return "-";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "-";
    }

    return date.toLocaleDateString(
      "id-ID",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  const formatDateTime = (value) => {
    if (!value) {
      return "-";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "-";
    }

    return date.toLocaleString(
      "id-ID",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // =========================================================
  // SEMESTER DESCRIPTION
  // =========================================================

  const semesterDescription =
    useMemo(() => {
      if (
        data?.semester ===
        "Ganjil"
      ) {
        return "Semester pertama pada tahun ajaran.";
      }

      if (
        data?.semester ===
        "Genap"
      ) {
        return "Semester kedua pada tahun ajaran.";
      }

      return "Periode semester akademik.";
    }, [data]);

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
          setCollapsed={
            setIsCollapsed
          }
        />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Header
            toggleSidebar={
              toggleSidebar
            }
            notifications={[]}
            user={{
              name: "Admin Sekolah",
              email:
                "admin@smartschool.com",
              avatar: "AD",
            }}
          />

          <main className="flex min-h-0 flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#155DFC] border-t-transparent" />

              <p className="text-sm font-medium text-slate-500">
                Memuat detail tahun ajaran...
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
        setCollapsed={
          setIsCollapsed
        }
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* HEADER */}

        <Header
          toggleSidebar={
            toggleSidebar
          }
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email:
              "admin@smartschool.com",
            avatar: "AD",
          }}
        />

        {/* MAIN */}

        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">

          <div className="mx-auto w-full max-w-[1280px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 xl:px-10">

            <div className="space-y-6">

              {/* =================================================
                  BREADCRUMB
              ================================================== */}

              <button
                type="button"
                onClick={() =>
                  router.push(
                    "/admin/tahun-ajaran"
                  )
                }
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-[#155DFC]"
              >
                <ArrowLeft size={15} />
                Kembali ke Tahun Ajaran
              </button>

              {/* =================================================
                  HEADER
              ================================================== */}

              <section className="rounded-xl border border-slate-200 bg-white shadow-sm">

                <div className="p-5 sm:p-6">

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex min-w-0 items-start gap-3">

                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                          isActive
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-[#eaf1ff] text-[#155DFC]"
                        }`}
                      >
                        <CalendarDays
                          size={22}
                        />
                      </div>

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
                            {data?.nama ||
                              "Detail Tahun Ajaran"}
                          </h1>

                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                              isActive
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                : "border-slate-200 bg-slate-100 text-slate-500"
                            }`}
                          >
                            {isActive ? (
                              <CheckCircle2
                                size={11}
                              />
                            ) : (
                              <XCircle
                                size={11}
                              />
                            )}

                            {statusLabel}
                          </span>

                        </div>

                        <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                          Detail informasi periode akademik sekolah.
                        </p>

                      </div>

                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">

                      <button
                        type="button"
                        onClick={() =>
                          loadDetail(true)
                        }
                        disabled={
                          refreshing
                        }
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
                        href={`/admin/tahun-ajaran/edit/${data?.id}`}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#155DFC] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0d47c9]"
                      >
                        <Edit size={14} />
                        Edit Tahun Ajaran
                      </Link>

                    </div>

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
                        Data tidak dapat dimuat
                      </p>

                      <p className="mt-1 text-xs leading-5 text-red-600">
                        {error}
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          "/admin/tahun-ajaran"
                        )
                      }
                      className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      Kembali
                    </button>

                  </div>

                </section>
              )}

              {/* =================================================
                  DETAIL
              ================================================== */}

              {data && (
                <>
                  {/* =================================================
                      STATUS OVERVIEW
                  ================================================== */}

                  <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    {/* STATUS */}

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                      <div className="flex items-start justify-between gap-4">

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Status Periode
                          </p>

                          <p
                            className={`mt-2 text-xl font-bold ${
                              isActive
                                ? "text-emerald-600"
                                : "text-slate-700"
                            }`}
                          >
                            {statusLabel}
                          </p>

                          <p className="mt-1 text-[11px] text-slate-400">
                            Status tahun ajaran saat ini
                          </p>
                        </div>

                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            isActive
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {isActive ? (
                            <CheckCircle2
                              size={19}
                            />
                          ) : (
                            <XCircle
                              size={19}
                            />
                          )}
                        </div>

                      </div>

                    </div>

                    {/* SEMESTER */}

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                      <div className="flex items-start justify-between gap-4">

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Semester
                          </p>

                          <p className="mt-2 text-xl font-bold text-slate-800">
                            {data.semester ||
                              "-"}
                          </p>

                          <p className="mt-1 text-[11px] text-slate-400">
                            {semesterDescription}
                          </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf1ff] text-[#155DFC]">
                          <CalendarDays
                            size={19}
                          />
                        </div>

                      </div>

                    </div>

                    {/* ID */}

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">

                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            ID Tahun Ajaran
                          </p>

                          <p className="mt-2 truncate text-sm font-bold text-slate-800">
                            {data.id ||
                              "-"}
                          </p>

                          <p className="mt-1 text-[11px] text-slate-400">
                            Identitas data pada sistem
                          </p>

                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                          <Hash size={18} />
                        </div>

                      </div>

                    </div>

                  </section>

                  {/* =================================================
                      INFORMATION GRID
                  ================================================== */}

                  <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">

                    {/* INFORMASI PERIODE */}

                    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

                      <div className="border-b border-slate-100 px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eaf1ff] text-[#155DFC]">
                            <CalendarCheck
                              size={17}
                            />
                          </div>

                          <div>
                            <h2 className="text-sm font-bold text-slate-800">
                              Informasi Periode
                            </h2>

                            <p className="mt-1 text-[11px] text-slate-400">
                              Informasi utama tahun ajaran.
                            </p>
                          </div>

                        </div>

                      </div>

                      <div className="p-5">

                        <div className="divide-y divide-slate-100">

                          {/* NAMA */}

                          <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5 first:pt-0">

                            <span className="text-xs text-slate-400">
                              Tahun Ajaran
                            </span>

                            <span className="text-sm font-semibold text-slate-700 sm:text-right">
                              {data.nama ||
                                "-"}
                            </span>

                          </div>

                          {/* SEMESTER */}

                          <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">

                            <span className="text-xs text-slate-400">
                              Semester
                            </span>

                            <span
                              className={`inline-flex w-fit rounded-md border px-2.5 py-1 text-[10px] font-semibold sm:ml-auto ${
                                data.semester ===
                                "Ganjil"
                                  ? "border-indigo-100 bg-indigo-50 text-indigo-600"
                                  : "border-blue-100 bg-blue-50 text-blue-600"
                              }`}
                            >
                              {data.semester ||
                                "-"}
                            </span>

                          </div>

                          {/* STATUS */}

                          <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">

                            <span className="text-xs text-slate-400">
                              Status
                            </span>

                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold sm:ml-auto ${
                                isActive
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                  : "border-slate-200 bg-slate-100 text-slate-500"
                              }`}
                            >
                              {isActive ? (
                                <CheckCircle2
                                  size={11}
                                />
                              ) : (
                                <XCircle
                                  size={11}
                                />
                              )}

                              {statusLabel}
                            </span>

                          </div>

                          {/* SEKOLAH */}

                          <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">

                            <span className="text-xs text-slate-400">
                              Sekolah
                            </span>

                            <span className="text-sm font-semibold text-slate-700 sm:text-right">
                              {data?.sekolah
                                ?.nama ||
                                "Sekolah Aktif"}
                            </span>

                          </div>

                          {/* SCHOOL ID */}

                          <div className="flex flex-col gap-1 py-3 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-5">

                            <span className="text-xs text-slate-400">
                              Sekolah ID
                            </span>

                            <span className="break-all text-xs font-medium text-slate-600 sm:text-right">
                              {data.sekolahId ||
                                data?.sekolah
                                  ?.id ||
                                "-"}
                            </span>

                          </div>

                        </div>

                      </div>

                    </div>

                    {/* INFORMASI SISTEM */}

                    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

                      <div className="border-b border-slate-100 px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                            <Database
                              size={17}
                            />
                          </div>

                          <div>
                            <h2 className="text-sm font-bold text-slate-800">
                              Informasi Sistem
                            </h2>

                            <p className="mt-1 text-[11px] text-slate-400">
                              Metadata data tahun ajaran.
                            </p>
                          </div>

                        </div>

                      </div>

                      <div className="p-5">

                        <div className="divide-y divide-slate-100">

                          {/* CREATED */}

                          <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5 first:pt-0">

                            <div className="flex items-center gap-2">
                              <Clock3
                                size={14}
                                className="text-slate-400"
                              />

                              <span className="text-xs text-slate-400">
                                Dibuat Pada
                              </span>
                            </div>

                            <span className="text-xs font-medium text-slate-600 sm:text-right">
                              {formatDateTime(
                                data.dibuatPada
                              )}
                            </span>

                          </div>

                          {/* UPDATED */}

                          <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">

                            <div className="flex items-center gap-2">
                              <RefreshCw
                                size={14}
                                className="text-slate-400"
                              />

                              <span className="text-xs text-slate-400">
                                Diperbarui Pada
                              </span>
                            </div>

                            <span className="text-xs font-medium text-slate-600 sm:text-right">
                              {formatDateTime(
                                data.diperbaruiPada
                              )}
                            </span>

                          </div>

                          {/* DELETED */}

                          <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5 last:pb-0">

                            <div className="flex items-center gap-2">
                              <XCircle
                                size={14}
                                className="text-slate-400"
                              />

                              <span className="text-xs text-slate-400">
                                Dihapus Pada
                              </span>
                            </div>

                            <span className="text-xs font-medium text-slate-600 sm:text-right">
                              {formatDateTime(
                                data.dihapusPada
                              )}
                            </span>

                          </div>

                        </div>

                      </div>

                    </div>

                  </section>

                  {/* =================================================
                      ACTIVE NOTICE
                  ================================================== */}

                  <section
                    className={`rounded-xl border p-4 ${
                      isActive
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-[#c7dbff] bg-[#f7f9ff]"
                    }`}
                  >

                    <div className="flex items-start gap-3">

                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          isActive
                            ? "bg-white text-emerald-600"
                            : "bg-white text-[#155DFC]"
                        }`}
                      >
                        {isActive ? (
                          <CheckCircle2
                            size={17}
                          />
                        ) : (
                          <Info
                            size={17}
                          />
                        )}
                      </div>

                      <div className="min-w-0">

                        <p
                          className={`text-xs font-bold ${
                            isActive
                              ? "text-emerald-800"
                              : "text-slate-700"
                          }`}
                        >
                          {isActive
                            ? "Tahun ajaran sedang aktif"
                            : "Tahun ajaran tidak aktif"}
                        </p>

                        <p
                          className={`mt-1 text-[11px] leading-5 ${
                            isActive
                              ? "text-emerald-700/80"
                              : "text-slate-500"
                          }`}
                        >
                          {isActive
                            ? `${data.nama} semester ${data.semester} sedang digunakan sebagai periode akademik aktif sekolah.`
                            : `${data.nama} semester ${data.semester} saat ini tidak digunakan sebagai periode akademik aktif.`}
                        </p>

                      </div>

                    </div>

                  </section>

                  {/* =================================================
                      ACTIONS
                  ================================================== */}

                  <section className="flex flex-col gap-2 border-t border-slate-200 pt-5 sm:flex-row sm:justify-between">

                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          "/admin/tahun-ajaran"
                        )
                      }
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                      <ArrowLeft
                        size={14}
                      />
                      Kembali
                    </button>

                    <Link
                      href={`/admin/tahun-ajaran/edit/${data.id}`}
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#155DFC] px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0d47c9]"
                    >
                      <Edit size={14} />
                      Edit Tahun Ajaran
                    </Link>

                  </section>
                </>
              )}

              {/* FOOTER */}

              <footer className="py-4 text-center">
                <p className="text-[10px] text-slate-400">
                  © 2026 SmartSchool • Detail Tahun Ajaran
                </p>
              </footer>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}