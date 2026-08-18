"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  GraduationCap,
  Plus,            // ✅ tambahkan Plus
  Save,
  X,
  School,
  UserCheck,
  Hash,
  Users,
  MapPin,
  CalendarDays,
  CheckCircle,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";

const STORAGE_KEY = "kelas_data";

const loadKelas = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveKelas = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export default function AdminKelasTambahPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    jenjang: "X",
    wali_kelas: "",
    nip_wali: "",
    jumlah_siswa: "",
    ruangan: "",
    tahun_ajaran: "2026/2027",
    status: "aktif",
  });

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.nama.trim() || !form.wali_kelas.trim()) {
      alert("Nama kelas dan wali kelas wajib diisi!");
      return;
    }
    if (form.jumlah_siswa && isNaN(Number(form.jumlah_siswa))) {
      alert("Jumlah siswa harus berupa angka!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const currentData = loadKelas();
      const newItem = {
        id: Date.now(),
        ...form,
        jumlah_siswa: Number(form.jumlah_siswa) || 0,
      };
      const updated = [...currentData, newItem];
      saveKelas(updated);
      setLoading(false);
      alert("Kelas berhasil ditambahkan!");
      router.push("/admin/kelas");
    }, 500);
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar active="kelas" setActive={() => {}} collapsed={isCollapsed} setCollapsed={setIsCollapsed} />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          notifications={[]}
          user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-3xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => router.push("/admin/kelas")}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div className="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-md">
                    <Plus size={20} />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-slate-800">Tambah Kelas</h1>
                    <p className="text-sm text-slate-500">Isi data kelas dan wali kelas baru</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                {/* Nama Kelas */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">
                    Nama Kelas <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <GraduationCap size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      placeholder="Contoh: X RPL 1"
                      className="w-full pl-10 pr-3 py-2.5 text-sm text-black bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition"
                    />
                  </div>
                </div>

                {/* Jenjang */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">
                    Jenjang <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <School size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      name="jenjang"
                      value={form.jenjang}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition cursor-pointer text-slate-600 appearance-none"
                    >
                      <option value="X">X (Sepuluh)</option>
                      <option value="XI">XI (Sebelas)</option>
                      <option value="XII">XII (Dua Belas)</option>
                    </select>
                    <ChevronDown size={17} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Wali Kelas */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">
                    Wali Kelas <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <UserCheck size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="wali_kelas"
                      value={form.wali_kelas}
                      onChange={handleChange}
                      placeholder="Nama wali kelas"
                      className="w-full pl-10 pr-3 py-2.5  text-black text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition"
                    />
                  </div>
                </div>

                {/* NIP Wali */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">NIP Wali Kelas</label>
                  <div className="relative">
                    <Hash size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="nip_wali"
                      value={form.nip_wali}
                      onChange={handleChange}
                      placeholder="NIP wali kelas"
                      className="w-full pl-10 pr-3 py-2.5 text-sm text-black bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition"
                    />
                  </div>
                </div>

                {/* Jumlah Siswa & Ruangan */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">Jumlah Siswa</label>
                    <div className="relative">
                      <Users size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="number"
                        name="jumlah_siswa"
                        value={form.jumlah_siswa}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full pl-10 pr-3 py-2.5 text-sm text-black bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">Ruangan</label>
                    <div className="relative">
                      <MapPin size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="ruangan"
                        value={form.ruangan}
                        onChange={handleChange}
                        placeholder="Contoh: R. 101"
                        className="w-full pl-10 pr-3 py-2.5 text-sm text-black bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Tahun Ajaran & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">Tahun Ajaran</label>
                    <div className="relative">
                      <CalendarDays size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        name="tahun_ajaran"
                        value={form.tahun_ajaran}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition cursor-pointer text-slate-600 appearance-none"
                      >
                        <option value="2024/2025">2024/2025</option>
                        <option value="2025/2026">2025/2026</option>
                        <option value="2026/2027">2026/2027</option>
                      </select>
                      <ChevronDown size={17} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">Status</label>
                    <div className="relative">
                      <CheckCircle size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition cursor-pointer text-slate-600 appearance-none"
                      >
                        <option value="aktif">Aktif</option>
                        <option value="nonaktif">Nonaktif</option>
                      </select>
                      <ChevronDown size={17} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Tombol Aksi */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                  <button
                    onClick={() => router.push("/admin/kelas")}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-200 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? (
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <Save size={17} /> Simpan
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}