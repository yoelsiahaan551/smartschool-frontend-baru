"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Header from "../../../../components/Header";
import Sidebar from "../../../../components/Sidebar";

import {
  Edit,
  Save,
  X,
  UserCheck,
  BookOpen,
  GraduationCap,
  ChevronDown,
  AlertCircle,
  ArrowLeft,
  User,
  BookMarked,
  RefreshCw,
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
  ],

  assignments: [],
};

// =========================================================
// COMPONENT
// =========================================================
export default function EditAssignPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const [guru, setGuru] = useState([]);
  const [mapel, setMapel] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [currentAssignment, setCurrentAssignment] = useState(null);

  const [form, setForm] = useState({
    guru_id: "",
    mapel_id: "",
    kelas_id: "",
  });

  // =========================================================
  // SIDEBAR
  // =========================================================
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  // =========================================================
  // LOAD DATA
  // =========================================================
  useEffect(() => {
    const loadData = () => {
      try {
        const stored = localStorage.getItem("guruMapelData");

        if (!stored) {
          alert("Data tidak ditemukan!");
          router.push("/admin/guru-mapel");
          return;
        }

        const data = JSON.parse(stored);

        const guruData = data.guru || DEFAULT_DATA.guru;
        const mapelData = data.mapel || DEFAULT_DATA.mapel;
        const kelasData = data.kelas || DEFAULT_DATA.kelas;
        const assignmentData =
          data.assignments || DEFAULT_DATA.assignments;

        setGuru(guruData);
        setMapel(mapelData);
        setKelas(kelasData);
        setAssignments(assignmentData);

        const assignment = assignmentData.find(
          (item) => item.id === id
        );

        if (!assignment) {
          alert("Data assign tidak ditemukan!");
          router.push("/admin/guru-mapel");
          return;
        }

        setCurrentAssignment(assignment);

        setForm({
          guru_id: String(assignment.guru_id),
          mapel_id: String(assignment.mapel_id),
          kelas_id: String(assignment.kelas_id),
        });
      } catch (error) {
        console.error("Gagal memuat data:", error);

        alert("Terjadi kesalahan saat memuat data.");

        router.push("/admin/guru-mapel");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id, router]);

  // =========================================================
  // HANDLE CHANGE
  // =========================================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // HANDLE SUBMIT
  // =========================================================
  const handleSubmit = () => {
    if (!form.guru_id || !form.mapel_id || !form.kelas_id) {
      alert("Semua field wajib diisi!");
      return;
    }

    const exists = assignments.some(
      (assignment) =>
        assignment.guru_id === Number(form.guru_id) &&
        assignment.mapel_id === Number(form.mapel_id) &&
        assignment.kelas_id === Number(form.kelas_id) &&
        assignment.id !== id
    );

    if (exists) {
      alert(
        "Guru ini sudah mengajar mapel tersebut di kelas ini!"
      );
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const updatedAssignments = assignments.map((assignment) =>
        assignment.id === id
          ? {
              ...assignment,
              guru_id: Number(form.guru_id),
              mapel_id: Number(form.mapel_id),
              kelas_id: Number(form.kelas_id),
            }
          : assignment
      );

      setAssignments(updatedAssignments);

      try {
        const stored = JSON.parse(
          localStorage.getItem("guruMapelData")
        );

        stored.assignments = updatedAssignments;

        localStorage.setItem(
          "guruMapelData",
          JSON.stringify(stored)
        );
      } catch (error) {
        console.error("Gagal menyimpan data:", error);
      }

      setLoading(false);

      alert("Assign berhasil diperbarui!");

      router.push("/admin/guru-mapel");
    }, 500);
  };

  // =========================================================
  // LOADING
  // =========================================================
  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

          <p className="text-sm text-slate-500">
            Memuat data...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* =======================================================
          SIDEBAR
      ======================================================= */}
      <Sidebar
        active="guru"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      {/* =======================================================
          RIGHT SIDE
      ======================================================= */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
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

        {/* =====================================================
            CONTENT
        ===================================================== */}
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          {/* FULL WIDTH CONTAINER */}
          <div className="w-full px-4 py-5 sm:px-5 md:px-6 lg:px-8 xl:px-10">
            {/* =================================================
                BACK
            ================================================= */}
            <div className="mb-5">
              <Link
                href="/admin/guru-mapel"
                className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
              >
                <ArrowLeft
                  size={18}
                  className="transition-transform duration-200 group-hover:-translate-x-1"
                />

                <span>Kembali ke Daftar Assign</span>
              </Link>
            </div>

            {/* =================================================
                HEADER PAGE
            ================================================= */}
            <div className="mb-6 flex w-full min-w-0 items-center gap-3 sm:gap-4">
              {/* ICON */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200 sm:h-12 sm:w-12">
                <Edit size={21} />
              </div>

              {/* TITLE */}
              <div className="min-w-0 flex-1">
                <h1 className="truncate text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
                  Edit Assign Guru
                </h1>

                <p className="mt-0.5 truncate text-xs text-slate-500 sm:text-sm">
                  Perbarui assign guru ke mata pelajaran dan kelas
                </p>
              </div>
            </div>

            {/* =================================================
                CURRENT ASSIGNMENT
            ================================================= */}
            {currentAssignment && (
              <div className="mb-6 w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {/* GURU */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                      <User
                        size={16}
                        className="text-blue-600"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                        Guru
                      </p>

                      <p className="truncate text-xs font-semibold text-slate-700">
                        {guru.find(
                          (item) =>
                            item.id ===
                            currentAssignment.guru_id
                        )?.nama || "-"}
                      </p>
                    </div>
                  </div>

                  {/* MAPEL */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
                      <BookMarked
                        size={16}
                        className="text-indigo-600"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                        Mata Pelajaran
                      </p>

                      <p className="truncate text-xs font-semibold text-slate-700">
                        {mapel.find(
                          (item) =>
                            item.id ===
                            currentAssignment.mapel_id
                        )?.nama || "-"}
                      </p>
                    </div>
                  </div>

                  {/* KELAS */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50">
                      <GraduationCap
                        size={16}
                        className="text-sky-600"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                        Kelas
                      </p>

                      <p className="truncate text-xs font-semibold text-slate-700">
                        {kelas.find(
                          (item) =>
                            item.id ===
                            currentAssignment.kelas_id
                        )?.nama || "-"}
                      </p>
                    </div>
                  </div>

                  {/* ID */}
                  <div className="flex min-w-0 items-center gap-3 lg:justify-end">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                      <RefreshCw
                        size={15}
                        className="text-slate-500"
                      />
                    </div>

                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                        Assignment ID
                      </p>

                      <p className="text-xs font-semibold text-slate-600">
                        #{currentAssignment.id}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
                FORM CARD
            ================================================= */}
            <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* CARD HEADER */}
              <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6 md:px-7">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <Edit
                      size={17}
                      className="text-blue-600"
                    />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-sm font-semibold text-slate-800">
                      Informasi Assign
                    </h2>

                    <p className="truncate text-xs text-slate-500">
                      Ubah guru, mata pelajaran, atau kelas
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD BODY */}
              <div className="w-full p-5 sm:p-6 md:p-7 lg:p-8">
                {/* FORM GRID */}
                <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7">
                  {/* =================================================
                      GURU
                  ================================================= */}
                  <div className="min-w-0 w-full">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Pilih Guru{" "}
                      <span className="text-rose-500">*</span>
                    </label>

                    <div className="relative w-full">
                      <UserCheck
                        size={18}
                        className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                      />

                      <select
                        name="guru_id"
                        value={form.guru_id}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm text-slate-700 outline-none transition hover:bg-slate-100 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="">
                          Pilih Guru
                        </option>

                        {guru
                          .filter(
                            (item) =>
                              item.status === "aktif"
                          )
                          .map((item) => (
                            <option
                              key={item.id}
                              value={item.id}
                            >
                              {item.nama} ({item.mapel})
                            </option>
                          ))}
                      </select>

                      <ChevronDown
                        size={18}
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>

                    <p className="mt-1.5 flex items-start gap-1 text-[10px] leading-relaxed text-slate-400">
                      <AlertCircle
                        size={12}
                        className="mt-0.5 shrink-0"
                      />

                      <span>
                        Hanya guru dengan status aktif yang
                        dapat dipilih
                      </span>
                    </p>
                  </div>

                  {/* =================================================
                      MAPEL
                  ================================================= */}
                  <div className="min-w-0 w-full">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Mata Pelajaran{" "}
                      <span className="text-rose-500">*</span>
                    </label>

                    <div className="relative w-full">
                      <BookOpen
                        size={18}
                        className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                      />

                      <select
                        name="mapel_id"
                        value={form.mapel_id}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm text-slate-700 outline-none transition hover:bg-slate-100 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="">
                          Pilih Mapel
                        </option>

                        {mapel.map((item) => (
                          <option
                            key={item.id}
                            value={item.id}
                          >
                            {item.nama} ({item.kode})
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={18}
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>

                  {/* =================================================
                      KELAS
                  ================================================= */}
                  <div className="w-full min-w-0 md:col-span-2">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Kelas{" "}
                      <span className="text-rose-500">*</span>
                    </label>

                    <div className="relative w-full">
                      <GraduationCap
                        size={18}
                        className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                      />

                      <select
                        name="kelas_id"
                        value={form.kelas_id}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm text-slate-700 outline-none transition hover:bg-slate-100 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="">
                          Pilih Kelas
                        </option>

                        {kelas.map((item) => (
                          <option
                            key={item.id}
                            value={item.id}
                          >
                            {item.nama}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={18}
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>
                </div>

                {/* =================================================
                    INFO BOX
                ================================================= */}
                <div className="mt-6 flex w-full items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <AlertCircle
                      size={16}
                      className="text-blue-600"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-blue-700">
                      Informasi
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-blue-600">
                      Pastikan guru yang dipilih memiliki
                      kompetensi pada mata pelajaran tersebut
                      dan belum mengajar mata pelajaran yang
                      sama di kelas yang sama.
                    </p>
                  </div>
                </div>

                {/* =================================================
                    BUTTON
                ================================================= */}
                <div className="mt-7 flex w-full flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                  <Link
                    href="/admin/guru-mapel"
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
                  >
                    <X size={17} />
                    Batal
                  </Link>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200/60 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <Save size={17} />

                        <span>Perbarui Assign</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* =================================================
                FOOTER
            ================================================= */}
            <div className="w-full pb-5 pt-6 text-center">
              <p className="text-[11px] text-slate-400">
                © 2026 SmartSchool • Edit Assign Guru
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}