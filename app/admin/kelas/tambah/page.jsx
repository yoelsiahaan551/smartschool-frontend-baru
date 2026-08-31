"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

import {
  GraduationCap,
  Plus,
  Save,
  X,
  School,
  UserCheck,
  Hash,
  Users,
  MapPin,
  CalendarDays,
  CheckCircle,
  ChevronDown,
  ArrowLeft,
  Info,
  Building,
  Layers,
  BookOpen,
} from "lucide-react";

// =========================================================
// STORAGE
// =========================================================
const STORAGE_KEY = "kelas_data";

// =========================================================
// LOAD DATA
// =========================================================
const loadKelas = () => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Gagal membaca data kelas:", error);
    return [];
  }
};

// =========================================================
// SAVE DATA
// =========================================================
const saveKelas = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// =========================================================
// DAFTAR PROGRAM KEAHLIAN
// =========================================================
const PROGRAM_KEAHLIAN = [
  "RPL (Rekayasa Perangkat Lunak)",
  "TKJ (Teknik Komputer dan Jaringan)",
  "AKL (Akuntansi dan Keuangan Lembaga)",
  "MM (Multimedia)",
  "BDP (Bisnis Daring dan Pemasaran)",
  "OTKP (Otomatisasi dan Tata Kelola Perkantoran)",
  "TBG (Tata Boga)",
  "TBS (Tata Busana)",
];

// =========================================================
// INPUT COMPONENT
// =========================================================
function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
  type = "text",
  min,
}) {
  return (
    <div className="min-w-0 w-full">
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-700">
        {label}
        {required && <span className="ml-1 text-rose-600">*</span>}
      </label>

      <div className="relative w-full">
        <Icon
          size={17}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-slate-50
            py-3
            pl-11
            pr-4
            text-sm
            text-slate-800
            placeholder:text-slate-500
            outline-none
            transition-all
            hover:border-slate-400
            hover:bg-white
            focus:border-blue-500
            focus:bg-white
            focus:ring-4
            focus:ring-blue-500/20
          "
        />
      </div>
    </div>
  );
}

// =========================================================
// SELECT COMPONENT
// =========================================================
function FormSelect({
  label,
  name,
  value,
  onChange,
  icon: Icon,
  children,
  required = false,
}) {
  return (
    <div className="min-w-0 w-full">
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-700">
        {label}
        {required && <span className="ml-1 text-rose-600">*</span>}
      </label>

      <div className="relative w-full">
        <Icon
          size={17}
          className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-500"
        />

        <select
          name={name}
          value={value}
          onChange={onChange}
          className="
            w-full
            appearance-none
            rounded-xl
            border
            border-slate-300
            bg-slate-50
            py-3
            pl-11
            pr-10
            text-sm
            text-slate-800
            outline-none
            transition-all
            hover:border-slate-400
            hover:bg-white
            focus:border-blue-500
            focus:bg-white
            focus:ring-4
            focus:ring-blue-500/20
          "
        >
          {children}
        </select>

        <ChevronDown
          size={17}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
        />
      </div>
    </div>
  );
}

// =========================================================
// SEARCHABLE SELECT (untuk program keahlian)
// =========================================================
function SearchableSelect({
  label,
  name,
  value,
  onChange,
  options,
  icon: Icon,
  required = false,
  placeholder = "Cari...",
}) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="min-w-0 w-full relative">
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-700">
        {label}
        {required && <span className="ml-1 text-rose-600">*</span>}
      </label>

      <div
        className="relative w-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon
          size={17}
          className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          placeholder={value || placeholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-slate-50
            py-3
            pl-11
            pr-10
            text-sm
            text-slate-800
            placeholder:text-slate-500
            outline-none
            transition-all
            hover:border-slate-400
            hover:bg-white
            focus:border-blue-500
            focus:bg-white
            focus:ring-4
            focus:ring-blue-500/20
          "
          autoComplete="off"
        />

        <ChevronDown
          size={17}
          className={`pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <ul className="absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-300 bg-white shadow-lg">
          {filteredOptions.length === 0 ? (
            <li className="px-4 py-3 text-sm text-slate-500">
              Tidak ada data
            </li>
          ) : (
            filteredOptions.map((opt) => (
              <li
                key={opt}
                className={`cursor-pointer px-4 py-3 text-sm transition hover:bg-blue-100 ${
                  value === opt
                    ? "bg-blue-100 font-semibold text-blue-700"
                    : "text-slate-700"
                }`}
                onClick={() => {
                  onChange({ target: { name, value: opt } });
                  setSearch("");
                  setIsOpen(false);
                }}
              >
                {opt}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

// =========================================================
// MAIN PAGE
// =========================================================
export default function AdminKelasTambahPage() {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    jenjang: "X",
    program_keahlian: "",
    wali_kelas: "",
    nip_wali: "",
    gedung: "",
    lantai: "",
    ruangan: "",
    jumlah_siswa: "",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  });

  // =========================================================
  // SIDEBAR
  // =========================================================
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

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
    // Validasi nama kelas
    if (!form.nama.trim()) {
      alert("Nama kelas wajib diisi!");
      return;
    }

    // Validasi program keahlian
    if (!form.program_keahlian.trim()) {
      alert("Program keahlian wajib dipilih!");
      return;
    }

    // Validasi wali kelas
    if (!form.wali_kelas.trim()) {
      alert("Wali kelas wajib diisi!");
      return;
    }

    // Validasi gedung
    if (!form.gedung.trim()) {
      alert("Gedung wajib diisi!");
      return;
    }

    // Validasi lantai
    if (!form.lantai.trim()) {
      alert("Lantai wajib diisi!");
      return;
    }

    // Validasi ruangan
    if (!form.ruangan.trim()) {
      alert("Ruangan wajib diisi!");
      return;
    }

    // Validasi jumlah siswa
    if (form.jumlah_siswa && isNaN(Number(form.jumlah_siswa))) {
      alert("Jumlah siswa harus berupa angka!");
      return;
    }

    if (form.jumlah_siswa && Number(form.jumlah_siswa) < 0) {
      alert("Jumlah siswa tidak boleh kurang dari 0!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const currentData = loadKelas();

      const newItem = {
        id: Date.now(),
        ...form,
        jumlah_siswa: Number(form.jumlah_siswa) || 0,
      };

      const updatedData = [...currentData, newItem];

      saveKelas(updatedData);

      setLoading(false);

      alert("Kelas berhasil ditambahkan!");

      router.push("/admin/kelas");
    }, 500);
  };

  // =========================================================
  // RENDER
  // =========================================================
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-100">
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
          MAIN AREA
      ===================================================== */}
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

        {/* ===================================================
            CONTENT
        =================================================== */}
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full px-4 py-5 sm:px-5 sm:py-6 md:px-6 lg:px-8 xl:px-10">
            {/* =================================================
                BACK
            ================================================= */}
            <div className="mb-5">
              <button
                type="button"
                onClick={() => router.push("/admin/kelas")}
                className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-700"
              >
                <ArrowLeft
                  size={18}
                  className="transition-transform duration-200 group-hover:-translate-x-1"
                />
                <span>Kembali ke Daftar Kelas</span>
              </button>
            </div>

            {/* =================================================
                PAGE HEADER
            ================================================= */}
            <div className="mb-6 flex min-w-0 items-center gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200 sm:h-12 sm:w-12">
                <Plus size={21} />
              </div>

              <div className="min-w-0 flex-1">
                <h1 className="truncate text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
                  Tambah Kelas
                </h1>
                <p className="mt-1 truncate text-sm text-slate-600">
                  Tambahkan data kelas dan wali kelas baru
                </p>
              </div>
            </div>

            {/* =================================================
                MAIN CARD
            ================================================= */}
            <div className="w-full overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
              {/* =================================================
                  CARD HEADER
              ================================================= */}
              <div className="flex min-w-0 items-center gap-3 border-b border-slate-200 bg-slate-100/60 px-5 py-4 sm:px-6 md:px-7">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <GraduationCap size={18} className="text-blue-700" />
                </div>

                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-slate-800">
                    Informasi Kelas
                  </h2>
                  <p className="mt-0.5 text-sm text-slate-600">
                    Lengkapi informasi kelas dengan benar
                  </p>
                </div>
              </div>

              {/* =================================================
                  FORM
              ================================================= */}
              <div className="w-full p-5 sm:p-6 md:p-7 lg:p-8">
                <div className="grid w-full grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2 lg:gap-x-8 lg:gap-y-6">
                  {/* =================================================
                      NAMA KELAS
                  ================================================= */}
                  <FormInput
                    label="Nama Kelas"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    placeholder="Contoh: X RPL 1"
                    icon={GraduationCap}
                    required
                  />

                  {/* =================================================
                      JENJANG
                  ================================================= */}
                  <FormSelect
                    label="Jenjang"
                    name="jenjang"
                    value={form.jenjang}
                    onChange={handleChange}
                    icon={School}
                    required
                  >
                    <option value="X">X (Sepuluh)</option>
                    <option value="XI">XI (Sebelas)</option>
                    <option value="XII">XII (Dua Belas)</option>
                  </FormSelect>

                  {/* =================================================
                      PROGRAM KEAHLIAN
                  ================================================= */}
                  <SearchableSelect
                    label="Program Keahlian"
                    name="program_keahlian"
                    value={form.program_keahlian}
                    onChange={handleChange}
                    options={PROGRAM_KEAHLIAN}
                    icon={BookOpen}
                    required
                    placeholder="Pilih Program Keahlian"
                  />

                  {/* =================================================
                      WALI KELAS
                  ================================================= */}
                  <FormInput
                    label="Wali Kelas"
                    name="wali_kelas"
                    value={form.wali_kelas}
                    onChange={handleChange}
                    placeholder="Nama wali kelas"
                    icon={UserCheck}
                    required
                  />

                  {/* =================================================
                      NIP WALI KELAS
                  ================================================= */}
                  <FormInput
                    label="NIP Wali Kelas"
                    name="nip_wali"
                    value={form.nip_wali}
                    onChange={handleChange}
                    placeholder="Contoh: 198501012010011001"
                    icon={Hash}
                  />

                  {/* =================================================
                      GEDUNG
                  ================================================= */}
                  <FormInput
                    label="Gedung"
                    name="gedung"
                    value={form.gedung}
                    onChange={handleChange}
                    placeholder="Contoh: A, B, C"
                    icon={Building}
                    required
                  />

                  {/* =================================================
                      LANTAI
                  ================================================= */}
                  <FormInput
                    label="Lantai"
                    name="lantai"
                    value={form.lantai}
                    onChange={handleChange}
                    placeholder="Contoh: 1, 2, 3"
                    icon={Layers}
                    required
                  />

                  {/* =================================================
                      RUANGAN
                  ================================================= */}
                  <FormInput
                    label="Ruangan"
                    name="ruangan"
                    value={form.ruangan}
                    onChange={handleChange}
                    placeholder="Contoh: 101, 102, A-01"
                    icon={MapPin}
                    required
                  />

                  {/* =================================================
                      JUMLAH SISWA
                  ================================================= */}
                  <FormInput
                    label="Jumlah Siswa"
                    name="jumlah_siswa"
                    value={form.jumlah_siswa}
                    onChange={handleChange}
                    placeholder="Contoh: 32"
                    icon={Users}
                    type="number"
                    min="0"
                  />

                  {/* =================================================
                      TAHUN AJARAN
                  ================================================= */}
                  <FormSelect
                    label="Tahun Ajaran"
                    name="tahun_ajaran"
                    value={form.tahun_ajaran}
                    onChange={handleChange}
                    icon={CalendarDays}
                  >
                    <option value="2024/2025">2024/2025</option>
                    <option value="2025/2026">2025/2026</option>
                    <option value="2026/2027">2026/2027</option>
                  </FormSelect>

                  {/* =================================================
                      STATUS
                  ================================================= */}
                  <FormSelect
                    label="Status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    icon={CheckCircle}
                  >
                    <option value="aktif">Aktif</option>
                    <option value="nonaktif">Nonaktif</option>
                  </FormSelect>
                </div>

                {/* =================================================
                    INFORMATION BOX
                ================================================= */}
                <div className="mt-7 flex w-full items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/60 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                    <Info size={16} className="text-blue-700" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-blue-800">
                      Informasi
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-blue-700">
                      Pastikan semua data sudah benar sebelum menyimpan. Field
                      bertanda <span className="text-rose-600">*</span> wajib
                      diisi.
                    </p>
                  </div>
                </div>

                {/* =================================================
                    ACTION
                ================================================= */}
                <div className="mt-7 flex w-full flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-end">
                  <button
                    type="button"
                    onClick={() => router.push("/admin/kelas")}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 sm:w-auto"
                  >
                    <X size={17} />
                    Batal
                  </button>

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
                        <span>Simpan Kelas</span>
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
              <p className="text-sm text-slate-500">
                © 2026 SmartSchool • Tambah Kelas
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}