"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { Save, Palette, Monitor, Type, Layout as LayoutIcon } from "lucide-react";

export default function TampilanPage() {
  const router = useRouter();
  const [active, setActive] = useState("pengaturan");
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    theme: "light",
    font: "sans",
    layout: "fullwidth",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("✅ Pengaturan Tampilan berhasil disimpan! (Mockup)");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-slate-50">
      <div className="flex-shrink-0">
        <Sidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <main className="flex-1 min-w-0 w-0 overflow-y-auto bg-slate-50 transition-all duration-300">
        <Header title="Pengaturan Tampilan" user={{ name: "Admin" }} />
        <div className="w-full min-w-0 px-4 py-8 md:px-8 lg:px-10 lg:py-10 max-w-5xl mx-auto space-y-6">
          <nav className="flex text-sm font-medium text-slate-500 tracking-wide">
            <ol className="flex items-center flex-wrap gap-x-2 gap-y-1">
              <li><a href="/cmsAdmin" className="hover:text-indigo-600">Dashboard</a></li>
              <li className="text-slate-300">/</li>
              <li><a href="/cmsAdmin/pengaturan" className="hover:text-indigo-600">Pengaturan</a></li>
              <li className="text-slate-300">/</li>
              <li className="text-indigo-600 font-semibold">Tampilan</li>
            </ol>
          </nav>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
              <Palette className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Pengaturan Tampilan</h1>
              <p className="text-sm text-slate-500 mt-0.5">Sesuaikan tema, font, dan layout tampilan website publik.</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2"><Monitor className="w-4 h-4 text-slate-500" /> Tema Warna</label>
                <div className="grid grid-cols-3 gap-3">
                  {["light", "dark", "system"].map((theme) => (
                    <label key={theme} className={`cursor-pointer relative flex items-center justify-center px-4 py-3 rounded-xl border transition-all ${form.theme === theme ? 'border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500/20' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                      <input type="radio" name="theme" value={theme} checked={form.theme === theme} onChange={handleChange} className="sr-only" />
                      <span className="text-sm font-medium text-slate-700 capitalize">{theme}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2"><Type className="w-4 h-4 text-slate-500" /> Font Utama</label>
                <select name="font" value={form.font} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all">
                  <option value="sans">Sans Serif (Modern)</option>
                  <option value="serif">Serif (Klasik)</option>
                  <option value="mono">Monospace (Teknologi)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2"><LayoutIcon className="w-4 h-4 text-slate-500" /> Layout</label>
                <select name="layout" value={form.layout} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all">
                  <option value="fullwidth">Full Width (Lebar Penuh)</option>
                  <option value="boxed">Boxed (Terpusat)</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-slate-100">
              <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 px-8 py-2.5 w-full sm:w-auto bg-indigo-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50">
                {loading ? <span className="animate-pulse">Menyimpan...</span> : <><Save className="w-4 h-4" /> Simpan Perubahan</>}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}