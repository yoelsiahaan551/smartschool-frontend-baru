"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Sidebar from "../../../../components/Sidebar";
import Header from "../../../../components/Header";
import { yayasanData } from "../../../../../lib/data";
import { Landmark, MapPin, X } from "lucide-react";

export default function EditYayasanPage() {
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
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-700">Yayasan tidak ditemukan</h2>
          <button
            onClick={() => router.push("/super-admin/yayasan")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Kembali ke Daftar Yayasan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
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
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <h1 className="text-2xl font-bold text-slate-800">Edit Yayasan</h1>
              <button
                onClick={() => router.push("/super-admin/yayasan")}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form className="space-y-6">
              {/* Informasi Yayasan (dengan nilai default dari data) */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <Landmark size={16} className="text-blue-500" />
                  Informasi Yayasan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Nama Yayasan</label>
                    <input
                      type="text"
                      defaultValue={yayasan.nama}
                      className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                      placeholder="Masukkan nama yayasan"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Kode Yayasan</label>
                    <input
                      type="text"
                      defaultValue={yayasan.npyp}
                      className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                      placeholder="Masukkan kode yayasan"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Ketua Yayasan</label>
                    <input
                      type="text"
                      defaultValue={yayasan.ketua}
                      className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                      placeholder="Masukkan nama ketua"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Status</label>
                    <select
                      className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition cursor-pointer"
                      defaultValue={yayasan.status}
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Trial">Trial</option>
                      <option value="Nonaktif">Nonaktif</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue={yayasan.email}
                      className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                      placeholder="Masukkan email"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">No Telepon</label>
                    <input
                      type="text"
                      defaultValue={yayasan.telepon}
                      className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                      placeholder="Masukkan no telepon"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Website</label>
                    <input
                      type="text"
                      defaultValue={yayasan.website}
                      className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                      placeholder="Masukkan website"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Logo</label>
                    <input
                      type="file"
                      className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl file:mr-4 file:py-1.5 file:px-3 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 file:border-0 file:rounded-lg hover:file:bg-blue-100 transition cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Alamat */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <MapPin size={16} className="text-emerald-500" />
                  Alamat
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Provinsi</label>
                    <select
                      className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition cursor-pointer"
                      defaultValue={yayasan.provinsi}
                    >
                      <option>DKI Jakarta</option>
                      <option>Banten</option>
                      <option>Jawa Barat</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Kabupaten/Kota</label>
                    <select
                      className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition cursor-pointer"
                      defaultValue={yayasan.kota}
                    >
                      <option>Jakarta Pusat</option>
                      <option>Jakarta Utara</option>
                      <option>Jakarta Barat</option>
                      <option>Tangerang Selatan</option>
                      <option>Tangerang</option>
                      <option>Depok</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Kecamatan</label>
                    <input
                      type="text"
                      defaultValue={yayasan.kecamatan}
                      className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                      placeholder="Kecamatan"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Kelurahan</label>
                    <input
                      type="text"
                      defaultValue={yayasan.kelurahan}
                      className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                      placeholder="Kelurahan"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Kode Pos</label>
                    <input
                      type="text"
                      defaultValue={yayasan.kodePos}
                      className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                      placeholder="Kode Pos"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-500 mb-1">Alamat Lengkap</label>
                    <textarea
                      rows={2}
                      defaultValue={yayasan.alamat}
                      className="w-full px-3 py-2 text-sm bg-slate-50/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition resize-none"
                      placeholder="Alamat lengkap"
                    />
                  </div>
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-200/60">
                <button
                  type="button"
                  onClick={() => router.push("/super-admin/yayasan")}
                  className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-lg transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}