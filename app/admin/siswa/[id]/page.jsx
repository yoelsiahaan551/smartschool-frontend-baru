"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Clock,
  Edit,
  GraduationCap,
  User,
  CheckCircle,
  Hash,
  BriefcaseBusiness,
} from "lucide-react";

const STORAGE_KEY = "siswa_data";

const loadSiswa = () => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Gagal membaca data siswa:", error);
    return [];
  }
};

export default function DetailSiswaPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params?.id);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [siswa, setSiswa] = useState(null);

  useEffect(() => {
    const list = loadSiswa();
    const found = list.find((s) => Number(s.id) === id);

    if (found) {
      setSiswa(found);
    } else {
      alert("Siswa tidak ditemukan!");
      router.push("/admin/siswa");
    }
  }, [id, router]);

  if (!siswa) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#F8FAFC]">
        <p className="text-sm text-slate-500">
          Memuat data siswa...
        </p>
      </div>
    );
  }

  const initial =
    siswa.nama?.trim()?.charAt(0)?.toUpperCase() || "S";

  return (
    <div className="flex h-screen w-full min-w-0 overflow-hidden bg-[#F8FAFC]">
      {/* ================================
          SIDEBAR
      ================================= */}
      <Sidebar
        active="siswa"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
      />

      {/* ================================
          MAIN AREA
      ================================= */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          toggleSidebar={() => setIsCollapsed(!isCollapsed)}
          notifications={[]}
          user={{
            name: "Admin Sekolah",
            email: "admin@smartschool.com",
            avatar: "AD",
          }}
        />

        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full px-4 py-5 sm:px-6 md:px-7 lg:px-8 xl:px-10">
            <div className="mx-auto w-full max-w-[1500px]">

              {/* =========================================
                  TOP ACTION
              ========================================== */}
              <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
                
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#1E3A8A]"
                >
                  <ArrowLeft
                    size={17}
                    className="transition-transform group-hover:-translate-x-0.5"
                  />

                  <span>
                    Kembali ke Daftar Siswa
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    router.push(`/admin/siswa/edit/${siswa.id}`)
                  }
                  className="
                    inline-flex
                    w-fit
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-[#BFDBFE]
                    bg-white
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-[#2563EB]
                    shadow-sm
                    transition
                    hover:border-[#93C5FD]
                    hover:bg-[#EFF6FF]
                  "
                >
                  <Edit size={16} />
                  Edit Profil
                </button>
              </div>

              {/* =========================================
                  PROFILE CARD
              ========================================== */}
              <section
                className="
                  overflow-hidden
                  rounded-xl
                  border
                  border-[#DCE6F2]
                  bg-white
                  shadow-sm
                "
              >
                {/* Blue Accent */}
                <div className="h-1 w-full bg-[#3B82F6]" />

                <div className="p-5 sm:p-6 lg:p-8">

                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                    {/* PROFILE */}
                    <div className="flex min-w-0 items-center gap-5">

                      {/* Avatar */}
                      <div
                        className="
                          flex
                          h-20
                          w-20
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[#BFDBFE]
                          bg-[#EFF6FF]
                          text-2xl
                          font-bold
                          text-[#1D4ED8]
                          sm:h-24
                          sm:w-24
                          sm:text-3xl
                        "
                      >
                        {initial}
                      </div>

                      {/* Identity */}
                      <div className="min-w-0">

                        <div className="mb-2 flex flex-wrap items-center gap-2">

                          <span
                            className="
                              rounded-md
                              border
                              border-[#DBEAFE]
                              bg-[#EFF6FF]
                              px-2.5
                              py-1
                              text-xs
                              font-semibold
                              text-[#2563EB]
                            "
                          >
                            DATA SISWA
                          </span>

                          <span
                            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ${
                              siswa.status === "Aktif"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : "bg-rose-50 text-rose-700 border border-rose-100"
                            }`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {siswa.status || "-"}
                          </span>

                        </div>

                        <h1
                          className="
                            break-words
                            text-2xl
                            font-bold
                            tracking-tight
                            text-[#172554]
                            sm:text-3xl
                          "
                        >
                          {siswa.nama}
                        </h1>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">

                          <span className="inline-flex items-center gap-1.5">
                            <Hash size={14} className="text-[#60A5FA]" />
                            NIS {siswa.nis || "-"}
                          </span>

                          <span className="hidden text-slate-300 sm:inline">
                            |
                          </span>

                          <span>
                            NISN {siswa.nisn || "-"}
                          </span>

                          <span className="hidden text-slate-300 sm:inline">
                            |
                          </span>

                          <span className="font-semibold text-[#1E40AF]">
                            {siswa.kelas || "-"}
                          </span>

                        </div>
                      </div>
                    </div>

                    {/* JOIN DATE */}
                    <div className="hidden shrink-0 border-l border-[#E2E8F0] pl-8 lg:block">

                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Bergabung
                      </p>

                      <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-[#1E3A8A]">
                        <Calendar
                          size={15}
                          className="text-[#60A5FA]"
                        />

                        {siswa.joinDate || "-"}
                      </div>

                    </div>
                  </div>

                  {/* =====================================
                      BASIC INFORMATION
                  ====================================== */}
                  <div
                    className="
                      mt-7
                      grid
                      grid-cols-1
                      gap-x-8
                      gap-y-5
                      border-t
                      border-[#EEF2F7]
                      pt-6
                      sm:grid-cols-2
                      lg:grid-cols-4
                    "
                  >

                    <InfoItem
                      icon={<User size={17} />}
                      label="Jenis Kelamin"
                      value={
                        siswa.gender === "L"
                          ? "Laki-laki"
                          : siswa.gender === "P"
                          ? "Perempuan"
                          : "-"
                      }
                    />

                    <InfoItem
                      icon={<Calendar size={17} />}
                      label="Tanggal Lahir"
                      value={siswa.tglLahir || "-"}
                    />

                    <InfoItem
                      icon={<Mail size={17} />}
                      label="Email"
                      value={siswa.email || "-"}
                      breakText
                    />

                    <InfoItem
                      icon={<Phone size={17} />}
                      label="Nomor Telepon"
                      value={siswa.phone || "-"}
                    />

                  </div>
                </div>
              </section>

              {/* =========================================
                  CONTENT GRID
              ========================================== */}
              <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">

                {/* =====================================
                    LEFT CONTENT
                ====================================== */}
                <div className="min-w-0 space-y-5 xl:col-span-2">

                  {/* ===================================
                      ALAMAT
                  ==================================== */}
                  <section
                    className="
                      overflow-hidden
                      rounded-xl
                      border
                      border-[#DCE6F2]
                      bg-white
                      shadow-sm
                    "
                  >

                    <SectionHeader
                      icon={<MapPin size={18} />}
                      title="Alamat"
                      description="Informasi alamat tempat tinggal siswa"
                    />

                    <div
                      className="
                        grid
                        grid-cols-1
                        gap-x-8
                        gap-y-5
                        p-5
                        sm:grid-cols-2
                        lg:p-6
                      "
                    >

                      <DetailItem
                        label="Alamat Jalan"
                        value={siswa.alamat || "-"}
                        breakText
                        className="sm:col-span-2"
                      />

                      <DetailItem
                        label="Kelurahan / Desa"
                        value={siswa.kelurahan || "-"}
                      />

                      <DetailItem
                        label="Kecamatan"
                        value={siswa.kecamatan || "-"}
                      />

                      <DetailItem
                        label="Kota / Kabupaten"
                        value={siswa.kota || "-"}
                      />

                      <DetailItem
                        label="Provinsi"
                        value={siswa.provinsi || "-"}
                      />

                    </div>
                  </section>

                  {/* ===================================
                      ORANG TUA
                  ==================================== */}
                  <section
                    className="
                      overflow-hidden
                      rounded-xl
                      border
                      border-[#DCE6F2]
                      bg-white
                      shadow-sm
                    "
                  >

                    <SectionHeader
                      icon={<Users size={18} />}
                      title="Orang Tua / Wali"
                      description="Informasi orang tua atau wali siswa"
                    />

                    <div
                      className="
                        grid
                        grid-cols-1
                        gap-x-8
                        gap-y-5
                        p-5
                        sm:grid-cols-2
                        lg:p-6
                      "
                    >

                      <DetailItem
                        label="Nama Orang Tua"
                        value={siswa.namaOrtu || "-"}
                      />

                      <DetailItem
                        label="NIK Orang Tua"
                        value={siswa.nikOrtu || "-"}
                        breakText
                      />

                      <DetailItem
                        label="Pekerjaan"
                        value={siswa.pekerjaanOrtu || "-"}
                        icon={<BriefcaseBusiness size={14} />}
                      />

                      <div className="hidden sm:block" />

                      <DetailItem
                        label="Alamat KTP"
                        value={siswa.alamatKtpOrtu || "-"}
                        breakText
                        className="sm:col-span-2"
                      />

                      <div className="min-w-0 sm:col-span-2">

                        <DetailItem
                          label="Alamat Domisili"
                          value={siswa.alamatDomisiliOrtu || "-"}
                          breakText
                        />

                        {siswa.domisiliSama && (
                          <div
                            className="
                              mt-3
                              inline-flex
                              items-center
                              gap-2
                              rounded-md
                              border
                              border-emerald-100
                              bg-emerald-50
                              px-3
                              py-1.5
                              text-xs
                              font-medium
                              text-emerald-700
                            "
                          >
                            <CheckCircle size={14} />

                            Alamat domisili sama dengan alamat KTP
                          </div>
                        )}

                      </div>
                    </div>
                  </section>
                </div>

                {/* =====================================
                    RIGHT CONTENT
                ====================================== */}
                <div className="min-w-0 space-y-5">

                  {/* ===================================
                      STATISTIK
                  ==================================== */}
                  <section
                    className="
                      overflow-hidden
                      rounded-xl
                      border
                      border-[#DCE6F2]
                      bg-white
                      shadow-sm
                    "
                  >

                    <SectionHeader
                      icon={<GraduationCap size={18} />}
                      title="Statistik Akademik"
                      description="Ringkasan performa siswa"
                    />

                    <div className="space-y-3 p-5 lg:p-6">

                      <AcademicStat
                        label="Rata-rata Nilai"
                        value="85"
                      />

                      <AcademicStat
                        label="Mata Pelajaran Unggulan"
                        value="3"
                      />

                      <AcademicStat
                        label="Tingkat Kehadiran"
                        value="98%"
                        valueClass="text-emerald-600"
                      />

                    </div>
                  </section>

                  {/* ===================================
                      RINGKASAN
                  ==================================== */}
                  <section
                    className="
                      overflow-hidden
                      rounded-xl
                      border
                      border-[#DCE6F2]
                      bg-white
                      shadow-sm
                    "
                  >

                    <SectionHeader
                      icon={<User size={18} />}
                      title="Ringkasan"
                      description="Informasi utama siswa"
                    />

                    <div className="divide-y divide-[#EEF2F7]">

                      <SummaryRow
                        label="Status"
                        value={siswa.status || "-"}
                        valueClass={
                          siswa.status === "Aktif"
                            ? "text-emerald-600"
                            : "text-rose-600"
                        }
                      />

                      <SummaryRow
                        label="Kelas"
                        value={siswa.kelas || "-"}
                      />

                      <SummaryRow
                        label="NIS"
                        value={siswa.nis || "-"}
                      />

                      <SummaryRow
                        label="NISN"
                        value={siswa.nisn || "-"}
                      />

                      <SummaryRow
                        label="Bergabung"
                        value={siswa.joinDate || "-"}
                      />

                    </div>
                  </section>

                </div>
              </div>

              <div className="h-4" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================
   SECTION HEADER
========================================= */

function SectionHeader({
  icon,
  title,
  description,
}) {
  return (
    <div
      className="
        flex
        items-start
        gap-3
        border-b
        border-[#EEF2F7]
        px-5
        py-4
        lg:px-6
      "
    >

      <div
        className="
          mt-0.5
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          border
          border-[#DBEAFE]
          bg-[#EFF6FF]
          text-[#3B82F6]
        "
      >
        {icon}
      </div>

      <div className="min-w-0">

        <h2 className="text-sm font-semibold text-[#172554]">
          {title}
        </h2>

        {description && (
          <p className="mt-0.5 text-xs text-slate-400">
            {description}
          </p>
        )}

      </div>
    </div>
  );
}

/* =========================================
   INFO ITEM
========================================= */

function InfoItem({
  icon,
  label,
  value,
  breakText = false,
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">

      <div className="mt-0.5 shrink-0 text-[#60A5FA]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-xs font-medium text-slate-400">
          {label}
        </p>

        <p
          className={`mt-1 text-sm font-medium text-[#334155] ${
            breakText
              ? "break-words [overflow-wrap:anywhere]"
              : "truncate"
          }`}
          title={value}
        >
          {value}
        </p>

      </div>
    </div>
  );
}

/* =========================================
   DETAIL ITEM
========================================= */

function DetailItem({
  label,
  value,
  breakText = false,
  className = "",
  icon,
}) {
  return (
    <div className={`min-w-0 ${className}`}>

      <div className="flex items-center gap-1.5">

        <p className="text-xs font-medium text-slate-400">
          {label}
        </p>

        {icon && (
          <span className="text-[#60A5FA]">
            {icon}
          </span>
        )}

      </div>

      <p
        className={`mt-1.5 text-sm font-medium text-[#334155] ${
          breakText
            ? "break-words leading-6 [overflow-wrap:anywhere]"
            : "truncate"
        }`}
        title={value}
      >
        {value}
      </p>

    </div>
  );
}

/* =========================================
   ACADEMIC STAT
========================================= */

function AcademicStat({
  label,
  value,
  valueClass = "text-[#172554]",
}) {
  return (
    <div
      className="
        flex
        min-h-[68px]
        items-center
        justify-between
        rounded-lg
        border
        border-[#E5EDF7]
        bg-[#F8FAFC]
        px-4
        py-3.5
        transition
        hover:border-[#BFDBFE]
        hover:bg-[#F8FBFF]
      "
    >

      <div className="min-w-0 pr-3">

        <p className="text-xs font-medium text-slate-400">
          {label}
        </p>

      </div>

      <p
        className={`shrink-0 text-2xl font-bold tracking-tight ${valueClass}`}
      >
        {value}
      </p>

    </div>
  );
}

/* =========================================
   SUMMARY ROW
========================================= */

function SummaryRow({
  label,
  value,
  valueClass = "text-[#334155]",
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        px-5
        py-3.5
        lg:px-6
      "
    >

      <span className="text-xs font-medium text-slate-400">
        {label}
      </span>

      <span
        className={`max-w-[60%] truncate text-right text-sm font-semibold ${valueClass}`}
        title={value}
      >
        {value}
      </span>

    </div>
  );
}