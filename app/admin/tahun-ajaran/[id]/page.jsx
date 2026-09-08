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
  Layers,
  ShieldCheck,
} from "lucide-react";

import { getTahunAjaran } from "../../../../services/tahunAjaran.service";

export default function DetailTahunAjaranPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadDetail = async (isRefresh = false) => {
    try {
      setError("");
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const response = await getTahunAjaran();

      const list = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.data?.data)
            ? response.data.data
            : [];

      const found = list.find((item) => String(item?.id) === String(id));

      if (!found) {
        setData(null);
        setError("Data tahun ajaran tidak ditemukan.");
        return;
      }

      setData(found);
    } catch (err) {
      console.error(err);
      setData(null);
      setError(err instanceof Error ? err.message : "Gagal mengambil detail tahun ajaran.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (id) loadDetail(false);
  }, [id]);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const isActive = data?.status === "aktif";
  const statusLabel = isActive ? "Aktif" : "Tidak Aktif";

  const formatDateTime = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const semesterDescription = useMemo(() => {
    if (data?.semester === "Ganjil") return "Semester pertama pada tahun ajaran.";
    if (data?.semester === "Genap") return "Semester kedua pada tahun ajaran.";
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
          setCollapsed={setIsCollapsed}
        />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Header toggleSidebar={toggleSidebar} notifications={[]} user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }} />
          <main className="flex min-h-0 flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#155DFC] border-t-transparent" />
              <p className="text-sm font-medium text-slate-500">Memuat detail tahun ajaran...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN
  // =========================================================
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
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }}
        />

        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-slate-50/80 to-white">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
            <div className="space-y-8">
              {/* =================================================
                  BREADCRUMB & BACK
              ================================================== */}
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => router.push("/admin/tahun-ajaran")}
                  className="inline-flex items-center gap-1.5 text-slate-500 transition hover:text-[#155DFC]"
                >
                  <ArrowLeft size={16} />
                  <span className="font-medium">Kembali</span>
                </button>
                <span className="text-slate-300">/</span>
                <span className="text-slate-600 font-medium">Detail Tahun Ajaran</span>
              </div>

              {/* =================================================
                  ERROR
              ================================================== */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50/80 p-5 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <AlertCircle size={20} className="text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-red-800">Gagal memuat data</p>
                      <p className="mt-1 text-sm text-red-600">{error}</p>
                    </div>
                    <button
                      onClick={() => router.push("/admin/tahun-ajaran")}
                      className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Kembali
                    </button>
                  </div>
                </div>
              )}

              {data && (
                <>
                  {/* =================================================
                      HEADER CARD
                  ================================================== */}
                  <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] px-6 py-6 sm:px-8 sm:py-7">
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/5 text-white">
                            <CalendarDays size={28} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">Tahun Ajaran</p>
                            <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                              {data.nama}
                            </h1>
                            <p className="mt-1 text-sm text-slate-300">Semester {data.semester}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${
                              isActive
                                ? "bg-emerald-50/90 text-emerald-700 border border-emerald-200/50"
                                : "bg-slate-100/90 text-slate-600 border border-slate-200/50"
                            }`}
                          >
                            {isActive ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                            {statusLabel}
                          </span>
                          <button
                            onClick={() => loadDetail(true)}
                            disabled={refreshing}
                            className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20 disabled:opacity-50"
                          >
                            <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
                            Refresh
                          </button>
                          <Link
                            href={`/admin/tahun-ajaran/edit/${data.id}`}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#155DFC] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0d47c9]"
                          >
                            <Edit size={16} />
                            Edit
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                      <StatItem icon={<CalendarCheck size={18} />} label="Semester" value={data.semester || "-"} />
                      <StatItem
                        icon={isActive ? <CheckCircle2 size={18} className="text-emerald-600" /> : <XCircle size={18} className="text-slate-400" />}
                        label="Status"
                        value={statusLabel}
                        valueClass={isActive ? "text-emerald-600" : "text-slate-600"}
                      />
                      <StatItem icon={<Hash size={18} />} label="ID Tahun Ajaran" value={data.id || "-"} truncate />
                    </div>
                  </div>

                  {/* =================================================
                      DETAIL GRID
                  ================================================== */}
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Informasi Periode */}
                    <DetailCard
                      title="Informasi Periode"
                      icon={<CalendarCheck size={20} />}
                      description="Data utama tahun ajaran"
                    >
                      <DetailRow label="Nama Tahun Ajaran" value={data.nama} />
                      <DetailRow
                        label="Semester"
                        value={
                          <span
                            className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${
                              data.semester === "Ganjil"
                                ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                                : "bg-blue-50 text-blue-700 border border-blue-100"
                            }`}
                          >
                            {data.semester}
                          </span>
                        }
                      />
                      <DetailRow
                        label="Status"
                        value={
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                              isActive
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-slate-100 text-slate-600 border border-slate-200"
                            }`}
                          >
                            {isActive ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                            {statusLabel}
                          </span>
                        }
                      />
                      <DetailRow label="Sekolah" value={data?.sekolah?.nama || "Sekolah Aktif"} />
                      <DetailRow label="ID Sekolah" value={data.sekolahId || data?.sekolah?.id || "-"} breakValue />
                    </DetailCard>

                    {/* Informasi Sistem */}
                    <DetailCard
                      title="Informasi Sistem"
                      icon={<Database size={20} />}
                      description="Metadata & riwayat data"
                    >
                      <DetailRow
                        label={
                          <span className="flex items-center gap-1.5">
                            <Clock3 size={14} className="text-slate-400" /> Dibuat
                          </span>
                        }
                        value={formatDateTime(data.dibuatPada)}
                      />
                      <DetailRow
                        label={
                          <span className="flex items-center gap-1.5">
                            <RefreshCw size={14} className="text-slate-400" /> Diperbarui
                          </span>
                        }
                        value={formatDateTime(data.diperbaruiPada)}
                      />
                      <DetailRow
                        label={
                          <span className="flex items-center gap-1.5">
                            <XCircle size={14} className="text-slate-400" /> Dihapus
                          </span>
                        }
                        value={formatDateTime(data.dihapusPada)}
                      />
                    </DetailCard>
                  </div>

                  {/* =================================================
                      STATUS NOTICE
                  ================================================== */}
                  <div
                    className={`rounded-2xl border p-5 ${
                      isActive
                        ? "border-emerald-200/70 bg-emerald-50/60"
                        : "border-slate-200/70 bg-slate-50/60"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                          isActive ? "bg-white text-emerald-600" : "bg-white text-slate-500"
                        }`}
                      >
                        {isActive ? <CheckCircle2 size={22} /> : <Info size={22} />}
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${isActive ? "text-emerald-800" : "text-slate-700"}`}>
                          {isActive ? "Tahun Ajaran Aktif" : "Tahun Ajaran Tidak Aktif"}
                        </p>
                        <p className={`mt-1 text-sm leading-6 ${isActive ? "text-emerald-700/80" : "text-slate-500"}`}>
                          {isActive
                            ? `${data.nama} semester ${data.semester} sedang digunakan sebagai periode akademik aktif sekolah.`
                            : `${data.nama} semester ${data.semester} saat ini tidak digunakan sebagai periode akademik aktif.`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      ACTIONS
                  ================================================== */}
                  <div className="flex flex-col gap-3 border-t border-slate-200/60 pt-6 sm:flex-row sm:justify-between">
                    <button
                      onClick={() => router.push("/admin/tahun-ajaran")}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:border-slate-300"
                    >
                      <ArrowLeft size={16} />
                      Kembali
                    </button>
                    <Link
                      href={`/admin/tahun-ajaran/edit/${data.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#155DFC] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0d47c9]"
                    >
                      <Edit size={16} />
                      Edit Tahun Ajaran
                    </Link>
                  </div>

                  {/* Footer */}
                  <footer className="pt-6 text-center text-xs text-slate-400 border-t border-slate-200/50">
                    © 2026 SmartSchool • Detail Tahun Ajaran
                  </footer>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// =========================================================
// SUB-COMPONENTS
// =========================================================

function StatItem({ icon, label, value, valueClass = "text-slate-800", truncate = false }) {
  return (
    <div className="flex items-center gap-4 px-6 py-4 sm:py-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-[#155DFC]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className={`mt-0.5 text-sm font-bold ${valueClass} ${truncate ? "truncate" : ""}`}>{value}</p>
      </div>
    </div>
  );
}

function DetailCard({ title, icon, description, children }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-slate-100/80 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf1ff] text-[#155DFC]">
            {icon}
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">{title}</h2>
            <p className="mt-0.5 text-xs text-slate-400">{description}</p>
          </div>
        </div>
      </div>
      <div className="px-5 py-4 sm:px-6 sm:py-5">
        <div className="divide-y divide-slate-100/80">{children}</div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, breakValue = false }) {
  return (
    <div className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <span className="text-xs font-medium text-slate-500">{label}</span>
      <span
        className={`text-sm font-semibold text-slate-700 sm:text-right ${breakValue ? "break-all" : "truncate"} sm:max-w-[60%]`}
      >
        {value || "-"}
      </span>
    </div>
  );
}