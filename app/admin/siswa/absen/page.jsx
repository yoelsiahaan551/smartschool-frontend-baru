"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  Search,
  Filter,
  CalendarDays,
  Eye,
  Users,
  CheckCircle2,
  Clock3,
  AlertCircle,
  XCircle,
  MapPin,
  Camera,
  Navigation,
  UserRound,
  ClipboardCheck,
  RefreshCw,
} from "lucide-react";

/* =========================================================
   MOCK DATA ABSENSI SISWA
========================================================= */

const MOCK_ABSENSI = [
  {
    id: 1,
    nama: "Alya Ramadhani",
    nisn: "0051234567",
    kelas: "7A",
    jenisKelamin: "P",
    tanggal: "02 September 2026",
    jamMasuk: "06:58:21",
    status: "Hadir",
    lokasi: "Sekolah",
    latitude: -7.3274,
    longitude: 108.2208,
    akurasi: 5,
    foto: null,
    keterangan: "Hadir tepat waktu",
    waliKelas: "Siti Rahayu, S.Pd",
  },
  {
    id: 2,
    nama: "Bunga Citra Lestari",
    nisn: "0051234568",
    kelas: "7A",
    jenisKelamin: "P",
    tanggal: "02 September 2026",
    jamMasuk: "07:02:14",
    status: "Hadir",
    lokasi: "Sekolah",
    latitude: -7.3275,
    longitude: 108.2209,
    akurasi: 7,
    foto: null,
    keterangan: "Hadir",
    waliKelas: "Siti Rahayu, S.Pd",
  },
  {
    id: 3,
    nama: "Cahyo Nugroho",
    nisn: "0051234569",
    kelas: "7B",
    jenisKelamin: "L",
    tanggal: "02 September 2026",
    jamMasuk: "07:11:43",
    status: "Terlambat",
    lokasi: "Sekolah",
    latitude: -7.3276,
    longitude: 108.221,
    akurasi: 8,
    foto: null,
    keterangan: "Datang terlambat",
    waliKelas: "Andi Prasetyo, S.Pd",
  },
  {
    id: 4,
    nama: "Indra Kusuma",
    nisn: "0041234570",
    kelas: "8A",
    jenisKelamin: "L",
    tanggal: "02 September 2026",
    jamMasuk: "-",
    status: "Izin",
    lokasi: "Rumah",
    latitude: -7.3251,
    longitude: 108.2182,
    akurasi: 12,
    foto: null,
    keterangan: "Ada keperluan keluarga",
    waliKelas: "Dewi Anggraini, S.Si",
  },
  {
    id: 5,
    nama: "Julia Anggraeni",
    nisn: "0041234571",
    kelas: "8A",
    jenisKelamin: "P",
    tanggal: "02 September 2026",
    jamMasuk: "-",
    status: "Sakit",
    lokasi: "Rumah",
    latitude: -7.326,
    longitude: 108.219,
    akurasi: 15,
    foto: null,
    keterangan: "Demam",
    waliKelas: "Dewi Anggraini, S.Si",
  },
  {
    id: 6,
    nama: "Reza Firmansyah",
    nisn: "0031234572",
    kelas: "9A",
    jenisKelamin: "L",
    tanggal: "02 September 2026",
    jamMasuk: "-",
    status: "Alpa",
    lokasi: "-",
    latitude: null,
    longitude: null,
    akurasi: null,
    foto: null,
    keterangan: "Tidak ada keterangan",
    waliKelas: "Budi Santoso, S.Pd",
  },
  {
    id: 7,
    nama: "Fajar Maulana",
    nisn: "0051234573",
    kelas: "9A",
    jenisKelamin: "L",
    tanggal: "02 September 2026",
    jamMasuk: "07:00:32",
    status: "Hadir",
    lokasi: "Sekolah",
    latitude: -7.3274,
    longitude: 108.2208,
    akurasi: 6,
    foto: null,
    keterangan: "Hadir",
    waliKelas: "Budi Santoso, S.Pd",
  },
  {
    id: 8,
    nama: "Nabila Putri",
    nisn: "0051234574",
    kelas: "7B",
    jenisKelamin: "P",
    tanggal: "02 September 2026",
    jamMasuk: "07:04:18",
    status: "Hadir",
    lokasi: "Sekolah",
    latitude: -7.3274,
    longitude: 108.2208,
    akurasi: 5,
    foto: null,
    keterangan: "Hadir",
    waliKelas: "Andi Prasetyo, S.Pd",
  },
];

/* =========================================================
   OPTIONS
========================================================= */

const KELAS_OPTIONS = [
  "Semua Kelas",
  ...Array.from(
    new Set(MOCK_ABSENSI.map((s) => s.kelas))
  ).sort(),
];

const STATUS_OPTIONS = [
  "Semua Status",
  "Hadir",
  "Terlambat",
  "Izin",
  "Sakit",
  "Alpa",
];

/* =========================================================
   HELPER
========================================================= */

function getInitials(nama) {
  return nama
    .replace(/,.*/, "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/* =========================================================
   AVATAR
========================================================= */

function Avatar({ nama }) {
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
      {getInitials(nama)}
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const styles = {
    Hadir:
      "bg-emerald-50 text-emerald-600 border-emerald-200",
    Terlambat:
      "bg-amber-50 text-amber-600 border-amber-200",
    Izin:
      "bg-blue-50 text-blue-600 border-blue-200",
    Sakit:
      "bg-orange-50 text-orange-600 border-orange-200",
    Alpa:
      "bg-red-50 text-red-600 border-red-200",
  };

  const dots = {
    Hadir: "bg-emerald-500",
    Terlambat: "bg-amber-500",
    Izin: "bg-blue-500",
    Sakit: "bg-orange-500",
    Alpa: "bg-red-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
        styles[status] ||
        "bg-slate-100 text-slate-500 border-slate-200"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          dots[status] || "bg-slate-400"
        }`}
      />

      {status}
    </span>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  icon: Icon,
  iconClass,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Icon
          size={15}
          className={iconClass}
        />

        <p className="text-[11px] font-medium text-slate-500 tracking-wide">
          {title}
        </p>
      </div>

      <p className="text-2xl font-bold text-slate-900 mt-1.5">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function AbsenSiswaPage() {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] =
    useState(false);

  const [search, setSearch] = useState("");

  const [kelasFilter, setKelasFilter] =
    useState("Semua Kelas");

  const [statusFilter, setStatusFilter] =
    useState("Semua Status");

  const [tanggalFilter, setTanggalFilter] =
    useState("2026-09-02");

  const [selectedAbsen, setSelectedAbsen] =
    useState(null);

  const [showDetail, setShowDetail] =
    useState(false);

  /* =======================================================
     SIDEBAR
  ======================================================= */

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  /* =======================================================
     FILTER DATA
  ======================================================= */

  const filteredAbsensi = useMemo(() => {
    return MOCK_ABSENSI.filter((s) => {
      const searchValue =
        search.toLowerCase();

      const matchSearch =
        s.nama
          .toLowerCase()
          .includes(searchValue) ||
        s.nisn.includes(searchValue) ||
        s.kelas
          .toLowerCase()
          .includes(searchValue);

      const matchKelas =
        kelasFilter === "Semua Kelas" ||
        s.kelas === kelasFilter;

      const matchStatus =
        statusFilter === "Semua Status" ||
        s.status === statusFilter;

      return (
        matchSearch &&
        matchKelas &&
        matchStatus
      );
    });
  }, [
    search,
    kelasFilter,
    statusFilter,
  ]);

  /* =======================================================
     STATISTIK
  ======================================================= */

  const totalSiswa = MOCK_ABSENSI.length;

  const totalHadir = MOCK_ABSENSI.filter(
    (s) =>
      s.status === "Hadir" ||
      s.status === "Terlambat"
  ).length;

  const totalTerlambat =
    MOCK_ABSENSI.filter(
      (s) => s.status === "Terlambat"
    ).length;

  const totalIzin =
    MOCK_ABSENSI.filter(
      (s) => s.status === "Izin"
    ).length;

  const totalSakit =
    MOCK_ABSENSI.filter(
      (s) => s.status === "Sakit"
    ).length;

  const totalAlpa =
    MOCK_ABSENSI.filter(
      (s) => s.status === "Alpa"
    ).length;

  const persentaseHadir = totalSiswa
    ? Math.round(
        (totalHadir / totalSiswa) * 100
      )
    : 0;

  /* =======================================================
     DETAIL
  ======================================================= */

  const handleDetail = (s) => {
    setSelectedAbsen(s);
    setShowDetail(true);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">

      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <Sidebar
        active="siswaAbsen"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
        role="admin"
      />

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">

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

        {/* MAIN */}

        <main className="flex-1 overflow-y-auto">

          <div className="p-4 sm:p-6 lg:p-8 space-y-6">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="flex items-center justify-between gap-3 flex-wrap">

              <div className="flex items-center gap-3">

                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white shadow-lg shadow-[#155DFC]/20">
                  <ClipboardCheck size={20} />
                </div>

                <div>

                  <h1 className="text-2xl font-bold text-slate-800">
                    Absensi Siswa
                  </h1>

                  <p className="text-sm text-slate-500">
                    Pantau kehadiran siswa berdasarkan
                    waktu, status, foto, dan lokasi.
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                <RefreshCw size={15} />
                Refresh Data
              </button>

            </div>

            {/* =================================================
                STATISTIK
            ================================================= */}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">

              <StatCard
                title="Total Siswa"
                value={totalSiswa}
                icon={Users}
                iconClass="text-[#155DFC]"
              />

              <StatCard
                title="Hadir"
                value={totalHadir}
                icon={CheckCircle2}
                iconClass="text-emerald-500"
              />

              <StatCard
                title="Terlambat"
                value={totalTerlambat}
                icon={Clock3}
                iconClass="text-amber-500"
              />

              <StatCard
                title="Izin"
                value={totalIzin}
                icon={AlertCircle}
                iconClass="text-blue-500"
              />

              <StatCard
                title="Sakit"
                value={totalSakit}
                icon={AlertCircle}
                iconClass="text-orange-500"
              />

              <StatCard
                title="Alpa"
                value={totalAlpa}
                icon={XCircle}
                iconClass="text-red-500"
              />

            </div>

            {/* =================================================
                RINGKASAN KEHADIRAN
            ================================================= */}

            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <div>

                  <p className="text-xs font-medium text-slate-500">
                    Persentase Kehadiran Hari Ini
                  </p>

                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {persentaseHadir}%
                  </p>

                </div>

                <div className="flex-1 max-w-xl">

                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-[#155DFC] to-[#0d47c9] rounded-full transition-all"
                      style={{
                        width: `${persentaseHadir}%`,
                      }}
                    />

                  </div>

                  <div className="flex justify-between mt-2">

                    <span className="text-[11px] text-slate-400">
                      {totalHadir} siswa hadir
                    </span>

                    <span className="text-[11px] text-slate-400">
                      {totalSiswa} total siswa
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                FILTER
            ================================================= */}

            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm flex flex-col lg:flex-row gap-3">

              {/* SEARCH */}

              <div className="relative flex-1">

                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Cari nama, NISN, atau kelas..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 text-slate-800"
                />

              </div>

              {/* FILTER */}

              <div className="flex flex-wrap items-center gap-2">

                <Filter
                  size={15}
                  className="text-[#155DFC] hidden sm:block"
                />

                {/* TANGGAL */}

                <div className="relative">

                  <CalendarDays
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />

                  <input
                    type="date"
                    value={tanggalFilter}
                    onChange={(e) =>
                      setTanggalFilter(
                        e.target.value
                      )
                    }
                    className="text-sm rounded-lg border border-slate-200 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 bg-white text-slate-800 font-medium"
                  />

                </div>

                {/* KELAS */}

                <select
                  value={kelasFilter}
                  onChange={(e) =>
                    setKelasFilter(
                      e.target.value
                    )
                  }
                  className="text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 bg-white text-slate-800 font-medium"
                >

                  {KELAS_OPTIONS.map((k) => (

                    <option
                      key={k}
                      value={k}
                    >
                      {k}
                    </option>

                  ))}

                </select>

                {/* STATUS */}

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                  className="text-sm rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#155DFC]/25 focus:border-[#155DFC]/50 bg-white text-slate-800 font-medium"
                >

                  {STATUS_OPTIONS.map((s) => (

                    <option
                      key={s}
                      value={s}
                    >
                      {s}
                    </option>

                  ))}

                </select>

              </div>

            </div>

            {/* =================================================
                TABEL ABSENSI
            ================================================= */}

            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">

              <div className="overflow-x-auto">

                <table className="w-full text-sm border-collapse">

                  {/* TABLE HEADER */}

                  <thead>

                    <tr className="bg-gradient-to-r from-[#155DFC] to-[#0d47c9] text-white">

                      <th className="text-center font-semibold px-4 py-3 w-[60px]">
                        No
                      </th>

                      <th className="text-left font-semibold px-4 py-3 min-w-[240px]">
                        Siswa
                      </th>

                      <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">
                        Kelas
                      </th>

                      <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">
                        Jam Masuk
                      </th>

                      <th className="text-center font-semibold px-4 py-3 whitespace-nowrap">
                        Status
                      </th>

                      <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">
                        Lokasi
                      </th>

                      <th className="text-center font-semibold px-4 py-3 whitespace-nowrap">
                        Foto
                      </th>

                      <th className="text-center font-semibold px-4 py-3 whitespace-nowrap">
                        Aksi
                      </th>

                    </tr>

                  </thead>

                  {/* TABLE BODY */}

                  <tbody>

                    {filteredAbsensi.map(
                      (s, idx) => (

                        <tr
                          key={s.id}
                          className={`border-b border-slate-100 last:border-0 transition-colors hover:bg-[#eaf1ff] ${
                            idx % 2 === 0
                              ? "bg-[#f7f9ff]"
                              : "bg-white"
                          }`}
                        >

                          {/* NO */}

                          <td className="px-4 py-3 text-center">

                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#eaf1ff] text-[#155DFC] border border-[#c7dbff] text-xs font-bold">
                              {idx + 1}
                            </span>

                          </td>

                          {/* SISWA */}

                          <td className="px-4 py-3">

                            <div className="flex items-center gap-3">

                              <Avatar
                                nama={s.nama}
                              />

                              <div>

                                <p className="font-semibold text-slate-900">
                                  {s.nama}
                                </p>

                                <p className="text-[11px] text-slate-400 mt-0.5">
                                  NISN: {s.nisn}
                                </p>

                              </div>

                            </div>

                          </td>

                          {/* KELAS */}

                          <td className="px-4 py-3">

                            <span className="inline-flex items-center justify-center min-w-[48px] px-2.5 py-1 rounded-lg text-xs font-bold text-[#155DFC] bg-[#eaf1ff] border border-[#c7dbff]">
                              {s.kelas}
                            </span>

                          </td>

                          {/* JAM */}

                          <td className="px-4 py-3">

                            <div className="flex items-center gap-2">

                              <Clock3
                                size={14}
                                className="text-slate-400"
                              />

                              <span className="font-mono text-xs font-medium text-slate-600">
                                {s.jamMasuk}
                              </span>

                            </div>

                          </td>

                          {/* STATUS */}

                          <td className="px-4 py-3 text-center">

                            <StatusBadge
                              status={s.status}
                            />

                          </td>

                          {/* LOKASI */}

                          <td className="px-4 py-3">

                            {s.lokasi !== "-" ? (

                              <div className="flex items-center gap-2">

                                <MapPin
                                  size={14}
                                  className="text-[#155DFC]"
                                />

                                <div>

                                  <p className="text-xs font-medium text-slate-700">
                                    {s.lokasi}
                                  </p>

                                  {s.latitude && (
                                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                                      {s.latitude.toFixed(
                                        4
                                      )},{" "}
                                      {s.longitude.toFixed(
                                        4
                                      )}
                                    </p>
                                  )}

                                </div>

                              </div>

                            ) : (

                              <span className="text-xs text-slate-400">
                                Tidak tersedia
                              </span>

                            )}

                          </td>

                          {/* FOTO */}

                          <td className="px-4 py-3 text-center">

                            {s.foto ? (

                              <img
                                src={s.foto}
                                alt={`Foto ${s.nama}`}
                                className="w-9 h-9 rounded-lg object-cover mx-auto"
                              />

                            ) : (

                              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center mx-auto">
                                <Camera
                                  size={14}
                                  className="text-slate-400"
                                />
                              </div>

                            )}

                          </td>

                          {/* AKSI */}

                          <td className="px-4 py-3">

                            <div className="flex items-center justify-center">

                              <button
                                type="button"
                                onClick={() =>
                                  handleDetail(s)
                                }
                                title="Lihat detail absensi"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[#155DFC] bg-[#eaf1ff] border border-[#c7dbff] hover:bg-[#d6e6ff] text-xs font-medium transition-colors"
                              >

                                <Eye size={13} />

                                Detail

                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )}

                    {/* EMPTY */}

                    {filteredAbsensi.length ===
                      0 && (

                      <tr>

                        <td
                          colSpan={8}
                          className="px-4 py-12 text-center"
                        >

                          <div className="flex flex-col items-center">

                            <div className="w-12 h-12 rounded-full bg-[#eaf1ff] flex items-center justify-center mb-3">

                              <Search
                                size={20}
                                className="text-[#155DFC]"
                              />

                            </div>

                            <p className="text-sm font-semibold text-slate-700">
                              Data absensi tidak ditemukan
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                              Coba ubah tanggal,
                              kata kunci, atau filter.
                            </p>

                          </div>

                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

              {/* TABLE FOOTER */}

              <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">

                <p className="text-xs text-slate-500">

                  Menampilkan{" "}

                  <span className="font-semibold text-slate-700">
                    {filteredAbsensi.length}
                  </span>{" "}

                  dari{" "}

                  <span className="font-semibold text-slate-700">
                    {totalSiswa}
                  </span>{" "}

                  data absensi

                </p>

                <div className="flex items-center gap-2">

                  <ClipboardCheck
                    size={15}
                    className="text-[#155DFC]"
                  />

                  <span className="text-[11px] text-slate-400">
                    Monitoring Absensi Siswa
                  </span>

                </div>

              </div>

            </div>

          </div>

        </main>

      </div>

      {/* =====================================================
          DETAIL MODAL
      ===================================================== */}

      {showDetail &&
        selectedAbsen && (

          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">

              {/* HEADER MODAL */}

              <div className="flex items-center justify-between p-5 border-b border-slate-200">

                <div>

                  <h3 className="font-bold text-slate-800">
                    Detail Absensi Siswa
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    Informasi lengkap kehadiran siswa
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowDetail(false)
                  }
                  className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500"
                >
                  <XCircle size={20} />
                </button>

              </div>

              {/* CONTENT */}

              <div className="p-5 space-y-5">

                {/* PROFIL */}

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#f7f9ff] border border-[#eaf1ff]">

                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#155DFC] to-[#0d47c9] text-white flex items-center justify-center font-bold">
                    {getInitials(
                      selectedAbsen.nama
                    )}
                  </div>

                  <div className="flex-1">

                    <h4 className="font-bold text-slate-800">
                      {selectedAbsen.nama}
                    </h4>

                    <p className="text-xs text-slate-500 mt-1">
                      NISN:{" "}
                      {selectedAbsen.nisn}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">

                      <span className="px-2.5 py-1 rounded-lg bg-[#eaf1ff] border border-[#c7dbff] text-[#155DFC] text-[11px] font-bold">
                        {selectedAbsen.kelas}
                      </span>

                      <StatusBadge
                        status={
                          selectedAbsen.status
                        }
                      />

                    </div>

                  </div>

                </div>

                {/* DETAIL GRID */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  <DetailBox
                    icon={CalendarDays}
                    label="Tanggal"
                    value={
                      selectedAbsen.tanggal
                    }
                  />

                  <DetailBox
                    icon={Clock3}
                    label="Jam Masuk"
                    value={
                      selectedAbsen.jamMasuk
                    }
                  />

                  <DetailBox
                    icon={UserRound}
                    label="Wali Kelas"
                    value={
                      selectedAbsen.waliKelas
                    }
                  />

                  <DetailBox
                    icon={MapPin}
                    label="Lokasi"
                    value={
                      selectedAbsen.lokasi
                    }
                  />

                </div>

                {/* FOTO + LOKASI */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* FOTO */}

                  <div className="border border-slate-200 rounded-xl overflow-hidden">

                    <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">

                      <div className="flex items-center gap-2">

                        <Camera
                          size={15}
                          className="text-[#155DFC]"
                        />

                        <p className="text-xs font-semibold text-slate-700">
                          Foto Kehadiran
                        </p>

                      </div>

                    </div>

                    <div className="aspect-video bg-slate-100 flex items-center justify-center">

                      {selectedAbsen.foto ? (

                        <img
                          src={
                            selectedAbsen.foto
                          }
                          alt="Foto kehadiran"
                          className="w-full h-full object-cover"
                        />

                      ) : (

                        <div className="flex flex-col items-center">

                          <Camera
                            size={32}
                            className="text-slate-300"
                          />

                          <p className="text-xs text-slate-400 mt-2">
                            Foto belum tersedia
                          </p>

                        </div>

                      )}

                    </div>

                  </div>

                  {/* LOKASI */}

                  <div className="border border-slate-200 rounded-xl overflow-hidden">

                    <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">

                      <div className="flex items-center gap-2">

                        <Navigation
                          size={15}
                          className="text-[#155DFC]"
                        />

                        <p className="text-xs font-semibold text-slate-700">
                          Lokasi GPS
                        </p>

                      </div>

                    </div>

                    <div className="p-4">

                      {selectedAbsen.latitude ? (

                        <>

                          <div className="h-28 rounded-lg bg-[#eaf1ff] flex items-center justify-center relative overflow-hidden">

                            <div className="absolute inset-0 opacity-30">

                              <div className="w-full h-full bg-[linear-gradient(90deg,transparent_49%,#155DFC_50%,transparent_51%),linear-gradient(0deg,transparent_49%,#155DFC_50%,transparent_51%)] bg-[size:30px_30px]" />

                            </div>

                            <div className="relative w-10 h-10 rounded-full bg-[#155DFC]/20 flex items-center justify-center">

                              <MapPin
                                size={22}
                                className="text-[#155DFC]"
                                fill="currentColor"
                              />

                            </div>

                          </div>

                          <div className="mt-3 space-y-2">

                            <div>

                              <p className="text-[10px] text-slate-400">
                                Latitude
                              </p>

                              <p className="font-mono text-xs text-slate-700">
                                {selectedAbsen.latitude.toFixed(
                                  6
                                )}
                              </p>

                            </div>

                            <div>

                              <p className="text-[10px] text-slate-400">
                                Longitude
                              </p>

                              <p className="font-mono text-xs text-slate-700">
                                {selectedAbsen.longitude.toFixed(
                                  6
                                )}
                              </p>

                            </div>

                            <div className="flex items-center gap-2 text-[11px] text-emerald-600">

                              <Navigation
                                size={12}
                              />

                              Akurasi GPS ±
                              {
                                selectedAbsen.akurasi
                              }{" "}
                              meter

                            </div>

                          </div>

                        </>

                      ) : (

                        <div className="h-44 flex flex-col items-center justify-center">

                          <MapPin
                            size={32}
                            className="text-slate-300"
                          />

                          <p className="text-xs text-slate-400 mt-2">
                            Lokasi tidak tersedia
                          </p>

                        </div>

                      )}

                    </div>

                  </div>

                </div>

                {/* KETERANGAN */}

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">

                  <p className="text-[10px] uppercase tracking-wide font-bold text-slate-400">
                    Keterangan
                  </p>

                  <p className="text-sm text-slate-700 mt-2">
                    {selectedAbsen.keterangan ||
                      "Tidak ada keterangan."}
                  </p>

                </div>

                {/* CLOSE */}

                <button
                  type="button"
                  onClick={() =>
                    setShowDetail(false)
                  }
                  className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#155DFC] to-[#0d47c9] text-white font-semibold text-sm hover:brightness-110 transition-all"
                >
                  Tutup Detail
                </button>

              </div>

            </div>

          </div>

        )}

    </div>
  );
}

/* =========================================================
   DETAIL BOX
========================================================= */

function DetailBox({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="p-3 rounded-xl border border-slate-200">

      <div className="flex items-center gap-2">

        <Icon
          size={14}
          className="text-[#155DFC]"
        />

        <span className="text-[11px] text-slate-500">
          {label}
        </span>

      </div>

      <p className="text-sm font-semibold text-slate-700 mt-2">
        {value}
      </p>

    </div>
  );
}