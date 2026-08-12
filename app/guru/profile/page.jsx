"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Calendar,
  Camera,
  Lock,
  Bell,
  LogOut,
  Save,
  Award,
  GraduationCap,
} from "lucide-react";

const tabs = [
  { key: "profil", label: "Profil", icon: User },
  { key: "keamanan", label: "Keamanan", icon: Lock },
  { key: "notifikasi", label: "Notifikasi", icon: Bell },
];

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("profil");

  const [form, setForm] = useState({
    name: "Bapak/Ibu Guru",
    email: "guru@smartschool.com",
    phone: "0812-3456-7890",
    address: "Jl. Pendidikan No. 12, Jakarta",
    mapel: "Bahasa Indonesia",
    nip: "198501012010011001",
  });

  const notifications = [
    { id: 1, title: "Pengumuman Libur Semester", desc: "Dikirim 2 jam lalu", read: false },
    { id: 2, title: "Deadline Input Nilai", desc: "Dikirim 5 jam lalu", read: false },
  ];

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        active="profile"
        setActive={() => {}}
        collapsed={!sidebarOpen}
        setCollapsed={(value) => setSidebarOpen(!value)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          notifications={notifications}
          user={{ name: form.name, email: form.email, avatar: form.name.charAt(0) }}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-4xl mx-auto space-y-6">

            {/* PAGE HEADER */}
            <div>
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-slate-700 text-white shadow-sm">
                  <User size={18} />
                </div>
                <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Profil Saya</h1>
              </div>
              <p className="text-sm text-slate-500 ml-[52px]">
                Kelola informasi akun dan preferensi kamu.
              </p>
            </div>

            {/* PROFILE CARD HEADER */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 sm:p-6">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                    {form.name.charAt(0)}
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors">
                    <Camera size={13} />
                  </button>
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-slate-800">{form.name}</h2>
                  <p className="text-sm text-slate-500">Guru {form.mapel}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center gap-1">
                      <Award size={11} />
                      Guru Tetap
                    </span>
                    <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-200">
                      NIP {form.nip}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* TABS */}
            <div className="flex items-center gap-1 bg-white rounded-xl border border-slate-200/80 shadow-sm p-1.5 w-fit">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeTab === t.key
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <t.icon size={14} />
                  {t.label}
                </button>
              ))}
            </div>

            {/* TAB: PROFIL */}
            {activeTab === "profil" && (
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 sm:p-6 space-y-5">
                <h3 className="text-sm font-semibold text-slate-700">Informasi Pribadi</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                      <User size={12} className="text-slate-400" />
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                      <Mail size={12} className="text-slate-400" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                      <Phone size={12} className="text-slate-400" />
                      Nomor Telepon
                    </label>
                    <input
                      type="text"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                      <BookOpen size={12} className="text-slate-400" />
                      Mata Pelajaran
                    </label>
                    <input
                      type="text"
                      value={form.mapel}
                      onChange={(e) => handleChange("mapel", e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                      <MapPin size={12} className="text-slate-400" />
                      Alamat
                    </label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2 border-t border-slate-100">
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                    <Save size={15} />
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            )}

            {/* TAB: KEAMANAN */}
            {activeTab === "keamanan" && (
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 sm:p-6 space-y-5">
                <h3 className="text-sm font-semibold text-slate-700">Ubah Kata Sandi</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">Kata Sandi Saat Ini</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div />
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">Kata Sandi Baru</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">Konfirmasi Kata Sandi Baru</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2 border-t border-slate-100">
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                    <Save size={15} />
                    Perbarui Kata Sandi
                  </button>
                </div>
              </div>
            )}

            {/* TAB: NOTIFIKASI */}
            {activeTab === "notifikasi" && (
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 sm:p-6 space-y-4">
                <h3 className="text-sm font-semibold text-slate-700">Preferensi Notifikasi</h3>
                {[
                  { label: "Pengumuman Sekolah", desc: "Notifikasi untuk pengumuman resmi dari sekolah" },
                  { label: "Pesan Baru", desc: "Notifikasi saat ada pesan chat masuk" },
                  { label: "Pengumpulan Tugas", desc: "Notifikasi saat siswa mengumpulkan tugas" },
                  { label: "Live Class", desc: "Pengingat sebelum sesi live class dimulai" },
                ].map((n, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{n.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{n.desc}</p>
                    </div>
                    <button className="relative w-10 h-5.5 h-6 rounded-full bg-blue-600 transition-colors flex-shrink-0">
                      <span className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* LOGOUT */}
            <div className="bg-white rounded-xl border border-red-100 shadow-sm p-4 sm:p-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">Keluar dari Akun</p>
                <p className="text-xs text-slate-400 mt-0.5">Kamu akan diarahkan ke halaman login.</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 border border-red-200 text-sm font-medium rounded-xl hover:bg-red-100 transition-colors">
                <LogOut size={15} />
                Logout
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}