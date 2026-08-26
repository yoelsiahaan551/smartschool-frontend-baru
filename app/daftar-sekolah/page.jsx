"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  GraduationCap,
  Headphones,
  Mail,
  MapPin,
  Menu,
  Phone,
  School,
  Sparkles,
  User,
  Users,
  BriefcaseBusiness,
  X,
} from "lucide-react";

export default function DaftarSekolahPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    namaSekolah: "",
    jenjang: "",
    jumlahSiswa: "",
    kota: "",
    provinsi: "",
    namaLengkap: "",
    jabatan: "",
    email: "",
    whatsapp: "",
    paket: "",
    pesan: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("DATA PENDAFTARAN:", formData);

    alert("Pendaftaran berhasil dikirim!");
  };

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const packages = [
    {
      value: "konsultasi",
      title: "Konsultasi Dulu",
      description:
        "Diskusikan kebutuhan sekolah bersama tim Sisap.",
      price: "Gratis",
      period: "",
      badge: "GRATIS",
    },
    {
      value: "bulanan",
      title: "Paket Full Bulanan",
      description:
        "Cocok untuk sekolah yang ingin berlangganan secara fleksibel.",
      price: "Rp 9.000",
      period: "/bulan",
      badge: "POPULER",
    },
    {
      value: "triwulan",
      title: "Paket Full Triwulan",
      description:
        "Pilihan hemat untuk kebutuhan penggunaan selama tiga bulan.",
      price: "Rp 24.000",
      period: "/3 bulan",
      badge: "HEMAT",
    },
    {
      value: "tahunan",
      title: "Paket Full Tahunan",
      description:
        "Pilihan terbaik untuk penggunaan jangka panjang.",
      price: "Rp 75.000",
      period: "/tahun",
      badge: "BEST VALUE",
    },
  ];

  const benefits = [
    {
      title: "Akun portal sekolah",
      description:
        "Akses portal sekolah setelah proses pendaftaran.",
    },
    {
      title: "Setup oleh tim Sisap",
      description:
        "Konfigurasi awal dibantu oleh tim kami.",
    },
    {
      title: "Training onboarding",
      description:
        "Panduan penggunaan sistem untuk tim sekolah.",
    },
    {
      title: "Support WhatsApp & email",
      description:
        "Bantuan tersedia pada jam operasional.",
    },
    {
      title: "Backup data",
      description:
        "Data sekolah dikelola dengan sistem yang terstruktur.",
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F8FAFC] text-slate-900">
      {/* =====================================================
          NAVBAR
      ====================================================== */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="flex min-h-[64px] items-center justify-between gap-4 sm:min-h-[72px] lg:min-h-[76px]">
            {/* LOGO */}
            <Link
              href="/"
              className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
            >
              <img
                src="/logo/logoSS.png"
                alt="Sisap Logo"
                className="h-9 w-9 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10 lg:h-11 lg:w-11"
              />

              <div className="hidden min-w-0 flex-col leading-none sm:flex">
                <span className="truncate text-xl font-bold tracking-[-0.04em] text-slate-900 sm:text-[22px] lg:text-[23px]">
                  Smart School
                </span>

                <span className="mt-1 truncate text-[7px] font-medium uppercase tracking-[0.16em] text-slate-400 sm:text-[8px]">
                  School Platform
                </span>
              </div>
            </Link>

            {/* =================================================
                DESKTOP NAV
            ================================================== */}
            <nav className="hidden min-w-0 items-center lg:flex">
              <div className="flex min-w-0 items-center gap-0.5 xl:gap-1">
                <Link
                  href="/"
                  className="whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950 xl:px-3.5 xl:text-sm"
                >
                  Beranda
                </Link>

                <Link
                  href="#fitur"
                  className="whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950 xl:px-3.5 xl:text-sm"
                >
                  Fitur
                </Link>

                <Link
                  href="#harga"
                  className="whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950 xl:px-3.5 xl:text-sm"
                >
                  Harga
                </Link>

                <Link
                  href="#cara-kerja"
                  className="whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950 xl:px-3.5 xl:text-sm"
                >
                  Cara Kerja
                </Link>

                <Link
                  href="#kontak"
                  className="whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950 xl:px-3.5 xl:text-sm"
                >
                  Kontak
                </Link>
              </div>

              {/* GARIS PEMISAH */}
              <div className="mx-3 h-7 w-px shrink-0 bg-slate-200 xl:mx-5" />

              {/* =================================================
                  BUTTON MASUK PORTAL
              ================================================== */}
              <Link
                href="/login"
                className="group inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 active:translate-y-0 xl:h-11 xl:px-6"
              >
                <span>Masuk Portal</span>
              </Link>
            </nav>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              aria-label={
                mobileMenuOpen ? "Tutup menu" : "Buka menu"
              }
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 lg:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* ===================================================
              MOBILE NAV
          ==================================================== */}
          {mobileMenuOpen && (
            <div className="border-t border-slate-100 py-4 lg:hidden">
              <nav className="flex flex-col gap-1">
                <Link
                  href="/"
                  onClick={handleMobileLinkClick}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  Beranda
                </Link>

                <Link
                  href="#fitur"
                  onClick={handleMobileLinkClick}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  Fitur
                </Link>

                <Link
                  href="#harga"
                  onClick={handleMobileLinkClick}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  Harga
                </Link>

                <Link
                  href="#cara-kerja"
                  onClick={handleMobileLinkClick}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  Cara Kerja
                </Link>

                <Link
                  href="#kontak"
                  onClick={handleMobileLinkClick}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  Kontak
                </Link>

                <div className="my-3 border-t border-slate-100" />

                {/* MOBILE MASUK PORTAL */}
                <Link
                  href="/login"
                  onClick={handleMobileLinkClick}
                  className="group flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-lg"
                >
                  <span>Masuk Portal</span>

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}
      <main className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 sm:py-12 md:px-8 lg:px-10 lg:py-14 xl:px-12 2xl:px-16">
        {/* ===================================================
            HERO
        ==================================================== */}
        <section className="mb-10 w-full text-center sm:mb-12 lg:mb-14">
          <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-semibold text-blue-700 sm:px-4 sm:py-2 sm:text-xs md:text-sm">
            <Sparkles className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />

            <span className="truncate">
              Daftar sekolah Anda sekarang
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl">
            Daftar Sekolah
          </h1>

          <p className="mx-auto mt-3 w-full max-w-2xl text-xs leading-6 text-slate-500 sm:mt-4 sm:text-sm md:text-base md:leading-7">
            Lengkapi data berikut untuk mendaftarkan sekolah Anda
            ke platform Sisap dan mulai mengelola sekolah secara
            modern, terintegrasi, dan profesional.
          </p>
        </section>

        {/* ===================================================
            FORM + SIDEBAR
        ==================================================== */}
        <form onSubmit={handleSubmit}>
          <div className="grid w-full grid-cols-1 items-start gap-5 lg:gap-6 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_370px] 2xl:gap-8">
            {/* =================================================
                LEFT CONTENT
            ================================================== */}
            <div className="min-w-0 space-y-5 lg:space-y-6">
              {/* DATA SEKOLAH */}
              <section className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 lg:p-7">
                <div className="mb-6 flex items-center gap-3 sm:mb-7">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                    1
                  </div>

                  <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                    Data Sekolah
                  </h2>
                </div>

                <div className="space-y-5">
                  {/* NAMA SEKOLAH */}
                  <div className="min-w-0">
                    <label
                      htmlFor="namaSekolah"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      <span className="flex items-center gap-2">
                        <School className="h-4 w-4 shrink-0 text-blue-600" />
                        Nama Sekolah
                      </span>
                    </label>

                    <input
                      id="namaSekolah"
                      type="text"
                      name="namaSekolah"
                      value={formData.namaSekolah}
                      onChange={handleChange}
                      placeholder="Contoh: SMK Taruna Bhakti"
                      required
                      className="h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:h-12 sm:px-4"
                    />
                  </div>

                  {/* JENJANG */}
                  <div className="min-w-0">
                    <label
                      htmlFor="jenjang"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      <span className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 shrink-0 text-blue-600" />
                        Jenjang
                      </span>
                    </label>

                    <div className="relative">
                      <select
                        id="jenjang"
                        name="jenjang"
                        value={formData.jenjang}
                        onChange={handleChange}
                        required
                        className="h-11 w-full min-w-0 appearance-none rounded-xl border border-slate-200 bg-white px-3.5 pr-10 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:h-12 sm:px-4 sm:pr-11"
                      >
                        <option value="">
                          Pilih jenjang sekolah
                        </option>
                        <option value="SD">SD</option>
                        <option value="SMP">SMP</option>
                        <option value="SMA">SMA</option>
                        <option value="SMK">SMK</option>
                      </select>

                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 sm:right-4" />
                    </div>
                  </div>

                  {/* JUMLAH SISWA */}
                  <div className="min-w-0">
                    <label
                      htmlFor="jumlahSiswa"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4 shrink-0 text-blue-600" />
                        Jumlah Siswa
                      </span>
                    </label>

                    <input
                      id="jumlahSiswa"
                      type="number"
                      name="jumlahSiswa"
                      value={formData.jumlahSiswa}
                      onChange={handleChange}
                      placeholder="Contoh: 500"
                      min="1"
                      required
                      className="h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:h-12 sm:px-4"
                    />

                    <p className="mt-2 flex items-center gap-1 text-[11px] text-slate-400 sm:text-xs">
                      <Clock3 className="h-3.5 w-3.5 shrink-0" />
                      Masukkan jumlah siswa aktif saat ini.
                    </p>
                  </div>

                  {/* KOTA + PROVINSI */}
                  <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="min-w-0">
                      <label
                        htmlFor="kota"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 shrink-0 text-blue-600" />
                          Kota / Kabupaten
                        </span>
                      </label>

                      <input
                        id="kota"
                        type="text"
                        name="kota"
                        value={formData.kota}
                        onChange={handleChange}
                        placeholder="Contoh: Depok"
                        required
                        className="h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:h-12 sm:px-4"
                      />
                    </div>

                    <div className="min-w-0">
                      <label
                        htmlFor="provinsi"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 shrink-0 text-blue-600" />
                          Provinsi
                        </span>
                      </label>

                      <input
                        id="provinsi"
                        type="text"
                        name="provinsi"
                        value={formData.provinsi}
                        onChange={handleChange}
                        placeholder="Contoh: Jawa Barat"
                        required
                        className="h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:h-12 sm:px-4"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* KONTAK PERSON */}
              <section className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 lg:p-7">
                <div className="mb-6 flex items-center gap-3 sm:mb-7">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                    2
                  </div>

                  <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                    Kontak Person
                  </h2>
                </div>

                <div className="space-y-5">
                  {/* NAMA */}
                  <div className="min-w-0">
                    <label
                      htmlFor="namaLengkap"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      <span className="flex items-center gap-2">
                        <User className="h-4 w-4 shrink-0 text-blue-600" />
                        Nama Lengkap
                      </span>
                    </label>

                    <input
                      id="namaLengkap"
                      type="text"
                      name="namaLengkap"
                      value={formData.namaLengkap}
                      onChange={handleChange}
                      placeholder="Masukkan nama lengkap"
                      required
                      className="h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:h-12 sm:px-4"
                    />
                  </div>

                  {/* JABATAN */}
                  <div className="min-w-0">
                    <label
                      htmlFor="jabatan"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      <span className="flex items-center gap-2">
                        <BriefcaseBusiness className="h-4 w-4 shrink-0 text-blue-600" />
                        Jabatan
                      </span>
                    </label>

                    <input
                      id="jabatan"
                      type="text"
                      name="jabatan"
                      value={formData.jabatan}
                      onChange={handleChange}
                      placeholder="Contoh: Kepala Sekolah"
                      required
                      className="h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:h-12 sm:px-4"
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="min-w-0">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      <span className="flex items-center gap-2">
                        <Mail className="h-4 w-4 shrink-0 text-blue-600" />
                        Email
                      </span>
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@sekolah.sch.id"
                      required
                      className="h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:h-12 sm:px-4"
                    />
                  </div>

                  {/* WHATSAPP */}
                  <div className="min-w-0">
                    <label
                      htmlFor="whatsapp"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      <span className="flex items-center gap-2">
                        <Phone className="h-4 w-4 shrink-0 text-blue-600" />
                        WhatsApp / Nomor HP
                      </span>
                    </label>

                    <input
                      id="whatsapp"
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="Contoh: 628123456789"
                      required
                      className="h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:h-12 sm:px-4"
                    />
                  </div>
                </div>
              </section>

              {/* PILIH PAKET */}
              <section
                id="harga"
                className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 lg:p-7"
              >
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
                    3
                  </div>

                  <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                    Pilih Paket
                  </h2>

                  <span className="text-[11px] font-medium text-slate-400 sm:text-xs">
                    Opsional
                  </span>
                </div>

                <p className="mb-5 ml-11 text-xs leading-5 text-slate-500 sm:mb-6 sm:text-sm sm:leading-6">
                  Pilih paket yang sesuai dengan kebutuhan sekolah
                  Anda. Anda juga dapat memilih konsultasi terlebih
                  dahulu.
                </p>

                <div className="space-y-3">
                  {packages.map((item) => {
                    const isSelected =
                      formData.paket === item.value;

                    return (
                      <label
                        key={item.value}
                        className={`flex min-w-0 cursor-pointer items-start gap-3 rounded-xl border p-4 transition sm:gap-4 sm:p-5 ${
                          isSelected
                            ? "border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/10"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paket"
                          value={item.value}
                          checked={isSelected}
                          onChange={handleChange}
                          className="mt-1 h-4 w-4 shrink-0 accent-blue-600"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0">
                              <h3 className="break-words text-sm font-semibold text-slate-800 sm:text-base">
                                {item.title}
                              </h3>

                              <p className="mt-1 break-words text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                                {item.description}
                              </p>
                            </div>

                            <span
                              className={`w-fit shrink-0 rounded-md px-2 py-1 text-[9px] font-bold tracking-wide sm:text-[10px] ${
                                item.value === "bulanan"
                                  ? "bg-blue-50 text-blue-700"
                                  : item.value === "triwulan"
                                    ? "bg-purple-50 text-purple-700"
                                    : item.value === "tahunan"
                                      ? "bg-amber-50 text-amber-700"
                                      : "bg-emerald-50 text-emerald-700"
                              }`}
                            >
                              {item.badge}
                            </span>
                          </div>

                          <div className="mt-2">
                            <span className="text-sm font-bold text-blue-600 sm:text-base">
                              {item.price}
                            </span>

                            {item.period && (
                              <span className="ml-1 text-[11px] text-slate-400 sm:text-xs">
                                {item.period}
                              </span>
                            )}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </section>

              {/* PESAN */}
              <section className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6 lg:p-7">
                <div className="mb-5 flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                    <Headphones className="h-5 w-5 text-blue-600" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                      Pesan / Pertanyaan
                    </h2>

                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                      Ada pertanyaan atau kebutuhan khusus?
                    </p>
                  </div>
                </div>

                <textarea
                  id="pesan"
                  name="pesan"
                  rows={5}
                  value={formData.pesan}
                  onChange={handleChange}
                  placeholder="Tulis pertanyaan atau kebutuhan sekolah Anda..."
                  className="min-h-[120px] w-full min-w-0 resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:px-4"
                />
              </section>

              {/* SUBMIT */}
              <div className="w-full">
                <button
                  type="submit"
                  className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-md active:scale-[0.99] sm:text-base"
                >
                  <span>Daftar Sekarang</span>

                  <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] leading-5 text-slate-400 sm:text-xs">
                  <Clock3 className="h-3.5 w-3.5 shrink-0" />
                  Tim Sisap akan menghubungi Anda setelah data
                  dikirim.
                </p>
              </div>
            </div>

            {/* =================================================
                RIGHT SIDEBAR
            ================================================== */}
            <aside className="min-w-0 space-y-5 lg:space-y-6">
              {/* KONSULTASI */}
              <div className="w-full min-w-0 rounded-2xl bg-slate-900 p-5 text-white shadow-sm sm:p-6">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                  <Sparkles className="h-5 w-5 text-blue-400" />
                </div>

                <h3 className="text-base font-bold sm:text-lg">
                  Konsultasi Gratis
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-400 sm:text-sm">
                  Tim Sisap siap membantu menentukan solusi
                  terbaik sesuai kebutuhan sekolah Anda.
                </p>

                <ul className="mt-5 space-y-4">
                  <li className="flex gap-3 text-xs text-slate-300 sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>Analisis kebutuhan sekolah</span>
                  </li>

                  <li className="flex gap-3 text-xs text-slate-300 sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>Rekomendasi paket</span>
                  </li>

                  <li className="flex gap-3 text-xs text-slate-300 sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>Demo fitur</span>
                  </li>

                  <li className="flex gap-3 text-xs text-slate-300 sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>Onboarding sekolah</span>
                  </li>
                </ul>
              </div>

              {/* BENEFITS */}
              <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50">
                    <Award className="h-5 w-5 text-amber-500" />
                  </div>

                  <h3 className="min-w-0 text-base font-bold text-slate-900 sm:text-lg">
                    Yang Anda Dapatkan
                  </h3>
                </div>

                <ul className="space-y-5">
                  {benefits.map((item) => (
                    <li
                      key={item.title}
                      className="flex min-w-0 items-start gap-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                      <div className="min-w-0">
                        <span className="block break-words text-sm font-semibold text-slate-800">
                          {item.title}
                        </span>

                        <span className="mt-1 block break-words text-[11px] leading-5 text-slate-500 sm:text-xs">
                          {item.description}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* BUTUH BANTUAN */}
              <div
                id="kontak"
                className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                  <Headphones className="h-5 w-5 text-emerald-600" />
                </div>

                <h3 className="mt-4 text-base font-bold text-slate-900 sm:text-lg">
                  Butuh Bantuan?
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-500 sm:text-sm">
                  Konsultasikan kebutuhan sekolah Anda dengan
                  tim Sisap. Kami siap membantu memberikan
                  rekomendasi yang sesuai.
                </p>

                {/* CONTACT */}
                <div className="mt-5 space-y-3">
                  <a
                    href="mailto:support@sisap.id"
                    className="flex min-w-0 items-center gap-3 text-xs text-slate-600 transition hover:text-blue-600 sm:text-sm"
                  >
                    <Mail className="h-4 w-4 shrink-0" />

                    <span className="min-w-0 break-all">
                      support@sisap.id
                    </span>
                  </a>

                  <a
                    href="tel:+6285219971011"
                    className="flex min-w-0 items-center gap-3 text-xs text-slate-600 transition hover:text-blue-600 sm:text-sm"
                  >
                    <Phone className="h-4 w-4 shrink-0" />

                    <span className="break-words">
                      +62 852-1997-1011
                    </span>
                  </a>
                </div>

                <div className="my-5 border-t border-slate-100" />

                {/* JADWALKAN DEMO */}
                <div className="min-w-0 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                      <CalendarDays className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="break-words text-sm font-semibold text-slate-900">
                        Ingin melihat Sisap lebih dekat?
                      </p>

                      <p className="mt-1 break-words text-[11px] leading-5 text-slate-500 sm:text-xs">
                        Jadwalkan demo bersama tim kami dan lihat
                        bagaimana Sisap dapat membantu pengelolaan
                        sekolah Anda.
                      </p>
                    </div>
                  </div>

                  <a
                    href="mailto:support@sisap.id?subject=Permintaan%20Jadwal%20Demo%20Sisap"
                    className="mt-4 flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                  >
                    <span>Jadwalkan Demo</span>

                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </form>

        {/* =====================================================
            FOOTER
        ====================================================== */}
        <footer className="mt-12 border-t border-slate-200 pt-7 text-center sm:mt-16 sm:pt-8">
          <div className="mb-2 flex items-center justify-center gap-2">
            <img
              src="/logo/logoSS.png"
              alt=" Logo"
              className="h-7 w-7 object-contain"
            />

            <span className="text-sm font-bold text-slate-800">
              Smart School
            </span>
          </div>

          <p className="text-[11px] text-slate-400 sm:text-xs">
            © {new Date().getFullYear()} Sisap. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}