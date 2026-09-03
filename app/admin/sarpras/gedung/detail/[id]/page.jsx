"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "../../../../../components/Header";
import Sidebar from "../../../../../components/Sidebar";

import {
  Building,
  ArrowLeft,
  Edit,
  Trash2,
  Layers,
  FileText,
  Info,
  Hash,
  Printer,
  DoorOpen,
  GraduationCap,
  CalendarDays,
} from "lucide-react";

import {
  getGedung,
  getLantaiByGedung,
  deleteGedung,
} from "../../../../../services/infrastruktur.service";

export default function DetailGedungPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const [data, setData] = useState(null);
  const [lantai, setLantai] = useState([]);

  const [error, setError] = useState("");

  /* =========================================================
     FORMAT TANGGAL
  ========================================================= */
  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* =========================================================
     FETCH DETAIL GEDUNG
  ========================================================= */
  useEffect(() => {
    if (!id) return;

    let mounted = true;

    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        setError("");

        /*
         * Endpoint BE belum memiliki:
         * GET /gedung/:id
         *
         * Jadi kita mengambil seluruh gedung,
         * lalu mencari berdasarkan ID.
         */
        const gedungResponse = await getGedung();

        const gedungList =
          gedungResponse?.data ??
          gedungResponse?.result ??
          gedungResponse ??
          [];

        if (!Array.isArray(gedungList)) {
          throw new Error("Format data gedung tidak valid.");
        }

        const found = gedungList.find(
          (item) => String(item.id) === String(id)
        );

        if (!found) {
          if (mounted) {
            setData(null);
          }
          return;
        }

        if (mounted) {
          setData(found);
        }

        /*
         * Ambil lantai + kelas berdasarkan gedung.
         */
        try {
          const lantaiResponse = await getLantaiByGedung(id);

          const lantaiData =
            lantaiResponse?.data ??
            lantaiResponse?.result ??
            lantaiResponse ??
            [];

          if (mounted) {
            setLantai(Array.isArray(lantaiData) ? lantaiData : []);
          }
        } catch (lantaiError) {
          console.error("Error fetch lantai:", lantaiError);

          /*
           * Kalau request lantai gagal, detail gedung
           * tetap bisa ditampilkan.
           */
          if (mounted) {
            setLantai([]);
          }
        }
      } catch (err) {
        console.error("Error fetch detail gedung:", err);

        if (mounted) {
          setError(
            err?.message || "Gagal mengambil detail gedung."
          );
          setData(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchDetail();

    return () => {
      mounted = false;
    };
  }, [id]);

  /* =========================================================
     DELETE GEDUNG
  ========================================================= */
  const handleDelete = async () => {
    if (!data) return;

    const confirmed = window.confirm(
      `Yakin ingin menghapus gedung "${data.nama}"?`
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);

      await deleteGedung(data.id);

      alert("Gedung berhasil dihapus.");

      router.push("/admin/sarpras/gedung");
    } catch (err) {
      console.error("Error hapus gedung:", err);

      alert(
        err?.message ||
          "Gagal menghapus gedung. Pastikan gedung tidak memiliki lantai."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */
  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[#f8fafc]">
        <Sidebar
          active="sarpras"
          setActive={() => {}}
          collapsed={isCollapsed}
          setCollapsed={setIsCollapsed}
        />

        <div className="flex min-w-0 flex-1 flex-col">
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

          <main className="flex-1 p-8">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />

                <p className="mt-4 text-sm text-slate-500">
                  Memuat detail gedung...
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  /* =========================================================
     DATA TIDAK DITEMUKAN / ERROR
  ========================================================= */
  if (!data) {
    return (
      <div className="flex min-h-screen bg-[#f8fafc]">
        <Sidebar
          active="sarpras"
          setActive={() => {}}
          collapsed={isCollapsed}
          setCollapsed={setIsCollapsed}
        />

        <div className="flex min-w-0 flex-1 flex-col">
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

          <main className="flex-1 p-8">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <Building size={32} />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-700">
                  Gedung tidak ditemukan
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {error ||
                    `Data gedung dengan ID #${id} tidak tersedia.`}
                </p>

                <button
                  onClick={() =>
                    router.push("/admin/sarpras/gedung")
                  }
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <ArrowLeft size={16} />
                  Kembali ke Daftar Gedung
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  /* =========================================================
     NORMAL PAGE
  ========================================================= */
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* SIDEBAR */}
      <Sidebar
        active="sarpras"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* HEADER */}
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

        <main className="flex-1 p-3 sm:p-5 lg:p-7 xl:p-8">
          <div className="mx-auto w-full max-w-[1200px] space-y-4 sm:space-y-5 lg:space-y-6">

            {/* =================================================
                BACK BUTTON
            ================================================= */}
            <button
              onClick={() =>
                router.push("/admin/sarpras/gedung")
              }
              className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
            >
              <ArrowLeft
                size={18}
                className="transition-transform group-hover:-translate-x-0.5"
              />

              Kembali ke Daftar Gedung
            </button>

            {/* =================================================
                PAGE HEADER
            ================================================= */}
            <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
              <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-50/70 blur-3xl" />

              <div className="relative flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-6">

                {/* TITLE */}
                <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)] sm:h-14 sm:w-14">
                    <Building
                      size={22}
                      strokeWidth={1.9}
                      className="sm:h-[25px] sm:w-[25px]"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">

                      <h1 className="text-xl font-semibold tracking-[-0.025em] text-slate-900 sm:text-2xl lg:text-[26px]">
                        {data.nama || "Detail Gedung"}
                      </h1>

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-600 sm:px-3 sm:py-1 sm:text-[11px]">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        ID: #{data.id}
                      </span>

                    </div>

                    {/* KODE */}
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                        <Hash size={13} />
                        Kode: {data.kode || "-"}
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
                        <Layers size={13} />
                        {lantai.length} Lantai
                      </span>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex w-full flex-wrap gap-2 sm:flex-row lg:w-auto">

                  {/* EDIT */}
                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        `/admin/sarpras/gedung/edit/${data.id}`
                      )
                    }
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 shadow-[0_2px_5px_rgba(15,23,42,0.05)] transition-all hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 active:scale-[0.98] sm:h-11 sm:px-5"
                  >
                    <Edit
                      size={16}
                      className="sm:h-[17px] sm:w-[17px]"
                    />

                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 shadow-[0_2px_5px_rgba(15,23,42,0.05)] transition-all hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:h-11 sm:px-5"
                  >
                    <Trash2
                      size={16}
                      className="sm:h-[17px] sm:w-[17px]"
                    />

                    {isDeleting ? "Menghapus..." : "Hapus"}
                  </button>

                  {/* PRINT */}
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-[0_7px_18px_rgba(15,23,42,0.16)] transition-all hover:bg-slate-800 hover:shadow-[0_9px_22px_rgba(15,23,42,0.20)] active:scale-[0.98] sm:h-11 sm:px-5"
                  >
                    <Printer
                      size={16}
                      strokeWidth={2.3}
                      className="sm:h-[17px] sm:w-[17px]"
                    />

                    Cetak
                  </button>
                </div>
              </div>
            </section>

            {/* =================================================
                CONTENT
            ================================================= */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

              {/* =================================================
                  LEFT COLUMN
              ================================================= */}
              <div className="space-y-5 lg:col-span-2">

                {/* =================================================
                    INFORMASI DASAR
                ================================================= */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:p-6">

                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <FileText size={16} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Informasi Gedung
                      </p>

                      <p className="text-xs text-slate-400">
                        Informasi gedung berdasarkan data sistem
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                    {/* NAMA */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                      <div className="flex items-center gap-2">
                        <Building
                          size={16}
                          className="text-blue-500"
                        />

                        <p className="text-xs font-medium text-slate-500">
                          Nama Gedung
                        </p>
                      </div>

                      <p className="mt-2 text-sm font-semibold text-slate-800">
                        {data.nama || "-"}
                      </p>
                    </div>

                    {/* KODE */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                      <div className="flex items-center gap-2">
                        <Hash
                          size={16}
                          className="text-blue-500"
                        />

                        <p className="text-xs font-medium text-slate-500">
                          Kode Gedung
                        </p>
                      </div>

                      <p className="mt-2 text-sm font-semibold text-slate-800">
                        {data.kode || "-"}
                      </p>
                    </div>

                    {/* LANTAI */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                      <div className="flex items-center gap-2">
                        <Layers
                          size={16}
                          className="text-indigo-500"
                        />

                        <p className="text-xs font-medium text-slate-500">
                          Jumlah Lantai
                        </p>
                      </div>

                      <p className="mt-2 text-sm font-semibold text-slate-800">
                        {lantai.length} Lantai
                      </p>
                    </div>

                    {/* ID */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                      <div className="flex items-center gap-2">
                        <Info
                          size={16}
                          className="text-slate-400"
                        />

                        <p className="text-xs font-medium text-slate-500">
                          ID Gedung
                        </p>
                      </div>

                      <p className="mt-2 break-all text-sm font-semibold text-slate-800">
                        {data.id}
                      </p>
                    </div>
                  </div>
                </section>

                {/* =================================================
                    DAFTAR LANTAI & KELAS
                ================================================= */}
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)]">

                  <div className="border-b border-slate-100 px-5 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                        <DoorOpen size={16} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Daftar Lantai & Kelas
                        </p>

                        <p className="text-xs text-slate-400">
                          Total {lantai.length} lantai
                        </p>
                      </div>

                    </div>
                  </div>

                  {lantai.length === 0 ? (
                    <div className="px-6 py-12 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <Layers size={25} />
                      </div>

                      <p className="mt-4 text-sm font-medium text-slate-600">
                        Belum ada lantai
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Gedung ini belum memiliki data lantai.
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">

                      {lantai.map((item, index) => {
                        const kelas = Array.isArray(item.kelas)
                          ? item.kelas
                          : [];

                        return (
                          <div
                            key={item.id || index}
                            className="p-5 sm:p-6"
                          >

                            {/* LANTAI HEADER */}
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                              <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                  <Layers size={18} />
                                </div>

                                <div>
                                  <p className="text-sm font-semibold text-slate-800">
                                    {item.nama ||
                                      `Lantai ${index + 1}`}
                                  </p>

                                  <p className="text-xs text-slate-400">
                                    {kelas.length} kelas
                                  </p>
                                </div>

                              </div>

                              <span className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                                <GraduationCap size={13} />
                                {kelas.length} Kelas
                              </span>

                            </div>

                            {/* KELAS */}
                            {kelas.length > 0 ? (
                              <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
                                <table className="w-full border-collapse text-sm">

                                  <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50/80">

                                      <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                                        Nama Kelas
                                      </th>

                                      <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                                        Tingkat
                                      </th>

                                    </tr>
                                  </thead>

                                  <tbody className="divide-y divide-slate-100">

                                    {kelas.map((kelasItem, kelasIndex) => (
                                      <tr
                                        key={
                                          kelasItem.id ||
                                          kelasIndex
                                        }
                                        className="transition-colors hover:bg-slate-50/70"
                                      >

                                        <td className="px-4 py-3">
                                          <div className="flex items-center gap-2">

                                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                              <GraduationCap
                                                size={14}
                                              />
                                            </div>

                                            <span className="text-sm font-medium text-slate-800">
                                              {kelasItem.nama ||
                                                "-"}
                                            </span>

                                          </div>
                                        </td>

                                        <td className="px-4 py-3">
                                          <span className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                                            {kelasItem.tingkat ||
                                              "-"}
                                          </span>
                                        </td>

                                      </tr>
                                    ))}

                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 px-4 py-5 text-center">
                                <p className="text-xs text-slate-400">
                                  Belum ada kelas pada lantai ini.
                                </p>
                              </div>
                            )}

                          </div>
                        );
                      })}

                    </div>
                  )}
                </section>
              </div>

              {/* =================================================
                  RIGHT COLUMN
              ================================================= */}
              <div className="space-y-5">

                {/* =================================================
                    INFO CARD
                ================================================= */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:p-6">

                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <Info size={16} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Informasi Gedung
                      </p>
                    </div>

                  </div>

                  <div className="mt-4 space-y-4">

                    {/* ID */}
                    <div className="flex items-start gap-3">
                      <Hash
                        size={16}
                        className="mt-0.5 shrink-0 text-slate-400"
                      />

                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500">
                          ID Gedung
                        </p>

                        <p className="mt-0.5 break-all text-sm font-semibold text-slate-800">
                          {data.id}
                        </p>
                      </div>
                    </div>

                    {/* KODE */}
                    <div className="flex items-start gap-3">
                      <Building
                        size={16}
                        className="mt-0.5 shrink-0 text-slate-400"
                      />

                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500">
                          Kode Gedung
                        </p>

                        <p className="text-sm font-semibold text-slate-800">
                          {data.kode || "-"}
                        </p>
                      </div>
                    </div>

                    {/* JUMLAH LANTAI */}
                    <div className="flex items-start gap-3">
                      <Layers
                        size={16}
                        className="mt-0.5 shrink-0 text-slate-400"
                      />

                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500">
                          Jumlah Lantai
                        </p>

                        <p className="text-sm font-semibold text-slate-800">
                          {lantai.length} Lantai
                        </p>
                      </div>
                    </div>

                    {/* JUMLAH KELAS */}
                    <div className="flex items-start gap-3">
                      <GraduationCap
                        size={16}
                        className="mt-0.5 shrink-0 text-slate-400"
                      />

                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500">
                          Total Kelas
                        </p>

                        <p className="text-sm font-semibold text-slate-800">
                          {lantai.reduce(
                            (total, item) =>
                              total +
                              (Array.isArray(item.kelas)
                                ? item.kelas.length
                                : 0),
                            0
                          )}{" "}
                          Kelas
                        </p>
                      </div>
                    </div>

                  </div>
                </section>

                {/* =================================================
                    TIMESTAMP
                ================================================= */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:p-6">

                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                      <CalendarDays size={16} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Informasi Waktu
                      </p>
                    </div>

                  </div>

                  <div className="mt-4 space-y-3">

                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-slate-500">
                        Dibuat
                      </span>

                      <span className="text-sm font-medium text-slate-700">
                        {formatDate(data.createdAt)}
                      </span>
                    </div>

                    <div className="border-t border-slate-100 pt-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-slate-500">
                          Terakhir Diperbarui
                        </span>

                        <span className="text-sm font-medium text-slate-700">
                          {formatDate(data.updatedAt)}
                        </span>
                      </div>
                    </div>

                  </div>
                </section>

                {/* =================================================
                    FOTO GEDUNG
                ================================================= */}
                {data.fotoUrl && (
                  <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)]">

                    <div className="border-b border-slate-100 p-5 sm:p-6">
                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                          <Building size={16} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            Foto Gedung
                          </p>
                        </div>

                      </div>
                    </div>

                    <div className="p-4">
                      <img
                        src={data.fotoUrl}
                        alt={data.nama || "Foto Gedung"}
                        className="h-auto max-h-[280px] w-full rounded-xl object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />
                    </div>

                  </section>
                )}

                {/* =================================================
                    ACTION BUTTONS
                ================================================= */}
                <div className="grid grid-cols-2 gap-3">

                  <button
                    onClick={() =>
                      router.push(
                        `/admin/sarpras/gedung/edit/${data.id}`
                      )
                    }
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-600 transition-all hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
                  >
                    <Edit size={16} />
                    Edit
                  </button>

                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-600 transition-all hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 size={16} />

                    {isDeleting ? "Menghapus..." : "Hapus"}
                  </button>

                </div>
              </div>
            </div>

            {/* =================================================
                FOOTER
            ================================================= */}
            <div className="border-t border-slate-200/70 pt-4 text-center sm:pt-5">
              <p className="text-xs text-slate-400">
                © 2026 SmartSchool • Detail Gedung -
                Sarana & Prasarana
              </p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}