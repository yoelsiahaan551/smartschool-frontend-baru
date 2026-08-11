"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import {
    Landmark,
    MapPin,
    X,
    Mail,
    Phone,
    Globe,
    Upload,
    Building,
    User,
    Hash,
    FileText,
    Save,
} from "lucide-react";

export default function TambahYayasanPage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeMenu] = useState("yayasan");

    const notifications = [
        { id: 1, title: "Pembaruan Sistem v2.0", desc: "Dikirim 2 jam lalu", read: false },
        { id: 2, title: "Pengingat: Backup Data", desc: "Dikirim 1 hari lalu", read: false },
        { id: 3, title: "Yayasan baru mendaftar", desc: "Dikirim 3 hari lalu", read: true },
    ];

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
                    <div className="max-w-3xl mx-auto">
                        {/* HEADER FORM */}
                        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 mb-6">
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                                    <span className="p-2 rounded-lg bg-blue-600 text-white shadow-sm">
                                        <Landmark size={18} />
                                    </span>
                                    Tambah Yayasan
                                </h1>
                                <p className="text-sm text-slate-600 ml-[52px] mt-0.5">
                                    Isi data yayasan baru untuk didaftarkan ke dalam sistem.
                                </p>
                            </div>
                            <button
                                onClick={() => router.push("/super-admin/yayasan")}
                                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
                                aria-label="Tutup"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form className="space-y-7">
                            {/* INFORMASI YAYASAN */}
                            <section>
                                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2.5">
                                    <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                                        <Building size={16} />
                                    </span>
                                    Informasi Yayasan
                                </h3>
                                <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Nama Yayasan <span className="text-rose-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Landmark size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                                <input
                                                    type="text"
                                                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition placeholder:text-slate-400 text-slate-900"
                                                    placeholder="Masukkan nama yayasan"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Kode Yayasan <span className="text-rose-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Hash size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                                <input
                                                    type="text"
                                                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition placeholder:text-slate-400 text-slate-900"
                                                    placeholder="Contoh: YP-001"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Ketua Yayasan <span className="text-rose-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                                <input
                                                    type="text"
                                                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition placeholder:text-slate-400 text-slate-900"
                                                    placeholder="Masukkan nama ketua"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Status
                                            </label>
                                            <select
                                                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer text-slate-900"
                                                defaultValue="Aktif"
                                            >
                                                <option value="Aktif">Aktif</option>
                                                <option value="Trial">Trial</option>
                                                <option value="Nonaktif">Nonaktif</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Email
                                            </label>
                                            <div className="relative">
                                                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                                <input
                                                    type="email"
                                                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition placeholder:text-slate-400 text-slate-900"
                                                    placeholder="yayasan@email.com"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                No Telepon
                                            </label>
                                            <div className="relative">
                                                <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                                <input
                                                    type="text"
                                                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition placeholder:text-slate-400 text-slate-900"
                                                    placeholder="021-12345678"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Website
                                            </label>
                                            <div className="relative">
                                                <Globe size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                                <input
                                                    type="text"
                                                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition placeholder:text-slate-400 text-slate-900"
                                                    placeholder="https://yayasan.or.id"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Logo
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg file:mr-3 file:py-1.5 file:px-3 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-lg hover:file:bg-blue-100 transition cursor-pointer text-slate-900"
                                                    accept="image/*"
                                                />
                                                <Upload size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                                            </div>
                                            <p className="text-[10px] text-slate-500 mt-1">Format: JPG, PNG, maks 2MB</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* ALAMAT */}
                            <section>
                                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2.5">
                                    <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                                        <MapPin size={16} />
                                    </span>
                                    Alamat
                                </h3>
                                <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Provinsi <span className="text-rose-500">*</span>
                                            </label>
                                            <select
                                                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer text-slate-900"
                                                defaultValue=""
                                            >
                                                <option value="" disabled className="text-slate-400">Pilih provinsi</option>
                                                <option value="DKI Jakarta">DKI Jakarta</option>
                                                <option value="Banten">Banten</option>
                                                <option value="Jawa Barat">Jawa Barat</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Kabupaten/Kota <span className="text-rose-500">*</span>
                                            </label>
                                            <select
                                                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer text-slate-900"
                                                defaultValue=""
                                            >
                                                <option value="" disabled className="text-slate-400">Pilih kabupaten/kota</option>
                                                <option value="Jakarta Pusat">Jakarta Pusat</option>
                                                <option value="Jakarta Utara">Jakarta Utara</option>
                                                <option value="Jakarta Barat">Jakarta Barat</option>
                                                <option value="Tangerang Selatan">Tangerang Selatan</option>
                                                <option value="Tangerang">Tangerang</option>
                                                <option value="Depok">Depok</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Kecamatan
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition placeholder:text-slate-400 text-slate-900"
                                                placeholder="Masukkan kecamatan"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Kelurahan
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition placeholder:text-slate-400 text-slate-900"
                                                placeholder="Masukkan kelurahan"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                                Kode Pos
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition placeholder:text-slate-400 text-slate-900"
                                                placeholder="Masukkan kode pos"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Alamat Lengkap <span className="text-rose-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                rows={2}
                                                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition resize-none placeholder:text-slate-400 text-slate-900"
                                                placeholder="Masukkan alamat lengkap (jalan, nomor, RT/RW, dll.)"
                                            />
                                            <FileText size={15} className="absolute right-3 top-3 text-slate-500 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* TOMBOL AKSI */}
                            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-200/80">
                                <button
                                    type="button"
                                    onClick={() => router.push("/super-admin/yayasan")}
                                    className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
                                >
                                    <Save size={16} />
                                    Simpan Yayasan
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}