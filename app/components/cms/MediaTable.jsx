// app/cmsAdmin/components/MediaTable.jsx

"use client";

import { useState } from "react";
import { Trash2, Download, File, Image, FileText, FolderOpen, Eye } from "lucide-react";

const MediaTable = ({ media: initialMedia }) => {
  const [media, setMedia] = useState(initialMedia);
  const [viewMode, setViewMode] = useState("table"); // "table" | "grid"

  const handleDelete = (id) => {
    if (!confirm("Yakin ingin menghapus file ini?")) return;
    setMedia(media.filter((item) => item.id !== id));
  };

  const getFileIcon = (type) => {
    if (type.startsWith("image/")) return <Image className="w-5 h-5 text-blue-500" />;
    if (type === "application/pdf") return <FileText className="w-5 h-5 text-red-500" />;
    if (type.startsWith("video/")) return <FileText className="w-5 h-5 text-purple-500" />;
    return <File className="w-5 h-5 text-gray-500" />;
  };

  const getFileTypeLabel = (type) => {
    if (type.startsWith("image/")) return "Gambar";
    if (type === "application/pdf") return "PDF";
    if (type.startsWith("video/")) return "Video";
    return "File";
  };

  const formatFileSize = (size) => {
    if (!size) return "-";
    const num = parseFloat(size);
    if (size.includes("MB")) return size;
    if (size.includes("KB")) return size;
    if (num > 1024 * 1024) return (num / (1024 * 1024)).toFixed(1) + " MB";
    if (num > 1024) return (num / 1024).toFixed(1) + " KB";
    return size;
  };

  if (media.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <File className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-sm font-medium text-gray-600">Belum ada file media</h3>
        <p className="text-xs text-gray-400 mt-1">Upload file pertama Anda</p>
      </div>
    );
  }

  // Grid View (Mobile + Desktop optional)
  if (viewMode === "grid") {
    return (
      <div>
        {/* Toggle View */}
        <div className="flex justify-end mb-4 gap-2">
          <button
            onClick={() => setViewMode("table")}
            className="px-3 py-1 text-xs font-medium rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300"
          >
            Tabel
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className="px-3 py-1 text-xs font-medium rounded-lg bg-blue-600 text-white"
          >
            Grid
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Thumbnail */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                {item.type.startsWith("image/") ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50">
                    {getFileIcon(item.type)}
                  </div>
                )}
                {/* Overlay Aksi */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-full hover:bg-blue-50 transition-colors"
                    title="Lihat"
                  >
                    <Eye className="w-4 h-4 text-gray-700" />
                  </a>
                  <a
                    href={item.url}
                    download
                    className="p-2 bg-white rounded-full hover:bg-blue-50 transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4 text-gray-700" />
                  </a>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>
              {/* Info */}
              <div className="p-3">
                <p className="text-sm font-medium text-gray-800 truncate" title={item.name}>
                  {item.name}
                </p>
                <div className="flex items-center justify-between mt-1 text-xs text-gray-400">
                  <span>{formatFileSize(item.size)}</span>
                  <span className="px-2 py-0.5 bg-gray-100 rounded-full">{item.folder}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 px-5 py-3 bg-gray-50/50 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between">
          <span>Total <span className="font-medium text-gray-600">{media.length}</span> file</span>
          <span>⚡ Dummy</span>
        </div>
      </div>
    );
  }

  // Table View (Desktop)
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Toggle View */}
      <div className="flex justify-end p-4 pb-0 gap-2">
        <button
          onClick={() => setViewMode("table")}
          className="px-3 py-1 text-xs font-medium rounded-lg bg-blue-600 text-white"
        >
          Tabel
        </button>
        <button
          onClick={() => setViewMode("grid")}
          className="px-3 py-1 text-xs font-medium rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300"
        >
          Grid
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-50 bg-gray-50/80">
            <tr>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                File
              </th>
              <th className="px-5 py-3.5 text-left hidden md:table-cell text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                Tipe
              </th>
              <th className="px-5 py-3.5 text-left hidden lg:table-cell text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                Ukuran
              </th>
              <th className="px-5 py-3.5 text-left hidden lg:table-cell text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                Folder
              </th>
              <th className="px-5 py-3.5 text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {media.map((item) => (
              <tr key={item.id} className="group hover:bg-blue-50/40 transition-all">
                {/* File + Thumbnail */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {/* Thumbnail Preview */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      {item.type.startsWith("image/") ? (
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {getFileIcon(item.type)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-gray-400 sm:hidden">
                        {getFileTypeLabel(item.type)} • {formatFileSize(item.size)}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Tipe */}
                <td className="px-5 py-4 hidden md:table-cell text-xs text-gray-500">
                  {getFileTypeLabel(item.type)}
                </td>

                {/* Ukuran */}
                <td className="px-5 py-4 hidden lg:table-cell text-xs text-gray-500">
                  {formatFileSize(item.size)}
                </td>

                {/* Folder */}
                <td className="px-5 py-4 hidden lg:table-cell">
                  <span className="inline-flex items-center gap-1 text-xs bg-gray-100 px-2.5 py-1 rounded-full">
                    <FolderOpen className="w-3 h-3" /> {item.folder}
                  </span>
                </td>

                {/* Aksi */}
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                      title="Lihat"
                    >
                      <Eye size={15} />
                    </a>
                    <a
                      href={item.url}
                      download
                      className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                      title="Download"
                    >
                      <Download size={15} />
                    </a>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                      title="Hapus"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
        <span>Total <span className="font-medium text-gray-600">{media.length}</span> file</span>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-yellow-50 text-yellow-600 rounded-full">⚡ Dummy</span>
        </div>
      </div>
    </div>
  );
};

export default MediaTable;