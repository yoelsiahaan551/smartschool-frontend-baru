"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  Settings,
  Sparkles,
  User,
  Lock,
  Bell,
  Palette,
  Save,
  Eye,
  EyeOff,
  Camera,
  Mail,
  Phone,
  Check,
} from "lucide-react";

// ===== DUMMY DATA =====
// Data profil dan preferensi guru. Ganti dengan data asli dari API/DB begitu tersedia.

const dataAwalProfil = {
  nama: "Sari Wulandari",
  email: "guru@smartschool.com",
  telepon: "0812-3456-7890",
  mataPelajaran: "Matematika",
  nip: "198705152010012003",
};

const TABS = [
  { key: "profil", label: "Profil", icon: User },
  { key: "keamanan", label: "Keamanan", icon: Lock },
  { key: "notifikasi", label: "Notifikasi", icon: Bell },
  { key: "tampilan", label: "Tampilan", icon: Palette },
];

export default function GuruPengaturanPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tabAktif, setTabAktif] = useState("profil");
  const [tersimpan, setTersimpan] = useState(false);

  // form profil
  const [profil, setProfil] = useState(dataAwalProfil);

  // form keamanan
  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [lihatPassword, setLihatPassword] = useState(false);

  // preferensi notifikasi
  const [notifikasi, setNotifikasi] = useState({
    emailPengumuman: true,
    emailTugas: true,
    emailSarpras: true,
    pushPengingat: true,
    pushPersetujuan: false,
  });

  // preferensi tampilan
  const [tema, setTema] = useState("terang");
  const [ukuranFont, setUkuranFont] = useState("sedang");

  const notifications = [
    { id: 1, title: "Pengajuan Disetujui", desc: "Dikirim 1 jam lalu", read: false },
    { id: 2, title: "Batas Pengembalian Alat", desc: "Dikirim 4 jam lalu", read: false },
  ];

  const tampilkanTersimpan = () => {
    setTersimpan(true);
    setTimeout(() => setTersimpan(false), 2500);
  };

  const simpanProfil = (e) => {
    e.preventDefault();
    // TODO: kirim ke API/DB
    tampilkanTersimpan();
  };

  const simpanPassword = (e) => {
    e.preventDefault();
    // TODO: kirim ke API/DB, validasi passwordBaru === konfirmasiPassword
    setPasswordLama("");
    setPasswordBaru("");
    setKonfirmasiPassword("");
    tampilkanTersimpan();
  };

  const toggleNotifikasi = (key) => {
    setNotifikasi((prev) => ({ ...prev, [key]: !prev[key] }));
    tampilkanTersimpan();
  };

  const simpanTampilan = () => {
    // TODO: kirim ke API/DB
    tampilkanTersimpan();
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="pengaturan"
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          notifications={notifications}
          user={{ name: "Bu Sari", email: "guru@smartschool.com", avatar: "AS" }}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-3xl mx-auto space-y-6">

            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-600 text-white shadow-sm flex-shrink-0">
                    <Settings size={18} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 truncate">
                    Pengaturan
                  </h1>
                </div>
                <p className="text-sm text-slate-500 mt-1 ml-[42px] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-slate-400 flex-shrink-0" />
                  <span className="truncate">Kelola profil, keamanan, notifikasi, dan tampilan akunmu.</span>
                </p>
              </div>

              {tersimpan && (
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full flex-shrink-0">
                  <Check size={13} />
                  Perubahan disimpan
                </span>
              )}
            </div>

            {/* TABS */}
            <div className="flex gap-1.5 overflow-x-auto bg-white border border-slate-200/80 rounded-xl p-1.5 shadow-sm">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTabAktif(t.key)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    tabAktif === t.key
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <t.icon size={14} />
                  {t.label}
                </button>
              ))}
            </div>

            {/* TAB: PROFIL */}
            {tabAktif === "profil" && (
              <form onSubmit={simpanProfil} className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 sm:p-6 space-y-5">
                {/* AVATAR */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold shadow-sm">
                      AS
                    </div>
                    <button
                      type="button"
                      className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-sm"
                    >
                      <Camera size={12} />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{profil.nama}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{profil.mataPelajaran}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">Nama Lengkap</label>
                    <input
                      type="text"
                      value={profil.nama}
                      onChange={(e) => setProfil({ ...profil, nama: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">NIP</label>
                    <input
                      type="text"
                      value={profil.nip}
                      onChange={(e) => setProfil({ ...profil, nip: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1">
                      <Mail size={12} className="text-slate-400" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={profil.email}
                      onChange={(e) => setProfil({ ...profil, email: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1">
                      <Phone size={12} className="text-slate-400" />
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      value={profil.telepon}
                      onChange={(e) => setProfil({ ...profil, telepon: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">Mata Pelajaran</label>
                    <input
                      type="text"
                      value={profil.mataPelajaran}
                      onChange={(e) => setProfil({ ...profil, mataPelajaran: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2 border-t border-slate-100">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <Save size={14} />
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            )}

            {/* TAB: KEAMANAN */}
            {tabAktif === "keamanan" && (
              <form onSubmit={simpanPassword} className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 sm:p-6 space-y-5">
                <div>
                  <h2 className="text-sm font-semibold text-slate-800">Ubah Kata Sandi</h2>
                  <p className="text-xs text-slate-500 mt-1">Gunakan kata sandi yang kuat dan belum pernah dipakai sebelumnya.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">Kata Sandi Saat Ini</label>
                    <div className="relative">
                      <input
                        type={lihatPassword ? "text" : "password"}
                        required
                        value={passwordLama}
                        onChange={(e) => setPasswordLama(e.target.value)}
                        className="w-full px-3 py-2 pr-10 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                      />
                      <button
                        type="button"
                        onClick={() => setLihatPassword(!lihatPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {lihatPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1.5 block">Kata Sandi Baru</label>
                      <input
                        type={lihatPassword ? "text" : "password"}
                        required
                        value={passwordBaru}
                        onChange={(e) => setPasswordBaru(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1.5 block">Konfirmasi Kata Sandi</label>
                      <input
                        type={lihatPassword ? "text" : "password"}
                        required
                        value={konfirmasiPassword}
                        onChange={(e) => setKonfirmasiPassword(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                      />
                    </div>
                  </div>

                  {konfirmasiPassword && passwordBaru !== konfirmasiPassword && (
                    <p className="text-xs text-red-500">Konfirmasi kata sandi tidak cocok.</p>
                  )}
                </div>

                <div className="flex justify-end pt-2 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={!passwordBaru || passwordBaru !== konfirmasiPassword}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
                  >
                    <Save size={14} />
                    Perbarui Kata Sandi
                  </button>
                </div>
              </form>
            )}

            {/* TAB: NOTIFIKASI */}
            {tabAktif === "notifikasi" && (
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-slate-100">
                  <h2 className="text-sm font-semibold text-slate-800">Notifikasi Email</h2>
                  <p className="text-xs text-slate-500 mt-1">Pilih jenis email yang ingin kamu terima.</p>
                </div>
                <div className="divide-y divide-slate-100">
                  <ToggleRow
                    label="Pengumuman sekolah"
                    desc="Info penting dari admin dan kepala sekolah"
                    checked={notifikasi.emailPengumuman}
                    onChange={() => toggleNotifikasi("emailPengumuman")}
                  />
                  <ToggleRow
                    label="Pengumpulan tugas siswa"
                    desc="Saat siswa mengumpulkan atau terlambat mengumpulkan tugas"
                    checked={notifikasi.emailTugas}
                    onChange={() => toggleNotifikasi("emailTugas")}
                  />
                  <ToggleRow
                    label="Status peminjaman sarpras"
                    desc="Saat pengajuan peminjaman disetujui atau ditolak"
                    checked={notifikasi.emailSarpras}
                    onChange={() => toggleNotifikasi("emailSarpras")}
                  />
                </div>

                <div className="p-5 sm:p-6 border-b border-t border-slate-100">
                  <h2 className="text-sm font-semibold text-slate-800">Notifikasi Push</h2>
                  <p className="text-xs text-slate-500 mt-1">Notifikasi langsung di perangkat kamu.</p>
                </div>
                <div className="divide-y divide-slate-100">
                  <ToggleRow
                    label="Pengingat jadwal mengajar"
                    desc="Pengingat 15 menit sebelum jadwal mengajar dimulai"
                    checked={notifikasi.pushPengingat}
                    onChange={() => toggleNotifikasi("pushPengingat")}
                  />
                  <ToggleRow
                    label="Persetujuan mendesak"
                    desc="Notifikasi saat ada pengajuan yang butuh respons cepat"
                    checked={notifikasi.pushPersetujuan}
                    onChange={() => toggleNotifikasi("pushPersetujuan")}
                  />
                </div>
              </div>
            )}

            {/* TAB: TAMPILAN */}
            {tabAktif === "tampilan" && (
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 sm:p-6 space-y-6">
                <div>
                  <h2 className="text-sm font-semibold text-slate-800 mb-3">Tema</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {["terang", "gelap"].map((opsi) => (
                      <button
                        key={opsi}
                        onClick={() => setTema(opsi)}
                        className={`px-4 py-3 text-xs font-medium rounded-lg border capitalize transition-colors ${
                          tema === opsi
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                        }`}
                      >
                        {opsi}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-slate-800 mb-3">Ukuran Font</h2>
                  <div className="grid grid-cols-3 gap-3">
                    {["kecil", "sedang", "besar"].map((opsi) => (
                      <button
                        key={opsi}
                        onClick={() => setUkuranFont(opsi)}
                        className={`px-4 py-3 text-xs font-medium rounded-lg border capitalize transition-colors ${
                          ukuranFont === opsi
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                        }`}
                      >
                        {opsi}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-2 border-t border-slate-100">
                  <button
                    onClick={simpanTampilan}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <Save size={14} />
                    Simpan Preferensi
                  </button>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

function ToggleRow({ label, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 p-5 sm:px-6">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative w-10 h-6 rounded-full flex-shrink-0 transition-colors ${
          checked ? "bg-blue-600" : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-4.5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}