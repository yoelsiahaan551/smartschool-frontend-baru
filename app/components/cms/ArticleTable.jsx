// app/components/cms/ArticleTable.jsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { Pencil, Trash2, Eye, FileText, Calendar, Tag } from "lucide-react";

const ArticleTable = ({ articles: initialArticles }) => {
  const [articles, setArticles] = useState(initialArticles);

  const handleDelete = (id) => {
    if (!confirm("Yakin ingin menghapus artikel ini?")) return;
    setArticles(articles.filter((article) => article.id !== id));
  };

  if (articles.length === 0) {
    return (
      <div className="text-center py-[clamp(2rem,8vh,6rem)] bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-100/50">
        <div className="w-[clamp(3rem,8vw,5rem)] h-[clamp(3rem,8vw,5rem)] bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-[clamp(0.5rem,1vh,1rem)] ring-1 ring-gray-200/50">
          <FileText className="w-[clamp(1.25rem,3vw,2.25rem)] h-[clamp(1.25rem,3vw,2.25rem)] text-gray-300" />
        </div>
        <h3 className="text-[clamp(0.875rem,1.5vw,1.25rem)] font-semibold text-gray-700">Belum ada artikel</h3>
        <p className="text-[clamp(0.7rem,1vw,0.9rem)] text-gray-400 mt-1">Mulai buat artikel pertama Anda</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xl shadow-gray-100/40 overflow-hidden w-full transition-all duration-200">

      {/* TABLE - Desktop & Tablet */}
      <div className="hidden sm:block overflow-x-auto w-full">
        <table className="w-full min-w-[clamp(400px,60vw,800px)]">
          <thead>
            <tr className="border-b border-gray-200/60 bg-gradient-to-r from-white via-gray-50/80 to-white">
              <th className="px-[clamp(0.5rem,1vw,1.5rem)] py-[clamp(0.5rem,0.7vw,0.875rem)] text-left w-[clamp(25%,30%,40%)]">
                <span className="text-[clamp(0.45rem,0.6vw,0.8rem)] font-semibold text-gray-500 uppercase tracking-[0.08em]">Judul</span>
              </th>
              <th className="px-[clamp(0.5rem,1vw,1.5rem)] py-[clamp(0.5rem,0.7vw,0.875rem)] text-left hidden md:table-cell w-[clamp(8%,10%,12%)]">
                <span className="text-[clamp(0.45rem,0.6vw,0.8rem)] font-semibold text-gray-500 uppercase tracking-[0.08em]">Status</span>
              </th>
              <th className="px-[clamp(0.5rem,1vw,1.5rem)] py-[clamp(0.5rem,0.7vw,0.875rem)] text-left hidden lg:table-cell w-[clamp(10%,12%,15%)]">
                <span className="text-[clamp(0.45rem,0.6vw,0.8rem)] font-semibold text-gray-500 uppercase tracking-[0.08em]">Kategori</span>
              </th>
              <th className="px-[clamp(0.5rem,1vw,1.5rem)] py-[clamp(0.5rem,0.7vw,0.875rem)] text-left hidden xl:table-cell w-[clamp(12%,15%,18%)]">
                <span className="text-[clamp(0.45rem,0.6vw,0.8rem)] font-semibold text-gray-500 uppercase tracking-[0.08em]">Dibuat</span>
              </th>
              <th className="px-[clamp(0.5rem,1vw,1.5rem)] py-[clamp(0.5rem,0.7vw,0.875rem)] text-right w-[clamp(15%,18%,22%)]">
                <span className="text-[clamp(0.45rem,0.6vw,0.8rem)] font-semibold text-gray-500 uppercase tracking-[0.08em]">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100/60">
            {articles.map((article, index) => (
              <tr
                key={article.id}
                className={`group transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50/60 hover:to-transparent ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                }`}
              >
                {/* Judul */}
                <td className="px-[clamp(0.5rem,1vw,1.5rem)] py-[clamp(0.5rem,0.7vw,1rem)]">
                  <div className="flex items-center gap-[clamp(0.375rem,0.6vw,0.875rem)]">
                    <div className="flex-shrink-0 w-[clamp(1.5rem,2vw,2.75rem)] h-[clamp(1.5rem,2vw,2.75rem)] rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-[clamp(0.5rem,0.6vw,0.875rem)] shadow-sm shadow-blue-500/20">
                      {article.title.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[clamp(0.7rem,1vw,1.05rem)] font-medium text-gray-800 group-hover:text-blue-700 transition-colors truncate">
                        {article.title}
                      </p>
                      <div className="flex items-center gap-[clamp(0.25rem,0.3vw,0.5rem)] mt-[0.125rem] md:hidden flex-wrap">
                        <span className={`inline-flex items-center gap-1 text-[clamp(0.4rem,0.5vw,0.65rem)] font-medium px-[clamp(0.25rem,0.3vw,0.5rem)] py-[0.0625rem] rounded-full ${
                          article.status === "published"
                            ? "bg-green-50 text-green-600"
                            : "bg-yellow-50 text-yellow-600"
                        }`}>
                          <span className={`w-[0.25rem] h-[0.25rem] rounded-full ${
                            article.status === "published" ? "bg-green-500" : "bg-yellow-500"
                          }`} />
                          {article.status === "published" ? "Published" : "Draft"}
                        </span>
                        {article.category && (
                          <span className="text-[clamp(0.4rem,0.5vw,0.65rem)] text-gray-400 truncate max-w-[clamp(3rem,8vw,6rem)]">
                            • {article.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Status - Desktop */}
                <td className="px-[clamp(0.5rem,1vw,1.5rem)] py-[clamp(0.5rem,0.7vw,1rem)] hidden md:table-cell">
                  <span className={`inline-flex items-center gap-1.5 px-[clamp(0.375rem,0.5vw,0.75rem)] py-[clamp(0.125rem,0.2vw,0.375rem)] rounded-full text-[clamp(0.45rem,0.6vw,0.8rem)] font-medium ${
                    article.status === "published"
                      ? "bg-green-50 text-green-700 ring-1 ring-green-200/50"
                      : "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200/50"
                  }`}>
                    <span className={`w-[clamp(0.25rem,0.3vw,0.4rem)] h-[clamp(0.25rem,0.3vw,0.4rem)] rounded-full ${
                      article.status === "published" ? "bg-green-500 animate-pulse" : "bg-yellow-500"
                    }`} />
                    {article.status === "published" ? "Published" : "Draft"}
                  </span>
                </td>

                {/* Kategori - Desktop */}
                <td className="px-[clamp(0.5rem,1vw,1.5rem)] py-[clamp(0.5rem,0.7vw,1rem)] hidden lg:table-cell">
                  {article.category ? (
                    <span className="inline-flex items-center gap-1.5 text-[clamp(0.45rem,0.6vw,0.8rem)] text-gray-600 bg-gray-100/70 px-[clamp(0.375rem,0.5vw,0.75rem)] py-[clamp(0.125rem,0.2vw,0.375rem)] rounded-full truncate max-w-[clamp(5rem,10vw,10rem)] ring-1 ring-gray-200/30">
                      <Tag className="w-[clamp(0.5rem,0.6vw,0.875rem)] h-[clamp(0.5rem,0.6vw,0.875rem)] text-gray-400 flex-shrink-0" />
                      <span className="truncate">{article.category}</span>
                    </span>
                  ) : (
                    <span className="text-[clamp(0.5rem,0.6vw,0.8rem)] text-gray-300">—</span>
                  )}
                </td>

                {/* Tanggal - Desktop */}
                <td className="px-[clamp(0.5rem,1vw,1.5rem)] py-[clamp(0.5rem,0.7vw,1rem)] hidden xl:table-cell">
                  <div className="flex items-center gap-1.5 text-[clamp(0.45rem,0.6vw,0.8rem)] text-gray-500 whitespace-nowrap">
                    <Calendar className="w-[clamp(0.625rem,0.7vw,0.9rem)] h-[clamp(0.625rem,0.7vw,0.9rem)] text-gray-400 flex-shrink-0" />
                    {new Date(article.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </td>

                {/* Aksi */}
                <td className="px-[clamp(0.5rem,1vw,1.5rem)] py-[clamp(0.5rem,0.7vw,1rem)] text-right">
                  <div className="flex items-center justify-end gap-[clamp(0.0625rem,0.15vw,0.3rem)]">
                    {article.status === "published" && (
                      <Link
                        href={`/preview/${article.slug}`}
                        target="_blank"
                        className="p-[clamp(0.25rem,0.3vw,0.5rem)] rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50/80 transition-all duration-200 hover:scale-110"
                        title="Preview"
                      >
                        <Eye className="w-[clamp(0.7rem,0.9vw,1.1rem)] h-[clamp(0.7rem,0.9vw,1.1rem)]" />
                      </Link>
                    )}
                    <Link
                      href={`/cmsAdmin/articles/${article.id}/edit`}
                      className="p-[clamp(0.25rem,0.3vw,0.5rem)] rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200 hover:scale-110"
                      title="Edit"
                    >
                      <Pencil className="w-[clamp(0.7rem,0.9vw,1.1rem)] h-[clamp(0.7rem,0.9vw,1.1rem)]" />
                    </Link>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="p-[clamp(0.25rem,0.3vw,0.5rem)] rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50/80 transition-all duration-200 hover:scale-110"
                      title="Hapus"
                    >
                      <Trash2 className="w-[clamp(0.7rem,0.9vw,1.1rem)] h-[clamp(0.7rem,0.9vw,1.1rem)]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE - Card View */}
      <div className="sm:hidden divide-y divide-gray-100/60">
        {articles.map((article) => (
          <div key={article.id} className="px-[clamp(0.625rem,2vw,1.25rem)] py-[clamp(0.625rem,1.2vw,1.25rem)] hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-colors">
            <div className="flex items-start justify-between gap-[clamp(0.375rem,1vw,0.75rem)]">
              <div className="flex items-center gap-[clamp(0.375rem,1vw,0.75rem)] flex-1 min-w-0">
                <div className="flex-shrink-0 w-[clamp(1.75rem,4vw,2.75rem)] h-[clamp(1.75rem,4vw,2.75rem)] rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-[clamp(0.5rem,1vw,0.875rem)] shadow-sm shadow-blue-500/20">
                  {article.title.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[clamp(0.7rem,1.2vw,1rem)] font-medium text-gray-800 truncate">{article.title}</p>
                  <div className="flex flex-wrap items-center gap-[clamp(0.1875rem,0.4vw,0.375rem)] mt-[0.0625rem]">
                    <span className={`inline-flex items-center gap-1 text-[clamp(0.4rem,0.7vw,0.65rem)] font-medium px-[clamp(0.25rem,0.5vw,0.5rem)] py-[0.0625rem] rounded-full ${
                      article.status === "published"
                        ? "bg-green-50 text-green-600"
                        : "bg-yellow-50 text-yellow-600"
                    }`}>
                      <span className={`w-[0.1875rem] h-[0.1875rem] rounded-full ${
                        article.status === "published" ? "bg-green-500" : "bg-yellow-500"
                      }`} />
                      {article.status === "published" ? "Published" : "Draft"}
                    </span>
                    {article.category && (
                      <span className="text-[clamp(0.4rem,0.7vw,0.65rem)] text-gray-400 bg-gray-100/70 px-[clamp(0.25rem,0.4vw,0.5rem)] py-[0.0625rem] rounded-full truncate max-w-[clamp(3rem,10vw,5rem)]">
                        {article.category}
                      </span>
                    )}
                    <span className="text-[clamp(0.4rem,0.7vw,0.65rem)] text-gray-400 whitespace-nowrap">
                      {new Date(article.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-[0.0625rem] ml-[clamp(0.25rem,0.5vw,0.375rem)] flex-shrink-0">
                {article.status === "published" && (
                  <Link href={`/preview/${article.slug}`} target="_blank" className="p-[clamp(0.25rem,0.4vw,0.5rem)] text-gray-400 hover:text-indigo-600 transition-colors">
                    <Eye className="w-[clamp(0.65rem,0.9vw,0.9rem)] h-[clamp(0.65rem,0.9vw,0.9rem)]" />
                  </Link>
                )}
                <Link href={`/cmsAdmin/articles/${article.id}/edit`} className="p-[clamp(0.25rem,0.4vw,0.5rem)] text-gray-400 hover:text-blue-600 transition-colors">
                  <Pencil className="w-[clamp(0.65rem,0.9vw,0.9rem)] h-[clamp(0.65rem,0.9vw,0.9rem)]" />
                </Link>
                <button onClick={() => handleDelete(article.id)} className="p-[clamp(0.25rem,0.4vw,0.5rem)] text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-[clamp(0.65rem,0.9vw,0.9rem)] h-[clamp(0.65rem,0.9vw,0.9rem)]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="px-[clamp(0.5rem,1vw,1.5rem)] py-[clamp(0.375rem,0.6vw,0.75rem)] bg-gradient-to-r from-white via-gray-50/60 to-white border-t border-gray-200/60 flex flex-wrap items-center justify-between gap-[clamp(0.25rem,0.5vw,0.5rem)]">
        <div className="flex items-center gap-[clamp(0.375rem,0.6vw,0.875rem)] text-[clamp(0.45rem,0.6vw,0.8rem)] text-gray-400 flex-wrap">
          <span className="font-medium text-gray-500">Total</span>
          <span className="font-semibold text-gray-700">{articles.length}</span>
          <span className="text-gray-300">artikel</span>
          <span className="hidden sm:inline text-gray-300">•</span>
          <span className="hidden sm:inline text-gray-400">
            <span className="text-green-600 font-medium">{articles.filter(a => a.status === "published").length}</span>
            <span className="text-gray-400"> Published</span>
            <span className="mx-[clamp(0.125rem,0.2vw,0.375rem)] text-gray-300">•</span>
            <span className="text-yellow-600 font-medium">{articles.filter(a => a.status === "draft").length}</span>
            <span className="text-gray-400"> Draft</span>
          </span>
        </div>
        <span className="text-[clamp(0.4rem,0.5vw,0.7rem)] px-[clamp(0.375rem,0.5vw,0.75rem)] py-[clamp(0.0625rem,0.15vw,0.25rem)] bg-yellow-50/80 text-yellow-600 rounded-full ring-1 ring-yellow-200/50">⚡ Dummy</span>
      </div>
    </div>
  );
};

export default ArticleTable;