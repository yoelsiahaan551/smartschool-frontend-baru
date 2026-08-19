// app/cmsAdmin/pages/tambah/page.jsx

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import PageForm from "../../../components/cms/PageForm";
import { ArrowLeft, File, Plus } from "lucide-react";
import Link from "next/link";

export default function CreatePagePage() {
  const pathname = usePathname();
  const [active, setActive] = useState("pages");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/70">
      <Sidebar
        active={active}
        setActive={setActive}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/cmsAdmin" className="hover:text-gray-600 transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <Link href="/cmsAdmin/pages" className="hover:text-gray-600 transition-colors">
              Halaman Statis
            </Link>
            <span>/</span>
            <span className="text-gray-600 font-medium">Tambah Halaman</span>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Tambah Halaman Statis</h1>
                  <p className="text-sm text-gray-500 mt-0.5">Buat halaman baru untuk website Anda</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
            
              <Link
                href="/cmsAdmin/pages"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
              >
                <ArrowLeft size={16} />
                Kembali
              </Link>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 px-6 py-4 bg-gradient-to-r from-gray-50/50 to-white">
              <div className="flex items-center gap-2">
                <File className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">Form Halaman Statis</span>
                <span className="ml-auto text-xs text-gray-400">* wajib diisi</span>
              </div>
            </div>
            <div className="p-6">
              <PageForm />
            </div>
          </div>

          {/* Tips Card */}
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-sm">💡</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Tips Membuat Halaman</h4>
                <ul className="text-xs text-gray-500 mt-1 space-y-0.5">
                  <li>• Gunakan judul yang jelas dan deskriptif</li>
                  <li>• Buat slug yang pendek dan mudah diingat</li>
                  <li>• Hanya satu halaman yang bisa menjadi <span className="font-medium text-purple-600">Beranda</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}