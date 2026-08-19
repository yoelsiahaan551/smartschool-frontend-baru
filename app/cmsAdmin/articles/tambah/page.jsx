// app/cmsAdmin/articles/create/page.jsx

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import ArticleForm from "../../../components/cms/ArticleForm";
import { ArrowLeft, FileText, Plus } from "lucide-react";
import Link from "next/link";

export default function CreateArticlePage() {
  const pathname = usePathname();
  const [active, setActive] = useState("articles");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar
        active={active}
        setActive={setActive}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/cmsAdmin" className="hover:text-gray-600 transition-colors">
              Dashboard
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/cmsAdmin/articles" className="hover:text-gray-600 transition-colors">
              Artikel
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-800 font-medium">Tambah Artikel</span>
          </nav>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                  Tambah Artikel Baru
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Buat artikel baru untuk website Anda
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
             
              <Link
                href="/cmsAdmin/articles"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Link>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 px-6 py-4 bg-gray-50/50">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Form Artikel</span>
                <span className="ml-auto text-xs text-gray-400">* wajib diisi</span>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <ArticleForm />
            </div>
          </div>

          {/* Tips Card */}
          <div className="mt-6 bg-blue-50/50 rounded-xl border border-blue-100 p-5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-base">💡</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800">Tips Menulis Artikel</h4>
                <ul className="text-sm text-gray-600 mt-1.5 space-y-1">
                  <li>• Gunakan judul yang menarik dan mengandung kata kunci</li>
                  <li>• Buat slug yang pendek, jelas, dan mudah diingat</li>
                  <li>• Sertakan gambar untuk membuat artikel lebih hidup</li>
                  <li>• Bagi konten dengan subjudul agar mudah dibaca</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}