"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

import {
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  BriefcaseBusiness,
  GraduationCap,
  BookOpen,
  School,
  IdCard,
  ShieldCheck,
  KeyRound,
  Edit3,
  Camera,
  CheckCircle2,
  Clock3,
  Award,
  Users,
  Hash,
  Building2,
  ChevronRight,
  Lock,
  UserRoundCheck,
} from "lucide-react";

export default function ProfilGuruPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("profil");

  const [profile, setProfile] = useState({
    nama: "Bu Sari",
    gelar: "S.Kom., M.Kom.",
    nip: "198705122010011001",
    nuptk: "1234567890123456",
    jenisKelamin: "Perempuan",
    tempatLahir: "Depok",
    tanggalLahir: "12 Mei 1987",
    agama: "Islam",
    status: "Guru Tetap",
    jabatan: "Guru Mata Pelajaran",
    pendidikan: "S2 Teknik Informatika",
    bidangStudi: "Rekayasa Perangkat Lunak",
    email: "Sari@smartschool.sch.id",
    telepon: "0812-3456-7890",
    alamat:
      "Jl. Pendidikan No. 25, Kel. Sukamaju, Kec. Cilodong, Depok, Jawa Barat",
    sekolah: "SMK SmartSchool",
    kodeGuru: "GR-2026-001",
    username: "Bu Sari",
  });

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-full min-w-0 overflow-hidden bg-slate-100">
      {/* SIDEBAR */}
      <Sidebar
        active="profil"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
        role="guru"
      />

      {/* MAIN */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{
            name: `${profile.nama}`,
            email: profile.email,
            avatar: "BS",
          }}
        />

        <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full min-w-0 p-3 sm:p-4 md:p-6 lg:p-7 xl:p-8">
            <div className="mx-auto w-full max-w-[1500px] space-y-6">
              {/* PAGE HEADER */}
              <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                        Guru
                      </span>

                      <span className="text-xs text-slate-400">
                        / Profil
                      </span>
                    </div>

                    <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
                      Profil Guru
                    </h1>

                    <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
                      Kelola dan lihat informasi profil, data kepegawaian,
                      serta informasi akun Anda.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
                  >
                    <Edit3 size={17} />
                    Edit Profil
                  </button>
                </div>
              </section>

              {/* PROFILE HERO */}
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* COVER */}
                <div className="relative h-32 overflow-hidden bg-slate-800 sm:h-40">
                  <div className="absolute -right-10 -top-20 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
                  <div className="absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-indigo-500/20 blur-3xl" />

                  <div className="absolute inset-0 opacity-10">
                    <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:24px_24px]" />
                  </div>
                </div>

                {/* PROFILE CONTENT */}
                <div className="relative px-5 pb-6 sm:px-7">
                  <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 lg:flex-row lg:items-end lg:justify-between">
                    <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end">
                      {/* AVATAR */}
                      <div className="relative w-fit">
                        <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-slate-700 text-2xl font-bold text-white shadow-lg sm:h-28 sm:w-28 sm:text-3xl">
                          BS
                        </div>

                        <button
                          type="button"
                          aria-label="Ubah foto profil"
                          className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-lg border-2 border-white bg-blue-600 text-white shadow-sm transition hover:bg-blue-700"
                        >
                          <Camera size={14} />
                        </button>
                      </div>

                      {/* NAME */}
                      <div className="min-w-0 pb-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
                            {profile.nama}
                          </h2>

                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                            <CheckCircle2 size={12} />
                            Aktif
                          </span>
                        </div>

                        <p className="mt-1 text-sm font-medium text-slate-500">
                          {profile.gelar}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                          <span className="inline-flex items-center gap-1.5">
                            <BriefcaseBusiness size={13} />
                            {profile.jabatan}
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <School size={13} />
                            {profile.sekolah}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CODE */}
                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
                        <Hash size={17} />
                      </div>

                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                          Kode Guru
                        </p>

                        <p className="mt-0.5 text-sm font-bold text-slate-700">
                          {profile.kodeGuru}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* TABS */}
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex min-w-max">
                  <TabButton
                    active={activeTab === "profil"}
                    onClick={() => setActiveTab("profil")}
                    icon={User}
                    label="Informasi Profil"
                  />

                  <TabButton
                    active={activeTab === "kepegawaian"}
                    onClick={() => setActiveTab("kepegawaian")}
                    icon={BriefcaseBusiness}
                    label="Kepegawaian"
                  />

                  <TabButton
                    active={activeTab === "akun"}
                    onClick={() => setActiveTab("akun")}
                    icon={ShieldCheck}
                    label="Akun & Keamanan"
                  />
                </div>
              </div>

              {/* CONTENT */}
              {activeTab === "profil" && (
                <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                  {/* LEFT */}
                  <div className="min-w-0 space-y-6">
                    {/* INFORMASI PRIBADI */}
                    <ProfileSection
                      icon={User}
                      title="Informasi Pribadi"
                      description="Informasi dasar mengenai identitas guru."
                      iconClass="bg-blue-50 text-blue-600"
                    >
                      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                        <DetailItem
                          icon={User}
                          label="Nama Lengkap"
                          value={`${profile.nama}, ${profile.gelar}`}
                        />

                        <DetailItem
                          icon={UserRoundCheck}
                          label="Jenis Kelamin"
                          value={profile.jenisKelamin}
                        />

                        <DetailItem
                          icon={MapPin}
                          label="Tempat Lahir"
                          value={profile.tempatLahir}
                        />

                        <DetailItem
                          icon={CalendarDays}
                          label="Tanggal Lahir"
                          value={profile.tanggalLahir}
                        />

                        <DetailItem
                          icon={ShieldCheck}
                          label="Agama"
                          value={profile.agama}
                        />

                        <DetailItem
                          icon={GraduationCap}
                          label="Pendidikan Terakhir"
                          value={profile.pendidikan}
                        />
                      </div>
                    </ProfileSection>

                    {/* KONTAK */}
                    <ProfileSection
                      icon={Phone}
                      title="Informasi Kontak"
                      description="Informasi kontak yang dapat digunakan untuk komunikasi."
                      iconClass="bg-indigo-50 text-indigo-600"
                    >
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <DetailItem
                          icon={Mail}
                          label="Email"
                          value={profile.email}
                        />

                        <DetailItem
                          icon={Phone}
                          label="Nomor Telepon"
                          value={profile.telepon}
                        />

                        <div className="sm:col-span-2">
                          <DetailItem
                            icon={MapPin}
                            label="Alamat"
                            value={profile.alamat}
                          />
                        </div>
                      </div>
                    </ProfileSection>

                    {/* BIDANG MENGAJAR */}
                    <ProfileSection
                      icon={BookOpen}
                      title="Bidang Mengajar"
                      description="Informasi bidang studi dan aktivitas pembelajaran."
                      iconClass="bg-violet-50 text-violet-600"
                    >
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <InfoBox
                          icon={BookOpen}
                          label="Bidang Studi"
                          value={profile.bidangStudi}
                        />

                        <InfoBox
                          icon={Users}
                          label="Status"
                          value={profile.status}
                        />

                        <InfoBox
                          icon={School}
                          label="Sekolah"
                          value={profile.sekolah}
                        />

                        <InfoBox
                          icon={GraduationCap}
                          label="Pendidikan"
                          value={profile.pendidikan}
                        />
                      </div>
                    </ProfileSection>
                  </div>

                  {/* RIGHT */}
                  <aside className="min-w-0 space-y-6">
                    {/* STATUS */}
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                      <div className="border-b border-slate-100 bg-slate-50/80 p-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-bold text-slate-800">
                              Status Guru
                            </h3>

                            <p className="mt-1 text-xs text-slate-400">
                              Ringkasan status akun dan kepegawaian
                            </p>
                          </div>

                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                            <CheckCircle2
                              size={18}
                              className="text-emerald-600"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1 p-3">
                        <StatusRow
                          label="Status Akun"
                          value="Aktif"
                          active
                        />

                        <StatusRow
                          label="Status Kepegawaian"
                          value="Guru Tetap"
                          active
                        />

                        <StatusRow
                          label="Verifikasi"
                          value="Terverifikasi"
                          active
                        />

                        <StatusRow
                          label="Akses Sistem"
                          value="Guru"
                          active
                        />
                      </div>
                    </div>

                    {/* STATISTIK */}
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                      <div className="p-5">
                        <div className="mb-4">
                          <h3 className="text-sm font-bold text-slate-800">
                            Ringkasan Aktivitas
                          </h3>

                          <p className="mt-1 text-xs text-slate-400">
                            Data aktivitas tahun ajaran berjalan.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <MiniStat
                            icon={BookOpen}
                            value="4"
                            label="Mata Pelajaran"
                          />

                          <MiniStat
                            icon={Users}
                            value="8"
                            label="Kelas"
                          />

                          <MiniStat
                            icon={Clock3}
                            value="24"
                            label="Jam / Minggu"
                          />

                          <MiniStat
                            icon={Award}
                            value="98%"
                            label="Kehadiran"
                          />
                        </div>
                      </div>
                    </div>

                    {/* QUICK ACTION */}
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                      <div className="p-5">
                        <h3 className="text-sm font-bold text-slate-800">
                          Akses Cepat
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                          Menu yang berkaitan dengan profil Anda.
                        </p>

                        <div className="mt-4 space-y-2">
                          <QuickAction
                            icon={CalendarDays}
                            title="Jadwal Mengajar"
                            description="Lihat jadwal mengajar"
                          />

                          <QuickAction
                            icon={BookOpen}
                            title="Materi Pembelajaran"
                            description="Kelola materi"
                          />

                          <QuickAction
                            icon={Users}
                            title="Kelas Saya"
                            description="Lihat kelas yang diajar"
                          />
                        </div>
                      </div>
                    </div>
                  </aside>
                </div>
              )}

              {/* KEPEGAWAIAN */}
              {activeTab === "kepegawaian" && (
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                  <ProfileSection
                    icon={BriefcaseBusiness}
                    title="Data Kepegawaian"
                    description="Informasi status dan identitas kepegawaian."
                    iconClass="bg-blue-50 text-blue-600"
                  >
                    <div className="space-y-5">
                      <DetailItem
                        icon={IdCard}
                        label="NIP"
                        value={profile.nip}
                      />

                      <DetailItem
                        icon={IdCard}
                        label="NUPTK"
                        value={profile.nuptk}
                      />

                      <DetailItem
                        icon={BriefcaseBusiness}
                        label="Status Kepegawaian"
                        value={profile.status}
                      />

                      <DetailItem
                        icon={UserRoundCheck}
                        label="Jabatan"
                        value={profile.jabatan}
                      />

                      <DetailItem
                        icon={Building2}
                        label="Unit Kerja"
                        value={profile.sekolah}
                      />
                    </div>
                  </ProfileSection>

                  <ProfileSection
                    icon={GraduationCap}
                    title="Pendidikan & Kompetensi"
                    description="Informasi pendidikan terakhir dan bidang kompetensi."
                    iconClass="bg-violet-50 text-violet-600"
                  >
                    <div className="space-y-4">
                      <InfoBox
                        icon={GraduationCap}
                        label="Pendidikan Terakhir"
                        value={profile.pendidikan}
                      />

                      <InfoBox
                        icon={BookOpen}
                        label="Bidang Kompetensi"
                        value={profile.bidangStudi}
                      />

                      <InfoBox
                        icon={Award}
                        label="Sertifikasi"
                        value="Tersertifikasi"
                      />

                      <InfoBox
                        icon={CalendarDays}
                        label="Tahun Bergabung"
                        value="2010"
                      />
                    </div>
                  </ProfileSection>
                </div>
              )}

              {/* AKUN */}
              {activeTab === "akun" && (
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                  <ProfileSection
                    icon={ShieldCheck}
                    title="Akun & Keamanan"
                    description="Kelola informasi akun dan keamanan akses."
                    iconClass="bg-slate-100 text-slate-700"
                  >
                    <div className="space-y-5">
                      <DetailItem
                        icon={User}
                        label="Username"
                        value={profile.username}
                      />

                      <DetailItem
                        icon={Mail}
                        label="Email Akun"
                        value={profile.email}
                      />

                      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
                            <Lock size={18} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-700">
                              Kata Sandi
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              Terakhir diperbarui beberapa waktu lalu
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                        >
                          <KeyRound size={14} />
                          Ubah Kata Sandi
                        </button>
                      </div>
                    </div>
                  </ProfileSection>

                  <div className="space-y-6">
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                        <ShieldCheck size={19} />
                      </div>

                      <h3 className="mt-4 text-sm font-bold text-slate-800">
                        Akun Terlindungi
                      </h3>

                      <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                        Akun Anda aktif dan telah terverifikasi. Pastikan
                        informasi login tetap aman dan tidak dibagikan kepada
                        orang lain.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <InfoIcon />
                      </div>

                      <h3 className="mt-4 text-sm font-bold text-slate-800">
                        Informasi
                      </h3>

                      <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                        Jika terdapat kesalahan pada data kepegawaian,
                        hubungi administrator sekolah untuk melakukan
                        pembaruan data.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* FOOTER */}
              <footer className="border-t border-slate-200 pt-5 text-center">
                <p className="text-[11px] text-slate-400">
                  © 2026 SmartSchool • Profil Guru
                </p>
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ============================================================
   TAB BUTTON
============================================================ */

function TabButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 px-5 py-3.5 text-xs font-semibold transition sm:px-6 ${
        active
          ? "text-blue-600"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
      }`}
    >
      <Icon size={16} />

      <span>{label}</span>

      {active && (
        <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-blue-600 sm:left-5 sm:right-5" />
      )}
    </button>
  );
}

/* ============================================================
   PROFILE SECTION
============================================================ */

function ProfileSection({
  icon: Icon,
  title,
  description,
  iconClass,
  children,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${iconClass}`}
          >
            <Icon size={19} />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-bold text-slate-800 sm:text-base">
              {title}
            </h2>

            <p className="mt-1 text-xs leading-relaxed text-slate-400 sm:text-sm">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

/* ============================================================
   DETAIL ITEM
============================================================ */

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="min-w-0">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
          <Icon size={15} />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className="mt-1 break-words text-sm font-semibold leading-relaxed text-slate-700">
            {value || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   INFO BOX
============================================================ */

function InfoBox({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-semibold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   STATUS ROW
============================================================ */

function StatusRow({ label, value, active = false }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition hover:bg-slate-50">
      <span className="text-xs text-slate-500">{label}</span>

      <div className="flex items-center gap-1.5">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            active ? "bg-emerald-500" : "bg-slate-300"
          }`}
        />

        <span
          className={`text-xs font-semibold ${
            active ? "text-emerald-600" : "text-slate-500"
          }`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   MINI STAT
============================================================ */

function MiniStat({ icon: Icon, value, label }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
          <Icon size={15} />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-800">{value}</p>

          <p className="truncate text-[10px] text-slate-400">{label}</p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   QUICK ACTION
============================================================ */

function QuickAction({ icon: Icon, title, description }) {
  return (
    <button
      type="button"
      className="group flex w-full items-center gap-3 rounded-xl border border-transparent p-3 text-left transition hover:border-slate-200 hover:bg-slate-50"
    >
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
        <Icon size={16} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-slate-700">
          {title}
        </p>

        <p className="mt-0.5 truncate text-[11px] text-slate-400">
          {description}
        </p>
      </div>

      <ChevronRight
        size={15}
        className="flex-shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500"
      />
    </button>
  );
}

/* ============================================================
   INFO ICON
============================================================ */

function InfoIcon() {
  return (
    <span className="text-sm font-bold">i</span>
  );
}