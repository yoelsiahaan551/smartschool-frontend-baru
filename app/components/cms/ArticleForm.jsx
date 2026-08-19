// app/components/cms/ArticleForm.jsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { useRouter } from "next/navigation";
import { Save, X, AlertCircle, FileText, Tag, FolderOpen } from "lucide-react";

const articleSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  slug: z
    .string()
    .min(3, "Slug minimal 3 karakter")
    .regex(/^[a-z0-9-]+$/, "Slug hanya huruf kecil, angka, dan strip"),
  content: z.string().min(10, "Konten minimal 10 karakter"),
  status: z.enum(["draft", "published"]),
  category: z.string().optional(),
  tags: z.string().optional(),
});

const ArticleForm = ({ initialData = null, isEdit = false }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(initialData?.content || "");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(articleSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      content: "",
      status: "draft",
      category: "",
      tags: "",
    },
  });

  const handleContentChange = (html) => {
    setContent(html);
    setValue("content", html);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert(`Artikel ${isEdit ? "diperbarui" : "ditambahkan"} (dummy)\n` + JSON.stringify(data, null, 2));
    setLoading(false);
    router.push("/cmsAdmin/articles");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Judul */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1.5">
          Judul <span className="text-red-500">*</span>
        </label>
        <input
          {...register("title")}
          className={`w-full px-4 py-2.5 rounded-xl border ${
            errors.title ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
          } focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800 bg-white`}
          placeholder="Masukkan judul artikel"
        />
        {errors.title && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1.5">
          Slug <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-mono">
            /
          </span>
          <input
            {...register("slug")}
            className={`w-full pl-7 pr-4 py-2.5 rounded-xl border ${
              errors.slug ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
            } focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800 bg-white font-mono`}
            placeholder="judul-artikel"
          />
        </div>
        {errors.slug ? (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.slug.message}
          </p>
        ) : (
          <p className="mt-1.5 text-xs text-gray-400">Gunakan huruf kecil, angka, dan strip (-)</p>
        )}
      </div>

      {/* Konten */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1.5">
          Konten <span className="text-red-500">*</span>
        </label>
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
          <RichTextEditor value={content} onChange={handleContentChange} />
        </div>
        {errors.content && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.content.message}
          </p>
        )}
      </div>

      {/* Status & Kategori */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1.5">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            {...register("status")}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800 bg-white appearance-none"
          >
            <option value="draft">📝 Draft</option>
            <option value="published">✅ Published</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1.5">
            <span className="flex items-center gap-1.5">
              <FolderOpen className="w-4 h-4 text-gray-400" />
              Kategori
            </span>
          </label>
          <input
            {...register("category")}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800 bg-white"
            placeholder="Contoh: Pengumuman, Prestasi"
          />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1.5">
          <span className="flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-gray-400" />
            Tags
          </span>
        </label>
        <input
          {...register("tags")}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800 bg-white"
          placeholder="tag1, tag2, tag3 (pisahkan dengan koma)"
        />
        <p className="mt-1.5 text-xs text-gray-400">Tambahkan tag untuk memudahkan pencarian</p>
      </div>

      {/* Tombol Aksi */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {isEdit ? "Update Artikel" : "Simpan Artikel"}
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
  );
};

export default ArticleForm;