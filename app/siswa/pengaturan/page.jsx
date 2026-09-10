"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  ArrowLeft,
  User,
  Lock,
  Bell,
  Eye,
  EyeOff,
  Check,
  IdCard,
  Mail,
  School,
  CalendarDays,
  MapPin,
  GraduationCap,
  ShieldCheck,
  BookOpen,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

/**
 * Halaman Pengaturan Siswa
 * /siswa/pengaturan
 *
 * Dummy data sementara.
 * Nanti bisa diganti dengan data dari session/API.
 */

const dataPribadi = {
  nama: "Andi Saputra",
  nisn: "0091234567",
  kelas: "9A",
  email: "siswa@smartschool.com",
  sekolah: "SMP SmartSchool",
  tempatLahir: "Jakarta",
  tanggalLahir: "12 Mei 2012",
  alamat: "Jakarta Selatan",
  tahunAjaran: "2026/2027",
};

const studentStats = {
  rataRata: "86.7",
  kehadiran: "92%",
  tugas: "24",
};

export default function PengaturanSiswaPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const notifications = [
    {
      id: 1,
      title: "Tugas Matematika deadline besok",
      desc: "Dikirim 1 jam lalu",
      read: false,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* SIDEBAR */}
      <Sidebar
        role="siswa"
        active="profil"
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={() => setSidebarOpen((prev) => !prev)}
      />

      {/* MAIN */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          toggleSidebar={() => setSidebarOpen((prev) => !prev)}
          notifications={notifications}
          user={{
            name: dataPribadi.nama,
            email: dataPribadi.email,
            avatar: "AS",
          }}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1380px] p-4 sm:p-6 lg:p-8">
            {/* PAGE HEADER */}
            <div className="mb-6 flex items-center gap-3">
              

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
                  Profil Saya
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
                  Pengaturan
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Kelola keamanan dan preferensi akun kamu.
                </p>
              </div>
            </div>

            {/* TWO COLUMN LAYOUT */}
            <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
              {/* LEFT CONTENT */}
              <div className="min-w-0 space-y-6">
                <DataPribadiSection />

                <KeamananSection />

                <NotifikasiSection />
              </div>

              {/* RIGHT STUDENT CARD */}
              <aside className="xl:sticky xl:top-6">
                <StudentCard />
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   SETTINGS CARD
========================================================= */

function SettingsCard({
  icon: Icon,
  title,
  desc,
  children,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={17} />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-bold text-slate-800">
            {title}
          </h3>

          {desc && (
            <p className="mt-0.5 text-xs leading-5 text-slate-500">
              {desc}
            </p>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

/* =========================================================
   SAVE BUTTON
========================================================= */

function SaveButton({
  saved,
  onClick,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#155DFC] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0D47C9] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {saved && <Check size={15} />}
      {saved ? "Tersimpan" : "Simpan Perubahan"}
    </button>
  );
}

/* =========================================================
   STUDENT CARD
========================================================= */

function StudentCard() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-sm">
      {/* CARD HEADER */}
      <div className="relative overflow-hidden bg-[#155DFC] px-6 pb-20 pt-6">
        {/* Decorative shapes */}
        <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-white/10" />

        <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-white/5" />

        <div className="absolute right-16 top-12 h-8 w-8 rounded-full bg-white/5" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-100">
              Student Card
            </p>

            <p className="mt-1 text-xs text-blue-100/80">
              SmartSchool
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur">
            <GraduationCap size={18} />
          </div>
        </div>
      </div>

      {/* CARD BODY */}
      <div className="relative px-5 pb-5 sm:px-6">
        {/* AVATAR */}
        <div className="-mt-14 flex items-end justify-between">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-blue-100 to-blue-50 text-2xl font-bold text-blue-700 shadow-md">
            AS
          </div>

          <div className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Siswa Aktif
          </div>
        </div>

        {/* NAME */}
        <div className="mt-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            {dataPribadi.nama}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Siswa · Kelas {dataPribadi.kelas}
          </p>
        </div>

        {/* INFO */}
        <div className="mt-5 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-slate-50/70">
          <StudentInfo
            icon={IdCard}
            label="NISN"
            value={dataPribadi.nisn}
          />

          <StudentInfo
            icon={School}
            label="Sekolah"
            value={dataPribadi.sekolah}
          />

          <StudentInfo
            icon={Mail}
            label="Email"
            value={dataPribadi.email}
          />

          <StudentInfo
            icon={CalendarDays}
            label="Tahun Ajaran"
            value={dataPribadi.tahunAjaran}
          />
        </div>

        {/* ACADEMIC SUMMARY */}
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-800">
                Ringkasan Akademik
              </p>

              <p className="mt-0.5 text-xs text-slate-500">
                Performa belajar kamu
              </p>
            </div>

            <TrendingUp
              size={17}
              className="text-blue-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <MiniStat
              value={studentStats.rataRata}
              label="Rata-rata"
            />

            <MiniStat
              value={studentStats.kehadiran}
              label="Kehadiran"
            />

            <MiniStat
              value={studentStats.tugas}
              label="Tugas"
            />
          </div>
        </div>

        {/* SECURITY STATUS */}
        <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
              <ShieldCheck size={17} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800">
                Akun terlindungi
              </p>

              <p className="mt-1 text-[11px] leading-5 text-slate-500">
                Pastikan kata sandi akun kamu tetap aman dan
                tidak dibagikan kepada orang lain.
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2">
            <BookOpen
              size={14}
              className="text-slate-400"
            />

            <span className="text-[11px] text-slate-400">
              SmartSchool Student
            </span>
          </div>

          <span className="text-[11px] font-semibold text-blue-600">
            {dataPribadi.kelas}
          </span>
        </div>
      </div>
    </div>
  );
}

function StudentInfo({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 px-3.5 py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">
        <Icon size={14} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 truncate text-xs font-semibold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

function MiniStat({ value, label }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white px-2 py-3 text-center">
      <p className="text-sm font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-0.5 text-[9px] font-medium text-slate-400 sm:text-[10px]">
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   DATA PRIBADI
========================================================= */

function DataPribadiSection() {
  const fields = [
    {
      label: "Nama Lengkap",
      value: dataPribadi.nama,
      icon: User,
    },
    {
      label: "NISN",
      value: dataPribadi.nisn,
      icon: IdCard,
    },
    {
      label: "Kelas",
      value: dataPribadi.kelas,
      icon: School,
    },
    {
      label: "Email",
      value: dataPribadi.email,
      icon: Mail,
    },
  ];

  return (
    <SettingsCard
      icon={User}
      title="Data Pribadi"
      desc="Data ini dikelola oleh sekolah dan tidak dapat diubah sendiri"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fields.map(
          ({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-3 transition hover:border-blue-100 hover:bg-blue-50/30"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500">
                <Icon size={15} />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-medium text-slate-400">
                  {label}
                </p>

                <p className="mt-0.5 truncate text-sm font-semibold text-slate-800">
                  {value}
                </p>
              </div>
            </div>
          )
        )}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-3">
        <School
          size={14}
          className="mt-0.5 shrink-0 text-slate-400"
        />

        <p className="text-xs leading-5 text-slate-500">
          Ada data yang salah atau perlu diperbarui? Hubungi
          wali kelas atau tata usaha sekolah.
        </p>
      </div>
    </SettingsCard>
  );
}

/* =========================================================
   KEAMANAN
========================================================= */

function KeamananSection() {
  const [sandiLama, setSandiLama] = useState("");
  const [sandiBaru, setSandiBaru] = useState("");
  const [konfirmasiSandi, setKonfirmasiSandi] =
    useState("");
  const [showSandi, setShowSandi] = useState(false);
  const [saved, setSaved] = useState(false);

  const cocok =
    sandiBaru.length > 0 &&
    sandiBaru === konfirmasiSandi;

  const handleSave = () => {
    if (!cocok || !sandiLama) return;

    // TODO:
    // Kirim sandiLama dan sandiBaru ke API.
    setSaved(true);

    setSandiLama("");
    setSandiBaru("");
    setKonfirmasiSandi("");

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <SettingsCard
      icon={Lock}
      title="Keamanan"
      desc="Ubah kata sandi akun kamu secara berkala"
    >
      <div className="space-y-4">
        <PasswordInput
          label="Kata Sandi Saat Ini"
          value={sandiLama}
          onChange={setSandiLama}
          show={showSandi}
          onToggle={() =>
            setShowSandi((prev) => !prev)
          }
        />

        <PasswordInput
          label="Kata Sandi Baru"
          value={sandiBaru}
          onChange={setSandiBaru}
          show={showSandi}
          onToggle={() =>
            setShowSandi((prev) => !prev)
          }
        />

        <div>
          <PasswordInput
            label="Konfirmasi Kata Sandi Baru"
            value={konfirmasiSandi}
            onChange={setKonfirmasiSandi}
            show={showSandi}
            onToggle={() =>
              setShowSandi((prev) => !prev)
            }
          />

          {konfirmasiSandi.length > 0 &&
            !cocok && (
              <p className="mt-1.5 text-xs text-red-600">
                Konfirmasi kata sandi tidak cocok.
              </p>
            )}
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-slate-400">
            Gunakan kata sandi yang sulit ditebak dan jangan
            membagikannya kepada orang lain.
          </p>

          <SaveButton
            saved={saved}
            disabled={!cocok || !sandiLama}
            onClick={handleSave}
          />
        </div>
      </div>
    </SettingsCard>
  );
}

function PasswordInput({
  label,
  value,
  onChange,
  show,
  onToggle,
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-600">
        {label}
      </label>

      <div className="relative mt-1.5">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={show ? "text" : "password"}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 pr-11 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
        />

        <button
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
          type="button"
          aria-label={
            show
              ? "Sembunyikan kata sandi"
              : "Tampilkan kata sandi"
          }
        >
          {show ? (
            <EyeOff size={16} />
          ) : (
            <Eye size={16} />
          )}
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   NOTIFIKASI
========================================================= */

function ToggleRow({
  label,
  desc,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-3.5">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-700">
          {label}
        </p>

        {desc && (
          <p className="mt-0.5 text-xs leading-5 text-slate-500">
            {desc}
          </p>
        )}
      </div>

      <button
        onClick={() => onChange(!checked)}
        type="button"
        role="switch"
        aria-checked={checked}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked
            ? "bg-[#155DFC]"
            : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked
              ? "translate-x-5"
              : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function NotifikasiSection() {
  const [tugasBaru, setTugasBaru] = useState(true);
  const [materiBaru, setMateriBaru] = useState(true);
  const [pengingatUjian, setPengingatUjian] =
    useState(true);
  const [pengumuman, setPengumuman] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // TODO:
    // Kirim preferensi notifikasi ke API.

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <SettingsCard
      icon={Bell}
      title="Notifikasi"
      desc="Atur jenis pemberitahuan yang ingin kamu terima"
    >
      <div className="divide-y divide-slate-100">
        <ToggleRow
          label="Tugas Baru"
          desc="Saat guru mengupload tugas baru"
          checked={tugasBaru}
          onChange={setTugasBaru}
        />

        <ToggleRow
          label="Materi Baru"
          desc="Saat ada bahan belajar baru diupload"
          checked={materiBaru}
          onChange={setMateriBaru}
        />

        <ToggleRow
          label="Pengingat Ujian"
          desc="Pengingat H-1 sebelum jadwal ujian"
          checked={pengingatUjian}
          onChange={setPengingatUjian}
        />

        <ToggleRow
          label="Pengumuman Sekolah"
          desc="Info umum dari pihak sekolah"
          checked={pengumuman}
          onChange={setPengumuman}
        />
      </div>

      <div className="mt-4 flex justify-end border-t border-slate-100 pt-4">
        <SaveButton
          saved={saved}
          onClick={handleSave}
        />
      </div>
    </SettingsCard>
  );
}