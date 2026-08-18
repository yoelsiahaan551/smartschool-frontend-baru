"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import {
  Users,
  Plus,
  Save,
  ArrowLeft,
  User,
  Hash,
  BookOpen,
  Mail,
  Phone,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

const STORAGE_KEY = "guru_data";

const loadGuru = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveGuru = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export default function AdminGuruTambahPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    nip: "",
    mapel: "",
    email: "",
    phone: "",
    status: "Aktif",
  });

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.nama.trim() || !form.nip.trim() || !form.mapel.trim()) {
      alert("Nama, NIP, dan Mata Pelajaran wajib diisi!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const currentData = loadGuru();
      const newItem = {
        id: Date.now(),
        ...form,
      };
      const updated = [...currentData, newItem];
      saveGuru(updated);
      setLoading(false);
      alert("Guru berhasil ditambahkan!");
      router.push("/admin/guru");
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50">
      {/* Layout utama dengan flex row agar sidebar dan konten bersebelahan */}
      <div className="flex flex-1 w-full overflow-hidden">
        <Sidebar
          active="guru"
          setActive={() => {}}
          collapsed={isCollapsed}
          setCollapsed={setIsCollapsed}
        />

        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <Header
            toggleSidebar={toggleSidebar}
            notifications={[]}
            user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }}
          />

          <main className="flex-1 w-full p-4 md:p-6 lg:p-8">
            <div className="w-full max-w-3xl mx-auto">
              {/* Card form */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 md:p-8 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => router.push("/admin/guru")}
                      className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                      title="Kembali"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md">
                      <Plus size={20} />
                    </div>
                    <div>
                      <h1 className="text-xl font-semibold text-slate-800">Tambah Guru</h1>
                      <p className="text-sm text-slate-500">Isi data guru baru</p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  {/* Nama */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">
                      Nama Lengkap <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="nama"
                        value={form.nama}
                        onChange={handleChange}
                        placeholder="Contoh: Dr. Ahmad Fauzi, M.Pd."
                        className="w-full pl-10 pr-3 py-2.5 text-sm text-black bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition"
                      />
                    </div>
                  </div>

                  {/* NIP */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">
                      NIP <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Hash size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="nip"
                        value={form.nip}
                        onChange={handleChange}
                        placeholder="NIP guru"
                        className="w-full pl-10 pr-3 py-2.5 text-sm text-black bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition"
                      />
                    </div>
                  </div>

                  {/* Mapel */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">
                      Mata Pelajaran <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <BookOpen size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="mapel"
                        value={form.mapel}
                        onChange={handleChange}
                        placeholder="Contoh: Matematika"
                        className="w-full pl-10 pr-3 py-2.5 text-sm text-black bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Email</label>
                      <div className="relative">
                        <Mail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="email@guru.com"
                          className="w-full pl-10 pr-3 text-black py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Telepon</label>
                      <div className="relative">
                        <Phone size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="081234567890"
                          className="w-full pl-10 pr-3 py-2.5 text-sm text-black bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">Status</label>
                    <div className="relative">
                      <CheckCircle size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition cursor-pointer text-slate-600 appearance-none"
                      >
                        <option value="Aktif">Aktif</option>
                        <option value="Nonaktif">Nonaktif</option>
                      </select>
                      <ChevronDown size={17} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Tombol Aksi */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                    <button
                      onClick={() => router.push("/admin/guru")}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-lg hover:shadow-emerald-200 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-60"
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
    </div>
  );
}