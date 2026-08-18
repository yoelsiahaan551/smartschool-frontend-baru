"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "../../../../components/Header";
import Sidebar from "../../../../components/Sidebar";
import {
  GraduationCap,
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
  Edit,
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

export default function AdminKelasEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
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

  // Load data berdasarkan ID dari URL
  useEffect(() => {
    const data = loadKelas();
    const item = data.find((k) => k.id === id);
    if (!item) {
      setNotFound(true);
      return;
    }
    setForm({
      nama: item.nama,
      jenjang: item.jenjang,
      wali_kelas: item.wali_kelas,
      nip_wali: item.nip_wali || "",
      jumlah_siswa: String(item.jumlah_siswa),
      ruangan: item.ruangan || "",
      tahun_ajaran: item.tahun_ajaran,
      status: item.status,
    });
  }, [id]);

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
      const updated = currentData.map((item) =>
        item.id === id
          ? {
              ...item,
              ...form,
              jumlah_siswa: Number(form.jumlah_siswa) || 0,
            }
          : item
      );
      saveKelas(updated);
      setLoading(false);
      alert("Kelas berhasil diperbarui!");
      router.push("/admin/kelas");
    }, 500);
  };

  // Jika data tidak ditemukan
  if (notFound) {
    return (
      <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
        <Sidebar active="kelas" setActive={() => {}} collapsed={isCollapsed} setCollapsed={setIsCollapsed} />
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header toggleSidebar={toggleSidebar} notifications={[]} user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }} />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="p-4 rounded-full bg-rose-50 mx-auto w-20 h-20 flex items-center justify-center">
                <X size={40} className="text-rose-500" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800 mt-4">Data Tidak Ditemukan</h2>
              <p className="text-sm text-slate-500 mt-1">Kelas yang Anda cari tidak tersedia.</p>
              <button
                onClick={() => router.push("/admin/kelas")}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Kembali ke Daftar Kelas
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
                    title="Kembali"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md">
                    <Edit size={20} />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-slate-800">Edit Kelas</h1>
                    <p className="text-sm text-slate-500">Perbarui data kelas dan wali kelas</p>
                  </div>
                </div>
                <div className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                  ID: {id}
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
                      className="w-full pl-10 pr-3 py-2.5 text-sm text-black bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition"
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
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition cursor-pointer text-slate-600 appearance-none"
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
                      className="w-full pl-10 pr-3 py-2.5 text-sm text-black bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition"
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
                      className="w-full pl-10 pr-3 py-2.5 text-sm text-black bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition"
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
                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition"
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
                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition"
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
                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition cursor-pointer text-slate-600 appearance-none"
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
                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition cursor-pointer text-slate-600 appearance-none"
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
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-lg hover:shadow-amber-200 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:hover:shadow-none"
                  >
                    {loading ? (
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <Save size={17} /> Perbarui
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