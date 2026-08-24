"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
  Award,
  CheckCircle,
  XCircle,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Home,
  Clock,
  Calendar,
  User,
  BookOpen,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  Activity,
  Target,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

// =========================================================
// DATA DUMMY HASIL UJIAN
// =========================================================

const HASIL_DATA = {
  "ujian-1": {
    judul: "UTS Matematika Semester 1",
    mapel: "Matematika",
    kelas: "X IPA 1",
    tanggal: "2026-08-30",
    durasi: "45:30",
    totalSoal: 30,
    benar: 22,
    salah: 8,
    skor: 73.33,
    detailSoal: Array.from({ length: 30 }, (_, i) => ({
      nomor: i + 1,
      status: i < 22 ? "benar" : "salah",
      jawabanUser: i < 22 ? "B" : "C",
      jawabanBenar: "B",
      isCorrect: i < 22,
    })),
  },

  "ujian-2": {
    judul: "UAS Matematika Semester 1",
    mapel: "Matematika",
    kelas: "X IPA 1",
    tanggal: "2026-09-15",
    durasi: "112:30",
    totalSoal: 40,
    benar: 32,
    salah: 8,
    skor: 80.0,
    detailSoal: Array.from({ length: 40 }, (_, i) => ({
      nomor: i + 1,
      status: i < 32 ? "benar" : "salah",
      jawabanUser: i < 32 ? "D" : "A",
      jawabanBenar: "D",
      isCorrect: i < 32,
    })),
  },

  "ujian-3": {
    judul: "UTS Bahasa Indonesia",
    mapel: "Bahasa Indonesia",
    kelas: "X IPA 1",
    tanggal: "2026-08-28",
    durasi: "78:15",
    totalSoal: 25,
    benar: 20,
    salah: 5,
    skor: 80.0,
    detailSoal: Array.from({ length: 25 }, (_, i) => ({
      nomor: i + 1,
      status: i < 20 ? "benar" : "salah",
      jawabanUser: i < 20 ? "C" : "B",
      jawabanBenar: "C",
      isCorrect: i < 20,
    })),
  },

  "ujian-4": {
    judul: "UTS IPA Semester 1",
    mapel: "IPA",
    kelas: "X IPA 1",
    tanggal: "2026-08-25",
    durasi: "82:20",
    totalSoal: 30,
    benar: 18,
    salah: 12,
    skor: 60.0,
    detailSoal: Array.from({ length: 30 }, (_, i) => ({
      nomor: i + 1,
      status: i < 18 ? "benar" : "salah",
      jawabanUser: i < 18 ? "A" : "D",
      jawabanBenar: "A",
      isCorrect: i < 18,
    })),
  },

  "ujian-5": {
    judul: "UTS IPS Semester 1",
    mapel: "IPS",
    kelas: "X IPA 1",
    tanggal: "2026-08-27",
    durasi: "55:40",
    totalSoal: 25,
    benar: 15,
    salah: 10,
    skor: 60.0,
    detailSoal: Array.from({ length: 25 }, (_, i) => ({
      nomor: i + 1,
      status: i < 15 ? "benar" : "salah",
      jawabanUser: i < 15 ? "B" : "C",
      jawabanBenar: "B",
      isCorrect: i < 15,
    })),
  },

  "ujian-6": {
    judul: "UTS Bahasa Inggris",
    mapel: "Bahasa Inggris",
    kelas: "X IPA 1",
    tanggal: "2026-08-29",
    durasi: "68:50",
    totalSoal: 30,
    benar: 25,
    salah: 5,
    skor: 83.33,
    detailSoal: Array.from({ length: 30 }, (_, i) => ({
      nomor: i + 1,
      status: i < 25 ? "benar" : "salah",
      jawabanUser: i < 25 ? "A" : "B",
      jawabanBenar: "A",
      isCorrect: i < 25,
    })),
  },

  "ujian-7": {
    judul: "UTS Penjaskes",
    mapel: "Penjaskes",
    kelas: "X IPA 1",
    tanggal: "2026-08-31",
    durasi: "48:10",
    totalSoal: 20,
    benar: 18,
    salah: 2,
    skor: 90.0,
    detailSoal: Array.from({ length: 20 }, (_, i) => ({
      nomor: i + 1,
      status: i < 18 ? "benar" : "salah",
      jawabanUser: i < 18 ? "D" : "B",
      jawabanBenar: "D",
      isCorrect: i < 18,
    })),
  },
};

export default function HasilUjianPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [hasil, setHasil] = useState(null);
  const [selectedSoal, setSelectedSoal] = useState(null);
  const [filter, setFilter] = useState("semua");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // =========================================================
  // LOAD DATA
  // =========================================================

  useEffect(() => {
    const data = HASIL_DATA[id];

    if (data) {
      setHasil(data);
    } else {
      router.push("/siswa/dashboard");
    }
  }, [id, router]);

  // =========================================================
  // LOADING
  // =========================================================

  if (!hasil) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc]">
        <Sidebar
          role="siswa"
          active="hasil"
          collapsed={isSidebarCollapsed}
          setCollapsed={setIsSidebarCollapsed}
        />

        <div className="flex h-screen min-w-0 flex-1 flex-col">
          <Header
            toggleSidebar={() =>
              setIsSidebarCollapsed(!isSidebarCollapsed)
            }
            user={{
              name: "Andi Saputra",
              avatar: "AS",
            }}
          />

          <main className="flex min-h-0 flex-1 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

              <p className="mt-4 text-sm font-medium text-slate-500">
                Memuat hasil ujian...
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // =========================================================
  // FILTER
  // =========================================================

  const filteredSoal = hasil.detailSoal.filter((s) => {
    if (filter === "semua") return true;
    return s.status === filter;
  });

  // =========================================================
  // STATISTIK
  // =========================================================

  const persentase = Math.round(
    (hasil.benar / hasil.totalSoal) * 100
  );

  const predikat =
    persentase >= 85
      ? "A"
      : persentase >= 70
      ? "B"
      : persentase >= 50
      ? "C"
      : "D";

  const predikatText =
    persentase >= 85
      ? "Sangat Baik"
      : persentase >= 70
      ? "Baik"
      : persentase >= 50
      ? "Cukup"
      : "Kurang";

  const predikatColor =
    persentase >= 85
      ? "text-emerald-600"
      : persentase >= 70
      ? "text-blue-600"
      : persentase >= 50
      ? "text-amber-600"
      : "text-rose-600";

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);

    return d.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const toggleSoal = (nomor) => {
    setSelectedSoal(
      selectedSoal === nomor ? null : nomor
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc]">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar
        role="siswa"
        active="hasil"
        collapsed={isSidebarCollapsed}
        setCollapsed={setIsSidebarCollapsed}
      />

      {/* =====================================================
          MAIN WRAPPER
      ====================================================== */}

      <div className="flex h-screen min-w-0 flex-1 flex-col">
        <Header
          toggleSidebar={() =>
            setIsSidebarCollapsed(!isSidebarCollapsed)
          }
          notifications={[]}
          user={{
            name: "Andi Saputra",
            email: "siswa@smartschool.com",
            avatar: "AS",
          }}
        />

        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden bg-[#f8fafc]">
          <div className="mx-auto w-full max-w-[1700px] space-y-6 p-4 sm:p-5 lg:p-6 xl:p-8">

            {/* =================================================
                BREADCRUMB
            ================================================== */}

            

            {/* =================================================
                PAGE HEADER
            ================================================== */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200">
                  <Award size={24} />
                </div>

                <div className="min-w-0">
                  <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-indigo-600">
                    Hasil Ujian
                  </p>

                  <h1 className="truncate text-xl font-bold text-slate-800 sm:text-2xl">
                    {hasil.judul}
                  </h1>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:text-sm">
                    <span className="flex items-center gap-1">
                      <BookOpen size={14} />
                      {hasil.mapel}
                    </span>

                    <span className="text-slate-300">•</span>

                    <span>{hasil.kelas}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  router.push("/siswa/dashboard")
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 sm:w-auto"
              >
                <ArrowLeft size={16} />
                Kembali
              </button>
            </div>

            {/* =================================================
                HERO SCORE CARD
            ================================================== */}

            <section className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-white via-white to-indigo-50/60 p-5 shadow-sm sm:p-7 lg:p-8">
              {/* Decorative */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-100/40 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-purple-100/40 blur-3xl" />

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center">

                {/* SCORE */}

                <div className="flex justify-center lg:justify-start">
                  <div className="relative h-40 w-40 sm:h-44 sm:w-44">
                    <svg
                      className="h-full w-full -rotate-90"
                      viewBox="0 0 160 160"
                    >
                      <circle
                        cx="80"
                        cy="80"
                        r="66"
                        stroke="#e2e8f0"
                        strokeWidth="11"
                        fill="none"
                      />

                      <circle
                        cx="80"
                        cy="80"
                        r="66"
                        stroke="url(#scoreGradient)"
                        strokeWidth="11"
                        fill="none"
                        strokeDasharray={`${
                          (persentase / 100) * 414.69
                        } 414.69`}
                        strokeLinecap="round"
                      />

                      <defs>
                        <linearGradient
                          id="scoreGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="#6366f1"
                          />

                          <stop
                            offset="100%"
                            stopColor="#8b5cf6"
                          />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-extrabold tracking-tight text-indigo-600 sm:text-5xl">
                        {persentase}
                      </span>

                      <span className="text-xs font-medium text-slate-400">
                        Persentase
                      </span>
                    </div>
                  </div>
                </div>

                {/* SCORE INFO */}

                <div className="min-w-0 flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center gap-2 lg:justify-start">
                    <span className="text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl">
                      {hasil.skor}
                    </span>

                    <span className="mt-3 text-sm font-medium text-slate-400">
                      / 100
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Nilai Akhir
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 shadow-sm">
                    <Sparkles
                      size={15}
                      className="text-indigo-500"
                    />

                    <span className="text-sm font-semibold text-slate-700">
                      Predikat {predikat}
                    </span>

                    <span
                      className={`text-sm font-bold ${predikatColor}`}
                    >
                      {predikatText}
                    </span>
                  </div>

                  {/* Progress */}

                  <div className="mx-auto mt-5 max-w-md lg:mx-0">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-500">
                        Tingkat keberhasilan
                      </span>

                      <span className="font-bold text-indigo-600">
                        {persentase}%
                      </span>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
                        style={{
                          width: `${persentase}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Answer badges */}

                  <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                        <CheckCircle size={15} />
                      </div>

                      <div>
                        <p className="text-[10px] font-medium text-emerald-600">
                          Benar
                        </p>

                        <p className="text-sm font-bold text-emerald-700">
                          {hasil.benar}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-3 py-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                        <XCircle size={15} />
                      </div>

                      <div>
                        <p className="text-[10px] font-medium text-rose-600">
                          Salah
                        </p>

                        <p className="text-sm font-bold text-rose-700">
                          {hasil.salah}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* INFO UJIAN */}

                <div className="grid grid-cols-2 gap-3 lg:w-[310px] lg:grid-cols-1">
                  <div className="rounded-2xl border border-slate-100 bg-white/80 p-3.5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <User size={16} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                          Siswa
                        </p>

                        <p className="truncate text-sm font-semibold text-slate-700">
                          Andi Saputra
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-white/80 p-3.5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                        <Calendar size={16} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                          Tanggal
                        </p>

                        <p className="truncate text-sm font-semibold text-slate-700">
                          {formatDate(hasil.tanggal)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-white/80 p-3.5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                        <Clock size={16} />
                      </div>

                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                          Durasi
                        </p>

                        <p className="text-sm font-semibold text-slate-700">
                          {hasil.durasi}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-white/80 p-3.5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <BookOpen size={16} />
                      </div>

                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                          Jumlah Soal
                        </p>

                        <p className="text-sm font-semibold text-slate-700">
                          {hasil.totalSoal} soal
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                STATISTICS
            ================================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {/* Total */}

              <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Total Soal
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-800">
                      {hasil.totalSoal}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Soal dikerjakan
                    </p>
                  </div>

                  <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                    <BarChart3 size={20} />
                  </div>
                </div>
              </div>

              {/* Benar */}

              <div className="group rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Jawaban Benar
                    </p>

                    <p className="mt-2 text-2xl font-bold text-emerald-600">
                      {hasil.benar}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {persentase}% dari total soal
                    </p>
                  </div>

                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                    <CheckCircle size={20} />
                  </div>
                </div>
              </div>

              {/* Salah */}

              <div className="group rounded-2xl border border-rose-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Jawaban Salah
                    </p>

                    <p className="mt-2 text-2xl font-bold text-rose-600">
                      {hasil.salah}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Perlu dipelajari lagi
                    </p>
                  </div>

                  <div className="rounded-xl bg-rose-50 p-3 text-rose-600 transition group-hover:bg-rose-600 group-hover:text-white">
                    <XCircle size={20} />
                  </div>
                </div>
              </div>

              {/* Predikat */}

              <div className="group rounded-2xl border border-purple-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Predikat
                    </p>

                    <p
                      className={`mt-2 text-2xl font-bold ${predikatColor}`}
                    >
                      {predikat}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {predikatText}
                    </p>
                  </div>

                  <div className="rounded-xl bg-purple-50 p-3 text-purple-600 transition group-hover:bg-purple-600 group-hover:text-white">
                    <Target size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                ANSWER DETAIL
            ================================================== */}

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              {/* Header */}

              <div className="border-b border-slate-100 p-5 sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Activity size={19} />
                    </div>

                    <div>
                      <h2 className="text-base font-bold text-slate-800">
                        Rincian Jawaban
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-400">
                        Periksa jawaban dari setiap soal
                      </p>
                    </div>
                  </div>

                  {/* FILTER */}

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFilter("semua")}
                      className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                        filter === "semua"
                          ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                          : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      Semua ({hasil.totalSoal})
                    </button>

                    <button
                      onClick={() => setFilter("benar")}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                        filter === "benar"
                          ? "bg-emerald-600 text-white shadow-sm shadow-emerald-200"
                          : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      <ThumbsUp size={12} />
                      Benar ({hasil.benar})
                    </button>

                    <button
                      onClick={() => setFilter("salah")}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                        filter === "salah"
                          ? "bg-rose-600 text-white shadow-sm shadow-rose-200"
                          : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      <ThumbsDown size={12} />
                      Salah ({hasil.salah})
                    </button>
                  </div>
                </div>
              </div>

              {/* LIST */}

              <div className="max-h-[560px] divide-y divide-slate-100 overflow-y-auto">
                {filteredSoal.map((s) => {
                  const isExpanded =
                    selectedSoal === s.nomor;

                  const isCorrect =
                    s.status === "benar";

                  return (
                    <div
                      key={s.nomor}
                      className={`transition ${
                        isExpanded
                          ? "bg-indigo-50/40"
                          : "hover:bg-slate-50/70"
                      }`}
                    >
                      {/* ROW */}

                      <button
                        type="button"
                        onClick={() =>
                          toggleSoal(s.nomor)
                        }
                        className="flex w-full min-w-0 items-center gap-3 p-4 text-left sm:p-5"
                      >
                        {/* NUMBER */}

                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                            isCorrect
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-rose-50 text-rose-600"
                          }`}
                        >
                          {s.nomor}
                        </div>

                        {/* CONTENT */}

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                                isCorrect
                                  ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                                  : "border-rose-100 bg-rose-50 text-rose-700"
                              }`}
                            >
                              {isCorrect ? (
                                <CheckCircle size={12} />
                              ) : (
                                <XCircle size={12} />
                              )}

                              {isCorrect
                                ? "Benar"
                                : "Salah"}
                            </span>

                            <span className="text-xs text-slate-400">
                              Jawaban:{" "}
                              <span className="font-semibold text-slate-600">
                                {s.jawabanUser ||
                                  "—"}
                              </span>
                            </span>
                          </div>
                        </div>

                        {/* ARROW */}

                        <div className="shrink-0 rounded-lg p-1.5 text-slate-400">
                          {isExpanded ? (
                            <ChevronUp size={17} />
                          ) : (
                            <ChevronDown size={17} />
                          )}
                        </div>
                      </button>

                      {/* EXPANDED */}

                      {isExpanded && (
                        <div className="border-t border-slate-100 px-4 pb-5 pt-4 sm:px-5">
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                            {/* Correct Answer */}

                            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                                  <CheckCircle size={15} />
                                </div>

                                <div>
                                  <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
                                    Jawaban Benar
                                  </p>

                                  <p className="text-xs text-slate-400">
                                    Kunci jawaban
                                  </p>
                                </div>
                              </div>

                              <div className="mt-4 flex h-12 items-center justify-center rounded-xl bg-white text-xl font-bold text-emerald-600 shadow-sm">
                                {s.jawabanBenar}
                              </div>
                            </div>

                            {/* User Answer */}

                            <div
                              className={`rounded-2xl border p-4 ${
                                isCorrect
                                  ? "border-emerald-100 bg-emerald-50/70"
                                  : "border-rose-100 bg-rose-50/70"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm ${
                                    isCorrect
                                      ? "text-emerald-600"
                                      : "text-rose-600"
                                  }`}
                                >
                                  {isCorrect ? (
                                    <ThumbsUp size={15} />
                                  ) : (
                                    <ThumbsDown size={15} />
                                  )}
                                </div>

                                <div>
                                  <p
                                    className={`text-[10px] font-semibold uppercase tracking-wider ${
                                      isCorrect
                                        ? "text-emerald-600"
                                        : "text-rose-600"
                                    }`}
                                  >
                                    Jawaban Anda
                                  </p>

                                  <p className="text-xs text-slate-400">
                                    Pilihan siswa
                                  </p>
                                </div>
                              </div>

                              <div
                                className={`mt-4 flex h-12 items-center justify-center rounded-xl bg-white text-xl font-bold shadow-sm ${
                                  isCorrect
                                    ? "text-emerald-600"
                                    : "text-rose-600"
                                }`}
                              >
                                {s.jawabanUser ||
                                  "—"}
                              </div>
                            </div>
                          </div>

                          {/* FEEDBACK */}

                          <div
                            className={`mt-4 flex items-start gap-2 rounded-xl p-3 text-xs leading-5 ${
                              isCorrect
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-rose-50 text-rose-700"
                            }`}
                          >
                            {isCorrect ? (
                              <CheckCircle
                                size={15}
                                className="mt-0.5 shrink-0"
                              />
                            ) : (
                              <XCircle
                                size={15}
                                className="mt-0.5 shrink-0"
                              />
                            )}

                            <span>
                              {isCorrect ? (
                                <>
                                  Jawaban kamu benar.
                                  Pertahankan hasil
                                  belajarmu!
                                </>
                              ) : (
                                <>
                                  Jawaban kamu belum
                                  tepat. Kunci jawaban
                                  yang benar adalah{" "}
                                  <strong>
                                    {s.jawabanBenar}
                                  </strong>
                                  .
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* FOOTER */}

              <div className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50/50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <span className="font-medium text-slate-500">
                    Total {hasil.totalSoal} soal
                  </span>

                  <span className="flex items-center gap-1.5 font-semibold text-emerald-600">
                    <CheckCircle size={14} />
                    {hasil.benar} benar
                  </span>

                  <span className="flex items-center gap-1.5 font-semibold text-rose-600">
                    <XCircle size={14} />
                    {hasil.salah} salah
                  </span>
                </div>

                <button
                  onClick={() =>
                    router.push("/siswa/dashboard")
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.98] sm:w-auto"
                >
                  <Home size={16} />
                  Dashboard
                </button>
              </div>
            </section>

            {/* =================================================
                FOOTER
            ================================================== */}

            <footer className="pb-3 pt-2 text-center text-xs text-slate-400">
              © 2026 SmartSchool • Hasil {hasil.judul}
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}