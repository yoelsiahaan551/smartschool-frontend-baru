"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  Search,
  BookMarked,
  Pencil,
  Trash2,
  Layers,
  RefreshCw,
  AlertCircle,
  Loader2,
  Plus,
} from "lucide-react";

import {
  getMataPelajaran,
  deleteMataPelajaran,
} from "../../../../services/mapel.service";

/**
 * app/admin/guru/mapel/page.jsx
 *
 * Halaman Mapel — daftar mata pelajaran (nama, kode, status).
 *
 * CATATAN DATA:
 * Backend endpoint mata pelajaran saat ini hanya menyediakan field
 * nama, kode, dan status. Kolom "Guru Pengampu", "Kelas", "Jam/Minggu",
 * dan filter "Rumpun" pada versi sebelumnya memakai data dummy dan
 * belum didukung backend (field-field itu sebenarnya berada di relasi
 * KelasMapel, bukan di tabel MataPelajaran, atau belum ada di schema
 * sama sekali untuk kasus "rumpun" dan "jamPerMinggu").
 *
 * Kolom-kolom itu dihapus sementara dari tampilan ini supaya tidak ada
 * data palsu yang ditampilkan. Begitu backend menyediakan data itu
 * (lewat endpoint gabungan/kelasMapel), tabel ini tinggal ditambah lagi.
 */

function StatusBadge({ status }) {
  const isActive = String(status || "").toLowerCase() === "aktif";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
        isActive
          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
          : "bg-slate-100 text-slate-500 border border-slate-200"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isActive ? "bg-emerald-500" : "bg-slate-400"
        }`}
      />
      {isActive ? "Aktif" : "Nonaktif"}
    </span>
  );
}

export default function MapelPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // DATA ASLI DARI API
  const [mapel, setMapel] = useState([]);

  // LOADING
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // ERROR
  const [error, setError] = useState("");

  // FILTER (client-side, karena backend belum dukung search/pagination)
  const [search, setSearch] = useState("");

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  /**
   * =======================================================
   * FETCH DATA MAPEL
   * =======================================================
   */

  const fetchMapel = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }

      setError("");

      const response = await getMataPelajaran();

      if (!response?.success) {
        throw new Error(
          response?.message || "Gagal mengambil data mata pelajaran."
        );
      }

      setMapel(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("[browser] Error fetch mapel:", err);

      setMapel([]);
      setError(err?.message || "Gagal mengambil data mata pelajaran.");
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchMapel();
  }, [fetchMapel]);

  const handleRefresh = async () => {
    await fetchMapel();
  };

  /**
   * =======================================================
   * NAVIGASI
   * =======================================================
   */

  const handleTambah = () => {
    router.push("/admin/guru/mapel/tambah");
  };

  /**
   * =======================================================
   * DELETE
   * =======================================================
   */

  const handleDelete = async (item) => {
    if (!item?.id) return;

    const confirmed = window.confirm(
      `Yakin ingin menghapus mata pelajaran "${item.nama}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(item.id);
      setError("");

      const response = await deleteMataPelajaran(item.id);

      if (!response?.success) {
        throw new Error(
          response?.message || "Gagal menghapus mata pelajaran."
        );
      }

      await fetchMapel(false);

      window.alert(
        response.message ||
          `Mata pelajaran "${item.nama}" berhasil dihapus.`
      );
    } catch (err) {
      console.error("Error delete mapel:", err);
      window.alert(err?.message || "Gagal menghapus mata pelajaran.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (item) => {
    // TODO: sambungkan ke halaman/modal edit mata pelajaran
    console.log("Ubah mapel:", item.nama);
  };

  /**
   * =======================================================
   * FILTER (client-side)
   * =======================================================
   */

  const filteredMapel = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return mapel;

    return mapel.filter(
      (m) =>
        String(m.nama || "").toLowerCase().includes(keyword) ||
        String(m.kode || "").toLowerCase().includes(keyword)
    );
  }, [search, mapel]);

  /**
   * =======================================================
   * STATISTICS
   * =======================================================
   * Backend belum menyediakan endpoint statistik khusus, jadi
   * dihitung dari data yang sudah dimuat (bukan angka dummy).
   */

  const totalMapel = mapel.length;

  const totalAktif = mapel.filter(
    (m) => String(m.status || "").toLowerCase() === "aktif"
  ).length;

  const totalNonaktif = totalMapel - totalAktif;

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        active="guruMapel"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
        role="admin"
      />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email: "admin@smartschool.com",
            avatar: "AD",
          }}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white shadow-lg shadow-slate-900/10">
                  <BookMarked size={20} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">
                    Mapel
                  </h1>
                  <p className="text-sm text-slate-500">
                    Kelola daftar mata pelajaran sekolah.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={loading}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-[#155DFC] hover:bg-[#eaf1ff] hover:border-[#155DFC]/40 disabled:opacity-50 transition-all"
                  title="Refresh data"
                >
                  <RefreshCw
                    size={17}
                    className={loading ? "animate-spin" : ""}
                  />
                </button>

                <button
                  type="button"
                  onClick={handleTambah}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#155DFC] hover:bg-[#0d47c9] text-white rounded-xl transition-all shadow-sm font-medium text-sm"
                >
                  <Plus size={17} />
                  Tambah Mapel
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="flex items-start gap-3 p-4 rounded-xl border border-rose-200 bg-rose-50">
                <AlertCircle
                  size={20}
                  className="text-rose-600 mt-0.5 shrink-0"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-rose-800">
                    Gagal mengambil data mata pelajaran
                  </p>
                  <p className="text-sm text-rose-700 mt-1">{error}</p>
                </div>
                <button
                  type="button"
                  onClick={handleRefresh}
                  className="text-sm font-medium text-rose-700 hover:text-rose-900"
                >
                  Coba lagi
                </button>
              </div>
            )}

            {/* STATISTIK RINGKAS */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-[#155DFC]" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">
                    Total Mapel
                  </p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">
                  {loading ? "—" : totalMapel}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-emerald-600" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">
                    Aktif
                  </p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">
                  {loading ? "—" : totalAktif}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-slate-400" />
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">
                    Nonaktif
                  </p>
                </div>
                <p className="text-2xl font-bold text-slate-900 mt-1.5">
                  {loading ? "—" : totalNonaktif}
                </p>
              </div>
            </div>

            {/* FILTER BAR */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama atau kode mata pelajaran..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800"
                />
              </div>
            </div>

            {/* TABEL MAPEL */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#155DFC] to-[#0d47c9] text-white">
                      <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">
                        Kode
                      </th>
                      <th className="text-left font-semibold px-4 py-3 min-w-[220px]">
                        Mata Pelajaran
                      </th>
                      <th className="text-center font-semibold px-4 py-3 whitespace-nowrap">
                        Status
                      </th>
                      <th className="text-center font-semibold px-4 py-3 whitespace-nowrap">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <tr>
                        <td colSpan={4} className="px-4 py-14 text-center">
                          <div className="flex flex-col items-center">
                            <Loader2
                              size={28}
                              className="animate-spin text-[#155DFC]"
                            />
                            <p className="text-sm font-medium text-slate-700 mt-3">
                              Mengambil data mata pelajaran...
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}

                    {!loading &&
                      filteredMapel.map((m, idx) => (
                        <tr
                          key={m.id}
                          className={`border-b border-slate-100 last:border-0 transition-colors hover:bg-[#eaf1ff] ${
                            idx % 2 === 0 ? "bg-[#f5f8ff]" : "bg-white"
                          }`}
                        >
                          <td className="px-4 py-2.5">
                            <span className="font-mono text-xs font-medium text-[#155DFC] bg-[#eaf1ff] px-2 py-1 rounded-md">
                              {m.kode || "-"}
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            <p className="font-semibold text-slate-900">
                              {m.nama || "-"}
                            </p>
                          </td>
                          <td className="px-4 py-2.5 text-center">
                            <StatusBadge status={m.status} />
                          </td>
                          <td className="px-4 py-2.5">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => handleEdit(m)}
                                title="Ubah mapel"
                                className="p-1.5 rounded-md text-[#155DFC] bg-[#eaf1ff] hover:bg-[#d6e6ff] transition-colors"
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                onClick={() => handleDelete(m)}
                                disabled={deletingId === m.id}
                                title="Hapus mapel"
                                className="p-1.5 rounded-md text-rose-600 bg-rose-50 hover:bg-rose-100 disabled:opacity-40 transition-colors"
                              >
                                {deletingId === m.id ? (
                                  <Loader2
                                    size={14}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <Trash2 size={14} />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                    {!loading && filteredMapel.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-10 text-center text-sm text-slate-400"
                        >
                          {error
                            ? "Data mata pelajaran tidak dapat dimuat."
                            : search
                            ? "Tidak ada mapel yang cocok dengan pencarian ini."
                            : "Belum ada data mata pelajaran."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}