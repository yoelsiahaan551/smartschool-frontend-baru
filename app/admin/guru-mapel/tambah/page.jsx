"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

import {
  Plus,
  Save,
  X,
  ArrowLeft,
  UserCheck,
  BookOpen,
  ChevronDown,
  AlertCircle,
  Calendar,
  Clock,
  MapPin,
  Trash2,
} from "lucide-react";

// =========================================================
// DUMMY DATA
// =========================================================
const DEFAULT_DATA = {
  guru: [
    {
      id: 1,
      nama: "Dr. Ahmad Fauzi, M.Pd.",
      nip: "198501012010011001",
      email: "ahmad@sekolah.com",
      phone: "081234567890",
      mapel: "Matematika",
      status: "aktif",
    },
    {
      id: 2,
      nama: "Siti Rahma, S.Pd.",
      nip: "198712152011012002",
      email: "siti@sekolah.com",
      phone: "081234567891",
      mapel: "Bahasa Indonesia",
      status: "aktif",
    },
    {
      id: 3,
      nama: "Budi Santoso, S.Si.",
      nip: "199003202012013003",
      email: "budi@sekolah.com",
      phone: "081234567892",
      mapel: "Fisika",
      status: "nonaktif",
    },
    {
      id: 4,
      nama: "Dewi Lestari, S.Pd.",
      nip: "199105152013014004",
      email: "dewi@sekolah.com",
      phone: "081234567893",
      mapel: "Biologi",
      status: "aktif",
    },
    {
      id: 5,
      nama: "Eko Prasetyo, S.Kom.",
      nip: "198706102014015005",
      email: "eko@sekolah.com",
      phone: "081234567894",
      mapel: "Pemrograman Dasar",
      status: "aktif",
    },
    {
      id: 6,
      nama: "Rina Sari, S.Pd.",
      nip: "199202152015016006",
      email: "rina@sekolah.com",
      phone: "081234567895",
      mapel: "Bahasa Inggris",
      status: "aktif",
    },
    {
      id: 7,
      nama: "Hendra Wijaya, S.Pd.",
      nip: "199305202016017007",
      email: "hendra@sekolah.com",
      phone: "081234567896",
      mapel: "Kimia",
      status: "aktif",
    },
  ],

  mapel: [
    { id: 1, nama: "Matematika", kode: "MATH" },
    { id: 2, nama: "Bahasa Indonesia", kode: "BIN" },
    { id: 3, nama: "Fisika", kode: "FIS" },
    { id: 4, nama: "Biologi", kode: "BIO" },
    { id: 5, nama: "Pemrograman Dasar", kode: "PROG" },
    { id: 6, nama: "Bahasa Inggris", kode: "BIG" },
    { id: 7, nama: "Kimia", kode: "KIM" },
    { id: 8, nama: "Sejarah", kode: "SEJ" },
    { id: 9, nama: "Geografi", kode: "GEO" },
    { id: 10, nama: "Ekonomi", kode: "EKO" },
  ],

  kelas: [
    { id: 1, nama: "X RPL 1", jenjang: "X" },
    { id: 2, nama: "X RPL 2", jenjang: "X" },
    { id: 3, nama: "X TKJ 1", jenjang: "X" },
    { id: 4, nama: "XI RPL 1", jenjang: "XI" },
    { id: 5, nama: "XI TKJ 1", jenjang: "XI" },
    { id: 6, nama: "XII RPL 1", jenjang: "XII" },
    { id: 7, nama: "XII RPL 2", jenjang: "XII" },
    { id: 8, nama: "XII TKJ 1", jenjang: "XII" },
  ],

  tahunAjaran: [
    {
      id: 1,
      tahun: "2024/2025",
      semester: ["Ganjil", "Genap"],
    },
    {
      id: 2,
      tahun: "2025/2026",
      semester: ["Ganjil", "Genap"],
    },
    {
      id: 3,
      tahun: "2026/2027",
      semester: ["Ganjil", "Genap"],
    },
  ],

  assignments: [],
};

const HARI_LIST = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export default function TambahAssignPage() {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const [guru, setGuru] = useState([]);
  const [mapel, setMapel] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [tahunAjaran, setTahunAjaran] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================================================
  // FORM STATE
  // =========================================================
  const [form, setForm] = useState({
    guru_id: "",
    mapel_id: "",
    tahun_ajaran_id: "",
    semester: "",
    kelas_ids: [],
    jadwal: [], // array of { hari, jam_mulai, jam_selesai, ruangan }
  });

  // =========================================================
  // SEARCHABLE SELECT
  // =========================================================
  const [guruSearch, setGuruSearch] = useState("");
  const [isGuruOpen, setIsGuruOpen] = useState(false);
  const guruRef = useRef(null);

  const [mapelSearch, setMapelSearch] = useState("");
  const [isMapelOpen, setIsMapelOpen] = useState(false);
  const mapelRef = useRef(null);

  const [tahunSearch, setTahunSearch] = useState("");
  const [isTahunOpen, setIsTahunOpen] = useState(false);
  const tahunRef = useRef(null);

  // =========================================================
  // FILTER DATA
  // =========================================================
  const filteredGuru = guru.filter((g) =>
    g.nama.toLowerCase().includes(guruSearch.toLowerCase())
  );

  const filteredMapel = mapel.filter((m) =>
    m.nama.toLowerCase().includes(mapelSearch.toLowerCase())
  );

  const filteredTahun = tahunAjaran.filter((t) =>
    t.tahun.toLowerCase().includes(tahunSearch.toLowerCase())
  );

  // =========================================================
  // LOAD DATA
  // =========================================================
  useEffect(() => {
    const loadData = () => {
      const stored = localStorage.getItem("guruMapelData");

      if (stored) {
        try {
          const data = JSON.parse(stored);

          setGuru(data.guru || DEFAULT_DATA.guru);
          setMapel(data.mapel || DEFAULT_DATA.mapel);
          setKelas(data.kelas || DEFAULT_DATA.kelas);
          setTahunAjaran(
            data.tahunAjaran || DEFAULT_DATA.tahunAjaran
          );
          setAssignments(data.assignments || []);
        } catch (error) {
          console.error("Gagal membaca data:", error);

          setGuru(DEFAULT_DATA.guru);
          setMapel(DEFAULT_DATA.mapel);
          setKelas(DEFAULT_DATA.kelas);
          setTahunAjaran(DEFAULT_DATA.tahunAjaran);
          setAssignments([]);
        }
      } else {
        setGuru(DEFAULT_DATA.guru);
        setMapel(DEFAULT_DATA.mapel);
        setKelas(DEFAULT_DATA.kelas);
        setTahunAjaran(DEFAULT_DATA.tahunAjaran);
        setAssignments([]);
      }
    };

    loadData();
  }, []);

  // =========================================================
  // CLOSE DROPDOWN WHEN CLICK OUTSIDE
  // =========================================================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (guruRef.current && !guruRef.current.contains(e.target)) {
        setIsGuruOpen(false);
      }

      if (mapelRef.current && !mapelRef.current.contains(e.target)) {
        setIsMapelOpen(false);
      }

      if (tahunRef.current && !tahunRef.current.contains(e.target)) {
        setIsTahunOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =========================================================
  // HANDLERS
  // =========================================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleKelas = (kelasId) => {
    setForm((prev) => {
      const ids = prev.kelas_ids.includes(kelasId)
        ? prev.kelas_ids.filter((id) => id !== kelasId)
        : [...prev.kelas_ids, kelasId];

      return {
        ...prev,
        kelas_ids: ids,
      };
    });
  };

  const handleTahunChange = (tahunId) => {
    const selected = tahunAjaran.find(
      (t) => t.id === tahunId
    );

    setForm((prev) => ({
      ...prev,
      tahun_ajaran_id: tahunId,
      semester: selected?.semester?.[0] || "",
    }));
  };

  // =========================================================
  // JADWAL HANDLERS
  // =========================================================
  const handleJadwalChange = (index, field, value) => {
    setForm((prev) => {
      const newJadwal = [...prev.jadwal];
      newJadwal[index] = { ...newJadwal[index], [field]: value };
      return { ...prev, jadwal: newJadwal };
    });
  };

  const addJadwal = () => {
    setForm((prev) => ({
      ...prev,
      jadwal: [
        ...prev.jadwal,
        { hari: "Senin", jam_mulai: "07:30", jam_selesai: "09:00", ruangan: "" },
      ],
    }));
  };

  const removeJadwal = (index) => {
    setForm((prev) => ({
      ...prev,
      jadwal: prev.jadwal.filter((_, i) => i !== index),
    }));
  };

  // =========================================================
  // SUBMIT
  // =========================================================
  const handleSubmit = () => {
    const {
      guru_id,
      mapel_id,
      tahun_ajaran_id,
      semester,
      kelas_ids,
      jadwal,
    } = form;

    if (
      !guru_id ||
      !mapel_id ||
      !tahun_ajaran_id ||
      !semester ||
      kelas_ids.length === 0
    ) {
      alert(
        "Semua field wajib diisi, dan pilih minimal satu kelas!"
      );
      return;
    }

    if (jadwal.length === 0) {
      alert("Tambahkan minimal satu jadwal mengajar!");
      return;
    }

    // Validasi jadwal lengkap
    const incompleteJadwal = jadwal.some(
      (j) => !j.hari || !j.jam_mulai || !j.jam_selesai
    );
    if (incompleteJadwal) {
      alert("Lengkapi semua data jadwal (hari, jam mulai, jam selesai)!");
      return;
    }

    const exists = assignments.some((a) => {
      if (
        a.guru_id === parseInt(guru_id) &&
        a.mapel_id === parseInt(mapel_id) &&
        a.tahun_ajaran_id === parseInt(tahun_ajaran_id) &&
        a.semester === semester
      ) {
        return a.kelas_ids.some((id) =>
          kelas_ids.includes(id)
        );
      }

      return false;
    });

    if (exists) {
      alert(
        "Guru ini sudah mengajar mapel tersebut di periode dan kelas yang sama!"
      );
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newAssignment = {
        id: Date.now(),
        guru_id: parseInt(guru_id),
        mapel_id: parseInt(mapel_id),
        tahun_ajaran_id: parseInt(tahun_ajaran_id),
        semester,
        kelas_ids,
        jadwal: jadwal,
      };

      const updatedAssignments = [
        ...assignments,
        newAssignment,
      ];

      setAssignments(updatedAssignments);

      const storedRaw =
        localStorage.getItem("guruMapelData");

      if (storedRaw) {
        try {
          const stored = JSON.parse(storedRaw);

          stored.assignments = updatedAssignments;

          localStorage.setItem(
            "guruMapelData",
            JSON.stringify(stored)
          );
        } catch (error) {
          console.error(
            "Gagal menyimpan data:",
            error
          );
        }
      } else {
        localStorage.setItem(
          "guruMapelData",
          JSON.stringify({
            ...DEFAULT_DATA,
            guru,
            mapel,
            kelas,
            tahunAjaran,
            assignments: updatedAssignments,
          })
        );
      }

      setLoading(false);

      alert("Assign berhasil ditambahkan!");

      router.push("/admin/guru-mapel");
    }, 500);
  };

  // =========================================================
  // HELPERS
  // =========================================================
  const getGuruLabel = (id) =>
    guru.find((g) => g.id === id)?.nama || "";

  const getMapelLabel = (id) =>
    mapel.find((m) => m.id === id)?.nama || "";

  const getTahunLabel = (id) =>
    tahunAjaran.find((t) => t.id === id)?.tahun || "";

  const getKelasLabel = (id) =>
    kelas.find((k) => k.id === id)?.nama || "";

  return (
    <div className="flex h-screen w-full min-w-0 overflow-hidden bg-slate-50">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <Sidebar
        active="guru"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
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
            MAIN
        ==================================================== */}
        <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full min-w-0 p-3 sm:p-4 md:p-6 lg:p-8">

            <div className="mx-auto w-full max-w-[1400px] min-w-0 space-y-5">

              {/* =================================================
                  HEADER
              ================================================== */}
              <div className="flex min-w-0 flex-col gap-4">

                <Link
                  href="/admin/guru-mapel"
                  className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                >
                  <ArrowLeft size={17} />
                  <span>Kembali</span>
                </Link>

                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
                    <Plus size={20} />
                  </div>

                  <div className="min-w-0">
                    <h1 className="text-xl font-semibold text-slate-800">
                      Assign Guru
                    </h1>

                    <p className="break-words text-sm text-slate-500">
                      Assign guru ke mapel, periode, kelas, dan jadwal mengajar
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  FORM CARD
              ================================================== */}
              <div className="w-full min-w-0 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5 md:p-6">

                <div className="space-y-5">

                  {/* =================================================
                      GURU
                  ================================================== */}
                  <div
                    ref={guruRef}
                    className="relative min-w-0"
                  >
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Pilih Guru{" "}
                      <span className="text-rose-500">*</span>
                    </label>

                    <div
                      className="w-full min-w-0 cursor-text rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition-all duration-200 hover:border-blue-300 hover:bg-blue-50/40 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10"
                      onClick={() =>
                        setIsGuruOpen(true)
                      }
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <UserCheck
                          size={17}
                          className="shrink-0 text-slate-500"
                        />

                        <input
                          type="text"
                          placeholder={
                            form.guru_id
                              ? getGuruLabel(
                                  parseInt(form.guru_id)
                                )
                              : "Cari guru..."
                          }
                          value={guruSearch}
                          onChange={(e) => {
                            setGuruSearch(e.target.value);
                            setIsGuruOpen(true);
                          }}
                          onFocus={() =>
                            setIsGuruOpen(true)
                          }
                          className="min-w-0 flex-1 bg-transparent text-slate-800 outline-none placeholder:text-slate-400"
                          autoComplete="off"
                        />

                        <ChevronDown
                          size={17}
                          className={`ml-auto shrink-0 text-slate-500 transition-transform ${
                            isGuruOpen
                              ? "rotate-180 text-blue-500"
                              : ""
                          }`}
                        />
                      </div>
                    </div>

                    {isGuruOpen && (
                      <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                        {filteredGuru.length === 0 ? (
                          <li className="px-4 py-3 text-sm text-slate-500">
                            Tidak ada guru
                          </li>
                        ) : (
                          filteredGuru.map((g) => (
                            <li
                              key={g.id}
                              className={`cursor-pointer rounded-lg px-4 py-3 text-sm transition-all duration-150 hover:bg-blue-50 hover:text-blue-700 ${
                                form.guru_id ===
                                String(g.id)
                                  ? "bg-blue-100 font-semibold text-blue-700"
                                  : "text-slate-700"
                              }`}
                              onClick={() => {
                                setForm({
                                  ...form,
                                  guru_id: String(g.id),
                                });

                                setGuruSearch("");
                                setIsGuruOpen(false);
                              }}
                            >
                              <div className="break-words">
                                <p className="font-medium">
                                  {g.nama}
                                </p>
                                <p className="mt-0.5 text-xs text-slate-400">
                                  {g.mapel}
                                </p>
                              </div>
                            </li>
                          ))
                        )}
                      </ul>
                    )}
                  </div>

                  {/* =================================================
                      MAPEL
                  ================================================== */}
                  <div
                    ref={mapelRef}
                    className="relative min-w-0"
                  >
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Pilih Mata Pelajaran{" "}
                      <span className="text-rose-500">*</span>
                    </label>

                    <div
                      className="w-full min-w-0 cursor-text rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition-all duration-200 hover:border-blue-300 hover:bg-blue-50/40 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10"
                      onClick={() =>
                        setIsMapelOpen(true)
                      }
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <BookOpen
                          size={17}
                          className="shrink-0 text-slate-500"
                        />

                        <input
                          type="text"
                          placeholder={
                            form.mapel_id
                              ? getMapelLabel(
                                  parseInt(form.mapel_id)
                                )
                              : "Cari mata pelajaran..."
                          }
                          value={mapelSearch}
                          onChange={(e) => {
                            setMapelSearch(e.target.value);
                            setIsMapelOpen(true);
                          }}
                          onFocus={() =>
                            setIsMapelOpen(true)
                          }
                          className="min-w-0 flex-1 bg-transparent text-slate-800 outline-none placeholder:text-slate-400"
                          autoComplete="off"
                        />

                        <ChevronDown
                          size={17}
                          className={`ml-auto shrink-0 text-slate-500 transition-transform ${
                            isMapelOpen
                              ? "rotate-180 text-blue-500"
                              : ""
                          }`}
                        />
                      </div>
                    </div>

                    {isMapelOpen && (
                      <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                        {filteredMapel.length === 0 ? (
                          <li className="px-4 py-3 text-sm text-slate-500">
                            Tidak ada mata pelajaran
                          </li>
                        ) : (
                          filteredMapel.map((m) => (
                            <li
                              key={m.id}
                              className={`cursor-pointer rounded-lg px-4 py-3 text-sm transition-all duration-150 hover:bg-blue-50 hover:text-blue-700 ${
                                form.mapel_id ===
                                String(m.id)
                                  ? "bg-blue-100 font-semibold text-blue-700"
                                  : "text-slate-700"
                              }`}
                              onClick={() => {
                                setForm({
                                  ...form,
                                  mapel_id: String(m.id),
                                });

                                setMapelSearch("");
                                setIsMapelOpen(false);
                              }}
                            >
                              <div className="flex min-w-0 items-center justify-between gap-3">
                                <span className="min-w-0 break-words font-medium">
                                  {m.nama}
                                </span>

                                <span className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">
                                  {m.kode}
                                </span>
                              </div>
                            </li>
                          ))
                        )}
                      </ul>
                    )}
                  </div>

                  {/* =================================================
                      TAHUN AJARAN
                  ================================================== */}
                  <div
                    ref={tahunRef}
                    className="relative min-w-0"
                  >
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Tahun Ajaran{" "}
                      <span className="text-rose-500">*</span>
                    </label>

                    <div
                      className="w-full min-w-0 cursor-text rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition-all duration-200 hover:border-blue-300 hover:bg-blue-50/40 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10"
                      onClick={() =>
                        setIsTahunOpen(true)
                      }
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <Calendar
                          size={17}
                          className="shrink-0 text-slate-500"
                        />

                        <input
                          type="text"
                          placeholder={
                            form.tahun_ajaran_id
                              ? getTahunLabel(
                                  parseInt(
                                    form.tahun_ajaran_id
                                  )
                                )
                              : "Cari tahun ajaran..."
                          }
                          value={tahunSearch}
                          onChange={(e) => {
                            setTahunSearch(e.target.value);
                            setIsTahunOpen(true);
                          }}
                          onFocus={() =>
                            setIsTahunOpen(true)
                          }
                          className="min-w-0 flex-1 bg-transparent text-slate-800 outline-none placeholder:text-slate-400"
                          autoComplete="off"
                        />

                        <ChevronDown
                          size={17}
                          className={`ml-auto shrink-0 text-slate-500 transition-transform ${
                            isTahunOpen
                              ? "rotate-180 text-blue-500"
                              : ""
                          }`}
                        />
                      </div>
                    </div>

                    {isTahunOpen && (
                      <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                        {filteredTahun.length === 0 ? (
                          <li className="px-4 py-3 text-sm text-slate-500">
                            Tidak ada tahun ajaran
                          </li>
                        ) : (
                          filteredTahun.map((t) => (
                            <li
                              key={t.id}
                              className={`cursor-pointer rounded-lg px-4 py-3 text-sm transition-all duration-150 hover:bg-blue-50 hover:text-blue-700 ${
                                form.tahun_ajaran_id ===
                                String(t.id)
                                  ? "bg-blue-100 font-semibold text-blue-700"
                                  : "text-slate-700"
                              }`}
                              onClick={() => {
                                handleTahunChange(t.id);
                                setTahunSearch("");
                                setIsTahunOpen(false);
                              }}
                            >
                              {t.tahun}
                            </li>
                          ))
                        )}
                      </ul>
                    )}
                  </div>

                  {/* =================================================
                      SEMESTER
                  ================================================== */}
                  <div className="min-w-0">
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Semester{" "}
                      <span className="text-rose-500">*</span>
                    </label>

                    <div className="relative min-w-0">
                      <select
                        name="semester"
                        value={form.semester}
                        onChange={handleChange}
                        className="w-full min-w-0 cursor-pointer appearance-none rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-50/40 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                      >
                        <option value="">
                          Pilih Semester
                        </option>

                        {tahunAjaran
                          .find(
                            (t) =>
                              t.id ===
                              parseInt(
                                form.tahun_ajaran_id
                              )
                          )
                          ?.semester.map((s) => (
                            <option
                              key={s}
                              value={s}
                            >
                              {s}
                            </option>
                          ))}
                      </select>

                      <ChevronDown
                        size={17}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                      />

                      <Calendar
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                      />
                    </div>
                  </div>

                  {/* =================================================
                      KELAS
                  ================================================== */}
                  <div className="min-w-0">
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Pilih Kelas (bisa lebih dari satu){" "}
                      <span className="text-rose-500">*</span>
                    </label>

                    <div className="max-h-56 min-w-0 overflow-y-auto rounded-xl border border-slate-300 bg-slate-50 p-3 shadow-sm">
                      {kelas.length === 0 ? (
                        <p className="text-sm text-slate-500">
                          Belum ada data kelas
                        </p>
                      ) : (
                        <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {kelas.map((k) => (
                            <label
                              key={k.id}
                              className={`flex min-w-0 cursor-pointer items-center gap-2 rounded-lg border p-2.5 transition-all duration-150 ${
                                form.kelas_ids.includes(
                                  k.id
                                )
                                  ? "border-blue-300 bg-blue-100 text-blue-700"
                                  : "border-transparent hover:border-blue-200 hover:bg-blue-50"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={form.kelas_ids.includes(
                                  k.id
                                )}
                                onChange={() =>
                                  toggleKelas(k.id)
                                }
                                className="h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                              />

                              <span className="min-w-0 break-words text-sm">
                                {k.nama}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {form.kelas_ids.length > 0 && (
                      <p className="mt-2 break-words text-xs text-slate-500">
                        Terpilih:{" "}
                        {form.kelas_ids
                          .map((id) =>
                            getKelasLabel(id)
                          )
                          .join(", ")}
                      </p>
                    )}
                  </div>

                  {/* =================================================
                      JADWAL MENGAJAR
                  ================================================== */}
                  <div className="min-w-0 border-t border-slate-200 pt-4">
                    <div className="mb-3 flex min-w-0 flex-wrap items-center justify-between gap-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-700">
                          Jadwal Mengajar{" "}
                          <span className="text-rose-500">*</span>
                        </label>
                        <p className="text-xs text-slate-400">
                          Tambahkan jadwal per hari untuk guru ini
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={addJadwal}
                        className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-blue-700"
                      >
                        <Plus size={15} />
                        Tambah Jadwal
                      </button>
                    </div>

                    {form.jadwal.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-6 text-center">
                        <Clock size={24} className="mx-auto text-slate-400" />
                        <p className="mt-2 text-sm text-slate-500">
                          Belum ada jadwal. Klik "Tambah Jadwal" untuk menambahkan.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {form.jadwal.map((item, index) => (
                          <div
                            key={index}
                            className="flex min-w-0 flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3"
                          >
                            {/* HARI */}
                            <div className="min-w-[120px] flex-1">
                              <label className="mb-1 block text-[10px] font-medium text-slate-500">
                                Hari
                              </label>
                              <select
                                value={item.hari}
                                onChange={(e) =>
                                  handleJadwalChange(
                                    index,
                                    "hari",
                                    e.target.value
                                  )
                                }
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                              >
                                {HARI_LIST.map((h) => (
                                  <option key={h} value={h}>
                                    {h}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* JAM MULAI */}
                            <div className="min-w-[110px] flex-1">
                              <label className="mb-1 block text-[10px] font-medium text-slate-500">
                                Jam Mulai
                              </label>
                              <input
                                type="time"
                                value={item.jam_mulai}
                                onChange={(e) =>
                                  handleJadwalChange(
                                    index,
                                    "jam_mulai",
                                    e.target.value
                                  )
                                }
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                              />
                            </div>

                            {/* JAM SELESAI */}
                            <div className="min-w-[110px] flex-1">
                              <label className="mb-1 block text-[10px] font-medium text-slate-500">
                                Jam Selesai
                              </label>
                              <input
                                type="time"
                                value={item.jam_selesai}
                                onChange={(e) =>
                                  handleJadwalChange(
                                    index,
                                    "jam_selesai",
                                    e.target.value
                                  )
                                }
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                              />
                            </div>

                            {/* RUANGAN */}
                            <div className="min-w-[120px] flex-1">
                              <label className="mb-1 block text-[10px] font-medium text-slate-500">
                                Ruangan
                              </label>
                              <div className="flex items-center gap-2">
                                <MapPin size={15} className="text-slate-400" />
                                <input
                                  type="text"
                                  placeholder="Contoh: A-01"
                                  value={item.ruangan}
                                  onChange={(e) =>
                                    handleJadwalChange(
                                      index,
                                      "ruangan",
                                      e.target.value
                                    )
                                  }
                                  className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                                />
                              </div>
                            </div>

                            {/* HAPUS */}
                            <button
                              type="button"
                              onClick={() => removeJadwal(index)}
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-rose-200 text-rose-500 transition-all hover:bg-rose-50 hover:text-rose-600"
                              title="Hapus jadwal"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* =================================================
                      INFO
                  ================================================== */}
                  <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle
                        size={16}
                        className="mt-0.5 shrink-0 text-blue-500"
                      />

                      <div className="min-w-0">
                        <p className="text-xs font-medium text-blue-600">
                          Informasi
                        </p>

                        <p className="break-words text-[10px] text-blue-500">
                          Guru akan di-assign ke semua kelas yang dipilih untuk
                          periode yang sama dengan jadwal yang ditentukan.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    ACTION BUTTON
                ================================================== */}
                <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-end">

                  <Link
                    href="/admin/guru-mapel"
                    className="w-full rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
                  >
                    Batal
                  </Link>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-lg hover:shadow-blue-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none sm:w-auto"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save size={17} />
                        Simpan
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}