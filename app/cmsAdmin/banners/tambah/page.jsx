// app/cmsAdmin/banners/tambah/page.jsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import Link from "next/link";
import {
  LayoutPanelTop,
  Plus,
  ArrowLeft,
  Image,
  Link2,
  Eye,
  X,
  Upload,
  AlertCircle,
  Check,
} from "lucide-react";

export default function CreateBannerPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState("banners");
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bannerData, setBannerData] = useState({
    title: "",
    image: "",
    link: "",
    position: "hero",
    status: "active",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBannerData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!bannerData.title.trim()) newErrors.title = "Judul banner wajib diisi";
    if (!bannerData.image.trim()) newErrors.image = "URL gambar wajib diisi";
    if (!bannerData.link.trim()) newErrors.link = "Link tujuan wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      alert("Banner berhasil ditambahkan (dummy)\n" + JSON.stringify(bannerData, null, 2));
      setLoading(false);
      router.push("/cmsAdmin/banners");
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar
        active={active}
        setActive={setActive}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-white min-w-0">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/cmsAdmin" className="hover:text-gray-600 transition-colors">
              Dashboard
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/cmsAdmin/banners" className="hover:text-gray-600 transition-colors">
              Banner
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-800 font-medium">Tambah Banner</span>
          </nav>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <LayoutPanelTop className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                  Tambah Banner Baru
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Tambahkan banner baru untuk website Anda
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              
              <Link
                href="/cmsAdmin/banners"
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
                <LayoutPanelTop className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Form Banner</span>
                <span className="ml-auto text-xs text-gray-400">* wajib diisi</span>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Judul */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1.5">
                    Judul Banner <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={bannerData.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border ${
                      errors.title
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500"
                    } focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800 bg-white`}
                    placeholder="Masukkan judul banner"
                  />
                  {errors.title && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* URL Gambar */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Image className="w-4 h-4 text-gray-400" />
                      URL Gambar
                    </span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="image"
                      value={bannerData.image}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border ${
                        errors.image
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      } focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800 bg-white pl-11`}
                      placeholder="https://example.com/banner.jpg"
                    />
                    <Image className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  {errors.image ? (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.image}
                    </p>
                  ) : (
                    <p className="mt-1.5 text-xs text-gray-400">
                      Masukkan URL gambar banner yang valid
                    </p>
                  )}
                </div>

                {/* Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Link2 className="w-4 h-4 text-gray-400" />
                      Link Tujuan
                    </span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="link"
                      value={bannerData.link}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border ${
                        errors.link
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      } focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800 bg-white pl-11`}
                      placeholder="/halaman-tujuan"
                    />
                    <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  {errors.link && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.link}
                    </p>
                  )}
                </div>

                {/* Posisi & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1.5">
                      Posisi
                    </label>
                    <select
                      name="position"
                      value={bannerData.position}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800 bg-white appearance-none"
                    >
                      <option value="hero">Hero</option>
                      <option value="promo">Promo</option>
                      <option value="sidebar">Sidebar</option>
                      <option value="bottom">Bottom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1.5">
                      Status
                    </label>
                    <select
                      name="status"
                      value={bannerData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800 bg-white appearance-none"
                    >
                      <option value="active">✅ Aktif</option>
                      <option value="draft">📝 Draft</option>
                    </select>
                  </div>
                </div>

                {/* Preview Banner (live preview) */}
                {bannerData.image && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preview Banner</label>
                    <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-[2.4/1]">
                      <img
                        src={bannerData.image}
                        alt={bannerData.title || "Preview banner"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://picsum.photos/seed/placeholder-banner/800/400";
                        }}
                      />
                      {bannerData.title && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <p className="text-white font-medium text-sm truncate">
                            {bannerData.title}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tombol Aksi */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        Simpan Banner
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Tips Card */}
          <div className="mt-6 bg-blue-50/50 rounded-xl border border-blue-100 p-5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-base">💡</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800">Tips Banner</h4>
                <ul className="text-sm text-gray-600 mt-1.5 space-y-1">
                  <li>• Gunakan gambar beresolusi tinggi (min 1200x600px)</li>
                  <li>• Pastikan link tujuan aktif dan relevan</li>
                  <li>• Gunakan judul yang singkat dan menarik</li>
                  <li>• Hanya banner dengan status <span className="font-medium text-green-600">Aktif</span> yang ditampilkan</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}