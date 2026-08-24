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
} from "lucide-react";

const STORAGE_KEY = "guru_data";

const loadGuru = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Fungsi untuk mengambil 2 huruf inisial
const getInitials = (nama) => {
  const parts = nama.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return nama.substring(0, 2).toUpperCase();
};

// Fungsi warna avatar berdasarkan nama (konsisten)
const getAvatarColor = (nama) => {
  const colors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-cyan-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-teal-500",
  ];
  const index = nama.length % colors.length;
  return colors[index];
};

export default function DetailGuruPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [guru, setGuru] = useState(null);

  useEffect(() => {
    const list = loadGuru();
    const found = list.find((g) => g.id === id);
    if (found) {
      setGuru(found);
    } else {
      alert("Guru tidak ditemukan!");
      router.push("/admin/guru");
    }
  }, [id, router]);

  if (!guru) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar active="guru" setActive={() => {}} collapsed={isCollapsed} setCollapsed={setIsCollapsed} />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header toggleSidebar={() => setIsCollapsed(!isCollapsed)} notifications={[]} user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }} />
        <main className="flex-1 overflow-y-auto">
          <div className="w-full p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-all">
                  <ArrowLeft size={16} /> Kembali
                </button>
                <button onClick={() => router.push(`/admin/guru/edit/${guru.id}`)} className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 border border-amber-200 rounded-xl hover:bg-amber-100 transition">
                  <Edit size={16} /> Edit Profil
                </button>
              </div>

              {/* Profile Card */}
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className={`w-24 h-24 rounded-full ${getAvatarColor(guru.nama)} flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-emerald-200 flex-shrink-0`}>
                    {getInitials(guru.nama)}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-slate-800">{guru.nama}</h1>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <span className="text-sm text-slate-500">{guru.nip}</span>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${guru.status === "Aktif" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-rose-50 text-rose-600 border-rose-200"}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {guru.status}
                      </span>
                      <span className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-200">{guru.mapel}</span>
                    </div>
                  </div>
                </div>

                {/* Detail info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-slate-400 mt-0.5" />
                    <div><p className="text-xs text-slate-400 font-medium">Email</p><p className="text-sm text-slate-700">{guru.email || "-"}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-slate-400 mt-0.5" />
                    <div><p className="text-xs text-slate-400 font-medium">Telepon</p><p className="text-sm text-slate-700">{guru.phone || "-"}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-slate-400 mt-0.5" />
                    <div><p className="text-xs text-slate-400 font-medium">Alamat</p><p className="text-sm text-slate-700">{guru.alamat || "-"}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-slate-400 mt-0.5" />
                    <div><p className="text-xs text-slate-400 font-medium">Tanggal Lahir</p><p className="text-sm text-slate-700">{guru.tglLahir || "-"}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users size={18} className="text-slate-400 mt-0.5" />
                    <div><p className="text-xs text-slate-400 font-medium">Jenis Kelamin</p><p className="text-sm text-slate-700">{guru.gender === "L" ? "Laki-laki" : guru.gender === "P" ? "Perempuan" : "-"}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-slate-400 mt-0.5" />
                    <div><p className="text-xs text-slate-400 font-medium">Bergabung</p><p className="text-sm text-slate-700">{guru.joinDate || "-"}</p></div>
                  </div>
                </div>
              </div>

              {/* Statistik mengajar (dummy) */}
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-6">
                <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-4">
                  <BookOpen size={18} className="text-emerald-500" /> Statistik Mengajar
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-slate-800">3</p><p className="text-xs text-slate-400">Kelas Diampu</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-slate-800">12</p><p className="text-xs text-slate-400">Total Siswa</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-emerald-600">96%</p><p className="text-xs text-slate-400">Rata-rata Kehadiran</p>
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