"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {
  Settings,
  Save,
  Globe,
  Shield,
  Bell,
  Users,
  School,
  Calendar,
  FileText,
  CheckCircle,
  ChevronRight,
  Building2,
  Mail,
  Phone,
  MapPin,
  UserCheck,
  Smartphone,
  Lock,
  Info,
} from "lucide-react";

export default function AdminPengaturanPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    namaSekolah: "",
    npsn: "",
    alamat: "",
    telepon: "",
    email: "",
    tahunAjaran: "",
    semester: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    registrasiGuru: true,
    registrasiSiswa: true,
    verifikasiAkun: true,
    notifikasiEmail: true,
    notifikasiSMS: false,
    notifikasiPush: true,
  });

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = (name) => {
    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="flex h-screen w-full min-w-0 overflow-hidden bg-slate-100">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <Sidebar
        active="pengaturan"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
        role="admin"
      />

      {/* =====================================================
          MAIN AREA
      ====================================================== */}
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
        ==================================================== */}
        <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full min-w-0 p-3 sm:p-4 md:p-6 lg:p-7 xl:p-8">
            <div className="w-full space-y-6">
              {/* =================================================
                  PAGE HEADER
              ================================================== */}
              <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Background decoration */}
                <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-100/60 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-slate-200/50 blur-3xl" />

                <div className="relative flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:p-7">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-slate-800 text-white shadow-lg shadow-slate-300">
                      <Settings size={23} />
                    </div>

                    <div className="min-w-0">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-700">
                          System
                        </span>
                        <span className="hidden text-xs text-slate-400 sm:inline">
                          /
                        </span>
                        <span className="hidden text-xs text-slate-400 sm:inline">
                          Admin Sekolah
                        </span>
                      </div>

                      <h1 className="truncate text-xl font-bold text-slate-800 sm:text-2xl">
                        Pengaturan Sistem
                      </h1>

                      <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
                        Kelola konfigurasi sekolah, pengguna, akses, dan
                        notifikasi dalam satu tempat.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleSave}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-md transition-all sm:w-auto ${
                      saved
                        ? "bg-emerald-600 shadow-emerald-200"
                        : "bg-blue-600 shadow-blue-200 hover:bg-blue-700 hover:shadow-lg"
                    }`}
                  >
                    {saved ? (
                      <>
                        <CheckCircle size={17} />
                        Pengaturan Tersimpan
                      </>
                    ) : (
                      <>
                        <Save size={17} />
                        Simpan Pengaturan
                      </>
                    )}
                  </button>
                </div>
              </section>

              {/* =================================================
                  QUICK INFO
              ================================================== */}
              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <InfoCard
                  icon={Building2}
                  label="Profil Sekolah"
                  value="Belum dikonfigurasi"
                  iconClass="bg-blue-50 text-blue-600"
                />

                <InfoCard
                  icon={Calendar}
                  label="Tahun Ajaran"
                  value="Belum dikonfigurasi"
                  iconClass="bg-indigo-50 text-indigo-600"
                />

                <InfoCard
                  icon={Users}
                  label="Pengguna"
                  value="Manajemen akses"
                  iconClass="bg-slate-100 text-slate-700"
                />

                <InfoCard
                  icon={Bell}
                  label="Notifikasi"
                  value="3 layanan tersedia"
                  iconClass="bg-violet-50 text-violet-600"
                />
              </section>

              {/* =================================================
                  MAIN SETTINGS
              ================================================== */}
              <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
                {/* =============================================
                    LEFT CONTENT
                ============================================== */}
                <div className="min-w-0 space-y-6">
                  {/* =============================================
                      INFORMASI SEKOLAH
                  ============================================== */}
                  <SettingsSection
                    icon={Globe}
                    title="Informasi Sekolah"
                    description="Kelola informasi dasar yang digunakan pada sistem SmartSchool."
                    iconClass="bg-blue-50 text-blue-600"
                  >
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <InputField
                        label="Nama Sekolah"
                        name="namaSekolah"
                        value={settings.namaSekolah}
                        onChange={handleChange}
                        placeholder="Contoh: SMK Taruna Bhakti"
                        icon={Building2}
                      />

                      <InputField
                        label="NPSN"
                        name="npsn"
                        value={settings.npsn}
                        onChange={handleChange}
                        placeholder="Contoh: 20229123"
                        icon={FileText}
                      />

                      <div className="md:col-span-2">
                        <InputField
                          label="Alamat Sekolah"
                          name="alamat"
                          value={settings.alamat}
                          onChange={handleChange}
                          placeholder="Masukkan alamat lengkap sekolah"
                          icon={MapPin}
                        />
                      </div>

                      <InputField
                        label="Nomor Telepon"
                        name="telepon"
                        value={settings.telepon}
                        onChange={handleChange}
                        placeholder="021-xxxxxxx"
                        icon={Phone}
                      />

                      <InputField
                        label="Email Sekolah"
                        name="email"
                        value={settings.email}
                        onChange={handleChange}
                        placeholder="admin@sekolah.sch.id"
                        icon={Mail}
                        type="email"
                      />
                    </div>
                  </SettingsSection>

                  {/* =============================================
                      TAHUN AJARAN
                  ============================================== */}
                  <SettingsSection
                    icon={School}
                    title="Tahun Ajaran"
                    description="Atur periode akademik yang digunakan oleh sekolah."
                    iconClass="bg-indigo-50 text-indigo-600"
                  >
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <SelectField
                        label="Tahun Ajaran"
                        name="tahunAjaran"
                        value={settings.tahunAjaran}
                        onChange={handleChange}
                        icon={Calendar}
                        options={[
                          "2026/2027",
                          "2025/2026",
                          "2024/2025",
                        ]}
                      />

                      <SelectField
                        label="Semester Aktif"
                        name="semester"
                        value={settings.semester}
                        onChange={handleChange}
                        icon={Calendar}
                        options={["Ganjil", "Genap"]}
                      />

                      <InputField
                        label="Tanggal Mulai"
                        name="tanggalMulai"
                        value={settings.tanggalMulai}
                        onChange={handleChange}
                        type="date"
                        icon={Calendar}
                      />

                      <InputField
                        label="Tanggal Selesai"
                        name="tanggalSelesai"
                        value={settings.tanggalSelesai}
                        onChange={handleChange}
                        type="date"
                        icon={Calendar}
                      />
                    </div>

                    <div className="mt-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                      <Info
                        size={17}
                        className="mt-0.5 flex-shrink-0 text-blue-600"
                      />

                      <div>
                        <p className="text-xs font-semibold text-blue-800">
                          Informasi tahun ajaran
                        </p>

                        <p className="mt-1 text-xs leading-relaxed text-blue-700">
                          Tahun ajaran aktif akan digunakan sebagai referensi
                          utama untuk jadwal, kelas, absensi, nilai, dan
                          aktivitas akademik lainnya.
                        </p>
                      </div>
                    </div>
                  </SettingsSection>

                  {/* =============================================
                      PENGGUNA & AKSES
                  ============================================== */}
                  <SettingsSection
                    icon={Shield}
                    title="Pengguna & Akses"
                    description="Atur bagaimana pengguna dapat mendaftar dan mengakses sistem."
                    iconClass="bg-slate-100 text-slate-700"
                  >
                    <div className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200">
                      <ToggleRow
                        icon={UserCheck}
                        title="Registrasi Guru"
                        description="Izinkan guru membuat akun melalui halaman registrasi."
                        checked={settings.registrasiGuru}
                        onChange={() => handleToggle("registrasiGuru")}
                      />

                      <ToggleRow
                        icon={Users}
                        title="Registrasi Siswa"
                        description="Izinkan siswa melakukan pendaftaran akun."
                        checked={settings.registrasiSiswa}
                        onChange={() => handleToggle("registrasiSiswa")}
                      />

                      <ToggleRow
                        icon={Lock}
                        title="Verifikasi Akun"
                        description="Akun baru harus diverifikasi sebelum dapat digunakan."
                        checked={settings.verifikasiAkun}
                        onChange={() => handleToggle("verifikasiAkun")}
                      />
                    </div>
                  </SettingsSection>

                  {/* =============================================
                      NOTIFIKASI
                  ============================================== */}
                  <SettingsSection
                    icon={Bell}
                    title="Notifikasi"
                    description="Atur kanal notifikasi yang digunakan oleh sistem."
                    iconClass="bg-violet-50 text-violet-600"
                  >
                    <div className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200">
                      <ToggleRow
                        icon={Mail}
                        title="Notifikasi Email"
                        description="Kirim pemberitahuan penting melalui email."
                        checked={settings.notifikasiEmail}
                        onChange={() => handleToggle("notifikasiEmail")}
                      />

                      <ToggleRow
                        icon={Smartphone}
                        title="Notifikasi SMS"
                        description="Gunakan SMS untuk pemberitahuan tertentu."
                        checked={settings.notifikasiSMS}
                        onChange={() => handleToggle("notifikasiSMS")}
                      />

                      <ToggleRow
                        icon={Bell}
                        title="Notifikasi Push"
                        description="Tampilkan pemberitahuan langsung pada aplikasi."
                        checked={settings.notifikasiPush}
                        onChange={() => handleToggle("notifikasiPush")}
                      />
                    </div>
                  </SettingsSection>

                  {/* =============================================
                      BOTTOM SAVE
                  ============================================== */}
                  <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-800 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        Simpan perubahan
                      </h3>

                      <p className="mt-1 text-xs leading-relaxed text-slate-300">
                        Pastikan konfigurasi sudah sesuai sebelum menyimpan.
                      </p>
                    </div>

                    <button
                      onClick={handleSave}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 sm:w-auto"
                    >
                      {saved ? (
                        <>
                          <CheckCircle size={16} />
                          Tersimpan
                        </>
                      ) : (
                        <>
                          <Save size={16} />
                          Simpan Perubahan
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* =============================================
                    RIGHT SIDEBAR
                ============================================== */}
                <aside className="min-w-0 space-y-5">
                  {/* System status */}
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 bg-slate-50/80 p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-slate-800">
                            Status Sistem
                          </h3>

                          <p className="mt-1 text-xs text-slate-400">
                            Ringkasan konfigurasi
                          </p>
                        </div>

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                          <CheckCircle
                            size={18}
                            className="text-emerald-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 p-3">
                      <StatusRow
                        label="Sistem"
                        value="Normal"
                        active
                      />

                      <StatusRow
                        label="Tahun Ajaran"
                        value={
                          settings.tahunAjaran || "Belum diatur"
                        }
                      />

                      <StatusRow
                        label="Semester"
                        value={settings.semester || "Belum diatur"}
                      />

                      <StatusRow
                        label="Verifikasi"
                        value={
                          settings.verifikasiAkun
                            ? "Aktif"
                            : "Nonaktif"
                        }
                        active={settings.verifikasiAkun}
                      />
                    </div>
                  </div>

                  {/* Shortcut */}
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="p-5">
                      <div className="mb-4">
                        <h3 className="text-sm font-bold text-slate-800">
                          Pengaturan Terkait
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                          Akses cepat ke menu administrasi.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <ShortcutItem
                          icon={Calendar}
                          title="Tahun Ajaran"
                          description="Kelola periode akademik"
                          href="/admin/tahun-ajaran"
                        />

                        <ShortcutItem
                          icon={Users}
                          title="Pengguna"
                          description="Kelola akun pengguna"
                          href="/admin/pengguna"
                        />

                        <ShortcutItem
                          icon={School}
                          title="Data Sekolah"
                          description="Informasi sekolah"
                          href="/admin/sekolah"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Help */}
                  <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-slate-50 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                      <Info size={19} />
                    </div>

                    <h3 className="mt-4 text-sm font-bold text-slate-800">
                      Butuh bantuan?
                    </h3>

                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                      Pastikan pengaturan tahun ajaran dan hak akses sudah
                      benar sebelum digunakan oleh pengguna.
                    </p>
                  </div>
                </aside>
              </div>

              {/* =================================================
                  FOOTER
              ================================================== */}
              <footer className="border-t border-slate-200 pt-5 text-center">
                <p className="text-[11px] text-slate-400">
                  © 2026 SmartSchool • Pengaturan Admin Sekolah
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
   COMPONENTS
============================================================ */

function InfoCard({
  icon: Icon,
  label,
  value,
  iconClass,
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={19} />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-semibold text-slate-700">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function SettingsSection({
  icon: Icon,
  title,
  description,
  iconClass,
  children,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Section header */}
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

      {/* Section content */}
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  type = "text",
}) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-xs font-semibold text-slate-600">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
            Icon ? "pl-10 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  icon: Icon,
  options,
}) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-xs font-semibold text-slate-600">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pr-10 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
            Icon ? "pl-10" : "pl-4"
          }`}
        >
          <option value="">Pilih {label}</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <svg
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function ToggleRow({
  icon: Icon,
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-4 p-4 transition-colors hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
          <Icon size={17} />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-700">
            {title}
          </p>

          <p className="mt-1 text-xs leading-relaxed text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onChange}
        aria-pressed={checked}
        className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
          checked ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function StatusRow({
  label,
  value,
  active = false,
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-slate-50">
      <span className="text-xs text-slate-500">{label}</span>

      <div className="flex items-center gap-1.5">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            active ? "bg-emerald-500" : "bg-slate-300"
          }`}
        />

        <span
          className={`text-xs font-medium ${
            active ? "text-emerald-600" : "text-slate-500"
          }`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

function ShortcutItem({
  icon: Icon,
  title,
  description,
  href,
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-transparent p-3 transition-all hover:border-slate-200 hover:bg-slate-50"
    >
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
        <Icon size={17} />
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
        className="flex-shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-500"
      />
    </a>
  );
}