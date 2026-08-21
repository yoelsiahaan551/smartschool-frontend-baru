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
} from "lucide-react";

/**
 * Halaman Pengaturan Siswa (/siswa/pengaturan)
 *
 * Berisi 3 bagian:
 * 1. Data Pribadi - READ-ONLY. Nama, NISN, kelas, email dikelola oleh
 *    admin/sekolah, bukan siswa. Kalau ada yang salah, siswa diarahkan
 *    hubungi wali kelas/TU, bukan edit sendiri.
 * 2. Keamanan - ubah kata sandi (ini wajar dikontrol siswa sendiri)
 * 3. Notifikasi - toggle jenis notifikasi yang diterima
 *
 * Data di DataPribadiSection masih dummy, ganti dengan data asli
 * dari API/session siswa yang login.
 */

const dataPribadi = {
  nama: "Andi Saputra",
  nisn: "0091234567",
  kelas: "9A",
  email: "siswa@smartschool.com",
};

export default function PengaturanSiswaPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const notifications = [
    { id: 1, title: "Tugas Matematika deadline besok", desc: "Dikirim 1 jam lalu", read: false },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        role="siswa"
        active="profil"
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          user={{ name: "Andi Saputra", email: "siswa@smartschool.com", avatar: "AS" }}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-3xl mx-auto space-y-6">

            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/siswa/profil")}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors flex-shrink-0"
              >
                <ArrowLeft size={16} />
              </button>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Profil Saya</p>
                <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 mt-1 tracking-tight">
                  Pengaturan
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Kelola keamanan dan notifikasi akun kamu.
                </p>
              </div>
            </div>

            <DataPribadiSection />
            <KeamananSection />
            <NotifikasiSection />

          </div>
        </main>
      </div>
    </div>
  );
}

function SettingsCard({ icon: Icon, title, desc, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
        <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
          <Icon size={17} />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
          {desc ? <p className="text-xs text-slate-500 mt-0.5">{desc}</p> : null}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function SaveButton({ saved, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-xl px-4 py-2.5"
    >
      {saved ? <Check size={15} /> : null}
      {saved ? "Tersimpan" : "Simpan Perubahan"}
    </button>
  );
}

// ==== DATA PRIBADI: read-only, dikelola admin/sekolah ====
function DataPribadiSection() {
  const fields = [
    { label: "Nama Lengkap", value: dataPribadi.nama, icon: User },
    { label: "NISN", value: dataPribadi.nisn, icon: IdCard },
    { label: "Kelas", value: dataPribadi.kelas, icon: School },
    { label: "Email", value: dataPribadi.email, icon: Mail },
  ];

  return (
    <SettingsCard icon={User} title="Data Pribadi" desc="Data ini dikelola oleh sekolah dan tidak bisa diubah sendiri">
      <div className="space-y-3">
        {fields.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3 bg-slate-50 rounded-xl px-3.5 py-3">
            <div className="w-8 h-8 rounded-lg bg-white text-slate-500 flex items-center justify-center flex-shrink-0 border border-slate-200">
              <Icon size={15} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-500">{label}</p>
              <p className="text-sm font-medium text-slate-800 truncate">{value}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-4">
        Ada data yang salah atau perlu diperbarui? Hubungi wali kelas atau tata usaha sekolah.
      </p>
    </SettingsCard>
  );
}

// ==== KEAMANAN: ubah kata sandi ====
function KeamananSection() {
  const [sandiLama, setSandiLama] = useState("");
  const [sandiBaru, setSandiBaru] = useState("");
  const [konfirmasiSandi, setKonfirmasiSandi] = useState("");
  const [showSandi, setShowSandi] = useState(false);
  const [saved, setSaved] = useState(false);

  const cocok = sandiBaru.length > 0 && sandiBaru === konfirmasiSandi;

  const handleSave = () => {
    if (!cocok) return;
    // TODO: kirim sandiLama & sandiBaru ke API ubah kata sandi.
    setSaved(true);
    setSandiLama("");
    setSandiBaru("");
    setKonfirmasiSandi("");
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SettingsCard icon={Lock} title="Keamanan" desc="Ubah kata sandi akun kamu secara berkala">
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-600">Kata Sandi Saat Ini</label>
          <div className="relative mt-1.5">
            <input
              value={sandiLama}
              onChange={(e) => setSandiLama(e.target.value)}
              type={showSandi ? "text" : "password"}
              className="w-full text-sm text-slate-800 border border-slate-200 rounded-xl px-3.5 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
            />
            <button
              onClick={() => setShowSandi(!showSandi)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              type="button"
            >
              {showSandi ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600">Kata Sandi Baru</label>
          <input
            value={sandiBaru}
            onChange={(e) => setSandiBaru(e.target.value)}
            type={showSandi ? "text" : "password"}
            className="mt-1.5 w-full text-sm text-slate-800 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600">Konfirmasi Kata Sandi Baru</label>
          <input
            value={konfirmasiSandi}
            onChange={(e) => setKonfirmasiSandi(e.target.value)}
            type={showSandi ? "text" : "password"}
            className="mt-1.5 w-full text-sm text-slate-800 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
          />
          {konfirmasiSandi.length > 0 && !cocok ? (
            <p className="text-xs text-red-600 mt-1.5">Konfirmasi kata sandi tidak cocok.</p>
          ) : null}
        </div>
        <SaveButton saved={saved} disabled={!cocok} onClick={handleSave} />
      </div>
    </SettingsCard>
  );
}

// ==== NOTIFIKASI ====
function ToggleRow({ label, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        {desc ? <p className="text-xs text-slate-500 mt-0.5">{desc}</p> : null}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={checked ? "w-11 h-6 rounded-full bg-blue-600 flex items-center px-0.5 flex-shrink-0 transition-colors" : "w-11 h-6 rounded-full bg-slate-300 flex items-center px-0.5 flex-shrink-0 transition-colors"}
      >
        <span className={checked ? "w-5 h-5 rounded-full bg-white shadow-sm translate-x-5 transition-transform" : "w-5 h-5 rounded-full bg-white shadow-sm translate-x-0 transition-transform"} />
      </button>
    </div>
  );
}

function NotifikasiSection() {
  const [tugasBaru, setTugasBaru] = useState(true);
  const [materiBaru, setMateriBaru] = useState(true);
  const [pengingatUjian, setPengingatUjian] = useState(true);
  const [pengumuman, setPengumuman] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // TODO: kirim preferensi notifikasi ke API.
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SettingsCard icon={Bell} title="Notifikasi" desc="Atur jenis pemberitahuan yang ingin kamu terima">
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
      <div className="mt-4">
        <SaveButton saved={saved} onClick={handleSave} />
      </div>
    </SettingsCard>
  );
}