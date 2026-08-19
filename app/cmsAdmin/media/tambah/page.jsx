"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import { Upload, X } from "lucide-react";

export default function UploadMediaPage() {
  const router = useRouter();
  const [active, setActive] = useState("media");
  const [collapsed, setCollapsed] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert(`File "${file?.name}" berhasil diupload (dummy)`);
      setLoading(false);
      router.push("/cmsAdmin/media");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
            <Upload className="w-6 h-6 text-blue-600" />
            Upload Media
          </h1>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Klik atau drag file ke sini</p>
                <p className="text-xs text-gray-400 mt-1">Maksimal 5MB</p>
              </label>
            </div>
            {file && (
              <div className="mt-4 flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs font-bold">{file.name.slice(0, 2).toUpperCase()}</div>
                  <div><p className="text-sm font-medium text-gray-700">{file.name}</p><p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p></div>
                </div>
                <button type="button" onClick={() => setFile(null)} className="text-gray-400 hover:text-red-500"><X size={18} /></button>
              </div>
            )}
            <div className="mt-6 flex gap-3">
              <button type="submit" disabled={!file || loading} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all">{loading ? "Uploading..." : "Upload"}</button>
              <button type="button" onClick={() => router.back()} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all">Batal</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}