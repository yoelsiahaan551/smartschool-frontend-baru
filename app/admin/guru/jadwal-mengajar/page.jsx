"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

import {
  Search,
  Filter,
  CalendarClock,
  Printer,
  Pencil,
  Trash2,
  Users,
  BookMarked,
  Clock,
  Plus,
  RefreshCw,
} from "lucide-react";

import {
  getJadwalMengajar,
  deleteJadwalMengajar,
} from "../../../../services/jadwalMengajar.service";

/* =========================================================
   HARI
========================================================= */

const HARI = [
  {
    key: "senin",
    label: "Senin",
  },
  {
    key: "selasa",
    label: "Selasa",
  },
  {
    key: "rabu",
    label: "Rabu",
  },
  {
    key: "kamis",
    label: "Kamis",
  },
  {
    key: "jumat",
    label: "Jumat",
  },
  {
    key: "sabtu",
    label: "Sabtu",
  },
];

/* =========================================================
   HELPER
========================================================= */

function getNamaGuru(item) {
  return (
    item?.guru?.namaLengkap ||
    item?.guru?.nama ||
    item?.guru?.namaPengguna ||
    item?.namaGuru ||
    item?.nama ||
    "-"
  );
}

function getKodeGuru(item) {
  return (
    item?.guru?.nip ||
    item?.guru?.kode ||
    item?.nip ||
    item?.kode ||
    "-"
  );
}

function getMapel(item) {
  return (
    item?.mapel?.nama ||
    item?.mapel?.namaMapel ||
    item?.mataPelajaran?.nama ||
    item?.mataPelajaran?.namaMapel ||
    item?.mapel ||
    item?.mataPelajaran ||
    "-"
  );
}

function getKelas(item) {
  return (
    item?.kelas?.nama ||
    item?.kelas?.namaKelas ||
    item?.kelas?.kode ||
    item?.namaKelas ||
    item?.kelas ||
    "-"
  );
}

function getHari(item) {
  const hari =
    item?.hari ||
    item?.day ||
    item?.hariMengajar ||
    "";

  return String(hari)
    .toLowerCase()
    .trim();
}

function getJam(item) {
  const jamMulai =
    item?.jamMulai ||
    item?.waktuMulai ||
    item?.startTime ||
    item?.mulai ||
    "";

  const jamSelesai =
    item?.jamSelesai ||
    item?.waktuSelesai ||
    item?.endTime ||
    item?.selesai ||
    "";

  if (
    jamMulai &&
    jamSelesai
  ) {
    return `${jamMulai}–${jamSelesai}`;
  }

  if (jamMulai) {
    return String(jamMulai);
  }

  if (jamSelesai) {
    return String(jamSelesai);
  }

  return "";
}

/* =========================================================
   NORMALISASI HARI
========================================================= */

function normalizeHari(hari) {
  const value = String(
    hari || ""
  )
    .toLowerCase()
    .trim();

  const map = {
    senin: "senin",
    monday: "senin",

    selasa: "selasa",
    tuesday: "selasa",

    rabu: "rabu",
    wednesday: "rabu",

    kamis: "kamis",
    thursday: "kamis",

    jumat: "jumat",
    jumat: "jumat",
    friday: "jumat",

    sabtu: "sabtu",
    saturday: "sabtu",
  };

  return map[value] || value;
}

/* =========================================================
   FORMAT SLOT
========================================================= */

function formatSlot(item) {
  const jam = getJam(item);
  const kelas = getKelas(item);

  if (!jam && !kelas) {
    return "-";
  }

  if (jam && kelas) {
    return `${jam} • ${kelas}`;
  }

  return jam || kelas;
}

/* =========================================================
   NORMALISASI DATA BACKEND
========================================================= */

/*
  Backend bisa mengembalikan banyak record:

  Guru A - Matematika - Senin
  Guru A - Matematika - Selasa
  Guru A - Matematika - Rabu

  Sedangkan tabel frontend kita ingin:

  Guru A | Matematika | Senin | Selasa | Rabu | ...

  Fungsi ini menggabungkannya.
*/

function normalizeJadwalData(data) {
  if (!Array.isArray(data)) {
    return [];
  }

  const grouped = new Map();

  data.forEach((item) => {
    const guruId =
      item?.guruId ||
      item?.guru?.id ||
      item?.idGuru ||
      getKodeGuru(item);

    const mapelId =
      item?.mapelId ||
      item?.mapel?.id ||
      item?.mataPelajaranId ||
      getMapel(item);

    const groupKey =
      `${guruId}-${mapelId}`;

    if (!grouped.has(groupKey)) {
      grouped.set(
        groupKey,
        {
          id: item?.id,
          guruId,
          mapelId,

          nama: getNamaGuru(item),
          kode: getKodeGuru(item),
          mapel: getMapel(item),

          jadwal: {
            senin: "-",
            selasa: "-",
            rabu: "-",
            kamis: "-",
            jumat: "-",
            sabtu: "-",
          },

          records: [],
        }
      );
    }

    const group =
      grouped.get(groupKey);

    const hari =
      normalizeHari(
        getHari(item)
      );

    if (
      HARI.some(
        (h) =>
          h.key === hari
      )
    ) {
      group.jadwal[hari] =
        formatSlot(item);
    }

    group.records.push(item);
  });

  return Array.from(
    grouped.values()
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function JadwalMengajarPage() {
  const router = useRouter();

  /* =======================================================
     STATE
  ======================================================= */

  const [
    isCollapsed,
    setIsCollapsed,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    mapelFilter,
    setMapelFilter,
  ] = useState(
    "Semua Mapel"
  );

  const [
    jadwal,
    setJadwal,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    deletingId,
    setDeletingId,
  ] = useState(null);

  /* =======================================================
     TOGGLE SIDEBAR
  ======================================================= */

  const toggleSidebar = () => {
    setIsCollapsed(
      !isCollapsed
    );
  };

  /* =======================================================
     GET DATA BACKEND
  ======================================================= */

  const fetchJadwal =
    async () => {
      try {
        setLoading(true);
        setError("");

        console.log(
          "[JADWAL] Mengambil data dari backend..."
        );

        const response =
          await getJadwalMengajar();

        console.log(
          "[JADWAL] Response backend:",
          response
        );

        if (
          !response?.success
        ) {
          throw new Error(
            response?.message ||
              "Gagal mengambil data jadwal mengajar."
          );
        }

        const data =
          Array.isArray(
            response?.data
          )
            ? response.data
            : [];

        const normalized =
          normalizeJadwalData(
            data
          );

        console.log(
          "[JADWAL] Data normalized:",
          normalized
        );

        setJadwal(
          normalized
        );
      } catch (err) {
        console.error(
          "[JADWAL] Error:",
          err
        );

        setJadwal([]);

        setError(
          err?.message ||
            "Gagal mengambil data jadwal mengajar."
        );
      } finally {
        setLoading(false);
      }
    };

  /* =======================================================
     LOAD DATA
  ======================================================= */

  useEffect(() => {
    fetchJadwal();
  }, []);

  /* =======================================================
     MAPEL OPTIONS
  ======================================================= */

  const MAPEL_OPTIONS =
    useMemo(() => {
      const mapel = jadwal
        .map(
          (item) =>
            item.mapel
        )
        .filter(
          Boolean
        );

      return [
        "Semua Mapel",
        ...Array.from(
          new Set(mapel)
        ).sort(),
      ];
    }, [jadwal]);

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredGuru =
    useMemo(() => {
      const keyword =
        search
          .toLowerCase()
          .trim();

      return jadwal.filter(
        (item) => {
          const nama =
            String(
              item.nama || ""
            ).toLowerCase();

          const kode =
            String(
              item.kode || ""
            ).toLowerCase();

          const mapel =
            String(
              item.mapel || ""
            );

          const matchSearch =
            !keyword ||
            nama.includes(
              keyword
            ) ||
            kode.includes(
              keyword
            );

          const matchMapel =
            mapelFilter ===
              "Semua Mapel" ||
            mapel ===
              mapelFilter;

          return (
            matchSearch &&
            matchMapel
          );
        }
      );
    }, [
      jadwal,
      search,
      mapelFilter,
    ]);

  /* =======================================================
     TOTAL SLOT
  ======================================================= */

  const totalSlot =
    useMemo(() => {
      return jadwal.reduce(
        (total, guru) => {
          return (
            total +
            Object.values(
              guru.jadwal || {}
            ).filter(
              (value) =>
                value &&
                value !== "-"
            ).length
          );
        },
        0
      );
    }, [jadwal]);

  /* =======================================================
     PRINT
  ======================================================= */

  const handlePrint = (
    guru
  ) => {
    console.log(
      "Cetak jadwal:",
      guru
    );

    window.print();
  };

  /* =======================================================
     EDIT
  ======================================================= */

  const handleEdit = (
    guru
  ) => {
    router.push(
      `/admin/guru/jadwal-mengajar/edit?id=${guru.id}`
    );
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete =
    async (guru) => {
      const id =
        guru?.id;

      if (!id) {
        window.alert(
          "ID jadwal tidak ditemukan."
        );
        return;
      }

      const yakin =
        window.confirm(
          `Yakin ingin menghapus jadwal ${guru.nama}?`
        );

      if (!yakin) {
        return;
      }

      try {
        setDeletingId(id);

        console.log(
          "[JADWAL] Delete:",
          id
        );

        const response =
          await deleteJadwalMengajar(
            id
          );

        console.log(
          "[JADWAL] Delete response:",
          response
        );

        if (
          response &&
          response.success === false
        ) {
          throw new Error(
            response.message ||
              "Gagal menghapus jadwal."
          );
        }

        await fetchJadwal();

        window.alert(
          "Jadwal berhasil dihapus."
        );
      } catch (err) {
        console.error(
          "[JADWAL] Delete error:",
          err
        );

        window.alert(
          err?.message ||
            "Gagal menghapus jadwal."
        );
      } finally {
        setDeletingId(null);
      }
    };

  /* =======================================================
     TAMBAH
  ======================================================= */

  const handleTambah =
    () => {
      router.push(
        "/admin/guru/jadwal-mengajar/tambah"
      );
    };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar
        active="guruJadwalMengajar"
        setActive={() => {}}
        collapsed={
          isCollapsed
        }
        setCollapsed={
          setIsCollapsed
        }
        role="admin"
      />

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
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

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">

            {/* =========================================
                HEADER
            ========================================= */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white shadow-lg shadow-slate-900/10">
                  <CalendarClock
                    size={20}
                  />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-slate-800">
                    Jadwal Mengajar
                  </h1>

                  <p className="text-sm text-slate-500">
                    Rekap jadwal mengajar tiap guru per hari.
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-2">

                <button
                  type="button"
                  onClick={
                    fetchJadwal
                  }
                  disabled={
                    loading
                  }
                  className="flex items-center gap-2 px-3 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition-all shadow-sm font-medium text-sm"
                >
                  <RefreshCw
                    size={16}
                    className={
                      loading
                        ? "animate-spin"
                        : ""
                    }
                  />

                  Refresh
                </button>

                <button
                  type="button"
                  onClick={
                    handleTambah
                  }
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#155DFC] hover:bg-[#0d47c9] text-white rounded-xl transition-all shadow-sm font-medium text-sm shrink-0"
                >
                  <Plus
                    size={17}
                  />

                  Tambah Jadwal
                </button>

              </div>
            </div>

            {/* =========================================
                ERROR
            ========================================= */}

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl p-4 flex items-center justify-between gap-4">

                <div>
                  <p className="font-semibold text-sm">
                    Gagal mengambil data jadwal
                  </p>

                  <p className="text-sm mt-1">
                    {error}
                  </p>
                </div>

                <button
                  onClick={
                    fetchJadwal
                  }
                  className="px-3 py-2 bg-white border border-rose-200 rounded-lg text-sm font-medium hover:bg-rose-100"
                >
                  Coba Lagi
                </button>

              </div>
            )}

            {/* =========================================
                STATISTIK
            ========================================= */}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

              {/* TOTAL GURU */}

              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">

                <div className="flex items-center gap-2">

                  <Users
                    size={14}
                    className="text-[#155DFC]"
                  />

                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">
                    Total Guru
                  </p>

                </div>

                <p className="text-2xl font-bold text-slate-900 mt-1.5">
                  {jadwal.length}
                </p>

              </div>

              {/* MAPEL */}

              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">

                <div className="flex items-center gap-2">

                  <BookMarked
                    size={14}
                    className="text-[#155DFC]"
                  />

                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">
                    Mapel Diampu
                  </p>

                </div>

                <p className="text-2xl font-bold text-slate-900 mt-1.5">
                  {Math.max(
                    0,
                    MAPEL_OPTIONS.length -
                      1
                  )}
                </p>

              </div>

              {/* TOTAL SLOT */}

              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">

                <div className="flex items-center gap-2">

                  <Clock
                    size={14}
                    className="text-[#155DFC]"
                  />

                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">
                    Total Slot / Minggu
                  </p>

                </div>

                <p className="text-2xl font-bold text-slate-900 mt-1.5">
                  {totalSlot}
                </p>

              </div>

            </div>

            {/* =========================================
                FILTER
            ========================================= */}

            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm flex flex-col sm:flex-row gap-3">

              {/* SEARCH */}

              <div className="relative flex-1">

                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={
                    search
                  }
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Cari nama atau kode guru..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800"
                />

              </div>

              {/* MAPEL */}

              <div className="flex items-center gap-2">

                <Filter
                  size={15}
                  className="text-slate-400 hidden sm:block"
                />

                <select
                  value={
                    mapelFilter
                  }
                  onChange={(e) =>
                    setMapelFilter(
                      e.target.value
                    )
                  }
                  className="text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 bg-white text-slate-800 font-medium"
                >
                  {MAPEL_OPTIONS.map(
                    (mapel) => (
                      <option
                        key={
                          mapel
                        }
                        value={
                          mapel
                        }
                      >
                        {mapel}
                      </option>
                    )
                  )}
                </select>

              </div>

            </div>

            {/* =========================================
                LOADING
            ========================================= */}

            {loading && (
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-10">

                <div className="flex flex-col items-center justify-center gap-3">

                  <RefreshCw
                    size={28}
                    className="text-[#155DFC] animate-spin"
                  />

                  <p className="text-sm text-slate-500">
                    Mengambil data jadwal dari server...
                  </p>

                </div>

              </div>
            )}

            {/* =========================================
                TABLE
            ========================================= */}

            {!loading && (
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">

                <div className="overflow-x-auto">

                  <table className="w-full text-sm border-collapse">

                    {/* HEADER */}

                    <thead>

                      <tr className="bg-gradient-to-r from-[#155DFC] to-[#0d47c9] text-white">

                        <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">
                          No.
                        </th>

                        <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">
                          Kode
                        </th>

                        <th className="text-left font-semibold px-4 py-3 min-w-[200px]">
                          Nama Guru
                        </th>

                        <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">
                          Mapel
                        </th>

                        {HARI.map(
                          (hari) => (
                            <th
                              key={
                                hari.key
                              }
                              className="text-center font-semibold px-4 py-3 whitespace-nowrap"
                            >
                              {
                                hari.label
                              }
                            </th>
                          )
                        )}

                        <th className="text-center font-semibold px-4 py-3 whitespace-nowrap">
                          Aksi
                        </th>

                      </tr>

                    </thead>

                    {/* BODY */}

                    <tbody>

                      {filteredGuru.map(
                        (
                          guru,
                          index
                        ) => (
                          <tr
                            key={
                              `${guru.id}-${guru.guruId}-${guru.mapelId}`
                            }
                            className={`border-b border-slate-100 last:border-0 transition-colors hover:bg-[#eaf1ff] ${
                              index %
                                2 ===
                              0
                                ? "bg-[#f5f8ff]"
                                : "bg-white"
                            }`}
                          >

                            {/* NO */}

                            <td className="px-4 py-2.5 text-slate-700 font-medium">
                              {index +
                                1}
                            </td>

                            {/* KODE */}

                            <td className="px-4 py-2.5">

                              <span className="font-mono text-xs font-medium text-[#155DFC] bg-[#eaf1ff] px-2 py-1 rounded-md">
                                {
                                  guru.kode
                                }
                              </span>

                            </td>

                            {/* NAMA */}

                            <td className="px-4 py-2.5 text-slate-900 font-semibold">
                              {
                                guru.nama
                              }
                            </td>

                            {/* MAPEL */}

                            <td className="px-4 py-2.5 text-slate-700">
                              {
                                guru.mapel
                              }
                            </td>

                            {/* HARI */}

                            {HARI.map(
                              (
                                hari
                              ) => {
                                const slot =
                                  guru
                                    ?.jadwal?.[
                                    hari.key
                                  ] ||
                                  "-";

                                const kosong =
                                  slot ===
                                  "-";

                                return (
                                  <td
                                    key={
                                      hari.key
                                    }
                                    className="px-4 py-2.5 text-center whitespace-nowrap"
                                  >
                                    {kosong ? (
                                      <span className="text-slate-300">
                                        -
                                      </span>
                                    ) : (
                                      <span className="text-xs font-medium text-slate-700">
                                        {
                                          slot
                                        }
                                      </span>
                                    )}
                                  </td>
                                );
                              }
                            )}

                            {/* AKSI */}

                            <td className="px-4 py-2.5">

                              <div className="flex items-center justify-center gap-1.5">

                                {/* PRINT */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    handlePrint(
                                      guru
                                    )
                                  }
                                  title="Cetak jadwal"
                                  className="p-1.5 rounded-md text-[#155DFC] bg-[#eaf1ff] hover:bg-[#d6e6ff] transition-colors"
                                >
                                  <Printer
                                    size={
                                      14
                                    }
                                  />
                                </button>

                                {/* EDIT */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleEdit(
                                      guru
                                    )
                                  }
                                  title="Edit jadwal"
                                  className="p-1.5 rounded-md text-amber-600 bg-amber-50 hover:bg-amber-100 transition-colors"
                                >
                                  <Pencil
                                    size={
                                      14
                                    }
                                  />
                                </button>

                                {/* DELETE */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(
                                      guru
                                    )
                                  }
                                  disabled={
                                    deletingId ===
                                    guru.id
                                  }
                                  title="Hapus jadwal"
                                  className="p-1.5 rounded-md text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {deletingId ===
                                  guru.id ? (
                                    <RefreshCw
                                      size={
                                        14
                                      }
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <Trash2
                                      size={
                                        14
                                      }
                                    />
                                  )}
                                </button>

                              </div>

                            </td>

                          </tr>
                        )
                      )}

                      {/* DATA KOSONG */}

                      {filteredGuru.length ===
                        0 && (
                        <tr>
                          <td
                            colSpan={
                              HARI.length +
                              5
                            }
                            className="px-4 py-12 text-center"
                          >

                            <div className="flex flex-col items-center justify-center">

                              <CalendarClock
                                size={
                                  35
                                }
                                className="text-slate-300 mb-3"
                              />

                              <p className="text-sm font-medium text-slate-500">
                                Tidak ada data jadwal mengajar
                              </p>

                              <p className="text-xs text-slate-400 mt-1">
                                Belum ada jadwal yang sesuai dengan filter.
                              </p>

                            </div>

                          </td>
                        </tr>
                      )}

                    </tbody>

                  </table>

                </div>

              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}