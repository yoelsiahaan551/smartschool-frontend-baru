"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

import {
  ArrowLeft,
  Users,
  BookOpen,
  Calendar,
  MapPin,
  Plus,
  Trash2,
  Edit,
  UserCheck,
  GraduationCap,
  X,
  Check,
  Clock3,
  School,
} from "lucide-react";

const STORAGE_KEY = "kelas_data";
const GURU_STORAGE = "guru_data";
const MAPEL_STORAGE = "mapel_data";

const HARI_LIST = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

// =========================================================
// LOAD DATA
// =========================================================

const loadKelas = () => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);

  try {
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const loadGuru = () => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(GURU_STORAGE);

  try {
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const loadMapel = () => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(MAPEL_STORAGE);

  try {
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveKelas = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// =========================================================
// MAIN COMPONENT
// =========================================================

export default function DetailKelasPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [kelas, setKelas] = useState(null);

  const [guruList, setGuruList] = useState([]);
  const [mapelList, setMapelList] = useState([]);

  const [activeTab, setActiveTab] = useState("kelas");

  const [jadwal, setJadwal] = useState([]);
  const [showAddJadwal, setShowAddJadwal] = useState(false);

  const [newJadwal, setNewJadwal] = useState({
    hari: "Senin",
    jamMulai: "07:30",
    jamSelesai: "09:00",
    mapel: "",
    ruangan: "",
    guru: "",
  });

  // =========================================================
  // LOAD
  // =========================================================

  useEffect(() => {
    const dataKelas = loadKelas();

    const found = dataKelas.find((k) => Number(k.id) === id);

    if (found) {
      setKelas(found);
      setJadwal(found.jadwal || []);
    } else {
      alert("Kelas tidak ditemukan!");
      router.push("/admin/kelas");
      return;
    }

    setGuruList(loadGuru());
    setMapelList(loadMapel());
  }, [id, router]);

  // =========================================================
  // ADD JADWAL
  // =========================================================

  const handleAddJadwal = () => {
    if (!newJadwal.mapel || !newJadwal.guru) {
      alert("Mata pelajaran dan guru wajib diisi!");
      return;
    }

    const newEntry = {
      id: Date.now(),
      ...newJadwal,
    };

    const updatedJadwal = [...jadwal, newEntry];

    setJadwal(updatedJadwal);

    const dataKelas = loadKelas();

    const index = dataKelas.findIndex(
      (k) => Number(k.id) === id
    );

    if (index !== -1) {
      dataKelas[index].jadwal = updatedJadwal;
      saveKelas(dataKelas);
    }

    setNewJadwal({
      hari: "Senin",
      jamMulai: "07:30",
      jamSelesai: "09:00",
      mapel: "",
      ruangan: "",
      guru: "",
    });

    setShowAddJadwal(false);
  };

  // =========================================================
  // DELETE JADWAL
  // =========================================================

  const handleDeleteJadwal = (jadwalId) => {
    if (!confirm("Hapus jadwal ini?")) return;

    const updated = jadwal.filter(
      (j) => j.id !== jadwalId
    );

    setJadwal(updated);

    const dataKelas = loadKelas();

    const index = dataKelas.findIndex(
      (k) => Number(k.id) === id
    );

    if (index !== -1) {
      dataKelas[index].jadwal = updated;
      saveKelas(dataKelas);
    }
  };

  // =========================================================
  // COUNT JAM GURU
  // =========================================================

  const countJamPerGuru = () => {
    const counts = {};

    jadwal.forEach((j) => {
      if (j.guru) {
        counts[j.guru] =
          (counts[j.guru] || 0) + 1;
      }
    });

    return counts;
  };

  const jamPerGuru = countJamPerGuru();

  // =========================================================
  // GURU LABEL
  // =========================================================

  const getGuruLabel = (nama) => {
    const found = guruList.find(
      (g) =>
        g.nama === nama ||
        g.id === Number(nama)
    );

    return found ? found.nama : nama;
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (!kelas) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#F4F7FB]">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-[#2563EB]" />
          <p className="text-sm font-medium text-slate-500">
            Memuat data kelas...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F4F7FB]">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar
        active="kelas"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      {/* =====================================================
          MAIN WRAPPER
      ===================================================== */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

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

        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">

          <div className="w-full px-4 py-5 sm:px-5 md:px-7 lg:px-8 xl:px-10">

            <div className="mx-auto w-full max-w-[1600px] space-y-6">

              {/* =================================================
                  PAGE HEADER
              ================================================= */}

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div className="min-w-0">

                  <button
                    onClick={() => router.back()}
                    className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#1E3A8A]"
                  >
                    <ArrowLeft size={17} />
                    <span>
                      Kembali ke Daftar Kelas
                    </span>
                  </button>

                  <div className="flex flex-wrap items-center gap-3">

                    <h1 className="text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl">
                      {kelas.nama}
                    </h1>

                    <span className="inline-flex items-center border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#1E3A8A]">
                      {kelas.jenjang}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 border px-3 py-1 text-xs font-semibold ${
                        kelas.status === "aktif"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-rose-200 bg-rose-50 text-rose-700"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          kelas.status === "aktif"
                            ? "bg-emerald-500"
                            : "bg-rose-500"
                        }`}
                      />

                      {kelas.status === "aktif"
                        ? "Aktif"
                        : "Nonaktif"}
                    </span>

                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    Informasi detail dan pengelolaan kelas
                  </p>

                </div>

                <button
                  onClick={() =>
                    router.push(
                      `/admin/kelas/edit/${kelas.id}`
                    )
                  }
                  className="inline-flex shrink-0 items-center justify-center gap-2 border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-[#2563EB] hover:bg-blue-50 hover:text-[#1E3A8A]"
                >
                  <Edit size={16} />
                  Edit Kelas
                </button>

              </div>

              {/* =================================================
                  OVERVIEW CARD
              ================================================= */}

              <section className="overflow-hidden border border-slate-200 bg-white shadow-sm">

                <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">

                  {/* WALI KELAS */}

                  <div className="flex min-w-0 items-center gap-4 p-5">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-blue-50 text-[#2563EB]">
                      <GraduationCap size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="mb-1 text-xs font-medium text-slate-400">
                        Wali Kelas
                      </p>

                      <p className="truncate text-sm font-semibold text-[#0F172A]">
                        {kelas.wali_kelas || "-"}
                      </p>
                    </div>

                  </div>

                  {/* TAHUN AJARAN */}

                  <div className="flex min-w-0 items-center gap-4 p-5">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-blue-50 text-[#2563EB]">
                      <Calendar size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="mb-1 text-xs font-medium text-slate-400">
                        Tahun Ajaran
                      </p>

                      <p className="truncate text-sm font-semibold text-[#0F172A]">
                        {kelas.tahun_ajaran || "-"}
                      </p>
                    </div>

                  </div>

                  {/* JUMLAH SISWA */}

                  <div className="flex min-w-0 items-center gap-4 p-5">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-blue-50 text-[#2563EB]">
                      <Users size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="mb-1 text-xs font-medium text-slate-400">
                        Jumlah Siswa
                      </p>

                      <p className="truncate text-sm font-semibold text-[#0F172A]">
                        {kelas.jumlah_siswa || 0} siswa
                      </p>
                    </div>

                  </div>

                  {/* RUANGAN */}

                  <div className="flex min-w-0 items-center gap-4 p-5">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-blue-50 text-[#2563EB]">
                      <MapPin size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="mb-1 text-xs font-medium text-slate-400">
                        Ruangan
                      </p>

                      <p className="truncate text-sm font-semibold text-[#0F172A]">
                        {kelas.ruangan || "-"}
                      </p>
                    </div>

                  </div>

                </div>

              </section>

              {/* =================================================
                  TABS
              ================================================= */}

              <div className="border-b border-slate-200">

                <div className="overflow-x-auto">

                  <nav className="flex min-w-max gap-1">

                    <button
                      onClick={() =>
                        setActiveTab("kelas")
                      }
                      className={`inline-flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-semibold transition ${
                        activeTab === "kelas"
                          ? "border-[#2563EB] text-[#1E3A8A]"
                          : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                      }`}
                    >
                      <School size={16} />
                      Informasi Kelas
                    </button>

                    <button
                      onClick={() =>
                        setActiveTab("guru")
                      }
                      className={`inline-flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-semibold transition ${
                        activeTab === "guru"
                          ? "border-[#2563EB] text-[#1E3A8A]"
                          : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                      }`}
                    >
                      <UserCheck size={16} />
                      Guru / Wali Kelas
                    </button>

                    <button
                      onClick={() =>
                        setActiveTab("jadwal")
                      }
                      className={`inline-flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-semibold transition ${
                        activeTab === "jadwal"
                          ? "border-[#2563EB] text-[#1E3A8A]"
                          : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                      }`}
                    >
                      <BookOpen size={16} />
                      Mata Pelajaran / Jadwal
                    </button>

                  </nav>

                </div>

              </div>

              {/* =================================================
                  TAB CONTENT
              ================================================= */}

              <section className="min-w-0 overflow-hidden border border-slate-200 bg-white shadow-sm">

                {/* =================================================
                    TAB KELAS
                ================================================= */}

                {activeTab === "kelas" && (
                  <div>

                    <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

                      <h2 className="text-base font-bold text-[#0F172A]">
                        Informasi Kelas
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Detail informasi kelas yang sedang dipilih.
                      </p>

                    </div>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-0 md:grid-cols-2">

                      {[
                        ["Nama Kelas", kelas.nama],
                        ["Jenjang", kelas.jenjang],
                        [
                          "Tahun Ajaran",
                          kelas.tahun_ajaran || "-",
                        ],
                        [
                          "Wali Kelas",
                          kelas.wali_kelas || "-",
                        ],
                        [
                          "Jumlah Siswa",
                          kelas.jumlah_siswa || 0,
                        ],
                        [
                          "Ruangan",
                          kelas.ruangan || "-",
                        ],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="border-b border-slate-100 px-5 py-5 sm:px-6"
                        >
                          <p className="mb-1.5 text-xs font-medium text-slate-400">
                            {label}
                          </p>

                          <p className="text-sm font-semibold text-[#0F172A]">
                            {value}
                          </p>
                        </div>
                      ))}

                      <div className="border-b border-slate-100 px-5 py-5 sm:px-6 md:col-span-2">

                        <p className="mb-2 text-xs font-medium text-slate-400">
                          Status Kelas
                        </p>

                        <span
                          className={`inline-flex items-center gap-2 border px-3 py-1.5 text-xs font-semibold ${
                            kelas.status === "aktif"
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                              : "border-rose-200 bg-rose-50 text-rose-700"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              kelas.status === "aktif"
                                ? "bg-emerald-500"
                                : "bg-rose-500"
                            }`}
                          />

                          {kelas.status === "aktif"
                            ? "Kelas Aktif"
                            : "Kelas Nonaktif"}
                        </span>

                      </div>

                    </div>

                  </div>
                )}

                {/* =================================================
                    TAB GURU
                ================================================= */}

                {activeTab === "guru" && (
                  <div>

                    <div className="flex flex-col gap-1 border-b border-slate-100 px-5 py-5 sm:px-6">

                      <h2 className="text-base font-bold text-[#0F172A]">
                        Guru dan Wali Kelas
                      </h2>

                      <p className="text-sm text-slate-500">
                        Daftar guru yang terkait dengan kegiatan pembelajaran kelas.
                      </p>

                    </div>

                    <div className="w-full overflow-x-auto">

                      <table className="w-full min-w-[760px] text-sm">

                        <thead>

                          <tr className="border-b border-slate-200 bg-slate-50/80">

                            <th className="whitespace-nowrap px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              No
                            </th>

                            <th className="whitespace-nowrap px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              Nama Guru
                            </th>

                            <th className="whitespace-nowrap px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              Mata Pelajaran
                            </th>

                            <th className="whitespace-nowrap px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              Peran
                            </th>

                            <th className="whitespace-nowrap px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              Jam Mengajar
                            </th>

                          </tr>

                        </thead>

                        <tbody>

                          {guruList
                            .filter((g) => g.mapel)
                            .map((g, index) => {

                              const jam =
                                jamPerGuru[g.nama] || 0;

                              const isWali =
                                g.nama === kelas.wali_kelas;

                              return (
                                <tr
                                  key={g.id}
                                  className="border-b border-slate-100 transition hover:bg-blue-50/30"
                                >

                                  <td className="px-5 py-4 text-slate-500">
                                    {index + 1}
                                  </td>

                                  <td className="px-5 py-4">

                                    <div className="flex items-center gap-3">

                                      <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-blue-50 text-xs font-bold text-[#1E3A8A]">
                                        {g.nama
                                          ?.charAt(0)
                                          ?.toUpperCase()}
                                      </div>

                                      <span className="font-semibold text-[#0F172A]">
                                        {g.nama}
                                      </span>

                                    </div>

                                  </td>

                                  <td className="px-5 py-4 text-slate-600">
                                    {g.mapel}
                                  </td>

                                  <td className="px-5 py-4">

                                    {isWali ? (
                                      <span className="inline-flex items-center gap-1.5 border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#1E3A8A]">
                                        <UserCheck size={13} />
                                        Wali Kelas
                                      </span>
                                    ) : (
                                      <span className="text-slate-500">
                                        Guru
                                      </span>
                                    )}

                                  </td>

                                  <td className="px-5 py-4">

                                    <span className="font-semibold text-[#1E3A8A]">
                                      {jam} jam
                                    </span>

                                  </td>

                                </tr>
                              );
                            })}

                          {guruList.filter(
                            (g) => g.mapel
                          ).length === 0 && (
                            <tr>
                              <td
                                colSpan={5}
                                className="px-5 py-12 text-center"
                              >
                                <UserCheck
                                  size={30}
                                  className="mx-auto mb-3 text-slate-300"
                                />

                                <p className="text-sm font-semibold text-slate-600">
                                  Belum ada guru
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                  Belum ada guru yang di-assign ke kelas ini.
                                </p>

                              </td>
                            </tr>
                          )}

                        </tbody>

                      </table>

                    </div>

                  </div>
                )}

                {/* =================================================
                    TAB JADWAL
                ================================================= */}

                {activeTab === "jadwal" && (
                  <div>

                    {/* HEADER JADWAL */}

                    <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">

                      <div>

                        <h2 className="text-base font-bold text-[#0F172A]">
                          Jadwal Pelajaran
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                          Atur jadwal mata pelajaran dan guru pengajar.
                        </p>

                      </div>

                      <button
                        onClick={() =>
                          setShowAddJadwal(
                            !showAddJadwal
                          )
                        }
                        className="inline-flex items-center justify-center gap-2 bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1E3A8A]"
                      >
                        {showAddJadwal ? (
                          <X size={16} />
                        ) : (
                          <Plus size={16} />
                        )}

                        {showAddJadwal
                          ? "Tutup Form"
                          : "Tambah Jadwal"}
                      </button>

                    </div>

                    {/* =================================================
                        FORM TAMBAH JADWAL
                    ================================================= */}

                    {showAddJadwal && (
                      <div className="border-b border-slate-200 bg-slate-50/80 p-5 sm:p-6">

                        <div className="mb-5">

                          <h3 className="text-sm font-bold text-[#0F172A]">
                            Tambah Jadwal Baru
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            Lengkapi informasi jadwal pembelajaran.
                          </p>

                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

                          {/* HARI */}

                          <div className="min-w-0">

                            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                              Hari
                            </label>

                            <select
                              value={newJadwal.hari}
                              onChange={(e) =>
                                setNewJadwal({
                                  ...newJadwal,
                                  hari: e.target.value,
                                })
                              }
                              className="h-10 w-full min-w-0 border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                            >
                              {HARI_LIST.map(
                                (hari) => (
                                  <option
                                    key={hari}
                                    value={hari}
                                  >
                                    {hari}
                                  </option>
                                )
                              )}
                            </select>

                          </div>

                          {/* JAM MULAI */}

                          <div className="min-w-0">

                            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                              Jam Mulai
                            </label>

                            <input
                              type="time"
                              value={
                                newJadwal.jamMulai
                              }
                              onChange={(e) =>
                                setNewJadwal({
                                  ...newJadwal,
                                  jamMulai:
                                    e.target.value,
                                })
                              }
                              className="h-10 w-full min-w-0 border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                            />

                          </div>

                          {/* JAM SELESAI */}

                          <div className="min-w-0">

                            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                              Jam Selesai
                            </label>

                            <input
                              type="time"
                              value={
                                newJadwal.jamSelesai
                              }
                              onChange={(e) =>
                                setNewJadwal({
                                  ...newJadwal,
                                  jamSelesai:
                                    e.target.value,
                                })
                              }
                              className="h-10 w-full min-w-0 border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                            />

                          </div>

                          {/* MAPEL */}

                          <div className="min-w-0">

                            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                              Mata Pelajaran
                            </label>

                            <select
                              value={
                                newJadwal.mapel
                              }
                              onChange={(e) =>
                                setNewJadwal({
                                  ...newJadwal,
                                  mapel:
                                    e.target.value,
                                })
                              }
                              className="h-10 w-full min-w-0 border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                            >
                              <option value="">
                                Pilih Mapel
                              </option>

                              {mapelList.map(
                                (m) => (
                                  <option
                                    key={m.id}
                                    value={m.nama}
                                  >
                                    {m.nama}
                                  </option>
                                )
                              )}
                            </select>

                          </div>

                          {/* GURU */}

                          <div className="min-w-0">

                            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                              Guru
                            </label>

                            <select
                              value={
                                newJadwal.guru
                              }
                              onChange={(e) =>
                                setNewJadwal({
                                  ...newJadwal,
                                  guru:
                                    e.target.value,
                                })
                              }
                              className="h-10 w-full min-w-0 border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                            >
                              <option value="">
                                Pilih Guru
                              </option>

                              {guruList.map(
                                (g) => (
                                  <option
                                    key={g.id}
                                    value={g.nama}
                                  >
                                    {g.nama}
                                  </option>
                                )
                              )}
                            </select>

                          </div>

                          {/* RUANGAN */}

                          <div className="min-w-0">

                            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                              Ruangan
                            </label>

                            <input
                              type="text"
                              placeholder="A-01"
                              value={
                                newJadwal.ruangan
                              }
                              onChange={(e) =>
                                setNewJadwal({
                                  ...newJadwal,
                                  ruangan:
                                    e.target.value,
                                })
                              }
                              className="h-10 w-full min-w-0 border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                            />

                          </div>

                        </div>

                        {/* BUTTON FORM */}

                        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row">

                          <button
                            onClick={() =>
                              setShowAddJadwal(false)
                            }
                            className="inline-flex h-10 items-center justify-center gap-2 border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                          >
                            <X size={15} />
                            Batal
                          </button>

                          <button
                            onClick={handleAddJadwal}
                            className="inline-flex h-10 items-center justify-center gap-2 bg-[#2563EB] px-5 text-sm font-semibold text-white transition hover:bg-[#1E3A8A]"
                          >
                            <Check size={16} />
                            Simpan Jadwal
                          </button>

                        </div>

                      </div>
                    )}

                    {/* =================================================
                        TABLE JADWAL
                    ================================================= */}

                    <div className="w-full overflow-x-auto">

                      <table className="w-full min-w-[1050px] text-sm">

                        <thead>

                          <tr className="border-b border-slate-200 bg-slate-50/80">

                            <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              No
                            </th>

                            <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              Hari
                            </th>

                            <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              Waktu
                            </th>

                            <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              Mata Pelajaran
                            </th>

                            <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              Guru
                            </th>

                            <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              Ruangan
                            </th>

                            <th className="px-5 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              Aksi
                            </th>

                          </tr>

                        </thead>

                        <tbody>

                          {jadwal.length === 0 ? (
                            <tr>

                              <td
                                colSpan={7}
                                className="px-5 py-14 text-center"
                              >

                                <div className="mx-auto flex h-12 w-12 items-center justify-center bg-slate-100 text-slate-400">
                                  <Calendar size={23} />
                                </div>

                                <p className="mt-4 text-sm font-semibold text-slate-600">
                                  Belum ada jadwal
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                  Tambahkan jadwal pelajaran untuk kelas ini.
                                </p>

                              </td>

                            </tr>
                          ) : (
                            jadwal.map(
                              (j, index) => (
                                <tr
                                  key={j.id}
                                  className="border-b border-slate-100 transition hover:bg-blue-50/30"
                                >

                                  <td className="px-5 py-4 text-slate-500">
                                    {index + 1}
                                  </td>

                                  <td className="px-5 py-4">

                                    <span className="font-semibold text-[#0F172A]">
                                      {j.hari}
                                    </span>

                                  </td>

                                  <td className="px-5 py-4">

                                    <div className="flex items-center gap-2 text-slate-600">

                                      <Clock3
                                        size={15}
                                        className="text-slate-400"
                                      />

                                      <span className="whitespace-nowrap">
                                        {j.jamMulai} –{" "}
                                        {j.jamSelesai}
                                      </span>

                                    </div>

                                  </td>

                                  <td className="px-5 py-4">

                                    <span className="font-semibold text-[#0F172A]">
                                      {j.mapel}
                                    </span>

                                  </td>

                                  <td className="px-5 py-4 text-slate-600">
                                    {getGuruLabel(
                                      j.guru
                                    )}
                                  </td>

                                  <td className="px-5 py-4">

                                    <div className="flex items-center gap-2 text-slate-600">

                                      <MapPin
                                        size={14}
                                        className="text-slate-400"
                                      />

                                      <span>
                                        {j.ruangan ||
                                          "-"}
                                      </span>

                                    </div>

                                  </td>

                                  <td className="px-5 py-4 text-right">

                                    <button
                                      onClick={() =>
                                        handleDeleteJadwal(
                                          j.id
                                        )
                                      }
                                      title="Hapus jadwal"
                                      className="inline-flex h-8 w-8 items-center justify-center border border-transparent text-slate-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                                    >
                                      <Trash2
                                        size={16}
                                      />
                                    </button>

                                  </td>

                                </tr>
                              )
                            )
                          )}

                        </tbody>

                      </table>

                    </div>

                    {/* TOTAL */}

                    {jadwal.length > 0 && (
                      <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-3.5 sm:px-6">

                        <div className="flex flex-col gap-1 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">

                          <span>
                            Total{" "}
                            <strong className="font-semibold text-slate-700">
                              {jadwal.length}
                            </strong>{" "}
                            jadwal pelajaran
                          </span>

                          <span>
                            Kelas{" "}
                            <strong className="font-semibold text-[#1E3A8A]">
                              {kelas.nama}
                            </strong>
                          </span>

                        </div>

                      </div>
                    )}

                  </div>
                )}

              </section>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}