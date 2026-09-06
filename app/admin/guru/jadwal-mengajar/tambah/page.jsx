"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "../../../../components/Header";
import Sidebar from "../../../../components/Sidebar";

import {
  ArrowLeft,
  CalendarClock,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  User,
   CalendarDays,
  BookMarked,
  Info,
  Search,
  ChevronDown,
  X,
  Clock3,
  School,
  CircleCheck,
} from "lucide-react";

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
   MOCK GURU
========================================================= */

const MOCK_GURU = [
  {
    kode: "G-0231",
    nama: "Siti Rahayu, S.Pd",
  },
  {
    kode: "G-0232",
    nama: "Andi Prasetyo, S.Pd",
  },
  {
    kode: "G-0233",
    nama: "Dewi Anggraini, S.Si",
  },
  {
    kode: "G-0301",
    nama: "Budi Santoso, S.Pd",
  },
  {
    kode: "G-0401",
    nama: "Maria Christina, S.Pd",
  },
  {
    kode: "G-0501",
    nama: "Rudi Hartono, S.Pd",
  },
  {
    kode: "G-0601",
    nama: "Nina Kartika, S.Sn",
  },
  {
    kode: "G-0701",
    nama: "H. Ahmad Fauzi, S.Pd.I",
  },
  {
    kode: "G-0801",
    nama: "Dian Permata, S.Pd",
  },
  {
    kode: "G-0901",
    nama: "Rina Wulandari, S.Pd",
  },
];

/* =========================================================
   MOCK MAPEL
========================================================= */

const MOCK_MAPEL = [
  "Matematika",
  "Bahasa Indonesia",
  "Bahasa Inggris",
  "Ilmu Pengetahuan Alam",
  "Ilmu Pengetahuan Sosial",
  "Pendidikan Jasmani",
  "Seni Budaya",
  "Pendidikan Agama Islam",
  "Informatika",
  "Pemrograman Web",
  "Basis Data",
  "Jaringan Komputer",
];

/* =========================================================
   EMPTY JADWAL
========================================================= */

const emptyJadwal = () =>
  HARI.reduce((acc, hari) => {
    acc[hari.key] = {
      jamMulai: "",
      jamSelesai: "",
      kelas: "",
    };

    return acc;
  }, {});

/* =========================================================
   INITIALS
========================================================= */

const getInitials = (name = "") => {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length >= 2) {
    return (
      parts[0][0] +
      parts[1][0]
    ).toUpperCase();
  }

  return name
    .slice(0, 2)
    .toUpperCase();
};

/* =========================================================
   SEARCHABLE SELECT
========================================================= */

function SearchableSelect({
  label,
  icon: Icon,
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  renderOption,
}) {
  const [open, setOpen] =
    useState(false);

  const [query, setQuery] =
    useState("");

  const selectedOption =
    options.find(
      (item) => item.value === value
    ) || null;

  const filteredOptions =
    useMemo(() => {
      const keyword =
        query
          .trim()
          .toLowerCase();

      if (!keyword) {
        return options;
      }

      return options.filter(
        (item) =>
          item.label
            .toLowerCase()
            .includes(keyword) ||
          String(item.value)
            .toLowerCase()
            .includes(keyword)
      );
    }, [options, query]);

  const handleSelect = (item) => {
    onChange(item.value);
    setQuery("");
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="relative">
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
        <Icon
          size={14}
          className="text-slate-400"
        />

        {label}

        <span className="text-red-500">
          *
        </span>
      </label>

      <button
        type="button"
        disabled={disabled}
        onClick={() =>
          setOpen((prev) => !prev)
        }
        className={`flex h-11 w-full items-center justify-between gap-3 rounded-lg border bg-white px-3.5 text-left text-sm transition ${
          open
            ? "border-[#155DFC] ring-4 ring-[#155DFC]/10"
            : "border-slate-200 hover:border-slate-300"
        } ${
          disabled
            ? "cursor-not-allowed bg-slate-50 text-slate-400"
            : "text-slate-700"
        }`}
      >
        <span className="min-w-0 truncate">
          {selectedOption
            ? selectedOption.label
            : placeholder}
        </span>

        <ChevronDown
          size={16}
          className={`shrink-0 text-slate-400 transition-transform ${
            open
              ? "rotate-180"
              : ""
          }`}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Tutup dropdown"
            onClick={handleClose}
            className="fixed inset-0 z-30 cursor-default"
          />

          <div className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">

            {/* SEARCH */}
            <div className="border-b border-slate-100 p-3">
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) =>
                    setQuery(
                      e.target.value
                    )
                  }
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                  placeholder={`Cari ${label.toLowerCase()}...`}
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#155DFC] focus:bg-white focus:ring-4 focus:ring-[#155DFC]/10"
                />
              </div>
            </div>

            {/* OPTIONS */}
            <div className="max-h-64 overflow-y-auto p-1.5">
              {filteredOptions.length >
              0 ? (
                filteredOptions.map(
                  (item) => {
                    const selected =
                      item.value ===
                      value;

                    return (
                      <button
                        type="button"
                        key={item.value}
                        onClick={() =>
                          handleSelect(
                            item
                          )
                        }
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                          selected
                            ? "bg-[#eaf1ff] text-[#155DFC]"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {renderOption ? (
                          renderOption(
                            item,
                            selected
                          )
                        ) : (
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold">
                              {
                                item.label
                              }
                            </p>
                          </div>
                        )}

                        {selected && (
                          <CircleCheck
                            size={15}
                            className="ml-auto shrink-0 text-[#155DFC]"
                          />
                        )}
                      </button>
                    );
                  }
                )
              ) : (
                <div className="px-4 py-8 text-center">
                  <Search
                    size={20}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    Data tidak ditemukan
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    Coba kata pencarian lain.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {selectedOption && (
        <p className="mt-1 text-[10px] text-slate-400">
          Pilihan saat ini:{" "}
          <span className="font-medium text-slate-500">
            {selectedOption.label}
          </span>
        </p>
      )}
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function TambahJadwalMengajarPage() {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] =
    useState(false);

  const [guruKode, setGuruKode] =
    useState("");

  const [mapel, setMapel] =
    useState("");

  const [jadwal, setJadwal] =
    useState(emptyJadwal());

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  // =======================================================
  // TOGGLE SIDEBAR
  // =======================================================

  const toggleSidebar = () => {
    setIsCollapsed(
      (prev) => !prev
    );
  };

  // =======================================================
  // OPTIONS
  // =======================================================

  const guruOptions = useMemo(
    () =>
      MOCK_GURU.map(
        (guru) => ({
          value: guru.kode,
          label: guru.nama,
          kode: guru.kode,
        })
      ),
    []
  );

  const mapelOptions = useMemo(
    () =>
      MOCK_MAPEL.map(
        (nama) => ({
          value: nama,
          label: nama,
        })
      ),
    []
  );

  // =======================================================
  // GURU SELECTED
  // =======================================================

  const guruTerpilih = useMemo(
    () =>
      MOCK_GURU.find(
        (guru) =>
          guru.kode ===
          guruKode
      ) || null,
    [guruKode]
  );

  // =======================================================
  // JADWAL HANDLER
  // =======================================================

  const handleSlotChange =
    (hariKey, field) =>
    (event) => {
      const value =
        event.target.value;

      setJadwal((prev) => ({
        ...prev,
        [hariKey]: {
          ...prev[hariKey],
          [field]: value,
        },
      }));
    };

  // =======================================================
  // JADWAL FILLED
  // =======================================================

  const jumlahHariDiisi =
    HARI.filter((hari) => {
      const slot =
        jadwal[hari.key];

      return (
        slot.jamMulai &&
        slot.jamSelesai &&
        slot.kelas.trim()
      );
    }).length;

  // =======================================================
  // VALIDATION
  // =======================================================

  const validateJadwal =
    () => {
      for (const hari of HARI) {
        const slot =
          jadwal[hari.key];

        const adaInput =
          slot.jamMulai ||
          slot.jamSelesai ||
          slot.kelas.trim();

        if (!adaInput) {
          continue;
        }

        if (
          !slot.jamMulai ||
          !slot.jamSelesai ||
          !slot.kelas.trim()
        ) {
          return `Lengkapi jadwal hari ${hari.label}.`;
        }

        if (
          slot.jamSelesai <=
          slot.jamMulai
        ) {
          return `Jam selesai hari ${hari.label} harus lebih besar dari jam mulai.`;
        }
      }

      return "";
    };

  // =======================================================
  // SUBMIT
  // =======================================================

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError("");

    if (!guruKode) {
      setError(
        "Guru wajib dipilih."
      );
      return;
    }

    if (!mapel) {
      setError(
        "Mata pelajaran wajib dipilih."
      );
      return;
    }

    if (jumlahHariDiisi === 0) {
      setError(
        "Isi jadwal untuk minimal satu hari."
      );
      return;
    }

    const validationError =
      validateJadwal();

    if (validationError) {
      setError(
        validationError
      );
      return;
    }

    const payload = {
      guruKode,
      mapel,

      jadwal: HARI.reduce(
        (acc, hari) => {
          const slot =
            jadwal[hari.key];

          acc[hari.key] =
            slot.jamMulai &&
            slot.jamSelesai &&
            slot.kelas.trim()
              ? {
                  jamMulai:
                    slot.jamMulai,
                  jamSelesai:
                    slot.jamSelesai,
                  kelas:
                    slot.kelas.trim(),
                }
              : null;

          return acc;
        },
        {}
      ),
    };

    try {
      setSaving(true);

      console.log(
        "========== CREATE JADWAL =========="
      );

      console.log(
        "PAYLOAD:",
        payload
      );

      console.log(
        "==================================="
      );

      /*
       * TODO:
       * Nanti ganti bagian ini:
       *
       * const response =
       *   await createJadwalMengajar(payload);
       */

      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            700
          )
      );

      setSuccess(true);

      setTimeout(() => {
        router.push(
          "/admin/guru/jadwal-mengajar"
        );
      }, 900);
    } catch (err) {
      console.error(
        "Error create jadwal:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Gagal menambahkan jadwal mengajar."
      );
    } finally {
      setSaving(false);
    }
  };

  // =======================================================
  // RESET
  // =======================================================

  const handleReset = () => {
    setGuruKode("");
    setMapel("");
    setJadwal(
      emptyJadwal()
    );
    setError("");
    setSuccess(false);
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar
        active="guruJadwalMengajar"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={
          setIsCollapsed
        }
        role="admin"
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* HEADER */}

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

        {/* MAIN */}

        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">

          <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 xl:px-10">

            <div className="space-y-6">

              {/* =================================================
                  TOP HEADER
              ================================================== */}

              <section>

                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      "/admin/guru/jadwal-mengajar"
                    )
                  }
                  className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-[#155DFC]"
                >
                  <ArrowLeft
                    size={15}
                  />
                  Kembali ke Jadwal Mengajar
                </button>

                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

                  <div className="flex min-w-0 items-start gap-3">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#155DFC] text-white shadow-sm">
                      <CalendarClock
                        size={22}
                      />
                    </div>

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
                          Tambah Jadwal Mengajar
                        </h1>

                        <span className="rounded-full border border-[#c7dbff] bg-[#eaf1ff] px-2.5 py-1 text-[10px] font-semibold text-[#155DFC]">
                          Akademik
                        </span>

                      </div>

                      <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">
                        Tetapkan guru, mata pelajaran,
                        kelas, dan waktu mengajar untuk
                        setiap hari.
                      </p>

                    </div>

                  </div>

                  {/* SUMMARY */}

                  <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">

                    <div className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm">

                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Hari Terisi
                      </p>

                      <p className="mt-0.5 text-sm font-bold text-slate-800">
                        {jumlahHariDiisi}
                        <span className="ml-1 text-xs font-normal text-slate-400">
                          / {HARI.length}
                        </span>
                      </p>

                    </div>

                    <div className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm">

                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Guru
                      </p>

                      <p className="mt-0.5 max-w-[150px] truncate text-sm font-bold text-slate-800">
                        {guruTerpilih
                          ?.nama ||
                          "Belum dipilih"}
                      </p>

                    </div>

                  </div>

                </div>

              </section>

              {/* =================================================
                  SUCCESS
              ================================================== */}

              {success && (
                <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                    <CheckCircle2
                      size={18}
                      className="text-emerald-600"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-emerald-800">
                      Jadwal berhasil ditambahkan
                    </p>

                    <p className="mt-1 text-xs text-emerald-700">
                      Mengalihkan ke daftar jadwal mengajar...
                    </p>
                  </div>

                </div>
              )}

              {/* =================================================
                  ERROR
              ================================================== */}

              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                    <AlertCircle
                      size={18}
                      className="text-red-600"
                    />
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="text-sm font-semibold text-red-800">
                      Data belum dapat disimpan
                    </p>

                    <p className="mt-1 text-xs leading-5 text-red-700">
                      {error}
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setError("")
                    }
                    className="rounded-lg p-1 text-red-400 transition hover:bg-red-100 hover:text-red-600"
                  >
                    <X size={16} />
                  </button>

                </div>
              )}

              {/* =================================================
                  MAIN GRID
              ================================================== */}

              <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_360px] 2xl:grid-cols-[minmax(0,1fr)_390px]">

                {/* =================================================
                    FORM
                ================================================== */}

                <form
                  onSubmit={
                    handleSubmit
                  }
                  className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                >

                  {/* FORM HEADER */}

                  <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

                    <div className="flex items-start gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eaf1ff] text-[#155DFC]">
                        <School
                          size={17}
                        />
                      </div>

                      <div>
                        <h2 className="text-sm font-bold text-slate-800">
                          Informasi Jadwal
                        </h2>

                        <p className="mt-1 text-xs text-slate-400">
                          Tentukan guru dan mata pelajaran yang akan dijadwalkan.
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* GURU + MAPEL */}

                  <div className="p-5 sm:p-6">

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                      {/* GURU */}

                      <SearchableSelect
                        label="Guru"
                        icon={User}
                        value={guruKode}
                        onChange={
                          setGuruKode
                        }
                        options={
                          guruOptions
                        }
                        placeholder="Pilih guru..."
                        disabled={saving}
                        renderOption={(
                          item
                        ) => (
                          <div className="flex min-w-0 items-center gap-3">

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#155DFC] text-[9px] font-bold text-white">
                              {getInitials(
                                item.label
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-xs font-semibold text-slate-700">
                                {
                                  item.label
                                }
                              </p>

                              <p className="mt-0.5 text-[10px] text-slate-400">
                                {
                                  item.kode
                                }
                              </p>
                            </div>

                          </div>
                        )}
                      />

                      {/* MAPEL */}

                      <SearchableSelect
                        label="Mata Pelajaran"
                        icon={
                          BookMarked
                        }
                        value={mapel}
                        onChange={
                          setMapel
                        }
                        options={
                          mapelOptions
                        }
                        placeholder="Pilih mata pelajaran..."
                        disabled={saving}
                        renderOption={(
                          item
                        ) => (
                          <div className="flex min-w-0 items-center gap-3">

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eaf1ff] text-[#155DFC]">
                              <BookMarked
                                size={14}
                              />
                            </div>

                            <p className="truncate text-xs font-semibold text-slate-700">
                              {
                                item.label
                              }
                            </p>

                          </div>
                        )}
                      />

                    </div>

                  </div>

                  {/* =================================================
                      JADWAL HEADER
                  ================================================== */}

                  <div className="border-y border-slate-200 bg-slate-50/70 px-5 py-4 sm:px-6">

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                      <div>
                        <h2 className="text-sm font-bold text-slate-800">
                          Jadwal Mingguan
                        </h2>

                        <p className="mt-1 text-xs text-slate-400">
                          Isi hari yang memiliki jadwal. Hari lainnya boleh dikosongkan.
                        </p>
                      </div>

                      <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-500">

                        <Clock3
                          size={13}
                          className="text-[#155DFC]"
                        />

                        {jumlahHariDiisi} hari terisi

                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      DAYS
                  ================================================== */}

                  <div className="p-5 sm:p-6">

                    <div className="space-y-3">

                      {HARI.map(
                        (hari) => {
                          const slot =
                            jadwal[
                              hari.key
                            ];

                          const terisi =
                            Boolean(
                              slot.jamMulai &&
                                slot.jamSelesai &&
                                slot.kelas.trim()
                            );

                          const sebagianDiisi =
                            Boolean(
                              slot.jamMulai ||
                                slot.jamSelesai ||
                                slot.kelas.trim()
                            );

                          return (
                            <div
                              key={
                                hari.key
                              }
                              className={`rounded-xl border p-3.5 transition sm:p-4 ${
                                terisi
                                  ? "border-[#c7dbff] bg-[#f7f9ff]"
                                  : sebagianDiisi
                                  ? "border-amber-200 bg-amber-50/40"
                                  : "border-slate-200 bg-white"
                              }`}
                            >

                              {/* MOBILE / DESKTOP */}

                              <div className="grid grid-cols-1 gap-3 xl:grid-cols-[120px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] xl:items-center">

                                {/* HARI */}

                                <div className="flex items-center gap-3">

                                  <div
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                                      terisi
                                        ? "bg-[#155DFC] text-white"
                                        : "bg-slate-100 text-slate-500"
                                    }`}
                                  >
                                    <CalendarDays
                                      size={16}
                                    />
                                  </div>

                                  <div>
                                    <p className="text-xs font-bold text-slate-700">
                                      {
                                        hari.label
                                      }
                                    </p>

                                    <p
                                      className={`mt-0.5 text-[10px] ${
                                        terisi
                                          ? "text-[#155DFC]"
                                          : sebagianDiisi
                                          ? "text-amber-600"
                                          : "text-slate-400"
                                      }`}
                                    >
                                      {terisi
                                        ? "Jadwal terisi"
                                        : sebagianDiisi
                                        ? "Belum lengkap"
                                        : "Tidak ada jadwal"}
                                    </p>
                                  </div>

                                </div>

                                {/* MULAI */}

                                <div>
                                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Jam Mulai
                                  </label>

                                  <input
                                    type="time"
                                    value={
                                      slot.jamMulai
                                    }
                                    onChange={handleSlotChange(
                                      hari.key,
                                      "jamMulai"
                                    )}
                                    disabled={
                                      saving
                                    }
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition focus:border-[#155DFC] focus:ring-4 focus:ring-[#155DFC]/10 disabled:bg-slate-50"
                                  />
                                </div>

                                {/* SELESAI */}

                                <div>
                                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Jam Selesai
                                  </label>

                                  <input
                                    type="time"
                                    value={
                                      slot.jamSelesai
                                    }
                                    onChange={handleSlotChange(
                                      hari.key,
                                      "jamSelesai"
                                    )}
                                    disabled={
                                      saving
                                    }
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition focus:border-[#155DFC] focus:ring-4 focus:ring-[#155DFC]/10 disabled:bg-slate-50"
                                  />
                                </div>

                                {/* KELAS */}

                                <div>
                                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Kelas
                                  </label>

                                  <input
                                    type="text"
                                    value={
                                      slot.kelas
                                    }
                                    onChange={handleSlotChange(
                                      hari.key,
                                      "kelas"
                                    )}
                                    disabled={
                                      saving
                                    }
                                    placeholder="Contoh: X RPL 1"
                                    className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#155DFC] focus:ring-4 focus:ring-[#155DFC]/10 disabled:bg-slate-50"
                                  />
                                </div>

                              </div>

                            </div>
                          );
                        }
                      )}

                    </div>

                  </div>

                  {/* =================================================
                      FORM FOOTER
                  ================================================== */}

                  <div className="border-t border-slate-200 bg-slate-50/60 px-5 py-4 sm:px-6">

                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">

                      <button
                        type="button"
                        onClick={
                          handleReset
                        }
                        disabled={
                          saving
                        }
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                      >
                        Reset Form
                      </button>

                      <div className="flex flex-col-reverse gap-2 sm:flex-row">

                        <button
                          type="button"
                          onClick={() =>
                            router.push(
                              "/admin/guru/jadwal-mengajar"
                            )
                          }
                          disabled={
                            saving
                          }
                          className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                        >
                          Batal
                        </button>

                        <button
                          type="submit"
                          disabled={
                            saving ||
                            success
                          }
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#155DFC] px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0d47c9] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {saving ? (
                            <>
                              <Loader2
                                size={15}
                                className="animate-spin"
                              />
                              Menyimpan...
                            </>
                          ) : (
                            <>
                              <Save
                                size={15}
                              />
                              Simpan Jadwal
                            </>
                          )}
                        </button>

                      </div>

                    </div>

                  </div>

                </form>

                {/* =================================================
                    SIDE PANEL
                ================================================== */}

                <aside className="min-w-0 space-y-5">

                  {/* PREVIEW */}

                  <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                    <div className="border-b border-slate-200 px-5 py-4">

                      <div className="flex items-center justify-between gap-3">

                        <div>
                          <h2 className="text-sm font-bold text-slate-800">
                            Pratinjau Jadwal
                          </h2>

                          <p className="mt-1 text-[11px] text-slate-400">
                            Ringkasan data yang akan disimpan.
                          </p>
                        </div>

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eaf1ff] text-[#155DFC]">
                          <CalendarClock
                            size={17}
                          />
                        </div>

                      </div>

                    </div>

                    <div className="p-5">

                      {/* GURU */}

                      <div className="flex items-center gap-3 pb-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#155DFC] text-xs font-bold text-white">
                          {guruTerpilih
                            ? getInitials(
                                guruTerpilih.nama
                              )
                            : "GU"}
                        </div>

                        <div className="min-w-0">

                          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                            Guru
                          </p>

                          <p className="mt-0.5 truncate text-sm font-bold text-slate-800">
                            {guruTerpilih
                              ?.nama ||
                              "Belum dipilih"}
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-400">
                            {guruTerpilih
                              ?.kode ||
                              "Kode guru"}
                          </p>

                        </div>

                      </div>

                      {/* MAPEL */}

                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5">

                        <div className="flex items-start gap-2.5">

                          <BookMarked
                            size={15}
                            className="mt-0.5 shrink-0 text-[#155DFC]"
                          />

                          <div className="min-w-0">

                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Mata Pelajaran
                            </p>

                            <p className="mt-1 text-xs font-bold text-slate-700">
                              {mapel ||
                                "Belum dipilih"}
                            </p>

                          </div>

                        </div>

                      </div>

                      {/* DAYS PREVIEW */}

                      <div className="mt-4 space-y-2">

                        {HARI.map(
                          (hari) => {
                            const slot =
                              jadwal[
                                hari.key
                              ];

                            const terisi =
                              slot.jamMulai &&
                              slot.jamSelesai &&
                              slot.kelas.trim();

                            return (
                              <div
                                key={
                                  hari.key
                                }
                                className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 ${
                                  terisi
                                    ? "border-[#c7dbff] bg-[#f7f9ff]"
                                    : "border-slate-100 bg-white"
                                }`}
                              >

                                <div className="flex items-center gap-2">

                                  <div
                                    className={`h-1.5 w-1.5 rounded-full ${
                                      terisi
                                        ? "bg-[#155DFC]"
                                        : "bg-slate-300"
                                    }`}
                                  />

                                  <span className="text-[11px] font-semibold text-slate-600">
                                    {
                                      hari.label
                                    }
                                  </span>

                                </div>

                                {terisi ? (
                                  <span className="max-w-[190px] truncate text-right text-[10px] font-semibold text-slate-700">
                                    {
                                      slot.jamMulai
                                    }
                                    {" – "}
                                    {
                                      slot.jamSelesai
                                    }
                                    {" · "}
                                    {
                                      slot.kelas.trim()
                                    }
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-slate-300">
                                    —
                                  </span>
                                )}

                              </div>
                            );
                          }
                        )}

                      </div>

                    </div>

                  </section>

                  {/* INFORMATION */}

                  <section className="rounded-xl border border-[#c7dbff] bg-[#f7f9ff] p-5">

                    <div className="flex items-start gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#155DFC] shadow-sm">
                        <Info
                          size={17}
                        />
                      </div>

                      <div className="min-w-0">

                        <h2 className="text-xs font-bold text-slate-700">
                          Informasi Pengisian
                        </h2>

                        <div className="mt-3 space-y-2.5">

                          <div className="flex items-start gap-2">

                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#155DFC]" />

                            <p className="text-[11px] leading-5 text-slate-500">
                              Dropdown guru dan mata pelajaran memiliki pencarian untuk memudahkan saat data semakin banyak.
                            </p>

                          </div>

                          <div className="flex items-start gap-2">

                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#155DFC]" />

                            <p className="text-[11px] leading-5 text-slate-500">
                              Hari tanpa jadwal dapat dibiarkan kosong.
                            </p>

                          </div>

                          <div className="flex items-start gap-2">

                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#155DFC]" />

                            <p className="text-[11px] leading-5 text-slate-500">
                              Jam selesai harus lebih besar dari jam mulai.
                            </p>

                          </div>

                        </div>

                      </div>

                    </div>

                  </section>

                  {/* COMPLETION */}

                  <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between gap-3">

                      <div>

                        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                          Kelengkapan
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-800">
                          {jumlahHariDiisi} /{" "}
                          {HARI.length}{" "}
                          hari
                        </p>

                      </div>

                      <CheckCircle2
                        size={21}
                        className={
                          jumlahHariDiisi >
                          0
                            ? "text-[#155DFC]"
                            : "text-slate-300"
                        }
                      />

                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">

                      <div
                        className="h-full rounded-full bg-[#155DFC] transition-all"
                        style={{
                          width: `${
                            (jumlahHariDiisi /
                              HARI.length) *
                            100
                          }%`,
                        }}
                      />

                    </div>

                    <p className="mt-2 text-[10px] text-slate-400">
                      {jumlahHariDiisi ===
                      0
                        ? "Belum ada jadwal yang diisi."
                        : jumlahHariDiisi ===
                          HARI.length
                        ? "Semua hari telah memiliki jadwal."
                        : "Beberapa hari masih dapat diisi."}
                    </p>

                  </section>

                </aside>

              </div>

              {/* =================================================
                  FOOTER
              ================================================== */}

              <footer className="pb-3 pt-1 text-center">

                <p className="text-[10px] text-slate-400">
                  © 2026 SmartSchool • Tambah Jadwal Mengajar
                </p>

              </footer>

            </div>

          </div>

        </main>

      </div>
    </div>
  );
}