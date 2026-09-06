"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ClipboardList,
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  Clock3,
  BookOpen,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import { getKelasMapel } from "../../../services/kelasMapel.service";
import {
  getUjianByKelasMapel,
  deleteUjian,
} from "../../../services/ujian.service";

function getCurrentUserId() {
  if (typeof window === "undefined") return null;

  try {
    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    return user?.id || user?.userId || null;
  } catch {
    return null;
  }
}

function parseData(response) {
  if (Array.isArray(response)) return response;

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.data?.data)) {
    return response.data.data;
  }

  return [];
}

function formatTanggal(value) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getJenisLabel(jenis) {
  const map = {
    pilihan_ganda: "Pilihan Ganda",
    pg: "Pilihan Ganda",
    esai: "Esai",
    benar_salah: "Benar / Salah",
    campuran: "Campuran",
  };

  return map[jenis] || jenis || "-";
}

export default function UjianGuruPage() {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] =
    useState(false);

  const [kelasMapel, setKelasMapel] =
    useState([]);

  const [selectedKelasMapel, setSelectedKelasMapel] =
    useState("");

  const [ujian, setUjian] = useState([]);

  const [search, setSearch] = useState("");

  const [loadingKelasMapel, setLoadingKelasMapel] =
    useState(true);

  const [loadingUjian, setLoadingUjian] =
    useState(false);

  const [error, setError] = useState("");

  const [deleteLoading, setDeleteLoading] =
    useState(null);

  // =====================================================
  // LOAD KELAS MAPEL
  // =====================================================

  useEffect(() => {
    loadKelasMapel();
  }, []);

  async function loadKelasMapel() {
    try {
      setLoadingKelasMapel(true);
      setError("");

      const response =
        await getKelasMapel();

      const data = parseData(response);

      const userId = getCurrentUserId();

      // Karena BE sekarang mengembalikan seluruh kelas-mapel
      // sekolah, FE menyaring berdasarkan guru login.
      const filtered = userId
        ? data.filter(
            (item) =>
              item.guruPengajarId === userId ||
              item.guruPengajar?.id === userId
          )
        : data;

      setKelasMapel(filtered);

      if (filtered.length > 0) {
        setSelectedKelasMapel(
          filtered[0].id
        );
      }
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          "Gagal mengambil data kelas dan mata pelajaran."
      );
    } finally {
      setLoadingKelasMapel(false);
    }
  }

  // =====================================================
  // LOAD UJIAN
  // =====================================================

  useEffect(() => {
    if (!selectedKelasMapel) {
      setUjian([]);
      return;
    }

    loadUjian(selectedKelasMapel);
  }, [selectedKelasMapel]);

  async function loadUjian(kelasMapelId) {
    try {
      setLoadingUjian(true);
      setError("");

      const response =
        await getUjianByKelasMapel(
          kelasMapelId
        );

      setUjian(
        parseData(response)
      );
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          "Gagal mengambil data ujian."
      );

      setUjian([]);
    } finally {
      setLoadingUjian(false);
    }
  }

  const selectedData = useMemo(
    () =>
      kelasMapel.find(
        (item) =>
          item.id ===
          selectedKelasMapel
      ),
    [
      kelasMapel,
      selectedKelasMapel,
    ]
  );

  const filteredUjian = useMemo(() => {
    const keyword =
      search.trim().toLowerCase();

    if (!keyword) {
      return ujian;
    }

    return ujian.filter((item) =>
      [
        item.judul,
        item.jenis,
      ]
        .filter(Boolean)
        .some((value) =>
          value
            .toLowerCase()
            .includes(keyword)
        )
    );
  }, [ujian, search]);

  const stats = useMemo(() => {
    const total = ujian.length;

    const published = ujian.filter(
      (item) => item.dipublikasikan
    ).length;

    const unpublished =
      total - published;

    const totalAttempts =
      ujian.reduce(
        (sum, item) =>
          sum +
          Number(
            item?._count
              ?.percobaanUjian || 0
          ),
        0
      );

    return {
      total,
      published,
      unpublished,
      totalAttempts,
    };
  }, [ujian]);

  // =====================================================
  // DELETE
  // =====================================================

  async function handleDelete(item) {
    const confirmed =
      window.confirm(
        `Hapus ujian "${item.judul}"?`
      );

    if (!confirmed) return;

    try {
      setDeleteLoading(item.id);

      await deleteUjian(item.id);

      await loadUjian(
        selectedKelasMapel
      );
    } catch (err) {
      alert(
        err?.message ||
          "Gagal menghapus ujian."
      );
    } finally {
      setDeleteLoading(null);
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      <Sidebar
        active="ujian"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
        role="guru"
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          toggleSidebar={() =>
            setIsCollapsed((prev) => !prev)
          }
          notifications={[]}
          user={{
            name: "Guru",
            email: "guru@smartschool.com",
            avatar: "GR",
          }}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">

            {/* HEADER */}
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-3 text-white shadow-lg shadow-blue-200">
                  <ClipboardList size={22} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-slate-800">
                    Ujian
                  </h1>

                  <p className="text-sm text-slate-500">
                    Kelola ujian berdasarkan mata
                    pelajaran yang kamu ajar.
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  router.push(
                    "/guru/ujian/tambah"
                  )
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <Plus size={17} />
                Tambah Ujian
              </button>
            </div>

            {/* ERROR */}
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <div className="flex-1">
                  <p className="font-semibold">
                    Terjadi masalah
                  </p>

                  <p className="mt-0.5">
                    {error}
                  </p>
                </div>

                <button
                  onClick={() => {
                    loadKelasMapel();
                    if (selectedKelasMapel) {
                      loadUjian(
                        selectedKelasMapel
                      );
                    }
                  }}
                  className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-rose-700 ring-1 ring-rose-200 hover:bg-rose-100"
                >
                  <RefreshCw size={13} />
                  Coba lagi
                </button>
              </div>
            )}

            {/* PILIH KELAS MAPEL */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-3 flex items-center gap-2">
                <BookOpen
                  size={17}
                  className="text-blue-600"
                />

                <p className="text-sm font-semibold text-slate-800">
                  Kelas & Mata Pelajaran
                </p>
              </div>

              {loadingKelasMapel ? (
                <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
              ) : kelasMapel.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center">
                  <p className="text-sm font-semibold text-slate-700">
                    Belum ada kelas mata pelajaran
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Kamu belum memiliki kelas-mata
                    pelajaran yang diampu.
                  </p>
                </div>
              ) : (
                <select
                  value={selectedKelasMapel}
                  onChange={(e) =>
                    setSelectedKelasMapel(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                >
                  {kelasMapel.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.kelas?.nama || "Kelas"}{" "}
                      —{" "}
                      {item.mataPelajaran?.nama ||
                        "Mata Pelajaran"}
                    </option>
                  ))}
                </select>
              )}

              {selectedData && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                    {selectedData.kelas?.nama}
                  </span>

                  <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
                    {selectedData.mataPelajaran?.nama}
                  </span>
                </div>
              )}
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <ClipboardList
                    size={15}
                    className="text-blue-600"
                  />
                  Total Ujian
                </div>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {stats.total}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <CheckCircle2
                    size={15}
                    className="text-emerald-600"
                  />
                  Dipublikasikan
                </div>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {stats.published}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <XCircle
                    size={15}
                    className="text-amber-600"
                  />
                  Draft
                </div>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {stats.unpublished}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Users
                    size={15}
                    className="text-indigo-600"
                  />
                  Percobaan
                </div>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {stats.totalAttempts}
                </p>
              </div>
            </div>

            {/* TOOLBAR */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Cari judul ujian..."
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {loadingUjian ? (
                <div className="p-10 text-center">
                  <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />

                  <p className="text-sm text-slate-500">
                    Mengambil data ujian...
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px] text-sm">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <th className="px-4 py-3 text-left font-semibold">
                          No
                        </th>

                        <th className="px-4 py-3 text-left font-semibold">
                          Judul Ujian
                        </th>

                        <th className="px-4 py-3 text-left font-semibold">
                          Jenis
                        </th>

                        <th className="px-4 py-3 text-center font-semibold">
                          Durasi
                        </th>

                        <th className="px-4 py-3 text-left font-semibold">
                          Jadwal
                        </th>

                        <th className="px-4 py-3 text-center font-semibold">
                          Status
                        </th>

                        <th className="px-4 py-3 text-center font-semibold">
                          Soal
                        </th>

                        <th className="px-4 py-3 text-center font-semibold">
                          Aksi
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredUjian.map(
                        (item, index) => (
                          <tr
                            key={item.id}
                            className="border-b border-slate-100 transition hover:bg-blue-50/50"
                          >
                            <td className="px-4 py-3 font-medium text-slate-600">
                              {index + 1}
                            </td>

                            <td className="px-4 py-3">
                              <p className="font-semibold text-slate-900">
                                {item.judul}
                              </p>

                              {item.deskripsi && (
                                <p className="mt-1 max-w-[280px] truncate text-xs text-slate-500">
                                  {item.deskripsi}
                                </p>
                              )}
                            </td>

                            <td className="px-4 py-3 text-slate-700">
                              {getJenisLabel(
                                item.jenis
                              )}
                            </td>

                            <td className="px-4 py-3 text-center">
                              <span className="inline-flex items-center gap-1 text-slate-700">
                                <Clock3
                                  size={14}
                                  className="text-slate-400"
                                />
                                {item.durasi} menit
                              </span>
                            </td>

                            <td className="px-4 py-3 text-xs text-slate-600">
                              {item.waktuMulai ? (
                                <>
                                  <div>
                                    Mulai:{" "}
                                    {formatTanggal(
                                      item.waktuMulai
                                    )}
                                  </div>

                                  {item.waktuSelesai && (
                                    <div className="mt-1">
                                      Selesai:{" "}
                                      {formatTanggal(
                                        item.waktuSelesai
                                      )}
                                    </div>
                                  )}
                                </>
                              ) : (
                                "Tidak dijadwalkan"
                              )}
                            </td>

                            <td className="px-4 py-3 text-center">
                              {item.dipublikasikan ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                  <CheckCircle2 size={13} />
                                  Dipublikasi
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                                  <XCircle size={13} />
                                  Draft
                                </span>
                              )}
                            </td>

                            <td className="px-4 py-3 text-center font-semibold text-slate-700">
                              {item?._count
                                ?.soalUjian ??
                                0}
                            </td>

                            <td className="px-4 py-3">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() =>
                                    router.push(
                                      `/guru/ujian/edit/${item.id}`
                                    )
                                  }
                                  title="Edit ujian"
                                  className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                                >
                                  <Pencil size={15} />
                                </button>

                                <button
                                  onClick={() =>
                                    router.push(
                                      `/guru/ujian/${item.id}`
                                    )
                                  }
                                  title="Lihat detail"
                                  className="rounded-lg bg-indigo-50 p-2 text-indigo-600 transition hover:bg-indigo-100"
                                >
                                  <Eye size={15} />
                                </button>

                                <button
                                  onClick={() =>
                                    handleDelete(item)
                                  }
                                  disabled={
                                    deleteLoading ===
                                    item.id
                                  }
                                  title="Hapus ujian"
                                  className="rounded-lg bg-rose-50 p-2 text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  {deleteLoading ===
                                  item.id ? (
                                    <div className="h-[15px] w-[15px] animate-spin rounded-full border-2 border-rose-600 border-t-transparent" />
                                  ) : (
                                    <Trash2 size={15} />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      )}

                      {!loadingUjian &&
                        filteredUjian.length === 0 && (
                          <tr>
                            <td
                              colSpan={8}
                              className="px-4 py-14 text-center"
                            >
                              <ClipboardList
                                size={40}
                                className="mx-auto text-slate-300"
                              />

                              <p className="mt-3 text-sm font-semibold text-slate-700">
                                Belum ada ujian
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                Belum ada ujian untuk
                                kelas dan mata pelajaran
                                ini.
                              </p>
                            </td>
                          </tr>
                        )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}