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
  BookOpen,
  Users,
  Clock,
  Edit,
  GraduationCap,
} from "lucide-react";

const STORAGE_KEY = "siswa_data";

const loadSiswa = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export default function DetailSiswaPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [siswa, setSiswa] = useState(null);

  useEffect(() => {
    const list = loadSiswa();
    const found = list.find((s) => s.id === id);
    if (found) {
      setSiswa(found);
    } else {
      alert("Siswa tidak ditemukan!");
      router.push("/admin/siswa");
    }
  }, [id, router]);

  if (!siswa) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar active="siswa" setActive={() => {}} collapsed={isCollapsed} setCollapsed={setIsCollapsed} />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          toggleSidebar={() => setIsCollapsed(!isCollapsed)}
          notifications={[]}
          user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="w-full p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-all">
                  <ArrowLeft size={16} /> Kembali
                </button>
                <button
                  onClick={() => router.push(`/admin/siswa/edit/${siswa.id}`)}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 border border-amber-200 rounded-xl hover:bg-amber-100 transition"
                >
                  <Edit size={16} /> Edit Profil
                </button>
              </div>

              {/* Profile Card */}
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-200 flex-shrink-0">
                    {siswa.nama.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-slate-800">{siswa.nama}</h1>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <span className="text-sm text-slate-500">{siswa.nis}</span>
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
                          siswa.status === "Aktif"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                            : "bg-rose-50 text-rose-600 border-rose-200"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {siswa.status}
                      </span>
                      <span className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-200">
                        {siswa.kelas}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Detail info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-slate-400 mt-0.5" />
                    <div><p className="text-xs text-slate-400 font-medium">Email</p><p className="text-sm text-slate-700">{siswa.email || "-"}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-slate-400 mt-0.5" />
                    <div><p className="text-xs text-slate-400 font-medium">Telepon</p><p className="text-sm text-slate-700">{siswa.phone || "-"}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-slate-400 mt-0.5" />
                    <div><p className="text-xs text-slate-400 font-medium">Alamat</p><p className="text-sm text-slate-700">{siswa.alamat || "-"}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-slate-400 mt-0.5" />
                    <div><p className="text-xs text-slate-400 font-medium">Tanggal Lahir</p><p className="text-sm text-slate-700">{siswa.tglLahir || "-"}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users size={18} className="text-slate-400 mt-0.5" />
                    <div><p className="text-xs text-slate-400 font-medium">Jenis Kelamin</p><p className="text-sm text-slate-700">{siswa.gender === "L" ? "Laki-laki" : "Perempuan"}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-slate-400 mt-0.5" />
                    <div><p className="text-xs text-slate-400 font-medium">Bergabung</p><p className="text-sm text-slate-700">{siswa.joinDate || "-"}</p></div>
                  </div>
                </div>
              </div>

              {/* Statistik akademik (dummy) */}
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-6">
                <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-4">
                  <GraduationCap size={18} className="text-blue-500" /> Statistik Akademik
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-slate-800">85</p>
                    <p className="text-xs text-slate-400">Rata-rata Nilai</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-slate-800">3</p>
                    <p className="text-xs text-slate-400">Mata Pelajaran Unggulan</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-emerald-600">98%</p>
                    <p className="text-xs text-slate-400">Tingkat Kehadiran</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}