"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

import {
  ClipboardCheck,
  Users,
  CheckCircle2,
  Stethoscope,
  FileText,
  XCircle,
  CalendarDays,
  History,
  RefreshCw,
  AlertCircle,
  MapPin,
  ScanLine,
  Camera,
  UserCheck,
  Plus,
} from "lucide-react";

import { getAbsensiKelas } from "../../../services/absensi.service";

const STATUS_CONFIG = {
  hadir: {
    label: "Hadir",
    icon: CheckCircle2,
    active:
      "bg-emerald-500 text-white border-emerald-500",
    badge:
      "bg-emerald-50 text-emerald-600 border-emerald-200",
  },

  sakit: {
    label: "Sakit",
    icon: Stethoscope,
    active:
      "bg-amber-500 text-white border-amber-500",
    badge:
      "bg-amber-50 text-amber-600 border-amber-200",
  },

  izin: {
    label: "Izin",
    icon: FileText,
    active:
      "bg-blue-500 text-white border-blue-500",
    badge:
      "bg-blue-50 text-blue-600 border-blue-200",
  },

  alpha: {
    label: "Alpha",
    icon: XCircle,
    active:
      "bg-rose-500 text-white border-rose-500",
    badge:
      "bg-rose-50 text-rose-600 border-rose-200",
  },
};

const METODE_CONFIG = {
  lokasi: {
    label: "Lokasi",
    icon: MapPin,
  },

  barcode: {
    label: "Barcode",
    icon: ScanLine,
  },

  face: {
    label: "Face",
    icon: Camera,
  },

  manual: {
    label: "Manual",
    icon: UserCheck,
  },
};

function formatTanggal(tanggal) {
  if (!tanggal) return "-";

  const date = new Date(tanggal);

  if (Number.isNaN(date.getTime())) {
    return tanggal;
  }

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatJam(tanggal) {
  if (!tanggal) return "-";

  const date = new Date(tanggal);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function normalizeAbsensi(data) {
  if (!Array.isArray(data)) {
    return [];
  }

  return data;
}

export default function GuruAbsensiPage() {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [kelasId, setKelasId] = useState("");

  const [tanggal, setTanggal] = useState("");

  const [absensi, setAbsensi] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [lastUpdated, setLastUpdated] = useState(null);

  const notifications = [
    {
      id: 1,
      title: "Rapat Wali Kelas",
      desc: "Dikirim 2 jam lalu",
      read: false,
    },
    {
      id: 2,
      title: "Batas Input Nilai Rapor",
      desc: "Dikirim 5 jam lalu",
      read: false,
    },
  ];

  /**
   * Ambil kelasId dari query URL.
   *
   * Contoh:
   * /guru/absensi?kelasId=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(
      window.location.search,
    );

    const id = params.get("kelasId");

    if (id) {
      setKelasId(id);
    }
  }, []);

  /**
   * FETCH ABSENSI KELAS
   *
   * GET /api/v1/absensi/kelas/:kelasId
   */
  const fetchAbsensi = useCallback(async () => {
    if (!kelasId) {
      setAbsensi([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getAbsensiKelas(
        kelasId,
        tanggal || null,
      );

      setAbsensi(normalizeAbsensi(data));

      setLastUpdated(new Date());
    } catch (err) {
      console.error(
        "Error fetch absensi kelas:",
        err,
      );

      setAbsensi([]);

      setError(
        err?.message ||
          "Gagal mengambil data absensi kelas.",
      );
    } finally {
      setLoading(false);
    }
  }, [kelasId, tanggal]);

  useEffect(() => {
    fetchAbsensi();
  }, [fetchAbsensi]);

  /**
   * REKAP DATA DARI RESPONSE BE
   */
  const rekap = useMemo(() => {
    const result = {
      total: absensi.length,
      hadir: 0,
      sakit: 0,
      izin: 0,
      alpha: 0,
    };

    absensi.forEach((item) => {
      const status = String(
        item?.status || "",
      ).toLowerCase();

      if (status === "hadir") {
        result.hadir += 1;
      }

      if (status === "sakit") {
        result.sakit += 1;
      }

      if (status === "izin") {
        result.izin += 1;
      }

      if (status === "alpha") {
        result.alpha += 1;
      }
    });

    return result;
  }, [absensi]);

  /**
   * Tanggal yang tersedia dari BE
   */
  const riwayatTanggal = useMemo(() => {
    const map = new Map();

    absensi.forEach((item) => {
      if (!item?.tanggal) return;

      const key = String(item.tanggal);

      if (!map.has(key)) {
        map.set(key, {
          tanggal: item.tanggal,
          jumlah: 0,
        });
      }

      map.get(key).jumlah += 1;
    });

    return Array.from(map.values()).sort(
      (a, b) =>
        new Date(b.tanggal) -
        new Date(a.tanggal),
    );
  }, [absensi]);

  /**
   * Data ditampilkan sesuai response BE
   */
  const daftarAbsensi = useMemo(() => {
    return [...absensi].sort(
      (a, b) =>
        new Date(
          b?.dibuatPada ||
            b?.tanggal ||
            0,
        ) -
        new Date(
          a?.dibuatPada ||
            a?.tanggal ||
            0,
        ),
    );
  }, [absensi]);

  /**
   * Pilih tanggal dari riwayat
   */
  const pilihTanggal = (value) => {
    if (!value) return;

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return;
    }

    const yyyy = date.getFullYear();

    const mm = String(
      date.getMonth() + 1,
    ).padStart(2, "0");

    const dd = String(
      date.getDate(),
    ).padStart(2, "0");

    setTanggal(
      `${yyyy}-${mm}-${dd}`,
    );
  };

  /**
   * BUTTON TAMBAH
   *
   * Membuka:
   * /guru/absensi/tambah?kelasId=UUID
   *
   * kelasId diteruskan supaya halaman tambah
   * bisa langsung menggunakan kelas yang sedang dipilih.
   */
  const handleTambahAbsensi = () => {
    if (!kelasId) {
      setError(
        "Pilih atau masukkan Kelas ID terlebih dahulu.",
      );
      return;
    }

    router.push(
      `/guru/absensi/tambah?kelasId=${encodeURIComponent(
        kelasId,
      )}`,
    );
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* SIDEBAR */}
      <Sidebar
        active="absensi"
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={() =>
          setSidebarOpen((prev) => !prev)
        }
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <Header
          toggleSidebar={() =>
            setSidebarOpen((prev) => !prev)
          }
          notifications={notifications}
          user={{
            name: "Guru",
            email: "guru@smartschool.com",
            avatar: "G",
          }}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full space-y-6">

            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-600 text-white shadow-sm flex-shrink-0">
                    <ClipboardCheck size={18} />
                  </div>

                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">
                    Absensi
                  </h1>
                </div>

                <p className="text-sm text-slate-500 mt-1 ml-[42px]">
                  Data absensi siswa berdasarkan kelas
                  dari sistem.
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-2">

                {/* TAMBAH */}
                <button
                  type="button"
                  onClick={handleTambahAbsensi}
                  disabled={!kelasId}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  <Plus size={16} />

                  Tambah Absensi
                </button>

                {/* REFRESH */}
                <button
                  type="button"
                  onClick={fetchAbsensi}
                  disabled={
                    loading || !kelasId
                  }
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <RefreshCw
                    size={15}
                    className={
                      loading
                        ? "animate-spin"
                        : ""
                    }
                  />

                  Refresh
                </button>
              </div>
            </div>

            {/* FILTER */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
              <div className="flex flex-col lg:flex-row gap-3">

                {/* KELAS ID */}
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">
                    Kelas ID
                  </label>

                  <input
                    type="text"
                    value={kelasId}
                    onChange={(e) =>
                      setKelasId(
                        e.target.value,
                      )
                    }
                    placeholder="Masukkan UUID kelas"
                    className="w-full px-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>

                {/* TANGGAL */}
                <div className="w-full lg:w-56">
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">
                    Tanggal
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />

                    <input
                      type="date"
                      value={tanggal}
                      onChange={(e) =>
                        setTanggal(
                          e.target.value,
                        )
                      }
                      className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* RESET */}
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() =>
                      setTanggal("")
                    }
                    className="w-full lg:w-auto px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Semua Tanggal
                  </button>
                </div>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-200 rounded-xl">
                <AlertCircle
                  size={18}
                  className="text-rose-500 mt-0.5 flex-shrink-0"
                />

                <div>
                  <p className="text-sm font-medium text-rose-700">
                    Gagal mengambil data absensi
                  </p>

                  <p className="text-xs text-rose-600 mt-1">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* BELUM ADA KELAS ID */}
            {!kelasId && !error && (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-50 flex items-center justify-center">
                  <Users
                    size={20}
                    className="text-blue-500"
                  />
                </div>

                <h2 className="text-sm font-semibold text-slate-700">
                  Kelas belum dipilih
                </h2>

                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  Masukkan UUID kelas pada kolom
                  Kelas ID untuk mengambil data
                  absensi dari backend.
                </p>
              </div>
            )}

            {/* LOADING */}
            {loading && (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                <RefreshCw
                  size={24}
                  className="mx-auto text-blue-500 animate-spin"
                />

                <p className="text-sm text-slate-500 mt-3">
                  Mengambil data absensi...
                </p>
              </div>
            )}

            {/* CONTENT */}
            {!loading &&
              kelasId &&
              !error && (
                <>
                  {/* SUMMARY */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">

                    {/* TOTAL */}
                    <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3">
                      <div className="p-2 rounded-lg border bg-slate-100 text-slate-500 border-slate-200">
                        <Users size={16} />
                      </div>

                      <div>
                        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                          Total
                        </p>

                        <p className="text-lg font-bold text-slate-800">
                          {rekap.total}
                        </p>
                      </div>
                    </div>

                    {/* STATUS */}
                    {Object.entries(
                      STATUS_CONFIG,
                    ).map(
                      ([
                        key,
                        config,
                      ]) => {
                        const Icon =
                          config.icon;

                        return (
                          <div
                            key={key}
                            className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-sm flex items-center gap-3"
                          >
                            <div
                              className={`p-2 rounded-lg border ${config.badge}`}
                            >
                              <Icon size={16} />
                            </div>

                            <div>
                              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                                {config.label}
                              </p>

                              <p className="text-lg font-bold text-slate-800">
                                {
                                  rekap[
                                    key
                                  ]
                                }
                              </p>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>

                  {/* DATA ABSENSI */}
                  <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-5 border-b border-slate-100">
                      <div>
                        <h2 className="text-sm font-semibold text-slate-800">
                          Data Absensi Kelas
                        </h2>

                        <p className="text-xs text-slate-400 mt-0.5">
                          {tanggal
                            ? `Tanggal ${formatTanggal(
                                tanggal,
                              )}`
                            : "Seluruh data absensi kelas"}
                        </p>
                      </div>

                      {lastUpdated && (
                        <span className="text-[11px] text-slate-400">
                          Diperbarui{" "}
                          {formatJam(
                            lastUpdated,
                          )}
                        </span>
                      )}
                    </div>

                    {daftarAbsensi.length ===
                    0 ? (
                      <div className="p-10 text-center">
                        <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
                          <ClipboardCheck
                            size={20}
                            className="text-slate-400"
                          />
                        </div>

                        <p className="text-sm font-medium text-slate-600 mt-3">
                          Belum ada data absensi
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          Tidak ada record absensi
                          yang dikembalikan backend
                          untuk filter ini.
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px]">
                          <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/70">
                              <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                Siswa
                              </th>

                              <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                Tanggal
                              </th>

                              <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                Status
                              </th>

                              <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                Metode
                              </th>

                              <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                Keterangan
                              </th>
                            </tr>
                          </thead>

                          <tbody className="divide-y divide-slate-100">
                            {daftarAbsensi.map(
                              (
                                item,
                                index,
                              ) => {
                                const status =
                                  String(
                                    item?.status ||
                                      "",
                                  ).toLowerCase();

                                const config =
                                  STATUS_CONFIG[
                                    status
                                  ];

                                const StatusIcon =
                                  config?.icon ||
                                  AlertCircle;

                                const metode =
                                  String(
                                    item?.metode ||
                                      "",
                                  ).toLowerCase();

                                const metodeConfig =
                                  METODE_CONFIG[
                                    metode
                                  ];

                                const MetodeIcon =
                                  metodeConfig?.icon ||
                                  ClipboardCheck;

                                const siswa =
                                  item?.pengguna;

                                return (
                                  <tr
                                    key={
                                      item?.id ||
                                      index
                                    }
                                    className="hover:bg-slate-50/60 transition-colors"
                                  >
                                    {/* SISWA */}
                                    <td className="px-5 py-4">
                                      <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                          <UserCheck
                                            size={
                                              16
                                            }
                                          />
                                        </div>

                                        <div className="min-w-0">
                                          <p className="text-sm font-medium text-slate-800 truncate">
                                            {siswa?.namaLengkap ||
                                              "-"}
                                          </p>

                                          <p className="text-[11px] text-slate-400">
                                            NISN:{" "}
                                            {siswa?.nisn ||
                                              "-"}
                                          </p>
                                        </div>
                                      </div>
                                    </td>

                                    {/* TANGGAL */}
                                    <td className="px-5 py-4">
                                      <div>
                                        <p className="text-xs font-medium text-slate-700">
                                          {formatTanggal(
                                            item?.tanggal,
                                          )}
                                        </p>

                                        {item?.dibuatPada && (
                                          <p className="text-[11px] text-slate-400 mt-0.5">
                                            {formatJam(
                                              item.dibuatPada,
                                            )}
                                          </p>
                                        )}
                                      </div>
                                    </td>

                                    {/* STATUS */}
                                    <td className="px-5 py-4">
                                      <span
                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-full border ${
                                          config?.badge ||
                                          "bg-slate-50 text-slate-500 border-slate-200"
                                        }`}
                                      >
                                        <StatusIcon
                                          size={
                                            12
                                          }
                                        />

                                        {config?.label ||
                                          item?.status ||
                                          "-"}
                                      </span>
                                    </td>

                                    {/* METODE */}
                                    <td className="px-5 py-4">
                                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                                        <MetodeIcon
                                          size={
                                            13
                                          }
                                          className="text-slate-400"
                                        />

                                        {metodeConfig?.label ||
                                          item?.metode ||
                                          "-"}
                                      </span>
                                    </td>

                                    {/* KETERANGAN */}
                                    <td className="px-5 py-4">
                                      <span className="text-xs text-slate-500">
                                        {item?.keterangan ||
                                          "-"}
                                      </span>
                                    </td>
                                  </tr>
                                );
                              },
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* RIWAYAT */}
                  <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">

                    <div className="flex items-center gap-2 p-4 sm:p-5 border-b border-slate-100">
                      <History
                        size={16}
                        className="text-slate-400"
                      />

                      <div>
                        <h2 className="text-sm font-semibold text-slate-800">
                          Riwayat Data
                        </h2>

                        <p className="text-xs text-slate-400 mt-0.5">
                          Tanggal yang tersedia dari
                          backend
                        </p>
                      </div>
                    </div>

                    {riwayatTanggal.length ===
                    0 ? (
                      <div className="p-6 text-center">
                        <p className="text-xs text-slate-400">
                          Belum ada riwayat.
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-100">
                        {riwayatTanggal.map(
                          (item) => {
                            const isActive =
                              tanggal &&
                              formatTanggal(
                                item.tanggal,
                              ) ===
                                formatTanggal(
                                  tanggal,
                                );

                            return (
                              <button
                                type="button"
                                key={String(
                                  item.tanggal,
                                )}
                                onClick={() =>
                                  pilihTanggal(
                                    item.tanggal,
                                  )
                                }
                                className={`w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-slate-50 transition-colors ${
                                  isActive
                                    ? "bg-blue-50/60"
                                    : ""
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="p-2 rounded-lg bg-slate-100 text-slate-500">
                                    <CalendarDays
                                      size={
                                        15
                                      }
                                    />
                                  </div>

                                  <div>
                                    <p className="text-xs font-medium text-slate-700">
                                      {formatTanggal(
                                        item.tanggal,
                                      )}
                                    </p>

                                    <p className="text-[11px] text-slate-400 mt-0.5">
                                      {
                                        item.jumlah
                                      }{" "}
                                      data absensi
                                    </p>
                                  </div>
                                </div>

                                {isActive && (
                                  <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-1 rounded-full">
                                    Dipilih
                                  </span>
                                )}
                              </button>
                            );
                          },
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
          </div>
        </main>
      </div>
    </div>
  );
}