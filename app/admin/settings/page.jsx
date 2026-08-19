"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Settings, RefreshCw, Save, Globe, Shield, Bell, Users, School, Calendar, FileText, CheckCircle } from "lucide-react";

export default function AdminPengaturanPage() {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [saved, setSaved] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar
        active="pengaturan"
        setActive={() => {}}
        collapsed={isCollapsed}
        setCollapsed={setIsCollapsed}
        role="admin"
      />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header toggleSidebar={toggleSidebar} notifications={[]} user={{ name: "Admin Sekolah", email: "admin@smartschool.com", avatar: "AD" }} />
        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-4xl mx-auto p-4 md:p-6 lg:p-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-700 text-white shadow-sm"><Settings size={18} /></div>
                <div>
                  <h1 className="text-xl font-semibold text-slate-800">Pengaturan</h1>
                  <p className="text-sm text-slate-500">Atur konfigurasi sistem sekolah</p>
                </div>
              </div>
              <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                {saved ? <><CheckCircle size={16} /> Tersimpan</> : <><Save size={16} /> Simpan Pengaturan</>}
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100">
                {[
                  { icon: Globe, label: "Informasi Sekolah", desc: "Nama, alamat, dan kontak sekolah", fields: ["Nama Sekolah", "NPSN", "Alamat", "Telepon", "Email"] },
                  { icon: School, label: "Tahun Ajaran", desc: "Konfigurasi tahun ajaran aktif", fields: ["Tahun Ajaran", "Semester Aktif", "Tanggal Mulai", "Tanggal Selesai"] },
                  { icon: Users, label: "Pengguna & Akses", desc: "Manajemen hak akses pengguna", fields: ["Registrasi Guru", "Registrasi Siswa", "Verifikasi Akun"] },
                  { icon: Bell, label: "Notifikasi", desc: "Pengaturan notifikasi dan pengingat", fields: ["Notifikasi Email", "Notifikasi SMS", "Notifikasi Push"] },
                ].map((section, idx) => {
                  const Icon = section.icon;
                  return (
                    <div key={idx} className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-slate-50 text-slate-600"><Icon size={18} /></div>
                        <div>
                          <h3 className="text-sm font-semibold text-slate-700">{section.label}</h3>
                          <p className="text-xs text-slate-400">{section.desc}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {section.fields.map((field, fi) => (
                          <div key={fi}>
                            <label className="block text-xs font-medium text-slate-500 mb-1">{field}</label>
                            <input type="text" placeholder={field} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}