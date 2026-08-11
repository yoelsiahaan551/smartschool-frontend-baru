"use client";

import { useParams, useRouter } from "next/navigation";
import {
    Building2,
    School,
    Users,
    UserCheck,
    Mail as MailIcon,
    Phone,
    Globe as GlobeIcon,
    MapPin,
    BarChart3,
    ArrowLeft,
    User,
    Edit,
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
} from "lucide-react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { yayasanData } from "../../../../lib/data";
import { useState } from "react";

export default function DetailYayasanPage() {
    const params = useParams();
    const router = useRouter();
    const id = parseInt(params.id);
    const yayasan = yayasanData.find((item) => item.id === id);

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeMenu] = useState("yayasan");
    const notifications = [
        { id: 1, title: "Pembaruan Sistem v2.0", desc: "Dikirim 2 jam lalu", read: false },
        { id: 2, title: "Pengingat: Backup Data", desc: "Dikirim 1 hari lalu", read: false },
        { id: 3, title: "Yayasan baru mendaftar", desc: "Dikirim 3 hari lalu", read: true },
    ];

    if (!yayasan) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="text-center bg-white rounded-2xl p-8 shadow-sm border border-slate-200/80">
                    <AlertCircle size={48} className="text-slate-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-slate-700">Yayasan tidak ditemukan</h2>
                    <p className="text-slate-500 text-sm mt-1">Data yang Anda cari mungkin telah dihapus.</p>
                    <button
                        onClick={() => router.push("/super-admin/yayasan")}
                        className="mt-4 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
                    >
                        Kembali ke Daftar Yayasan
                    </button>
                </div>
            </div>
        );
    }

    const statusColorMap = {
        Aktif: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500", icon: CheckCircle },
        Trial: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500", icon: Clock },
        Nonaktif: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", dot: "bg-rose-500", icon: XCircle },
    };

    const statusStyle = statusColorMap[yayasan.status] || statusColorMap.Aktif;
    const StatusIcon = statusStyle.icon;

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            <Sidebar
                active={activeMenu}
                setActive={() => {}}
                collapsed={!sidebarOpen}
                setCollapsed={() => setSidebarOpen(!sidebarOpen)}
            />
            <div className="flex-1 flex flex-col min-w-0">
                <Header
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    notifications={notifications}
                    user={{ name: "Sarah", email: "sarah@smartschool.com", avatar: "SA" }}
                />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Tombol Kembali */}
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-5 group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                            Kembali
                        </button>

                        {/* Header Detail dengan Card */}
                        <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-sm mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200/50 flex items-center justify-center text-3xl shadow-sm flex-shrink-0">
                                        {yayasan.logo}
                                    </div>
                                    <div>
                                        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">{yayasan.nama}</h1>
                                        <div className="flex flex-wrap items-center gap-2 mt-0.5">
                                            <span className="text-sm text-slate-500 font-mono">NPYP: {yayasan.npyp}</span>
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                                                <StatusIcon size={12} />
                                                {yayasan.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 ml-auto sm:ml-0">
                                    <button
                                        onClick={() => router.push(`/super-admin/yayasan/edit/${yayasan.id}`)}
                                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
                                    >
                                        <Edit size={15} />
                                        <span className="hidden xs:inline">Edit</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-slate-200/60 text-sm text-slate-500">
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} className="text-slate-400" />
                                    Bergabung: {new Date(yayasan.bergabung).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Building2 size={14} className="text-slate-400" />
                                    {yayasan.jumlahSekolah} Sekolah
                                </span>
                            </div>
                        </div>

                        {/* Grid Info Utama */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                                        <User size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Ketua Yayasan</p>
                                        <p className="text-sm font-semibold text-slate-700">{yayasan.ketua}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                                        <School size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Jumlah Sekolah</p>
                                        <p className="text-sm font-semibold text-slate-700">{yayasan.jumlahSekolah} Sekolah</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-violet-50 text-violet-600">
                                        <Users size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Total Pengguna</p>
                                        <p className="text-sm font-semibold text-slate-700">{yayasan.totalGuru + yayasan.totalSiswa + yayasan.totalAdmin}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Detail dalam 2 Kolom */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            {/* Kontak */}
                            <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
                                <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                                    <MailIcon size={16} className="text-slate-400" />
                                    Kontak
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm bg-slate-50/80 px-3 py-2 rounded-lg border border-slate-200/40">
                                        <MailIcon size={15} className="text-slate-400 flex-shrink-0" />
                                        <span className="text-slate-600 truncate">{yayasan.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm bg-slate-50/80 px-3 py-2 rounded-lg border border-slate-200/40">
                                        <Phone size={15} className="text-slate-400 flex-shrink-0" />
                                        <span className="text-slate-600">{yayasan.telepon}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm bg-slate-50/80 px-3 py-2 rounded-lg border border-slate-200/40">
                                        <GlobeIcon size={15} className="text-slate-400 flex-shrink-0" />
                                        <span className="text-slate-600 truncate">{yayasan.website}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Alamat */}
                            <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
                                <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                                    <MapPin size={16} className="text-slate-400" />
                                    Alamat
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <p className="text-slate-600 bg-slate-50/80 px-3 py-2 rounded-lg border border-slate-200/40">
                                        {yayasan.alamat}
                                    </p>
                                    <p className="text-slate-500 bg-slate-50/80 px-3 py-2 rounded-lg border border-slate-200/40">
                                        {yayasan.kelurahan}, {yayasan.kecamatan}, {yayasan.kota}, {yayasan.provinsi}
                                        <span className="block text-xs text-slate-400 mt-0.5">Kode Pos: {yayasan.kodePos}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Statistik Guru, Siswa, Admin */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-white rounded-xl border border-slate-200/80 p-4 text-center shadow-sm">
                                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 w-fit mx-auto mb-1.5">
                                    <Users size={18} />
                                </div>
                                <p className="text-xl font-bold text-slate-800">{yayasan.totalGuru}</p>
                                <p className="text-xs text-slate-400 font-medium">Guru</p>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200/80 p-4 text-center shadow-sm">
                                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 w-fit mx-auto mb-1.5">
                                    <UserCheck size={18} />
                                </div>
                                <p className="text-xl font-bold text-slate-800">{yayasan.totalSiswa}</p>
                                <p className="text-xs text-slate-400 font-medium">Siswa</p>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200/80 p-4 text-center shadow-sm">
                                <div className="p-2 rounded-lg bg-violet-50 text-violet-600 w-fit mx-auto mb-1.5">
                                    <User size={18} />
                                </div>
                                <p className="text-xl font-bold text-slate-800">{yayasan.totalAdmin}</p>
                                <p className="text-xs text-slate-400 font-medium">Admin</p>
                            </div>
                        </div>

                        {/* Sekolah Dibawah Naungan */}
                        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm mb-6">
                            <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                                <School size={16} className="text-slate-400" />
                                Sekolah Dibawah Naungan
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {yayasan.sekolah.map((nama, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50/80 px-3 py-2 rounded-lg border border-slate-200/40"
                                    >
                                        <Building2 size={14} className="text-slate-400 flex-shrink-0" />
                                        <span>{nama}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tombol Aksi */}
                        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-200/80">
                            <button
                                onClick={() => router.back()}
                                className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                Tutup
                            </button>
                            <button
                                onClick={() => router.push(`/super-admin/yayasan/edit/${yayasan.id}`)}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
                            >
                                <Edit size={16} />
                                Edit Yayasan
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}